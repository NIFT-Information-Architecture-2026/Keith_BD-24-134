// CAMAEL: Field Manual & Visual How-To Tutorials
// Practical survival engineering and fieldcraft guides with standalone inline SVG diagrams

window.CAMAEL_MANUAL = [
  {
    id: "guide_four_fingers",
    title: "The Four-Fingers Rule: Estimating Remaining Daylight",
    category: "navigation",
    summary: "A foolproof ancient wilderness technique to determine how many minutes of daylight remain before sunset without a watch or phone compass.",
    svgDiagram: `
      <svg viewBox="0 0 400 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#080808; border:1px solid #222;">
        <!-- Horizon line -->
        <line x1="20" y1="140" x2="380" y2="140" stroke="#555" stroke-width="2" stroke-dasharray="4"/>
        <text x="25" y="155" fill="#777" font-size="10" font-family="system-ui">HORIZON</text>

        <!-- Setting Sun -->
        <circle cx="200" cy="40" r="18" fill="#ffaa00" />
        <circle cx="200" cy="40" r="24" fill="none" stroke="#ffaa00" stroke-width="1" stroke-dasharray="2" opacity="0.5"/>
        <text x="230" y="44" fill="#ffaa00" font-size="11" font-weight="bold" font-family="system-ui">SETTING SUN</text>

        <!-- Hand with 4 fingers -->
        <rect x="130" y="65" width="140" height="70" rx="4" fill="#181818" stroke="#ffffff" stroke-width="1.5"/>
        <!-- 4 Finger divider lines -->
        <line x1="130" y1="82" x2="270" y2="82" stroke="#444" stroke-width="1"/>
        <line x1="130" y1="100" x2="270" y2="100" stroke="#444" stroke-width="1"/>
        <line x1="130" y1="118" x2="270" y2="118" stroke="#444" stroke-width="1"/>
        
        <text x="140" y="78" fill="#fff" font-size="10" font-family="system-ui">1 Finger = 15 Minutes</text>
        <text x="140" y="95" fill="#fff" font-size="10" font-family="system-ui">2 Fingers = 30 Minutes</text>
        <text x="140" y="113" fill="#fff" font-size="10" font-family="system-ui">3 Fingers = 45 Minutes</text>
        <text x="140" y="131" fill="#fff" font-size="10" font-family="system-ui">4 Fingers = 60 Min (1 Hr)</text>

        <!-- Measurement Bracket -->
        <path d="M 285 40 L 300 40 L 300 140 L 285 140" fill="none" stroke="#888" stroke-width="1.5"/>
        <text x="310" y="95" fill="#00dd88" font-size="11" font-weight="bold" font-family="system-ui">Stack hands to measure</text>
      </svg>
    `,
    steps: [
      "1. Extend your arm straight out in front of you with your elbow locked.",
      "2. Bend your wrist so your palm faces you and your four fingers are held horizontally together.",
      "3. Place the bottom of your index finger directly at the bottom edge of the sun.",
      "4. Count the number of finger widths between the bottom of the sun and the true horizon line.",
      "5. MATHEMATICS: Each finger width equals approx. 15 minutes of daylight. One full 4-finger hand equals 1 Hour.",
      "6. If the gap is greater than one hand, stack your other hand beneath it to measure multiple hours."
    ],
    proTip: "Use this to know exactly when to stop trekking and start pitching camp, gathering firewood, and securing water before darkness makes travel hazardous."
  },
  {
    id: "guide_hydration_scale",
    title: "Hydration Urine Color Matrix & Rule of 3s",
    category: "medical",
    summary: "Visual biomarker reference for evaluating cellular hydration, renal clearance, and electrolyte adequacy in extreme heat or water rationing.",
    svgDiagram: `
      <svg viewBox="0 0 400 160" width="100%" height="150" xmlns="http://www.w3.org/2000/svg" style="background:#080808; border:1px solid #222;">
        <!-- Swatches -->
        <!-- Level 1: Clear/Pale -->
        <rect x="20" y="20" width="80" height="40" fill="#f4f8d3" stroke="#fff" stroke-width="0.5"/>
        <text x="25" y="75" fill="#00dd88" font-size="10" font-weight="bold" font-family="system-ui">OPTIMAL</text>
        <text x="25" y="90" fill="#777" font-size="9" font-family="system-ui">Well hydrated</text>

        <!-- Level 2: Light Yellow -->
        <rect x="110" y="20" width="80" height="40" fill="#eedc68" stroke="#fff" stroke-width="0.5"/>
        <text x="115" y="75" fill="#ffdd44" font-size="10" font-weight="bold" font-family="system-ui">NORMAL</text>
        <text x="115" y="90" fill="#777" font-size="9" font-family="system-ui">Maintain fluid</text>

        <!-- Level 3: Amber/Honey -->
        <rect x="200" y="20" width="80" height="40" fill="#cf9d22" stroke="#fff" stroke-width="0.5"/>
        <text x="205" y="75" fill="#ffaa00" font-size="10" font-weight="bold" font-family="system-ui">DEHYDRATED</text>
        <text x="205" y="90" fill="#777" font-size="9" font-family="system-ui">Drink 500ml now</text>

        <!-- Level 4: Dark Tea/Brown -->
        <rect x="290" y="20" width="80" height="40" fill="#79460a" stroke="#fff" stroke-width="0.5"/>
        <text x="295" y="75" fill="#ff4d4d" font-size="10" font-weight="bold" font-family="system-ui">SEVERE CRISIS</text>
        <text x="295" y="90" fill="#ff4d4d" font-size="9" font-family="system-ui">Renal strain / ORS</text>

        <!-- Rule of 3s Bar -->
        <line x1="20" y1="115" x2="370" y2="115" stroke="#333" stroke-width="1"/>
        <text x="20" y="135" fill="#aaa" font-size="11" font-weight="bold" font-family="system-ui">THE SURVIVAL RULE OF 3s:</text>
        <text x="20" y="150" fill="#888" font-size="10" font-family="system-ui">3 Min without Air | 3 Hours without Shelter (Extreme) | 3 Days without Water | 3 Weeks without Food</text>
      </svg>
    `,
    steps: [
      "1. Check urine color in clean sunlight against the reference matrix.",
      "2. Levels 1-2 (Pale straw to light yellow): Optimal hydration status.",
      "3. Level 3 (Deep amber/honey): Body is conserving water; physical performance drops by 15-20%. Drink 500ml immediately.",
      "4. Level 4 (Dark tea/brown): Severe dehydration or rhabdomyolysis (muscle breakdown). Administer oral rehydration salts (ORS) immediately."
    ],
    proTip: "Never ration water by sipping small droplets when dehydrated. Drink enough to satisfy thirst; rationing water in your canteen instead of your belly leads to heat stroke."
  },
  {
    id: "guide_bio_filter",
    title: "DIY Sand, Charcoal & Gravel Water Filter Column",
    category: "water",
    summary: "How to construct a gravity-fed multi-stage filtration column out of a scavenged plastic bottle to remove sediments, parasites, and organic chemicals.",
    svgDiagram: `
      <svg viewBox="0 0 400 220" width="100%" height="200" xmlns="http://www.w3.org/2000/svg" style="background:#080808; border:1px solid #222;">
        <!-- Inverted Bottle Outline -->
        <path d="M 120 20 L 280 20 L 260 160 L 220 180 L 220 200 L 180 200 L 180 180 L 140 160 Z" fill="#121212" stroke="#ffffff" stroke-width="1.5"/>
        
        <!-- Layers -->
        <!-- Layer 1: Pebbles / Coarse Gravel -->
        <rect x="130" y="25" width="140" height="25" fill="#3a3a3a"/>
        <text x="290" y="42" fill="#aaa" font-size="11" font-family="system-ui">1. Pebbles & Gravel (Stops leaves/twigs)</text>

        <!-- Layer 2: Coarse Sand -->
        <rect x="133" y="55" width="134" height="25" fill="#5c5338"/>
        <text x="290" y="72" fill="#aaa" font-size="11" font-family="system-ui">2. Coarse Sand (Traps large silt)</text>

        <!-- Layer 3: Fine Sand -->
        <rect x="137" y="85" width="126" height="25" fill="#7a7050"/>
        <text x="290" y="102" fill="#aaa" font-size="11" font-family="system-ui">3. Fine Sand (Traps micro-particles)</text>

        <!-- Layer 4: Crushed Hardwood Charcoal -->
        <rect x="143" y="115" width="114" height="30" fill="#1c1c1c" stroke="#444" stroke-width="1"/>
        <text x="290" y="132" fill="#00dd88" font-size="11" font-weight="bold" font-family="system-ui">4. Crushed Charcoal (Absorbs toxins)</text>

        <!-- Layer 5: Cloth / Cotton Plug -->
        <polygon points="152,150 248,150 220,180 180,180" fill="#ffffff" opacity="0.8"/>
        <text x="290" y="168" fill="#aaa" font-size="11" font-family="system-ui">5. Cloth / Cotton Plug (Holds media)</text>

        <!-- Clean drops -->
        <circle cx="200" cy="210" r="3" fill="#4da6ff"/>
        <text x="290" y="205" fill="#4da6ff" font-size="11" font-weight="bold" font-family="system-ui">Clean Water Out (Boil before drinking)</text>
      </svg>
    `,
    steps: [
      "1. Cut the bottom off a 2-liter plastic bottle and hang it upside down.",
      "2. Pack a clean piece of cotton fabric, bandana, or coffee filter tightly into the neck spout.",
      "3. Layer 1 (Bottom): 3 inches of crushed hardwood charcoal (from clean campfire coals). This absorbs chemical contaminants and odors.",
      "4. Layer 2: 3 inches of fine washed sand.",
      "5. Layer 3: 3 inches of coarse sand.",
      "6. Layer 4 (Top): 2 inches of small river pebbles and gravel to trap floating leaves and large debris.",
      "7. Pour murky water slowly into the top. Discard the first 1-2 liters until water runs clear."
    ],
    proTip: "CRITICAL: Filtration removes sediments, cysts, and protozoa, but does NOT kill microscopic viruses or bacteria! ALWAYS boil the filtered water for 1-3 minutes or treat with 2 drops of bleach."
  },
  {
    id: "guide_dakota_fire",
    title: "The Dakota Fire Hole: Smokeless Tactical Fire",
    category: "fire",
    summary: "Military combat survival technique for burning an intense, high-temperature cooking fire with almost zero visible flame or smoke signature.",
    svgDiagram: `
      <svg viewBox="0 0 400 180" width="100%" height="160" xmlns="http://www.w3.org/2000/svg" style="background:#080808; border:1px solid #222;">
        <!-- Ground Line -->
        <line x1="20" y1="50" x2="380" y2="50" stroke="#777" stroke-width="2"/>
        <text x="25" y="42" fill="#777" font-size="10" font-family="system-ui">SURFACE LEVEL</text>

        <!-- Fire Pit Chamber -->
        <rect x="90" y="50" width="90" height="90" fill="#181818" stroke="#ffffff" stroke-width="1.5"/>
        <!-- Embers & Flames -->
        <polygon points="120,135 150,135 135,100" fill="#ff4d4d"/>
        <polygon points="128,135 145,135 137,110" fill="#ffaa00"/>
        <text x="95" y="90" fill="#fff" font-size="10" font-family="system-ui">FIRE CHAMBER</text>

        <!-- Connecting Air Tunnel -->
        <path d="M 180 120 L 260 120 L 260 50 L 230 50 L 230 100 L 180 100 Z" fill="#1f1f1f" stroke="#00dd88" stroke-width="1"/>
        <text x="200" y="90" fill="#00dd88" font-size="10" font-family="system-ui">AIR DRAFT</text>
        
        <!-- Air intake hole -->
        <text x="255" y="42" fill="#00dd88" font-size="10" font-weight="bold" font-family="system-ui">WIND INTAKE (Upwind)</text>

        <!-- Air Flow Arrow -->
        <path d="M 245 30 L 245 110 L 170 110" fill="none" stroke="#00dd88" stroke-width="2" stroke-dasharray="4"/>
        <text x="50" y="165" fill="#aaa" font-size="10" font-family="system-ui">Chimney effect pulls fresh oxygen straight into fire base for 90% smoke reduction</text>
      </svg>
    `,
    steps: [
      "1. Dig a main fire chamber hole approx. 12 inches (30 cm) deep and 10 inches wide with straight vertical walls.",
      "2. Locate the prevailing wind direction.",
      "3. Dig an air intake vent hole 12 inches upwind from the main fire chamber.",
      "4. Angle the intake tunnel downward to connect into the bottom of the main fire chamber.",
      "5. Build your kindling and fire inside the main chamber.",
      "6. The rising heat creates a powerful thermal draft (chimney effect), sucking fresh oxygen down the intake vent directly into the base of the fire."
    ],
    proTip: "Because combustion is so efficient and hot, almost all carbon particles burn completely, resulting in a near-invisible smoke signature undetectable from a distance."
  },
  {
    id: "guide_knots",
    title: "The 4 Essential Survival Knots",
    category: "cordage",
    summary: "Master these four knots to build shelters, hoist food caches into trees away from bears, and lash splints.",
    svgDiagram: `
      <svg viewBox="0 0 400 130" width="100%" height="110" xmlns="http://www.w3.org/2000/svg" style="background:#080808; border:1px solid #222;">
        <rect x="20" y="15" width="80" height="90" fill="#141414" stroke="#444"/>
        <text x="30" y="35" fill="#fff" font-size="11" font-weight="bold" font-family="system-ui">BOWLINE</text>
        <text x="30" y="55" fill="#888" font-size="9" font-family="system-ui">Fixed loop</text>
        <text x="30" y="70" fill="#00dd88" font-size="9" font-family="system-ui">Never slips</text>

        <rect x="110" y="15" width="80" height="90" fill="#141414" stroke="#444"/>
        <text x="118" y="35" fill="#fff" font-size="11" font-weight="bold" font-family="system-ui">TAUT-LINE</text>
        <text x="118" y="55" fill="#888" font-size="9" font-family="system-ui">Adjustable</text>
        <text x="118" y="70" fill="#4da6ff" font-size="9" font-family="system-ui">Tarp guyline</text>

        <rect x="200" y="15" width="80" height="90" fill="#141414" stroke="#444"/>
        <text x="210" y="35" fill="#fff" font-size="11" font-weight="bold" font-family="system-ui">SQUARE</text>
        <text x="210" y="55" fill="#888" font-size="9" font-family="system-ui">Join ropes</text>
        <text x="210" y="70" fill="#ffaa00" font-size="9" font-family="system-ui">First aid ties</text>

        <rect x="290" y="15" width="80" height="90" fill="#141414" stroke="#444"/>
        <text x="300" y="35" fill="#fff" font-size="11" font-weight="bold" font-family="system-ui">CLOVE HITCH</text>
        <text x="300" y="55" fill="#888" font-size="9" font-family="system-ui">Post binding</text>
        <text x="300" y="70" fill="#fff" font-size="9" font-family="system-ui">Shelter posts</text>
      </svg>
    `,
    steps: [
      "1. BOWLINE ('King of Knots'): Creates a secure, non-slip loop at the end of a rope. Impossible to jam, even under extreme load.",
      "2. TAUT-LINE HITCH: Friction hitch that slides freely along a line to tighten or slacken tarp tension, then jams under load.",
      "3. SQUARE (REEF) KNOT: 'Right over left, left over right'. Ideal for tying bandages, slings, and package bundles.",
      "4. CLOVE HITCH: Quickly fastens rope to a tree trunk, spar, or post to begin building timber shelters and rafts."
    ],
    proTip: "Practice tying the Bowline blindfolded with one hand—this is how sailors and mountaineers secure rescue lines in freezing gale conditions."
  }
];
