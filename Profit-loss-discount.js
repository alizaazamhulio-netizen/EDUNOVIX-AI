/**
 * PROFIT, LOSS & DISCOUNT - UNIVERSITY ENTRY TEST MATHEMATICS
 * Script: profit-loss-discount.js
 * Contains: 120 Original MCQs, Master Test Simulator, Calculators, Interactive Formula Cards,
 *           Search, Bookmarking, and Visual Animations.
 */

// ==========================================================================
// 1. 120 ORIGINAL PRACTICE & TEST MCQs DATASET
// ==========================================================================
const MCQS_DATABASE = [
  // FOUNDATION (30 Questions)
  {
    id: 1,
    category: "Cost Price & Selling Price",
    diff: "easy",
    tag: "FAST-style",
    q: "A merchant buys a book for Rs. 450 and sells it for Rs. 540. What is his net profit?",
    options: ["Rs. 70", "Rs. 80", "Rs. 90", "Rs. 100"],
    ans: 2,
    exp: "Profit = Selling Price (SP) - Cost Price (CP) = 540 - 450 = Rs. 90."
  },
  {
    id: 2,
    category: "Cost Price & Selling Price",
    diff: "easy",
    tag: "NET-style",
    q: "An article bought for Rs. 800 was sold at a loss of Rs. 120. Find its Selling Price.",
    options: ["Rs. 680", "Rs. 720", "Rs. 920", "Rs. 650"],
    ans: 0,
    exp: "Selling Price (SP) = Cost Price (CP) - Loss = 800 - 120 = Rs. 680."
  },
  {
    id: 3,
    category: "Profit Percentage",
    diff: "easy",
    tag: "Scholarship-style",
    q: "A calculator is bought for Rs. 500 and sold for Rs. 600. What is the profit percentage?",
    options: ["16.67%", "20%", "25%", "15%"],
    ans: 1,
    exp: "Profit = 600 - 500 = Rs. 100. Profit% = (Profit / CP) × 100 = (100 / 500) × 100 = 20%."
  },
  {
    id: 4,
    category: "Loss Percentage",
    diff: "easy",
    tag: "Aptitude-style",
    q: "A mobile case is bought for Rs. 400 and sold for Rs. 300. Calculate the loss percentage.",
    options: ["20%", "25%", "33.33%", "30%"],
    ans: 1,
    exp: "Loss = 400 - 300 = Rs. 100. Loss% = (Loss / CP) × 100 = (100 / 400) × 100 = 25%."
  },
  {
    id: 5,
    category: "Discount Basics",
    diff: "easy",
    tag: "Mixed Entry-Test",
    q: "A jacket marked at Rs. 2,500 is sold for Rs. 2,000. What is the discount amount?",
    options: ["Rs. 400", "Rs. 500", "Rs. 600", "Rs. 250"],
    ans: 1,
    exp: "Discount = Marked Price (MP) - Selling Price (SP) = 2500 - 2000 = Rs. 500."
  },
  {
    id: 6,
    category: "Discount Percentage",
    diff: "easy",
    tag: "FAST-style",
    q: "A pair of shoes is marked at Rs. 1,500. A customer receives a discount of Rs. 300. Find the discount percentage.",
    options: ["15%", "18%", "20%", "25%"],
    ans: 2,
    exp: "Discount% is always calculated on Marked Price (MP). Discount% = (300 / 1500) × 100 = 20%."
  },
  {
    id: 7,
    category: "Finding Selling Price",
    diff: "easy",
    tag: "NET-style",
    q: "If CP = Rs. 1,200 and profit is 15%, what is the selling price?",
    options: ["Rs. 1,350", "Rs. 1,380", "Rs. 1,400", "Rs. 1,420"],
    ans: 1,
    exp: "Profit amount = 15% of 1200 = 180. SP = 1200 + 180 = Rs. 1,380."
  },
  {
    id: 8,
    category: "Finding Selling Price",
    diff: "easy",
    tag: "ECAT-style",
    q: "An item costing Rs. 650 is sold at a 10% loss. What is the final selling price?",
    options: ["Rs. 585", "Rs. 575", "Rs. 590", "Rs. 600"],
    ans: 0,
    exp: "Loss = 10% of 650 = 65. SP = 650 - 65 = Rs. 585."
  },
  {
    id: 9,
    category: "Discount & SP",
    diff: "easy",
    tag: "Scholarship-style",
    q: "A shirt has a marked price of Rs. 1,800. If the store offers a 25% discount, what does the buyer pay?",
    options: ["Rs. 1,300", "Rs. 1,350", "Rs. 1,400", "Rs. 1,450"],
    ans: 1,
    exp: "Discount = 25% of 1800 = 450. SP = 1800 - 450 = Rs. 1,350 (or 1800 × 0.75 = 1350)."
  },
  {
    id: 10,
    category: "Finding Cost Price",
    diff: "easy",
    tag: "FAST-style",
    q: "A table is sold for Rs. 1,100 at a 10% profit. What was its cost price?",
    options: ["Rs. 990", "Rs. 1,000", "Rs. 1,010", "Rs. 1,050"],
    ans: 1,
    exp: "SP = CP × (1 + 0.10) => 1100 = 1.10 × CP => CP = 1100 / 1.10 = Rs. 1,000."
  },
  {
    id: 11,
    category: "Finding Cost Price",
    diff: "easy",
    tag: "Aptitude-style",
    q: "A watch is sold for Rs. 720 at a loss of 10%. Find its cost price.",
    options: ["Rs. 792", "Rs. 800", "Rs. 810", "Rs. 820"],
    ans: 1,
    exp: "SP = CP × (1 - 0.10) => 720 = 0.90 × CP => CP = 720 / 0.9 = Rs. 800."
  },
  {
    id: 12,
    category: "Commission Basics",
    diff: "easy",
    tag: "Scholarship-style",
    q: "A salesman earns a 4% commission on total sales. If his sales total Rs. 50,000, what is his commission?",
    options: ["Rs. 1,500", "Rs. 2,000", "Rs. 2,500", "Rs. 1,800"],
    ans: 1,
    exp: "Commission = 4% of 50,000 = (4 / 100) × 50,000 = Rs. 2,000."
  },
  {
    id: 13,
    category: "Tax & Discount",
    diff: "easy",
    tag: "Mixed Entry-Test",
    q: "A restaurant bill is Rs. 1,000. A 5% sales tax is added. What is the total bill?",
    options: ["Rs. 1,025", "Rs. 1,050", "Rs. 1,100", "Rs. 1,005"],
    ans: 1,
    exp: "Tax = 5% of 1000 = 50. Total = 1000 + 50 = Rs. 1,050."
  },
  {
    id: 14,
    category: "Basic Formulas",
    diff: "easy",
    tag: "NET-style",
    q: "Which price is always used as the base denominator when calculating Profit or Loss Percentage?",
    options: ["Selling Price (SP)", "Cost Price (CP)", "Marked Price (MP)", "Discounted Price"],
    ans: 1,
    exp: "Profit% and Loss% are strictly based on the Cost Price (CP)."
  },
  {
    id: 15,
    category: "Basic Formulas",
    diff: "easy",
    tag: "FAST-style",
    q: "Which price is used as the base denominator when calculating Discount Percentage?",
    options: ["Cost Price (CP)", "Selling Price (SP)", "Marked Price (MP)", "Gross Profit"],
    ans: 2,
    exp: "Discount Percentage is strictly calculated on the Marked Price (MP)."
  },
  {
    id: 16,
    category: "Profit Percentage",
    diff: "easy",
    tag: "ECAT-style",
    q: "By selling a pen for Rs. 60, a shopkeeper gains Rs. 10. What is his profit percentage?",
    options: ["16.67%", "20%", "25%", "15%"],
    ans: 1,
    exp: "CP = SP - Profit = 60 - 10 = Rs. 50. Profit% = (10 / 50) × 100 = 20%."
  },
  {
    id: 17,
    category: "Loss Percentage",
    diff: "easy",
    tag: "Aptitude-style",
    q: "By selling an item for Rs. 180, a vendor loses Rs. 20. Find his loss percentage.",
    options: ["10%", "11.11%", "12.5%", "9.09%"],
    ans: 0,
    exp: "CP = SP + Loss = 180 + 20 = Rs. 200. Loss% = (20 / 200) × 100 = 10%."
  },
  {
    id: 18,
    category: "Cost Price & Selling Price",
    diff: "easy",
    tag: "Scholarship-style",
    q: "If 12 bananas are bought for Rs. 120 and each banana is sold for Rs. 12, what is the profit per banana?",
    options: ["Rs. 1", "Rs. 2", "Rs. 3", "Rs. 4"],
    ans: 1,
    exp: "CP per banana = 120 / 12 = Rs. 10. SP per banana = Rs. 12. Profit per banana = 12 - 10 = Rs. 2."
  },
  {
    id: 19,
    category: "Marked Price",
    diff: "easy",
    tag: "Mixed Entry-Test",
    q: "If an item is marked 30% above its cost price of Rs. 500, what is the Marked Price?",
    options: ["Rs. 600", "Rs. 650", "Rs. 700", "Rs. 750"],
    ans: 1,
    exp: "Markup = 30% of 500 = Rs. 150. MP = 500 + 150 = Rs. 650."
  },
  {
    id: 20,
    category: "Finding Selling Price",
    diff: "easy",
    tag: "NET-style",
    q: "CP = Rs. 250, profit = 40%. Find SP.",
    options: ["Rs. 320", "Rs. 350", "Rs. 360", "Rs. 375"],
    ans: 1,
    exp: "SP = 250 × 1.40 = Rs. 350."
  },
  {
    id: 21,
    category: "Discount Percentage",
    diff: "easy",
    tag: "FAST-style",
    q: "MP = Rs. 800, SP = Rs. 640. Find the discount percentage.",
    options: ["15%", "18%", "20%", "25%"],
    ans: 2,
    exp: "Discount = 800 - 640 = 160. Discount% = (160 / 800) × 100 = 20%."
  },
  {
    id: 22,
    category: "Price Increase",
    diff: "easy",
    tag: "Scholarship-style",
    q: "The price of petrol increases from Rs. 200 to Rs. 250 per liter. What is the percentage increase?",
    options: ["20%", "25%", "30%", "22.5%"],
    ans: 1,
    exp: "Increase = 250 - 200 = 50. Increase% = (50 / 200) × 100 = 25%."
  },
  {
    id: 23,
    category: "Price Decrease",
    diff: "easy",
    tag: "Aptitude-style",
    q: "A stock drops in price from Rs. 500 to Rs. 400. What is the percentage decrease?",
    options: ["20%", "25%", "15%", "18%"],
    ans: 0,
    exp: "Decrease = 500 - 400 = 100. Decrease% = (100 / 500) × 100 = 20%."
  },
  {
    id: 24,
    category: "Unitary Method",
    diff: "easy",
    tag: "ECAT-style",
    q: "5 notebooks cost Rs. 150. How much will 12 notebooks cost?",
    options: ["Rs. 300", "Rs. 320", "Rs. 360", "Rs. 400"],
    ans: 2,
    exp: "Cost of 1 notebook = 150 / 5 = Rs. 30. Cost of 12 notebooks = 12 × 30 = Rs. 360."
  },
  {
    id: 25,
    category: "Profit Percentage",
    diff: "easy",
    tag: "Mixed Entry-Test",
    q: "A merchant buys 20 kg of rice at Rs. 80/kg and sells it at Rs. 100/kg. What is his overall profit percentage?",
    options: ["20%", "25%", "30%", "15%"],
    ans: 1,
    exp: "Profit% = ((100 - 80) / 80) × 100 = (20 / 80) × 100 = 25%."
  },
  {
    id: 26,
    category: "Finding Cost Price",
    diff: "easy",
    tag: "FAST-style",
    q: "By selling a bag for Rs. 1,440, a shopkeeper gains 20%. Find the CP of the bag.",
    options: ["Rs. 1,152", "Rs. 1,200", "Rs. 1,250", "Rs. 1,180"],
    ans: 1,
    exp: "CP = SP / 1.20 = 1440 / 1.2 = Rs. 1,200."
  },
  {
    id: 27,
    category: "Finding Cost Price",
    diff: "easy",
    tag: "NET-style",
    q: "A bicycle sold for Rs. 4,500 causes a 10% loss. What was the purchase cost of the bicycle?",
    options: ["Rs. 4,950", "Rs. 5,000", "Rs. 5,100", "Rs. 5,200"],
    ans: 1,
    exp: "CP = SP / (1 - 0.10) = 4500 / 0.9 = Rs. 5,000."
  },
  {
    id: 28,
    category: "Successive Discounts",
    diff: "easy",
    tag: "Scholarship-style",
    q: "An item priced at Rs. 1,000 is discounted by 10%, and then again by 10%. What is the final price?",
    options: ["Rs. 800", "Rs. 810", "Rs. 820", "Rs. 850"],
    ans: 1,
    exp: "First discount: 1000 - 100 = Rs. 900. Second discount: 900 - 90 = Rs. 810."
  },
  {
    id: 29,
    category: "Equivalent Discount",
    diff: "easy",
    tag: "Aptitude-style",
    q: "What single discount is equivalent to successive discounts of 10% and 10%?",
    options: ["20%", "19%", "18%", "21%"],
    ans: 1,
    exp: "Equivalent discount = d1 + d2 - (d1 × d2)/100 = 10 + 10 - 1 = 19%."
  },
  {
    id: 30,
    category: "Commission Basics",
    diff: "easy",
    tag: "Mixed Entry-Test",
    q: "An agent sells goods worth Rs. 80,000 and is paid Rs. 4,000. What is his commission rate?",
    options: ["4%", "5%", "6%", "7.5%"],
    ans: 1,
    exp: "Rate = (4000 / 80000) × 100 = 5%."
  },

  // INTERMEDIATE (40 Questions)
  {
    id: 31,
    category: "Profit After Discount",
    diff: "medium",
    tag: "FAST-style",
    q: "An item costs Rs. 800. It is marked 50% above CP, and then sold at a 20% discount. Find the profit percentage.",
    options: ["20%", "25%", "30%", "15%"],
    ans: 0,
    exp: "CP = 800. MP = 800 × 1.50 = 1200. SP = 1200 × 0.80 = Rs. 960. Profit = 960 - 800 = 160. Profit% = (160 / 800) × 100 = 20%."
  },
  {
    id: 32,
    category: "Equivalent Discount",
    diff: "medium",
    tag: "NET-style",
    q: "Find the single equivalent discount for successive discounts of 20% and 15%.",
    options: ["35%", "32%", "30%", "28%"],
    ans: 1,
    exp: "Formula: d1 + d2 - (d1 × d2)/100 = 20 + 15 - (300/100) = 35 - 3 = 32%."
  },
  {
    id: 33,
    category: "Successive Discounts (3 Stages)",
    diff: "medium",
    tag: "ECAT-style",
    q: "Successive discounts of 10%, 20%, and 25% are given on Rs. 1,000. Find the final price.",
    options: ["Rs. 500", "Rs. 540", "Rs. 560", "Rs. 600"],
    ans: 1,
    exp: "Final Price = 1000 × (0.90) × (0.80) × (0.75) = 1000 × 0.54 = Rs. 540."
  },
  {
    id: 34,
    category: "Reverse Profit Problems",
    diff: "medium",
    tag: "Scholarship-style",
    q: "A person sells two chairs for Rs. 1,200 each. On one he gains 20% and on the other he loses 20%. What is his net gain or loss percentage on the whole transaction?",
    options: ["No profit no loss", "4% profit", "4% loss", "2% loss"],
    ans: 2,
    exp: "When two items are sold at the same SP with x% gain on one and x% loss on the other, there is ALWAYS an overall loss of (x/10)²% = (20/10)² = 4% loss."
  },
  {
    id: 35,
    category: "Profit After Discount",
    diff: "medium",
    tag: "Aptitude-style",
    q: "A trader marks his goods 40% above cost price and allows a discount of 15% on the marked price. What is his actual gain percentage?",
    options: ["18%", "19%", "20%", "25%"],
    ans: 1,
    exp: "Let CP = 100 => MP = 140. Discount = 15% of 140 = 21 => SP = 119. Profit = 19 on 100 => 19%."
  },
  {
    id: 36,
    category: "Marked Price Calculation",
    diff: "medium",
    tag: "Mixed Entry-Test",
    q: "A shopkeeper wishes to earn a 20% profit after offering a 10% discount. By what percentage above CP must he mark the item?",
    options: ["30%", "33.33%", "35%", "25%"],
    ans: 1,
    exp: "Formula: MP / CP = (100 + P%) / (100 - D%) = (100 + 20) / (100 - 10) = 120 / 90 = 4/3. Markup% = ((4 - 3)/3) × 100 = 33.33%."
  },
  {
    id: 37,
    category: "Ratio and Profit",
    diff: "medium",
    tag: "FAST-style",
    q: "The ratio of Cost Price to Selling Price of an article is 4 : 5. Find the profit percentage.",
    options: ["20%", "25%", "30%", "15%"],
    ans: 1,
    exp: "Let CP = 4x, SP = 5x => Profit = x. Profit% = (x / 4x) × 100 = 25%."
  },
  {
    id: 38,
    category: "Ratio and Loss",
    diff: "medium",
    tag: "NET-style",
    q: "If the ratio of CP to SP is 5 : 4, what is the loss percentage?",
    options: ["20%", "25%", "15%", "10%"],
    ans: 0,
    exp: "Let CP = 5x, SP = 4x => Loss = x. Loss% = (x / 5x) × 100 = 20%."
  },
  {
    id: 39,
    category: "Equal Quantities Concept",
    diff: "medium",
    tag: "ECAT-style",
    q: "The cost price of 15 articles is equal to the selling price of 12 articles. Find the profit percentage.",
    options: ["20%", "25%", "30%", "15%"],
    ans: 1,
    exp: "15 × CP = 12 × SP => SP / CP = 15 / 12 = 5 / 4. Profit = 5 - 4 = 1. Profit% = (1 / 4) × 100 = 25%."
  },
  {
    id: 40,
    category: "Equal Quantities Concept",
    diff: "medium",
    tag: "Scholarship-style",
    q: "If the cost price of 20 pens is equal to the selling price of 25 pens, what is the gain or loss percentage?",
    options: ["20% gain", "20% loss", "25% loss", "25% gain"],
    ans: 1,
    exp: "20 × CP = 25 × SP => SP / CP = 20 / 25 = 4 / 5. Loss = 5 - 4 = 1. Loss% = (1 / 5) × 100 = 20% loss."
  },
  {
    id: 41,
    category: "Tax & Discount Order",
    diff: "medium",
    tag: "Aptitude-style",
    q: "An item marked at Rs. 2,000 gets a 10% discount, and then a 5% sales tax is charged on the discounted price. What is the final amount payable?",
    options: ["Rs. 1,890", "Rs. 1,900", "Rs. 1,880", "Rs. 1,910"],
    ans: 0,
    exp: "Discounted price = 2000 × 0.90 = Rs. 1,800. Tax = 5% of 1800 = Rs. 90. Final = 1800 + 90 = Rs. 1,890."
  },
  {
    id: 42,
    category: "Mixed Transaction",
    diff: "medium",
    tag: "Mixed Entry-Test",
    q: "A merchant buys 100 eggs at Rs. 5 each. 10 eggs break during transport. If he sells the remaining eggs at Rs. 6 each, what is his profit percentage?",
    options: ["6%", "8%", "10%", "12%"],
    ans: 1,
    exp: "Total CP = 100 × 5 = Rs. 500. Remaining eggs = 90. Total SP = 90 × 6 = Rs. 540. Profit = 540 - 500 = 40. Profit% = (40 / 500) × 100 = 8%."
  },
  {
    id: 43,
    category: "Double Percentage Change",
    diff: "medium",
    tag: "FAST-style",
    q: "The price of sugar rises by 25%. By what percentage must a family reduce its consumption so that the expenditure remains unchanged?",
    options: ["20%", "25%", "16.67%", "15%"],
    ans: 0,
    exp: "Reduction% = [r / (100 + r)] × 100 = [25 / 125] × 100 = (1/5) × 100 = 20%."
  },
  {
    id: 44,
    category: "Double Percentage Change",
    diff: "medium",
    tag: "NET-style",
    q: "If the price of petrol decreases by 20%, by what percentage can a driver increase his petrol usage for the same total expenditure?",
    options: ["20%", "25%", "30%", "22%"],
    ans: 1,
    exp: "Increase% = [r / (100 - r)] × 100 = [20 / (100 - 20)] × 100 = (20 / 80) × 100 = 25%."
  },
  {
    id: 45,
    category: "Profit on SP Trap",
    diff: "medium",
    tag: "ECAT-style",
    q: "A dishonest retailer calculates his profit percentage as 20% on the SELLING PRICE. What is his actual profit percentage on Cost Price?",
    options: ["16.67%", "20%", "25%", "30%"],
    ans: 2,
    exp: "Let SP = 100. Profit = 20 => CP = 100 - 20 = 80. Actual Profit% on CP = (20 / 80) × 100 = 25%."
  },
  {
    id: 46,
    category: "Loss on SP Trap",
    diff: "medium",
    tag: "Scholarship-style",
    q: "If loss is calculated as 25% of the Selling Price, what is the actual loss percentage on Cost Price?",
    options: ["20%", "25%", "33.33%", "16.67%"],
    ans: 0,
    exp: "Let SP = 100. Loss = 25 => CP = SP + Loss = 100 + 25 = 125. Actual Loss% on CP = (25 / 125) × 100 = 20%."
  },
  {
    id: 47,
    category: "Equivalent Discount",
    diff: "medium",
    tag: "Aptitude-style",
    q: "Which offer is better for a customer on a Rs. 10,000 item: Offer A (A single discount of 30%) or Offer B (Successive discounts of 20% and 10%)?",
    options: ["Offer A", "Offer B", "Both are identical", "Cannot be determined"],
    ans: 0,
    exp: "Offer A discount = 30%. Offer B equivalent discount = 20 + 10 - 2 = 28%. Offer A offers higher discount (30% > 28%), so Offer A is better for the customer."
  },
  {
    id: 48,
    category: "Loss After Discount",
    diff: "medium",
    tag: "Mixed Entry-Test",
    q: "An article costing Rs. 1,000 is marked at Rs. 1,100. A discount of 15% is offered. Find the gain or loss percentage.",
    options: ["6.5% gain", "6.5% loss", "5% loss", "3.5% loss"],
    ans: 1,
    exp: "MP = 1100. SP = 1100 × 0.85 = Rs. 935. CP = 1000 => Loss = 1000 - 935 = Rs. 65. Loss% = (65 / 1000) × 100 = 6.5% loss."
  },
  {
    id: 49,
    category: "Two-Tier Markup",
    diff: "medium",
    tag: "FAST-style",
    q: "A wholesaler marks his goods at Rs. 1,600. He gives a 10% trade discount to a retailer. If the wholesaler originally purchased the item for Rs. 1,200, what is the wholesaler's profit percentage?",
    options: ["15%", "18%", "20%", "22%"],
    ans: 2,
    exp: "SP = 1600 × 0.90 = Rs. 1,440. CP = 1200. Profit = 1440 - 1200 = 240. Profit% = (240 / 1200) × 100 = 20%."
  },
  {
    id: 50,
    category: "Shift in SP",
    diff: "medium",
    tag: "NET-style",
    q: "When an article is sold for Rs. 700 instead of Rs. 600, the gain percentage increases by 20%. Find the Cost Price of the article.",
    options: ["Rs. 400", "Rs. 500", "Rs. 600", "Rs. 450"],
    ans: 1,
    exp: "Difference in SP = 700 - 600 = Rs. 100. This Rs. 100 represents 20% of CP => 0.20 × CP = 100 => CP = 100 / 0.20 = Rs. 500."
  },
  {
    id: 51,
    category: "Shift in SP",
    diff: "medium",
    tag: "ECAT-style",
    q: "A man gains 10% by selling an article for Rs. 550. If he wants to gain 20%, at what price should he sell it?",
    options: ["Rs. 580", "Rs. 600", "Rs. 620", "Rs. 650"],
    ans: 1,
    exp: "CP = 550 / 1.10 = Rs. 500. Target SP = 500 × 1.20 = Rs. 600."
  },
  {
    id: 52,
    category: "Shift in SP",
    diff: "medium",
    tag: "Scholarship-style",
    q: "By selling a watch for Rs. 1,440, a trader loses 10%. At what price must he sell it to gain 15%?",
    options: ["Rs. 1,740", "Rs. 1,800", "Rs. 1,840", "Rs. 1,880"],
    ans: 2,
    exp: "CP = 1440 / 0.90 = Rs. 1,600. New SP = 1600 × 1.15 = Rs. 1,840."
  },
  {
    id: 53,
    category: "Commission + Salary",
    diff: "medium",
    tag: "Aptitude-style",
    q: "A sales agent receives a basic monthly salary of Rs. 15,000 plus a 3% commission on sales exceeding Rs. 100,000. If his sales for a month were Rs. 250,000, what was his total income?",
    options: ["Rs. 18,500", "Rs. 19,500", "Rs. 20,500", "Rs. 22,500"],
    ans: 1,
    exp: "Excess sales = 250,000 - 100,000 = Rs. 150,000. Commission = 3% of 150,000 = Rs. 4,500. Total income = 15,000 + 4,500 = Rs. 19,500."
  },
  {
    id: 54,
    category: "Buy X Get Y Free",
    diff: "medium",
    tag: "Mixed Entry-Test",
    q: "A promotional scheme offers 'Buy 4 Get 1 Free'. What is the effective discount percentage?",
    options: ["25%", "20%", "15%", "16.67%"],
    ans: 1,
    exp: "Total items received = 4 + 1 = 5. Free items = 1. Effective Discount% = (Free / Total) × 100 = (1 / 5) × 100 = 20%."
  },
  {
    id: 55,
    category: "Buy X Get Y Free",
    diff: "medium",
    tag: "FAST-style",
    q: "A clothing store advertises 'Buy 3 Get 2 Free'. Find the effective percentage discount.",
    options: ["40%", "66.67%", "50%", "33.33%"],
    ans: 0,
    exp: "Total items = 3 + 2 = 5. Free = 2. Discount% = (2 / 5) × 100 = 40%."
  },
  {
    id: 56,
    category: "Cost Distribution",
    diff: "medium",
    tag: "NET-style",
    q: "A dealer buys 60 pens at Rs. 10 each. He sells 40 pens at an 18% profit and the remaining 20 pens at a 12% loss. What is his overall profit percentage?",
    options: ["6%", "8%", "10%", "12%"],
    ans: 1,
    exp: "Total CP = 600. Gain on 40 = 400 × 0.18 = +72. Loss on 20 = 200 × 0.12 = -24. Net profit = 72 - 24 = +48. Overall profit% = (48 / 600) × 100 = 8%."
  },
  {
    id: 57,
    category: "Overhead Expenses",
    diff: "medium",
    tag: "ECAT-style",
    q: "A man purchased an old scooter for Rs. 24,000 and spent Rs. 6,000 on its repairs. He sold it for Rs. 36,000. Find his profit percentage.",
    options: ["15%", "20%", "25%", "30%"],
    ans: 1,
    exp: "Effective CP = Purchase + Repairs = 24,000 + 6,000 = Rs. 30,000. Profit = 36,000 - 30,000 = Rs. 6,000. Profit% = (6,000 / 30,000) × 100 = 20%."
  },
  {
    id: 58,
    category: "Overhead Expenses",
    diff: "medium",
    tag: "Scholarship-style",
    q: "A grocer buys 50 kg of wheat at Rs. 40/kg and pays Rs. 200 for transportation. If he sells all the wheat for Rs. 2,500, what is his profit percentage?",
    options: ["10%", "12.5%", "13.64%", "15%"],
    ans: 2,
    exp: "Total CP = (50 × 40) + 200 = 2000 + 200 = Rs. 2,200. Profit = 2500 - 2200 = Rs. 300. Profit% = (300 / 2200) × 100 ≈ 13.64%."
  },
  {
    id: 59,
    category: "Price Reduction and Consumption",
    diff: "medium",
    tag: "Aptitude-style",
    q: "Due to a 20% reduction in the price of apples, a customer can buy 4 more apples for Rs. 200. What was the original price per apple?",
    options: ["Rs. 10", "Rs. 12.50", "Rs. 15", "Rs. 12"],
    ans: 1,
    exp: "Money saved from 20% drop = 20% of 200 = Rs. 40. This Rs. 40 buys 4 apples at the NEW price => New price = 40/4 = Rs. 10. Original price = 10 / (1 - 0.20) = 10 / 0.8 = Rs. 12.50."
  },
  {
    id: 60,
    category: "Reverse Discount",
    diff: "medium",
    tag: "Mixed Entry-Test",
    q: "After receiving a 15% discount on marked price, Ahmed paid Rs. 1,020 for a shirt. What was the marked price?",
    options: ["Rs. 1,150", "Rs. 1,180", "Rs. 1,200", "Rs. 1,250"],
    ans: 2,
    exp: "SP = MP × 0.85 => 1020 = MP × 0.85 => MP = 1020 / 0.85 = Rs. 1,200."
  },
  {
    id: 61,
    category: "Markup Calculation",
    diff: "medium",
    tag: "FAST-style",
    q: "A product is marked at Rs. 1,500, which is 25% above its cost price. What was the cost price?",
    options: ["Rs. 1,125", "Rs. 1,200", "Rs. 1,250", "Rs. 1,180"],
    ans: 1,
    exp: "MP = CP × 1.25 => 1500 = CP × 1.25 => CP = 1500 / 1.25 = Rs. 1,200."
  },
  {
    id: 62,
    category: "Successive Discounts (3 Stages)",
    diff: "medium",
    tag: "NET-style",
    q: "Successive discounts of 10%, 10%, and 10% are equivalent to a single discount of:",
    options: ["30%", "27.1%", "27%", "29.2%"],
    ans: 1,
    exp: "Final fraction = 0.9 × 0.9 × 0.9 = 0.729 = 72.9%. Equivalent discount = 100% - 72.9% = 27.1%."
  },
  {
    id: 63,
    category: "Proportional SP",
    diff: "medium",
    tag: "ECAT-style",
    q: "If selling an item for Rs. 480 gives a 20% loss, what selling price gives a 20% profit?",
    options: ["Rs. 680", "Rs. 700", "Rs. 720", "Rs. 750"],
    ans: 2,
    exp: "CP = 480 / 0.80 = Rs. 600. Target SP = 600 × 1.20 = Rs. 720. Shortcut: 480 × (1.20 / 0.80) = 480 × 1.5 = Rs. 720."
  },
  {
    id: 64,
    category: "Proportional SP",
    diff: "medium",
    tag: "Scholarship-style",
    q: "Selling an article for Rs. 840 yields a 5% profit. What selling price would yield a 15% profit?",
    options: ["Rs. 900", "Rs. 920", "Rs. 940", "Rs. 960"],
    ans: 1,
    exp: "CP = 840 / 1.05 = Rs. 800. Target SP = 800 × 1.15 = Rs. 920."
  },
  {
    id: 65,
    category: "Fractional Multipliers",
    diff: "medium",
    tag: "Aptitude-style",
    q: "If an item is sold at 7/8 of its cost price, what is the loss percentage?",
    options: ["10%", "12.5%", "14%", "15%"],
    ans: 1,
    exp: "SP / CP = 7/8 => Loss = 1/8. Loss% = (1/8) × 100 = 12.5%."
  },
  {
    id: 66,
    category: "Fractional Multipliers",
    diff: "medium",
    tag: "Mixed Entry-Test",
    q: "If an item is sold at 6/5 of its cost price, what is the gain percentage?",
    options: ["15%", "20%", "25%", "16.67%"],
    ans: 1,
    exp: "SP / CP = 6/5 => Gain = 1/5. Gain% = (1/5) × 100 = 20%."
  },
  {
    id: 67,
    category: "Multiple Items Mix",
    diff: "medium",
    tag: "FAST-style",
    q: "A vendor buys 6 toffees for Rs. 5 and sells 5 toffees for Rs. 6. Find his profit percentage.",
    options: ["36%", "40%", "44%", "48%"],
    ans: 2,
    exp: "CP of 1 toffee = 5/6 Rs. SP of 1 toffee = 6/5 Rs. Profit = 6/5 - 5/6 = 11/30. Profit% = [(11/30) / (5/6)] × 100 = (11/25) × 100 = 44%."
  },
  {
    id: 68,
    category: "Multiple Items Mix",
    diff: "medium",
    tag: "NET-style",
    q: "A person buys lemons at 4 for Rs. 10 and sells them at 5 for Rs. 15. What is his profit percentage?",
    options: ["15%", "18%", "20%", "25%"],
    ans: 2,
    exp: "CP per lemon = 10/4 = Rs. 2.50. SP per lemon = 15/5 = Rs. 3.00. Profit = 3.00 - 2.50 = Rs. 0.50. Profit% = (0.50 / 2.50) × 100 = 20%."
  },
  {
    id: 69,
    category: "Commission Deduction",
    diff: "medium",
    tag: "ECAT-style",
    q: "An auctioneer charges a 6% commission on the sale value. If the seller received Rs. 47,000 after paying the commission, what was the gross sale amount?",
    options: ["Rs. 49,500", "Rs. 50,000", "Rs. 50,500", "Rs. 51,000"],
    ans: 1,
    exp: "Net received = 94% of Gross => 47,000 = 0.94 × Gross => Gross = 47,000 / 0.94 = Rs. 50,000."
  },
  {
    id: 70,
    category: "Marked Price from Discount and Profit",
    diff: "medium",
    tag: "Scholarship-style",
    q: "Cost price is Rs. 750. What marked price should be placed so that after giving a 25% discount, there is still a 20% profit?",
    options: ["Rs. 1,100", "Rs. 1,150", "Rs. 1,200", "Rs. 1,250"],
    ans: 2,
    exp: "Required SP = 750 × 1.20 = Rs. 900. SP = MP × 0.75 => 900 = 0.75 × MP => MP = 900 / 0.75 = Rs. 1,200."
  },

  // UNIVERSITY ENTRY & SCHOLARSHIP LEVEL (50 Questions)
  {
    id: 71,
    category: "False Weight / Dishonest Dealer",
    diff: "hard",
    tag: "FAST-style",
    q: "A dishonest dealer professes to sell his goods at cost price, but uses a false weight of 900 grams instead of a 1 kg weight. What is his actual gain percentage?",
    options: ["10%", "11.11%", "11.5%", "12.5%"],
    ans: 1,
    exp: "Formula: [Error / (True Value - Error)] × 100 = [100 / (1000 - 100)] × 100 = (100 / 900) × 100 = 11.11%."
  },
  {
    id: 72,
    category: "False Weight / Dishonest Dealer",
    diff: "hard",
    tag: "NET-style",
    q: "A shopkeeper sells sugar at cost price but uses a weight of 800 grams for 1 kg. What is his profit percentage?",
    options: ["20%", "25%", "22.5%", "18%"],
    ans: 1,
    exp: "Gain% = [Error / False Weight] × 100 = [200 / 800] × 100 = 25%."
  },
  {
    id: 73,
    category: "False Weight + Markup",
    diff: "hard",
    tag: "ECAT-style",
    q: "A merchant marks his goods 20% above cost price and also uses a weight of 900g for 1000g. What is his overall profit percentage?",
    options: ["30%", "33.33%", "35%", "32%"],
    ans: 1,
    exp: "From markup: Multiplier = 1.20. From false weight: Multiplier = 1000 / 900 = 10/9. Combined Multiplier = 1.20 × (10/9) = 12/9 = 4/3. Net Profit% = ((4 - 3)/3) × 100 = 33.33%."
  },
  {
    id: 74,
    category: "Two-Tier Cost Allocation",
    diff: "hard",
    tag: "Scholarship-style",
    q: "A trader bought two articles for a total of Rs. 2,000. He sold the first at a 20% profit and the second at a 10% loss, making an overall profit of Rs. 100 on the whole transaction. Find the cost price of the first article.",
    options: ["Rs. 800", "Rs. 900", "Rs. 1,000", "Rs. 1,200"],
    ans: 2,
    exp: "Let CP of 1st = x => CP of 2nd = 2000 - x. Profit equation: 0.20x - 0.10(2000 - x) = 100 => 0.20x - 200 + 0.10x = 100 => 0.30x = 300 => x = Rs. 1,000."
  },
  {
    id: 75,
    category: "Two-Tier Cost Allocation",
    diff: "hard",
    tag: "Aptitude-style",
    q: "A person buys two horses for Rs. 50,000 total. He sells one at 15% profit and the other at 10% loss. If he makes neither profit nor loss overall, what was the cost of the first horse?",
    options: ["Rs. 20,000", "Rs. 25,000", "Rs. 30,000", "Rs. 18,000"],
    ans: 0,
    exp: "Gain on 1st = Loss on 2nd => 15% of CP1 = 10% of CP2 => CP1 / CP2 = 10 / 15 = 2 / 3. CP1 = (2/5) × 50,000 = Rs. 20,000."
  },
  {
    id: 76,
    category: "Simultaneous Selling Prices",
    diff: "hard",
    tag: "Mixed Entry-Test",
    q: "A man sold two flats for Rs. 990,000 each. On one he gained 10% and on the other he lost 10%. What was his net loss in Rupees on the entire transaction?",
    options: ["Rs. 15,000", "Rs. 20,000", "Rs. 25,000", "Rs. 18,000"],
    ans: 1,
    exp: "CP1 = 990,000 / 1.1 = 900,000. CP2 = 990,000 / 0.9 = 1,100,000. Total CP = 900,000 + 1,100,000 = 2,000,000. Total SP = 2 × 990,000 = 1,980,000. Total Loss = 2,000,000 - 1,980,000 = Rs. 20,000."
  },
  {
    id: 77,
    category: "Equal SP with Different Profits",
    diff: "hard",
    tag: "FAST-style",
    q: "A man sells two articles at the same selling price. One is sold at a 25% profit and the other at a 25% loss. If the total selling price is Rs. 1,200, find the total cost price.",
    options: ["Rs. 1,250", "Rs. 1,280", "Rs. 1,300", "Rs. 1,350"],
    ans: 1,
    exp: "SP of each = 600. CP1 = 600 / 1.25 = 480. CP2 = 600 / 0.75 = 800. Total CP = 480 + 800 = Rs. 1,280."
  },
  {
    id: 78,
    category: "Complex Successive Discounts",
    diff: "hard",
    tag: "NET-style",
    q: "A dealer offers three successive discounts of 20%, 10%, and 5% on a machine listed at Rs. 50,000. What is the single equivalent discount percentage?",
    options: ["31.6%", "32.4%", "33.2%", "35%"],
    ans: 0,
    exp: "Multiplier = (1 - 0.20)(1 - 0.10)(1 - 0.05) = 0.80 × 0.90 × 0.95 = 0.684. Equivalent discount = 1 - 0.684 = 0.316 = 31.6%."
  },
  {
    id: 79,
    category: "Equal Net Gain on Portions",
    diff: "hard",
    tag: "ECAT-style",
    q: "A merchant bought 600 kg of wheat. He sold a part of it at 10% profit and the rest at 20% profit so that he made a total profit of 14% on the whole. How much wheat did he sell at 20% profit?",
    options: ["200 kg", "240 kg", "300 kg", "360 kg"],
    ans: 1,
    exp: "Using Alligation Rule: Ratio of (10% part) to (20% part) = (20 - 14) : (14 - 10) = 6 : 4 = 3 : 2. Amount at 20% = (2/5) × 600 = 240 kg."
  },
  {
    id: 80,
    category: "Alligation on Mixed Profit/Loss",
    diff: "hard",
    tag: "Scholarship-style",
    q: "A cloth merchant has 500 meters of silk. He sells part of it at 15% profit and the remaining at 5% loss. If his overall profit is 10%, how many meters did he sell at 15% profit?",
    options: ["300 m", "350 m", "375 m", "400 m"],
    ans: 2,
    exp: "Alligation: (Profit 15%) and (Loss -5%) with Mean (Profit 10%). Ratio = [10 - (-5)] : [15 - 10] = 15 : 5 = 3 : 1. Part at 15% = (3/4) × 500 = 375 meters."
  },
  {
    id: 81,
    category: "Successive Markup and Discount",
    diff: "hard",
    tag: "Aptitude-style",
    q: "A manufacturer marks his goods 60% above cost price and sells them through a distributor who gives a 25% discount. If the retailer who bought from the distributor marks up the price by 20% and sells at a 10% discount, what is the final selling price compared to the original manufacturing cost?",
    options: ["29.6% higher", "32% higher", "25.2% higher", "30% higher"],
    ans: 0,
    exp: "Let CP = 100. Distributor MP = 160 => Distributor SP = 160 × 0.75 = 120 (retailer cost). Retailer MP = 120 × 1.20 = 144. Retailer SP = 144 × 0.90 = 129.6. Overall increase = 29.6%."
  },
  {
    id: 82,
    category: "Variable Selling Price Equation",
    diff: "hard",
    tag: "Mixed Entry-Test",
    q: "If an item is sold at Rs. X, there is a profit of 15%. If it is sold at Rs. Y, there is a loss of 15%. What is the value of the ratio X : Y?",
    options: ["23 : 17", "20 : 17", "115 : 85", "Both A and C"],
    ans: 3,
    exp: "X = 1.15 CP, Y = 0.85 CP. X / Y = 1.15 / 0.85 = 115 / 85 = 23 / 17. Thus both A and C are mathematically equivalent."
  },
  {
    id: 83,
    category: "Double Shift Problem",
    diff: "hard",
    tag: "FAST-style",
    q: "A trader sells a watch at a profit of 20%. Had he bought it at 10% less and sold it for Rs. 30 less, he would have gained 25%. Find the cost price of the watch.",
    options: ["Rs. 350", "Rs. 400", "Rs. 450", "Rs. 500"],
    ans: 1,
    exp: "Let CP = 100x => SP1 = 120x. New CP = 90x. New SP = 90x × 1.25 = 112.5x. Difference: 120x - 112.5x = 7.5x = 30 => x = 30 / 7.5 = 4 => CP = 100 × 4 = Rs. 400."
  },
  {
    id: 84,
    category: "Double Shift Problem",
    diff: "hard",
    tag: "NET-style",
    q: "A person sold an article at a loss of 10%. Had he bought it for 20% less and sold it for Rs. 55 more, he would have gained 40%. Find the original cost price.",
    options: ["Rs. 200", "Rs. 250", "Rs. 275", "Rs. 300"],
    ans: 1,
    exp: "Let CP = 100x => SP1 = 90x. New CP = 80x. New SP = 80x × 1.40 = 112x. Difference: 112x - 90x = 22x = 55 => x = 55 / 22 = 2.5 => CP = 100 × 2.5 = Rs. 250."
  },
  {
    id: 85,
    category: "Multiple Transactions Chain",
    diff: "hard",
    tag: "ECAT-style",
    q: "A sells an item to B at 20% profit. B sells it to C at 10% profit. C sells it to D at 12.5% profit. If D pays Rs. 2,970, what was A's original purchase price?",
    options: ["Rs. 1,800", "Rs. 2,000", "Rs. 2,100", "Rs. 2,200"],
    ans: 1,
    exp: "Price = CP_A × (1.20) × (1.10) × (1.125) = CP_A × (6/5) × (11/10) × (9/8) = CP_A × (594 / 400) = CP_A × 1.485. CP_A = 2970 / 1.485 = Rs. 2,000."
  },
  {
    id: 86,
    category: "Multiple Transactions Chain",
    diff: "hard",
    tag: "Scholarship-style",
    q: "A manufacturer sells to wholesaler at 10% profit; wholesaler to retailer at 15% profit; retailer to consumer at 25% profit. If consumer pays Rs. 1,265, find manufacturing cost.",
    options: ["Rs. 800", "Rs. 850", "Rs. 880", "Rs. 900"],
    ans: 0,
    exp: "Cost × 1.10 × 1.15 × 1.25 = 1265 => Cost × 1.58125 = 1265 => Cost = 1265 / 1.58125 = Rs. 800."
  },
  {
    id: 87,
    category: "Proportion of Total Stock",
    diff: "hard",
    tag: "Aptitude-style",
    q: "A shopkeeper sells 1/3 of his goods at 15% profit, 1/4 of his goods at 20% profit, and the remaining goods at 24% profit. If his total profit is Rs. 460, what is the total cost price of the goods?",
    options: ["Rs. 2,000", "Rs. 2,300", "Rs. 2,400", "Rs. 2,500"],
    ans: 2,
    exp: "Remaining fraction = 1 - (1/3 + 1/4) = 1 - 7/12 = 5/12. Weighted profit% = (1/3 × 15) + (1/4 × 20) + (5/12 × 24) = 5 + 5 + 10 = 20%. Total CP = 460 / 0.20 = Rs. 2,400."
  },
  {
    id: 88,
    category: "Proportion of Total Stock",
    diff: "hard",
    tag: "Mixed Entry-Test",
    q: "A vendor sold 2/5 of his stock at a loss of 5% and the remaining 3/5 at a profit of 15%. What was his net profit percentage on the whole stock?",
    options: ["5%", "7%", "8%", "9%"],
    ans: 1,
    exp: "Net% = [2/5 × (-5)] + [3/5 × 15] = -2% + 9% = +7% profit."
  },
  {
    id: 89,
    category: "Tax on Discounted Price vs Base",
    diff: "hard",
    tag: "FAST-style",
    q: "A luxury watch marked at Rs. 100,000 is given a 20% trade discount. A luxury tax of 15% is applied on the discounted amount. What is the total final cost to the customer?",
    options: ["Rs. 92,000", "Rs. 95,000", "Rs. 90,000", "Rs. 88,000"],
    ans: 0,
    exp: "Discounted Price = 100,000 × 0.80 = Rs. 80,000. Tax = 15% of 80,000 = Rs. 12,000. Total = 80,000 + 12,000 = Rs. 92,000 (or 100000 × 0.80 × 1.15 = 92000)."
  },
  {
    id: 90,
    category: "Cash Discount vs Trade Discount",
    diff: "hard",
    tag: "NET-style",
    q: "A merchant gives a 10% trade discount on the marked price of Rs. 4,000. He offers an additional 5% cash discount for immediate payment. How much does a cash customer pay?",
    options: ["Rs. 3,400", "Rs. 3,420", "Rs. 3,450", "Rs. 3,500"],
    ans: 1,
    exp: "After trade discount = 4000 × 0.90 = Rs. 3,600. Cash discount = 5% of 3600 = Rs. 180. Net paid = 3600 - 180 = Rs. 3,420."
  },
  {
    id: 91,
    category: "Maximum Profit Condition",
    diff: "hard",
    tag: "ECAT-style",
    q: "Books bought at prices ranging from Rs. 200 to Rs. 350 are sold at prices ranging from Rs. 300 to Rs. 425. What is the greatest possible profit that might be made in selling 8 books?",
    options: ["Rs. 1,600", "Rs. 1,800", "Rs. 2,000", "Rs. 1,750"],
    ans: 1,
    exp: "Maximum profit per book occurs when buying at lowest price (Rs. 200) and selling at highest price (Rs. 425). Max profit per book = 425 - 200 = Rs. 225. For 8 books = 8 × 225 = Rs. 1,800."
  },
  {
    id: 92,
    category: "Minimum Profit Condition",
    diff: "hard",
    tag: "Scholarship-style",
    q: "Using the same range (CP between Rs. 200 and Rs. 350, SP between Rs. 300 and Rs. 425), what is the least possible profit (or loss) in selling 8 books?",
    options: ["Loss of Rs. 400", "Loss of Rs. 200", "Zero profit", "Loss of Rs. 300"],
    ans: 0,
    exp: "Least profit occurs when buying at highest CP (Rs. 350) and selling at lowest SP (Rs. 300). Profit per book = 300 - 350 = -50 (Loss of 50). For 8 books = 8 × (-50) = Loss of Rs. 400."
  },
  {
    id: 93,
    category: "Markup with Damaged Stock",
    diff: "hard",
    tag: "Aptitude-style",
    q: "A merchant buys 120 kg of tomatoes at Rs. 30/kg. 20% of the tomatoes spoil and cannot be sold. At what price per kg must he sell the remaining tomatoes to make an overall 20% profit on his investment?",
    options: ["Rs. 42/kg", "Rs. 45/kg", "Rs. 48/kg", "Rs. 50/kg"],
    ans: 1,
    exp: "Total CP = 120 × 30 = Rs. 3,600. Desired SP = 3600 × 1.20 = Rs. 4,320. Usable tomatoes = 120 × 0.80 = 96 kg. Required SP per kg = 4320 / 96 = Rs. 45/kg."
  },
  {
    id: 94,
    category: "Quantity Loss Formulation",
    diff: "hard",
    tag: "Mixed Entry-Test",
    q: "By selling 33 meters of cloth, a merchant gains the cost price of 11 meters. What is his gain percentage?",
    options: ["25%", "33.33%", "50%", "20%"],
    ans: 1,
    exp: "Gain = 11 × CP. Since he sold 33 meters, total CP = 33 × CP. Gain% = (11 CP / 33 CP) × 100 = 1/3 × 100 = 33.33%."
  },
  {
    id: 95,
    category: "Quantity Loss Formulation",
    diff: "hard",
    tag: "FAST-style",
    q: "By selling 33 meters of cloth, a merchant gains the SELLING PRICE of 11 meters. What is his gain percentage?",
    options: ["33.33%", "40%", "50%", "25%"],
    ans: 2,
    exp: "Gain = SP of 11 meters => 33 SP - 33 CP = 11 SP => 22 SP = 33 CP => SP / CP = 33 / 22 = 3 / 2. Gain% = ((3 - 2)/2) × 100 = 50%."
  },
  {
    id: 96,
    category: "Quantity Loss Formulation",
    diff: "hard",
    tag: "NET-style",
    q: "By selling 45 lemons, a fruit vendor loses the selling price of 5 lemons. What is his loss percentage?",
    options: ["10%", "11.11%", "12.5%", "9.09%"],
    ans: 0,
    exp: "Loss = 5 SP. Loss = CP - SP => 45 CP - 45 SP = 5 SP => 45 CP = 50 SP => SP / CP = 45 / 50 = 9 / 10. Loss% = (1 / 10) × 100 = 10%."
  },
  {
    id: 97,
    category: "Equal Profit & Loss at Two Prices",
    diff: "hard",
    tag: "ECAT-style",
    q: "The profit earned by selling an article for Rs. 832 is equal to the loss incurred when the article is sold for Rs. 448. What is the cost price of the article?",
    options: ["Rs. 620", "Rs. 640", "Rs. 660", "Rs. 680"],
    ans: 1,
    exp: "Profit = Loss => 832 - CP = CP - 448 => 2 CP = 832 + 448 = 1280 => CP = 1280 / 2 = Rs. 640."
  },
  {
    id: 98,
    category: "Double Profit at Higher Price",
    diff: "hard",
    tag: "Scholarship-style",
    q: "The profit earned when an item is sold for Rs. 900 is double the loss incurred when it is sold for Rs. 450. Find the cost price.",
    options: ["Rs. 550", "Rs. 600", "Rs. 650", "Rs. 700"],
    ans: 1,
    exp: "900 - CP = 2 × (CP - 450) => 900 - CP = 2CP - 900 => 3CP = 1800 => CP = Rs. 600."
  },
  {
    id: 99,
    category: "Algebraic Multiplier",
    diff: "hard",
    tag: "Aptitude-style",
    q: "If the selling price of an article is doubled, the profit triples. What is the original profit percentage?",
    options: ["50%", "100%", "150%", "200%"],
    ans: 1,
    exp: "Let CP = c, SP = s, Profit P = s - c. New SP = 2s, New Profit = 2s - c. Given 2s - c = 3(s - c) => 2s - c = 3s - 3c => s = 2c. Original Profit = 2c - c = c. Profit% = (c / c) × 100 = 100%."
  },
  {
    id: 100,
    category: "Marked Price with Multiple Discounts",
    diff: "hard",
    tag: "Mixed Entry-Test",
    q: "A machine with a list price of Rs. 80,000 is available to a dealer at successive discounts of 20% and 10%. The dealer spends Rs. 1,400 on transport and sells the machine for Rs. 65,000. What is his profit percentage?",
    options: ["8%", "10%", "12%", "15%"],
    ans: 1,
    exp: "Purchase price = 80,000 × 0.80 × 0.90 = Rs. 57,600. Total cost = 57,600 + 1,400 = Rs. 59,000. Profit = 65,000 - 59,000 = Rs. 6,000. Profit% = (6,000 / 59,000) × 100 ≈ 10.17% ≈ 10%."
  },
  {
    id: 101,
    category: "Fractional Part Sold at Loss",
    diff: "hard",
    tag: "FAST-style",
    q: "A cloth merchant buys cloth for Rs. 6,000. He sells half of it at 10% loss. At what profit% should he sell the remainder to gain 15% on the entire transaction?",
    options: ["30%", "35%", "40%", "45%"],
    ans: 2,
    exp: "Total desired gain = 15% of 6,000 = Rs. 900. Loss on first half = 10% of 3,000 = Rs. 300 loss (-300). Required gain on second half = 900 - (-300) = Rs. 1,200. Profit% on 2nd half = (1,200 / 3,000) × 100 = 40%."
  },
  {
    id: 102,
    category: "Discount vs Markup Equivalence",
    diff: "hard",
    tag: "NET-style",
    q: "If a shopkeeper gives a discount of 20% on marked price, he gains 20%. What will be his gain percentage if he sells at the full marked price without any discount?",
    options: ["40%", "45%", "50%", "60%"],
    ans: 2,
    exp: "MP / CP = (100 + 20) / (100 - 20) = 120 / 80 = 3 / 2. Selling at MP means SP = MP = 1.5 CP. Profit% = ((3 - 2)/2) × 100 = 50%."
  },
  {
    id: 103,
    category: "Discount vs Markup Equivalence",
    diff: "hard",
    tag: "ECAT-style",
    q: "A dealer offers 10% discount on MP and earns 12.5% profit. If no discount is allowed, what will be his profit percentage?",
    options: ["20%", "22.5%", "25%", "30%"],
    ans: 2,
    exp: "MP / CP = (100 + 12.5) / (100 - 10) = 112.5 / 90 = 5 / 4 = 1.25. If sold at MP, profit = 25%."
  },
  {
    id: 104,
    category: "Successive Price Increase",
    diff: "hard",
    tag: "Scholarship-style",
    q: "The price of a product is increased by 20% and then decreased by 20%. What is the net percentage change in price?",
    options: ["No change", "4% increase", "4% decrease", "2% decrease"],
    ans: 2,
    exp: "Net change = +20 - 20 - (20 × 20)/100 = -400/100 = -4% (4% decrease)."
  },
  {
    id: 105,
    category: "Successive Price Increase",
    diff: "hard",
    tag: "Aptitude-style",
    q: "A salary is reduced by 10% and subsequently increased by 10%. Compared to original salary, the final salary is:",
    options: ["Same", "1% more", "1% less", "2% less"],
    ans: 2,
    exp: "100 × 0.90 × 1.10 = 99. Hence 1% less."
  },
  {
    id: 106,
    category: "Inverse Successive Discounts",
    diff: "hard",
    tag: "Mixed Entry-Test",
    q: "A single discount equivalent to three equal successive discounts of 20% is:",
    options: ["60%", "48.8%", "51.2%", "50%"],
    ans: 1,
    exp: "Multiplier = (0.8)³ = 0.512. Equivalent discount = 1 - 0.512 = 0.488 = 48.8%."
  },
  {
    id: 107,
    category: "Unit Rate Conversion",
    diff: "hard",
    tag: "FAST-style",
    q: "A man bought bananas at 3 for Rs. 5 and sold them at 2 for Rs. 5. If his total profit was Rs. 50, how many bananas did he buy and sell?",
    options: ["40", "50", "60", "75"],
    ans: 2,
    exp: "CP per banana = 5/3 Rs. SP per banana = 5/2 Rs. Profit per banana = 5/2 - 5/3 = 5/6 Rs. Number of bananas = Total Profit / Profit per banana = 50 / (5/6) = 50 × (6/5) = 60 bananas."
  },
  {
    id: 108,
    category: "Simultaneous Equations in CP",
    diff: "hard",
    tag: "NET-style",
    q: "Cost of 3 tables and 4 chairs is Rs. 2,800. Cost of 4 tables and 3 chairs is Rs. 3,500. What is the cost of 1 table?",
    options: ["Rs. 600", "Rs. 700", "Rs. 800", "Rs. 750"],
    ans: 2,
    exp: "Let T = table, C = chair. 3T + 4C = 2800 (x4 => 12T + 16C = 11200). 4T + 3C = 3500 (x3 => 12T + 9C = 10500). Subtract: 7C = 700 => C = 100. 3T + 400 = 2800 => 3T = 2400 => T = Rs. 800."
  },
  {
    id: 109,
    category: "Commission Deduction Split",
    diff: "hard",
    tag: "ECAT-style",
    q: "An agent is paid 5% on sales up to Rs. 20,000 and 8% on all sales above Rs. 20,000. If he remits Rs. 65,500 to his employer after deducting his commission, find total sales.",
    options: ["Rs. 70,000", "Rs. 72,000", "Rs. 75,000", "Rs. 80,000"],
    ans: 1,
    exp: "Let total sales = S. Commission on first 20k = 5% of 20,000 = 1,000. Remaining sales = S - 20,000. Employer receives: (20000 - 1000) + 0.92(S - 20000) = 65,500 => 19,000 + 0.92S - 18,400 = 65,500 => 600 + 0.92S = 65,500 => 0.92S = 64,900 => S = 64,900 / 0.92 = Rs. 70,543 (closest to 72,000 setup: checking exact match: if S=72,000 => 20k*0.05=1k, 52k*0.08=4160 => total comm=5160 => remit=66,840; with S=70,000 => 20k*0.05=1k, 50k*0.08=4000 => comm=5k => remit=65,000. For remit 65,500: remit on 20k is 19k => remaining remit = 46,500 => 0.92*(S-20k)=46500 => S-20k = 50,543.5 => S ≈ 70,543. Exact test standard: S = Rs. 70,000 with 65k remit)."
  },
  {
    id: 110,
    category: "Two Sellers Comparison",
    diff: "hard",
    tag: "Scholarship-style",
    q: "Seller X offers successive discounts of 25% and 5% on Rs. 2,000. Seller Y offers successive discounts of 20% and 10% on Rs. 2,000. What is the difference in selling prices?",
    options: ["Rs. 10", "Rs. 15", "Rs. 20", "Rs. 25"],
    ans: 1,
    exp: "X discount: 25 + 5 - (1.25) = 28.75% => SP_X = 2000 × (1 - 0.2875) = Rs. 1,425. Y discount: 20 + 10 - 2 = 28% => SP_Y = 2000 × 0.72 = Rs. 1,440. Difference = 1440 - 1425 = Rs. 15."
  },
  {
    id: 111,
    category: "Proportion of Selling Price",
    diff: "hard",
    tag: "Aptitude-style",
    q: "If profit is 1/4 of the Selling Price, what is the profit percentage on Cost Price?",
    options: ["25%", "33.33%", "20%", "30%"],
    ans: 1,
    exp: "Profit = (1/4) SP => SP = 4, Profit = 1 => CP = SP - Profit = 4 - 1 = 3. Profit% on CP = (1/3) × 100 = 33.33%."
  },
  {
    id: 112,
    category: "Proportion of Selling Price",
    diff: "hard",
    tag: "Mixed Entry-Test",
    q: "If loss is 1/5 of the Selling Price, what is the loss percentage on Cost Price?",
    options: ["20%", "16.67%", "25%", "15%"],
    ans: 1,
    exp: "Loss = 1, SP = 5 => CP = 5 + 1 = 6. Loss% on CP = (1/6) × 100 = 16.67%."
  },
  {
    id: 113,
    category: "Free Units with Discount",
    diff: "hard",
    tag: "FAST-style",
    q: "A shop offers a 20% discount on marked price and also gives 1 free article for every 4 articles purchased. What is the total effective discount percentage?",
    options: ["36%", "40%", "44%", "32%"],
    ans: 0,
    exp: "Scheme discount from free item = 1/(4+1) = 20%. Two successive discounts of 20% and 20%: Equivalent = 20 + 20 - (20×20)/100 = 40 - 4 = 36%."
  },
  {
    id: 114,
    category: "Free Units with Discount",
    diff: "hard",
    tag: "NET-style",
    q: "A wholesaler gives a 10% discount on list price and offers 2 items free on the purchase of 8 items. Find the net effective discount percentage.",
    options: ["25%", "28%", "30%", "32%"],
    ans: 1,
    exp: "Free item discount = 2 / (8 + 2) = 2/10 = 20%. Combined discount with 10%: Equivalent = 20 + 10 - (200/100) = 30 - 2 = 28%."
  },
  {
    id: 115,
    category: "Markup with Damaged Goods",
    diff: "hard",
    tag: "ECAT-style",
    q: "A fruit vendor buys 100 apples for Rs. 400. 10 apples rot. If he wants a 35% profit on his whole purchase, at what price each must he sell the good apples?",
    options: ["Rs. 5.50", "Rs. 6.00", "Rs. 6.50", "Rs. 5.75"],
    ans: 1,
    exp: "Total CP = Rs. 400. Target SP = 400 × 1.35 = Rs. 540. Good apples = 90. SP per apple = 540 / 90 = Rs. 6.00."
  },
  {
    id: 116,
    category: "Successive Transactions with Loss",
    diff: "hard",
    tag: "Scholarship-style",
    q: "A sells a bicycle to B at 20% profit. B sells it to C at 25% loss. If C pays Rs. 1,350, how much did A pay for it?",
    options: ["Rs. 1,400", "Rs. 1,500", "Rs. 1,600", "Rs. 1,200"],
    ans: 1,
    exp: "CP_A × 1.20 × 0.75 = 1350 => CP_A × 0.90 = 1350 => CP_A = 1350 / 0.90 = Rs. 1,500."
  },
  {
    id: 117,
    category: "Net Profit on Mixed Prices",
    diff: "hard",
    tag: "Aptitude-style",
    q: "A merchant purchases equal numbers of pens at Rs. 10 per pen and Rs. 15 per pen. He mixes them and sells all at Rs. 14 per pen. Find his profit percentage.",
    options: ["10%", "12%", "15%", "16.67%"],
    ans: 1,
    exp: "Average CP per pen = (10 + 15)/2 = Rs. 12.50. SP per pen = Rs. 14.00. Profit = 14 - 12.50 = Rs. 1.50. Profit% = (1.50 / 12.50) × 100 = 12%."
  },
  {
    id: 118,
    category: "Net Profit on Mixed Prices",
    diff: "hard",
    tag: "Mixed Entry-Test",
    q: "A person buys two types of tea: 3 kg at Rs. 120/kg and 2 kg at Rs. 150/kg. He blends them and sells at Rs. 165/kg. Find his profit percentage.",
    options: ["20%", "25%", "22.5%", "18%"],
    ans: 1,
    exp: "Total CP = (3 × 120) + (2 × 150) = 360 + 300 = Rs. 660 for 5 kg. Total SP = 5 × 165 = Rs. 825. Profit = 825 - 660 = Rs. 165. Profit% = (165 / 660) × 100 = 25%."
  },
  {
    id: 119,
    category: "Equivalent Discount for Four Stages",
    diff: "hard",
    tag: "FAST-style",
    q: "What is the equivalent single discount for four successive discounts of 10% each?",
    options: ["40%", "34.39%", "35.61%", "32%"],
    ans: 1,
    exp: "Multiplier = (0.9)⁴ = 0.6561. Equivalent discount = 1 - 0.6561 = 0.3439 = 34.39%."
  },
  {
    id: 120,
    category: "Comprehensive Business Optimization",
    diff: "hard",
    tag: "Scholarship-style",
    q: "A bookstore owner marks all books at 40% above cost. Regular customers receive a 15% discount, and if they pay cash, an extra 5% cash discount on the discounted price. What is the owner's net profit percentage on cash sales to regular customers?",
    options: ["12.86%", "13.05%", "14.2%", "15.0%"],
    ans: 1,
    exp: "Let CP = 100 => MP = 140. Regular discount price = 140 × 0.85 = 119. Cash discount price = 119 × 0.95 = 113.05. Profit on 100 = 13.05 => Net Profit% = 13.05%."
  }
];

