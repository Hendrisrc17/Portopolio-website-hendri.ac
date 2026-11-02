/* ================================================
   PORTFOLIO HENDRI — JavaScript
   File: js/script.js
   ================================================ */

/* CURSOR */
const cur=document.getElementById('cur'),cur2=document.getElementById('cur2');
let mx=0,my=0,tx=0,ty=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx+'px';cur.style.top=my+'px';
  document.getElementById('spot').style.background=`radial-gradient(480px circle at ${mx}px ${my}px,rgba(232,255,71,.045),transparent 70%)`;
});
(function lt(){tx+=(mx-tx)*.1;ty+=(my-ty)*.1;cur2.style.left=tx+'px';cur2.style.top=ty+'px';requestAnimationFrame(lt)})();
document.querySelectorAll('a,button,.pr').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
});

/* CANVAS */
const cv=document.getElementById('bg-canvas'),c=cv.getContext('2d');
let W,H,nd=[];
function rsz(){W=cv.width=window.innerWidth;H=cv.height=window.innerHeight}
function mknd(){nd=[];const n=Math.min(58,Math.floor(W*H/13000));for(let i=0;i<n;i++)nd.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.36,vy:(Math.random()-.5)*.36,r:Math.random()*1.1+.42})}
let sy=0;
window.addEventListener('scroll',()=>sy=window.scrollY,{passive:true});
(function dr(){
  c.clearRect(0,0,W,H);const py=sy*.024;
  for(let i=0;i<nd.length;i++){
    const yi=nd[i].y-py;
    for(let j=i+1;j<nd.length;j++){
      const yj=nd[j].y-py,dx=nd[i].x-nd[j].x,dy=yi-yj,d=Math.sqrt(dx*dx+dy*dy);
      if(d<140){c.beginPath();c.moveTo(nd[i].x,yi);c.lineTo(nd[j].x,yj);c.strokeStyle=`rgba(232,255,71,${(1-d/140)*.088})`;c.lineWidth=.44;c.stroke()}
    }
    c.beginPath();c.arc(nd[i].x,yi,nd[i].r,0,Math.PI*2);c.fillStyle='rgba(232,255,71,.16)';c.fill();
    nd[i].x+=nd[i].vx;nd[i].y+=nd[i].vy;
    if(nd[i].x<0)nd[i].x=W;if(nd[i].x>W)nd[i].x=0;if(nd[i].y<0)nd[i].y=H;if(nd[i].y>H)nd[i].y=0;
  }
  requestAnimationFrame(dr);
})();
rsz();mknd();window.addEventListener('resize',()=>{rsz();mknd()});

/* HERO CLIP */
setTimeout(()=>document.querySelectorAll('.ci').forEach(el=>el.classList.add('in')),70);

/* REVEAL */
const ro=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')})},{threshold:.07,rootMargin:'0px 0px -20px 0px'});
document.querySelectorAll('.rv,.rl,.rr').forEach(el=>ro.observe(el));

/* SKILL BARS */
const sbo=new IntersectionObserver(en=>{
  en.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.sf').forEach((f,i)=>setTimeout(()=>f.classList.add('on'),110+i*70));sbo.unobserve(e.target)}});
},{threshold:.2});
document.querySelectorAll('.sblock').forEach(el=>sbo.observe(el));

/* COUNTERS */
function rct(el){const to=+el.dataset.to;let v=0;const st=to/40;const t=setInterval(()=>{v=Math.min(v+st,to);el.textContent=Math.round(v)+(to>=10?'+':'');if(v>=to)clearInterval(t)},18)}
const co=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){rct(e.target);co.unobserve(e.target)}})},{threshold:.5});
document.querySelectorAll('.cnt').forEach(el=>co.observe(el));

/* SCROLL INDICATOR */
window.addEventListener('scroll',()=>{const s=document.getElementById('shi');if(s)s.style.opacity=window.scrollY>55?'0':'0.26'},{passive:true});

/* ACTIVE NAV */
const secs=['home','about','sertifikat','projects','skills','contact'];
const nls=document.querySelectorAll('#navp a.nl');
const dbs=document.querySelectorAll('.db');
window.addEventListener('scroll',()=>{
  let cur3='home';
  secs.forEach(id=>{const el=document.getElementById(id);if(el&&window.scrollY>=el.offsetTop-155)cur3=id});
  nls.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+cur3));
  dbs.forEach(b=>b.classList.toggle('on',b.dataset.s===cur3));
},{passive:true});

/* MAGNETIC BUTTONS */
document.querySelectorAll('.btem,.btgh').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.13}px,${(e.clientY-r.top-r.height/2)*.13}px)`});
  btn.addEventListener('mouseleave',()=>btn.style.transform='');
});

/* ══ ANIMATED CARD ══ */
(function(){
  const card = document.getElementById('cool-card');
  if(!card) return;

  // Check if photo loaded — if not, show card
  const img = document.getElementById('portrait-img');
  if(!img || img.style.display === 'none' || img.complete === false){
    // Will be shown by onerror, but also check on load
  }

  // ── CANVAS PARTICLES ──
  const canvas = document.getElementById('card-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  function resizeCard(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCard();

  const pts = [];
  for(let i=0;i<35;i++) pts.push({
    x:Math.random()*canvas.width, y:Math.random()*canvas.height,
    vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3,
    r:Math.random()*.8+.3
  });

  (function drawCard(){
    if(!card || card.style.display==='none') { requestAnimationFrame(drawCard); return; }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Grid
    ctx.strokeStyle='rgba(232,255,71,.04)';
    ctx.lineWidth=.5;
    for(let x=0;x<canvas.width;x+=36){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke()}
    for(let y=0;y<canvas.height;y+=36){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke()}
    // Connections
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<90){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(232,255,71,${(1-d/90)*.08})`;ctx.lineWidth=.4;ctx.stroke()}
      }
      ctx.beginPath();ctx.arc(pts[i].x,pts[i].y,pts[i].r,0,Math.PI*2);ctx.fillStyle='rgba(232,255,71,.2)';ctx.fill();
      pts[i].x+=pts[i].vx; pts[i].y+=pts[i].vy;
      if(pts[i].x<0)pts[i].x=canvas.width; if(pts[i].x>canvas.width)pts[i].x=0;
      if(pts[i].y<0)pts[i].y=canvas.height; if(pts[i].y>canvas.height)pts[i].y=0;
    }
    requestAnimationFrame(drawCard);
  })();

  // ── TYPING CODE ANIMATION ──
  const codeEl = document.getElementById('code-lines');
  if(!codeEl) return;

  const lines = [
    {t:'comment', txt:'# ================================'},
    {t:'comment', txt:'# Hendri · CS & AI Developer'},
    {t:'comment', txt:'# Bangka Belitung · Indonesia 🇮🇩'},
    {t:'comment', txt:'# ================================'},
    {t:'blank'},
    {t:'keyword', txt:'class ', rest:'Hendri(Developer):'},
    {t:'blank'},
    {t:'comment', txt:'  # === Profile ==='},
    {t:'code',    txt:'  status   ', op:'=', val:' "Open to Work ✅"'},
    {t:'code',    txt:'  focus    ', op:'=', val:' "AI + Web + App Dev"'},
    {t:'code',    txt:'  exp      ', op:'=', val:' "3+ years coding"'},
    {t:'blank'},
    {t:'comment', txt:'  # === Backend Stack ==='},
    {t:'code',    txt:'  lang     ', op:'=', val:' ["Python","TypeScript"]'},
    {t:'code',    txt:'  framework', op:'=', val:' ["FastAPI","Node.js"]'},
    {t:'code',    txt:'  database ', op:'=', val:' ["PostgreSQL","MongoDB"]'},
    {t:'code',    txt:'  cache    ', op:'=', val:' ["Redis","Memcached"]'},
    {t:'code',    txt:'  deploy   ', op:'=', val:' ["Docker","AWS","CI/CD"]'},
    {t:'blank'},
    {t:'comment', txt:'  # === AI / ML Stack ==='},
    {t:'code',    txt:'  model    ', op:'=', val:' ["PyTorch","TensorFlow"]'},
    {t:'code',    txt:'  nlp      ', op:'=', val:' ["BERT","HuggingFace"]'},
    {t:'code',    txt:'  vision   ', op:'=', val:' ["OpenCV","YOLO"]'},
    {t:'code',    txt:'  accuracy ', op:'=', val:' 94  # image classifier'},
    {t:'blank'},
    {t:'comment', txt:'  # === Frontend Stack ==='},
    {t:'code',    txt:'  ui       ', op:'=', val:' ["React","Next.js"]'},
    {t:'code',    txt:'  style    ', op:'=', val:' ["Tailwind","TypeScript"]'},
    {t:'code',    txt:'  mobile   ', op:'=', val:' ["Flutter","React Native"]'},
    {t:'blank'},
    {t:'def',     txt:'  def ', fn:'build_api', args:'(self, idea):'},
    {t:'code',    txt:'    api    ', op:'=', val:' FastAPI(idea)'},
    {t:'code',    txt:'    db     ', op:'=', val:' PostgreSQL.connect()'},
    {t:'code',    txt:'    model  ', op:'=', val:' PyTorch.train(data)'},
    {t:'code',    txt:'    return ', val:' deploy(api + model) 🚀'},
  ];

  const colors = {
    comment:'rgba(107,114,128,.6)',
    keyword:'#c792ea', def:'#82aaff',
    op:'rgba(232,255,71,.7)', val:'#c3e88d',
    fn:'#82aaff', args:'rgba(237,237,245,.5)',
    default:'rgba(237,237,245,.75)'
  };

  let lineIdx=0, charIdx=0;
  const lineEls=[];
  let currentEl=null;

  function getLineHTML(line, partial){
    if(line.t==='blank') return '<br>';
    if(line.t==='comment') return `<span style="color:${colors.comment}">${partial||''}</span>`;
    if(line.t==='keyword') return `<span style="color:${colors.keyword}">${line.txt}</span><span style="color:${colors.default}">${(partial||'').slice(line.txt.length)}</span>`;
    if(line.t==='def') return `<span style="color:${colors.def}">${line.txt}</span><span style="color:#82aaff">${line.fn}</span><span style="color:${colors.args}">${(partial||'').slice(line.txt.length+line.fn.length)}</span>`;
    if(line.t==='code'){
      const full = line.txt+(line.op||'')+(line.val||'');
      const p = partial||'';
      let html='';
      if(p.length<=line.txt.length) html=`<span style="color:${colors.default}">${p}</span>`;
      else if(p.length<=line.txt.length+(line.op||'').length) html=`<span style="color:${colors.default}">${line.txt}</span><span style="color:${colors.op}">${p.slice(line.txt.length)}</span>`;
      else html=`<span style="color:${colors.default}">${line.txt}</span><span style="color:${colors.op}">${line.op}</span><span style="color:${colors.val}">${p.slice(line.txt.length+(line.op||'').length)}</span>`;
      return html;
    }
    return `<span style="color:${colors.default}">${partial||''}</span>`;
  }

  function fullText(line){
    if(line.t==='blank') return '';
    if(line.t==='comment') return line.txt;
    if(line.t==='keyword') return line.txt+line.rest;
    if(line.t==='def') return line.txt+line.fn+line.args;
    if(line.t==='code') return line.txt+(line.op||'')+(line.val||'');
    return '';
  }

  // Reference to code scroll container
  const codeScroll = codeEl?.parentElement;

  function typeNext(){
    if(lineIdx>=lines.length){ 
      // Loop — restart after pause
      setTimeout(()=>{
        codeEl.innerHTML=''; lineIdx=0; charIdx=0; lineEls.length=0; currentEl=null;
        if(codeScroll) codeScroll.scrollTop=0;
        typeNext();
      },3200);
      return;
    }
    const line=lines[lineIdx];
    const full=fullText(line);

    if(line.t==='blank'){
      const br=document.createElement('div');
      br.style.height='6px';
      codeEl.appendChild(br);
      lineIdx++; charIdx=0;
      // Auto-scroll so cursor always visible
      if(codeScroll) codeScroll.scrollTop = codeScroll.scrollHeight;
      setTimeout(typeNext,80);
      return;
    }

    if(!currentEl){
      currentEl=document.createElement('div');
      currentEl.style.cssText='min-height:1.8em;white-space:pre';
      codeEl.appendChild(currentEl);
      lineEls.push(currentEl);
    }

    if(charIdx<full.length){
      charIdx++;
      currentEl.innerHTML=getLineHTML(line,full.slice(0,charIdx));
      // Keep scrolling as we type
      if(codeScroll) codeScroll.scrollTop = codeScroll.scrollHeight;
      setTimeout(typeNext, charIdx===1?120:Math.random()*28+12);
    } else {
      lineIdx++; charIdx=0; currentEl=null;
      setTimeout(typeNext,charIdx===0?100:60);
    }
  }

  // Start typing after card is shown
  setTimeout(typeNext, 600);

  // Animate mini skill bars
  setTimeout(()=>{
    document.querySelectorAll('.mini-bar').forEach(bar=>{
      bar.style.width = bar.dataset.w;
    });
  }, 800);

})();


