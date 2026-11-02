// Backend kecil: membaca .env dan meneruskan chat ke Groq.
// Jalankan: node server.js  (Node 18+, tanpa dependensi)
const http = require('http');
const fs = require('fs');
const path = require('path');

// --- load .env ---
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}

const KEYS = [process.env.GROQ_KEY_1, process.env.GROQ_KEY_2].filter(Boolean);
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const PORT = Number(process.env.PORT || 3000);
let keyIdx = 0;

if (KEYS.length === 0) {
  console.error('Tidak ada GROQ_KEY_1 / GROQ_KEY_2 di .env');
  process.exit(1);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', c => { data += c; if (data.length > 1e6) req.destroy(); });
    req.on('end', () => { try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); } });
    req.on('error', reject);
  });
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

const server = http.createServer(async (req, res) => {
  // CORS: izinkan halaman statis membuka endpoint ini
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  if (req.url !== '/api/chat' || req.method !== 'POST') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'not found' }));
  }

  try {
    const body = await readBody(req);
    let lastErr = null;
    for (let attempt = 0; attempt < KEYS.length; attempt++) {
      const key = KEYS[(keyIdx + attempt) % KEYS.length];
      const out = await callGroq(key, body);
      if (out.ok) {
        keyIdx = (keyIdx + attempt) % KEYS.length;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(out.json));
      }
      lastErr = out.json?.error?.message || ('HTTP ' + out.status);
      // coba key berikutnya hanya kalau limit / quota
      if (!/limit|quota|rate/i.test(lastErr)) break;
    }
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { message: lastErr || 'gagal' } }));
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: { message: e.message } }));
  }
});

server.listen(PORT, () => console.log('Chat server jalan di http://localhost:' + PORT));
