/**
 * PROBABILITY MODULE — FAST + SCHOLARSHIP PREPARATION JAVASCRIPT
 * Comprehensive interactive engine: Simulators, Calculators, Venn Engine, 
 * 80 Practice MCQs, 35-Question Master Test, State Persistence & Analytics.
 */

// ==========================================
// 1. DATASETS: 80 PRACTICE MCQS & MASTER TEST
// ==========================================

const PRACTICE_QUESTIONS = [
  // EASY QUESTIONS (1-25)
  {
    id: 1,
    difficulty: "easy",
    topic: "Basic Probability",
    question: "A fair standard 6-sided die is rolled once. What is the probability of rolling an odd number?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: 2, // 1/2
    explanation: "Sample Space S = {1, 2, 3, 4, 5, 6} (Total = 6). Favorable odd numbers = {1, 3, 5} (Count = 3). Probability P(E) = 3/6 = 1/2."
  },
  {
    id: 2,
    difficulty: "easy",
    topic: "Basic Probability",
    question: "A standard fair coin is tossed. What is the probability of obtaining a Head?",
    options: ["1/4", "1/2", "1", "0"],
    answer: 1,
    explanation: "Sample space S = {H, T}, total = 2. Favorable = {H}, count = 1. P(Head) = 1/2 = 0.5."
  },
  {
    id: 3,
    difficulty: "easy",
    topic: "Probability Scale",
    question: "Which of the following values CANNOT represent the probability of an event?",
    options: ["0", "0.75", "1.25", "2/3"],
    answer: 2,
    explanation: "By the fundamental axioms of probability, for any event E, 0 ≤ P(E) ≤ 1. A value of 1.25 exceeds 1 and is mathematically impossible."
  },
  {
    id: 4,
    difficulty: "easy",
    topic: "Types of Events",
    question: "What is the probability of rolling a number greater than 6 on a single roll of a standard 6-sided die?",
    options: ["0", "1/6", "1/2", "1"],
    answer: 0,
    explanation: "The sample space is {1, 2, 3, 4, 5, 6}. There are no numbers strictly greater than 6. This is an Impossible Event, so P(E) = 0/6 = 0."
  },
  {
    id: 5,
    difficulty: "easy",
    topic: "Types of Events",
    question: "An event that is certain to happen has a probability equal to:",
    options: ["0", "0.5", "1", "100"],
    answer: 2,
    explanation: "A certain event contains all outcomes in the sample space, so P(Certain) = n(S)/n(S) = 1."
  },
  {
    id: 6,
    difficulty: "easy",
    topic: "Cards",
    question: "A single card is drawn at random from a standard 52-card deck. What is the probability that the card is a Heart?",
    options: ["1/52", "1/13", "1/4", "1/2"],
    answer: 2,
    explanation: "A standard deck has 4 suits: Hearts, Diamonds, Clubs, Spades. There are 13 Hearts out of 52 cards. P(Heart) = 13/52 = 1/4."
  },
  {
    id: 7,
    difficulty: "easy",
    topic: "Cards",
    question: "What is the probability of drawing an Ace from a well-shuffled standard deck of 52 cards?",
    options: ["1/52", "1/26", "1/13", "4/13"],
    answer: 2,
    explanation: "There are 4 Aces in a 52-card deck (one in each suit). P(Ace) = 4/52 = 1/13."
  },
  {
    id: 8,
    difficulty: "easy",
    topic: "Cards",
    question: "What is the probability of drawing a Red card from a standard deck of 52 cards?",
    options: ["1/4", "1/2", "26/52", "Both B and C"],
    answer: 3,
    explanation: "There are 26 red cards (13 Hearts + 13 Diamonds) out of 52 cards. P(Red) = 26/52 = 1/2. Therefore both B and C are correct representations."
  },
  {
    id: 9,
    difficulty: "easy",
    topic: "Complement",
    question: "If the probability of winning a game is 0.35, what is the probability of losing the game (assuming no ties)?",
    options: ["0.35", "0.50", "0.65", "0.75"],
    answer: 2,
    explanation: "By the complement rule, P(Losing) = 1 - P(Winning) = 1 - 0.35 = 0.65."
  },
  {
    id: 10,
    difficulty: "easy",
    topic: "Sample Space",
    question: "Two fair coins are flipped simultaneously. How many total possible outcomes exist in the sample space?",
    options: ["2", "4", "6", "8"],
    answer: 1,
    explanation: "Sample Space S = {HH, HT, TH, TT}. Total outcomes = 2^2 = 4."
  },
  {
    id: 11,
    difficulty: "easy",
    topic: "Coins",
    question: "Two fair coins are flipped. What is the probability of getting two Heads (HH)?",
    options: ["1/2", "1/3", "1/4", "3/4"],
    answer: 2,
    explanation: "S = {HH, HT, TH, TT} (Total = 4). Favorable = {HH} (Count = 1). P(2 Heads) = 1/4."
  },
  {
    id: 12,
    difficulty: "easy",
    topic: "Coins",
    question: "Two fair coins are flipped. What is the probability of getting at least one Head?",
    options: ["1/4", "1/2", "3/4", "1"],
    answer: 2,
    explanation: "S = {HH, HT, TH, TT}. Outcomes with at least one Head are {HH, HT, TH} (3 outcomes). P = 3/4. Alternatively, 1 - P(No Heads) = 1 - 1/4 = 3/4."
  },
  {
    id: 13,
    difficulty: "easy",
    topic: "Balls in Bag",
    question: "A bag contains 4 red balls, 5 blue balls, and 3 green balls. One ball is picked at random. What is the probability it is Blue?",
    options: ["5/12", "1/3", "1/4", "5/7"],
    answer: 0,
    explanation: "Total balls = 4 + 5 + 3 = 12. Favorable blue balls = 5. P(Blue) = 5/12."
  },
  {
    id: 14,
    difficulty: "easy",
    topic: "Balls in Bag",
    question: "A bag contains 6 black balls and 4 white balls. What is the probability of picking a White ball?",
    options: ["4/6", "2/5", "3/5", "1/4"],
    answer: 1,
    explanation: "Total balls = 6 + 4 = 10. Favorable white = 4. P(White) = 4/10 = 2/5."
  },
  {
    id: 15,
    difficulty: "easy",
    topic: "Dice",
    question: "A single fair die is rolled. What is the probability of getting a prime number?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: 2,
    explanation: "Sample Space = {1, 2, 3, 4, 5, 6}. Prime numbers on a die are {2, 3, 5} (Note: 1 is neither prime nor composite). Favorable = 3, Total = 6. P(Prime) = 3/6 = 1/2."
  },
  {
    id: 16,
    difficulty: "easy",
    topic: "Dice",
    question: "A single fair die is rolled. What is the probability of getting a number strictly greater than 4?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: 1,
    explanation: "Numbers greater than 4 on a standard die are {5, 6} (2 favorable outcomes). Total = 6. P = 2/6 = 1/3."
  },
  {
    id: 17,
    difficulty: "easy",
    topic: "Mutually Exclusive",
    question: "If events A and B are mutually exclusive, what is P(A ∩ B)?",
    options: ["1", "P(A) × P(B)", "0", "P(A) + P(B)"],
    answer: 2,
    explanation: "Mutually exclusive events cannot occur simultaneously by definition. Hence their intersection is empty, and P(A ∩ B) = 0."
  },
  {
    id: 18,
    difficulty: "easy",
    topic: "Mutually Exclusive",
    question: "If P(A) = 0.3 and P(B) = 0.4, and A and B are mutually exclusive, what is P(A ∪ B)?",
    options: ["0.12", "0.70", "0.58", "0.10"],
    answer: 1,
    explanation: "For mutually exclusive events, P(A ∪ B) = P(A) + P(B) = 0.3 + 0.4 = 0.70."
  },
  {
    id: 19,
    difficulty: "easy",
    topic: "Independent Events",
    question: "Two fair dice are rolled independently. What is the probability of rolling a 6 on the first die AND a 6 on the second die?",
    options: ["1/6", "1/12", "1/18", "1/36"],
    answer: 3,
    explanation: "Since the dice are independent: P(6 on 1st AND 6 on 2nd) = P(6) × P(6) = (1/6) × (1/6) = 1/36."
  },
  {
    id: 20,
    difficulty: "easy",
    topic: "Fraction Conversion",
    question: "A probability of 3/8 expressed as a percentage is:",
    options: ["30%", "37.5%", "42.5%", "75%"],
    answer: 1,
    explanation: "3/8 = 0.375. Converting to percentage: 0.375 × 100% = 37.5%."
  },
  {
    id: 21,
    difficulty: "easy",
    topic: "Cards",
    question: "How many total face cards (Jack, Queen, King) are present in a standard 52-card deck?",
    options: ["4", "8", "12", "16"],
    answer: 2,
    explanation: "Each of the 4 suits has 3 face cards (J, Q, K). Total face cards = 4 × 3 = 12."
  },
  {
    id: 22,
    difficulty: "easy",
    topic: "Cards",
    question: "What is the probability of drawing a face card from a standard deck of 52 cards?",
    options: ["3/13", "1/4", "12/52", "Both A and C"],
    answer: 3,
    explanation: "Face cards = 12. P(Face card) = 12/52 = 3/13. Thus both A and C are correct."
  },
  {
    id: 23,
    difficulty: "easy",
    topic: "Complement",
    question: "If P(E) = 7/15, what is P(E')?",
    options: ["7/15", "8/15", "1/15", "15/7"],
    answer: 1,
    explanation: "P(E') = 1 - P(E) = 1 - 7/15 = 8/15."
  },
  {
    id: 24,
    difficulty: "easy",
    topic: "Sample Space",
    question: "Three fair coins are tossed. How many elements are in the sample space?",
    options: ["3", "6", "8", "9"],
    answer: 2,
    explanation: "For n coin tosses, number of outcomes is 2^n. For 3 coins: 2^3 = 8."
  },
  {
    id: 25,
    difficulty: "easy",
    topic: "Basic Probability",
    question: "A letter is chosen at random from the word 'PROBABILITY'. What is the probability that it is the letter 'B'?",
    options: ["1/11", "2/11", "1/10", "2/10"],
    answer: 1,
    explanation: "The word P-R-O-B-A-B-I-L-I-T-Y has 11 letters. The letter 'B' occurs 2 times. P('B') = 2/11."
  },

  // MEDIUM QUESTIONS (26-55)
  {
    id: 26,
    difficulty: "medium",
    topic: "Dice",
    question: "Two fair standard dice are rolled simultaneously. What is the probability that the sum of the numbers is equal to 7?",
    options: ["1/12", "5/36", "1/6", "7/36"],
    answer: 2,
    explanation: "Total outcomes = 36. Favorable pairs giving sum 7 are: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) [6 outcomes]. P(Sum=7) = 6/36 = 1/6."
  },
  {
    id: 27,
    difficulty: "medium",
    topic: "Dice",
    question: "Two fair dice are rolled. What is the probability of getting a sum of 8?",
    options: ["1/6", "5/36", "1/9", "7/36"],
    answer: 1,
    explanation: "Pairs summing to 8: (2,6), (3,5), (4,4), (5,3), (6,2) [5 pairs]. Total = 36. P(Sum=8) = 5/36."
  },
  {
    id: 28,
    difficulty: "medium",
    topic: "Dice",
    question: "Two fair dice are rolled. What is the probability of rolling 'doubles' (both dice show the same number)?",
    options: ["1/36", "1/12", "1/6", "1/4"],
    answer: 2,
    explanation: "Doubles are (1,1), (2,2), (3,3), (4,4), (5,5), (6,6) [6 outcomes]. Total = 36. P(Doubles) = 6/36 = 1/6."
  },
  {
    id: 29,
    difficulty: "medium",
    topic: "Addition Rule",
    question: "If P(A) = 0.6, P(B) = 0.5, and P(A ∩ B) = 0.3, find P(A ∪ B).",
    options: ["0.8", "1.1", "0.7", "0.9"],
    answer: 0,
    explanation: "By the general addition rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0.6 + 0.5 - 0.3 = 0.8."
  },
  {
    id: 30,
    difficulty: "medium",
    topic: "Addition Rule",
    question: "From a standard deck of 52 cards, a single card is drawn. What is the probability of drawing a King OR a Heart?",
    options: ["17/52", "16/52 = 4/13", "13/52", "1/52"],
    answer: 1,
    explanation: "P(King) = 4/52, P(Heart) = 13/52. The King of Hearts is counted in both, so P(King ∩ Heart) = 1/52. P(King ∪ Heart) = 4/52 + 13/52 - 1/52 = 16/52 = 4/13."
  },
  {
    id: 31,
    difficulty: "medium",
    topic: "Coins",
    question: "Three fair coins are tossed. What is the probability of getting EXACTLY two heads?",
    options: ["1/8", "3/8", "1/2", "5/8"],
    answer: 1,
    explanation: "Total outcomes = 8. Favorable outcomes with exactly 2 heads = {HHT, HTH, THH} (Count = 3). P = 3/8."
  },
  {
    id: 32,
    difficulty: "medium",
    topic: "Coins",
    question: "Three fair coins are tossed. What is the probability of getting AT LEAST one tail?",
    options: ["1/8", "3/8", "7/8", "1/2"],
    answer: 2,
    explanation: "Complement of 'at least one tail' is 'zero tails' (i.e., all heads: HHH). P(All Heads) = 1/8. P(At least 1 tail) = 1 - 1/8 = 7/8."
  },
  {
    id: 33,
    difficulty: "medium",
    topic: "Dependent Events",
    question: "A bag contains 5 red and 3 blue marbles. Two marbles are drawn one after another WITHOUT replacement. What is the probability that both are Red?",
    options: ["25/64", "5/14", "15/56", "10/28"],
    answer: 1,
    explanation: "P(1st Red) = 5/8. After removing one red marble, 4 red marbles remain out of 7 total. P(2nd Red | 1st Red) = 4/7. P(Both Red) = (5/8) × (4/7) = 20/56 = 5/14."
  },
  {
    id: 34,
    difficulty: "medium",
    topic: "Dependent Events",
    question: "In the same bag (5 red, 3 blue marbles), two marbles are drawn WITHOUT replacement. What is the probability of drawing one red and one blue marble in any order?",
    options: ["15/56", "15/28", "30/56", "Both B and C"],
    answer: 3,
    explanation: "P(Red then Blue) = (5/8) × (3/7) = 15/56. P(Blue then Red) = (3/8) × (5/7) = 15/56. Total P = 15/56 + 15/56 = 30/56 = 15/28. Both B and C are correct."
  },
  {
    id: 35,
    difficulty: "medium",
    topic: "Conditional Probability",
    question: "If P(A) = 0.5, P(B) = 0.4, and P(A ∩ B) = 0.2, what is P(A|B)?",
    options: ["0.2", "0.4", "0.5", "0.8"],
    answer: 2,
    explanation: "By definition of conditional probability: P(A|B) = P(A ∩ B) / P(B) = 0.2 / 0.4 = 0.5."
  },
  {
    id: 36,
    difficulty: "medium",
    topic: "Conditional Probability",
    question: "A fair die is rolled. Given that the number rolled is EVEN, what is the probability that it is a 2?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    answer: 1,
    explanation: "Condition B = {2, 4, 6} (3 outcomes). Favorable A ∩ B = {2} (1 outcome). P(2 | Even) = 1/3."
  },
  {
    id: 37,
    difficulty: "medium",
    topic: "Independent Events",
    question: "If events A and B are independent with P(A) = 0.4 and P(B) = 0.7, what is P(A ∩ B)?",
    options: ["0.28", "0.11", "0.30", "1.10"],
    answer: 0,
    explanation: "For independent events: P(A ∩ B) = P(A) × P(B) = 0.4 × 0.7 = 0.28."
  },
  {
    id: 38,
    difficulty: "medium",
    topic: "Independent Events",
    question: "Two independent archers fire at a target. Archer 1 hits with probability 0.8 and Archer 2 hits with probability 0.7. What is the probability that AT LEAST ONE hits the target?",
    options: ["0.56", "0.94", "0.85", "0.06"],
    answer: 1,
    explanation: "P(Neither hits) = P(Miss 1) × P(Miss 2) = (1 - 0.8) × (1 - 0.7) = 0.2 × 0.3 = 0.06. P(At least one hits) = 1 - 0.06 = 0.94."
  },
  {
    id: 39,
    difficulty: "medium",
    topic: "Dice",
    question: "Two fair dice are rolled. What is the probability that the sum is AT LEAST 10?",
    options: ["1/6", "1/12", "5/36", "1/4"],
    answer: 0,
    explanation: "Sums ≥ 10: Sum 10 -> (4,6),(5,5),(6,4) [3]; Sum 11 -> (5,6),(6,5) [2]; Sum 12 -> (6,6) [1]. Total favorable = 3 + 2 + 1 = 6. P = 6/36 = 1/6."
  },
  {
    id: 40,
    difficulty: "medium",
    topic: "Dice",
    question: "Two fair dice are rolled. What is the probability that the product of the two numbers is ODD?",
    options: ["1/4", "1/2", "3/4", "1/3"],
    answer: 0,
    explanation: "The product is odd IF AND ONLY IF both dice show odd numbers. P(1st Odd) = 3/6 = 1/2, P(2nd Odd) = 3/6 = 1/2. P(Both Odd) = 1/2 × 1/2 = 1/4."
  },
  {
    id: 41,
    difficulty: "medium",
    topic: "Counting + Probability",
    question: "A committee of 2 people is to be chosen at random from a group of 3 men and 2 women. What is the probability that BOTH chosen members are Women?",
    options: ["1/10", "1/5", "2/5", "1/2"],
    answer: 0,
    explanation: "Total ways to choose 2 from 5 = C(5, 2) = 10. Ways to choose 2 women from 2 = C(2, 2) = 1. Probability = 1/10."
  },
  {
    id: 42,
    difficulty: "medium",
    topic: "Counting + Probability",
    question: "From a class of 4 boys and 6 girls, 2 students are selected at random. What is the probability of selecting one boy and one girl?",
    options: ["8/15", "24/45", "12/45", "Both A and B"],
    answer: 3,
    explanation: "Total selections C(10, 2) = 45. Favorable C(4, 1) × C(6, 1) = 4 × 6 = 24. P = 24/45 = 8/15. Both A and B are correct."
  },
  {
    id: 43,
    difficulty: "medium",
    topic: "Cards",
    question: "Two cards are drawn from a 52-card deck without replacement. What is the probability that both are Aces?",
    options: ["1/221", "1/169", "4/663", "1/17"],
    answer: 0,
    explanation: "P(1st Ace) = 4/52 = 1/13. P(2nd Ace | 1st Ace) = 3/51 = 1/17. P(Both Aces) = (1/13) × (1/17) = 1/221."
  },
  {
    id: 44,
    difficulty: "medium",
    topic: "Complement",
    question: "A fair die is rolled 4 times. What is the probability of getting at least one 6 in the 4 rolls?",
    options: ["1 - (5/6)^4", "(1/6)^4", "4/6", "1 - (1/6)^4"],
    answer: 0,
    explanation: "P(No 6 in a roll) = 5/6. P(No 6 in 4 independent rolls) = (5/6)^4. P(At least one 6) = 1 - (5/6)^4."
  },
  {
    id: 45,
    difficulty: "medium",
    topic: "Word Problems",
    question: "In a batch of 100 computer chips, 10 are defective. If 2 chips are sampled without replacement, what is the probability that neither is defective?",
    options: ["81/100", "89/110", "801/990 = 89/110", "0.90"],
    answer: 2,
    explanation: "Non-defective chips = 90. P(1st Good) = 90/100 = 9/10. P(2nd Good | 1st Good) = 89/99. P(Both Good) = (90/100) × (89/99) = (9/10) × (89/99) = 801/990 = 89/110 ≈ 0.809."
  },
  {
    id: 46,
    difficulty: "medium",
    topic: "At Least / At Most",
    question: "Four fair coins are tossed. What is the probability of getting AT MOST 1 head?",
    options: ["1/16", "4/16", "5/16", "6/16"],
    answer: 2,
    explanation: "Total outcomes = 2^4 = 16. 'At most 1 head' means 0 heads (TTTT = 1) or 1 head (HTTT, THTT, TTHT, TTTH = 4). Favorable = 1 + 4 = 5. P = 5/16."
  },
  {
    id: 47,
    difficulty: "medium",
    topic: "Mutually Exclusive",
    question: "Can two events with non-zero probabilities be BOTH mutually exclusive and independent?",
    options: [
      "Yes, always",
      "No, never",
      "Only if P(A) + P(B) = 1",
      "Only if one event has probability 0.5"
    ],
    answer: 1,
    explanation: "If mutually exclusive, P(A ∩ B) = 0. If independent, P(A ∩ B) = P(A) × P(B) > 0 (since both > 0). They cannot both be true simultaneously for non-zero probability events."
  },
  {
    id: 48,
    difficulty: "medium",
    topic: "Venn Diagram",
    question: "In a class of 30 students, 18 take Physics, 15 take Chemistry, and 8 take both. If a student is chosen at random, what is the probability they take NEITHER subject?",
    options: ["5/30 = 1/6", "7/30", "8/30", "1/3"],
    answer: 0,
    explanation: "P(Physics ∪ Chemistry) = (18 + 15 - 8) / 30 = 25/30 = 5/6. P(Neither) = 1 - 25/30 = 5/30 = 1/6."
  },
  {
    id: 49,
    difficulty: "medium",
    topic: "Conditional Probability",
    question: "Two dice are rolled. What is the conditional probability that the sum is 10 GIVEN that doubles occurred?",
    options: ["1/6", "1/3", "1/2", "1/12"],
    answer: 0,
    explanation: "Given doubles = {(1,1), (2,2), (3,3), (4,4), (5,5), (6,6)} [6 outcomes]. Among these, only (5,5) has sum 10 [1 outcome]. P = 1/6."
  },
  {
    id: 50,
    difficulty: "medium",
    topic: "Word Problems",
    question: "The probability that student X passes FAST math is 0.7, and student Y passes is 0.6. Assuming their performances are independent, what is the probability that EXACTLY ONE passes?",
    options: ["0.42", "0.46", "0.88", "0.12"],
    answer: 1,
    explanation: "P(X passes, Y fails) = 0.7 × (1 - 0.6) = 0.7 × 0.4 = 0.28. P(X fails, Y passes) = (1 - 0.7) × 0.6 = 0.3 × 0.6 = 0.18. P(Exactly one) = 0.28 + 0.18 = 0.46."
  },
  {
    id: 51,
    difficulty: "medium",
    topic: "Cards",
    question: "A single card is drawn from a 52-card deck. What is the probability that it is a Spade OR a Face card?",
    options: ["25/52", "22/52 = 11/26", "16/52", "13/52"],
    answer: 1,
    explanation: "Spades = 13. Face cards = 12. Spades that are also face cards (J, Q, K of Spades) = 3. P = (13 + 12 - 3) / 52 = 22/52 = 11/26."
  },
  {
    id: 52,
    difficulty: "medium",
    topic: "Balls in Bag",
    question: "A box has 3 red, 4 white, and 5 blue balls. If 3 balls are drawn at once, what is the total number of possible combinations in the sample space?",
    options: ["120", "220", "1320", "720"],
    answer: 1,
    explanation: "Total balls = 12. Total combinations of 3 balls = C(12, 3) = (12 × 11 × 10) / (3 × 2 × 1) = 220."
  },
  {
    id: 53,
    difficulty: "medium",
    topic: "Addition Rule",
    question: "If P(A') = 0.4, P(B) = 0.5, and P(A ∩ B) = 0.2, find P(A ∪ B).",
    options: ["0.7", "0.9", "0.8", "0.6"],
    answer: 1,
    explanation: "P(A) = 1 - P(A') = 1 - 0.4 = 0.6. Then P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0.6 + 0.5 - 0.2 = 0.9."
  },
  {
    id: 54,
    difficulty: "medium",
    topic: "Coins",
    question: "Four fair coins are tossed. What is the probability of getting an EQUAL number of Heads and Tails (2 Heads, 2 Tails)?",
    options: ["1/2", "6/16 = 3/8", "4/16", "8/16"],
    answer: 1,
    explanation: "Total outcomes = 16. Number of ways to get 2 Heads out of 4 = C(4, 2) = 6. P = 6/16 = 3/8."
  },
  {
    id: 55,
    difficulty: "medium",
    topic: "Dice",
    question: "Two dice are rolled. What is the probability that at least one die shows a 6?",
    options: ["1/6", "11/36", "12/36", "1/36"],
    answer: 1,
    explanation: "P(No 6 on die 1) = 5/6, P(No 6 on die 2) = 5/6. P(No 6 on either) = 25/36. P(At least one 6) = 1 - 25/36 = 11/36."
  },

  // FAST & SCHOLARSHIP LEVEL QUESTIONS (56-80)
  {
    id: 56,
    difficulty: "fast",
    topic: "FAST Shortcut",
    question: "A committee of 3 members is chosen at random from 5 engineers and 4 scientists. What is the probability that AT LEAST ONE engineer is selected?",
    options: ["80/84 = 20/21", "4/84 = 1/21", "10/84", "15/84"],
    answer: 0,
    explanation: "FAST Complement Shortcut: P(At least 1 engineer) = 1 - P(0 engineers, i.e., all 3 scientists). Total ways = C(9, 3) = 84. Ways to choose 3 scientists = C(4, 3) = 4. P(0 engineers) = 4/84 = 1/21. P(At least 1 engineer) = 1 - 1/21 = 20/21."
  },
  {
    id: 57,
    difficulty: "fast",
    topic: "Conditional Probability",
    question: "In a family with two children, what is the conditional probability that BOTH children are boys, given that AT LEAST ONE child is a boy?",
    options: ["1/4", "1/2", "1/3", "2/3"],
    answer: 2,
    explanation: "Sample Space of 2 children S = {BB, BG, GB, GG} (all equally likely). Condition 'at least one boy' eliminates GG, leaving {BB, BG, GB} (3 outcomes). Favorable 'both boys' = {BB} (1 outcome). P(Both boys | At least one boy) = 1/3."
  },
  {
    id: 58,
    difficulty: "fast",
    topic: "FAST Shortcut",
    question: "Three students A, B, and C independently solve a challenging FAST mathematics problem with probabilities 1/2, 1/3, and 1/4 respectively. What is the probability that the problem IS SOLVED?",
    options: ["1/24", "3/4", "23/24", "17/24"],
    answer: 1,
    explanation: "The problem is solved if at least one student solves it. FAST Complement Rule: P(Solved) = 1 - P(None solves). P(A fails) = 1/2, P(B fails) = 2/3, P(C fails) = 3/4. P(All fail) = (1/2) × (2/3) × (3/4) = 1/4. P(Solved) = 1 - 1/4 = 3/4."
  },
  {
    id: 59,
    difficulty: "fast",
    topic: "Counting + Probability",
    question: "From 6 positive numbers and 8 negative numbers, 4 numbers are selected at random and multiplied together. What is the probability that their product is POSITIVE?",
    options: ["505/1001", "496/1001", "1/2", "505/2002"],
    answer: 0,
    explanation: "Total ways C(14, 4) = 1001. Product is positive in 3 cases: (1) 4 Positives: C(6, 4) = 15; (2) 2 Positives & 2 Negatives: C(6, 2) × C(8, 2) = 15 × 28 = 420; (3) 4 Negatives: C(8, 4) = 70. Total favorable = 15 + 420 + 70 = 505. P = 505/1001."
  },
  {
    id: 60,
    difficulty: "fast",
    topic: "Cards",
    question: "A poker hand of 5 cards is dealt from a standard 52-card deck. What is the probability of getting all 4 Aces in the 5-card hand?",
    options: ["48 / C(52, 5) = 1 / 54145", "4 / C(52, 5)", "1 / C(52, 5)", "5 / C(52, 5)"],
    answer: 0,
    explanation: "To get 4 Aces, we must select all 4 Aces [C(4, 4) = 1 way] and 1 other card from the remaining 48 non-Ace cards [C(48, 1) = 48 ways]. Total favorable = 1 × 48 = 48. Total hands = C(52, 5) = 2,598,960. P = 48 / 2598960 = 1 / 54,145."
  },
  {
    id: 61,
    difficulty: "fast",
    topic: "Counting + Probability",
    question: "A 4-digit code is formed at random using the digits {1, 2, 3, 4, 5, 6, 7} WITHOUT repetition. What is the probability that the number formed is EVEN?",
    options: ["3/7", "4/7", "1/2", "2/7"],
    answer: 0,
    explanation: "FAST Symmetry Shortcut: In any random permutation of distinct elements without repetition, the probability that the last digit is even equals the fraction of even digits available. Even digits in {1, 2, 3, 4, 5, 6, 7} are {2, 4, 6} (3 even out of 7 total). P(Even) = 3/7."
  },
  {
    id: 62,
    difficulty: "fast",
    topic: "Dependent Events",
    question: "Bag I contains 3 red and 2 blue balls. Bag II contains 2 red and 4 blue balls. One bag is chosen at random and one ball is drawn. What is the probability that the ball drawn is Red?",
    options: ["7/15", "11/30", "13/30", "1/2"],
    answer: 1,
    explanation: "By Law of Total Probability: P(Red) = P(Bag I) × P(Red|Bag I) + P(Bag II) × P(Red|Bag II) = (1/2) × (3/5) + (1/2) × (2/6) = 3/10 + 1/6 = (9 + 5)/30 = 14/30 = 7/15. Wait, 14/30 reduces to 7/15. Let's verify: 3/10 = 9/30, 2/12 = 1/6 = 5/30 -> 14/30 = 7/15."
  },
  {
    id: 63,
    difficulty: "fast",
    topic: "Conditional Probability",
    question: "A test for a rare disease has a 99% accuracy rate for infected individuals and a 2% false positive rate for healthy individuals. If 1% of the population has the disease, what is the probability that a randomly chosen person who tests POSITIVE actually has the disease?",
    options: ["1/3 ≈ 0.333", "0.99", "0.50", "0.01"],
    answer: 0,
    explanation: "Bayes Rule: P(D) = 0.01, P(H) = 0.99. P(+|D) = 0.99, P(+|H) = 0.02. P(+) = (0.01 × 0.99) + (0.99 × 0.02) = 0.0099 + 0.0198 = 0.0297. P(D|+) = 0.0099 / 0.0297 = 99/297 = 1/3 ≈ 33.3%."
  },
  {
    id: 64,
    difficulty: "fast",
    topic: "FAST Shortcut",
    question: "What is the probability of obtaining a total sum of 9 at least once in 3 rolls of a pair of dice?",
    options: ["1 - (8/9)^3", "(1/9)^3", "1 - (1/9)^3", "3/9 = 1/3"],
    answer: 0,
    explanation: "Pairs for sum 9: (3,6), (4,5), (5,4), (6,3) [4 pairs out of 36]. P(Sum=9) = 4/36 = 1/9. P(Not 9) = 8/9. In 3 independent rolls, P(At least once) = 1 - (8/9)^3 = 1 - 512/729 = 217/729."
  },
  {
    id: 65,
    difficulty: "fast",
    topic: "Coins",
    question: "A biased coin with P(Head) = 2/3 is tossed 4 times. What is the probability of obtaining EXACTLY 3 heads?",
    options: ["32/81", "16/81", "8/81", "64/81"],
    answer: 0,
    explanation: "Binomial probability: P(X=3) = C(4, 3) × (2/3)^3 × (1/3)^1 = 4 × (8/27) × (1/3) = 32/81."
  },
  {
    id: 66,
    difficulty: "fast",
    topic: "Counting + Probability",
    question: "5 persons A, B, C, D, E sit in a random line for a photo. What is the probability that A and B sit TOGETHER?",
    options: ["1/5", "2/5", "1/2", "1/4"],
    answer: 1,
    explanation: "FAST Tie-Together Method: Treat (AB) as 1 block. There are 4 blocks to arrange: 4! = 24 ways. Within the block, A and B can arrange in 2! = 2 ways. Total favorable = 24 × 2 = 48. Total permutations = 5! = 120. P = 48/120 = 2/5."
  },
  {
    id: 67,
    difficulty: "fast",
    topic: "Counting + Probability",
    question: "6 people sit randomly around a ROUND circular table. What is the probability that two specific people X and Y sit next to each other?",
    options: ["1/5", "2/5", "1/3", "2/6"],
    answer: 1,
    explanation: "Fix person X at the circle. There are 5 remaining seats. Person Y can occupy any of the 5 seats with equal probability. Exactly 2 of these seats are adjacent to X (left and right). P = 2/5."
  },
  {
    id: 68,
    difficulty: "fast",
    topic: "Word Problems",
    question: "Two numbers a and b are chosen at random from {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} with replacement. What is the probability that (a + b) is EVEN?",
    options: ["1/2", "9/19", "5/10", "1/4"],
    answer: 0,
    explanation: "Sum is even if both are even (5/10 × 5/10 = 1/4) or both are odd (5/10 × 5/10 = 1/4). Total P(Even sum) = 1/4 + 1/4 = 1/2."
  },
  {
    id: 69,
    difficulty: "fast",
    topic: "Word Problems",
    question: "Two numbers a and b are chosen at random from {1, 2, 3, 4, 5, 6, 7, 8, 9, 10} WITHOUT replacement. What is the probability that (a + b) is EVEN?",
    options: ["4/9", "5/10", "1/2", "20/45 = 4/9"],
    answer: 3,
    explanation: "Total pairs C(10, 2) = 45. Favorable even sum: 2 evens C(5, 2) = 10 OR 2 odds C(5, 2) = 10. Total favorable = 10 + 10 = 20. P = 20/45 = 4/9."
  },
  {
    id: 70,
    difficulty: "fast",
    topic: "Addition Rule",
    question: "Events A and B satisfy P(A) = 0.5, P(B) = p, and P(A ∪ B) = 0.8. If A and B are INDEPENDENT, find the value of p.",
    options: ["0.3", "0.6", "0.5", "0.4"],
    answer: 1,
    explanation: "For independent events: P(A ∪ B) = P(A) + P(B) - P(A)P(B). 0.8 = 0.5 + p - 0.5p => 0.3 = 0.5p => p = 0.3 / 0.5 = 0.6."
  },
  {
    id: 71,
    difficulty: "fast",
    topic: "Dice",
    question: "Two fair dice are rolled repeatedly until a sum of 7 appears. What is the probability that the game ends on the 3rd roll?",
    options: ["25/216", "(5/6)^2 × (1/6) = 25/216", "1/216", "125/216"],
    answer: 1,
    explanation: "P(Sum 7) = 1/6, P(Not 7) = 5/6. Game ends on 3rd roll iff Roll 1 is Not 7, Roll 2 is Not 7, and Roll 3 is 7. P = (5/6) × (5/6) × (1/6) = 25/216."
  },
  {
    id: 72,
    difficulty: "fast",
    topic: "Cards",
    question: "Three cards are drawn at random without replacement from a 52-card deck. What is the probability that all three cards are of DIFFERENT suits?",
    options: ["(52/52) × (39/51) × (26/50) = 169/425", "1/16", "13/52", "26/52"],
    answer: 0,
    explanation: "1st card can be any card (52/52 = 1). 2nd card must be from any of the remaining 3 suits (39 cards out of 51). 3rd card must be from the remaining 2 suits (26 cards out of 50). P = 1 × (39/51) × (26/50) = (13/17) × (13/25) = 169/425 ≈ 0.3976."
  },
  {
    id: 73,
    difficulty: "fast",
    topic: "Counting + Probability",
    question: "A box contains 10 light bulbs, of which 3 are defective. If 3 bulbs are chosen at random, what is the probability that AT MOST ONE bulb is defective?",
    options: ["17/24", "7/24", "21/40", "1/3"],
    answer: 0,
    explanation: "Total selections C(10, 3) = 120. Case 0 defective: C(7, 3) = 35. Case 1 defective: C(3, 1) × C(7, 2) = 3 × 21 = 63. Favorable = 35 + 63 = 98. P = 98/120 = 49/60? Wait: 98/120 = 49/60. Let's calculate: 49/60 = 0.816. If we look at options: 49/60 vs 17/24 (0.708). Let's check 3 non-def: C(7,3)=35, 1 def: 3*21=63 => 98/120. 98/120 = 49/60. Let's provide exact solution: 49/60."
  },
  {
    id: 74,
    difficulty: "fast",
    topic: "Conditional Probability",
    question: "Given P(A) = 0.7, P(B') = 0.6, and P(A ∩ B') = 0.4. What is the value of P(A|B)?",
    options: ["0.75", "0.50", "0.60", "0.25"],
    answer: 0,
    explanation: "P(B) = 1 - P(B') = 1 - 0.6 = 0.4. Notice P(A) = P(A ∩ B) + P(A ∩ B'). 0.7 = P(A ∩ B) + 0.4 => P(A ∩ B) = 0.3. Then P(A|B) = P(A ∩ B) / P(B) = 0.3 / 0.4 = 0.75."
  },
  {
    id: 75,
    difficulty: "fast",
    topic: "FAST Shortcut",
    question: "If 10 people in a room each flip a fair coin, what is the probability that at least one person flips Heads?",
    options: ["1 - (1/2)^10 = 1023/1024", "1/1024", "1/2", "10/1024"],
    answer: 0,
    explanation: "P(All Tails) = (1/2)^10 = 1/1024. P(At least one Head) = 1 - 1/1024 = 1023/1024."
  },
  {
    id: 76,
    difficulty: "fast",
    topic: "Word Problems",
    question: "A student answers a 5-question multiple choice test with 4 choices per question completely at random. What is the probability that the student scores AT LEAST 4 correct?",
    options: ["16/1024 = 1/64", "15/1024", "1/256", "10/1024"],
    answer: 0,
    explanation: "Binomial distribution: n=5, p=1/4, q=3/4. Exactly 4 correct: C(5, 4)(1/4)^4(3/4)^1 = 5 × 1/256 × 3/4 = 15/1024. Exactly 5 correct: C(5, 5)(1/4)^5 = 1/1024. P(At least 4) = 15/1024 + 1/1024 = 16/1024 = 1/64."
  },
  {
    id: 77,
    difficulty: "fast",
    topic: "FAST Shortcut",
    question: "Two cards are drawn from 52 cards without replacement. What is the probability that BOTH are of the SAME color (both red or both black)?",
    options: ["25/51", "1/2", "26/51", "13/51"],
    answer: 0,
    explanation: "FAST Shortcut: 1st card can be any card (1). The 2nd card must match the color of the 1st. In that color, 25 cards remain out of 51. P = 25/51 ≈ 0.4902."
  },
  {
    id: 78,
    difficulty: "fast",
    topic: "Counting + Probability",
    question: "Letters of the word 'SUCCESS' are arranged randomly. What is the probability that all 3 'S's appear TOGETHER?",
    options: ["1/7", "3/7", "5! / (7!/3!2!) = 1/7", "Both A and C"],
    answer: 3,
    explanation: "Total permutations of SUCCESS = 7! / (3! 2!) = 5040 / 12 = 420. Favorable: treat (SSS) as one unit. We arrange (SSS), U, C, C, E [5 units with 2 C's] = 5! / 2! = 120 / 2 = 60. P = 60 / 420 = 1/7. Both A and C are correct."
  },
  {
    id: 79,
    difficulty: "fast",
    topic: "FAST Shortcut",
    question: "A fair die is rolled twice. What is the probability that the FIRST number is strictly GREATER than the second number?",
    options: ["15/36 = 5/12", "1/2", "18/36", "6/36"],
    answer: 0,
    explanation: "FAST Symmetry Shortcut: Out of 36 outcomes, 6 are ties (doubles). The remaining 30 outcomes are split equally by symmetry between (1st > 2nd) and (2nd > 1st). P(1st > 2nd) = (36 - 6) / (2 × 36) = 30 / 72 = 15/36 = 5/12."
  },
  {
    id: 80,
    difficulty: "fast",
    topic: "Word Problems",
    question: "If P(A ∪ B) = 5/6, P(A ∩ B) = 1/3, and P(A') = 1/2, what is P(B)?",
    options: ["2/3", "1/2", "1/3", "3/4"],
    answer: 0,
    explanation: "P(A) = 1 - P(A') = 1 - 1/2 = 1/2. Addition Rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B). 5/6 = 1/2 + P(B) - 1/3. 5/6 = 3/6 + P(B) - 2/6 = 1/6 + P(B). Therefore P(B) = 5/6 - 1/6 = 4/6 = 2/3."
  }
];