/* 3D TILT */
const portrait=document.getElementById('portrait');
const shine=document.getElementById('tilt-shine');
if(portrait&&shine){
  portrait.addEventListener('mousemove',e=>{
    const r=portrait.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
    portrait.style.transform=`perspective(580px) rotateY(${x*13}deg) rotateX(${-y*13}deg) scale3d(1.02,1.02,1.02)`;
    shine.style.opacity='1';
    shine.style.background=`radial-gradient(circle at ${(x+.5)*100}% ${(y+.5)*100}%,rgba(232,255,71,.08),transparent 65%)`;
  });
  portrait.addEventListener('mouseleave',()=>{portrait.style.transform='';shine.style.opacity='0'});
}

/* PROJECT HOVER PREVIEW */
const preview=document.getElementById('proj-preview');
let praf;
document.querySelectorAll('.pr[data-preview]').forEach(row=>{
  row.addEventListener('mouseenter',()=>{
    preview.style.background=row.dataset.preview;
    preview.innerHTML=`<div style="padding:14px;height:100%;display:flex;flex-direction:column;gap:7px;justify-content:center"><div style="width:55%;height:3px;background:rgba(232,255,71,.3);border-radius:2px"></div><div style="width:38%;height:2px;background:rgba(237,237,245,.1);border-radius:2px"></div><div style="width:75%;height:2px;background:rgba(237,237,245,.06);border-radius:2px;margin-top:3px"></div><div style="width:60%;height:2px;background:rgba(237,237,245,.06);border-radius:2px"></div><div style="width:45%;height:2px;background:rgba(237,237,245,.06);border-radius:2px"></div></div>`;
    preview.classList.add('show');
  });
  row.addEventListener('mousemove',e=>{
    cancelAnimationFrame(praf);
    praf=requestAnimationFrame(()=>{preview.style.left=(e.clientX+18)+'px';preview.style.top=(e.clientY-64)+'px'});
  });
  row.addEventListener('mouseleave',()=>preview.classList.remove('show'));
});

/* TEXT SCRAMBLE */
function scramble(el,final){
  const ch='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
  let frame=0,total=22;
  const t=setInterval(()=>{
    el.textContent=final.split('').map((c,i)=>{
      if(c===' ')return ' ';
      if(frame/total>i/final.length)return c;
      return ch[Math.floor(Math.random()*ch.length)];
    }).join('');
    if(++frame>total){el.textContent=final;clearInterval(t)}
  },38);
}
const scEl=document.getElementById('scramble-txt');
if(scEl){
  const so=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){scramble(scEl,'together.');so.unobserve(e.target)}})},{threshold:.5});
  so.observe(scEl);
}

/* PARALLAX MARQUEE */
const mqa=document.querySelector('.mqa'),mqb=document.querySelector('.mqb');
window.addEventListener('scroll',()=>{
  const s=window.scrollY;
  if(mqa)mqa.style.transform=`translateX(calc(-50% + ${s*.038}px))`;
  if(mqb)mqb.style.transform=`translateX(calc(-50% - ${s*.028}px))`;
},{passive:true});

/* ── PAGE LOADER ── */
(function(){
  const loader=document.getElementById('loader');
  const lbar=document.getElementById('lbar');
  const lpct=document.getElementById('lpct');
  let p=0;
  const iv=setInterval(()=>{
    p+=Math.random()*18+4;
    if(p>=100){p=100;clearInterval(iv);setTimeout(()=>loader.classList.add('hide'),300)}
    lbar.style.width=Math.min(p,100)+'%';
    lpct.textContent=Math.round(Math.min(p,100))+'%';
  },60);
})();

/* ── SCROLL PROGRESS BAR ── */
const prog=document.getElementById('progress');
window.addEventListener('scroll',()=>{
  const doc=document.documentElement;
  const pct=(doc.scrollTop/(doc.scrollHeight-doc.clientHeight))*100;
  prog.style.width=pct+'%';
},{passive:true});

/* ── SECTION DOTS ── */
const sdotBtns=document.querySelectorAll('.sdot');
sdotBtns.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const el=document.getElementById(btn.dataset.s);
    if(el)el.scrollIntoView({behavior:'smooth'});
  });
});
window.addEventListener('scroll',()=>{
  let cur4='home';
  ['home','about','sertifikat','projects','skills','contact'].forEach(id=>{
    const el=document.getElementById(id);
    if(el&&window.scrollY>=el.offsetTop-160)cur4=id;
  });
  sdotBtns.forEach(b=>b.classList.toggle('on',b.dataset.s===cur4));
},{passive:true});

