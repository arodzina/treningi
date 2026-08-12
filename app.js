// ============================================================
//  Treningi — Półmaraton Kraków 2026
//  Aplikacja do śledzenia treningów biegowych i siłowych
// ============================================================

const STORAGE_KEY = 'treningi-krakow-2026';

// ----- Szablony treningów siłowych -----
const STRENGTH_TEMPLATES = {
  'siła-a': {
    name: 'Siła A (dół + plecy/barki)',
    exercises: [
      {
        name: 'hip-thrust',
        sets: [
          { weight: 80, reps: 6, rir: 2 },
          { weight: 80, reps: 6, rir: 2 },
          { weight: 80, reps: 6, rir: 2 },
          { weight: 80, reps: 6, rir: 2 },
          { weight: 80, reps: 6, rir: 2 },
        ]
      },
      {
        name: 'rdl',
        sets: [
          { weight: 0, reps: 8, rir: 2 },
          { weight: 0, reps: 8, rir: 2 },
          { weight: 0, reps: 8, rir: 2 },
          { weight: 0, reps: 8, rir: 2 },
        ]
      },
      {
        name: 'kickback',
        sets: [
          { weight: 0, reps: 12, rir: 2 },
          { weight: 0, reps: 12, rir: 2 },
          { weight: 0, reps: 12, rir: 2 },
        ]
      },
      {
        name: 'wiosłowanie-sztanga',
        sets: [
          { weight: 0, reps: 8, rir: 2 },
          { weight: 0, reps: 8, rir: 2 },
          { weight: 0, reps: 8, rir: 2 },
        ]
      },
      {
        name: 'gorilla-row',
        sets: [
          { weight: 0, reps: 8, rir: 2 },
          { weight: 0, reps: 8, rir: 2 },
          { weight: 0, reps: 8, rir: 2 },
        ]
      },
      {
        name: 'wiosłowanie-wyciąg',
        sets: [
          { weight: 0, reps: 10, rir: 2 },
          { weight: 0, reps: 10, rir: 2 },
          { weight: 0, reps: 10, rir: 2 },
        ]
      },
      {
        name: 'landmine-press',
        sets: [
          { weight: 0, reps: 6, rir: 2 },
          { weight: 0, reps: 6, rir: 2 },
          { weight: 0, reps: 6, rir: 2 },
        ]
      },
      {
        name: 'face-pull',
        sets: [
          { weight: 0, reps: 12, rir: 2 },
          { weight: 0, reps: 12, rir: 2 },
        ]
      },
    ]
  },
  'siła-b': {
    name: 'Siła B (dół + klatka/ramiona)',
    exercises: [
      {
        name: 'bułgary',
        sets: [
          { weight: 0, reps: 8, rir: 2 },
          { weight: 0, reps: 8, rir: 2 },
          { weight: 0, reps: 8, rir: 2 },
        ]
      },
      {
        name: 'łydki-smith',
        sets: [
          { weight: 0, reps: 15, rir: 2 },
          { weight: 0, reps: 15, rir: 2 },
          { weight: 0, reps: 15, rir: 2 },
        ]
      },
      {
        name: 'wyciskanie-hantli-klatka',
        sets: [
          { weight: 0, reps: 10, rir: 2 },
          { weight: 0, reps: 10, rir: 2 },
          { weight: 0, reps: 10, rir: 2 },
        ]
      },
      {
        name: 'rozpiętki',
        sets: [
          { weight: 0, reps: 10, rir: 2 },
          { weight: 0, reps: 10, rir: 2 },
          { weight: 0, reps: 10, rir: 2 },
        ]
      },
      {
        name: 'spider-curl',
        sets: [
          { weight: 0, reps: 10, rir: 2 },
          { weight: 0, reps: 10, rir: 2 },
        ]
      },
      {
        name: 'triceps-maszyna',
        sets: [
          { weight: 0, reps: 10, rir: 2 },
          { weight: 0, reps: 10, rir: 2 },
        ]
      },
    ]
  },
};

// ----- Plan treningowy (12 tygodni) ze szczegółami -----
const TRAINING_PLAN = [
  { week: 1,   longRunKm: 8,  phase: 'Baza',        lrNote: 'HR-capped 70% — spokojny powrót po przerwie', cadence: '148–150 spm (tylko stridery)' },
  { week: 2,   longRunKm: 10, phase: 'Baza',        lrNote: 'HR-capped 70%',             cadence: '148–150 spm (tylko stridery)' },
  { week: 3,   longRunKm: 13, phase: 'Baza',        lrNote: 'HR-capped 70%, kadencja tylko I połowa', cadence: '150–152 spm (easy wt/śr)' },
  { week: 4,   longRunKm: 10, phase: 'Deload',      lrNote: 'luźno',                      cadence: '150–152 spm (easy wt/śr)' },
  { week: 5,   longRunKm: 15, phase: 'Budowa',      lrNote: '+ 2×2 km tempo startowe na końcu', cadence: '152–154 spm (+ I połowa LR)' },
  { week: 6,   longRunKm: 16, phase: 'Budowa',      lrNote: '+ 3×2 km tempo startowe',   cadence: '152–154 spm (+ I połowa LR)' },
  { week: 7,   longRunKm: 17, phase: 'Budowa',      lrNote: '+ 20 min tempo startowe',    cadence: '154–156 spm (wszystkie sesje)' },
  { week: 8,   longRunKm: 12, phase: 'Deload',      lrNote: 'luźno',                      cadence: '154–156 spm (wszystkie sesje)' },
  { week: 9,   longRunKm: 19, phase: 'Specyficzna', lrNote: 'ostatnie 6 km tempo startowe — DECYZJA Plan A vs B', cadence: '154–156 spm' },
  { week: 10,  longRunKm: 16, phase: 'Specyficzna', lrNote: '+ 5 km tempo startowe',      cadence: '154–156 spm' },
  { week: 11,  longRunKm: 12, phase: 'Taper',       lrNote: 'umiarkowane tempo',          cadence: 'utrzymanie 154–156' },
  { week: 12,  longRunKm: 8,  phase: 'Taper',       lrNote: 'luźno, 3–4 dni przed startem', cadence: 'utrzymanie 154–156' },
];

// ----- Plan kilometrów dzień po dniu -----
const WEEKLY_PLAN_KM = [
  { week: 1,  wt: 4, śr: 4, cz: 5,  ndz: 8,  suma: 21, phase: 'Baza' },
  { week: 2,  wt: 5, śr: 6, cz: 7,  ndz: 10, suma: 28, phase: 'Baza' },
  { week: 3,  wt: 6, śr: 7, cz: 8,  ndz: 13, suma: 34, phase: 'Baza' },
  { week: 4,  wt: 5, śr: 5, cz: 6,  ndz: 10, suma: 26, phase: 'Deload' },
  { week: 5,  wt: 7, śr: 7, cz: 9,  ndz: 15, suma: 38, phase: 'Budowa' },
  { week: 6,  wt: 7, śr: 8, cz: 9,  ndz: 16, suma: 40, phase: 'Budowa' },
  { week: 7,  wt: 8, śr: 8, cz: 10, ndz: 17, suma: 43, phase: 'Budowa' },
  { week: 8,  wt: 6, śr: 6, cz: 7,  ndz: 12, suma: 31, phase: 'Deload' },
  { week: 9,  wt: 8, śr: 8, cz: 10, ndz: 19, suma: 45, phase: 'Specyficzna' },
  { week: 10, wt: 8, śr: 8, cz: 9,  ndz: 16, suma: 41, phase: 'Specyficzna' },
  { week: 11, wt: 6, śr: 6, cz: 7,  ndz: 12, suma: 31, phase: 'Taper' },
  { week: 12, wt: 4, śr: 4, cz: 5,  ndz: 8,  suma: 21, phase: 'Taper' },
];

// ----- Data -----
let data = loadData();

// ----- Chart instances -----
let charts = {};

// ----- Init -----
document.addEventListener('DOMContentLoaded', () => {
  initDateInputs();
  setupNavigation();
  setupRunForm();
  setupStrengthForm();
  setupCancelEdit();
  setupHistory();
  setupBackup();
  setupSyncGuide();
  setupWeeklyPlanner();

  // Nowe moduły
  updateCountdownTimer();
  setInterval(updateCountdownTimer, 1000);
  ensureDefaultShoes();
  renderShoeTracker();
  populateShoeSelect();
  setupSplitCalculator();
  setupFuelingPlanner();
  setupFitatuCloning();
  renderStrengthPRs();
  setupPrintAndICS();

  // Migracja: zmiana daty posiłków z 2026-08-03 na 2026-08-04 w lokalnym storage
  if (Array.isArray(data.foods)) {
    let changed = false;
    data.foods.forEach(f => {
      if (f.date === '2026-08-03') {
        f.date = '2026-08-04';
        changed = true;
      }
    });
    if (changed) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }

  refreshLLMPrompt();
  renderDashboard();
  setupNutritionCard();
  setupFoodForm();
  renderHistory();
  syncWithServer();
  
  // LLM prompt buttons
  const copyBtn = document.getElementById('copy-llm-prompt');
  if (copyBtn) copyBtn.addEventListener('click', copyLLMPrompt);
  const refreshBtn = document.getElementById('refresh-llm-prompt');
  if (refreshBtn) refreshBtn.addEventListener('click', () => {
    if (llmPromptDirty && !confirm('Prompt został zmodyfikowany. Odświeżyć i nadpisać Twoje zmiany?')) return;
    llmPromptDirty = false;
    refreshLLMPrompt();
  });
  const promptArea = document.getElementById('llm-prompt');
  if (promptArea) promptArea.addEventListener('input', () => { llmPromptDirty = true; });

  // Dashboard — nawigacja między tygodniami
  const prevWeekBtn = document.getElementById('week-prev');
  if (prevWeekBtn) prevWeekBtn.addEventListener('click', () => setDashboardWeek(Math.max(0, getDashboardWeek() - 1)));
  const nextWeekBtn = document.getElementById('week-next');
  if (nextWeekBtn) nextWeekBtn.addEventListener('click', () => setDashboardWeek(Math.min(12, getDashboardWeek() + 1)));
  const todayWeekBtn = document.getElementById('week-today');
  if (todayWeekBtn) todayWeekBtn.addEventListener('click', () => setDashboardWeek(null));

  // Klawiatura: ← / → przełączają tydzień na aktywnym dashboardzie (poza polami tekstowymi)
  document.addEventListener('keydown', (e) => {
    const dash = document.getElementById('view-dashboard');
    if (!dash || !dash.classList.contains('active')) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setDashboardWeek(Math.max(0, getDashboardWeek() - 1));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setDashboardWeek(Math.min(12, getDashboardWeek() + 1));
    }
  });
});

// ============================================================
//  Data persistence
// ============================================================
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return { runs: [], strength: [] };
}

function saveData() {
  data.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  pushSnapshot();
}

// ============================================================
//  Helpers
// ============================================================
function formatDateIso(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function parseDateIso(str) {
  if (!str) return new Date();
  const parts = str.split('-').map(Number);
  if (parts.length < 3) return new Date();
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

function todayStr() {
  return formatDateIso(new Date());
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatDuration(minutes) {
  const totalSec = Math.round(minutes * 60);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h === 0) {
    if (s === 0) return `${m} min`;
    return `${m}:${s.toString().padStart(2, '0')} min`;
  }
  return `${h}h ${m}:${s.toString().padStart(2, '0')}min`;
}

function calcPace(minutes, km) {
  if (!km || km === 0) return '—';
  const paceMin = minutes / km;
  const paceMinInt = Math.floor(paceMin);
  const paceSec = Math.round((paceMin - paceMinInt) * 60);
  return `${paceMinInt}:${paceSec.toString().padStart(2, '0')}/km`;
}

// Filter items that belong to a given training week (pre-plan dates go to week 1)
function filterByWeek(items, week) {
  const range = getWeekRange(week);
  return items.filter(item =>
    item.date >= range.start && item.date <= range.end
  );
}

function getWeekNumber(dateStr) {
  const startDate = new Date('2026-07-20');
  const d = new Date(dateStr + 'T00:00:00');
  const diff = (d - startDate) / (7 * 24 * 60 * 60 * 1000);
  if (diff < 0) return 0;
  const week = Math.floor(diff) + 1;
  return Math.min(week, 12);
}

function getWeekRange(week) {
  const planStart = new Date('2026-07-20');
  let start, end;
  if (week === 0) {
    // Tydzień 0: 7 dni przed startem planu
    start = new Date(planStart);
    start.setDate(start.getDate() - 7);
    end = new Date(planStart);
    end.setDate(end.getDate() - 1);
  } else {
    start = new Date(planStart);
    start.setDate(start.getDate() + (week - 1) * 7);
    end = new Date(start);
    end.setDate(end.getDate() + 6);
  }
  const fmt = d => formatDateIso(d);
  return { start: fmt(start), end: fmt(end) };
}

function roundKm(km) {
  return Math.round(km * 10) / 10;
}

// ============================================================
//  Navigation
// ============================================================
function setupNavigation() {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      document.getElementById('view-' + btn.dataset.view).classList.add('active');
      // Refresh planner when Plan tab is opened
      if (btn.dataset.view === 'plan') {
        setupWeeklyPlanner();
        refreshLLMPrompt();
      }
    });
  });
}

