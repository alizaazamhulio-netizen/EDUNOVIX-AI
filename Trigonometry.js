/**
 * TRIGONOMETRY MATHEMATICS MODULE — INTERACTIVE ENGINE
 * FAST-NUCES | NUST NET | GIKI | IBA | ECAT | SCHOLARSHIP PREPARATION
 */

// ==========================================
// 1. DATA: 120 ORIGINAL PRACTICE MCQS
// ==========================================
const PRACTICE_MCQS = [
  // FOUNDATION (30 Questions)
  {
    id: 1,
    level: "foundation",
    category: "fast",
    topic: "ratios",
    q: "In a right-angled triangle, if the opposite side is 3 and the adjacent side is 4, what is sin θ (where θ is the angle opposite to side 3)?",
    opts: ["3/5", "4/5", "3/4", "5/3"],
    ans: 0,
    exp: "Hypotenuse = √(3² + 4²) = √25 = 5. Therefore, sin θ = Opposite / Hypotenuse = 3/5."
  },
  {
    id: 2,
    level: "foundation",
    category: "net",
    topic: "ratios",
    q: "Which of the following is equal to 1 / cos θ?",
    opts: ["sin θ", "cosec θ", "sec θ", "cot θ"],
    ans: 2,
    exp: "By definition, secant is the reciprocal of cosine: sec θ = 1 / cos θ."
  },
  {
    id: 3,
    level: "foundation",
    category: "ecat",
    topic: "standard_angles",
    q: "What is the exact value of tan 45°?",
    opts: ["0", "1/2", "1", "√3"],
    ans: 2,
    exp: "In an isosceles right triangle with legs of length 1, tan 45° = Opposite / Adjacent = 1/1 = 1."
  },
  {
    id: 4,
    level: "foundation",
    category: "aptitude",
    topic: "standard_angles",
    q: "What is the exact value of sin 30° + cos 60°?",
    opts: ["0", "1/2", "1", "√3"],
    ans: 2,
    exp: "sin 30° = 1/2 and cos 60° = 1/2. Thus, 1/2 + 1/2 = 1."
  },
  {
    id: 5,
    level: "foundation",
    category: "scholarship",
    topic: "identities",
    q: "Simplify the expression: sin² 27° + cos² 27°.",
    opts: ["0", "1", "sin 54°", "2"],
    ans: 1,
    exp: "For any angle θ, the fundamental Pythagorean identity states sin² θ + cos² θ = 1."
  },
  {
    id: 6,
    level: "foundation",
    category: "fast",
    topic: "radians",
    q: "Convert 120° into radians.",
    opts: ["π/3 rad", "2π/3 rad", "3π/4 rad", "5π/6 rad"],
    ans: 1,
    exp: "Radians = Degrees × (π / 180) = 120 × (π / 180) = 2π / 3 radians."
  },
  {
    id: 7,
    level: "foundation",
    category: "net",
    topic: "quadrants",
    q: "In which quadrant are both sin θ and cos θ negative?",
    opts: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
    ans: 2,
    exp: "In Quadrant III (180° to 270°), x < 0 and y < 0. Hence cos θ < 0 and sin θ < 0, while tan θ > 0."
  },
  {
    id: 8,
    level: "foundation",
    category: "ecat",
    topic: "reciprocals",
    q: "If sin θ = 5/13, what is cosec θ?",
    opts: ["12/13", "13/5", "5/12", "13/12"],
    ans: 1,
    exp: "cosec θ is the reciprocal of sin θ: cosec θ = 1 / sin θ = 1 / (5/13) = 13/5."
  },
  {
    id: 9,
    level: "foundation",
    category: "aptitude",
    topic: "ratios",
    q: "If tan θ = 3/4 and θ is acute, what is cos θ?",
    opts: ["3/5", "4/5", "5/4", "4/3"],
    ans: 1,
    exp: "Opposite = 3, Adjacent = 4 → Hypotenuse = √(3² + 4²) = 5. Therefore, cos θ = Adjacent / Hypotenuse = 4/5."
  },
  {
    id: 10,
    level: "foundation",
    category: "scholarship",
    topic: "standard_angles",
    q: "What is the exact value of cos 0° - sin 90°?",
    opts: ["-1", "0", "1", "2"],
    ans: 1,
    exp: "cos 0° = 1 and sin 90° = 1. Therefore, 1 - 1 = 0."
  },
  {
    id: 11,
    level: "foundation",
    category: "fast",
    topic: "identities",
    q: "Which expression is identically equal to 1 + tan² θ?",
    opts: ["cot² θ", "cosec² θ", "sec² θ", "sin² θ"],
    ans: 2,
    exp: "Dividing sin² θ + cos² θ = 1 by cos² θ yields tan² θ + 1 = sec² θ."
  },
  {
    id: 12,
    level: "foundation",
    category: "net",
    topic: "allied_angles",
    q: "What is sin(180° - θ) equal to?",
    opts: ["-sin θ", "sin θ", "cos θ", "-cos θ"],
    ans: 1,
    exp: "180° - θ lies in Quadrant II where sine is positive and an even multiple of 90° keeps the function as sine: sin(180° - θ) = sin θ."
  },
  {
    id: 13,
    level: "foundation",
    category: "ecat",
    topic: "reference_angles",
    q: "What is the reference angle for θ = 150°?",
    opts: ["30°", "60°", "150°", "210°"],
    ans: 0,
    exp: "For an angle in Quadrant II, the reference angle α = 180° - θ = 180° - 150° = 30°."
  },
  {
    id: 14,
    level: "foundation",
    category: "aptitude",
    topic: "arc_sector",
    q: "Find the arc length of a circle with radius r = 10 cm subtended by a central angle of θ = 1.5 radians.",
    opts: ["7.5 cm", "15 cm", "30 cm", "15π cm"],
    ans: 1,
    exp: "Arc length L = r × θ (with θ in radians) = 10 cm × 1.5 rad = 15 cm."
  },
  {
    id: 15,
    level: "foundation",
    category: "scholarship",
    topic: "graphs",
    q: "What is the maximum value of the function y = 4 sin x?",
    opts: ["1", "2", "4", "8"],
    ans: 2,
    exp: "The maximum value of sin x is 1. Thus, the maximum of 4 sin x is 4 × 1 = 4."
  },
  {
    id: 16,
    level: "foundation",
    category: "fast",
    topic: "graphs",
    q: "What is the period of the basic sine function y = sin x in degrees?",
    opts: ["90°", "180°", "270°", "360°"],
    ans: 3,
    exp: "The sine wave completes one full oscillation over an interval of 360° (or 2π radians)."
  },
  {
    id: 17,
    level: "foundation",
    category: "net",
    topic: "standard_angles",
    q: "Which trigonometric function is undefined at θ = 90°?",
    opts: ["sin θ", "cos θ", "tan θ", "cosec θ"],
    ans: 2,
    exp: "tan 90° = sin 90° / cos 90° = 1 / 0, which is undefined (vertical asymptote)."
  },
  {
    id: 18,
    level: "foundation",
    category: "ecat",
    topic: "complementary",
    q: "If sin 20° = k, what is cos 70° in terms of k?",
    opts: ["k", "1 - k", "√(1 - k²)", "1/k"],
    ans: 0,
    exp: "By complementary angle identity, cos(90° - θ) = sin θ. Hence cos 70° = cos(90° - 20°) = sin 20° = k."
  },
  {
    id: 19,
    level: "foundation",
    category: "aptitude",
    topic: "heights_distances",
    q: "A 10-meter ladder leans against a vertical wall making an angle of 30° with the ground. How high up the wall does the ladder reach?",
    opts: ["5 m", "5√3 m", "10 m", "10√3 m"],
    ans: 0,
    exp: "sin 30° = Height / 10 → Height = 10 × sin 30° = 10 × (1/2) = 5 meters."
  },
  {
    id: 20,
    level: "foundation",
    category: "scholarship",
    topic: "radians",
    q: "Convert 3π/4 radians into degrees.",
    opts: ["120°", "135°", "150°", "225°"],
    ans: 1,
    exp: "Degrees = Radians × (180 / π) = (3π / 4) × (180 / π) = 3 × 45° = 135°."
  },
  {
    id: 21,
    level: "foundation",
    category: "fast",
    topic: "equations",
    q: "Find the acute angle θ satisfying 2 sin θ = 1.",
    opts: ["30°", "45°", "60°", "90°"],
    ans: 0,
    exp: "sin θ = 1/2. In the first quadrant (acute angle), θ = 30°."
  },
  {
    id: 22,
    level: "foundation",
    category: "net",
    topic: "triangles",
    q: "In right triangle ABC with right angle at C, if a = 6 and b = 8, what is hypotenuse c?",
    opts: ["10", "12", "14", "√28"],
    ans: 0,
    exp: "By Pythagorean theorem: c = √(a² + b²) = √(36 + 64) = √100 = 10."
  },
  {
    id: 23,
    level: "foundation",
    category: "ecat",
    topic: "allied_angles",
    q: "What is cos(-θ) equal to?",
    opts: ["-cos θ", "cos θ", "sin θ", "-sin θ"],
    ans: 1,
    exp: "Cosine is an even function: cos(-θ) = cos θ."
  },
  {
    id: 24,
    level: "foundation",
    category: "aptitude",
    topic: "arc_sector",
    q: "What is the area of a sector of a circle with radius r = 6 cm and central angle θ = 2 radians?",
    opts: ["12 cm²", "24 cm²", "36 cm²", "72 cm²"],
    ans: 2,
    exp: "Sector Area A = (1/2) r² θ = 0.5 × 6² × 2 = 0.5 × 36 × 2 = 36 cm²."
  },
  {
    id: 25,
    level: "foundation",
    category: "scholarship",
    topic: "identities",
    q: "Simplify: (sin θ / cos θ) × cot θ.",
    opts: ["0", "1", "tan² θ", "sin² θ"],
    ans: 1,
    exp: "sin θ / cos θ = tan θ. Then tan θ × cot θ = tan θ × (1 / tan θ) = 1."
  },
  {
    id: 26,
    level: "foundation",
    category: "fast",
    topic: "quadrants",
    q: "If sin θ > 0 and tan θ < 0, in which quadrant does θ lie?",
    opts: ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"],
    ans: 1,
    exp: "sin θ is positive in Q1 and Q2. tan θ is negative in Q2 and Q4. The intersection is Quadrant II."
  },
  {
    id: 27,
    level: "foundation",
    category: "net",
    topic: "standard_angles",
    q: "What is cos 180°?",
    opts: ["1", "0", "-1", "undefined"],
    ans: 2,
    exp: "On the unit circle, at 180°, the coordinates are (-1, 0). Thus cos 180° = -1."
  },
  {
    id: 28,
    level: "foundation",
    category: "ecat",
    topic: "triangle_rules",
    q: "For any triangle ABC, the formula for area using two sides a, b and included angle C is:",
    opts: ["ab cos C", "(1/2) ab sin C", "(1/2) ab cos C", "2 ab sin C"],
    ans: 1,
    exp: "The trigonometric formula for triangle area is Area = (1/2) ab sin C."
  },
  {
    id: 29,
    level: "foundation",
    category: "aptitude",
    topic: "identities",
    q: "Simplify: 1 - sin² θ.",
    opts: ["cos θ", "cos² θ", "sec² θ", "-cos² θ"],
    ans: 1,
    exp: "From sin² θ + cos² θ = 1, rearranging gives cos² θ = 1 - sin² θ."
  },
  {
    id: 30,
    level: "foundation",
    category: "scholarship",
    topic: "graphs",
    q: "What is the period of y = tan x in degrees?",
    opts: ["90°", "180°", "270°", "360°"],
    ans: 1,
    exp: "The tangent function repeats its cycle every 180° (or π radians), unlike sine and cosine which repeat every 360°."
  },

  // INTERMEDIATE (40 Questions)
  {
    id: 31,
    level: "intermediate",
    category: "fast",
    topic: "allied_angles",
    q: "What is the exact value of sin 150°?",
    opts: ["1/2", "-1/2", "√3/2", "-√3/2"],
    ans: 0,
    exp: "150° is in Q2 where sin is positive. Reference angle = 180° - 150° = 30°. sin 150° = +sin 30° = 1/2."
  },
  {
    id: 32,
    level: "intermediate",
    category: "net",
    topic: "allied_angles",
    q: "What is the exact value of cos 240°?",
    opts: ["1/2", "-1/2", "√3/2", "-√3/2"],
    ans: 1,
    exp: "240° is in Q3 where cos is negative. Reference angle = 240° - 180° = 60°. cos 240° = -cos 60° = -1/2."
  },
  {
    id: 33,
    level: "intermediate",
    category: "ecat",
    topic: "allied_angles",
    q: "What is tan 315°?",
    opts: ["1", "-1", "√3", "-1/√3"],
    ans: 1,
    exp: "315° is in Q4 where tan is negative. Reference angle = 360° - 315° = 45°. tan 315° = -tan 45° = -1."
  },
  {
    id: 34,
    level: "intermediate",
    category: "aptitude",
    topic: "identities",
    q: "Simplify: (1 - cos² x) / sin x.",
    opts: ["1", "cos x", "sin x", "cosec x"],
    ans: 2,
    exp: "1 - cos² x = sin² x. Therefore, sin² x / sin x = sin x."
  },
  {
    id: 35,
    level: "intermediate",
    category: "scholarship",
    topic: "identities",
    q: "Simplify: sec² x - tan² x + cosec² x - cot² x.",
    opts: ["0", "1", "2", "4"],
    ans: 2,
    exp: "Using sec² x - tan² x = 1 and cosec² x - cot² x = 1, the sum is 1 + 1 = 2."
  },
  {
    id: 36,
    level: "intermediate",
    category: "fast",
    topic: "equations",
    q: "How many solutions does sin x = 1/2 have in the interval [0°, 360°]?",
    opts: ["1", "2", "3", "4"],
    ans: 1,
    exp: "sin x is positive in Quadrants I and II. The solutions are x = 30° and x = 180° - 30° = 150° (2 solutions)."
  },
  {
    id: 37,
    level: "intermediate",
    category: "net",
    topic: "equations",
    q: "Solve for x in [0°, 360°]: cos x = -√3/2.",
    opts: ["30° and 330°", "150° and 210°", "120° and 240°", "60° and 300°"],
    ans: 1,
    exp: "Reference angle where cos α = √3/2 is 30°. Cosine is negative in Q2 and Q3 → Q2: 180° - 30° = 150°, Q3: 180° + 30° = 210°."
  },
  {
    id: 38,
    level: "intermediate",
    category: "ecat",
    topic: "sine_rule",
    q: "In triangle ABC, a = 10, angle A = 30°, and angle B = 45°. Find side b.",
    opts: ["5√2", "10√2", "10/√2", "20"],
    ans: 1,
    exp: "By Sine Rule: b / sin B = a / sin A → b = (10 × sin 45°) / sin 30° = (10 × (1/√2)) / (1/2) = 20 / √2 = 10√2."
  },
  {
    id: 39,
    level: "intermediate",
    category: "aptitude",
    topic: "cosine_rule",
    q: "In triangle ABC, a = 5, b = 7, and angle C = 60°. What is side c?",
    opts: ["√39", "√44", "√64", "√74"],
    ans: 0,
    exp: "c² = a² + b² - 2ab cos C = 25 + 49 - 2(5)(7) cos 60° = 74 - 70(1/2) = 74 - 35 = 39. Thus c = √39."
  },
  {
    id: 40,
    level: "intermediate",
    category: "scholarship",
    topic: "triangle_area",
    q: "Find the area of triangle ABC if a = 8 cm, b = 6 cm, and angle C = 30°.",
    opts: ["12 cm²", "24 cm²", "24√3 cm²", "48 cm²"],
    ans: 0,
    exp: "Area = (1/2) a b sin C = (1/2) × 8 × 6 × sin 30° = 24 × (1/2) = 12 cm²."
  },
  {
    id: 41,
    level: "intermediate",
    category: "fast",
    topic: "graphs",
    q: "What is the period of the function y = sin(4x)?",
    opts: ["π/4", "π/2", "π", "2π"],
    ans: 1,
    exp: "Period = 2π / |B| = 2π / 4 = π/2 radians (or 90°)."
  },
  {
    id: 42,
    level: "intermediate",
    category: "net",
    topic: "graphs",
    q: "What is the amplitude and period of y = -3 cos(2x)?",
    opts: ["Amplitude = -3, Period = π", "Amplitude = 3, Period = π", "Amplitude = 3, Period = 2π", "Amplitude = -3, Period = 4π"],
    ans: 1,
    exp: "Amplitude is always non-negative: |A| = |-3| = 3. Period = 2π / B = 2π / 2 = π."
  },
  {
    id: 43,
    level: "intermediate",
    category: "ecat",
    topic: "heights_distances",
    q: "The angle of elevation of the top of a tower from a point 50 m from its base is 45°. Find the height of the tower.",
    opts: ["25 m", "50 m", "50√3 m", "100 m"],
    ans: 1,
    exp: "tan 45° = Height / 50 → 1 = Height / 50 → Height = 50 m."
  },
  {
    id: 44,
    level: "intermediate",
    category: "aptitude",
    topic: "heights_distances",
    q: "From the top of a 30 m cliff, the angle of depression of a boat on the water is 30°. How far is the boat from the base of the cliff?",
    opts: ["30 m", "30√3 m", "60 m", "15√3 m"],
    ans: 1,
    exp: "tan 30° = 30 / Distance → 1/√3 = 30 / Distance → Distance = 30√3 m."
  },
  {
    id: 45,
    level: "intermediate",
    category: "scholarship",
    topic: "identities",
    q: "Simplify: (sin x / (1 + cos x)) + ((1 + cos x) / sin x).",
    opts: ["2 sin x", "2 cos x", "2 cosec x", "2 sec x"],
    ans: 2,
    exp: "[sin² x + (1 + cos x)²] / [sin x (1 + cos x)] = [sin² x + 1 + 2 cos x + cos² x] / [sin x (1 + cos x)] = [2 + 2 cos x] / [sin x (1 + cos x)] = 2(1 + cos x) / [sin x (1 + cos x)] = 2 / sin x = 2 cosec x."
  },
  {
    id: 46,
    level: "intermediate",
    category: "fast",
    topic: "identities",
    q: "If sec θ + tan θ = 3, what is the value of sec θ - tan θ?",
    opts: ["3", "-3", "1/3", "-1/3"],
    ans: 2,
    exp: "Since sec² θ - tan² θ = 1, (sec θ + tan θ)(sec θ - tan θ) = 1. Thus sec θ - tan θ = 1 / (sec θ + tan θ) = 1/3."
  },
  {
    id: 47,
    level: "intermediate",
    category: "net",
    topic: "allied_angles",
    q: "Evaluate: sin(270° - θ).",
    opts: ["cos θ", "-cos θ", "sin θ", "-sin θ"],
    ans: 1,
    exp: "270° is an odd multiple of 90°, so sine changes to cosine. 270° - θ lies in Q3 where sine is negative. Thus sin(270° - θ) = -cos θ."
  },
  {
    id: 48,
    level: "intermediate",
    category: "ecat",
    topic: "allied_angles",
    q: "Evaluate: tan(180° + θ).",
    opts: ["tan θ", "-tan θ", "cot θ", "-cot θ"],
    ans: 0,
    exp: "180° + θ is in Quadrant III where tangent is positive and an even multiple of 90° keeps the function tangent: tan(180° + θ) = tan θ."
  },
  {
    id: 49,
    level: "intermediate",
    category: "aptitude",
    topic: "equations",
    q: "Find the general solution of sin x = 0.",
    opts: ["x = 2nπ", "x = nπ", "x = (2n + 1)π/2", "x = nπ/2"],
    ans: 1,
    exp: "sin x = 0 at 0, π, 2π, 3π, ... and all negative multiples. In general, x = nπ for any integer n."
  },
  {
    id: 50,
    level: "intermediate",
    category: "scholarship",
    topic: "equations",
    q: "Find the general solution of cos x = 0.",
    opts: ["x = nπ", "x = (2n + 1)π/2", "x = 2nπ", "x = (2n + 1)π"],
    ans: 1,
    exp: "cos x = 0 at odd multiples of π/2 (i.e. ±π/2, ±3π/2, ...), which is represented by x = (2n + 1)π/2 for integer n."
  },
  {
    id: 51,
    level: "intermediate",
    category: "fast",
    topic: "ratios",
    q: "If cos θ = -3/5 and θ is in Quadrant II, find tan θ.",
    opts: ["4/3", "-4/3", "3/4", "-3/4"],
    ans: 1,
    exp: "Adjacent = -3, Hypotenuse = 5 → Opposite = √(5² - (-3)²) = 4. tan θ = Opposite / Adjacent = 4 / (-3) = -4/3."
  },
  {
    id: 52,
    level: "intermediate",
    category: "net",
    topic: "arc_sector",
    q: "A pendulum of length 50 cm swings through an angle of 18°. Find the length of the arc its bob describes (take π ≈ 3.1416).",
    opts: ["5π cm", "15.7 cm", "31.4 cm", "7.85 cm"],
    ans: 0,
    exp: "18° in radians = 18 × (π/180) = π/10 rad. Arc length L = r θ = 50 × (π/10) = 5π cm (≈ 15.71 cm)."
  },
  {
    id: 53,
    level: "intermediate",
    category: "ecat",
    topic: "cosine_rule",
    q: "In a triangle with sides a = 3, b = 5, and c = 7, find the angle C.",
    opts: ["60°", "90°", "120°", "150°"],
    ans: 2,
    exp: "cos C = (a² + b² - c²) / (2ab) = (9 + 25 - 49) / (2 × 3 × 5) = -15 / 30 = -1/2. Therefore C = 180° - 60° = 120°."
  },
  {
    id: 54,
    level: "intermediate",
    category: "aptitude",
    topic: "identities",
    q: "If sin x + cosec x = 2, what is sin² x + cosec² x?",
    opts: ["1", "2", "4", "8"],
    ans: 1,
    exp: "Square both sides: (sin x + cosec x)² = 2² → sin² x + cosec² x + 2 sin x cosec x = 4. Since sin x cosec x = 1, sin² x + cosec² x + 2 = 4 → sin² x + cosec² x = 2."
  },
  {
    id: 55,
    level: "intermediate",
    category: "scholarship",
    topic: "quadrants",
    q: "If cot θ = -5/12 and sin θ > 0, find sec θ.",
    opts: ["13/12", "-13/5", "13/5", "-13/12"],
    ans: 1,
    exp: "cot θ < 0 and sin θ > 0 means θ is in Quadrant II. Opposite = 12, Adjacent = -5, Hypotenuse = 13. sec θ = Hypotenuse / Adjacent = 13 / (-5) = -13/5."
  },
  {
    id: 56,
    level: "intermediate",
    category: "fast",
    topic: "identities",
    q: "Simplify: (cos x / (1 - sin x)) - tan x.",
    opts: ["0", "sec x", "sin x", "cos x"],
    ans: 1,
    exp: "cos x / (1 - sin x) = cos x (1 + sin x) / cos² x = (1 + sin x) / cos x = sec x + tan x. Subtracting tan x gives sec x."
  },
  {
    id: 57,
    level: "intermediate",
    category: "net",
    topic: "graphs",
    q: "Where does the graph of y = tan x have its first positive vertical asymptote?",
    opts: ["x = π/4", "x = π/2", "x = π", "x = 3π/2"],
    ans: 1,
    exp: "tan x = sin x / cos x is undefined whenever cos x = 0. The first positive zero of cos x is at x = π/2 (90°)."
  },
  {
    id: 58,
    level: "intermediate",
    category: "ecat",
    topic: "sine_rule",
    q: "In triangle ABC, if a = 4, b = 4, and angle A = 30°, what is angle B?",
    opts: ["30°", "60°", "90°", "120°"],
    ans: 0,
    exp: "Since sides a and b are equal (a = b = 4), triangle ABC is isosceles, meaning angle B = angle A = 30°."
  },
  {
    id: 59,
    level: "intermediate",
    category: "aptitude",
    topic: "equations",
    q: "Solve 2 cos² x - 1 = 0 for acute angle x.",
    opts: ["30°", "45°", "60°", "90°"],
    ans: 1,
    exp: "2 cos² x = 1 → cos² x = 1/2 → cos x = 1/√2 (for acute angle x). Thus x = 45°."
  },
  {
    id: 60,
    level: "intermediate",
    category: "scholarship",
    topic: "allied_angles",
    q: "Evaluate: cos 300° + sin 210°.",
    opts: ["0", "1", "-1", "√3"],
    ans: 0,
    exp: "cos 300° (Q4) = +cos(360° - 300°) = +cos 60° = 1/2. sin 210° (Q3) = -sin(210° - 180°) = -sin 30° = -1/2. Sum = 1/2 + (-1/2) = 0."
  },
  {
    id: 61,
    level: "intermediate",
    category: "fast",
    topic: "arc_sector",
    q: "If the radius of a circle is doubled and the central angle is halved, the area of the sector is:",
    opts: ["Halved", "Unchanged", "Doubled", "Quadrupled"],
    ans: 2,
    exp: "Original Area = (1/2) r² θ. New Area = (1/2) (2r)² (θ/2) = (1/2) (4r²) (θ/2) = 2 × [(1/2) r² θ] (Doubled)."
  },
  {
    id: 62,
    level: "intermediate",
    category: "net",
    topic: "heights_distances",
    q: "A person standing at a distance d from a tower observes its top at 30°. Walking 20 m closer, the angle becomes 60°. Find the height of the tower.",
    opts: ["10 m", "10√3 m", "20 m", "20√3 m"],
    ans: 1,
    exp: "Let height be h. d = h cot 30° = h√3. d - 20 = h cot 60° = h/√3. Subtracting: 20 = h(√3 - 1/√3) = h(2/√3) → h = 10√3 m."
  },
  {
    id: 63,
    level: "intermediate",
    category: "ecat",
    topic: "identities",
    q: "Simplify: (1 - tan² x) / (1 + tan² x).",
    opts: ["sin 2x", "cos 2x", "tan 2x", "sec 2x"],
    ans: 1,
    exp: "Substitute tan x = sin x / cos x: (1 - sin² x/cos² x) / (1 + sin² x/cos² x) = (cos² x - sin² x) / (cos² x + sin² x) = cos² x - sin² x = cos 2x."
  },
  {
    id: 64,
    level: "intermediate",
    category: "aptitude",
    topic: "equations",
    q: "The number of solutions of tan² x = 3 in [0, 2π] is:",
    opts: ["1", "2", "3", "4"],
    ans: 3,
    exp: "tan x = ±√3. tan x = √3 has 2 solutions (Q1, Q3: π/3, 4π/3) and tan x = -√3 has 2 solutions (Q2, Q4: 2π/3, 5π/3). Total = 4 solutions."
  },
  {
    id: 65,
    level: "intermediate",
    category: "scholarship",
    topic: "standard_angles",
    q: "Evaluate: sin² 30° + sin² 45° + sin² 60°.",
    opts: ["1", "3/2", "2", "5/4"],
    ans: 1,
    exp: "(1/2)² + (1/√2)² + (√3/2)² = 1/4 + 1/2 + 3/4 = 1/4 + 2/4 + 3/4 = 6/4 = 3/2."
  },
  {
    id: 66,
    level: "intermediate",
    category: "fast",
    topic: "allied_angles",
    q: "Evaluate: cos(90° + θ) + sin(180° + θ).",
    opts: ["0", "-2 sin θ", "2 cos θ", "-2 cos θ"],
    ans: 1,
    exp: "cos(90° + θ) = -sin θ. sin(180° + θ) = -sin θ. Sum = -sin θ - sin θ = -2 sin θ."
  },
  {
    id: 67,
    level: "intermediate",
    category: "net",
    topic: "identities",
    q: "If cos x + sec x = 3, find cos² x + sec² x.",
    opts: ["7", "9", "11", "6"],
    ans: 0,
    exp: "Square both sides: (cos x + sec x)² = 9 → cos² x + sec² x + 2 = 9 → cos² x + sec² x = 7."
  },
  {
    id: 68,
    level: "intermediate",
    category: "ecat",
    topic: "triangle_rules",
    q: "In an equilateral triangle with side length 6 cm, the area is:",
    opts: ["9 cm²", "9√3 cm²", "18 cm²", "18√3 cm²"],
    ans: 1,
    exp: "Area = (1/2) × 6 × 6 × sin 60° = 18 × (√3/2) = 9√3 cm²."
  },
  {
    id: 69,
    level: "intermediate",
    category: "aptitude",
    topic: "radians",
    q: "The angle between the hour hand and minute hand of a clock at 3:30 is:",
    opts: ["75°", "80°", "85°", "90°"],
    ans: 0,
    exp: "At 3:30, minute hand is at 180°. Hour hand is at 3 × 30° + 30 × 0.5° = 90° + 15° = 105°. Angle = 180° - 105° = 75°."
  },
  {
    id: 70,
    level: "intermediate",
    category: "scholarship",
    topic: "graphs",
    q: "The range of the function f(x) = 2 - 3 sin x is:",
    opts: ["[-3, 3]", "[-1, 5]", "[-5, 1]", "[2, 5]"],
    ans: 1,
    exp: "Since -1 ≤ sin x ≤ 1, multiplying by -3 gives -3 ≤ -3 sin x ≤ 3. Adding 2 gives 2 - 3 ≤ 2 - 3 sin x ≤ 2 + 3 → [-1, 5]."
  },

  // UNIVERSITY ENTRY LEVEL (50 Questions)
  {
    id: 71,
    level: "entry",
    category: "fast",
    topic: "identities",
    q: "If tan θ + cot θ = 4, what is the value of tan⁴ θ + cot⁴ θ?",
    opts: ["194", "196", "192", "200"],
    ans: 0,
    exp: "(tan θ + cot θ)² = 16 → tan² θ + cot² θ + 2 = 16 → tan² θ + cot² θ = 14. Squaring again: (tan² θ + cot² θ)² = 14² → tan⁴ θ + cot⁴ θ + 2 = 196 → tan⁴ θ + cot⁴ θ = 194."
  },
  {
    id: 72,
    level: "entry",
    category: "net",
    topic: "equations",
    q: "Find all solutions of 2 sin² x - 3 sin x + 1 = 0 in [0, 2π].",
    opts: ["π/6, 5π/6, π/2", "π/3, 2π/3, π/2", "π/6, π/2", "π/4, 3π/4, π/2"],
    ans: 0,
    exp: "Factor: (2 sin x - 1)(sin x - 1) = 0. So sin x = 1/2 or sin x = 1. In [0, 2π]: sin x = 1/2 gives x = π/6, 5π/6; sin x = 1 gives x = π/2. Solutions: {π/6, 5π/6, π/2}."
  },
  {
    id: 73,
    level: "entry",
    category: "ecat",
    topic: "allied_angles",
    q: "Evaluate the product: tan 1° · tan 2° · tan 3° · ... · tan 89°.",
    opts: ["0", "1", "√3", "undefined"],
    ans: 1,
    exp: "Pair complementary terms: tan 1° · tan 89° = tan 1° · cot 1° = 1. All 44 pairs equal 1, and the middle term tan 45° = 1. Hence total product = 1."
  },
  {
    id: 74,
    level: "entry",
    category: "aptitude",
    topic: "allied_angles",
    q: "Evaluate: cos 1° + cos 2° + cos 3° + ... + cos 179°.",
    opts: ["0", "1", "-1", "89.5"],
    ans: 0,
    exp: "Pair terms: cos 1° + cos 179° = cos 1° + cos(180° - 1°) = cos 1° - cos 1° = 0. All pairs cancel to 0, and the middle term cos 90° = 0. Total sum = 0."
  },
  {
    id: 75,
    level: "entry",
    category: "scholarship",
    topic: "cosine_rule",
    q: "In a triangle ABC, if a : b : c = 4 : 5 : 6, what is cos C?",
    opts: ["1/8", "9/16", "1/4", "3/8"],
    ans: 0,
    exp: "cos C = (a² + b² - c²) / (2ab) = (16 + 25 - 36) / (2 × 4 × 5) = 5 / 40 = 1/8."
  },
  {
    id: 76,
    level: "entry",
    category: "fast",
    topic: "sine_rule",
    q: "In triangle ABC, if a = 2, b = 3, and sin A = 2/3, find angle B.",
    opts: ["30°", "45°", "60°", "90°"],
    ans: 3,
    exp: "By Sine Rule: sin B / b = sin A / a → sin B = 3 × (2/3) / 2 = 2 / 2 = 1. Therefore angle B = 90°."
  },
  {
    id: 77,
    level: "entry",
    category: "net",
    topic: "graphs",
    q: "What is the maximum value of the function f(x) = 3 sin x + 4 cos x?",
    opts: ["5", "7", "1", "25"],
    ans: 0,
    exp: "For any expression a sin x + b cos x, the maximum value is √(a² + b²) = √(3² + 4²) = √25 = 5."
  },
  {
    id: 78,
    level: "entry",
    category: "ecat",
    topic: "graphs",
    q: "What is the minimum value of f(x) = 5 sin x - 12 cos x + 3?",
    opts: ["-10", "-13", "-16", "-12"],
    ans: 0,
    exp: "The minimum of 5 sin x - 12 cos x is -√(5² + 12²) = -13. Adding 3 gives -13 + 3 = -10."
  },
  {
    id: 79,
    level: "entry",
    category: "aptitude",
    topic: "identities",
    q: "If sin x - cos x = 1/2, find the value of sin 2x (which equals 2 sin x cos x).",
    opts: ["3/4", "1/4", "7/8", "3/8"],
    ans: 0,
    exp: "Square both sides: (sin x - cos x)² = (1/2)² → sin² x + cos² x - 2 sin x cos x = 1/4 → 1 - 2 sin x cos x = 1/4 → 2 sin x cos x = 3/4."
  },
  {
    id: 80,
    level: "entry",
    category: "scholarship",
    topic: "heights_distances",
    q: "A flagstaff of height h stands on top of a building of height H. From a point on the ground, the angles of elevation of the top and bottom of the flagstaff are α and β respectively. Then H is equal to:",
    opts: ["h tan β / (tan α - tan β)", "h tan α / (tan α - tan β)", "h / (tan α - tan β)", "h (tan α - tan β)"],
    ans: 0,
    exp: "Let distance be x. tan β = H / x → x = H cot β. tan α = (H + h) / x → H + h = x tan α = H cot β tan α = H (tan α / tan β). Thus h = H (tan α / tan β - 1) = H (tan α - tan β) / tan β → H = h tan β / (tan α - tan β)."
  },
  {
    id: 81,
    level: "entry",
    category: "fast",
    topic: "identities",
    q: "If sec θ + tan θ = p, what is the value of sin θ in terms of p?",
    opts: ["(p² - 1)/(p² + 1)", "(p² + 1)/(p² - 1)", "2p/(p² + 1)", "(p - 1)/(p + 1)"],
    ans: 0,
    exp: "sec θ + tan θ = p and sec θ - tan θ = 1/p. Adding: 2 sec θ = p + 1/p = (p² + 1)/p → sec θ = (p² + 1)/(2p). Subtracting: 2 tan θ = (p² - 1)/p → tan θ = (p² - 1)/(2p). sin θ = tan θ / sec θ = (p² - 1) / (p² + 1)."
  },
  {
    id: 82,
    level: "entry",
    category: "net",
    topic: "equations",
    q: "The number of real solutions of the equation sin(eˣ) = 5ˣ + 5⁻ˣ is:",
    opts: ["0", "1", "2", "Infinitely many"],
    ans: 0,
    exp: "By AM-GM inequality, 5ˣ + 5⁻ˣ ≥ 2 for all real x. However, the maximum possible value of sin(eˣ) is 1. Since 1 < 2, the LHS is always strictly less than the RHS. Hence, 0 solutions exist."
  },
  {
    id: 83,
    level: "entry",
    category: "ecat",
    topic: "allied_angles",
    q: "Evaluate: sin² 5° + sin² 10° + sin² 15° + ... + sin² 90°.",
    opts: ["9", "9.5", "10", "18"],
    ans: 1,
    exp: "There are 18 terms. Pair sin² 5° + sin² 85° = sin² 5° + cos² 5° = 1. There are 8 such pairs (= 8). The remaining terms are sin² 45° = (1/√2)² = 1/2 and sin² 90° = 1. Total = 8 + 0.5 + 1 = 9.5."
  },
  {
    id: 84,
    level: "entry",
    category: "aptitude",
    topic: "triangle_rules",
    q: "If the sides of a triangle are in the ratio 1 : √3 : 2, the angles of the triangle are in the ratio:",
    opts: ["1 : 2 : 3", "1 : 1 : 2", "1 : 3 : 5", "2 : 3 : 4"],
    ans: 0,
    exp: "The sides 1, √3, 2 satisfy 1² + (√3)² = 1 + 3 = 4 = 2², so it is a 30°-60°-90° right triangle. The ratio of angles is 30° : 60° : 90° = 1 : 2 : 3."
  },
  {
    id: 85,
    level: "entry",
    category: "scholarship",
    topic: "arc_sector",
    q: "A wire of length 24 cm is bent to form a sector of a circle. What radius r maximizes the area of the sector?",
    opts: ["4 cm", "6 cm", "8 cm", "12 cm"],
    ans: 1,
    exp: "Perimeter P = 2r + L = 24 → L = 24 - 2r. Sector Area A = (1/2) r L = (1/2) r (24 - 2r) = 12r - r². This quadratic is maximized at r = -b / (2a) = -12 / (2 × -1) = 6 cm."
  },
  {
    id: 86,
    level: "entry",
    category: "fast",
    topic: "identities",
    q: "Simplify: (1 + cot x - cosec x)(1 + tan x + sec x).",
    opts: ["1", "2", "-1", "0"],
    ans: 1,
    exp: "Convert to sin and cos: [(sin x + cos x - 1)/sin x] · [(cos x + sin x + 1)/cos x] = [(sin x + cos x)² - 1] / (sin x cos x) = [1 + 2 sin x cos x - 1] / (sin x cos x) = 2 sin x cos x / sin x cos x = 2."
  },
  {
    id: 87,
    level: "entry",
    category: "net",
    topic: "equations",
    q: "If cos x + cos² x = 1, then the value of sin² x + sin⁴ x is:",
    opts: ["0", "1", "2", "-1"],
    ans: 1,
    exp: "cos x = 1 - cos² x = sin² x. Squaring both sides: cos² x = sin⁴ x. Now, sin² x + sin⁴ x = sin² x + cos² x = 1."
  },
  {
    id: 88,
    level: "entry",
    category: "ecat",
    topic: "general_solutions",
    q: "The general solution of tan 3x = 1 is:",
    opts: ["nπ/3 + π/12", "nπ + π/4", "2nπ/3 + π/12", "nπ/3 + π/4"],
    ans: 0,
    exp: "tan 3x = 1 = tan(π/4) → 3x = nπ + π/4 → x = nπ/3 + π/12, where n is an integer."
  },
  {
    id: 89,
    level: "entry",
    category: "aptitude",
    topic: "triangle_rules",
    q: "In any triangle ABC, the value of a(sin B - sin C) + b(sin C - sin A) + c(sin A - sin B) is:",
    opts: ["0", "1", "abc", "a + b + c"],
    ans: 0,
    exp: "By Sine Rule, a = 2R sin A, b = 2R sin B, c = 2R sin C. The expression becomes 2R [sin A sin B - sin A sin C + sin B sin C - sin B sin A + sin C sin A - sin C sin B] = 2R(0) = 0."
  },
  {
    id: 90,
    level: "entry",
    category: "scholarship",
    topic: "graphs",
    q: "What is the period of the function f(x) = |sin x|?",
    opts: ["π/2", "π", "2π", "4π"],
    ans: 1,
    exp: "The standard sine wave has period 2π with positive and negative half-cycles. Taking absolute value reflects negative loops above the axis, cutting the period in half to π."
  },
  {
    id: 91,
    level: "entry",
    category: "fast",
    topic: "identities",
    q: "If x = a cos θ and y = b sin θ, what is the equation eliminating θ?",
    opts: ["x² + y² = a² + b²", "x²/a² + y²/b² = 1", "x²/a² - y²/b² = 1", "xy = ab"],
    ans: 1,
    exp: "cos θ = x/a and sin θ = y/b. Since cos² θ + sin² θ = 1, (x/a)² + (y/b)² = 1 → x²/a² + y²/b² = 1 (an ellipse)."
  },
  {
    id: 92,
    level: "entry",
    category: "net",
    topic: "identities",
    q: "If x = a sec θ and y = b tan θ, eliminating θ gives:",
    opts: ["x²/a² + y²/b² = 1", "x²/a² - y²/b² = 1", "y²/b² - x²/a² = 1", "x² + y² = a²b²"],
    ans: 1,
    exp: "sec θ = x/a and tan θ = y/b. Using sec² θ - tan² θ = 1 gives x²/a² - y²/b² = 1 (a hyperbola)."
  },
  {
    id: 93,
    level: "entry",
    category: "ecat",
    topic: "equations",
    q: "The number of solutions of sin x = x/10 is:",
    opts: ["3", "5", "7", "9"],
    ans: 2,
    exp: "Since -1 ≤ sin x ≤ 1, solutions must satisfy -1 ≤ x/10 ≤ 1 → -10 ≤ x ≤ 10. Note 10 ≈ 3.18π. In [0, 10], the line y = x/10 intersects y = sin x at x = 0, and at 3 positive points (two in [0, π] and one in [2π, 3π]). By symmetry, there are 3 negative solutions. Total = 3 + 1 + 3 = 7 solutions."
  },
  {
    id: 94,
    level: "entry",
    category: "aptitude",
    topic: "heights_distances",
    q: "Two poles of height 16 m and 9 m stand vertically on a plane ground. If the angles of elevation of their tops from the base of each other are complementary, find the distance between the poles.",
    opts: ["12 m", "144 m", "25 m", "15 m"],
    ans: 0,
    exp: "Let distance be d. tan θ = 16/d and tan(90° - θ) = cot θ = 9/d. Multiplying: tan θ · cot θ = (16/d)(9/d) → 1 = 144 / d² → d² = 144 → d = 12 m."
  },
  {
    id: 95,
    level: "entry",
    category: "scholarship",
    topic: "cosine_rule",
    q: "In triangle ABC, if (a + b + c)(a + b - c) = 3ab, find the measure of angle C.",
    opts: ["30°", "45°", "60°", "120°"],
    ans: 2,
    exp: "Expand: (a + b)² - c² = 3ab → a² + b² + 2ab - c² = 3ab → a² + b² - c² = ab. By Cosine Rule: cos C = (a² + b² - c²) / (2ab) = ab / (2ab) = 1/2. Thus C = 60°."
  },
  {
    id: 96,
    level: "entry",
    category: "fast",
    topic: "identities",
    q: "Evaluate: (1 + tan 15°) / (1 - tan 15°).",
    opts: ["1", "√3", "1/√3", "2"],
    ans: 1,
    exp: "(tan 45° + tan 15°) / (1 - tan 45° tan 15°) = tan(45° + 15°) = tan 60° = √3."
  },
  {
    id: 97,
    level: "entry",
    category: "net",
    topic: "identities",
    q: "Evaluate: (1 - tan 15°) / (1 + tan 15°).",
    opts: ["1/√3", "√3", "1", "1/2"],
    ans: 0,
    exp: "tan(45° - 15°) = tan 30° = 1/√3."
  },
  {
    id: 98,
    level: "entry",
    category: "ecat",
    topic: "graphs",
    q: "The phase shift of the wave y = 3 sin(2x - π/3) is:",
    opts: ["π/3 units right", "π/6 units right", "π/6 units left", "2π/3 units right"],
    ans: 1,
    exp: "Rewrite in standard form: y = 3 sin[2(x - π/6)]. The phase shift is C / B = (π/3) / 2 = π/6 units to the right."
  },
  {
    id: 99,
    level: "entry",
    category: "aptitude",
    topic: "equations",
    q: "Find the smallest positive root of tan x = cot x.",
    opts: ["π/6", "π/4", "π/3", "π/2"],
    ans: 1,
    exp: "tan x = 1 / tan x → tan² x = 1 → tan x = 1 (for smallest positive angle). Thus x = π/4 (45°)."
  },
  {
    id: 100,
    level: "entry",
    category: "scholarship",
    topic: "allied_angles",
    q: "If A + B = 45°, then (1 + tan A)(1 + tan B) equals:",
    opts: ["1", "2", "3", "4"],
    ans: 1,
    exp: "tan(A + B) = tan 45° = 1 → (tan A + tan B) / (1 - tan A tan B) = 1 → tan A + tan B = 1 - tan A tan B → tan A + tan B + tan A tan B = 1. Adding 1 to both sides: 1 + tan A + tan B + tan A tan B = 2 → (1 + tan A)(1 + tan B) = 2."
  },
  {
    id: 101,
    level: "entry",
    category: "fast",
    topic: "triangle_rules",
    q: "In triangle ABC, if a = 3, b = 4, and c = 5, what is the inradius r of the triangle?",
    opts: ["1", "1.5", "2", "2.5"],
    ans: 0,
    exp: "Semi-perimeter s = (3 + 4 + 5) / 2 = 6. Area Δ = (1/2) × 3 × 4 = 6. Inradius r = Δ / s = 6 / 6 = 1."
  },
  {
    id: 102,
    level: "entry",
    category: "net",
    topic: "triangle_rules",
    q: "In triangle ABC, if a = 3, b = 4, and c = 5, what is the circumradius R?",
    opts: ["2", "2.5", "3", "5"],
    ans: 1,
    exp: "For any right-angled triangle, the circumradius R equals half the hypotenuse: R = c / 2 = 5 / 2 = 2.5."
  },
  {
    id: 103,
    level: "entry",
    category: "ecat",
    topic: "identities",
    q: "Simplify: cos⁴ x - sin⁴ x.",
    opts: ["1", "cos 2x", "sin 2x", "cos² x"],
    ans: 1,
    exp: "(cos² x - sin² x)(cos² x + sin² x) = (cos² x - sin² x)(1) = cos 2x."
  },
  {
    id: 104,
    level: "entry",
    category: "aptitude",
    topic: "radians",
    q: "A wheel makes 360 revolutions in one minute. Through how many radians does it turn in one second?",
    opts: ["6π rad", "12π rad", "24π rad", "36π rad"],
    ans: 1,
    exp: "Revolutions per second = 360 / 60 = 6 rev/s. 1 revolution = 2π radians. Radians per second = 6 × 2π = 12π rad."
  },
  {
    id: 105,
    level: "entry",
    category: "scholarship",
    topic: "equations",
    q: "Solve for x in [0, 2π]: sin x = cos x.",
    opts: ["π/4, 3π/4", "π/4, 5π/4", "3π/4, 7π/4", "π/4, 7π/4"],
    ans: 1,
    exp: "Divide by cos x: tan x = 1. In [0, 2π], tangent is positive in Q1 (π/4) and Q3 (π + π/4 = 5π/4)."
  },
  {
    id: 106,
    level: "entry",
    category: "fast",
    topic: "identities",
    q: "If tan θ = a/b, evaluate (a sin θ - b cos θ) / (a sin θ + b cos θ).",
    opts: ["(a² - b²)/(a² + b²)", "(a² + b²)/(a² - b²)", "a/b", "b/a"],
    ans: 0,
    exp: "Divide numerator and denominator by cos θ: (a tan θ - b) / (a tan θ + b) = (a(a/b) - b) / (a(a/b) + b) = (a²/b - b) / (a²/b + b) = (a² - b²) / (a² + b²)."
  },
  {
    id: 107,
    level: "entry",
    category: "net",
    topic: "identities",
    q: "Evaluate: (sec A + tan A - 1) / (tan A - sec A + 1).",
    opts: ["sec A + tan A", "sec A - tan A", "cosec A + cot A", "1"],
    ans: 0,
    exp: "Substitute 1 = sec² A - tan² A in numerator: [sec A + tan A - (sec A - tan A)(sec A + tan A)] / (tan A - sec A + 1) = (sec A + tan A)[1 - sec A + tan A] / [tan A - sec A + 1] = sec A + tan A."
  },
  {
    id: 108,
    level: "entry",
    category: "ecat",
    topic: "allied_angles",
    q: "Find the value of cos 20° + cos 100° + cos 140°.",
    opts: ["0", "1/2", "-1/2", "1"],
    ans: 0,
    exp: "cos 100° + cos 140° = 2 cos 120° cos 20° = 2(-1/2) cos 20° = -cos 20°. Adding cos 20° gives cos 20° - cos 20° = 0."
  },
  {
    id: 109,
    level: "entry",
    category: "aptitude",
    topic: "heights_distances",
    q: "The shadow of a vertical tower on level ground increases by 10 meters when the altitude of the sun changes from 45° to 30°. Find the height of the tower.",
    opts: ["5(√3 + 1) m", "10(√3 + 1) m", "5(√3 - 1) m", "10√3 m"],
    ans: 0,
    exp: "Let height be h. At 45°, shadow = h cot 45° = h. At 30°, shadow = h cot 30° = h√3. Difference = h√3 - h = 10 → h(√3 - 1) = 10 → h = 10 / (√3 - 1) = 10(√3 + 1) / 2 = 5(√3 + 1) m."
  },
  {
    id: 110,
    level: "entry",
    category: "scholarship",
    topic: "general_solutions",
    q: "The general solution of the trigonometric equation cos θ = -1 is:",
    opts: ["(2n + 1)π", "2nπ", "nπ", "2nπ ± π/2"],
    ans: 0,
    exp: "cos θ = -1 at π, 3π, 5π, -π, ... i.e., all odd integer multiples of π: θ = (2n + 1)π."
  },
  {
    id: 111,
    level: "entry",
    category: "fast",
    topic: "identities",
    q: "If cosec θ - cot θ = q, then cosec θ + cot θ equals:",
    opts: ["q", "-q", "1/q", "-1/q"],
    ans: 2,
    exp: "Since cosec² θ - cot² θ = 1, (cosec θ - cot θ)(cosec θ + cot θ) = 1 → cosec θ + cot θ = 1/q."
  },
  {
    id: 112,
    level: "entry",
    category: "net",
    topic: "graphs",
    q: "The vertical line test shows that y = tan x is periodic. Its vertical asymptotes occur at x = :",
    opts: ["nπ", "(2n + 1)π/2", "2nπ", "nπ/4"],
    ans: 1,
    exp: "tan x = sin x / cos x is undefined where cos x = 0, which occurs at odd multiples of π/2: x = (2n + 1)π/2."
  },
  {
    id: 113,
    level: "entry",
    category: "ecat",
    topic: "allied_angles",
    q: "Evaluate: tan 20° + tan 40° + √3 tan 20° tan 40°.",
    opts: ["1", "√3", "1/√3", "2"],
    ans: 1,
    exp: "tan(20° + 40°) = tan 60° = √3 → (tan 20° + tan 40°) / (1 - tan 20° tan 40°) = √3 → tan 20° + tan 40° = √3 - √3 tan 20° tan 40°. Rearranging gives tan 20° + tan 40° + √3 tan 20° tan 40° = √3."
  },
  {
    id: 114,
    level: "entry",
    category: "aptitude",
    topic: "triangle_rules",
    q: "In a triangle ABC, if a = 7, b = 8, and c = 9, what is the area of the triangle?",
    opts: ["12√5", "14√5", "16√5", "24√5"],
    ans: 0,
    exp: "Semi-perimeter s = (7 + 8 + 9)/2 = 12. By Heron's formula: Area = √[s(s-a)(s-b)(s-c)] = √[12(5)(4)(3)] = √[720] = √(144 × 5) = 12√5."
  },
  {
    id: 115,
    level: "entry",
    category: "scholarship",
    topic: "equations",
    q: "If 0 ≤ x ≤ π, solve 4 cos² x - 3 = 0.",
    opts: ["π/6 only", "π/6 and 5π/6", "π/3 and 2π/3", "π/4 and 3π/4"],
    ans: 1,
    exp: "cos² x = 3/4 → cos x = ±√3/2. For 0 ≤ x ≤ π, cos x = √3/2 gives x = π/6, and cos x = -√3/2 gives x = 5π/6. Solutions: {π/6, 5π/6}."
  },
  {
    id: 116,
    level: "entry",
    category: "fast",
    topic: "identities",
    q: "If sin θ + cos θ = m and sec θ + cosec θ = n, find n(m² - 1).",
    opts: ["m", "2m", "m/2", "m²"],
    ans: 1,
    exp: "m² = (sin θ + cos θ)² = 1 + 2 sin θ cos θ → m² - 1 = 2 sin θ cos θ. n = 1/cos θ + 1/sin θ = (sin θ + cos θ)/(sin θ cos θ) = m / (sin θ cos θ). Thus n(m² - 1) = [m / (sin θ cos θ)] · [2 sin θ cos θ] = 2m."
  },
  {
    id: 117,
    level: "entry",
    category: "net",
    topic: "identities",
    q: "Simplify: (sin³ θ + cos³ θ) / (sin θ + cos θ) + sin θ cos θ.",
    opts: ["0", "1", "2", "sin 2θ"],
    ans: 1,
    exp: "Using a³ + b³ = (a + b)(a² - ab + b²): (sin θ + cos θ)(sin² θ - sin θ cos θ + cos² θ) / (sin θ + cos θ) = 1 - sin θ cos θ. Adding sin θ cos θ gives 1."
  },
  {
    id: 200,
    level: "entry",
    category: "ecat",
    topic: "allied_angles",
    q: "Evaluate: cos² 10° + cos² 20° + cos² 70° + cos² 80°.",
    opts: ["1", "2", "3", "4"],
    ans: 1,
    exp: "cos² 80° = sin² 10° and cos² 70° = sin² 20°. Thus (cos² 10° + sin² 10°) + (cos² 20° + sin² 20°) = 1 + 1 = 2."
  },
  {
    id: 119,
    level: "entry",
    category: "aptitude",
    topic: "arc_sector",
    q: "A sector of a circle has radius 12 cm and perimeter 32 cm. Find its area.",
    opts: ["48 cm²", "96 cm²", "24 cm²", "72 cm²"],
    ans: 0,
    exp: "Perimeter = 2r + L → 32 = 24 + L → Arc length L = 8 cm. Sector Area = (1/2) r L = (1/2) × 12 × 8 = 48 cm²."
  },
  {
    id: 120,
    level: "entry",
    category: "scholarship",
    topic: "triangle_rules",
    q: "In a triangle ABC, if angle A = 45°, angle B = 75°, then the ratio a : c is:",
    opts: ["1 : √2", "√2 : √3", "2 : √6", "1 : √3"],
    ans: 1,
    exp: "Angle C = 180° - (45° + 75°) = 60°. By Sine Rule: a / c = sin A / sin C = sin 45° / sin 60° = (1/√2) / (√3/2) = 2 / (√2 √3) = √2 / √3 = √2 : √3."
  }
];

