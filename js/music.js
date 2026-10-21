// Trilha sonora medieval gerada em tempo real (Web Audio), sem arquivos de áudio.
// Inspiração: Cantigas de Santa Maria, música de Al-Andalus e danças renascentistas
// ibéricas. Cada tema define modo, andamento, instrumentos e ritmo de percussão; a
// melodia é composta a partir de uma semente em frases A A B A', com cadências no modo.
'use strict';

const MODES = {
  ionian: [0, 2, 4, 5, 7, 9, 11], dorian: [0, 2, 3, 5, 7, 9, 10], phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11], mixolydian: [0, 2, 4, 5, 7, 9, 10], aeolian: [0, 2, 3, 5, 7, 8, 10],
  hijaz: [0, 1, 4, 5, 7, 8, 10], penta: [0, 3, 5, 7, 10]
};

// Ritmos de percussão em colcheias (compasso de 6 colcheias). D = bumbo do pandeiro, T = batida aguda, t = leve, j = soalhas
const DRUMS = {
  none: [],
  cantiga: [[0, 'D'], [3, 'T'], [4, 't'], [5, 't']],
  march: [[0, 'D'], [2, 'T'], [3, 'D'], [5, 'T']],
  darbuka: [[0, 'D'], [1, 't'], [2, 'T'], [3, 'D'], [4, 'T'], [5, 't']],
  jota: [[0, 'D'], [2, 'T'], [4, 'T'], [5, 'j']],
  slow: [[0, 'D'], [3, 't']],
  pulse: [[0, 'D'], [2, 'j'], [4, 'j']]
};

// Temas: lead/second = instrumentos da melodia; bass = alaúde grave nos tempos fortes
const THEMES = {
  title: { mode: 'dorian', root: 62, bpm: 84, lead: 'recorder', second: 'lute', drone: true, drum: 'cantiga', seed: 7 },
  c1:  { mode: 'penta', root: 57, bpm: 66, lead: 'flute', second: 'lute', drone: true, drum: 'none', seed: 11, soft: true },
  c2:  { mode: 'phrygian', root: 64, bpm: 100, lead: 'shawm', second: 'lute', drone: true, drum: 'march', seed: 22 },
  c3:  { mode: 'mixolydian', root: 67, bpm: 92, lead: 'recorder', second: 'lute', drone: false, drum: 'cantiga', seed: 33 },
  c4:  { mode: 'dorian', root: 62, bpm: 70, lead: 'flute', second: 'recorder', drone: true, drum: 'none', seed: 44 },
  c5:  { mode: 'hijaz', root: 64, bpm: 104, lead: 'lute', second: 'shawm', drone: true, drum: 'darbuka', seed: 55 },
  c6:  { mode: 'dorian', root: 69, bpm: 110, lead: 'shawm', second: 'recorder', drone: true, drum: 'march', seed: 66 },
  c7:  { mode: 'phrygian', root: 64, bpm: 96, lead: 'lute', second: 'recorder', drone: false, drum: 'cantiga', seed: 77, andalusian: true },
  c8:  { mode: 'aeolian', root: 62, bpm: 100, lead: 'recorder', second: 'lute', drone: false, drum: 'pulse', seed: 88, folia: true },
  c9:  { mode: 'dorian', root: 64, bpm: 120, lead: 'lute', second: 'shawm', drone: false, drum: 'jota', seed: 99 },
  c10: { mode: 'mixolydian', root: 67, bpm: 108, lead: 'lute', second: 'recorder', drone: false, drum: 'jota', seed: 110 },
  c11: { mode: 'aeolian', root: 57, bpm: 64, lead: 'flute', second: 'lute', drone: true, drum: 'none', seed: 121, low: true },
  c12: { mode: 'dorian', root: 62, bpm: 80, lead: 'lute', second: 'flute', drone: false, drum: 'slow', seed: 132 },
  c13: { mode: 'ionian', root: 60, bpm: 100, lead: 'recorder', second: 'lute', drone: false, drum: 'cantiga', seed: 143 },
  c14: { mode: 'lydian', root: 65, bpm: 108, lead: 'bells', second: 'lute', drone: false, drum: 'pulse', seed: 154 }
};