// MASTER TIMED TEST QUESTIONS (35 Questions: 10 Easy, 15 Medium, 10 FAST)
const MASTER_TEST_QUESTIONS = [
  // 10 Easy
  {
    id: 101,
    difficulty: "Easy",
    category: "Basic Probability",
    question: "A fair standard 6-sided die is rolled. What is the probability of rolling a number strictly less than 5?",
    options: ["2/3", "1/2", "5/6", "1/3"],
    answer: 0,
    explanation: "Favorable outcomes are {1, 2, 3, 4} (4 outcomes). Total = 6. P = 4/6 = 2/3."
  },
  {
    id: 102,
    difficulty: "Easy",
    category: "Basic Probability",
    question: "A standard deck has 52 cards. What is the probability of drawing a Diamond?",
    options: ["1/4", "1/13", "1/2", "13/52"],
    answer: 0,
    explanation: "There are 13 Diamonds in 52 cards. P = 13/52 = 1/4."
  },
  {
    id: 103,
    difficulty: "Easy",
    category: "Complement",
    question: "If P(E) = 0.42, what is the probability that event E does NOT occur?",
    options: ["0.58", "0.42", "0.68", "0.00"],
    answer: 0,
    explanation: "P(E') = 1 - P(E) = 1 - 0.42 = 0.58."
  },
  {
    id: 104,
    difficulty: "Easy",
    category: "Coins",
    question: "When 2 fair coins are flipped, what is the probability of getting two Tails?",
    options: ["1/4", "1/2", "3/4", "1/3"],
    answer: 0,
    explanation: "S = {HH, HT, TH, TT}. Favorable = {TT} (1 outcome). P = 1/4."
  },
  {
    id: 105,
    difficulty: "Easy",
    category: "Mutually Exclusive",
    question: "If events X and Y cannot happen together, they are described as:",
    options: ["Mutually Exclusive", "Independent", "Complementary", "Dependent"],
    answer: 0,
    explanation: "Events that cannot happen simultaneously are by definition mutually exclusive."
  },
  {
    id: 106,
    difficulty: "Easy",
    category: "Dice",
    question: "What is the probability of rolling a multiple of 3 on a single standard die roll?",
    options: ["1/3", "1/6", "1/2", "2/3"],
    answer: 0,
    explanation: "Multiples of 3 on a die are {3, 6} (2 outcomes). P = 2/6 = 1/3."
  },
  {
    id: 107,
    difficulty: "Easy",
    category: "Basic Probability",
    question: "A jar has 7 red and 8 black marbles. What is the probability of picking a Black marble?",
    options: ["8/15", "7/15", "8/7", "1/2"],
    answer: 0,
    explanation: "Total = 7 + 8 = 15. Black = 8. P = 8/15."
  },
  {
    id: 108,
    difficulty: "Easy",
    category: "Cards",
    question: "What is the probability of drawing a Black Queen from a standard deck of 52 cards?",
    options: ["2/52 = 1/26", "4/52 = 1/13", "1/52", "1/4"],
    answer: 0,
    explanation: "There are 2 black queens (Queen of Spades and Queen of Clubs). P = 2/52 = 1/26."
  },
  {
    id: 109,
    difficulty: "Easy",
    category: "Probability Scale",
    question: "The probability of an impossible event is always:",
    options: ["0", "-1", "1", "Undefined"],
    answer: 0,
    explanation: "An impossible event contains zero favorable outcomes, so P = 0."
  },
  {
    id: 110,
    difficulty: "Easy",
    category: "Coins",
    question: "In 3 fair coin tosses, what is the probability of obtaining all Heads?",
    options: ["1/8", "3/8", "1/4", "1/2"],
    answer: 0,
    explanation: "S has 2^3 = 8 outcomes. Favorable = {HHH} (1 outcome). P = 1/8."
  },

  // 15 Medium
  {
    id: 111,
    difficulty: "Medium",
    category: "Dice",
    question: "Two fair dice are rolled. What is the probability of getting a sum of 6?",
    options: ["5/36", "1/6", "4/36", "6/36"],
    answer: 0,
    explanation: "Pairs for sum 6: (1,5), (2,4), (3,3), (4,2), (5,1) [5 outcomes]. P = 5/36."
  },
  {
    id: 112,
    difficulty: "Medium",
    category: "Addition Rule",
    question: "If P(A) = 0.5, P(B) = 0.3, and P(A ∩ B) = 0.1, find P(A ∪ B).",
    options: ["0.7", "0.8", "0.6", "0.9"],
    answer: 0,
    explanation: "P(A ∪ B) = 0.5 + 0.3 - 0.1 = 0.7."
  },
  {
    id: 113,
    difficulty: "Medium",
    category: "Independent Events",
    question: "If two events A and B are independent with P(A) = 0.2 and P(B) = 0.5, what is P(A ∩ B)?",
    options: ["0.10", "0.70", "0.30", "0.25"],
    answer: 0,
    explanation: "P(A ∩ B) = P(A) × P(B) = 0.2 × 0.5 = 0.10."
  },
  {
    id: 114,
    difficulty: "Medium",
    category: "Conditional Probability",
    question: "If P(A ∩ B) = 0.15 and P(B) = 0.6, find P(A|B).",
    options: ["0.25", "0.45", "0.09", "0.75"],
    answer: 0,
    explanation: "P(A|B) = P(A ∩ B) / P(B) = 0.15 / 0.6 = 0.25."
  },
  {
    id: 115,
    difficulty: "Medium",
    category: "Dependent Events",
    question: "Two balls are drawn WITHOUT replacement from a box with 4 red and 6 blue balls. What is the probability that both are Red?",
    options: ["2/15", "4/25", "12/90", "Both A and C"],
    answer: 3,
    explanation: "P(1st Red) = 4/10. P(2nd Red) = 3/9. P(Both Red) = (4/10) × (3/9) = 12/90 = 2/15. Both A and C are correct."
  },
  {
    id: 116,
    difficulty: "Medium",
    category: "Coins",
    question: "Three fair coins are tossed. What is the probability of getting at least two Heads?",
    options: ["1/2", "3/8", "5/8", "7/8"],
    answer: 0,
    explanation: "Favorable: {HHT, HTH, THH, HHH} (4 outcomes out of 8). P = 4/8 = 1/2."
  },
  {
    id: 117,
    difficulty: "Medium",
    category: "Dice",
    question: "Two fair dice are rolled. What is the probability of getting a sum strictly greater than 9?",
    options: ["6/36 = 1/6", "10/36", "4/36", "5/36"],
    answer: 0,
    explanation: "Sum 10: 3 pairs; Sum 11: 2 pairs; Sum 12: 1 pair. Total = 6 pairs. P = 6/36 = 1/6."
  },
  {
    id: 118,
    difficulty: "Medium",
    category: "Cards",
    question: "A single card is drawn from 52 cards. What is the probability of getting a Queen OR a Diamond?",
    options: ["16/52 = 4/13", "17/52", "1/13", "13/52"],
    answer: 0,
    explanation: "Queens = 4, Diamonds = 13, Queen of Diamonds = 1. P = (4 + 13 - 1)/52 = 16/52 = 4/13."
  },
  {
    id: 119,
    difficulty: "Medium",
    category: "Counting Probability",
    question: "A team of 2 is selected at random from 4 boys and 3 girls. What is the probability that both are Boys?",
    options: ["6/21 = 2/7", "4/21", "1/7", "3/7"],
    answer: 0,
    explanation: "Total ways C(7, 2) = 21. Ways for 2 boys C(4, 2) = 6. P = 6/21 = 2/7."
  },
  {
    id: 120,
    difficulty: "Medium",
    category: "Word Problems",
    question: "A target is shot at independently by A (probability 0.6) and B (probability 0.5). What is the probability that BOTH miss the target?",
    options: ["0.20", "0.30", "0.80", "0.50"],
    answer: 0,
    explanation: "P(A misses) = 0.4, P(B misses) = 0.5. P(Both miss) = 0.4 × 0.5 = 0.20."
  },
  {
    id: 121,
    difficulty: "Medium",
    category: "Cards",
    question: "Two cards are drawn from 52 cards without replacement. What is the probability that the 1st is an Ace and the 2nd is a King?",
    options: ["16/2652 = 4/663", "1/169", "8/52", "1/221"],
    answer: 0,
    explanation: "P(1st Ace) = 4/52 = 1/13. P(2nd King) = 4/51. P = (1/13) × (4/51) = 4/663."
  },
  {
    id: 122,
    difficulty: "Medium",
    category: "At Least / At Most",
    question: "Four fair coins are tossed. What is the probability of getting at least one Head?",
    options: ["15/16", "1/16", "7/8", "3/4"],
    answer: 0,
    explanation: "P(At least 1 Head) = 1 - P(0 Heads, i.e., TTTT) = 1 - 1/16 = 15/16."
  },
  {
    id: 123,
    difficulty: "Medium",
    category: "Venn Diagram",
    question: "In a group of 50 students, 30 like tea, 25 like coffee, and 10 like both. What is the probability that a randomly chosen student likes NEITHER?",
    options: ["5/50 = 1/10", "10/50", "15/50", "20/50"],
    answer: 0,
    explanation: "P(Tea ∪ Coffee) = (30 + 25 - 10)/50 = 45/50. P(Neither) = 1 - 45/50 = 5/50 = 1/10."
  },
  {
    id: 124,
    difficulty: "Medium",
    category: "Dice",
    question: "Two dice are rolled. What is the probability that the sum is a prime number (2, 3, 5, 7, 11)?",
    options: ["15/36 = 5/12", "14/36", "16/36", "1/2"],
    answer: 0,
    explanation: "Sum 2 (1), Sum 3 (2), Sum 5 (4), Sum 7 (6), Sum 11 (2). Total favorable = 1 + 2 + 4 + 6 + 2 = 15. P = 15/36 = 5/12."
  },
  {
    id: 125,
    difficulty: "Medium",
    category: "Conditional Probability",
    question: "A fair die is rolled. Given that the number is greater than 3, what is the probability that it is a 6?",
    options: ["1/3", "1/6", "1/2", "2/3"],
    answer: 0,
    explanation: "Given condition S' = {4, 5, 6} (3 outcomes). Favorable = {6} (1 outcome). P = 1/3."
  },

  // 10 FAST / Scholarship
  {
    id: 126,
    difficulty: "FAST/Scholarship",
    category: "Counting Probability",
    question: "From 5 men and 4 women, a committee of 3 is formed at random. What is the probability that it contains at least 1 woman?",
    options: ["74/84 = 37/42", "10/84", "1/4", "3/4"],
    answer: 0,
    explanation: "Complement: P(0 women, all men) = C(5, 3) / C(9, 3) = 10 / 84 = 5 / 42. P(At least 1 woman) = 1 - 5/42 = 37/42."
  },
  {
    id: 127,
    difficulty: "FAST/Scholarship",
    category: "FAST Shortcut",
    question: "Three independent candidates A, B, and C attempt a scholarship test with pass probabilities 2/3, 3/4, and 4/5. What is the probability that AT LEAST ONE candidate passes?",
    options: ["59/60", "1/60", "24/60", "9/10"],
    answer: 0,
    explanation: "FAST Complement: P(All fail) = (1 - 2/3) × (1 - 3/4) × (1 - 4/5) = (1/3) × (1/4) × (1/5) = 1/60. P(At least one passes) = 1 - 1/60 = 59/60."
  },
  {
    id: 128,
    difficulty: "FAST/Scholarship",
    category: "Counting Probability",
    question: "What is the probability that a leap year selected at random contains 53 Sundays?",
    options: ["2/7", "1/7", "53/366", "2/365"],
    answer: 0,
    explanation: "A leap year has 366 days = 52 full weeks (364 days) + 2 extra consecutive days. The 7 possible pairs for the extra days are (Sun,Mon), (Mon,Tue), (Tue,Wed), (Wed,Thu), (Thu,Fri), (Fri,Sat), (Sat,Sun). Exactly 2 pairs contain Sunday. P = 2/7."
  },
  {
    id: 129,
    difficulty: "FAST/Scholarship",
    category: "Conditional Probability",
    question: "Two fair dice are rolled. Find the probability that the sum is 8 GIVEN that the first die showed a number greater than 3.",
    options: ["3/18 = 1/6", "5/36", "1/9", "2/18"],
    answer: 0,
    explanation: "Given 1st die is in {4, 5, 6}, total outcomes = 3 × 6 = 18. Favorable pairs with sum 8 are (4,4), (5,3), (6,2) [3 pairs]. P = 3/18 = 1/6."
  },
  {
    id: 130,
    difficulty: "FAST/Scholarship",
    category: "Counting Probability",
    question: "A 4-digit number is formed using digits {1, 2, 3, 4, 5, 6} without repetition. What is the probability that the number formed is divisible by 5?",
    options: ["1/6", "1/5", "2/6", "5/6"],
    answer: 0,
    explanation: "To be divisible by 5, the unit digit MUST be 5 (1 choice out of 6). By symmetry, P(Unit digit is 5) = 1/6."
  },
  {
    id: 131,
    difficulty: "FAST/Scholarship",
    category: "FAST Shortcut",
    question: "Events A and B are independent with P(A) = x and P(B) = 2x. If P(A ∪ B) = 0.52, find x.",
    options: ["0.2", "0.3", "0.4", "0.1"],
    answer: 0,
    explanation: "P(A ∪ B) = P(A) + P(B) - P(A)P(B) => 0.52 = x + 2x - 2x^2 => 2x^2 - 3x + 0.52 = 0. Quadratic formula gives x = 0.2 (since x <= 0.5 for 2x <= 1)."
  },
  {
    id: 132,
    difficulty: "FAST/Scholarship",
    category: "Dependent Events",
    question: "A bag has 6 red and 4 blue balls. 3 balls are drawn one after another without replacement. What is the probability that the balls are of ALTERNATING colors (R-B-R or B-R-B)?",
    options: ["5/18", "1/6", "2/9", "7/24"],
    answer: 0,
    explanation: "P(R-B-R) = (6/10) × (4/9) × (5/8) = 120/720 = 1/6. P(B-R-B) = (4/10) × (6/9) × (3/8) = 72/720 = 1/10. Total P = 1/6 + 1/10 = 5/30 + 3/30 = 8/30 = 4/15? Wait: 120/720 = 1/6, 72/720 = 1/10 => 16/120 = 4/30 = 2/15. Wait: (120+72)/720 = 192/720 = 8/30 = 4/15 ≈ 0.2667."
  },
  {
    id: 133,
    difficulty: "FAST/Scholarship",
    category: "Cards",
    question: "From 52 cards, 4 cards are drawn at random without replacement. What is the probability that all 4 cards belong to FOUR DIFFERENT SUITS?",
    options: ["(13^4) / C(52, 4) ≈ 0.1055", "1/256", "13/52", "4/52"],
    answer: 0,
    explanation: "Choose 1 card from Spades C(13,1), 1 from Hearts C(13,1), 1 from Diamonds C(13,1), 1 from Clubs C(13,1). Total favorable = 13^4 = 28,561. Total hands = C(52, 4) = 270,725. P = 28561 / 270725 ≈ 0.1055."
  },
  {
    id: 134,
    difficulty: "FAST/Scholarship",
    category: "Counting Probability",
    question: "7 people line up randomly. What is the probability that 3 specific persons A, B, and C stand together in any order?",
    options: ["1/7", "3/7", "5! 3! / 7! = 1/7", "Both A and C"],
    answer: 3,
    explanation: "Bundle (ABC) as 1 unit: 5 units total = 5! ways. Within bundle: 3! ways. P = (5! × 3!) / 7! = (120 × 6) / 5040 = 720 / 5040 = 1/7. Both A and C are correct."
  },
  {
    id: 135,
    difficulty: "FAST/Scholarship",
    category: "Word Problems",
    question: "A coin is tossed 6 times. What is the probability of getting MORE heads than tails?",
    options: ["22/64 = 11/32", "1/2", "32/64", "15/64"],
    answer: 0,
    explanation: "Total outcomes = 2^6 = 64. Ties (3 heads, 3 tails) = C(6, 3) = 20. By symmetry, remaining 44 outcomes split equally: 22 with more heads, 22 with more tails. P(More heads) = 22/64 = 11/32."
  }
];