// ==========================================
// 2. MASTER TEST POOL (45 BALANCED MCQS)
// ==========================================
// 10 Foundation + 15 Intermediate + 20 Entry Level
const MASTER_TEST_MCQS = [
  // 10 Foundation
  PRACTICE_MCQS[0], PRACTICE_MCQS[2], PRACTICE_MCQS[4], PRACTICE_MCQS[5], PRACTICE_MCQS[6],
  PRACTICE_MCQS[10], PRACTICE_MCQS[11], PRACTICE_MCQS[13], PRACTICE_MCQS[14], PRACTICE_MCQS[18],
  // 15 Intermediate
  PRACTICE_MCQS[30], PRACTICE_MCQS[31], PRACTICE_MCQS[33], PRACTICE_MCQS[34], PRACTICE_MCQS[36],
  PRACTICE_MCQS[37], PRACTICE_MCQS[38], PRACTICE_MCQS[40], PRACTICE_MCQS[42], PRACTICE_MCQS[44],
  PRACTICE_MCQS[45], PRACTICE_MCQS[49], PRACTICE_MCQS[52], PRACTICE_MCQS[54], PRACTICE_MCQS[59],
  // 20 University Entry / Scholarship Level
  PRACTICE_MCQS[70], PRACTICE_MCQS[71], PRACTICE_MCQS[72], PRACTICE_MCQS[74], PRACTICE_MCQS[75],
  PRACTICE_MCQS[76], PRACTICE_MCQS[77], PRACTICE_MCQS[79], PRACTICE_MCQS[80], PRACTICE_MCQS[81],
  PRACTICE_MCQS[82], PRACTICE_MCQS[84], PRACTICE_MCQS[85], PRACTICE_MCQS[86], PRACTICE_MCQS[89],
  PRACTICE_MCQS[90], PRACTICE_MCQS[93], PRACTICE_MCQS[94], PRACTICE_MCQS[95], PRACTICE_MCQS[99]
];

