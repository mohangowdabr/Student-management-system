/* =====================================================
   STUDYFLOW — app.js
   Personal Study Management System
   ===================================================== */

// ─── QUOTES DATABASE (50+ motivational quotes) ───────
const QUOTES = [
  // SUCCESS
  { t:"The secret of getting ahead is getting started.", a:"Mark Twain", c:"success" },
  { t:"Success is not final, failure is not fatal: it is the courage to continue that counts.", a:"Winston Churchill", c:"success" },
  { t:"The only way to do great work is to love what you do.", a:"Steve Jobs", c:"success" },
  { t:"Don't watch the clock; do what it does. Keep going.", a:"Sam Levenson", c:"success" },
  { t:"Success is the sum of small efforts, repeated day in and day out.", a:"Robert Collier", c:"success" },
  { t:"Dream big. Start small. Act now.", a:"Robin Sharma", c:"success" },
  { t:"You don't have to be great to start, but you have to start to be great.", a:"Zig Ziglar", c:"success" },
  { t:"Push yourself, because no one else is going to do it for you.", a:"Anonymous", c:"success" },
  { t:"Your future is created by what you do today, not tomorrow.", a:"Robert Kiyosaki", c:"success" },
  { t:"Opportunities don't happen. You create them.", a:"Chris Grosser", c:"success" },
  { t:"There is no substitute for hard work.", a:"Thomas Edison", c:"success" },
  // LEARNING
  { t:"Education is the most powerful weapon which you can use to change the world.", a:"Nelson Mandela", c:"learning" },
  { t:"Live as if you were to die tomorrow. Learn as if you were to live forever.", a:"Mahatma Gandhi", c:"learning" },
  { t:"An investment in knowledge pays the best interest.", a:"Benjamin Franklin", c:"learning" },
  { t:"The more that you read, the more things you will know.", a:"Dr. Seuss", c:"learning" },
  { t:"The beautiful thing about learning is nobody can take it away from you.", a:"B.B. King", c:"learning" },
  { t:"The expert in anything was once a beginner.", a:"Helen Hayes", c:"learning" },
  { t:"Study while others are sleeping. Work while others are loafing.", a:"William A. Ward", c:"learning" },
  { t:"Education is not the filling of a pail, but the lighting of a fire.", a:"W.B. Yeats", c:"learning" },
  { t:"Knowledge is the new currency — invest wisely.", a:"Anonymous", c:"learning" },
  { t:"Learning is not attained by chance; it must be sought with ardor and diligence.", a:"Abigail Adams", c:"learning" },
  // PERSEVERANCE
  { t:"It does not matter how slowly you go as long as you do not stop.", a:"Confucius", c:"perseverance" },
  { t:"Fall seven times, stand up eight.", a:"Japanese Proverb", c:"perseverance" },
  { t:"Energy and persistence conquer all things.", a:"Benjamin Franklin", c:"perseverance" },
  { t:"Champions keep playing until they get it right.", a:"Billie Jean King", c:"perseverance" },
  { t:"Believe you can and you're halfway there.", a:"Theodore Roosevelt", c:"perseverance" },
  { t:"Perseverance is not a long race; it is many short races one after the other.", a:"Walter Elliot", c:"perseverance" },
  { t:"Don't stop when you're tired. Stop when you're done.", a:"Anonymous", c:"perseverance" },
  { t:"Little by little, a little becomes a lot.", a:"Tanzanian Proverb", c:"perseverance" },
  { t:"The harder you work for something, the greater you'll feel when you achieve it.", a:"Anonymous", c:"perseverance" },
  { t:"Success is walking from failure to failure with no loss of enthusiasm.", a:"Winston Churchill", c:"perseverance" },
  // MINDSET
  { t:"Whether you think you can or you think you can't, you're right.", a:"Henry Ford", c:"mindset" },
  { t:"The mind is everything. What you think you become.", a:"Buddha", c:"mindset" },
  { t:"You are braver than you believe, stronger than you seem, and smarter than you think.", a:"A.A. Milne", c:"mindset" },
  { t:"It always seems impossible until it's done.", a:"Nelson Mandela", c:"mindset" },
  { t:"The only limit to our realization of tomorrow will be our doubts of today.", a:"Franklin D. Roosevelt", c:"mindset" },
  { t:"Strive for progress, not perfection.", a:"Anonymous", c:"mindset" },
  { t:"Great things never come from comfort zones.", a:"Anonymous", c:"mindset" },
  { t:"Once you replace negative thoughts with positive ones, you'll start having positive results.", a:"Willie Nelson", c:"mindset" },
  { t:"Optimism is the faith that leads to achievement.", a:"Helen Keller", c:"mindset" },
  { t:"Your mind is a powerful thing. Fill it with positive thoughts.", a:"Anonymous", c:"mindset" },
  { t:"All our dreams can come true, if we have the courage to pursue them.", a:"Walt Disney", c:"mindset" },
  // FOCUS
  { t:"Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.", a:"Alexander Graham Bell", c:"focus" },
  { t:"The successful warrior is the average man, with laser-like focus.", a:"Bruce Lee", c:"focus" },
  { t:"Always remember, your focus determines your reality.", a:"George Lucas", c:"focus" },
  { t:"Where focus goes, energy flows.", a:"Tony Robbins", c:"focus" },
  { t:"The key to success is to focus on goals, not obstacles.", a:"Anonymous", c:"focus" },
  { t:"Lack of direction, not lack of time, is the problem. We all have 24-hour days.", a:"Zig Ziglar", c:"focus" },
  { t:"What you stay focused on will grow.", a:"Roy T. Bennett", c:"focus" },
  { t:"One reason so few of us achieve what we truly want is that we never direct our focus.", a:"Tony Robbins", c:"focus" },
  { t:"Focus on being productive instead of being busy.", a:"Tim Ferriss", c:"focus" },
  { t:"You can't reach your potential by remaining in a past due season. Focus forward.", a:"T.D. Jakes", c:"focus" },
];