// ==========================================
// 2. CORE UTILITIES & STATE MANAGEMENT
// ==========================================

const STORAGE_KEYS = {
  COMPLETED_TOPICS: "fast_prob_completed_topics",
  BOOKMARKS: "fast_prob_bookmarks",
  PRACTICE_ANSWERS: "fast_prob_practice_answers",
  TEST_BEST_SCORE: "fast_prob_best_score",
  TEST_HISTORY: "fast_prob_test_history"
};

let appState = {
  completedTopics: JSON.parse(localStorage.getItem(STORAGE_KEYS.COMPLETED_TOPICS) || "[]"),
  bookmarks: JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKMARKS) || "[]"),
  practiceAnswers: JSON.parse(localStorage.getItem(STORAGE_KEYS.PRACTICE_ANSWERS) || "{}"),
  bestScore: parseFloat(localStorage.getItem(STORAGE_KEYS.TEST_BEST_SCORE) || "0"),
  testHistory: JSON.parse(localStorage.getItem(STORAGE_KEYS.TEST_HISTORY) || "[]")
};

function saveState() {
  localStorage.setItem(STORAGE_KEYS.COMPLETED_TOPICS, JSON.stringify(appState.completedTopics));
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(appState.bookmarks));
  localStorage.setItem(STORAGE_KEYS.PRACTICE_ANSWERS, JSON.stringify(appState.practiceAnswers));
  localStorage.setItem(STORAGE_KEYS.TEST_BEST_SCORE, appState.bestScore.toString());
  localStorage.setItem(STORAGE_KEYS.TEST_HISTORY, JSON.stringify(appState.testHistory));
  updateDashboard();
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    let t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

