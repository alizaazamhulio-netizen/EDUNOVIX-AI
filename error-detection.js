/**
 * ============================================================
 * ERROR DETECTION & SENTENCE CORRECTION - INTERACTIVE ENGINE
 * File: error-detection.js
 * ============================================================
 */

(function() {
  'use strict';

  // --- STATE & PERSISTENCE ---
  const STORAGE_KEY = 'grammarguard_progress_v1';

  let state = {
    errorsIdentified: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    masteryScore: 0,
    masteryAnswered: 0,
    knownCards: [],
    bookmarks: [],
    checkedRevision: [],
    completedModules: []
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = Object.assign(state, JSON.parse(saved));
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or disabled:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Could not save to LocalStorage:', e);
    }
    updateDashboardUI();
  }

  function showToast(message, icon = 'fa-circle-check') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color: var(--teal-accent);"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- PROGRESS DASHBOARD UI ---
  function updateDashboardUI() {
    const elErrors = document.getElementById('statErrorsIdentified');
    const elQuestions = document.getElementById('statQuestionsAnswered');
    const elAccuracy = document.getElementById('statAccuracy');
    const elAccuracySub = document.getElementById('statAccuracySub');
    const elMastery = document.getElementById('statMasteryScore');
    const elProgText = document.getElementById('chapterProgressText');
    const elProgFill = document.getElementById('chapterProgressFill');
    const elBmkCount = document.getElementById('bookmarkCountBadge');

    if (elErrors) elErrors.textContent = state.errorsIdentified;
    if (elQuestions) elQuestions.textContent = state.questionsAnswered;

    let accuracy = 0;
    if (state.questionsAnswered > 0) {
      accuracy = Math.round((state.correctAnswers / state.questionsAnswered) * 100);
      if (elAccuracy) elAccuracy.textContent = accuracy + '%';
      if (elAccuracySub) elAccuracySub.textContent = `${state.correctAnswers} of ${state.questionsAnswered} correct`;
    } else {
      if (elAccuracy) elAccuracy.textContent = '0%';
      if (elAccuracySub) elAccuracySub.textContent = 'Start practicing to build progress';
    }

    if (elMastery) {
      const masteryPct = Math.min(100, Math.round((state.masteryScore / 20) * 100));
      elMastery.textContent = masteryPct + '%';
    }

    const totalTracked = state.completedModules.length + (state.questionsAnswered > 0 ? 5 : 0) + (state.knownCards.length > 0 ? 5 : 0);
    const overallProgress = Math.min(100, Math.round((totalTracked / 40) * 100));
    if (elProgText) elProgText.textContent = `${state.completedModules.length} of 30 module units explored`;
    if (elProgFill) elProgFill.style.width = overallProgress + '%';
    if (elBmkCount) elBmkCount.textContent = state.bookmarks.length;
  }

  // --- ERROR OF THE DAY ROTATION ---
  const EOD_DATA = [
    {
      category: "Subject-Verb Agreement",
      wrong: '"The collection of rare antique coins were auctioned yesterday."',
      correct: '"The collection of rare antique coins was auctioned yesterday."',
      rule: "The subject is the singular collective noun 'collection'. The plural 'coins' inside the prepositional phrase does not change the verb number."
    },
    {
      category: "Dangling Modifiers",
      wrong: '"Having finished the assignment, the TV was turned on by John."',
      correct: '"Having finished the assignment, John turned on the TV."',
      rule: "The participial phrase 'Having finished...' must modify the subject performing the action ('John'), not 'the TV'."
    },
    {
      category: "Correlative Proximity",
      wrong: '"Neither the manager nor the employees was aware of the delay."',
      correct: '"Neither the manager nor the employees were aware of the delay."',
      rule: "With 'neither...nor', the verb agrees with the closer subject noun: 'employees' (plural) requires 'were'."
    },
    {
      category: "Negative Inversion",
      wrong: '"Rarely he attends the morning lectures during winter."',
      correct: '"Rarely does he attend the morning lectures during winter."',
      rule: "Fronting a restrictive or negative adverb ('Rarely') forces inverted auxiliary-subject order ('does he attend')."
    },
    {
      category: "Mandative Subjunctive",
      wrong: '"The committee recommends that she submits her research paper early."',
      correct: '"The committee recommends that she submit her research paper early."',
      rule: "Verbs of recommendation and demand require the base form (bare subjunctive 'submit') in the following 'that' clause."
    },
    {
      category: "Collocations & Prepositions",
      wrong: '"He made a huge mistake and tried to cope up with the consequences."',
      correct: '"He made a huge mistake and tried to cope with the consequences."',
      rule: "The standard English idiom is 'cope with', not 'cope up with'."
    },
    {
      category: "Pleonasm / Redundancy",
      wrong: '"The reason why we postponed the event is because it rained."',
      correct: '"The reason why we postponed the event is that it rained."',
      rule: "'The reason why...' already establishes causation; pairing it with 'because' creates redundant pleonasm. Use 'is that'."
    }
  ];

  function initErrorOfTheDay() {
    const today = new Date();
    const dayIndex = (today.getFullYear() * 365 + today.getMonth() * 31 + today.getDate()) % EOD_DATA.length;
    const item = EOD_DATA[dayIndex];

    const elDate = document.getElementById('eodDateText');
    const elCat = document.getElementById('eodCategoryText');
    const elWrong = document.getElementById('eodWrongText');
    const elCorrect = document.getElementById('eodCorrectText');
    const elRule = document.getElementById('eodRuleText');

    if (elDate) {
      const options = { weekday: 'short', month: 'short', day: 'numeric' };
      elDate.textContent = today.toLocaleDateString(undefined, options);
    }
    if (elCat) elCat.textContent = item.category;
    if (elWrong) elWrong.textContent = item.wrong;
    if (elCorrect) elCorrect.textContent = item.correct;
    if (elRule) elRule.textContent = item.rule;

    const btnTest = document.getElementById('btnEodQuickTest');
    if (btnTest) {
      btnTest.onclick = () => {
        const quizSec = document.getElementById('quiz');
        if (quizSec) quizSec.scrollIntoView({ behavior: 'smooth' });
      };
    }
  }

  // --- 5-STEP ERROR DETECTION ALGORITHM INTERACTIVE ---
  const METHOD_STEPS = {
    1: {
      title: "STEP 1: Read the Complete Sentence",
      detail: "Never evaluate isolated words in a vacuum. Read from capital letter to final punctuation mark to grasp the overall semantic message, clause boundaries, and time frame.",
      example: "<em>'Neither of the senior candidates have submitted their complete documents yesterday.'</em><br><span style='color:var(--text-muted);font-size:0.9rem;'>Initial scan catches past time marker 'yesterday' and distributive subject 'Neither'.</span>"
    },
    2: {
      title: "STEP 2: Find the Subject and Main Verb",
      detail: "Strip away all intervening prepositional phrases, parenthetical clauses, and appositives. Ask: Who or what is performing the core action?",
      example: "Subject: <strong>'Neither'</strong> (singular distributive pronoun).<br>Verb: <strong>'have submitted'</strong> (plural auxiliary - mismatch detected!)."
    },
    3: {
      title: "STEP 3: Check Tense and Verb Forms",
      detail: "Verify the chronological timeline. If there is a specific past time marker ('yesterday'), is the tense past simple? Check past participle pairings after auxiliaries.",
      example: "With 'yesterday', simple past <strong>'submitted'</strong> is preferred over present perfect <strong>'have submitted'</strong>."
    },
    4: {
      title: "STEP 4: Check Agreement, Modifiers, Articles, Prepositions & Pronouns",
      detail: "Check secondary grammatical components: singular pronoun references (<em>his/her</em> vs <em>their</em>), correct preposition collocations, and modifier attachment.",
      example: "Distributive 'Neither' correctly refers to <em>'his or her complete documents'</em> in formal writing."
    },
    5: {
      title: "STEP 5: Read the Corrected Sentence Naturally",
      detail: "Re-read the final amended version smoothly to ensure balanced cadence, clarity, and grammatical precision without introducing awkwardness.",
      example: "<span style='color:var(--correct-green);font-weight:700;'>✓ 'Neither of the senior candidates submitted his or her complete documents yesterday.'</span>"
    }
  };

  function initMethodologyTabs() {
    const buttons = document.querySelectorAll('.btn-method-step');
    const titleEl = document.getElementById('methodStepTitle');
    const detailEl = document.getElementById('methodStepDetail');
    const exBox = document.getElementById('methodExampleBox');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const stepNum = btn.dataset.step;
        const data = METHOD_STEPS[stepNum];
        if (data && titleEl && detailEl && exBox) {
          titleEl.textContent = data.title;
          detailEl.textContent = data.detail;
          exBox.innerHTML = `<strong>Demonstration Analysis:</strong><br>${data.example}`;
        }
      });
    });
  }

  // --- LIVE SEARCH & TOPIC FILTERS ---
  function initSearchAndFilter() {
    const searchInput = document.getElementById('globalSearchInput');
    const clearBtn = document.getElementById('btnSearchClear');
    const filterChips = document.querySelectorAll('.filter-chip');
    const counterEl = document.getElementById('searchResultsCount');
    const allCards = document.querySelectorAll('.module-card');

    let currentFilter = 'all';
    let currentQuery = '';

    function applyFilter() {
      let visibleCount = 0;
      const q = currentQuery.toLowerCase().trim();

      allCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const tags = (card.dataset.tags || '').toLowerCase();
        const matchesQuery = !q || text.includes(q) || tags.includes(q);

        let matchesChip = true;
        if (currentFilter !== 'all') {
          if (currentFilter === 'cat-beginner') matchesChip = card.classList.contains('cat-beginner') || tags.includes('beginner');
          else if (currentFilter === 'cat-intermediate') matchesChip = tags.includes('intermediate');
          else if (currentFilter === 'cat-advanced') matchesChip = tags.includes('advanced');
          else matchesChip = tags.includes(currentFilter);
        }

        if (matchesQuery && matchesChip) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (counterEl) {
        if (q || currentFilter !== 'all') {
          counterEl.textContent = `Showing ${visibleCount} of ${allCards.length} modules`;
        } else {
          counterEl.textContent = `Showing all ${allCards.length} modules`;
        }
      }

      if (clearBtn) {
        clearBtn.style.display = q.length > 0 ? 'block' : 'none';
      }
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        currentQuery = e.target.value;
        applyFilter();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        currentQuery = '';
        applyFilter();
        searchInput.focus();
      });
    }

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.dataset.filter || 'all';
        applyFilter();
      });
    });
  }

  // --- BOOKMARKS SYSTEM ---
  function initBookmarks() {
    const modal = document.getElementById('bookmarksModal');
    const btnOpen = document.getElementById('btnOpenBookmarks');
    const btnClose = document.getElementById('btnCloseBookmarks');
    const container = document.getElementById('bookmarksContainer');

    function renderBookmarks() {
      if (!container) return;
      if (state.bookmarks.length === 0) {
        container.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 2rem 0;">No bookmarked items yet. Click the bookmark icon on any module or quiz question to save it here for quick review!</p>`;
        return;
      }

      container.innerHTML = state.bookmarks.map((bmk, idx) => `
        <div class="feedback-box" style="display:flex; justify-content:space-between; align-items:flex-start; gap:1rem;">
          <div>
            <span class="hero-badge-pill" style="font-size:0.7rem; background:rgba(49,87,213,0.1); color:var(--royal-blue); margin-bottom:0.4rem; display:inline-block;">${bmk.category || 'Rule'}</span>
            <h4 style="margin:0.2rem 0 0.4rem; color:var(--navy-deep); font-size:1rem;">${bmk.title}</h4>
            <p style="margin:0; font-size:0.85rem; color:var(--text-secondary);">${bmk.snippet || ''}</p>
          </div>
          <button class="btn-reset-stats" style="color:var(--error-red); border-color:var(--error-border); padding:0.3rem 0.6rem;" data-remove-idx="${idx}" title="Remove bookmark">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `).join('');

      container.querySelectorAll('[data-remove-idx]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(btn.dataset.removeIdx, 10);
          state.bookmarks.splice(idx, 1);
          saveState();
          renderBookmarks();
          syncBookmarkButtons();
          showToast('Bookmark removed', 'fa-trash');
        });
      });
    }

    function syncBookmarkButtons() {
      document.querySelectorAll('.btn-bookmark-item').forEach(btn => {
        const id = btn.dataset.id;
        const isBmk = state.bookmarks.some(b => b.id === id);
        if (isBmk) {
          btn.classList.add('bookmarked');
          btn.innerHTML = '<i class="fa-solid fa-bookmark text-amber-accent"></i>';
        } else {
          btn.classList.remove('bookmarked');
          btn.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
        }
      });
    }

    document.querySelectorAll('.btn-bookmark-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const card = btn.closest('.module-card');
        const title = card ? card.querySelector('.module-title').textContent : 'Grammar Rule';
        const snippet = card ? card.querySelector('.module-rule-box').textContent.slice(0, 100) + '...' : '';
        const cat = card ? card.querySelector('.module-category-pill').textContent : 'Grammar';

        const existingIdx = state.bookmarks.findIndex(b => b.id === id);
        if (existingIdx >= 0) {
          state.bookmarks.splice(existingIdx, 1);
          showToast('Bookmark removed', 'fa-bookmark');
        } else {
          state.bookmarks.push({ id, title, snippet, category: cat });
          showToast('Rule saved to Bookmarks!', 'fa-bookmark');
        }
        saveState();
        syncBookmarkButtons();
      });
    });

    if (btnOpen) {
      btnOpen.addEventListener('click', () => {
        renderBookmarks();
        if (modal) modal.classList.add('show');
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', () => {
        if (modal) modal.classList.remove('show');
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
      });
    }

    syncBookmarkButtons();
  }

  // --- QUICK PRACTICE POPUP ON MODULES ---
  function initModuleMiniPractice() {
    const practiceData = {
      b1: { q: "The bouquet of roses (smell / smells) wonderful.", a: "smells", exp: "'Bouquet' is singular. 'Roses' is in a prepositional phrase." },
      b2: { q: "Everybody (is / are) waiting in the conference room.", a: "is", exp: "'Everybody' is grammatically singular." },
      b3: { q: "She has (wrote / written) three drafts already.", a: "written", exp: "Perfect tense requires past participle 'written'." },
      b4: { q: "He completed (a / an) honor degree at university.", a: "an", exp: "'Honor' begins with a silent 'h' vowel sound /ɒnər/." },
      b5: { q: "Between you and (I / me), this is confidential.", a: "me", exp: "Preposition 'Between' requires object pronoun 'me'." },
      b6: { q: "She is capable (of / to) solving complex equations.", a: "of", exp: "'Capable' pairs with the preposition 'of + ing'." },
      b7: { q: "He performed (exceptional / exceptionally) well today.", a: "exceptionally", exp: "Modifying the adverb 'well' requires an adverb." },
      b8: { q: "I (always have / have always) enjoyed literature.", a: "have always", exp: "Frequency adverb goes between auxiliary and main verb." },
      b9: { q: "We need more (equipments / equipment) for the lab.", a: "equipment", exp: "'Equipment' is an uncountable noun." },
      b10: { q: "She couldn't find (no / any) mistakes in the report.", a: "any", exp: "Avoid double negative with couldn't." },
      i1: { q: "He enjoys reading, writing, and (to paint / painting).", a: "painting", exp: "Parallel series of gerunds." },
      i2: { q: "While (walking / I walked) home, my hat flew off.", a: "I walked", exp: "Prevents the hat from walking." },
      i3: { q: "They decided (moving / to move) next month.", a: "to move", exp: "'Decide' takes an infinitive." },
      i4: { q: "If it (rains / will rain), we will stay inside.", a: "rains", exp: "Present simple in First Conditional if-clause." },
      i5: { q: "The bridge was (build / built) in 1920.", a: "built", exp: "Passive voice requires past participle 'built'." },
      i6: { q: "He (said / told) me that the flight was delayed.", a: "told", exp: "'Told' requires direct personal object 'me'." },
      i7: { q: "The candidate (who / whom) you interviewed was hired.", a: "whom", exp: "Object pronoun for the person being interviewed." },
      i8: { q: "This phone is (more better / better) than my old one.", a: "better", exp: "Avoid double comparative." },
      i9: { q: "Although tired, (yet / he) finished the report.", a: "he", exp: "Do not add coordinating conjunction after although." },
      i10: { q: "I have (few / little) patience for dishonesty.", a: "little", exp: "'Patience' is uncountable." },
      i11: { q: "You should (have / of) called earlier.", a: "have", exp: "Modal past is 'should have'." },
      i12: { q: "The flower smells (sweet / sweetly).", a: "sweet", exp: "Linking verb 'smell' takes predicate adjective." },
      a1: { q: "Seldom (we have / have we) witnessed such dedication.", a: "have we", exp: "Negative inversion order." },
      a2: { q: "Neither the captain nor the sailors (was / were) rescued.", a: "were", exp: "Proximity rule with plural 'sailors'." },
      a3: { q: "It is vital that he (be / is) present on time.", a: "be", exp: "Mandative subjunctive base verb." },
      a4: { q: "If she had trained, she (would be / would have been) ready now.", a: "would be", exp: "Mixed conditional with present result ('now')." },
      a5: { q: "Having eaten, the (waiter cleared / student left) the table.", a: "student left", exp: "Subject consistency with the participle." },
      a6: { q: "Please (revert back / reply) as soon as possible.", a: "reply", exp: "Avoid pleonastic redundancy." },
      a7: { q: "We must (make / do) progress today.", a: "make", exp: "Collocation is 'make progress'." },
      a8: { q: "I wonder where (is he / he is) going.", a: "he is", exp: "Embedded question statement order." }
    };

    document.querySelectorAll('.btn-mini-practice').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.practice;
        const item = practiceData[id];
        if (!item) return;

        const choice = prompt(`⚡ Quick Diagnostic Challenge:\n\n${item.q}\n\nType your answer:`);
        if (choice !== null) {
          const userAns = choice.trim().toLowerCase();
          state.questionsAnswered++;
          if (userAns === item.a.toLowerCase() || item.q.toLowerCase().includes(userAns)) {
            state.correctAnswers++;
            state.errorsIdentified++;
            if (!state.completedModules.includes(id)) state.completedModules.push(id);
            alert(`✓ CORRECT!\n\n${item.exp}`);
            showToast('Practice question answered correctly!', 'fa-circle-check');
          } else {
            alert(`❌ Not quite.\n\nCorrect Answer: "${item.a}"\nWhy: ${item.exp}`);
          }
          saveState();
        }
      });
    });
  }

  // --- LAB 1: INTERACTIVE ERROR HIGHLIGHTER ---
  const HIGHLIGHTER_PRESETS = [
    {
      tokens: [
        { word: "The", error: false },
        { word: "students", error: false },
        { word: "was", error: true, type: "Subject-Verb Agreement", fix: "were", exp: "'Students' is plural, requiring the plural auxiliary verb 'were'." },
        { word: "studying", error: false },
        { word: "very", error: false },
        { word: "hard", error: false },
        { word: "yesterday.", error: false }
      ]
    },
    {
      tokens: [
        { word: "She", error: false },
        { word: "has", error: false },
        { word: "went", error: true, type: "Tense / Verb Form", fix: "gone", exp: "The auxiliary 'has' requires the past participle 'gone', never past simple 'went'." },
        { word: "to", error: false },
        { word: "the", error: false },
        { word: "library", error: false },
        { word: "already.", error: false }
      ]
    },
    {
      tokens: [
        { word: "He", error: false },
        { word: "gave", error: false },
        { word: "me", error: false },
        { word: "an", error: true, type: "Article Error", fix: "some", exp: "'Advice' is an uncountable noun and cannot be preceded by the singular indefinite article 'an'." },
        { word: "advice", error: false },
        { word: "about", error: false },
        { word: "grammar.", error: false }
      ]
    },
    {
      tokens: [
        { word: "Walking", error: false },
        { word: "to", error: false },
        { word: "school,", error: false },
        { word: "the", error: false },
        { word: "rain", error: true, type: "Dangling Modifier", fix: "I was caught in the rain", exp: "The introductory participle 'Walking...' cannot modify 'the rain' since rain cannot walk." },
        { word: "started", error: false },
        { word: "suddenly.", error: false }
      ]
    }
  ];

  let currentPresetIndex = 0;

  function renderHighlighterLab() {
    const container = document.getElementById('highlighterTokensContainer');
    const panel = document.getElementById('highlighterFeedbackPanel');
    const typeEl = document.getElementById('highlighterErrorType');
    const fixEl = document.getElementById('highlighterCorrectionText');
    const expEl = document.getElementById('highlighterExplanationText');

    if (!container) return;
    if (panel) panel.classList.remove('show');
    container.innerHTML = '';

    const preset = HIGHLIGHTER_PRESETS[currentPresetIndex];
    preset.tokens.forEach((t, idx) => {
      const btn = document.createElement('button');
      btn.className = 'token-btn';
      btn.textContent = t.word;
      btn.addEventListener('click', () => {
        container.querySelectorAll('.token-btn').forEach(b => b.classList.remove('selected-error', 'selected-correct'));
        if (t.error) {
          btn.classList.add('selected-error');
          if (panel && typeEl && fixEl && expEl) {
            typeEl.textContent = `Identified Error: ${t.type}`;
            fixEl.textContent = t.fix;
            expEl.textContent = t.exp;
            panel.classList.add('show');
          }
          state.errorsIdentified++;
          saveState();
          showToast('Error located & diagnosed!', 'fa-magnifying-glass');
        } else {
          btn.classList.add('selected-correct');
          if (panel && typeEl && fixEl && expEl) {
            typeEl.textContent = "Grammatically Valid Word";
            typeEl.style.color = "var(--correct-green)";
            fixEl.textContent = "No change required";
            expEl.textContent = `"${t.word}" is syntactically standard in this context. Keep searching for the violation!`;
            panel.classList.add('show');
          }
        }
      });
      container.appendChild(btn);
    });
  }

  function initHighlighterLab() {
    renderHighlighterLab();
    const btnNext = document.getElementById('btnNextHighlighterPreset');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        currentPresetIndex = (currentPresetIndex + 1) % HIGHLIGHTER_PRESETS.length;
        renderHighlighterLab();
      });
    }
  }

  // --- LAB 2: SYNTAX DISSECTOR LAB ---
  const SYNTAX_DATA = [
    { word: "The list", role: "Subject (Singular)", cls: "token-subject", desc: "The main noun phrase acting as the true head of the clause. It governs the singular verb number." },
    { word: "of new books", role: "Prepositional Distractor", cls: "token-distractor", desc: "A modifying prepositional phrase. Even though 'books' is plural, it is the object of preposition 'of' and never affects verb agreement." },
    { word: "is", role: "Linking Verb (Singular)", cls: "token-verb", desc: "Singular form of 'be' agreeing precisely with the head subject 'The list'." },
    { word: "placed", role: "Past Participle", cls: "token-verb", desc: "Participle forming passive predicate with auxiliary 'is'." },
    { word: "carefully", role: "Adverb of Manner", cls: "token-modifier", desc: "Modifies the verb 'placed' indicating how the action was performed." },
    { word: "on the table.", role: "Adverbial Prepositional Phrase", cls: "token-object", desc: "Specifies spatial location answering 'where'." }
  ];

  function initSyntaxDissector() {
    const row = document.getElementById('syntaxTokensRow');
    const titleEl = document.getElementById('syntaxRoleTitle');
    const descEl = document.getElementById('syntaxRoleDesc');
    if (!row) return;

    row.innerHTML = '';
    SYNTAX_DATA.forEach((item, idx) => {
      const card = document.createElement('div');
      card.className = 'syntax-word-card';
      card.innerHTML = `
        <div class="syntax-word">${item.word}</div>
        <div class="syntax-role ${item.cls}">${item.role}</div>
      `;
      card.addEventListener('click', () => {
        row.querySelectorAll('.syntax-word-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        if (titleEl && descEl) {
          titleEl.innerHTML = `<span class="${item.cls}" style="padding:0.2rem 0.6rem; border-radius:4px;">${item.role}</span> : "${item.word}"`;
          descEl.textContent = item.desc;
        }
      });
      row.appendChild(card);
    });
  }

  // --- LAB 3: REAL-LIFE SCENARIOS LAB ---
  const SCENARIOS = {
    email: {
      badge: "Context: Professional Workplace Email",
      sender: "To: Senior Vice President",
      wrong: '"Please revert back to me with the informations by tomorrow."',
      correct: '"Please reply to me with the information by tomorrow."',
      reason: "'Revert back' is redundant (revert already means return), and 'information' is an uncountable mass noun with no plural -s."
    },
    academic: {
      badge: "Context: Peer-Reviewed Research Paper",
      sender: "Section: Methodology & Findings",
      wrong: '"The data proves that neither temperature nor pressure were significant."',
      correct: '"The data prove that neither temperature nor pressure was significant."',
      reason: "In formal academic science, 'data' is historically plural (datum -> data), and with 'neither...nor' connecting two singular nouns, the verb must be singular 'was'."
    },
    application: {
      badge: "Context: Cover Letter for Software Engineer",
      sender: "Section: Professional Profile",
      wrong: '"I am proficient in Python and also having five years experience."',
      correct: '"I am proficient in Python and also have five years of experience."',
      reason: "Clauses linked by coordinating conjunctions must maintain parallel finite verb structures ('am proficient' and 'have')."
    },
    formal: {
      badge: "Context: Legal & Formal Dispute",
      sender: "To: Compliance Board",
      wrong: '"We demand that the vendor pays the penalty immediately."',
      correct: '"We demand that the vendor pay the penalty immediately."',
      reason: "The mandative subjunctive following 'demand that' requires the uninflected base verb 'pay' (not 'pays')."
    },
    news: {
      badge: "Context: Journalistic Press Release",
      sender: "Headline & Lead",
      wrong: '"Between the three candidates, Ali is the more experienced."',
      correct: '"Among the three candidates, Ali is the most experienced."',
      reason: "Use 'among' and superlative 'most' when comparing three or more entities. 'Between' and 'more' are strictly for two."
    },
    chat: {
      badge: "Context: Casual Study Group Messenger",
      sender: "Message to Classmate",
      wrong: '"I could of helped you if you would of told me."',
      correct: '"I could have helped you if you had told me."',
      reason: "'Could of' is a phonetic error for 'could have', and the 3rd conditional if-clause requires past perfect ('had told')."
    }
  };

  function initScenariosLab() {
    const tabs = document.querySelectorAll('.btn-scenario-tab');
    const badgeEl = document.getElementById('scenarioBadge');
    const senderEl = document.getElementById('scenarioSender');
    const wrongEl = document.getElementById('scenarioFlawedText');
    const correctEl = document.getElementById('scenarioCorrectText');
    const reasonEl = document.getElementById('scenarioReasonText');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.dataset.scenario;
        const data = SCENARIOS[key];
        if (data && badgeEl && wrongEl && correctEl && reasonEl) {
          badgeEl.textContent = data.badge;
          if (senderEl) senderEl.textContent = data.sender;
          wrongEl.innerHTML = `<span class="sentence-indicator">❌</span><span>${data.wrong}</span>`;
          correctEl.innerHTML = `<span class="sentence-indicator">✓</span><span>${data.correct}</span>`;
          reasonEl.innerHTML = `<strong>Reason:</strong> ${data.reason}`;
        }
      });
    });
  }

  // --- LAB 4: DRAG & DROP / MOBILE CLASSIFIER ---
  function initDragDropLab() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropTargets = document.querySelectorAll('.drop-target');
    const resetBtn = document.getElementById('btnResetDragDrop');
    const mobileDialog = document.getElementById('mobileClassifyDialog');
    const mobileSentence = document.getElementById('mobileClassifySentence');
    const mobileOptions = document.getElementById('mobileClassifyOptions');

    let draggedItem = null;
    let selectedMobileItem = null;

    dragItems.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        draggedItem = item;
        e.dataTransfer.setData('text/plain', item.dataset.type);
        item.style.opacity = '0.5';
      });

      item.addEventListener('dragend', () => {
        item.style.opacity = '1';
        draggedItem = null;
      });

      // Mobile Touch / Click Alternative
      item.addEventListener('click', () => {
        selectedMobileItem = item;
        if (mobileDialog && mobileSentence) {
          mobileSentence.textContent = item.querySelector('span').textContent;
          mobileDialog.classList.add('show');
        }
      });
    });

    dropTargets.forEach(target => {
      target.addEventListener('dragover', (e) => {
        e.preventDefault();
        target.classList.add('drag-over');
      });

      target.addEventListener('dragleave', () => {
        target.classList.remove('drag-over');
      });

      target.addEventListener('drop', (e) => {
        e.preventDefault();
        target.classList.remove('drag-over');
        if (!draggedItem) return;

        const expected = target.dataset.accept;
        const actual = draggedItem.dataset.type;

        if (expected === actual) {
          handleSuccessfulMatch(draggedItem, target);
        } else {
          alert(`❌ Incorrect Category!\n\nThis error belongs under "${actual.toUpperCase()}", not "${expected.toUpperCase()}".`);
        }
      });
    });

    if (mobileOptions) {
      mobileOptions.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          if (!selectedMobileItem) return;
          const chosenCat = btn.dataset.cat;
          const actual = selectedMobileItem.dataset.type;
          const target = document.querySelector(`.drop-target[data-accept="${actual}"]`);

          if (chosenCat === actual && target) {
            handleSuccessfulMatch(selectedMobileItem, target);
            if (mobileDialog) mobileDialog.classList.remove('show');
          } else {
            alert(`❌ Incorrect! This sentence belongs under "${actual.toUpperCase()}".`);
            if (mobileDialog) mobileDialog.classList.remove('show');
          }
          selectedMobileItem = null;
        });
      });
    }

    if (mobileDialog) {
      mobileDialog.addEventListener('click', (e) => {
        if (e.target === mobileDialog) mobileDialog.classList.remove('show');
      });
    }

    function handleSuccessfulMatch(itemElement, targetElement) {
      itemElement.classList.add('matched');
      const container = targetElement.querySelector('.dropped-items-container');
      const countEl = targetElement.querySelector('.drop-target-count');

      const pill = document.createElement('div');
      pill.className = 'dropped-pill';
      pill.textContent = '✓ ' + itemElement.querySelector('span').textContent.slice(0, 30) + '...';
      if (container) container.appendChild(pill);

      const totalDropped = container ? container.children.length : 1;
      if (countEl) countEl.textContent = `${totalDropped} matched`;

      state.errorsIdentified++;
      saveState();
      showToast('Correctly classified!', 'fa-circle-check');
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        dragItems.forEach(i => i.classList.remove('matched'));
        dropTargets.forEach(t => {
          const c = t.querySelector('.dropped-items-container');
          if (c) c.innerHTML = '';
          const cnt = t.querySelector('.drop-target-count');
          if (cnt) cnt.textContent = '0 items';
        });
        showToast('Classification board reset');
      });
    }
  }

  // --- 3D FLIP FLASHCARDS ---
  const FLASHCARDS = [
    { cat: "Subject-Verb Agreement", title: "Intervening Prepositional Phrases", wrong: "The quality of these products are exceptional.", rule: "The subject is 'quality' (singular). Intervening plural nouns like 'products' do not change verb number.", correct: "The quality of these products is exceptional." },
    { cat: "Indefinite Pronouns", title: "Singular Indefinites", wrong: "Everyone have finished their assigned tasks.", rule: "Pronouns like 'everyone', 'each', and 'neither' are grammatically singular.", correct: "Everyone has finished his or her assigned task." },
    { cat: "Tenses & Auxiliaries", title: "Auxiliary + Past Participle", wrong: "She has went to London twice.", rule: "Auxiliary 'has' requires the 3rd verb form (participle 'gone'), never past simple 'went'.", correct: "She has gone to London twice." },
    { cat: "Articles", title: "Phonetic Vowel Sounds", wrong: "He is an university professor.", rule: "'University' begins with a consonant glide /j/, requiring article 'a'.", correct: "He is a university professor." },
    { cat: "Pronoun Case", title: "Compound Subjects", wrong: "Me and him went to the conference.", rule: "Subject position requires subjective case pronouns: 'He and I'.", correct: "He and I went to the conference." },
    { cat: "Dependent Prepositions", title: "Adjective Collocations", wrong: "She is very good in mathematics.", rule: "Skill and competence use 'good at', not 'good in'.", correct: "She is very good at mathematics." },
    { cat: "Parallelism", title: "Coordinated Series", wrong: "He loves hiking, camping and to swim.", rule: "All items joined by 'and' must maintain identical grammatical form (gerunds).", correct: "He loves hiking, camping and swimming." },
    { cat: "Dangling Modifiers", title: "Introductory Participles", wrong: "Walking through the forest, the trees were tall.", rule: "The trees were not walking. The actor performing the participle must follow the comma.", correct: "Walking through the forest, I noticed the tall trees." },
    { cat: "Gerunds vs Infinitives", title: "Verb Complementation", wrong: "I avoid to eat junk food late at night.", rule: "Verb 'avoid' strictly takes a gerund (-ing) object complement.", correct: "I avoid eating junk food late at night." },
    { cat: "Conditionals", title: "First Conditional If-Clause", wrong: "If you will work hard, you will succeed.", rule: "Condition clauses in the 1st conditional use simple present 'work', not 'will work'.", correct: "If you work hard, you will succeed." },
    { cat: "Passive Voice", title: "Past Participle Alignment", wrong: "The contract was sign by both parties.", rule: "Passive voice strictly uses 'be + past participle' ('was signed').", correct: "The contract was signed by both parties." },
    { cat: "Reported Speech", title: "Said vs. Told", wrong: "She told that the class was cancelled.", rule: "'Told' requires an indirect personal object (e.g. 'told me'). Use 'said that'.", correct: "She said that the class was cancelled." },
    { cat: "Relative Pronouns", title: "Who vs. Whom", wrong: "The person which called you is outside.", rule: "Use 'who' for persons; 'which' is restricted to things and animals.", correct: "The person who called you is outside." },
    { cat: "Comparisons", title: "Double Comparatives", wrong: "He is more smarter than his brother.", rule: "'Smarter' is already comparative. Never pair 'more' with '-er'.", correct: "He is smarter than his brother." },
    { cat: "Conjunctions", title: "Double Subordination", wrong: "Although it was cold, but we went out.", rule: "Do not pair subordinating 'Although' with coordinating 'but'.", correct: "Although it was cold, we went out." },
    { cat: "Inversion", title: "Negative Adverb Fronting", wrong: "Never I have heard such an inspiring speech.", rule: "Fronting 'Never' requires auxiliary inversion: 'have I heard'.", correct: "Never have I heard such an inspiring speech." },
    { cat: "Redundancy", title: "Pleonastic Repetition", wrong: "Please repeat the instructions again.", rule: "'Repeat' already means to state again; 'again' is redundant.", correct: "Please repeat the instructions." }
  ];

  let currentCardIndex = 0;

  function renderFlashcard() {
    const wrapper = document.getElementById('flashcardWrapper');
    const badge = document.getElementById('cardCatBadge');
    const frontTitle = document.getElementById('cardFrontTitle');
    const frontEx = document.getElementById('cardFrontExample');
    const backTitle = document.getElementById('cardBackTitle');
    const backRule = document.getElementById('cardBackRule');
    const backCorrect = document.getElementById('cardBackCorrect');
    const counter = document.getElementById('cardProgressNumber');

    if (!wrapper) return;
    wrapper.classList.remove('flipped');

    const card = FLASHCARDS[currentCardIndex];
    if (badge) badge.textContent = card.cat;
    if (frontTitle) frontTitle.textContent = card.title;
    if (frontEx) frontEx.innerHTML = `❌ <em>"${card.wrong}"</em>`;
    if (backTitle) backTitle.textContent = card.title + " (Rule & Correction)";
    if (backRule) backRule.textContent = card.rule;
    if (backCorrect) backCorrect.innerHTML = `<span class="sentence-indicator">✓</span><span>"${card.correct}"</span>`;
    if (counter) counter.textContent = `${currentCardIndex + 1} / ${FLASHCARDS.length}`;
  }

  function initFlashcards() {
    renderFlashcard();
    const wrapper = document.getElementById('flashcardWrapper');
    const btnPrev = document.getElementById('btnPrevCard');
    const btnNext = document.getElementById('btnNextCard');
    const btnShuffle = document.getElementById('btnShuffleCards');
    const btnKnown = document.getElementById('btnKnownCard');

    if (wrapper) {
      wrapper.addEventListener('click', () => {
        wrapper.classList.toggle('flipped');
      });
      wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          wrapper.classList.toggle('flipped');
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + FLASHCARDS.length) % FLASHCARDS.length;
        renderFlashcard();
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % FLASHCARDS.length;
        renderFlashcard();
      });
    }

    if (btnShuffle) {
      btnShuffle.addEventListener('click', () => {
        for (let i = FLASHCARDS.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [FLASHCARDS[i], FLASHCARDS[j]] = [FLASHCARDS[j], FLASHCARDS[i]];
        }
        currentCardIndex = 0;
        renderFlashcard();
        showToast('Flashcard deck shuffled!', 'fa-shuffle');
      });
    }

    if (btnKnown) {
      btnKnown.addEventListener('click', () => {
        if (!state.knownCards.includes(currentCardIndex)) {
          state.knownCards.push(currentCardIndex);
          saveState();
        }
        showToast('Marked as Known! (+1 recall score)', 'fa-check');
        currentCardIndex = (currentCardIndex + 1) % FLASHCARDS.length;
        renderFlashcard();
      });
    }
  }

  // --- COMPLETE 18-QUESTION QUIZ ENGINE ---
  const QUIZ_QUESTIONS = [
    {
      cat: "Subject-Verb Agreement",
      q: "Identify the error in: 'A variety of delicious foods was served at the banquet.'",
      options: [
        { text: "No error; 'variety' is singular.", correct: false },
        { text: "'was served' should be 'were served' because 'A variety of + plural noun' takes a plural verb.", correct: true },
        { text: "'delicious' should be 'deliciously'.", correct: false },
        { text: "'at the banquet' should be 'in the banquet'.", correct: false }
      ],
      exp: "'A variety of' functions as a plural quantifier modifying 'foods', requiring plural 'were served'. (Contrast with 'The variety of...' which takes a singular verb)."
    },
    {
      cat: "Tense & Participle",
      q: "Choose the correct sentence:",
      options: [
        { text: "By the time we arrived, the train already left.", correct: false },
        { text: "By the time we arrived, the train has already left.", correct: false },
        { text: "By the time we arrived, the train had already left.", correct: true },
        { text: "By the time we arrived, the train had already leave.", correct: false }
      ],
      exp: "When an action is completed before another past event ('arrived'), standard English uses the past perfect tense ('had left')."
    },
    {
      cat: "Article Usage",
      q: "Which option contains the correct article use?",
      options: [
        { text: "She is an European citizen with a MBA degree.", correct: false },
        { text: "She is a European citizen with an MBA degree.", correct: true },
        { text: "She is an European citizen with an MBA degree.", correct: false },
        { text: "She is a European citizen with a MBA degree.", correct: false }
      ],
      exp: "'European' starts with consonant /j/ sound (takes 'a'); 'MBA' starts with vowel /ɛm/ sound (takes 'an')."
    },
    {
      cat: "Pronoun Agreement",
      q: "Select the sentence with impeccable pronoun agreement:",
      options: [
        { text: "Neither of the girls brought their instruments.", correct: false },
        { text: "Neither of the girls brought her instrument.", correct: true },
        { text: "Neither of the girls brought them instruments.", correct: false },
        { text: "Neither of the girls have brought her instruments.", correct: false }
      ],
      exp: "'Neither' is distributive singular, governing singular pronoun 'her' and singular verb."
    },
    {
      cat: "Parallel Structure",
      q: "Identify the parallel sentence:",
      options: [
        { text: "The executive was praised for her efficiency, honesty, and because she was punctual.", correct: false },
        { text: "The executive was praised for her efficiency, honesty, and punctuality.", correct: true },
        { text: "The executive was praised for being efficient, honesty, and punctual.", correct: false },
        { text: "The executive was praised for her efficiency, her honesty, and being punctual.", correct: false }
      ],
      exp: "All elements in the series must be parallel nouns: 'efficiency', 'honesty', and 'punctuality'."
    },
    {
      cat: "Dangling Modifier",
      q: "Which sentence avoids a dangling or misplaced modifier?",
      options: [
        { text: "Covered in melted cheese, the waiter brought us the pizza.", correct: false },
        { text: "The waiter brought us the pizza covered in melted cheese.", correct: true },
        { text: "While eating lunch, the phone rang loudly.", correct: false },
        { text: "To master English, practice is needed by students.", correct: false }
      ],
      exp: "The phrase 'covered in melted cheese' correctly modifies the immediate preceding noun 'pizza', not the waiter."
    },
    {
      cat: "Conditionals",
      q: "Find the grammatically correct 3rd conditional:",
      options: [
        { text: "If I would have known, I would have helped you.", correct: false },
        { text: "If I had known, I would have helped you.", correct: true },
        { text: "If I knew, I would have helped you.", correct: false },
        { text: "If I had know, I would have helped you.", correct: false }
      ],
      exp: "Third conditional formula: If + had + past participle (V3), would have + past participle (V3)."
    },
    {
      cat: "Passive Voice",
      q: "Correct the sentence: 'The museum was construct in the nineteenth century.'",
      options: [
        { text: "The museum was constructing in the nineteenth century.", correct: false },
        { text: "The museum was constructed in the nineteenth century.", correct: true },
        { text: "The museum has construct in the nineteenth century.", correct: false },
        { text: "The museum constructed in the nineteenth century.", correct: false }
      ],
      exp: "Passive requires past participle 'constructed' after auxiliary 'was'."
    },
    {
      cat: "Reported Speech",
      q: "Select the sentence with accurate reported speech syntax:",
      options: [
        { text: "He asked me where was the meeting taking place.", correct: false },
        { text: "He asked me where the meeting was taking place.", correct: true },
        { text: "He told to me where the meeting was taking place.", correct: false },
        { text: "He said me where the meeting was taking place.", correct: false }
      ],
      exp: "Embedded clauses in reported questions follow statement word order (Subject + Verb: 'the meeting was taking place')."
    },
    {
      cat: "Negative Inversion",
      q: "Choose the proper inversion structure:",
      options: [
        { text: "Scarcely had she entered the room when the alarm sounded.", correct: true },
        { text: "Scarcely she had entered the room than the alarm sounded.", correct: false },
        { text: "Scarcely did she entered the room when the alarm sounded.", correct: false },
        { text: "Scarcely had she entered the room then the alarm sounded.", correct: false }
      ],
      exp: "'Scarcely' pairs with 'when' and triggers inverted auxiliary order: 'had she entered'."
    },
    {
      cat: "Mandative Subjunctive",
      q: "Which sentence accurately uses the subjunctive mood?",
      options: [
        { text: "The doctor insisted that he stops smoking immediately.", correct: false },
        { text: "The doctor insisted that he stop smoking immediately.", correct: true },
        { text: "The doctor insisted that he should stopped smoking immediately.", correct: false },
        { text: "The doctor insisted that he is to stop smoking immediately.", correct: false }
      ],
      exp: "The mandative subjunctive with 'insist that' requires the uninflected base verb 'stop'."
    },
    {
      cat: "Redundancy / Pleonasm",
      q: "Which sentence is free of redundant phrasing?",
      options: [
        { text: "The two twins look completely identical.", correct: false },
        { text: "The twins look identical.", correct: true },
        { text: "They will revert back in the future to come.", correct: false },
        { text: "Let us collaborate together on this project.", correct: false }
      ],
      exp: "'Twins' already means two; 'identical' already implies completely identical. 'The twins look identical' is concise and precise."
    },
    {
      cat: "Preposition Collocation",
      q: "Choose the correct preposition:",
      options: [
        { text: "This methodology is different than the traditional approach.", correct: false },
        { text: "This methodology is different from the traditional approach.", correct: true },
        { text: "This methodology is different of the traditional approach.", correct: false },
        { text: "This methodology is different with the traditional approach.", correct: false }
      ],
      exp: "In standard English grammar, the adjective 'different' collocates with 'from'."
    },
    {
      cat: "Correlative Conjunctions",
      q: "Select the sentence with proper correlative balance:",
      options: [
        { text: "He not only lost his ticket but also his passport.", correct: false },
        { text: "He lost not only his ticket but also his passport.", correct: true },
        { text: "Not only he lost his ticket but also his passport.", correct: false },
        { text: "He lost not only his ticket but his passport too as well.", correct: false }
      ],
      exp: "'Not only' and 'but also' must precede parallel elements: [his ticket] and [his passport]."
    },
    {
      cat: "Gerund & Infinitive",
      q: "Which sentence is grammatically standard?",
      options: [
        { text: "She admitted to take the confidential document.", correct: false },
        { text: "She admitted taking the confidential document.", correct: true },
        { text: "She agreed taking the confidential document.", correct: false },
        { text: "She refused taking the confidential document.", correct: false }
      ],
      exp: "'Admit' takes a gerund complement ('taking'); 'agree' and 'refuse' take infinitives."
    },
    {
      cat: "Determiners & Quantifiers",
      q: "Identify the correct use of 'fewer' vs 'less':",
      options: [
        { text: "We received less complaints and fewer feedback today.", correct: false },
        { text: "We received fewer complaints and less feedback today.", correct: true },
        { text: "We received fewer complaints and fewer feedback today.", correct: false },
        { text: "We received less complaints and less feedback today.", correct: false }
      ],
      exp: "'Complaints' is countable plural (uses 'fewer'); 'feedback' is uncountable (uses 'less')."
    },
    {
      cat: "Relative Clauses",
      q: "Choose the correct relative pronoun:",
      options: [
        { text: "The scholar who you met at the symposium has published a book.", correct: false },
        { text: "The scholar whom you met at the symposium has published a book.", correct: true },
        { text: "The scholar which you met at the symposium has published a book.", correct: false },
        { text: "The scholar whose you met at the symposium has published a book.", correct: false }
      ],
      exp: "'You' is the subject of 'met'; the scholar is the object of the verb 'met', requiring objective 'whom'."
    },
    {
      cat: "Word Form Precision",
      q: "Select the sentence with accurate word forms:",
      options: [
        { text: "The patient reacted adverse to the treatment.", correct: false },
        { text: "The patient reacted adversely to the treatment.", correct: true },
        { text: "The patient had an adversely reaction to the treatment.", correct: false },
        { text: "The patient reacted in an adverse mannerly way.", correct: false }
      ],
      exp: "The action verb 'reacted' must be modified by the adverb 'adversely'."
    }
  ];

  let currentQuizIndex = 0;
  let quizScore = 0;
  let quizAnswered = false;

  function renderQuizQuestion() {
    const counterEl = document.getElementById('quizQuestionCounter');
    const scoreEl = document.getElementById('quizScoreTracker');
    const progFill = document.getElementById('quizProgressFill');
    const catEl = document.getElementById('quizQuestionCategory');
    const textEl = document.getElementById('quizQuestionText');
    const optionsContainer = document.getElementById('quizOptionsContainer');
    const expCard = document.getElementById('quizExplanationCard');
    const expText = document.getElementById('quizExpText');
    const btnNext = document.getElementById('btnQuizNext');

    if (!optionsContainer) return;

    quizAnswered = false;
    if (expCard) expCard.style.display = 'none';
    if (btnNext) btnNext.style.display = 'none';

    const qData = QUIZ_QUESTIONS[currentQuizIndex];
    if (counterEl) counterEl.textContent = `Question ${currentQuizIndex + 1} of ${QUIZ_QUESTIONS.length}`;
    if (scoreEl) scoreEl.textContent = `Score: ${quizScore}`;
    if (progFill) progFill.style.width = `${((currentQuizIndex) / QUIZ_QUESTIONS.length) * 100}%`;
    if (catEl) catEl.textContent = qData.cat;
    if (textEl) textEl.textContent = qData.q;

    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    // Randomize option order for this display without altering data
    const shuffledOptions = qData.options.map((opt, i) => ({ opt, originalIndex: i }))
      .sort(() => Math.random() - 0.5);

    shuffledOptions.forEach((item, idx) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="quiz-option-letter">${letters[idx]}</span>
        <span>${item.opt.text}</span>
      `;
      btn.addEventListener('click', () => {
        if (quizAnswered) return;
        quizAnswered = true;
        state.questionsAnswered++;

        if (item.opt.correct) {
          btn.classList.add('selected-correct');
          quizScore++;
          state.correctAnswers++;
          state.errorsIdentified++;
          showToast('Correct answer!', 'fa-circle-check');
        } else {
          btn.classList.add('selected-wrong');
          // Highlight correct one
          optionsContainer.querySelectorAll('.quiz-option-btn').forEach((b, bIdx) => {
            if (shuffledOptions[bIdx].opt.correct) {
              b.classList.add('selected-correct');
            }
          });
          showToast('Incorrect', 'fa-xmark');
        }

        if (expCard && expText) {
          expText.textContent = qData.exp;
          expCard.style.display = 'block';
        }
        if (scoreEl) scoreEl.textContent = `Score: ${quizScore}`;
        if (btnNext) {
          btnNext.style.display = 'inline-flex';
          btnNext.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        saveState();
      });
      optionsContainer.appendChild(btn);
    });
  }

  function initQuizEngine() {
    renderQuizQuestion();
    const btnNext = document.getElementById('btnQuizNext');
    const btnBmk = document.getElementById('btnQuizBookmark');

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
          currentQuizIndex++;
          renderQuizQuestion();
        } else {
          alert(`🎉 Quiz Completed!\n\nYour final score is ${quizScore} out of ${QUIZ_QUESTIONS.length} (${Math.round((quizScore / QUIZ_QUESTIONS.length) * 100)}%).`);
          currentQuizIndex = 0;
          quizScore = 0;
          renderQuizQuestion();
        }
      });
    }

    if (btnBmk) {
      btnBmk.addEventListener('click', () => {
        const q = QUIZ_QUESTIONS[currentQuizIndex];
        const id = 'quiz_' + currentQuizIndex;
        if (!state.bookmarks.some(b => b.id === id)) {
          state.bookmarks.push({ id, title: q.cat, snippet: q.q, category: 'Quiz Question' });
          saveState();
          showToast('Question bookmarked!', 'fa-bookmark');
        } else {
          showToast('Question already bookmarked');
        }
      });
    }
  }

  // --- ERROR DETECTION MASTERY CHALLENGE (20 QUESTIONS) ---
  const MASTERY_CHALLENGES = [
    { text: '"Neither the manager nor any of his assistants was informed of the sudden schedule change."', hasError: true, exp: "Under the proximity rule with 'neither...nor', the verb agrees with the plural noun 'assistants', requiring 'were informed'." },
    { text: '"The number of students enrolled in the honors program has increased significantly."', hasError: false, exp: "No error. 'The number of' is strictly singular and takes singular 'has increased'." },
    { text: '"Having examined the financial records, several critical discrepancies were noted by the auditor."', hasError: true, exp: "Dangling modifier. The discrepancies did not examine the records; the auditor did. ('Having examined the records, the auditor noted...')" },
    { text: '"Hardly had the keynote speaker stepped onto the stage when the power failed."', hasError: false, exp: "No error. 'Hardly' correctly pairs with 'when' and triggers inverted auxiliary order 'had the speaker stepped'." },
    { text: '"The Board of Directors insisted that the CEO resigns from his post immediately."', hasError: true, exp: "Subjunctive mood. Verbs of demand require bare base verb 'resign', not inflected 'resigns'." },
    { text: '"She is one of those dedicated researchers who always double-check their statistical data."', hasError: false, exp: "No error. The relative clause modifies plural 'researchers', so plural verb 'double-check' and pronoun 'their' are standard." },
    { text: '"The reason for the delay is because the supplier failed to deliver materials."', hasError: true, exp: "Redundant pleonasm. Use 'The reason is that...', never 'is because'." },
    { text: '"Between you and me, the new corporate policy seems rather stringent."', hasError: false, exp: "No error. Objective pronoun 'me' is required after preposition 'between'." },
    { text: '"Every player, as well as the head coaches, were present at the awards gala."', hasError: true, exp: "'As well as...' is a parenthetical phrase and does not alter the singular subject 'Every player' (requires 'was present')." },
    { text: '"The committee published its annual findings on renewable energy."', hasError: false, exp: "No error. Collective noun 'committee' acting as a unified body takes singular 'its'." },
    { text: '"He is more taller than any other athlete in his division."', hasError: true, exp: "Double comparative error. 'Taller' cannot be paired with 'more'." },
    { text: '"If he had taken the advice, he would be in a much stronger position today."', hasError: false, exp: "No error. Standard mixed conditional (past condition 'had taken' -> present outcome 'would be today')." },
    { text: '"All the furnitures and machineries in the warehouse were insured."', hasError: true, exp: "'Furniture' and 'machinery' are mass non-count nouns with no plural -s." },
    { text: '"Only after reviewing all submissions did the panel announce the winner."', hasError: false, exp: "No error. Restrictive 'Only after...' correctly triggers inversion 'did the panel announce'." },
    { text: '"She enjoys to read historical fiction during her leisure hours."', hasError: true, exp: "'Enjoy' requires a gerund complement ('reading'), not an infinitive." },
    { text: '"Whom did the committee select as the next department chair?"', hasError: false, exp: "No error. 'Whom' correctly acts as the direct object of the verb 'select'." },
    { text: '"The results of the preliminary investigation was inconclusive."', hasError: true, exp: "The plural subject 'results' requires plural verb 'were inconclusive'." },
    { text: '"The soup tastes delicious and smells fragrant."', hasError: false, exp: "No error. Linking verbs 'taste' and 'smell' properly take predicate adjectives." },
    { text: '"Please return back the reference manuals to the main archive."', hasError: true, exp: "'Return back' is redundant. Use 'return'." },
    { text: '"He worked diligently, yet he failed to achieve the required benchmarks."', hasError: false, exp: "No error. Coordinated compound sentence with appropriate adverbial modifier." }
  ];

  let currentMasteryIndex = 0;
  let masteryScore = 0;

  function renderMasteryChallenge() {
    const counterEl = document.getElementById('masteryCounter');
    const scoreLabel = document.getElementById('masteryScoreLabel');
    const textEl = document.getElementById('masterySentenceText');
    const decisionGroup = document.getElementById('masteryDecisionGroup');
    const feedbackPanel = document.getElementById('masteryFeedbackPanel');

    if (!textEl) return;
    if (feedbackPanel) feedbackPanel.classList.remove('show');
    if (decisionGroup) decisionGroup.style.display = 'flex';

    const item = MASTERY_CHALLENGES[currentMasteryIndex];
    if (counterEl) counterEl.textContent = `Challenge ${currentMasteryIndex + 1} of ${MASTERY_CHALLENGES.length}`;
    if (scoreLabel) scoreLabel.textContent = `Mastery Score: ${masteryScore} / ${MASTERY_CHALLENGES.length}`;
    textEl.textContent = item.text;
  }

  function initMasteryChallenge() {
    renderMasteryChallenge();
    const btnHasError = document.getElementById('btnMasteryHasError');
    const btnNoError = document.getElementById('btnMasteryNoError');
    const btnNext = document.getElementById('btnMasteryNext');
    const feedbackPanel = document.getElementById('masteryFeedbackPanel');
    const resultHeading = document.getElementById('masteryResultHeading');
    const resultDetail = document.getElementById('masteryResultDetail');

    function handleMasteryDecision(userChoseError) {
      const item = MASTERY_CHALLENGES[currentMasteryIndex];
      const isCorrect = userChoseError === item.hasError;
      state.masteryAnswered++;

      if (isCorrect) {
        masteryScore++;
        state.masteryScore = masteryScore;
        state.errorsIdentified++;
        if (resultHeading) {
          resultHeading.textContent = "✓ Brilliant Analysis!";
          resultHeading.style.color = "var(--correct-green)";
        }
        showToast('Mastery Challenge Correct!', 'fa-trophy');
      } else {
        if (resultHeading) {
          resultHeading.textContent = "❌ Analysis Mismatch";
          resultHeading.style.color = "var(--error-red)";
        }
      }

      if (resultDetail) {
        resultDetail.textContent = item.exp;
      }

      const decisionGroup = document.getElementById('masteryDecisionGroup');
      if (decisionGroup) decisionGroup.style.display = 'none';
      if (feedbackPanel) feedbackPanel.classList.add('show');
      saveState();
    }

    if (btnHasError) btnHasError.addEventListener('click', () => handleMasteryDecision(true));
    if (btnNoError) btnNoError.addEventListener('click', () => handleMasteryDecision(false));

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentMasteryIndex < MASTERY_CHALLENGES.length - 1) {
          currentMasteryIndex++;
          renderMasteryChallenge();
        } else {
          alert(`🏆 Mastery Challenge Finished!\n\nYour final mastery score is ${masteryScore} out of ${MASTERY_CHALLENGES.length} (${Math.round((masteryScore / MASTERY_CHALLENGES.length) * 100)}%).`);
          currentMasteryIndex = 0;
          masteryScore = 0;
          state.masteryScore = 0;
          renderMasteryChallenge();
        }
      });
    }
  }

  // --- REVISION CHECKLIST MATRIX ---
  function initRevisionChecklist() {
    const items = document.querySelectorAll('.checklist-item-card');
    items.forEach(card => {
      const checkId = card.dataset.check;
      if (state.checkedRevision.includes(checkId)) {
        card.classList.add('checked');
      }
      card.addEventListener('click', () => {
        card.classList.toggle('checked');
        if (card.classList.contains('checked')) {
          if (!state.checkedRevision.includes(checkId)) state.checkedRevision.push(checkId);
        } else {
          state.checkedRevision = state.checkedRevision.filter(id => id !== checkId);
        }
        saveState();
      });
    });
  }

  // --- RESET STATS ---
  function initResetButton() {
    const btnReset = document.getElementById('btnResetProgress');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all your learning statistics and bookmarks?')) {
          state = {
            errorsIdentified: 0,
            questionsAnswered: 0,
            correctAnswers: 0,
            masteryScore: 0,
            masteryAnswered: 0,
            knownCards: [],
            bookmarks: [],
            checkedRevision: [],
            completedModules: []
          };
          saveState();
          document.querySelectorAll('.checklist-item-card').forEach(c => c.classList.remove('checked'));
          document.querySelectorAll('.btn-bookmark-item').forEach(b => {
            b.classList.remove('bookmarked');
            b.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
          });
          showToast('Progress and statistics reset.');
        }
      });
    }
  }

  // --- INITIALIZE ALL SUBSYSTEMS ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    updateDashboardUI();
    initErrorOfTheDay();
    initMethodologyTabs();
    initSearchAndFilter();
    initBookmarks();
    initModuleMiniPractice();
    initHighlighterLab();
    initSyntaxDissector();
    initScenariosLab();
    initDragDropLab();
    initFlashcards();
    initQuizEngine();
    initMasteryChallenge();
    initRevisionChecklist();
    initResetButton();

    // Scroll to progress button in header
    const btnScroll = document.getElementById('btnScrollProgress');
    if (btnScroll) {
      btnScroll.addEventListener('click', () => {
        const sec = document.getElementById('progressSection');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      });
    }
  });

})();
