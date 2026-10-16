// Page wiring: builds the lines, keeps sliders, profile chips and the text box in sync.
// Loaded as classic scripts (see index.html) so the page also works when opened straight from disk.
// Load order matters: lines.js, profile.js, storage.js, then main.js.

let profile = loadProfile();

const rowsEl = document.getElementById("rows");
const chipsEl = document.getElementById("chips");
const noteEl = document.getElementById("note");
const outEl = document.getElementById("out");
const statusEl = document.getElementById("status");
const rows = {};

LINES.forEach((line) => {
  const sec = document.createElement("section");
  sec.className = "row";
  sec.innerHTML = `
    <div class="poles">
      <div class="pole l"><b>${line.left.en}</b><span>${line.left.th}</span></div>
      <div class="pole r"><b>${line.right.en}</b><span>${line.right.th}</span></div>
    </div>
    <div class="track"><div class="fill"></div><i class="mid"></i>
      <input type="range" min="0" max="100" step="1" id="s-${line.id}" aria-label="${line.left.en} to ${line.right.en}">
    </div>
    <div class="pct"><span class="lp"></span><span class="rp"></span></div>`;
  rowsEl.appendChild(sec);
  const input = sec.querySelector("input");
  rows[line.id] = { sec, input, lp: sec.querySelector(".lp"), rp: sec.querySelector(".rp") };
  input.addEventListener("input", () => {
    profile[line.id] = parseInt(input.value, 10);
    render();
  });
});

function renderRow(line) {
  const v = profile[line.id];
  const r = rows[line.id];
  const l = lean(line, v);
  r.input.value = v;
  r.sec.style.setProperty("--lo", Math.min(v, 50) / 100);
  r.sec.style.setProperty("--span", Math.abs(v - 50) / 100);
  r.sec.style.setProperty("--side", l.side === "left" ? "var(--a)" : l.side === "right" ? "var(--b)" : "var(--muted)");
  r.sec.classList.toggle("lean-l", l.side === "left");
  r.sec.classList.toggle("lean-r", l.side === "right");
  r.lp.textContent = `${100 - v}%`;
  r.rp.textContent = `${v}%`;
  r.lp.className = "lp" + (l.side === "left" ? " on" : "");
  r.rp.className = "rp" + (l.side === "right" ? " on" : "");
  r.input.setAttribute("aria-valuetext", l.side === "none" ? "balanced" : `${l.name} ${l.pct}%`);
}

function renderProfile() {
  const leans = strongLeans(profile);
  chipsEl.replaceChildren(...leans.map((l) => {
    const c = document.createElement("span");
    c.className = `chip ${l.side === "left" ? "a" : "b"}`;
    c.textContent = `${l.name} ${l.pct}%`;
    return c;
  }));
  noteEl.textContent = leans.length === 0
    ? "ทุกเส้นอยู่ใกล้ตรงกลาง ลองลากจุดไปทางใดทางหนึ่ง"
    : `แสดงเฉพาะเส้นที่เอียงเกิน ${LEAN_THRESHOLD}% อีก ${LINES.length - leans.length} เส้นค่อนข้างสมดุล`;
}

// fromText = true while the person is typing in the text box, so we don't overwrite it.
function render({ fromText: typing = false } = {}) {
  LINES.forEach(renderRow);
  renderProfile();
  if (!typing) { outEl.value = toText(profile); outEl.classList.remove("bad"); }
  saveProfile(profile);
}

let statusTimer;
function say(text, bad = false) {
  statusEl.textContent = text;
  statusEl.classList.toggle("bad", bad);
  clearTimeout(statusTimer);
  if (!bad) statusTimer = setTimeout(() => { statusEl.textContent = ""; }, 2500);
}

outEl.addEventListener("input", () => {
  if (!outEl.value.trim()) { say(""); outEl.classList.remove("bad"); return; }
  const found = fromText(outEl.value);
  const ids = Object.keys(found);
  if (ids.length === 0) {
    outEl.classList.add("bad");
    say("อ่านค่าไม่ได้ ใช้รูปแบบเดียวกับที่คัดลอก เช่น High sens 100% · Flick aim 80%", true);
    return;
  }
  Object.assign(profile, found);
  outEl.classList.remove("bad");
  render({ fromText: true });
  say(ids.length === LINES.length
    ? `เลื่อนเส้นตามค่าครบทั้ง ${LINES.length} เส้นแล้ว`
    : `เลื่อนเส้นตามค่าแล้ว ${ids.length} จาก ${LINES.length} เส้น`);
});

outEl.addEventListener("blur", () => {
  if (!outEl.classList.contains("bad")) outEl.value = toText(profile);
});

document.getElementById("reset").addEventListener("click", () => {
  profile = defaultProfile();
  render();
  say("รีเซ็ตทุกเส้นไปที่กลางแล้ว");
});

document.getElementById("copy").addEventListener("click", () => {
  const text = toText(profile);
  outEl.value = text;
  outEl.classList.remove("bad");
  const fallback = () => {
    outEl.focus();
    outEl.select();
    say("เลือกข้อความให้แล้ว กดคัดลอกจากเมนูของเครื่อง");
  };
  try {
    navigator.clipboard.writeText(text).then(() => say("คัดลอกแล้ว"), fallback);
  } catch (e) { fallback(); }
});

render();