// Master Test State
let masterTestState = {
  active: false,
  currentIndex: 0,
  timeRemaining: 40 * 60, // 40 minutes in seconds
  timerInterval: null,
  userAnswers: {}, // { [questionIndex]: selectedOptionIndex }
  flaggedQuestions: new Set(),
  submitted: false
};

// ==========================================
// 3. TRIGONOMETRY CALCULATOR
// ==========================================
function solveTrigCalc() {
  const angleInput = parseFloat(document.getElementById("calc-angle").value);
  const unit = document.getElementById("calc-unit").value;
  const func = document.getElementById("calc-func").value;
  const resultBox = document.getElementById("calc-result");

  if (isNaN(angleInput)) {
    resultBox.className = "calc-result-box error";
    resultBox.innerHTML = `<div class="result-main-val">Please enter a valid numeric angle.</div>`;
    return;
  }

  let deg = unit === "deg" ? angleInput : angleInput * (180 / Math.PI);
  // Normalize angle to [0, 360)
  let normDeg = ((deg % 360) + 360) % 360;
  let rad = (deg * Math.PI) / 180;

  // Handle standard angles & exact values
  const exactLookup = {
    0:   { sin: "0", cos: "1", tan: "0", cosec: "Undefined", sec: "1", cot: "Undefined" },
    30:  { sin: "1/2", cos: "√3/2", tan: "1/√3", cosec: "2", sec: "2/√3", cot: "√3" },
    45:  { sin: "1/√2", cos: "1/√2", tan: "1", cosec: "√2", sec: "√2", cot: "1" },
    60:  { sin: "√3/2", cos: "1/2", tan: "√3", cosec: "2/√3", sec: "2", cot: "1/√3" },
    90:  { sin: "1", cos: "0", tan: "Undefined", cosec: "1", sec: "Undefined", cot: "0" },
    120: { sin: "√3/2", cos: "-1/2", tan: "-√3", cosec: "2/√3", sec: "-2", cot: "-1/√3" },
    135: { sin: "1/√2", cos: "-1/√2", tan: "-1", cosec: "√2", sec: "-√2", cot: "-1" },
    150: { sin: "1/2", cos: "-√3/2", tan: "-1/√3", cosec: "2", sec: "-2/√3", cot: "-√3" },
    180: { sin: "0", cos: "-1", tan: "0", cosec: "Undefined", sec: "-1", cot: "Undefined" },
    210: { sin: "-1/2", cos: "-√3/2", tan: "1/√3", cosec: "-2", sec: "-2/√3", cot: "√3" },
    225: { sin: "-1/√2", cos: "-1/√2", tan: "1", cosec: "-√2", sec: "-√2", cot: "1" },
    240: { sin: "-√3/2", cos: "-1/2", tan: "√3", cosec: "-2/√3", sec: "-2", cot: "1/√3" },
    270: { sin: "-1", cos: "0", tan: "Undefined", cosec: "-1", sec: "Undefined", cot: "0" },
    300: { sin: "-√3/2", cos: "1/2", tan: "-√3", cosec: "-2/√3", sec: "2", cot: "-1/√3" },
    315: { sin: "-1/√2", cos: "1/√2", tan: "-1", cosec: "-√2", sec: "√2", cot: "-1" },
    330: { sin: "-1/2", cos: "√3/2", tan: "-1/√3", cosec: "-2", sec: "2/√3", cot: "-√3" }
  };

  let roundedNorm = Math.round(normDeg);
  let isExact = Math.abs(normDeg - roundedNorm) < 1e-4 && exactLookup[roundedNorm];

  let rawVal = 0;
  let isUndefined = false;

  switch (func) {
    case "sin": rawVal = Math.sin(rad); break;
    case "cos": rawVal = Math.cos(rad); break;
    case "tan":
      if (Math.abs(normDeg - 90) < 1e-4 || Math.abs(normDeg - 270) < 1e-4) isUndefined = true;
      else rawVal = Math.tan(rad);
      break;
    case "cosec":
      if (Math.abs(normDeg - 0) < 1e-4 || Math.abs(normDeg - 180) < 1e-4) isUndefined = true;
      else rawVal = 1 / Math.sin(rad);
      break;
    case "sec":
      if (Math.abs(normDeg - 90) < 1e-4 || Math.abs(normDeg - 270) < 1e-4) isUndefined = true;
      else rawVal = 1 / Math.cos(rad);
      break;
    case "cot":
      if (Math.abs(normDeg - 0) < 1e-4 || Math.abs(normDeg - 180) < 1e-4) isUndefined = true;
      else rawVal = 1 / Math.tan(rad);
      break;
  }

  // Clean floating point artifacts
  if (Math.abs(rawVal) < 1e-10) rawVal = 0;

  resultBox.className = "calc-result-box";
  if (isUndefined) {
    resultBox.innerHTML = `
      <div class="result-main-val" style="color: var(--accent-red);">${func}(${angleInput}${unit === "deg" ? "°" : " rad"}) = UNDEFINED</div>
      <p style="margin-top: 0.5rem; font-size: 0.9rem;">The denominator is zero at this angle (vertical asymptote on graph). No real value exists.</p>
    `;
  } else {
    let exactText = isExact ? `<strong>Exact Form:</strong> <span class="math-inline">${exactLookup[roundedNorm][func]}</span><br>` : "";
    resultBox.innerHTML = `
      <div class="result-main-val">${func}(${angleInput}${unit === "deg" ? "°" : " rad"}) ≈ ${rawVal.toFixed(6)}</div>
      <div style="margin-top: 0.6rem; font-size: 0.92rem; color: var(--navy);">
        ${exactText}
        <strong>Normalized angle:</strong> ${normDeg.toFixed(2)}° (${(rad / Math.PI).toFixed(3)}π rad)<br>
        <strong>Reference Angle:</strong> ${getReferenceAngle(normDeg).toFixed(2)}° | <strong>Quadrant:</strong> ${getQuadrant(normDeg)}
      </div>
    `;
  }
}