// ============================================================
//  Init date inputs
// ============================================================
function setupCancelEdit() {
  const btn = document.getElementById('run-cancel-edit');
  if (!btn) return;
  // Remove any old listener by cloning + replacing, then add fresh one
  const newBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(newBtn, btn);
  newBtn.addEventListener('click', () => {
    document.getElementById('run-form').reset();
    document.getElementById('run-edit-id').value = '';
    document.getElementById('run-date').value = todayStr();
    document.getElementById('run-submit-btn').textContent = 'Zapisz trening';
    document.getElementById('run-cancel-edit').style.display = 'none';
    document.querySelector('[data-view="dashboard"]').click();
  });
}

// ============================================================
function initDateInputs() {
  document.getElementById('run-date').value = todayStr();
  document.getElementById('strength-date').value = todayStr();
  const foodDate = document.getElementById('food-date');
  if (foodDate) foodDate.value = todayStr();
  renderPlanTable();
  renderWeeklyKmTable();
}

// ============================================================
//  Run Form
// ============================================================
function setupRunForm() {
  const form = document.getElementById('run-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    try {
      const entry = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: document.getElementById('run-date').value,
      type: document.getElementById('run-type').value,
      shoeId: document.getElementById('run-shoe') ? document.getElementById('run-shoe').value : '',
      distance: parseFloat(document.getElementById('run-distance').value) || 0,
      duration: (parseFloat(document.getElementById('run-minutes').value) || 0) + (parseFloat(document.getElementById('run-seconds').value) || 0) / 60,
      hr: parseInt(document.getElementById('run-hr').value) || null,
      cadence: parseInt(document.getElementById('run-cadence').value) || null,
      calories: parseInt(document.getElementById('run-calories').value) || null,
      notes: document.getElementById('run-notes').value.trim(),
    };
    
    // Dopisz dystans do wybranych butów
    if (entry.shoeId && data.shoes) {
      const shoe = data.shoes.find(s => s.id === entry.shoeId);
      if (shoe) {
        shoe.mileage = Math.round((shoe.mileage + entry.distance) * 10) / 10;
      }
    }

    const editId = document.getElementById('run-edit-id').value;
    if (editId) {
      const idx = data.runs.findIndex(r => r.id === editId);
      if (idx !== -1) {
        entry.id = editId;
        data.runs[idx] = entry;
      }
    } else {
      data.runs.push(entry);
    }
    saveData();
    form.reset();
    document.getElementById('run-edit-id').value = '';
    document.getElementById('run-date').value = todayStr();
    document.getElementById('run-submit-btn').textContent = 'Zapisz trening';
    document.getElementById('run-cancel-edit').style.display = 'none';
    renderDashboard();
    renderHistory();
    populateShoeSelect();
    renderShoeTracker();
    // Switch to dashboard
      document.querySelector('[data-view="dashboard"]').click();
    } catch(err) {
      console.error('Błąd zapisu:', err);
      alert('Nie udało się zapisać: ' + (err.message || err));
    }
  });
}

// ============================================================
//  Strength Form
// ============================================================
// ============================================================
//  Strength Form – per-set weight & reps + templates
// ============================================================
function setupStrengthForm() {
  try {
    const sessionSelect = document.getElementById('strength-session');
    const exercisesContainer = document.getElementById('strength-exercises');
    
    if (!sessionSelect) { console.error('❌ #strength-session not found'); return; }
    if (!exercisesContainer) { console.error('❌ #strength-exercises not found'); return; }

    // Load template when session changes
    sessionSelect.addEventListener('change', () => {
      loadStrengthTemplate(sessionSelect.value);
    });

    // Load initial template
    loadStrengthTemplate(sessionSelect.value);

    // Add custom exercise
    const addBtn = document.getElementById('add-exercise');
    if (!addBtn) { console.error('❌ #add-exercise not found'); return; }
    addBtn.addEventListener('click', () => {
      addExerciseEntry(null, []);
    });

    // Submit
    const form = document.getElementById('strength-form');
    if (!form) { console.error('❌ #strength-form not found'); return; }
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      try {
        const exercises = collectStrengthExercises();
        console.log('collectStrengthExercises returned', exercises.length, 'exercises');
        if (exercises.length === 0) {
          alert('Brak ćwiczeń do zapisania. Uzupełnij przynajmniej jedną serię.');
          return;
        }

        const entry = {
          id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
          date: document.getElementById('strength-date').value,
          session: sessionSelect.value,
          duration: (parseFloat(document.getElementById('strength-minutes').value) || 0) + (parseFloat(document.getElementById('strength-seconds').value) || 0) / 60,
          calories: parseInt(document.getElementById('strength-calories').value) || null,
          exercises,
        };
        data.strength.push(entry);
        saveData();
        console.log('✅ Saved strength entry:', entry.id);
        document.getElementById('strength-date').value = todayStr();
        document.getElementById('strength-minutes').value = '';
        document.getElementById('strength-seconds').value = '0';
        document.getElementById('strength-calories').value = '';
        loadStrengthTemplate(sessionSelect.value);
        renderDashboard();
        renderHistory();
        document.querySelector('[data-view="dashboard"]').click();
      } catch(e) {
        console.error('❌ Submit error:', e);
        alert('Wystąpił błąd podczas zapisywania: ' + e.message);
      }
    });
  } catch(e) {
    console.error('❌ setupStrengthForm error:', e);
  }
}

function loadStrengthTemplate(sessionValue) {
  try {
    const container = document.getElementById('strength-exercises');
    if (!container) { console.error('❌ #strength-exercises not found'); return; }
    container.innerHTML = '';

    const template = STRENGTH_TEMPLATES[sessionValue];
    if (!template) {
      addExerciseEntry(null, []);
      return;
    }

    template.exercises.forEach(ex => {
      addExerciseEntry(ex.name, ex.sets);
    });
  } catch(e) {
    console.error('❌ loadStrengthTemplate error:', e);
  }
}

function addExerciseEntry(exerciseValue, sets) {
  const container = document.getElementById('strength-exercises');
  const entry = document.createElement('div');
  entry.className = 'exercise-entry';

  // --- Header ---
  const header = document.createElement('div');
  header.className = 'exercise-header';

  const nameGroup = document.createElement('div');
  nameGroup.className = 'form-group exercise-name-group';
  const label = document.createElement('label');
  label.textContent = 'Ćwiczenie';
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'exercise-select';
  input.placeholder = 'Wybierz lub wpisz nazwę ćwiczenia…';
  input.setAttribute('list', 'exercise-datalist');

  // Datalist z istniejącymi ćwiczeniami
  const datalist = document.createElement('datalist');
  datalist.id = 'exercise-datalist';
  const allOptions = [
    { group: 'Siła A', opts: [
      ['hip-thrust', 'Hip Thrust (sztanga)'],
      ['rdl', 'RDL (jednonóż/obunóż)'],
      ['kickback', 'Kickback (wykopy nogi)'],
      ['wiosłowanie-sztanga', 'Wiosłowanie sztangą nachwytem'],
      ['gorilla-row', 'Gorilla row'],
      ['wiosłowanie-wyciąg', 'Wiosłowanie na wyciągu siedząc'],
      ['landmine-press', 'Landmine Press'],
      ['face-pull', 'Face pull / odwrotne rozpiętki'],
    ]},
    { group: 'Siła B', opts: [
      ['bułgary', 'Bułgary'],
      ['łydki-smith', 'Łydki na maszynie Smitha'],
      ['wyciskanie-hantli-klatka', 'Wyciskanie hantli na klatkę (płaska)'],
      ['rozpiętki', 'Rozpiętki (brama/kabel)'],
      ['spider-curl', 'Spider curl (biceps)'],
      ['triceps-maszyna', 'Triceps na maszynie'],
    ]},
  ];
  allOptions.forEach(g => {
    g.opts.forEach(([val, text]) => {
      const opt = document.createElement('option');
      opt.value = text;
      datalist.appendChild(opt);
    });
  });

  // Jeśli exerciseValue pasuje do któregoś klucza, wstaw etykietę
  if (exerciseValue) {
    let found = false;
    allOptions.forEach(g => {
      g.opts.forEach(([val, text]) => {
        if (val === exerciseValue) { input.value = text; found = true; }
      });
    });
    if (!found) input.value = exerciseValue;
  }

  nameGroup.appendChild(label);
  nameGroup.appendChild(input);
  nameGroup.appendChild(datalist);
  // Dodajemy datalist też do body, żeby działał poza nameGroup
  document.body.appendChild(datalist);
  header.appendChild(nameGroup);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'btn-remove-exercise';
  removeBtn.textContent = '✕';
  removeBtn.title = 'Usuń ćwiczenie';
  removeBtn.addEventListener('click', () => {
    entry.remove();
    updateExerciseRemoveButtons();
  });
  header.appendChild(removeBtn);
  entry.appendChild(header);

  // --- Sets container ---
  const setsContainer = document.createElement('div');
  setsContainer.className = 'exercise-sets';

  if (sets && sets.length > 0) {
    sets.forEach(s => {
      setsContainer.appendChild(createSetRow(s.weight, s.reps, s.rir));
    });
  } else {
    // Default: one empty set
    setsContainer.appendChild(createSetRow(null, null, null));
  }

  entry.appendChild(setsContainer);

  // --- Add set button ---
  const addSetBtn = document.createElement('button');
  addSetBtn.type = 'button';
  addSetBtn.className = 'btn-add-set';
  addSetBtn.textContent = '+ Seria';
  addSetBtn.addEventListener('click', () => {
    setsContainer.appendChild(createSetRow(null, null, null));
    updateSetRemoveButtons(setsContainer);
  });
  entry.appendChild(addSetBtn);

  container.appendChild(entry);
  updateExerciseRemoveButtons();
  updateSetRemoveButtons(setsContainer);
}

function createSetRow(weight, reps, rir) {
  const row = document.createElement('div');
  row.className = 'set-row';

  const wG = document.createElement('div');
  wG.className = 'form-group set-weight';
  const wL = document.createElement('label');
  wL.textContent = 'Ciężar (kg)';
  const wI = document.createElement('input');
  wI.type = 'number';
  wI.className = 'set-weight-input';
  wI.step = '0.5';
  wI.min = '0';
  if (weight !== null && weight !== undefined) wI.value = weight;
  wG.appendChild(wL);
  wG.appendChild(wI);
  row.appendChild(wG);

  const rG = document.createElement('div');
  rG.className = 'form-group set-reps';
  const rL = document.createElement('label');
  rL.textContent = 'Powt.';
  const rI = document.createElement('input');
  rI.type = 'number';
  rI.className = 'set-reps-input';
  rI.min = '0';
  if (reps !== null && reps !== undefined) rI.value = reps;
  rG.appendChild(rL);
  rG.appendChild(rI);
  row.appendChild(rG);

  const riG = document.createElement('div');
  riG.className = 'form-group set-rir';
  const riL = document.createElement('label');
  riL.textContent = 'RIR';
  const riI = document.createElement('input');
  riI.type = 'number';
  riI.className = 'set-rir-input';
  riI.min = '0';
  riI.max = '5';
  riI.placeholder = '0-5';
  if (rir !== null && rir !== undefined) riI.value = rir;
  riG.appendChild(riL);
  riG.appendChild(riI);
  row.appendChild(riG);

  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'btn-remove-set';
  delBtn.textContent = '✕';
  delBtn.title = 'Usuń serię';
  delBtn.addEventListener('click', () => {
    row.remove();
    // Update visibility of remove buttons in the parent sets container
    const parent = row.closest('.exercise-sets');
    if (parent) updateSetRemoveButtons(parent);
  });
  row.appendChild(delBtn);

  return row;
}

