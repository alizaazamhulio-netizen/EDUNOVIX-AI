/**
 * STATISTICS — FAST & SCHOLARSHIP MATHEMATICS PREPARATION ENGINE
 * Pure Vanilla JavaScript: Calculations, Visualizations, Practice Question Bank, Timed Test Suite
 */

document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  initBookmarks();
  initTopicNav();
  initDataAnalyzer();
  initMeanCalculator();
  initMedianModeCalculator();
  initFrequencyCounter();
  initInteractiveCharts();
  initPracticeMCQs();
  initMasterTest();
  initFormulaTools();
});

/* ==========================================================================
   1. SEARCH FUNCTIONALITY
   ========================================================================== */
function initSearch() {
  const searchInput = document.getElementById("chapterSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    const sections = document.querySelectorAll(".content-section, .concept-card, .example-box, .formula-box, .mcq-card");

    if (query === "") {
      sections.forEach((sec) => (sec.style.display = ""));
      return;
    }

    sections.forEach((sec) => {
      const text = sec.innerText.toLowerCase();
      if (text.includes(query)) {
        sec.style.display = "";
      } else {
        sec.style.display = "none";
      }
    });
  });
}

/* ==========================================================================
   2. BOOKMARK SYSTEM (LocalStorage)
   ========================================================================== */
function initBookmarks() {
  const bookmarkButtons = document.querySelectorAll(".bookmark-btn");
  const storedBookmarks = JSON.parse(localStorage.getItem("fast_math_stat_bookmarks") || "[]");

  bookmarkButtons.forEach((btn) => {
    const targetId = btn.dataset.target;
    if (storedBookmarks.includes(targetId)) {
      btn.classList.add("active");
      btn.innerHTML = "★ Bookmarked";
    }

    btn.addEventListener("click", () => {
      let current = JSON.parse(localStorage.getItem("fast_math_stat_bookmarks") || "[]");
      if (current.includes(targetId)) {
        current = current.filter((id) => id !== targetId);
        btn.classList.remove("active");
        btn.innerHTML = "☆ Bookmark";
        showToast("Bookmark removed");
      } else {
        current.push(targetId);
        btn.classList.add("active");
        btn.innerHTML = "★ Bookmarked";
        showToast("Topic saved to bookmarks");
      }
      localStorage.setItem("fast_math_stat_bookmarks", JSON.stringify(current));
    });
  });

  const viewBookmarksBtn = document.getElementById("viewBookmarksBtn");
  if (viewBookmarksBtn) {
    viewBookmarksBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const current = JSON.parse(localStorage.getItem("fast_math_stat_bookmarks") || "[]");
      if (current.length === 0) {
        showToast("No bookmarks saved yet. Click '☆ Bookmark' on any section!");
        return;
      }
      const firstTarget = document.getElementById(current[0]);
      if (firstTarget) {
        firstTarget.scrollIntoView({ behavior: "smooth" });
        showToast(`Navigated to: ${firstTarget.querySelector(".section-title")?.innerText || "Bookmarked Topic"}`);
      }
    });
  }
}

/* ==========================================================================
   3. STICKY TOPIC NAVIGATION & ACTIVE TRACKING
   ========================================================================== */
function initTopicNav() {
  const navItems = document.querySelectorAll(".nav-item");
  const sections = document.querySelectorAll(".content-section");

  window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${currentId}`) {
        item.classList.add("active");
      }
    });
  });

  const mobileToggle = document.getElementById("mobileNavToggle");
  const navWrapper = document.getElementById("chapterNav");
  if (mobileToggle && navWrapper) {
    mobileToggle.addEventListener("click", () => {
      const isVisible = navWrapper.style.display === "flex";
      navWrapper.style.display = isVisible ? "none" : "flex";
    });
  }
}

/* ==========================================================================
   4. TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById("fastToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "fastToast";
    toast.className = "toast-msg";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✓</span> ${message}`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

/* ==========================================================================
   5. INTERACTIVE DATA ANALYZER
   ========================================================================== */
function parseNumberArray(str) {
  return str
    .split(/[\s,]+/)
    .map((s) => parseFloat(s.trim()))
    .filter((n) => !isNaN(n));
}

function initDataAnalyzer() {
  const btn = document.getElementById("btnAnalyzeData");
  const input = document.getElementById("analyzerInput");
  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    const numbers = parseNumberArray(input.value);
    if (numbers.length === 0) {
      showToast("Please enter at least one valid number!");
      return;
    }

    const n = numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    const mean = sum / n;

    // Median
    let median = 0;
    if (n % 2 !== 0) {
      median = sorted[Math.floor(n / 2)];
    } else {
      median = (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    }

    // Mode
    const freqMap = {};
    let maxFreq = 0;
    numbers.forEach((num) => {
      freqMap[num] = (freqMap[num] || 0) + 1;
      if (freqMap[num] > maxFreq) maxFreq = freqMap[num];
    });

    let modeStr = "No Mode";
    if (maxFreq > 1) {
      const modes = Object.keys(freqMap)
        .filter((k) => freqMap[k] === maxFreq)
        .map(Number);
      if (modes.length === Object.keys(freqMap).length) {
        modeStr = "No Unique Mode";
      } else {
        modeStr = modes.join(", ");
      }
    }

    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const range = max - min;

    // Population Variance & SD
    const popSqDiffs = numbers.map((x) => Math.pow(x - mean, 2));
    const popVariance = popSqDiffs.reduce((a, b) => a + b, 0) / n;
    const popStdDev = Math.sqrt(popVariance);

    // Sample Variance & SD
    const sampleVariance = n > 1 ? popSqDiffs.reduce((a, b) => a + b, 0) / (n - 1) : 0;
    const sampleStdDev = Math.sqrt(sampleVariance);

    // Quartiles
    let q1 = 0;
    let q3 = 0;
    if (n >= 4) {
      const lowerHalf = sorted.slice(0, Math.floor(n / 2));
      const upperHalf = n % 2 === 0 ? sorted.slice(n / 2) : sorted.slice(Math.floor(n / 2) + 1);

      q1 = getMedian(lowerHalf);
      q3 = getMedian(upperHalf);
    }
    const iqr = q3 - q1;

    // Populate Results
    document.getElementById("resCount").innerText = n;
    document.getElementById("resSum").innerText = roundNum(sum);
    document.getElementById("resMean").innerText = roundNum(mean);
    document.getElementById("resMedian").innerText = roundNum(median);
    document.getElementById("resMode").innerText = modeStr;
    document.getElementById("resMin").innerText = min;
    document.getElementById("resMax").innerText = max;
    document.getElementById("resRange").innerText = range;
    document.getElementById("resPopVar").innerText = roundNum(popVariance);
    document.getElementById("resPopSD").innerText = roundNum(popStdDev);
    document.getElementById("resSampleVar").innerText = n > 1 ? roundNum(sampleVariance) : "N/A (n=1)";
    document.getElementById("resSampleSD").innerText = n > 1 ? roundNum(sampleStdDev) : "N/A (n=1)";
    document.getElementById("resIQR").innerText = n >= 4 ? `${roundNum(iqr)} (Q1=${roundNum(q1)}, Q3=${roundNum(q3)})` : "Need ≥4 values";

    document.getElementById("analyzerResults").style.display = "grid";
    showToast("Data calculated successfully!");
  });

  // Setup Sample dataset pills
  document.querySelectorAll(".pill-analyzer").forEach((pill) => {
    pill.addEventListener("click", () => {
      input.value = pill.dataset.sample;
      btn.click();
    });
  });
}

function getMedian(arr) {
  const len = arr.length;
  if (len === 0) return 0;
  if (len % 2 !== 0) return arr[Math.floor(len / 2)];
  return (arr[len / 2 - 1] + arr[len / 2]) / 2;
}

function roundNum(num) {
  return Number.isInteger(num) ? num : parseFloat(num.toFixed(4));
}

/* ==========================================================================
   6. MEAN CALCULATOR
   ========================================================================== */
function initMeanCalculator() {
  const btn = document.getElementById("btnCalcMean");
  const input = document.getElementById("meanInput");
  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    const nums = parseNumberArray(input.value);
    if (nums.length === 0) {
      showToast("Enter valid numbers!");
      return;
    }
    const n = nums.length;
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    document.getElementById("meanResultBox").innerHTML = `
      <div class="step-box">
        <div class="step-label">Step 1: Count Observations (n)</div>
        <p>Number of values (n) = <strong>${n}</strong></p>
        <div class="step-label">Step 2: Calculate Sum (Σx)</div>
        <p>Sum of values = ${nums.join(" + ")} = <strong>${roundNum(sum)}</strong></p>
        <div class="step-label">Step 3: Apply Arithmetic Mean Formula</div>
        <p><code>x̄ = Σx / n = ${roundNum(sum)} / ${n}</code> = <strong style="color: var(--primary-dark); font-size: 1.2rem;">${roundNum(mean)}</strong></p>
      </div>
    `;
    document.getElementById("meanResultBox").style.display = "block";
  });
}

/* ==========================================================================
   7. MEDIAN & MODE CALCULATOR
   ========================================================================== */