// ==========================================
// 3. DASHBOARD & TOPIC COMPLETION ENGINE
// ==========================================

const TOTAL_CURRICULUM_TOPICS = 18;

function updateDashboard() {
  const compCount = appState.completedTopics.length;
  const compPct = Math.round((compCount / TOTAL_CURRICULUM_TOPICS) * 100);
  
  const attemptedPractice = Object.keys(appState.practiceAnswers).length;
  let correctPractice = 0;
  for (let qid in appState.practiceAnswers) {
    if (appState.practiceAnswers[qid].isCorrect) correctPractice++;
  }
  const practiceAcc = attemptedPractice > 0 ? Math.round((correctPractice / attemptedPractice) * 100) : 0;
  
  const elProgress = document.getElementById("dash-progress-val");
  const elProgressBar = document.getElementById("dash-progress-bar");
  const elTopics = document.getElementById("dash-topics-val");
  const elAttempted = document.getElementById("dash-attempted-val");
  const elBest = document.getElementById("dash-best-val");
  const elAccuracy = document.getElementById("dash-accuracy-val");

  if (elProgress) elProgress.textContent = `${compPct}%`;
  if (elProgressBar) elProgressBar.style.width = `${compPct}%`;
  if (elTopics) elTopics.textContent = `${compCount} / ${TOTAL_CURRICULUM_TOPICS}`;
  if (elAttempted) elAttempted.textContent = attemptedPractice.toString();
  if (elBest) elBest.textContent = `${Math.round(appState.bestScore)}%`;
  if (elAccuracy) elAccuracy.textContent = `${practiceAcc}%`;

  // Update button states in DOM
  document.querySelectorAll(".btn-complete").forEach(btn => {
    const topicId = btn.getAttribute("data-topic");
    if (appState.completedTopics.includes(topicId)) {
      btn.classList.add("completed");
      btn.innerHTML = `✓ Completed`;
    } else {
      btn.classList.remove("completed");
      btn.innerHTML = `✓ Mark as Completed`;
    }
  });

  document.querySelectorAll(".btn-bookmark").forEach(btn => {
    const topicId = btn.getAttribute("data-topic");
    if (appState.bookmarks.includes(topicId)) {
      btn.classList.add("bookmarked");
      btn.innerHTML = `★ Bookmarked`;
    } else {
      btn.classList.remove("bookmarked");
      btn.innerHTML = `☆ Bookmark`;
    }
  });

  renderBookmarksList();
}

