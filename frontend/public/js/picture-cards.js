/* ─────────────────────────────────────────────────────────────
   Talkeez Picture Cards — engine.
   Modes: speak · choice · first · schedule
   Storage: localStorage "talkeez.pictureCards.v1" — v1 backups
   migrate automatically; exports remain compatible.
   ───────────────────────────────────────────────────────────── */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const KEY = "talkeez.pictureCards.v1";

  /* ---------- categories ---------- */
  const CATS = {
    actions:   { label: "Actions",   bg: "#E8ECFB", ink: "#2541D6" },
    feelings:  { label: "Feelings",  bg: "#FCE9EC", ink: "#D64562" },
    food:      { label: "Food",      bg: "#FCF3D7", ink: "#9A7B00" },
    breaks:    { label: "Breaks",    bg: "#E7F4EA", ink: "#2EA043" },
    classroom: { label: "Classroom", bg: "#E5E9F5", ink: "#1B2A4E" },
    people:    { label: "People",    bg: "#F0EAF8", ink: "#7A4FB3" },
    places:    { label: "Places",    bg: "#E2F2F0", ink: "#1F7A72" },
    requests:  { label: "Requests",  bg: "#FCEFE3", ink: "#C2611F" },
    routines:  { label: "Routines",  bg: "#EDEFF2", ink: "#4B5563" },
    yesno:     { label: "Yes / No",  bg: "#E9F6EE", ink: "#237A3C" },
    sensory:   { label: "Sensory",   bg: "#F3EEF9", ink: "#6C5CA8" },
    hygiene:   { label: "Toileting", bg: "#E5F3F7", ink: "#22708C" },
    learning:  { label: "Learning",  bg: "#EAEAFB", ink: "#4A3FD6" },
    therapy:   { label: "Therapy",   bg: "#FBEBF0", ink: "#B33A6B" },
    custom:    { label: "My cards",  bg: "#F2EFE8", ink: "#6B6553" },
  };

  /* ---------- starter deck ---------- */
  const S = (id, label, emoji, cat) => ({ id, label, emoji, cat });
  const STARTER = [
    // Requests
    S("help", "Help", "🙋", "requests"), S("more", "More", "➕", "requests"),
    S("stop", "Stop", "🛑", "requests"), S("all-done", "All done", "✅", "requests"),
    S("i-want", "I want", "🙌", "requests"), S("i-need", "I need", "✋", "requests"),
    S("wait", "Wait", "⏳", "requests"),
    // Yes / No
    S("yes", "Yes", "✔️", "yesno"), S("no", "No", "❌", "yesno"),
    // Breaks
    S("break", "Break", "🌿", "breaks"), S("quiet-time", "Quiet time", "🌙", "breaks"),
    S("calm-down", "Calm down", "🧘", "breaks"),
    // Hygiene
    S("bathroom", "Bathroom", "🚻", "hygiene"), S("wash-hands", "Wash hands", "🧼", "hygiene"),
    S("brush-teeth", "Brush teeth", "🪥", "hygiene"),
    // Food
    S("drink", "Drink", "💧", "food"), S("snack", "Snack", "🍎", "food"), S("lunch", "Lunch", "🍽️", "food"),
    // Actions
    S("sit", "Sit", "🪑", "actions"), S("stand", "Stand", "🧍", "actions"),
    S("play", "Play", "🧸", "actions"), S("read", "Read", "📖", "actions"),
    S("clean-up", "Clean up", "🧹", "actions"), S("listen", "Listen", "👂", "actions"),
    S("walk", "Walk", "🚶", "actions"), S("share", "Share", "🤝", "actions"),
    // Feelings
    S("happy", "Happy", "😊", "feelings"), S("sad", "Sad", "😢", "feelings"),
    S("mad", "Mad", "😠", "feelings"), S("tired", "Tired", "😴", "feelings"),
    S("scared", "Scared", "😨", "feelings"), S("calm", "Calm", "😌", "feelings"),
    // Sensory
    S("sensory-break", "Sensory break", "🎧", "sensory"), S("fidget", "Fidget", "🪀", "sensory"),
    S("deep-pressure", "Deep pressure", "🤗", "sensory"), S("swing", "Swing", "🛝", "sensory"),
    // Classroom
    S("homework", "Homework", "✏️", "classroom"), S("circle-time", "Circle time", "⭕", "classroom"),
    S("line-up", "Line up", "🧍‍♀️", "classroom"), S("art", "Art", "🎨", "classroom"),
    S("music", "Music", "🎵", "classroom"),
    // Places
    S("outside", "Outside", "🌳", "places"), S("playground", "Playground", "🛝", "places"),
    S("home", "Home", "🏠", "places"), S("school", "School", "🏫", "places"), S("car", "Car", "🚗", "places"),
    // People
    S("teacher", "Teacher", "🧑‍🏫", "people"), S("friend", "Friend", "🧑‍🤝‍🧑", "people"),
    S("mom", "Mom", "👩", "people"), S("dad", "Dad", "👨", "people"), S("therapist", "Therapist", "🧑‍⚕️", "people"),
    // Routines
    S("get-ready", "Get ready", "🎒", "routines"), S("bedtime", "Bedtime", "🛏️", "routines"),
    S("bath", "Bath", "🛁", "routines"), S("breakfast", "Breakfast", "🥣", "routines"),
    S("story-time", "Story time", "📕", "routines"),
    // Learning
    S("counting", "Counting", "🔢", "learning"), S("letters", "Letters", "🔤", "learning"),
    S("colors", "Colors", "🌈", "learning"), S("puzzle", "Puzzle", "🧩", "learning"),
    // Therapy
    S("speech", "Speech", "🗣️", "therapy"), S("table-time", "Table time", "🪑", "therapy"),
  ];
  const COMMON = ["help", "break", "bathroom", "drink", "snack", "all-done", "more", "stop", "yes", "no", "i-want", "play", "outside", "quiet-time", "sensory-break", "clean-up"];
  const SCHEDULE_STARTERS = ["breakfast", "get-ready", "school", "play", "snack", "clean-up", "bath", "bedtime"];

  /* ---------- state ---------- */
  const blank = () => ({
    version: 2, title: "My day", mode: "speak", speak: true, layout: 4,
    board: [], first: [null, null], schedule: [],
    favorites: [], recents: [], custom: [], firstDone: false,
  });
  let state = blank();

  function migrateV1(d) {
    const s = blank();
    s.title = d.title;
    s.speak = d.speak;
    s.mode = d.type === "choice" ? "choice" : d.type;
    if (d.type === "choice") s.board = d.board;
    if (d.type === "schedule") s.schedule = d.board;
    if (d.type === "first") s.first = [d.board[0] || null, d.board[1] || null];
    s.custom = d.custom.map(c => ({ id: c.id, label: c.label, emoji: c.symbol, cat: "custom", phrase: c.label, ...(c.image ? { image: c.image } : {}) }));
    return s;
  }
  function validId(id) { return STARTER.some(c => c.id === id) || state.custom.some(c => c.id === id); }
  function validateV1(d) {
    if (!d || d.version !== 1 || typeof d.title !== "string" || d.title.length > 70
      || !["choice", "first", "schedule"].includes(d.type) || typeof d.speak !== "boolean"
      || !Array.isArray(d.custom) || d.custom.length > 40 || !Array.isArray(d.board) || d.board.length > 30) throw Error("Invalid board file.");
    for (const c of d.custom) {
      if (!c || typeof c.id !== "string" || c.id.length > 80 || typeof c.label !== "string" || !c.label.trim()
        || c.label.length > 40 || typeof c.symbol !== "string" || c.symbol.length > 12
        || (c.image && (typeof c.image !== "string" || c.image.length > 400000
          || !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(c.image)))) throw Error("Invalid card in backup.");
    }
    return d;
  }
  function validateV2(d) {
    if (!d || d.version !== 2 || typeof d.title !== "string" || d.title.length > 70
      || !["speak", "choice", "first", "schedule"].includes(d.mode) || typeof d.speak !== "boolean"
      || !Array.isArray(d.board) || !Array.isArray(d.schedule) || !Array.isArray(d.custom)
      || d.custom.length > 40) throw Error("Invalid board file.");
    for (const c of d.custom) {
      if (!c || typeof c.id !== "string" || typeof c.label !== "string" || !c.label.trim() || c.label.length > 40
        || (c.image && (typeof c.image !== "string" || c.image.length > 400000
          || !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(c.image)))) throw Error("Invalid card in backup.");
    }
    const s = blank();
    Object.assign(s, d);
    s.custom = d.custom.map(c => ({ id: c.id, label: c.label, emoji: c.emoji || null, cat: CATS[c.cat] ? c.cat : "custom", phrase: typeof c.phrase === "string" ? c.phrase.slice(0, 80) : c.label, ...(c.image ? { image: c.image } : {}) }));
    s.layout = [2, 4, 6, 8].includes(d.layout) ? d.layout : 4;
    s.firstDone = !!d.firstDone;
    return s;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch { status("Browser storage is unavailable or full. Download a backup before leaving this page."); }
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const d = JSON.parse(raw);
      state = d.version === 1 ? migrateV1(validateV1(d)) : validateV2(d);
      state.board = state.board.filter(validId);
      state.schedule = state.schedule.filter(validId);
      state.first = [state.first[0] && validId(state.first[0]) ? state.first[0] : null, state.first[1] && validId(state.first[1]) ? state.first[1] : null];
      state.favorites = (state.favorites || []).filter(validId);
      state.recents = (state.recents || []).filter(validId);
    } catch { status("Saved cards could not be loaded. You can start fresh or restore a backup."); state = blank(); }
  }

  /* ---------- helpers ---------- */
  const el = {
    title: $("#pc-title"), speak: $("#pc-speak"), status: $("#pc-status"),
    menuBtn: $("#pc-menu-btn"), menu: $("#pc-menu"),
    recentsBlock: $("#pc-recents-block"), recents: $("#pc-recents"),
    favBlock: $("#pc-favorites-block"), favs: $("#pc-favorites"),
    starters: $("#pc-starters"),
    board: $("#pc-board"), choiceEmpty: $("#pc-choice-empty"),
    ftFirst: $("#pc-ft-first"), ftThen: $("#pc-ft-then"), ftCard0: $("#pc-ft-card-0"), ftCard1: $("#pc-ft-card-1"),
    done: $("#pc-done"), firstEmpty: $("#pc-first-empty"),
    schedule: $("#pc-schedule"), scheduleEmpty: $("#pc-schedule-empty"),
    search: $("#pc-search"), chips: $("#pc-chips"), grid: $("#pc-lib-grid"), libEmpty: $("#pc-lib-empty"),
    modalWrap: $("#pc-modal-wrap"), createForm: $("#pc-create-form"),
    createLabel: $("#pc-create-label"), createPhrase: $("#pc-create-phrase"),
    createCat: $("#pc-create-cat"), createPhoto: $("#pc-create-photo"),
    createPreview: $("#pc-create-preview"),
  };
  const allCards = () => [...STARTER, ...state.custom];
  const cardById = id => allCards().find(c => c.id === id);
  function status(text) { el.status.textContent = text; }

  function speak(card) {
    if (!state.speak) return;
    if (!("speechSynthesis" in window)) { status("Speech is unavailable in this browser. Picture cards still work."); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(card.phrase || card.label);
    u.rate = 0.9;
    u.onerror = () => status("Speech could not play. Check your device sound and available voices.");
    speechSynthesis.speak(u);
  }
  function touchRecent(id) {
    state.recents = [id, ...state.recents.filter(x => x !== id)].slice(0, 12);
  }
  function pop(article) {
    article.classList.remove("pc-pop");
    void article.offsetWidth;
    article.classList.add("pc-pop");
  }

  /* ---------- card element ---------- */
  function cardEl(card, opts = {}) {
    const cat = CATS[card.cat] || CATS.custom;
    const art = document.createElement("article");
    art.className = "pc-card";
    art.style.setProperty("--cat-bg", cat.bg);
    art.style.setProperty("--cat-ink", cat.ink);
    if (opts.testid) art.setAttribute("data-testid", opts.testid);

    const main = document.createElement("button");
    main.type = "button";
    main.className = "pc-card-main";
    main.setAttribute("aria-label", (opts.actionLabel || "Choose") + " " + card.label);

    const visual = document.createElement("span");
    visual.className = "pc-card-visual";
    if (card.image) {
      const img = document.createElement("img");
      img.src = card.image; img.alt = "";
      visual.appendChild(img);
    } else if (card.emoji) {
      visual.textContent = card.emoji;
    } else {
      const mono = document.createElement("span");
      mono.className = "pc-card-mono";
      mono.textContent = card.label.trim().charAt(0).toUpperCase() || "?";
      visual.appendChild(mono);
    }
    const label = document.createElement("span");
    label.className = "pc-card-label";
    label.textContent = card.label;
    main.append(visual, label);

    const accent = document.createElement("span");
    accent.className = "pc-card-accent";
    accent.setAttribute("aria-hidden", "true");
    art.append(accent, main);
    main.addEventListener("click", () => { pop(art); opts.onTap && opts.onTap(card, art); });

    if (opts.fav) {
      const f = document.createElement("button");
      f.type = "button";
      f.className = "pc-card-act" + (state.favorites.includes(card.id) ? " on" : "");
      f.textContent = state.favorites.includes(card.id) ? "★" : "☆";
      f.setAttribute("aria-label", (state.favorites.includes(card.id) ? "Unfavorite " : "Favorite ") + card.label);
      f.setAttribute("data-testid", `pc-fav-${opts.context || "lib"}-${card.id}`);
      f.addEventListener("click", e => {
        e.stopPropagation();
        state.favorites = state.favorites.includes(card.id)
          ? state.favorites.filter(x => x !== card.id)
          : [...state.favorites, card.id];
        save(); renderAll();
      });
      art.appendChild(f);
    }
    if (opts.remove) {
      const r = document.createElement("button");
      r.type = "button";
      r.className = "pc-card-act";
      r.textContent = "✕";
      r.setAttribute("aria-label", opts.removeLabel || ("Remove " + card.label));
      r.addEventListener("click", e => { e.stopPropagation(); opts.remove(card); });
      art.appendChild(r);
    }
    return art;
  }

  /* ---------- mode switching ---------- */
  let armedSlot = 0;
  function setMode(mode) {
    if (mode === "first" && state.mode === "choice" && state.board.length && !state.first[0]) {
      state.first = [state.board[0] || null, state.board[1] || null];
    }
    if (mode === "schedule" && state.mode === "choice" && state.board.length && !state.schedule.length) {
      state.schedule = [...state.board];
    }
    if (mode === "choice" && state.mode === "schedule" && state.schedule.length && !state.board.length) {
      state.board = [...state.schedule];
    }
    state.mode = mode;
    document.body.dataset.mode = mode;
    for (const tab of $$(".pc-modeswitch [role='tab']")) {
      const on = tab.dataset.mode === mode;
      tab.setAttribute("aria-selected", String(on));
      $("#pc-panel-" + tab.dataset.mode).hidden = !on;
    }
    save();
    renderWorkspace();
  }

  /* ---------- renderers ---------- */
  function renderSpeak() {
    const fill = (wrap, ids, block, context) => {
      wrap.replaceChildren();
      for (const id of ids) {
        const card = cardById(id);
        if (!card) continue;
        wrap.appendChild(cardEl(card, {
          fav: true, actionLabel: "Speak", context,
          onTap: c => { speak(c); touchRecent(c.id); save(); renderSpeak(); },
        }));
      }
      if (block) block.hidden = ids.length === 0;
    };
    fill(el.recents, state.recents, el.recentsBlock, "rec");
    fill(el.favs, state.favorites, el.favBlock, "fav");
    fill(el.starters, COMMON, null, "row");
  }

  function renderChoice() {
    el.board.replaceChildren();
    el.board.dataset.size = String(state.layout);
    for (const b of $$(".pc-layout-picker button")) {
      b.setAttribute("aria-pressed", String(Number(b.dataset.layout) === state.layout));
    }
    const visible = state.board.slice(0, state.layout);
    el.choiceEmpty.hidden = visible.length > 0;
    for (const id of visible) {
      const card = cardById(id);
      if (!card) continue;
      el.board.appendChild(cardEl(card, {
        actionLabel: "Speak", testid: "pc-board-card-" + id,
        onTap: c => { speak(c); touchRecent(c.id); save(); },
        remove: c => { state.board = state.board.filter(x => x !== c.id); save(); renderChoice(); status(`${c.label} removed from the board.`); },
        removeLabel: "Remove " + card.label + " from board",
      }));
    }
  }

  function renderFirst() {
    const slots = [el.ftFirst, el.ftThen];
    const holders = [el.ftCard0, el.ftCard1];
    state.first.forEach((id, i) => {
      holders[i].replaceChildren();
      const card = id ? cardById(id) : null;
      if (card) {
        holders[i].appendChild(cardEl(card, {
          actionLabel: "Speak", testid: `pc-ft-set-${i}`,
          onTap: c => speak(c),
          remove: () => { state.first[i] = null; if (i === 0) state.firstDone = false; save(); renderFirst(); },
          removeLabel: "Remove " + card.label + " from " + (i === 0 ? "First" : "Then"),
        }));
      } else {
        const ph = document.createElement("button");
        ph.type = "button";
        ph.className = "pc-ft-placeholder";
        ph.textContent = i === 0 ? "Tap to choose the First card" : "Tap to choose the Then card";
        ph.setAttribute("data-testid", `pc-ft-empty-${i}`);
        ph.addEventListener("click", () => { armedSlot = i; renderFirst(); });
        holders[i].appendChild(ph);
      }
      slots[i].classList.toggle("armed", armedSlot === i && !card);
    });
    el.ftFirst.classList.toggle("done", state.firstDone && !!state.first[0]);
    el.ftThen.classList.toggle("next-up", state.firstDone && !!state.first[1]);
    el.done.disabled = !state.first[0] || state.firstDone;
    el.done.textContent = state.firstDone ? "First is done ✓" : "Mark First done ✓";
    el.firstEmpty.hidden = !!(state.first[0] || state.first[1]);
    if (!state.first[0] && !state.first[1]) el.firstEmpty.textContent = "Tap a slot, then tap a card in the library to place it.";
  }

  function renderSchedule() {
    el.schedule.replaceChildren();
    el.scheduleEmpty.hidden = state.schedule.length > 0;
    state.schedule.forEach((id, i) => {
      const card = cardById(id);
      if (!card) return;
      const li = document.createElement("li");
      li.className = "pc-step";
      li.draggable = true;
      li.dataset.index = String(i);
      li.setAttribute("data-testid", `pc-step-${i}`);

      const num = document.createElement("span");
      num.className = "pc-step-num";
      num.textContent = String(i + 1);

      const cardWrap = cardEl(card, { actionLabel: "Speak", onTap: c => speak(c) });

      const acts = document.createElement("div");
      acts.className = "pc-step-actions";
      const up = document.createElement("button");
      up.type = "button"; up.textContent = "↑"; up.disabled = i === 0;
      up.setAttribute("aria-label", `Move ${card.label} earlier`);
      up.addEventListener("click", () => { [state.schedule[i - 1], state.schedule[i]] = [state.schedule[i], state.schedule[i - 1]]; save(); renderSchedule(); });
      const down = document.createElement("button");
      down.type = "button"; down.textContent = "↓"; down.disabled = i === state.schedule.length - 1;
      down.setAttribute("aria-label", `Move ${card.label} later`);
      down.addEventListener("click", () => { [state.schedule[i + 1], state.schedule[i]] = [state.schedule[i], state.schedule[i + 1]]; save(); renderSchedule(); });
      const rm = document.createElement("button");
      rm.type = "button"; rm.textContent = "✕";
      rm.setAttribute("aria-label", `Remove ${card.label} from schedule`);
      rm.addEventListener("click", () => { state.schedule.splice(i, 1); save(); renderSchedule(); });
      acts.append(up, down, rm);

      li.append(num, cardWrap, acts);

      li.addEventListener("dragstart", e => { li.classList.add("dragging"); e.dataTransfer.setData("text/plain", String(i)); });
      li.addEventListener("dragend", () => li.classList.remove("dragging"));
      li.addEventListener("dragover", e => e.preventDefault());
      li.addEventListener("drop", e => {
        e.preventDefault();
        const from = Number(e.dataTransfer.getData("text/plain"));
        if (!Number.isInteger(from) || from === i) return;
        const [moved] = state.schedule.splice(from, 1);
        state.schedule.splice(i, 0, moved);
        save(); renderSchedule();
      });

      el.schedule.appendChild(li);
    });
  }

  function renderWorkspace() {
    if (state.mode === "speak") renderSpeak();
    else if (state.mode === "choice") renderChoice();
    else if (state.mode === "first") renderFirst();
    else renderSchedule();
  }
  function renderAll() { renderWorkspace(); renderLibrary(); }

  /* ---------- library ---------- */
  let activeCat = "all";
  function libraryAdd(card) {
    touchRecent(card.id);
    if (state.mode === "speak") { speak(card); save(); renderSpeak(); return; }
    if (state.mode === "choice") {
      if (state.board.includes(card.id)) { status(`“${card.label}” is already on the board.`); return; }
      if (state.board.length >= 30) { status("This board is full. Remove a card first."); return; }
      state.board.push(card.id);
      save(); renderChoice();
      status(`${card.label} added to the board.`);
      if (state.board.length > state.layout) status(`${card.label} added — it will show when the board size allows.`);
      return;
    }
    if (state.mode === "first") {
      const slot = state.first[armedSlot] ? (state.first[0] ? (state.first[1] ? armedSlot : 1) : 0) : armedSlot;
      const target = state.first[armedSlot] == null ? armedSlot : slot;
      state.first[target] = card.id;
      if (target === 0) state.firstDone = false;
      armedSlot = target === 0 ? 1 : 0;
      save(); renderFirst();
      status(`${card.label} placed in ${target === 0 ? "First" : "Then"}.`);
      return;
    }
    // schedule
    if (state.schedule.length >= 30) { status("This schedule is full. Remove a step first."); return; }
    state.schedule.push(card.id);
    save(); renderSchedule();
    status(`${card.label} added as step ${state.schedule.length}.`);
  }

  function renderLibrary() {
    const q = el.search.value.trim().toLowerCase();
    el.grid.replaceChildren();
    let list = allCards();
    if (activeCat === "favorites") list = list.filter(c => state.favorites.includes(c.id));
    else if (activeCat === "recent") list = list.filter(c => state.recents.includes(c.id));
    else if (activeCat !== "all") list = list.filter(c => c.cat === activeCat);
    if (q) list = list.filter(c => c.label.toLowerCase().includes(q));
    el.libEmpty.hidden = list.length > 0;
    for (const card of list) {
      const isCustom = state.custom.some(c => c.id === card.id);
      el.grid.appendChild(cardEl(card, {
        fav: true,
        actionLabel: state.mode === "speak" ? "Speak" : "Add",
        testid: "pc-lib-card-" + card.id,
        onTap: c => libraryAdd(c),
        remove: isCustom ? (c => {
          if (!confirm(`Delete “${c.label}” from the library and all boards?`)) return;
          state.custom = state.custom.filter(x => x.id !== c.id);
          state.board = state.board.filter(x => x !== c.id);
          state.schedule = state.schedule.filter(x => x !== c.id);
          state.first = state.first.map(x => (x === c.id ? null : x));
          state.favorites = state.favorites.filter(x => x !== c.id);
          state.recents = state.recents.filter(x => x !== c.id);
          save(); renderAll();
        }) : null,
        removeLabel: "Delete custom card " + card.label,
      }));
    }
  }

  function renderChips() {
    el.chips.replaceChildren();
    const mk = (id, label, ink) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pc-chip";
      b.textContent = label;
      b.setAttribute("aria-pressed", String(activeCat === id));
      b.setAttribute("data-testid", "pc-chip-" + id);
      if (ink) b.style.setProperty("--chip-ink", ink);
      b.addEventListener("click", () => { activeCat = id; renderChips(); renderLibrary(); });
      el.chips.appendChild(b);
    };
    mk("all", "All");
    mk("recent", "Recent");
    mk("favorites", "★ Favorites");
    for (const [id, c] of Object.entries(CATS)) {
      if (id === "custom" && !state.custom.length) continue;
      mk(id, c.label, c.ink);
    }
  }

  /* ---------- custom card modal ---------- */
  let lastFocus = null;
  function updatePreview() {
    el.createPreview.replaceChildren();
    const label = el.createLabel.value.trim() || "New card";
    const cat = el.createCat.value;
    el.createPreview.appendChild(cardEl({ id: "preview", label, emoji: null, cat }, {}));
  }
  function openModal() {
    lastFocus = document.activeElement;
    el.modalWrap.hidden = false;
    el.createLabel.focus();
    updatePreview();
  }
  function closeModal() {
    el.modalWrap.hidden = true;
    el.createForm.reset();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  async function photo(file) {
    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      throw Error("Choose a PNG, JPEG, or WebP photo under 5 MB.");
    }
    const bitmap = await createImageBitmap(file);
    try {
      const canvas = document.createElement("canvas");
      const scale = Math.min(1, 400 / Math.max(bitmap.width, bitmap.height));
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.8);
    } finally { bitmap.close(); }
  }

  /* ---------- present mode ---------- */
  function setPresent(on) {
    document.body.classList.toggle("present", on);
    if (on) $("#pc-exit-present").focus();
  }

  /* ---------- events ---------- */
  for (const tab of $$(".pc-modeswitch [role='tab']")) {
    tab.addEventListener("click", () => setMode(tab.dataset.mode));
  }
  el.title.addEventListener("input", () => { state.title = el.title.value; save(); });
  el.speak.addEventListener("change", () => {
    state.speak = el.speak.checked;
    if (!state.speak && "speechSynthesis" in window) speechSynthesis.cancel();
    save();
  });
  for (const b of $$(".pc-layout-picker button")) {
    b.addEventListener("click", () => { state.layout = Number(b.dataset.layout); save(); renderChoice(); });
  }
  el.done.addEventListener("click", () => {
    state.firstDone = true;
    save(); renderFirst();
    status("First is done — time for Then.");
    const thenCard = state.first[1] && cardById(state.first[1]);
    if (thenCard) speak({ ...thenCard, phrase: "All done. Now: " + thenCard.label });
  });

  el.menuBtn.addEventListener("click", () => {
    const open = el.menu.hidden;
    el.menu.hidden = !open;
    el.menuBtn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", e => {
    if (!el.menu.hidden && !e.target.closest(".pc-menu-wrap")) {
      el.menu.hidden = true;
      el.menuBtn.setAttribute("aria-expanded", "false");
    }
  });
  $("#pc-print").addEventListener("click", () => { el.menu.hidden = true; window.print(); });
  $("#pc-clear").addEventListener("click", () => {
    el.menu.hidden = true;
    if (!confirm("Clear the current board? Your library and favorites stay.")) return;
    state.board = []; state.first = [null, null]; state.schedule = []; state.firstDone = false;
    save(); renderWorkspace(); status("Board cleared.");
  });
  $("#pc-export").addEventListener("click", () => {
    el.menu.hidden = true;
    const url = URL.createObjectURL(new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }));
    const a = document.createElement("a");
    a.href = url; a.download = "talkeez-picture-board.json"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    status("Backup downloaded. It includes your custom photos.");
  });
  $("#pc-import").addEventListener("change", async e => {
    const file = e.target.files[0];
    e.target.value = "";
    el.menu.hidden = true;
    if (!file) return;
    try {
      if (file.size > 16000000) throw Error("This backup is too large.");
      const d = JSON.parse(await file.text());
      const restored = d.version === 1 ? migrateV1(validateV1(d)) : validateV2(d);
      if (!confirm("Replace the current board and custom library with this backup?")) return;
      state = restored;
      save(); loadControls(); renderAll(); renderChips();
      status("Backup restored.");
    } catch (err) { status(err.message || "This backup could not be opened."); }
  });

  el.search.addEventListener("input", renderLibrary);
  $("#pc-create-open").addEventListener("click", openModal);
  $("#pc-create-close").addEventListener("click", closeModal);
  $("#pc-modal-backdrop").addEventListener("click", closeModal);
  el.createLabel.addEventListener("input", updatePreview);
  el.createCat.addEventListener("change", updatePreview);
  el.createForm.addEventListener("submit", async e => {
    e.preventDefault();
    const label = el.createLabel.value.trim();
    if (!label) { status("Please enter a card label."); return; }
    if (state.custom.length >= 40) { status("Your library holds up to 40 custom cards. Delete an unused card first."); return; }
    const btn = $("#pc-create-submit");
    btn.disabled = true;
    try {
      const file = el.createPhoto.files[0];
      const image = file ? await photo(file) : null;
      state.custom.push({
        id: "custom-" + crypto.randomUUID(),
        label,
        emoji: null,
        cat: el.createCat.value,
        phrase: el.createPhrase.value.trim() || label,
        ...(image ? { image } : {}),
      });
      save(); closeModal(); renderChips(); renderAll();
      status(`${label} added to your library.`);
    } catch (err) { status(err.message || "This photo could not be opened. Try another image."); }
    finally { btn.disabled = false; }
  });

  $("#pc-present").addEventListener("click", () => setPresent(true));
  $("#pc-exit-present").addEventListener("click", () => setPresent(false));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (!el.modalWrap.hidden) closeModal();
      else if (document.body.classList.contains("present")) setPresent(false);
    }
  });

  /* ---------- init ---------- */
  function loadControls() {
    el.title.value = state.title;
    el.speak.checked = state.speak;
  }
  function initCreateCats() {
    el.createCat.replaceChildren();
    for (const [id, c] of Object.entries(CATS)) {
      const o = document.createElement("option");
      o.value = id; o.textContent = c.label;
      el.createCat.appendChild(o);
    }
    el.createCat.value = "custom";
  }

  load();
  initCreateCats();
  loadControls();
  renderChips();
  setMode(state.mode);
  renderLibrary();
})();