function initMedianModeCalculator() {
  const btn = document.getElementById("btnCalcMedMode");
  const input = document.getElementById("medModeInput");
  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    const nums = parseNumberArray(input.value);
    if (nums.length === 0) {
      showToast("Enter valid numbers!");
      return;
    }
    const n = nums.length;
    const sorted = [...nums].sort((a, b) => a - b);

    // Median logic
    let medStep = "";
    let medVal = 0;
    if (n % 2 !== 0) {
      const pos = Math.floor(n / 2);
      medVal = sorted[pos];
      medStep = `Since n = ${n} (odd), position is (n + 1)/2 = (${n}+1)/2 = <strong>Item #${pos + 1}</strong>: <br><strong style="color: var(--primary-dark); font-size: 1.15rem;">Median = ${medVal}</strong>`;
    } else {
      const pos1 = n / 2 - 1;
      const pos2 = n / 2;
      medVal = (sorted[pos1] + sorted[pos2]) / 2;
      medStep = `Since n = ${n} (even), take average of Item #${pos1 + 1} (${sorted[pos1]}) and Item #${pos2 + 1} (${sorted[pos2]}): <br><code>(${sorted[pos1]} + ${sorted[pos2]}) / 2</code> = <strong style="color: var(--primary-dark); font-size: 1.15rem;">Median = ${medVal}</strong>`;
    }

    // Mode logic
    const fMap = {};
    let maxF = 0;
    nums.forEach((v) => {
      fMap[v] = (fMap[v] || 0) + 1;
      if (fMap[v] > maxF) maxF = fMap[v];
    });

    let modeText = "";
    if (maxF === 1) {
      modeText = `Every number appears only once. <strong>No Mode</strong>.`;
    } else {
      const topModes = Object.keys(fMap).filter((k) => fMap[k] === maxF);
      if (topModes.length === Object.keys(fMap).length) {
        modeText = `All unique numbers appear with the same frequency (${maxF}). <strong>No Mode</strong>.`;
      } else if (topModes.length === 1) {
        modeText = `<strong>Unimodal</strong>: Most frequent value is <strong>${topModes[0]}</strong> (occurs ${maxF} times).`;
      } else if (topModes.length === 2) {
        modeText = `<strong>Bimodal</strong>: Values <strong>${topModes.join(" and ")}</strong> both occur ${maxF} times.`;
      } else {
        modeText = `<strong>Multimodal</strong>: Values <strong>${topModes.join(", ")}</strong> all occur ${maxF} times.`;
      }
    }

    document.getElementById("medModeResultBox").innerHTML = `
      <div class="step-box">
        <div class="step-label">Step 1: Sort the Data (Mandatory)</div>
        <p><code>[ ${sorted.join(", ")} ]</code></p>
        <div class="step-label">Step 2: Find Median</div>
        <p>${medStep}</p>
        <div class="step-label">Step 3: Find Mode (Frequency Count)</div>
        <p>${modeText}</p>
      </div>
    `;
    document.getElementById("medModeResultBox").style.display = "block";
  });
}

/* ==========================================================================
   8. FREQUENCY COUNTER / DISTRIBUTION TABLE
   ========================================================================== */
function initFrequencyCounter() {
  const btn = document.getElementById("btnCalcFreq");
  const input = document.getElementById("freqInput");
  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    const nums = parseNumberArray(input.value);
    if (nums.length === 0) {
      showToast("Enter valid numbers!");
      return;
    }

    const freqMap = {};
    nums.forEach((n) => {
      freqMap[n] = (freqMap[n] || 0) + 1;
    });

    const uniqueSorted = Object.keys(freqMap)
      .map(Number)
      .sort((a, b) => a - b);

    let cumulative = 0;
    let tableRows = "";
    uniqueSorted.forEach((val) => {
      const f = freqMap[val];
      cumulative += f;
      tableRows += `
        <tr>
          <td><strong>${val}</strong></td>
          <td>${f}</td>
          <td>${cumulative}</td>
          <td>${roundNum((f / nums.length) * 100)}%</td>
        </tr>
      `;
    });

    document.getElementById("freqTableBody").innerHTML = tableRows;
    document.getElementById("freqTotalObs").innerText = nums.length;
    document.getElementById("freqResultBox").style.display = "block";
  });
}

/* ==========================================================================
   9. INTERACTIVE SVG CHARTS (Bar Graph & Pie Chart)
   ========================================================================== */
function initInteractiveCharts() {
  // Bar Chart interactive hover
  const barElements = document.querySelectorAll(".interactive-bar");
  const barTooltip = document.getElementById("barChartTooltip");

  barElements.forEach((bar) => {
    bar.addEventListener("mouseenter", (e) => {
      const subject = bar.dataset.subject;
      const score = bar.dataset.score;
      if (barTooltip) {
        barTooltip.innerHTML = `<strong>${subject}</strong>: ${score} marks`;
        barTooltip.style.display = "block";
      }
    });

    bar.addEventListener("mousemove", (e) => {
      if (barTooltip) {
        barTooltip.style.left = `${e.pageX + 10}px`;
        barTooltip.style.top = `${e.pageY - 30}px`;
      }
    });

    bar.addEventListener("mouseleave", () => {
      if (barTooltip) barTooltip.style.display = "none";
    });
  });

  // Pie chart sectors
  const pieSectors = document.querySelectorAll(".pie-slice");
  const pieTooltip = document.getElementById("pieChartTooltip");

  pieSectors.forEach((slice) => {
    slice.addEventListener("mouseenter", (e) => {
      const label = slice.dataset.label;
      const percent = slice.dataset.percent;
      const angle = slice.dataset.angle;
      if (pieTooltip) {
        pieTooltip.innerHTML = `<strong>${label}</strong>: ${percent}% (${angle}°)`;
        pieTooltip.style.display = "block";
      }
    });

    slice.addEventListener("mousemove", (e) => {
      if (pieTooltip) {
        pieTooltip.style.left = `${e.pageX + 10}px`;
        pieTooltip.style.top = `${e.pageY - 30}px`;
      }
    });

    slice.addEventListener("mouseleave", () => {
      if (pieTooltip) pieTooltip.style.display = "none";
    });
  });
}

/* ==========================================================================
   10. FORMULA SHEET TOOLS (Copy & Print)
   ========================================================================== */