// Category colors
const CAT_COLORS = {
  success: "#ffd93d", learning: "#3dd9d9",
  perseverance: "#ff6b9d", mindset: "#7c6bff", focus: "#00d4aa",
};

// Achievements definition
const ACHIEVEMENTS = [
  { id:"first_task",  emoji:"🥉", name:"First Step",    desc:"Complete your first task",      check: d => d.tasks.filter(t=>t.done).length >= 1 },
  { id:"five_tasks",  emoji:"🥈", name:"Task Warrior",  desc:"Complete 5 tasks",              check: d => d.tasks.filter(t=>t.done).length >= 5 },
  { id:"ten_tasks",   emoji:"🥇", name:"Task Master",   desc:"Complete 10 tasks",             check: d => d.tasks.filter(t=>t.done).length >= 10 },
  { id:"first_pom",   emoji:"⏱️", name:"First Focus",   desc:"Complete 1 Pomodoro session",   check: d => d.totalSessions >= 1 },
  { id:"ten_pom",     emoji:"🎯", name:"Focus Master",  desc:"Complete 10 sessions",          check: d => d.totalSessions >= 10 },
  { id:"five_subj",   emoji:"📚", name:"Scholar",       desc:"Add 5 subjects",                check: d => d.subjects.length >= 5 },
  { id:"streak3",     emoji:"🔥", name:"On Fire",       desc:"3-day study streak",            check: d => d.streak >= 3 },
  { id:"streak7",     emoji:"💎", name:"Diamond Mind",  desc:"7-day study streak",            check: d => d.streak >= 7 },
];

// ─── APP STATE ────────────────────────────────────────
let state = {
  userName: "",
  tasks: [],
  subjects: [],
  notes: [],
  streak: 0,
  lastStudyDate: "",
  sessions: {},     // { 'YYYY-MM-DD': count }
  totalSessions: 0,
  currentTaskFilter: "all",
  currentQuoteFilter: "all",
  selectedNoteColor: "#7c6bff",
};

// Timer state
let timer = {
  mode: "focus", mins: 25, secs: 0, running: false,
  interval: null, session: 0, totalTime: 25 * 60,
};

// ─── PERSISTENCE ─────────────────────────────────────
function saveState() {
  localStorage.setItem("studyflow_v2", JSON.stringify(state));
}
function loadState() {
  const raw = localStorage.getItem("studyflow_v2");
  if (raw) {
    try { Object.assign(state, JSON.parse(raw)); } catch(e) {}
  }
}

// ─── INIT ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initParticles();
  initClock();
  initNavigation();
  updateStreak();

  if (!state.userName) {
    document.getElementById("welcome-modal").classList.add("show");
  } else {
    bootApp();
  }
  // Enter key on welcome input
  document.getElementById("user-name-input").addEventListener("keydown", e => {
    if (e.key === "Enter") saveUserName();
  });
});

function bootApp() {
  initFloatingEmojis();
  renderDailyQuote();
  renderDashboard();
  renderTasks();
  renderSubjects();
  renderNotes();
  renderQuotes();
  renderStats();
  updateTimerFocusQuote();
  updateNavBadge();
  updateSidebarStreak();
}