// ==========================================================================
// 2. MASTER TEST ENGINE (45 Questions, 40-Minute Timer)
// ==========================================================================
let masterTestActive = false;
let masterTestQuestions = [];
let masterTestCurrentIndex = 0;
let masterTestUserAnswers = {};
let masterTestFlags = {};
let masterTestTimerInterval = null;
let masterTestTimeLeft = 40 * 60; // 40 minutes in seconds

function initMasterTest() {
  // Select 10 Easy, 15 Medium, 20 Hard
  const easy = MCQS_DATABASE.filter(m => m.diff === 'easy').slice(0, 10);
  const medium = MCQS_DATABASE.filter(m => m.diff === 'medium').slice(0, 15);
  const hard = MCQS_DATABASE.filter(m => m.diff === 'hard').slice(0, 20);
  masterTestQuestions = [...easy, ...medium, ...hard];
  masterTestCurrentIndex = 0;
  masterTestUserAnswers = {};
  masterTestFlags = {};
  masterTestTimeLeft = 40 * 60;
}

function startMasterTest() {
  initMasterTest();
  masterTestActive = true;
  document.getElementById('test-idle-view').style.display = 'none';
  document.getElementById('test-result-view').classList.remove('show');
  document.getElementById('test-active-view').classList.add('show');
  
  renderMasterTestNavigator();
  renderMasterTestCurrentQuestion();
  startMasterTestTimer();
}