function getReferenceAngle(deg) {
  deg = ((deg % 360) + 360) % 360;
  if (deg <= 90) return deg;
  if (deg <= 180) return 180 - deg;
  if (deg <= 270) return deg - 180;
  return 360 - deg;
}

function getQuadrant(deg) {
  deg = ((deg % 360) + 360) % 360;
  if (deg === 0 || deg === 360) return "Positive X-Axis";
  if (deg === 90) return "Positive Y-Axis";
  if (deg === 180) return "Negative X-Axis";
  if (deg === 270) return "Negative Y-Axis";
  if (deg < 90) return "Quadrant I (All +)";
  if (deg < 180) return "Quadrant II (Sin +)";
  if (deg < 270) return "Quadrant III (Tan +)";
  return "Quadrant IV (Cos +)";
}

// ==========================================
// 4. TRIANGLE SOLVER
// ==========================================
function solveTriangle() {
  const mode = document.getElementById("solver-mode").value;
  const v1 = parseFloat(document.getElementById("solver-v1").value);
  const v2 = parseFloat(document.getElementById("solver-v2").value);
  const v3 = parseFloat(document.getElementById("solver-v3").value);
  const res = document.getElementById("solver-result");

  if (isNaN(v1) || isNaN(v2) || (mode !== "rhs" && isNaN(v3))) {
    res.className = "calc-result-box error";
    res.innerHTML = `<div class="result-main-val">Please provide all required inputs for ${mode.toUpperCase()}.</div>`;
    return;
  }

  try {
    let a, b, c, A, B, C, steps = [];
    const toDeg = r => r * 180 / Math.PI;
    const toRad = d => d * Math.PI / 180;

    if (mode === "sss") {
      a = v1; b = v2; c = v3;
      if (a + b <= c || a + c <= b || b + c <= a) {
        throw new Error("Triangle Inequality Theorem violated: Sum of any two sides must be strictly greater than the third side.");
      }
      // Cosine Rule
      const cosA = (b*b + c*c - a*a) / (2*b*c);
      const cosB = (a*a + c*c - b*b) / (2*a*c);
      A = toDeg(Math.acos(cosA));
      B = toDeg(Math.acos(cosB));
      C = 180 - A - B;
      steps.push(`1. Applied Cosine Rule: cos A = (b² + c² - a²) / (2bc) → A = ${A.toFixed(2)}°`);
      steps.push(`2. Applied Cosine Rule: cos B = (a² + c² - b²) / (2ac) → B = ${B.toFixed(2)}°`);
      steps.push(`3. Angle sum property: C = 180° - A - B = ${C.toFixed(2)}°`);
    } else if (mode === "sas") {
      a = v1; b = v2; C = v3;
      if (C <= 0 || C >= 180) throw new Error("Angle must be between 0° and 180°.");
      // Cosine Rule for c
      c = Math.sqrt(a*a + b*b - 2*a*b*Math.cos(toRad(C)));
      const cosA = (b*b + c*c - a*a) / (2*b*c);
      A = toDeg(Math.acos(cosA));
      B = 180 - A - C;
      steps.push(`1. Applied Cosine Rule: c = √(a² + b² - 2ab cos C) = ${c.toFixed(2)}`);
      steps.push(`2. Solved Angle A via Cosine Rule: A = ${A.toFixed(2)}°`);
      steps.push(`3. Found Angle B = 180° - A - C = ${B.toFixed(2)}°`);
    } else if (mode === "asa") {
      A = v1; c = v2; B = v3;
      if (A + B >= 180) throw new Error("Sum of two angles must be strictly less than 180°.");
      C = 180 - A - B;
      a = (c * Math.sin(toRad(A))) / Math.sin(toRad(C));
      b = (c * Math.sin(toRad(B))) / Math.sin(toRad(C));
      steps.push(`1. Third angle C = 180° - (${A}° + ${B}°) = ${C.toFixed(2)}°`);
      steps.push(`2. Applied Sine Rule for side a: a = c · sin A / sin C = ${a.toFixed(2)}`);
      steps.push(`3. Applied Sine Rule for side b: b = c · sin B / sin C = ${b.toFixed(2)}`);
    } else if (mode === "rhs") {
      a = v1; c = v2; // Leg a, Hypotenuse c
      if (c <= a) throw new Error("Hypotenuse c must be strictly larger than leg a.");
      b = Math.sqrt(c*c - a*a);
      C = 90;
      A = toDeg(Math.asin(a / c));
      B = 90 - A;
      steps.push(`1. Applied Pythagorean Theorem: b = √(c² - a²) = ${b.toFixed(2)}`);
      steps.push(`2. Solved sin A = Opposite / Hypotenuse = ${a}/${c} → A = ${A.toFixed(2)}°`);
      steps.push(`3. Solved B = 90° - A = ${B.toFixed(2)}°`);
    }

    const area = 0.5 * a * b * Math.sin(toRad(C));
    const perimeter = a + b + c;

    res.className = "calc-result-box";
    res.innerHTML = `
      <div class="result-main-val">Triangle Solved Successfully</div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.5rem; margin: 0.85rem 0;">
        <div class="info-card"><div class="info-card-label">Side a</div><div class="info-card-val">${a.toFixed(2)}</div></div>
        <div class="info-card"><div class="info-card-label">Side b</div><div class="info-card-val">${b.toFixed(2)}</div></div>
        <div class="info-card"><div class="info-card-label">Side c</div><div class="info-card-val">${c.toFixed(2)}</div></div>
        <div class="info-card"><div class="info-card-label">Angle A</div><div class="info-card-val">${A.toFixed(2)}°</div></div>
        <div class="info-card"><div class="info-card-label">Angle B</div><div class="info-card-val">${B.toFixed(2)}°</div></div>
        <div class="info-card"><div class="info-card-label">Angle C</div><div class="info-card-val">${C.toFixed(2)}°</div></div>
        <div class="info-card"><div class="info-card-label">Area</div><div class="info-card-val">${area.toFixed(2)}</div></div>
        <div class="info-card"><div class="info-card-label">Perimeter</div><div class="info-card-val">${perimeter.toFixed(2)}</div></div>
      </div>
      <div style="font-size: 0.9rem; margin-top: 0.75rem;">
        <strong>Step-by-step Mathematical Working:</strong>
        <ul style="margin-left: 1.25rem; margin-top: 0.35rem; color: var(--navy-dark);">
          ${steps.map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>
    `;
  } catch (err) {
    res.className = "calc-result-box error";
    res.innerHTML = `<div class="result-main-val">${err.message}</div>`;
  }
}

