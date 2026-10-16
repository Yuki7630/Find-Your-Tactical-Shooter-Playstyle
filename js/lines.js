// The style lines shown on the page.
// Each line has a stable `id`, so saved values and future result types
// keep working when lines are reordered, renamed or added.
// A value is 0..100: 0 = fully left pole, 50 = balanced, 100 = fully right pole.

const LINES = [
  { id: "sens",       left: { en: "High sens",       th: "เซนสูง" },            right: { en: "Low sens",     th: "เซนต่ำ" } },
  { id: "aimStyle",   left: { en: "Controlled aim",  th: "เล็งคุมจังหวะ" },      right: { en: "Flick aim",    th: "สะบัดไปหาเป้า" } },
  { id: "tempo",      left: { en: "Aggressive play", th: "บุกเร็ว สร้างแรงกดดัน" }, right: { en: "Passive play", th: "รอจังหวะ ให้ศัตรูพลาด" } },
  { id: "timing",     left: { en: "Predictive",      th: "ยิงจากภาพในหัว" },     right: { en: "Reactive",     th: "ยิงจากภาพตรงหน้า" } },
  { id: "decision",   left: { en: "Instinctive",     th: "ตามสัญชาตญาณ" },       right: { en: "Methodical",   th: "รอบคอบ เน้นข้อมูล" } },
  { id: "risk",       left: { en: "Gambler",         th: "ใช้ความเสี่ยงสูง" },       right: { en: "Disciplined",  th: "เล่นตามวินัย ลดความเสี่ยง" } },
  { id: "aimControl", left: { en: "Calm aim",        th: "วางเป้าแล้วรอยิง" },    right: { en: "Adjust aim",   th: "ขยับปรับแก้เป้า" } },
  { id: "form",       left: { en: "Consistent",      th: "สม่ำเสมอ" },           right: { en: "Explosive",    th: "ระเบิดฟอร์ม" } }
];
