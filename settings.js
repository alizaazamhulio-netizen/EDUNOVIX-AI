/* ==========================================================================
   SETTINGS.JS - NOVIX Settings Page Logic
   Handles tab switching, form controls, theme persistence, modals & toasts
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all settings modules
  initTabNavigation();
  initProfileSettings();
  initAccountSettings();
  initAppearanceSettings();
  initNotificationSettings();
  initAiSettings();
  initStudySettings();
  initSecuritySettings();
  initDataManagement();
  initFaqAccordion();
  initFeedbackForm();
  initLogoutModal();
  initHeaderSearch();
  initLiveClock();
});

/* ==========================================
   1. TOAST NOTIFICATION HELPER
   ========================================== */
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconClass = "fa-check-circle";
  if (type === "info") iconClass = "fa-info-circle";
  if (type === "warning") iconClass = "fa-exclamation-circle";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ==========================================
   2. CATEGORY TAB NAVIGATION
   ========================================== */
function initTabNavigation() {
  const tabBtns = document.querySelectorAll(".settings-tab-btn");
  const sections = document.querySelectorAll(".settings-section");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");

      // Update active tab button
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      // Show target section
      sections.forEach(sec => {
        if (sec.id === targetTab || (targetTab === "logout" && sec.id === "logoutSection")) {
          sec.classList.add("active");
        } else {
          sec.classList.remove("active");
        }
      });
    });
  });
}

/* ==========================================
   3. PROFILE SETTINGS MODULE
   ========================================== */