function updateSolverInputs() {
  const mode = document.getElementById("solver-mode").value;
  const l1 = document.getElementById("solver-lbl-1");
  const l2 = document.getElementById("solver-lbl-2");
  const l3 = document.getElementById("solver-lbl-3");
  const f3 = document.getElementById("solver-fg-3");

  if (mode === "sss") {
    l1.textContent = "Side a:"; l2.textContent = "Side b:"; l3.textContent = "Side c:";
    f3.style.display = "flex";
  } else if (mode === "sas") {
    l1.textContent = "Side a:"; l2.textContent = "Side b:"; l3.textContent = "Included Angle C (°):";
    f3.style.display = "flex";
  } else if (mode === "asa") {
    l1.textContent = "Angle A (°):"; l2.textContent = "Side c:"; l3.textContent = "Angle B (°):";
    f3.style.display = "flex";
  } else if (mode === "rhs") {
    l1.textContent = "Leg a:"; l2.textContent = "Hypotenuse c:";
    f3.style.display = "none";
  }
}

// ==========================================
// 5. IDENTITY PRACTICE GENERATOR
// ==========================================
const IDENTITY_TEMPLATES = [
  {
    expr: "(1 - cos² θ) / sin θ",
    target: "sin θ",
    hint: "Use the Pythagorean identity: 1 - cos² θ = sin² θ.",
    solution: "1. Recognize numerator: 1 - cos² θ = sin² θ\n2. Substitute: sin² θ / sin θ\n3. Cancel common factor: = sin θ."
  },
  {
    expr: "tan θ · cos θ",
    target: "sin θ",
    hint: "Convert tangent to quotient form: tan θ = sin θ / cos θ.",
    solution: "1. Substitute quotient identity: (sin θ / cos θ) · cos θ\n2. Cancel cos θ: = sin θ."
  },
  {
    expr: "sec² θ - tan² θ + cosec² θ - cot² θ",
    target: "2",
    hint: "Group into standard Pythagorean identities.",
    solution: "1. Recall sec² θ - tan² θ = 1\n2. Recall cosec² θ - cot² θ = 1\n3. Sum: 1 + 1 = 2."
  },
  {
    expr: "(sin θ / (1 + cos θ)) + ((1 + cos θ) / sin θ)",
    target: "2 cosec θ",
    hint: "Find common denominator sin θ(1 + cos θ) and expand numerator.",
    solution: "1. Common denominator: [sin² θ + (1 + cos θ)²] / [sin θ(1 + cos θ)]\n2. Expand numerator: [sin² θ + 1 + 2 cos θ + cos² θ] = [2 + 2 cos θ]\n3. Factor: 2(1 + cos θ) / [sin θ(1 + cos θ)] = 2 / sin θ = 2 cosec θ."
  },
  {
    expr: "(1 - sin² θ) · sec² θ",
    target: "1",
    hint: "Convert 1 - sin² θ into cos² θ and sec² θ into 1/cos² θ.",
    solution: "1. 1 - sin² θ = cos² θ\n2. sec² θ = 1 / cos² θ\n3. Product: cos² θ · (1 / cos² θ) = 1."
  },
  {
    expr: "cos⁴ θ - sin⁴ θ",
    target: "cos² θ - sin² θ (or cos 2θ)",
    hint: "Factor as a difference of squares: (a² - b²)(a² + b²).",
    solution: "1. Factor: (cos² θ - sin² θ)(cos² θ + sin² θ)\n2. Apply sin² θ + cos² θ = 1\n3. Result: (cos² θ - sin² θ) · 1 = cos² θ - sin² θ."
  }
];