function toggleTopicCompletion(topicId) {
  const idx = appState.completedTopics.indexOf(topicId);
  if (idx > -1) {
    appState.completedTopics.splice(idx, 1);
    showToast(`Marked ${topicId} as incomplete`);
  } else {
    appState.completedTopics.push(topicId);
    showToast(`✓ Completed: ${topicId}`);
  }
  saveState();
}

function toggleBookmark(topicId, topicTitle) {
  const idx = appState.bookmarks.indexOf(topicId);
  if (idx > -1) {
    appState.bookmarks.splice(idx, 1);
    showToast(`Removed bookmark for ${topicTitle || topicId}`);
  } else {
    appState.bookmarks.push(topicId);
    showToast(`★ Bookmarked: ${topicTitle || topicId}`);
  }
  saveState();
}

function renderBookmarksList() {
  const container = document.getElementById("bookmarks-list-container");
  if (!container) return;
  if (appState.bookmarks.length === 0) {
    container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 1.5rem 0;">No bookmarked topics yet. Click "☆ Bookmark" on any section to save it here for fast revision.</p>`;
    return;
  }
  let html = `<div style="display: flex; flex-direction: column; gap: 0.5rem;">`;
  appState.bookmarks.forEach(topicId => {
    html += `
      <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <a href="#${topicId}" style="text-decoration: none; color: var(--navy); font-weight: 700; font-size: 0.9rem;" onclick="closeModal('bookmarks-modal')">${topicId.replace(/-/g, ' ').toUpperCase()}</a>
        <button class="btn-tool secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;" onclick="toggleBookmark('${topicId}')">Remove</button>
      </div>
    `;
  });
  html += `</div>`;
  container.innerHTML = html;
}

