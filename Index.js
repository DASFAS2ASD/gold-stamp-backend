!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Gold Stamp Analysis</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <style>
    :root {
      --bg: #0b1220;
      --card: #111a2e;
      --accent: #22c55e;
      --text: #e5e7eb;
      --muted: #9ca3af;
      --danger: #ef4444;
      --warn: #f59e0b;
    }

    * {
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial;
    }

    body {
      margin: 0;
      background: radial-gradient(circle at top, #111827, #020617);
      color: var(--text);
      line-height: 1.6;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px 80px;
    }

    header {
      text-align: center;
      margin-bottom: 50px;
    }

    header h1 {
      font-size: 2.8rem;
      color: var(--accent);
      margin-bottom: 15px;
    }

    header p {
      color: var(--muted);
      max-width: 700px;
      margin: 0 auto;
      font-size: 1.05rem;
    }

    .card {
      background: linear-gradient(180deg, #0f172a, #020617);
      border-radius: 16px;
      padding: 30px;
      border: 1px solid #1f2937;
      margin-bottom: 30px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    }

    h2 {
      color: var(--accent);
      margin-top: 0;
    }

    .btn {
      display: inline-block;
      padding: 14px 22px;
      background: var(--accent);
      color: #022c22;
      font-weight: 700;
      border-radius: 10px;
      cursor: pointer;
      margin: 10px;
      border: none;
    }

    .result {
      margin-top: 25px;
      padding: 20px;
      border-radius: 12px;
      background: #020617;
      border: 1px solid #1f2937;
      white-space: pre-line;
    }

    footer {
      text-align: center;
      color: var(--muted);
      font-size: 0.9rem;
      margin-top: 60px;
    }

    input {
      padding: 12px;
      width: 100%;
      max-width: 400px;
      border-radius: 8px;
      border: 1px solid #334155;
      background: #020617;
      color: white;
      margin-top: 10px;
    }
  </style>
</head>

<body>
<div class="container">

  <header>
    <h1>Gold Stamp Analysis</h1>
    <p>
      Analysera guldstämplar enligt etablerad pantbanks- och smyckesbranschpraxis.
    </p>
  </header>

  <section class="card">
    <h2>Analysera stämpel (LIVE AI)</h2>

    <input id="stampInput" placeholder="Ex: 18K, 750, GP, Double">

    <br>
    <button class="btn" onclick="analyzeStamp()">Analysera</button>

    <div class="result" id="result"></div>
  </section>

  <footer>
    ⚠️ Detta är ett vägledande analysverktyg. Professionell kontroll rekommenderas.
  </footer>

</div>

<script>
async function analyzeStamp() {
  const input = document.getElementById("stampInput").value;
  const box = document.getElementById("result");

  if (!input.trim()) {
    box.innerText = "Fel: skriv en stämpel först.";
    return;
  }

  box.innerText = "Analyserar...";

  try {
    const res = await fetch("https://gold-stamp-backend.onrender.com/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();
    box.innerText = data.result;
  } catch (err) {
    box.innerText = "Fel: kunde inte kontakta analysservern.";
  }
}
</script>

</body>
</html>
