// Vercel Serverless Function: meneruskan chat ke Groq.
// Key dibaca dari Environment Variables di Vercel (GROQ_KEY_1, GROQ_KEY_2, GROQ_MODEL).
const KEYS = [process.env.GROQ_KEY_1, process.env.GROQ_KEY_2].filter(Boolean);
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
let keyIdx = 0;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  let data = '';
  for await (const chunk of req) data += chunk;
  return data ? JSON.parse(data) : {};
}

async function callGroq(key, body) {
  const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
    body: JSON.stringify({ ...body, model: MODEL }),
  });
  const json = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, json };
}

module.exports = async (req, res) => {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: { message: 'method not allowed' } });
  if (KEYS.length === 0) return res.status(500).json({ error: { message: 'GROQ_KEY_1 belum diset di Vercel' } });

  try {
    const body = await readJson(req);
    let lastErr = 'gagal';
    for (let attempt = 0; attempt < KEYS.length; attempt++) {
      const idx = (keyIdx + attempt) % KEYS.length;
      const out = await callGroq(KEYS[idx], body);
      if (out.ok) {
        keyIdx = idx;
        return res.status(200).json(out.json);
      }
      lastErr = out.json?.error?.message || ('HTTP ' + out.status);
      // pindah ke key berikutnya hanya kalau limit / quota
      if (!/limit|quota|rate/i.test(lastErr)) break;
    }
    return res.status(502).json({ error: { message: lastErr } });
  } catch (e) {
    return res.status(500).json({ error: { message: e.message } });
  }
};