function saveUserName() {
  const val = document.getElementById("user-name-input").value.trim();
  if (!val) { showToast("Please enter your name 😊", "error"); return; }
  state.userName = val;
  saveState();
  document.getElementById("welcome-modal").classList.remove("show");
  bootApp();
  showToast(`Welcome, ${val}! Let's study hard! 🚀`, "success");
}

// ─── PARTICLES ───────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let W, H, particles = [];
  let mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);
  document.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  function randBetween(a, b) { return a + Math.random() * (b - a); }
  for (let i = 0; i < 70; i++) {
    particles.push({
      x: randBetween(0, W || 1200), y: randBetween(0, H || 800),
      vx: randBetween(-0.3, 0.3), vy: randBetween(-0.3, 0.3),
      r: randBetween(1, 2.5), hue: randBetween(220, 280),
      op: randBetween(0.2, 0.6),
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      // Mouse repulsion
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        p.vx += (dx / dist) * 0.05;
        p.vy += (dy / dist) * 0.05;
      }
      p.vx *= 0.99; p.vy *= 0.99;
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},70%,70%,${p.op})`;
      ctx.fill();
    });
    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124,107,255,${(1 - d/110) * 0.15})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ─── FLOATING EMOJIS ─────────────────────────────────
function initFloatingEmojis() {
  const container = document.getElementById("qh-floats");
  if (!container) return;
  container.innerHTML = "";
  const emojis = ["⭐","💫","✨","🌟","📚","💡","🎯","🔥","⚡","🎓","🏆","💎"];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement("div");
    el.className = "float-emoji";
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      left: ${Math.random()*100}%;
      top: ${Math.random()*100}%;
      --dur: ${6 + Math.random()*8}s;
      --del: -${Math.random()*8}s;
    `;
    container.appendChild(el);
  }
}

// ─── CLOCK & GREETING ────────────────────────────────
function initClock() {
  function tick() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,"0");
    const m = String(now.getMinutes()).padStart(2,"0");
    const s = String(now.getSeconds()).padStart(2,"0");
    const el = document.getElementById("clock");
    if (el) el.textContent = `${h}:${m}:${s}`;

    const hour = now.getHours();
    let greet = "Good Morning";
    if (hour >= 12 && hour < 17) greet = "Good Afternoon";
    else if (hour >= 17 && hour < 21) greet = "Good Evening";
    else if (hour >= 21) greet = "Good Night";

    const name = state.userName ? `, ${state.userName}` : "";
    const emojis = { "Good Morning":"☀️", "Good Afternoon":"🌤️", "Good Evening":"🌙", "Good Night":"⭐" };
    const greetEl = document.getElementById("greeting");
    if (greetEl) greetEl.textContent = `${greet}${name}! ${emojis[greet]}`;

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const dateEl = document.getElementById("date-str");
    if (dateEl) dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
  }
  tick(); setInterval(tick, 1000);
}

// ─── NAVIGATION ──────────────────────────────────────
function initNavigation() {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      switchPage(link.dataset.page);
    });
  });
  document.querySelectorAll("[data-tf]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-tf]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentTaskFilter = btn.dataset.tf;
      renderTasks();
    });
  });
  document.querySelectorAll("[data-qc]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-qc]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.currentQuoteFilter = btn.dataset.qc;
      renderQuotes();
    });
  });
  document.querySelectorAll(".mode-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      if (timer.running) return;
      document.querySelectorAll(".mode-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      timer.mode = btn.dataset.mode;
      timer.mins = parseInt(btn.dataset.mins);
      timer.secs = 0;
      timer.totalTime = timer.mins * 60;
      updateTimerDisplay();
      resetTimerRing();
      const labels = { focus:"Focus Time", short:"Short Break ☕", long:"Long Break 🛋️" };
      document.getElementById("timer-mode-lbl").textContent = labels[timer.mode];
    });
  });
  document.querySelectorAll(".cc").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".cc").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.selectedNoteColor = btn.dataset.c;
    });
  });
}

function switchPage(name) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
  const page = document.getElementById(`page-${name}`);
  if (page) page.classList.add("active");
  const link = document.querySelector(`[data-page="${name}"]`);
  if (link) link.classList.add("active");
  // Re-render on switch
  if (name === "dashboard") renderDashboard();
  if (name === "stats") renderStats();
}
function switchPage2(n) { switchPage(n); } // alias