function initProfileSettings() {
  const editBtn = document.getElementById("editProfileBtn");
  const saveBtn = document.getElementById("saveProfileBtn");
  const cancelBtn = document.getElementById("cancelProfileBtn");

  const fullNameInput = document.getElementById("profileFullName");
  const emailInput = document.getElementById("profileEmail");
  const classInput = document.getElementById("profileClass");
  const schoolInput = document.getElementById("profileSchool");
  const bioInput = document.getElementById("profileBio");

  const displayProfileName = document.getElementById("displayProfileName");
  const displayProfileRole = document.getElementById("displayProfileRole");
  const sidebarUserName = document.getElementById("sidebarUserName");

  const avatarInput = document.getElementById("avatarFileInput");
  const uploadAvatarBtn = document.getElementById("uploadAvatarBtn");
  const profileAvatarXL = document.getElementById("profileAvatarXL");
  const sidebarAvatar = document.getElementById("sidebarAvatar");

  // Initial State Backup
  let originalProfile = {
    fullName: fullNameInput.value,
    email: emailInput.value,
    class: classInput.value,
    school: schoolInput.value,
    bio: bioInput.value
  };

  function setEditing(isEditing) {
    [fullNameInput, emailInput, classInput, schoolInput, bioInput].forEach(input => {
      if (input) input.disabled = !isEditing;
    });

    if (isEditing) {
      editBtn.classList.add("hidden");
      saveBtn.classList.remove("hidden");
      cancelBtn.classList.remove("hidden");
    } else {
      editBtn.classList.remove("hidden");
      saveBtn.classList.add("hidden");
      cancelBtn.classList.add("hidden");
    }
  }

  editBtn?.addEventListener("click", () => setEditing(true));

  cancelBtn?.addEventListener("click", () => {
    fullNameInput.value = originalProfile.fullName;
    emailInput.value = originalProfile.email;
    classInput.value = originalProfile.class;
    schoolInput.value = originalProfile.school;
    bioInput.value = originalProfile.bio;
    setEditing(false);
    showToast("Profile edits cancelled", "info");
  });

  saveBtn?.addEventListener("click", () => {
    originalProfile = {
      fullName: fullNameInput.value,
      email: emailInput.value,
      class: classInput.value,
      school: schoolInput.value,
      bio: bioInput.value
    };

    if (displayProfileName) displayProfileName.textContent = fullNameInput.value;
    if (sidebarUserName) sidebarUserName.textContent = fullNameInput.value;
    if (displayProfileRole) {
      displayProfileRole.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${classInput.value} &bull; ${schoolInput.value}`;
    }

    setEditing(false);
    showToast("Profile details updated successfully!");
  });

  // Avatar Upload Handler
  uploadAvatarBtn?.addEventListener("click", () => avatarInput?.click());

  avatarInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(evt) {
        const imgUrl = evt.target.result;
        if (profileAvatarXL) {
          profileAvatarXL.style.backgroundImage = `url('${imgUrl}')`;
          profileAvatarXL.style.backgroundSize = "cover";
          profileAvatarXL.querySelector("span").style.display = "none";
        }
        if (sidebarAvatar) {
          sidebarAvatar.style.backgroundImage = `url('${imgUrl}')`;
          sidebarAvatar.style.backgroundSize = "cover";
          sidebarAvatar.textContent = "";
        }
        showToast("Profile avatar updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  });
}

/* ==========================================
   4. ACCOUNT SETTINGS MODULE
   ========================================== */
function initAccountSettings() {
  const saveBtn = document.getElementById("saveAccountBtn");
  saveBtn?.addEventListener("click", () => {
    showToast("Account & region preferences saved!");
  });
}

/* ==========================================
   5. APPEARANCE SETTINGS MODULE
   ========================================== */
function initAppearanceSettings() {
  // Theme Option Cards (Dark vs Light)
  const themeCards = document.querySelectorAll(".theme-card-option");
  const htmlEl = document.documentElement;
  const themeIcon = document.getElementById("themeIcon");

  themeCards.forEach(card => {
    card.addEventListener("click", () => {
      const mode = card.getAttribute("data-theme-mode");
      themeCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      htmlEl.setAttribute("data-theme", mode);
      localStorage.setItem("theme", mode);

      if (themeIcon) {
        themeIcon.className = mode === "dark" ? "fa-solid fa-moon" : "fa-solid fa-sun";
      }

      showToast(`Switched to ${mode === "dark" ? "Dark Glass" : "Clean Light"} theme mode`);
    });
  });

  // Accent Color Swatches
  const colorSwatches = document.querySelectorAll(".accent-swatch");
  colorSwatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      colorSwatches.forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");

      const color = swatch.getAttribute("data-color");
      const root = document.documentElement;

      if (color === "indigo") {
        root.style.setProperty("--primary", "#6366f1");
        root.style.setProperty("--primary-gradient", "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)");
      } else if (color === "cyan") {
        root.style.setProperty("--primary", "#06b6d4");
        root.style.setProperty("--primary-gradient", "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)");
      } else if (color === "emerald") {
        root.style.setProperty("--primary", "#10b981");
        root.style.setProperty("--primary-gradient", "linear-gradient(135deg, #10b981 0%, #059669 100%)");
      } else if (color === "amber") {
        root.style.setProperty("--primary", "#f59e0b");
        root.style.setProperty("--primary-gradient", "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)");
      } else if (color === "rose") {
        root.style.setProperty("--primary", "#f43f5e");
        root.style.setProperty("--primary-gradient", "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)");
      } else if (color === "purple") {
        root.style.setProperty("--primary", "#a855f7");
        root.style.setProperty("--primary-gradient", "linear-gradient(135deg, #a855f7 0%, #6b21a8 100%)");
      }

      showToast(`Primary theme accent updated to ${color.toUpperCase()}`);
    });
  });

  // Font Size Selector
  const fontBtns = document.querySelectorAll("#fontSizeSelector .pill-btn");
  fontBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      fontBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const size = btn.getAttribute("data-font-size");
      
      if (size === "small") document.documentElement.style.fontSize = "14px";
      if (size === "medium") document.documentElement.style.fontSize = "16px";
      if (size === "large") document.documentElement.style.fontSize = "18px";

      showToast(`Interface font scaling adjusted to ${size}`);
    });
  });

  // Compact Mode Toggle
  const compactToggle = document.getElementById("compactModeToggle");
  compactToggle?.addEventListener("change", (e) => {
    if (e.target.checked) {
      document.body.classList.add("compact-mode");
      showToast("Compact layout mode enabled");
    } else {
      document.body.classList.remove("compact-mode");
      showToast("Compact layout mode disabled");
    }
  });
}

/* ==========================================
   6. NOTIFICATION SETTINGS MODULE
   ========================================== */
function initNotificationSettings() {
  const testBtn = document.getElementById("testNotificationBtn");
  testBtn?.addEventListener("click", () => {
    showToast("Test Notification: Study Session in 15 mins!", "info");
  });
}

/* ==========================================
   7. AI SETTINGS MODULE
   ========================================== */
function initAiSettings() {
  // Response Length Pills
  const lengthBtns = document.querySelectorAll("#aiResponseLengthSelector .pill-btn");
  lengthBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      lengthBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      showToast(`AI explanation depth set to: ${btn.textContent.trim()}`);
    });
  });

  // Quiz Difficulty Pills
  const diffBtns = document.querySelectorAll("#aiQuizDifficultySelector .pill-btn");
  diffBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      diffBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      showToast(`AI generated quiz level set to: ${btn.textContent.trim()}`);
    });
  });
}

/* ==========================================
   8. STUDY SETTINGS MODULE
   ========================================== */
function initStudySettings() {
  const dailySlider = document.getElementById("dailyStudyGoal");
  const dailyVal = document.getElementById("dailyStudyGoalVal");

  dailySlider?.addEventListener("input", (e) => {
    if (dailyVal) dailyVal.textContent = `${e.target.value} Hrs/day`;
  });

  const weeklySlider = document.getElementById("weeklyStudyGoal");
  const weeklyVal = document.getElementById("weeklyStudyGoalVal");

  weeklySlider?.addEventListener("input", (e) => {
    if (weeklyVal) weeklyVal.textContent = `${e.target.value} Hrs/week`;
  });

  const saveBtn = document.getElementById("saveStudyGoalsBtn");
  saveBtn?.addEventListener("click", () => {
    showToast("Study goals and Pomodoro timers saved successfully!");
  });
}

/* ==========================================
   9. SECURITY SETTINGS MODULE
   ========================================== */
function initSecuritySettings() {
  // Password Show / Hide Eye Icon Toggles
  const toggleBtns = document.querySelectorAll(".password-toggle-btn");
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const field = btn.previousElementSibling;
      if (field && field.classList.contains("password-field")) {
        if (field.type === "password") {
          field.type = "text";
          btn.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`;
        } else {
          field.type = "password";
          btn.innerHTML = `<i class="fa-solid fa-eye"></i>`;
        }
      }
    });
  });

  // Change Password Form Submission
  const pwdForm = document.getElementById("changePasswordForm");
  pwdForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const current = document.getElementById("currentPassword").value;
    const newPwd = document.getElementById("newPassword").value;
    const confirmPwd = document.getElementById("confirmPassword").value;

    if (!current) {
      showToast("Please enter your current password", "warning");
      return;
    }
    if (newPwd !== confirmPwd) {
      showToast("New passwords do not match!", "warning");
      return;
    }
    if (newPwd.length < 6) {
      showToast("Password must be at least 6 characters long", "warning");
      return;
    }

    showToast("Account security credentials updated!");
    pwdForm.reset();
  });
}

