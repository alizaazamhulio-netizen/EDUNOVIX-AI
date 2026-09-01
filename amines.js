// Main Entry Point for Amines MDCAT Lab (amines.js)

import { initHeroMolecularStage } from "./src/engines/heroMolecular.js";
import {
  initAmmoniaMorph,
  initStructureVisualizer,
  initLonePairProtonation,
  initBasicityLadder,
  initAnilineResonance,
  initPrepTabs,
  initReactionsSelector,
  initDiazotizationSim,
  initSandmeyerMap,
  initAzoCoupling,
  initHinsbergTest,
  initChemistryCalculator
} from "./src/engines/simulators.js";
import {
  initClassifierTrainer,
  initFlashcardsDeck,
  initQuizEngine,
  initSearchAndBookmarks,
  initScrollAndCompletion
} from "./src/engines/studyTools.js";

document.addEventListener("DOMContentLoaded", () => {
  try {
    initHeroMolecularStage();
    initAmmoniaMorph();
    initStructureVisualizer();
    initLonePairProtonation();
    initBasicityLadder();
    initAnilineResonance();
    initPrepTabs();
    initReactionsSelector();
    initDiazotizationSim();
    initSandmeyerMap();
    initAzoCoupling();
    initHinsbergTest();
    initChemistryCalculator();
    initClassifierTrainer();
    initFlashcardsDeck();
    initQuizEngine();
    initSearchAndBookmarks();
    initScrollAndCompletion();
    console.log("Amines MDCAT Chemistry Lab initialized successfully.");
  } catch (err) {
    console.error("Error initializing Amines Lab:", err);
  }
});