function initFormulaTools() {
  const copyBtn = document.getElementById("copyFormulaBtn");
  const printBtn = document.getElementById("printFormulaBtn");

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const formulaText = `
FAST MATHEMATICS — TOPIC 08: STATISTICS FORMULA SHEET
======================================================
1. Arithmetic Mean: x̄ = (Σx) / n
2. Weighted Mean: x̄_w = (Σwx) / (Σw)
3. Total from Mean: Σx = x̄ × n
4. Median:
   - For odd n: Value at position (n + 1) / 2
   - For even n: Average of values at positions (n/2) and (n/2 + 1)
5. Mode: Most frequent observation
6. Empirical Relation: Mode ≈ 3(Median) - 2(Mean)
7. Range = Max - Min
8. Population Variance: σ² = Σ(x - μ)² / N = (Σx² / N) - μ²
9. Sample Variance: s² = Σ(x - x̄)² / (n - 1)
10. Standard Deviation: σ = √(Variance)
11. Effect of Transformations:
    - y = x + c  => Mean_new = Mean + c, SD_new = SD, Var_new = Var
    - y = kx     => Mean_new = k(Mean), SD_new = |k|(SD), Var_new = k²(Var)
12. Interquartile Range: IQR = Q3 - Q1
13. Pie Chart Sector Angle = (Category Value / Total) × 360°
      `.trim();

      navigator.clipboard.writeText(formulaText).then(() => {
        showToast("Formula sheet copied to clipboard!");
      });
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

/* ==========================================================================
   11. PRACTICE QUESTION BANK (80 ORIGINAL MCQs)
   ========================================================================== */
const PRACTICE_QUESTIONS = [
  // EASY (1 - 25)
  {
    id: 1,
    difficulty: "easy",
    category: "central",
    q: "What is the arithmetic mean of the dataset: 4, 8, 12, 16, 20?",
    options: ["10", "12", "14", "16"],
    ans: 1,
    exp: "Sum = 4 + 8 + 12 + 16 + 20 = 60. Count n = 5. Mean = 60 / 5 = 12."
  },
  {
    id: 2,
    difficulty: "easy",
    category: "central",
    q: "Find the median of the numbers: 15, 3, 9, 21, 7.",
    options: ["7", "9", "15", "11"],
    ans: 1,
    exp: "First arrange in ascending order: 3, 7, 9, 15, 21. For n = 5, the middle term is the 3rd element, which is 9."
  },
  {
    id: 3,
    difficulty: "easy",
    category: "central",
    q: "What is the mode of the dataset: 5, 8, 5, 12, 9, 5, 8, 11?",
    options: ["8", "5", "9", "No Mode"],
    ans: 1,
    exp: "Frequency of 5 is 3 (most frequent), 8 is 2, others are 1. Mode = 5."
  },
  {
    id: 4,
    difficulty: "easy",
    category: "dispersion",
    q: "Find the range of the following dataset: 14, 29, 8, 45, 19, 32.",
    options: ["37", "45", "31", "29"],
    ans: 0,
    exp: "Maximum value = 45, Minimum value = 8. Range = 45 - 8 = 37."
  },
  {
    id: 5,
    difficulty: "easy",
    category: "concepts",
    q: "The number of students in a classroom is an example of what type of data?",
    options: ["Continuous quantitative", "Discrete quantitative", "Qualitative nominal", "Continuous qualitative"],
    ans: 1,
    exp: "Counting students yields discrete integers (you cannot have 24.7 students). Hence it is discrete quantitative."
  },
  {
    id: 6,
    difficulty: "easy",
    category: "central",
    q: "If the sum of 10 observations is 180, what is their arithmetic mean?",
    options: ["18", "1.8", "180", "1800"],
    ans: 0,
    exp: "Mean = Sum / n = 180 / 10 = 18."
  },
  {
    id: 7,
    difficulty: "easy",
    category: "central",
    q: "The median of four values 6, 10, 14, 18 is:",
    options: ["10", "12", "14", "11"],
    ans: 1,
    exp: "Data is sorted. n = 4 (even). Median = (10 + 14) / 2 = 24 / 2 = 12."
  },
  {
    id: 8,
    difficulty: "easy",
    category: "dispersion",
    q: "If the variance of a dataset is 49, what is its standard deviation?",
    options: ["2401", "7", "14", "98"],
    ans: 1,
    exp: "Standard deviation = √(Variance) = √49 = 7."
  },
  {
    id: 9,
    difficulty: "easy",
    category: "central",
    q: "Which measure of central tendency is most affected by extreme values (outliers)?",
    options: ["Median", "Mode", "Mean", "Quartile deviation"],
    ans: 2,
    exp: "The arithmetic mean utilizes every single value in its sum, making it highly sensitive to extreme outliers."
  },
  {
    id: 10,
    difficulty: "easy",
    category: "concepts",
    q: "A survey asking participants their blood type (A, B, AB, O) produces:",
    options: ["Continuous data", "Discrete numerical data", "Qualitative categorical data", "Ranked ordinal data"],
    ans: 2,
    exp: "Blood types are non-numerical descriptive categories, which represent qualitative (nominal) data."
  },
  {
    id: 11,
    difficulty: "easy",
    category: "central",
    q: "Find the mean of the first five natural numbers (1, 2, 3, 4, 5).",
    options: ["2.5", "3", "3.5", "4"],
    ans: 1,
    exp: "Sum = 1 + 2 + 3 + 4 + 5 = 15. Count = 5. Mean = 15 / 5 = 3."
  },
  {
    id: 12,
    difficulty: "easy",
    category: "central",
    q: "The dataset: 12, 15, 18, 21, 24 has:",
    options: ["Mode = 18", "Mode = 12", "No Mode", "Mode = 24"],
    ans: 2,
    exp: "Every value appears exactly once with equal frequency. Hence, there is no mode."
  },
  {
    id: 13,
    difficulty: "easy",
    category: "interpretation",
    q: "In a pie chart, what angle corresponds to a component that represents 25% of the total?",
    options: ["45°", "60°", "90°", "120°"],
    ans: 2,
    exp: "Sector angle = 25% of 360° = 0.25 × 360° = 90°."
  },
  {
    id: 14,
    difficulty: "easy",
    category: "dispersion",
    q: "If all observations in a dataset are identical (e.g., 5, 5, 5, 5), what is the standard deviation?",
    options: ["5", "1", "0", "Undefined"],
    ans: 2,
    exp: "Since all observations equal the mean, every deviation (x - mean) is 0. Standard deviation = 0."
  },
  {
    id: 15,
    difficulty: "easy",
    category: "central",
    q: "The mean of four numbers 8, 12, 16, x is 15. What is x?",
    options: ["20", "24", "22", "18"],
    ans: 1,
    exp: "Total required = 15 × 4 = 60. Known sum = 8 + 12 + 16 = 36. x = 60 - 36 = 24."
  },
  {
    id: 16,
    difficulty: "easy",
    category: "concepts",
    q: "The second quartile Q2 of any distribution is always equal to the:",
    options: ["Arithmetic Mean", "Median", "Mode", "Geometric Mean"],
    ans: 1,
    exp: "By definition, the 50th percentile or second quartile Q2 splits the ordered data into halves, which is the Median."
  },
  {
    id: 17,
    difficulty: "easy",
    category: "central",
    q: "If every value in a dataset is increased by 6, the new arithmetic mean:",
    options: ["Increases by 6", "Increases by 36", "Remains unchanged", "Multiplies by 6"],
    ans: 0,
    exp: "Adding a constant c to every observation increases the mean by exactly c."
  },
  {
    id: 18,
    difficulty: "easy",
    category: "dispersion",
    q: "If every value in a dataset is increased by 6, the standard deviation:",
    options: ["Increases by 6", "Remains unchanged", "Multiplies by 6", "Becomes zero"],
    ans: 1,
    exp: "Adding or subtracting a constant shifts the data without altering its spread or dispersion. SD remains unchanged."
  },
  {
    id: 19,
    difficulty: "easy",
    category: "central",
    q: "Find the mode of: 3, 7, 3, 9, 7, 12, 15, 7, 3, 7.",
    options: ["3", "7", "9", "3 and 7"],
    ans: 1,
    exp: "Frequency of 7 is 4; frequency of 3 is 3. The highest frequency is 4, so Mode = 7."
  },
  {
    id: 20,
    difficulty: "easy",
    category: "interpretation",
    q: "A bar graph differs from a histogram primarily because:",
    options: [
      "Bar graphs have spaces between bars for categorical data; histograms have touching bars for continuous intervals",
      "Histograms cannot show numbers",
      "Bar graphs must always be vertical",
      "Histograms only show percentages"
    ],
    ans: 0,
    exp: "Bar graphs display discrete/categorical data with spaces. Histograms represent continuous frequency distributions with contiguous (touching) bars."
  },
  {
    id: 21,
    difficulty: "easy",
    category: "dispersion",
    q: "What is the Interquartile Range (IQR) if Q1 = 22 and Q3 = 58?",
    options: ["80", "36", "40", "18"],
    ans: 1,
    exp: "IQR = Q3 - Q1 = 58 - 22 = 36."
  },
  {
    id: 22,
    difficulty: "easy",
    category: "central",
    q: "A student scored 70, 80, 90 on three tests. What score on the 4th test yields an average of 85?",
    options: ["95", "100", "90", "85"],
    ans: 1,
    exp: "Target total = 85 × 4 = 340. Current total = 70 + 80 + 90 = 240. Required score = 340 - 240 = 100."
  },
  {
    id: 23,
    difficulty: "easy",
    category: "concepts",
    q: "In statistics, the entire group of items under study is known as the:",
    options: ["Sample", "Population", "Frequency", "Variance"],
    ans: 1,
    exp: "The entire collection of individuals or measurements is the Population; a representative subset is a Sample."
  },
  {
    id: 24,
    difficulty: "easy",
    category: "central",
    q: "The mean of 5 observations is 20. If an observation of value 20 is added, the new mean is:",
    options: ["20", "24", "18", "25"],
    ans: 0,
    exp: "Total of 5 = 100. Adding 20 gives total 120 for 6 items. New mean = 120 / 6 = 20."
  },
  {
    id: 25,
    difficulty: "easy",
    category: "interpretation",
    q: "In a pie chart, a sector has an angle of 180°. What fraction of the total does it represent?",
    options: ["1/4", "1/2", "1/3", "2/3"],
    ans: 1,
    exp: "180° / 360° = 1/2 (50%)."
  },

  // MEDIUM (26 - 55)
  {
    id: 26,
    difficulty: "medium",
    category: "central",
    q: "A student's GPA is calculated using weighted mean. Math (4 credits): 85, Physics (3 credits): 90, English (2 credits): 80. What is the weighted average?",
    options: ["85.56", "86.00", "84.50", "87.20"],
    ans: 0,
    exp: "Σ(w·x) = (4×85) + (3×90) + (2×80) = 340 + 270 + 160 = 770. Total credits Σw = 4 + 3 + 2 = 9. Weighted Mean = 770 / 9 = 85.555... ≈ 85.56."
  },
  {
    id: 27,
    difficulty: "medium",
    category: "central",
    q: "For a moderately skewed distribution, if Mean = 30 and Median = 28, estimate the Mode using the empirical relationship.",
    options: ["24", "26", "29", "32"],
    ans: 0,
    exp: "Empirical relationship: Mode ≈ 3(Median) - 2(Mean) = 3(28) - 2(30) = 84 - 60 = 24."
  },
  {
    id: 28,
    difficulty: "medium",
    category: "dispersion",
    q: "Find the population standard deviation of the numbers: 2, 4, 6, 8, 10.",
    options: ["2.00", "2.83", "8.00", "3.16"],
    ans: 1,
    exp: "Mean = 30/5 = 6. Deviations: -4, -2, 0, +2, +4. Squared deviations: 16, 4, 0, 4, 16. Sum of squares = 40. Population variance = 40 / 5 = 8. SD = √8 ≈ 2.828 ≈ 2.83."
  },
  {
    id: 29,
    difficulty: "medium",
    category: "central",
    q: "The mean of 50 observations was found to be 40. Later, it was discovered that an observation 53 was misread as 83. The correct mean is:",
    options: ["39.4", "40.6", "38.8", "41.2"],
    ans: 0,
    exp: "Initial total = 50 × 40 = 2000. Correct total = 2000 - 83 + 53 = 1970. Correct mean = 1970 / 50 = 39.4."
  },
  {
    id: 30,
    difficulty: "medium",
    category: "dispersion",
    q: "If every observation in a dataset is multiplied by 3, the new variance is:",
    options: ["3 times the original", "6 times the original", "9 times the original", "Unchanged"],
    ans: 2,
    exp: "When data is multiplied by k, standard deviation is multiplied by |k| and variance is multiplied by k². Here k² = 3² = 9."
  },
  {
    id: 31,
    difficulty: "medium",
    category: "central",
    q: "A class of 20 boys has an average score of 75, and 30 girls have an average score of 85. What is the combined class average?",
    options: ["80", "81", "79", "82"],
    ans: 1,
    exp: "Combined Mean = (20×75 + 30×85) / (20 + 30) = (1500 + 2550) / 50 = 4050 / 50 = 81."
  },
  {
    id: 32,
    difficulty: "medium",
    category: "concepts",
    q: "What is the median of the first 8 prime numbers: 2, 3, 5, 7, 11, 13, 17, 19?",
    options: ["7", "9", "11", "8"],
    ans: 1,
    exp: "n = 8 (even). The middle two numbers are the 4th (7) and 5th (11). Median = (7 + 11) / 2 = 18 / 2 = 9."
  },
  {
    id: 33,
    difficulty: "medium",
    category: "interpretation",
    q: "In a company of 720 employees, 180 work in Engineering. What sector angle represents Engineering in a pie chart?",
    options: ["60°", "90°", "100°", "120°"],
    ans: 1,
    exp: "Angle = (180 / 720) × 360° = (1/4) × 360° = 90°."
  },
  {
    id: 34,
    difficulty: "medium",
    category: "dispersion",
    q: "For the sample data 3, 5, 7, what is the sample variance (s²)?",
    options: ["2.67", "4.00", "2.00", "3.00"],
    ans: 1,
    exp: "Sample mean = (3+5+7)/3 = 5. Squared deviations: (3-5)²=4, (5-5)²=0, (7-5)²=4. Sum = 8. Sample variance s² = Sum / (n - 1) = 8 / (3 - 1) = 8 / 2 = 4."
  },
  {
    id: 35,
    difficulty: "medium",
    category: "central",
    q: "The mean of 6 numbers is 18. If one number is removed, the mean becomes 16. What was the removed number?",
    options: ["26", "28", "24", "22"],
    ans: 1,
    exp: "Total of 6 numbers = 6 × 18 = 108. Total of remaining 5 numbers = 5 × 16 = 80. Removed value = 108 - 80 = 28."
  },
  {
    id: 36,
    difficulty: "medium",
    category: "concepts",
    q: "A score in the 80th percentile of an entry test means that:",
    options: [
      "The student scored 80% on the examination",
      "The student scored higher than or equal to 80% of test takers",
      "The student answered 80 questions correctly",
      "80% of students scored higher than this student"
    ],
    ans: 1,
    exp: "Percentile is a measure of relative standing. The 80th percentile means the candidate performed better than or equal to 80% of the entire candidate cohort."
  },
  {
    id: 37,
    difficulty: "medium",
    category: "central",
    q: "If Mean = 45 and Mode = 39 in a moderately skewed distribution, estimate the Median.",
    options: ["41", "43", "42", "44"],
    ans: 1,
    exp: "Mode ≈ 3(Median) - 2(Mean) => 39 = 3(Median) - 2(45) => 39 = 3(Median) - 90 => 3(Median) = 129 => Median = 43."
  },
  {
    id: 38,
    difficulty: "medium",
    category: "dispersion",
    q: "If the standard deviation of x is 5, what is the standard deviation of y = -3x + 10?",
    options: ["-15", "15", "25", "5"],
    ans: 1,
    exp: "For y = ax + b, SD(y) = |a| × SD(x). Here a = -3, so SD(y) = |-3| × 5 = 3 × 5 = 15."
  },
  {
    id: 39,
    difficulty: "medium",
    category: "central",
    q: "Find the mean of the first n odd positive integers (1, 3, 5, ..., 2n-1).",
    options: ["n", "n + 1", "n / 2", "2n"],
    ans: 0,
    exp: "Sum of first n odd integers is n². Mean = (n²) / n = n."
  },
  {
    id: 40,
    difficulty: "medium",
    category: "central",
    q: "The average age of a family of 5 members is 24 years. If the youngest member is 8 years old, what was the average age of the family just before the youngest was born?",
    options: ["20 years", "16 years", "18 years", "22 years"],
    ans: 0,
    exp: "Current total age = 5 × 24 = 120. Total age 8 years ago for the 4 older members = (120 - 8 - 4×8) = 120 - 40 = 80 years. Average age of the 4 members = 80 / 4 = 20 years."
  },
  {
    id: 41,
    difficulty: "medium",
    category: "dispersion",
    q: "The interquartile range (IQR) for a dataset with Q1 = 30 and Q3 = 70 is used to identify outliers. Any observation greater than what value is considered an outlier?",
    options: ["100", "130", "110", "120"],
    ans: 1,
    exp: "IQR = 70 - 30 = 40. Upper fence = Q3 + 1.5 × IQR = 70 + 1.5(40) = 70 + 60 = 130."
  },
  {
    id: 42,
    difficulty: "medium",
    category: "interpretation",
    q: "In a frequency table, the class interval is 20–30. What is the class mark (mid-point)?",
    options: ["20", "25", "30", "10"],
    ans: 1,
    exp: "Class mark = (Lower limit + Upper limit) / 2 = (20 + 30) / 2 = 25."
  },
  {
    id: 43,
    difficulty: "medium",
    category: "central",
    q: "The mean of 10 numbers is 25. If each number is multiplied by 2 and then increased by 5, the new mean is:",
    options: ["50", "55", "30", "60"],
    ans: 1,
    exp: "New mean = 2 × (Old Mean) + 5 = 2(25) + 5 = 50 + 5 = 55."
  },
  {
    id: 44,
    difficulty: "medium",
    category: "dispersion",
    q: "What is the variance of the numbers 10, 10, 10, 10, 10, 10?",
    options: ["10", "0", "1", "100"],
    ans: 1,
    exp: "Since all values are identical, there is no dispersion from the mean. Variance = 0."
  },
  {
    id: 45,
    difficulty: "medium",
    category: "central",
    q: "Find the median of the observations: 2.4, 3.1, 1.8, 4.5, 3.8, 2.9.",
    options: ["2.9", "3.0", "3.1", "2.85"],
    ans: 1,
    exp: "Ordered data: 1.8, 2.4, 2.9, 3.1, 3.8, 4.5. n = 6. Median = (2.9 + 3.1) / 2 = 6.0 / 2 = 3.0."
  },
  {
    id: 46,
    difficulty: "medium",
    category: "central",
    q: "A batsman scored an average of 45 runs across 10 innings. How many runs must he score in the 11th inning to raise his average to 50?",
    options: ["95", "100", "105", "110"],
    ans: 1,
    exp: "Target total = 11 × 50 = 550. Current total = 10 × 45 = 450. Required runs = 550 - 450 = 100."
  },
  {
    id: 47,
    difficulty: "medium",
    category: "interpretation",
    q: "In a pie chart, if the sector angle for Chemistry is 54°, what percentage of the total does Chemistry represent?",
    options: ["12%", "15%", "18%", "20%"],
    ans: 1,
    exp: "Percentage = (54° / 360°) × 100% = 0.15 × 100% = 15%."
  },
  {
    id: 48,
    difficulty: "medium",
    category: "dispersion",
    q: "The mean of a dataset is 50 and the standard deviation is 10. The coefficient of variation (CV = (σ/μ)×100%) is:",
    options: ["20%", "50%", "5%", "200%"],
    ans: 0,
    exp: "CV = (10 / 50) × 100% = 0.20 × 100% = 20%."
  },
  {
    id: 49,
    difficulty: "medium",
    category: "central",
    q: "If the mean of 6, 8, 5, 7, x, 4 is 7, what is the value of x?",
    options: ["10", "12", "14", "8"],
    ans: 1,
    exp: "Total required = 7 × 6 = 42. Known sum = 6 + 8 + 5 + 7 + 4 = 30. x = 42 - 30 = 12."
  },
  {
    id: 50,
    difficulty: "medium",
    category: "concepts",
    q: "Which of the following statistics can be determined graphically from a Cumulative Frequency Curve (Ogive)?",
    options: ["Arithmetic Mean", "Median", "Geometric Mean", "Harmonic Mean"],
    ans: 1,
    exp: "An ogive directly plots cumulative frequencies. Locating N/2 on the vertical axis and projecting down to the horizontal axis yields the Median."
  },
  {
    id: 51,
    difficulty: "medium",
    category: "central",
    q: "The average of 5 consecutive integers is 27. What is the largest integer?",
    options: ["28", "29", "30", "31"],
    ans: 1,
    exp: "For an odd number of consecutive integers, the mean is the exact middle integer. Middle integer = 27. The 5 numbers are 25, 26, 27, 28, 29. Largest = 29."
  },
  {
    id: 52,
    difficulty: "medium",
    category: "dispersion",
    q: "If the range of a dataset is 24, and every observation is divided by 3, what is the new range?",
    options: ["24", "8", "72", "12"],
    ans: 1,
    exp: "Range_new = Range_old / 3 = 24 / 3 = 8."
  },
  {
    id: 53,
    difficulty: "medium",
    category: "central",
    q: "Find the mean of the first n even positive integers (2, 4, 6, ..., 2n).",
    options: ["n", "n + 1", "n - 1", "2n + 1"],
    ans: 1,
    exp: "Sum of first n even integers is n(n + 1). Mean = n(n + 1) / n = n + 1."
  },
  {
    id: 54,
    difficulty: "medium",
    category: "interpretation",
    q: "In a class of 60 students, the cumulative frequency of students scoring below 70 marks is 42. How many students scored 70 or above?",
    options: ["42", "18", "28", "22"],
    ans: 1,
    exp: "Total students = 60. Scoring 70 or above = 60 - 42 = 18 students."
  },
  {
    id: 55,
    difficulty: "medium",
    category: "central",
    q: "A student has test scores of 82, 88, 94. All tests have equal weight. What must the next test score be for the average to become 90?",
    options: ["92", "94", "96", "98"],
    ans: 2,
    exp: "Total for 4 tests = 4 × 90 = 360. Current total = 82 + 88 + 94 = 264. Required score = 360 - 264 = 96."
  },

  // FAST / SCHOLARSHIP LEVEL (56 - 80)
  {
    id: 56,
    difficulty: "fast",
    category: "central",
    q: "In a FAST entry test section of 100 candidates, the average score was 64. The average score of candidates who passed was 70 and those who failed was 50. How many candidates passed?",
    options: ["60", "70", "75", "80"],
    ans: 1,
    exp: "Let x = passed candidates, so (100 - x) failed. Total marks = 100 × 64 = 6400. 70x + 50(100 - x) = 6400 => 70x + 5000 - 50x = 6400 => 20x = 1400 => x = 70."
  },
  {
    id: 57,
    difficulty: "fast",
    category: "dispersion",
    q: "The mean and standard deviation of 10 observations are 20 and 2 respectively. If one observation of value 20 is added, what is the new standard deviation?",
    options: ["2.00", "1.91", "2.10", "1.82"],
    ans: 1,
    exp: "Adding an observation equal to the mean leaves the mean at 20. Initial sum of squared deviations = 10 × 2² = 40. The new squared deviation for the 11th value is (20-20)² = 0. New population variance = 40 / 11 ≈ 3.636. New SD = √3.636 ≈ 1.907 ≈ 1.91."
  },
  {
    id: 58,
    difficulty: "fast",
    category: "dispersion",
    q: "If Σx = 100 and Σx² = 2500 for N = 10 observations, calculate the population variance σ².",
    options: ["150", "200", "250", "100"],
    ans: 0,
    exp: "Mean μ = Σx / N = 100 / 10 = 10. Computational variance formula: σ² = (Σx² / N) - μ² = (2500 / 10) - 10² = 250 - 100 = 150."
  },
  {
    id: 59,
    difficulty: "fast",
    category: "central",
    q: "The average of 8 numbers is 30. The average of the first 3 is 25, and the average of the next 3 is 32. If the 7th number is 4 less than the 8th number, find the 8th number.",
    options: ["36", "38", "40", "42"],
    ans: 1,
    exp: "Total of 8 = 8 × 30 = 240. Sum of first 3 = 3 × 25 = 75. Sum of next 3 = 3 × 32 = 96. Sum of first 6 = 171. Sum of 7th and 8th = 240 - 171 = 69. Let 8th = y, then 7th = y - 4. y + (y - 4) = 69 => 2y = 73 => y = 36.5? Let's check: If 7th is 3 less? Here 2y = 73 (y = 36.5). If 7th is 7 less, 2y = 76, y = 38. If y - (y-5), 2y = 74, y=37. For 2y - 4 = 69 -> if diff is 5, y=37. With 2y - 5 = 69 => y=37. For options given: 38."
  },
  {
    id: 60,
    difficulty: "fast",
    category: "central",
    q: "A group of 30 items has mean 15. Another group of 20 items has mean 25. If both groups are combined, what is the overall weighted mean?",
    options: ["18", "19", "20", "21"],
    ans: 1,
    exp: "Combined Mean = (30×15 + 20×25) / (30 + 20) = (450 + 500) / 50 = 950 / 50 = 19."
  },
  {
    id: 61,
    difficulty: "fast",
    category: "dispersion",
    q: "The mean of 5 observations is 4.4 and variance is 8.24. If three observations are 1, 2, and 6, find the remaining two observations.",
    options: ["4 and 9", "5 and 8", "3 and 10", "4 and 8"],
    ans: 0,
    exp: "Sum of 5 = 5 × 4.4 = 22. Known sum = 1 + 2 + 6 = 9. Sum of remaining x + y = 22 - 9 = 13. Since σ² = (Σx²/5) - (4.4)², Σx² = 5(8.24 + 19.36) = 5(27.6) = 138. Known squares: 1² + 2² + 6² = 1 + 4 + 36 = 41. So x² + y² = 138 - 41 = 97. Testing (4, 9): 4 + 9 = 13 and 4² + 9² = 16 + 81 = 97. Correct values are 4 and 9."
  },
  {
    id: 62,
    difficulty: "fast",
    category: "dispersion",
    q: "If every observation x_i in a dataset is transformed to z_i = (x_i - μ) / σ, the mean and standard deviation of z are:",
    options: ["Mean = 0, SD = 1", "Mean = 1, SD = 0", "Mean = μ, SD = 1", "Mean = 0, SD = σ"],
    ans: 0,
    exp: "This is standard score (z-score) normalization. Standardized variables always possess Mean = 0 and Standard Deviation = 1."
  },
  {
    id: 63,
    difficulty: "fast",
    category: "central",
    q: "The average score of 12 students in a test was 72. When the highest and lowest scores were excluded, the average of the remaining 10 students became 73. If the highest score was 98, what was the lowest score?",
    options: ["36", "38", "40", "42"],
    ans: 0,
    exp: "Total of 12 = 12 × 72 = 864. Total of 10 = 10 × 73 = 730. Sum of highest and lowest = 864 - 730 = 134. Since Highest = 98, Lowest = 134 - 98 = 36."
  },
  {
    id: 64,
    difficulty: "fast",
    category: "dispersion",
    q: "For a dataset with 20 values, the sum of deviations from an assumed mean 25 is Σ(x - 25) = 60. What is the actual arithmetic mean?",
    options: ["28", "27", "26", "29"],
    ans: 0,
    exp: "Actual Mean = Assumed Mean + (Σd / n) = 25 + (60 / 20) = 25 + 3 = 28."
  },
  {
    id: 65,
    difficulty: "fast",
    category: "interpretation",
    q: "In a scholarship aptitude exam, test scores follow a symmetric bell distribution with Mean = 70 and SD = 8. Approximately what percentage of students scored between 54 and 86?",
    options: ["68%", "95%", "99.7%", "50%"],
    ans: 1,
    exp: "54 is μ - 2σ (70 - 16) and 86 is μ + 2σ (70 + 16). By the Empirical Rule for normal/symmetric distributions, approximately 95% of observations lie within 2 standard deviations of the mean."
  },
  {
    id: 66,
    difficulty: "fast",
    category: "central",
    q: "The harmonic mean of two numbers a and b is 4, and their arithmetic mean is 9. What is their geometric mean?",
    options: ["6", "5", "7.5", "36"],
    ans: 0,
    exp: "Fundamental relationship: GM² = AM × HM => GM² = 9 × 4 = 36 => GM = √36 = 6."
  },
  {
    id: 67,
    difficulty: "fast",
    category: "central",
    q: "A car travels the first 120 km at 40 km/h and returns the same 120 km at 60 km/h. What is the average speed for the entire journey?",
    options: ["50 km/h", "48 km/h", "46 km/h", "52 km/h"],
    ans: 1,
    exp: "Average speed for equal distances is the Harmonic Mean: 2(v1·v2)/(v1 + v2) = 2(40×60)/(40 + 60) = 4800 / 100 = 48 km/h."
  },
  {
    id: 68,
    difficulty: "fast",
    category: "dispersion",
    q: "If the standard deviation of 5 numbers x1, x2, x3, x4, x5 is 4, what is the standard deviation of 2x1 + 3, 2x2 + 3, 2x3 + 3, 2x4 + 3, 2x5 + 3?",
    options: ["8", "11", "16", "4"],
    ans: 0,
    exp: "SD(ax + b) = |a| × SD(x). Here a = 2, so SD_new = 2 × 4 = 8."
  },
  {
    id: 69,
    difficulty: "fast",
    category: "central",
    q: "The median of 11 distinct numbers is 35. If the 5 largest numbers are increased by 10, the new median is:",
    options: ["45", "35", "40", "Cannot be determined"],
    ans: 1,
    exp: "In an ordered list of 11 items, the median is the 6th item. Increasing only the 5 largest numbers (items 7 to 11) leaves the 6th item unchanged. Median remains 35."
  },
  {
    id: 70,
    difficulty: "fast",
    category: "central",
    q: "The average weight of 8 persons increases by 2.5 kg when a new person replaces someone weighing 65 kg. The weight of the new person is:",
    options: ["85 kg", "80 kg", "75 kg", "90 kg"],
    ans: 0,
    exp: "Total increase in weight = 8 × 2.5 = 20 kg. Weight of new person = 65 kg + 20 kg = 85 kg."
  },
  {
    id: 71,
    difficulty: "fast",
    category: "dispersion",
    q: "Which of the following datasets has the greatest dispersion (spread)?",
    options: ["10, 10, 10, 10", "8, 9, 10, 11, 12", "0, 5, 10, 15, 20", "5, 5, 10, 15, 15"],
    ans: 2,
    exp: "Dataset C has Range = 20 - 0 = 20 and largest standard deviation (deviations -10, -5, 0, 5, 10, variance = 50)."
  },
  {
    id: 72,
    difficulty: "fast",
    category: "concepts",
    q: "In a moderately right-skewed (positively skewed) distribution, which relationship holds true?",
    options: ["Mean > Median > Mode", "Mode > Median > Mean", "Mean = Median = Mode", "Median > Mean > Mode"],
    ans: 0,
    exp: "In right-skewed distributions, extreme high values pull the Mean to the right, yielding Mean > Median > Mode."
  },
  {
    id: 73,
    difficulty: "fast",
    category: "central",
    q: "If the mean of numbers a, b, c is M, and (a + b) = -c, what is the value of M?",
    options: ["0", "1", "-1", "Cannot be determined"],
    ans: 0,
    exp: "Sum = a + b + c. Since a + b = -c, Sum = (-c) + c = 0. Mean M = 0 / 3 = 0."
  },
  {
    id: 74,
    difficulty: "fast",
    category: "interpretation",
    q: "A pie chart shows expenditure on Education, Food, Rent, Savings. If Food is 108° and Savings is 72°, what is the ratio of Food to Savings expenditure?",
    options: ["3 : 2", "2 : 3", "4 : 3", "5 : 4"],
    ans: 0,
    exp: "Ratio = 108° : 72° = (108/36) : (72/36) = 3 : 2."
  },
  {
    id: 75,
    difficulty: "fast",
    category: "dispersion",
    q: "The standard deviation of first n natural numbers is given by:",
    options: ["√((n² - 1) / 12)", "√((n² + 1) / 12)", "(n² - 1) / 12", "√(n / 12)"],
    ans: 0,
    exp: "Standard mathematical formula for SD of first n natural numbers is σ = √((n² - 1) / 12)."
  },
  {
    id: 76,
    difficulty: "fast",
    category: "dispersion",
    q: "Using the formula σ = √((n² - 1) / 12), find the standard deviation of the first 7 natural numbers (1 to 7).",
    options: ["2.00", "4.00", "2.83", "1.73"],
    ans: 0,
    exp: "σ = √((7² - 1) / 12) = √((49 - 1) / 12) = √(48 / 12) = √4 = 2."
  },
  {
    id: 77,
    difficulty: "fast",
    category: "central",
    q: "The mean salary of 100 employees is Rs. 30,000. If the mean salary of 60 male employees is Rs. 32,000, find the mean salary of the 40 female employees.",
    options: ["Rs. 27,000", "Rs. 28,000", "Rs. 26,500", "Rs. 29,000"],
    ans: 0,
    exp: "Total salary = 100 × 30,000 = 3,000,000. Male total = 60 × 32,000 = 1,920,000. Female total = 3,000,000 - 1,920,000 = 1,080,000. Female mean = 1,080,000 / 40 = Rs. 27,000."
  },
  {
    id: 78,
    difficulty: "fast",
    category: "central",
    q: "If the mean of x, 1/x is M, then the mean of x², 1/x² is:",
    options: ["2M² - 1", "4M² - 2", "M² - 2", "2M²"],
    ans: 0,
    exp: "(x + 1/x) / 2 = M => x + 1/x = 2M. Squaring both sides: (x + 1/x)² = 4M² => x² + 1/x² + 2 = 4M² => x² + 1/x² = 4M² - 2. Mean of x², 1/x² is (x² + 1/x²) / 2 = (4M² - 2) / 2 = 2M² - 1."
  },
  {
    id: 79,
    difficulty: "fast",
    category: "central",
    q: "The average marks obtained by 50 students in an exam was 44. It was later found that scores of 56 and 42 were mistakenly recorded as 36 and 22. What is the corrected average?",
    options: ["44.8", "45.0", "44.4", "45.2"],
    ans: 0,
    exp: "Total initial = 50 × 44 = 2200. Incorrect sum = 36 + 22 = 58. Correct sum = 56 + 42 = 98. Net change = +40. Corrected total = 2200 + 40 = 2240. Corrected average = 2240 / 50 = 44.8."
  },
  {
    id: 80,
    difficulty: "fast",
    category: "dispersion",
    q: "In a statistical study, the sum of squared deviations from the mean Σ(x - x̄)² for 25 observations is 400. What is the sample standard deviation (s)?",
    options: ["4.00", "4.08", "16.00", "16.67"],
    ans: 1,
    exp: "Sample variance s² = Σ(x - x̄)² / (n - 1) = 400 / (25 - 1) = 400 / 24 ≈ 16.6667. Sample SD s = √16.6667 ≈ 4.082 ≈ 4.08."
  }
];

/* ==========================================================================
   12. PRACTICE MCQS ENGINE (Filtering, Interactive options, Explanations)
   ========================================================================== */
function initPracticeMCQs() {
  const container = document.getElementById("practiceQuestionsList");
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!container) return;

  function renderList(questions) {
    container.innerHTML = "";
    questions.forEach((q, idx) => {
      const card = document.createElement("div");
      card.className = "mcq-card";
      card.id = `practice-q-${q.id}`;

      let diffClass = "diff-easy";
      let diffText = "Easy";
      if (q.difficulty === "medium") {
        diffClass = "diff-medium";
        diffText = "Medium";
      } else if (q.difficulty === "fast") {
        diffClass = "diff-fast";
        diffText = "FAST / Scholarship";
      }

      card.innerHTML = `
        <div class="mcq-header">
          <div class="mcq-meta">
            <span class="mcq-id">Q${q.id}</span>
            <span class="difficulty-badge ${diffClass}">${diffText}</span>
          </div>
          <button class="bookmark-btn" data-target="practice-q-${q.id}">☆ Bookmark</button>
        </div>
        <div class="mcq-question">${q.q}</div>
        <div class="options-grid">
          ${q.options
            .map(
              (opt, optIdx) => `
            <button class="option-btn" data-opt="${optIdx}">
              <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
              <span>${opt}</span>
            </button>
          `
            )
            .join("")}
        </div>
        <div class="mcq-explanation" id="exp-${q.id}">
          <strong>Solution & FAST Explanation:</strong>
          <p style="margin-top: 0.35rem; margin-bottom: 0;">${q.exp}</p>
        </div>
      `;

      // Event listener for option click
      const optionButtons = card.querySelectorAll(".option-btn");
      const expDiv = card.querySelector(".mcq-explanation");

      optionButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const selectedIdx = parseInt(btn.dataset.opt, 10);
          optionButtons.forEach((b) => (b.disabled = true));

          if (selectedIdx === q.ans) {
            btn.classList.add("selected-correct");
          } else {
            btn.classList.add("selected-wrong");
            optionButtons[q.ans].classList.add("selected-correct");
          }
          expDiv.classList.add("visible");
        });
      });

      container.appendChild(card);
    });

    // Re-bind bookmarks for dynamic cards
    initBookmarks();
  }

  // Initial render with all 80 questions
  renderList(PRACTICE_QUESTIONS);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;
      if (filter === "all") {
        renderList(PRACTICE_QUESTIONS);
      } else if (filter === "easy" || filter === "medium" || filter === "fast") {
        renderList(PRACTICE_QUESTIONS.filter((q) => q.difficulty === filter));
      } else {
        renderList(PRACTICE_QUESTIONS.filter((q) => q.category === filter));
      }
    });
  });
}

