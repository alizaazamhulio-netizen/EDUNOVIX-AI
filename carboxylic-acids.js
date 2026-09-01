/**
 * ==========================================================================
 * CARBOXYLIC ACIDS — MDCAT CHEMISTRY CHAPTER ENGINE
 * File: carboxylic.js
 * ==========================================================================
 */

(function () {
  'use strict';

  // ==========================================
  // 1. DATA DEFINITIONS
  // ==========================================

  // Nomenclature Data
  const NOMENCLATURE_DATA = [
    {
      condensed: "HCOOH",
      iupac: "Methanoic acid",
      common: "Formic acid",
      source: "From Latin Formica (Red ant stings and stinging nettles)",
      chainHtml: '<span class="chain-atom atom-highlight-c1">C1(=O)OH</span>',
      mass: "46.03 g/mol",
      examTip: "Formic acid is the ONLY carboxylic acid with a reducing aldehydic (-CHO) like hydrogen. It reduces Tollens' and Fehling's reagents!"
    },
    {
      condensed: "CH3COOH",
      iupac: "Ethanoic acid",
      common: "Acetic acid",
      source: "From Latin Acetum (Vinegar; 5–8% aqueous solution)",
      chainHtml: '<span>CH3</span>&mdash;<span class="chain-atom atom-highlight-c1">C1(=O)OH</span>',
      mass: "60.05 g/mol",
      examTip: "Pure anhydrous acetic acid freezes at 16.6 °C to form ice-like crystals called Glacial Acetic Acid. Boiling point is 118 °C."
    },
    {
      condensed: "CH3CH2COOH",
      iupac: "Propanoic acid",
      common: "Propionic acid",
      source: "From Greek Protos (first) + Pion (fat); first acid showing fatty characteristics",
      chainHtml: '<span>C3H3</span>&mdash;<span>C2H2</span>&mdash;<span class="chain-atom atom-highlight-c1">C1(=O)OH</span>',
      mass: "74.08 g/mol",
      examTip: "Chain numbering starts strictly from the carboxyl carbon as C-1. C-2 is also called the α-carbon in common naming."
    },
    {
      condensed: "CH3(CH2)2COOH",
      iupac: "Butanoic acid",
      common: "Butyric acid",
      source: "From Latin Butyrum (Butter; responsible for rancid butter odor)",
      chainHtml: '<span>C4H3</span>&mdash;<span>C3H2</span>&mdash;<span>C2H2</span>&mdash;<span class="chain-atom atom-highlight-c1">C1(=O)OH</span>',
      mass: "88.11 g/mol",
      examTip: "Butanoic acid gives rancid butter its characteristic foul odor. C1-C4 acids are completely water-soluble due to H-bonding."
    },
    {
      condensed: "(CH3)2CHCOOH",
      iupac: "2-Methylpropanoic acid",
      common: "Isobutyric acid",
      source: "Branched isomer of butyric acid found in carob beans",
      chainHtml: '<span>(C3H3)2-C2H</span>&mdash;<span class="chain-atom atom-highlight-c1">C1(=O)OH</span>',
      mass: "88.11 g/mol",
      examTip: "Longest continuous carbon chain containing -COOH has 3 carbons. The methyl group is at C-2."
    },
    {
      condensed: "HOOC-COOH",
      iupac: "Ethanedioic acid",
      common: "Oxalic acid",
      source: "Found in wood sorrel (Oxalis) and spinach; used in stain removers",
      chainHtml: '<span class="chain-atom atom-highlight-c1">HOOC(1)</span>&mdash;<span class="chain-atom atom-highlight-c1">C(2)OOH</span>',
      mass: "90.03 g/mol",
      examTip: "Simplest dicarboxylic acid. Suffix is '-dioic acid'. Contains two replaceable acidic protons (dibasic acid)."
    },
    {
      condensed: "C6H5COOH",
      iupac: "Benzenecarboxylic acid (Benzoic acid)",
      common: "Benzoic acid",
      source: "Found in gum benzoin; sodium salt (Sodium Benzoate) is a food preservative",
      chainHtml: '<span>(C6H5)</span>&mdash;<span class="chain-atom atom-highlight-c1">C1(=O)OH</span>',
      mass: "122.12 g/mol",
      examTip: "Simplest aromatic carboxylic acid. Undergoes sublimation. Readily prepared by oxidizing toluene with hot alkaline KMnO4."
    }
  ];

  // Reaction Laboratory Data
  const REAGENTS_DATA = {
    na: {
      title: "Reaction with Active Sodium Metal",
      rxnType: "Active Metal Displacement",
      cleavage: "O–H Bond Cleavage",
      equation: "2 CH3COOH + 2 Na → 2 CH3COONa + H2↑",
      product: "Sodium acetate (CH3COONa) + Hydrogen Gas (H2)",
      gas: "H2 (Hydrogen gas — burns with characteristic 'pop' sound)",
      mechanism: "Proton displacement (Carboxylic acid behaves as Bronsted acid)",
      conditions: "Room temperature; rapid effervescence and evolution of heat",
      mdcatTip: "Active metals (Na, K, Mg, Ca) displace the acidic proton of -COOH to form metal carboxylate salt and H2 gas.",
      observation: "Vigorous gas bubbles (H2) evolved; sodium metal dissolves.",
      liquidColor: "rgba(56, 189, 248, 0.3)",
      bubbles: true,
      flame: false
    },
    naoh: {
      title: "Neutralization with Sodium Hydroxide (NaOH)",
      rxnType: "Acid-Base Neutralization",
      cleavage: "O–H Bond Cleavage",
      equation: "CH3COOH + NaOH → CH3COONa + H2O",
      product: "Sodium acetate (CH3COONa) + Water (H2O)",
      gas: "None evolved (Exothermic solution)",
      mechanism: "Neutralization: H+ from acid combines with OH- from base",
      conditions: "Aqueous medium, standard temperature",
      mdcatTip: "Forms water-soluble salt. Phenols also react with NaOH, so NaOH cannot distinguish carboxylic acids from phenols.",
      observation: "Clear solution formed; mild temperature rise (heat of neutralization).",
      liquidColor: "rgba(14, 165, 233, 0.25)",
      bubbles: false,
      flame: false
    },
    na2co3: {
      title: "Reaction with Sodium Carbonate (Na2CO3)",
      rxnType: "Salt + Carbon Dioxide Formation",
      cleavage: "O–H Bond Cleavage",
      equation: "2 CH3COOH + Na2CO3 → 2 CH3COONa + H2O + CO2↑",
      product: "Sodium acetate (CH3COONa) + Water + Carbon Dioxide (CO2)",
      gas: "CO2 (Carbon dioxide — turns lime water milky)",
      mechanism: "Displacement of weaker carbonic acid (H2CO3 → H2O + CO2)",
      conditions: "Effervescence occurs without heating",
      mdcatTip: "Carboxylic acids are stronger acids than carbonic acid (H2CO3, pKa ≈ 6.35), so they decompose carbonates to liberate CO2.",
      observation: "Active effervescence with evolution of colorless, odorless CO2 gas.",
      liquidColor: "rgba(56, 189, 248, 0.35)",
      bubbles: true,
      flame: false
    },
    nahco3: {
      title: "Reaction with Sodium Bicarbonate (NaHCO3) ★ DIAGNOSTIC TEST",
      rxnType: "MDCAT Diagnostic Identification Test",
      cleavage: "O–H Bond Cleavage",
      equation: "CH3COOH + NaHCO3 → CH3COONa + H2O + CO2↑",
      product: "Sodium acetate + Water + Carbon Dioxide (CO2)",
      gas: "CO2 (Brisk effervescence; turns limewater milky)",
      mechanism: "Acid decomposes hydrogen carbonate ion to CO2 and H2O",
      conditions: "Instantaneous at room temperature (No heating needed)",
      mdcatTip: "GOLDEN MDCAT TEST: Used to distinguish carboxylic acids from phenols and alcohols. Phenols do NOT liberate CO2 with NaHCO3!",
      observation: "Brisk, immediate effervescence of CO2 gas that extinguishes a burning splinter.",
      liquidColor: "rgba(245, 158, 11, 0.25)",
      bubbles: true,
      flame: false
    },
    alcohol: {
      title: "Fischer Esterification (Alcohol + conc. H2SO4)",
      rxnType: "Nucleophilic Acyl Substitution",
      cleavage: "C–OH Bond Cleavage",
      equation: "CH3COOH + C2H5OH ⇌ [conc. H2SO4, Δ] CH3COOC2H5 + H2O",
      product: "Ethyl ethanoate (Sweet/Fruity smelling Ester) + Water",
      gas: "None (Fruity aroma vapors)",
      mechanism: "Nucleophilic attack on protonated carbonyl carbon; -OH comes from acid!",
      conditions: "Concentrated H2SO4 catalyst, heating under reflux",
      mdcatTip: "Reversible reaction. Conc. H2SO4 acts as acid catalyst AND dehydrating agent, pulling equilibrium to the right.",
      observation: "Formation of pleasant, sweet/fruity fragrance (ester odor).",
      liquidColor: "rgba(244, 63, 94, 0.25)",
      bubbles: false,
      flame: true
    },
    lialh4: {
      title: "Reduction with Lithium Aluminium Hydride (LiAlH4)",
      rxnType: "Strong Chemical Reduction",
      cleavage: "C=O and C–OH Reduction",
      equation: "RCOOH + 4[H] → [1. LiAlH4 / dry ether, 2. H3O+] RCH2OH + H2O",
      product: "Primary Alcohol (e.g., Ethanol from Acetic Acid)",
      gas: "None",
      mechanism: "Hydride ion transfer to carbonyl carbon yielding primary alcohol directly",
      conditions: "Anhydrous dry ether followed by acidic workup",
      mdcatTip: "LiAlH4 reduces carboxylic acid directly to PRIMARY ALCOHOL. NaBH4 CANNOT reduce carboxylic acids.",
      observation: "Vigorous reaction in ether, yielding primary alcohol upon hydrolysis.",
      liquidColor: "rgba(16, 185, 129, 0.3)",
      bubbles: false,
      flame: false
    },
    pcl5: {
      title: "Formation of Acid Chloride (PCl5 / SOCl2)",
      rxnType: "Nucleophilic Acyl Substitution",
      cleavage: "C–OH Bond Replacement by -Cl",
      equation: "CH3COOH + SOCl2 → CH3COCl + SO2↑ + HCl↑",
      product: "Acetyl chloride (CH3COCl) + SO2 gas + HCl gas",
      gas: "SO2 and HCl (both gaseous byproducts)",
      mechanism: "-OH group is replaced by chlorine nucleophile",
      conditions: "Reflux with thionyl chloride (SOCl2)",
      mdcatTip: "SOCl2 is the best reagent because both byproducts (SO2 and HCl) are gases, leaving pure acid chloride in high yield.",
      observation: "Pungent fuming gases (HCl & SO2) evolved.",
      liquidColor: "rgba(168, 85, 247, 0.3)",
      bubbles: true,
      flame: false
    },
    nh3: {
      title: "Amide Formation (NH3 + Heat)",
      rxnType: "Nucleophilic Acyl Substitution",
      cleavage: "C–OH Replacement by -NH2",
      equation: "CH3COOH + NH3 → CH3COONH4 → [Heat] CH3CONH2 + H2O",
      product: "Ethanamide (Acetamide, CH3CONH2) + Water",
      gas: "Water vapor evolved on heating",
      mechanism: "Ammonium salt formation followed by thermal dehydration",
      conditions: "Mixing to form ammonium carboxylate followed by strong heating",
      mdcatTip: "First gives ammonium acetate salt (CH3COONH4); on strong heating undergoes dehydration to give acetamide (CH3CONH2).",
      observation: "Solid ammonium salt dissolves and dehydrates on heating to yield amide.",
      liquidColor: "rgba(37, 99, 235, 0.25)",
      bubbles: false,
      flame: true
    }
  };

  // Flashcard Data (16 High-Yield MDCAT Cards)
  const FLASHCARDS = [
    {
      q: "What is the functional group of carboxylic acids and what two groups compose it?",
      a: "The functional group is –COOH (Carboxyl Group), formed by fusing a Carbonyl group (C=O) and a Hydroxyl group (–OH) on the same sp² carbon.",
      tip: "Structure & Hybridization • Planar 120° bond angle"
    },
    {
      q: "What is the primary IUPAC rule regarding numbering carbon chains in carboxylic acids?",
      a: "The carboxyl carbon is ALWAYS assigned carbon number 1 (C-1) and gets top priority over double bonds, alcohols, and ketones.",
      tip: "Nomenclature Rule • No need to write '1-oic acid'"
    },
    {
      q: "Why do carboxylic acids have higher boiling points than alcohols of similar molecular weight?",
      a: "Due to extensive intermolecular hydrogen bonding forming stable CYCLIC DIMERS (each pair held by two strong H-bonds).",
      tip: "Physical Properties • Dimer M_r = 120 in benzene"
    },
    {
      q: "Why are carboxylic acids stronger acids than alcohols and phenols?",
      a: "The conjugate base (Carboxylate ion, RCOO⁻) is resonance-stabilized with the negative charge symmetrically delocalized between TWO electronegative oxygens.",
      tip: "Resonance Stabilization • Equivalent 127 pm C-O bonds"
    },
    {
      q: "Which diagnostic reagent test distinguishes carboxylic acids from phenols?",
      a: "Sodium Bicarbonate (NaHCO3) test. Carboxylic acids give brisk effervescence of CO2 gas, whereas phenols do NOT react with NaHCO3.",
      tip: "MDCAT Core Diagnostic Test • CO2 turns limewater milky"
    },
    {
      q: "What is the effect of electron-withdrawing groups (-I effect) on the acidity of carboxylic acids?",
      a: "They disperse the negative charge of the carboxylate ion, stabilizing the anion and significantly INCREASING acidity (Higher Ka, Lower pKa).",
      tip: "Substituent Effects • CF3COOH > CCl3COOH > CH3COOH"
    },
    {
      q: "Why is formic acid (HCOOH) more acidic than acetic acid (CH3COOH)?",
      a: "The methyl group in acetic acid is electron-donating (+I effect), which destabilizes the acetate anion. Formic acid has only H (no +I effect).",
      tip: "Acidity Order • HCOOH (pKa 3.75) vs CH3COOH (pKa 4.76)"
    },
    {
      q: "In esterification, where does the oxygen in the released water molecule come from?",
      a: "The –OH comes from the CARBOXYLIC ACID, while only the –H comes from the alcohol (proven by ¹⁸O isotopic tracer experiments).",
      tip: "Reaction Mechanism • Nucleophilic acyl substitution"
    },
    {
      q: "What product is obtained when a carboxylic acid is treated with LiAlH4?",
      a: "A PRIMARY ALCOHOL (R–CH2OH). Reduction proceeds completely without stopping at the aldehyde stage.",
      tip: "Reduction • NaBH4 cannot reduce carboxylic acids"
    },
    {
      q: "What is the order of reactivity of carboxylic acid derivatives towards nucleophilic acyl substitution?",
      a: "Acid Chloride (RCOCl) > Acid Anhydride ((RCO)2O) > Ester (RCOOR') > Amide (RCONH2).",
      tip: "Acid Derivatives • Follows leaving group ability (Cl⁻ > RCOO⁻ > RO⁻ > NH2⁻)"
    },
    {
      q: "Why does formic acid reduce Tollens' and Fehling's reagents while acetic acid does not?",
      a: "Formic acid (H–COOH) contains a formal aldehydic hydrogen (H–C=O) group, giving it reducing sugar-like properties.",
      tip: "Special Compounds • Unique formic acid reducing action"
    },
    {
      q: "What is Glacial Acetic Acid and what is its freezing point?",
      a: "100% pure anhydrous acetic acid. It freezes at 16.6 °C (62 °F) into ice-like crystalline solids.",
      tip: "Important Compounds • Vinegar is 5–8% acetic acid"
    },
    {
      q: "What gas is produced when ethanoic acid reacts with active Sodium metal?",
      a: "Hydrogen gas (H2↑), which burns with a characteristic pop sound. (Salt formed: CH3COONa).",
      tip: "Active Metals • 2 RCOOH + 2 Na → 2 RCOONa + H2"
    },
    {
      q: "What are the roles of concentrated H2SO4 in the Fischer esterification reaction?",
      a: "1. Acid Catalyst (protonates carbonyl oxygen) and 2. Dehydrating Agent (removes water, shifting equilibrium forward).",
      tip: "Esterification • Le Chatelier's principle"
    },
    {
      q: "Why is Thionyl Chloride (SOCl2) preferred over PCl5 for preparing acyl chlorides?",
      a: "Because both byproducts (SO2 and HCl) are gases that escape automatically, leaving pure acid chloride without tedious separation.",
      tip: "Preparation of Acid Halides • RCOOH + SOCl2 → RCOCl + SO2 + HCl"
    },
    {
      q: "What is the relative acidity order between Carboxylic acids, Carbonic acid, Phenol, Water, and Alcohol?",
      a: "RCOOH > H2CO3 > C6H5OH > H2O > R–OH.",
      tip: "Acidity Hierarchy • Carboxylic acid is strongest organic acid"
    }
  ];

  // MCQ Quiz Data (20 High-Yield MDCAT MCQs)
  const MCQS = [
    {
      q: "According to IUPAC nomenclature rules, what number is assigned to the carboxyl carbon in 2-methylpropanoic acid?",
      options: [
        "Carbon number 1",
        "Carbon number 2",
        "Carbon number 3",
        "It depends on the position of substituents"
      ],
      correct: 0,
      exp: "In IUPAC naming of carboxylic acids, the carboxyl carbon is ALWAYS assigned carbon number 1 (C-1) and holds highest priority.",
      concept: "Nomenclature Priority"
    },
    {
      q: "Which of the following organic compounds exhibits the highest boiling point among isomers and comparable molar mass compounds?",
      options: [
        "Propanal (CH3CH2CHO)",
        "1-Propanol (CH3CH2CH2OH)",
        "Ethanoic acid (CH3COOH)",
        "Methoxyethane (CH3-O-C2H5)"
      ],
      correct: 2,
      exp: "Ethanoic acid (60 g/mol) boils at 118 °C, which is significantly higher than 1-propanol (97 °C) because carboxylic acids form strong cyclic dimers held by two hydrogen bonds.",
      concept: "Physical Properties & Intermolecular H-Bonding"
    },
    {
      q: "The exceptional acidic strength of carboxylic acids compared to alcohols is primarily attributed to:",
      options: [
        "The high electronegativity of the alkyl group",
        "Resonance stabilization of the carboxylate anion with negative charge spread over two oxygen atoms",
        "Steric hindrance around the carbonyl carbon",
        "The insolubility of carboxylic acids in non-polar solvents"
      ],
      correct: 1,
      exp: "The carboxylate ion (RCOO⁻) is stabilized by resonance across two equivalent oxygen atoms, making proton release highly favorable. Alkoxide ions (RO⁻) have localized charge on one oxygen.",
      concept: "Resonance Stabilization"
    },
    {
      q: "Which test is used to chemically distinguish a carboxylic acid from a phenol in the laboratory?",
      options: [
        "Reaction with active Sodium metal",
        "Neutralization with dilute aqueous NaOH",
        "Reaction with saturated aqueous NaHCO3",
        "Combustion test"
      ],
      correct: 2,
      exp: "Carboxylic acids are stronger acids than carbonic acid (H2CO3), so they react with NaHCO3 to liberate brisk CO2 gas. Phenols (weaker acids) do not react with NaHCO3.",
      concept: "Diagnostic Identification Tests"
    },
    {
      q: "What is the correct decreasing order of acidic strength among the following substituted acetic acids?",
      options: [
        "CH3COOH > CH2ClCOOH > CHCl2COOH > CCl3COOH",
        "CCl3COOH > CHCl2COOH > CH2ClCOOH > CH3COOH",
        "CH2ClCOOH > CCl3COOH > CHCl2COOH > CH3COOH",
        "CH3COOH > CCl3COOH > CHCl2COOH > CH2ClCOOH"
      ],
      correct: 1,
      exp: "Chlorine is electron-withdrawing (-I effect). More chlorine atoms disperse the negative charge of the carboxylate anion more effectively, greatly increasing acidity: CCl3COOH > CHCl2COOH > CH2ClCOOH > CH3COOH.",
      concept: "Inductive Effects on Acidity"
    },
    {
      q: "When an aliphatic carboxylic acid is reduced using Lithium Aluminium Hydride (LiAlH4) in dry ether, the final product is:",
      options: [
        "An aldehyde (R-CHO)",
        "A ketone (R-CO-R)",
        "A primary alcohol (R-CH2OH)",
        "A secondary alcohol (R-CH(OH)-R)"
      ],
      correct: 2,
      exp: "LiAlH4 is a powerful reducing agent that reduces carboxylic acids completely to primary alcohols (RCH2OH). The reaction cannot be stopped at the aldehyde stage.",
      concept: "Reduction of Carboxylic Acids"
    },
    {
      q: "In Fischer esterification between CH3COOH and C2H5OH in the presence of conc. H2SO4, isotopic tracing with ¹⁸O proves that:",
      options: [
        "The -OH in the formed water comes from ethanol",
        "The -OH in the formed water comes from ethanoic acid",
        "Both oxygens in the ester originate from ethanol",
        "The reaction is irreversible"
      ],
      correct: 1,
      exp: "Isotopic tracer experiments using C2H5¹⁸OH show that ¹⁸O ends up inside the ethyl ester (CH3CO¹⁸OC2H5). This proves that the -OH group is cleaved from the carboxylic acid.",
      concept: "Esterification Mechanism"
    },
    {
      q: "Which carboxylic acid uniquely reduces ammoniacal silver nitrate (Tollens' reagent) to form a silver mirror?",
      options: [
        "Ethanoic acid (Acetic acid)",
        "Methanoic acid (Formic acid)",
        "Propanoic acid",
        "Benzoic acid"
      ],
      correct: 1,
      exp: "Methanoic acid (HCOOH) possesses both a carboxylic acid group and an aldehydic hydrogen (H-C=O), giving it reducing properties that reduce Tollens' and Fehling's reagents.",
      concept: "Special Properties of Formic Acid"
    },
    {
      q: "The hybridization of the carboxyl carbon atom and the approximate bond angles around it in ethanoic acid are:",
      options: [
        "sp³, 109.5°",
        "sp², 120°",
        "sp, 180°",
        "dsp², 90°"
      ],
      correct: 1,
      exp: "The carboxyl carbon forms 3 σ-bonds and 1 π-bond, utilizing sp² hybridization with a planar geometry and bond angles of approximately 120°.",
      concept: "Structure and Geometry"
    },
    {
      q: "What is the correct order of reactivity of carboxylic acid derivatives towards nucleophilic acyl substitution?",
      options: [
        "RCONH2 > RCOOR' > (RCO)2O > RCOCl",
        "RCOCl > (RCO)2O > RCOOR' > RCONH2",
        "RCOOR' > RCOCl > RCONH2 > (RCO)2O",
        "(RCO)2O > RCOCl > RCONH2 > RCOOR'"
      ],
      correct: 1,
      exp: "Reactivity follows the leaving group ability: Cl⁻ is the weakest base and best leaving group, while NH2⁻ is the strongest base and poorest leaving group: RCOCl > (RCO)2O > RCOOR' > RCONH2.",
      concept: "Carboxylic Acid Derivatives"
    },
    {
      q: "When ethanoic acid is heated with Phosphorus Pentoxide (P2O5), the resulting organic product is:",
      options: [
        "Ethanoyl chloride (CH3COCl)",
        "Ethanoic anhydride ((CH3CO)2O)",
        "Ethanenitrile (CH3CN)",
        "Ethyl ethanoate (CH3COOC2H5)"
      ],
      correct: 1,
      exp: "P2O5 is a strong dehydrating agent that removes a molecule of water from two molecules of ethanoic acid to produce ethanoic anhydride ((CH3CO)2O).",
      concept: "Dehydration & Anhydride Formation"
    },
    {
      q: "Which reagent is INCAPABLE of reducing a carboxylic acid to an alcohol?",
      options: [
        "LiAlH4 in dry ether",
        "B2H6 (Diborane) in THF",
        "NaBH4 in aqueous ethanol",
        "Both LiAlH4 and B2H6"
      ],
      correct: 2,
      exp: "Sodium borohydride (NaBH4) is a mild reducing agent that readily reduces aldehydes and ketones, but CANNOT reduce carboxylic acids or esters.",
      concept: "Reducing Agent Specificity"
    },
    {
      q: "The apparent molecular mass of acetic acid measured in benzene solution is approximately 120 g/mol instead of 60 g/mol because:",
      options: [
        "Acetic acid polymerizes into tetramers",
        "Acetic acid forms cyclic dimers held by intermolecular hydrogen bonds",
        "Acetic acid completely ionizes in benzene",
        "Benzene reacts covalently with acetic acid"
      ],
      correct: 1,
      exp: "In non-polar solvents like benzene, two acetic acid molecules join via two complementary hydrogen bonds to form a cyclic dimer of formula (CH3COOH)2 with M_r = 120.",
      concept: "Dimerization in Non-Polar Solvents"
    },
    {
      q: "What gas is evolved when propanoic acid reacts with active Sodium metal?",
      options: [
        "Carbon dioxide (CO2)",
        "Hydrogen (H2)",
        "Oxygen (O2)",
        "Methane (CH4)"
      ],
      correct: 1,
      exp: "Active metals like Na displace the acidic proton of carboxylic acids to form sodium propanoate and evolve Hydrogen gas (H2↑): 2 CH3CH2COOH + 2 Na → 2 CH3CH2COONa + H2↑.",
      concept: "Reactions with Active Metals"
    },
    {
      q: "Which of the following dicarboxylic acids has the IUPAC name Ethanedioic acid?",
      options: [
        "Malonic acid",
        "Succinic acid",
        "Oxalic acid",
        "Adipic acid"
      ],
      correct: 2,
      exp: "Oxalic acid has the formula HOOC-COOH (2 carbons), and its systematic IUPAC name is Ethanedioic acid.",
      concept: "Dicarboxylic Acids Nomenclature"
    },
    {
      q: "What is the role of concentrated H2SO4 in the preparation of an ester?",
      options: [
        "Acts solely as an oxidizing agent",
        "Acts as an acid catalyst and dehydrating agent",
        "Acts as a reducing agent",
        "Acts solely as an emulsifier"
      ],
      correct: 1,
      exp: "Concentrated H2SO4 acts as a catalyst by protonating the carbonyl oxygen and as a dehydrating agent by removing water, shifting the equilibrium toward ester formation.",
      concept: "Catalysis in Esterification"
    },
    {
      q: "Which halogen-substituted acetic acid is the STRONGEST acid?",
      options: [
        "Fluoroacetic acid (FCH2COOH)",
        "Chloroacetic acid (ClCH2COOH)",
        "Bromoacetic acid (BrCH2COOH)",
        "Iodoacetic acid (ICH2COOH)"
      ],
      correct: 0,
      exp: "Fluorine has the highest electronegativity among halogens, exerting the strongest -I electron-withdrawing effect. Thus, FCH2COOH is the strongest acid (lowest pKa = 2.59).",
      concept: "Halogen Electronegativity & Acidity"
    },
    {
      q: "The C–O bond lengths in the resonance-stabilized acetate ion (CH3COO⁻) are:",
      options: [
        "One short double bond (121 pm) and one long single bond (136 pm)",
        "Both identical with intermediate length (127 pm)",
        "Both identical single bonds of 143 pm",
        "Constantly oscillating between 100 pm and 200 pm"
      ],
      correct: 1,
      exp: "Due to resonance delocalization of the negative charge across both oxygen atoms, both carbon-oxygen bonds in the carboxylate anion are equivalent and measure 127 pm.",
      concept: "Resonance Bond Lengths"
    },
    {
      q: "Why is thionyl chloride (SOCl2) the preferred reagent for converting RCOOH into RCOCl?",
      options: [
        "It is the least hazardous reagent in industry",
        "Both byproducts (SO2 and HCl) are gases, leaving the pure product easily",
        "It requires high refrigeration temperatures",
        "It prevents oxidation of the alkyl chain"
      ],
      correct: 1,
      exp: "In the reaction RCOOH + SOCl2 → RCOCl + SO2↑ + HCl↑, both SO2 and HCl are gases that escape, yielding pure acyl chloride without difficult purification.",
      concept: "Acyl Chloride Synthesis"
    },
    {
      q: "What is the correct ranking of relative acidity among the following compounds?",
      options: [
        "CH3COOH > H2CO3 > C6H5OH > H2O > C2H5OH",
        "C6H5OH > CH3COOH > H2CO3 > C2H5OH > H2O",
        "H2CO3 > CH3COOH > C6H5OH > C2H5OH > H2O",
        "C2H5OH > H2O > C6H5OH > H2CO3 > CH3COOH"
      ],
      correct: 0,
      exp: "The correct acidity hierarchy is: Carboxylic acids (pKa ≈ 4.8) > Carbonic acid (pKa ≈ 6.4) > Phenol (pKa ≈ 10) > Water (pKa = 15.7) > Ethanol (pKa ≈ 16).",
      concept: "Master Acidity Hierarchy"
    }
  ];

  // ==========================================
  // 2. DOM ELEMENT CACHE
  // ==========================================

  const DOM = {
    // Navigation & Progress
    scrollProgressBar: document.getElementById('scroll-progress-bar'),
    navProgressText: document.getElementById('nav-progress-text'),
    navProgressFill: document.getElementById('nav-progress-fill'),
    heroProgressText: document.getElementById('hero-progress-text'),
    backChemistryLink: document.getElementById('back-chemistry-link'),
    roadmapPills: document.querySelectorAll('.roadmap-pill'),
    roadmapDrawerBtn: document.getElementById('roadmap-drawer-btn'),
    roadmapBar: document.getElementById('roadmap-bar'),
    chapterSearch: document.getElementById('chapter-search'),
    searchClearBtn: document.getElementById('search-clear-btn'),
    searchResultsDropdown: document.getElementById('search-results-dropdown'),
    backToTopBtn: document.getElementById('back-to-top-btn'),
    resetProgressBtn: document.getElementById('reset-chapter-progress-btn'),
    toastContainer: document.getElementById('toast-container'),

    // Hero Molecule
    heroMoleculeStage: document.getElementById('hero-molecule-stage'),
    molInfoTitle: document.getElementById('mol-info-title'),
    molInfoDesc: document.getElementById('mol-info-desc'),
    btnHighlightCO: document.getElementById('btn-highlight-co'),
    btnHighlightOH: document.getElementById('btn-highlight-oh'),
    btnWhyCarboxyl: document.getElementById('btn-why-carboxyl'),
    atomNodes: document.querySelectorAll('.atom-node'),

    // Polarity Region Explorer
    polarityRegions: document.querySelectorAll('.interactive-region'),
    polarityInfoTitle: document.getElementById('polarity-info-title'),
    polarityInfoBody: document.getElementById('polarity-info-body'),

    // Nomenclature
    nomenButtonsContainer: document.getElementById('nomen-buttons-container'),
    nomenChainVisual: document.getElementById('nomen-chain-visual'),
    nomenIupacVal: document.getElementById('nomen-iupac-val'),
    nomenCommonVal: document.getElementById('nomen-common-val'),
    nomenSourceVal: document.getElementById('nomen-source-val'),
    nomenExamTip: document.getElementById('nomen-exam-tip'),
    nomenCondensed: document.getElementById('nomen-condensed'),
    nomenMass: document.getElementById('nomen-mass'),

    // Resonance Deep Dive
    btnWhyAcidicInteractive: document.getElementById('btn-why-acidic-interactive'),
    resonanceDeepDive: document.getElementById('resonance-deep-dive'),

    // Reaction Laboratory
    reagentBtnGroup: document.getElementById('reagent-btn-group'),
    simTestTube: document.getElementById('sim-test-tube'),
    simTubeLiquid: document.getElementById('sim-tube-liquid'),
    simBubbleLayer: document.getElementById('sim-bubble-layer'),
    simBurnerFlame: document.getElementById('sim-burner-flame'),
    simObservationText: document.getElementById('sim-observation-text'),
    rxnTypeBadge: document.getElementById('rxn-type-badge'),
    rxnCleavageBadge: document.getElementById('rxn-cleavage-badge'),
    rxnTitle: document.getElementById('rxn-title'),
    rxnEquation: document.getElementById('rxn-equation'),
    rxnCopyBtn: document.getElementById('rxn-copy-btn'),
    rxnProduct: document.getElementById('rxn-product'),
    rxnGas: document.getElementById('rxn-gas'),
    rxnMechanism: document.getElementById('rxn-mechanism'),
    rxnConditions: document.getElementById('rxn-conditions'),
    rxnMdcatText: document.getElementById('rxn-mdcat-text'),

    // Flashcards
    flashcardWrapper: document.getElementById('flashcard-wrapper'),
    fcCurrentNum: document.getElementById('fc-current-num'),
    fcTotalNum: document.getElementById('fc-total-num'),
    fcProgressFill: document.getElementById('fc-progress-fill'),
    fcQuestionText: document.getElementById('fc-question-text'),
    fcAnswerText: document.getElementById('fc-answer-text'),
    fcTipBox: document.getElementById('fc-tip-box'),
    fcPrevBtn: document.getElementById('fc-prev-btn'),
    fcFlipBtn: document.getElementById('fc-flip-btn'),
    fcNextBtn: document.getElementById('fc-next-btn'),
    fcShuffleBtn: document.getElementById('fc-shuffle-btn'),

    // Match Game
    matchLeftCol: document.getElementById('match-left-col'),
    matchRightCol: document.getElementById('match-right-col'),
    matchScore: document.getElementById('match-score'),
    matchStatusMsg: document.getElementById('match-status-msg'),
    matchResetBtn: document.getElementById('match-reset-btn'),
    matchGameCompleteBox: document.getElementById('match-game-complete-box'),

    // Quiz Elements
    quizCurrQnum: document.getElementById('quiz-curr-qnum'),
    quizTotalQnum: document.getElementById('quiz-total-qnum'),
    quizLiveScore: document.getElementById('quiz-live-score'),
    quizAttemptedCount: document.getElementById('quiz-attempted-count'),
    quizGridToggleBtn: document.getElementById('quiz-grid-toggle-btn'),
    quizQuestionGrid: document.getElementById('quiz-question-grid'),
    quizConceptTag: document.getElementById('q-concept-tag'),
    quizDifficultyTag: document.getElementById('q-difficulty-tag'),
    quizQText: document.getElementById('q-text'),
    quizOptionsContainer: document.getElementById('q-options-container'),
    quizExplanationPanel: document.getElementById('q-explanation-panel'),
    expStatusIcon: document.getElementById('exp-status-icon'),
    expStatusTitle: document.getElementById('exp-status-title'),
    expTextBody: document.getElementById('exp-text-body'),
    expConceptTestedVal: document.getElementById('exp-concept-tested-val'),
    quizSubmitBtn: document.getElementById('quiz-submit-btn'),
    quizNextBtn: document.getElementById('quiz-next-btn'),
    quizRestartBtn: document.getElementById('quiz-restart-btn'),
    quizQuestionBox: document.getElementById('quiz-question-box'),
    quizResultsCard: document.getElementById('quiz-results-card'),
    resultsPct: document.getElementById('results-pct'),
    resultsVerdictTitle: document.getElementById('results-verdict-title'),
    resultsVerdictMsg: document.getElementById('results-verdict-msg'),
    resCorrectCount: document.getElementById('res-correct-count'),
    resWrongCount: document.getElementById('res-wrong-count'),
    resultsRetakeBtn: document.getElementById('results-retake-btn'),

    // Formula sheet copy buttons
    sheetCopyBtns: document.querySelectorAll('.sheet-copy-btn')
  };

  // ==========================================
  // 3. APPLICATION STATE
  // ==========================================

  const State = {
    // Overall Chapter Progress
    visitedSections: new Set(),
    activeRoadmapId: 'hero',

    // Flashcard State
    fcIndex: 0,
    fcCards: [...FLASHCARDS],

    // Match Game State
    selectedLeft: null,
    selectedRight: null,
    matchPairsFound: 0,

    // Quiz State
    currentQIndex: 0,
    selectedOption: null,
    userAnswers: new Array(MCQS.length).fill(null), // stores { selected, correct, isCorrect }
    quizScore: 0,
    quizFinished: false,

    // Storage Key
    STORAGE_KEY: 'mdcat_carboxylic_acids_v1'
  };

  // ==========================================
  // 4. PERSISTENCE & LOCALSTORAGE
  // ==========================================

  function loadProgress() {
    try {
      const saved = localStorage.getItem(State.STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.visitedSections) {
          State.visitedSections = new Set(data.visitedSections);
        }
        if (data.quizScore !== undefined && data.userAnswers) {
          State.quizScore = data.quizScore;
          State.userAnswers = data.userAnswers;
        }
      }
    } catch (e) {
      console.warn('Could not read from localStorage:', e);
    }
    updateProgressUI();
  }

  function saveProgress() {
    try {
      const data = {
        visitedSections: Array.from(State.visitedSections),
        quizScore: State.quizScore,
        userAnswers: State.userAnswers
      };
      localStorage.setItem(State.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
    updateProgressUI();
  }

  function updateProgressUI() {
    const totalCheckpoints = 17; // intro + 16 sections
    const count = State.visitedSections.size;
    const pct = Math.min(100, Math.round((count / totalCheckpoints) * 100));

    if (DOM.navProgressText) DOM.navProgressText.textContent = pct + '%';
    if (DOM.navProgressFill) DOM.navProgressFill.style.width = pct + '%';
    if (DOM.heroProgressText) DOM.heroProgressText.textContent = pct + '% Completed';
  }

  // ==========================================
  // 5. TOAST NOTIFICATIONS
  // ==========================================

  function showToast(message, icon = '📋') {
    if (!DOM.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  // ==========================================
  // 6. BACK TO CHEMISTRY LINK
  // ==========================================

  function initBackToChemistry() {
    if (!DOM.backChemistryLink) return;

    // Check if chemistry.html exists by doing a HEAD fetch or fallback
    fetch('chemistry.html', { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          DOM.backChemistryLink.href = 'chemistry.html';
        } else {
          setupStandaloneBackLink();
        }
      })
      .catch(() => {
        setupStandaloneBackLink();
      });

    function setupStandaloneBackLink() {
      DOM.backChemistryLink.href = '#';
      DOM.backChemistryLink.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('You are in the Carboxylic Acids MDCAT standalone chapter!', '🧪');
      });
    }
  }

  // ==========================================
  // 7. SEARCH CHAPTER SYSTEM
  // ==========================================

  const SEARCH_INDEX = [
    { title: "Functional Group (-COOH)", target: "section-functional-group", keywords: "functional group carboxyl carbonyl hydroxyl cooh formula" },
    { title: "Structure & Hybridization", target: "section-structure", keywords: "sp2 planar 120 bond angle polarity dipole lone pair" },
    { title: "Nomenclature & IUPAC", target: "section-nomenclature", keywords: "iupac naming formic acetic propionic butyric benzoic carbon 1" },
    { title: "Physical Properties & Dimer", target: "section-physical-properties", keywords: "hydrogen bonding dimer boiling point solubility odor" },
    { title: "Acidic Nature & Ionization", target: "section-acidity", keywords: "weak acid ionization ka pka equilibrium hierarchy" },
    { title: "Resonance Stabilization", target: "section-resonance", keywords: "resonance carboxylate ion delocalization stability bond length" },
    { title: "Substituent & Inductive Effects", target: "section-alkyl-effect", keywords: "inductive effect +i -i electron donating withdrawing halogen alkyl" },
    { title: "Reaction Lab: Active Sodium", target: "section-reactions-lab", keywords: "sodium na active metal hydrogen gas displacement" },
    { title: "Reaction Lab: NaOH Neutralization", target: "section-reactions-lab", keywords: "naoh neutralization sodium hydroxide salt water" },
    { title: "Reaction Lab: Na2CO3 Carbonate", target: "section-reactions-lab", keywords: "na2co3 sodium carbonate carbon dioxide co2" },
    { title: "Reaction Lab: NaHCO3 Diagnostic Test", target: "section-reactions-lab", keywords: "nahco3 sodium bicarbonate diagnostic test effervescence co2 phenol" },
    { title: "Esterification Reaction", target: "section-esterification", keywords: "esterification fischer alcohol h2so4 catalyst tracer sweet fruity" },
    { title: "Reduction with LiAlH4", target: "section-reactions-lab", keywords: "reduction lialh4 primary alcohol nabh4 reducing agent" },
    { title: "Acid Derivatives", target: "section-derivatives", keywords: "derivatives acid chloride anhydride ester amide reactivity socl2" },
    { title: "Key Compounds (Formic, Acetic)", target: "section-important-compounds", keywords: "formic acetic glacial vinegar tollens benzoic sublimation" },
    { title: "MDCAT Exam Zone & Common Traps", target: "section-mdcat-zone", keywords: "traps exam zone mistakes common errors mdcat high yield" },
    { title: "Formula & Reaction Sheet", target: "section-formula-sheet", keywords: "formula sheet copy equations cheat sheet" },
    { title: "Interactive Flashcards", target: "section-flashcards", keywords: "flashcards active recall review memorize" },
    { title: "Reaction Match Game", target: "section-match-game", keywords: "match game quiz practice interactive drill" },
    { title: "Practice MCQ Quiz (20+)", target: "section-mcq-quiz", keywords: "mcq quiz test questions practice simulation past papers" },
    { title: "⚡ 2-Minute Rapid Revision", target: "section-rapid-revision", keywords: "rapid revision summary quick 2 minute notes" }
  ];

  function initSearch() {
    if (!DOM.chapterSearch) return;

    DOM.chapterSearch.addEventListener('input', (e) => {
      const query = e.target.value.trim().toLowerCase();

      if (query.length > 0) {
        DOM.searchClearBtn.classList.add('visible');
        const matches = SEARCH_INDEX.filter(item =>
          item.title.toLowerCase().includes(query) || item.keywords.toLowerCase().includes(query)
        );

        if (matches.length > 0) {
          DOM.searchResultsDropdown.innerHTML = matches.map(m => `
            <a href="#${m.target}" class="search-result-item" data-target="${m.target}">
              <div class="search-result-title">${m.title}</div>
              <div class="search-result-snippet">${m.keywords}</div>
            </a>
          `).join('');
          DOM.searchResultsDropdown.classList.remove('hidden');
        } else {
          DOM.searchResultsDropdown.innerHTML = `
            <div style="padding: 12px; color: var(--text-muted); font-size: 0.84rem; text-align: center;">
              No section matching "${query}"
            </div>
          `;
          DOM.searchResultsDropdown.classList.remove('hidden');
        }
      } else {
        DOM.searchClearBtn.classList.remove('visible');
        DOM.searchResultsDropdown.classList.add('hidden');
      }
    });

    // Clear search
    if (DOM.searchClearBtn) {
      DOM.searchClearBtn.addEventListener('click', () => {
        DOM.chapterSearch.value = '';
        DOM.searchClearBtn.classList.remove('visible');
        DOM.searchResultsDropdown.classList.add('hidden');
      });
    }

    // Click search item
    if (DOM.searchResultsDropdown) {
      DOM.searchResultsDropdown.addEventListener('click', (e) => {
        const link = e.target.closest('.search-result-item');
        if (link) {
          const targetId = link.getAttribute('data-target');
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            DOM.searchResultsDropdown.classList.add('hidden');
            targetEl.scrollIntoView({ behavior: 'smooth' });
            // Highlight target visually
            targetEl.style.transition = 'box-shadow 0.4s ease';
            targetEl.style.boxShadow = '0 0 24px rgba(56, 189, 248, 0.4)';
            setTimeout(() => {
              targetEl.style.boxShadow = '';
            }, 1800);
          }
        }
      });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box-wrapper')) {
        if (DOM.searchResultsDropdown) DOM.searchResultsDropdown.classList.add('hidden');
      }
    });
  }

  // ==========================================
  // 8. SCROLL SPY & ROADMAP HIGHLIGHT
  // ==========================================

  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id], header[id]');

    window.addEventListener('scroll', () => {
      // 1. Reading Progress Bar
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (DOM.scrollProgressBar) DOM.scrollProgressBar.style.width = scrolled + '%';

      // 2. Back to top button visibility
      if (DOM.backToTopBtn) {
        if (winScroll > 400) {
          DOM.backToTopBtn.classList.add('visible');
        } else {
          DOM.backToTopBtn.classList.remove('visible');
        }
      }

      // 3. Scroll Spy for active section & chapter progress
      let currentSectionId = 'hero';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 180;
        if (winScroll >= sectionTop) {
          currentSectionId = section.getAttribute('id');
          State.visitedSections.add(currentSectionId);
        }
      });

      if (currentSectionId !== State.activeRoadmapId) {
        State.activeRoadmapId = currentSectionId;
        DOM.roadmapPills.forEach(pill => {
          if (pill.getAttribute('data-target') === currentSectionId) {
            pill.classList.add('active');
            // Scroll roadmap bar so active pill is visible
            pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          } else {
            pill.classList.remove('active');
          }
        });
        saveProgress();
      }
    }, { passive: true });

    // Back to top click
    if (DOM.backToTopBtn) {
      DOM.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Reset progress click
    if (DOM.resetProgressBtn) {
      DOM.resetProgressBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all chapter progress and quiz scores?')) {
          localStorage.removeItem(State.STORAGE_KEY);
          State.visitedSections.clear();
          State.visitedSections.add('hero');
          State.quizScore = 0;
          State.userAnswers = new Array(MCQS.length).fill(null);
          State.currentQIndex = 0;
          updateProgressUI();
          renderActiveQuizQuestion();
          renderQuizGrid();
          showToast('Chapter progress has been reset.', '🔄');
        }
      });
    }
  }

  // ==========================================
  // 9. HERO MOLECULE INTERACTION
  // ==========================================

  function initHeroMolecule() {
    const infoMap = {
      'atom-r': {
        title: "Alkyl / Aryl Substituent (R)",
        desc: "R can be H (Formic acid), an alkyl group (Acetic, Propionic fatty acids), or an aryl group (Benzoic acid). Alkyl groups exert a +I electron-donating effect, decreasing acidity.",
        tags: ["Inductive Effect", "Hydrophobic Tail", "Alkyl +I"]
      },
      'atom-c': {
        title: "Carboxyl Carbon (C-1)",
        desc: "The carboxyl carbon is sp²-hybridized with planar geometry (~120° bond angles). It is electrophilic due to electron pull by both oxygens (δ+) and is always carbon-1 in IUPAC.",
        tags: ["sp² Hybridized", "Planar 120°", "Always Carbon-1", "Electrophilic δ+"]
      },
      'atom-carbonyl-o': {
        title: "Carbonyl Oxygen (=O)",
        desc: "Carries a partial negative charge (δ−) and two lone pairs. In Fischer esterification, this oxygen is protonated by acid catalysts, activating the carboxyl carbon for nucleophilic attack.",
        tags: ["Carbonyl δ−", "2 Lone Pairs", "Protonation Site", "H-Bond Acceptor"]
      },
      'atom-hydroxyl-o': {
        title: "Hydroxyl Oxygen (–O–)",
        desc: "Carries two lone pairs in conjugation with the carbonyl π-system (p-π conjugation). Upon deprotonation, it shares the negative charge symmetrically with the carbonyl oxygen.",
        tags: ["p-π Conjugation", "Leaving Group in Ester", "H-Bond Donor & Acceptor"]
      },
      'atom-h': {
        title: "Acidic Proton (H+)",
        desc: "The O–H bond is strongly polarized (δ+ on H). In aqueous solution, this proton dissociates readily, giving carboxylic acids their characteristic acidic behavior.",
        tags: ["Acidic Proton δ+", "Dissociates as H+", "K_a ≈ 1.8 × 10⁻⁵", "pK_a ≈ 4.76"]
      }
    };

    DOM.atomNodes.forEach(node => {
      node.addEventListener('click', () => {
        const id = node.getAttribute('id');
        const data = infoMap[id];
        if (data) {
          DOM.molInfoTitle.textContent = data.title;
          DOM.molInfoDesc.textContent = data.desc;
          const tagsContainer = document.getElementById('mol-info-tags');
          if (tagsContainer) {
            tagsContainer.innerHTML = data.tags.map(t => `<span class="tag">${t}</span>`).join('');
          }
          DOM.atomNodes.forEach(n => n.classList.remove('highlighted'));
          node.classList.add('highlighted');
        }
      });
    });

    // Highlight C=O button
    if (DOM.btnHighlightCO) {
      DOM.btnHighlightCO.addEventListener('click', () => {
        const doubleBond1 = document.querySelector('.bond-co-double-1');
        const doubleBond2 = document.querySelector('.bond-co-double-2');
        const carbonylO = document.getElementById('atom-carbonyl-o');
        const carbonC = document.getElementById('atom-c');

        document.querySelectorAll('.chem-bond').forEach(b => b.classList.remove('active-bond'));
        if (doubleBond1) doubleBond1.classList.add('active-bond');
        if (doubleBond2) doubleBond2.classList.add('active-bond');

        DOM.molInfoTitle.textContent = "Carbonyl Group (C=O)";
        DOM.molInfoDesc.textContent = "The carbonyl π-bond is strongly polarized toward oxygen. In carboxylic acids, it participates in resonance with the adjacent hydroxyl lone pair.";
      });
    }

    // Highlight O-H button
    if (DOM.btnHighlightOH) {
      DOM.btnHighlightOH.addEventListener('click', () => {
        const bondOH = document.querySelector('.bond-oh');
        const bondCOH = document.querySelector('.bond-coh');
        document.querySelectorAll('.chem-bond').forEach(b => b.classList.remove('active-bond'));
        if (bondOH) bondOH.classList.add('active-bond');
        if (bondCOH) bondCOH.classList.add('active-bond');

        DOM.molInfoTitle.textContent = "Hydroxyl Group (–OH)";
        DOM.molInfoDesc.textContent = "The –OH bond is weakened due to the strong electron-withdrawing nature of the adjacent carbonyl group, facilitating rapid H+ ionization.";
      });
    }

    // "What makes it unique?" button
    if (DOM.btnWhyCarboxyl) {
      DOM.btnWhyCarboxyl.addEventListener('click', () => {
        DOM.molInfoTitle.textContent = "Carboxyl group = carbonyl + hydroxyl";
        DOM.molInfoDesc.textContent = "Although containing both C=O and –OH, it acts neither as a typical aldehyde/ketone nor as a simple alcohol! Electronic interaction gives rise to resonance, high acidity, and dimer formation.";
        showToast("Carboxyl group = carbonyl + hydroxyl", "💡");
      });
    }
  }

  // ==========================================
  // 10. POLARITY REGION EXPLORER
  // ==========================================

  function initPolarityExplorer() {
    DOM.polarityRegions.forEach(region => {
      region.addEventListener('click', () => {
        DOM.polarityRegions.forEach(r => r.classList.remove('active'));
        region.classList.add('active');

        const title = region.getAttribute('data-title');
        const desc = region.getAttribute('data-desc');
        if (DOM.polarityInfoTitle) DOM.polarityInfoTitle.textContent = title;
        if (DOM.polarityInfoBody) DOM.polarityInfoBody.textContent = desc;
      });
    });
  }

  // ==========================================
  // 11. NOMENCLATURE INTERACTIVE INSPECTOR
  // ==========================================

  function initNomenclature() {
    if (!DOM.nomenButtonsContainer) return;

    const buttons = DOM.nomenButtonsContainer.querySelectorAll('.nomen-btn');
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const data = NOMENCLATURE_DATA[index];
        if (data) {
          DOM.nomenChainVisual.innerHTML = data.chainHtml;
          DOM.nomenIupacVal.textContent = data.iupac;
          DOM.nomenCommonVal.textContent = data.common;
          DOM.nomenSourceVal.innerHTML = data.source;
          DOM.nomenExamTip.textContent = data.examTip;
          DOM.nomenCondensed.textContent = data.condensed;
          DOM.nomenMass.textContent = data.mass;
        }
      });
    });
  }

  // ==========================================
  // 12. RESONANCE INTERACTIVE DEEP DIVE
  // ==========================================

  function initResonanceDeepDive() {
    if (!DOM.btnWhyAcidicInteractive) return;

    DOM.btnWhyAcidicInteractive.addEventListener('click', () => {
      if (DOM.resonanceDeepDive) {
        DOM.resonanceDeepDive.style.display = 'block';
        DOM.resonanceDeepDive.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        showToast("Carboxylate ion is resonance-stabilized!", "✨");
      }
    });
  }

  // ==========================================
  // 13. REACTION LABORATORY WORKBENCH
  // ==========================================

  function initReactionLaboratory() {
    if (!DOM.reagentBtnGroup) return;

    const reagentBtns = DOM.reagentBtnGroup.querySelectorAll('.reagent-btn');

    function selectReagent(key) {
      const data = REAGENTS_DATA[key];
      if (!data) return;

      // Update button active state
      reagentBtns.forEach(b => {
        if (b.getAttribute('data-reagent') === key) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });

      // Update Chemical Details
      DOM.rxnTitle.textContent = data.title;
      DOM.rxnTypeBadge.textContent = data.rxnType;
      DOM.rxnCleavageBadge.textContent = data.cleavage;
      DOM.rxnEquation.innerHTML = data.equation;
      DOM.rxnProduct.textContent = data.product;
      DOM.rxnGas.innerHTML = data.gas;
      DOM.rxnMechanism.textContent = data.mechanism;
      DOM.rxnConditions.textContent = data.conditions;
      DOM.rxnMdcatText.textContent = data.mdcatTip;
      DOM.simObservationText.textContent = data.observation;

      // Update visual test tube simulation
      if (DOM.simTubeLiquid) {
        DOM.simTubeLiquid.style.background = data.liquidColor;
      }

      // Generate Bubbles if applicable
      if (DOM.simBubbleLayer) {
        DOM.simBubbleLayer.innerHTML = '';
        if (data.bubbles) {
          for (let i = 0; i < 8; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'sim-bubble';
            bubble.style.left = `${10 + Math.random() * 80}%`;
            bubble.style.animationDelay = `${Math.random() * 1.5}s`;
            bubble.style.width = `${4 + Math.random() * 5}px`;
            bubble.style.height = bubble.style.width;
            DOM.simBubbleLayer.appendChild(bubble);
          }
        }
      }

      // Burner flame
      if (DOM.simBurnerFlame) {
        if (data.flame) {
          DOM.simBurnerFlame.classList.remove('hidden');
        } else {
          DOM.simBurnerFlame.classList.add('hidden');
        }
      }
    }

    reagentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-reagent');
        selectReagent(key);
      });
    });

    // Copy reaction lab equation
    if (DOM.rxnCopyBtn) {
      DOM.rxnCopyBtn.addEventListener('click', () => {
        const rawEq = DOM.rxnEquation.innerText;
        navigator.clipboard.writeText(rawEq).then(() => {
          showToast('Equation copied to clipboard!', '📋');
        });
      });
    }

    // Default select active metal
    selectReagent('na');
  }

  // ==========================================
  // 14. FORMULA SHEET COPY BUTTONS
  // ==========================================

  function initFormulaSheetCopy() {
    DOM.sheetCopyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const eq = btn.getAttribute('data-eq');
        if (eq) {
          navigator.clipboard.writeText(eq).then(() => {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.background = 'var(--accent-emerald)';
            btn.style.color = '#0f172a';
            showToast(`Copied: ${eq}`, '📋');
            setTimeout(() => {
              btn.textContent = originalText;
              btn.style.background = '';
              btn.style.color = '';
            }, 1800);
          });
        }
      });
    });
  }

  // ==========================================
  // 15. FLASHCARDS ENGINE
  // ==========================================

  function initFlashcards() {
    if (!DOM.flashcardWrapper) return;

    function renderFlashcard() {
      const card = State.fcCards[State.fcIndex];
      if (!card) return;

      DOM.flashcardWrapper.classList.remove('flipped');
      DOM.fcCurrentNum.textContent = State.fcIndex + 1;
      DOM.fcTotalNum.textContent = State.fcCards.length;

      const pct = ((State.fcIndex + 1) / State.fcCards.length) * 100;
      DOM.fcProgressFill.style.width = pct + '%';

      DOM.fcQuestionText.textContent = card.q;
      DOM.fcAnswerText.innerHTML = card.a;
      DOM.fcTipBox.innerHTML = `<em>Concept:</em> ${card.tip}`;
    }

    function toggleFlip() {
      DOM.flashcardWrapper.classList.toggle('flipped');
    }

    function nextCard() {
      if (State.fcIndex < State.fcCards.length - 1) {
        State.fcIndex++;
      } else {
        State.fcIndex = 0; // loop around
      }
      renderFlashcard();
    }

    function prevCard() {
      if (State.fcIndex > 0) {
        State.fcIndex--;
      } else {
        State.fcIndex = State.fcCards.length - 1;
      }
      renderFlashcard();
    }

    function shuffleCards() {
      for (let i = State.fcCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [State.fcCards[i], State.fcCards[j]] = [State.fcCards[j], State.fcCards[i]];
      }
      State.fcIndex = 0;
      renderFlashcard();
      showToast('Flashcards shuffled!', '🔀');
    }

    DOM.flashcardWrapper.addEventListener('click', toggleFlip);
    DOM.flashcardWrapper.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleFlip();
      }
    });

    if (DOM.fcFlipBtn) DOM.fcFlipBtn.addEventListener('click', toggleFlip);
    if (DOM.fcNextBtn) DOM.fcNextBtn.addEventListener('click', nextCard);
    if (DOM.fcPrevBtn) DOM.fcPrevBtn.addEventListener('click', prevCard);
    if (DOM.fcShuffleBtn) DOM.fcShuffleBtn.addEventListener('click', shuffleCards);

    renderFlashcard();
  }

  // ==========================================
  // 16. REACTION MATCHING GAME
  // ==========================================

  function initMatchGame() {
    if (!DOM.matchLeftCol || !DOM.matchRightCol) return;

    const leftButtons = DOM.matchLeftCol.querySelectorAll('.match-item');
    const rightButtons = DOM.matchRightCol.querySelectorAll('.match-item');

    function checkMatch() {
      if (State.selectedLeft && State.selectedRight) {
        const leftPair = State.selectedLeft.getAttribute('data-pair');
        const rightPair = State.selectedRight.getAttribute('data-pair');

        if (leftPair === rightPair) {
          // Correct Match!
          State.selectedLeft.classList.remove('selected');
          State.selectedRight.classList.remove('selected');
          State.selectedLeft.classList.add('matched');
          State.selectedRight.classList.add('matched');

          State.matchPairsFound++;
          DOM.matchScore.textContent = State.matchPairsFound;
          DOM.matchStatusMsg.textContent = "Correct Pair! 🎉";
          DOM.matchStatusMsg.className = "status-correct";

          State.selectedLeft = null;
          State.selectedRight = null;

          if (State.matchPairsFound >= 5) {
            if (DOM.matchGameCompleteBox) DOM.matchGameCompleteBox.classList.remove('hidden');
            showToast("Congratulations! All 5 reaction pairs matched perfectly!", "🏆");
          }
        } else {
          // Incorrect Match!
          DOM.matchStatusMsg.textContent = "Mismatch! Try again ❌";
          DOM.matchStatusMsg.className = "status-wrong";

          State.selectedLeft.classList.add('error-shake');
          State.selectedRight.classList.add('error-shake');

          const l = State.selectedLeft;
          const r = State.selectedRight;

          setTimeout(() => {
            l.classList.remove('selected', 'error-shake');
            r.classList.remove('selected', 'error-shake');
          }, 600);

          State.selectedLeft = null;
          State.selectedRight = null;
        }
      }
    }

    leftButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('matched')) return;
        leftButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        State.selectedLeft = btn;
        DOM.matchStatusMsg.textContent = "Now select the matching product on the right";
        DOM.matchStatusMsg.className = "status-neutral";
        checkMatch();
      });
    });

    rightButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (btn.classList.contains('matched')) return;
        rightButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        State.selectedRight = btn;
        DOM.matchStatusMsg.textContent = "Checking match...";
        checkMatch();
      });
    });

    if (DOM.matchResetBtn) {
      DOM.matchResetBtn.addEventListener('click', () => {
        leftButtons.forEach(b => b.classList.remove('selected', 'matched', 'error-shake'));
        rightButtons.forEach(b => b.classList.remove('selected', 'matched', 'error-shake'));
        State.selectedLeft = null;
        State.selectedRight = null;
        State.matchPairsFound = 0;
        DOM.matchScore.textContent = '0';
        DOM.matchStatusMsg.textContent = "Select a Reactant";
        DOM.matchStatusMsg.className = "status-neutral";
        if (DOM.matchGameCompleteBox) DOM.matchGameCompleteBox.classList.add('hidden');
        showToast("Match Game Reset", "🔄");
      });
    }
  }

  // ==========================================
  // 17. PRACTICE MCQ QUIZ (20+ MCQs)
  // ==========================================

  function renderQuizGrid() {
    if (!DOM.quizQuestionGrid) return;
    DOM.quizQuestionGrid.innerHTML = MCQS.map((_, idx) => {
      const ans = State.userAnswers[idx];
      let statusClass = '';
      if (ans) {
        statusClass = ans.isCorrect ? 'answered-correct' : 'answered-wrong';
      }
      if (idx === State.currentQIndex) {
        statusClass += ' current';
      }
      return `<button class="grid-q-btn ${statusClass}" data-qindex="${idx}">${idx + 1}</button>`;
    }).join('');

    const gridBtns = DOM.quizQuestionGrid.querySelectorAll('.grid-q-btn');
    gridBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const qIdx = parseInt(btn.getAttribute('data-qindex'), 10);
        State.currentQIndex = qIdx;
        renderActiveQuizQuestion();
        renderQuizGrid();
      });
    });
  }

  function renderActiveQuizQuestion() {
    const qData = MCQS[State.currentQIndex];
    if (!qData) return;

    DOM.quizCurrQnum.textContent = State.currentQIndex + 1;
    DOM.quizTotalQnum.textContent = MCQS.length;
    DOM.quizConceptTag.textContent = `Concept: ${qData.concept}`;
    DOM.quizQText.textContent = qData.q;

    const previousAnswer = State.userAnswers[State.currentQIndex];

    // Render Options
    DOM.quizOptionsContainer.innerHTML = qData.options.map((opt, optIdx) => {
      const keyLetter = String.fromCharCode(65 + optIdx); // A, B, C, D
      let optClass = 'q-option-label';

      if (previousAnswer) {
        if (optIdx === qData.correct) {
          optClass += ' correct-reveal';
        } else if (optIdx === previousAnswer.selected) {
          optClass += ' wrong-reveal';
        }
      }

      return `
        <label class="${optClass}" data-optindex="${optIdx}">
          <span class="q-opt-key">${keyLetter}</span>
          <span class="q-opt-text">${opt}</span>
        </label>
      `;
    }).join('');

    // Attach option click listeners
    const optionLabels = DOM.quizOptionsContainer.querySelectorAll('.q-option-label');
    if (!previousAnswer) {
      DOM.quizSubmitBtn.disabled = true;
      DOM.quizSubmitBtn.classList.remove('hidden');
      DOM.quizNextBtn.classList.add('hidden');
      DOM.quizExplanationPanel.classList.add('hidden');
      State.selectedOption = null;

      optionLabels.forEach(lbl => {
        lbl.addEventListener('click', () => {
          optionLabels.forEach(l => l.classList.remove('selected'));
          lbl.classList.add('selected');
          State.selectedOption = parseInt(lbl.getAttribute('data-optindex'), 10);
          DOM.quizSubmitBtn.disabled = false;
        });
      });
    } else {
      // Already answered — show explanation
      DOM.quizSubmitBtn.classList.add('hidden');
      DOM.quizNextBtn.classList.remove('hidden');
      revealExplanation(previousAnswer.isCorrect, qData);
    }

    updateQuizScoreboard();
  }

  function revealExplanation(isCorrect, qData) {
    DOM.quizExplanationPanel.classList.remove('hidden');
    if (isCorrect) {
      DOM.expStatusIcon.innerHTML = '✅';
      DOM.expStatusTitle.textContent = 'Correct Answer!';
      DOM.expStatusTitle.style.color = 'var(--accent-emerald)';
    } else {
      DOM.expStatusIcon.innerHTML = '❌';
      DOM.expStatusTitle.textContent = 'Incorrect!';
      DOM.expStatusTitle.style.color = 'var(--accent-rose)';
    }
    DOM.expTextBody.textContent = qData.exp;
    DOM.expConceptTestedVal.textContent = qData.concept;
  }

  function updateQuizScoreboard() {
    const answeredCount = State.userAnswers.filter(a => a !== null).length;
    const correctCount = State.userAnswers.filter(a => a && a.isCorrect).length;

    State.quizScore = correctCount;
    DOM.quizLiveScore.textContent = correctCount;
    DOM.quizAttemptedCount.textContent = answeredCount;
  }

  function submitCurrentAnswer() {
    if (State.selectedOption === null) return;

    const qData = MCQS[State.currentQIndex];
    const isCorrect = (State.selectedOption === qData.correct);

    State.userAnswers[State.currentQIndex] = {
      selected: State.selectedOption,
      correct: qData.correct,
      isCorrect: isCorrect
    };

    saveProgress();
    renderActiveQuizQuestion();
    renderQuizGrid();

    if (isCorrect) {
      showToast('Correct answer! +1 Mark', '🎯');
    } else {
      showToast('Incorrect answer. Review the explanation below.', '⚠️');
    }
  }

  function nextQuizQuestion() {
    if (State.currentQIndex < MCQS.length - 1) {
      State.currentQIndex++;
      renderActiveQuizQuestion();
      renderQuizGrid();
    } else {
      // Quiz Finished!
      finishQuiz();
    }
  }

  function finishQuiz() {
    const total = MCQS.length;
    const correct = State.userAnswers.filter(a => a && a.isCorrect).length;
    const wrong = total - correct;
    const pct = Math.round((correct / total) * 100);

    DOM.quizQuestionBox.classList.add('hidden');
    DOM.quizResultsCard.classList.remove('hidden');

    DOM.resultsPct.textContent = pct + '%';
    DOM.resCorrectCount.textContent = correct;
    DOM.resWrongCount.textContent = wrong;

    if (pct >= 85) {
      DOM.resultsVerdictTitle.textContent = "🏆 Exceptional MDCAT Mastery!";
      DOM.resultsVerdictMsg.textContent = "You demonstrated strong mastery of carboxyl nomenclature, acidity trends, resonance, and reaction mechanisms.";
    } else if (pct >= 65) {
      DOM.resultsVerdictTitle.textContent = "👍 Solid Understanding!";
      DOM.resultsVerdictMsg.textContent = "Good score! Review the few missed reaction mechanisms, substituent effects, and common MDCAT traps.";
    } else {
      DOM.resultsVerdictTitle.textContent = "📚 Needs Revision";
      DOM.resultsVerdictMsg.textContent = "Focus on the 2-Minute Rapid Revision and Flashcards to reinforce fundamental MDCAT concepts.";
    }
  }

  function initQuiz() {
    if (!DOM.quizSubmitBtn) return;

    DOM.quizSubmitBtn.addEventListener('click', submitCurrentAnswer);
    DOM.quizNextBtn.addEventListener('click', nextQuizQuestion);

    if (DOM.quizGridToggleBtn) {
      DOM.quizGridToggleBtn.addEventListener('click', () => {
        DOM.quizQuestionGrid.classList.toggle('hidden');
      });
    }

    if (DOM.quizRestartBtn) {
      DOM.quizRestartBtn.addEventListener('click', () => {
        if (confirm('Restart the MCQ quiz from question 1?')) {
          State.userAnswers = new Array(MCQS.length).fill(null);
          State.currentQIndex = 0;
          State.quizScore = 0;
          DOM.quizQuestionBox.classList.remove('hidden');
          DOM.quizResultsCard.classList.add('hidden');
          saveProgress();
          renderActiveQuizQuestion();
          renderQuizGrid();
          showToast('Quiz restarted.', '🔄');
        }
      });
    }

    if (DOM.resultsRetakeBtn) {
      DOM.resultsRetakeBtn.addEventListener('click', () => {
        State.userAnswers = new Array(MCQS.length).fill(null);
        State.currentQIndex = 0;
        State.quizScore = 0;
        DOM.quizQuestionBox.classList.remove('hidden');
        DOM.quizResultsCard.classList.add('hidden');
        saveProgress();
        renderActiveQuizQuestion();
        renderQuizGrid();
      });
    }

    renderActiveQuizQuestion();
    renderQuizGrid();
  }

  // ==========================================
  // 18. MASTER INITIALIZER
  // ==========================================

  function init() {
    loadProgress();
    initBackToChemistry();
    initSearch();
    initScrollSpy();
    initHeroMolecule();
    initPolarityExplorer();
    initNomenclature();
    initResonanceDeepDive();
    initReactionLaboratory();
    initFormulaSheetCopy();
    initFlashcards();
    initMatchGame();
    initQuiz();

    // Mark hero as visited initially
    State.visitedSections.add('hero');
    saveProgress();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