/* ==========================================
   10. DATA MANAGEMENT MODULE
   ========================================== */
function initDataManagement() {
  // Export JSON
  document.getElementById("exportDataBtn")?.addEventListener("click", () => {
    const studyData = {
      user: "Alex Vance",
      appVersion: "2.4.0",
      exportDate: new Date().toISOString(),
      streak: 14,
      subjects: ["Mathematics", "Computer Science", "Physics", "Chemistry"],
      goals: { dailyHours: 4.5, weeklyHours: 30 }
    };

    const blob = new Blob([JSON.stringify(studyData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EduNexa_AI_Backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();

    showToast("Exported Study Data JSON archive");
  });

  // Import File
  const importInput = document.getElementById("importFileInput");
  document.getElementById("importDataBtn")?.addEventListener("click", () => {
    importInput?.click();
  });

  importInput?.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      showToast("Study Data JSON imported successfully!");
    }
  });

  // Download PDF simulation
  document.getElementById("downloadNotesBtn")?.addEventListener("click", () => {
    showToast("Generating Notes PDF document...", "info");
    setTimeout(() => showToast("Downloaded Compiled Notes PDF"), 1500);
  });

  document.getElementById("downloadReportBtn")?.addEventListener("click", () => {
    showToast("Generating Academic Progress Transcript...", "info");
    setTimeout(() => showToast("Downloaded Progress Report PDF"), 1500);
  });

  // Danger Actions
  document.getElementById("clearAiHistoryBtn")?.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all AI conversation history?")) {
      showToast("AI conversation logs cleared", "warning");
    }
  });

  document.getElementById("resetProgressBtn")?.addEventListener("click", () => {
    if (confirm("DANGER: This will reset all streak days and subject mastery scores. Proceed?")) {
      showToast("Progress analytics reset to zero", "warning");
    }
  });
}

