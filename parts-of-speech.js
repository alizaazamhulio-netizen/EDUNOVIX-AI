/**
 * PARTS OF SPEECH — MASTER JAVASCRIPT APPLICATION ENGINE
 * Pure Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. APPLICATION STATE & PERSISTENCE (localStorage)
     ========================================================================== */
  const STORAGE_KEYS = {
    TOPICS_LEARNED: 'pos_topics_learned_v1',
    BOOKMARKS: 'pos_bookmarks_v1',
    QUESTIONS_ANSWERED: 'pos_q_answered_v1',
    QUESTIONS_CORRECT: 'pos_q_correct_v1',
    FLASHCARDS_KNOWN: 'pos_fc_known_v1',
    ARENA_SCORE: 'pos_arena_score_v1'
  };

  const state = {
    topicsLearned: JSON.parse(localStorage.getItem(STORAGE_KEYS.TOPICS_LEARNED) || '[]'),
    bookmarks: JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || '[]'),
    questionsAnswered: parseInt(localStorage.getItem(STORAGE_KEYS.QUESTIONS_ANSWERED) || '0', 10),
    questionsCorrect: parseInt(localStorage.getItem(STORAGE_KEYS.QUESTIONS_CORRECT) || '0', 10),
    flashcardsKnown: JSON.parse(localStorage.getItem(STORAGE_KEYS.FLASHCARDS_KNOWN) || '[]'),
    arenaScore: parseInt(localStorage.getItem(STORAGE_KEYS.ARENA_SCORE) || '0', 10)
  };

  function saveState() {
    localStorage.setItem(STORAGE_KEYS.TOPICS_LEARNED, JSON.stringify(state.topicsLearned));
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(state.bookmarks));
    localStorage.setItem(STORAGE_KEYS.QUESTIONS_ANSWERED, state.questionsAnswered.toString());
    localStorage.setItem(STORAGE_KEYS.QUESTIONS_CORRECT, state.questionsCorrect.toString());
    localStorage.setItem(STORAGE_KEYS.FLASHCARDS_KNOWN, JSON.stringify(state.flashcardsKnown));
    localStorage.setItem(STORAGE_KEYS.ARENA_SCORE, state.arenaScore.toString());
    updateDashboardUI();
  }

  function showToast(message, icon = 'fa-circle-check') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  /* ==========================================================================
     2. DASHBOARD & STATS UPDATE
     ========================================================================== */
  function updateDashboardUI() {
    const topicsCount = state.topicsLearned.length;
    const totalTopics = 8;
    const statTopics = document.getElementById('statTopicsLearned');
    const barTopics = document.getElementById('barTopics');
    if (statTopics) statTopics.textContent = topicsCount;
    if (barTopics) barTopics.style.width = `${(topicsCount / totalTopics) * 100}%`;

    const statQ = document.getElementById('statQuestionsAnswered');
    const statQCorrect = document.getElementById('statQuestionsCorrectText');
    const barQ = document.getElementById('barQuestions');
    if (statQ) statQ.textContent = state.questionsAnswered;
    if (statQCorrect) statQCorrect.textContent = `(${state.questionsCorrect} Correct)`;
    if (barQ) {
      const qPercent = Math.min(100, (state.questionsAnswered / 20) * 100);
      barQ.style.width = `${qPercent}%`;
    }

    const statAcc = document.getElementById('statAccuracy');
    const statAccLbl = document.getElementById('statAccuracyLabel');
    const barAcc = document.getElementById('barAccuracy');
    let accuracy = 0;
    if (state.questionsAnswered > 0) {
      accuracy = Math.round((state.questionsCorrect / state.questionsAnswered) * 100);
      if (statAcc) statAcc.textContent = `${accuracy}%`;
      if (statAccLbl) statAccLbl.textContent = accuracy >= 80 ? 'Mastery Pace' : 'Building Skills';
    } else {
      if (statAcc) statAcc.textContent = '0%';
      if (statAccLbl) statAccLbl.textContent = 'No quizzes yet';
    }
    if (barAcc) barAcc.style.width = `${accuracy}%`;

    const statMastery = document.getElementById('statMasteryScore');
    const statStatus = document.getElementById('statStatusText');
    const barMastery = document.getElementById('barMastery');
    
    // Weighted progress: 50% topics learned + 50% quiz accuracy/volume
    const topicScore = (topicsCount / totalTopics) * 50;
    const quizScore = state.questionsAnswered > 0 ? (accuracy / 100) * 50 : 0;
    const overallProgress = Math.round(topicScore + quizScore);

    if (statMastery) statMastery.textContent = `${overallProgress}%`;
    if (barMastery) barMastery.style.width = `${overallProgress}%`;
    if (statStatus) {
      if (overallProgress === 0) statStatus.textContent = 'Start your first lesson';
      else if (overallProgress < 40) statStatus.textContent = 'Foundation in Progress';
      else if (overallProgress < 80) statStatus.textContent = 'Intermediate Mastery';
      else statStatus.textContent = 'Grammar Scholar';
    }

    const bookmarkCount = document.getElementById('bookmarkCount');
    if (bookmarkCount) bookmarkCount.textContent = state.bookmarks.length;

    // Update lesson mark buttons
    document.querySelectorAll('.btn-mark-learned').forEach(btn => {
      const topic = btn.getAttribute('data-topic');
      if (state.topicsLearned.includes(topic)) {
        btn.classList.add('learned');
        btn.querySelector('span').textContent = 'Learned';
        btn.querySelector('i').className = 'fa-solid fa-circle-check';
      } else {
        btn.classList.remove('learned');
        btn.querySelector('span').textContent = 'Mark Learned';
        btn.querySelector('i').className = 'fa-regular fa-circle-check';
      }
    });

    // Update bookmark buttons
    document.querySelectorAll('.btn-bookmark-lesson, .btn-bookmark-card').forEach(btn => {
      const topic = btn.getAttribute('data-topic');
      if (state.bookmarks.includes(topic)) {
        btn.classList.add('active');
        btn.querySelector('i').className = 'fa-solid fa-bookmark';
      } else {
        btn.classList.remove('active');
        btn.querySelector('i').className = 'fa-regular fa-bookmark';
      }
    });
  }

  /* ==========================================================================
     3. DAILY GRAMMAR CONCEPT SPOTLIGHT (DATE BASED)
     ========================================================================== */
  const DAILY_CONCEPTS = [
    {
      title: 'Transitive vs. Intransitive Verbs',
      pos: 'Verb Mechanics',
      def: 'A transitive verb requires a direct object to complete its meaning ("She opened the door"), whereas an intransitive verb expresses complete action on its own ("The baby slept peacefully").',
      ex: 'Compare: "The choir sang [a hymn]" (Transitive) vs. "The birds sang beautifully" (Intransitive).',
      q: 'Which verb is intransitive? "He read a book" vs "The sun rose".',
      answer: 'The sun rose'
    },
    {
      title: 'The Gerund: Verb Form Working as a Noun',
      pos: 'Word Function',
      def: 'When a verb takes the -ing suffix and functions as a subject or object in a clause, it operates grammatically as a noun (a Gerund).',
      ex: '"Swimming is excellent physical therapy." ("Swimming" is the subject).',
      q: 'In "I love reading", what is "reading"?',
      answer: 'A Gerund (Noun)'
    },
    {
      title: 'Correlative Conjunction Parallelism',
      pos: 'Conjunction Syntax',
      def: 'Correlative conjunctions like "neither...nor" and "not only...but also" must join grammatically balanced structures (e.g., noun with noun, verb with verb).',
      ex: '"She is not only intelligent but also hardworking."',
      q: 'Correct the mismatch: "He likes both singing and to dance."',
      answer: 'both singing and dancing'
    },
    {
      title: 'Proper Adjectives and Capitalization',
      pos: 'Adjective Precision',
      def: 'Adjectives derived from proper nouns (such as nationalities or historic eras) must always retain their capital initial letter.',
      ex: '"Victorian literature", "Pakistani textiles", "Shakespearean sonnets".',
      q: 'Is "french cuisine" capitalized?',
      answer: 'Yes, "French cuisine"'
    },
    {
      title: 'Adverbs of Degree Modifying Adjectives',
      pos: 'Adverb Mechanics',
      def: 'Adverbs can intensify or soften the meaning of adjectives and other adverbs, answering "to what extent?".',
      ex: '"She was extraordinarily perceptive during the inquiry."',
      q: 'What does "extraordinarily" modify?',
      answer: 'The adjective "perceptive"'
    }
  ];

  function initDailyGrammar() {
    const date = new Date();
    const dayIndex = date.getDate() % DAILY_CONCEPTS.length;
    const concept = DAILY_CONCEPTS[dayIndex];
    const container = document.getElementById('dailyContent');
    const dateDisplay = document.getElementById('dailyDateDisplay');

    if (dateDisplay) {
      dateDisplay.textContent = date.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
    }

    if (container && concept) {
      container.innerHTML = `
        <h3>${concept.title} <span class="tag-pill tag-blue" style="font-size: 0.8rem; margin-left: 0.5rem;">${concept.pos}</span></h3>
        <p>${concept.def}</p>
        <div class="daily-quick-qa">
          <div><i class="fa-solid fa-lightbulb" style="color: var(--accent-amber);"></i> <strong>Example:</strong> ${concept.ex}</div>
        </div>
      `;
    }
  }

  /* ==========================================================================
     4. NOUN INTERACTIVE SORTER WIDGET
     ========================================================================== */
  function initNounSorter() {
    const pool = document.getElementById('nounSorterPool');
    const listCountable = document.getElementById('listCountable');
    const listUncountable = document.getElementById('listUncountable');
    const status = document.getElementById('nounSorterStatus');

    if (!pool) return;

    pool.addEventListener('click', (e) => {
      const target = e.target.closest('.word-token');
      if (!target) return;

      const type = target.getAttribute('data-type');
      const word = target.textContent.trim();

      const chip = document.createElement('span');
      chip.className = 'tag-pill';
      chip.textContent = word;

      if (type === 'countable') {
        chip.classList.add('tag-blue');
        listCountable.appendChild(chip);
        status.textContent = `Correct! "${word}" is countable (can be counted: e.g. 2 ${word.toLowerCase()}s).`;
      } else {
        chip.classList.add('tag-amber');
        listUncountable.appendChild(chip);
        status.textContent = `Correct! "${word}" is uncountable (mass concept: cannot take -s or "a/an").`;
      }

      target.remove();
      if (pool.children.length === 0) {
        status.innerHTML = '<strong style="color: var(--accent-emerald);">🎉 Outstanding! You sorted all countable and uncountable nouns correctly!</strong>';
        state.questionsCorrect += 1;
        state.questionsAnswered += 1;
        saveState();
      }
    });
  }

  /* ==========================================================================
     5. VERB FINDER INTERACTIVE GAME
     ========================================================================== */
  const VERB_SENTENCES = [
    {
      words: ['The', 'diligent', 'student', 'was', 'studying', 'complex', 'grammar', 'quietly.'],
      verbIndices: [3, 4],
      explanation: '"was" (auxiliary) and "studying" (main action) form the complete verb phrase.'
    },
    {
      words: ['They', 'have', 'created', 'an', 'inspiring', 'presentation', 'today.'],
      verbIndices: [1, 2],
      explanation: '"have" (helping verb) and "created" (main verb) make up the present perfect tense.'
    },
    {
      words: ['She', 'opened', 'the', 'heavy', 'wooden', 'door', 'and', 'entered.'],
      verbIndices: [1, 7],
      explanation: '"opened" and "entered" are both past tense action verbs.'
    }
  ];

  let currentVerbSentenceIdx = 0;

  function renderVerbSentence() {
    const box = document.getElementById('verbSentenceBox');
    const feedback = document.getElementById('verbSentenceFeedback');
    if (!box) return;

    const data = VERB_SENTENCES[currentVerbSentenceIdx];
    box.innerHTML = '';
    feedback.textContent = 'Click on the words you believe are verbs!';

    data.words.forEach((word, idx) => {
      const span = document.createElement('span');
      span.className = 'word-interactive-span';
      span.textContent = word;
      span.setAttribute('data-idx', idx.toString());

      span.addEventListener('click', () => {
        if (data.verbIndices.includes(idx)) {
          span.classList.add('selected-verb');
          feedback.innerHTML = `<span style="color: #34D399;"><i class="fa-solid fa-check"></i> Yes! "${word}" is a verb. ${data.explanation}</span>`;
        } else {
          span.classList.add('wrong-pick');
          feedback.innerHTML = `<span style="color: #F87171;"><i class="fa-solid fa-xmark"></i> "${word}" is not a verb. Look for actions or helping verbs.</span>`;
          setTimeout(() => span.classList.remove('wrong-pick'), 1000);
        }
      });

      box.appendChild(span);
    });
  }

  const btnNextVerbSentence = document.getElementById('btnNextVerbSentence');
  if (btnNextVerbSentence) {
    btnNextVerbSentence.addEventListener('click', () => {
      currentVerbSentenceIdx = (currentVerbSentenceIdx + 1) % VERB_SENTENCES.length;
      renderVerbSentence();
    });
  }

  /* ==========================================================================
     6. ADVERB TARGET FINDER PUZZLE
     ========================================================================== */
  function initAdverbPuzzle() {
    const opts = document.querySelectorAll('.btn-adv-opt');
    const feedback = document.getElementById('advPuzzleFeedback');
    if (!opts.length) return;

    opts.forEach(btn => {
      btn.addEventListener('click', () => {
        const isCorrect = btn.getAttribute('data-correct') === 'true';
        opts.forEach(b => b.classList.remove('correct'));

        if (isCorrect) {
          btn.classList.add('correct');
          feedback.innerHTML = '<strong style="color: var(--accent-emerald);"><i class="fa-solid fa-circle-check"></i> Correct! "extraordinarily" answers "to what extent?" describing the adjective "talented".</strong>';
        } else {
          feedback.innerHTML = '<span style="color: #F87171;"><i class="fa-solid fa-circle-xmark"></i> Not quite. Check which word directly follows "extraordinarily".</span>';
        }
      });
    });
  }

  /* ==========================================================================
     7. PREPOSITION CSS SPATIAL LAB
     ========================================================================== */
  function initPrepositionLab() {
    const book = document.getElementById('movingBook');
    const buttons = document.querySelectorAll('.btn-prep-pos');
    if (!book || !buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const pos = btn.getAttribute('data-pos');
        book.className = `css-object-box pos-${pos}`;
      });
    });
  }

  /* ==========================================================================
     8. CHAMELEON WORDS SWITCHER ("Same Word, Different Job")
     ========================================================================== */
  const CHAMELEON_DATA = {
    work: [
      {
        pos: 'Verb',
        color: 'var(--pos-verb)',
        sentence: '"I <strong>work</strong> diligently every single day."',
        expl: 'Describes the physical or mental action being performed by the subject.'
      },
      {
        pos: 'Noun',
        color: 'var(--pos-noun)',
        sentence: '"My daily <strong>work</strong> requires deep concentration."',
        expl: 'Acts as the subject noun naming the occupation, task, or labor.'
      }
    ],
    fast: [
      {
        pos: 'Adjective',
        color: 'var(--pos-adjective)',
        sentence: '"He is a <strong>fast</strong> runner on the athletics track."',
        expl: 'Describes the noun "runner" answering "what kind of runner?".'
      },
      {
        pos: 'Adverb',
        color: 'var(--pos-adverb)',
        sentence: '"He runs extraordinarily <strong>fast</strong>."',
        expl: 'Modifies the action verb "runs" answering "how does he run?".'
      },
      {
        pos: 'Verb',
        color: 'var(--pos-verb)',
        sentence: '"Monks <strong>fast</strong> during solemn reflection."',
        expl: 'Describes the action of abstaining from food.'
      }
    ],
    light: [
      {
        pos: 'Noun',
        color: 'var(--pos-noun)',
        sentence: '"Please turn on the reading <strong>light</strong>."',
        expl: 'Names the physical illumination / light fixture (thing).'
      },
      {
        pos: 'Adjective',
        color: 'var(--pos-adjective)',
        sentence: '"This travel bag is surprisingly <strong>light</strong>."',
        expl: 'Modifies the noun "bag" describing its weight.'
      },
      {
        pos: 'Verb',
        color: 'var(--pos-verb)',
        sentence: '"They <strong>light</strong> the campfire at dusk."',
        expl: 'Expresses the physical action of igniting a flame.'
      }
    ],
    before: [
      {
        pos: 'Adverb',
        color: 'var(--pos-adverb)',
        sentence: '"I have visited this laboratory <strong>before</strong>."',
        expl: 'Modifies the verb phrase "have visited" answering "when?".'
      },
      {
        pos: 'Preposition',
        color: 'var(--pos-preposition)',
        sentence: '"<strong>Before</strong> dinner, the students revised notes."',
        expl: 'Shows temporal relationship taking the noun object "dinner".'
      },
      {
        pos: 'Conjunction',
        color: 'var(--pos-conjunction)',
        sentence: '"<strong>Before</strong> I left the house, I called her."',
        expl: 'Connects the dependent clause ("Before I left...") to the main clause.'
      }
    ]
  };

  function renderChameleonWord(wordKey) {
    const container = document.getElementById('chameleonContent');
    if (!container) return;

    const roles = CHAMELEON_DATA[wordKey] || [];
    let html = '<div class="chameleon-roles-grid">';
    roles.forEach(item => {
      html += `
        <div class="role-card">
          <span class="role-tag" style="background: ${item.color}22; color: ${item.color}; border: 1px solid ${item.color}55;">
            ${item.pos}
          </span>
          <p class="role-sentence">${item.sentence}</p>
          <p class="role-expl">${item.expl}</p>
        </div>
      `;
    });
    html += '</div>';
    container.innerHTML = html;
  }

  function initChameleonSwitcher() {
    const tabs = document.querySelectorAll('#chameleonTabs .tab-btn');
    if (!tabs.length) return;

    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const word = btn.getAttribute('data-word');
        renderChameleonWord(word);
      });
    });

    renderChameleonWord('work');
  }

  /* ==========================================================================
     9. SENTENCE ANALYSIS LAB
     ========================================================================== */
  const LAB_SENTENCES = [
    {
      tokens: [
        { word: 'The', pos: 'Determiner / Article', func: 'Definite article', expl: 'Specifies the noun "student".' },
        { word: 'intelligent', pos: 'Adjective', func: 'Descriptive modifier', expl: 'Modifies the subject noun "student", telling what kind of student.' },
        { word: 'student', pos: 'Noun', func: 'Subject of the sentence', expl: 'Names the person performing the action.' },
        { word: 'carefully', pos: 'Adverb', func: 'Adverb of manner', expl: 'Modifies the verb "completed", telling how the action was done.' },
        { word: 'completed', pos: 'Verb', func: 'Main transitive predicate', expl: 'Expresses the completed past action on the object.' },
        { word: 'her', pos: 'Possessive Determiner / Pronoun', func: 'Possessive reference', expl: 'Refers back to the student, indicating ownership.' },
        { word: 'difficult', pos: 'Adjective', func: 'Descriptive modifier', expl: 'Describes the direct object noun "assignment".' },
        { word: 'assignment.', pos: 'Noun', func: 'Direct object', expl: 'Names the task / entity that received the action.' }
      ]
    },
    {
      tokens: [
        { word: 'Although', pos: 'Conjunction', func: 'Subordinating conjunction', expl: 'Introduces a dependent contrast clause.' },
        { word: 'they', pos: 'Pronoun', func: 'Subject pronoun', expl: 'Replaces the noun phrase "the team members".' },
        { word: 'were', pos: 'Verb', func: 'Linking / Auxiliary verb', expl: 'Connects the subject pronoun to its predicate adjective.' },
        { word: 'exhausted,', pos: 'Adjective', func: 'Predicate adjective', expl: 'Describes the state/condition of the pronoun "they".' },
        { word: 'the', pos: 'Determiner', func: 'Definite article', expl: 'Specifies the collective noun "team".' },
        { word: 'brave', pos: 'Adjective', func: 'Descriptive adjective', expl: 'Modifies the subject noun "team".' },
        { word: 'team', pos: 'Noun', func: 'Collective subject noun', expl: 'Names the group carrying out the main clause action.' },
        { word: 'worked', pos: 'Verb', func: 'Main intransitive verb', expl: 'Expresses the physical effort in past tense.' },
        { word: 'through', pos: 'Preposition', func: 'Preposition of duration/time', expl: 'Shows the temporal relationship with "the night".' },
        { word: 'the', pos: 'Determiner', func: 'Definite article', expl: 'Specifies the noun "night".' },
        { word: 'night.', pos: 'Noun', func: 'Object of the preposition', expl: 'Names the time period during which the action occurred.' }
      ]
    },
    {
      tokens: [
        { word: 'Wow!', pos: 'Interjection', func: 'Emotional exclamation', expl: 'Expresses sudden excitement or admiration independent of sentence grammar.' },
        { word: 'She', pos: 'Pronoun', func: 'Personal subject pronoun', expl: 'Replaces the specific female athlete.' },
        { word: 'ran', pos: 'Verb', func: 'Main intransitive verb', expl: 'Expresses the physical action in past simple.' },
        { word: 'extraordinarily', pos: 'Adverb', func: 'Adverb of degree', expl: 'Modifies the adverb "fast", indicating extreme intensity.' },
        { word: 'fast', pos: 'Adverb', func: 'Adverb of manner', expl: 'Modifies the action verb "ran", describing speed.' },
        { word: 'and', pos: 'Conjunction', func: 'Coordinating conjunction', expl: 'Connects two compound past-tense verbs ("ran" and "won").' },
        { word: 'won', pos: 'Verb', func: 'Compound transitive verb', expl: 'Expresses the second action taking "championship" as object.' },
        { word: 'the', pos: 'Determiner', func: 'Definite article', expl: 'Specifies the particular tournament.' },
        { word: 'prestigious', pos: 'Adjective', func: 'Descriptive adjective', expl: 'Describes the quality/reputation of the championship.' },
        { word: 'championship.', pos: 'Noun', func: 'Direct object noun', expl: 'Names the prize / title won.' }
      ]
    },
    {
      tokens: [
        { word: 'Honest', pos: 'Adjective', func: 'Descriptive modifier', expl: 'Describes the quality of the advice.' },
        { word: 'advice', pos: 'Noun', func: 'Uncountable subject noun', expl: 'Names the mass concept/guidance acting as subject.' },
        { word: 'is', pos: 'Verb', func: 'Linking verb (copula)', expl: 'Connects the subject to the subject complement "valuable".' },
        { word: 'always', pos: 'Adverb', func: 'Adverb of frequency', expl: 'Modifies the verb "is", answering how often.' },
        { word: 'valuable', pos: 'Adjective', func: 'Predicate adjective', expl: 'Describes the inherent worth of honest advice.' },
        { word: 'before', pos: 'Preposition', func: 'Preposition of time/sequence', expl: 'Relates the state of being to the upcoming decisions.' },
        { word: 'important', pos: 'Adjective', func: 'Descriptive adjective', expl: 'Modifies the noun "decisions".' },
        { word: 'decisions.', pos: 'Noun', func: 'Object of preposition', expl: 'Names the choices receiving the prepositional relation.' }
      ]
    }
  ];

  function renderLabSentence(index) {
    const container = document.getElementById('sentenceTokenContainer');
    const placeholder = document.getElementById('inspectorPlaceholder');
    const details = document.getElementById('inspectorDetails');
    if (!container) return;

    container.innerHTML = '';
    placeholder.style.display = 'block';
    details.style.display = 'none';

    const data = LAB_SENTENCES[index];
    if (!data) return;

    data.tokens.forEach(token => {
      const btn = document.createElement('button');
      btn.className = 'token-btn';
      btn.textContent = token.word;

      btn.addEventListener('click', () => {
        container.querySelectorAll('.token-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        placeholder.style.display = 'none';
        details.style.display = 'block';

        document.getElementById('insWordText').textContent = token.word;
        document.getElementById('insPosText').textContent = token.pos;
        document.getElementById('insFunctionText').textContent = token.func;
        document.getElementById('insExplanationText').textContent = token.expl;
      });

      container.appendChild(btn);
    });
  }

  const sentenceSelect = document.getElementById('sentenceSelect');
  if (sentenceSelect) {
    sentenceSelect.addEventListener('change', (e) => {
      renderLabSentence(parseInt(e.target.value, 10));
    });
    renderLabSentence(0);
  }

  /* ==========================================================================
     10. WORD CLASSIFICATION ARENA (DRAG & DROP + TAP)
     ========================================================================== */
  const ARENA_WORDS = [
    { word: 'Teacher', category: 'noun' },
    { word: 'Quickly', category: 'adverb' },
    { word: 'Under', category: 'preposition' },
    { word: 'Beautiful', category: 'adjective' },
    { word: 'They', category: 'pronoun' },
    { word: 'Because', category: 'conjunction' },
    { word: 'Wow!', category: 'interjection' },
    { word: 'Study', category: 'verb' },
    { word: 'Freedom', category: 'noun' },
    { word: 'Extremely', category: 'adverb' },
    { word: 'Between', category: 'preposition' },
    { word: 'Themselves', category: 'pronoun' },
    { word: 'Although', category: 'conjunction' },
    { word: 'Bravo!', category: 'interjection' },
    { word: 'Taller', category: 'adjective' },
    { word: 'Transform', category: 'verb' }
  ];

  let selectedArenaChip = null;
  let activeArenaWords = [];

  function initClassificationArena() {
    const pool = document.getElementById('arenaWordPool');
    const scoreDisplay = document.getElementById('arenaScore');
    const remDisplay = document.getElementById('arenaRemaining');
    const feedback = document.getElementById('arenaFeedback');
    const btnReset = document.getElementById('btnResetArena');

    if (!pool) return;

    function resetArena() {
      pool.innerHTML = '';
      document.querySelectorAll('.bucket-dropzone').forEach(dz => dz.innerHTML = '');
      activeArenaWords = [...ARENA_WORDS].sort(() => Math.random() - 0.5);
      selectedArenaChip = null;

      if (scoreDisplay) scoreDisplay.textContent = state.arenaScore;
      if (remDisplay) remDisplay.textContent = activeArenaWords.length;
      if (feedback) feedback.textContent = 'Select a word above and click on its corresponding category container!';

      activeArenaWords.forEach(item => {
        const chip = document.createElement('div');
        chip.className = 'arena-word-chip';
        chip.textContent = item.word;
        chip.setAttribute('draggable', 'true');
        chip.setAttribute('data-word', item.word);
        chip.setAttribute('data-cat', item.category);

        // Click / Tap select
        chip.addEventListener('click', () => {
          pool.querySelectorAll('.arena-word-chip').forEach(c => c.classList.remove('selected'));
          chip.classList.add('selected');
          selectedArenaChip = chip;
          feedback.innerHTML = `Selected "<strong>${item.word}</strong>". Now tap the correct category bucket below.`;
        });

        // Drag handlers
        chip.addEventListener('dragstart', (e) => {
          selectedArenaChip = chip;
          e.dataTransfer.setData('text/plain', item.category);
          chip.classList.add('dragging');
        });

        chip.addEventListener('dragend', () => {
          chip.classList.remove('dragging');
        });

        pool.appendChild(chip);
      });
    }

    // Bucket dropzone click & dragover handlers
    document.querySelectorAll('.arena-bucket').forEach(bucket => {
      const targetCat = bucket.getAttribute('data-target');
      const dropzone = bucket.querySelector('.bucket-dropzone');

      // Click on bucket
      bucket.addEventListener('click', () => {
        if (!selectedArenaChip) return;
        const correctCat = selectedArenaChip.getAttribute('data-cat');
        const word = selectedArenaChip.getAttribute('data-word');

        if (correctCat === targetCat) {
          const pill = document.createElement('span');
          pill.className = 'tag-pill tag-blue';
          pill.textContent = word;
          dropzone.appendChild(pill);
          selectedArenaChip.remove();
          selectedArenaChip = null;

          state.arenaScore += 10;
          state.questionsCorrect += 1;
          state.questionsAnswered += 1;
          saveState();

          scoreDisplay.textContent = state.arenaScore;
          remDisplay.textContent = pool.children.length;
          feedback.innerHTML = `<span style="color: #34D399;"><i class="fa-solid fa-check"></i> Correct! "${word}" belongs to ${targetCat.toUpperCase()}.</span>`;

          if (pool.children.length === 0) {
            feedback.innerHTML = '<strong style="color: var(--accent-amber);">🏆 Incredible work! All arena words classified with precision!</strong>';
          }
        } else {
          feedback.innerHTML = `<span style="color: #F87171;"><i class="fa-solid fa-xmark"></i> Incorrect. "${word}" is not a ${targetCat}. Try another category!</span>`;
        }
      });

      // Drag and Drop
      bucket.addEventListener('dragover', (e) => {
        e.preventDefault();
        bucket.classList.add('drag-over');
      });

      bucket.addEventListener('dragleave', () => {
        bucket.classList.remove('drag-over');
      });

      bucket.addEventListener('drop', (e) => {
        e.preventDefault();
        bucket.classList.remove('drag-over');
        if (!selectedArenaChip) return;

        const correctCat = selectedArenaChip.getAttribute('data-cat');
        const word = selectedArenaChip.getAttribute('data-word');

        if (correctCat === targetCat) {
          const pill = document.createElement('span');
          pill.className = 'tag-pill tag-blue';
          pill.textContent = word;
          dropzone.appendChild(pill);
          selectedArenaChip.remove();
          selectedArenaChip = null;

          state.arenaScore += 10;
          state.questionsCorrect += 1;
          state.questionsAnswered += 1;
          saveState();

          scoreDisplay.textContent = state.arenaScore;
          remDisplay.textContent = pool.children.length;
          feedback.innerHTML = `<span style="color: #34D399;"><i class="fa-solid fa-check"></i> Correct! "${word}" dropped into ${targetCat.toUpperCase()}.</span>`;

          if (pool.children.length === 0) {
            feedback.innerHTML = '<strong style="color: var(--accent-amber);">🏆 Incredible work! All arena words classified with precision!</strong>';
          }
        } else {
          feedback.innerHTML = `<span style="color: #F87171;"><i class="fa-solid fa-xmark"></i> Incorrect bucket. "${word}" is not a ${targetCat}.</span>`;
        }
      });
    });

    if (btnReset) btnReset.addEventListener('click', resetArena);
    resetArena();
  }

  /* ==========================================================================
     11. SENTENCE BUILDER WORKSHOP
     ========================================================================== */
  const BUILDER_DATA = {
    targetSentence: ['The', 'smart', 'student', 'quickly', 'finished', 'the', 'assignment.'],
    analysis: [
      { word: 'The', pos: 'Determiner', role: 'Definite article specifying subject' },
      { word: 'smart', pos: 'Adjective', role: 'Descriptive modifier of student' },
      { word: 'student', pos: 'Noun', role: 'Subject performing the action' },
      { word: 'quickly', pos: 'Adverb', role: 'Adverb of manner describing finished' },
      { word: 'finished', pos: 'Verb', role: 'Past transitive main verb' },
      { word: 'the', pos: 'Determiner', role: 'Definite article specifying object' },
      { word: 'assignment.', pos: 'Noun', role: 'Direct object receiving action' }
    ]
  };

  function initSentenceBuilder() {
    const bank = document.getElementById('builderTokensBank');
    const dropArea = document.getElementById('builderDropArea');
    const hint = document.getElementById('builderHint');
    const btnVerify = document.getElementById('btnVerifySentence');
    const btnReset = document.getElementById('btnResetBuilder');
    const resultArea = document.getElementById('builderResultArea');

    if (!bank || !dropArea) return;

    function resetBuilder() {
      bank.innerHTML = '';
      dropArea.innerHTML = '';
      dropArea.appendChild(hint);
      hint.style.display = 'inline';
      if (resultArea) resultArea.style.display = 'none';

      const shuffled = [...BUILDER_DATA.targetSentence].sort(() => Math.random() - 0.5);
      shuffled.forEach((word) => {
        const token = document.createElement('button');
        token.className = 'builder-token';
        token.textContent = word;

        token.addEventListener('click', () => {
          if (token.parentElement === bank) {
            hint.style.display = 'none';
            dropArea.appendChild(token);
          } else {
            bank.appendChild(token);
            if (dropArea.children.length === 1 && dropArea.children[0] === hint) {
              hint.style.display = 'inline';
            }
          }
        });

        bank.appendChild(token);
      });
    }

    if (btnVerify) {
      btnVerify.addEventListener('click', () => {
        const assembledWords = Array.from(dropArea.querySelectorAll('.builder-token')).map(t => t.textContent.trim());
        const isCorrect = assembledWords.join(' ') === BUILDER_DATA.targetSentence.join(' ');

        if (isCorrect) {
          showToast('Sentence successfully assembled and parsed!');
          let tableHtml = `
            <h4 style="color: var(--accent-emerald); margin-bottom: 1rem;"><i class="fa-solid fa-circle-check"></i> Grammatical Analysis of Assembled Sentence:</h4>
            <div class="table-responsive">
              <table class="custom-table">
                <thead><tr><th>Word</th><th>Part of Speech</th><th>Syntactic Role</th></tr></thead>
                <tbody>
          `;
          BUILDER_DATA.analysis.forEach(item => {
            tableHtml += `<tr><td><strong>${item.word}</strong></td><td><span class="tag-pill tag-blue">${item.pos}</span></td><td>${item.role}</td></tr>`;
          });
          tableHtml += '</tbody></table></div>';
          resultArea.innerHTML = tableHtml;
          resultArea.style.display = 'block';

          state.questionsCorrect += 1;
          state.questionsAnswered += 1;
          saveState();
        } else {
          showToast('Not quite in order yet. Check word positions!', 'fa-triangle-exclamation');
          resultArea.innerHTML = '<p style="color: #F87171;"><i class="fa-solid fa-xmark"></i> The assembled words do not match the expected grammatical sequence. Hint: Start with "The smart student...".</p>';
          resultArea.style.display = 'block';
        }
      });
    }

    if (btnReset) btnReset.addEventListener('click', resetBuilder);
    resetBuilder();
  }

  /* ==========================================================================
     12. 3D INTERACTIVE FLASHCARDS
     ========================================================================== */
  const FLASHCARD_DECK = [
    {
      tier: 'foundation',
      title: 'NOUN',
      badge: 'Foundation • Nominal',
      def: 'A noun names a person, place, thing, animal, idea, quality, feeling, or event.',
      ex: 'Examples: teacher, Pakistan, knowledge, honesty, team.'
    },
    {
      tier: 'foundation',
      title: 'PRONOUN',
      badge: 'Foundation • Reference',
      def: 'A pronoun replaces or refers to a noun or noun phrase to avoid redundancy.',
      ex: 'Examples: she, me, mine, themselves, who, everyone.'
    },
    {
      tier: 'foundation',
      title: 'VERB',
      badge: 'Foundation • Predicate Engine',
      def: 'A verb expresses an action, occurrence, state of being, or condition.',
      ex: 'Examples: run, write, understand, is, could, have.'
    },
    {
      tier: 'intermediate',
      title: 'ADJECTIVE',
      badge: 'Intermediate • Modifier',
      def: 'An adjective describes, quantifies, or identifies a noun or pronoun.',
      ex: 'Examples: intelligent, three, this, taller, most interesting.'
    },
    {
      tier: 'intermediate',
      title: 'ADVERB',
      badge: 'Intermediate • Modifier',
      def: 'An adverb modifies a verb, an adjective, another adverb, or a full clause.',
      ex: 'Examples: carefully, yesterday, everywhere, always, very.'
    },
    {
      tier: 'intermediate',
      title: 'PREPOSITION',
      badge: 'Intermediate • Relational',
      def: 'Shows spatial, temporal, or logical relationships between nouns/pronouns and other words.',
      ex: 'Examples: on, under, between, through, at, in, during.'
    },
    {
      tier: 'advanced',
      title: 'CONJUNCTION',
      badge: 'Advanced • Connector',
      def: 'Connects words, phrases, independent clauses, or subordinate clauses.',
      ex: 'Examples: and, but, although, because, neither...nor.'
    },
    {
      tier: 'advanced',
      title: 'INTERJECTION',
      badge: 'Advanced • Emotive',
      def: 'Expresses spontaneous emotions, sudden reactions, or exclamations.',
      ex: 'Examples: Wow!, Oh!, Ouch!, Hey!, Bravo!.'
    }
  ];

  let currentCardIndex = 0;
  let activeCards = [...FLASHCARD_DECK];

  function renderFlashcard() {
    const cardInner = document.getElementById('flashcardInner');
    const badgeFront = document.getElementById('fcBadgeFront');
    const titleFront = document.getElementById('fcTitleFront');
    const badgeBack = document.getElementById('fcBadgeBack');
    const defBack = document.getElementById('fcDefBack');
    const exBack = document.getElementById('fcExBack');
    const currentIdxDisp = document.getElementById('fcCurrentIndex');
    const totalCountDisp = document.getElementById('fcTotalCount');

    if (!cardInner) return;
    cardInner.classList.remove('flipped');

    const card = activeCards[currentCardIndex];
    if (!card) return;

    badgeFront.textContent = card.badge;
    titleFront.textContent = card.title;
    badgeBack.textContent = card.badge;
    defBack.textContent = card.def;
    exBack.innerHTML = `<strong>${card.ex}</strong>`;

    currentIdxDisp.textContent = (currentCardIndex + 1).toString();
    totalCountDisp.textContent = activeCards.length.toString();
  }

  function initFlashcards() {
    const scene = document.getElementById('flashcardScene');
    const cardInner = document.getElementById('flashcardInner');
    const btnPrev = document.getElementById('btnPrevCard');
    const btnNext = document.getElementById('btnNextCard');
    const btnShuffle = document.getElementById('btnShuffleCards');
    const btnMastered = document.getElementById('btnMasteredCard');
    const filterBtns = document.querySelectorAll('.fc-filter-btn');

    if (!scene || !cardInner) return;

    // Flip card
    scene.addEventListener('click', () => cardInner.classList.toggle('flipped'));

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + activeCards.length) % activeCards.length;
        renderFlashcard();
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % activeCards.length;
        renderFlashcard();
      });
    }

    if (btnShuffle) {
      btnShuffle.addEventListener('click', () => {
        activeCards.sort(() => Math.random() - 0.5);
        currentCardIndex = 0;
        renderFlashcard();
        showToast('Deck shuffled!');
      });
    }

    if (btnMastered) {
      btnMastered.addEventListener('click', () => {
        const cardTitle = activeCards[currentCardIndex].title;
        if (!state.flashcardsKnown.includes(cardTitle)) {
          state.flashcardsKnown.push(cardTitle);
          saveState();
        }
        showToast(`Mastered "${cardTitle}"!`);
        currentCardIndex = (currentCardIndex + 1) % activeCards.length;
        renderFlashcard();
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        if (filter === 'all') {
          activeCards = [...FLASHCARD_DECK];
        } else {
          activeCards = FLASHCARD_DECK.filter(c => c.tier === filter);
        }
        currentCardIndex = 0;
        renderFlashcard();
      });
    });

    renderFlashcard();
  }

  /* ==========================================================================
     13. COMPREHENSIVE PRACTICE QUIZ ENGINE
     ========================================================================== */
  const QUIZ_QUESTIONS = [
    {
      category: '1. Identification',
      question: 'In the sentence "She solved the difficult equation quickly", what part of speech is "quickly"?',
      options: ['Noun', 'Adjective', 'Adverb', 'Preposition'],
      answer: 'Adverb',
      expl: '"quickly" describes the manner in which she solved the equation, modifying the verb "solved".'
    },
    {
      category: '2. Abstract vs. Concrete',
      question: 'Which of the following is an Abstract Noun?',
      options: ['Laboratory', 'Bravery', 'Computer', 'Eagle'],
      answer: 'Bravery',
      expl: '"Bravery" is a moral quality/concept that cannot be physically touched, unlike laboratory, computer, or eagle.'
    },
    {
      category: '3. Verb Function',
      question: 'In "The students were studying for the exam", what role does "were" play?',
      options: ['Main Verb', 'Helping / Auxiliary Verb', 'Modal Verb', 'Adverb'],
      answer: 'Helping / Auxiliary Verb',
      expl: '"were" is an auxiliary verb helping form the past continuous tense with the main verb "studying".'
    },
    {
      category: '4. Pronoun Classification',
      question: 'What type of pronoun is "themselves" in "They taught themselves to code"?',
      options: ['Personal Pronoun', 'Demonstrative Pronoun', 'Reflexive Pronoun', 'Interrogative Pronoun'],
      answer: 'Reflexive Pronoun',
      expl: '"themselves" reflects the action back onto the subject "they".'
    },
    {
      category: '5. Prepositions of Time',
      question: 'Choose the correct preposition: "The international symposium begins ___ Monday at 9:00 AM."',
      options: ['in', 'on', 'at', 'during'],
      answer: 'on',
      expl: 'We use "on" for days of the week and specific calendar dates (on Monday, on August 17th).'
    },
    {
      category: '6. Coordinating Conjunctions',
      question: 'Which acronym represents the seven coordinating conjunctions in English?',
      options: ['PEMDAS', 'FANBOYS', 'ROGER', 'COORDINATE'],
      answer: 'FANBOYS',
      expl: 'FANBOYS stands for: For, And, Nor, But, Or, Yet, So.'
    },
    {
      category: '7. Degrees of Comparison',
      question: 'What is the superlative form of the adjective "interesting"?',
      options: ['more interesting', 'interestinger', 'most interesting', 'interestingly'],
      answer: 'most interesting',
      expl: 'Multi-syllable adjectives form the superlative by placing "most" before the positive form.'
    },
    {
      category: '8. Chameleon Word Function',
      question: 'In "I work hard every day", "work" is a verb. In "My work is demanding", what is "work"?',
      options: ['Verb', 'Noun', 'Adjective', 'Adverb'],
      answer: 'Noun',
      expl: 'In "My work is demanding", "work" functions as the subject noun preceded by the possessive determiner "My".'
    },
    {
      category: '9. Common Confusions',
      question: 'Select the grammatically correct sentence:',
      options: [
        'She drives very good on the highway.',
        'She drives very well on the highway.',
        'She drives very goodly on the highway.',
        'She drives good on the highway.'
      ],
      answer: 'She drives very well on the highway.',
      expl: '"well" is the adverb describing the action verb "drives". "Good" is an adjective describing nouns.'
    },
    {
      category: '10. Uncountable Noun Traps',
      question: 'Which sentence is grammatically correct?',
      options: [
        'The professor gave us many useful advices.',
        'The professor gave us many useful advice.',
        'The professor gave us much useful advice.',
        'The professor gave us an useful advice.'
      ],
      answer: 'The professor gave us much useful advice.',
      expl: '"advice" is uncountable, so it cannot take "-s" or "many"; it uses "much" or "pieces of advice".'
    }
  ];

  let currentQuizIdx = 0;
  let quizScore = 0;
  let hasAnsweredCurrent = false;

  function renderQuizQuestion() {
    const q = QUIZ_QUESTIONS[currentQuizIdx];
    if (!q) return;

    hasAnsweredCurrent = false;

    document.getElementById('quizQIndex').textContent = (currentQuizIdx + 1).toString();
    document.getElementById('quizQTotal').textContent = QUIZ_QUESTIONS.length.toString();
    document.getElementById('quizLiveScore').textContent = quizScore.toString();
    document.getElementById('quizProgressFill').style.width = `${((currentQuizIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`;

    document.getElementById('quizCategoryTag').textContent = q.category;
    document.getElementById('quizQuestionText').textContent = q.question;

    const optionsGrid = document.getElementById('quizOptionsGrid');
    const feedbackBox = document.getElementById('quizFeedbackBox');
    const btnNext = document.getElementById('btnQuizNext');

    optionsGrid.innerHTML = '';
    feedbackBox.style.display = 'none';
    btnNext.style.display = 'none';

    // Shuffle options
    const shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);

    shuffledOpts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.textContent = opt;

      btn.addEventListener('click', () => {
        if (hasAnsweredCurrent) return;
        hasAnsweredCurrent = true;

        const isCorrect = opt === q.answer;
        if (isCorrect) {
          btn.classList.add('correct-choice');
          quizScore += 1;
          document.getElementById('quizLiveScore').textContent = quizScore.toString();
          document.getElementById('feedbackIcon').className = 'feedback-icon';
          document.getElementById('feedbackIcon').innerHTML = '<i class="fa-solid fa-circle-check"></i>';
          document.getElementById('feedbackTitle').textContent = 'Correct!';
          state.questionsCorrect += 1;
        } else {
          btn.classList.add('wrong-choice');
          document.getElementById('feedbackIcon').className = 'feedback-icon wrong';
          document.getElementById('feedbackIcon').innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
          document.getElementById('feedbackTitle').textContent = `Incorrect (Answer: ${q.answer})`;

          // Highlight correct button
          optionsGrid.querySelectorAll('.quiz-opt-btn').forEach(b => {
            if (b.textContent === q.answer) b.classList.add('correct-choice');
          });
        }

        state.questionsAnswered += 1;
        saveState();

        document.getElementById('feedbackExplanation').textContent = q.expl;
        feedbackBox.style.display = 'flex';
        btnNext.style.display = 'inline-flex';
      });

      optionsGrid.appendChild(btn);
    });
  }

  function showQuizResults() {
    document.getElementById('quizActiveView').style.display = 'none';
    const resultView = document.getElementById('quizResultView');
    resultView.style.display = 'block';

    const total = QUIZ_QUESTIONS.length;
    const accuracy = Math.round((quizScore / total) * 100);

    document.getElementById('resCorrectCount').textContent = `${quizScore} / ${total}`;
    document.getElementById('resAccuracyPercent').textContent = `${accuracy}%`;
    document.getElementById('resTimeTaken').textContent = total.toString();

    const subtitle = document.getElementById('resultSubtitle');
    if (accuracy >= 80) {
      subtitle.textContent = '🌟 Exceptional Mastery! You have a profound command of parts of speech.';
    } else if (accuracy >= 60) {
      subtitle.textContent = '👍 Good job! Review the lessons and try again to achieve 100%.';
    } else {
      subtitle.textContent = '💡 Keep learning! Review the foundational lessons and try once more.';
    }
  }

  function initQuizEngine() {
    const btnNext = document.getElementById('btnQuizNext');
    const btnRetake = document.getElementById('btnRetakeQuiz');

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (currentQuizIdx < QUIZ_QUESTIONS.length - 1) {
          currentQuizIdx += 1;
          renderQuizQuestion();
        } else {
          showQuizResults();
        }
      });
    }

    if (btnRetake) {
      btnRetake.addEventListener('click', () => {
        currentQuizIdx = 0;
        quizScore = 0;
        document.getElementById('quizResultView').style.display = 'none';
        document.getElementById('quizActiveView').style.display = 'block';
        renderQuizQuestion();
      });
    }

    renderQuizQuestion();
  }

  /* ==========================================================================
     14. GLOBAL LIVE SEARCH MODAL (Ctrl + K)
     ========================================================================== */
  const SEARCH_INDEX = [
    { title: 'Noun (Overview & 7 Types)', snippet: 'Proper, Common, Concrete, Abstract, Collective, Countable, Uncountable.', link: '#lesson-noun' },
    { title: 'Countable vs Uncountable Nouns', snippet: 'Trap alert: "information" and "advice" do not take "-s" or indefinite articles.', link: '#lesson-noun' },
    { title: 'Pronoun Transformation Matrix', snippet: 'Subject, object, possessive adjectives, possessive pronouns, reflexives.', link: '#lesson-pronoun' },
    { title: 'Verb Mechanics (Action vs State)', snippet: 'Transitive, intransitive, auxiliaries, modals, stative verbs.', link: '#lesson-verb' },
    { title: 'Adjectives & Degrees of Comparison', snippet: 'Positive, comparative (-er / more), and superlative (-est / most).', link: '#lesson-adjective' },
    { title: 'Adverbs & Modification Targets', snippet: 'Manner, time, place, frequency, degree, sentence adverbs.', link: '#lesson-adverb' },
    { title: 'Prepositions: AT vs ON vs IN', snippet: 'Spatial scene and temporal rules for precise time, days, and long periods.', link: '#lesson-preposition' },
    { title: 'Conjunctions & FANBOYS System', snippet: 'Coordinating, subordinating (because, although), correlative pairs.', link: '#lesson-conjunction' },
    { title: 'Interjections & Emotive Expressions', snippet: 'Sudden emotional outbursts: Wow!, Oh!, Ouch!, Hey!, Bravo!.', link: '#lesson-interjection' },
    { title: 'Same Word, Different Job (Chameleons)', snippet: 'How words like WORK, FAST, LIGHT, BEFORE shift roles based on context.', link: '#chameleon-words' },
    { title: 'Sentence Analysis Lab', snippet: 'Interactive token inspector revealing word functions and grammatical roles.', link: '#sentence-lab' },
    { title: 'Good vs. Well (Common Confusion)', snippet: 'Good is an adjective describing nouns; Well is an adverb describing verbs.', link: '#confusions' },
    { title: 'Then vs. Than (Common Confusion)', snippet: 'Then relates to time/sequence; Than is used for comparisons.', link: '#confusions' }
  ];

  function initSearchModal() {
    const modal = document.getElementById('searchModal');
    const btnOpen = document.getElementById('searchBtn');
    const btnClose = document.getElementById('btnCloseSearch');
    const input = document.getElementById('globalSearchInput');
    const list = document.getElementById('searchResultsList');
    const count = document.getElementById('searchResultsCount');

    if (!modal || !input) return;

    function openModal() {
      modal.style.display = 'flex';
      input.value = '';
      input.focus();
      renderSearchResults('');
    }

    function closeModal() {
      modal.style.display = 'none';
    }

    function renderSearchResults(query) {
      list.innerHTML = '';
      const q = query.toLowerCase().trim();
      const filtered = q
        ? SEARCH_INDEX.filter(item => item.title.toLowerCase().includes(q) || item.snippet.toLowerCase().includes(q))
        : SEARCH_INDEX.slice(0, 5);

      count.textContent = q ? `Found ${filtered.length} matching topics` : 'Recommended quick topics:';

      if (filtered.length === 0) {
        list.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 1rem;">No matching grammar concepts found.</p>';
        return;
      }

      filtered.forEach(item => {
        const row = document.createElement('a');
        row.className = 'search-result-item';
        row.href = item.link;
        row.innerHTML = `
          <div class="s-item-title">${item.title}</div>
          <div class="s-item-snippet">${item.snippet}</div>
        `;
        row.addEventListener('click', closeModal);
        list.appendChild(row);
      });
    }

    if (btnOpen) btnOpen.addEventListener('click', openModal);
    if (btnClose) btnClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    input.addEventListener('input', (e) => renderSearchResults(e.target.value));

    // Keyboard shortcut Ctrl+K / Cmd+K / Esc
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openModal();
      }
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });
  }

  /* ==========================================================================
     15. BOOKMARKS / SAVED DRAWER
     ========================================================================== */
  const TOPIC_NAMES = {
    noun: 'Noun (Naming Word)',
    pronoun: 'Pronoun (Reference Word)',
    verb: 'Verb (Action & State)',
    adjective: 'Adjective (Describing Word)',
    adverb: 'Adverb (Modifying Word)',
    preposition: 'Preposition (Relational Word)',
    conjunction: 'Conjunction (Connecting Word)',
    interjection: 'Interjection (Expressive Word)'
  };

  function initBookmarksDrawer() {
    const overlay = document.getElementById('bookmarksDrawerOverlay');
    const btnOpen = document.getElementById('bookmarksBtn');
    const btnClose = document.getElementById('btnCloseBookmarks');
    const list = document.getElementById('bookmarksList');
    const btnClearAll = document.getElementById('btnClearAllBookmarks');

    if (!overlay) return;

    function openDrawer() {
      overlay.style.display = 'flex';
      renderBookmarksList();
    }

    function closeDrawer() {
      overlay.style.display = 'none';
    }

    function renderBookmarksList() {
      list.innerHTML = '';
      if (state.bookmarks.length === 0) {
        list.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">No lessons bookmarked yet. Click the bookmark icon on any lesson to save it here.</p>';
        return;
      }

      state.bookmarks.forEach(topic => {
        const item = document.createElement('div');
        item.className = 'bookmark-item';
        item.innerHTML = `
          <div class="bm-info">
            <h4>${TOPIC_NAMES[topic] || topic.toUpperCase()}</h4>
            <p><a href="#lesson-${topic}" class="color-blue" style="text-decoration: underline;">Jump to Lesson</a></p>
          </div>
          <button class="btn-icon" data-del="${topic}" title="Remove"><i class="fa-solid fa-trash"></i></button>
        `;

        item.querySelector('a').addEventListener('click', closeDrawer);
        item.querySelector('[data-del]').addEventListener('click', () => {
          state.bookmarks = state.bookmarks.filter(b => b !== topic);
          saveState();
          renderBookmarksList();
          showToast(`Removed from saved lessons.`);
        });

        list.appendChild(item);
      });
    }

    if (btnOpen) btnOpen.addEventListener('click', openDrawer);
    if (btnClose) btnClose.addEventListener('click', closeDrawer);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDrawer();
    });

    if (btnClearAll) {
      btnClearAll.addEventListener('click', () => {
        state.bookmarks = [];
        saveState();
        renderBookmarksList();
        showToast('All bookmarks cleared.');
      });
    }

    // Delegate bookmark clicks from cards and lessons
    document.addEventListener('click', (e) => {
      const bmBtn = e.target.closest('.btn-bookmark-lesson, .btn-bookmark-card');
      if (bmBtn) {
        const topic = bmBtn.getAttribute('data-topic');
        if (!topic) return;

        if (state.bookmarks.includes(topic)) {
          state.bookmarks = state.bookmarks.filter(b => b !== topic);
          showToast(`Removed ${TOPIC_NAMES[topic] || topic} from saved.`);
        } else {
          state.bookmarks.push(topic);
          showToast(`Saved ${TOPIC_NAMES[topic] || topic} to bookmarks!`);
        }
        saveState();
      }

      // Delegate "Mark Learned"
      const learnBtn = e.target.closest('.btn-mark-learned');
      if (learnBtn) {
        const topic = learnBtn.getAttribute('data-topic');
        if (!topic) return;

        if (state.topicsLearned.includes(topic)) {
          state.topicsLearned = state.topicsLearned.filter(t => t !== topic);
          showToast(`Marked ${TOPIC_NAMES[topic] || topic} as in progress.`);
        } else {
          state.topicsLearned.push(topic);
          showToast(`Marked ${TOPIC_NAMES[topic] || topic} as learned! 🎉`);
        }
        saveState();
      }
    });
  }

  /* ==========================================================================
     16. MOBILE NAVIGATION & BACK TO TOP
     ========================================================================== */
  function initNavigation() {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const btnScrollTop = document.getElementById('btnScrollTop');

    if (mobileBtn && mainNav) {
      mobileBtn.addEventListener('click', () => {
        mainNav.classList.toggle('mobile-active');
      });

      mainNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => mainNav.classList.remove('mobile-active'));
      });
    }

    if (btnScrollTop) {
      btnScrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /* ==========================================================================
     INITIALIZATION CALLS
     ========================================================================== */
  initDailyGrammar();
  initNounSorter();
  renderVerbSentence();
  initAdverbPuzzle();
  initPrepositionLab();
  initChameleonSwitcher();
  initClassificationArena();
  initSentenceBuilder();
  initFlashcards();
  initQuizEngine();
  initSearchModal();
  initBookmarksDrawer();
  initNavigation();
  updateDashboardUI();
});