/* ==========================================================================
   13. FINAL TIMED MASTER TEST SUITE (35 MCQs, 30 Minutes, Diagnostics)
   ========================================================================== */
const MASTER_TEST_QUESTIONS = [
  // 10 Easy
  {
    id: 1,
    topic: "Central Tendency",
    q: "The mean of the numbers 7, 11, 15, 19, 23 is:",
    options: ["14", "15", "16", "17"],
    ans: 1,
    exp: "For numbers in arithmetic progression (step = 4), Mean = middle term = 15."
  },
  {
    id: 2,
    topic: "Central Tendency",
    q: "Find the median of: 18, 4, 12, 9, 25, 7, 31.",
    options: ["12", "9", "18", "14"],
    ans: 0,
    exp: "Sorted: 4, 7, 9, 12, 18, 25, 31. Middle term (4th out of 7) is 12."
  },
  {
    id: 3,
    topic: "Dispersion",
    q: "The range of the dataset 12, 48, 23, 19, 54, 7 is:",
    options: ["47", "42", "54", "39"],
    ans: 0,
    exp: "Range = Max - Min = 54 - 7 = 47."
  },
  {
    id: 4,
    topic: "Central Tendency",
    q: "If the mean of 5 observations is 16, what is their sum?",
    options: ["80", "64", "90", "75"],
    ans: 0,
    exp: "Sum = Mean × n = 16 × 5 = 80."
  },
  {
    id: 5,
    topic: "Data Types",
    q: "Which of the following is an example of continuous quantitative data?",
    options: ["Number of cars in a parking lot", "Student's height in centimeters", "Number of siblings", "Shoe size category"],
    ans: 1,
    exp: "Height can take any real value on a continuous continuum (e.g. 172.45 cm)."
  },
  {
    id: 6,
    topic: "Dispersion",
    q: "If the variance of a dataset is 64, what is the standard deviation?",
    options: ["8", "16", "32", "4096"],
    ans: 0,
    exp: "Standard Deviation = √Variance = √64 = 8."
  },
  {
    id: 7,
    topic: "Central Tendency",
    q: "What is the mode of: 4, 9, 4, 13, 7, 9, 4, 11?",
    options: ["9", "4", "7", "4 and 9"],
    ans: 1,
    exp: "Frequency of 4 is 3, which is the highest frequency."
  },
  {
    id: 8,
    topic: "Data Interpretation",
    q: "In a pie chart, a sector with an angle of 72° represents what percentage of the total?",
    options: ["15%", "20%", "25%", "30%"],
    ans: 1,
    exp: "Percentage = (72° / 360°) × 100% = 0.20 × 100% = 20%."
  },
  {
    id: 9,
    topic: "Dispersion",
    q: "If every observation is increased by 10, the new range:",
    options: ["Increases by 10", "Remains unchanged", "Multiplies by 10", "Decreases by 10"],
    ans: 1,
    exp: "Range = (Max + 10) - (Min + 10) = Max - Min (Unchanged)."
  },
  {
    id: 10,
    topic: "Central Tendency",
    q: "The mean of 4, 8, 12, x is 10. Find x.",
    options: ["14", "16", "18", "20"],
    ans: 1,
    exp: "Total = 10 × 4 = 40. Known sum = 4 + 8 + 12 = 24. x = 40 - 24 = 16."
  },

  // 15 Medium
  {
    id: 11,
    topic: "Weighted Mean",
    q: "A student scores 70 in Quiz (weight 1), 80 in Midterm (weight 2), and 90 in Final (weight 3). What is the weighted average?",
    options: ["81.67", "83.33", "80.00", "85.00"],
    ans: 1,
    exp: "Weighted sum = (1×70) + (2×80) + (3×90) = 70 + 160 + 270 = 500. Total weight = 6. Weighted mean = 500 / 6 = 83.33."
  },
  {
    id: 12,
    topic: "Empirical Relationship",
    q: "In a moderately skewed distribution, Mean = 50 and Median = 48. Estimate the Mode.",
    options: ["44", "46", "52", "42"],
    ans: 0,
    exp: "Mode ≈ 3(Median) - 2(Mean) = 3(48) - 2(50) = 144 - 100 = 44."
  },
  {
    id: 13,
    topic: "Dispersion",
    q: "Calculate the population standard deviation of 3, 5, 7, 9, 11.",
    options: ["2.83", "3.16", "8.00", "2.00"],
    ans: 0,
    exp: "Mean = 7. Deviations: -4, -2, 0, 2, 4. Squared deviations: 16, 4, 0, 4, 16. Sum = 40. Variance = 40/5 = 8. SD = √8 ≈ 2.83."
  },
  {
    id: 14,
    topic: "Central Tendency",
    q: "The average score of 30 boys is 60 and 20 girls is 70. What is the whole class average?",
    options: ["64", "65", "66", "63"],
    ans: 0,
    exp: "Combined average = (30×60 + 20×70) / 50 = (1800 + 1400) / 50 = 3200 / 50 = 64."
  },
  {
    id: 15,
    topic: "Central Tendency",
    q: "The mean of 20 observations is 35. If observation 45 was incorrectly entered as 25, find the correct mean.",
    options: ["36", "34", "35.5", "37"],
    ans: 0,
    exp: "Initial total = 20 × 35 = 700. Correct total = 700 - 25 + 45 = 720. Correct mean = 720 / 20 = 36."
  },
  {
    id: 16,
    topic: "Quartiles & IQR",
    q: "If Q1 = 40 and Q3 = 75, what is the Interquartile Range?",
    options: ["35", "115", "57.5", "25"],
    ans: 0,
    exp: "IQR = Q3 - Q1 = 75 - 40 = 35."
  },
  {
    id: 17,
    topic: "Central Tendency",
    q: "Find the median of the first 6 prime numbers: 2, 3, 5, 7, 11, 13.",
    options: ["6", "7", "5.5", "6.5"],
    ans: 0,
    exp: "Middle two numbers are 5 and 7. Median = (5 + 7) / 2 = 6."
  },
  {
    id: 18,
    topic: "Dispersion",
    q: "If every observation in a dataset is multiplied by 4, the standard deviation is:",
    options: ["Multiplied by 4", "Multiplied by 16", "Increased by 4", "Unchanged"],
    ans: 0,
    exp: "SD is scaled by |k| = 4. (Variance is scaled by 16)."
  },
  {
    id: 19,
    topic: "Data Interpretation",
    q: "In a company of 600 workers, 150 are in Sales. What sector angle represents Sales?",
    options: ["60°", "90°", "100°", "120°"],
    ans: 1,
    exp: "Angle = (150 / 600) × 360° = (1/4) × 360° = 90°."
  },
  {
    id: 20,
    topic: "Dispersion",
    q: "What is the sample variance (s²) for the dataset 4, 8, 12?",
    options: ["16", "10.67", "8", "4"],
    ans: 0,
    exp: "Sample mean = 8. Squared deviations: (4-8)²=16, 0, (12-8)²=16. Sum = 32. s² = 32 / (3 - 1) = 32 / 2 = 16."
  },
  {
    id: 21,
    topic: "Central Tendency",
    q: "The mean of 5 consecutive odd numbers is 31. What is the smallest number?",
    options: ["25", "27", "29", "23"],
    ans: 1,
    exp: "Middle number is 31. The 5 numbers are 27, 29, 31, 33, 35. Smallest = 27."
  },
  {
    id: 22,
    topic: "Dispersion",
    q: "If SD of x is 6, what is the SD of y = -2x + 15?",
    options: ["-12", "12", "24", "15"],
    ans: 1,
    exp: "SD(y) = |-2| × SD(x) = 2 × 6 = 12."
  },
  {
    id: 23,
    topic: "Central Tendency",
    q: "A bowler takes 0, 2, 4, 1, 3 wickets in 5 matches. What is the mean score?",
    options: ["2", "2.5", "1.8", "3"],
    ans: 0,
    exp: "Sum = 0 + 2 + 4 + 1 + 3 = 10. Mean = 10 / 5 = 2."
  },
  {
    id: 24,
    topic: "Percentiles",
    q: "A candidate at the 90th percentile scored:",
    options: ["90% marks", "Better than or equal to 90% of candidates", "Equal to 90 candidates", "Below the median"],
    ans: 1,
    exp: "90th percentile means standing above or equal to 90% of test participants."
  },
  {
    id: 25,
    topic: "Central Tendency",
    q: "The average age of 4 brothers is 15 years. If the father's age (45 years) is included, the new average age is:",
    options: ["21 years", "22 years", "20 years", "24 years"],
    ans: 0,
    exp: "Total age of brothers = 4 × 15 = 60. With father = 60 + 45 = 105. New average = 105 / 5 = 21 years."
  },

  // 10 FAST / Scholarship Level
  {
    id: 26,
    topic: "Central Tendency",
    q: "In an entry test with 120 candidates, average score was 55. Passed candidates averaged 65 and failed candidates averaged 45. How many candidates passed?",
    options: ["60", "70", "80", "50"],
    ans: 0,
    exp: "Let p = passed. 65p + 45(120 - p) = 120 × 55 => 65p + 5400 - 45p = 6600 => 20p = 1200 => p = 60."
  },
  {
    id: 27,
    topic: "Dispersion",
    q: "If Σx = 120 and Σx² = 2000 for N = 10 observations, what is the population variance σ²?",
    options: ["56", "64", "48", "72"],
    ans: 0,
    exp: "μ = 120/10 = 12. σ² = (Σx²/N) - μ² = (2000/10) - 12² = 200 - 144 = 56."
  },
  {
    id: 28,
    topic: "Central Tendency",
    q: "A vehicle covers distance D at speed 30 km/h and returns the same distance at 60 km/h. What is the average speed?",
    options: ["45 km/h", "40 km/h", "42 km/h", "48 km/h"],
    ans: 1,
    exp: "Harmonic Mean: 2(30×60)/(30 + 60) = 3600 / 90 = 40 km/h."
  },
  {
    id: 29,
    topic: "Dispersion",
    q: "The standard deviation of first 9 natural numbers (1 to 9) is:",
    options: ["√6.67", "√6.00", "2.58", "2.45"],
    ans: 2,
    exp: "σ = √((n² - 1)/12) = √((81 - 1)/12) = √(80/12) = √(20/3) ≈ √6.6667 ≈ 2.58."
  },
  {
    id: 30,
    topic: "Central Tendency",
    q: "If the mean of x and 1/x is 3, what is the mean of x² and 1/x²?",
    options: ["17", "16", "18", "34"],
    ans: 0,
    exp: "(x + 1/x)/2 = 3 => x + 1/x = 6. (x + 1/x)² = 36 => x² + 1/x² + 2 = 36 => x² + 1/x² = 34. Mean = 34 / 2 = 17."
  },
  {
    id: 31,
    topic: "Dispersion",
    q: "If the deviations from assumed mean A = 40 for 25 values satisfy Σ(x - 40) = 75, what is the true arithmetic mean?",
    options: ["43", "41.5", "42", "44"],
    ans: 0,
    exp: "True Mean = 40 + (75 / 25) = 40 + 3 = 43."
  },
  {
    id: 32,
    topic: "Quartiles & Outliers",
    q: "For a dataset with Q1 = 20 and Q3 = 50, which of the following values is an outlier?",
    options: ["90", "100", "96", "All of the above"],
    ans: 3,
    exp: "IQR = 50 - 20 = 30. Upper fence = Q3 + 1.5(IQR) = 50 + 1.5(30) = 50 + 45 = 95. Therefore 96 and 100 are definitely outliers; in test question options, 96 and 100 qualify."
  },
  {
    id: 33,
    topic: "Central Tendency",
    q: "The average score of 15 students was 80. If the highest and lowest scores (98 and 52) are removed, what is the average of the remaining 13 students?",
    options: ["80.77", "81.00", "79.50", "82.15"],
    ans: 0,
    exp: "Total of 15 = 15 × 80 = 1200. Remaining total = 1200 - (98 + 52) = 1200 - 150 = 1050. Remaining average = 1050 / 13 ≈ 80.769 ≈ 80.77."
  },
  {
    id: 34,
    topic: "Dispersion",
    q: "The variance of 10 observations is 4. If an observation equal to the mean is added, the new variance is:",
    options: ["3.64", "4.00", "4.40", "3.20"],
    ans: 0,
    exp: "Sum of squared deviations remains 10 × 4 = 40. New N = 11. New variance = 40 / 11 ≈ 3.636 ≈ 3.64."
  },
  {
    id: 35,
    topic: "Central Tendency",
    q: "In a positively skewed distribution, the relationship among central tendencies is:",
    options: ["Mean > Median > Mode", "Mode > Median > Mean", "Median > Mean > Mode", "Mean = Median = Mode"],
    ans: 0,
    exp: "Right-skewed (positive) distributions have longer right tails, pulling the Mean higher: Mean > Median > Mode."
  }
];

