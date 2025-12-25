import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/* ✅ ROOT ROUTE – VIKTIGAST */
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "gold-stamp-backend",
    ai_mode: process.env.AI_MODE || "not-set"
  });
});

/* DIN BEFINTLIGA ROUTE */
app.post("/analyze", (req, res) => {
  const stamp = req.body.text || "";
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

/* ✅ RENDER-PORT */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server kör på port ${PORT}`);
});