// Encadeamento da Folía (séc. XVI): i V i VII III VII i V — em graus do modo eólio
const FOLIA = [0, 4, 0, 6, 2, 6, 0, 4];

const Music = {
  enabled: (() => { try { return localStorage.getItem('hispania_music') !== 'off'; } catch (e) { return true; } })(),
  volume: 0.55,
  theme: null,
  timer: null,

  setEnabled(on) {
    this.enabled = on;
    try { localStorage.setItem('hispania_music', on ? 'on' : 'off'); } catch (e) { /* sem armazenamento */ }
    if (!on) this.stop();
    else if (this.wanted) this.start(this.wanted, true);
  },

  ensure() {
    Sfx.init();
    const ctx = Sfx.ctx;
    if (!ctx) return null;
    if (ctx.state === 'suspended') ctx.resume();
    if (!this.master) {
      this.master = ctx.createGain();
      this.master.gain.value = this.volume;
      // um pouco de "sala" com eco curto
      const delay = ctx.createDelay(); delay.delayTime.value = 0.23;
      const fb = ctx.createGain(); fb.gain.value = 0.22;
      const wet = ctx.createGain(); wet.gain.value = 0.25;
      this.bus = ctx.createGain();
      this.bus.connect(this.master);
      this.bus.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(this.master);
      this.master.connect(ctx.destination);
      this.ks = {};
      const len = ctx.sampleRate * 0.4;
      this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    }
    return ctx;
  },

  start(key, force) {
    this.wanted = key;
    if (!this.enabled) return;
    if (this.theme === key && !force && this.timer) return;
    const ctx = this.ensure();
    if (!ctx) return;
    this.stop(true);
    this.theme = key;
    const th = THEMES[key] || THEMES.title;
    this.th = th;
    this.eighth = 60 / th.bpm / 2;
    this.loop = 0;
    this.compose(th, 0);
    this.idx = 0;
    this.loopStart = ctx.currentTime + 0.4;
    // volume sobe suavemente
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setValueAtTime(0.0001, ctx.currentTime);
    this.master.gain.exponentialRampToValueAtTime(this.volume, ctx.currentTime + 2);
    if (th.drone) this.startDrone(th);
    this.timer = setInterval(() => this.tick(), 60);
  },

  stop(quick) {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    this.theme = null;
    const ctx = Sfx.ctx;
    if (this.droneNodes && ctx) {
      const t = ctx.currentTime;
      for (const n of this.droneNodes) {
        if (n.gain) { n.gain.cancelScheduledValues(t); n.gain.setValueAtTime(n.gain.value, t); n.gain.linearRampToValueAtTime(0, t + (quick ? 0.4 : 1.2)); }
        if (n.stop) n.stop(t + 1.3);
      }
      this.droneNodes = null;
    }
  },

  // ---------- Composição ----------
  compose(th, variant) {
    const rng = mulberry32(th.seed * 1000 + variant);
    const scale = MODES[th.mode];
    const n = scale.length;
    // temas suaves usam notas longas e espaçadas; os demais, ritmos de dança
    const rhythms = th.soft ? [[3, 3], [6], [4, 2], [2, 4], [3, 3]] : [[3, 3], [2, 1, 2, 1], [2, 1, 3], [1, 1, 1, 3], [3, 2, 1], [2, 2, 2], [1, 1, 1, 1, 2], [4, 2]];
    const phrase = (bars, startDeg, endDeg, hi) => {
      const notes = [];
      let deg = startDeg, t = 0;
      for (let b = 0; b < bars; b++) {
        const last = b === bars - 1;
        const r = last ? (th.soft ? [6] : rng() < 0.5 ? [2, 1, 3] : [1, 1, 1, 3]) : rhythms[Math.floor(rng() * rhythms.length)];
        r.forEach((dur, i) => {
          const final = last && i === r.length - 1;
          if (final) deg = endDeg;
          else if (last && i === r.length - 2) deg = endDeg + (rng() < 0.5 ? 1 : -1);
          else {
            const x = rng();
            const stepv = x < 0.55 ? 1 : x < 0.8 ? 2 : x < 0.92 ? 3 : 4;
            const dir = deg > (hi ? n + 3 : n) ? -1 : deg < (hi ? 2 : -1) ? 1 : (rng() < 0.5 ? -1 : 1);
            if (rng() > 0.12) deg += dir * (stepv === 1 ? 1 : stepv === 2 ? 1 : stepv - 1);
          }
          const rest = !final && rng() < 0.06;
          if (!rest) notes.push({ t, dur, deg });
          t += dur;
        });
      }
      return { notes, len: bars * 6 };
    };
    const tonic = 0, half = th.mode === 'phrygian' || th.mode === 'hijaz' ? 1 : 4;
    const A = phrase(4, 2, half, false);
    const B = phrase(4, 4, half, true);
    const A2 = { notes: A.notes.slice(), len: A.len };
    // A' termina na tônica
    const lastBar = phrase(1, A.notes.length ? A.notes[A.notes.length - 1].deg : 2, tonic, false);
    A2.notes = A.notes.filter(x => x.t < 18).concat(lastBar.notes.map(x => ({ t: x.t + 18, dur: x.dur, deg: x.deg })));
    const form = [A, A, B, A2];
    const ev = [];
    let off = 0;
    form.forEach((ph, pi) => {
      for (const x of ph.notes) ev.push({ t: off + x.t, type: 'mel', dur: x.dur, midi: this.degMidi(th, x.deg) });
      // baixo: alaúde grave nos tempos fortes (folía/andaluza quando definido)
      for (let bar = 0; bar < 4; bar++) {
        const bi = pi * 4 + bar;
        let bdeg = 0;
        if (th.folia) bdeg = FOLIA[bi % 8];
        else if (th.andalusian) bdeg = [3, 2, 1, 0][bar]; // cadência andaluza: lá–sol–fá–mi em mi frígio
        else bdeg = bar === 3 && pi % 2 === 0 ? 4 : 0;
        const root = this.degMidi(th, bdeg) - 24;
        ev.push({ t: off + bar * 6, type: 'bass', dur: 3, midi: root });
        ev.push({ t: off + bar * 6 + 3, type: 'bass', dur: 3, midi: root + (th.mode === 'penta' ? 0 : 7) });
        for (const [dt, k] of DRUMS[th.drum] || []) ev.push({ t: off + bar * 6 + dt, type: 'drum', k });
      }
      off += ph.len;
    });
    ev.sort((a, b) => a.t - b.t);
    this.events = ev;
    this.pieceLen = off;
  },

  degMidi(th, deg) {
    const s = MODES[th.mode], n = s.length;
    const o = Math.floor(deg / n), m = ((deg % n) + n) % n;
    return th.root + (th.low ? -12 : 0) + 12 * o + s[m];
  },

  tick() {
    const ctx = Sfx.ctx;
    if (!ctx || !this.events) return;
    const ahead = ctx.currentTime + 0.35;
    // se a aba ficou parada, recomeça do ponto atual em vez de "atropelar" notas atrasadas
    if (this.loopStart + this.pieceLen * this.eighth < ctx.currentTime - 1) { this.loopStart = ctx.currentTime + 0.1; this.idx = 0; }
    for (let guard = 0; guard < 200; guard++) {
      if (this.idx >= this.events.length) {
        this.loopStart += this.pieceLen * this.eighth;
        this.idx = 0;
        this.loop++;
        if (this.loop % 2 === 0) this.compose(this.th, this.loop / 2);
      }
      const e = this.events[this.idx];
      const when = this.loopStart + e.t * this.eighth;
      if (when > ahead) break;
      this.idx++;
      if (when < ctx.currentTime - 0.05) continue;
      this.play(e, when);
    }
  },

  play(e, when) {
    const th = this.th, dur = e.dur * this.eighth;
    if (e.type === 'mel') {
      const pass = this.loop % 3;
      const inst = pass === 1 ? th.second : th.lead;
      this.note(inst, e.midi, when, dur, 1);
      if (pass === 2) this.note(th.second, e.midi - 12, when, dur, 0.6);
    } else if (e.type === 'bass') {
      this.note('lute', e.midi, when, dur, 0.55);
    } else if (e.type === 'drum') {
      this.drum(e.k, when);
    }
  },

  // ---------- Instrumentos ----------
  freq(m) { return 440 * Math.pow(2, (m - 69) / 12); },

  note(inst, midi, when, dur, vol) {
    const ctx = Sfx.ctx;
    switch (inst) {
      case 'lute': return this.pluck(midi, when, dur, vol);
      case 'bells': {
        for (const [mult, g] of [[1, 0.06], [2.76, 0.02], [5.4, 0.01]]) {
          const o = ctx.createOscillator(), gn = ctx.createGain();
          o.type = 'sine'; o.frequency.value = this.freq(midi) * mult;
          gn.gain.setValueAtTime(0.0001, when); gn.gain.exponentialRampToValueAtTime(g * vol, when + 0.01);
          gn.gain.exponentialRampToValueAtTime(0.0001, when + Math.max(1.2, dur * 2));
          o.connect(gn); gn.connect(this.bus); o.start(when); o.stop(when + Math.max(1.3, dur * 2 + 0.1));
        }
        return;
      }
      default: return this.wind(inst, midi, when, dur, vol);
    }
  },

  // Karplus-Strong: corda dedilhada (alaúde / oud / vihuela)
  pluck(midi, when, dur, vol) {
    const ctx = Sfx.ctx;
    let buf = this.ks[midi];
    if (!buf) {
      const sr = ctx.sampleRate, f = this.freq(midi);
      const len = Math.floor(sr * 1.6), period = Math.max(2, Math.round(sr / f));
      buf = ctx.createBuffer(1, len, sr);
      const d = buf.getChannelData(0);
      const rng = mulberry32(midi * 31);
      for (let i = 0; i < period; i++) d[i] = rng() * 2 - 1;
      const decay = midi < 50 ? 0.996 : 0.993;
      for (let i = period; i < len; i++) d[i] = decay * 0.5 * (d[i - period] + d[i - period + 1]);
      this.ks[midi] = buf;
    }
    const s = ctx.createBufferSource(), g = ctx.createGain(), lp = ctx.createBiquadFilter();
    s.buffer = buf;
    lp.type = 'lowpass'; lp.frequency.value = 2600;
    const len = Math.min(1.6, dur + 0.9);
    g.gain.setValueAtTime(0.32 * vol, when);
    g.gain.exponentialRampToValueAtTime(0.0001, when + len);
    s.connect(lp); lp.connect(g); g.connect(this.bus);
    s.start(when); s.stop(when + len + 0.05);
  },

  // Sopros: flauta de osso, flauta doce e charamela (shawm)
  wind(inst, midi, when, dur, vol) {
    const ctx = Sfx.ctx;
    const f = this.freq(midi);
    const o = ctx.createOscillator(), g = ctx.createGain(), flt = ctx.createBiquadFilter();
    const lfo = ctx.createOscillator(), lfoG = ctx.createGain();
    let peak;
    if (inst === 'shawm') { o.type = 'sawtooth'; flt.type = 'bandpass'; flt.frequency.value = 1300; flt.Q.value = 1.2; peak = 0.11; }
    else if (inst === 'flute') { o.type = 'sine'; flt.type = 'lowpass'; flt.frequency.value = 3000; peak = 0.09; }
    else { o.type = 'triangle'; flt.type = 'lowpass'; flt.frequency.value = 2400; peak = 0.075; }
    o.frequency.value = f;
    const soft = this.th && this.th.soft;
    lfo.frequency.value = soft ? 4.2 : 5.2; lfoG.gain.value = f * (soft ? 0.003 : 0.006);
    if (soft) { peak *= 0.75; flt.frequency.value = 1800; }
    lfo.connect(lfoG); lfoG.connect(o.frequency);
    const att = soft ? 0.18 : inst === 'shawm' ? 0.03 : 0.05, end = when + Math.max(0.12, dur * (soft ? 1 : 0.92));
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(peak * vol, when + att);
    g.gain.setValueAtTime(peak * vol * 0.85, end - 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, end + 0.08);
    o.connect(flt); flt.connect(g); g.connect(this.bus);
    // sopro (ruído de ar) leve na flauta
    if (inst === 'flute') {
      const n = ctx.createBufferSource(), ng = ctx.createGain(), nf = ctx.createBiquadFilter();
      n.buffer = this.noiseBuf; nf.type = 'bandpass'; nf.frequency.value = f * 2; nf.Q.value = 3;
      ng.gain.setValueAtTime((soft ? 0.004 : 0.012) * vol, when); ng.gain.exponentialRampToValueAtTime(0.0001, end + 0.05);
      n.connect(nf); nf.connect(ng); ng.connect(this.bus); n.start(when); n.stop(end + 0.1);
    }
    o.start(when); lfo.start(when); o.stop(end + 0.12); lfo.stop(end + 0.12);
  },

  // Bordão contínuo (sanfona / gaita de foles): tônica e quinta graves
  startDrone(th) {
    const ctx = Sfx.ctx, t = ctx.currentTime;
    const nodes = [];
    const g = ctx.createGain(), lp = ctx.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 700;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(th.soft ? 0.018 : 0.035, t + 3);
    lp.connect(g); g.connect(this.bus);
    const root = th.root + (th.low ? -12 : 0) - 24;
    for (const [m, det] of [[root, -4], [root, 4], [root + 7, 0]]) {
      const o = ctx.createOscillator();
      o.type = 'sawtooth'; o.frequency.value = this.freq(m); o.detune.value = det;
      o.connect(lp); o.start(t);
      nodes.push(o);
    }
    nodes.push(g);
    this.droneNodes = nodes;
  },

  // Pandeiro / adufe / darbuka
  drum(k, when) {
    const ctx = Sfx.ctx;
    if (k === 'D') {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(130, when); o.frequency.exponentialRampToValueAtTime(55, when + 0.18);
      g.gain.setValueAtTime(0.28, when); g.gain.exponentialRampToValueAtTime(0.0001, when + 0.25);
      o.connect(g); g.connect(this.bus); o.start(when); o.stop(when + 0.3);
    } else {
      const s = ctx.createBufferSource(), g = ctx.createGain(), f = ctx.createBiquadFilter();
      s.buffer = this.noiseBuf;
      if (k === 'j') { f.type = 'bandpass'; f.frequency.value = 7500; f.Q.value = 2; }
      else { f.type = 'bandpass'; f.frequency.value = k === 'T' ? 1800 : 2600; f.Q.value = 1.5; }
      const v = k === 'T' ? 0.16 : k === 'j' ? 0.07 : 0.07, len = k === 'j' ? 0.14 : 0.06;
      g.gain.setValueAtTime(v, when); g.gain.exponentialRampToValueAtTime(0.0001, when + len);
      s.connect(f); f.connect(g); g.connect(this.bus); s.start(when); s.stop(when + len + 0.02);
    }
  }
};