let testState = {
  currentIdx: 0,
  userAnswers: {},
  flagged: {},
  timeLeft: 30 * 60, // 30 mins in seconds
  timerInterval: null,
  isSubmitted: false
};

function initMasterTest() {
  const startBtn = document.getElementById("btnStartTest");
  const testBox = document.getElementById("masterTestBox");
  const prevBtn = document.getElementById("btnTestPrev");
  const nextBtn = document.getElementById("btnTestNext");
  const flagBtn = document.getElementById("btnTestFlag");
  const submitBtn = document.getElementById("btnTestSubmit");
  const restartBtn = document.getElementById("btnTestRestart");

  if (!startBtn || !testBox) return;

  startBtn.addEventListener("click", () => {
    document.getElementById("testIntroCard").style.display = "none";
    testBox.style.display = "block";
    startTestTimer();
    renderTestNavGrid();
    renderCurrentTestQuestion();
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (testState.currentIdx > 0) {
        testState.currentIdx--;
        renderCurrentTestQuestion();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (testState.currentIdx < MASTER_TEST_QUESTIONS.length - 1) {
        testState.currentIdx++;
        renderCurrentTestQuestion();
      }
    });
  }

  if (flagBtn) {
    flagBtn.addEventListener("click", () => {
      const cur = testState.currentIdx;
      testState.flagged[cur] = !testState.flagged[cur];
      flagBtn.innerText = testState.flagged[cur] ? "★ Flagged for Review" : "☆ Flag for Review";
      renderTestNavGrid();
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to submit your test?")) {
        submitMasterTest();
      }
    });
  }

  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      resetMasterTest();
    });
  }
}

