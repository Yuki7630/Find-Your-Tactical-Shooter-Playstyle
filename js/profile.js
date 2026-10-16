// Pure profile logic: no DOM here, so the future result system
// (matching a profile to a type and showing its image) can reuse it as is.
// A profile is a plain object keyed by line id, e.g. { sens: 0, aimStyle: 100, ... }.

const LEAN_THRESHOLD = 65;

function clamp(n) {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function defaultProfile() {
  const p = {};
  LINES.forEach((line) => { p[line.id] = 50; });
  return p;
}

// How far one line leans, and to which side.
function lean(line, v) {
  if (v === 50) return { side: "none", pct: 50, name: null };
  return v < 50
    ? { side: "left", pct: 100 - v, name: line.left.en }
    : { side: "right", pct: v, name: line.right.en };
}

// Lines that lean past the threshold, strongest first.
function strongLeans(profile, threshold = LEAN_THRESHOLD) {
  return LINES
    .map((line) => ({ line, ...lean(line, profile[line.id]) }))
    .filter((l) => l.side !== "none" && l.pct >= threshold)
    .sort((a, b) => b.pct - a.pct);
}

// Text form used by Copy, e.g. "High sens 100% · Flick aim 80% · ..."
function toText(profile) {
  return LINES.map((line) => {
    const l = lean(line, profile[line.id]);
    return l.side === "none"
      ? `${line.left.en} / ${line.right.en} 50-50`
      : `${l.name} ${l.pct}%`;
  }).join(" · ");
}

const POLES = LINES.flatMap((line) => [
  { name: line.left.en.toLowerCase(), id: line.id, right: false },
  { name: line.right.en.toLowerCase(), id: line.id, right: true }
]).sort((a, b) => b.name.length - a.name.length);

// Reads the text form back. Returns only the lines it could read,
// so a partial paste moves only those lines.
function fromText(text) {
  const found = {};
  text.replace(/^\s*valorant style\s*:/i, "").split(/[·\n;,|]+/).forEach((seg) => {
    const s = seg.trim().toLowerCase();
    if (!s) return;
    const pole = POLES.find((p) => s.startsWith(p.name));
    if (!pole) return;
    if (/50\s*-\s*50/.test(s)) { found[pole.id] = 50; return; }
    const num = s.slice(pole.name.length).match(/\d+(?:\.\d+)?/);
    if (!num) return;
    const n = clamp(parseFloat(num[0]));
    found[pole.id] = pole.right ? n : 100 - n;
  });
  return found;
}