/* ==========================================
   11. FAQ ACCORDION
   ========================================== */
function initFaqAccordion() {
  const faqHeaders = document.querySelectorAll(".faq-header");
  faqHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      item.classList.toggle("active");
    });
  });
}

/* ==========================================
   12. FEEDBACK FORM
   ========================================== */
function initFeedbackForm() {
  const stars = document.querySelectorAll("#starRating .star");
  let selectedRating = 5;

  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.getAttribute("data-rating"));
      stars.forEach((s, idx) => {
        if (idx < selectedRating) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });
    });
  });

  const feedbackForm = document.getElementById("feedbackForm");
  feedbackForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    showToast("Thank you for your valuable feedback!");
    feedbackForm.reset();
  });
}

/* ==========================================
   13. LOGOUT MODAL MODULE
   ========================================== */
function initLogoutModal() {
  const modal = document.getElementById("logoutModal");
  const openBtn = document.getElementById("openLogoutModalBtn");
  const closeBtn = document.getElementById("closeLogoutModalBtn");
  const cancelBtn = document.getElementById("cancelLogoutBtn");
  const confirmBtn = document.getElementById("confirmLogoutBtn");

  function openModal() {
    modal?.classList.remove("hidden");
  }

  function closeModal() {
    modal?.classList.add("hidden");
  }

  openBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  confirmBtn?.addEventListener("click", () => {
    if (window.EduNexaAuth?.logout) {
      confirmBtn.disabled = true;
      window.EduNexaAuth.logout();
      return;
    }
    showToast("Your authentication session is not ready. Please try again.", "warning");
  });
}

/* ==========================================
   14. HEADER SEARCH & SHORTCUT
   ========================================== */
function initHeaderSearch() {
  const searchInput = document.getElementById("settingsSearchInput");
  
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      searchInput?.focus();
    }
  });

  searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) return;

    // Filter setting switch titles and boxes
    const switchRows = document.querySelectorAll(".switch-item-row");
    switchRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (text.includes(query)) {
        row.style.display = "flex";
      } else {
        row.style.display = "none";
      }
    });
  });
}

/* ==========================================
   15. REAL-TIME CLOCK
   ========================================== */
function initLiveClock() {
  const timeDisplay = document.getElementById("liveTimeDisplay");
  const dateDisplay = document.getElementById("liveDateDisplay");

  function updateTime() {
    const now = new Date();
    if (timeDisplay) {
      timeDisplay.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (dateDisplay) {
      const dateStr = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
      dateDisplay.querySelector("span").textContent = dateStr;
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}