function collectStrengthExercises() {
  const exercises = [];
  document.querySelectorAll('#strength-exercises .exercise-entry').forEach(entry => {
    const input = entry.querySelector('.exercise-select');
    const name = input.value.trim();
    if (!name) return;
    const label = name;
    const sets = [];
    entry.querySelectorAll('.set-row').forEach(row => {
      const weightVal = row.querySelector('.set-weight-input').value;
      const repsVal = row.querySelector('.set-reps-input').value;
      const rirVal = row.querySelector('.set-rir-input').value;

      const weight = weightVal !== '' ? parseFloat(weightVal) : null;
      const reps = repsVal !== '' ? parseInt(repsVal) : null;
      const rir = rirVal !== '' ? parseInt(rirVal) : null;

      // Only save if at least weight or reps is filled
      if (weight !== null || reps !== null) {
        sets.push({ weight, reps, rir });
      }
    });
    if (sets.length === 0) return;
    exercises.push({ name, label, sets });
  });
  return exercises;
}

function updateExerciseRemoveButtons() {
  const entries = document.querySelectorAll('#strength-exercises .exercise-entry');
  entries.forEach((entry) => {
    const btn = entry.querySelector('.btn-remove-exercise');
    if (btn) {
      btn.style.display = entries.length > 1 ? 'block' : 'none';
    }
  });
}

function updateSetRemoveButtons(container) {
  const rows = container.querySelectorAll('.set-row');
  rows.forEach((row) => {
    const btn = row.querySelector('.btn-remove-set');
    if (btn) {
      btn.style.display = rows.length > 1 ? 'block' : 'none';
    }
  });
}

// ============================================================
//  Weekly Planner — kafelki z drag & drop
// ============================================================
const WEEKLY_PLANS_KEY = 'treningi-tygodniowe-plany';

// Domyślny plan na tydzień (wzorowany na mikrocyklu) — lista kafelków na dzień
const DEFAULT_WEEK_PLAN = {
  pon: [{ text: '🚫 Pełny odpoczynek', done: false }],
  wt:  [{ text: '🌅 Easy <145 bpm', done: false }, { text: '💪 Siła A', done: false }],
  śr:  [{ text: '🧘 Pilates + Easy <145 bpm', done: false }],
  cz:  [{ text: '⚡ Akcent tempowy / progresywny', done: false }],
  pt:  [{ text: '💪 Siła B + plyometria', done: false }],
  sob: [{ text: '🚫 Pełen odpoczynek', done: false }],
  ndz: [{ text: '🏃 Long Run', done: false }],
};

const DAY_LABELS = {
  pon: 'Pon', wt: 'Wt', śr: 'Śr', cz: 'Cz', pt: 'Pt', sob: 'Sob', ndz: 'Ndz',
};

const DAY_ORDER = ['pon', 'wt', 'śr', 'cz', 'pt', 'sob', 'ndz'];

let dragSource = null; // { week, day, index }

function loadWeeklyPlans() {
  try {
    const raw = localStorage.getItem(WEEKLY_PLANS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return {};
}

function saveWeeklyPlans(plans) {
  localStorage.setItem(WEEKLY_PLANS_KEY, JSON.stringify(plans));
  pushSnapshot();
}

function setupWeeklyPlanner() {
  const currentWeek = getCurrentWeek();
  const range = getWeekRange(currentWeek);
  document.getElementById('planner-week-num').textContent = currentWeek;
  document.getElementById('planner-week-range').textContent =
    formatDate(range.start) + ' – ' + formatDate(range.end);

  renderWeeklyPlanner(currentWeek);

  document.getElementById('save-week-plan').addEventListener('click', () => {
    saveAllPlannerData(currentWeek);
  });

  document.getElementById('reset-week-plan').addEventListener('click', () => {
    if (confirm('Przywrócić wzorzec mikrocyklu? Zmiany w tym tygodniu zostaną utracone.')) {
      const plans = loadWeeklyPlans();
      delete plans[String(currentWeek)];
      saveWeeklyPlans(plans);
      renderWeeklyPlanner(currentWeek);
    }
  });
}

function getWeekPlan(week) {
  const plans = loadWeeklyPlans();
  return plans[String(week)] || null;
}

function renderWeeklyPlanner(week) {
  const container = document.getElementById('weekly-planner');
  if (!container) return;

  const saved = getWeekPlan(week);

  container.innerHTML = DAY_ORDER.map(key => {
    const tiles = (saved && saved[key]) || DEFAULT_WEEK_PLAN[key];
    const tileCount = tiles.length;
    const allDone = tiles.every(t => t.done);
    return `<div class="planner-day${allDone ? ' done' : ''}" data-day="${key}">
      <div class="planner-day-header">
        <span class="day-label">${DAY_LABELS[key]}</span>
        <span class="day-count">${tileCount}</span>
      </div>
      <div class="day-tiles" data-day="${key}">
        ${tiles.map((tile, idx) => renderTileHtml(key, idx, tile.text, tile.done)).join('')}
      </div>
      <button type="button" class="btn-add-workout" data-day="${key}">+ Dodaj trening</button>
    </div>`;
  }).join('');

  // Podpinanie eventów
  attachPlannerEvents(week);
}

function renderTileHtml(day, idx, text, done) {
  return `<div class="workout-tile${done ? ' done' : ''}" draggable="true" data-day="${day}" data-index="${idx}">
    <span class="tile-drag-handle" draggable="false">⠿</span>
    <input class="tile-input" type="text" value="${escHtml(text)}" placeholder="—" draggable="false" />
    <input class="tile-done" type="checkbox" ${done ? 'checked' : ''} title="Zrobione" draggable="false" />
    <button type="button" class="tile-delete" title="Usuń" draggable="false">✕</button>
  </div>`;
}

function attachPlannerEvents(week) {
  const container = document.getElementById('weekly-planner');
  if (!container) return;

  // --- Drag & drop ---
  container.querySelectorAll('.workout-tile').forEach(tile => {
    tile.addEventListener('dragstart', (e) => {
      const day = tile.dataset.day;
      const index = parseInt(tile.dataset.index);
      dragSource = { week, day, index };
      tile.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', `${day}:${index}`);
    });
    tile.addEventListener('dragend', () => {
      tile.classList.remove('dragging');
      container.querySelectorAll('.planner-day').forEach(d => d.classList.remove('drag-over'));
      dragSource = null;
    });
  });

  // Drop zones = day-tiles containers
  container.querySelectorAll('.day-tiles').forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.closest('.planner-day').classList.add('drag-over');
    });
    zone.addEventListener('dragleave', () => {
      zone.closest('.planner-day').classList.remove('drag-over');
    });
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.closest('.planner-day').classList.remove('drag-over');
      const targetDay = zone.dataset.day;
      if (dragSource && dragSource.week === week && targetDay) {
        // Najpierw zapisz aktualny stan DOM (teksty, done), żeby nie zgubić edycji
        saveAllPlannerData(week);
        moveTile(week, dragSource.day, dragSource.index, targetDay);
      }
    });
  });

  // --- Done checkbox ---
  container.querySelectorAll('.tile-done').forEach(cb => {
    cb.addEventListener('change', () => {
      const tile = cb.closest('.workout-tile');
      if (cb.checked) tile.classList.add('done');
      else tile.classList.remove('done');
      updateDayDoneState(tile.closest('.planner-day'));
      saveAllPlannerData(week);
    });
  });

  // --- Delete button ---
  container.querySelectorAll('.tile-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const tile = btn.closest('.workout-tile');
      const dayEl = tile.closest('.planner-day');
      tile.remove();
      updateDayCount(dayEl);
      updateDayDoneState(dayEl);
      saveAllPlannerData(week);
    });
  });

  // --- Add workout button ---
  container.querySelectorAll('.btn-add-workout').forEach(btn => {
    btn.addEventListener('click', () => {
      const day = btn.dataset.day;
      const dayEl = btn.closest('.planner-day');
      const tilesContainer = dayEl.querySelector('.day-tiles');
      const idx = tilesContainer.children.length;
      const div = document.createElement('div');
      div.innerHTML = renderTileHtml(day, idx, '', false);
      const newTile = div.firstElementChild;
      tilesContainer.appendChild(newTile);
      updateDayCount(dayEl);
      newTile.querySelector('.tile-input').focus();
      attachTileEvents(week, newTile);
      saveAllPlannerData(week);
    });
  });

  // --- Autosave on input change / blur ---
  container.querySelectorAll('.tile-input').forEach(input => {
    input.addEventListener('change', () => saveAllPlannerData(week));
    input.addEventListener('blur', () => saveAllPlannerData(week));
  });
}