// ─── STREAK ──────────────────────────────────────────
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function yesterdayStr() {
  const d = new Date(Date.now() - 86400000);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function updateStreak() {
  const today = todayStr();
  const yest = yesterdayStr();
  if (state.lastStudyDate === today) { /* already counted */ }
  else if (state.lastStudyDate === yest) { state.streak += 1; state.lastStudyDate = today; saveState(); }
  else if (state.lastStudyDate !== today) { /* streak continues only if we study today */ }
  updateSidebarStreak();
}
function markStudied() {
  const today = todayStr();
  const yest = yesterdayStr();
  if (state.lastStudyDate === today) return;
  if (state.lastStudyDate === yest) state.streak += 1;
  else if (state.lastStudyDate !== today) state.streak = state.lastStudyDate ? 1 : (state.streak || 1);
  state.lastStudyDate = today;
  saveState();
  updateSidebarStreak();
}
function updateSidebarStreak() {
  const el = document.getElementById("sb-streak");
  if (el) el.textContent = state.streak;
}

// ─── DASHBOARD ───────────────────────────────────────
function renderDashboard() {
  const today = todayStr();
  const doneTasks = state.tasks.filter(t => t.done).length;
  const todaySessions = (state.sessions[today] || 0);
  animateCount("sc-tasks", doneTasks);
  animateCount("sc-streak", state.streak);
  animateCount("sc-subjects", state.subjects.length);
  animateCount("sc-sessions", todaySessions);

  // Today's pending tasks preview
  const pending = state.tasks.filter(t => !t.done).slice(0, 5);
  const cont = document.getElementById("dash-tasks");
  if (cont) {
    if (pending.length === 0) {
      cont.innerHTML = `<div class="empty-state"><span class="es-emoji">🎉</span>All tasks done! Great job!</div>`;
    } else {
      cont.innerHTML = pending.map(t => `
        <div class="dash-task-row">
          <div class="prio-dot ${t.priority}"></div>
          <div class="dash-task-text">${t.title}</div>
          ${t.subjectName ? `<span class="task-subject-tag">${t.subjectName}</span>` : ""}
        </div>
      `).join("");
    }
  }
  updateNavBadge();
}

function animateCount(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = parseInt(el.textContent) || 0;
  const diff = target - start;
  const steps = 20;
  let i = 0;
  const step = () => {
    i++;
    el.textContent = Math.round(start + (diff * i / steps));
    if (i < steps) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

function updateNavBadge() {
  const pending = state.tasks.filter(t => !t.done).length;
  const badge = document.getElementById("nav-badge");
  if (badge) {
    badge.textContent = pending;
    badge.classList.toggle("hidden", pending === 0);
  }
}

// ─── DAILY QUOTE ─────────────────────────────────────
function renderDailyQuote() {
  const idx = Math.floor(Date.now() / 86400000) % QUOTES.length;
  setDailyQuote(QUOTES[idx]);
}
function refreshDailyQuote() {
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  const btn = document.getElementById("new-quote-btn");
  if (btn) { btn.style.transform = "rotate(360deg)"; setTimeout(() => btn.style.transform = "", 500); }
  setDailyQuote(q);
}
function setDailyQuote(q) {
  const tEl = document.getElementById("dq-text");
  const aEl = document.getElementById("dq-author");
  if (!tEl || !aEl) return;
  tEl.style.opacity = "0";
  aEl.style.opacity = "0";
  setTimeout(() => {
    tEl.textContent = `"${q.t}"`;
    aEl.textContent = `— ${q.a}`;
    tEl.style.transition = "opacity 0.5s";
    aEl.style.transition = "opacity 0.5s";
    tEl.style.opacity = "1";
    aEl.style.opacity = "1";
  }, 300);
}

// ─── TASKS ───────────────────────────────────────────
function addTask() {
  const title = document.getElementById("task-title").value.trim();
  if (!title) { showToast("Please enter a task title 📝", "error"); return; }
  const subjEl = document.getElementById("task-subject");
  const subjId = subjEl.value;
  const subj = state.subjects.find(s => s.id === subjId);
  const task = {
    id: Date.now().toString(),
    title,
    subjectId: subjId,
    subjectName: subj ? `${subj.icon} ${subj.name}` : "",
    priority: document.getElementById("task-priority").value,
    dueDate: document.getElementById("task-due").value,
    done: false,
    createdAt: new Date().toISOString(),
  };
  state.tasks.unshift(task);
  saveState();
  document.getElementById("task-title").value = "";
  document.getElementById("task-due").value = "";
  renderTasks();
  renderDashboard();
  showToast("Task added! Let's crush it! 💪", "success");
  markStudied();
}

function toggleTask(id) {
  const task = state.tasks.find(t => t.id === id);
  if (!task) return;
  task.done = !task.done;
  saveState();
  renderTasks();
  renderDashboard();
  if (task.done) {
    confetti();
    showToast("Task completed! Amazing work! 🎉", "success");
    markStudied();
  }
}

function deleteTask(id) {
  const el = document.querySelector(`[data-task-id="${id}"]`);
  if (el) {
    el.classList.add("removing");
    setTimeout(() => {
      state.tasks = state.tasks.filter(t => t.id !== id);
      saveState();
      renderTasks();
      renderDashboard();
    }, 300);
  }
}

function renderTasks() {
  const today = todayStr();
  let tasks = [...state.tasks];
  const filter = state.currentTaskFilter;
  if (filter === "pending") tasks = tasks.filter(t => !t.done);
  else if (filter === "done") tasks = tasks.filter(t => t.done);
  else if (filter === "high") tasks = tasks.filter(t => t.priority === "high");
  else if (filter === "today") tasks = tasks.filter(t => t.dueDate === today);

  const done = state.tasks.filter(t => t.done).length;
  const total = state.tasks.length;
  const pct = total > 0 ? (done / total * 100) : 0;
  const pt = document.getElementById("task-prog-txt");
  const pf = document.getElementById("task-prog-fill");
  if (pt) pt.textContent = `${done} / ${total} tasks`;
  if (pf) pf.style.width = pct + "%";

  const list = document.getElementById("tasks-list");
  if (!list) return;

  // Refresh task subject dropdown
  const sel = document.getElementById("task-subject");
  if (sel) {
    sel.innerHTML = `<option value="">📚 No Subject</option>` +
      state.subjects.map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join("");
  }

  if (tasks.length === 0) {
    list.innerHTML = `<div class="empty-state"><span class="es-emoji">${filter==="done"?"🏆":"📋"}</span>${filter==="done"?"No completed tasks yet":"No tasks here. Add one above!"}</div>`;
    return;
  }

  list.innerHTML = tasks.map(t => {
    const dueFmt = t.dueDate ? fmtDate(t.dueDate) : "";
    const isOverdue = t.dueDate && t.dueDate < today && !t.done;
    return `
      <div class="task-item ${t.done?"done":""}" data-task-id="${t.id}">
        <button class="task-cb ${t.done?"checked":""}" onclick="toggleTask('${t.id}')">${t.done?"✓":""}</button>
        <div class="task-text">${t.title}</div>
        <div class="task-meta">
          ${t.subjectName ? `<span class="task-subject-tag">${t.subjectName}</span>` : ""}
          ${dueFmt ? `<span class="task-due-tag ${isOverdue?"overdue":""}">${isOverdue?"⚠️ ":""}${dueFmt}</span>` : ""}
          <div class="prio-dot ${t.priority}"></div>
          <button class="task-del" onclick="deleteTask('${t.id}')" title="Delete">✕</button>
        </div>
      </div>`;
  }).join("");
}

function fmtDate(str) {
  if (!str) return "";
  const [y,m,d] = str.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m)-1]} ${parseInt(d)}`;
}

// ─── TIMER ───────────────────────────────────────────
const CIRCUMFERENCE = 596.9;

function updateTimerDisplay() {
  const display = document.getElementById("timer-digits");
  if (display) display.textContent = `${String(timer.mins).padStart(2,"0")}:${String(timer.secs).padStart(2,"0")}`;
  // Update SVG ring
  const ring = document.getElementById("timer-ring");
  if (ring) {
    const elapsed = timer.totalTime - (timer.mins*60 + timer.secs);
    const offset = (elapsed / timer.totalTime) * CIRCUMFERENCE;
    ring.style.strokeDashoffset = offset;
  }
}

function resetTimerRing() {
  const ring = document.getElementById("timer-ring");
  if (ring) ring.style.strokeDashoffset = "0";
}

function toggleTimer() {
  if (timer.running) {
    clearInterval(timer.interval);
    timer.running = false;
    const btn = document.getElementById("btn-start");
    if (btn) { btn.innerHTML = "▶ Start"; btn.classList.remove("running"); }
  } else {
    timer.running = true;
    const btn = document.getElementById("btn-start");
    if (btn) { btn.innerHTML = "⏸ Pause"; btn.classList.add("running"); }
    timer.interval = setInterval(() => {
      if (timer.secs === 0) {
        if (timer.mins === 0) { timerComplete(); return; }
        timer.mins--;
        timer.secs = 59;
      } else {
        timer.secs--;
      }
      updateTimerDisplay();
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer.interval);
  timer.running = false;
  const activeModeBtn = document.querySelector(".mode-tab.active");
  timer.mins = activeModeBtn ? parseInt(activeModeBtn.dataset.mins) : 25;
  timer.secs = 0;
  timer.totalTime = timer.mins * 60;
  updateTimerDisplay();
  resetTimerRing();
  const btn = document.getElementById("btn-start");
  if (btn) { btn.innerHTML = "▶ Start"; btn.classList.remove("running"); }
}

function timerComplete() {
  clearInterval(timer.interval);
  timer.running = false;
  const btn = document.getElementById("btn-start");
  if (btn) { btn.innerHTML = "▶ Start"; btn.classList.remove("running"); }

  if (timer.mode === "focus") {
    // Record session
    const today = todayStr();
    state.sessions[today] = (state.sessions[today] || 0) + 1;
    state.totalSessions = (state.totalSessions || 0) + 1;
    saveState();
    markStudied();
    // Update session dots
    timer.session = Math.min(timer.session + 1, 4);
    updatePomDots();
    document.getElementById("tod-sess").textContent = state.sessions[today] || 0;
    document.getElementById("tod-mins").textContent = ((state.sessions[today] || 0) * 25);
    confetti();
    showToast("🎯 Focus session complete! Great work!", "success");
    beep(880, 0.4);
  } else {
    showToast("☕ Break's over! Time to focus!", "success");
    beep(440, 0.3);
  }
  resetTimer();
  renderStats();
  renderDashboard();
}

function updatePomDots() {
  document.querySelectorAll(".pd").forEach((dot, i) => {
    dot.classList.remove("done","active");
    if (i < timer.session) dot.classList.add("done");
    else if (i === timer.session) dot.classList.add("active");
  });
  const pomNum = document.getElementById("pom-num");
  if (pomNum) pomNum.textContent = Math.min(timer.session + 1, 4);
}

function updateTimerFocusQuote() {
  const q = QUOTES.filter(q => q.c === "focus");
  const pick = q[Math.floor(Math.random() * q.length)];
  const el = document.getElementById("focus-q");
  if (el && pick) el.textContent = `"${pick.t}" — ${pick.a}`;
}

function beep(freq, vol) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.8);
  } catch(e) {}
}

// Update timer today stats on page load
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const today = todayStr();
    const todSess = document.getElementById("tod-sess");
    const todMins = document.getElementById("tod-mins");
    if (todSess) todSess.textContent = state.sessions[today] || 0;
    if (todMins) todMins.textContent = ((state.sessions[today] || 0) * 25);
  }, 100);
});

// ─── SUBJECTS ────────────────────────────────────────
function addSubject() {
  const name = document.getElementById("subj-name").value.trim();
  if (!name) { showToast("Please enter a subject name 📖", "error"); return; }
  const subj = {
    id: Date.now().toString(),
    name,
    icon: document.getElementById("subj-icon").value,
    color: document.getElementById("subj-color").value,
    progress: 0,
  };
  state.subjects.push(subj);
  saveState();
  document.getElementById("subj-name").value = "";
  renderSubjects();
  renderDashboard();
  showToast(`${subj.icon} ${name} added! Let's study! 📚`, "success");
}