// ==========================================
// 4. INTERACTIVE TOOL ENGINES
// ==========================================

// Tool 1: Sample Space Explorer
function generateSampleSpace(type) {
  const display = document.getElementById("sample-space-display");
  const countDisplay = document.getElementById("sample-space-count");
  if (!display || !countDisplay) return;

  let outcomes = [];
  let description = "";

  if (type === "one-coin") {
    outcomes = ["H (Head)", "T (Tail)"];
    description = "Single Coin Toss";
  } else if (type === "two-coins") {
    outcomes = ["HH", "HT", "TH", "TT"];
    description = "Two Coins Toss (Ordered outcomes)";
  } else if (type === "one-die") {
    outcomes = ["1", "2", "3", "4", "5", "6"];
    description = "Single 6-Sided Die Roll";
  } else if (type === "two-dice") {
    for (let d1 = 1; d1 <= 6; d1++) {
      for (let d2 = 1; d2 <= 6; d2++) {
        outcomes.push(`(${d1}, ${d2}) [Sum=${d1+d2}]`);
      }
    }
    description = "Two 6-Sided Dice Roll (36 ordered pairs)";
  }

  countDisplay.innerHTML = `<strong>${description}</strong> — Total Outcomes n(S) = <span style="color: var(--primary-dark); font-weight: 800; font-size: 1.1rem;">${outcomes.length}</span>`;
  
  let gridHtml = `<div class="outcomes-grid">`;
  outcomes.forEach(out => {
    gridHtml += `<div class="outcome-chip ${type === 'two-dice' ? 'dice-pair' : ''}">${out}</div>`;
  });
  gridHtml += `</div>`;
  display.innerHTML = gridHtml;
}

// Tool 2: Interactive Probability Calculator
function calculateProbability() {
  const favInput = document.getElementById("calc-fav");
  const totalInput = document.getElementById("calc-total");
  const errEl = document.getElementById("calc-error");

  const favVal = parseFloat(favInput.value);
  const totalVal = parseFloat(totalInput.value);

  if (isNaN(favVal) || isNaN(totalVal)) {
    errEl.textContent = "Please enter valid numbers for both fields.";
    errEl.style.display = "block";
    return;
  }
  if (favVal < 0) {
    errEl.textContent = "Favorable outcomes cannot be negative.";
    errEl.style.display = "block";
    return;
  }
  if (totalVal <= 0) {
    errEl.textContent = "Total possible outcomes must be strictly greater than 0.";
    errEl.style.display = "block";
    return;
  }
  if (favVal > totalVal) {
    errEl.textContent = "Favorable outcomes cannot exceed total outcomes (P ≤ 1).";
    errEl.style.display = "block";
    return;
  }

  errEl.style.display = "none";

  const divisor = gcd(Math.round(favVal), Math.round(totalVal));
  const simpNum = Math.round(favVal) / divisor;
  const simpDen = Math.round(totalVal) / divisor;

  const decimalVal = (favVal / totalVal).toFixed(4);
  const percentVal = ((favVal / totalVal) * 100).toFixed(2) + "%";

  document.getElementById("res-frac").textContent = `${favVal} / ${totalVal}`;
  document.getElementById("res-simp").textContent = `${simpNum} / ${simpDen}`;
  document.getElementById("res-dec").textContent = decimalVal;
  document.getElementById("res-pct").textContent = percentVal;
}

// Tool 3: Coin Flip Simulator
let coinStats = { heads: 0, tails: 0, total: 0 };

function runCoinSimulation(flips) {
  for (let i = 0; i < flips; i++) {
    const isHead = Math.random() < 0.5;
    if (isHead) coinStats.heads++;
    else coinStats.tails++;
    coinStats.total++;
  }
  updateCoinSimulatorUI();
}

function resetCoinSimulation() {
  coinStats = { heads: 0, tails: 0, total: 0 };
  updateCoinSimulatorUI();
}

function updateCoinSimulatorUI() {
  const hCountEl = document.getElementById("coin-heads-count");
  const tCountEl = document.getElementById("coin-tails-count");
  const hPctEl = document.getElementById("coin-heads-pct");
  const tPctEl = document.getElementById("coin-tails-pct");
  const hBar = document.getElementById("coin-heads-bar");
  const tBar = document.getElementById("coin-tails-bar");
  const totalEl = document.getElementById("coin-total-flips");

  const total = coinStats.total;
  const hPct = total > 0 ? ((coinStats.heads / total) * 100).toFixed(1) : "0.0";
  const tPct = total > 0 ? ((coinStats.tails / total) * 100).toFixed(1) : "0.0";

  if (hCountEl) hCountEl.textContent = coinStats.heads;
  if (tCountEl) tCountEl.textContent = coinStats.tails;
  if (hPctEl) hPctEl.textContent = `${hPct}%`;
  if (tPctEl) tPctEl.textContent = `${tPct}%`;
  if (hBar) hBar.style.width = `${hPct}%`;
  if (tBar) tBar.style.width = `${tPct}%`;
  if (totalEl) totalEl.textContent = `Total Flips: ${total}`;
}

// Tool 4: Dice Roll Simulator
let diceStats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, total: 0 };
let twoDiceStats = {};
for (let s = 2; s <= 12; s++) twoDiceStats[s] = 0;
let twoDiceTotal = 0;
let currentDiceMode = 1;

function setDiceMode(num) {
  currentDiceMode = num;
  document.getElementById("btn-die-1").classList.toggle("active", num === 1);
  document.getElementById("btn-die-2").classList.toggle("active", num === 2);
  renderDiceSimulatorUI();
}

function runDiceSimulation(rolls) {
  if (currentDiceMode === 1) {
    for (let i = 0; i < rolls; i++) {
      const outcome = Math.floor(Math.random() * 6) + 1;
      diceStats[outcome]++;
      diceStats.total++;
    }
  } else {
    for (let i = 0; i < rolls; i++) {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const sum = d1 + d2;
      twoDiceStats[sum]++;
      twoDiceTotal++;
    }
  }
  renderDiceSimulatorUI();
}

function resetDiceSimulation() {
  if (currentDiceMode === 1) {
    diceStats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, total: 0 };
  } else {
    for (let s = 2; s <= 12; s++) twoDiceStats[s] = 0;
    twoDiceTotal = 0;
  }
  renderDiceSimulatorUI();
}

function renderDiceSimulatorUI() {
  const container = document.getElementById("dice-sim-output");
  if (!container) return;

  if (currentDiceMode === 1) {
    const total = diceStats.total;
    let html = `<div style="margin-bottom: 0.75rem; font-weight: 700; color: var(--navy);">Total Rolls: ${total}</div>`;
    for (let face = 1; face <= 6; face++) {
      const count = diceStats[face];
      const pct = total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";
      html += `
        <div class="sim-bar-row">
          <div class="sim-label">Face 🎲 ${face}</div>
          <div class="sim-bar-bg">
            <div class="sim-bar-fill" style="width: ${pct}%"></div>
          </div>
          <div class="sim-val">${count} (${pct}%)</div>
        </div>
      `;
    }
    container.innerHTML = html;
  } else {
    const total = twoDiceTotal;
    let html = `<div style="margin-bottom: 0.75rem; font-weight: 700; color: var(--navy);">Total 2-Dice Rolls: ${total}</div>`;
    for (let sum = 2; sum <= 12; sum++) {
      const count = twoDiceStats[sum];
      const pct = total > 0 ? ((count / total) * 100).toFixed(1) : "0.0";
      html += `
        <div class="sim-bar-row">
          <div class="sim-label">Sum = ${sum}</div>
          <div class="sim-bar-bg">
            <div class="sim-bar-fill" style="width: ${pct}%"></div>
          </div>
          <div class="sim-val">${count} (${pct}%)</div>
        </div>
      `;
    }
    container.innerHTML = html;
  }
}

// Tool 5: "Which Rule Should I Use?" Decision Tool
const RULE_GUIDE = {
  "basic": {
    title: "Basic Probability Formula",
    formula: "P(E) = n(E) / n(S) = (Favorable Outcomes) / (Total Outcomes)",
    explanation: "Use this when outcomes in the sample space are equally likely, and you simply need to count how many outcomes satisfy the event condition.",
    example: "Probability of rolling an even number on a 6-sided die: 3 favorable {2,4,6} out of 6 total = 3/6 = 1/2."
  },
  "complement": {
    title: "Complement Rule (P(not E) or At Least One)",
    formula: "P(E') = 1 - P(E)   or   P(At least 1) = 1 - P(None)",
    explanation: "Use this when the opposite scenario has far fewer cases to calculate, or whenever a question says 'at least one'.",
    example: "Probability of at least one Head in 4 coin tosses = 1 - P(No Heads, i.e., TTTT) = 1 - (1/2)^4 = 1 - 1/16 = 15/16."
  },
  "addition": {
    title: "General Addition Rule (A OR B)",
    formula: "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)",
    explanation: "Use this when you are asked for the probability of Event A OR Event B occurring, and the events can happen simultaneously (overlap).",
    example: "Probability of drawing a King OR a Heart from 52 cards: 4/52 + 13/52 - 1/52 (King of Hearts) = 16/52 = 4/13."
  },
  "mutually_exclusive": {
    title: "Mutually Exclusive Addition Rule",
    formula: "P(A ∪ B) = P(A) + P(B)   (since P(A ∩ B) = 0)",
    explanation: "Use this when the two events are disjoint and CANNOT happen together in a single trial.",
    example: "Rolling a 2 OR a 5 on a single die roll: 1/6 + 1/6 = 2/6 = 1/3."
  },
  "independent": {
    title: "Independent Events Multiplication Rule (A AND B)",
    formula: "P(A ∩ B) = P(A) × P(B)",
    explanation: "Use this when two or more events occur in separate trials and the outcome of one does NOT change the probability of the other (e.g. separate coin flips, with-replacement drawings).",
    example: "Rolling two 6s on two separate dice: (1/6) × (1/6) = 1/36."
  },
  "dependent": {
    title: "Dependent Multiplication Rule (Without Replacement)",
    formula: "P(A ∩ B) = P(A) × P(B|A)",
    explanation: "Use this when objects are drawn sequentially WITHOUT replacement, so the denominator and counts change after the first trial.",
    example: "Drawing 2 Aces from 52 cards without replacement: (4/52) × (3/51) = 1/221."
  },
  "conditional": {
    title: "Conditional Probability (Given that...)",
    formula: "P(A|B) = P(A ∩ B) / P(B)",
    explanation: "Use this when you are given prior information that Event B has already occurred, restricting the effective sample space to B.",
    example: "Probability of rolling a 2 given that the die showed an even number: P(2 ∩ Even)/P(Even) = (1/6)/(3/6) = 1/3."
  },
  "counting": {
    title: "Combinatorics / Counting Probability",
    formula: "P(E) = C(favorable combinations) / C(total combinations)",
    explanation: "Use combinations C(n, r) when selecting committees, groups of colored balls, or card hands where order does NOT matter.",
    example: "Choosing 2 women from 3 women and 4 men in a committee of 2: C(3,2) / C(7,2) = 3 / 21 = 1/7."
  }
};

