// CODEX CAMAEL: Crisis Playbooks & Immediate Action Triage
// Prioritized by First 60 Seconds -> 1 Hour -> 24 Hours
// Note: Review status defaults to "Not yet reviewed", Source status defaults to "Source: unverified"

window.CAMAEL_CRISIS = [
  {
    id: "crisis_cpr",
    title: "In Case of: Cardiac Arrest & Unresponsive Victim",
    category: "medical",
    urgency: "IMMEDIATE (0-4 Minutes)",
    icon: "🫀",
    summary: "Immediate, high-quality chest compressions at 100-120 BPM maintain vital cerebral and myocardial perfusion. Step 1 is always activating emergency medical response.",
    first60s: [
      "STEP 1: Call emergency services immediately (112 in India, 911 in US) and shout for someone to locate an Automated External Defibrillator (AED).",
      "Check responsiveness: Firmly tap shoulders and shout loudly: 'Are you okay?!'",
      "Check breathing: Look, listen, and feel for normal breathing for NO MORE than 10 seconds. Agonal gasping is NOT normal breathing.",
      "Position victim flat on their back on a FIRM, HARD, flat surface (ground or floor; never on a mattress).",
      "Hand placement: Kneel beside victim. Interlock fingers, placing the heel of one hand directly on the center of the chest (lower half of breastbone/sternum).",
      "Lock elbows straight, align shoulders directly over hands, and initiate chest compressions immediately."
    ],
    nextHour: [
      "Compress hard and fast: Maintain depth of 2 to 2.4 inches (5 to 6 cm) in adults, at a steady cadence of 100 to 120 compressions per minute.",
      "Allow COMPLETE chest recoil between every compression; do not lean on the chest between beats.",
      "Hands-Only vs With Breaths: If untrained or without a barrier device, perform continuous Hands-Only CPR without stopping. If trained and equipped, deliver 30 compressions followed by 2 rescue breaths (1 second each, watching for visible chest rise).",
      "Apply AED as soon as available: Turn unit on, attach pads to bare dry chest per diagram, and follow audible prompts.",
      "Switch compressors every 2 minutes (approx. 5 cycles) to prevent rescuer fatigue and loss of compression depth."
    ],
    extendedRules: "Minimize all interruptions in chest compressions to less than 10 seconds. Continue CPR relentlessly until the victim displays signs of life, professional EMS arrives, an AED takes over, or you are physically exhausted.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "crisis_bleeding",
    title: "In Case of: Severe Arterial Hemorrhage & Trauma",
    category: "medical",
    urgency: "CRITICAL (Minutes to Shock)",
    icon: "🩸",
    summary: "Severe arterial bleeding can cause fatal hypovolemic shock within minutes. Direct pressure and wound packing must precede tourniquet placement.",
    first60s: [
      "STEP 1: Call emergency services (112 in India) immediately.",
      "DIRECT PRESSURE FIRST: Place a sterile dressing, clean cloth, or gloved hand directly over the bleeding site and exert firm, continuous, two-handed pressure.",
      "WOUND PACKING: For deep junctional or extremity wounds, pack clean gauze deeply into the bleeding wound cavity directly onto the bleeding vessel while maintaining continuous downward pressure.",
      "If direct pressure and wound packing fail to control life-threatening arterial extremity bleeding (bright red pulsatile blood), deploy a mechanical windlass tourniquet immediately."
    ],
    nextHour: [
      "TOURNIQUET APPLICATION: Apply the tourniquet 2 to 3 inches above the bleeding site directly onto the skin (never over a joint). If site is uncertain, place 'high and tight' on the extremity.",
      "Tighten the windlass rod until pulsatile arterial bleeding halts and distal pulses cease.",
      "Lock windlass rod in clip. RECORD TIME: Write the exact time of application clearly on the tourniquet label or patient's forehead (e.g. 'TK 14:30').",
      "STRICT WARNING: NEVER LOOSEN OR REMOVE A TOURNIQUET once applied. Loosening releases accumulated anaerobic toxins into systemic circulation and restarts fatal hemorrhage. Only a surgical team in a hospital setting may remove a tourniquet.",
      "Treat for hypovolemic shock: Keep patient warm with blankets, elevate legs slightly if no pelvic/spinal fracture, and calm patient."
    ],
    extendedRules: "A properly applied tourniquet can remain in place for up to 2 hours without irreversible limb loss while expediting emergency surgical evacuation.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "crisis_snakebite",
    title: "In Case of: Venomous Snakebite",
    category: "medical",
    urgency: "HIGH (Systemic Toxin)",
    icon: "🐍",
    summary: "Region-aware emergency response. In India, envenomation is predominantly caused by the 'Big Four'. Calmness, limb immobilization, and rapid hospital transport with antivenom save lives.",
    first60s: [
      "MOVE TO SAFETY: Step at least 2 meters back from the snake. Do NOT attempt to corner, capture, or kill the snake.",
      "STEP 1: Arrange immediate transport to a hospital equipped with polyvalent anti-snake venom (ASV). Call emergency services (112 in India).",
      "STAY CALM & IMMOBILE: Physical movement and elevated pulse accelerate lymphatic venom distribution throughout systemic circulation.",
      "REMOVE CONSTRICTIONS: Immediately strip rings, watches, bracelets, bangles, and constrictive shoes before rapid localized edema begins."
    ],
    nextHour: [
      "SPLINT & IMMOBILIZE: Apply a rigid splint to the bitten limb and secure with a loose crepe bandage to prevent muscle movement (muscle contractions pump lymphatic venom). Keep limb at heart level.",
      "INDIAN 'BIG FOUR' IDENTIFICATION:",
      "- Russell's Viper (Daboia russelii): Hemotoxic, vasculotoxic, induces acute kidney failure and blistered swelling.",
      "- Saw-scaled Viper (Echis carinatus): Hemotoxic, incoagulable blood, bleeding from gums.",
      "- Common Krait (Bungarus caeruleus): Potent neurotoxin, painless nocturnal bite, abdominal cramps, descending paralysis.",
      "- Spectacled Cobra (Naja naja): Neurotoxic, ptosis (drooping eyelids), respiratory paralysis, local tissue necrosis.",
      "WESTERN GHATS & KERALA PIT VIPER NOTE: The Hump-nosed Pit Viper (Hypnale hypnale) is common in plantations and rainforests of Kerala and Western Ghats. Standard Indian polyvalent ASV does NOT effectively neutralize Hypnale hypnale venom; management requires hospital supportive care for coagulopathy and acute kidney injury.",
      "WHAT NEVER TO DO (Per Indian National Guidelines / MoHFW & WHO SEARO):",
      "- Do NOT make incisions or cut the bite site.",
      "- Do NOT attempt oral or mechanical suction.",
      "- Do NOT apply arterial tourniquets (causes severe ischemic gangrene and limb loss).",
      "- Do NOT apply ice, herbal pastes, electrical shocks, or potassium permanganate."
    ],
    extendedRules: "Transport patient lying on their side in recovery position to protect airway. Monitor respiration continuously. Over 25% of snakebites are non-envenomed 'dry bites'.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "crisis_nuclear",
    title: "In Case of: Nuclear Detonation & Fallout",
    category: "disaster",
    urgency: "CRITICAL (Immediate flash & shockwave)",
    icon: "☢️",
    summary: "Survivable if you avoid prompt thermal/blast trauma and shelter from radioactive particulate fallout during rapid initial radiological decay governed by the 7-10 Rule.",
    first60s: [
      "FLASH SEEN: Turn completely away from the detonation flash instantly. Close eyes tightly and shield face with hands (prevents flash blindness and corneal thermal injury).",
      "DROP TO GROUND: Lie flat face-down behind a solid barrier, curb, or ditch. Keep mouth slightly open and cover ears with thumbs (equalizes blast overpressure to protect eardrums and lungs).",
      "WAIT FOR BLAST SHOCKWAVE: The blast wave travels at approx. 1 mile per 5 seconds. Expect outward positive blast wave followed by inward vacuum return. Remain prone for at least 2 full minutes."
    ],
    nextHour: [
      "SHELTER IMMEDIATELY: You have an estimated 15 to 20 minute window before airborne radioactive fallout begins settling from the mushroom cloud.",
      "BEST SHELTERS: Deep subterranean concrete basements, subway stations, underground parking complexes, or interior rooms of multi-story brick/concrete masonry.",
      "RESPIRATORY PROTECTION: Cover nose and mouth with damp cloth, N95 mask, or clothing layers to prevent internal deposition of alpha and beta emitters.",
      "DECONTAMINATION: Strip outer clothing prior to entering shelter and seal in plastic bag. Wash skin with soap and warm water; do NOT scrub abrasive skin cuts."
    ],
    extendedRules: "THE 7-10 RULE: Fallout radiation decay is calculated relative to the initial dose rate measured at 1 hour post-detonation (R0). For every 7-fold increase in time after detonation, radiation dose rate decreases by a factor of 10. (1 hr = 100% of R0; 7 hrs = 10% of R0; 49 hrs = 1% of R0). Remain sealed in deep masonry shelter for a minimum of 48 to 72 hours before assessing emergency egress.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "crisis_thunderstorm",
    title: "In Case of: Severe Thunderstorm & Lightning",
    category: "weather",
    urgency: "HIGH (Incoming squall)",
    icon: "⛈️",
    summary: "Lightning carries millions of volts. Ground currents and splash flashes cause the majority of wilderness strike casualties.",
    first60s: [
      "THE 30/30 RULE: Count seconds between lightning flash and thunder crack. If 30 seconds or less, lightning is within 10 km (6 miles)—you are in direct danger zone.",
      "DESCEND FROM EXPOSURE: Immediately evacuate elevated ridgelines, peaks, cliff edges, and open plateaus.",
      "AVOID ISOLATED TREES: Never seek shelter beneath a tall or solitary tree (acts as a primary lightning ground attractor).",
      "SHED CONDUCTIVE GEAR: Place metal frame packs, trekking poles, and tools 10 meters away from your shelter spot."
    ],
    nextHour: [
      "SHELTER SITE: Best wilderness shelter is an enclosed all-metal motor vehicle or a deep, uniform stand of shorter trees in a low ravine (avoid dry ravines susceptible to flash flooding).",
      "LIGHTNING CROUCH (If caught in the open with hair standing on end):",
      "- Squat low on the balls of your feet with heels pressed firmly together.",
      "- Tuck head to knees and cover ears with hands.",
      "- Minimizes ground contact footprint and ensures ground current enters one foot and exits the other without traversing your heart."
    ],
    extendedRules: "Remain in shelter for at least 30 minutes after hearing the last thunderclap before resuming travel.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "crisis_wildfire",
    title: "In Case of: Wildfire & Forest Burnover",
    category: "disaster",
    urgency: "EXTREME (Rapid front movement)",
    icon: "🔥",
    summary: "Wildfires advance rapidly uphill due to convective preheating. Superheated smoke and oxygen depletion are primary fatal mechanisms.",
    first60s: [
      "ASSESS FLANK EVACUATION: Never attempt to outrun an advancing fire uphill or downwind. Move perpendicular (flank) to the direction of fire spread.",
      "IDENTIFY NATURAL SAFETY ZONES: Head for wide paved highways, bare rock outcroppings, plowed fields, or previously burned areas ('the black').",
      "AIRWAY SHIELDING: Damp cloth does NOT filter carbon monoxide; breathe slowly through dry fabric layers close to ground level."
    ],
    nextHour: [
      "BURNOVER DEFENSE (If trapped with no escape route):",
      "- Clear a 4x4 meter perimeter down to bare mineral soil, removing all dry needles and vegetation.",
      "- Lie face down in a depression, trench, or ditch.",
      "- Shield body beneath canvas tarp, wool blanket, or layer of soil.",
      "- Press mouth to the soil floor and take shallow breaths until the flaming front passes."
    ],
    extendedRules: "Flame fronts typically traverse an area in 2 to 5 minutes. Remain face down until roaring diminishes, then retreat into the cool blackened burn scar.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "crisis_flood",
    title: "In Case of: Flash Flood & Swiftwater",
    category: "weather",
    urgency: "RAPID (Rising water)",
    icon: "🌊",
    summary: "Just 15 cm (6 inches) of moving water can sweep an adult off balance; 30 cm can float a vehicle.",
    first60s: [
      "NEVER CROSS FLOODWATERS: Turn around, do not attempt to walk, wade, or drive through flooded roadways or inundated bridge crossings.",
      "VEHICLE ESCAPE: If vehicle stalls in rising water, unfasten seatbelt, lower windows immediately before electronics short, and climb onto roof.",
      "CLIMB TO HIGH GROUND: Move up valley slopes or ascend to upper floors of reinforced masonry structures."
    ],
    nextHour: [
      "DEFENSIVE SWIMMING (If swept into current):",
      "- Orient on your back with feet pointing DOWNSTREAM.",
      "- Keep toes visible above water surface to prevent foot entrapment under submerged boulders.",
      "- Back-paddle with arms at a 45-degree angle toward the shore.",
      "- If swept toward a strainer (fallen tree), swim aggressively OVER it to avoid underwater entrapment."
    ],
    extendedRules: "Treat all floodwaters as biohazard reservoirs contaminated with raw sewage, chemical runoff, and submerged electrical lines. Disinfect all contact surfaces.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  },
  {
    id: "crisis_cold",
    title: "In Case of: Blizzard & Extreme Hypothermia",
    category: "weather",
    urgency: "PROGRESSIVE (Hours to frostbite)",
    icon: "❄️",
    summary: "Moisture and wind accelerate heat loss. Preventing sweat saturation is essential to avoiding severe core hypothermia.",
    first60s: [
      "REGULATE VENTILATION: Remove outer layers before strenuous activity to prevent sweat condensation inside clothing.",
      "WIND DEFENSE: Seek immediate natural windbreaks—boulders, dense spruce stands, or excavate a snow trench.",
      "GROUND INSULATION: Never sit or lie directly on snow, ice, or frozen rock; construct an insulating pad of evergreen boughs or pack foam."
    ],
    nextHour: [
      "HYPOTHERMIA MANAGEMENT:",
      "- Mild (Active shivering, slurred speech): Replace damp clothing with dry layers, administer warm sweetened fluids, maintain gentle active movement.",
      "- Severe (Shivering ceases, stupor, confusion): Medical emergency. Do NOT vigorously rub cold extremities. Rewarm central core (axillae, groin, chest) using passive insulation and external warm packs.",
      "SHELTER VENTILATION: If operating a stove or candle inside a snow cave or enclosed tent, maintain a continuous ventilation chimney to prevent carbon monoxide poisoning."
    ],
    extendedRules: "Avoid alcohol and tobacco in freezing conditions; they impair peripheral vasoconstriction and accelerate central heat dumping.",
    reviewStatus: "Not yet reviewed",
    sourceStatus: "Source: unverified"
  }
];
