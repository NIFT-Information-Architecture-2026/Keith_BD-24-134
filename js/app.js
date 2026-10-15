// ==========================================================================
// CODEX CAMAEL: Main Application Controller
// A life-saving digital reference. 100% offline.
// Visual System: Retro-Futuristic Control Panel (Solid Keycaps, LCD Readouts)
// 100% Offline-First Architecture (Zero CDNs, Zero Remote Calls)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  CAMAEL.init();
});

const CAMAEL = {
  activeSection: "home", // Default landing section: Main Retro-Futuristic Console
  audioCtx: null,
  cprInterval: null,
  cprActive: false,
  batteryObj: null,
  waypoints: [
    { id: "wp_1", name: "Potable Spring 01", lat: 35.68, lon: -81.20, type: "water", desc: "Perennial spring bubbling from granite ledge. Flow rate: 4L/min." },
    { id: "wp_2", name: "Emergency Cache Alpha", lat: 35.75, lon: -81.15, type: "cache", desc: "Sealed PVC tube buried 1m deep beside twin oak tree. MREs, ferro rod, water purification tablets." },
    { id: "wp_3", name: "High Ground Lookout", lat: 35.82, lon: -81.30, type: "shelter", desc: "Rock overhang shelter, dry ground, VHF line-of-sight across valley." },
    { id: "wp_4", name: "Flooded Basin Hazard", lat: 35.60, lon: -81.25, type: "danger", desc: "Seasonal flash flood zone. Submerged barbed wire and swift current." }
  ],
  mapState: {
    scale: 1.0,
    offsetX: 0,
    offsetY: 0,
    isDragging: false,
    startX: 0,
    startY: 0
  },

  // ------------------------------------------------------------------------
  // Initialization
  // ------------------------------------------------------------------------
  init() {
    this.migrateStorage();
    this.initThemeAndDisplay();
    this.initNavigation();
    this.initSwissDrawer();
    this.initSosOverlay();
    this.initLcdStatus();
    this.initGlobalSearch();
    this.initKeyboardShortcuts();
    this.initSettingsModal();
    this.initBookmarks();
    this.initDisclaimer();
    this.renderCompendium();
    this.renderGearPlanner();
    this.renderRecipes();
    this.renderCrisis();
    this.renderManual();
    this.renderRadio();
    this.initWorldMap();
    this.initTools();
    this.initLogbook();
    this.initModal();

    console.log("CODEX CAMAEL: Retro-Futuristic Survival Control Panel Initialized. All systems 100% offline.");
  },

  // ------------------------------------------------------------------------
  // Storage Migration
  // ------------------------------------------------------------------------
  migrateStorage() {
    const legacyPrefix = "camael_";
    const newPrefix = "codex_camael_";
    try {
      const keysToMigrate = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(legacyPrefix)) {
          keysToMigrate.push(key);
        }
      }
      keysToMigrate.forEach(key => {
        const subKey = key.slice(legacyPrefix.length);
        const newKey = `${newPrefix}${subKey}`;
        const val = localStorage.getItem(key);
        if (localStorage.getItem(newKey) === null && val !== null) {
          localStorage.setItem(newKey, val);
        }
      });
    } catch (e) {
      console.warn("Storage migration exception:", e);
    }
  },

  // Audio Context helper (resumed on user gesture)
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  },

  // ------------------------------------------------------------------------
  // Theme & Night Vision Modes (Light/Dark Theme, Red-Light Mode & Ultra-Reserve OLED)
  // ------------------------------------------------------------------------
  initThemeAndDisplay() {
    // Theme Mode (Dark by default, or Light)
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get("theme");
    const savedTheme = urlTheme || localStorage.getItem("codex_camael_theme") || "dark";
    if (savedTheme === "light") {
      document.body.classList.add("theme-light");
      document.documentElement.classList.add("theme-light");
      this.updateThemeButtonState(true);
    } else {
      document.body.classList.remove("theme-light");
      document.documentElement.classList.remove("theme-light");
      this.updateThemeButtonState(false);
    }

    const btnTheme = document.getElementById("btnToggleTheme");
    if (btnTheme) btnTheme.addEventListener("click", () => this.toggleTheme());

    // Red-Light Mode
    const savedRedLight = localStorage.getItem("codex_camael_night_mode") === "true";
    if (savedRedLight) {
      document.body.classList.add("red-light-mode");
      this.updateRedLightButtonState(true);
    }

    // OLED Mode
    const savedOled = localStorage.getItem("codex_camael_oled_mode") === "true";
    if (savedOled) {
      document.body.classList.add("oled-mode");
      this.updateOledButtonState(true);
    }

    const btnRed = document.getElementById("btnToggleRedLight");
    const settingsRed = document.getElementById("settingsToggleRedLight");
    if (btnRed) btnRed.addEventListener("click", () => this.toggleRedLight());
    if (settingsRed) settingsRed.addEventListener("click", () => this.toggleRedLight());

    const btnOled = document.getElementById("btnToggleOled");
    const settingsOled = document.getElementById("settingsToggleOled");
    if (btnOled) btnOled.addEventListener("click", () => this.toggleOled());
    if (settingsOled) settingsOled.addEventListener("click", () => this.toggleOled());
  },

  toggleTheme() {
    const isLight = document.body.classList.toggle("theme-light");
    document.documentElement.classList.toggle("theme-light", isLight);
    localStorage.setItem("codex_camael_theme", isLight ? "light" : "dark");
    this.updateThemeButtonState(isLight);
  },

  updateThemeButtonState(isLight) {
    const btn = document.getElementById("btnToggleTheme");
    if (btn) {
      btn.textContent = isLight ? "☀️ THEME: LIGHT" : "🌙 THEME: DARK";
      if (isLight) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    }
  },

  updateRedLightButtonState(isActive) {
    const labels = ["btnToggleRedLight", "settingsToggleRedLight"];
    labels.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = isActive ? "🚨 Red-Light Night Vision: ON" : "🚨 Red-Light Night Vision: OFF";
        if (isActive) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    });
  },

  toggleOled() {
    const isOled = document.body.classList.toggle("oled-mode");
    localStorage.setItem("codex_camael_oled_mode", isOled ? "true" : "false");
    this.updateOledButtonState(isOled);
  },

  updateOledButtonState(isActive) {
    const labels = ["btnToggleOled", "settingsToggleOled", "toggleUltraReserveBtn"];
    labels.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = isActive ? "🔋 OLED Black: ACTIVE" : "🔋 OLED Black: OFF";
        if (isActive) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      }
    });
  },

  // ------------------------------------------------------------------------
  // Top LCD Status Strip (Offline, Location, Battery, Region, Language)
  // ------------------------------------------------------------------------
  initLcdStatus() {
    // 1. Offline Network Status
    const updateOfflineState = () => {
      const dot = document.getElementById("lcdOfflineDot");
      const text = document.getElementById("lcdOfflineText");
      if (!dot || !text) return;
      if (!navigator.onLine) {
        dot.className = "lcd-dot green";
        text.textContent = "100% OFFLINE";
      } else {
        dot.className = "lcd-dot green";
        text.textContent = "OFFLINE READY (LOCAL)";
      }
    };
    window.addEventListener("online", updateOfflineState);
    window.addEventListener("offline", updateOfflineState);
    updateOfflineState();

    // 2. Battery Status API (Only shown if API exists)
    if ("getBattery" in navigator) {
      navigator.getBattery().then(battery => {
        this.batteryObj = battery;
        const item = document.getElementById("lcdBatteryItem");
        const dot = document.getElementById("lcdBatteryDot");
        const text = document.getElementById("lcdBatteryText");

        const updateBattery = () => {
          if (!item || !dot || !text) return;
          item.style.display = "inline-flex";
          const level = Math.round(battery.level * 100);
          text.textContent = `BATTERY: ${level}% ${battery.charging ? '(CHRG)' : ''}`;
          if (level <= 20 && !battery.charging) {
            dot.className = "lcd-dot orange";
          } else {
            dot.className = "lcd-dot green";
          }
        };

        updateBattery();
        battery.addEventListener("levelchange", updateBattery);
        battery.addEventListener("chargingchange", updateBattery);
      }).catch(() => {
        const item = document.getElementById("lcdBatteryItem");
        if (item) item.style.display = "none";
      });
    } else {
      const item = document.getElementById("lcdBatteryItem");
      if (item) item.style.display = "none";
    }

    // 3. Location Status (Interactive)
    const locItem = document.getElementById("lcdLocationStatus");
    const locText = document.getElementById("lcdLocationText");
    const locDot = document.getElementById("lcdLocationDot");
    if (locItem) {
      locItem.style.cursor = "pointer";
      locItem.addEventListener("click", () => {
        if ("geolocation" in navigator) {
          locText.textContent = "LOCATING GPS...";
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              const lat = pos.coords.latitude.toFixed(2);
              const lon = pos.coords.longitude.toFixed(2);
              locText.textContent = `GPS: ${lat}°N, ${lon}°E`;
              if (locDot) locDot.className = "lcd-dot green";
            },
            () => {
              locText.textContent = "LOCATION: OFF-GRID";
              if (locDot) locDot.className = "lcd-dot";
            },
            { timeout: 5000, enableHighAccuracy: false }
          );
        }
      });
    }

    // 4. Region Selector
    const regionSelect = document.getElementById("lcdRegionSelect");
    if (regionSelect) {
      const savedRegion = localStorage.getItem("codex_camael_region") || "india";
      regionSelect.value = savedRegion;
      regionSelect.addEventListener("change", (e) => {
        localStorage.setItem("codex_camael_region", e.target.value);
      });
    }

    // 5. Language Switcher (EN / മലയാളം / తెలుగు)
    const langBtns = document.querySelectorAll(".lcd-lang-switcher .lang-btn");
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("screenshotLang") || urlParams.get("lang");
    const savedLang = urlLang || localStorage.getItem("codex_camael_lang") || "en";
    this.setLanguage(savedLang);

    langBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang;
        this.setLanguage(lang);
      });
    });
  },

  setLanguage(lang) {
    localStorage.setItem("codex_camael_lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.body.classList.toggle("lang-ml", lang === "ml");
    document.body.classList.toggle("lang-te", lang === "te");

    document.querySelectorAll(".lcd-lang-switcher .lang-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    // Translate Home Console Tiles
    const homeTranslations = {
      en: {
        sosTitle: "SOS // CRITICAL EMERGENCY SHEET",
        sosSub: "Instant 1-Click Access • Cardiac CPR • Arterial Trauma • Poison • Nuclear 7-10",
        sosTag: "6 CARDS",
        medTitle: "MEDICAL & CPR TRIAGE",
        medSub: "AHA 110 BPM Metronome • Cardiac Arrest • Trauma",
        medTag: "110 BPM",
        crisisTitle: "CRISIS PLAYBOOKS (60s)",
        crisisSub: "7-10 Nuclear Decay • Severe Storms • Snakebite",
        crisisTag: "8 SCENARIOS",
        plants: "Plants & Taxonomy",
        plantsTag: "15 ENTRIES",
        water: "Water & Purification",
        waterTag: "4 METHODS",
        fire: "Fire & Heat Systems",
        fireTag: "3 SYSTEMS",
        shelter: "Shelter & Knotcraft",
        shelterTag: "5 GUIDES",
        map: "Offline Cartography",
        mapTag: "4 WAYPOINTS",
        sun: "Sun & Direction",
        sunTag: "3 METHODS",
        kitchen: "Survival Kitchen",
        kitchenTag: "11 RECIPES",
        gear: "Gear & Loadouts",
        gearTag: "6 LOADOUTS",
        comms: "Comms & Morse",
        commsTag: "7 FREQS",
        vault: "Emergency ICE Vault",
        vaultTag: "LOCAL ONLY"
      },
      ml: {
        sosTitle: "SOS // അടിയന്തര സഹായ ഷീറ്റ്",
        sosSub: "ഉടൻ പ്രവേശനം • കാർഡിയാക് CPR • ആർട്ടീരിയൽ ട്രോമ • വിഷബാധ • ന്യൂക്ലിയർ 7-10",
        sosTag: "6 കാർഡുകൾ",
        medTitle: "മെഡിക്കൽ & CPR ട്രയേജ്",
        medSub: "AHA 110 BPM മെട്രോണോം • ഹൃദയാഘാതം • ട്രോമ",
        medTag: "110 BPM",
        crisisTitle: "ക്രൈസിസ് പ്ലേബുക്ക് (60s)",
        crisisSub: "7-10 ന്യൂക്ലിയർ ശോഷണം • ചുഴലിക്കാറ്റ് • പാമ്പുകടി",
        crisisTag: "8 രംഗങ്ങൾ",
        plants: "സസ്യങ്ങളും ടാക്സോണമിയും",
        plantsTag: "15 ഇനങ്ങൾ",
        water: "ജലശുദ്ധീകരണം",
        waterTag: "4 രീതികൾ",
        fire: "തീയും താപ സംവിധാനങ്ങളും",
        fireTag: "3 സംവിധാനങ്ങൾ",
        shelter: "അഭയവും കെട്ടുകളും",
        shelterTag: "5 വഴികാട്ടികൾ",
        map: "ഓഫ്‌ലൈൻ ഭൂപടം",
        mapTag: "4 പോയിന്റുകൾ",
        sun: "സൂര്യനും ദിശയും",
        sunTag: "3 രീതികൾ",
        kitchen: "മനുഗഡ അടുക്കള",
        kitchenTag: "11 വിഭവങ്ങൾ",
        gear: "ഗിയർ & ലോഡുകൾ",
        gearTag: "6 ലോഡുകൾ",
        comms: "വാർത്താവിനിമയം",
        commsTag: "7 ഫ്രീക്വൻസി",
        vault: "അടിയന്തര ICE നിലവറ",
        vaultTag: "ലോക്കൽ മാത്രം"
      },
      te: {
        sosTitle: "SOS // అత్యవసర సహాయ షీట్",
        sosSub: "తక్షణ యాక్సెస్ • కార్డియాక్ CPR • తీవ్ర రక్తస్రావం • విషప్రభావం • న్యూక్లియర్ 7-10",
        sosTag: "6 కార్డులు",
        medTitle: "వైద్య & CPR ట్రయాజ్",
        medSub: "AHA 110 BPM మెట్రోనొమ్ • గుండెపోటు • అత్యవసర గాయాలు",
        medTag: "110 BPM",
        crisisTitle: "సంక్షోభ ప్లేబుక్స్ (60s)",
        crisisSub: "7-10 రేడియేషన్ క్షయం • భయంకర తుఫానులు • పాముకాటు",
        crisisTag: "8 దృశ్యాలు",
        plants: "మొక్కలు & వర్గీకరణ",
        plantsTag: "15 ఎంట్రీలు",
        water: "నీటి శుద్ధి పద్ధతులు",
        waterTag: "4 పద్ధతులు",
        fire: "నిప్పు & ఉష్ణ వ్యవస్థలు",
        fireTag: "3 వ్యవస్థలు",
        shelter: "ఆశ్రయం & ముడులు",
        shelterTag: "5 గైడ్‌లు",
        map: "ఆఫ్‌లైన్ పటాలు",
        mapTag: "4 వేపాయింట్లు",
        sun: "సూర్యుడు & దిశ",
        sunTag: "3 పద్ధతులు",
        kitchen: "మనుగడ వంటశాల",
        kitchenTag: "11 వంటకాలు",
        gear: "పరికరాలు & లోడౌట్లు",
        gearTag: "6 లోడౌట్లు",
        comms: "సమాచార మార్పిడి & మోర్స్",
        commsTag: "7 ఫ్రీక్వెన్సీలు",
        vault: "అత్యవసర ICE వాల్ట్",
        vaultTag: "స్థానికం మాత్రమే"
      }
    };

    const t = homeTranslations[lang] || homeTranslations.en;
    const sosTile = document.getElementById("homeSosTile");
    if (sosTile) {
      const title = sosTile.querySelector(".tile-title");
      const sub = sosTile.querySelector(".tile-subline");
      const tag = sosTile.querySelector(".chapter-tile-tag");
      if (title) title.textContent = t.sosTitle;
      if (sub) sub.textContent = t.sosSub;
      if (tag) tag.textContent = t.sosTag;
    }
    const medTile = document.getElementById("homeMedicalTile");
    if (medTile) {
      const title = medTile.querySelector(".tile-title");
      const sub = medTile.querySelector(".tile-subline");
      const tag = medTile.querySelector(".chapter-tile-tag");
      if (title) title.textContent = t.medTitle;
      if (sub) sub.textContent = t.medSub;
      if (tag) tag.textContent = t.medTag;
    }
    const crisisTile = document.getElementById("homeCrisisTile");
    if (crisisTile) {
      const title = crisisTile.querySelector(".tile-title");
      const sub = crisisTile.querySelector(".tile-subline");
      const tag = crisisTile.querySelector(".chapter-tile-tag");
      if (title) title.textContent = t.crisisTitle;
      if (sub) sub.textContent = t.crisisSub;
      if (tag) tag.textContent = t.crisisTag;
    }

    const mapping = [
      { sel: ".console-panel:nth-of-type(1) .chapter-tile:nth-of-type(1)", key: "plants", tagKey: "plantsTag" },
      { sel: ".console-panel:nth-of-type(1) .chapter-tile:nth-of-type(2)", key: "water", tagKey: "waterTag" },
      { sel: ".console-panel:nth-of-type(1) .chapter-tile:nth-of-type(3)", key: "fire", tagKey: "fireTag" },
      { sel: ".console-panel:nth-of-type(1) .chapter-tile:nth-of-type(4)", key: "shelter", tagKey: "shelterTag" },
      { sel: ".console-panel:nth-of-type(2) .chapter-tile:nth-of-type(1)", key: "map", tagKey: "mapTag" },
      { sel: ".console-panel:nth-of-type(2) .chapter-tile:nth-of-type(2)", key: "sun", tagKey: "sunTag" },
      { sel: ".console-panel:nth-of-type(3) .chapter-tile:nth-of-type(1)", key: "kitchen", tagKey: "kitchenTag" },
      { sel: ".console-panel:nth-of-type(3) .chapter-tile:nth-of-type(2)", key: "gear", tagKey: "gearTag" },
      { sel: ".console-panel:nth-of-type(3) .chapter-tile:nth-of-type(3)", key: "comms", tagKey: "commsTag" },
      { sel: ".console-panel:nth-of-type(4) .chapter-tile", key: "vault", tagKey: "vaultTag" }
    ];

    mapping.forEach(m => {
      const btn = document.querySelector(m.sel);
      if (btn) {
        const titleEl = btn.querySelector(".tile-title");
        const tagEl = btn.querySelector(".chapter-tile-tag");
        if (titleEl && t[m.key]) titleEl.textContent = t[m.key];
        if (tagEl && t[m.tagKey]) tagEl.textContent = t[m.tagKey];
      }
    });
  },

  // ------------------------------------------------------------------------
  // Navigation Routing & Swiss Drawer
  // ------------------------------------------------------------------------
  initNavigation() {
    const navLinks = document.querySelectorAll(".nav-link, .swiss-nav-item");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.dataset.section;
        this.switchSection(target);
        this.closeSwissDrawer();
      });
    });

    const brandLink = document.getElementById("brandHomeLink");
    if (brandLink) {
      brandLink.addEventListener("click", () => this.switchSection("home"));
    }

    const subBackBtn = document.getElementById("subHeaderBackBtn");
    if (subBackBtn) {
      subBackBtn.addEventListener("click", () => this.switchSection("home"));
    }

    // Check hash if present
    const hash = window.location.hash.replace("#", "");
    if (hash === "sos") {
      this.switchSection("home");
      this.openSosOverlay();
    } else if (hash.startsWith("entry-")) {
      const itemId = hash.replace("entry-", "");
      this.switchSection("compendium");
      setTimeout(() => {
        if (window.CAMAEL_ITEMS) {
          const targetItem = window.CAMAEL_ITEMS.find(i => i.id === itemId);
          if (targetItem) this.showItemDetail(targetItem);
        }
      }, 50);
    } else if (hash && document.getElementById(`section-${hash}`)) {
      this.switchSection(hash);
    } else {
      this.switchSection("home");
    }
  },

  initSwissDrawer() {
    const menuBtn = document.getElementById("swissMenuBtn");
    const overlay = document.getElementById("swissDrawerOverlay");
    const closeBtn = document.getElementById("swissDrawerCloseBtn");

    if (menuBtn && overlay) {
      menuBtn.addEventListener("click", () => this.openSwissDrawer());
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeSwissDrawer());
    }
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this.closeSwissDrawer();
      });
    }
  },

  openSwissDrawer() {
    const overlay = document.getElementById("swissDrawerOverlay");
    if (overlay) overlay.classList.add("active");
  },

  closeSwissDrawer() {
    const overlay = document.getElementById("swissDrawerOverlay");
    if (overlay) overlay.classList.remove("active");
  },

  // ------------------------------------------------------------------------
  // SOS Full-Screen Overlay & 1-Click Triggers
  // ------------------------------------------------------------------------
  initSosOverlay() {
    const sosBtn = document.getElementById("sosCheatSheetBtn");
    const homeSos = document.getElementById("homeSosTile");
    const overlay = document.getElementById("sosOverlay");
    const closeBtn = document.getElementById("sosCloseBtn");
    const reserveToggleBtn = document.getElementById("toggleUltraReserveBtn");

    if (sosBtn) sosBtn.addEventListener("click", () => this.openSosOverlay());
    if (homeSos) homeSos.addEventListener("click", () => this.openSosOverlay());
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeSosOverlay());
    if (reserveToggleBtn) reserveToggleBtn.addEventListener("click", () => this.toggleOled());
  },

  openSosOverlay() {
    const overlay = document.getElementById("sosOverlay");
    if (overlay) overlay.classList.add("active");
  },

  closeSosOverlay() {
    const overlay = document.getElementById("sosOverlay");
    if (overlay) overlay.classList.remove("active");
  },

  // ------------------------------------------------------------------------
  // Laptop Interaction: Keyboard Shortcuts ('/', 'S', 'Esc', Arrows, Enter)
  // ------------------------------------------------------------------------
  initKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
      const isInput = activeTag === "input" || activeTag === "textarea" || activeTag === "select";

      // 1. '/' focuses search
      if (e.key === "/" && !isInput) {
        e.preventDefault();
        const searchInput = document.getElementById("consoleSearchInput");
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
        return;
      }

      // 2. 'S' or 's' opens SOS sheet (when not in an input)
      if ((e.key === "s" || e.key === "S") && !isInput) {
        e.preventDefault();
        this.openSosOverlay();
        return;
      }

      // 3. 'Esc' closes overlays/modals or navigates back to Home console
      if (e.key === "Escape") {
        const liveSearch = document.getElementById("liveSearchOverlay");
        if (liveSearch && liveSearch.style.display !== "none") {
          liveSearch.style.display = "none";
          return;
        }

        const disclaimerModal = document.getElementById("disclaimerModalOverlay");
        if (disclaimerModal && disclaimerModal.classList.contains("active")) {
          // Disclaimer cannot be dismissed with Esc until acknowledged
          return;
        }

        const bookmarksModal = document.getElementById("bookmarksModalOverlay");
        if (bookmarksModal && bookmarksModal.classList.contains("active")) {
          this.closeBookmarksModal();
          return;
        }

        const sosOverlay = document.getElementById("sosOverlay");
        if (sosOverlay && sosOverlay.classList.contains("active")) {
          this.closeSosOverlay();
          return;
        }

        const modalOverlay = document.getElementById("modalOverlay");
        if (modalOverlay && modalOverlay.classList.contains("active")) {
          this.closeModal();
          return;
        }

        const settingsModal = document.getElementById("settingsModalOverlay");
        if (settingsModal && settingsModal.classList.contains("active")) {
          this.closeSettingsModal();
          return;
        }

        const swissDrawer = document.getElementById("swissDrawerOverlay");
        if (swissDrawer && swissDrawer.classList.contains("active")) {
          this.closeSwissDrawer();
          return;
        }

        // If in a sub-chapter, return to home console
        if (this.activeSection !== "home") {
          this.switchSection("home");
        }
        return;
      }

      // 4. Arrow Navigation across interactive keycap tiles
      if (["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key) && !isInput) {
        const tiles = Array.from(document.querySelectorAll(
          this.activeSection === "home" 
            ? "#section-home .keycap-tile" 
            : `#section-${this.activeSection} .entry-tile, #section-${this.activeSection} .keycap-tile, #section-${this.activeSection} .grid-card`
        ));

        if (tiles.length > 0) {
          const currentIndex = tiles.indexOf(document.activeElement);
          let nextIndex = 0;

          if (currentIndex !== -1) {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              nextIndex = (currentIndex + 1) % tiles.length;
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              nextIndex = (currentIndex - 1 + tiles.length) % tiles.length;
            }
          }
          tiles[nextIndex].focus();
          e.preventDefault();
        }
      }
    });
  },

  // ------------------------------------------------------------------------
  // Bookmarks: Save / Remove / List / Badge Count
  // ------------------------------------------------------------------------
  initBookmarks() {
    const openBtn = document.getElementById("btnOpenBookmarks");
    const closeBtn = document.getElementById("bookmarksCloseBtn");
    const overlay = document.getElementById("bookmarksModalOverlay");

    if (openBtn) openBtn.addEventListener("click", () => this.openBookmarksModal());
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeBookmarksModal());
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this.closeBookmarksModal();
      });
    }

    this.updateBookmarkBadge();
  },

  getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem("codex_camael_bookmarks") || "[]");
    } catch {
      return [];
    }
  },

  saveBookmarks(list) {
    localStorage.setItem("codex_camael_bookmarks", JSON.stringify(list));
    this.updateBookmarkBadge();
  },

  isBookmarked(id) {
    return this.getBookmarks().some(b => b.id === id);
  },

  toggleBookmark(entry) {
    let list = this.getBookmarks();
    const idx = list.findIndex(b => b.id === entry.id);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push({
        id: entry.id,
        title: entry.commonName || entry.name || entry.title,
        chapter: entry._chapter || "COMPENDIUM"
      });
    }
    this.saveBookmarks(list);
    return idx < 0; // true = just bookmarked
  },

  updateBookmarkBadge() {
    const badge = document.getElementById("bookmarkCount");
    if (badge) {
      const count = this.getBookmarks().length;
      badge.textContent = count > 0 ? count : "";
      badge.style.display = count > 0 ? "inline-block" : "none";
    }
  },

  openBookmarksModal() {
    const overlay = document.getElementById("bookmarksModalOverlay");
    if (overlay) {
      overlay.classList.add("active");
      this.renderBookmarksList();
    }
  },

  closeBookmarksModal() {
    const overlay = document.getElementById("bookmarksModalOverlay");
    if (overlay) overlay.classList.remove("active");
  },

  renderBookmarksList() {
    const container = document.getElementById("bookmarksListContainer");
    if (!container) return;
    const list = this.getBookmarks();

    if (list.length === 0) {
      container.innerHTML = `<div style="padding: 24px; color: var(--text-secondary); text-align: center; font-family: var(--font-mono); font-size: 13px;">NO BOOKMARKS SAVED<br><span style="font-size: 11px; opacity: 0.7;">Open any entry and tap the Bookmark key to save it here.</span></div>`;
      return;
    }

    container.innerHTML = list.map((b, idx) => `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 14px; background: var(--bg-secondary); border-radius: 8px; margin-bottom: 8px;">
        <div style="flex: 1; min-width: 0;">
          <div style="font-weight: 700; color: var(--text-primary); font-size: 14px; word-break: break-word;">${b.title}</div>
          <span class="entry-tag-pill tag-tier" style="font-size: 10px; margin-top: 4px; display: inline-block;">${b.chapter}</span>
        </div>
        <div style="display: flex; gap: 8px; flex-shrink: 0;">
          <button class="keycap-tile key-teal" style="min-height: 34px; padding: 4px 10px; font-size: 11px;"
            onclick="CAMAEL.openBookmarkedEntry('${b.id}', '${b.chapter}')">VIEW</button>
          <button class="keycap-tile key-dark" style="min-height: 34px; padding: 4px 10px; font-size: 11px;"
            onclick="CAMAEL.removeBookmarkById('${b.id}')">REMOVE</button>
        </div>
      </div>
    `).join("");
  },

  openBookmarkedEntry(id, chapter) {
    this.closeBookmarksModal();
    const chapterMap = {
      "COMPENDIUM": { data: window.CAMAEL_ITEMS, fn: "showItemDetail" },
      "RECIPES": { data: window.CAMAEL_RECIPES, fn: "showRecipeDetail" },
      "CRISIS PLAYBOOKS": { data: window.CAMAEL_CRISIS, fn: "showCrisisDetail" },
      "MANUAL": { data: window.CAMAEL_MANUAL, fn: "showManualDetail" }
    };
    const ch = chapterMap[chapter];
    if (ch && ch.data) {
      const entry = ch.data.find(e => e.id === id);
      if (entry) this[ch.fn](entry);
    }
  },

  removeBookmarkById(id) {
    let list = this.getBookmarks().filter(b => b.id !== id);
    this.saveBookmarks(list);
    this.renderBookmarksList();
  },

  // ------------------------------------------------------------------------
  // First-Launch Disclaimer
  // ------------------------------------------------------------------------
  initDisclaimer() {
    const urlParams = new URLSearchParams(window.location.search);
    const bypassDisclaimer = urlParams.get("screenshotDisclaimer") === "1" || urlParams.get("bypassDisclaimer") === "1";
    const accepted = bypassDisclaimer || localStorage.getItem("codex_camael_disclaimer_accepted") === "true";
    const overlay = document.getElementById("disclaimerModalOverlay");
    const ackBtn = document.getElementById("btnAcknowledgeDisclaimer");
    const showBtn = document.getElementById("btnShowDisclaimer");

    if (!accepted && overlay) {
      overlay.classList.add("active");
    }

    if (ackBtn) {
      ackBtn.addEventListener("click", () => {
        localStorage.setItem("codex_camael_disclaimer_accepted", "true");
        if (overlay) overlay.classList.remove("active");
      });
    }

    if (showBtn) {
      showBtn.addEventListener("click", () => {
        if (overlay) overlay.classList.add("active");
      });
    }
  },

  // ------------------------------------------------------------------------
  // Settings & Keyboard Shortcut Legend Modal
  // ------------------------------------------------------------------------
  initSettingsModal() {
    const btn = document.getElementById("btnOpenSettings");
    const overlay = document.getElementById("settingsModalOverlay");
    const closeBtn = document.getElementById("settingsCloseBtn");

    if (btn) btn.addEventListener("click", () => this.openSettingsModal());
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeSettingsModal());
    if (overlay) {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this.closeSettingsModal();
      });
    }
  },

  openSettingsModal() {
    const overlay = document.getElementById("settingsModalOverlay");
    if (overlay) overlay.classList.add("active");
  },

  closeSettingsModal() {
    const overlay = document.getElementById("settingsModalOverlay");
    if (overlay) overlay.classList.remove("active");
  },

  // ------------------------------------------------------------------------
  // Section Switching Controller
  // ------------------------------------------------------------------------
  switchSection(sectionId) {
    this.activeSection = sectionId;

    // Update nav links & drawer active classes
    document.querySelectorAll(".nav-link, .swiss-nav-item").forEach(link => {
      link.classList.toggle("active", link.dataset.section === sectionId);
    });

    // Update section views
    document.querySelectorAll(".section-view").forEach(sec => {
      sec.classList.remove("active");
    });
    const targetEl = document.getElementById(`section-${sectionId}`);
    if (targetEl) targetEl.classList.add("active");

    // Sub-header management
    const subHeader = document.getElementById("subHeaderBar");
    if (subHeader) {
      if (sectionId === "home") {
        subHeader.style.display = "none";
      } else {
        subHeader.style.display = "flex";
        this.updateSubHeader(sectionId);
      }
    }

    // If map activated, redraw
    if (sectionId === "map") {
      requestAnimationFrame(() => {
        this.resizeCanvas();
        this.drawMap();
        setTimeout(() => {
          this.resizeCanvas();
          this.drawMap();
        }, 60);
      });
    }

    window.location.hash = sectionId;
    window.scrollTo({ top: 0, behavior: "instant" });
  },

  updateSubHeader(sectionId) {
    const titleEl = document.getElementById("subHeaderTitle");
    const countEl = document.getElementById("subHeaderCount");
    const filterPillsEl = document.getElementById("filterPillsContainer");

    if (!filterPillsEl) return;
    filterPillsEl.innerHTML = "";

    switch(sectionId) {
      case "compendium":
        if (titleEl) titleEl.textContent = "Scavenger's Compendium";
        if (countEl) countEl.textContent = `${window.CAMAEL_ITEMS.length} Entries`;
        this.createFilterPills([
          { label: "All Items", key: "all", active: true },
          { label: "Tier S (Priceless)", key: "tier-s" },
          { label: "Tier A (High)", key: "tier-a" },
          { label: "Forest", key: "biome-forest" },
          { label: "Wetland", key: "biome-wetland" },
          { label: "Urban Ruins", key: "biome-urban" },
          { label: "Coastal", key: "biome-coastal" },
          { label: "Flora", key: "flora" },
          { label: "Materials", key: "materials" },
          { label: "Deadly Hazards", key: "toxic" }
        ], (key) => this.filterCompendium(key));
        break;

      case "gear":
        if (titleEl) titleEl.textContent = "Gear, Vault & Telemetry Planner";
        if (countEl) countEl.textContent = `${window.CAMAEL_GEAR ? window.CAMAEL_GEAR.length : 0} Mandatory Items`;
        this.createFilterPills([
          { label: "All Loadouts", key: "all", active: true },
          { label: "Water Systems", key: "water" },
          { label: "Fire & Thermal", key: "fire" },
          { label: "Medical Trauma", key: "medical" },
          { label: "Shelter Systems", key: "shelter" }
        ], (key) => this.filterGear(key));
        break;

      case "recipes":
        if (titleEl) titleEl.textContent = "Survival Kitchen & Lifesavers";
        if (countEl) countEl.textContent = `${window.CAMAEL_RECIPES.length} Recipes`;
        this.createFilterPills([
          { label: "All Recipes", key: "all", active: true },
          { label: "🚨 Lifesavers Only", key: "lifesavers" },
          { label: "Camp Cooking", key: "cooking" }
        ], (key) => this.filterRecipes(key));
        break;

      case "incaseof":
        if (titleEl) titleEl.textContent = "Immediate Crisis Playbooks";
        if (countEl) countEl.textContent = `${window.CAMAEL_CRISIS.length} Scenarios`;
        this.createFilterPills([
          { label: "All Scenarios", key: "all", active: true },
          { label: "Medical / CPR", key: "medical" },
          { label: "Disaster / Nuclear", key: "disaster" },
          { label: "Extreme Weather", key: "weather" }
        ], (key) => this.filterCrisis(key));
        break;

      case "manual":
        if (titleEl) titleEl.textContent = "Field Manual & Diagrams";
        if (countEl) countEl.textContent = `${window.CAMAEL_MANUAL.length} Guides`;
        this.createFilterPills([
          { label: "All Guides", key: "all", active: true },
          { label: "Navigation", key: "navigation" },
          { label: "Water", key: "water" },
          { label: "Firecraft", key: "fire" },
          { label: "Cordage & Knots", key: "cordage" }
        ], (key) => this.filterManual(key));
        break;

      case "radio":
        if (titleEl) titleEl.textContent = "Emergency Radio & Comms";
        if (countEl) countEl.textContent = `${window.CAMAEL_RADIO.frequencies.length} Frequencies`;
        break;

      case "map":
        if (titleEl) titleEl.textContent = "Offline Vector Cartography";
        if (countEl) countEl.textContent = "Global Vector Topo";
        break;

      case "logbook":
        if (titleEl) titleEl.textContent = "Encrypted Offline Vault & ICE";
        if (countEl) countEl.textContent = "Local Disk";
        break;
    }
  },

  createFilterPills(pills, callback) {
    const container = document.getElementById("filterPillsContainer");
    if (!container) return;
    container.innerHTML = "";
    pills.forEach(p => {
      const btn = document.createElement("button");
      btn.className = `keycap-tile filter-key ${p.active ? "active" : ""}`;
      btn.style.minHeight = "36px";
      btn.style.padding = "4px 12px";
      btn.style.fontSize = "11px";
      btn.textContent = p.label;
      btn.addEventListener("click", () => {
        container.querySelectorAll(".filter-key").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        callback(p.key);
      });
      container.appendChild(btn);
    });
  },

  // ------------------------------------------------------------------------
  // Visible Full-Width Global Ranked Search
  // ------------------------------------------------------------------------
  initGlobalSearch() {
    const searchInput = document.getElementById("consoleSearchInput");
    const overlay = document.getElementById("liveSearchOverlay");

    if (!searchInput || !overlay) return;

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      if (!query) {
        overlay.style.display = "none";
        overlay.innerHTML = "";
        return;
      }
      this.executeRankedSearch(query);
    });

    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !overlay.contains(e.target)) {
        overlay.style.display = "none";
      }
    });
  },

  executeRankedSearch(query) {
    const overlay = document.getElementById("liveSearchOverlay");
    if (!overlay) return;

    const scored = [];

    // 1. Compendium Search
    if (window.CAMAEL_ITEMS) {
      window.CAMAEL_ITEMS.forEach(item => {
        let score = 0;
        const name = (item.commonName || item.name || "").toLowerCase();
        const formula = (item.scientificFormula || item.symbol || "").toLowerCase();
        const desc = (item.description || "").toLowerCase();
        const usage = (item.survivalUsage || "").toLowerCase();
        const tier = (item.tier || "").toLowerCase();

        if (name === query) score += 100;
        else if (name.startsWith(query)) score += 80;
        else if (name.includes(query)) score += 60;

        if (formula.includes(query)) score += 50;
        if (tier.includes(query)) score += 35;
        if (desc.includes(query)) score += 20;
        if (usage.includes(query)) score += 20;

        if (score > 0) {
          scored.push({
            score,
            section: "compendium",
            id: item.id,
            title: item.commonName || item.name,
            secondary: item.scientificFormula || item.symbol || "",
            chapter: "COMPENDIUM",
            snippet: item.description
          });
        }
      });
    }

    // 2. Recipes Search
    if (window.CAMAEL_RECIPES) {
      window.CAMAEL_RECIPES.forEach(rec => {
        let score = 0;
        const name = (rec.name || "").toLowerCase();
        const sum = (rec.summary || "").toLowerCase();
        const ings = (rec.ingredients || []).join(" ").toLowerCase();

        if (name === query) score += 95;
        else if (name.startsWith(query)) score += 75;
        else if (name.includes(query)) score += 55;

        if (ings.includes(query)) score += 40;
        if (sum.includes(query)) score += 20;

        if (score > 0) {
          scored.push({
            score,
            section: "recipes",
            id: rec.id,
            title: rec.name,
            secondary: (rec.ingredients || []).slice(0, 3).join(", "),
            chapter: "RECIPES",
            snippet: rec.summary
          });
        }
      });
    }

    // 3. Crisis Search
    if (window.CAMAEL_CRISIS) {
      window.CAMAEL_CRISIS.forEach(cri => {
        let score = 0;
        const title = (cri.title || "").toLowerCase();
        const sum = (cri.summary || "").toLowerCase();

        if (title.includes(query)) score += 60;
        if (sum.includes(query)) score += 20;

        if (score > 0) {
          scored.push({
            score,
            section: "incaseof",
            id: cri.id,
            title: cri.title,
            secondary: cri.urgency,
            chapter: "CRISIS 60s",
            snippet: cri.summary
          });
        }
      });
    }

    // 4. Manual Search
    if (window.CAMAEL_MANUAL) {
      window.CAMAEL_MANUAL.forEach(man => {
        let score = 0;
        const title = (man.title || "").toLowerCase();
        const sum = (man.summary || "").toLowerCase();

        if (title.includes(query)) score += 55;
        if (sum.includes(query)) score += 20;

        if (score > 0) {
          scored.push({
            score,
            section: "manual",
            id: man.id,
            title: man.title,
            secondary: man.category,
            chapter: "MANUAL",
            snippet: man.summary
          });
        }
      });
    }

    // 5. Radio Search
    if (window.CAMAEL_RADIO && window.CAMAEL_RADIO.frequencies) {
      window.CAMAEL_RADIO.frequencies.forEach(rf => {
        let score = 0;
        const ch = (rf.channel || "").toLowerCase();
        const freq = (rf.freq || "").toLowerCase();
        const purp = (rf.purpose || "").toLowerCase();

        if (ch.includes(query) || freq.includes(query)) score += 55;
        if (purp.includes(query)) score += 20;

        if (score > 0) {
          scored.push({
            score,
            section: "radio",
            id: "radio_freq",
            title: `${rf.channel} (${rf.freq})`,
            secondary: rf.service,
            chapter: "RADIO",
            snippet: rf.purpose
          });
        }
      });
    }

    // Sort descending
    scored.sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
      overlay.innerHTML = `<div style="padding: 18px 24px; color: var(--text-secondary); font-size: 13px;">No entries matching "<strong>${query}</strong>" in offline index.</div>`;
      overlay.style.display = "block";
      return;
    }

    const topResults = scored.slice(0, 10);
    overlay.innerHTML = topResults.map(res => `
      <div class="search-result-row" onclick="window.navigateToSolution('${res.section}', '${res.id}')">
        <div>
          <div style="font-weight: 700; color: var(--text-primary); font-size: 15px;">
            ${res.title}
            ${res.secondary ? `<span style="font-size: 12px; font-style: italic; opacity: 0.8; margin-left: 8px;">${res.secondary}</span>` : ''}
          </div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;">
            ${res.snippet}
          </div>
        </div>
        <span class="entry-tag-pill tag-tier" style="font-size: 10px; margin-left: 12px;">${res.chapter}</span>
      </div>
    `).join("");

    overlay.style.display = "block";
  },

  // ------------------------------------------------------------------------
  // Module 1: Scavenger's Compendium (Solid Keycap Tiles & Common Names)
  // ------------------------------------------------------------------------
  renderCompendium(items = window.CAMAEL_ITEMS) {
    const grid = document.getElementById("compendiumGrid");
    if (!grid) return;
    grid.innerHTML = "";

    items.forEach(item => {
      const tile = document.createElement("button");
      
      let keyColorClass = "key-cream";
      if (item.tier === "DANGER" || item.dangerTag) {
        keyColorClass = "key-orange";
      } else if (item.tier === "S") {
        keyColorClass = "key-teal";
      }

      tile.className = `keycap-tile entry-tile ${keyColorClass}`;
      tile.setAttribute("aria-label", `${item.commonName || item.name}`);

      const iconSvg = window.CODEX_ICONS ? window.CODEX_ICONS.get(item.iconName || 'leaf', 'entry-icon-svg', 22) : '•';
      
      let tagHtml = "";
      if (item.tier === "DANGER" || item.dangerTag) {
        const skullIcon = window.CODEX_ICONS ? window.CODEX_ICONS.get('skull', '', 14) : '☠️';
        tagHtml = `<span class="entry-tag-pill tag-deadly">${skullIcon} DEADLY: DO NOT EAT</span>`;
      } else if (item.tier === "S") {
        tagHtml = `<span class="entry-tag-pill tag-tier-s">${item.tierLabel || 'TIER S'}</span>`;
      } else {
        tagHtml = `<span class="entry-tag-pill tag-tier">${item.tierLabel || ('TIER ' + item.tier)}</span>`;
      }

      tile.innerHTML = `
        <div class="entry-tile-top">
          <div style="display: flex; align-items: center; gap: 8px;">
            ${iconSvg}
            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.85;">${item.category}</span>
          </div>
          ${tagHtml}
        </div>

        <div>
          <h3 class="entry-common-title">${item.commonName || item.name}</h3>
          <div class="entry-scientific-formula">${item.scientificFormula || item.symbol || ''}</div>
          <p class="entry-summary">${item.description}</p>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: 10px; font-size: 11px; opacity: 0.85; font-family: var(--font-mono);">
          <span>${item.biomes ? item.biomes[0] : ''}</span>
          <span style="font-weight: 700;">TAP TO INSPECT &rarr;</span>
        </div>
      `;

      tile.addEventListener("click", () => this.showItemDetail(item));
      grid.appendChild(tile);
    });
  },

  filterCompendium(filterKey) {
    let items = window.CAMAEL_ITEMS;
    if (filterKey === "tier-s") items = items.filter(i => i.tier === "S");
    else if (filterKey === "tier-a") items = items.filter(i => i.tier === "A");
    else if (filterKey === "flora") items = items.filter(i => i.category === "flora");
    else if (filterKey === "materials") items = items.filter(i => i.category === "materials");
    else if (filterKey === "toxic") items = items.filter(i => i.tier === "DANGER" || i.category === "toxic");
    else if (filterKey === "biome-forest") items = items.filter(i => i.biomes && i.biomes.some(b => b.includes("Forest")));
    else if (filterKey === "biome-wetland") items = items.filter(i => i.biomes && i.biomes.some(b => b.includes("Wetland")));
    else if (filterKey === "biome-urban") items = items.filter(i => i.biomes && i.biomes.some(b => b.includes("Urban")));
    else if (filterKey === "biome-coastal") items = items.filter(i => i.biomes && i.biomes.some(b => b.includes("Coastal")));

    this.renderCompendium(items);
  },

  // ------------------------------------------------------------------------
  // Entry Page Modal (Warnings First, Numbered Steps, Verified Sources)
  // ------------------------------------------------------------------------
  showItemDetail(item) {
    const iconContainer = document.getElementById("modalIconContainer");
    const subtitleEl = document.getElementById("modalSubtitle");
    if (iconContainer) {
      iconContainer.innerHTML = window.CODEX_ICONS ? window.CODEX_ICONS.get(item.iconName || 'leaf', '', 26) : '•';
    }
    if (subtitleEl) {
      subtitleEl.textContent = item.scientificFormula || item.symbol || "";
    }

    // 1. Warnings Panel: Filled dark-orange, orange left edge, BEFORE instructions
    let warningBoxHtml = "";
    if (item.riskMitigation) {
      const warnIcon = window.CODEX_ICONS ? window.CODEX_ICONS.get('warning', '', 16) : '⚠️';
      const actionBtn = item.riskMitigation.solutionAction 
        ? `<button onclick="window.navigateToSolution('${item.riskMitigation.solutionAction.section}', '${item.riskMitigation.solutionAction.targetId}')" class="keycap-tile key-cream" style="min-height: 36px; padding: 4px 12px; font-size: 11px; margin-top: 10px; font-weight: 700;">
             ${item.riskMitigation.solutionAction.buttonText}
           </button>` 
        : "";

      warningBoxHtml = `
        <div class="warning-panel-box">
          <div class="warning-panel-title">
            ${warnIcon} WARNING: IDENTIFIED HAZARD & CONTRAINDICATIONS
          </div>
          <p style="margin-top: 6px; font-size: 13px; line-height: 1.5;">${item.riskMitigation.risk}</p>
          <div style="font-size: 11px; font-weight: 700; color: #fff; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 8px;">
            CLINICAL MITIGATION / FIELD RESPONSE:
          </div>
          <p style="margin-top: 4px; color: #fff; font-size: 13px; line-height: 1.5;">${item.riskMitigation.solution}</p>
          ${actionBtn}
        </div>
      `;
    }

    // 2. Numbered Step Tiles for field usage & preparation
    const toolsRequired = (item.toolsRequired && item.toolsRequired.length > 0)
      ? item.toolsRequired.map(t => `${t.tool} (Acquisition: ${t.acquisition})`).join("; ")
      : "Forageable with bare hands";

    const stepsHtml = `
      <div class="step-tiles-list">
        <div class="step-tile">
          <span class="step-number-badge">01</span>
          <div>
            <strong>Tactical Acquisition & Required Tools</strong>
            <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${toolsRequired}</p>
          </div>
        </div>
        <div class="step-tile">
          <span class="step-number-badge">02</span>
          <div>
            <strong>Field Application & Preparation Protocol</strong>
            <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">${item.survivalUsage || item.description}</p>
          </div>
        </div>
        <div class="step-tile">
          <span class="step-number-badge">03</span>
          <div>
            <strong>Biomes, Habitat & Seasonal Availability</strong>
            <p style="font-size: 13px; color: var(--text-secondary); margin-top: 4px;">Primary Biomes: ${(item.biomes || []).join(', ')}. Edibility Rating: ${item.edibility}.</p>
          </div>
        </div>
      </div>
    `;

    // 3. Translation & Review Status Badge
    const reviewStatus = item.reviewStatus || "Not yet reviewed";
    const sourceStatus = item.sourceStatus || "Source: unverified";
    const translationBadge = `
      <span class="entry-tag-pill" style="background: #14120d; color: #c2bc9d; border: 1px solid #444;">
        Status: ${reviewStatus}
      </span>
    `;

    // 4. Sources panel — show unverified flag, never show hardcoded dates
    const sourcesList = item.sources && item.sources.length > 0
      ? item.sources.map(s => `<span>${s}</span>`).join(" &bull; ")
      : sourceStatus;

    // 5. Previous / Next Compendium Items Navigation
    const currentIndex = window.CAMAEL_ITEMS.findIndex(i => i.id === item.id);
    const prevItem = currentIndex > 0 ? window.CAMAEL_ITEMS[currentIndex - 1] : null;
    const nextItem = currentIndex < window.CAMAEL_ITEMS.length - 1 ? window.CAMAEL_ITEMS[currentIndex + 1] : null;

    const navButtons = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-color);">
        ${prevItem 
          ? `<button class="keycap-tile key-dark" onclick="CAMAEL.showItemDetail(window.CAMAEL_ITEMS[${currentIndex - 1}])" style="min-height: 38px; padding: 4px 12px; font-size: 12px;">&larr; ${prevItem.commonName || prevItem.name}</button>`
          : `<span style="width: 100px;"></span>`}
        ${nextItem 
          ? `<button class="keycap-tile key-dark" onclick="CAMAEL.showItemDetail(window.CAMAEL_ITEMS[${currentIndex + 1}])" style="min-height: 38px; padding: 4px 12px; font-size: 12px;">${nextItem.commonName || nextItem.name} &rarr;</button>`
          : `<span style="width: 100px;"></span>`}
      </div>
    `;

    const itemWithChapter = { ...item, _chapter: "COMPENDIUM" };
    this.openModal({
      title: item.commonName || item.name,
      content: `
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; align-items: center;">
          <span class="entry-tag-pill ${item.tier === 'S' ? 'tag-tier-s' : (item.tier === 'DANGER' ? 'tag-deadly' : 'tag-tier')}">
            ${item.tier === 'DANGER' ? 'DEADLY HAZARD' : item.barterValue}
          </span>
          <span class="entry-tag-pill tag-tier">${item.edibility}</span>
          ${translationBadge}
          <button class="keycap-tile key-dark" id="bmkBtn_${item.id}" style="min-height: 30px; padding: 3px 10px; font-size: 11px; margin-left: auto;"
            onclick="CAMAEL.toggleBookmark(${JSON.stringify(itemWithChapter).replace(/"/g, '&quot;')}); document.getElementById('bmkBtn_${item.id}').textContent = CAMAEL.isBookmarked('${item.id}') ? '★ BOOKMARKED' : '☆ BOOKMARK';">
            ${this.isBookmarked(item.id) ? '★ BOOKMARKED' : '☆ BOOKMARK'}
          </button>
        </div>

        ${warningBoxHtml}

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; font-family: var(--font-mono); color: var(--tile-cream-bg); margin-bottom: 8px; letter-spacing: 0.05em;">
            TAXONOMICAL PROFILE & IDENTIFICATION
          </h4>
          <p style="font-size: 14px; line-height: 1.65; color: var(--text-primary);">${item.description}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; font-family: var(--font-mono); color: var(--tile-cream-bg); margin-bottom: 8px; letter-spacing: 0.05em;">
            FIELD SURVIVAL PROTOCOL & PREPARATION
          </h4>
          ${stepsHtml}
        </div>

        <div class="console-panel" style="margin-top: 24px; padding: 14px 18px; margin-bottom: 12px;">
          <span class="console-panel-label" style="font-size: 10px;">SOURCES &amp; REVIEW STATUS</span>
          <div style="font-size: 11px; color: var(--text-secondary); line-height: 1.5;">
            <div><strong>SOURCES:</strong> ${sourcesList}</div>
            <div style="margin-top: 4px;"><strong>REVIEW:</strong> ${reviewStatus}</div>
          </div>
        </div>

        ${navButtons}
      `
    });
  },

  // ------------------------------------------------------------------------
  // Module 2: Gear, Telemetry & Trip Planner
  // ------------------------------------------------------------------------
  renderGearPlanner(gearList = window.CAMAEL_GEAR) {
    const container = document.getElementById("gearLoadoutList");
    const countBadge = document.getElementById("loadoutCountBadge");
    if (!container) return;
    container.innerHTML = "";

    if (countBadge && gearList) {
      countBadge.textContent = `${gearList.length} Items`;
    }

    if (!gearList || gearList.length === 0) {
      container.innerHTML = `<div style="padding: 24px; color: var(--text-secondary); text-align: center;">No gear matching active filters.</div>`;
      return;
    }

    gearList.forEach(item => {
      const card = document.createElement("div");
      card.className = "gear-item-card";
      card.id = `gear-card-${item.id}`;

      const substitutesHtml = item.substitutes && item.substitutes.length > 0
        ? item.substitutes.map((sub, idx) => `
            <div style="margin-top: 10px; padding: 10px 14px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 4px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <span style="font-weight: 700; color: #fff; font-size: 13px;">
                  <span class="substitute-badge">ALT ${idx + 1} // ${sub.tier.toUpperCase()}</span>
                  ${sub.name}
                </span>
                ${sub.sourceSection ? `
                  <button onclick="window.navigateToSolution('${sub.sourceSection}', '${sub.sourceId}')" class="keycap-tile key-dark" style="min-height: 28px; padding: 2px 8px; font-size: 10px;">
                    VIEW ${sub.sourceSection.toUpperCase()} &rarr;
                  </button>
                ` : ''}
              </div>
              <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; margin: 0;">${sub.instructions}</p>
            </div>
          `).join('')
        : `<p style="font-size: 11px; color: var(--text-secondary); margin: 0;">No improvised substitutes available for this critical item.</p>`;

      card.innerHTML = `
        <div class="gear-item-header" onclick="CAMAEL.toggleGearSubstitute('${item.id}')">
          <div>
            <div class="gear-item-title">
              <span>${item.name}</span>
              <span class="entry-tag-pill tag-tier-s" style="font-size: 9px;">${item.essentialRating}</span>
            </div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">${item.summary}</div>
            <div style="font-size: 11px; font-family: var(--font-mono); color: var(--tile-cream-bg); margin-top: 6px;">
              STANDARD PACK QTY: ${item.baseQty}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span id="accordion-arrow-${item.id}" style="font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary);">
              [+] EXPAND ALTS
            </span>
          </div>
        </div>

        <div id="substitutes-panel-${item.id}" class="gear-substitutes-panel">
          <div style="font-family: var(--font-mono); font-size: 10px; font-weight: 700; color: var(--tile-cream-bg); letter-spacing: 0.08em; margin-bottom: 8px;">
            FALLBACK CHAIN & WILDCRAFT SUBSTITUTES:
          </div>
          ${substitutesHtml}
        </div>
      `;

      container.appendChild(card);
    });

    const biomeSelect = document.getElementById("plannerBiomeSelect");
    const durationSelect = document.getElementById("plannerDurationSelect");
    const partySelect = document.getElementById("plannerPartySelect");

    if (biomeSelect && !biomeSelect.dataset.wired) {
      biomeSelect.dataset.wired = "true";
      const updateTelemetry = () => this.calculateTripTelemetry();
      biomeSelect.addEventListener("change", updateTelemetry);
      if (durationSelect) durationSelect.addEventListener("change", updateTelemetry);
      if (partySelect) partySelect.addEventListener("change", updateTelemetry);
    }
  },

  toggleGearSubstitute(itemId) {
    const panel = document.getElementById(`substitutes-panel-${itemId}`);
    const arrow = document.getElementById(`accordion-arrow-${itemId}`);
    if (panel) {
      const isActive = panel.classList.toggle("active");
      if (arrow) {
        arrow.textContent = isActive ? "[-] HIDE ALTS" : "[+] EXPAND ALTS";
        arrow.style.color = isActive ? "var(--tile-cream-bg)" : "var(--text-secondary)";
      }
    }
  },

  calculateTripTelemetry() {
    const biome = document.getElementById("plannerBiomeSelect")?.value || "Forest & Woodland";
    const duration = document.getElementById("plannerDurationSelect")?.value || "overnight";
    const party = parseInt(document.getElementById("plannerPartySelect")?.value || "2", 10);

    let days = 1;
    if (duration === "day") days = 0.5;
    else if (duration === "overnight") days = 1;
    else if (duration === "multiday") days = 3;
    else if (duration === "grid_down") days = 7;

    const waterMultiplier = biome.includes("Arid") ? 4.5 : 3.0;
    const totalWater = (party * days * waterMultiplier).toFixed(1);
    const foodDays = days;
    const medUnits = Math.max(2, party * (days > 2 ? 3 : 2));

    const waterVal = document.getElementById("telemetryWaterVal");
    const waterStatus = document.getElementById("telemetryWaterStatus");
    const medVal = document.getElementById("telemetryMedVal");
    const foodVal = document.getElementById("telemetryFoodVal");

    if (waterVal) waterVal.textContent = `${totalWater} L`;
    if (waterStatus) waterStatus.textContent = `${party} PPL // ${days} DAYS TARGET`;
    if (medVal) medVal.textContent = `${medUnits < 10 ? '0' + medUnits : medUnits} UNITS`;
    if (foodVal) foodVal.textContent = `${foodDays} DAYS`;

    if (window.CAMAEL_GEAR) {
      const filtered = window.CAMAEL_GEAR.filter(g => !g.biomes || g.biomes.some(b => b.includes(biome.split(' ')[0])));
      this.renderGearPlanner(filtered);
    }
  },

  filterGear(key) {
    let list = window.CAMAEL_GEAR || [];
    if (key === "water") list = list.filter(g => g.category === "water");
    else if (key === "fire") list = list.filter(g => g.category === "fire");
    else if (key === "medical") list = list.filter(g => g.category === "medical");
    else if (key === "shelter") list = list.filter(g => g.category === "shelter");
    this.renderGearPlanner(list);
  },

  // ------------------------------------------------------------------------
  // Module 3: Survival Kitchen & Recipes
  // ------------------------------------------------------------------------
  renderRecipes(recipes = window.CAMAEL_RECIPES) {
    const grid = document.getElementById("recipesGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const allIngredients = new Set();
    window.CAMAEL_RECIPES.forEach(r => {
      r.ingredients.forEach(ing => allIngredients.add(ing));
    });

    this.renderPantryIngredients(Array.from(allIngredients).sort());

    recipes.forEach(recipe => {
      const card = document.createElement("div");
      card.className = "grid-card";

      const isLifesaver = recipe.category === "lifesavers";

      card.innerHTML = `
        <div class="card-top">
          <div class="card-lead-symbol" style="font-size: 20px;">${isLifesaver ? "🚨 LIFESAVER" : "🍲 RATION"}</div>
          <span class="entry-tag-pill ${isLifesaver ? 'tag-tier-s' : 'tag-tier'}">${recipe.prepTime}</span>
        </div>
        <div>
          <h3 class="card-title">${recipe.name}</h3>
          <p class="card-desc">${recipe.summary}</p>
        </div>
        <div class="card-footer-meta">
          <span>${recipe.calories}</span>
          <span>${recipe.ingredients.length} Ingredients</span>
        </div>
      `;

      card.addEventListener("click", () => this.showRecipeDetail(recipe));
      grid.appendChild(card);
    });
  },

  renderPantryIngredients(ingredients) {
    const container = document.getElementById("pantryIngredientsList");
    if (!container) return;
    container.innerHTML = "";

    const savedPantry = JSON.parse(localStorage.getItem("codex_camael_pantry") || "[]");

    ingredients.forEach(ing => {
      const isChecked = savedPantry.includes(ing);
      const label = document.createElement("label");
      label.className = `ingredient-check-label ${isChecked ? 'selected' : ''}`;
      label.innerHTML = `
        <input type="checkbox" value="${ing}" ${isChecked ? 'checked' : ''}>
        <span>${ing}</span>
      `;

      label.querySelector("input").addEventListener("change", (e) => {
        label.classList.toggle("selected", e.target.checked);
        this.savePantry();
        this.matchPantryRecipes();
      });

      container.appendChild(label);
    });
  },

  savePantry() {
    const selected = [];
    document.querySelectorAll("#pantryIngredientsList input:checked").forEach(input => {
      selected.push(input.value);
    });
    localStorage.setItem("codex_camael_pantry", JSON.stringify(selected));
  },

  matchPantryRecipes() {
    const selected = JSON.parse(localStorage.getItem("codex_camael_pantry") || "[]");
    const countBanner = document.getElementById("pantryMatchNotice");

    if (selected.length === 0) {
      if (countBanner) countBanner.style.display = "none";
      this.renderRecipes(window.CAMAEL_RECIPES);
      return;
    }

    const matched = [];
    window.CAMAEL_RECIPES.forEach(r => {
      const hasAll = r.ingredients.every(i => selected.includes(i));
      const hasSome = r.ingredients.some(i => selected.includes(i));
      if (hasAll || hasSome) {
        matched.push({
          ...r,
          matchStatus: hasAll ? "100% MATCH" : "PARTIAL"
        });
      }
    });

    if (countBanner) {
      countBanner.style.display = "block";
      countBanner.textContent = `Pantry Filter: Found ${matched.length} recipes matching your selected ingredients.`;
    }

    this.renderRecipes(matched.length > 0 ? matched : window.CAMAEL_RECIPES);
  },

  filterRecipes(key) {
    let recipes = window.CAMAEL_RECIPES;
    if (key === "lifesavers") recipes = recipes.filter(r => r.category === "lifesavers");
    else if (key === "cooking") recipes = recipes.filter(r => r.category === "cooking");
    this.renderRecipes(recipes);
  },

  showRecipeDetail(recipe) {
    const stepsHtml = (recipe.instructions || []).map((step, idx) => `
      <div class="step-tile">
        <span class="step-number-badge">0${idx + 1}</span>
        <div><p style="font-size: 13px; color: var(--text-primary); line-height: 1.5;">${step}</p></div>
      </div>
    `).join("");

    const recipeWithChapter = { ...recipe, _chapter: "RECIPES" };
    this.openModal({
      title: recipe.name,
      content: `
        <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; align-items: center;">
          <span class="entry-tag-pill ${recipe.category === 'lifesavers' ? 'tag-tier-s' : 'tag-tier'}">${recipe.prepTime}</span>
          <span class="entry-tag-pill tag-tier">${recipe.calories}</span>
          <span class="entry-tag-pill tag-tier">${recipe.smokeRisk}</span>
          <button class="keycap-tile key-dark" id="bmkBtn_${recipe.id}" style="min-height: 30px; padding: 3px 10px; font-size: 11px; margin-left: auto;"
            onclick="CAMAEL.toggleBookmark(${JSON.stringify(recipeWithChapter).replace(/"/g, '&quot;')}); document.getElementById('bmkBtn_${recipe.id}').textContent = CAMAEL.isBookmarked('${recipe.id}') ? '★ BOOKMARKED' : '☆ BOOKMARK';">
            ${this.isBookmarked(recipe.id) ? '★ BOOKMARKED' : '☆ BOOKMARK'}
          </button>
        </div>
        <div style="margin-bottom: 16px;">
          <h4 style="font-size: 12px; font-weight: 700; font-family: var(--font-mono); color: var(--tile-cream-bg); margin-bottom: 6px;">REQUIRED INGREDIENTS</h4>
          <ul style="padding-left: 20px; font-size: 13px; line-height: 1.6;">
            ${recipe.ingredients.map(i => `<li><strong>${i}</strong></li>`).join('')}
          </ul>
        </div>
        <div style="margin-bottom: 16px;">
          <h4 style="font-size: 12px; font-weight: 700; font-family: var(--font-mono); color: var(--tile-cream-bg); margin-bottom: 6px;">PREPARATION PROTOCOL</h4>
          <div class="step-tiles-list">
            ${stepsHtml}
          </div>
        </div>
        <div class="warning-panel-box" style="border-left-color: var(--tile-teal-bg); background: rgba(34,184,184,0.08);">
          <div class="warning-panel-title" style="color: var(--tile-teal-bg);">SURVIVAL NUTRITION NOTES</div>
          <p style="font-size: 12px; color: #fff; line-height: 1.5;">${recipe.survivalNotes}</p>
        </div>
        <p style="margin-top: 10px; color: var(--text-secondary); font-size: 11px;">Shelf Life: ${recipe.shelfLife}</p>
      `
    });
  },

  // ------------------------------------------------------------------------
  // Module 4: Crisis Playbooks & Emergency Response
  // ------------------------------------------------------------------------
  renderCrisis(scenarios = window.CAMAEL_CRISIS) {
    const grid = document.getElementById("crisisGrid");
    if (!grid) return;
    grid.innerHTML = "";

    scenarios.forEach(item => {
      const card = document.createElement("div");
      card.className = "grid-card";

      card.innerHTML = `
        <div class="card-top">
          <div class="card-lead-symbol">${item.icon}</div>
          <span class="entry-tag-pill tag-deadly">${item.urgency.split(' ')[0]}</span>
        </div>
        <div>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-desc">${item.summary}</p>
        </div>
        <div class="card-footer-meta">
          <span>${item.category.toUpperCase()}</span>
          <span style="color: var(--tile-orange-bg); font-weight: 700;">VIEW 60s ACTION &rarr;</span>
        </div>
      `;

      card.addEventListener("click", () => this.showCrisisDetail(item));
      grid.appendChild(card);
    });
  },

  filterCrisis(key) {
    let list = window.CAMAEL_CRISIS;
    if (key === "medical") list = list.filter(c => c.category === "medical");
    else if (key === "disaster") list = list.filter(c => c.category === "disaster");
    else if (key === "weather") list = list.filter(c => c.category === "weather");
    this.renderCrisis(list);
  },

  showCrisisDetail(item) {
    const crisisWithChapter = { ...item, _chapter: "CRISIS PLAYBOOKS" };
    this.openModal({
      title: item.title,
      content: `
        <div style="display: flex; gap: 8px; margin-bottom: 12px; align-items: center; flex-wrap: wrap;">
          <span class="entry-tag-pill tag-deadly">${item.urgency.split(' ')[0]}</span>
          <span class="entry-tag-pill tag-tier">${item.category.toUpperCase()}</span>
          <button class="keycap-tile key-dark" id="bmkBtn_${item.id}" style="min-height: 30px; padding: 3px 10px; font-size: 11px; margin-left: auto;"
            onclick="CAMAEL.toggleBookmark(${JSON.stringify(crisisWithChapter).replace(/"/g, '&quot;')}); document.getElementById('bmkBtn_${item.id}').textContent = CAMAEL.isBookmarked('${item.id}') ? '★ BOOKMARKED' : '☆ BOOKMARK';">
            ${this.isBookmarked(item.id) ? '★ BOOKMARKED' : '☆ BOOKMARK'}
          </button>
        </div>

        <div class="warning-panel-box">
          <div class="warning-panel-title">URGENCY TIMEFRAME: ${item.urgency}</div>
          <p style="font-size: 13px; line-height: 1.5;">${item.summary}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; font-family: var(--font-mono); color: var(--tile-orange-bg); margin-bottom: 8px;">
            FIRST 60 SECONDS (IMMEDIATE ACTION)
          </h4>
          <div class="step-tiles-list">
            ${item.first60s.map((s, idx) => `
              <div class="step-tile">
                <span class="step-number-badge" style="background: var(--tile-orange-bg); color: var(--tile-orange-ink);">0${idx + 1}</span>
                <div><p style="font-size: 13px; font-weight: 600; line-height: 1.5;">${s}</p></div>
              </div>
            `).join('')}
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; font-family: var(--font-mono); color: var(--tile-cream-bg); margin-bottom: 8px;">
            NEXT 1 HOUR ACTION PLAN
          </h4>
          <div class="step-tiles-list">
            ${item.nextHour.map((s, idx) => `
              <div class="step-tile">
                <span class="step-number-badge">0${idx + 1}</span>
                <div><p style="font-size: 13px; line-height: 1.5;">${s}</p></div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="console-panel" style="padding: 14px 18px;">
          <span class="console-panel-label" style="font-size: 10px;">EXTENDED 24-HOUR PROTOCOL</span>
          <p style="font-size: 12px; color: var(--text-primary); line-height: 1.6;">${item.extendedRules}</p>
        </div>
      `
    });
  },

  // ------------------------------------------------------------------------
  // Module 5: Field Manual & Visual Diagrams
  // ------------------------------------------------------------------------
  renderManual(guides = window.CAMAEL_MANUAL) {
    const grid = document.getElementById("manualGrid");
    if (!grid) return;
    grid.innerHTML = "";

    guides.forEach(guide => {
      const card = document.createElement("div");
      card.className = "grid-card";

      card.innerHTML = `
        <div class="card-top">
          <div class="card-lead-symbol" style="font-size: 20px;">🛠️ GUIDE</div>
          <span class="entry-tag-pill tag-tier">${guide.category.toUpperCase()}</span>
        </div>
        <div>
          <h3 class="card-title">${guide.title}</h3>
          <p class="card-desc">${guide.summary}</p>
          <div class="diagram-card">
            ${guide.svgDiagram}
            <div class="diagram-caption">Inline Visual Reference</div>
          </div>
        </div>
        <div class="card-footer-meta">
          <span>${guide.steps.length} Core Steps</span>
          <span style="color: var(--tile-cream-bg); font-weight: 700;">EXPAND MANUAL &rarr;</span>
        </div>
      `;

      card.addEventListener("click", () => this.showManualDetail(guide));
      grid.appendChild(card);
    });
  },

  filterManual(key) {
    let list = window.CAMAEL_MANUAL;
    if (key === "navigation") list = list.filter(m => m.category === "navigation");
    else if (key === "water") list = list.filter(m => m.category === "water");
    else if (key === "fire") list = list.filter(m => m.category === "fire");
    else if (key === "cordage") list = list.filter(m => m.category === "cordage");
    this.renderManual(list);
  },

  showManualDetail(guide) {
    this.openModal({
      title: guide.title,
      content: `
        <div class="diagram-card" style="margin-bottom: 20px;">
          ${guide.svgDiagram}
        </div>
        <div style="margin-bottom: 20px;">
          <h4 style="font-size: 13px; font-weight: 700; font-family: var(--font-mono); color: var(--tile-cream-bg); margin-bottom: 8px;">
            STEP-BY-STEP FIELD EXECUTION
          </h4>
          <div class="step-tiles-list">
            ${guide.steps.map((step, idx) => `
              <div class="step-tile">
                <span class="step-number-badge">0${idx + 1}</span>
                <div><p style="font-size: 13px; line-height: 1.5;">${step}</p></div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="warning-panel-box" style="border-left-color: var(--tile-teal-bg); background: rgba(34,184,184,0.08);">
          <div class="warning-panel-title" style="color: var(--tile-teal-bg);">TACTICAL FIELD TIP</div>
          <p style="font-size: 12px; color: #fff; line-height: 1.5;">${guide.proTip}</p>
        </div>
      `
    });
  },

  // ------------------------------------------------------------------------
  // Module 6: Emergency Radio & Morse Transceiver
  // ------------------------------------------------------------------------
  renderRadio() {
    const freqList = document.getElementById("radioFreqList");
    if (!freqList) return;
    freqList.innerHTML = "";

    window.CAMAEL_RADIO.frequencies.forEach(f => {
      const item = document.createElement("div");
      item.className = "grid-card";
      item.style.minHeight = "auto";
      item.innerHTML = `
        <div class="card-top" style="margin-bottom: 8px;">
          <strong style="font-size: 15px;">${f.channel}</strong>
          <span class="entry-tag-pill tag-tier-s">${f.freq}</span>
        </div>
        <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">${f.purpose}</p>
        <div style="font-size: 11px; color: var(--text-muted);">
          <span>Service: ${f.service} | Range: ${f.range}</span>
        </div>
      `;
      freqList.appendChild(item);
    });

    const natoGrid = document.getElementById("natoAlphabetGrid");
    if (natoGrid && window.CAMAEL_RADIO.natoAlphabet) {
      natoGrid.innerHTML = "";
      Object.entries(window.CAMAEL_RADIO.natoAlphabet).forEach(([letter, word]) => {
        const span = document.createElement("div");
        span.style.padding = "6px 10px";
        span.style.border = "1px solid var(--border-color)";
        span.style.fontSize = "11px";
        span.innerHTML = `<strong>${letter}</strong>: ${word}`;
        natoGrid.appendChild(span);
      });
    }

    const morseInput = document.getElementById("morseTextInput");
    const morseDisplay = document.getElementById("morseOutputDisplay");

    if (morseInput && morseDisplay) {
      morseInput.addEventListener("input", (e) => {
        const text = e.target.value.toUpperCase();
        let encoded = "";
        for (let char of text) {
          if (window.CAMAEL_RADIO.morseCode[char]) {
            encoded += window.CAMAEL_RADIO.morseCode[char] + " ";
          }
        }
        morseDisplay.textContent = encoded || "... --- ...";
      });
    }
  },

  // ------------------------------------------------------------------------
  // Interactive Tools: CPR Metronome, 7-10 Calculator, Morse Audio
  // ------------------------------------------------------------------------
  initTools() {
    // 1. CPR Metronome (110 BPM)
    const cprBtn = document.getElementById("cprStartBtn");
    const cprPulse = document.getElementById("cprPulseBox");

    if (cprBtn && cprPulse) {
      cprBtn.addEventListener("click", () => {
        if (this.cprActive) {
          clearInterval(this.cprInterval);
          this.cprActive = false;
          cprBtn.textContent = "START CPR METRONOME (110 BPM)";
          cprBtn.className = "keycap-tile key-teal";
          cprPulse.classList.remove("beat");
        } else {
          this.cprActive = true;
          cprBtn.textContent = "STOP CPR METRONOME";
          cprBtn.className = "keycap-tile key-orange";

          const intervalMs = (60 / 110) * 1000;
          this.playBeep(880, 0.08);
          cprPulse.classList.add("beat");
          setTimeout(() => cprPulse.classList.remove("beat"), 100);

          this.cprInterval = setInterval(() => {
            this.playBeep(880, 0.08);
            cprPulse.classList.add("beat");
            setTimeout(() => cprPulse.classList.remove("beat"), 100);
          }, intervalMs);
        }
      });
    }

    // 2. 7-10 Nuclear Fallout Decay Calculator
    const sliderTime = document.getElementById("falloutHoursSlider");
    const timeDisplay = document.getElementById("falloutHoursDisplay");
    const resultBox = document.getElementById("falloutResultBox");

    if (sliderTime && resultBox) {
      const updateFallout = () => {
        const hours = Math.max(1, parseFloat(sliderTime.value));
        timeDisplay.textContent = `${hours} Hours`;

        const decayFactor = Math.pow(hours, -1.2);
        const remainingPct = (decayFactor * 100).toFixed(2);
        const reductionPct = (100 - remainingPct).toFixed(2);

        let safetyMsg = "SURVIVAL EVACUATION DANGEROUS (Remain sealed inside bunker)";
        let color = "#ff4a1c";

        if (hours >= 48 && hours < 336) {
          safetyMsg = "BRIEF EMERGENCY FORAGING PERMITTED (Limit exposure to < 30 mins)";
          color = "#ffaa00";
        } else if (hours >= 336) {
          safetyMsg = "RELATIVE OUTDOOR EGRESS ALLOWED (Wear mask & wash upon re-entry)";
          color = "#22b8b8";
        }

        resultBox.innerHTML = `
          <div><strong>DOSE RATE RELATIVE TO 1-HR RATE (R0):</strong> ${remainingPct}% of R0 remaining (${reductionPct}% reduction from 1-hr baseline)</div>
          <div style="margin-top: 6px; color: ${color};"><strong>STATUS:</strong> ${safetyMsg}</div>
        `;
      };

      sliderTime.addEventListener("input", updateFallout);
      updateFallout();
    }

    // 3. Morse Sound & Flash Player
    const playMorseBtn = document.getElementById("playMorseAudioBtn");
    const emergencySosBtn = document.getElementById("emergencySosBtn");

    if (playMorseBtn) {
      playMorseBtn.addEventListener("click", () => {
        const morseDisplay = document.getElementById("morseOutputDisplay");
        const code = morseDisplay.textContent || "... --- ...";
        this.playMorseSequence(code);
      });
    }

    if (emergencySosBtn) {
      emergencySosBtn.addEventListener("click", () => {
        this.playMorseSequence("... --- ...");
      });
    }
  },

  playBeep(freq, duration) {
    try {
      const ctx = this.getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch(e) {
      console.warn("Audio playback blocked:", e);
    }
  },

  playMorseSequence(morseStr) {
    const ditMs = 100;
    const dahMs = 300;
    const strobe = document.getElementById("morseStrobeScreen");

    let delay = 0;
    for (let char of morseStr) {
      if (char === ".") {
        setTimeout(() => {
          this.playBeep(750, ditMs / 1000);
          if (strobe) {
            strobe.style.display = "block";
            setTimeout(() => strobe.style.display = "none", ditMs);
          }
        }, delay);
        delay += ditMs + 100;
      } else if (char === "-") {
        setTimeout(() => {
          this.playBeep(750, dahMs / 1000);
          if (strobe) {
            strobe.style.display = "block";
            setTimeout(() => strobe.style.display = "none", dahMs);
          }
        }, delay);
        delay += dahMs + 100;
      } else if (char === " ") {
        delay += 200;
      }
    }
  },

  // ------------------------------------------------------------------------
  // Module 7: World Map & Cartography
  // ------------------------------------------------------------------------
  initWorldMap() {
    const canvas = document.getElementById("worldMapCanvas");
    if (!canvas) return;

    this.resizeCanvas();
    this.renderWaypointList();
    this.drawMap();

    window.addEventListener("resize", () => {
      if (this.activeSection === "map") {
        this.resizeCanvas();
        this.drawMap();
      }
    });

    const zoomIn = document.getElementById("mapZoomIn");
    const zoomOut = document.getElementById("mapZoomOut");
    const reset = document.getElementById("mapReset");
    const addPin = document.getElementById("addWaypointBtn");

    if (zoomIn) zoomIn.addEventListener("click", () => { this.mapState.scale *= 1.3; this.drawMap(); });
    if (zoomOut) zoomOut.addEventListener("click", () => { this.mapState.scale = Math.max(0.6, this.mapState.scale / 1.3); this.drawMap(); });
    if (reset) reset.addEventListener("click", () => { this.mapState.scale = 1.0; this.mapState.offsetX = 0; this.mapState.offsetY = 0; this.drawMap(); });
    if (addPin) addPin.addEventListener("click", () => this.promptAddWaypoint());

    canvas.addEventListener("mousedown", (e) => {
      this.mapState.isDragging = true;
      this.mapState.startX = e.clientX - this.mapState.offsetX;
      this.mapState.startY = e.clientY - this.mapState.offsetY;
    });

    window.addEventListener("mouseup", () => { this.mapState.isDragging = false; });

    canvas.addEventListener("mousemove", (e) => {
      if (this.mapState.isDragging) {
        this.mapState.offsetX = e.clientX - this.mapState.startX;
        this.mapState.offsetY = e.clientY - this.mapState.startY;
        this.drawMap();
      }

      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const w = canvas.width;
      const h = canvas.height;
      const midX = w / 2;
      const midY = h / 2;

      const normX = (mouseX - midX - this.mapState.offsetX) / (this.mapState.scale * (w / 2));
      const normY = (mouseY - midY - this.mapState.offsetY) / (this.mapState.scale * (h / 2));

      const lon = normX * 180;
      const lat = -normY * 90;

      const coordEl = document.getElementById("mapHudCoords");
      if (coordEl && Math.abs(lon) <= 180 && Math.abs(lat) <= 90) {
        coordEl.textContent = `LAT: ${lat.toFixed(2)}° | LON: ${lon.toFixed(2)}°`;
      }
    });

    canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.15 : 0.85;
      this.mapState.scale = Math.max(0.6, Math.min(10.0, this.mapState.scale * zoomFactor));
      this.drawMap();
    }, { passive: false });
  },

  resizeCanvas() {
    const canvas = document.getElementById("worldMapCanvas");
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth || 800;
      canvas.height = parent.clientHeight || 550;
    }
  },

  drawMap() {
    const canvas = document.getElementById("worldMapCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0c0c0b";
    ctx.fillRect(0, 0, w, h);

    const project = (lon, lat) => {
      const midX = w / 2;
      const midY = h / 2;
      const x = midX + this.mapState.offsetX + (lon / 180) * (w / 2) * this.mapState.scale;
      const y = midY + this.mapState.offsetY - (lat / 90) * (h / 2) * this.mapState.scale;
      return [x, y];
    };

    // Draw Graticule
    ctx.strokeStyle = "rgba(216, 209, 166, 0.12)";
    ctx.lineWidth = 0.5;
    for (let lon = -180; lon <= 180; lon += 30) {
      const [x1, y1] = project(lon, -90);
      const [x2, y2] = project(lon, 90);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }
    for (let lat = -90; lat <= 90; lat += 30) {
      const [x1, y1] = project(-180, lat);
      const [x2, y2] = project(180, lat);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    if (!window.CAMAEL_GEO || !window.CAMAEL_GEO.continents) return;

    ctx.fillStyle = "#1b1914";
    ctx.strokeStyle = "rgba(216, 209, 166, 0.4)";
    ctx.lineWidth = 1.2;

    window.CAMAEL_GEO.continents.forEach(cont => {
      ctx.beginPath();
      cont.polygon.forEach((pt, idx) => {
        const [px, py] = project(pt[0], pt[1]);
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      if (cont.labelPos) {
        const [lx, ly] = project(cont.labelPos[0], cont.labelPos[1]);
        if (lx >= 0 && lx <= w && ly >= 0 && ly <= h) {
          ctx.fillStyle = "rgba(216, 209, 166, 0.5)";
          ctx.font = "bold 10px " + (getComputedStyle(document.body).fontFamily || 'monospace');
          ctx.fillText(cont.name.toUpperCase(), lx, ly);
        }
      }
    });

    // Draw Waypoints
    this.waypoints.forEach(wp => {
      const [wx, wy] = project(wp.lon, wp.lat);
      const pinColor = wp.type === "water" ? "#22b8b8" :
                       wp.type === "shelter" ? "#30d158" :
                       wp.type === "danger" ? "#ff4a1c" : "#d8d1a6";

      ctx.beginPath();
      ctx.arc(wx, wy, 6, 0, Math.PI * 2);
      ctx.fillStyle = pinColor;
      ctx.fill();
      ctx.strokeStyle = "#14120d";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.font = "bold 10px monospace";
      const textWidth = ctx.measureText(wp.name).width;
      ctx.fillStyle = "rgba(12, 12, 11, 0.85)";
      ctx.fillRect(wx + 10, wy - 9, textWidth + 8, 16);
      ctx.strokeStyle = "rgba(216, 209, 166, 0.3)";
      ctx.lineWidth = 0.5;
      ctx.strokeRect(wx + 10, wy - 9, textWidth + 8, 16);

      ctx.fillStyle = "#e9e4c8";
      ctx.fillText(wp.name, wx + 14, wy + 3);
    });
  },

  renderWaypointList() {
    const list = document.getElementById("waypointListContainer");
    if (!list) return;
    list.innerHTML = "";

    this.waypoints.forEach(wp => {
      const item = document.createElement("div");
      item.className = "waypoint-item";
      item.innerHTML = `
        <div class="waypoint-item-top">
          <span class="waypoint-title">${wp.name}</span>
          <span class="entry-tag-pill tag-tier" style="font-size: 9px;">${wp.type.toUpperCase()}</span>
        </div>
        <div class="waypoint-coords">${wp.lat.toFixed(2)}° N, ${wp.lon.toFixed(2)}° E</div>
        <p style="font-size: 11px; color: var(--text-secondary); margin-top: 4px;">${wp.desc}</p>
      `;

      item.addEventListener("click", () => {
        const canvas = document.getElementById("worldMapCanvas");
        if (!canvas) return;
        if (canvas.width <= 0 || canvas.height <= 0) this.resizeCanvas();
        const w = canvas.width || 800;
        const h = canvas.height || 550;
        this.mapState.offsetX = -(wp.lon / 360) * w * this.mapState.scale;
        this.mapState.offsetY = (wp.lat / 180) * h * this.mapState.scale;
        this.drawMap();
      });

      list.appendChild(item);
    });
  },

  promptAddWaypoint() {
    const name = prompt("Enter Waypoint Name (e.g. Pine River Spring):");
    if (!name) return;
    const lat = parseFloat(prompt("Enter Latitude (-90 to 90):", "35.00"));
    const lon = parseFloat(prompt("Enter Longitude (-180 to 180):", "-80.00"));
    const type = prompt("Type (water, shelter, cache, danger):", "water");
    const desc = prompt("Short Description:", "Clean water source");

    if (!isNaN(lat) && !isNaN(lon)) {
      this.waypoints.push({
        id: "wp_" + Date.now(),
        name,
        lat,
        lon,
        type: type || "cache",
        desc: desc || "",
        notes: "User dropped coordinate."
      });
      localStorage.setItem("codex_camael_waypoints", JSON.stringify(this.waypoints));
      this.renderWaypointList();
      this.drawMap();
    }
  },

  // ------------------------------------------------------------------------
  // Module 8: Private Offline Vault & Logbook
  // ------------------------------------------------------------------------
  initLogbook() {
    const fields = ["iceName", "iceBlood", "iceAllergies", "rallyPrimary", "rallySecondary", "radioSchedule", "packInventory", "survivalJournal"];
    
    fields.forEach(f => {
      const el = document.getElementById(f);
      if (el) {
        el.value = localStorage.getItem(`codex_camael_${f}`) || "";
        el.addEventListener("input", (e) => {
          localStorage.setItem(`codex_camael_${f}`, e.target.value);
        });
      }
    });

    const exportBtn = document.getElementById("exportLogbookBtn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const data = {};
        fields.forEach(f => {
          data[f] = localStorage.getItem(`codex_camael_${f}`) || "";
        });
        data.waypoints = JSON.parse(localStorage.getItem("codex_camael_waypoints") || "[]");
        data.pantry = JSON.parse(localStorage.getItem("codex_camael_pantry") || "[]");

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `codex_camael_emergency_backup_${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    const importInput = document.getElementById("importLogbookInput");
    if (importInput) {
      importInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const data = JSON.parse(evt.target.result);
            fields.forEach(f => {
              const val = data[f] !== undefined ? data[f] : data[`codex_camael_${f}`];
              if (val !== undefined) {
                localStorage.setItem(`codex_camael_${f}`, val);
                const el = document.getElementById(f);
                if (el) el.value = val;
              }
            });
            const importedWaypoints = data.waypoints || data.codex_camael_waypoints;
            if (importedWaypoints) {
              localStorage.setItem("codex_camael_waypoints", JSON.stringify(importedWaypoints));
              this.waypoints = importedWaypoints;
              this.renderWaypointList();
              this.drawMap();
            }
            const importedPantry = data.pantry || data.codex_camael_pantry;
            if (importedPantry) {
              localStorage.setItem("codex_camael_pantry", JSON.stringify(importedPantry));
              this.renderRecipes();
            }
            alert("CODEX CAMAEL: Emergency Vault restored successfully.");
          } catch(err) {
            alert("Error parsing backup file.");
          }
        };
        reader.readAsText(file);
      });
    }
  },

  // ------------------------------------------------------------------------
  // Modal Drawer
  // ------------------------------------------------------------------------
  initModal() {
    const overlay = document.getElementById("modalOverlay");
    const closeBtn = document.getElementById("modalCloseBtn");
    if (overlay && closeBtn) {
      closeBtn.addEventListener("click", () => this.closeModal());
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) this.closeModal();
      });
    }
  },

  openModal({ title, content }) {
    const overlay = document.getElementById("modalOverlay");
    const titleEl = document.getElementById("modalTitle");
    const bodyEl = document.getElementById("modalBody");

    if (overlay && titleEl && bodyEl) {
      titleEl.textContent = title;
      bodyEl.innerHTML = content;
      overlay.classList.add("active");
    }
  },

  closeModal() {
    const overlay = document.getElementById("modalOverlay");
    if (overlay) overlay.classList.remove("active");
  }
};

// Global cross-navigation helper for IA risk mitigation and solution routing
window.navigateToSolution = function(section, targetId) {
  CAMAEL.closeModal();
  CAMAEL.switchSection(section);

  if (targetId) {
    setTimeout(() => {
      if (section === "recipes" && window.CAMAEL_RECIPES) {
        const item = window.CAMAEL_RECIPES.find(r => r.id === targetId);
        if (item) CAMAEL.showRecipeDetail(item);
      } else if (section === "incaseof" && window.CAMAEL_CRISIS) {
        const item = window.CAMAEL_CRISIS.find(c => c.id === targetId);
        if (item) CAMAEL.showCrisisDetail(item);
      } else if (section === "manual" && window.CAMAEL_MANUAL) {
        const item = window.CAMAEL_MANUAL.find(m => m.id === targetId);
        if (item) CAMAEL.showManualDetail(item);
      } else if (section === "compendium" && window.CAMAEL_ITEMS) {
        const item = window.CAMAEL_ITEMS.find(i => i.id === targetId);
        if (item) CAMAEL.showItemDetail(item);
      }
    }, 150);
  }
};