/* ── RIPPLE EFFECT ── */
document.querySelectorAll('.rpl-host').forEach(btn=>{
  btn.addEventListener('click',e=>{
    const r=btn.getBoundingClientRect();
    const d=document.createElement('span');
    const size=Math.max(r.width,r.height)*2;
    d.className='rpl';
    d.style.cssText=`width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
    btn.appendChild(d);
    setTimeout(()=>d.remove(),500);
  });
});

/* ── TOAST NOTIFICATION ── */
function showToast(msg,duration=3000){
  const t=document.getElementById('toast');
  const m=document.getElementById('toast-msg');
  m.textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),duration);
}
// Trigger toast when contact form is submitted
document.querySelector('.btem.rpl-host[style]')?.addEventListener('click',()=>{
  const inputs=document.querySelectorAll('#contact .cf');
  let filled=true;
  inputs.forEach(i=>{if(!i.value.trim())filled=false});
  showToast(filled?'Pesan terkirim! 🚀':'Lengkapi semua field dulu ya 👀');
});

/* ══════════════════════════════════
   FIREBASE — OBFUSCATED CONFIG
   Key split + base64 so tidak langsung
   terlihat di source. Lindungi dengan
   Firebase Security Rules di console!
══════════════════════════════════ */
(function(){
  // Config di-split dan di-encode ringan
  // ── FIXED CONFIG (correct base64) ──
  const _a = atob('QUl6YVN5QVJqVU0yZi1kTnlxdm0yTHhQaE9sNWFLUG9WSWJHZTNZ');
  const _b = atob('d2Vic2l0ZS1oZW5kcmk=');
  const _c = atob('aHR0cHM6Ly93ZWJzaXRlLWhlbmRyaS1kZWZhdWx0LXJ0ZGIuZmlyZWJhc2Vpby5jb20v');
  const _d = atob('d2Vic2l0ZS1oZW5kcmkuZmlyZWJhc2VhcHAuY29t');
  const _e = atob('d2Vic2l0ZS1oZW5kcmkuZmlyZWJhc2VzdG9yYWdlLmFwcA==');
  const _f = atob('Njk4NjA2MTg3ODgz');
  const _g = atob('MTo2OTg2MDYxODc4ODM6d2ViOjVmYmJiYTc2YTQ3ZjkzZTc2MDg4MmU=');
  const _h = atob('Ry1ZTFFNSkROUzFL');

  const cfg = {
    apiKey:_a, authDomain:_d, databaseURL:_c,
    projectId:_b, storageBucket:_e,
    messagingSenderId:_f, appId:_g, measurementId:_h
  };

  // Firebase v9 compat (CDN)
  const script1 = document.createElement('script');
  script1.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js';
  script1.onload = function(){
    const script2 = document.createElement('script');
    script2.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js';
    script2.onload = function(){
      const script3 = document.createElement('script');
      script3.src = 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js';
      script3.onload = function(){
        const app  = firebase.initializeApp(cfg);
        const db   = firebase.database();
        const auth = firebase.auth();
        initFirebaseFeatures(db, auth);
      };
      script3.onerror = function(){
        // Auth gagal load — jalankan tanpa auth
        const app = firebase.initializeApp(cfg);
        const db  = firebase.database();
        initFirebaseFeatures(db, null);
      };
      document.head.appendChild(script3);
    };
    document.head.appendChild(script2);
  };
  document.head.appendChild(script1);
})();


/* ══════════════════════════════════
   DEVICE DETECTOR + NAME BINDING
══════════════════════════════════ */
function detectDevice(){
  const ua = navigator.userAgent;
  let device = 'Unknown Device';
  let os = '';
  let browser = '';

  // ── iPhone model detection ──
  if(/iPhone/.test(ua)){
    const mem = navigator.deviceMemory;
    const hw  = navigator.hardwareConcurrency;
    // Rough model detection via screen + memory
    const w = screen.width, h = screen.height;
    const ratio = window.devicePixelRatio || 1;
    const pw = w * ratio, ph = h * ratio;
    if(pw >= 1290 && ph >= 2796) device = 'iPhone 14 Pro Max';
    else if(pw >= 1179 && ph >= 2556) device = 'iPhone 14 Pro';
    else if(pw >= 1284 && ph >= 2778) device = 'iPhone 12 Pro Max / 13 Pro Max';
    else if(pw >= 1170 && ph >= 2532) device = 'iPhone 12 / 13';
    else if(pw >= 1080 && ph >= 2340) device = 'iPhone 11 Pro Max';
    else if(pw >= 828  && ph >= 1792) device = 'iPhone 11 / XR';
    else if(pw >= 1125 && ph >= 2436) device = 'iPhone X / XS / 11 Pro';
    else if(pw >= 750  && ph >= 1334) device = 'iPhone 8 / SE';
    else if(pw >= 1242 && ph >= 2208) device = 'iPhone 8 Plus';
    else device = 'iPhone';
    os = 'iOS';
  }
  // ── iPad ──
  else if(/iPad/.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document)){
    device = 'iPad'; os = 'iPadOS';
  }
  // ── Android brands ──
  else if(/Android/.test(ua)){
    os = 'Android';
    // Realme
    if(/RMX|Realme|realme/i.test(ua)){
      const m = ua.match(/RMX\d+|Realme\s*\w+|realme\s*\w+/i);
      device = m ? 'Realme ' + m[0].replace(/realme|RMX/i,'').trim() : 'Realme';
    }
    // Samsung
    else if(/Samsung|SM-/i.test(ua)){
      const m = ua.match(/SM-[A-Z0-9]+/i);
      device = m ? 'Samsung ' + m[0] : 'Samsung';
    }
    // Xiaomi / Redmi / POCO
    else if(/Xiaomi|Redmi|POCO|Mi\s/i.test(ua)){
      const m = ua.match(/Redmi\s[\w\s]+|POCO\s[\w]+|Mi\s[\w]+|Xiaomi\s[\w]+/i);
      device = m ? m[0].trim() : 'Xiaomi';
    }
    // OPPO
    else if(/OPPO|CPH|oppo/i.test(ua)){
      const m = ua.match(/CPH\d+/i);
      device = m ? 'OPPO ' + m[0] : 'OPPO';
    }
    // Vivo
    else if(/vivo|V\d{4}/i.test(ua)){
      const m = ua.match(/vivo\s[\w]+|V\d{4}[A-Z]*/i);
      device = m ? 'Vivo ' + m[0].replace(/vivo/i,'').trim() : 'Vivo';
    }
    // Huawei
    else if(/Huawei|HUAWEI|Honor/i.test(ua)){
      const m = ua.match(/HUAWEI\s[\w-]+|Honor\s[\w]+/i);
      device = m ? m[0] : 'Huawei';
    }
    // OnePlus
    else if(/OnePlus|IN2|LE2/i.test(ua)){
      const m = ua.match(/OnePlus\s[\w]+|IN2\w+|LE2\w+/i);
      device = m ? 'OnePlus ' + m[0].replace(/OnePlus/i,'').trim() : 'OnePlus';
    }
    // Generic Android
    else {
      const m = ua.match(/\(Linux;.*?;\s*([\w\s-]+)\sBuild/);
      device = m ? m[1].trim() : 'Android Phone';
    }
  }
  // ── Desktop OS ──
  else if(/Windows NT/i.test(ua)){
    const m = ua.match(/Windows NT ([\d.]+)/);
    const ver = {10:'10/11',6.3:'8.1',6.2:'8',6.1:'7'}[m?m[1]:''] || '';
    device = 'Windows' + (ver?' '+ver:'') + ' PC'; os = 'Windows';
  }
  else if(/Macintosh|Mac OS X/i.test(ua)){
    device = 'MacBook / iMac'; os = 'macOS';
  }
  else if(/Linux/i.test(ua)){
    device = 'Linux PC'; os = 'Linux';
  }

  // ── OS Version detection ──
  let osVersion = '';
  if(/iPhone|iPad/.test(ua)){
    const m = ua.match(/OS (\d+[_\d]*)/);
    if(m) osVersion = 'iOS ' + m[1].replace(/_/g,'.');
  } else if(/Android/.test(ua)){
    const m = ua.match(/Android\s([\d.]+)/);
    if(m) osVersion = 'Android ' + m[1];
  } else if(/Windows NT/i.test(ua)){
    const m = ua.match(/Windows NT ([\d.]+)/);
    const ver = {'10.0':'10/11','6.3':'8.1','6.2':'8','6.1':'7'}[m?m[1]:'']||m?.[1]||'';
    if(ver) osVersion = 'Windows ' + ver;
  } else if(/Mac OS X/i.test(ua)){
    const m = ua.match(/Mac OS X ([\d_]+)/);
    if(m) osVersion = 'macOS ' + m[1].replace(/_/g,'.');
  }

  // ── Browser detection ──
  let browserVersion = '';
  if(/Edg\/([\d.]+)/i.test(ua))       { browser = 'Edge';    browserVersion = ua.match(/Edg\/([\d.]+)/i)?.[1]?.split('.')[0]||''; }
  else if(/OPR\/([\d.]+)/i.test(ua))  { browser = 'Opera';   browserVersion = ua.match(/OPR\/([\d.]+)/i)?.[1]?.split('.')[0]||''; }
  else if(/Chrome\/([\d.]+)/i.test(ua)){ browser = 'Chrome'; browserVersion = ua.match(/Chrome\/([\d.]+)/i)?.[1]?.split('.')[0]||''; }
  else if(/Firefox\/([\d.]+)/i.test(ua)){ browser = 'Firefox'; browserVersion = ua.match(/Firefox\/([\d.]+)/i)?.[1]?.split('.')[0]||''; }
  else if(/Version\/([\d.]+).*Safari/i.test(ua)){ browser = 'Safari'; browserVersion = ua.match(/Version\/([\d.]+)/i)?.[1]?.split('.')[0]||''; }
  else browser = 'Browser';

  const browserFull = browserVersion ? browser + ' ' + browserVersion : browser;

  return { device, os, osVersion, browser, browserFull,
    screen: screen.width + 'x' + screen.height,
    pixel: (window.devicePixelRatio||1) + 'x' };
}

// Global device info — detected once
const DEVICE = detectDevice();
console.log('%c Device: ' + DEVICE.device + ' | ' + (DEVICE.osVersion||DEVICE.os) + ' | ' + (DEVICE.browserFull||DEVICE.browser), 'color:#e8ff47;font-weight:bold');

// Save name → device binding to Firebase + localStorage
function saveNameDevice(db, name){
  if(!name || name.length < 1) return;
  const key = 'visitor_name';
  const prev = localStorage.getItem(key);
  localStorage.setItem(key, name);
  // Store in Firebase: visitors/{sanitized_name}
  const safeKey = name.toLowerCase().replace(/[^a-z0-9]/g,'_').slice(0,20);
  db.ref('visitors/' + safeKey).set({
    name:      name,
    device:    DEVICE.device,
    os:        DEVICE.osVersion || DEVICE.os,
    browser:   DEVICE.browserFull || DEVICE.browser,
    screen:    DEVICE.screen,
    pixel:     DEVICE.pixel,
    lastSeen:  Date.now()
  });
}

// Auto-fill saved name on page load
function autoFillName(){
  const saved = localStorage.getItem('visitor_name') || localStorage.getItem('chat_name') || localStorage.getItem('cmt_name');
  if(!saved) return;
  ['cn-in','cmt-name-in'].forEach(id => {
    const el = document.getElementById(id);
    if(el && !el.value) el.value = saved;
  });
}


function updateDeviceBadge(id, name){
  const el = document.getElementById(id);
  if(!el) return;
  if(name && name.length > 0){
    el.textContent = DEVICE.device;
    el.classList.add('show');
  } else {
    el.classList.remove('show');
  }
}

/* ── GLOBAL WRAPPERS — dipanggil dari HTML ── */
function cancelReply(){
  if(window._cancelReply) window._cancelReply();
}
function startReply(key, name, btn){
  if(window._startReply) window._startReply(key, name, btn);
}
function openCert(id){
  if(window._openCert) window._openCert(id);
}
/* ══ FIREBASE FEATURES ══ */
function initFirebaseFeatures(db, auth){

  // ── VISITOR TRACKING ──
  const uid = 'u_' + Math.random().toString(36).slice(2,10) + '_' + Date.now().toString(36);
  const presRef = db.ref('presence/' + uid);
  const onlineRef = db.ref('presence');

  // Wait for confirmed connection before setting presence
  db.ref('.info/connected').on('value', snap => {
    if(!snap.val()) return;
    // Save presence with full device info
    const savedName = localStorage.getItem('visitor_name') || localStorage.getItem('chat_name') || '';
    presRef.set({
      t:       Date.now(),
      name:    savedName || 'Anonymous',
      device:  DEVICE.device,
      os:      DEVICE.osVersion || DEVICE.os,
      browser: DEVICE.browserFull || DEVICE.browser,
    });
    presRef.onDisconnect().remove();
    // Auto-fill name inputs
    autoFillName();
  });

  // Count online users
  onlineRef.on('value', snap => {
    const count = snap.numChildren() || 0;
    const el = document.getElementById('vis-count');
    if(el) el.textContent = count;
    const el2 = document.getElementById('vis-count-mobile');
    if(el2) el2.textContent = count;
  });

  // Track total visits
  const visitsRef = db.ref('stats/visits');
  visitsRef.transaction(v => (v||0) + 1);

  // ── LIKES ──
  const likeRef = db.ref('stats/likes');
  const likedKey = 'liked_' + window.location.hostname;
  let isLiked = localStorage.getItem(likedKey) === '1';
  const likeFab = document.getElementById('like-fab');
  const likeCount = document.getElementById('like-count');

  likeRef.on('value', snap => {
    const n = snap.val() || 0;
    if(likeCount) likeCount.textContent = n >= 1000 ? (n/1000).toFixed(1)+'k' : n;
  });

  if(isLiked && likeFab) likeFab.classList.add('liked');

  if(likeFab) likeFab.addEventListener('click', () => {
    if(isLiked){
      isLiked = false;
      localStorage.setItem(likedKey,'0');
      likeFab.classList.remove('liked');
      likeRef.transaction(v => Math.max((v||0)-1, 0));
    } else {
      isLiked = true;
      localStorage.setItem(likedKey,'1');
      likeFab.classList.add('liked');
      likeFab.classList.remove('pop');
      void likeFab.offsetWidth;
      likeFab.classList.add('pop');
      likeRef.transaction(v => (v||0)+1);
      showToast('Terima kasih sudah suka! ❤️', 2500);
    }
  });


  // ── COMMENTS WITH THREADED REPLIES ──
  const cmtRef       = db.ref('comments');
  const cmtFab       = document.getElementById('cmt-fab');
  const cmtPanel     = document.getElementById('cmt-panel');
  const cmtPanelClose= document.getElementById('cmt-panel-close');
  const cmtListInner = document.getElementById('cmt-list-inner');
  const cmtEmptyEl   = document.getElementById('cmt-empty-state');
  const cmtFabCount  = document.getElementById('cmt-fab-count');
  const cmtPanelCount= document.getElementById('cmt-panel-count');
  const cmtNotifDot  = document.getElementById('cmt-notif');
  const cmtNameIn    = document.getElementById('cmt-name-in');
  const cmtTextIn    = document.getElementById('cmt-text-in');
  const cmtSendBtn   = document.getElementById('cmt-send');
  const replyIndicator    = document.getElementById('reply-indicator');
  const replyIndicatorTxt = document.getElementById('reply-indicator-text');

  let cmtPanelOpen   = false;
  let totalComments  = 0;
  let replyTo        = null; // { key, name }
  const MAX_REPLIES_SHOWN = 3;

  // Restore saved name
  const savedCmtName = localStorage.getItem('cmt_name') || '';
  if(cmtNameIn && savedCmtName) cmtNameIn.value = savedCmtName;

  // ── Toggle panel ──
  if(cmtFab) cmtFab.addEventListener('click', () => {
    cmtPanelOpen = !cmtPanelOpen;
    cmtPanel?.classList.toggle('open', cmtPanelOpen);
    if(cmtPanelOpen){
      if(cmtNotifDot) cmtNotifDot.style.display = 'none';
      setTimeout(()=>{ if(cmtListInner) cmtListInner.scrollTop = cmtListInner.scrollHeight; }, 100);
    }
  });
  if(cmtPanelClose) cmtPanelClose.addEventListener('click', () => {
    cmtPanelOpen = false;
    cmtPanel?.classList.remove('open');
  });

  // ── Helper: create avatar ──
  function makeAv(name, small){
    const size = small ? '22px' : '30px';
    const fs   = small ? '.5rem' : '.65rem';
    return `<div style="width:${size};height:${size};border-radius:50%;background:rgba(232,255,71,.08);border:1px solid rgba(232,255,71,.18);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Familjen Grotesk',sans-serif;font-weight:700;font-size:${fs};color:#e8ff47">${(name||'?').slice(0,2).toUpperCase()}</div>`;
  }

  // ── Render one top-level comment with collapsible replies ──
  function renderComment(key, d){
    if(cmtEmptyEl) cmtEmptyEl.style.display = 'none';

    const date  = new Date(d.t).toLocaleDateString('id',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
    // Device badge: "Realme C17 · Android 11 · Chrome 120"
    const deviceStr = [d.device, d.os, d.browser].filter(Boolean).join(' · ');
    const devBadge = deviceStr ? `<span style="font-family:'JetBrains Mono',monospace;font-size:.42rem;background:rgba(232,255,71,.07);border:1px solid rgba(232,255,71,.15);color:rgba(232,255,71,.6);padding:1px 5px;border-radius:100px;display:inline-flex;align-items:center;gap:3px">
      <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="rgba(232,255,71,.6)" stroke-width="2.5" stroke-linecap="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
      ${escHtml(deviceStr)}</span>` : '';
    const verifiedBadge = d.email ? `<span style="font-family:'JetBrains Mono',monospace;font-size:.42rem;background:rgba(66,133,244,.15);border:1px solid rgba(66,133,244,.3);color:#4285F4;padding:1px 5px;border-radius:100px;display:inline-flex;align-items:center;gap:2px"><svg width="7" height="7" viewBox="0 0 24 24" fill="#4285F4"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>Google</span>` : '';
    // Use Google photo if available
    const avatarHtml = d.photo
      ? `<img src="${escHtml(d.photo)}" style="width:30px;height:30px;border-radius:50%;border:1px solid rgba(232,255,71,.18);flex-shrink:0;object-fit:cover" onerror="this.outerHTML='${makeAv(d.name,false).replace(/'/g,'\'')}'"/>`
      : makeAv(d.name, false);

    // Device info: pisah device, OS, browser jadi lebih readable
    const deviceLine = [];
    if(d.device)  deviceLine.push(d.device);
    if(d.os)      deviceLine.push(d.os);
    if(d.browser) deviceLine.push(d.browser);
    if(d.screen)  deviceLine.push(d.screen);

    const deviceInfoHtml = deviceLine.length ? `
      <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;margin-top:5px">
        <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(232,255,71,.45)" stroke-width="2" stroke-linecap="round" style="flex-shrink:0"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
        ${deviceLine.map((v,i) => `<span style="font-family:'JetBrains Mono',monospace;font-size:.44rem;color:rgba(237,237,245,${i===0?'.5':'.3'})">${escHtml(v)}</span>${i<deviceLine.length-1?'<span style="color:rgba(237,237,245,.15);font-size:.44rem">·</span>':''}`).join('')}
      </div>` : '';

    const wrap = document.createElement('div');
    wrap.id = 'cmt-' + key;
    wrap.style.cssText = 'animation:msgIn .3s cubic-bezier(.16,1,.3,1)';
    wrap.innerHTML = `
      <div style="display:flex;gap:8px;align-items:flex-start;padding:10px 0 4px">
        ${avatarHtml}
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:3px">
            <span style="font-family:'Familjen Grotesk',sans-serif;font-weight:700;font-size:.82rem;color:#ededf5">${escHtml(d.name)}</span>
            ${verifiedBadge}
            <span style="font-family:'JetBrains Mono',monospace;font-size:.5rem;color:rgba(237,237,245,.25)">${date}</span>
          </div>
          <div style="font-size:.82rem;color:rgba(237,237,245,.72);line-height:1.55;word-break:break-word">${escHtml(d.text)}</div>
          ${deviceInfoHtml}
          <button data-replykey="${key}" data-replyname="${escHtml(d.name).replace(/"/g,'&quot;')}"
            style="margin-top:5px;display:inline-flex;align-items:center;gap:4px;font-family:'JetBrains Mono',monospace;font-size:.56rem;color:rgba(237,237,245,.3);background:transparent;border:none;cursor:pointer;padding:2px 0;transition:color .2s"
            onmouseover="this.style.color='#e8ff47'" onmouseout="this.style.color='rgba(237,237,245,.3)'">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 00-4-4H4"/></svg>
            Balas
          </button>
        </div>
      </div>
      <div id="replies-wrap-${key}" style="margin-left:38px;border-left:1px solid rgba(255,255,255,.06);padding-left:10px;display:none">
        <div id="replies-${key}"></div>
        <div id="replies-more-${key}"></div>
      </div>`;

    // Attach reply button click
    wrap.querySelector('[data-replykey]').addEventListener('click', function(){
      startReply(this.dataset.replykey, this.dataset.replyname);
    });

    if(cmtListInner) cmtListInner.appendChild(wrap);

    // Listen for replies to this comment
    const repliesArr = [];
    cmtRef.orderByChild('parentKey').equalTo(key).on('child_added', rSnap => {
      const r = rSnap.val();
      if(!r) return;
      repliesArr.push({ key: rSnap.key, data: r });
      renderReplies(key, repliesArr);

      // Notify if someone replied to MY comment
      const myName = localStorage.getItem('visitor_name') || localStorage.getItem('cmt_name') || '';
      console.log('Reply check — replyToName:', r.replyToName, '| myName:', myName, '| match:', r.replyToName === myName);
      if(r.replyToName && myName && r.replyToName.toLowerCase().trim() === myName.toLowerCase().trim() && r.name !== myName){
        // Badge di fab
        if(cmtNotifDot){
          cmtNotifDot.style.display = 'block';
          cmtNotifDot.style.background = '#e8ff47';
        }
        // Toast dengan pesan keren — selalu tampil
        showToast('💬 ' + escHtml(r.name) + ' membalas komentar kamu!', 5000);
        // Browser Notification
        if('Notification' in window){
          if(Notification.permission === 'granted'){
            try {
              new Notification('💬 Ada balasan di Portfolio Hendri!', {
                body: r.name + ' membalas kamu: "' + r.text.slice(0,80) + (r.text.length>80?'...' : '"'),
                icon: 'foto.jpg',
                tag: 'reply-' + rSnap.key,
              });
            } catch(e){ console.log('Notif error:', e); }
          } else if(Notification.permission === 'default'){
            // Auto-minta izin
            Notification.requestPermission().then(p => {
              console.log('Notification permission:', p);
            });
          }
        }
      }

      if(cmtListInner) cmtListInner.scrollTop = cmtListInner.scrollHeight;
    });
  }

  // ── Render replies with collapse (max 3 shown) ──
  function renderReplies(parentKey, arr){
    const container = document.getElementById('replies-' + parentKey);
    const moreEl    = document.getElementById('replies-more-' + parentKey);
    const wrapEl    = document.getElementById('replies-wrap-' + parentKey);
    if(!container || !moreEl || !wrapEl) return;

    wrapEl.style.display = arr.length > 0 ? 'block' : 'none';
    container.innerHTML = '';

    const showAll  = wrapEl.dataset.showAll === '1';
    const toShow   = showAll ? arr : arr.slice(0, MAX_REPLIES_SHOWN);
    const remaining= arr.length - MAX_REPLIES_SHOWN;

    toShow.forEach(({key, data}) => {
      const date = new Date(data.t).toLocaleDateString('id',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});
      const mention = data.replyToName ? `<span style="color:rgba(232,255,71,.7);font-size:.75rem">@${escHtml(data.replyToName)}</span> ` : '';
      const div = document.createElement('div');
      div.style.cssText = 'display:flex;gap:7px;align-items:flex-start;padding:7px 0;animation:msgIn .3s cubic-bezier(.16,1,.3,1)';
      // Contact button if wa/email available
      const waNum   = data.wa ? (data.wa.startsWith('0') ? '62'+data.wa.slice(1) : data.wa) : '';
      const contactBtn = data.wa
        ? `<a href="https://wa.me/${waNum}?text=Halo%20${encodeURIComponent(data.name)}!" target="_blank" style="display:inline-flex;align-items:center;gap:3px;background:#25d366;color:#fff;font-family:'JetBrains Mono',monospace;font-size:.5rem;font-weight:700;padding:2px 8px;border-radius:100px;text-decoration:none;margin-left:4px">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WA
          </a>`
        : data.email
        ? `<a href="mailto:${escHtml(data.email)}" style="display:inline-flex;align-items:center;gap:3px;background:#ea4335;color:#fff;font-family:'JetBrains Mono',monospace;font-size:.5rem;font-weight:700;padding:2px 8px;border-radius:100px;text-decoration:none;margin-left:4px">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Email
          </a>`
        : '';

      div.innerHTML = `
        ${makeAv(data.name, true)}
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;margin-bottom:2px">
            <span style="font-family:'Familjen Grotesk',sans-serif;font-weight:700;font-size:.76rem;color:#ededf5">${escHtml(data.name)}</span>
            ${contactBtn}
            <span style="font-family:'JetBrains Mono',monospace;font-size:.48rem;color:rgba(237,237,245,.22)">${date}</span>
          </div>
          <div style="font-size:.78rem;color:rgba(237,237,245,.65);line-height:1.5;word-break:break-word">${mention}${escHtml(data.text)}</div>
          <button data-replykey="${parentKey}" data-replyname="${escHtml(data.name).replace(/"/g,'&quot;')}"
            style="margin-top:3px;display:inline-flex;align-items:center;gap:3px;font-family:'JetBrains Mono',monospace;font-size:.52rem;color:rgba(237,237,245,.25);background:transparent;border:none;cursor:pointer;transition:color .2s"
            onmouseover="this.style.color='#e8ff47'" onmouseout="this.style.color='rgba(237,237,245,.25)'">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 00-4-4H4"/></svg>
            Balas
          </button>
        </div>`;
      div.querySelector('[data-replykey]').addEventListener('click', function(){
        startReply(this.dataset.replykey, this.dataset.replyname);
      });
      container.appendChild(div);
    });

    // Show more / collapse button
    moreEl.innerHTML = '';
    if(!showAll && remaining > 0){
      const btn = document.createElement('button');
      btn.style.cssText = "display:flex;align-items:center;gap:4px;font-family:'JetBrains Mono',monospace;font-size:.58rem;color:rgba(232,255,71,.6);background:transparent;border:none;cursor:pointer;padding:4px 0;transition:color .2s";
      btn.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg> Lihat ${remaining} balasan lainnya`;
      btn.onmouseover = ()=>btn.style.color='#e8ff47';
      btn.onmouseout  = ()=>btn.style.color='rgba(232,255,71,.6)';
      btn.onclick = () => { wrapEl.dataset.showAll='1'; renderReplies(parentKey, arr); };
      moreEl.appendChild(btn);
    } else if(showAll && arr.length > MAX_REPLIES_SHOWN){
      const btn = document.createElement('button');
      btn.style.cssText = "display:flex;align-items:center;gap:4px;font-family:'JetBrains Mono',monospace;font-size:.58rem;color:rgba(237,237,245,.25);background:transparent;border:none;cursor:pointer;padding:4px 0";
      btn.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg> Sembunyikan`;
      btn.onclick = () => { wrapEl.dataset.showAll='0'; renderReplies(parentKey, arr); };
      moreEl.appendChild(btn);
    }
  }

  // Load top-level comments
  cmtRef.orderByChild('t').limitToLast(100).on('child_added', snap => {
    const d = snap.val();
    if(!d || d.parentKey) return; // skip replies
    totalComments++;
    const cnt = totalComments >= 1000 ? (totalComments/1000).toFixed(1)+'k' : totalComments;
    if(cmtFabCount) cmtFabCount.textContent = cnt;
    if(cmtPanelCount) cmtPanelCount.textContent = cnt + ' komentar';
    renderComment(snap.key, d);
    if(!cmtPanelOpen && cmtNotifDot) cmtNotifDot.style.display = 'block';
    if(cmtListInner) cmtListInner.scrollTop = cmtListInner.scrollHeight;
  });

  // ── GOOGLE AUTH ──
  const googleBtn    = document.getElementById('cmt-google-btn');
  const loginPrompt  = document.getElementById('cmt-login-prompt');
  const userInfoEl   = document.getElementById('cmt-user-info');
  const cmtForm      = document.getElementById('cmt-form');
  const userPhoto    = document.getElementById('cmt-user-photo');
  const userNameEl   = document.getElementById('cmt-user-name');
  const userEmailEl  = document.getElementById('cmt-user-email');
  const logoutBtn    = document.getElementById('cmt-logout-btn');

  let currentUser = null;

  const cmtNameWrap = document.getElementById('cmt-name-wrap');

  // ── Auth state listener ──
  if(auth) auth.onAuthStateChanged(user => {
    currentUser = user;
    if(user){
      // Sudah login — tampil info user, sembunyikan login prompt
      if(loginPrompt) loginPrompt.style.display = 'none';
      if(userInfoEl)  userInfoEl.style.display  = 'flex';
      if(userPhoto)   userPhoto.src = user.photoURL || '';
      if(userNameEl)  userNameEl.textContent = user.displayName || 'User';
      // Sembunyikan nama input — pakai nama dari Google
      if(cmtNameWrap) cmtNameWrap.style.display = 'none';
      localStorage.setItem('visitor_name', user.displayName || '');
      saveNameDevice(db, user.displayName || 'User');
    } else {
      // Belum login — sembunyikan semua elemen auth
      if(loginPrompt) loginPrompt.style.display = 'none'; // hidden by default
      if(userInfoEl)  userInfoEl.style.display  = 'none';
      // Tampilkan nama input untuk komentar biasa
      if(cmtNameWrap) cmtNameWrap.style.display = 'block';
    }
  });

  // ── Google Sign In ──
  if(googleBtn && auth) googleBtn.addEventListener('click', async () => {
    try {
      googleBtn.innerHTML = '⏳ Membuka Google...';
      googleBtn.disabled = true;
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await auth.signInWithPopup(provider);
      if(result.user) showToast('Login berhasil! 🎉');
    } catch(err) {
      googleBtn.disabled = false;
      googleBtn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> Masuk dengan Google`;
      console.error('Auth error:', err.code, err.message);
      if(err.code === 'auth/popup-blocked'){
        showToast('⚠️ Popup diblokir browser! Izinkan popup di address bar atas');
      } else if(err.code === 'auth/unauthorized-domain'){
        showToast('⚠️ Buka via localhost:5500 bukan 127.0.0.1:5500');
      } else if(err.code !== 'auth/popup-closed-by-user'){
        showToast('❌ ' + err.code + ': ' + err.message);
      }
    }
  });

  // Handle redirect result (fallback)
  if(auth) auth.getRedirectResult().catch(()=>{});

  // ── Logout ──
  if(logoutBtn && auth) logoutBtn.addEventListener('click', async () => {
    await auth.signOut();
    cancelReply();
    showToast('Sampai jumpa! 👋');
  });

  // ── Start reply mode ──
  window._startReply = startReply;
  function startReply(key, name){
    // Buka panel dulu kalau belum buka
    if(!cmtPanelOpen){
      cmtPanelOpen = true;
      cmtPanel?.classList.add('open');
    }

    if(!currentUser){
      // Belum login → tampilkan login prompt
      replyTo = { key, name }; // simpan dulu
      if(replyIndicator) replyIndicator.style.display = 'flex';
      if(replyIndicatorTxt) replyIndicatorTxt.innerHTML = `
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#e8ff47" stroke-width="2.5" stroke-linecap="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 00-4-4H4"/></svg>
        Membalas <span style="color:#e8ff47">@${escHtml(name)}</span>`;
      if(loginPrompt){
        loginPrompt.style.display = 'flex';
        loginPrompt.scrollIntoView({behavior:'smooth', block:'nearest'});
      }
      if(cmtNameWrap) cmtNameWrap.style.display = 'none';
      return;
    }

    // Sudah login
    replyTo = { key, name };
    if(replyIndicator) replyIndicator.style.display = 'flex';
    if(replyIndicatorTxt) replyIndicatorTxt.innerHTML = `
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#e8ff47" stroke-width="2.5" stroke-linecap="round"><polyline points="9 14 4 9 9 4"/><path d="M20 20v-7a4 4 0 00-4-4H4"/></svg>
      Membalas <span style="color:#e8ff47">@${escHtml(name)}</span>`;
    if(cmtTextIn){
      cmtTextIn.value = '';
      cmtTextIn.placeholder = 'Balas @' + name + '...';
      setTimeout(() => cmtTextIn.focus(), 150);
    }
  }

  // ── Cancel reply mode ──
  window._cancelReply = cancelReply;
  function cancelReply(){
    replyTo = null;
    if(replyIndicator) replyIndicator.style.display = 'none';
    if(loginPrompt && !currentUser) loginPrompt.style.display = 'none';
    if(cmtNameWrap) cmtNameWrap.style.display = currentUser ? 'none' : 'block';
    if(cmtTextIn){ cmtTextIn.value = ''; cmtTextIn.placeholder = 'Tulis komentar...'; }
    if(cmtPanelCount){
      const cnt = totalComments >= 1000 ? (totalComments/1000).toFixed(1)+'k' : totalComments;
      cmtPanelCount.textContent = cnt + ' komentar';
    }
  }

  // ── Send comment / reply ──
  function sendComment(){
    const text = cmtTextIn?.value.trim();
    if(!text){ showToast('Tulis komentarnya dulu ya ✍️'); return; }

    // Reply: wajib login
    if(replyTo && !currentUser){
      showToast('Login Google dulu untuk membalas 😊');
      if(loginPrompt) loginPrompt.style.display = 'flex';
      return;
    }

    // Nama: dari Google kalau login, dari input kalau tidak
    const name  = currentUser ? (currentUser.displayName || 'User') : (cmtNameIn?.value.trim() || 'Anonymous');
    const email = currentUser ? (currentUser.email || '') : '';
    const photo = currentUser ? (currentUser.photoURL || '') : '';
    const uid   = currentUser ? currentUser.uid : '';

    if(!name){ showToast('Isi nama kamu dulu 👀'); return; }

    const payload = {
      name:    name.slice(0,40),
      text:    text.slice(0,300),
      t:       Date.now(),
      device:  DEVICE.device,
      os:      DEVICE.osVersion || DEVICE.os,
      browser: DEVICE.browserFull || DEVICE.browser,
      screen:  DEVICE.screen,
      uid,
      email,
      photo,
    };
    if(replyTo){
      payload.parentKey   = replyTo.key;
      payload.replyToName = replyTo.name;
    }

    cmtRef.push(payload)
      .then(() => {
        if(cmtTextIn) cmtTextIn.value = '';
        const wasReply = !!replyTo;
        cancelReply();
        showToast(wasReply ? '↩️ Balasan terkirim!' : 'Komentar terkirim! 🎉');
        // Minta izin notifikasi setelah komentar pertama
        if('Notification' in window && Notification.permission === 'default'){
          setTimeout(() => {
            Notification.requestPermission().then(perm => {
              if(perm === 'granted'){
                showToast('🔔 Notifikasi aktif! Kamu akan dapat pemberitahuan kalau ada yang balas', 3000);
              }
            });
          }, 1500);
        }
      })
      .catch(err => showToast('❌ Gagal: ' + err.message));
  }

  if(cmtSendBtn) cmtSendBtn.addEventListener('click', sendComment);
  if(cmtTextIn) cmtTextIn.addEventListener('keydown', e => {
    if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); sendComment(); }
    if(e.key==='Escape') cancelReply();
  });
    console.log('%c Portfolio by DEV·IO — Firebase connected ✓', 'color:#e8ff47;font-weight:bold');
}