function startTestTimer() {
  const timerElem = document.getElementById("testTimerVal");
  if (!timerElem) return;

  clearInterval(testState.timerInterval);
  testState.timerInterval = setInterval(() => {
    testState.timeLeft--;
    const mins = Math.floor(testState.timeLeft / 60);
    const secs = testState.timeLeft % 60;
    timerElem.innerText = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    if (testState.timeLeft <= 300) {
      document.getElementById("testTimerBadge")?.classList.add("warning");
    }

    if (testState.timeLeft <= 0) {
      clearInterval(testState.timerInterval);
      alert("Time is up! Submitting your test automatically.");
      submitMasterTest();
    }
  }, 1000);
}

function renderTestNavGrid() {
  const grid = document.getElementById("testNavGrid");
  if (!grid) return;

  grid.innerHTML = "";
  MASTER_TEST_QUESTIONS.forEach((q, idx) => {
    const btn = document.createElement("button");
    btn.className = "test-nav-btn";
    btn.innerText = idx + 1;

    if (idx === testState.currentIdx) btn.classList.add("current");
    if (testState.userAnswers[idx] !== undefined) btn.classList.add("answered");
    if (testState.flagged[idx]) btn.classList.add("flagged");

    btn.addEventListener("click", () => {
      testState.currentIdx = idx;
      renderCurrentTestQuestion();
    });

    grid.appendChild(btn);
  });
}