function deleteSubject(id) {
  state.subjects = state.subjects.filter(s => s.id !== id);
  saveState();
  renderSubjects();
  renderDashboard();
  showToast("Subject removed.", "");
}

function updateSubjectProgress(id, val) {
  const subj = state.subjects.find(s => s.id === id);
  if (subj) { subj.progress = parseInt(val); saveState(); }
  const fill = document.querySelector(`[data-subj-id="${id}"] .subj-prog-fill`);
  const pct = document.querySelector(`[data-subj-id="${id}"] .subj-prog-pct`);
  if (fill) fill.style.width = val + "%";
  if (pct) pct.textContent = val + "%";
}

function renderSubjects() {
  const grid = document.getElementById("subjects-grid");
  if (!grid) return;
  if (state.subjects.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><span class="es-emoji">📖</span>No subjects yet. Add your first subject above!</div>`;
    return;
  }
  grid.innerHTML = state.subjects.map(s => `
    <div class="subj-card" data-subj-id="${s.id}">
      <div class="subj-card-glow" style="background:${s.color}"></div>
      <div class="subj-top">
        <span class="subj-icon">${s.icon}</span>
        <span class="subj-name">${s.name}</span>
        <button class="subj-del" onclick="deleteSubject('${s.id}')" title="Remove">✕</button>
      </div>
      <div class="subj-prog-wrap">
        <div class="subj-prog-label">
          <span>Progress</span>
          <span class="subj-prog-pct">${s.progress}%</span>
        </div>
        <div class="subj-prog-track">
          <div class="subj-prog-fill" style="width:${s.progress}%;background:${s.color}"></div>
        </div>
      </div>
      <input type="range" class="subj-range" min="0" max="100" value="${s.progress}"
        oninput="updateSubjectProgress('${s.id}', this.value)" />
    </div>
  `).join("");
}

// ─── NOTES ───────────────────────────────────────────
function addNote() {
  const title = document.getElementById("note-title").value.trim();
  const body = document.getElementById("note-body").value.trim();
  if (!title && !body) { showToast("Please write something first! 📝", "error"); return; }
  const note = {
    id: Date.now().toString(),
    title: title || "Quick Note",
    body,
    color: state.selectedNoteColor,
    createdAt: new Date().toLocaleDateString(),
  };
  state.notes.unshift(note);
  saveState();
  document.getElementById("note-title").value = "";
  document.getElementById("note-body").value = "";
  renderNotes();
  showToast("Note saved! 📌", "success");
}

function deleteNote(id) {
  state.notes = state.notes.filter(n => n.id !== id);
  saveState();
  renderNotes();
  showToast("Note deleted.", "");
}

function renderNotes() {
  const grid = document.getElementById("notes-grid");
  if (!grid) return;
  if (state.notes.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><span class="es-emoji">📝</span>No notes yet. Write your first one!</div>`;
    return;
  }
  grid.innerHTML = state.notes.map(n => {
    // Derive text color based on brightness
    const tc = "rgba(0,0,0,0.8)";
    return `
      <div class="note-card" style="background:${n.color}22;border:1px solid ${n.color}55;">
        <div class="note-card-title" style="color:${n.color}">${n.title}</div>
        <div class="note-card-body" style="color:${n.color}cc">${n.body}</div>
        <div class="note-card-footer">
          <span class="note-card-date">${n.createdAt}</span>
          <button class="note-del" onclick="deleteNote('${n.id}')" style="background:${n.color}33;color:${n.color}">Delete</button>
        </div>
      </div>`;
  }).join("");
}