/* Escape HTML helper */
function escHtml(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }


/* ══════════════════════════════════
   GROQ AI CHATBOT (llama-3.3-70b)
══════════════════════════════════ */
(function(){
  // Key Groq ada di .env (server.js), bukan di browser.
  // Dibuka dari file lokal (file://) → panggil fungsi di Vercel. Di Vercel → pakai path relatif.
  const CHAT_API = location.protocol === 'file:'
    ? 'https://portofolio-website-hendri.vercel.app/api/chat'
    : '/api/chat';


  // ── AI BACA SELURUH ISI HTML SECARA LANGSUNG ──
  // Membaca setiap section: home, about, projects, skills, contact
  // Kalau Hendri update apapun di HTML → AI langsung tau otomatis

  function readFullPage() {
    function clean(text) {
      return (text || '').replace(/\s+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    }
    function secText(id) {
      const el = document.getElementById(id);
      if (!el) return '';
      // Clone to avoid mutating live DOM
      const clone = el.cloneNode(true);
      // Remove canvas, script, style, buttons we don't want
      clone.querySelectorAll('canvas,script,style,#ai-panel,#cmt-panel,#loader').forEach(e => e.remove());
      return clean(clone.innerText);
    }

    const sections = {
      home:     secText('home'),
      about:    secText('about'),
      projects: secText('projects'),
      skills:   secText('skills'),
      contact:  secText('contact'),
    };

    // Extra structured data for better AI understanding
    const structured = {
      projectList: Array.from(document.querySelectorAll('.pr')).map(pr => {
        const title = pr.querySelector('.prtitle')?.innerText || '';
        const desc  = pr.querySelector('p')?.innerText || '';
        const tech  = Array.from(pr.querySelectorAll('.chip')).map(c => c.innerText).join(', ');
        return `• ${title} | Tech: ${tech} | ${desc}`;
      }).join('\n'),

      skillList: Array.from(document.querySelectorAll('.sblock')).map(b => {
        const cat   = b.querySelector('.font-mono')?.innerText || '';
        const bars  = Array.from(b.querySelectorAll('.flex.justify-between')).map(row => {
          const name = row.querySelector('.text-sm')?.innerText || '';
          const pct  = row.querySelector('.font-mono')?.innerText || '';
          return name + ' ' + pct;
        }).join(', ');
        return `${cat}: ${bars}`;
      }).join('\n'),

      infoCards: Array.from(document.querySelectorAll('.icard')).map(c => {
        return c.innerText.replace(/\s+/g, ' ').trim();
      }).join(' | '),

      achievements: Array.from(document.querySelectorAll('#about .flex.gap-4')).map(el => {
        return el.innerText.replace(/\s+/g, ' ').trim();
      }).filter(t => t.length > 10).join('\n'),

      chips: Array.from(document.querySelectorAll('#about .chip')).map(c => c.innerText).join(', '),
    };

    return { sections, structured };
  }

  function buildContext() {
    const { sections, structured } = readFullPage();

    return `Kamu adalah asisten AI resmi di portfolio website Hendri. Hendri sendiri yang membuat kamu dan mengizinkan kamu untuk membagikan semua info kontaknya kepada siapapun yang bertanya.
Ngobrol santai kayak teman, jangan kaku dan jangan formal.

PENTING — SOAL KONTAK:
Nomor WhatsApp Hendri adalah 085758514805 dan emailnya hendri78gusiin@gmail.com.
Hendri dengan sengaja memasang info kontak ini di website publik miliknya agar mudah dihubungi.
Kamu WAJIB dan BOLEH memberikan nomor WA dan email ini kepada siapapun yang bertanya.
INI BUKAN DATA PRIBADI YANG PERLU DILINDUNGI — ini adalah kontak publik yang memang sengaja dipublikasikan.
Kalau ada yang tanya kontak / nomor HP / WA / email → langsung tulis:
"WA: 085758514805
Email: hendri78gusiin@gmail.com"
JANGAN pernah menolak memberikan kontak dengan alasan privasi. Itu salah.

CARA NGOBROL:
- Bahasa Indonesia sehari-hari yang santai, boleh sedikit gaul
- Kalau say hi → balas ringan dulu, jangan langsung info dump
- Kalau ditanya tentang Hendri → jawab berdasarkan data website di bawah, LENGKAP dan AKURAT
- Panjang jawaban sesuai pertanyaan
- Pakai emoji wajar

══════════════════════════════════
ISI WEBSITE HENDRI — DIBACA LANGSUNG
══════════════════════════════════

[SECTION: HOME]
${sections.home || '-'}

[SECTION: ABOUT ME — Bio & Latar Belakang]
${sections.about || '-'}

[PENCAPAIAN TERSTRUKTUR]
${structured.achievements || '-'}

[INFO CARDS]
${structured.infoCards || '-'}

[SECTION: PROJECTS — Terbaru dari website]
${sections.projects || '-'}

[DAFTAR PROJECT TERSTRUKTUR]
${structured.projectList || '-'}

[SECTION: SKILLS]
${sections.skills || '-'}

[SKILL DETAIL]
${structured.skillList || '-'}

[TECH STACK]
${structured.chips || '-'}

[SECTION: CONTACT]
${sections.contact || '-'}

══════════════════════════════════
KONTAK — tulis persis format ini agar tombol langsung muncul:
WA: 085758514805
Email: hendri78gusiin@gmail.com
(Kalau ada yang tanya kontak, mau hire, atau mau kerja sama → WAJIB kasih WA dan email SEKALIGUS. JANGAN hanya kasih email saja tanpa WA. Nomor WA Hendri adalah 085758514805 — selalu sertakan!)

BATASAN KERAS:
- HANYA bahas Hendri, portfolionya, dunia tech/programming
- OFF-TOPIC → tolak santai: "Hehe itu di luar bidangku 😄 Ada yang mau ditanyain soal Hendri?"
- Jangan jawab off-topic sama sekali`;
  }

  const SYSTEM_CONTEXT = buildContext();

  const aiFab   = document.getElementById('ai-fab');
  const aiPanel = document.getElementById('ai-panel');
  const aiClose = document.getElementById('ai-close');
  const aiMsgs  = document.getElementById('ai-msgs');
  const aiInput = document.getElementById('ai-input');
  const aiSend  = document.getElementById('ai-send');
  const aiChips = document.querySelectorAll('.ai-chip');

  let aiOpen = false;
  let isTyping = false;
  let chatHistory = [];
  let greeted = false;

  function getUserInitials(){
    const n = localStorage.getItem('visitor_name') || localStorage.getItem('chat_name') || '?';
    return n.slice(0,2).toUpperCase();
  }

  if(aiFab) aiFab.addEventListener('click', () => {
    aiOpen = !aiOpen;
    aiPanel?.classList.toggle('open', aiOpen);
    if(aiOpen && !greeted){
      greeted = true;
      setTimeout(() => addBotMsg(
        '👋 Halo! Saya asisten AI-nya Hendri.\n\nMau tanya-tanya soal Hendri, projectnya, atau dunia tech? Gas aja, saya siap nemenin! 😄'
      ), 300);
    }
    if(aiOpen) setTimeout(() => aiInput?.focus(), 450);
  });

  if(aiClose) aiClose.addEventListener('click', () => {
    aiOpen = false;
    aiPanel?.classList.remove('open');
  });

  aiChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.dataset.q;
      if(q) sendMessage(q);
    });
  });

  if(aiSend) aiSend.addEventListener('click', () => sendMessage(aiInput?.value?.trim()));
  if(aiInput) aiInput.addEventListener('keydown', e => {
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); sendMessage(aiInput.value.trim()); }
  });

  function addUserMsg(text){
    const row = document.createElement('div');
    row.className = 'ai-msg user';
    row.innerHTML = `<div class="ai-av usr">${getUserInitials()}</div><div class="ai-bubble">${escHtml(text)}</div>`;
    aiMsgs?.appendChild(row);
    scrollAI();
  }

  function addBotMsg(text){
    document.getElementById('ai-typing-row')?.remove();
    const row = document.createElement('div');
    row.className = 'ai-msg';

    // Format markdown bold
    let formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\n/g, '<br>');

    // Auto-detect WA number → clickable button
    formatted = formatted.replace(
      /(?:WA|WhatsApp|wa|whatsapp)[:\s]*([0-9]{9,15})/gi,
      (match, num) => {
        const clean = num.replace(/\D/g,'');
        const waNum = clean.startsWith('0') ? '62' + clean.slice(1) : clean;
        return `${match} <a href="https://wa.me/${waNum}?text=Halo%20Hendri%2C%20saya%20tertarik%20dengan%20portfolio%20kamu!" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:#25d366;color:#fff;font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:700;padding:4px 10px;border-radius:100px;text-decoration:none;margin-left:4px;vertical-align:middle"><svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>Chat di WhatsApp</a>`;
      }
    );

    // Auto-detect email → clickable button  
    formatted = formatted.replace(
      /([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g,
      (match, email) => {
        return `<a href="mailto:${email}?subject=Halo%20Hendri%20dari%20Portfolio&body=Halo%20Hendri%2C%20saya%20tertarik%20ingin%20berkolaborasi%20dengan%20kamu!" target="_blank" style="display:inline-flex;align-items:center;gap:5px;background:#ea4335;color:#fff;font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:700;padding:4px 10px;border-radius:100px;text-decoration:none;margin-left:4px;vertical-align:middle"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>${email}</a>`;
      }
    );

    row.innerHTML = `
      <div class="ai-av bot">
        <svg viewBox="0 0 24 24"><path d="M12 2l2.4 6.4L21 12l-6.6 3.6L12 22l-2.4-6.4L3 12l6.6-3.6z"/></svg>
      </div>
      <div class="ai-bubble">${formatted}</div>`;
    aiMsgs?.appendChild(row);
    scrollAI();
  }

  function showTyping(){
    document.getElementById('ai-typing-row')?.remove();
    const row = document.createElement('div');
    row.id = 'ai-typing-row';
    row.className = 'ai-msg';
    row.innerHTML = `
      <div class="ai-av bot">
        <svg viewBox="0 0 24 24"><path d="M12 2l2.4 6.4L21 12l-6.6 3.6L12 22l-2.4-6.4L3 12l6.6-3.6z"/></svg>
      </div>
      <div class="ai-bubble" style="padding:8px 14px">
        <div class="ai-typing"><span></span><span></span><span></span></div>
      </div>`;
    aiMsgs?.appendChild(row);
    scrollAI();
  }

  function scrollAI(){
    if(aiMsgs) setTimeout(() => aiMsgs.scrollTop = aiMsgs.scrollHeight, 50);
  }

  async function sendMessage(text){
    if(!text || isTyping) return;
    if(aiInput) aiInput.value = '';
    isTyping = true;

    addUserMsg(text);
    showTyping();
    chatHistory.push({ role: 'user', content: text });

    // Key ada di server (.env); rotasi key dilakukan server.js
    try {
      const res = await fetch(CHAT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: SYSTEM_CONTEXT },
            ...chatHistory
          ],
          max_tokens: 300,
          temperature: 0.8
        })
      });
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.error?.message || 'API error ' + res.status);
      }
      const reply = data.choices?.[0]?.message?.content || 'Maaf, tidak bisa menjawab saat ini.';
      chatHistory.push({ role: 'assistant', content: reply });
      if(chatHistory.length > 20) chatHistory = chatHistory.slice(-20);
      addBotMsg(reply);
      isTyping = false;
    } catch(err){
      document.getElementById('ai-typing-row')?.remove();
      const msg = err.message || '';
      addBotMsg('❌ ' + (/limit|quota|rate/i.test(msg)
        ? 'Semua API key sedang limit. Coba lagi dalam beberapa menit ya 🙏'
        : 'Gagal: ' + msg));
      console.error('Chat error:', msg);
      isTyping = false;
    }
  }
})();
/* ══════════════════════════════════
   CERTIFICATE MODAL SYSTEM
   Cara pakai: ganti cert: 'nama-file.jpg'
   dengan nama file sertifikat kamu.
   Taruh file di folder yang sama dengan hendri.html
══════════════════════════════════ */
/* ══════════════════════════════════
   DATA SERTIFIKAT LENGKAP
   Cara pakai:
   1. Isi cert: 'nama-file.jpg' sesuai file sertifikat kamu
   2. Taruh semua file sertifikat di folder: sertifikat/
   3. Kalau file belum ada, placeholder otomatis muncul
══════════════════════════════════ */
const CERTS = {
  /* --- KULIAH / KAMPUS --- */
  'infest-hackathon': {
    icon: '\u{1F3C6}', kategori: 'Kuliah',
    title: 'Juara 3 Lomba Hackathon INFEST 2026',
    org:   'Politeknik Manufaktur Negeri Bangka Belitung (HMJ Informatika dan Bisnis)',
    year:  '2026',
    desc:  'Juara Ketiga lomba Hackathon dalam kegiatan INFEST 2026, dilaksanakan 15 April 2026.',
    cert:  'sertifikat/infest-2026-juara-3-hackathon.png',
  },
  'pkm-ptma': {
    icon: '\u{1F4DC}', kategori: 'Kuliah',
    title: 'Peserta PKM PTMA 2026',
    org:   'Puspresma PTMA & Universitas Muhammadiyah Bone',
    year:  '2026',
    desc:  'Lomba Penilaian Kemajuan Pelaksanaan Program PKM PTMA, daring, 29 Agustus 2026. Sebagai Peserta Anggota 1.',
    cert:  'sertifikat/pkm-ptma-2026-peserta.png',
  },
  'summer-course-talent': {
    icon: '\u{1F393}', kategori: 'Kuliah',
    title: 'Talent - 2nd International Summer Course',
    org:   'Universitas Muhammadiyah Bangka Belitung',
    year:  '2024',
    desc:  'Tema: Innovative AI Solutions for Sustainable Tourism and Conservation.',
    cert:  'sertifikat/summer-course-talent-umbb-2024.png',
  },
  'summer-course-international': {
    icon: '\u{1F30F}', kategori: 'Kuliah',
    title: 'International Summer Course 2024 - AI for Sustainable Tourism',
    org:   'Universitas Muhammadiyah Bangka Belitung (Office of International Affairs)',
    year:  '2024',
    desc:  'Sertifikat partisipasi 3 minggu (5-24 Agustus 2024) dan daftar materi 30 JP.',
    cert:  ['sertifikat/summer-course-international-2024-hal-1.png', 'sertifikat/summer-course-international-2024-hal-2.png'],
  },  'himik-sk': {
    icon: '\u{1F3DB}\uFE0F', kategori: 'Kuliah',
    title: 'Sekretaris 1 - HIMIK Ilmu Komputer',
    org:   'Fakultas Teknik dan Sains, UM Bangka Belitung',
    year:  '2025-2026',
    desc:  'SK Dekan No. 010/KEP/XIV/A/2025 tentang Pengurus HIMIK Periode 2025-2026.',
    cert:  [
      'sertifikat/himik-sk-sekretaris-2025-2026-hal-1.png',
      'sertifikat/himik-sk-sekretaris-2025-2026-hal-2.png',
      'sertifikat/himik-sk-sekretaris-2025-2026-hal-3.png',
      'sertifikat/himik-sk-sekretaris-2025-2026-hal-4.png',
    ],
  },
  'rtik-sk': {
    icon: '\u{1F4BB}', kategori: 'Kuliah',
    title: 'Sekretaris I - UKM RTIK',
    org:   'Relawan Teknologi Informasi dan Komunikasi, UM Bangka Belitung',
    year:  '2025-2026',
    desc:  'SK Rektor No. 1802/KEP/I.2/F/2025 tentang Pengurus UKM RTIK Periode 2025-2026.',
    cert:  [
      'sertifikat/rtik-sk-ukm-2025-hal-1.png',
      'sertifikat/rtik-sk-ukm-2025-hal-2.png',
      'sertifikat/rtik-sk-ukm-2025-hal-3.png',
      'sertifikat/rtik-sk-ukm-2025-hal-4.png',
    ],
  },  'revou-software-engineering': {
    icon: '\u{1F4BB}', kategori: 'Kuliah',
    title: 'Intro to Software Engineering',
    org:   'RevoU (PT Revolusi Cita Edukasi)',
    year:  '2026',
    desc:  'Kursus online 1 minggu, Coding Camp. Diterbitkan 20 Februari 2026.',
    cert:  'sertifikat/revou-intro-software-engineering.png',
  },

  'pkm-puspresma-bimtek': {
    icon: '\u{1F4DC}', kategori: 'Kuliah',
    title: 'Peserta Bimtek Pendampingan PKM 2026',
    org:   'Pusat Prestasi Mahasiswa PTMA (PUSPRESMA PTMA)',
    year:  '2026',
    desc:  'Acara Bimtek Pendampingan PKM Pendanaan Tahun 2026, Zoom Meeting 10 Juni 2026.',
    cert:  [
      'sertifikat/pkm-puspresma-bimtek-2026-hal-1.png',
    ],
  },
  'kkn-umm': {
    icon: '\u{1F3D8}\uFE0F', kategori: 'Kuliah',
    title: 'Peserta KKN Muhammadiyah \'Aisyiyah 2026',
    org:   'Universitas Muhammadiyah Malang (LPPM)',
    year:  '2026',
    desc:  'Nilai A (Sangat Baik). Tema: Mewujudkan Desa Berkemajuan Berbasis Pemberdayaan Ekonomi, Pendidikan dan Digitalisasi.',
    cert:  'sertifikat/kkn-umm-2026.png',
  },
  'dicoding-dasar-ai': {
    icon: '\u{1F916}', kategori: 'Kuliah',
    title: 'Belajar Dasar AI',
    org:   'Dicoding Indonesia (Google Cloud Partner)',
    year:  '2025',
    desc:  'Kelas dasar AI, Machine Learning, dan Deep Learning. Total 10 jam. Lulus 03 Oktober 2025.',
    cert:  [
      'sertifikat/dicoding-belajar-dasar-ai-2025-hal-1.png',
      'sertifikat/dicoding-belajar-dasar-ai-2025-hal-2.png',
    ],
  },
  'dicoding-python': {
    icon: '\u{1F40D}', kategori: 'Kuliah',
    title: 'Memulai Pemrograman dengan Python',
    org:   'Dicoding Indonesia (Google Developers Authorized Training Partner)',
    year:  '2025',
    desc:  'Kelas dasar Python: dari variabel, control flow, array, fungsi, sampai OOP. Total 60 jam. Lulus 08 Oktober 2025.',
    cert:  [
      'sertifikat/dicoding-python-2025-hal-1.png',
      'sertifikat/dicoding-python-2025-hal-2.png',
      'sertifikat/dicoding-python-2025-hal-3.png',
    ],
  },
  'surat-ciptaan-rimbarest': {
    icon: '\u{00A9}\uFE0F', kategori: 'Kuliah',
    title: 'Surat Pencatatan Ciptaan - Rimbarest',
    org:   'Kementerian Hukum RI (LPPMPP UM Bangka Belitung)',
    year:  '2026',
    desc:  'Program Komputer: Rimbarest, instrumen cerdas deteksi audio dan partikulat berbasis Edge Intelligence. Nomor Pencatatan 001481925.',
    cert:  [
      'sertifikat/surat-ciptaan-rimbarest-2026-hal-1.png',
      'sertifikat/surat-ciptaan-rimbarest-2026-hal-2.png',
    ],
  },  /* --- SMK --- */
  'smk-juara-umum-1-2022-2023': {
    icon: '\u{1F947}', kategori: 'SMK',
    title: 'Juara Umum I - Teknik Komputer & Jaringan',
    org:   'SMK Negeri 1 Payung',
    year:  '2022/2023',
    desc:  'Peringkat I Jurusan Teknik Komputer & Jaringan.',
    cert:  'sertifikat/smk-juara-umum-1-2022-2023.jpg',
  },
  'smk-juara-1-xii-2022-2023': {
    icon: '\u{1F947}', kategori: 'SMK',
    title: 'Juara 1 Kelas XII - Teknik Komputer & Jaringan',
    org:   'SMK Negeri 1 Payung',
    year:  '2022/2023',
    desc:  'Nilai rata-rata 91,44 pada Semester Ganjil.',
    cert:  'sertifikat/smk-juara-1-xii-2022-2023.jpg',
  },
  'smk-penampil-terbaik-uji-kompetensi': {
    icon: '\u{1F3AF}', kategori: 'SMK',
    title: 'Penampil Terbaik Uji Kompetensi TKJ',
    org:   'SMK Negeri 1 Payung',
    year:  '2023',
    desc:  'Uji Kompetensi Jurusan Teknik Komputer dan Jaringan.',
    cert:  'sertifikat/smk-penampil-terbaik-uji-kompetensi.jpg',
  },
  'smk-magang-prakerin-2023': {
    icon: '\u{1F4BC}', kategori: 'SMK',
    title: 'Surat Keterangan Magang (Prakerin)',
    org:   'Afu Technic Computer, Pangkalpinang',
    year:  '2022/2023',
    desc:  'Prakerin 17 Oktober 2022 s/d 17 Februari 2023 (4 bulan).',
    cert:  'sertifikat/smk-magang-prakerin-2023.jpg',
  },
  'smk-juara-umum-1-2022': {
    icon: '\u{1F947}', kategori: 'SMK',
    title: 'Juara Umum I - Teknik Komputer & Jaringan',
    org:   'SMK Negeri 1 Payung',
    year:  '2022',
    desc:  'Nomor 421.5/195/SMKN1PAYUNG/XI/2022.',
    cert:  'sertifikat/smk-juara-umum-1-2022.jpg',
  },
  'smk-juara-umum-1-2021': {
    icon: '\u{1F947}', kategori: 'SMK',
    title: 'Juara Umum I - Teknik Komputer Jaringan',
    org:   'SMK Negeri 1 Payung',
    year:  '2021',
    desc:  'Nomor 421.5/366/SMKN1PAYUNG/XII/2021.',
    cert:  'sertifikat/smk-juara-umum-1-2021.jpg',
  },
  'smk-juara-umum-3-2021': {
    icon: '\u{1F949}', kategori: 'SMK',
    title: 'Juara Umum III - Teknik Komputer Jaringan',
    org:   'SMK Negeri 1 Payung',
    year:  '2021',
    desc:  'Nomor 421.5/675/SMKN1PAYUNG/2021.',
    cert:  'sertifikat/smk-juara-umum-3-2021.jpg',
  },
  'smk-juara-1-xi-2021-2022-a': {
    icon: '\u{1F947}', kategori: 'SMK',
    title: 'Juara I Kelas XI - Teknik Komputer Jaringan',
    org:   'SMK Negeri 1 Payung',
    year:  '2021/2022',
    desc:  'Jumlah rata-rata nilai 86,55. Diterbitkan 24 Desember 2021.',
    cert:  'sertifikat/smk-juara-1-xi-2021-2022-a.jpg',
  },
  'smk-juara-1-xi-2021-2022-b': {
    icon: '\u{1F947}', kategori: 'SMK',
    title: 'Juara I Kelas XI - Teknik Komputer Jaringan',
    org:   'SMK Negeri 1 Payung',
    year:  '2021/2022',
    desc:  'Jumlah rata-rata nilai 88,27. Diterbitkan 24 Juni 2022.',
    cert:  'sertifikat/smk-juara-1-xi-2021-2022-b.jpg',
  },
  'smk-juara-1-x-2020-2021': {
    icon: '\u{1F947}', kategori: 'SMK',
    title: 'Juara I Kelas X - Teknik Komputer Jaringan',
    org:   'SMK Negeri 1 Payung',
    year:  '2020/2021',
    desc:  'Jumlah rata-rata nilai 84,25.',
    cert:  'sertifikat/smk-juara-1-x-2020-2021.jpg',
  },
  'smk-juara-2-x-2020-2021': {
    icon: '\u{1F948}', kategori: 'SMK',
    title: 'Juara II Kelas X - Teknik Komputer Jaringan',
    org:   'SMK Negeri 1 Payung',
    year:  '2020/2021',
    desc:  'Jumlah rata-rata nilai 80,63.',
    cert:  'sertifikat/smk-juara-2-x-2020-2021.jpg',
  },
  'smk-lks-2021-peserta': {
    icon: '\u{1F4DD}', kategori: 'SMK',
    title: 'Peserta LKS SMK 2021 - IT Networking System Administration',
    org:   'Dinas Pendidikan Provinsi Kepulauan Bangka Belitung',
    year:  '2021',
    desc:  'Lomba Kompetensi Siswa SMK tingkat provinsi, Pangkalpinang 30 Agustus - 9 September 2021.',
    cert:  'sertifikat/smk-lks-2021-peserta.jpg',
  },
};