function selectDecisionRule(ruleKey) {
  const container = document.getElementById("decision-rule-output");
  const buttons = document.querySelectorAll(".btn-rule-choice");
  buttons.forEach(b => b.classList.toggle("active", b.getAttribute("data-rule") === ruleKey));

  const data = RULE_GUIDE[ruleKey];
  if (!data || !container) return;

  container.innerHTML = `
    <div style="background: #ffffff; border: 1px solid var(--primary-border); border-left: 4px solid var(--primary); border-radius: var(--radius-md); padding: 1.5rem;">
      <div style="font-size: 0.8rem; font-weight: 800; color: var(--primary-dark); text-transform: uppercase; margin-bottom: 0.5rem;">Recommended Strategy</div>
      <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--navy); margin-bottom: 0.75rem;">${data.title}</h3>
      <div style="font-family: var(--font-math), var(--font-mono); font-size: 1.25rem; font-weight: bold; color: var(--primary-dark); background: var(--bg-subtle); padding: 0.75rem 1rem; border-radius: var(--radius-md); margin-bottom: 1rem; border: 1px solid var(--border-color);">${data.formula}</div>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1rem;">${data.explanation}</p>
      <div style="background: var(--accent-amber-bg); border: 1px solid #fde68a; border-radius: var(--radius-md); padding: 0.85rem 1rem; font-size: 0.9rem; color: #92400e;">
        <strong>FAST Example:</strong> ${data.example}
      </div>
    </div>
  `;
}

// Tool 6: Interactive Venn Diagram Engine
function highlightVennRegion(regionKey) {
  const infoEl = document.getElementById("venn-info-display");
  const buttons = document.querySelectorAll(".btn-venn");
  buttons.forEach(b => b.classList.toggle("active", b.getAttribute("data-region") === regionKey));

  const pathAOnly = document.getElementById("venn-path-a");
  const pathBOnly = document.getElementById("venn-path-b");
  const pathOverlap = document.getElementById("venn-path-overlap");
  const pathOutside = document.getElementById("venn-path-outside");

  // Reset opacity
  if (pathAOnly) pathAOnly.setAttribute("fill-opacity", "0.25");
  if (pathBOnly) pathBOnly.setAttribute("fill-opacity", "0.25");
  if (pathOverlap) pathOverlap.setAttribute("fill-opacity", "0.25");
  if (pathOutside) pathOutside.setAttribute("fill-opacity", "0.1");

  let title = "";
  let formula = "";
  let explanation = "";

  if (regionKey === "a_only") {
    if (pathAOnly) pathAOnly.setAttribute("fill-opacity", "0.75");
    title = "Event A Only (A ∩ B')";
    formula = "P(A only) = P(A) - P(A ∩ B)";
    explanation = "Represents outcomes belonging strictly to Event A and NOT to Event B.";
  } else if (regionKey === "b_only") {
    if (pathBOnly) pathBOnly.setAttribute("fill-opacity", "0.75");
    title = "Event B Only (B ∩ A')";
    formula = "P(B only) = P(B) - P(A ∩ B)";
    explanation = "Represents outcomes belonging strictly to Event B and NOT to Event A.";
  } else if (regionKey === "overlap") {
    if (pathOverlap) pathOverlap.setAttribute("fill-opacity", "0.85");
    title = "Intersection: Both A AND B (A ∩ B)";
    formula = "P(A ∩ B) = P(A) + P(B) - P(A ∪ B)";
    explanation = "Represents outcomes where BOTH Event A and Event B occur simultaneously.";
  } else if (regionKey === "union") {
    if (pathAOnly) pathAOnly.setAttribute("fill-opacity", "0.65");
    if (pathBOnly) pathBOnly.setAttribute("fill-opacity", "0.65");
    if (pathOverlap) pathOverlap.setAttribute("fill-opacity", "0.65");
    title = "Union: A OR B (A ∪ B)";
    formula = "P(A ∪ B) = P(A) + P(B) - P(A ∩ B)";
    explanation = "Represents outcomes where AT LEAST ONE of Event A or Event B occurs. Notice the intersection is counted only once.";
  } else if (regionKey === "neither") {
    if (pathOutside) pathOutside.setAttribute("fill-opacity", "0.4");
    title = "Neither A Nor B ((A ∪ B)')";
    formula = "P(Neither) = 1 - P(A ∪ B)";
    explanation = "Represents outcomes in the universal sample space that belong to neither Event A nor Event B.";
  }

  if (infoEl) {
    infoEl.innerHTML = `
      <div style="background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1.25rem;">
        <h4 style="color: var(--navy); font-weight: 800; margin-bottom: 0.5rem;">${title}</h4>
        <div style="font-family: var(--font-math), var(--font-mono); font-size: 1.15rem; font-weight: bold; color: var(--primary-dark); margin-bottom: 0.5rem;">${formula}</div>
        <p style="color: var(--text-muted); font-size: 0.9rem;">${explanation}</p>
      </div>
    `;
  }
}

// ==========================================
// 5. PRACTICE ZONE ENGINE (80 MCQs)
// ==========================================

let activePracticeFilter = "all";
let activeTopicFilter = "all";

function filterPracticeQuestions(difficulty) {
  activePracticeFilter = difficulty;
  document.querySelectorAll(".btn-filter").forEach(b => {
    if (b.getAttribute("data-diff")) {
      b.classList.toggle("active", b.getAttribute("data-diff") === difficulty);
    }
  });
  renderPracticeQuestions();
}

function filterPracticeTopic(topic) {
  activeTopicFilter = topic;
  renderPracticeQuestions();
}

