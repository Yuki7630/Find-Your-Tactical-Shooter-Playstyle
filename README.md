# Find Your Tactical Shooter Playstyle

สำหรับผู้เล่น VALORANT, CS2 และเกมยิงแนว Tactical Shooter

สำรวจสไตล์การเล่นของคุณ ด้วยการเลือกว่าตัวเองอยู่ตรงไหนระหว่างสองแบบที่ตรงข้ามกัน ตั้งแต่การเล็ง ไปจนถึงจังหวะการเล่นและการตัดสินใจ แล้วดูว่าสไตล์แบบไหนอธิบายวิธีเล่นของคุณได้ดีที่สุด

ไม่มีคำตอบที่ถูกหรือผิด แค่เลือกแบบที่รู้สึกว่าเป็นตัวเองที่สุด

Explore your playstyle by choosing where you fall between two opposite traits. From aim to tempo and decision-making, find out what best describes the way you play.

There are no right or wrong answers. Just pick what feels most natural to you.

For players of VALORANT, CS2 and other tactical shooters.

## เส้นทั้ง 8 / The eight lines

| id | ซ้าย / Left | ขวา / Right |
|---|---|---|
| `sens` | **High sens**<br>เซนสูง | **Low sens**<br>เซนต่ำ |
| `aimStyle` | **Controlled aim**<br>เล็งคุมจังหวะ | **Flick aim**<br>สะบัดไปหาเป้า |
| `tempo` | **Aggressive play**<br>บุกเร็ว สร้างแรงกดดัน | **Passive play**<br>รอจังหวะ ให้ศัตรูพลาด |
| `timing` | **Predictive**<br>ยิงจากภาพในหัว | **Reactive**<br>ยิงจากภาพตรงหน้า |
| `decision` | **Instinctive**<br>ตามสัญชาตญาณ | **Methodical**<br>รอบคอบ เน้นข้อมูล |
| `risk` | **Gambler**<br>ใช้ความเสี่ยงสูง | **Disciplined**<br>เล่นตามวินัย ลดความเสี่ยง |
| `aimControl` | **Calm aim**<br>วางเป้าแล้วรอยิง | **Adjust aim**<br>ขยับปรับแก้เป้า |
| `form` | **Consistent**<br>สม่ำเสมอ | **Explosive**<br>ระเบิดฟอร์ม|

## วิธีใช้ / How to use

- ลากจุดบนแต่ละเส้น โปรไฟล์ด้านล่างจะสรุปเส้นที่มีค่าตั้งแต่ 65% ขึ้นไป
- กด **Copy** เพื่อคัดลอกค่าไปแชร์
- วางค่าที่คัดลอกมาลงในช่องค่า แล้วเส้นจะเลื่อนตามทันที
- กด **Reset** เพื่อกลับไปที่กลางทุกเส้น
- ค่าจะถูกจำไว้ในเบราว์เซอร์ของคุณ

## โครงสร้างไฟล์ / Project structure

```
index.html        หน้าเว็บ
css/style.css     สีและเลย์เอาต์ ทั้งโหมดสว่างและมืด
js/lines.js       ข้อมูลเส้นทั้ง 8 
js/profile.js     สรุปค่า แปลงเป็นข้อความ อ่านข้อความแปลงเป็นเส้น
js/storage.js     จำค่าไว้ในเบราว์เซอร์
js/main.js        เชื่อมทุกอย่างเข้ากับหน้าเว็บ
```

ค่าของผู้เล่นเก็บเป็นออบเจกต์ตาม `id` ของเส้น เช่น `{ sens: 0, aimStyle: 100, ... }` โดย 0 คือซ้ายสุด 50 คือกลาง และ 100 คือขวาสุด

ไฟล์ JavaScript โหลดตามลำดับใน `index.html` คือ `lines.js` → `profile.js` → `storage.js` → `main.js` เพราะไฟล์หลังใช้ของจากไฟล์ก่อนหน้า ถ้าเพิ่มไฟล์ใหม่ ให้ใส่ `<script defer>` ต่อจากไฟล์ที่มันต้องใช้