let currentIdentity = null;

function generateNewIdentity() {
  const randIdx = Math.floor(Math.random() * IDENTITY_TEMPLATES.length);
  currentIdentity = IDENTITY_TEMPLATES[randIdx];

  document.getElementById("identity-display").textContent = currentIdentity.expr;
  document.getElementById("identity-target").textContent = `Simplify to: ${currentIdentity.target}`;
  document.getElementById("identity-hint").style.display = "none";
  document.getElementById("identity-sol").style.display = "none";
}

function showIdentityHint() {
  if (!currentIdentity) return;
  const h = document.getElementById("identity-hint");
  h.textContent = `💡 Hint: ${currentIdentity.hint}`;
  h.style.display = "block";
}

function showIdentitySolution() {
  if (!currentIdentity) return;
  const s = document.getElementById("identity-sol");
  s.innerHTML = `<strong>Step-by-step Proof:</strong><pre style="font-family: inherit; margin-top: 0.5rem; white-space: pre-wrap;">${currentIdentity.solution}</pre>`;
  s.style.display = "block";
}

// ==========================================
// 6. QUADRANT & SIGN EXPLORER
// ==========================================
function updateQuadrantVisual() {
  const deg = parseInt(document.getElementById("quadrant-slider").value, 10);
  document.getElementById("quadrant-angle-val").textContent = `${deg}°`;

  const rad = (deg * Math.PI) / 180;
  const normDeg = ((deg % 360) + 360) % 360;

  // Calculate coordinates on SVG unit circle (center 120, 120, radius 80)
  const cx = 120, cy = 120, r = 80;
  const px = cx + r * Math.cos(rad);
  const py = cy - r * Math.sin(rad); // SVG Y is inverted

  // Update SVG terminal ray
  const ray = document.getElementById("unit-circle-ray");
  const dot = document.getElementById("unit-circle-dot");
  if (ray && dot) {
    ray.setAttribute("x2", px);
    ray.setAttribute("y2", py);
    dot.setAttribute("cx", px);
    dot.setAttribute("cy", py);
  }

  // Update quadrant info cards
  const qName = getQuadrant(normDeg);
  const ref = getReferenceAngle(normDeg);
  const sinVal = Math.sin(rad);
  const cosVal = Math.cos(rad);
  const tanVal = Math.tan(rad);

  document.getElementById("q-info-quadrant").textContent = qName;
  document.getElementById("q-info-ref").textContent = `${ref.toFixed(1)}°`;
  document.getElementById("q-info-sin").textContent = sinVal >= 0 ? `+ (${sinVal.toFixed(3)})` : `- (${sinVal.toFixed(3)})`;
  document.getElementById("q-info-cos").textContent = cosVal >= 0 ? `+ (${cosVal.toFixed(3)})` : `- (${cosVal.toFixed(3)})`;
  
  if (Math.abs(normDeg - 90) < 1e-3 || Math.abs(normDeg - 270) < 1e-3) {
    document.getElementById("q-info-tan").textContent = "Undefined (Asymptote)";
  } else {
    document.getElementById("q-info-tan").textContent = tanVal >= 0 ? `+ (${tanVal.toFixed(3)})` : `- (${tanVal.toFixed(3)})`;
  }
}

