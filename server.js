import express from "express";
import cors from "cors";

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* ✅ Root route – så Render + webbläsare funkar */
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "gold-stamp-backend",
    ai_mode: process.env.AI_MODE || "not-set"
  });
});

/* ✅ Analyze route – POST med JSON body */
app.post("/analyze", (req, res) => {
  const stamp = req.body?.text || "";
  let result = "";

  if (/gp|gf|double|dbl|plated/i.test(stamp)) {
    result = `Tolkning:
Stämpeln "${stamp}" indikerar plätering.

Slutsats:
Ej massivt guld.`;
  } 
  else if (/\b(24k|18k|14k|10k|999|750|585|417)\b/i.test(stamp)) {
    result = `Tolkning:
Stämpeln "${stamp}" anger karathalt.

Slutsats:
Massivt guld.`;
  } 
  else {
    result = `Tolkning:
Stämpeln "${stamp}" är oklar.

Slutsats:
Kan ej avgöras.`;
  }

  res.json({ result });
});

/* ✅ Render-krav: använd PORT från env */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server kör på port ${PORT}`);
});