// ─── QUOTES ──────────────────────────────────────────
function randomFeatured() {
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  const textEl = document.getElementById("fq-text");
  const authEl = document.getElementById("fq-auth");
  if (!textEl || !authEl) return;
  textEl.style.opacity = "0"; authEl.style.opacity = "0";
  setTimeout(() => {
    textEl.textContent = `"${q.t}"`;
    authEl.textContent = `— ${q.a}`;
    authEl.style.color = CAT_COLORS[q.c] || "#7c6bff";
    textEl.style.transition = "opacity 0.5s"; authEl.style.transition = "opacity 0.5s";
    textEl.style.opacity = "1"; authEl.style.opacity = "1";
  }, 300);
}

function renderQuotes() {
  const grid = document.getElementById("quotes-grid");
  if (!grid) return;
  const cat = state.currentQuoteFilter;
  const list = cat === "all" ? QUOTES : QUOTES.filter(q => q.c === cat);
  grid.innerHTML = list.map((q, i) => `
    <div class="quote-card" onclick="setFeatured(${QUOTES.indexOf(q)})"
         style="animation-delay:${(i%12)*0.05}s">
      <div class="qc-num">${i+1}</div>
      <div class="qc-cat" style="color:${CAT_COLORS[q.c]||"#7c6bff"}">${q.c.toUpperCase()}</div>
      <div class="qc-text">"${q.t}"</div>
      <div class="qc-author">— ${q.a}</div>
    </div>`).join("");
}

