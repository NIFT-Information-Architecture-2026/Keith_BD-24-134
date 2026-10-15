// CODEX CAMAEL: Survival Recipes & Sustenance Formulations
// Standard field preparations, emergency hydration, and pantry filtering
// Note: Review status defaults to "Not yet reviewed", Source status defaults to "Source: unverified"

window.CAMAEL_RECIPES = [
  // =========================================================================
  // EMERGENCY HYDRATION & ADSORBENTS
  // =========================================================================
  {
    id: "rec_ors",
    name: "Oral Rehydration Salts (ORS)",
    category: "lifesavers",
    tier: "S",
    prepTime: "2 minutes",
    calories: "120 kcal / L",
    smokeRisk: "None (Cold Prep)",
    shelfLife: "24 hours once mixed",
    ingredients: ["Clean Water", "Sugar", "Salt"],
    summary: "Essential electrolyte and glucose formulation for rapid oral rehydration during severe diarrhea, cholera, heat exhaustion, or fluid depletion.",
    instructions: [
      "1. Measure exactly 1 Liter of clean, boiled or verified potable water into a clean container.",
      "2. Add exactly 6 level teaspoons of clean granulated sugar.",
      "3. Add exactly 1/2 level teaspoon of table salt (sodium chloride).",
      "4. Stir vigorously until completely dissolved. The solution should taste no saltier than tears.",
      "5. Administer in small, frequent sips. Do not exceed specified salt ratio to prevent hypernatremic fluid shifts."
    ],
    survivalNotes: "Never make the solution overly salty. Sugar is mandatory as it activates the intestinal sodium-glucose cotransporter, driving rapid cellular water absorption.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "rec_charcoal_slurry",
    name: "Activated Charcoal Ingestion Slurry",
    category: "lifesavers",
    tier: "S",
    prepTime: "5 minutes",
    calories: "0 kcal",
    smokeRisk: "None",
    shelfLife: "Indefinite (dry powder)",
    ingredients: ["Clean Water", "Charcoal"],
    summary: "Gastrointestinal toxin adsorbent for specific ingested poisons. Step 1 is always immediate emergency medical transport. Use only pharmacy-grade activated charcoal.",
    instructions: [
      "1. Step 1: Call emergency services / poison control immediately (112 in India) and arrange transport to a hospital.",
      "2. CONTRAINDICATIONS: Never administer to a drowsy, lethargic, or unconscious person, anyone without an intact gag reflex, or following ingestion of caustic substances (acids/lye) or petroleum hydrocarbons (risk of severe chemical pneumonitis).",
      "3. Note: Never use crude campfire charcoal or barbecue briquettes; use ONLY pharmacy-grade activated charcoal powder.",
      "4. Mix 25g to 50g of pharmacy-grade activated charcoal into 250ml of clean drinking water to form an oral suspension.",
      "5. Note: Ineffective against alcohol, cyanide, lithium, iron, or mineral acids. Death Cap (Amanita phalloides) requires hospital ICU supportive care, as toxins rapidly bind hepatocyte targets."
    ],
    survivalNotes: "Administer only under medical advice or while awaiting urgent hospital transport. Causes black stools.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "rec_willow_bark_tea",
    name: "Willow Bark Decoction",
    category: "lifesavers",
    tier: "A",
    prepTime: "20 minutes",
    calories: "0 kcal",
    smokeRisk: "Low",
    shelfLife: "48 hours in cold container",
    ingredients: ["Clean Water", "Willow Bark"],
    summary: "Herbal salicin decoction for mild fever and joint ache. Requires strict contraindication screening.",
    instructions: [
      "1. WARNING & CONTRAINDICATIONS: Never administer to children or teenagers under 19 years old due to the risk of fatal Reye's syndrome. Contraindicated in aspirin allergy, bleeding disorders, concurrent blood thinners, pregnancy, or peptic ulcer disease.",
      "2. Strip the outer bark of young willow twigs (Salix species) to expose the green inner cambium layer.",
      "3. Scrape 1 to 2 teaspoons of the inner cambium bark.",
      "4. Simmer gently in 300ml of clean water for 15 minutes.",
      "5. Cool and strain out woody fibers before consumption. Limit intake to 1 cup every 6 hours."
    ],
    survivalNotes: "Onset is delayed (20-30 minutes) as salicin requires metabolic conversion in the liver. Discontinue immediately if stomach irritation occurs.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "rec_pine_needle_tea",
    name: "Pine Needle Warm Infusion",
    category: "cooking",
    tier: "B",
    prepTime: "10 minutes",
    calories: "5 kcal",
    smokeRisk: "Low (Small Fire)",
    shelfLife: "Consume fresh",
    ingredients: ["Clean Water", "Pine Needles"],
    summary: "Wild evergreen needle beverage containing Vitamin C. Avoid toxic lookalikes; geographic occurrence is restricted to temperate and montane zones.",
    instructions: [
      "1. CRITICAL IDENTIFICATION & LOOKALIKES: Confirm genuine pine species (e.g. Eastern White Pine in North America; Chir Pine / Pinus roxburghii or Blue Pine in the Himalayas). AVOID toxic Yew (Taxus baccata - lethal cardiotoxins), Norfolk Island Pine, and Ponderosa Pine (causes bovine abortions). Note: Pines do not grow naturally in the tropical plains of Telangana or Kerala.",
      "2. Finely chop or crush clean green needles to rupture the outer resinous cuticle.",
      "3. Bring 500ml of clean water to a boil, then REMOVE FROM HEAT.",
      "4. Steep chopped needles in the hot water for 8 to 10 minutes. Do NOT boil needles directly, as heat degrades ascorbic acid.",
      "5. Strain fibers and drink warm. Contraindicated in pregnancy."
    ],
    survivalNotes: "Do not rely on wild infusions as a sole therapeutic agent. Confirm species with 100% certainty before consumption.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "rec_hardtack",
    name: "Survival Hardtack (Ship's Biscuit)",
    category: "cooking",
    tier: "A",
    prepTime: "60 minutes",
    calories: "350 kcal / biscuit",
    smokeRisk: "Medium (Oven/Embers)",
    shelfLife: "Long-term if kept bone dry",
    ingredients: ["Flour", "Clean Water", "Salt"],
    summary: "Dry emergency travel ration. Contains no fats to oxidize or turn rancid, surviving long storage in moisture-proof containers.",
    instructions: [
      "1. Mix 2 cups of flour, 1/2 cup of water, and 1 teaspoon of salt into a stiff, dense dough.",
      "2. Roll dough out to 1/2 inch (1.2 cm) thickness on a clean surface.",
      "3. Cut into 3x3 inch squares.",
      "4. Dock a grid of 16 holes through each biscuit with a clean skewer to ensure thorough core moisture release.",
      "5. Bake slowly near campfire coals or oven for 30 minutes per side until completely dry and rock-hard.",
      "6. Cool completely before storing in an airtight, moisture-free cache."
    ],
    survivalNotes: "Never bite directly into dry hardtack to avoid tooth fractures. Soften in warm broth, water, or tea for 5 minutes before eating.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "rec_pemmican",
    name: "Pemmican Calorie Bar",
    category: "cooking",
    tier: "A",
    prepTime: "4 hours (prep)",
    calories: "700 kcal / 100g",
    smokeRisk: "High (Smoker / Rendering)",
    shelfLife: "Extended in cool storage",
    ingredients: ["Dried Meat", "Animal Fat", "Berries"],
    summary: "High energy-density emergency trail ration combining 50% dried lean protein powder with 50% clarified rendered animal tallow.",
    instructions: [
      "1. Dehydrate lean meat until brittle with zero residual moisture.",
      "2. Pound or grind dried meat into a fibrous powder.",
      "3. Render and clarify clean animal tallow, straining out all cracklings.",
      "4. Optional: Incorporate crushed dried tart berries for flavor.",
      "5. Thoroughly blend liquid tallow and powdered meat in an equal 1:1 weight ratio.",
      "6. Press firmly into blocks and allow to solidify in cool air."
    ],
    survivalNotes: "Provides dense caloric fuel in freezing wilderness conditions. Keep protected from moisture and pests.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },

  // =========================================================================
  // CAMPFIRE & FIELD FORAGE
  // =========================================================================
  {
    id: "rec_cattail_cakes",
    name: "Cattail Starch Cakes",
    category: "cooking",
    tier: "B",
    prepTime: "25 minutes",
    calories: "280 kcal",
    smokeRisk: "Medium",
    shelfLife: "2 days",
    ingredients: ["Cattail Root", "Clean Water", "Salt"],
    summary: "Clean starch extraction from wild cattail rhizomes. Requires strict habitat and lookalike confirmation.",
    instructions: [
      "1. FORAGING SAFETY: Never harvest from stagnant industrial drainage or contaminated runoff. Beware toxic lookalike Yellow Iris (flattened leaves) and Poison Hemlock in wetland fringes. Golden Rule: Never eat anything you cannot 100% identify.",
      "2. Dig clean cattail rhizomes from moving freshwater mud.",
      "3. Peel outer spongy rind to access the white fibrous starch core.",
      "4. Macerate fibers in clean water to settle the dense white starch.",
      "5. Decant surface liquid, mix starch with a pinch of salt, shape into flat cakes, and bake on a hot stone near coals for 5 minutes per side."
    ],
    survivalNotes: "Digestible carbohydrate source. Always cook thoroughly before ingestion.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "rec_dandelion_greens",
    name: "Steamed Dandelion & Wild Greens",
    category: "cooking",
    tier: "B",
    prepTime: "10 minutes",
    calories: "90 kcal",
    smokeRisk: "Low",
    shelfLife: "1 day",
    ingredients: ["Dandelion Greens", "Wild Onion", "Clean Water"],
    summary: "Wild forage greens providing micronutrients. Must confirm wild allium identity through strong onion aroma.",
    instructions: [
      "1. Harvest young, tender dandelion leaves before flowering to minimize bitter sesquiterpenes.",
      "2. FORAGING SAFETY: Confirm wild onion/garlic by distinct pungent allium aroma. Discard immediately if lacking onion scent to avoid toxic lookalike Death Camas.",
      "3. Wash thoroughly and steam or simmer in clean water for 3 to 5 minutes.",
      "4. Season with salt and consume warm."
    ],
    survivalNotes: "Provides trace potassium, calcium, and vitamins during food scarcity.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "rec_beans_rice",
    name: "Campfire Rice & Beans",
    category: "cooking",
    tier: "A",
    prepTime: "40 minutes",
    calories: "450 kcal / serving",
    smokeRisk: "Low",
    shelfLife: "2 days cooked",
    ingredients: ["Rice", "Beans", "Clean Water", "Salt"],
    summary: "Complete dietary protein combining grains and legumes with all nine essential amino acids.",
    instructions: [
      "1. Soak dry beans in clean water for at least 4 to 8 hours to decrease cooking time.",
      "2. SAFETY WARNING: Never consume raw or undercooked kidney beans due to toxic phytohaemagglutinin; boil actively for at least 10 minutes.",
      "3. Simmer beans until soft, then combine with 1 part white rice and salt in 2 parts water.",
      "4. Cover tightly and simmer on low coals for 15 minutes until moisture is fully absorbed."
    ],
    survivalNotes: "Long-term dried storage staple. Store uncooked ingredients in sealed, rodent-proof bins.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "rec_acorn_mash",
    name: "Leached Acorn Porridge",
    category: "cooking",
    tier: "B",
    prepTime: "2 hours (leaching)",
    calories: "380 kcal",
    smokeRisk: "Low",
    shelfLife: "3 days",
    ingredients: ["Oak Acorns", "Clean Water", "Salt"],
    summary: "Wild carbohydrate and lipid porridge prepared from oak nutmeat after thorough tannin leaching.",
    instructions: [
      "1. Gather intact acorns, rejecting any with bore holes, mold, or cracks.",
      "2. Shell nuts and crush nutmeats into a coarse meal.",
      "3. TANNIN LEACHING: Soak acorn meal through repeated changes of clean water until all bitter, astringent tannins are rinsed away. Taste a small crumb: if any puckering bitterness remains, continue leaching.",
      "4. Boil leached meal with clean water and a pinch of salt until thickened into porridge."
    ],
    survivalNotes: "Ingesting unleached raw acorns causes gastric mucosal irritation and potential renal stress.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "rec_bone_broth",
    name: "Bone Marrow Broth",
    category: "cooking",
    tier: "A",
    prepTime: "3 to 6 hours",
    calories: "220 kcal",
    smokeRisk: "Low (Smoldering Coals)",
    shelfLife: "3 days",
    ingredients: ["Clean Water", "Animal Bones", "Salt", "Wild Onion"],
    summary: "Warm mineral and collagen extraction from fresh animal bones to support hydration and recovery.",
    instructions: [
      "1. Inspect bones to ensure freshness; never utilize spoiled or putrid animal remains.",
      "2. Crack heavy limb bones with a clean tool to expose inner marrow cavities.",
      "3. Place cracked bones into a pot of clean water with salt and wild onion.",
      "4. Simmer gently over steady campfire coals for 3 to 6 hours until broth is rich and opaque.",
      "5. Skim surface scum and consume warm."
    ],
    survivalNotes: "Gentle oral nutrition for convalescing individuals experiencing gastrointestinal recovery.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  }
];
