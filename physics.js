// NOVIX Physics Data and Learning Engine
(function () {
  const CHAPTERS_DATA = [
    {
      id: "mechanics",
      number: "CHAPTER 01",
      name: "MECHANICS",
      desc: "Understand motion, forces, energy, momentum, circular dynamics and gravitation.",
      topicCount: 9,
      difficulty: "Intermediate",
      topics: [
        {
          id: "measurements",
          num: "01",
          name: "Measurements",
          desc: "SI units, dimensional analysis, precision, significant figures and error propagation.",
          concepts: [
            "Fundamental SI Units: meter (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd).",
            "Dimensional Homogeneity: Both sides of any physical equation must have identical dimensions [M^a L^b T^c].",
            "Error Analysis: Absolute error Δx, Relative error Δx/x, and Percentage error (Δx/x) × 100%."
          ],
          formulas: [
            { name: "Percentage Error", eq: "\\% \\text{ Error} = \\left( \\frac{\\Delta x}{x_{\\text{measured}}} \\right) \\times 100\\%", vars: "Δx = absolute uncertainty, x = measured value" },
            { name: "Dimensional Formula for Force", eq: "[F] = [M L T^{-2}]", vars: "M = mass, L = length, T = time" }
          ],
          examples: [
            {
              title: "Checking Dimensional Consistency",
              problem: "Check if the equation s = ut + 1/2 at^2 is dimensionally consistent.",
              solution: "[s] = L. [ut] = [L T^-1][T] = L. [1/2 at^2] = [L T^-2][T^2] = L. Since all terms equal [L], the equation is dimensionally correct."
            }
          ],
          mcqs: [
            {
              q: "Which of the following is NOT a fundamental SI base unit?",
              opts: ["Kelvin", "Newton", "Candela", "Ampere"],
              ans: 1,
              exp: "Newton (N) is a derived unit of Force equivalent to kg·m/s^2."
            },
            {
              q: "If mass has 2% uncertainty and velocity has 3% uncertainty, what is the uncertainty in Kinetic Energy (1/2 m v^2)?",
              opts: ["5%", "8%", "11%", "6%"],
              ans: 1,
              exp: "ΔK/K = Δm/m + 2(Δv/v) = 2% + 2(3%) = 8%."
            }
          ]
        },
        {
          id: "vectors",
          num: "02",
          name: "Vectors",
          desc: "Scalars vs vectors, vector addition, resolution into components, dot and cross products.",
          concepts: [
            "Vector Resolution: A_x = A cos(θ), A_y = A sin(θ).",
            "Dot Product (Scalar): A · B = |A||B| cos(θ). Produces scalar work and power.",
            "Cross Product (Vector): A × B = |A||B| sin(θ) n̂. Produces torque and angular momentum."
          ],
          formulas: [
            { name: "Dot Product", eq: "\\vec{A} \\cdot \\vec{B} = A_x B_x + A_y B_y + A_z B_z = |A||B| \\cos \\theta", vars: "θ = angle between vectors" },
            { name: "Vector Magnitude", eq: "|\\vec{A}| = \\sqrt{A_x^2 + A_y^2 + A_z^2}", vars: "A_x, A_y, A_z = orthogonal components" }
          ],
          examples: [
            {
              title: "Angle Between Vectors",
              problem: "Find the angle between vectors A = (3, 4) and B = (4, 3).",
              solution: "A·B = (3)(4) + (4)(3) = 24. |A| = 5, |B| = 5. cos(θ) = 24/25 = 0.96. θ = arccos(0.96) ≈ 16.26°."
            }
          ],
          mcqs: [
            {
              q: "Two orthogonal vectors have a dot product of:",
              opts: ["1", "0", "|A||B|", "-1"],
              ans: 1,
              exp: "Because cos(90°) = 0, the dot product of perpendicular vectors is always zero."
            }
          ]
        },
        {
          id: "kinematics",
          num: "03",
          name: "Motion / Kinematics",
          desc: "1D and 2D motion, displacement, velocity, acceleration, projectile motion and graphs.",
          concepts: [
            "Kinematic Equations apply strictly under CONSTANT acceleration.",
            "Projectile Motion: Horizontal velocity is constant (v_x = u cos θ); Vertical motion undergoes free fall (a_y = -g).",
            "Slope of Displacement-Time graph gives Velocity; Slope of Velocity-Time graph gives Acceleration; Area under v-t graph gives Displacement."
          ],
          formulas: [
            { name: "First Equation of Motion", eq: "v = u + a t", vars: "v = final velocity, u = initial, a = acceleration, t = time" },
            { name: "Displacement Equation", eq: "s = u t + \\frac{1}{2} a t^2", vars: "s = displacement" },
            { name: "Velocity-Displacement", eq: "v^2 = u^2 + 2 a s", vars: "Relates velocities and displacement directly without time" },
            { name: "Projectile Range", eq: "R = \\frac{u^2 \\sin(2\\theta)}{g}", vars: "Maximum range achieved at θ = 45°" }
          ],
          examples: [
            {
              title: "Maximum Height of a Projectile",
              problem: "A ball is launched at 20 m/s at an angle of 30° to the horizontal. Find its maximum height (g = 9.8 m/s²).",
              solution: "u_y = 20 sin(30°) = 10 m/s. H = u_y² / (2g) = 100 / (2 × 9.8) = 100 / 19.6 ≈ 5.10 meters."
            }
          ],
          mcqs: [
            {
              q: "At what launch angle is the horizontal range of an ideal projectile maximized?",
              opts: ["30°", "45°", "60°", "90°"],
              ans: 1,
              exp: "Range R = (u^2 sin 2θ)/g is maximized when sin(2θ) = 1, which occurs at 2θ = 90°, so θ = 45°."
            }
          ]
        },
        {
          id: "forces",
          num: "04",
          name: "Force and Newton's Laws",
          desc: "Inertia, F = ma, action-reaction, friction, free body diagrams and equilibrium.",
          concepts: [
            "Newton's 1st Law (Inertia): Bodies maintain constant velocity unless acted on by net external force.",
            "Newton's 2nd Law: F_net = dp/dt = m·a (for constant mass).",
            "Newton's 3rd Law: Action-reaction pairs act on DIFFERENT bodies simultaneously.",
            "Friction: Static friction f_s ≤ μ_s N; Kinetic friction f_k = μ_k N (usually μ_k < μ_s)."
          ],
          formulas: [
            { name: "Newton's Second Law", eq: "\\vec{F}_{\\text{net}} = m \\vec{a}", vars: "m = mass, a = acceleration" },
            { name: "Max Static Friction", eq: "f_{s,\\max} = \\mu_s N", vars: "μ_s = coefficient of static friction, N = normal force" }
          ],
          examples: [
            {
              title: "Block on Incline with Friction",
              problem: "A 5 kg block rests on a 30° incline. What minimum coefficient of static friction prevents slipping?",
              solution: "Parallel force = mg sin(30°). Normal force N = mg cos(30°). At slip threshold: mg sin(30°) = μ_s mg cos(30°). Thus μ_s = tan(30°) = 1/√3 ≈ 0.577."
            }
          ],
          mcqs: [
            {
              q: "When a horse pulls a cart, why does the cart accelerate forward?",
              opts: [
                "The horse pulls harder on the cart than the cart on the horse",
                "The force exerted by the ground on the horse's hooves exceeds resisting forces",
                "The horse overcomes Newton's third law",
                "The friction on the cart wheels is zero"
              ],
              ans: 1,
              exp: "The net external force on the horse-cart system comes from the ground pushing forward on the horse."
            }
          ]
        },
        {
          id: "momentum",
          num: "05",
          name: "Momentum",
          desc: "Linear momentum, impulse, elastic and inelastic collisions, conservation principles.",
          concepts: [
            "Linear Momentum: p = m v.",
            "Impulse-Momentum Theorem: J = ∫ F dt = Δp.",
            "Conservation of Linear Momentum: If F_ext = 0, total momentum p_total is constant.",
            "Elastic vs Inelastic: Elastic collisions conserve both momentum AND kinetic energy; perfectly inelastic collisions stick together."
          ],
          formulas: [
            { name: "Impulse", eq: "\\vec{J} = \\vec{F}_{\\text{avg}} \\Delta t = \\Delta \\vec{p}", vars: "J = impulse, Δp = change in momentum" },
            { name: "Conservation of Momentum", eq: "m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2", vars: "u = initial velocities, v = final velocities" }
          ],
          examples: [
            {
              title: "Ballistic Inelastic Collision",
              problem: "A 0.02 kg bullet at 300 m/s embeds in a 1.98 kg stationary block. Find the combined final speed.",
              solution: "(0.02)(300) + (1.98)(0) = (0.02 + 1.98) v_f. 6 = 2.00 v_f. v_f = 3.0 m/s."
            }
          ],
          mcqs: [
            {
              q: "In an isolated system, which quantity is conserved in ALL collisions?",
              opts: ["Kinetic Energy", "Linear Momentum", "Mechanical Energy", "Velocity"],
              ans: 1,
              exp: "Linear momentum is conserved in all collisions where net external force is zero."
            }
          ]
        },
        {
          id: "work-energy",
          num: "06",
          name: "Work, Energy and Power",
          desc: "Work done by constant and variable forces, kinetic and potential energy, conservation of energy, power.",
          concepts: [
            "Work W = F · d = F d cos(θ). Work is zero if force is perpendicular to displacement.",
            "Work-Energy Theorem: W_net = ΔK = 1/2 m v_f² - 1/2 m v_i².",
            "Conservative Forces (Gravity, Spring): Work depends only on initial and final positions.",
            "Power P = dW/dt = F · v."
          ],
          formulas: [
            { name: "Kinetic Energy", eq: "K = \\frac{1}{2} m v^2 = \\frac{p^2}{2m}", vars: "m = mass, v = speed, p = momentum" },
            { name: "Gravitational Potential Energy", eq: "U_g = m g h", vars: "h = height above reference level" },
            { name: "Power", eq: "P = \\frac{W}{t} = \\vec{F} \\cdot \\vec{v}", vars: "Units: Watts (W) = J/s" }
          ],
          examples: [
            {
              title: "Power of an Elevator Motor",
              problem: "An elevator lifting 800 kg rises 30 meters in 15 seconds at constant speed. What average power is delivered?",
              solution: "Work = mgh = (800)(9.8)(30) = 235,200 J. Power = W/t = 235,200 / 15 = 15,680 W = 15.68 kW."
            }
          ],
          mcqs: [
            {
              q: "If an object's momentum is doubled, its kinetic energy increases by a factor of:",
              opts: ["2", "4", "8", "16"],
              ans: 1,
              exp: "K = p^2 / (2m). Doubling p results in (2p)^2 = 4p^2, quadrupling the kinetic energy."
            }
          ]
        },
        {
          id: "circular-motion",
          num: "07",
          name: "Circular Motion",
          desc: "Centripetal acceleration, centripetal force, banked roads, vertical circular motion.",
          concepts: [
            "Centripetal Acceleration a_c = v²/r = ω²r, directed radially inward toward center.",
            "Centripetal Force F_c = m v²/r is NOT a new physical force, but the net inward force.",
            "Banked Roads: Ideal banking angle tan(θ) = v² / (r g) requires no friction."
          ],
          formulas: [
            { name: "Centripetal Acceleration", eq: "a_c = \\frac{v^2}{r} = \\omega^2 r", vars: "v = linear speed, ω = angular velocity, r = radius" },
            { name: "Ideal Banking Angle", eq: "\\tan \\theta = \\frac{v^2}{r g}", vars: "θ = banking angle, g = 9.8 m/s²" }
          ],
          examples: [
            {
              title: "Minimum Speed at Top of Vertical Loop",
              problem: "A roller coaster car loops a circle of radius 10 m. What is the minimum speed at the apex to prevent falling?",
              solution: "At apex, gravity provides centripetal force: mg = m v²/r => v_min = √(rg) = √(10 × 9.8) = √98 ≈ 9.9 m/s."
            }
          ],
          mcqs: [
            {
              q: "For a body in uniform circular motion, which of the following is CONSTANT?",
              opts: ["Velocity", "Acceleration", "Speed", "Displacement"],
              ans: 2,
              exp: "Speed (magnitude) is constant, while direction of velocity and acceleration continuously changes."
            }
          ]
        },
        {
          id: "gravitation",
          num: "08",
          name: "Gravitation",
          desc: "Newton's law of gravitation, gravitational field, orbital mechanics, escape velocity, Kepler's laws.",
          concepts: [
            "Newton's Universal Law: F = G (m1 m2) / r².",
            "Kepler's Laws: 1) Elliptical orbits, 2) Equal areas in equal times, 3) T² ∝ r³.",
            "Escape Velocity v_esc = √(2 G M / R) = √(2 g R) ≈ 11.2 km/s for Earth."
          ],
          formulas: [
            { name: "Gravitational Force", eq: "F_g = G \\frac{M m}{r^2}", vars: "G = 6.674 × 10^{-11} N·m²/kg²" },
            { name: "Escape Velocity", eq: "v_{\\text{esc}} = \\sqrt{\\frac{2 G M}{R}} = \\sqrt{2 g R}", vars: "M = planet mass, R = planet radius" }
          ],
          examples: [
            {
              title: "Weight at High Altitude",
              problem: "How does acceleration due to gravity change at an altitude h equal to Earth's radius R?",
              solution: "g' = G M / (R + h)² = G M / (2R)² = (1/4) (G M / R²) = g / 4 = 9.8 / 4 = 2.45 m/s²."
            }
          ],
          mcqs: [
            {
              q: "According to Kepler's Third Law, if a planet's orbital radius is 4 times that of Earth, its orbital period is:",
              opts: ["2 years", "4 years", "8 years", "16 years"],
              ans: 2,
              exp: "T² ∝ r³ => T = (4)^(3/2) = (√4)³ = 2³ = 8 years."
            }
          ]
        },
        {
          id: "fluid-mechanics",
          num: "09",
          name: "Fluid Mechanics",
          desc: "Density, pressure, Pascal's principle, Archimedes' principle, continuity equation, Bernoulli's theorem.",
          concepts: [
            "Pressure at depth h: P = P_0 + ρ g h.",
            "Archimedes' Principle: Buoyant force F_B = ρ_fluid V_submerged g.",
            "Bernoulli's Equation: P + 1/2 ρ v² + ρ g y = constant (conservation of energy in streamline flow)."
          ],
          formulas: [
            { name: "Hydrostatic Pressure", eq: "P = P_0 + \\rho g h", vars: "ρ = fluid density, h = depth" },
            { name: "Continuity Equation", eq: "A_1 v_1 = A_2 v_2", vars: "A = cross-sectional area, v = fluid speed" },
            { name: "Bernoulli's Equation", eq: "P + \\frac{1}{2}\\rho v^2 + \\rho g y = \\text{constant}", vars: "P = static pressure, 1/2 ρ v² = dynamic pressure" }
          ],
          examples: [
            {
              title: "Continuity Speed Increase in Pipe",
              problem: "Water flows at 2 m/s through a pipe of diameter 4 cm. What is the speed when constricted to 2 cm diameter?",
              solution: "A1 v1 = A2 v2 => (π d1²/4) v1 = (π d2²/4) v2 => v2 = v1 (d1/d2)² = 2 × (4/2)² = 2 × 4 = 8 m/s."
            }
          ],
          mcqs: [
            {
              q: "Why does an airplane wing generate lift according to Bernoulli's principle?",
              opts: [
                "Air moves faster over the curved top surface, creating lower pressure above",
                "Air moves slower over the top, creating high upward pressure",
                "Gravity is canceled by atmospheric density",
                "Buoyancy lifts the metal fuselage"
              ],
              ans: 0,
              exp: "Higher velocity on top corresponds to reduced pressure, creating an upward net aerodynamic lift."
            }
          ]
        }
      ]
    },
    {
      id: "heat-thermodynamics",
      number: "CHAPTER 02",
      name: "HEAT & THERMODYNAMICS",
      desc: "Thermal physics, temperature scales, heat transfer, gas laws, kinetic theory and thermodynamic laws.",
      topicCount: 7,
      difficulty: "Intermediate",
      topics: [
        { id: "temperature", num: "01", name: "Temperature", desc: "Thermal equilibrium, Zeroth Law, Celsius, Kelvin and Fahrenheit scales." },
        { id: "heat", num: "02", name: "Heat", desc: "Specific heat capacity, latent heat of fusion/vaporization and calorimetry." },
        { id: "thermal-expansion", num: "03", name: "Thermal Expansion", desc: "Linear (α), superficial (β), and volumetric (γ) expansion of solids and liquids." },
        { id: "heat-transfer", num: "04", name: "Heat Transfer", desc: "Conduction (Fourier's Law), convection, and thermal radiation (Stefan-Boltzmann Law)." },
        { id: "gas-laws", num: "05", name: "Gas Laws", desc: "Boyle's Law, Charles's Law, Gay-Lussac's Law and Ideal Gas Equation PV = nRT." },
        { id: "kinetic-theory", num: "06", name: "Kinetic Theory", desc: "Molecular velocities, RMS speed, degrees of freedom and equipartition of energy." },
        { id: "thermodynamics", num: "07", name: "Thermodynamics", desc: "First Law (ΔU = Q - W), isobaric, isothermal, adiabatic processes, Second Law and Carnot cycle." }
      ]
    },
    {
      id: "waves-oscillations",
      number: "CHAPTER 03",
      name: "WAVES & OSCILLATIONS",
      desc: "Simple harmonic motion, mechanical waves, acoustic phenomena, resonance and interference.",
      topicCount: 6,
      difficulty: "Intermediate",
      topics: [
        { id: "shm", num: "01", name: "Simple Harmonic Motion", desc: "Restoring force, differential equation, time period of simple pendulum and mass-spring systems." },
        { id: "wave-motion", num: "02", name: "Wave Motion", desc: "Transverse vs longitudinal waves, wave speed v = fλ, phase differences." },
        { id: "wave-properties", num: "03", name: "Wave Properties", desc: "Reflection, transmission, boundary conditions and wave power/intensity." },
        { id: "sound", num: "04", name: "Sound", desc: "Speed of sound in media, decibel scale, Doppler effect in acoustics." },
        { id: "resonance", num: "05", name: "Resonance", desc: "Forced oscillations, damping, quality factor (Q) and acoustic standing waves in pipes." },
        { id: "superposition", num: "06", name: "Superposition", desc: "Principle of superposition, interference, beats (f_beat = |f1 - f2|) and standing wave nodes." }
      ]
    },
    {
      id: "electricity",
      number: "CHAPTER 04",
      name: "ELECTRICITY",
      desc: "Electrostatics, Coulomb's law, electric fields, potential, capacitance, DC circuits and Kirchhoff's laws.",
      topicCount: 8,
      difficulty: "Advanced",
      topics: [
        { id: "electric-charge", num: "01", name: "Electric Charge", desc: "Quantization of charge, conservation, Coulomb's Law and superposition of forces." },
        { id: "electric-field", num: "02", name: "Electric Field", desc: "Field lines, Gauss's Law (Φ = Q_enc/ε_0) and fields of symmetric charge distributions." },
        { id: "electric-potential", num: "03", name: "Electric Potential", desc: "Potential energy, potential difference V, equipotential surfaces, relation E = -dV/dr." },
        { id: "capacitance", num: "04", name: "Capacitance", desc: "Parallel plate capacitors, dielectrics, energy storage (1/2 C V²), series and parallel combinations." },
        { id: "current-electricity", num: "05", name: "Current Electricity", desc: "Drift velocity, current density J = n e v_d, Ohm's Law and resistivity." },
        { id: "resistance", num: "06", name: "Resistance", desc: "Temperature coefficient of resistance, color coding, internal resistance of cells and EMF." },
        { id: "circuits", num: "07", name: "Electrical Circuits", desc: "Series and parallel circuits, voltage dividers, Wheatstone bridge and potentiometer." },
        { id: "kirchhoffs-laws", num: "08", name: "Kirchhoff's Laws", desc: "Kirchhoff's Current Law (Junction rule) and Kirchhoff's Voltage Law (Loop rule)." }
      ]
    },
    {
      id: "magnetism",
      number: "CHAPTER 05",
      name: "MAGNETISM & ELECTROMAGNETISM",
      desc: "Magnetic fields, Lorentz force, Biot-Savart law, Ampere's law, electromagnetic induction and AC circuits.",
      topicCount: 8,
      difficulty: "Advanced",
      topics: [
        { id: "magnetic-field", num: "01", name: "Magnetic Field", desc: "Magnetic poles, field lines, Biot-Savart Law and Ampere's Circuital Law." },
        { id: "magnetic-force", num: "02", name: "Magnetic Force", desc: "Lorentz force F = q(E + v × B), force on current-carrying conductor (F = I L × B) and cyclotron." },
        { id: "induction", num: "03", name: "Electromagnetic Induction", desc: "Magnetic flux Φ = B · A, induced EMF and motional electromotive force." },
        { id: "faradays-law", num: "04", name: "Faraday's Law", desc: "Magnitude of induced EMF ε = -dΦ/dt and rate of flux change." },
        { id: "lenzs-law", num: "05", name: "Lenz's Law", desc: "Direction of induced current opposes the change in flux causing it (energy conservation)." },
        { id: "ac-dc", num: "06", name: "AC and DC", desc: "Alternating current generation, RMS values (V_rms = V_0 / √2), power factor and RLC circuits." },
        { id: "transformers", num: "07", name: "Transformers", desc: "Step-up and step-down transformers, turn ratio V_s/V_p = N_s/N_p, efficiency and eddy currents." },
        { id: "em-waves", num: "08", name: "Electromagnetic Waves", desc: "Maxwell's equations, displacement current, EM spectrum from radio to gamma rays." }
      ]
    },
    {
      id: "optics",
      number: "CHAPTER 06",
      name: "OPTICS",
      desc: "Geometrical ray optics, reflection, refraction, lenses, optical instruments and wave nature of light.",
      topicCount: 8,
      difficulty: "Intermediate",
      topics: [
        { id: "reflection", num: "01", name: "Reflection", desc: "Laws of reflection, plane mirrors, virtual images, ray diagrams." },
        { id: "refraction", num: "02", name: "Refraction", desc: "Snell's Law (n1 sin θ1 = n2 sin θ2), refractive index and total internal reflection (critical angle)." },
        { id: "mirrors", num: "03", name: "Mirrors", desc: "Concave and convex spherical mirrors, mirror equation (1/f = 1/v + 1/u), magnification." },
        { id: "lenses", num: "04", name: "Lenses", desc: "Thin lens formula (1/f = 1/v - 1/u), Lens Maker's equation, optical power in Diopters (P = 1/f)." },
        { id: "optical-instruments", num: "05", name: "Optical Instruments", desc: "Simple and compound microscopes, astronomical telescopes and resolving power." },
        { id: "interference", num: "06", name: "Interference", desc: "Young's double-slit experiment (YDSE), fringe width β = λ D / d, coherent light sources." },
        { id: "diffraction", num: "07", name: "Diffraction", desc: "Single-slit diffraction, central maximum width, diffraction gratings and Rayleigh criterion." },
        { id: "polarization", num: "08", name: "Polarization", desc: "Transverse nature of light, Malus's Law (I = I_0 cos² θ) and Brewster's angle (tan θ_p = n)." }
      ]
    },
    {
      id: "modern-physics",
      number: "CHAPTER 07",
      name: "MODERN PHYSICS",
      desc: "Special relativity, quantum mechanics, photoelectric effect, nuclear structure, radioactivity and semiconductors.",
      topicCount: 8,
      difficulty: "Advanced",
      topics: [
        { id: "relativity", num: "01", name: "Relativity", desc: "Einstein's postulates, time dilation, length contraction, relativistic mass-energy E = mc²." },
        { id: "quantum-physics", num: "02", name: "Quantum Physics", desc: "Planck's quantum hypothesis E = hf, de Broglie wavelength λ = h/p, Heisenberg uncertainty." },
        { id: "photoelectric", num: "03", name: "Photoelectric Effect", desc: "Einstein's photoelectric equation hf = Φ + K_max, work function and stopping potential." },
        { id: "atomic-physics", num: "04", name: "Atomic Physics", desc: "Rutherford model, Bohr model of hydrogen atom, energy levels E_n = -13.6/n² eV and spectral series." },
        { id: "nuclear-physics", num: "05", name: "Nuclear Physics", desc: "Mass defect, binding energy per nucleon curve, nuclear fission and fusion reactions." },
        { id: "radioactivity", num: "06", name: "Radioactivity", desc: "Alpha, beta, gamma decays, decay law N = N_0 e^(-λt), half-life T_1/2 = ln(2)/λ." },
        { id: "semiconductors", num: "07", name: "Semiconductors", desc: "Intrinsic vs extrinsic semiconductors, p-n junction diode, forward/reverse bias and LED/solar cells." },
        { id: "electronics", num: "08", name: "Electronics", desc: "Rectifiers (half-wave & full-wave), transistors, logic gates (AND, OR, NOT, NAND, NOR) and truth tables." }
      ]
    }
  ];

  // Storage & State Management
  const STORAGE_KEY = "NOVIX_PHYSICS_PROGRESS_V2";
  let progressState = {
    completedTopics: {},
    chapterScores: {},
    questionsSolved: 184,
    currentStreak: 5,
    lastActive: new Date().toISOString()
  };

  function loadProgress() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        progressState = Object.assign(progressState, JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Using default progress state", e);
    }
  }

  function saveProgress() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressState));
      updateGlobalStatsUI();
    } catch (e) {
      console.error("Save progress error", e);
    }
  }

  function getChapterCompletionPercent(chapterId) {
    const chap = CHAPTERS_DATA.find(c => c.id === chapterId);
    if (!chap || !chap.topics || chap.topics.length === 0) return 0;
    const completedCount = chap.topics.filter(t => progressState.completedTopics[`${chapterId}_${t.id}`]).length;
    return Math.round((completedCount / chap.topics.length) * 100);
  }

  function getOverallProgressPercent() {
    const totalTopics = CHAPTERS_DATA.reduce((acc, c) => acc + c.topics.length, 0);
    const totalCompleted = Object.keys(progressState.completedTopics).filter(k => progressState.completedTopics[k]).length;
    return Math.min(100, Math.round((totalCompleted / totalTopics) * 100));
  }

  function getCompletedChaptersCount() {
    return CHAPTERS_DATA.filter(c => getChapterCompletionPercent(c.id) === 100).length;
  }

  // UI Renderers
  function renderChapterCards() {
    const container = document.getElementById("chapters-container");
    if (!container) return;

    container.innerHTML = "";

    CHAPTERS_DATA.forEach(chap => {
      const percent = getChapterCompletionPercent(chap.id);
      const card = document.createElement("div");
      card.className = "chapter-card";
      card.id = `chapter-card-${chap.id}`;

      card.innerHTML = `
        <div>
          <div class="chapter-card-top">
            <span class="chapter-number-badge">${chap.number}</span>
            <span class="chapter-difficulty">${chap.difficulty}</span>
          </div>
          <h3 class="chapter-name">${chap.name}</h3>
          <p class="chapter-desc">${chap.desc}</p>
          <div class="chapter-meta-row">
            <span class="chapter-meta-item">📚 ${chap.topicCount} Topics</span>
            <span class="chapter-meta-item">🎯 ${percent}% Complete</span>
          </div>
          <div class="progress-bar-wrapper">
            <div class="progress-track">
              <div class="progress-fill" style="width: ${percent}%;"></div>
            </div>
          </div>
        </div>
        <div class="chapter-actions">
          <button class="btn btn-secondary btn-sm continue-btn" data-chapter="${chap.id}">
            Continue Learning
          </button>
          <button class="btn btn-primary btn-sm view-btn" data-chapter="${chap.id}">
            View Chapter
          </button>
        </div>
      `;

      container.appendChild(card);
    });

    // Event Listeners for chapter cards
    container.querySelectorAll(".view-btn, .continue-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const chapId = this.getAttribute("data-chapter");
        openChapterView(chapId);
      });
    });
  }

  function updateGlobalStatsUI() {
    const overallEl = document.getElementById("stat-overall-progress");
    const completedEl = document.getElementById("stat-chapters-completed");
    const questionsEl = document.getElementById("stat-questions-solved");
    const streakEl = document.getElementById("stat-current-streak");

    if (overallEl) overallEl.textContent = `${getOverallProgressPercent()}%`;
    if (completedEl) completedEl.textContent = `${getCompletedChaptersCount()} / 7`;
    if (questionsEl) questionsEl.textContent = `${progressState.questionsSolved}`;
    if (streakEl) streakEl.textContent = `🔥 ${progressState.currentStreak} Days`;
  }

  // Chapter View Management
  let currentChapter = null;

  function openChapterView(chapId) {
    const chap = CHAPTERS_DATA.find(c => c.id === chapId);
    if (!chap) return;
    currentChapter = chap;

    // Update URL without full reload
    const newUrl = new URL(window.location);
    newUrl.searchParams.set("chapter", chapId);
    window.history.pushState({ chapter: chapId }, "", newUrl);

    // Toggle visibility
    const homeView = document.getElementById("physics-home-view");
    const chapView = document.getElementById("physics-chapter-view");

    if (homeView) homeView.style.display = "none";
    if (chapView) {
      chapView.style.display = "block";
      chapView.classList.add("active");
    }

    // Populate Chapter Header
    document.getElementById("chap-view-number").textContent = chap.number;
    document.getElementById("chap-view-title").textContent = chap.name;
    document.getElementById("chap-view-desc").textContent = chap.desc;
    document.getElementById("chap-breadcrumb-name").textContent = chap.name;

    const percent = getChapterCompletionPercent(chap.id);
    const progressFill = document.getElementById("chap-view-progress-fill");
    const progressLabel = document.getElementById("chap-view-progress-label");
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (progressLabel) progressLabel.textContent = `${percent}% Complete`;

    // Render Topics List inside Chapter
    const topicsList = document.getElementById("chap-topics-container");
    if (topicsList) {
      topicsList.innerHTML = "";
      chap.topics.forEach(topic => {
        const isDone = !!progressState.completedTopics[`${chap.id}_${topic.id}`];
        const row = document.createElement("div");
        row.className = `topic-row-card ${isDone ? "completed" : ""}`;
        row.id = `topic-row-${topic.id}`;

        row.innerHTML = `
          <div class="topic-info-side">
            <div class="topic-num-pill">${topic.num}</div>
            <div class="topic-main-text">
              <h4>${topic.name}</h4>
              <p>${topic.desc || "Fundamental theory, formula sheets, worked examples and interactive practice."}</p>
            </div>
          </div>
          <div class="topic-actions-side">
            <span class="topic-status-tag ${isDone ? "completed" : "not-started"}">
              ${isDone ? "✓ Mastered" : "Not Started"}
            </span>
            <button class="btn btn-outline btn-sm open-topic-btn" data-topic="${topic.id}">
              ${isDone ? "Review Topic" : "Start Learning"}
            </button>
          </div>
        `;

        topicsList.appendChild(row);
      });

      topicsList.querySelectorAll(".open-topic-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const topicId = this.getAttribute("data-topic");
          openTopicExperience(chap.id, topicId);
        });
      });
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeChapterView() {
    const homeView = document.getElementById("physics-home-view");
    const chapView = document.getElementById("physics-chapter-view");

    if (homeView) homeView.style.display = "block";
    if (chapView) {
      chapView.style.display = "none";
      chapView.classList.remove("active");
    }

    const newUrl = new URL(window.location);
    newUrl.searchParams.delete("chapter");
    window.history.pushState({}, "", newUrl);

    renderChapterCards();
    updateGlobalStatsUI();
  }

  // Topic Learning Experience (Modal / Deep View)
  let activeTopic = null;

  function openTopicExperience(chapId, topicId) {
    const chap = CHAPTERS_DATA.find(c => c.id === chapId);
    if (!chap) return;
    const topic = chap.topics.find(t => t.id === topicId) || chap.topics[0];
    activeTopic = { chapter: chap, topic: topic };

    const modal = document.getElementById("topic-experience-modal");
    if (!modal) return;

    document.getElementById("modal-topic-title").textContent = topic.name;
    document.getElementById("modal-topic-subtitle").textContent = `${chap.number} : ${chap.name}`;

    // Render Learn / Notes
    const learnPane = document.getElementById("tab-pane-learn");
    if (learnPane) {
      const concepts = topic.concepts || [
        `Core principles of ${topic.name} in classical and modern physics.`,
        "Rigorous definitions with dimensional analysis and vector components.",
        "Experimental observations, conservation principles and physical intuition."
      ];
      learnPane.innerHTML = `
        <div class="concept-box">
          <h4>💡 Core Concept Overview</h4>
          <p>Mastering <strong>${topic.name}</strong> provides essential analytical tools for solving complex STEM problems.</p>
        </div>
        <div style="margin-top: 16px;">
          <h4 style="font-size: 16px; margin-bottom: 12px; color: var(--navy);">Essential Principles</h4>
          <ul style="padding-left: 20px; line-height: 1.8;">
            ${concepts.map(c => `<li>${c}</li>`).join("")}
          </ul>
        </div>
      `;
    }

    // Render Formulas
    const formulaPane = document.getElementById("tab-pane-formulas");
    if (formulaPane) {
      const formulas = topic.formulas || [
        { name: "Governing Equation", eq: "F = m a \\quad \\text{or} \\quad E = m c^2", vars: "Standard SI variables" }
      ];
      formulaPane.innerHTML = `
        <h4 style="font-size: 16px; margin-bottom: 16px; color: var(--navy);">📐 Formula Sheet & Unit Definitions</h4>
        ${formulas.map(f => `
          <div class="formula-card">
            <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; color: var(--navy);">${f.name}</div>
            <div class="formula-equation">${f.eq}</div>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 6px;"><strong>Where:</strong> ${f.vars}</div>
          </div>
        `).join("")}
      `;
    }

    // Render Worked Examples
    const examplePane = document.getElementById("tab-pane-examples");
    if (examplePane) {
      const examples = topic.examples || [
        {
          title: `Standard Numerical on ${topic.name}`,
          problem: `A system undergoes a transition involving ${topic.name}. Given mass m = 2 kg and acceleration a = 5 m/s², compute the net force.`,
          solution: "Using F_net = m · a = (2 kg)(5 m/s²) = 10 N."
        }
      ];
      examplePane.innerHTML = `
        <h4 style="font-size: 16px; margin-bottom: 16px; color: var(--navy);">📝 Step-by-Step Solved Examples</h4>
        ${examples.map(ex => `
          <div class="example-box">
            <span class="example-badge">${ex.title}</span>
            <p style="font-weight: 600; margin-bottom: 10px;">${ex.problem}</p>
            <div class="step-row">
              <strong style="color: var(--primary);">Solution:</strong>
              <p style="margin-top: 4px; color: var(--text-sub);">${ex.solution}</p>
            </div>
          </div>
        `).join("")}
      `;
    }

    // Render Practice / MCQs
    const practicePane = document.getElementById("tab-pane-practice");
    if (practicePane) {
      const mcqs = topic.mcqs || [
        {
          q: `Which fundamental principle is most closely associated with ${topic.name}?`,
          opts: ["Conservation of Energy", "Law of Gravitation", "Pauli Exclusion", "Coulomb's Law"],
          ans: 0,
          exp: "Conservation of Energy governs all closed physical systems across mechanics, thermodynamics, and optics."
        }
      ];

      practicePane.innerHTML = `
        <h4 style="font-size: 16px; margin-bottom: 16px; color: var(--navy);">🎯 Interactive Practice MCQs</h4>
        ${mcqs.map((m, idx) => `
          <div class="practice-mcq-card" data-qidx="${idx}">
            <p style="font-weight: 700; margin-bottom: 12px;">Q${idx + 1}. ${m.q}</p>
            <div class="mcq-options-grid">
              ${m.opts.map((opt, oidx) => `
                <button class="mcq-option-btn" data-oidx="${oidx}" data-qidx="${idx}">${String.fromCharCode(65 + oidx)}. ${opt}</button>
              `).join("")}
            </div>
            <div class="mcq-explanation-box" id="mcq-exp-${idx}">
              <strong>Explanation:</strong> ${m.exp}
            </div>
          </div>
        `).join("")}
      `;

      // Attach MCQ listeners
      practicePane.querySelectorAll(".mcq-option-btn").forEach(btn => {
        btn.addEventListener("click", function () {
          const qidx = parseInt(this.getAttribute("data-qidx"));
          const oidx = parseInt(this.getAttribute("data-oidx"));
          const correctIdx = mcqs[qidx].ans;
          const parent = this.closest(".practice-mcq-card");
          const allBtns = parent.querySelectorAll(".mcq-option-btn");

          allBtns.forEach(b => b.classList.remove("correct", "incorrect"));

          if (oidx === correctIdx) {
            this.classList.add("correct");
            progressState.questionsSolved += 1;
            saveProgress();
          } else {
            this.classList.add("incorrect");
            allBtns[correctIdx].classList.add("correct");
          }

          const expBox = parent.querySelector(".mcq-explanation-box");
          if (expBox) expBox.classList.add("active");
        });
      });
    }

    // Reset to Learn tab
    switchTopicTab("learn");

    modal.classList.add("active");
  }

  function switchTopicTab(tabName) {
    document.querySelectorAll(".topic-tab-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });

    document.querySelectorAll(".topic-tab-pane").forEach(pane => {
      pane.classList.toggle("active", pane.id === `tab-pane-${tabName}`);
    });
  }

  function markTopicComplete() {
    if (!activeTopic) return;
    const key = `${activeTopic.chapter.id}_${activeTopic.topic.id}`;
    progressState.completedTopics[key] = true;
    saveProgress();

    // Close modal and refresh chapter view
    document.getElementById("topic-experience-modal").classList.remove("active");
    openChapterView(activeTopic.chapter.id);
  }

  // Chapter Test System
  let testState = {
    chapter: null,
    questions: [],
    currentIndex: 0,
    answers: {},
    timerSeconds: 600,
    intervalId: null
  };

  function startChapterTest(chapId) {
    const chap = CHAPTERS_DATA.find(c => c.id === chapId);
    if (!chap) return;

    testState.chapter = chap;
    testState.currentIndex = 0;
    testState.answers = {};
    testState.timerSeconds = 600;

    // Generate 5 questions for the chapter
    testState.questions = [
      {
        q: `What is the primary governing principle of ${chap.name}?`,
        opts: ["Conservation of Energy and Momentum", "Quantum Superposition only", "Static Gravitation", "Frictional Dissipation"],
        ans: 0,
        exp: "Conservation laws are universally foundational across all physical interactions."
      },
      {
        q: `In ${chap.name}, what are standard SI dimensions for work and torque?`,
        opts: ["[M L T^-1]", "[M L^2 T^-2]", "[M^2 L T^-2]", "[M L^-1 T^-2]"],
        ans: 1,
        exp: "Both work and torque have dimensions of mass × length² × time⁻² (Joules or N·m)."
      },
      {
        q: `Which condition is essential when applying ideal equations in ${chap.name}?`,
        opts: ["Inertial reference frame", "Extreme relativistic speed", "Non-zero friction", "Zero atmospheric pressure"],
        ans: 0,
        exp: "Standard Newton and thermodynamic laws are strictly formulated in inertial reference frames."
      },
      {
        q: `How does doubling the system frequency affect energy in periodic oscillations in ${chap.name}?`,
        opts: ["Halves the energy", "Doubles the energy", "Quadruples the energy (4×)", "Energy is independent of frequency"],
        ans: 2,
        exp: "Total vibrational energy is proportional to the square of frequency (E ∝ f²)."
      },
      {
        q: `When solving numerical problems in ${chap.name}, what is the first critical step?`,
        opts: ["Plug numbers into calculator", "Draw coordinate system & list knowns with SI units", "Ignore dimensional consistency", "Guess the final significant figure"],
        ans: 1,
        exp: "Establishing coordinate axes and verifying SI units eliminates algebraic and vector sign errors."
      }
    ];

    const modal = document.getElementById("chapter-test-modal");
    if (!modal) return;

    document.getElementById("test-chapter-title").textContent = `${chap.name} Mastery Test`;
    document.getElementById("test-active-view").style.display = "block";
    document.getElementById("test-result-view").style.display = "none";

    renderTestQuestion();
    startTestTimer();

    modal.classList.add("active");
  }

  function renderTestQuestion() {
    const q = testState.questions[testState.currentIndex];
    if (!q) return;

    document.getElementById("test-q-number").textContent = `Question ${testState.currentIndex + 1} of ${testState.questions.length}`;
    document.getElementById("test-q-text").textContent = q.q;

    const optsContainer = document.getElementById("test-options-container");
    optsContainer.innerHTML = "";

    q.opts.forEach((opt, idx) => {
      const btn = document.createElement("button");
      btn.className = `mcq-option-btn ${testState.answers[testState.currentIndex] === idx ? "correct" : ""}`;
      btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;
      btn.addEventListener("click", () => {
        testState.answers[testState.currentIndex] = idx;
        renderTestQuestion();
      });
      optsContainer.appendChild(btn);
    });

    document.getElementById("test-prev-btn").disabled = testState.currentIndex === 0;
    const nextBtn = document.getElementById("test-next-btn");
    if (testState.currentIndex === testState.questions.length - 1) {
      nextBtn.textContent = "Finish Test";
    } else {
      nextBtn.textContent = "Next Question";
    }
  }

  function startTestTimer() {
    clearInterval(testState.intervalId);
    const timerEl = document.getElementById("test-timer-display");

    testState.intervalId = setInterval(() => {
      testState.timerSeconds -= 1;
      const mins = Math.floor(testState.timerSeconds / 60);
      const secs = testState.timerSeconds % 60;
      if (timerEl) {
        timerEl.textContent = `⏱️ ${mins}:${secs < 10 ? "0" : ""}${secs}`;
      }

      if (testState.timerSeconds <= 0) {
        clearInterval(testState.intervalId);
        finishChapterTest();
      }
    }, 1000);
  }

  function finishChapterTest() {
    clearInterval(testState.intervalId);

    let correctCount = 0;
    testState.questions.forEach((q, idx) => {
      if (testState.answers[idx] === q.ans) {
        correctCount += 1;
      }
    });

    const scorePercent = Math.round((correctCount / testState.questions.length) * 100);
    progressState.chapterScores[testState.chapter.id] = scorePercent;
    progressState.questionsSolved += testState.questions.length;
    saveProgress();

    document.getElementById("test-active-view").style.display = "none";
    const resultView = document.getElementById("test-result-view");
    resultView.style.display = "block";

    document.getElementById("test-score-num").textContent = `${scorePercent}%`;
    document.getElementById("test-score-msg").textContent = scorePercent >= 70
      ? `Outstanding! You have proven strong conceptual mastery of ${testState.chapter.name}.`
      : `Good effort! Review key formulas and re-attempt to solidify your understanding.`;
  }

  // Quick Search Engine
  function performSearch(query) {
    const q = query.trim().toLowerCase();
    const resultsContainer = document.getElementById("search-results-list");
    if (!resultsContainer) return;

    if (!q) {
      resultsContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">Type keywords like 'Newton', 'Snell', 'Thermodynamics', 'Vectors'...</div>`;
      return;
    }

    const results = [];

    CHAPTERS_DATA.forEach(chap => {
      if (chap.name.toLowerCase().includes(q) || chap.desc.toLowerCase().includes(q)) {
        results.push({ type: "Chapter", title: chap.name, meta: chap.number, chapId: chap.id });
      }

      chap.topics.forEach(top => {
        if (top.name.toLowerCase().includes(q) || (top.desc && top.desc.toLowerCase().includes(q))) {
          results.push({ type: "Topic", title: top.name, meta: chap.name, chapId: chap.id, topicId: top.id });
        }

        if (top.formulas) {
          top.formulas.forEach(f => {
            if (f.name.toLowerCase().includes(q) || f.eq.toLowerCase().includes(q)) {
              results.push({ type: "Formula", title: f.name, meta: `${top.name} (${chap.name})`, chapId: chap.id, topicId: top.id });
            }
          });
        }
      });
    });

    if (results.length === 0) {
      resultsContainer.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted);">No matching chapters or formulas found for "${query}".</div>`;
      return;
    }

    resultsContainer.innerHTML = results.slice(0, 10).map(r => `
      <div class="search-result-item" data-chap="${r.chapId}" data-topic="${r.topicId || ''}">
        <div>
          <div class="search-result-title">${r.title}</div>
          <div style="font-size: 12px; color: var(--text-muted);">${r.meta}</div>
        </div>
        <span class="search-result-type">${r.type}</span>
      </div>
    `).join("");

    resultsContainer.querySelectorAll(".search-result-item").forEach(item => {
      item.addEventListener("click", function () {
        const cId = this.getAttribute("data-chap");
        const tId = this.getAttribute("data-topic");
        document.getElementById("search-modal-overlay").classList.remove("active");

        if (tId) {
          openChapterView(cId);
          setTimeout(() => openTopicExperience(cId, tId), 200);
        } else {
          openChapterView(cId);
        }
      });
    });
  }

  // AI Assistant Connection
  function triggerAiAssistant(action) {
    const chapName = currentChapter ? currentChapter.name : "Mechanics";
    const topicName = activeTopic ? activeTopic.topic.name : "Motion / Kinematics";

    // Direct to full AI assistant page with pre-filled context
    const targetUrl = `ai-assistant.html?subject=Physics&chapter=${encodeURIComponent(chapName)}&topic=${encodeURIComponent(topicName)}&action=${encodeURIComponent(action)}`;
    window.location.href = targetUrl;
  }

  // Initialization
  document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
    renderChapterCards();
    updateGlobalStatsUI();

    // Check URL parameters for direct chapter access (e.g. physics.html?chapter=mechanics)
    const params = new URLSearchParams(window.location.search);
    const initialChap = params.get("chapter");
    if (initialChap) {
      openChapterView(initialChap);
    }

    // Header Back button in Chapter view
    const backBtn = document.getElementById("back-to-chapters-btn");
    if (backBtn) {
      backBtn.addEventListener("click", closeChapterView);
    }

    // Modal Close Buttons
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const modal = this.closest(".topic-modal-overlay, .test-modal-overlay, .search-modal-overlay");
        if (modal) modal.classList.remove("active");
        if (testState.intervalId) clearInterval(testState.intervalId);
      });
    });

    // Topic Modal Tab Buttons
    document.querySelectorAll(".topic-tab-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const tab = this.getAttribute("data-tab");
        switchTopicTab(tab);
      });
    });

    // Mark Complete Button in Topic Modal
    const markCompleteBtn = document.getElementById("mark-topic-complete-btn");
    if (markCompleteBtn) {
      markCompleteBtn.addEventListener("click", markTopicComplete);
    }

    // Start Chapter Test Button in Chapter view
    const startTestBtn = document.getElementById("start-chapter-test-btn");
    if (startTestBtn) {
      startTestBtn.addEventListener("click", () => {
        if (currentChapter) startChapterTest(currentChapter.id);
      });
    }

    // Test Navigation Buttons
    const testPrevBtn = document.getElementById("test-prev-btn");
    if (testPrevBtn) {
      testPrevBtn.addEventListener("click", () => {
        if (testState.currentIndex > 0) {
          testState.currentIndex -= 1;
          renderTestQuestion();
        }
      });
    }

    const testNextBtn = document.getElementById("test-next-btn");
    if (testNextBtn) {
      testNextBtn.addEventListener("click", () => {
        if (testState.currentIndex < testState.questions.length - 1) {
          testState.currentIndex += 1;
          renderTestQuestion();
        } else {
          finishChapterTest();
        }
      });
    }

    const retryTestBtn = document.getElementById("retry-test-btn");
    if (retryTestBtn) {
      retryTestBtn.addEventListener("click", () => {
        if (testState.chapter) startChapterTest(testState.chapter.id);
      });
    }

    // AI Buttons in Topic Experience
    document.querySelectorAll(".ai-action-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const action = this.getAttribute("data-ai-action");
        triggerAiAssistant(action);
      });
    });

    // Search Triggers
    const searchInputs = document.querySelectorAll(".physics-search-input");
    searchInputs.forEach(input => {
      input.addEventListener("focus", () => {
        document.getElementById("search-modal-overlay").classList.add("active");
        const modalInput = document.getElementById("modal-search-input");
        if (modalInput) {
          modalInput.focus();
          performSearch(modalInput.value);
        }
      });
    });

    const modalSearchInput = document.getElementById("modal-search-input");
    if (modalSearchInput) {
      modalSearchInput.addEventListener("input", (e) => {
        performSearch(e.target.value);
      });
    }

    // Keyboard shortcut Ctrl+K / Cmd+K
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        const searchModal = document.getElementById("search-modal-overlay");
        if (searchModal) {
          searchModal.classList.add("active");
          const mInput = document.getElementById("modal-search-input");
          if (mInput) mInput.focus();
        }
      }
      if (e.key === "Escape") {
        document.querySelectorAll(".topic-modal-overlay, .test-modal-overlay, .search-modal-overlay").forEach(m => m.classList.remove("active"));
      }
    });
  });
})();