// ==========================================
// 7. INTERACTIVE GRAPH PLOTTER (Canvas)
// ==========================================
let currentGraphFunc = "sin";

function setGraphFunc(f) {
  currentGraphFunc = f;
  document.querySelectorAll(".btn-graph-tab").forEach(b => b.classList.remove("active"));
  document.getElementById(`btn-graph-${f}`).classList.add("active");
  drawGraph();
}

function drawGraph() {
  const canvas = document.getElementById("trig-graph-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  // Adjust for DPI
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;

  const amp = parseFloat(document.getElementById("graph-param-a")?.value || 1);
  const freq = parseFloat(document.getElementById("graph-param-b")?.value || 1);
  const phase = parseFloat(document.getElementById("graph-param-c")?.value || 0);
  const vShift = parseFloat(document.getElementById("graph-param-d")?.value || 0);

  // Clear canvas
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const originX = 60;
  const originY = height / 2;
  const scaleY = height / 5; // 1 unit = height / 5 px
  const scaleX = (width - 80) / (2 * Math.PI); // 2π mapped to width

  // Draw Grid Lines & Axes
  ctx.strokeStyle = "#e2e8f0";
  ctx.lineWidth = 1;

  // Horizontal grid lines
  for (let y = -2; y <= 2; y++) {
    const py = originY - y * scaleY;
    ctx.beginPath();
    ctx.moveTo(originX, py);
    ctx.lineTo(width - 20, py);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "11px system-ui";
    ctx.fillText(y.toString(), originX - 25, py + 4);
  }

  // Vertical grid lines (0, π/2, π, 3π/2, 2π)
  const angleMarks = [
    { rad: 0, label: "0" },
    { rad: Math.PI / 2, label: "π/2 (90°)" },
    { rad: Math.PI, label: "π (180°)" },
    { rad: (3 * Math.PI) / 2, label: "3π/2 (270°)" },
    { rad: 2 * Math.PI, label: "2π (360°)" }
  ];

  angleMarks.forEach(m => {
    const px = originX + m.rad * scaleX;
    ctx.beginPath();
    ctx.moveTo(px, 20);
    ctx.lineTo(px, height - 20);
    ctx.stroke();

    ctx.fillStyle = "#64748b";
    ctx.font = "11px system-ui";
    ctx.fillText(m.label, px - 15, originY + 18);
  });

  // Main Axes
  ctx.strokeStyle = "#0f172a";
  ctx.lineWidth = 1.5;
  // X Axis
  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(width - 20, originY);
  ctx.stroke();
  // Y Axis
  ctx.beginPath();
  ctx.moveTo(originX, 20);
  ctx.lineTo(originX, height - 20);
  ctx.stroke();

  // Plot Curve
  ctx.strokeStyle = "#047857";
  ctx.lineWidth = 2.5;
  ctx.beginPath();

  let started = false;
  const step = 2; // px per sample

  for (let px = originX; px <= width - 20; px += step) {
    const x = (px - originX) / scaleX; // in radians
    let yVal = 0;

    if (currentGraphFunc === "sin") {
      yVal = amp * Math.sin(freq * x + phase) + vShift;
    } else if (currentGraphFunc === "cos") {
      yVal = amp * Math.cos(freq * x + phase) + vShift;
    } else if (currentGraphFunc === "tan") {
      const cosCheck = Math.cos(freq * x + phase);
      if (Math.abs(cosCheck) < 0.05) {
        started = false;
        continue;
      }
      yVal = amp * Math.tan(freq * x + phase) + vShift;
      if (Math.abs(yVal) > 5) {
        started = false;
        continue;
      }
    }

    const py = originY - yVal * scaleY;

    if (!started) {
      ctx.moveTo(px, py);
      started = true;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();
}

// ==========================================
// 8. PRACTICE ZONE MCQS ENGINE
// ==========================================
let currentPracticeFilter = "all";

function renderPracticeMCQs() {
  const container = document.getElementById("practice-mcq-container");
  if (!container) return;

  const filtered = PRACTICE_MCQS.filter(m => {
    if (currentPracticeFilter === "all") return true;
    if (currentPracticeFilter === "foundation") return m.level === "foundation";
    if (currentPracticeFilter === "intermediate") return m.level === "intermediate";
    if (currentPracticeFilter === "entry") return m.level === "entry";
    return m.category === currentPracticeFilter;
  });

  container.innerHTML = filtered.map((mcq, idx) => `
    <div class="mcq-card" id="practice-mcq-${mcq.id}">
      <div class="mcq-meta">
        <span class="mcq-badge badge-${mcq.level}">${mcq.level.toUpperCase()}</span>
        <span class="mcq-tag">${mcq.category.toUpperCase()}-STYLE • Q${idx + 1}</span>
      </div>
      <div class="mcq-question">${mcq.q}</div>
      <div class="mcq-options">
        ${mcq.opts.map((opt, oIdx) => `
          <div class="mcq-opt" onclick="checkPracticeAnswer(${mcq.id}, ${oIdx})">
            <span class="opt-prefix">${String.fromCharCode(65 + oIdx)}</span>
            <span>${opt}</span>
          </div>
        `).join("")}
      </div>
      <div class="mcq-explanation" id="practice-exp-${mcq.id}">
        <strong>Mathematical Explanation:</strong><br>${mcq.exp}
      </div>
    </div>
  `).join("");
}

function checkPracticeAnswer(mcqId, selectedOptIdx) {
  const mcq = PRACTICE_MCQS.find(m => m.id === mcqId);
  if (!mcq) return;

  const card = document.getElementById(`practice-mcq-${mcqId}`);
  const opts = card.querySelectorAll(".mcq-opt");
  const exp = document.getElementById(`practice-exp-${mcqId}`);

  opts.forEach((opt, idx) => {
    opt.onclick = null; // Disable further clicks
    if (idx === mcq.ans) {
      opt.classList.add("selected-correct");
    } else if (idx === selectedOptIdx) {
      opt.classList.add("selected-wrong");
    }
  });

  exp.classList.add("visible");
}

function filterPractice(category, btnElem) {
  currentPracticeFilter = category;
  document.querySelectorAll(".practice-filters .filter-btn").forEach(b => b.classList.remove("active"));
  if (btnElem) btnElem.classList.add("active");
  renderPracticeMCQs();
}

// ==========================================
// 9. MASTER TEST SIMULATOR (45 MCQS TIMED)
// ==========================================
function startMasterTest() {
  masterTestState.active = true;
  masterTestState.currentIndex = 0;
  masterTestState.timeRemaining = 40 * 60;
  masterTestState.userAnswers = {};
  masterTestState.flaggedQuestions = new Set();
  masterTestState.submitted = false;

  document.getElementById("test-intro-screen").style.display = "none";
  document.getElementById("test-active-screen").style.display = "block";
  document.getElementById("test-result-screen").style.display = "none";

  renderPalette();
  loadTestQuestion(0);

  // Start timer
  if (masterTestState.timerInterval) clearInterval(masterTestState.timerInterval);
  masterTestState.timerInterval = setInterval(updateTestTimer, 1000);
}

function updateTestTimer() {
  if (masterTestState.timeRemaining <= 0) {
    clearInterval(masterTestState.timerInterval);
    submitMasterTest(true);
    return;
  }
  masterTestState.timeRemaining--;
  const mins = Math.floor(masterTestState.timeRemaining / 60);
  const secs = masterTestState.timeRemaining % 60;
  document.getElementById("test-timer-display").textContent = 
    `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function renderPalette() {
  const palette = document.getElementById("master-test-palette");
  palette.innerHTML = MASTER_TEST_MCQS.map((q, idx) => {
    let statusClass = "";
    if (idx === masterTestState.currentIndex) statusClass = "current";
    else if (masterTestState.flaggedQuestions.has(idx)) statusClass = "flagged";
    else if (masterTestState.userAnswers[idx] !== undefined) statusClass = "answered";

    return `
      <button class="palette-btn ${statusClass}" onclick="jumpToTestQuestion(${idx})">
        ${idx + 1}
      </button>
    `;
  }).join("");
}

function loadTestQuestion(idx) {
  masterTestState.currentIndex = idx;
  const q = MASTER_TEST_MCQS[idx];

  document.getElementById("test-q-number").textContent = `Question ${idx + 1} of ${MASTER_TEST_MCQS.length}`;
  document.getElementById("test-q-badge").textContent = `${q.level.toUpperCase()} • ${q.category.toUpperCase()}-STYLE`;
  document.getElementById("test-q-text").textContent = q.q;

  const optionsContainer = document.getElementById("test-options-container");
  const selectedOpt = masterTestState.userAnswers[idx];

  optionsContainer.innerHTML = q.opts.map((opt, oIdx) => `
    <div class="mcq-opt ${selectedOpt === oIdx ? 'selected-correct' : ''}" onclick="selectTestOption(${idx}, ${oIdx})">
      <span class="opt-prefix">${String.fromCharCode(65 + oIdx)}</span>
      <span>${opt}</span>
    </div>
  `).join("");

  // Flag button state
  const flagBtn = document.getElementById("btn-test-flag");
  if (masterTestState.flaggedQuestions.has(idx)) {
    flagBtn.textContent = "🚩 Flagged for Review";
    flagBtn.style.background = "var(--accent-gold)";
    flagBtn.style.color = "#fff";
  } else {
    flagBtn.textContent = "🏳️ Mark for Review";
    flagBtn.style.background = "var(--accent-gold-bg)";
    flagBtn.style.color = "var(--accent-gold)";
  }

  renderPalette();
}

function selectTestOption(qIdx, optIdx) {
  if (masterTestState.submitted) return;
  masterTestState.userAnswers[qIdx] = optIdx;
  loadTestQuestion(qIdx);
}

function toggleFlagCurrentQuestion() {
  const idx = masterTestState.currentIndex;
  if (masterTestState.flaggedQuestions.has(idx)) {
    masterTestState.flaggedQuestions.delete(idx);
  } else {
    masterTestState.flaggedQuestions.add(idx);
  }
  loadTestQuestion(idx);
}

function prevTestQuestion() {
  if (masterTestState.currentIndex > 0) {
    loadTestQuestion(masterTestState.currentIndex - 1);
  }
}

function nextTestQuestion() {
  if (masterTestState.currentIndex < MASTER_TEST_MCQS.length - 1) {
    loadTestQuestion(masterTestState.currentIndex + 1);
  }
}

function jumpToTestQuestion(idx) {
  loadTestQuestion(idx);
}

function submitMasterTest(auto = false) {
  if (!auto && !confirm("Are you sure you want to submit your Master Test?")) return;

  clearInterval(masterTestState.timerInterval);
  masterTestState.submitted = true;

  // Calculate scores
  let correct = 0, incorrect = 0, unattempted = 0;
  const topicStats = {};

  MASTER_TEST_MCQS.forEach((q, idx) => {
    const topic = q.topic || "general";
    if (!topicStats[topic]) topicStats[topic] = { total: 0, correct: 0 };
    topicStats[topic].total++;

    const chosen = masterTestState.userAnswers[idx];
    if (chosen === undefined) {
      unattempted++;
    } else if (chosen === q.ans) {
      correct++;
      topicStats[topic].correct++;
    } else {
      incorrect++;
    }
  });

  const total = MASTER_TEST_MCQS.length;
  const scorePct = ((correct / total) * 100).toFixed(1);
  const accuracy = (correct + incorrect > 0) ? ((correct / (correct + incorrect)) * 100).toFixed(1) : "0.0";
  const timeUsedSeconds = 40 * 60 - masterTestState.timeRemaining;
  const timeUsedMins = Math.floor(timeUsedSeconds / 60);
  const timeUsedSecs = timeUsedSeconds % 60;

  // Save Best Score
  const prevBest = parseFloat(localStorage.getItem("trig_master_best_score") || "0");
  if (parseFloat(scorePct) > prevBest) {
    localStorage.setItem("trig_master_best_score", scorePct);
  }

  // Display Results
  document.getElementById("test-active-screen").style.display = "none";
  document.getElementById("test-result-screen").style.display = "block";

  document.getElementById("res-score-num").textContent = `${correct} / ${total} (${scorePct}%)`;
  document.getElementById("res-correct").textContent = correct;
  document.getElementById("res-incorrect").textContent = incorrect;
  document.getElementById("res-unattempted").textContent = unattempted;
  document.getElementById("res-accuracy").textContent = `${accuracy}%`;
  document.getElementById("res-time-used").textContent = `${timeUsedMins}m ${timeUsedSecs}s`;

  // Weak area breakdown
  const weakContainer = document.getElementById("res-weakness-list");
  weakContainer.innerHTML = Object.keys(topicStats).map(t => {
    const st = topicStats[t];
    const pct = Math.round((st.correct / st.total) * 100);
    let tag = `<span style="color: var(--primary); font-weight: 700;">Strong (${pct}%)</span>`;
    if (pct < 50) tag = `<span style="color: var(--accent-red); font-weight: 700;">Weak (${pct}%) — Needs Practice</span>`;
    else if (pct < 75) tag = `<span style="color: var(--accent-gold); font-weight: 700;">Moderate (${pct}%)</span>`;

    return `
      <div class="weakness-item">
        <span style="text-transform: capitalize;">${t.replace('_', ' ')}</span>
        <span>${st.correct}/${st.total} correct • ${tag}</span>
      </div>
    `;
  }).join("");
}

// ==========================================
// 10. BOOKMARKS & LOCALSTORAGE
// ==========================================
function getBookmarks() {
  return JSON.parse(localStorage.getItem("trig_bookmarks") || "[]");
}

function saveBookmarks(bm) {
  localStorage.setItem("trig_bookmarks", JSON.stringify(bm));
}

function toggleBookmark(sectionId, title) {
  let bm = getBookmarks();
  const exists = bm.some(b => b.id === sectionId);

  if (exists) {
    bm = bm.filter(b => b.id !== sectionId);
    showToast(`Removed "${title}" from bookmarks.`);
  } else {
    bm.push({ id: sectionId, title });
    showToast(`Bookmarked "${title}".`);
  }

  saveBookmarks(bm);
  updateBookmarkButtons();
}

function updateBookmarkButtons() {
  const bm = getBookmarks();
  document.querySelectorAll(".btn-bookmark").forEach(btn => {
    const sId = btn.getAttribute("data-section");
    if (bm.some(b => b.id === sId)) {
      btn.classList.add("bookmarked");
      btn.innerHTML = `★ Bookmarked`;
    } else {
      btn.classList.remove("bookmarked");
      btn.innerHTML = `☆ Bookmark`;
    }
  });
}

function openBookmarksModal() {
  const bm = getBookmarks();
  const list = document.getElementById("bookmark-modal-list");
  if (bm.length === 0) {
    list.innerHTML = `<p style="color: var(--text-muted);">No bookmarked sections yet. Click the "☆ Bookmark" button on any topic to save it here for quick revision.</p>`;
  } else {
    list.innerHTML = bm.map(b => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid var(--border-color);">
        <a href="#${b.id}" onclick="closeModal('bookmarks-modal')" style="color: var(--navy); font-weight: 600; text-decoration: none;">
          📌 ${b.title}
        </a>
        <button onclick="toggleBookmark('${b.id}', '${b.title}'); openBookmarksModal();" style="background: none; border: none; color: var(--accent-red); cursor: pointer; font-size: 0.85rem;">
          Remove
        </button>
      </div>
    `).join("");
  }
  openModal('bookmarks-modal');
}

// ==========================================
// 11. LIVE SEARCH SYSTEM
// ==========================================
function initSearch() {
  const input = document.getElementById("header-search-input");
  if (!input) return;

  input.addEventListener("input", e => {
    const term = e.target.value.toLowerCase().trim();
    if (!term) {
      document.querySelectorAll(".academic-section").forEach(s => s.style.display = "block");
      return;
    }

    document.querySelectorAll(".academic-section").forEach(section => {
      const text = section.textContent.toLowerCase();
      if (text.includes(term)) {
        section.style.display = "block";
      } else {
        section.style.display = "none";
      }
    });
  });
}

// ==========================================
// 12. UTILITIES: TOASTS, COPY, PRINT, MODALS
// ==========================================
function showToast(msg) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

function copyFormulaSheet() {
  const sheet = document.getElementById("complete-formula-sheet");
  if (!sheet) return;
  navigator.clipboard.writeText(sheet.innerText).then(() => {
    showToast("Formula Sheet copied to clipboard successfully!");
  }).catch(() => {
    showToast("Unable to copy formula sheet.");
  });
}

function printFormulaSheet() {
  window.print();
}

function toggleTrySolution(boxId) {
  const sol = document.getElementById(boxId);
  if (!sol) return;
  sol.classList.toggle("visible");
}

function toggleSidebar() {
  const sb = document.querySelector(".sidebar-nav");
  if (sb) sb.classList.toggle("open");
}

function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("active");
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove("active");
}

// ==========================================
// 13. INITIALIZATION ON DOM CONTENT LOADED
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  updateBookmarkButtons();
  renderPracticeMCQs();
  generateNewIdentity();
  updateQuadrantVisual();
  drawGraph();

  // Resize graph on window resize
  window.addEventListener("resize", () => {
    drawGraph();
  });

  // Track active section in sidebar
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        document.querySelectorAll(".nav-link").forEach(link => {
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, { rootMargin: "-20% 0px -70% 0px" });

  document.querySelectorAll(".academic-section").forEach(s => observer.observe(s));
});