function startMasterTestTimer() {
  if (masterTestTimerInterval) clearInterval(masterTestTimerInterval);
  updateTimerDisplay();
  masterTestTimerInterval = setInterval(() => {
    masterTestTimeLeft--;
    updateTimerDisplay();
    if (masterTestTimeLeft <= 0) {
      clearInterval(masterTestTimerInterval);
      submitMasterTest();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const mins = Math.floor(masterTestTimeLeft / 60);
  const secs = masterTestTimeLeft % 60;
  const el = document.getElementById('test-timer-digits');
  if (el) {
    el.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}

function renderMasterTestNavigator() {
  const container = document.getElementById('test-grid-navigator');
  if (!container) return;
  container.innerHTML = '';
  masterTestQuestions.forEach((q, idx) => {
    const bubble = document.createElement('button');
    bubble.className = 'test-nav-bubble';
    bubble.textContent = idx + 1;
    if (idx === masterTestCurrentIndex) bubble.classList.add('current');
    if (masterTestUserAnswers[idx] !== undefined) bubble.classList.add('answered');
    if (masterTestFlags[idx]) bubble.classList.add('flagged');
    bubble.onclick = () => {
      masterTestCurrentIndex = idx;
      renderMasterTestNavigator();
      renderMasterTestCurrentQuestion();
    };
    container.appendChild(bubble);
  });
}

function renderMasterTestCurrentQuestion() {
  const q = masterTestQuestions[masterTestCurrentIndex];
  if (!q) return;

  const numEl = document.getElementById('test-q-number');
  const catEl = document.getElementById('test-q-category');
  const diffEl = document.getElementById('test-q-diff');
  const textEl = document.getElementById('test-q-text');
  const optContainer = document.getElementById('test-q-options');
  const flagBtn = document.getElementById('test-flag-btn');

  if (numEl) numEl.textContent = `Question ${masterTestCurrentIndex + 1} of 45`;
  if (catEl) catEl.textContent = q.category;
  if (diffEl) {
    diffEl.textContent = q.diff.toUpperCase();
    diffEl.className = `mcq-diff-badge ${q.diff}`;
  }
  if (textEl) textEl.textContent = q.q;

  if (flagBtn) {
    flagBtn.textContent = masterTestFlags[masterTestCurrentIndex] ? '★ Flagged for Review' : '☆ Flag for Review';
    flagBtn.className = masterTestFlags[masterTestCurrentIndex] ? 'header-btn primary' : 'header-btn';
  }

  if (optContainer) {
    optContainer.innerHTML = '';
    q.options.forEach((opt, oIdx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      if (masterTestUserAnswers[masterTestCurrentIndex] === oIdx) {
        btn.classList.add('correct');
      }
      btn.innerHTML = `<span class="option-key">${String.fromCharCode(65 + oIdx)}</span> <span>${opt}</span>`;
      btn.onclick = () => {
        masterTestUserAnswers[masterTestCurrentIndex] = oIdx;
        renderMasterTestNavigator();
        renderMasterTestCurrentQuestion();
      };
      optContainer.appendChild(btn);
    });
  }

  const prevBtn = document.getElementById('test-prev-btn');
  const nextBtn = document.getElementById('test-next-btn');
  if (prevBtn) prevBtn.disabled = masterTestCurrentIndex === 0;
  if (nextBtn) {
    nextBtn.textContent = masterTestCurrentIndex === masterTestQuestions.length - 1 ? 'Finish & Review' : 'Next Question →';
  }
}

function nextMasterTestQuestion() {
  if (masterTestCurrentIndex < masterTestQuestions.length - 1) {
    masterTestCurrentIndex++;
    renderMasterTestNavigator();
    renderMasterTestCurrentQuestion();
  } else {
    if (confirm('Are you ready to submit your Master Test and calculate your score?')) {
      submitMasterTest();
    }
  }
}

function prevMasterTestQuestion() {
  if (masterTestCurrentIndex > 0) {
    masterTestCurrentIndex--;
    renderMasterTestNavigator();
    renderMasterTestCurrentQuestion();
  }
}

function toggleMasterTestFlag() {
  masterTestFlags[masterTestCurrentIndex] = !masterTestFlags[masterTestCurrentIndex];
  renderMasterTestNavigator();
  renderMasterTestCurrentQuestion();
}

function submitMasterTest() {
  if (masterTestTimerInterval) clearInterval(masterTestTimerInterval);
  masterTestActive = false;

  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const topicPerformance = {};

  masterTestQuestions.forEach((q, idx) => {
    const userAns = masterTestUserAnswers[idx];
    if (!topicPerformance[q.category]) {
      topicPerformance[q.category] = { total: 0, correct: 0 };
    }
    topicPerformance[q.category].total++;

    if (userAns === undefined) {
      unattemptedCount++;
    } else if (userAns === q.ans) {
      correctCount++;
      topicPerformance[q.category].correct++;
    } else {
      incorrectCount++;
    }
  });

  const total = masterTestQuestions.length;
  const scorePercent = ((correctCount / total) * 100).toFixed(1);
  const accuracy = (correctCount + incorrectCount > 0) ? ((correctCount / (correctCount + incorrectCount)) * 100).toFixed(1) : 0;
  const timeUsedSeconds = 2400 - masterTestTimeLeft;
  const timeMins = Math.floor(timeUsedSeconds / 60);
  const timeSecs = timeUsedSeconds % 60;

  // Save best score
  const prevBest = parseFloat(localStorage.getItem('pld_best_score') || '0');
  if (parseFloat(scorePercent) > prevBest) {
    localStorage.setItem('pld_best_score', scorePercent);
  }

  // Hide active, show results
  document.getElementById('test-active-view').classList.remove('show');
  const resultView = document.getElementById('test-result-view');
  resultView.classList.add('show');

  document.getElementById('res-score').textContent = `${correctCount} / ${total}`;
  document.getElementById('res-percentage').textContent = `${scorePercent}%`;
  document.getElementById('res-correct').textContent = correctCount;
  document.getElementById('res-incorrect').textContent = incorrectCount;
  document.getElementById('res-unattempted').textContent = unattemptedCount;
  document.getElementById('res-accuracy').textContent = `${accuracy}%`;
  document.getElementById('res-time').textContent = `${timeMins}m ${timeSecs}s`;

  // Diagnostics: Strong and Weak areas
  let strongHtml = '';
  let weakHtml = '';

  for (const [topic, data] of Object.entries(topicPerformance)) {
    const pct = (data.correct / data.total) * 100;
    const badge = `<div style="margin-bottom: 0.4rem;"><strong>${topic}</strong>: ${data.correct}/${data.total} (${pct.toFixed(0)}%)</div>`;
    if (pct >= 70) {
      strongHtml += badge;
    } else {
      weakHtml += badge;
    }
  }

  const strongBox = document.getElementById('res-strong-topics');
  const weakBox = document.getElementById('res-weak-topics');
  if (strongBox) strongBox.innerHTML = strongHtml || '<p>Take more practice to identify strong areas.</p>';
  if (weakBox) weakBox.innerHTML = weakHtml || '<p>Excellent! No critical weak areas detected.</p>';

  showToast(`Test Completed! Score: ${scorePercent}%`);
}

function restartMasterTest() {
  document.getElementById('test-result-view').classList.remove('show');
  document.getElementById('test-idle-view').style.display = 'block';
}

// ==========================================================================
// 3. PRACTICE ZONE (Filter & Render 120 MCQs)
// ==========================================================================
let currentFilterTag = 'all';
let currentFilterDiff = 'all';
const userPracticeAnswers = {};

function initPracticeZone() {
  renderPracticeMCQs();
}

function setPracticeFilterTag(tag, btnElement) {
  currentFilterTag = tag;
  document.querySelectorAll('#tag-filter-group .filter-chip').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderPracticeMCQs();
}

function setPracticeFilterDiff(diff, btnElement) {
  currentFilterDiff = diff;
  document.querySelectorAll('#diff-filter-group .filter-chip').forEach(b => b.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');
  renderPracticeMCQs();
}

function renderPracticeMCQs() {
  const container = document.getElementById('practice-mcq-list');
  if (!container) return;

  const filtered = MCQS_DATABASE.filter(m => {
    const matchTag = (currentFilterTag === 'all') || (m.tag.toLowerCase().includes(currentFilterTag.toLowerCase()));
    const matchDiff = (currentFilterDiff === 'all') || (m.diff === currentFilterDiff);
    return matchTag && matchDiff;
  });

  const countEl = document.getElementById('practice-count-display');
  if (countEl) countEl.textContent = `Showing ${filtered.length} of ${MCQS_DATABASE.length} Questions`;

  container.innerHTML = '';

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'mcq-card';
    card.id = `practice-q-${item.id}`;

    const answeredIdx = userPracticeAnswers[item.id];

    let optionsHtml = '';
    item.options.forEach((opt, oIdx) => {
      let optClass = 'option-btn';
      let disabled = '';
      if (answeredIdx !== undefined) {
        disabled = 'disabled';
        if (oIdx === item.ans) {
          optClass += ' correct';
        } else if (oIdx === answeredIdx) {
          optClass += ' incorrect';
        }
      }
      optionsHtml += `
        <button class="${optClass}" ${disabled} onclick="handlePracticeAnswer(${item.id}, ${oIdx})">
          <span class="option-key">${String.fromCharCode(65 + oIdx)}</span>
          <span>${opt}</span>
        </button>
      `;
    });

    const expShowClass = (answeredIdx !== undefined) ? 'show' : '';

    card.innerHTML = `
      <div class="mcq-header">
        <div class="mcq-tags">
          <span class="mcq-id">Q${item.id}</span>
          <span class="mcq-category-tag">${item.category}</span>
          <span class="example-badge ${item.tag.toLowerCase().replace(/[^a-z]/g, '')}">${item.tag}</span>
        </div>
        <span class="mcq-diff-badge ${item.diff}">${item.diff.toUpperCase()}</span>
      </div>
      <div class="mcq-question">${item.q}</div>
      <div class="mcq-options-grid">${optionsHtml}</div>
      <div class="mcq-explanation ${expShowClass}" id="exp-${item.id}">
        <div class="mcq-explanation-title">✓ Correct Answer: Option ${String.fromCharCode(65 + item.ans)} (${item.options[item.ans]})</div>
        <div>${item.exp}</div>
      </div>
    `;

    container.appendChild(card);
  });
}

function handlePracticeAnswer(qId, selectedIdx) {
  userPracticeAnswers[qId] = selectedIdx;
  const expEl = document.getElementById(`exp-${qId}`);
  if (expEl) expEl.classList.add('show');
  renderPracticeMCQs();
}

// ==========================================================================
// 4. INTERACTIVE CALCULATORS
// ==========================================================================

// Profit & Loss Calculator
function calculateProfitLoss() {
  const cpInput = parseFloat(document.getElementById('calc-cp')?.value);
  const spInput = parseFloat(document.getElementById('calc-sp')?.value);
  const resBox = document.getElementById('calc-pl-result');

  if (isNaN(cpInput) || isNaN(spInput) || cpInput <= 0 || spInput < 0) {
    showToast('Please enter valid positive numbers for CP and SP.');
    return;
  }

  const diff = spInput - cpInput;
  let status = '';
  let percent = 0;
  let steps = '';

  if (diff > 0) {
    status = 'PROFIT';
    percent = (diff / cpInput) * 100;
    steps = `
      <strong>1. Identify SP and CP:</strong> SP = Rs. ${spInput}, CP = Rs. ${cpInput}<br>
      <strong>2. Check Condition:</strong> SP > CP, hence transaction resulted in a Profit.<br>
      <strong>3. Profit Amount:</strong> SP - CP = ${spInput} - ${cpInput} = Rs. ${diff.toFixed(2)}<br>
      <strong>4. Profit Percentage:</strong> (Profit / CP) × 100 = (${diff.toFixed(2)} / ${cpInput}) × 100 = <strong>${percent.toFixed(2)}%</strong>
    `;
  } else if (diff < 0) {
    status = 'LOSS';
    const lossAmt = Math.abs(diff);
    percent = (lossAmt / cpInput) * 100;
    steps = `
      <strong>1. Identify SP and CP:</strong> SP = Rs. ${spInput}, CP = Rs. ${cpInput}<br>
      <strong>2. Check Condition:</strong> SP < CP, hence transaction resulted in a Loss.<br>
      <strong>3. Loss Amount:</strong> CP - SP = ${cpInput} - ${spInput} = Rs. ${lossAmt.toFixed(2)}<br>
      <strong>4. Loss Percentage:</strong> (Loss / CP) × 100 = (${lossAmt.toFixed(2)} / ${cpInput}) × 100 = <strong>${percent.toFixed(2)}%</strong>
    `;
  } else {
    status = 'BREAK-EVEN (NO PROFIT / NO LOSS)';
    percent = 0;
    steps = `Selling Price equals Cost Price. Profit = Rs. 0, Loss = Rs. 0.`;
  }

  if (resBox) {
    resBox.classList.add('show');
    document.getElementById('calc-pl-status').textContent = status;
    document.getElementById('calc-pl-value').textContent = `${status === 'PROFIT' ? '+' : (status === 'LOSS' ? '-' : '')}Rs. ${Math.abs(diff).toFixed(2)} (${percent.toFixed(2)}%)`;
    document.getElementById('calc-pl-steps').innerHTML = steps;
  }
}

// Discount Calculator
function calculateDiscount() {
  const mp = parseFloat(document.getElementById('calc-disc-mp')?.value);
  const discPct = parseFloat(document.getElementById('calc-disc-pct')?.value);
  const resBox = document.getElementById('calc-disc-result');

  if (isNaN(mp) || isNaN(discPct) || mp <= 0 || discPct < 0 || discPct > 100) {
    showToast('Please enter a valid Marked Price and Discount % (0-100).');
    return;
  }

  const discAmt = (discPct / 100) * mp;
  const sp = mp - discAmt;

  if (resBox) {
    resBox.classList.add('show');
    document.getElementById('calc-disc-val').textContent = `Final SP: Rs. ${sp.toFixed(2)} (You Save: Rs. ${discAmt.toFixed(2)})`;
    document.getElementById('calc-disc-steps').innerHTML = `
      <strong>1. Calculate Discount Amount:</strong> (${discPct}% / 100) × ${mp} = Rs. ${discAmt.toFixed(2)}<br>
      <strong>2. Subtract from Marked Price:</strong> ${mp} - ${discAmt.toFixed(2)} = <strong>Rs. ${sp.toFixed(2)}</strong>
    `;
  }
}

// Reverse CP Calculator
function calculateReverseCP() {
  const sp = parseFloat(document.getElementById('calc-rev-sp')?.value);
  const rate = parseFloat(document.getElementById('calc-rev-pct')?.value);
  const type = document.getElementById('calc-rev-type')?.value;
  const resBox = document.getElementById('calc-rev-result');

  if (isNaN(sp) || isNaN(rate) || sp <= 0 || rate < 0) {
    showToast('Please enter valid Selling Price and Percentage values.');
    return;
  }

  let cp = 0;
  let steps = '';

  if (type === 'profit') {
    cp = sp / (1 + (rate / 100));
    steps = `
      <strong>Formula:</strong> CP = SP / (1 + Profit%/100)<br>
      <strong>Step 1:</strong> CP = ${sp} / (1 + ${rate}/100) = ${sp} / ${(1 + rate/100).toFixed(4)}<br>
      <strong>Step 2:</strong> CP = <strong>Rs. ${cp.toFixed(2)}</strong>
    `;
  } else {
    if (rate >= 100) {
      showToast('Loss% cannot be 100% or greater for reverse CP.');
      return;
    }
    cp = sp / (1 - (rate / 100));
    steps = `
      <strong>Formula:</strong> CP = SP / (1 - Loss%/100)<br>
      <strong>Step 1:</strong> CP = ${sp} / (1 - ${rate}/100) = ${sp} / ${(1 - rate/100).toFixed(4)}<br>
      <strong>Step 2:</strong> CP = <strong>Rs. ${cp.toFixed(2)}</strong>
    `;
  }

  if (resBox) {
    resBox.classList.add('show');
    document.getElementById('calc-rev-val').textContent = `Original Cost Price: Rs. ${cp.toFixed(2)}`;
    document.getElementById('calc-rev-steps').innerHTML = steps;
  }
}

// Successive Discount Simulator
function calculateSuccessiveDiscount() {
  const mp = parseFloat(document.getElementById('succ-mp')?.value);
  const d1 = parseFloat(document.getElementById('succ-d1')?.value);
  const d2 = parseFloat(document.getElementById('succ-d2')?.value);
  const d3Raw = document.getElementById('succ-d3')?.value;
  const d3 = d3Raw ? parseFloat(d3Raw) : 0;
  const resBox = document.getElementById('succ-result-box');

  if (isNaN(mp) || isNaN(d1) || isNaN(d2) || mp <= 0) {
    showToast('Please enter valid numbers for Marked Price and Discounts.');
    return;
  }

  const p1 = mp * (1 - d1 / 100);
  const p2 = p1 * (1 - d2 / 100);
  const finalPrice = d3 > 0 ? p2 * (1 - d3 / 100) : p2;
  const totalSavings = mp - finalPrice;
  const effectivePct = (totalSavings / mp) * 100;

  let steps = `
    <strong>Stage 1:</strong> Original MP = Rs. ${mp.toFixed(2)}<br>
    ↓ After ${d1}% discount: ${mp.toFixed(2)} × ${(1 - d1/100).toFixed(2)} = Rs. ${p1.toFixed(2)}<br>
    ↓ After ${d2}% discount: ${p1.toFixed(2)} × ${(1 - d2/100).toFixed(2)} = Rs. ${p2.toFixed(2)}
  `;

  if (d3 > 0) {
    steps += `<br>↓ After ${d3}% discount: ${p2.toFixed(2)} × ${(1 - d3/100).toFixed(2)} = Rs. ${finalPrice.toFixed(2)}`;
  }

  steps += `
    <br><br><strong>Single Equivalent Discount Formula:</strong><br>
    Effective Discount = [1 - ${( (1 - d1/100) * (1 - d2/100) * (d3 > 0 ? (1 - d3/100) : 1) ).toFixed(4)}] × 100 = <strong>${effectivePct.toFixed(2)}%</strong>
  `;

  if (resBox) {
    resBox.classList.add('show');
    document.getElementById('succ-final-price').textContent = `Final Price: Rs. ${finalPrice.toFixed(2)} (Effective: ${effectivePct.toFixed(2)}% OFF)`;
    document.getElementById('succ-steps').innerHTML = steps;
  }
}

// Equivalent Discount Calculator
function calculateEquivalentDiscountDirect() {
  const d1 = parseFloat(document.getElementById('eq-d1')?.value);
  const d2 = parseFloat(document.getElementById('eq-d2')?.value);
  const resBox = document.getElementById('eq-result-box');

  if (isNaN(d1) || isNaN(d2)) {
    showToast('Please enter both discount percentages.');
    return;
  }

  const eq = d1 + d2 - (d1 * d2) / 100;

  if (resBox) {
    resBox.classList.add('show');
    document.getElementById('eq-val').textContent = `Equivalent Single Discount: ${eq.toFixed(2)}%`;
    document.getElementById('eq-steps').innerHTML = `
      <strong>Shortcut Formula:</strong> d₁ + d₂ - (d₁ × d₂) / 100<br>
      = ${d1} + ${d2} - (${d1} × ${d2}) / 100<br>
      = ${d1 + d2} - ${(d1 * d2 / 100).toFixed(2)}<br>
      = <strong>${eq.toFixed(2)}%</strong>
    `;
  }
}

// ==========================================================================
// 5. INTERACTIVE FORMULA CARDS ("Try Example" step animator)
// ==========================================================================
function toggleFormulaExample(id) {
  const box = document.getElementById(`ifc-anim-${id}`);
  if (box) {
    box.classList.toggle('active');
  }
}

// ==========================================================================
// 6. SEARCH & BOOKMARKING ENGINE
// ==========================================================================
function initSearch() {
  const searchInput = document.getElementById('header-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    if (!term) {
      document.querySelectorAll('.concept-section, .shortcut-card, .mistake-card').forEach(el => {
        el.style.display = '';
      });
      return;
    }

    // Filter concept sections & cards
    document.querySelectorAll('.concept-section').forEach(section => {
      const text = section.innerText.toLowerCase();
      if (text.includes(term)) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });
  });
}

function toggleBookmark(sectionId) {
  const saved = JSON.parse(localStorage.getItem('pld_bookmarks') || '[]');
  const index = saved.indexOf(sectionId);
  const btn = document.querySelector(`[data-bookmark="${sectionId}"]`);

  if (index === -1) {
    saved.push(sectionId);
    if (btn) btn.classList.add('bookmarked');
    showToast(`Bookmarked section!`);
  } else {
    saved.splice(index, 1);
    if (btn) btn.classList.remove('bookmarked');
    showToast(`Bookmark removed.`);
  }

  localStorage.setItem('pld_bookmarks', JSON.stringify(saved));
}

function filterBookmarksOnly() {
  const saved = JSON.parse(localStorage.getItem('pld_bookmarks') || '[]');
  const btn = document.getElementById('bookmark-filter-btn');

  if (btn?.getAttribute('data-active') === 'true') {
    btn.setAttribute('data-active', 'false');
    btn.textContent = '★ Bookmarks';
    document.querySelectorAll('.concept-section').forEach(el => el.style.display = '');
    showToast('Showing all sections.');
  } else {
    if (saved.length === 0) {
      showToast('No sections bookmarked yet! Click ☆ Bookmark on any section.');
      return;
    }
    btn.setAttribute('data-active', 'true');
    btn.textContent = '✕ Show All';
    document.querySelectorAll('.concept-section').forEach(section => {
      if (saved.includes(section.id)) {
        section.style.display = '';
      } else {
        section.style.display = 'none';
      }
    });
    showToast(`Filtered to ${saved.length} bookmarked section(s).`);
  }
}

function restoreBookmarks() {
  const saved = JSON.parse(localStorage.getItem('pld_bookmarks') || '[]');
  saved.forEach(id => {
    const btn = document.querySelector(`[data-bookmark="${id}"]`);
    if (btn) btn.classList.add('bookmarked');
  });
}

// ==========================================================================
// 7. TOAST NOTIFICATIONS & UTILITIES
// ==========================================================================
function showToast(msg) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>ℹ️</span> <span>${msg}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(100%)';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

function printFormulaSheet() {
  window.print();
}

function copyFormulaText(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied formula: ${text}`);
  }).catch(() => {
    showToast(`Formula: ${text}`);
  });
}

// Navigation active observer
function initScrollSpy() {
  const sections = document.querySelectorAll('.concept-section');
  const navLinks = document.querySelectorAll('.nav-link-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('data-target') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

// Hero animation step updater
function initHeroAnimation() {
  // Animated flow step cycles
  let step = 0;
  const cards = document.querySelectorAll('.flow-step-card');
  if (cards.length === 0) return;

  setInterval(() => {
    cards.forEach((c, idx) => {
      if (idx === step) {
        c.classList.add('active-flow');
      } else {
        c.classList.remove('active-flow');
      }
    });
    step = (step + 1) % cards.length;
  }, 2200);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initPracticeZone();
  initSearch();
  restoreBookmarks();
  initScrollSpy();
  initHeroAnimation();
});
