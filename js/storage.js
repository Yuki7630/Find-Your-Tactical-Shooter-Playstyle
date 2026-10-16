// Remembers the profile in this browser only.
// Storage can be blocked (private mode, cleared site data), so every call is guarded.

const KEY = "tactical-shooter-playstyle";

function loadProfile() {
  const profile = defaultProfile();
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (Array.isArray(saved)) {
      // Older version saved a plain array in line order.
      LINES.forEach((line, i) => { if (isFinite(saved[i])) profile[line.id] = clamp(saved[i]); });
    } else if (saved && typeof saved === "object") {
      LINES.forEach((line) => { if (isFinite(saved[line.id])) profile[line.id] = clamp(saved[line.id]); });
    }
  } catch (e) {}
  return profile;
}

function saveProfile(profile) {
  try { localStorage.setItem(KEY, JSON.stringify(profile)); } catch (e) {}
}