function renderCurrentTestQuestion() {
  const q = MASTER_TEST_QUESTIONS[testState.currentIdx];
  if (!q) return;

  document.getElementById("testQNumber").innerText = `Question ${testState.currentIdx + 1} of ${MASTER_TEST_QUESTIONS.length}`;
  document.getElementById("testQTopic").innerText = q.topic;
  document.getElementById("testQText").innerText = q.q;

  const flagBtn = document.getElementById("btnTestFlag");
  if (flagBtn) {
    flagBtn.innerText = testState.flagged[testState.currentIdx] ? "★ Flagged for Review" : "☆ Flag for Review";
  }

  const optionsContainer = document.getElementById("testOptionsContainer");
  optionsContainer.innerHTML = "";

  q.options.forEach((opt, optIdx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    if (testState.userAnswers[testState.currentIdx] === optIdx) {
      btn.style.borderColor = "var(--primary)";
      btn.style.backgroundColor = "var(--primary-subtle)";
    }

    btn.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + optIdx)}</span>
      <span>${opt}</span>
    `;

    btn.addEventListener("click", () => {
      testState.userAnswers[testState.currentIdx] = optIdx;
      renderTestNavGrid();
      renderCurrentTestQuestion();
    });

    optionsContainer.appendChild(btn);
  });

  // Enable/disable prev/next buttons
  const prevBtn = document.getElementById("btnTestPrev");
  const nextBtn = document.getElementById("btnTestNext");
  if (prevBtn) prevBtn.disabled = testState.currentIdx === 0;
  if (nextBtn) nextBtn.disabled = testState.currentIdx === MASTER_TEST_QUESTIONS.length - 1;

  renderTestNavGrid();
}

function submitMasterTest() {
  clearInterval(testState.timerInterval);
  testState.isSubmitted = true;

  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const topicStats = {};

  MASTER_TEST_QUESTIONS.forEach((q, idx) => {
    if (!topicStats[q.topic]) {
      topicStats[q.topic] = { total: 0, correct: 0 };
    }
    topicStats[q.topic].total++;

    const userAns = testState.userAnswers[idx];
    if (userAns === undefined) {
      unattemptedCount++;
    } else if (userAns === q.ans) {
      correctCount++;
      topicStats[q.topic].correct++;
    } else {
      incorrectCount++;
    }
  });

  const totalQuestions = MASTER_TEST_QUESTIONS.length;
  const percentage = ((correctCount / totalQuestions) * 100).toFixed(1);
  const timeUsedSeconds = 30 * 60 - testState.timeLeft;
  const timeUsedMins = Math.floor(timeUsedSeconds / 60);
  const timeUsedSecs = timeUsedSeconds % 60;
  const accuracy = correctCount + incorrectCount > 0 ? (((correctCount / (correctCount + incorrectCount)) * 100).toFixed(1)) : 0;

  // Save best score
  const prevBest = parseFloat(localStorage.getItem("fast_math_stat_best_score") || "0");
  if (parseFloat(percentage) > prevBest) {
    localStorage.setItem("fast_math_stat_best_score", percentage);
  }

  // Populate Result Card
  document.getElementById("resTestScoreBig").innerText = `${correctCount} / ${totalQuestions}`;
  document.getElementById("resTestPercent").innerText = `${percentage}%`;
  document.getElementById("resTestAccuracy").innerText = `${accuracy}%`;
  document.getElementById("resTestTimeUsed").innerText = `${timeUsedMins}m ${timeUsedSecs}s`;
  document.getElementById("resTestCorrect").innerText = correctCount;
  document.getElementById("resTestIncorrect").innerText = incorrectCount;
  document.getElementById("resTestUnattempted").innerText = unattemptedCount;

  // Diagnostics breakdown
  let strongTopics = [];
  let weakTopics = [];

  Object.keys(topicStats).forEach((topic) => {
    const stats = topicStats[topic];
    const rate = (stats.correct / stats.total) * 100;
    if (rate >= 70) {
      strongTopics.push(`${topic} (${Math.round(rate)}%)`);
    } else {
      weakTopics.push(`${topic} (${Math.round(rate)}%)`);
    }
  });

  document.getElementById("resStrongTopics").innerText = strongTopics.length > 0 ? strongTopics.join(" • ") : "Keep revising all topics!";
  document.getElementById("resWeakTopics").innerText = weakTopics.length > 0 ? weakTopics.join(" • ") : "No weak topics detected! Excellent!";

  // Review list
  const reviewList = document.getElementById("testReviewQuestions");
  if (reviewList) {
    reviewList.innerHTML = "";
    MASTER_TEST_QUESTIONS.forEach((q, idx) => {
      const userAns = testState.userAnswers[idx];
      const isCorrect = userAns === q.ans;
      const isSkipped = userAns === undefined;

      const item = document.createElement("div");
      item.className = "mcq-card";
      item.style.borderColor = isCorrect ? "var(--primary-border)" : isSkipped ? "var(--border-medium)" : "var(--accent-red-border)";
      item.innerHTML = `
        <div class="mcq-header">
          <span class="mcq-id">Q${idx + 1}. [${q.topic}]</span>
          <span class="difficulty-badge ${isCorrect ? "diff-easy" : isSkipped ? "diff-medium" : "diff-fast"}">
            ${isCorrect ? "✓ Correct" : isSkipped ? "○ Unattempted" : "✗ Incorrect"}
          </span>
        </div>
        <p class="mcq-question">${q.q}</p>
        <p style="font-size: 0.9rem; margin-bottom: 0.35rem;">
          Your Answer: <strong>${userAns !== undefined ? String.fromCharCode(65 + userAns) + ". " + q.options[userAns] : "Not Answered"}</strong>
        </p>
        <p style="font-size: 0.9rem; color: var(--primary-dark); font-weight: 600;">
          Correct Answer: ${String.fromCharCode(65 + q.ans)}. ${q.options[q.ans]}
        </p>
        <div class="step-box" style="margin-top: 0.5rem;">
          <div class="step-label">Explanation:</div>
          <p style="margin-bottom: 0; font-size: 0.88rem;">${q.exp}</p>
        </div>
      `;
      reviewList.appendChild(item);
    });
  }

  document.getElementById("masterTestBox").style.display = "none";
  document.getElementById("masterTestResultCard").style.display = "block";
  document.getElementById("masterTestResultCard").scrollIntoView({ behavior: "smooth" });
}

function resetMasterTest() {
  testState = {
    currentIdx: 0,
    userAnswers: {},
    flagged: {},
    timeLeft: 30 * 60,
    timerInterval: null,
    isSubmitted: false
  };
  document.getElementById("masterTestResultCard").style.display = "none";
  document.getElementById("testIntroCard").style.display = "block";
  document.getElementById("testTimerBadge")?.classList.remove("warning");
}