function attachTileEvents(week, tile) {
  // Drag events
  tile.addEventListener('dragstart', (e) => {
    const day = tile.dataset.day;
    const index = parseInt(tile.dataset.index);
    dragSource = { week, day, index };
    tile.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${day}:${index}`);
  });
  tile.addEventListener('dragend', () => {
    tile.classList.remove('dragging');
    document.querySelectorAll('.planner-day').forEach(d => d.classList.remove('drag-over'));
    dragSource = null;
  });

  // Done checkbox
  const cb = tile.querySelector('.tile-done');
  if (cb) {
    cb.addEventListener('change', () => {
      if (cb.checked) tile.classList.add('done');
      else tile.classList.remove('done');
      updateDayDoneState(tile.closest('.planner-day'));
      saveAllPlannerData(week);
    });
  }

  // Delete button
  const del = tile.querySelector('.tile-delete');
  if (del) {
    del.addEventListener('click', () => {
      const dayEl = tile.closest('.planner-day');
      tile.remove();
      updateDayCount(dayEl);
      updateDayDoneState(dayEl);
      saveAllPlannerData(week);
    });
  }

  // Text input
  const input = tile.querySelector('.tile-input');
  if (input) {
    input.addEventListener('change', () => saveAllPlannerData(week));
    input.addEventListener('blur', () => saveAllPlannerData(week));
  }
}

function moveTile(week, fromDay, fromIndex, toDay) {
  const plans = loadWeeklyPlans();
  const weekKey = String(week);
  if (!plans[weekKey]) plans[weekKey] = {};

  const src = plans[weekKey][fromDay] || DEFAULT_WEEK_PLAN[fromDay].map(t => ({ ...t }));
  const dst = plans[weekKey][toDay] || DEFAULT_WEEK_PLAN[toDay].map(t => ({ ...t }));

  if (fromIndex < 0 || fromIndex >= src.length) return;
  const [moved] = src.splice(fromIndex, 1);
  dst.push(moved);

  plans[weekKey][fromDay] = src;
  plans[weekKey][toDay] = dst;
  saveWeeklyPlans(plans);

  renderWeeklyPlanner(week);
}

function saveAllPlannerData(week) {
  const container = document.getElementById('weekly-planner');
  if (!container) return;
  const plans = loadWeeklyPlans();
  const weekKey = String(week);
  plans[weekKey] = {};

  container.querySelectorAll('.planner-day').forEach(dayEl => {
    const key = dayEl.dataset.day;
    const tiles = [];
    dayEl.querySelectorAll('.workout-tile').forEach(tile => {
      const text = tile.querySelector('.tile-input').value.trim();
      const done = tile.querySelector('.tile-done').checked;
      tiles.push({ text: text || '—', done });
    });
    if (tiles.length === 0) {
      tiles.push({ text: '—', done: false });
    }
    plans[weekKey][key] = tiles;
  });

  saveWeeklyPlans(plans);
}

function updateDayCount(dayEl) {
  const count = dayEl.querySelectorAll('.workout-tile').length;
  const badge = dayEl.querySelector('.day-count');
  if (badge) badge.textContent = count;
}

function updateDayDoneState(dayEl) {
  const tiles = dayEl.querySelectorAll('.workout-tile');
  const allDone = tiles.length > 0 && Array.from(tiles).every(t => t.classList.contains('done'));
  if (allDone) dayEl.classList.add('done');
  else dayEl.classList.remove('done');
}

function escHtml(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ============================================================
//  Dashboard
// ============================================================
// ============================================================
//  Dashboard
// ============================================================
// null = podążaj za bieżącym tygodniem; liczba = ręcznie wybrany tydzień
let dashboardWeek = null;

function getDashboardWeek() {
  return dashboardWeek === null ? getCurrentWeek() : dashboardWeek;
}

function setDashboardWeek(w) {
  dashboardWeek = w;
  renderDashboard();
  
  const currentWeek = getDashboardWeek();
  const range = getWeekRange(currentWeek);
  const planWeekEl = document.getElementById('planner-week-num');
  const planRangeEl = document.getElementById('planner-week-range');
  if (planWeekEl) planWeekEl.textContent = currentWeek;
  if (planRangeEl) planRangeEl.textContent = formatDate(range.start) + ' – ' + formatDate(range.end);
  renderWeeklyPlanner(currentWeek);
}

function updateWeekNav(week) {
  const prev = document.getElementById('week-prev');
  const next = document.getElementById('week-next');
  const today = document.getElementById('week-today');
  if (prev) prev.disabled = week <= 0;
  if (next) next.disabled = week >= 12;
  if (today) today.style.display = dashboardWeek === null ? 'none' : 'inline-block';
}

function renderDashboard() {
  const currentWeek = getDashboardWeek();
  const weekRange = getWeekRange(currentWeek);
  // Short date format: DD.MM
  const fmtShort = s => { const d = new Date(s + 'T00:00:00'); return `${d.getDate()}.${d.getMonth()+1}`; };
  let weekLabel = currentWeek === 0 ? 'Tydzień 0 (rozruch)' : `Tydzień ${currentWeek}`;
  if (currentWeek === getCurrentWeek()) weekLabel += ' · <span style="opacity:.55;font-weight:normal">bieżący</span>';
  document.getElementById('current-week').innerHTML =
    `${weekLabel} · ${fmtShort(weekRange.start)} – ${fmtShort(weekRange.end)}`;

  updateWeekNav(currentWeek);

  // Stats for selected training week (pre-plan dates go to week 1)
  const weekRuns = filterByWeek(data.runs, currentWeek);
  const weekStrength = filterByWeek(data.strength, currentWeek);

  const totalDist = roundKm(weekRuns.reduce((sum, r) => sum + r.distance, 0));
  const totalDuration = weekRuns.reduce((sum, r) => sum + r.duration, 0);

  document.getElementById('stat-runs').textContent = weekRuns.length;
  document.getElementById('stat-distance').textContent = `${totalDist} km`;
  document.getElementById('stat-time').textContent = formatDuration(totalDuration);
  document.getElementById('stat-strength').textContent = weekStrength.length;
  const strengthMinutes = weekStrength.reduce((s, x) => s + (x.duration || 0), 0);
  const stTimeEl = document.getElementById('stat-strength-time');
  if (stTimeEl) stTimeEl.textContent = strengthMinutes > 0 ? `~${formatDuration(strengthMinutes)}` : '';
  const weekCalories = weekRuns.reduce((s, r) => s + (r.calories || 0), 0) +
                       weekStrength.reduce((s, x) => s + (x.calories || 0), 0);
  document.getElementById('stat-calories').textContent = weekCalories > 0 ? `${weekCalories} kcal` : '—';

  // Progress bar
  updateProgress(currentWeek, totalDist);

  // Charts
  renderCharts();

  // Shoe Tracker & Strength PRs
  renderShoeTracker();
  renderStrengthPRs();

  // Nutrition (spalone dziś)
  calcNutrition();
  renderFoodLog();
}

function getCurrentWeek() {
  const today = new Date();
  const startDate = new Date('2026-07-20');
  const diff = (today - startDate) / (7 * 24 * 60 * 60 * 1000);
  if (diff < 0) return 0; // przed rozpoczęciem planu → tydzień 0 (rozruch)
  const week = Math.floor(diff) + 1;
  return Math.min(week, 12);
}

function updateProgress(currentWeek, actualDistance) {
  const statusEl = document.getElementById('plan-status');

  if (currentWeek === 0) {
    // Tydzień rozruchowy — brak planu
    document.getElementById('progress-plan').style.width = '0%';
    statusEl.innerHTML = '<strong>Tydzień 0 — Rozruch</strong> · Treningi przed rozpoczęciem planu 20.07.2026';
    return;
  }

  const plan = TRAINING_PLAN[currentWeek - 1];
  if (!plan) return;

  const progress = ((currentWeek) / 12) * 100;
  document.getElementById('progress-plan').style.width = `${Math.min(100, progress)}%`;

  const phaseNames = {
    'Baza': 'Faza I — Baza',
    'Budowa': 'Faza II — Budowa',
    'Specyficzna': 'Faza III — Specyficzna',
    'Taper': 'Taper',
    'Deload': 'Deload',
  };

  const plannedLR = plan.longRunKm;
  let lrEntry = null;
  const weekRuns = filterByWeek(data.runs, currentWeek);
  const lrRuns = weekRuns.filter(r => r.type === 'long-run');
  if (lrRuns.length > 0) {
    lrEntry = lrRuns[lrRuns.length - 1];
  }

  let statusHTML = `<strong>Tydzień ${currentWeek}</strong> — ${phaseNames[plan.phase] || plan.phase}<br>`;
  statusHTML += `Planowany long run: <strong>${plannedLR} km</strong>`;
  if (lrEntry) {
    statusHTML += ` · Wykonany: <strong>${lrEntry.distance} km</strong>`;
    const diff = lrEntry.distance - plannedLR;
    if (Math.abs(diff) < 1) statusHTML += ` ✅`;
    else if (diff > 0) statusHTML += ` (o ${roundKm(diff)} km więcej)`;
    else statusHTML += ` (o ${roundKm(Math.abs(diff))} km mniej)`;
  } else {
    statusHTML += ` · Jeszcze nie wykonany`;
  }
  statusEl.innerHTML = statusHTML;
}

// ============================================================
//  Nutrition — zapotrzebowanie kaloryczne
// ============================================================
const NUTRITION_KEY = 'nutritionProfile';

// Domyślny profil — uzupełniony danymi użytkownika
const DEFAULT_NUTRITION_PROFILE = {
  weight: '70',
  height: '175',
  age: '22',
  activity: '1.375', // lekka aktywność poza treningiem (jazda rowerem, praca umysłowa)
  goal: 'recomp',    // rekompozycja: surplus w dni treningowe, bilans neutralny w dni odpoczynku
};

function loadNutritionProfile() {
  try {
    const raw = localStorage.getItem(NUTRITION_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return { ...DEFAULT_NUTRITION_PROFILE };
}

function saveNutritionProfile(profile) {
  localStorage.setItem(NUTRITION_KEY, JSON.stringify(profile));
  pushSnapshot();
}

const ACTIVITY_LABELS = {
  '1.2': 'Siedząca',
  '1.375': 'Lekka',
  '1.55': 'Umiarkowana',
  '1.725': 'Wysoka',
};
const GOAL_LABELS = {
  '0': 'Utrzymanie wagi',
  '-300': 'Redukcja −300 kcal',
  '-500': 'Redukcja −500 kcal',
  '200': 'Przyrost +200 kcal',
  'recomp': 'Rekompozycja (↑ mięśnie, bilans ✓)',
};

// ---- Nawigacja po dniach w dzienniku posiłków ----
// null = dziś; string 'YYYY-MM-DD' = wybrany dzień
let foodLogDate = null;

function getFoodLogDate() {
  return foodLogDate || todayStr();
}

function setFoodLogDate(dateStr) {
  foodLogDate = dateStr;
  const foodDateInput = document.getElementById('food-date');
  if (foodDateInput) foodDateInput.value = dateStr;
  renderFoodDateNav();
  renderFoodLog();
  calcNutrition();
}

function renderFoodDateNav() {
  const nav = document.getElementById('food-date-nav');
  if (!nav) return;
  const d = getFoodLogDate();
  const isToday = d === todayStr();
  const fmt = s => {
    const dt = parseDateIso(s);
    return dt.toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'short' });
  };
  nav.innerHTML = `
    <button type="button" class="week-nav" id="food-day-prev" title="Poprzedni dzień">◀</button>
    <span class="food-date-label" id="food-date-label">${isToday ? '📅 Dziś' : fmt(d)} · ${d}</span>
    <button type="button" class="week-nav" id="food-day-next" title="Następny dzień">▶</button>
    ${!isToday ? '<button type="button" class="btn-secondary week-today" id="food-day-today" style="font-size:0.78rem;padding:3px 8px">Dziś</button>' : ''}
  `;
  const prevBtn = document.getElementById('food-day-prev');
  const nextBtn = document.getElementById('food-day-next');
  const todayBtn = document.getElementById('food-day-today');
  if (prevBtn) prevBtn.addEventListener('click', () => {
    const cur = parseDateIso(getFoodLogDate());
    cur.setDate(cur.getDate() - 1);
    setFoodLogDate(formatDateIso(cur));
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    const cur = parseDateIso(getFoodLogDate());
    cur.setDate(cur.getDate() + 1);
    setFoodLogDate(formatDateIso(cur));
  });
  if (todayBtn) todayBtn.addEventListener('click', () => {
    setFoodLogDate(todayStr());
  });
}

function profileSummaryText() {
  const p = loadNutritionProfile();
  const parts = [];
  if (parseFloat(p.weight)) parts.push(`${p.weight} kg`);
  if (parseFloat(p.height)) parts.push(`${p.height} cm`);
  const age = parseInt(p.age, 10);
  if (age) {
    const suffix = age === 1 ? 'rok' : (age % 10 >= 2 && age % 10 <= 4 && (age % 100 < 12 || age % 100 > 14) ? 'lata' : 'lat');
    parts.push(`${age} ${suffix}`);
  }
  parts.push(ACTIVITY_LABELS[p.activity] || '— aktywność —');
  parts.push(GOAL_LABELS[p.goal] || '— cel —');
  return parts.join(' · ');
}

function updateProfileSummary() {
  const el = document.getElementById('nut-profile-summary');
  if (el) el.textContent = '⚙️ Profil: ' + profileSummaryText();
}

function calcNutrition() {
  const results = document.getElementById('nut-results');
  if (!results) return;
  const weight = parseFloat(document.getElementById('nut-weight').value);
  const height = parseFloat(document.getElementById('nut-height').value);
  const age = parseFloat(document.getElementById('nut-age').value);
  if (!weight || !height || !age) {
    updateProfileSummary();
    results.innerHTML = '<p class="empty-state" style="margin:0">Uzupełnij profil (⚙️ Profil), żeby zobaczyć zapotrzebowanie.</p>';
    return;
  }
  const act = parseFloat(document.getElementById('nut-activity').value) || 1.375;
  const goalVal = document.getElementById('nut-goal').value;
  // Całkowite spalone z zegarka (opcjonalne)
  const watchEl = document.getElementById('nut-watch-total');

  // Dla wybranego dnia (nie tylko dziś)
  const selectedDate = getFoodLogDate();

  // Spalone wg zegarka (wczytaj dla wybranego dnia)
  let watchTotal = 0;
  if (watchEl) {
    try {
      const map = JSON.parse(localStorage.getItem('nutritionWatchTotals') || '{}');
      watchTotal = parseFloat(map[selectedDate] || '0') || 0;
      // Aktualizuj pole (tylko jeśli oglądamy dziś)
      if (selectedDate === todayStr()) watchEl.value = map[selectedDate] || '';
    } catch (e) { /* ignore */ }
  }

  // Mifflin-St Jeor (kobieta): 10×kg + 6.25×cm − 5×wiek − 161
  const bmr = Math.round(10 * weight + 6.25 * height - 5 * age - 161);
  const baseNeed = Math.round(bmr * act);

  // Spalone w treningach dla wybranego dnia
  const burnedDay = [...(data.runs || []), ...(data.strength || [])]
    .filter(x => x.date === selectedDate)
    .reduce((s, x) => s + (x.calories || 0), 0);

  const hasTraining = [...(data.runs || []), ...(data.strength || [])]
    .some(x => x.date === selectedDate);

  const shownBurned = watchTotal > 0 ? watchTotal : burnedDay;
  const burnedLabel = watchTotal > 0 ? '🔥 Spalone (zegarek)' : '🔥 Spalone (treningi)';

  // Cel kaloryczny
  let target;
  let goalDescription = '';
  if (goalVal === 'recomp') {
    if (hasTraining) {
      // Dzień treningowy: base + spalone + lekki surplus 100 kcal
      target = baseNeed + shownBurned + 100;
      goalDescription = '💪 Dzień treningowy: base + spalone + 100 kcal surplus';
    } else {
      // Dzień odpoczynku: bilans neutralny
      target = baseNeed;
      goalDescription = '😴 Dzień odpoczynku: bilans neutralny';
    }
  } else {
    const goalOffset = parseInt(goalVal) || 0;
    target = baseNeed + shownBurned + goalOffset;
    goalDescription = '';
  }

  // Cel białka: 2 g/kg masy ciała
  const proteinTarget = Math.round(weight * 2);

  const totals = dayFoodTotals(selectedDate);
  const remaining = target - totals.kcal;
  const proteinRemaining = proteinTarget - totals.protein;
  const proteinPct = Math.min(100, Math.round((totals.protein / proteinTarget) * 100));

  const isSelectedToday = selectedDate === todayStr();
  const dayLabel = isSelectedToday ? 'dziś' : selectedDate;

  results.innerHTML = `
    ${goalDescription ? `<div class="nut-stat recomp-note"><span style="font-size:0.82rem;color:var(--text-muted)">${goalDescription}</span></div>` : ''}
    <div class="nut-stat"><span>Zapotrzebowanie bazowe (BMR×${act})</span><strong>${baseNeed} kcal</strong></div>
    <div class="nut-stat"><span>${burnedLabel}</span><strong>${shownBurned > 0 ? shownBurned + ' kcal' : '—'}</strong></div>
    <div class="nut-stat nut-target"><span>🎯 Cel na ${dayLabel}</span><strong>${target} kcal</strong></div>
    <div class="nut-stat"><span>🍽 Zjedzone</span><strong>${Math.round(totals.kcal)} kcal</strong></div>
    <div class="nut-stat ${remaining >= 0 ? '' : 'nut-over'}"><span>${remaining >= 0 ? '✅ Pozostało' : '⚠️ Nadwyżka'}</span><strong>${Math.abs(Math.round(remaining))} kcal</strong></div>
    <div class="nut-protein-block">
      <div class="nut-stat"><span>🥩 Białko — cel</span><strong>${proteinTarget} g (2 g/kg)</strong></div>
      <div class="nut-stat"><span>Zjedzone białko</span><strong>${Math.round(totals.protein)} g</strong></div>
      <div class="nut-protein-bar">
        <div class="nut-protein-fill" style="width:${proteinPct}%"></div>
      </div>
      <div class="nut-stat" style="font-size:0.82rem;color:var(--text-muted)"><span>${proteinRemaining > 0 ? '⬆ Brakuje' : '✅ Cel osiągnięty'}</span><strong>${proteinRemaining > 0 ? Math.round(proteinRemaining) + ' g' : ''}</strong></div>
    </div>
  `;
  updateProfileSummary();
  // Odśwież też bilans jedzenia (makro)
  renderFoodLog();
}

function setupNutritionCard() {
  if (!localStorage.getItem(NUTRITION_KEY)) {
    // Pierwsze uruchomienie — zapisz domyślny profil (na sztywno)
    saveNutritionProfile(DEFAULT_NUTRITION_PROFILE);
  }
  const p = loadNutritionProfile();
  // Całkowite spalone z zegarka — zapisywane per dzień
  const WATCH_KEY = 'nutritionWatchTotals';
  const watchEl = document.getElementById('nut-watch-total');
  if (watchEl) {
    try {
      const map = JSON.parse(localStorage.getItem(WATCH_KEY) || '{}');
      watchEl.value = map[todayStr()] || '';
    } catch (e) { /* ignore */ }
    const saveWatch = () => {
      try {
        const map = JSON.parse(localStorage.getItem(WATCH_KEY) || '{}');
        map[todayStr()] = watchEl.value;
        localStorage.setItem(WATCH_KEY, JSON.stringify(map));
      } catch (e) { /* ignore */ }
      pushSnapshot();
      calcNutrition();
    };
    watchEl.addEventListener('input', saveWatch);
    watchEl.addEventListener('change', saveWatch);
  }
  const fields = {
    'nut-weight': 'weight',
    'nut-height': 'height',
    'nut-age': 'age',
    'nut-activity': 'activity',
    'nut-goal': 'goal',
  };
  for (const [id, key] of Object.entries(fields)) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (p[key] !== undefined && p[key] !== '') el.value = p[key];
    const save = () => {
      const profile = loadNutritionProfile();
      profile[key] = el.value;
      saveNutritionProfile(profile);
      calcNutrition();
    };
    el.addEventListener('input', save);
    el.addEventListener('change', save);
  }
  calcNutrition();
}

// ============================================================
//  Food log — posiłki przepisywane z Fitatu
// ============================================================
function todayFoodTotals() {
  return dayFoodTotals(todayStr());
}

function dayFoodTotals(date) {
  const foods = (data.foods || []).filter(f => f.date === date);
  return {
    kcal: foods.reduce((s, f) => s + (f.calories || 0), 0),
    protein: foods.reduce((s, f) => s + (f.protein || 0), 0),
    fat: foods.reduce((s, f) => s + (f.fat || 0), 0),
    carbs: foods.reduce((s, f) => s + (f.carbs || 0), 0),
  };
}

function renderFoodLog() {
  const list = document.getElementById('food-list');
  const totalsEl = document.getElementById('food-totals');
  if (!list) return;
  const selectedDate = getFoodLogDate();
  const dayFoods = (data.foods || []).filter(f => f.date === selectedDate);
  const isToday = selectedDate === todayStr();

  if (dayFoods.length === 0) {
    list.innerHTML = `<p class="empty-state" style="margin:0">${isToday ? 'Brak posiłków dziś. Dodaj pierwszy!' : 'Brak posiłków w tym dniu.'}</p>`;
  } else {
    list.innerHTML = dayFoods.map(f => `
      <div class="food-item">
        <div>
          <div class="food-name">${escHtml(f.name)}</div>
          <div class="food-macros">B ${f.protein || 0} g · T ${f.fat || 0} g · W ${f.carbs || 0} g · ${f.calories || 0} kcal</div>
        </div>
        <button class="item-delete" data-food-id="${f.id}" title="Usuń">✕</button>
      </div>
    `).join('');
    list.querySelectorAll('[data-food-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        data.foods = (data.foods || []).filter(f => f.id !== btn.dataset.foodId);
        saveData();
        renderFoodLog();
        calcNutrition();
      });
    });
  }

  const totals = dayFoodTotals(selectedDate);
  const round1 = v => Math.round(v * 10) / 10;

  const totalsTitleEl = document.getElementById('food-totals-title');
  if (totalsTitleEl) {
    totalsTitleEl.textContent = isToday ? '🍽 Zjedzone dziś' : `🍽 Zjedzone (${selectedDate})`;
  }

  if (totalsEl) {
    totalsEl.innerHTML = `
      <div class="food-totals-row">
        <div class="nut-stat"><span>Białko</span><strong>${round1(totals.protein)} g</strong></div>
        <div class="nut-stat"><span>Tłuszcz</span><strong>${round1(totals.fat)} g</strong></div>
        <div class="nut-stat"><span>Węglowodany</span><strong>${round1(totals.carbs)} g</strong></div>
        <div class="nut-stat"><span>Razem</span><strong>${Math.round(totals.kcal)} kcal</strong></div>
      </div>
    `;
  }
}

function setupFoodForm() {
  const addBtn = document.getElementById('food-add-btn');
  if (!addBtn) return;

  const foodDateInput = document.getElementById('food-date');
  if (foodDateInput) {
    foodDateInput.value = getFoodLogDate();
    foodDateInput.addEventListener('change', () => {
      if (foodDateInput.value) {
        setFoodLogDate(foodDateInput.value);
      }
    });
  }

  // Inicjalizacja nawigacji po dniach
  renderFoodDateNav();

  const addFood = () => {
    const name = document.getElementById('food-name').value.trim();
    const protein = parseFloat(document.getElementById('food-protein').value) || 0;
    const fat = parseFloat(document.getElementById('food-fat').value) || 0;
    const carbs = parseFloat(document.getElementById('food-carbs').value) || 0;
    const calories = parseFloat(document.getElementById('food-calories').value) || 0;
    if (!name) { alert('Podaj nazwę posiłku.'); return; }
    if (calories === 0 && protein === 0 && fat === 0 && carbs === 0) {
      alert('Podaj przynajmniej kalorie albo makroskładniki.');
      return;
    }
    data.foods = data.foods || [];
    data.foods.push({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: getFoodLogDate(),  // zapisz dla wybranego dnia
      name, protein, fat, carbs, calories,
    });
    saveData();
    ['food-name', 'food-protein', 'food-fat', 'food-carbs', 'food-calories'].forEach(id => {
      document.getElementById(id).value = '';
    });
    document.getElementById('food-name').focus();
    renderFoodLog();
    calcNutrition();
  };
  addBtn.addEventListener('click', addFood);
  // Enter w dowolnym polu dodaje posiłek
  ['food-name', 'food-protein', 'food-fat', 'food-carbs', 'food-calories'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addFood(); } });
  });
  renderFoodLog();
}

// ============================================================
//  Plan view — tabela long run
// ============================================================
function renderPlanTable() {
  const tbody = document.getElementById('plan-longrun-table');
  if (!tbody) return;
  const currentWeek = getCurrentWeek();
  
  // Week 0 row (if applicable)
  let rows = '';
  if (currentWeek === 0) {
    rows += `<tr class="hl"><td>T0</td><td><strong>—</strong></td><td>Rozruch</td><td>Przygotowanie przed startem planu</td></tr>`;
  }
  
  rows += TRAINING_PLAN.map(p => {
    const isCurrent = p.week === currentWeek;
    const isPast = p.week < currentWeek;
    let rowClass = '';
    if (isCurrent) rowClass = ' class="hl"';
    else if (isPast) rowClass = ' class="done"';
    return `<tr${rowClass}>
      <td>T${p.week}</td>
      <td><strong>${p.longRunKm} km</strong></td>
      <td>${p.phase}</td>
      <td>${p.lrNote}</td>
    </tr>`;
  }).join('');
  
  tbody.innerHTML = rows;
}

// ============================================================
//  Plan view — tabela km dzień po dniu
// ============================================================
function renderWeeklyKmTable() {
  const tbody = document.getElementById('weekly-km-table');
  if (!tbody) return;
  const currentWeek = getCurrentWeek();

  const rows = WEEKLY_PLAN_KM.map(p => {
    const isCurrent = p.week === currentWeek;
    const isPast = p.week < currentWeek;
    let rowClass = '';
    if (isCurrent) rowClass = ' class="hl"';
    else if (isPast) rowClass = ' class="done"';
    return `<tr${rowClass}>
      <td>T${p.week}</td>
      <td>${p.wt} km</td>
      <td>${p['śr']} km</td>
      <td>${p.cz} km</td>
      <td><strong>${p.ndz} km</strong></td>
      <td><strong>${p.suma} km</strong></td>
      <td>${p.phase}</td>
    </tr>`;
  }).join('');

  tbody.innerHTML = rows;
}

// ============================================================
//  Charts
// ============================================================
function renderCharts() {
  const weeks = Array.from({ length: 12 }, (_, i) => `T${i + 1}`);

  // Helper: runs from a given week
  function weekRuns(w) { return filterByWeek(data.runs, w); }

  // Weekly volume
  const volumeData = weeks.map((_, i) => {
    const w = i + 1;
    return roundKm(weekRuns(w).reduce((s, r) => s + r.distance, 0));
  });

  // Weekly avg pace (from runs with distance > 0)
  const paceData = weeks.map((_, i) => {
    const w = i + 1;
    const runs = weekRuns(w).filter(r => r.distance > 0 && r.duration > 0);
    if (runs.length === 0) return null;
    const totalDist = runs.reduce((s, r) => s + r.distance, 0);
    const totalDur = runs.reduce((s, r) => s + r.duration, 0);
    return totalDur / totalDist;
  });

  // Weekly avg HR
  const hrData = weeks.map((_, i) => {
    const w = i + 1;
    const runs = weekRuns(w).filter(r => r.hr);
    if (runs.length === 0) return null;
    return Math.round(runs.reduce((s, r) => s + r.hr, 0) / runs.length);
  });

  // Weekly avg cadence
  const cadenceData = weeks.map((_, i) => {
    const w = i + 1;
    const runs = weekRuns(w).filter(r => r.cadence);
    if (runs.length === 0) return null;
    return Math.round(runs.reduce((s, r) => s + r.cadence, 0) / runs.length);
  });

  // Plan volume (weekly total km)
  const planVolume = WEEKLY_PLAN_KM.map(p => p.suma);

  createChart('chart-volume', 'bar', {
    labels: weeks,
    datasets: [
      {
        label: 'Wykonane (km)',
        data: volumeData,
        backgroundColor: 'rgba(108, 99, 255, 0.7)',
        borderColor: 'rgba(108, 99, 255, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Planowana suma (km)',
        data: planVolume,
        type: 'line',
        borderColor: 'rgba(251, 191, 36, 0.8)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false,
      }
    ]
  }, { scales: { y: { beginAtZero: true } } });

  const fmtPace = v => {
    if (v == null || isNaN(v)) return '—';
    const m = Math.floor(v);
    let s = Math.round((v - m) * 60);
    if (s === 60) return `${m + 1}:00`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };
  createChart('chart-pace', 'line', {
    labels: weeks,
    datasets: [{
      label: 'Średnie tempo (min/km)',
      data: paceData,
      borderColor: 'rgba(251, 191, 36, 1)',
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
    }]
  }, {
    scales: {
      x: { ticks: { color: '#8888aa', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
      y: {
        reverse: true,
        title: { display: true, text: 'min/km' },
        ticks: { color: '#8888aa', font: { size: 10 }, callback: v => fmtPace(v) },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
    },
    plugins: {
      legend: { labels: { color: '#8888aa', font: { size: 11 } } },
      tooltip: {
        callbacks: {
          label: ctx => `Średnie tempo: ${fmtPace(ctx.parsed.y)}/km`,
        },
      },
    },
  });

  createChart('chart-hr', 'line', {
    labels: weeks,
    datasets: [{
      label: 'Śr. tętno (bpm)',
      data: hrData,
      borderColor: 'rgba(248, 113, 113, 1)',
      backgroundColor: 'rgba(248, 113, 113, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
    }]
  }, {
    scales: { y: { title: { display: true, text: 'bpm' }, min: 120 } }
  });

  createChart('chart-cadence', 'line', {
    labels: weeks,
    datasets: [{
      label: 'Śr. kadencja (spm)',
      data: cadenceData,
      borderColor: 'rgba(74, 222, 128, 1)',
      backgroundColor: 'rgba(74, 222, 128, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: 4,
    }]
  }, {
    scales: { y: { title: { display: true, text: 'spm' }, min: 140 } }
  });

  // ---- Kalorie: ostatnie 14 dni (zjedzone vs spalone) ----
  const days = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(formatDateIso(d));
  }
  const fmtShortD = s => { const d = new Date(s + 'T00:00:00'); return `${d.getDate()}.${d.getMonth()+1}`; };
  const burnedDaily = days.map(day =>
    [...(data.runs || []), ...(data.strength || [])]
      .filter(x => x.date === day)
      .reduce((s, x) => s + (x.calories || 0), 0)
  );
  const eatenDaily = days.map(day =>
    (data.foods || []).filter(f => f.date === day)
      .reduce((s, f) => s + (f.calories || 0), 0)
  );
  let watchMap = {};
  try { watchMap = JSON.parse(localStorage.getItem('nutritionWatchTotals') || '{}'); } catch (e) { /* ignore */ }
  const watchDaily = days.map(day => watchMap[day] ? parseFloat(watchMap[day]) : null);

  const nutP = loadNutritionProfile();
  let baseNeed = null;
  if (parseFloat(nutP.weight) && parseFloat(nutP.height) && parseFloat(nutP.age)) {
    const bmr = Math.round(10 * parseFloat(nutP.weight) + 6.25 * parseFloat(nutP.height) - 5 * parseFloat(nutP.age) - 161);
    baseNeed = Math.round(bmr * (parseFloat(nutP.activity) || 1.375));
  }

  const calDatasets = [
    {
      label: 'Zjedzone (kcal)',
      data: eatenDaily,
      backgroundColor: 'rgba(251, 191, 36, 0.7)',
      borderColor: 'rgba(251, 191, 36, 1)',
      borderWidth: 1,
      borderRadius: 3,
    },
    {
      label: 'Spalone w treningach (kcal)',
      data: burnedDaily,
      backgroundColor: 'rgba(108, 99, 255, 0.7)',
      borderColor: 'rgba(108, 99, 255, 1)',
      borderWidth: 1,
      borderRadius: 3,
    },
    {
      label: '⌚ Zegarek (całkowite)',
      data: watchDaily,
      type: 'line',
      borderColor: 'rgba(74, 222, 128, 1)',
      backgroundColor: 'rgba(74, 222, 128, 0.1)',
      borderWidth: 2,
      pointRadius: 3,
      spanGaps: false,
      fill: false,
      tension: 0.2,
    },
  ];
  if (baseNeed !== null) {
    calDatasets.push({
      label: `Zapotrzebowanie bez treningów (${baseNeed} kcal)`,
      data: days.map(() => baseNeed),
      type: 'line',
      borderColor: 'rgba(148, 163, 184, 0.7)',
      borderDash: [6, 4],
      borderWidth: 1.5,
      pointRadius: 0,
      fill: false,
    });
  }
  createChart('chart-calories', 'bar', {
    labels: days.map(fmtShortD),
    datasets: calDatasets,
  }, {
    scales: { y: { beginAtZero: true } },
  });
}

function createChart(canvasId, type, data, opts = {}) {
  if (charts[canvasId]) {
    charts[canvasId].destroy();
  }
  const ctx = document.getElementById(canvasId).getContext('2d');
  charts[canvasId] = new Chart(ctx, {
    type,
    data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { labels: { color: '#8888aa', font: { size: 11 } } },
      },
      scales: {
        x: { ticks: { color: '#8888aa', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#8888aa', font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)' } },
      },
      ...opts,
    }
  });
}

// ============================================================
//  Backup — eksport/import danych
// ============================================================
function loadWatchTotals() {
  try { return JSON.parse(localStorage.getItem('nutritionWatchTotals') || '{}'); } catch (e) { return {}; }
}

function hasLocalData() {
  return ((data.runs || []).length || (data.strength || []).length || (data.foods || []).length) > 0;
}

function countLocalData() {
  return (data.runs || []).length + (data.strength || []).length + (data.foods || []).length;
}

function exportData() {
  const backup = {
    app: 'treningi-polkmaraton-krakow-2026',
    version: 1,
    exportedAt: new Date().toISOString(),
    data: data,
    nutritionProfile: loadNutritionProfile(),
    watchTotals: loadWatchTotals(),
    weeklyPlans: loadWeeklyPlans(),
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'treningi-kopia-' + todayStr() + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importFromFile(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const backup = JSON.parse(e.target.result);
      const d = backup && backup.data;
      if (!backup || typeof backup !== 'object' || !d || typeof d !== 'object' || Array.isArray(d)) {
        alert('To nie wygląda na plik kopii zapasowej tej aplikacji.');
        return;
      }
      if (!confirm('Import nadpisze obecne dane w tej przeglądarce. Kontynuować?')) {
        return;
      }
      data = {
        runs: backup.data.runs || [],
        strength: backup.data.strength || [],
        foods: backup.data.foods || [],
      };
      saveData();
      if (backup.nutritionProfile) saveNutritionProfile(backup.nutritionProfile);
      if (backup.watchTotals) localStorage.setItem('nutritionWatchTotals', JSON.stringify(backup.watchTotals));
      if (backup.weeklyPlans) saveWeeklyPlans(backup.weeklyPlans);
      alert('✅ Dane zaimportowane. Odświeżam widok...');
      location.reload();
    } catch (err) {
      alert('Błąd podczas importu: plik jest uszkodzony lub nieprawidłowy.');
    }
  };
  reader.readAsText(file);
}

function setupBackup() {
  const exportBtn = document.getElementById('export-data');
  const importBtn = document.getElementById('import-data');
  const fileInput = document.getElementById('import-file');
  if (!exportBtn || !importBtn || !fileInput) return;

  exportBtn.addEventListener('click', exportData);
  importBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;
    importFromFile(file);
    fileInput.value = '';
  });
}

function setupSyncGuide() {
  const openBtn = document.getElementById('sync-open-btn');
  const modal = document.getElementById('sync-modal');
  const closeBtn = document.getElementById('sync-modal-close');
  if (!openBtn || !modal) return;

  const openModal = () => {
    const statusEl = document.getElementById('sync-status');
    if (statusEl) {
      const count = countLocalData();
      if (count > 0) {
        statusEl.innerHTML = '✅ <strong>Na tym urządzeniu są dane</strong> (' + count + ' wpisów). Najpierw <strong>wyeksportuj</strong> je, potem przenieś plik na drugie urządzenie.';
      } else {
        statusEl.innerHTML = 'ℹ️ <strong>Na tym urządzeniu nie ma danych.</strong> Zaimportuj plik z drugiego urządzenia (przycisk „Importuj tu" poniżej).';
      }
    }
    modal.style.display = 'flex';
  };

  const closeModal = () => { modal.style.display = 'none'; };

  openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  const exportBtn = document.getElementById('sync-export-btn');
  const importBtn = document.getElementById('sync-import-btn');
  const fileInput = document.getElementById('import-file');
  if (exportBtn) exportBtn.addEventListener('click', exportData);
  if (importBtn) importBtn.addEventListener('click', () => fileInput.click());
}

// ============================================================
//  Auto-sync — dane same „podróżują” przez serwer
// ============================================================
const SYNC_URL = 'api/data';
const SYNC_STAMP_KEY = 'treningi-sync-stamp';

// Wysyła cały stan (treningi, posiłki, profil, plany) na serwer
function pushSnapshot() {
  try {
    const snap = {
      updatedAt: new Date().toISOString(),
      data: data,
      nutritionProfile: loadNutritionProfile(),
      watchTotals: loadWatchTotals(),
      weeklyPlans: loadWeeklyPlans(),
    };
    fetch(SYNC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(snap),
      keepalive: true,
    }).then(r => {
      if (r.ok) localStorage.setItem(SYNC_STAMP_KEY, snap.updatedAt);
    }).catch(() => { /* brak internetu — dane zostają lokalnie */ });
  } catch (e) { /* ignore */ }
}

function applySnapshot(snap) {
  const localFoods = (data && Array.isArray(data.foods)) ? data.foods : [];
  const serverFoods = (snap.data && Array.isArray(snap.data.foods)) ? snap.data.foods : [];
  
  // Połącz posiłki z serwera i lokalne (żadne nie giną)
  const mergedFoods = [...serverFoods];
  localFoods.forEach(lf => {
    if (!mergedFoods.some(sf => sf.id === lf.id)) {
      mergedFoods.push(lf);
    }
  });

  data = {
    runs: (snap.data && Array.isArray(snap.data.runs)) ? snap.data.runs : (data.runs || []),
    strength: (snap.data && Array.isArray(snap.data.strength)) ? snap.data.strength : (data.strength || []),
    foods: mergedFoods,
  };
  if (snap.data && snap.data.updatedAt) data.updatedAt = snap.data.updatedAt;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  if (snap.nutritionProfile) localStorage.setItem(NUTRITION_KEY, JSON.stringify(snap.nutritionProfile));
  if (snap.watchTotals) localStorage.setItem('nutritionWatchTotals', JSON.stringify(snap.watchTotals));
  if (snap.weeklyPlans) localStorage.setItem(WEEKLY_PLANS_KEY, JSON.stringify(snap.weeklyPlans));
}

// Przy starcie: pobiera dane z serwera i zasilaj widoki
function syncWithServer() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);
  fetch(SYNC_URL, { signal: controller.signal })
    .then(r => {
      clearTimeout(timer);
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    })
    .then(snap => {
      if (!snap || typeof snap !== 'object' || !snap.data) return;
      applySnapshot(snap);
      const serverAt = snap.updatedAt || new Date().toISOString();
      localStorage.setItem(SYNC_STAMP_KEY, serverAt);
      renderDashboard();
      renderHistory();
      renderFoodDateNav();
      renderFoodLog();
      calcNutrition();
    })
    .catch(() => { /* offline — zostajemy na danych lokalnych */ });
}

// ============================================================
//  History
// ============================================================
function setupHistory() {
  document.getElementById('clear-all').addEventListener('click', () => {
    if (confirm('Usunąć wszystkie treningi? Tej operacji nie można cofnąć.')) {
      data = { runs: [], strength: [], foods: [] };
      saveData();
      renderDashboard();
      renderHistory();
    }
  });

  document.getElementById('filter-type').addEventListener('change', renderHistory);
}

function renderHistory() {
  const filter = document.getElementById('filter-type').value;
  const list = document.getElementById('history-list');

  let items = [];
  if (filter === 'all' || filter === 'run') {
    items.push(...data.runs.map(r => ({ ...r, _type: 'run' })));
  }
  if (filter === 'all' || filter === 'strength') {
    items.push(...data.strength.map(s => ({ ...s, _type: 'strength' })));
  }

  items.sort((a, b) => b.date.localeCompare(a.date) || (a._type === 'run' ? -1 : 1));

  if (items.length === 0) {
    list.innerHTML = '<p class="empty-state">Brak treningów. Dodaj pierwszy!</p>';
    return;
  }

  list.innerHTML = items.map(item => {
    if (item._type === 'run') {
      return renderRunItem(item);
    } else {
      return renderStrengthItem(item);
    }
  }).join('');

  // Attach delete handlers
  list.querySelectorAll('[data-delete-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      try {
        const id = btn.dataset.deleteId;
        const type = btn.dataset.deleteType;
        if (type === 'run') {
          data.runs = data.runs.filter(r => r.id !== id);
        } else {
          data.strength = data.strength.filter(s => s.id !== id);
        }
        saveData();
        renderDashboard();
        renderHistory();
      } catch(err) {
        console.error('Błąd usuwania:', err);
        alert('Nie udało się usunąć: ' + err.message);
      }
    });
  });

  // Attach edit handlers
  list.querySelectorAll('[data-edit-id]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      try {
        const id = e.currentTarget.dataset.editId;
        const entry = data.runs.find(r => r.id === id);
        if (!entry) return;
        // Fill the form
        document.getElementById('run-edit-id').value = entry.id;
        document.getElementById('run-date').value = entry.date;
        document.getElementById('run-type').value = entry.type;
        document.getElementById('run-distance').value = entry.distance;
        const totalMin = entry.duration;
        const min = Math.floor(totalMin);
        const sec = Math.round((totalMin - min) * 60);
        document.getElementById('run-minutes').value = min;
        document.getElementById('run-seconds').value = sec;
        document.getElementById('run-hr').value = entry.hr || '';
        document.getElementById('run-cadence').value = entry.cadence || '';
        document.getElementById('run-calories').value = entry.calories || '';
        document.getElementById('run-notes').value = entry.notes || '';
        // Update UI
        document.getElementById('run-submit-btn').textContent = '✎ Zapisz zmiany';
        document.getElementById('run-cancel-edit').style.display = '';
        document.querySelector('[data-view="run-log"]').click();
      } catch(err) {
        console.error('Błąd edycji:', err);
        alert('Nie udało się edytować: ' + err.message);
      }
    });
  });
}

function renderRunItem(run) {
  const typeLabels = {
    'easy': 'Easy',
    'tempo': 'Tempo / Progresywny',
    'long-run': 'Long Run',
    'striders': 'Stridery',
    'other': 'Inny',
  };
  const hrStr = run.hr ? ` · ❤️ ${run.hr} bpm` : '';
  const cadStr = run.cadence ? ` · 🔄 ${run.cadence} spm` : '';
  const kcalStr = run.calories ? ` · 🔥 ${run.calories} kcal` : '';
  const notesStr = run.notes ? `<br><span style="font-size:0.85rem;color:#666">${run.notes}</span>` : '';

  return `
    <div class="history-item">
      <div class="item-main">
        <div class="item-date">${formatDate(run.date)}</div>
        <div class="item-title">
          <span class="run-badge ${run.type}">${typeLabels[run.type] || run.type}</span>
          ${run.distance} km w ${formatDuration(run.duration)}
          (${calcPace(run.duration, run.distance)})
        </div>
        <div class="item-details">${hrStr}${cadStr}${kcalStr}${notesStr}</div>
      </div>
      <div class="item-actions">
        <button class="item-edit" data-edit-id="${run.id}" data-edit-type="run" title="Edytuj">✎</button>
        <button class="item-delete" data-delete-id="${run.id}" data-delete-type="run" title="Usuń">✕</button>
      </div>
    </div>
  `;
}

function renderStrengthItem(s) {
  const sessionLabels = {
    'siła-a': 'Siła A (dół + plecy/barki)',
    'siła-b': 'Siła B (dół + klatka/ramiona)',
  };

  // Normalize exercises — support both old (flat) and new (per-set) formats
  const exercisesStr = s.exercises.map(ex => {
    let setsHTML;
    if (ex.sets && Array.isArray(ex.sets) && ex.sets.length > 0) {
      // New format: individual sets
      const setStrs = ex.sets.map((set, i) => {
        const parts = [];
        if (set.weight) parts.push(`${set.weight} kg`);
        if (set.reps) parts.push(`${set.reps} powt.`);
        if (set.rir !== null && set.rir !== undefined) parts.push(`RIR ${set.rir}`);
        return `S${i + 1}: ${parts.join(', ')}`;
      }).join(' | ');
      setsHTML = `<span class="set-detail">${setStrs}</span>`;
    } else {
      // Old format: flat weight/sets/reps/rir
      const parts = [];
      if (ex.weight) parts.push(`${ex.weight} kg`);
      if (ex.sets) parts.push(`${ex.sets} serie`);
      if (ex.reps) parts.push(`${ex.reps} powt.`);
      if (ex.rir !== null && ex.rir !== undefined) parts.push(`RIR ${ex.rir}`);
      setsHTML = parts.length > 0 ? `<span class="set-detail">${parts.join(', ')}</span>` : '';
    }
    return `<div style="font-size:0.85rem;margin-bottom:4px">• ${ex.label || ex.name} ${setsHTML}</div>`;
  }).join('');

  return `
    <div class="history-item">
      <div class="item-main">
        <div class="item-date">${formatDate(s.date)}</div>
        <div class="item-title">
          <span class="strength-badge">🏋️</span>
          ${sessionLabels[s.session] || s.session}
          ${s.duration ? ` · ⏱ ${formatDuration(s.duration)}` : ''}${s.calories ? ` · 🔥 ${s.calories} kcal` : ''}
        </div>
        <div class="item-details">${exercisesStr}</div>
      </div>
      <button class="item-delete" data-delete-id="${s.id}" data-delete-type="strength" title="Usuń">✕</button>
    </div>
  `;
}

// ============================================================
//  LLM Prompt Generator
// ============================================================
function generateLLMPrompt() {
  const now = new Date();
  
  // User profile (hardcoded based on the plan)
  const userInfo = `
- Płeć: kobieta
- Cel: Półmaraton Kraków 2026 (11.10.2026)
- Cel czasowy: 2:22–2:25 (tempo 6:44–6:52/km)
- Aktualny PB: 2:34:11 (7:18/km)
- Staż siłowy: 4 lata
- Główna dyscyplina: bieganie
- Dni treningowe: Wt (easy + siła A), Śr (easy + pilates), Cz (akcent tempowy), Pt (siła B), Ndz (long run)
- Dni wolne: Pon, Sob
- Ograniczenia: brak przysiadu bilateralnego ciężkiego w bloku biegania; siła chroni long run`;
  
  // Current training phase and week
  const planStart = new Date('2026-07-20');
  const daysSinceStart = Math.floor((now - planStart) / (1000 * 60 * 60 * 24));
  const currentWeek = Math.min(12, Math.max(1, Math.floor(daysSinceStart / 7) + 1));
  const planEntry = TRAINING_PLAN[currentWeek - 1] || TRAINING_PLAN[TRAINING_PLAN.length - 1];
  const phaseInfo = `Tydzie\u0144 ${currentWeek}/${TRAINING_PLAN.length} — faza: ${planEntry.phase}
- Long run w tym tygodniu: ${planEntry.longRunKm} km
- Uwagi: ${planEntry.lrNote}
- Kadencja: ${planEntry.cadence}`;
  
  // Last 14 days of runs
  const fourteenDaysAgo = new Date(now);
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  const recentRuns = (data.runs || [])
    .filter(r => new Date(r.date) >= fourteenDaysAgo)
    .sort((a, b) => a.date.localeCompare(b.date));
  
  let runsStr = 'Brak';
  if (recentRuns.length > 0) {
    runsStr = recentRuns.map(r => {
      const dist = r.distance ? `${r.distance} km` : '—';
      const time = r.minutes ? `${r.minutes}:${String(r.seconds || 0).padStart(2, '0')}` : '—';
      let pace = '—';
      if (r.distance && r.minutes) {
        const paceMin = Math.floor(r.minutes / r.distance);
        const paceSec = Math.round((r.minutes / r.distance % 1) * 60);
        pace = `${paceMin}:${String(paceSec).padStart(2, '0')}`;
      }
      const hr = r.hr ? `HR ${r.hr} bpm` : '';
      const cad = r.cadence ? `kadencja ${r.cadence} spm` : '';
      const kcal = r.calories ? `${r.calories} kcal` : '';
      const notes = r.notes ? `— ${r.notes}` : '';
      return `  ${r.date} | ${r.type} | ${dist} | ${time} | ${pace}/km | ${hr} ${cad} ${kcal} ${notes}`.trim();
    }).join('\n');
  }
  
  // Last 14 days of strength
  const recentStrength = (data.strength || [])
    .filter(s => new Date(s.date) >= fourteenDaysAgo)
    .sort((a, b) => a.date.localeCompare(b.date));
  
  let strengthStr = 'Brak';
  if (recentStrength.length > 0) {
    const sessionLabels = {
      'si\u0142a-a': 'Si\u0142a A (d\u00f3\u0142 + plecy/barki)',
      'si\u0142a-b': 'Si\u0142a B (d\u00f3\u0142 + klatka/ramiona)',
    };
    strengthStr = recentStrength.map(s => {
      const label = sessionLabels[s.session] || s.session;
      const timeStr = s.duration ? `⏱ ${formatDuration(s.duration)}` : '';
      const kcalStr = s.calories ? `${s.calories} kcal` : '';
      const meta = [timeStr, kcalStr].filter(Boolean).join(' ');
      const exStr = (s.exercises || []).map(ex => {
        const setsStr = (ex.sets || []).map(set => {
          let parts = [];
          if (set.weight !== null && set.weight !== undefined) parts.push(`${set.weight} kg`);
          if (set.reps !== null && set.reps !== undefined) parts.push(`${set.reps} powt.`);
          if (set.rir !== null && set.rir !== undefined) parts.push(`RIR ${set.rir}`);
          return parts.join(', ');
        }).join('; ');
        return `${ex.label || ex.name}: [${setsStr}]`;
      }).join(' | ');
      return `  ${s.date} | ${label}${meta ? ' | ' + meta : ''} | ${exStr}`;
    }).join('\n');
  }
  
  const prompt = `Jeste\u015b ekspertem od treningu biegowego i si\u0142owego dla amatorek. Na podstawie poni\u017cszych danych zaproponuj **konkretne pomys\u0142y na treningi** (g\u0142\u00f3wnie biegowe, ale te\u017c si\u0142owe) na najbli\u017cszy tydzie\u0144.

=== PROFIL ZAWODNICZKI ===
${userInfo}

=== AKTUALNA FAZA TRENINGOWA ===
${phaseInfo}

=== OSTATNIE TRENINGI BIEGOWE (14 dni) ===
${runsStr}

=== OSTATNIE TRENINGI SI\u0141OWE (14 dni) ===
${strengthStr}

=== CO MAM ZAPROPONOWA\u0106 ===
1. **Biegi**: konkretne jednostki na ka\u017cdy dzie\u0144 biegowy (wt, \u015br, cz, ndz) — podaj dystans, tempo/docelowe tempo, HR, ewentualne akcenty, rozgrzewk\u0119/wyciszenie. Uwzgl\u0119dnij aktualn\u0105 faz\u0119 treningow\u0105 i ostatnie obci\u0105\u017cenia.
2. **Si\u0142a**: ewentualne modyfikacje w Si\u0142a A i Si\u0142a B — zmiana \u0107wicze\u0144, progresja ci\u0119\u017caru, zmiana RIR, dodanie/zdj\u0119cie serii.
3. **Regeneracja**: sugestie dotycz\u0105ce mobilno\u015bci, pilatesu, od\u017cywiania w kontek\u015bcie nadchodz\u0105cego tygodnia.

Daj odpowied\u017a w formie gotowego planu tygodniowego, z kr\u00f3tkim uzasadnieniem ka\u017cdej zmiany.`;

  return prompt;
}

let llmPromptDirty = false;

function refreshLLMPrompt() {
  const textarea = document.getElementById('llm-prompt');
  if (!textarea) return;
  // Nie nadpisuj edycji użytkownika przy automatycznym odświeżeniu (np. wejście na zakładkę Plan)
  if (llmPromptDirty) return;
  textarea.value = generateLLMPrompt();
}

// ============================================================
//  Nowe funkcje: Odliczanie, Tracker Butów, Kalkulatory, PR
// ============================================================
function ensureDefaultShoes() {
  if (!data.shoes || !Array.isArray(data.shoes) || data.shoes.length === 0) {
    data.shoes = [
      { id: 'shoe-1', name: 'Asics Novablast 4', mileage: 145, maxMileage: 600 },
      { id: 'shoe-2', name: 'Nike Pegasus 40', mileage: 380, maxMileage: 600 },
      { id: 'shoe-3', name: 'Nike Vaporfly 3 (Carbon)', mileage: 42, maxMileage: 400 }
    ];
  }
}

function renderShoeTracker() {
  ensureDefaultShoes();
  const container = document.getElementById('shoe-list');
  if (!container) return;

  container.innerHTML = data.shoes.map(shoe => {
    const pct = Math.min(100, Math.round((shoe.mileage / shoe.maxMileage) * 100));
    let badgeClass = 'good';
    let statusText = 'Dobry';
    if (pct >= 85) {
      badgeClass = 'replace';
      statusText = 'Do wymiany';
    } else if (pct >= 60) {
      badgeClass = 'warning';
      statusText = 'Używane';
    }
    return `
      <div class="shoe-card">
        <div class="shoe-header">
          <span class="shoe-name">👟 ${shoe.name}</span>
          <span class="shoe-badge ${badgeClass}">${statusText}</span>
        </div>
        <div class="shoe-progress-bar">
          <div class="shoe-progress-fill" style="width: ${pct}%"></div>
        </div>
        <div class="shoe-stats">
          <span>Przebieg: ${shoe.mileage} km / ${shoe.maxMileage} km</span>
          <span>${pct}%</span>
        </div>
      </div>
    `;
  }).join('');
}

function populateShoeSelect() {
  ensureDefaultShoes();
  const select = document.getElementById('run-shoe');
  if (!select) return;
  select.innerHTML = `<option value="">-- Wybierz buty (opcjonalnie) --</option>` +
    data.shoes.map(s => `<option value="${s.id}">${s.name} (${s.mileage}km)</option>`).join('');
}

function updateCountdownTimer() {
  const raceDate = new Date('2026-10-11T09:00:00+02:00').getTime();
  const now = new Date().getTime();
  const diff = raceDate - now;

  if (diff <= 0) {
    ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '0';
    });
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);

  const elDays = document.getElementById('cd-days');
  const elHours = document.getElementById('cd-hours');
  const elMin = document.getElementById('cd-minutes');
  const elSec = document.getElementById('cd-seconds');

  if (elDays) elDays.textContent = d;
  if (elHours) elHours.textContent = h;
  if (elMin) elMin.textContent = m;
  if (elSec) elSec.textContent = s;
}

function setupSplitCalculator() {
  const targetSelect = document.getElementById('split-target-time');
  const stratSelect = document.getElementById('split-strategy');
  if (!targetSelect || !stratSelect) return;

  const renderSplits = () => {
    const target = targetSelect.value;
    const strat = stratSelect.value;
    let totalSec = 142 * 60; // 2:22:00
    if (target === '2:25:00') totalSec = 145 * 60;
    if (target === '2:19:00') totalSec = 139 * 60;

    const basePaceSec = totalSec / 21.0975;
    const body = document.getElementById('split-table-body');
    if (!body) return;

    let html = '';
    let accumSec = 0;

    for (let km = 1; km <= 21; km++) {
      let kmPaceSec = basePaceSec;
      if (strat === 'negative') {
        if (km <= 5) kmPaceSec = basePaceSec + 15;
        else if (km >= 16) kmPaceSec = basePaceSec - 10;
      }
      accumSec += kmPaceSec;

      const isHighlight = [5, 10, 15, 20].includes(km);
      const minPace = Math.floor(kmPaceSec / 60);
      const secPace = Math.round(kmPaceSec % 60);
      const pStr = `${minPace}:${secPace.toString().padStart(2, '0')}/km`;

      const accH = Math.floor(accumSec / 3600);
      const accM = Math.floor((accumSec % 3600) / 60);
      const accS = Math.round(accumSec % 60);
      const timeStr = `${accH > 0 ? accH + ':' : ''}${accM.toString().padStart(2, '0')}:${accS.toString().padStart(2, '0')}`;

      html += `
        <tr class="${isHighlight ? 'hl' : ''}">
          <td><strong>${km} km</strong></td>
          <td>${isHighlight ? `Punkt ${km} KM` : 'Odcinek'}</td>
          <td>${pStr}</td>
          <td><strong>${timeStr}</strong></td>
        </tr>
      `;
    }

    // Meta 21.1 km
    const finalSec = totalSec;
    const fH = Math.floor(finalSec / 3600);
    const fM = Math.floor((finalSec % 3600) / 60);
    const fS = Math.round(finalSec % 60);
    html += `
      <tr class="hl" style="background:var(--accent-gradient);color:#fff;">
        <td><strong>21.1 KM (META)</strong></td>
        <td>Meta Półmaratonu</td>
        <td>—</td>
        <td><strong>${fH}:${fM.toString().padStart(2, '0')}:${fS.toString().padStart(2, '0')}</strong></td>
      </tr>
    `;

    body.innerHTML = html;
  };

  targetSelect.addEventListener('change', renderSplits);
  stratSelect.addEventListener('change', renderSplits);
  renderSplits();
}

function setupFuelingPlanner() {
  const durInput = document.getElementById('fuel-duration');
  const carbSelect = document.getElementById('fuel-carbs-rate');
  const out = document.getElementById('fuel-timeline-output');
  if (!durInput || !carbSelect || !out) return;

  const renderFueling = () => {
    const dur = parseInt(durInput.value) || 120;
    const gelsCount = Math.floor((dur - 30) / 35);
    let html = `
      <div class="timeline-item">
        <strong>🥣 2 godziny przed biegiem:</strong> Śniadanie lekkostrawne (~1-2g węglowodanów / kg) + 300 ml wody.
      </div>
      <div class="timeline-item">
        <strong>💧 15 minut przed:</strong> 150–200 ml wody / lekki izotonik.
      </div>
    `;

    let time = 45;
    let gelIndex = 1;
    while (time < dur - 15) {
      html += `
        <div class="timeline-item" style="border-left-color: var(--mint);">
          <strong>⚡ Minuta ${time}:</strong> Żel #${gelIndex} (~25g węgli) + 150ml czystej wody.
        </div>
      `;
      time += 35;
      gelIndex++;
    }

    html += `
      <div class="timeline-item" style="border-left-color: var(--amber);">
        <strong>🏁 Po biegu (do 30 min):</strong> Shake białkowy + banan / posiłek regeneracyjny (20-30g białka + 60g węgli) + 500 ml płynów.
      </div>
      <div style="margin-top:12px;font-size:0.9rem;color:var(--accent-light);font-weight:700;">
        💡 Łącznie potrzebujesz na ten bieg: ${Math.max(1, gelIndex - 1)} żeli oraz ok. ${(dur / 60 * 0.4).toFixed(1)}L wody.
      </div>
    `;

    out.innerHTML = html;
  };

  durInput.addEventListener('input', renderFueling);
  carbSelect.addEventListener('change', renderFueling);
  renderFueling();
}

function setupFitatuCloning() {
  const btn = document.getElementById('food-clone-yesterday-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const curDateStr = currentFoodDate;
    const curDate = parseDateIso(curDateStr);
    const yesterday = new Date(curDate);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatDateIso(yesterday);

    const yesterdayFoods = (data.foods || []).filter(f => f.date === yesterdayStr);
    if (yesterdayFoods.length === 0) {
      alert(`Brak posiłków z dnia wczorajszego (${formatDate(yesterdayStr)}) do sklonowania.`);
      return;
    }

    yesterdayFoods.forEach(f => {
      data.foods.push({
        id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
        date: curDateStr,
        name: f.name,
        protein: f.protein,
        fat: f.fat,
        carbs: f.carbs,
        calories: f.calories
      });
    });

    saveData();
    renderFoodList();
    renderNutritionCard();
  });
}

function renderStrengthPRs() {
  const container = document.getElementById('strength-pr-container');
  if (!container) return;

  const prs = {};
  (data.strength || []).forEach(session => {
    (session.exercises || []).forEach(ex => {
      const name = ex.label || ex.name;
      (ex.sets || []).forEach(set => {
        const w = parseFloat(set.weight) || 0;
        if (w > 0) {
          if (!prs[name] || w > prs[name].weight) {
            prs[name] = { weight: w, reps: set.reps, date: session.date };
          }
        }
      });
    });
  });

  const keys = Object.keys(prs);
  if (keys.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted);font-size:0.9rem;">Brak zalogowanych ciężarów w treningach siłowych. Zaloguj pierwszy trening ze sztangą/hantlami!</p>`;
    return;
  }

  container.innerHTML = keys.map(k => `
    <div class="pr-card">
      <div class="pr-title">🏆 ${k.toUpperCase()}</div>
      <div class="pr-value">${prs[k].weight} kg</div>
      <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px;">${prs[k].reps} powt. (${prs[k].date})</div>
    </div>
  `).join('');
}

function setupPrintAndICS() {
  const printBtn = document.getElementById('print-plan-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  const icsBtn = document.getElementById('export-ics-btn');
  if (icsBtn) {
    icsBtn.addEventListener('click', () => {
      let ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Treningi Krakow 2026//PL',
        'CALSCALE:GREGORIAN'
      ];

      TRAINING_PLAN.forEach(item => {
        const range = getWeekRange(item.week);
        const dt = range.end.replace(/-/g, '');
        ics.push(
          'BEGIN:VEVENT',
          `SUMMARY:🏃 Long Run ${item.longRunKm} km (Tydzień ${item.week})`,
          `DESCRIPTION:Faza: ${item.phase}. Uwagi: ${item.lrNote}`,
          `DTSTART:${dt}T090000Z`,
          `DTEND:${dt}T110000Z`,
          'END:VEVENT'
        );
      });

      ics.push('END:VCALENDAR');

      const blob = new Blob([ics.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'treningi-krakow-2026.ics';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
}
