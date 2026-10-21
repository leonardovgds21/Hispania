// Utilitários gerais: RNG com semente, ruído, matemática e áudio sintetizado.
'use strict';

const TILE = 32;

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash2(x, y) {
  let h = (x * 374761393 + y * 668265263) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// Ruído de valor suave (grade grossa + interpolação bilinear)
function makeNoise(rng, w, h, cell) {
  const gw = Math.ceil(w / cell) + 2, gh = Math.ceil(h / cell) + 2;
  const g = new Float32Array(gw * gh);
  for (let i = 0; i < g.length; i++) g[i] = rng();
  return function (x, y) {
    const fx = x / cell, fy = y / cell;
    const ix = Math.floor(fx), iy = Math.floor(fy);
    const tx = fx - ix, ty = fy - iy;
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    const a = g[iy * gw + ix], b = g[iy * gw + ix + 1];
    const c = g[(iy + 1) * gw + ix], d = g[(iy + 1) * gw + ix + 1];
    return (a + (b - a) * sx) * (1 - sy) + (c + (d - c) * sx) * sy;
  };
}

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const dist = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);
const lerp = (a, b, t) => a + (b - a) * t;
const randRange = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(randRange(a, b + 1));
function angleDiff(a, b) {
  let d = b - a;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) + amt, g = ((n >> 8) & 255) + amt, b = (n & 255) + amt;
  r = clamp(r, 0, 255); g = clamp(g, 0, 255); b = clamp(b, 0, 255);
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

// ---------- Áudio sintetizado (sem arquivos) ----------
const Sfx = {
  ctx: null,
  enabled: true,
  init() {
    if (this.ctx) return;
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { this.ctx = null; }
  },
  tone(freq, dur, type, vol, slide) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq * slide), t + dur);
    g.gain.setValueAtTime(vol || 0.08, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.ctx.destination);
    o.start(t); o.stop(t + dur);
  },
  noise(dur, vol) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const len = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const s = this.ctx.createBufferSource();
    const g = this.ctx.createGain();
    g.gain.value = vol || 0.1;
    s.buffer = buf; s.connect(g); g.connect(this.ctx.destination);
    s.start(t);
  },
  play(name) {
    switch (name) {
      case 'swing': this.tone(300, 0.08, 'triangle', 0.05, 0.5); break;
      case 'shot': this.noise(0.18, 0.18); this.tone(120, 0.15, 'square', 0.06, 0.4); break;
      case 'speech': this.tone(520, 0.07, 'sine', 0.06, 1.5); break;
      case 'flash': this.tone(1200, 0.1, 'sine', 0.05, 0.3); break;
      case 'hit': this.tone(180, 0.07, 'square', 0.06, 0.6); break;
      case 'hurt': this.tone(110, 0.2, 'sawtooth', 0.08, 0.5); break;
      case 'pickup': this.tone(660, 0.08, 'sine', 0.07, 1.5); setTimeout(() => this.tone(990, 0.1, 'sine', 0.06), 70); break;
      case 'quest': [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.tone(f, 0.18, 'triangle', 0.07), i * 110)); break;
      case 'level': [392, 523, 659, 784, 1047].forEach((f, i) => setTimeout(() => this.tone(f, 0.2, 'square', 0.05), i * 90)); break;
      case 'die': this.tone(90, 0.15, 'square', 0.05, 0.5); break;
      case 'click': this.tone(800, 0.03, 'sine', 0.04); break;
      case 'boss': this.tone(80, 0.8, 'sawtooth', 0.1, 0.7); break;
      case 'dash': this.tone(400, 0.1, 'sine', 0.04, 2); break;
      case 'reload': this.tone(250, 0.05, 'square', 0.04); setTimeout(() => this.tone(350, 0.05, 'square', 0.04), 120); break;
      case 'coin': this.tone(1300, 0.06, 'square', 0.03); break;
    }
  }
};