window._openCert = openCert;
function openCert(id) {
  const data = CERTS[id];
  if (!data) return;

  const modal   = document.getElementById('cert-modal');
  const box     = document.getElementById('cert-box');
  const icon    = document.getElementById('cert-modal-icon');
  const title   = document.getElementById('cert-modal-title');
  const sub     = document.getElementById('cert-modal-sub');
  const org     = document.getElementById('cert-modal-org');
  const year    = document.getElementById('cert-modal-year');
  const img     = document.getElementById('cert-modal-img');
  const imgWrap = document.getElementById('cert-img-wrap');
  const ph      = document.getElementById('cert-placeholder');
  const dlBtn   = document.getElementById('cert-modal-dl');

  // Fill data
  icon.textContent  = data.icon;
  title.textContent = data.title;
  org.textContent   = data.org;
  year.textContent  = data.year;
  const pages = Array.isArray(data.cert) ? data.cert : [data.cert];
  dlBtn.href     = pages[0];
  dlBtn.download = pages[0];

  imgWrap.innerHTML = '';
  imgWrap.style.display = 'none';
  ph.style.display = 'block';
  sub.textContent = 'Memuat sertifikat...';

  // Probe every page, then build <img> list in original order
  Promise.all(pages.map(src => new Promise(res => {
    const probe = new Image();
    probe.onload  = () => res(src);
    probe.onerror = () => res(null);
    probe.src = src;
  }))).then(results => {
    const ok = results.filter(Boolean);
    if (ok.length === 0) {
      imgWrap.style.display = 'none';
      ph.style.display = 'block';
      sub.textContent = 'File belum diupload';
      dlBtn.style.display = 'none';
      return;
    }
    ok.forEach((src, idx) => {
      const im = document.createElement('img');
      im.src = src;
      im.alt = 'Sertifikat ' + (idx + 1);
      im.style.cssText = 'width:100%;display:block;border-radius:10px;border:1px solid rgba(255,255,255,.06);cursor:zoom-in;transition:transform .3s;margin-bottom:12px';
      im.onclick = () => toggleZoom(im);
      imgWrap.appendChild(im);
    });
    imgWrap.style.display = 'block';
    ph.style.display = 'none';
    sub.textContent = ok.length > 1
      ? ok.length + ' halaman · Klik gambar untuk zoom · Scroll untuk lihat semua'
      : 'Klik gambar untuk zoom · Scroll untuk lihat seluruh sertifikat';
    dlBtn.style.display = 'flex';
  });
  // Show modal
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    box.style.transform = 'scale(1) translateY(0)';
    box.style.opacity   = '1';
  }, 10);
}

