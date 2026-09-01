import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createPublicKey, createVerify } from "crypto";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const AUTH_REQUIRED = process.env.AUTH_REQUIRED === "true";
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
let firebaseCertificates = { value: null, expiresAt: 0 };

if (AUTH_REQUIRED && !FIREBASE_PROJECT_ID) {
  throw new Error("FIREBASE_PROJECT_ID is required when AUTH_REQUIRED=true.");
}

function decodeBase64Url(value) {
  return JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
}

async function getFirebaseCertificates() {
  if (firebaseCertificates.value && firebaseCertificates.expiresAt > Date.now()) return firebaseCertificates.value;
  const response = await fetch("https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com");
  if (!response.ok) throw new Error("Unable to obtain Firebase token certificates.");
  const cacheControl = response.headers.get("cache-control") || "";
  const maxAge = Number(cacheControl.match(/max-age=(\d+)/)?.[1] || 3600);
  firebaseCertificates = { value: await response.json(), expiresAt: Date.now() + maxAge * 1000 };
  return firebaseCertificates.value;
}

async function requireFirebaseAuth(req, res, next) {
  if (!AUTH_REQUIRED) return next();
  const token = req.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return res.status(401).json({ success: false, error: "Please sign in to use this feature." });
  try {
    const [encodedHeader, encodedPayload, signature] = token.split(".");
    const header = decodeBase64Url(encodedHeader);
    const payload = decodeBase64Url(encodedPayload);
    if (header.alg !== "RS256" || !header.kid || payload.aud !== FIREBASE_PROJECT_ID || payload.iss !== `https://securetoken.google.com/${FIREBASE_PROJECT_ID}` || !payload.sub || payload.exp * 1000 <= Date.now()) throw new Error("Invalid token claims.");
    const certificate = (await getFirebaseCertificates())[header.kid];
    if (!certificate) throw new Error("Unknown token signing key.");
    const verifier = createVerify("RSA-SHA256");
    verifier.update(`${encodedHeader}.${encodedPayload}`);
    verifier.end();
    if (!verifier.verify(createPublicKey(certificate), Buffer.from(signature, "base64url"))) throw new Error("Invalid token signature.");
    req.user = { uid: payload.sub, email: payload.email || null };
    next();
  } catch (error) {
    console.warn("Authentication rejected:", error.message);
    res.status(401).json({ success: false, error: "Your session is invalid or expired. Please sign in again." });
  }
}

const MODEL = "gemini-3.6-flash";
const EDUCATIONAL_SYSTEM_PROMPT = `
You are EduNexa AI, an educational AI agent designed to help students learn effectively.
Your role is a study coach, concept explainer, quiz generator, planner, and progress mentor.

Always:
- Break down difficult ideas into clear, student-friendly steps.
- Create personalized study plans when a learner asks for one.
- Explain concepts with simple language, examples, and analogies.
- Generate quizzes, practice tasks, flashcard prompts, and revision activities.
- Recommend the next learning step based on the student's goal, timeline, and current level.
- Focus on progress, confidence, and sustainable learning habits.
- Ask clarifying questions when the learner's goal is vague.
- If the learner is stuck, simplify the explanation and give a smaller practice task.
- When giving a plan, include: learning goals, daily breakdown, concept focus, practice activities, and review checkpoints.
- When generating a quiz, provide 5-10 questions and answer explanations.

Be supportive, structured, and intentional about learning outcomes.
`;

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is missing from .env");
  process.exit(1);
}

const ai = new GoogleGenAI({
  apiKey: apiKey,
});

app.use(cors());

app.use(
  express.json({
    limit: "25mb",
  })
);

/* =========================================================
   SERVE ENTIRE PROJECT FOLDER
   ========================================================= */

app.use(express.static(__dirname));

/* =========================================================
   HEALTH CHECK
   ========================================================= */

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    gemini: "connected",
    model: MODEL,
    hasKey: Boolean(apiKey),
  });
});

/* =========================================================
   MODELS
   ========================================================= */

app.get("/api/models", (req, res) => {
  res.json({
    defaultModel: MODEL,
    models: [
      {
        id: MODEL,
        name: "Gemini 3.6 Flash",
      },
    ],
  });
});

/* =========================================================
   CHAT
   ========================================================= */

app.post("/api/chat", requireFirebaseAuth, async (req, res) => {
  try {
    const {
      messages = [],
      systemInstruction = EDUCATIONAL_SYSTEM_PROMPT,
      image = null,
    } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No messages provided.",
      });
    }

    const contents = messages
      .map((message) => {
        const role = message.role === "user" ? "user" : "model";

        const text =
          typeof message.content === "string"
            ? message.content.trim()
            : "";

        if (!text) {
          return null;
        }

        return {
          role,
          parts: [
            {
              text,
            },
          ],
        };
      })
      .filter(Boolean);

    if (contents.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No valid message content found.",
      });
    }

    /* =====================================================
       ADD IMAGE IF PROVIDED
       ===================================================== */

    if (image && image.data && image.mimeType) {
      const lastUserMessage = [...contents]
        .reverse()
        .find((item) => item.role === "user");

      if (lastUserMessage) {
        lastUserMessage.parts.push({
          inlineData: {
            mimeType: image.mimeType,
            data: image.data.replace(/^data:image\/\w+;base64,/, ""),
          },
        });
      }
    }

    console.log("💬 Chat request received");
    console.log(`🤖 Model: ${MODEL}`);

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "";

    /* =====================================================
       SSE RESPONSE
       Matches ai-assistant.js streaming code
       ===================================================== */

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    res.write(
      `event: chunk\ndata: ${JSON.stringify({
        text: text,
      })}\n\n`
    );

    res.end();

  } catch (error) {
    console.error("❌ Gemini Error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        error: error?.message || "Gemini request failed.",
      });
    }

    res.write(
      `event: error\ndata: ${JSON.stringify({
        message: error?.message || "Gemini request failed.",
      })}\n\n`
    );

    res.end();
  }
});

/* =========================================================
   FRONTEND FALLBACK
   ========================================================= */

app.post("/api/agent/study-plan", requireFirebaseAuth, async (req, res) => {
  try {
    const {
      subject = "General Learning",
      goal = "Build confidence and consistent progress",
      days = 7,
      level = "intermediate",
      learnerName = "student",
    } = req.body || {};

    const prompt = `Create a personalized ${days}-day study plan for ${learnerName}. Subject: ${subject}. Level: ${level}. Goal: ${goal}. Include a daily breakdown, concept focus, revision activities, practice questions, and progress checkpoints. Format the result as clear markdown with headings and bullet points.`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: [{
        role: "user",
        parts: [{ text: prompt }],
      }],
      config: {
        systemInstruction: EDUCATIONAL_SYSTEM_PROMPT,
        temperature: 0.6,
      },
    });

    res.json({
      success: true,
      plan: response.text || "",
    });
  } catch (error) {
    console.error("❌ Study plan generation failed:", error);
    res.status(500).json({
      success: false,
      error: error?.message || "Study plan generation failed.",
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/* =========================================================
   START SERVER
   ========================================================= */

app.listen(PORT, () => {
  console.log("");
  console.log("=================================");
  console.log("✨ EDU NEXA AI");
  console.log("=================================");
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`🤖 Model: ${MODEL}`);
  console.log("🔐 Gemini API: Connected ✅");
  console.log("=================================");
  console.log("");
});