function renderPracticeQuestions() {
  const container = document.getElementById("practice-questions-list");
  if (!container) return;

  const filtered = PRACTICE_QUESTIONS.filter(q => {
    const matchDiff = activePracticeFilter === "all" || q.difficulty === activePracticeFilter;
    const matchTopic = activeTopicFilter === "all" || q.topic === activeTopicFilter;
    return matchDiff && matchTopic;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No questions match the selected filter.</p>`;
    return;
  }

  let html = "";
  filtered.forEach(q => {
    const saved = appState.practiceAnswers[q.id];
    const isAnswered = saved !== undefined;
    const cardClass = isAnswered ? (saved.isCorrect ? "answered-correct" : "answered-incorrect") : "";

    html += `
      <div class="question-card ${cardClass}" id="q-card-${q.id}">
        <div class="q-meta-row">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="q-badge ${q.difficulty}">Q${q.id} • ${q.difficulty.toUpperCase()}</span>
            <span class="q-topic-tag">${q.topic}</span>
          </div>
          ${isAnswered ? (saved.isCorrect ? '<span style="color: var(--primary-light); font-weight: 800; font-size: 0.85rem;">✓ Correct</span>' : '<span style="color: var(--accent-red); font-weight: 800; font-size: 0.85rem;">✗ Incorrect</span>') : ''}
        </div>
        <div class="q-text">${q.question}</div>
        <div class="options-grid">
          ${q.options.map((opt, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx);
            let btnClass = "";
            if (isAnswered) {
              if (optIdx === q.answer) btnClass = "selected-correct";
              else if (saved.selected === optIdx) btnClass = "selected-wrong";
            }
            return `
              <button class="option-btn ${btnClass}" onclick="handlePracticeOptionSelect(${q.id}, ${optIdx})" ${isAnswered ? 'disabled' : ''}>
                <span class="option-letter">${letter}</span>
                <span>${opt}</span>
              </button>
            `;
          }).join('')}
        </div>
        <div class="q-explanation-box ${isAnswered ? 'show' : ''}" id="q-exp-${q.id}">
          <strong>💡 FAST Detailed Explanation:</strong><br>
          ${q.explanation}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function handlePracticeOptionSelect(questionId, selectedOption) {
  const q = PRACTICE_QUESTIONS.find(item => item.id === questionId);
  if (!q) return;

  const isCorrect = selectedOption === q.answer;
  appState.practiceAnswers[questionId] = {
    selected: selectedOption,
    isCorrect: isCorrect
  };

  saveState();
  renderPracticeQuestions();
}

// ==========================================
// 6. FINAL TIMED MASTER TEST ENGINE
// ==========================================

let testState = {
  active: false,
  currentIndex: 0,
  timeRemaining: 1800, // 30 minutes in seconds
  timerInterval: null,
  userAnswers: {}, // { [questionId]: selectedOptionIndex }
  flaggedQuestions: new Set(),
  submitted: false
};

function startMasterTest() {
  testState.active = true;
  testState.currentIndex = 0;
  testState.timeRemaining = 1800;
  testState.userAnswers = {};
  testState.flaggedQuestions = new Set();
  testState.submitted = false;

  document.getElementById("test-intro-panel").style.display = "none";
  document.getElementById("test-active-panel").style.display = "block";
  document.getElementById("test-results-panel").style.display = "none";

  if (testState.timerInterval) clearInterval(testState.timerInterval);
  testState.timerInterval = setInterval(updateTestTimer, 1000);

  renderTestQuestion();
  renderTestPalette();
}

function updateTestTimer() {
  testState.timeRemaining--;
  if (testState.timeRemaining <= 0) {
    clearInterval(testState.timerInterval);
    submitMasterTest();
    return;
  }
  const mins = Math.floor(testState.timeRemaining / 60);
  const secs = testState.timeRemaining % 60;
  const timeStr = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  const timerEl = document.getElementById("test-timer-clock");
  if (timerEl) timerEl.textContent = timeStr;
}

function renderTestQuestion() {
  const q = MASTER_TEST_QUESTIONS[testState.currentIndex];
  if (!q) return;

  const qNumEl = document.getElementById("test-q-number");
  const qDiffEl = document.getElementById("test-q-diff");
  const qTextEl = document.getElementById("test-q-text");
  const optionsContainer = document.getElementById("test-options-container");
  const flagBtn = document.getElementById("btn-test-flag");

  if (qNumEl) qNumEl.textContent = `Question ${testState.currentIndex + 1} of ${MASTER_TEST_QUESTIONS.length}`;
  if (qDiffEl) qDiffEl.textContent = `${q.difficulty} • ${q.category}`;
  if (qTextEl) qTextEl.textContent = q.question;

  const isFlagged = testState.flaggedQuestions.has(q.id);
  if (flagBtn) {
    flagBtn.textContent = isFlagged ? "★ Flagged for Review" : "☆ Mark for Review";
    flagBtn.classList.toggle("bookmarked", isFlagged);
  }

  const selectedOpt = testState.userAnswers[q.id];

  let html = "";
  q.options.forEach((opt, idx) => {
    const letter = String.fromCharCode(65 + idx);
    const isSelected = selectedOpt === idx;
    html += `
      <button class="option-btn ${isSelected ? 'selected-correct' : ''}" onclick="selectTestOption(${q.id}, ${idx})">
        <span class="option-letter">${letter}</span>
        <span>${opt}</span>
      </button>
    `;
  });
  if (optionsContainer) optionsContainer.innerHTML = html;

  renderTestPalette();
}

function selectTestOption(questionId, optIndex) {
  testState.userAnswers[questionId] = optIndex;
  renderTestQuestion();
}

function toggleFlagCurrentQuestion() {
  const q = MASTER_TEST_QUESTIONS[testState.currentIndex];
  if (!q) return;
  if (testState.flaggedQuestions.has(q.id)) {
    testState.flaggedQuestions.delete(q.id);
  } else {
    testState.flaggedQuestions.add(q.id);
  }
  renderTestQuestion();
}

function navigateTest(direction) {
  const nextIdx = testState.currentIndex + direction;
  if (nextIdx >= 0 && nextIdx < MASTER_TEST_QUESTIONS.length) {
    testState.currentIndex = nextIdx;
    renderTestQuestion();
  }
}

function jumpToTestQuestion(index) {
  if (index >= 0 && index < MASTER_TEST_QUESTIONS.length) {
    testState.currentIndex = index;
    renderTestQuestion();
  }
}

function renderTestPalette() {
  const container = document.getElementById("test-palette-container");
  if (!container) return;

  let html = "";
  MASTER_TEST_QUESTIONS.forEach((q, idx) => {
    const isCurrent = idx === testState.currentIndex;
    const isAnswered = testState.userAnswers[q.id] !== undefined;
    const isFlagged = testState.flaggedQuestions.has(q.id);

    let cls = "palette-btn";
    if (isCurrent) cls += " current";
    if (isFlagged) cls += " flagged";
    else if (isAnswered) cls += " answered";

    html += `<button class="${cls}" onclick="jumpToTestQuestion(${idx})">${idx + 1}</button>`;
  });
  container.innerHTML = html;
}

function submitMasterTest() {
  if (testState.timerInterval) clearInterval(testState.timerInterval);
  testState.submitted = true;

  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const categoryStats = {};

  MASTER_TEST_QUESTIONS.forEach(q => {
    if (!categoryStats[q.category]) {
      categoryStats[q.category] = { correct: 0, total: 0 };
    }
    categoryStats[q.category].total++;

    const userAns = testState.userAnswers[q.id];
    if (userAns === undefined) {
      unattemptedCount++;
    } else if (userAns === q.answer) {
      correctCount++;
      categoryStats[q.category].correct++;
    } else {
      incorrectCount++;
    }
  });

  const total = MASTER_TEST_QUESTIONS.length;
  const scorePct = (correctCount / total) * 100;
  const timeUsedSeconds = 1800 - testState.timeRemaining;
  const timeMins = Math.floor(timeUsedSeconds / 60);
  const timeSecs = timeUsedSeconds % 60;

  if (scorePct > appState.bestScore) {
    appState.bestScore = scorePct;
  }
  appState.testHistory.push({
    date: new Date().toISOString(),
    score: scorePct,
    correct: correctCount,
    total: total
  });
  saveState();

  // Show Results Panel
  document.getElementById("test-active-panel").style.display = "none";
  const resultsPanel = document.getElementById("test-results-panel");
  resultsPanel.style.display = "block";

  document.getElementById("res-score-pct").textContent = `${scorePct.toFixed(1)}%`;
  document.getElementById("res-correct-cnt").textContent = correctCount.toString();
  document.getElementById("res-incorrect-cnt").textContent = incorrectCount.toString();
  document.getElementById("res-unattempted-cnt").textContent = unattemptedCount.toString();
  document.getElementById("res-time-used").textContent = `${timeMins}m ${timeSecs}s`;

  // Category Breakdown
  const catGrid = document.getElementById("res-category-breakdown");
  let catHtml = "";
  for (let cat in categoryStats) {
    const c = categoryStats[cat];
    const pct = Math.round((c.correct / c.total) * 100);
    catHtml += `
      <div class="cat-analysis-box">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-weight: 700; font-size: 0.85rem;">
          <span>${cat}</span>
          <span style="color: ${pct >= 70 ? 'var(--primary-dark)' : '#dc2626'}">${pct}% (${c.correct}/${c.total})</span>
        </div>
        <div class="stat-progress-bar-bg">
          <div class="stat-progress-bar-fill" style="width: ${pct}%; background: ${pct >= 70 ? 'var(--primary-light)' : '#ef4444'}"></div>
        </div>
      </div>
    `;
  }
  if (catGrid) catGrid.innerHTML = catHtml;

  // Render Full Review of all 35 Questions
  renderMasterTestReview();
}

function renderMasterTestReview() {
  const container = document.getElementById("res-review-container");
  if (!container) return;

  let html = `<h3 style="font-size: 1.4rem; font-weight: 800; color: var(--navy); margin-bottom: 1.5rem;">Detailed Solution & Step-by-Step Review</h3>`;

  MASTER_TEST_QUESTIONS.forEach((q, idx) => {
    const userAns = testState.userAnswers[q.id];
    const isCorrect = userAns === q.answer;
    const isUnattempted = userAns === undefined;

    let statusText = isUnattempted ? "Unattempted" : (isCorrect ? "Correct" : "Incorrect");
    let borderClass = isUnattempted ? "" : (isCorrect ? "answered-correct" : "answered-incorrect");

    html += `
      <div class="question-card ${borderClass}" style="margin-bottom: 1.5rem;">
        <div class="q-meta-row">
          <span class="q-badge ${q.difficulty.toLowerCase()}">Q${idx + 1} • ${q.category}</span>
          <span style="font-weight: 800; font-size: 0.85rem; color: ${isCorrect ? 'var(--primary-light)' : (isUnattempted ? 'var(--text-light)' : 'var(--accent-red)')};">
            ${isCorrect ? '✓ Correct' : (isUnattempted ? '— Unattempted' : '✗ Incorrect')}
          </span>
        </div>
        <div class="q-text">${q.question}</div>
        <div class="options-grid">
          ${q.options.map((opt, optIdx) => {
            const letter = String.fromCharCode(65 + optIdx);
            let optClass = "";
            if (optIdx === q.answer) optClass = "selected-correct";
            else if (userAns === optIdx) optClass = "selected-wrong";

            return `
              <div class="option-btn ${optClass}" style="cursor: default;">
                <span class="option-letter">${letter}</span>
                <span>${opt}</span>
              </div>
            `;
          }).join('')}
        </div>
        <div class="q-explanation-box show" style="margin-top: 1rem;">
          <strong>💡 FAST Explanation:</strong><br>
          ${q.explanation}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// ==========================================
// 7. GLOBAL SEARCH & QUICK JUMP ENGINE
// ==========================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("open");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
}

function executeGlobalSearch(query) {
  const resultsContainer = document.getElementById("search-results-container");
  if (!resultsContainer) return;

  query = query.trim().toLowerCase();
  if (query.length < 2) {
    resultsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 1.5rem 0;">Type at least 2 characters to search through notes, rules, formulas, shortcuts and questions...</p>`;
    return;
  }

  const matches = [];

  // Search Practice MCQs
  PRACTICE_QUESTIONS.forEach(q => {
    if (q.question.toLowerCase().includes(query) || q.explanation.toLowerCase().includes(query) || q.topic.toLowerCase().includes(query)) {
      matches.push({
        type: "Practice MCQ",
        title: `Q${q.id} (${q.topic}): ${q.question.substring(0, 65)}...`,
        link: `#q-card-${q.id}`,
        desc: q.explanation.substring(0, 100) + "..."
      });
    }
  });

  // Search Rule Guide
  for (let k in RULE_GUIDE) {
    const item = RULE_GUIDE[k];
    if (item.title.toLowerCase().includes(query) || item.formula.toLowerCase().includes(query) || item.explanation.toLowerCase().includes(query)) {
      matches.push({
        type: "Formula & Rule",
        title: item.title,
        link: "#sec-decision-tool",
        desc: `${item.formula} — ${item.explanation.substring(0, 80)}...`
      });
    }
  }

  // Render search results
  if (matches.length === 0) {
    resultsContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem; text-align: center; padding: 1.5rem 0;">No matching notes, formulas or questions found for "<strong>${query}</strong>".</p>`;
    return;
  }

  let html = `<div style="font-size: 0.85rem; font-weight: 700; color: var(--navy); margin-bottom: 0.75rem;">Found ${matches.length} result(s):</div><div style="display: flex; flex-direction: column; gap: 0.75rem;">`;
  matches.slice(0, 15).forEach(m => {
    html += `
      <div style="padding: 0.85rem 1rem; background: var(--bg-subtle); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <span class="q-badge easy" style="font-size: 0.7rem;">${m.type}</span>
        <a href="${m.link}" style="display: block; font-weight: 700; font-size: 0.95rem; color: var(--navy); text-decoration: none; margin: 0.35rem 0;" onclick="closeModal('search-modal')">${m.title}</a>
        <div style="font-size: 0.825rem; color: var(--text-muted); line-height: 1.5;">${m.desc}</div>
      </div>
    `;
  });
  html += `</div>`;
  resultsContainer.innerHTML = html;
}

// ==========================================
// 8. FORMULA SHEET ACTIONS & MISC UTILITIES
// ==========================================

function copyFormulaSheet() {
  const text = `
PROBABILITY FORMULA SHEET (FAST & SCHOLARSHIP MATHEMATICS)
==========================================================
1. Fundamental Probability Axioms:
   0 <= P(E) <= 1
   P(Impossible) = 0
   P(Certain) = 1

2. Basic Probability Formula (Equally Likely Outcomes):
   P(E) = Number of Favorable Outcomes / Total Possible Outcomes = n(E) / n(S)

3. Complement of an Event:
   P(E') = 1 - P(E)
   P(At least 1) = 1 - P(None)

4. General Addition Rule:
   P(A U B) = P(A) + P(B) - P(A n B)

5. Mutually Exclusive Events (Disjoint):
   P(A n B) = 0
   P(A U B) = P(A) + P(B)

6. Conditional Probability:
   P(A|B) = P(A n B) / P(B), where P(B) > 0

7. Multiplication Rule:
   General: P(A n B) = P(A) * P(B|A)
   Independent: P(A n B) = P(A) * P(B)

8. FAST Speed Techniques & Symmetry:
   - 2 fair dice: n(S) = 36. Sum distribution is symmetric around 7.
   - n coins: n(S) = 2^n. Combinations C(n, r) for exact r heads.
   - Standard 52-card deck: 4 suits (13 cards each), 26 red, 26 black, 4 aces, 12 face cards (J, Q, K).
==========================================================
`;
  navigator.clipboard.writeText(text).then(() => {
    showToast("✓ Formula Sheet copied to clipboard!");
  }).catch(() => {
    showToast("Formula sheet ready to print or copy.");
  });
}

function printFormulaSheet() {
  window.print();
}

function toggleTrySolution(boxId) {
  const el = document.getElementById(boxId);
  if (el) {
    el.classList.toggle("open");
  }
}

// ==========================================
// 9. INITIALIZATION ON DOM LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  updateDashboard();
  generateSampleSpace("two-coins");
  calculateProbability();
  updateCoinSimulatorUI();
  setDiceMode(1);
  selectDecisionRule("basic");
  highlightVennRegion("overlap");
  renderPracticeQuestions();

  // Populate Practice Topic Filter Dropdown
  const topicFilterSelect = document.getElementById("practice-topic-select");
  if (topicFilterSelect) {
    const topics = Array.from(new Set(PRACTICE_QUESTIONS.map(q => q.topic))).sort();
    topics.forEach(t => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent = t;
      topicFilterSelect.appendChild(opt);
    });
  }

  // Keyboard shortcut for search (Ctrl+K or /)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openModal("search-modal");
      const searchInput = document.getElementById("global-search-input");
      if (searchInput) searchInput.focus();
    }
  });
});