function closeCert() {
  const modal = document.getElementById('cert-modal');
  const box   = document.getElementById('cert-box');
  box.style.transform = 'scale(.92) translateY(20px)';
  box.style.opacity   = '0';
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    // Reset zoom if any
    const img = document.getElementById('cert-modal-img');
    if (img) { img.style.transform = ''; img.style.cursor = 'zoom-in'; }
  }, 380);
}

function toggleZoom(img) {
  const isZoomed = img.style.transform === 'scale(1.8)';
  img.style.transform  = isZoomed ? '' : 'scale(1.8)';
  img.style.cursor     = isZoomed ? 'zoom-in' : 'zoom-out';
  img.style.transformOrigin = 'center top';
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCert();
});

/* ── RENDER CERTIFICATE GRID ── */
// Berapa card yang tampil awal
const INITIAL_SHOW = 10; // tampilkan 10 awal, sisanya lewat tombol ^
let certShowAll = false;
let currentFilter = null;

function renderCertGrid(filter, keepShowAll){
  // Hanya reset certShowAll kalau filter berubah (bukan dari showAllCerts)
  if(!keepShowAll) certShowAll = false;
  currentFilter = filter;

  const grid = document.getElementById('cert-grid');
  if(!grid) return;
  grid.innerHTML = '';

  // Kumpulkan semua entry sesuai filter
  const entries = Object.entries(CERTS).filter(([id, data]) => {
    if(filter && filter !== 'all' && data.kategori !== filter) return false;
    return true;
  });

  const limit = certShowAll ? entries.length : INITIAL_SHOW;
  const toShow = entries.slice(0, limit);
  const remaining = entries.length - limit;

  toShow.forEach(([id, data]) => {
    grid.appendChild(makeCertCard(id, data));
  });

  // Tombol "Lihat Semua" / "Tutup"
  const btnWrap = document.getElementById('cert-more-wrap');
  if(btnWrap){
    if(remaining > 0){
      btnWrap.innerHTML = `
        <button onclick="showAllCerts()" style="display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;padding:12px 28px;border-radius:100px;border:1px solid rgba(232,255,71,.25);background:rgba(232,255,71,.06);color:#e8ff47;cursor:pointer;transition:all .25s" onmouseover="this.style.background='rgba(232,255,71,.14)'" onmouseout="this.style.background='rgba(232,255,71,.06)'">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 15 12 9 18 15"/></svg>
          Lihat ${remaining} lainnya ^
        </button>`;
    } else if(entries.length > INITIAL_SHOW) {
      // Semua sudah tampil, tampilkan tombol tutup
      btnWrap.innerHTML = `
        <button onclick="collapseCerts()" style="display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;padding:12px 28px;border-radius:100px;border:1px solid rgba(255,255,255,.1);background:transparent;color:rgba(237,237,245,.4);cursor:pointer;transition:all .25s" onmouseover="this.style.borderColor='rgba(255,255,255,.25)';this.style.color='#ededf5'" onmouseout="this.style.borderColor='rgba(255,255,255,.1)';this.style.color='rgba(237,237,245,.4)'">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="18 15 12 9 6 15"/></svg>
          Tutup
        </button>`;
    } else {
      btnWrap.innerHTML = '';
    }
  }

  // Animate cards in
  setTimeout(() => {
    grid.querySelectorAll('.cert-card').forEach((el,i) => {
      setTimeout(()=>{
        el.style.opacity = '1';
        el.style.transform = 'none';
      }, i * 40);
    });
  }, 30);
}