function setFeatured(idx) {
  const q = QUOTES[idx];
  const textEl = document.getElementById("fq-text");
  const authEl = document.getElementById("fq-auth");
  if (!textEl || !authEl) return;
  textEl.textContent = `"${q.t}"`;
  authEl.textContent = `— ${q.a}`;
  authEl.style.color = CAT_COLORS[q.c] || "#7c6bff";
  document.querySelector(".feat-quote").scrollIntoView({ behavior:"smooth", block:"nearest" });
}

// ─── STATS ───────────────────────────────────────────
function renderStats() {
  renderWeekChart();
  renderAchievements();
  renderSubjProgress();
  renderTaskOverview();
}

function renderWeekChart() {
  const chart = document.getElementById("week-chart");
  const days = document.getElementById("week-days");
  if (!chart || !days) return;
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const today = new Date();
  let data = [], labels = [];
  let maxVal = 1;
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    const count = state.sessions[key] || 0;
    data.push({ count, isToday: i===0, dayName: dayNames[d.getDay()] });
    maxVal = Math.max(maxVal, count);
  }
  chart.innerHTML = data.map(d => `
    <div class="w-bar-wrap">
      <div class="w-count">${d.count || ""}</div>
      <div class="w-bar" style="height:${Math.max(4, (d.count/maxVal)*100)}px" title="${d.count} sessions"></div>
    </div>`).join("");
  days.innerHTML = data.map(d => `<div class="w-day ${d.isToday?"today":""}">${d.dayName}</div>`).join("");
}

