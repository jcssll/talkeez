/* ─────────────────────────────────────────────────────────────
   Talkeez Sensory Clock — engine + renderers.
   Time source of truth: target end timestamp minus now.
   Preferences persist in localStorage.
   ───────────────────────────────────────────────────────────── */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const STORE_KEY = "talkeez-sensory-clock-v1";
  const ACTIVITIES = [
    "Quiet Break", "Sensory Break", "Homework", "Reading", "Clean Up",
    "Transition Time", "Brush Teeth", "Get Ready", "Bedtime", "Screen Time",
    "Calm Down", "Free Play", "Lunch", "Therapy Activity",
  ];
  const TIME_PRESETS = [1, 2, 5, 10, 15, 20, 30, 45, 60];
  const CLOCKS = [
    { id: "orb", label: "Liquid Orb", glyph: "◉" },
    { id: "ring", label: "Breathing Ring", glyph: "◍" },
    { id: "sunset", label: "Sunset", glyph: "☀" },
    { id: "sand", label: "Falling Sand", glyph: "⋮" },
    { id: "drain", label: "Color Drain", glyph: "◒" },
  ];
  const THEMES = [
    { id: "ocean", label: "Ocean", sw: ["#DCECF1", "#2E7FA8"] },
    { id: "lavender", label: "Lavender", sw: ["#F1EDF7", "#8C7CAF"] },
    { id: "meadow", label: "Meadow", sw: ["#E2EFE4", "#5B8B69"] },
    { id: "sunset", label: "Sunset", sw: ["#F3E6F0", "#D98A6C"] },
    { id: "night", label: "Night", sw: ["#0F1B3D", "#3B5BA9"] },
    { id: "cloud", label: "Cloud", sw: ["#F2F4F6", "#9AB0C4"] },
    { id: "peach", label: "Peach", sw: ["#FBF1E8", "#D9A077"] },
    { id: "aurora", label: "Aurora", sw: ["#14213D", "#4FB3A9"] },
  ];
  const RING_C = 2 * Math.PI * 150;
  const MIN_MS = 10000; // 10 seconds
  const MAX_MS = 180 * 60000;

  const mediaReduced = matchMedia("(prefers-reduced-motion: reduce)");

  const state = {
    durationMs: 5 * 60000,
    remainingMs: 5 * 60000,
    endAt: 0,
    running: false,
    done: false,
    activity: "Quiet Break",
    theme: "ocean",
    clock: "orb",
    sound: "none",
    reducedMotion: mediaReduced.matches,
    showCountdown: true,
    showActivity: true,
    focusMode: false,
    halfAnnounced: false,
    minuteAnnounced: false,
  };

  /* ---------- persistence ---------- */
  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({
        activity: state.activity, theme: state.theme, clock: state.clock,
        sound: state.sound, reducedMotion: state.reducedMotion,
        showCountdown: state.showCountdown, showActivity: state.showActivity,
        focusMode: state.focusMode, durationMs: state.durationMs,
      }));
    } catch { /* storage unavailable — preferences just won't persist */ }
  }
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const p = JSON.parse(raw);
      if (typeof p.activity === "string" && p.activity.trim()) state.activity = p.activity.slice(0, 60);
      if (THEMES.some(t => t.id === p.theme)) state.theme = p.theme;
      if (CLOCKS.some(c => c.id === p.clock)) state.clock = p.clock;
      if (["none", "chime", "bell", "nature"].includes(p.sound)) state.sound = p.sound;
      if (typeof p.reducedMotion === "boolean") state.reducedMotion = p.reducedMotion;
      if (typeof p.showCountdown === "boolean") state.showCountdown = p.showCountdown;
      if (typeof p.showActivity === "boolean") state.showActivity = p.showActivity;
      if (typeof p.focusMode === "boolean") state.focusMode = p.focusMode;
      if (Number.isFinite(p.durationMs) && p.durationMs >= MIN_MS && p.durationMs <= MAX_MS) {
        state.durationMs = p.durationMs;
        state.remainingMs = p.durationMs;
      }
    } catch { /* corrupted storage — start fresh */ }
  }

  /* ---------- elements ---------- */
  const body = document.body;
  const el = {
    stage: $("#st-stage"),
    activityLabel: $("#st-activity-label"),
    activityInput: $("#st-activity-input"),
    state: $("#st-state"),
    start: $("#st-start"),
    reset: $("#st-reset"),
    presets: $("#st-presets"),
    sensoryBtn: $("#st-sensory-btn"),
    displayBtn: $("#st-display-btn"),
    settingsOpen: $("#st-settings-open"),
    settingsClose: $("#st-settings-close"),
    drawerWrap: $("#st-drawer-wrap"),
    drawer: $("#st-drawer"),
    backdrop: $("#st-drawer-backdrop"),
    timeGrid: $("#st-time-grid"),
    customMinutes: $("#st-custom-minutes"),
    durationError: $("#st-duration-error"),
    clockGrid: $("#st-clock-grid"),
    themeGrid: $("#st-theme-grid"),
    soundList: $("#st-sound-list"),
    reducedMotion: $("#st-reduced-motion"),
    showCountdown: $("#st-show-countdown"),
    showActivity: $("#st-show-activity"),
    focusMode: $("#st-focus-mode"),
    exitMode: $("#st-exit-mode"),
    complete: $("#st-complete"),
    restart: $("#st-restart"),
    choose: $("#st-choose"),
    live: $("#st-live"),
    orbLiquid: $("#st-orb-liquid"),
    ringProg: $("#st-ring-prog"),
    sun: $("#st-sun"),
    skyDim: $("#st-sky-dim"),
    sand: $("#st-sand"),
    drainFill: $("#st-drain-fill"),
  };
  const timeOutputs = $$("[data-time]");
  const activityOutputs = $$("[data-activity]");

  /* ---------- helpers ---------- */
  function fmt(ms) {
    const total = Math.max(0, Math.ceil(ms / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  function announce(msg) { el.live.textContent = msg; }
  function progress() {
    return state.durationMs > 0 ? Math.min(1, Math.max(0, state.remainingMs / state.durationMs)) : 0;
  }

  /* ---------- sound (synthesized, never before interaction) ---------- */
  let actx = null;
  function ensureAudio() {
    if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === "suspended") actx.resume().catch(() => {});
  }
  function tone(freq, type, attack, decay, peak, delay = 0) {
    const t0 = actx.currentTime + delay;
    const osc = actx.createOscillator();
    const gain = actx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(peak, t0 + attack);
    gain.gain.exponentialRampToValueAtTime(0.0008, t0 + attack + decay);
    osc.connect(gain).connect(actx.destination);
    osc.start(t0);
    osc.stop(t0 + attack + decay + 0.1);
  }
  function playEndSound() {
    if (state.sound === "none") return;
    try {
      ensureAudio();
      if (state.sound === "chime") {
        tone(523.25, "sine", 0.04, 1.6, 0.10);
        tone(783.99, "sine", 0.04, 1.9, 0.06, 0.28);
      } else if (state.sound === "bell") {
        tone(392.0, "triangle", 0.02, 2.2, 0.09);
        tone(587.33, "sine", 0.02, 2.4, 0.05, 0.05);
      } else if (state.sound === "nature") {
        tone(329.63, "sine", 0.4, 2.8, 0.08);
        tone(440.0, "sine", 0.5, 2.6, 0.04, 0.5);
      }
    } catch { /* audio unavailable — visual completion still shows */ }
  }

  /* ---------- falling sand renderer ---------- */
  const sand = { ctx: el.sand.getContext("2d"), parts: [], w: 0, h: 0, dpr: 1 };
  const SAND_N = 110;
  function sandResize() {
    const rect = el.sand.getBoundingClientRect();
    sand.dpr = Math.min(2, window.devicePixelRatio || 1);
    sand.w = rect.width; sand.h = rect.height;
    el.sand.width = Math.round(rect.width * sand.dpr);
    el.sand.height = Math.round(rect.height * sand.dpr);
    sand.ctx.setTransform(sand.dpr, 0, 0, sand.dpr, 0, 0);
  }
  function sandInit() {
    sandResize();
    sand.parts = Array.from({ length: SAND_N }, (_, i) => ({
      x: (i % 11) / 11 + 0.045 + Math.random() * 0.03,
      rank: i / SAND_N,
      sway: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.6,
      size: 2 + Math.random() * 2.2,
      y: null,
    }));
  }
  function sandRender(p, t, still) {
    const { ctx, w, h, parts } = sand;
    if (!w) return;
    ctx.clearRect(0, 0, w, h);
    const accent = getComputedStyle(body).getPropertyValue("--t-accent").trim() || "#2E7FA8";
    const gone = 1 - p;
    ctx.fillStyle = accent;
    for (const part of parts) {
      const settled = part.rank < gone;
      let targetY;
      if (settled) {
        targetY = h * 0.94 - part.rank * h * 0.30; // pile grows upward
      } else {
        const bob = still ? 0 : Math.sin(t / 2400 * part.speed + part.sway) * 5;
        targetY = h * 0.07 + part.rank * h * 0.26 + bob; // floating upper pool
      }
      if (part.y === null) part.y = targetY;
      part.y += (targetY - part.y) * (still ? 1 : 0.018); // slow, calm flow
      const drift = still ? 0 : Math.sin(t / 3200 * part.speed + part.sway) * 4;
      ctx.globalAlpha = settled ? 0.85 : 0.65;
      ctx.beginPath();
      ctx.arc(part.x * w + drift, part.y, part.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  /* ---------- render ---------- */
  let lastSecond = -1;
  function render(t = 0) {
    const p = progress();
    const whole = Math.ceil(state.remainingMs / 1000);
    const still = state.reducedMotion || mediaReduced.matches;
    if (still && whole === lastSecond && state.running) return; // once per second is enough
    lastSecond = whole;

    const text = fmt(state.remainingMs);
    for (const o of timeOutputs) o.textContent = text;

    el.orbLiquid.style.height = `${p * 100}%`;
    el.ringProg.style.strokeDashoffset = String(RING_C * (1 - p));
    el.sun.style.top = `${12 + (1 - p) * 52}%`;
    el.skyDim.style.opacity = String((1 - p) * 0.55);
    el.drainFill.style.height = `${p * 100}%`;
    if (state.clock === "sand") sandRender(p, t, still);

    if (state.running) document.title = `(${text}) ${state.activity} — Talkeez Sensory Clock`;
  }

  /* ---------- milestones ---------- */
  function checkMilestones() {
    if (!state.halfAnnounced && progress() <= 0.5 && state.remainingMs > 0) {
      state.halfAnnounced = true;
      announce("Halfway there");
    }
    if (!state.minuteAnnounced && state.remainingMs <= 60000 && state.remainingMs > 0 && state.durationMs > 90000) {
      state.minuteAnnounced = true;
      announce("One minute remaining");
    }
  }

  /* ---------- engine ---------- */
  let rafId = 0;
  function loop(t) {
    if (!state.running) { rafId = 0; return; }
    state.remainingMs = Math.max(0, state.endAt - Date.now());
    render(t);
    checkMilestones();
    if (state.remainingMs <= 0) { completeTimer(); return; }
    rafId = requestAnimationFrame(loop);
  }
  function startLoop() {
    if (!rafId) rafId = requestAnimationFrame(loop);
  }
  function start() {
    if (state.done) hideComplete();
    if (state.remainingMs <= 0) state.remainingMs = state.durationMs;
    state.endAt = Date.now() + state.remainingMs;
    state.running = true;
    state.halfAnnounced = false;
    state.minuteAnnounced = false;
    el.start.textContent = "Pause";
    el.start.setAttribute("aria-pressed", "true");
    el.state.textContent = "One moment at a time";
    announce("Timer started");
    startLoop();
  }
  function pause() {
    state.remainingMs = Math.max(0, state.endAt - Date.now());
    state.running = false;
    el.start.textContent = "Resume";
    el.start.setAttribute("aria-pressed", "false");
    el.state.textContent = "Paused";
    document.title = "Talkeez Sensory Clock — Time you can see";
    render();
  }
  function reset() {
    state.running = false;
    state.done = false;
    state.remainingMs = state.durationMs;
    el.start.textContent = "Start";
    el.start.setAttribute("aria-pressed", "false");
    el.state.textContent = "Ready when you are";
    document.title = "Talkeez Sensory Clock — Time you can see";
    hideComplete();
    body.classList.remove("complete");
    render();
  }
  function completeTimer() {
    state.running = false;
    state.done = true;
    state.remainingMs = 0;
    render();
    body.classList.add("complete");
    el.complete.hidden = false;
    el.stage.scrollIntoView({ behavior: "smooth", block: "start" });
    el.start.textContent = "Start";
    el.start.setAttribute("aria-pressed", "false");
    el.state.textContent = "All done";
    document.title = "All done — Talkeez Sensory Clock";
    announce("Timer complete. All done.");
    playEndSound();
  }
  function hideComplete() {
    el.complete.hidden = true;
    body.classList.remove("complete");
  }

  /* ---------- duration / activity ---------- */
  function setDurationMinutes(minutes, fromCustom) {
    if (!Number.isFinite(minutes) || minutes * 60000 < MIN_MS || minutes * 60000 > MAX_MS) {
      el.durationError.textContent = "Choose a duration between 10 seconds and 180 minutes.";
      return false;
    }
    el.durationError.textContent = "";
    state.durationMs = Math.round(minutes * 60000);
    if (!fromCustom) el.customMinutes.value = String(minutes);
    syncTimePresets(minutes);
    reset();
    save();
    return true;
  }
  function setActivity(name, syncInput = true) {
    state.activity = name.trim() || "Quiet Break";
    el.activityLabel.textContent = state.activity;
    for (const o of activityOutputs) o.textContent = state.activity;
    if (syncInput && el.activityInput.value !== state.activity) el.activityInput.value = state.activity;
    syncActivityChips();
    save();
  }

  /* ---------- apply preferences ---------- */
  function applyPrefs() {
    body.dataset.theme = state.theme;
    body.dataset.clock = state.clock;
    body.classList.toggle("reduced", state.reducedMotion);
    body.classList.toggle("hide-countdown", !state.showCountdown);
    body.classList.toggle("hide-activity", !state.showActivity);
    body.classList.toggle("focus-mode", state.focusMode);
    el.reducedMotion.checked = state.reducedMotion;
    el.showCountdown.checked = state.showCountdown;
    el.showActivity.checked = state.showActivity;
    el.focusMode.checked = state.focusMode;
    const soundInput = $(`input[name="st-sound"][value="${state.sound}"]`);
    if (soundInput) soundInput.checked = true;
    syncClockCards();
    syncThemeCards();
    render();
    save();
  }

  /* ---------- build option controls ---------- */
  function syncActivityChips() {
    for (const chip of $$(".st-chip", el.presets)) {
      chip.setAttribute("aria-pressed", String(chip.dataset.activity === state.activity));
    }
  }
  function syncTimePresets(currentMinutes) {
    for (const b of $$(".st-time-btn", el.timeGrid)) {
      b.setAttribute("aria-pressed", String(Number(b.dataset.minutes) === currentMinutes));
    }
  }
  function syncClockCards() {
    for (const c of $$(".st-clock-card", el.clockGrid)) {
      c.setAttribute("aria-pressed", String(c.dataset.clock === state.clock));
    }
  }
  function syncThemeCards() {
    for (const c of $$(".st-theme-card", el.themeGrid)) {
      c.setAttribute("aria-pressed", String(c.dataset.theme === state.theme));
    }
  }

  function buildControls() {
    for (const name of ACTIVITIES) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "st-chip";
      b.dataset.activity = name;
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("data-testid", `preset-activity-${name.toLowerCase().replace(/\s+/g, "-")}`);
      b.textContent = name;
      b.addEventListener("click", () => setActivity(name));
      el.presets.appendChild(b);
    }
    for (const m of TIME_PRESETS) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "st-time-btn";
      b.dataset.minutes = String(m);
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("data-testid", `preset-time-${m}`);
      b.textContent = `${m} min`;
      b.addEventListener("click", () => setDurationMinutes(m, false));
      el.timeGrid.appendChild(b);
    }
    for (const c of CLOCKS) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "st-clock-card";
      b.dataset.clock = c.id;
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("data-testid", `clock-${c.id}`);
      b.innerHTML = `<span class="st-clock-glyph" aria-hidden="true">${c.glyph}</span><span>${c.label}</span>`;
      b.addEventListener("click", () => { state.clock = c.id; applyPrefs(); if (c.id === "sand") sandResize(); });
      el.clockGrid.appendChild(b);
    }
    for (const t of THEMES) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "st-theme-card";
      b.dataset.theme = t.id;
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("data-testid", `theme-${t.id}`);
      b.innerHTML = `<span class="st-theme-swatch" style="background:linear-gradient(135deg, ${t.sw[0]}, ${t.sw[1]})" aria-hidden="true"></span><span>${t.label}</span>`;
      b.addEventListener("click", () => { state.theme = t.id; applyPrefs(); });
      el.themeGrid.appendChild(b);
    }
  }

  /* ---------- drawer ---------- */
  let lastFocused = null;
  let drawerTimer = 0;
  function openDrawer() {
    clearTimeout(drawerTimer);
    lastFocused = document.activeElement;
    el.drawerWrap.hidden = false;
    requestAnimationFrame(() => el.drawerWrap.classList.add("open"));
    el.activityInput.focus();
  }
  function closeDrawer() {
    el.drawerWrap.classList.remove("open");
    drawerTimer = setTimeout(() => { el.drawerWrap.hidden = true; }, 420);
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  /* ---------- sensory / display modes ---------- */
  let idleTimer = 0;
  function armIdle() {
    body.classList.remove("idle");
    clearTimeout(idleTimer);
    if (body.classList.contains("sensory-mode") || body.classList.contains("display-mode")) {
      idleTimer = setTimeout(() => body.classList.add("idle"), 3000);
    }
  }
  async function enterMode(mode) {
    hideComplete();
    body.classList.remove("sensory-mode", "display-mode");
    body.classList.add(mode);
    armIdle();
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    } catch { /* layout-only mode still fills the viewport */ }
    if (state.clock === "sand") sandResize();
  }
  function exitMode() {
    body.classList.remove("sensory-mode", "display-mode", "idle");
    clearTimeout(idleTimer);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }

  /* ---------- events ---------- */
  el.start.addEventListener("click", () => { state.running ? pause() : start(); });
  el.reset.addEventListener("click", reset);
  el.restart.addEventListener("click", () => { reset(); start(); });
  el.choose.addEventListener("click", () => { hideComplete(); body.classList.remove("complete"); openDrawer(); });
  el.sensoryBtn.addEventListener("click", () => enterMode("sensory-mode"));
  el.displayBtn.addEventListener("click", () => enterMode("display-mode"));
  el.exitMode.addEventListener("click", exitMode);
  el.settingsOpen.addEventListener("click", openDrawer);
  el.settingsClose.addEventListener("click", closeDrawer);
  el.backdrop.addEventListener("click", closeDrawer);

  el.activityInput.addEventListener("input", () => setActivity(el.activityInput.value, false));
  el.activityInput.addEventListener("change", () => { el.activityInput.value = state.activity; });
  el.customMinutes.addEventListener("change", () => setDurationMinutes(Number(el.customMinutes.value), true));
  el.soundList.addEventListener("change", (e) => {
    if (e.target.name === "st-sound") { state.sound = e.target.value; save(); }
  });
  el.reducedMotion.addEventListener("change", () => { state.reducedMotion = el.reducedMotion.checked; applyPrefs(); });
  el.showCountdown.addEventListener("change", () => { state.showCountdown = el.showCountdown.checked; applyPrefs(); });
  el.showActivity.addEventListener("change", () => { state.showActivity = el.showActivity.checked; applyPrefs(); });
  el.focusMode.addEventListener("change", () => { state.focusMode = el.focusMode.checked; applyPrefs(); });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !el.drawerWrap.hidden) closeDrawer();
    else if (e.key === "Escape" && (body.classList.contains("sensory-mode") || body.classList.contains("display-mode"))) exitMode();
  });
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) body.classList.remove("sensory-mode", "display-mode", "idle");
  });
  document.addEventListener("mousemove", armIdle);
  document.addEventListener("touchstart", armIdle, { passive: true });
  document.addEventListener("visibilitychange", () => { if (!document.hidden && state.running) render(); });
  mediaReduced.addEventListener?.("change", () => render());
  window.addEventListener("resize", () => { if (state.clock === "sand") sandResize(); render(); });

  /* ---------- init ---------- */
  load();
  buildControls();
  sandInit();
  el.customMinutes.value = String(Math.round(state.durationMs / 6000) / 10);
  syncTimePresets(state.durationMs / 60000);
  setActivity(state.activity);
  applyPrefs();
  reset();
})();
