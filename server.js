// server.ts
import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.static(process.cwd()));

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

function resolveModel(modelInput?: string): string {
  if (!modelInput) return "gemini-2.5-flash";
  const m = modelInput.toLowerCase();
  if (m.includes("2.5") || m.includes("flash")) {
    return "gemini-2.5-flash";
  }
  if (m.includes("3.1") || m.includes("pro")) {
    return "gemini-2.5-pro";
  }
  return modelInput;
}

function formatContents(prompt?: string, history?: any[], image?: string) {
  const contents: any[] = [];

  if (Array.isArray(history)) {
    for (const item of history) {
      if (!item || typeof item !== "object") continue;
      const role = item.role === "model" || item.role === "assistant" ? "model" : "user";
      const parts: any[] = [];

      if (item.image && typeof item.image === "string") {
        const match = item.image.match(/^data:(image\/[a-zA-Z0-9\+\-\.]+);base64,(.+)$/);
        if (match) {
          parts.push({
            inlineData: {
              mimeType: match[1],
              data: match[2],
            },
          });
        }
      }

      const textVal = item.content || item.text || (typeof item === "string" ? item : "");
      if (textVal) {
        parts.push({ text: String(textVal) });
      }

      if (parts.length > 0) {
        contents.push({ role, parts });
      }
    }
  }

  const currentParts: any[] = [];
  if (image && typeof image === "string") {
    const match = image.match(/^data:(image\/[a-zA-Z0-9\+\-\.]+);base64,(.+)$/);
    if (match) {
      currentParts.push({
        inlineData: {
          mimeType: match[1],
          data: match[2],
        },
      });
    } else {
      currentParts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: image,
        },
      });
    }
  }

  if (prompt && typeof prompt === "string") {
    currentParts.push({ text: prompt });
  }

  if (currentParts.length > 0) {
    contents.push({
      role: "user",
      parts: currentParts,
    });
  }

  return contents;
}

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "ai-assistant.html"));
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    defaultModel: "gemini-2.5-flash",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { prompt, history = [], systemInstruction, image, model } = req.body || {};

    if (!prompt && !image) {
      return res.status(400).json({ error: "Validation Error: Prompt or image is required." });
    }

    const ai = getGeminiClient();
    const selectedModel = resolveModel(model);
    const contents = formatContents(prompt, history, image);

    if (contents.length === 0) {
      return res.status(400).json({ error: "Validation Error: Prompt content is empty." });
    }

    const config: any = {};
    if (systemInstruction && typeof systemInstruction === "string") {
      config.systemInstruction = systemInstruction;
    }

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents,
      config,
    });

    res.json({ text: response.text || "" });
  } catch (error: any) {
    console.error("Express /api/chat Error:", error);
    res.status(500).json({
      error: error?.message || "An error occurred while generating AI response.",
    });
  }
});

app.post("/api/chat/stream", async (req, res) => {
  let isAborted = false;
  req.on("close", () => {
    isAborted = true;
  });

  try {
    const { prompt, history = [], systemInstruction, image, model } = req.body || {};

    if (!prompt && !image) {
      return res.status(400).json({ error: "Validation Error: Prompt or image is required." });
    }

    const ai = getGeminiClient();
    const selectedModel = resolveModel(model);
    const contents = formatContents(prompt, history, image);

    if (contents.length === 0) {
      return res.status(400).json({ error: "Validation Error: Prompt content is empty." });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    const config: any = {};
    if (systemInstruction && typeof systemInstruction === "string") {
      config.systemInstruction = systemInstruction;
    }

    const responseStream = await ai.models.generateContentStream({
      model: selectedModel,
      contents,
      config,
    });

    for await (const chunk of responseStream) {
      if (isAborted) break;
      const text = chunk.text || "";
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    if (!isAborted) {
      res.write("data: [DONE]\n\n");
      res.end();
    }
  } catch (error: any) {
    console.error("Express /api/chat/stream Error:", error);
    const errorMessage = error?.message || "Streaming failed.";
    if (!res.headersSent) {
      res.status(500).json({ error: errorMessage });
    } else {
      res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
      res.end();
    }
  }
});

app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server listening at http://0.0.0.0:${PORT}`);
});