function renderAchievements() {
  const wrap = document.getElementById("badges");
  if (!wrap) return;
  wrap.innerHTML = ACHIEVEMENTS.map(a => {
    const earned = a.check(state);
    return `
      <div class="badge-item ${earned?"earned":""}">
        <span class="badge-emoji">${a.emoji}</span>
        <div class="badge-info">
          <div class="badge-name">${a.name}</div>
          <div class="badge-desc">${a.desc}</div>
        </div>
      </div>`;
  }).join("");
}

function renderSubjProgress() {
  const wrap = document.getElementById("subj-prog-list");
  if (!wrap) return;
  if (state.subjects.length === 0) {
    wrap.innerHTML = `<div class="empty-state"><span class="es-emoji">📖</span>No subjects added yet.</div>`;
    return;
  }
  wrap.innerHTML = state.subjects.map(s => `
    <div class="subj-prog-row">
      <span class="spr-icon">${s.icon}</span>
      <div class="spr-info">
        <div class="spr-name">${s.name}</div>
        <div class="spr-track">
          <div class="spr-fill" style="width:${s.progress}%;background:${s.color}"></div>
        </div>
      </div>
      <span class="spr-pct">${s.progress}%</span>
    </div>`).join("");
}

function renderTaskOverview() {
  const wrap = document.getElementById("task-overview");
  if (!wrap) return;
  const total = state.tasks.length;
  const done = state.tasks.filter(t => t.done).length;
  const pending = total - done;
  const high = state.tasks.filter(t => t.priority==="high" && !t.done).length;
  wrap.innerHTML = `
    <div class="task-ov-row"><span class="ov-label">Total Tasks</span><span class="ov-val">${total}</span></div>
    <div class="task-ov-row"><span class="ov-label">✅ Completed</span><span class="ov-val" style="color:var(--success)">${done}</span></div>
    <div class="task-ov-row"><span class="ov-label">⏳ Pending</span><span class="ov-val" style="color:var(--warn)">${pending}</span></div>
    <div class="task-ov-row"><span class="ov-label">🔴 High Priority</span><span class="ov-val" style="color:var(--danger)">${high}</span></div>
    <div class="task-ov-row"><span class="ov-label">🎯 Total Sessions</span><span class="ov-val" style="color:var(--primary)">${state.totalSessions||0}</span></div>`;
}

// ─── TOAST ───────────────────────────────────────────
let toastTimeout;
function showToast(msg, type) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  clearTimeout(toastTimeout);
  toast.textContent = msg;
  toast.className = `toast show ${type||""}`;
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3000);
}

// ─── CONFETTI ────────────────────────────────────────
function confetti() {
  const wrap = document.getElementById("confetti-wrap");
  if (!wrap) return;
  const colors = ["#7c6bff","#3dd9d9","#ff6b9d","#ffd93d","#00d4aa","#ff9f43","#ff6b6b"];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "confetti-p";
    const color = colors[Math.floor(Math.random()*colors.length)];
    const left = Math.random()*100;
    const dur = 2.5 + Math.random()*1.5;
    const del = Math.random()*0.6;
    const dx = (Math.random()-0.5)*200;
    const rot = Math.random()*1440;
    const br = Math.random() > 0.5 ? "50%" : "2px";
    p.style.cssText = `
      left:${left}%;background:${color};
      --dur:${dur}s;--del:${del}s;--dx:${dx}px;--rot:${rot}deg;--br:${br};
    `;
    wrap.appendChild(p);
    setTimeout(() => p.remove(), (dur + del) * 1000 + 200);
  }
}

// ─── SIDEBAR TOGGLE (mobile) ─────────────────────────
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

// Close sidebar when clicking outside (mobile)
document.addEventListener("click", e => {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.getElementById("hamburger");
  if (sidebar && hamburger && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove("open");
  }
});

// ─── Auto-render timer ring on init ──────────────────
window.addEventListener("load", () => {
  updateTimerDisplay();
  updatePomDots();
  randomFeatured();
});