function showAllCerts(){
  certShowAll = true;
  renderCertGrid(currentFilter, true); // keepShowAll=true → tidak di-reset
  document.getElementById('cert-grid')?.scrollIntoView({behavior:'smooth', block:'nearest'});
}

function collapseCerts(){
  certShowAll = false;
  renderCertGrid(currentFilter, true);
  document.getElementById('sertifikat')?.scrollIntoView({behavior:'smooth', block:'start'});
}

function makeCertCard(id, data){
  const card = document.createElement('div');
  card.className = 'cert-card';
  card.style.cssText = 'opacity:0;transform:translateY(16px);transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1)';
  card.onclick = () => openCert(id);
  card.innerHTML = `
    <div style="aspect-ratio:1;background:linear-gradient(135deg,rgba(232,255,71,.06),rgba(232,255,71,.02));display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">
      <img src="${Array.isArray(data.cert) ? data.cert[0] : data.cert}" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.5" onerror="this.style.display='none'"/>
      <div style="position:relative;z-index:1;font-size:1.8rem;filter:drop-shadow(0 2px 8px rgba(0,0,0,.5))">${data.icon}</div>
      <div style="position:absolute;top:8px;right:8px;font-family:'JetBrains Mono',monospace;font-size:.48rem;letter-spacing:.06em;text-transform:uppercase;background:rgba(5,5,10,.75);border:1px solid rgba(255,255,255,.1);color:rgba(237,237,245,.45);padding:2px 7px;border-radius:100px">${data.kategori}</div>
      <div style="position:absolute;inset:0;background:rgba(232,255,71,.12);opacity:0;transition:opacity .25s;display:flex;align-items:center;justify-content:center;z-index:2" class="cert-hover-overlay">
        <div style="font-family:'JetBrains Mono',monospace;font-size:.58rem;color:#e8ff47;background:rgba(5,5,10,.8);padding:5px 12px;border-radius:100px;border:1px solid rgba(232,255,71,.3)">Lihat →</div>
      </div>
    </div>
    <div style="padding:10px 12px 11px">
      <div style="font-family:'Familjen Grotesk',sans-serif;font-weight:700;font-size:.75rem;color:#ededf5;line-height:1.3;margin-bottom:3px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${data.title}</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:.52rem;color:rgba(232,255,71,.5)">${data.year}</div>
    </div>`;
  card.addEventListener('mouseenter', () => {
    card.querySelector('.cert-hover-overlay').style.opacity = '1';
  });
  card.addEventListener('mouseleave', () => {
    card.querySelector('.cert-hover-overlay').style.opacity = '0';
  });
  return card;
}

function filterCert(kategori){
  document.querySelectorAll('.cert-filter').forEach(btn => {
    btn.classList.remove('on');
    btn.style.borderColor = 'rgba(255,255,255,.1)';
    btn.style.background  = 'transparent';
    btn.style.color       = 'rgba(237,237,245,.4)';
  });
  const activeBtn = document.getElementById('filter-' + kategori);
  if(activeBtn){
    activeBtn.classList.add('on');
    activeBtn.style.borderColor = 'rgba(232,255,71,.3)';
    activeBtn.style.background  = 'rgba(232,255,71,.1)';
    activeBtn.style.color       = '#e8ff47';
  }
  renderCertGrid(kategori === 'all' ? null : kategori);
}

// Init
document.addEventListener('DOMContentLoaded', () => renderCertGrid(null));
if(document.readyState !== 'loading') renderCertGrid(null);