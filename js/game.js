// Núcleo do jogo: estado, capítulos, missões, combate, renderização e laço principal.
'use strict';

const SAVE_KEY = 'hispania_save_v1';
const INTERACT_RANGE = 90;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let VW = 0, VH = 0;

const G = {
  S: null, world: null, ch: null, chIdx: 0, mult: 1,
  player: null, enemies: [], projs: [], parts: [], texts: [], objs: [], camps: [], fx: [],
  boss: null, cam: { x: 0, y: 0 }, shake: 0, keys: {}, mouse: { x: 0, y: 0, down: false },
  time: 0, running: false, ui: null, hover: null, saveT: 0, hudT: 0, deadFlag: false
};

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  VW = window.innerWidth; VH = window.innerHeight;
  canvas.width = Math.floor(VW * dpr); canvas.height = Math.floor(VH * dpr);
  canvas.style.width = VW + 'px'; canvas.style.height = VH + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = false;
}
window.addEventListener('resize', resize);

// ---------- Estado ----------
function newState(name) {
  return {
    v: 1, name: name || 'Íber', level: 1, xp: 0, gold: 0, potions: 3, sharp: 0, armor: 0,
    hp: 100, chapter: 0, maxChapter: 0, ch: {}, pos: null,
    stats: { kills: 0, deaths: 0, time: 0, quests: 0 }, sound: true
  };
}
function chState(id) {
  const S = G.S;
  if (!S.ch[id]) S.ch[id] = { q: {}, codex: {}, chests: {}, done: false, intro: false };
  return S.ch[id];
}
function qState(qid) {
  const cs = chState(G.ch.id);
  if (!cs.q[qid]) cs.q[qid] = { step: 0, prog: 0, done: false };
  return cs.q[qid];
}
function mainStep() { return qState('main').done ? 9999 : qState('main').step; }
function questActive(quest) {
  const q = qState(quest.id);
  if (q.done) return false;
  if (quest.id !== 'main' && quest.req && mainStep() < quest.req) return false;
  return true;
}
function curStep(quest) { return quest.steps[qState(quest.id).step]; }

const xpNeed = (l) => Math.round(50 * Math.pow(l, 1.3));
function maxHp() { return Math.round((90 + G.S.level * 10) * (1 + 0.12 * G.chIdx)); }
function weapon() { return WEAPONS[CLASSES[G.ch.cls].weapon]; }
function playerDmg() { return weapon().dmg * G.mult * (1 + 0.05 * (G.S.level - 1)) * (1 + 0.1 * G.S.sharp); }
function playerDef() { return Math.min(0.6, G.S.armor * 0.06 + (weapon().def || 0)); }
function fmt(s) { return String(s).replace(/\{nome\}/g, G.S.name); }

// ---------- Salvamento ----------
// Cada partida fica num espaço próprio (1 a SLOT_COUNT). G.slot é o espaço da partida em andamento.
const SLOT_COUNT = 5;
const slotKey = (n) => SAVE_KEY + '_slot' + n;

// Saves da versão antiga (um único espaço) passam para o espaço 1
(function migrateOldSave() {
  try {
    const old = localStorage.getItem(SAVE_KEY);
    if (old && !localStorage.getItem(slotKey(1))) localStorage.setItem(slotKey(1), old);
    if (old) localStorage.removeItem(SAVE_KEY);
  } catch (e) { /* armazenamento indisponível */ }
})();

function save() {
  if (!G.S || !G.slot) return;
  if (G.player) { G.S.pos = { ch: G.chIdx, x: G.player.x, y: G.player.y }; }
  G.S.savedAt = Date.now();
  try { localStorage.setItem(slotKey(G.slot), JSON.stringify(G.S)); } catch (e) { /* armazenamento indisponível */ }
}
function loadSave(n) {
  try { const s = localStorage.getItem(slotKey(n)); return s ? JSON.parse(s) : null; } catch (e) { return null; }
}
function deleteSave(n) {
  try { localStorage.removeItem(slotKey(n)); } catch (e) { /* armazenamento indisponível */ }
}
function exportSave() {
  save();
  const blob = new Blob([JSON.stringify(G.S, null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `hispania-${(G.S.name || 'save').replace(/[^\wÀ-ú-]+/g, '_')}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
// Importa para o espaço n
function importSave(file, n, cb) {
  const r = new FileReader();
  r.onload = () => {
    try {
      const s = JSON.parse(r.result);
      if (!s || typeof s.level !== 'number' || !s.ch) throw new Error('inválido');
      localStorage.setItem(slotKey(n), JSON.stringify(s));
      cb(true);
    } catch (e) { cb(false); }
  };
  r.readAsText(file);
}

// ---------- Capítulos ----------
function loadChapter(idx, keepPos) {
  G.chIdx = idx;
  G.S.chapter = idx;
  G.S.maxChapter = Math.max(G.S.maxChapter, idx);
  G.ch = CHAPTERS[idx];
  G.mult = 1 + 0.32 * idx;
  G.world = new World(G.ch);
  G.enemies = []; G.projs = []; G.parts = []; G.texts = []; G.objs = []; G.camps = []; G.fx = [];
  G.boss = null;
  const start = G.world.places[G.ch.places[0].id];
  G.player = new Player(start.px, start.py + TILE * 2);
  if (keepPos && G.S.pos && G.S.pos.ch === idx && !G.world.collides(G.S.pos.x, G.S.pos.y, 10)) {
    G.player.x = G.S.pos.x; G.player.y = G.S.pos.y;
  }
  const w = weapon();
  G.player.ammo = w.mag || 0;
  G.S.hp = Math.min(G.S.hp || maxHp(), maxHp());
  if (G.S.hp <= 0) G.S.hp = maxHp();

  const cs = chState(G.ch.id);
  // NPCs
  for (const n of G.ch.npcs) {
    const p = G.world.places[n.at];
    G.objs.push({ kind: 'npc', id: n.id, def: n, name: n.name, x: p.px + (n.dx || 0) * TILE, y: p.py + (n.dy || 0) * TILE, r: 12, line: 0, aim: Math.PI / 2 });
  }
  // Crônicas (codex) em posições determinísticas
  const rng = mulberry32(G.ch.seed + 777);
  for (const c of G.ch.codex) {
    if (cs.codex[c.id]) continue;
    const p = G.world.places[c.at];
    let spot = null;
    for (let i = 0; i < 80 && !spot; i++) {
      const a = rng() * Math.PI * 2, d = p.r + 2 + rng() * 6;
      const tx = Math.round(p.x + Math.cos(a) * d), ty = Math.round(p.y + Math.sin(a) * d);
      if (tx > 2 && ty > 2 && tx < G.world.W - 3 && ty < G.world.H - 3 && G.world.reach[G.world.idx(tx, ty)]) spot = { x: tx * TILE + 16, y: ty * TILE + 16 };
    }
    spot = spot || { x: p.px + 40, y: p.py };
    G.objs.push({ kind: 'codex', id: c.id, def: c, name: T('chronicle'), x: spot.x, y: spot.y, r: 12 });
  }
  // Baús
  const crng = mulberry32(G.ch.seed + 4242);
  for (let i = 0; i < 6; i++) {
    const spot = G.world.randomReachableFar(crng, G.ch.places, 9);
    if (!spot) continue;
    if (cs.chests[i]) { G.objs.push({ kind: 'chest', idx: i, opened: true, name: T('chestEmpty'), x: spot.x, y: spot.y, r: 12 }); continue; }
    G.objs.push({ kind: 'chest', idx: i, opened: false, name: T('chest'), x: spot.x, y: spot.y, r: 12 });
  }
  // Acampamentos: os dos dados + um para cada etapa de "kill"
  const campKeys = new Set();
  const addCamp = (at, type, n) => {
    const key = at + ':' + type;
    if (campKeys.has(key)) return;
    campKeys.add(key);
    G.camps.push({ id: key, at, type, n, respawnT: 0 });
  };
  for (const c of (G.ch.camps || [])) addCamp(c.at, c.type, c.n);
  for (const q of G.ch.quests) for (const s of q.steps) if (s.t === 'kill') addCamp(s.at, s.e, Math.min(Math.max(4, Math.ceil(s.n * 0.6)), 7));
  for (const camp of G.camps) for (let i = 0; i < camp.n; i++) spawnCampEnemy(camp);
  // Itens de missões de coleta ativas
  for (const q of G.ch.quests) {
    if (!questActive(q)) continue;
    const s = curStep(q);
    if (s && s.t === 'collect' && (q.id === 'main' || qState(q.id).step > 0)) spawnItems(q, s, s.n - qState(q.id).prog);
  }
  G.cam.x = G.player.x - VW / 2; G.cam.y = G.player.y - VH / 2;
  UI.hud(true);
  save();
}

function spawnCampEnemy(camp, awayFromPlayer) {
  const p = G.world.places[camp.at];
  if (!p) return;
  let s = G.world.randomSpot(p.px, p.py, p.r + 3, 1);
  if (awayFromPlayer) {
    // Reaparece no acampamento, mas longe o bastante do jogador para não surgir em cima dele
    for (let i = 0; i < 25 && dist(s.x, s.y, G.player.x, G.player.y) < 320; i++) s = G.world.randomSpot(p.px, p.py, p.r + 8, 1);
  }
  G.enemies.push(new Enemy(camp.type, s.x, s.y, G.mult, camp.id));
}

function spawnItems(quest, step, n) {
  const p = G.world.places[step.at];
  for (let i = 0; i < n; i++) {
    const s = G.world.randomSpot(p.px, p.py, p.r + 5, 1);
    G.objs.push({ kind: 'item', qid: quest.id, name: step.item, icon: step.icon || '✦', x: s.x, y: s.y, r: 12 });
  }
}

// ---------- Missões ----------
function advance(quest) {
  const q = qState(quest.id);
  const step = quest.steps[q.step];
  q.step++; q.prog = 0;
  Sfx.play('pickup');
  const after = () => {
    if (q.step >= quest.steps.length) completeQuest(quest);
    else startStep(quest);
    save();
    UI.hud(true);
  };
  if (step && step.done) UI.dialog(step.done, after); else after();
}

function startStep(quest) {
  const s = curStep(quest);
  if (!s) return;
  if (s.t === 'collect') spawnItems(quest, s, s.n);
  UI.toast((quest.id === 'main' ? '★ ' : '◆ ') + s.desc, quest.id === 'main' ? 'main' : 'side');
}

function completeQuest(quest) {
  const q = qState(quest.id);
  q.done = true;
  G.S.stats.quests++;
  const r = quest.reward || {};
  const xp = Math.round((r.xp || 60) * G.mult);
  const gold = Math.round((r.gold || 20) * G.mult);
  G.S.gold += gold;
  if (r.potions) G.S.potions += r.potions;
  gainXp(xp);
  Sfx.play('quest');
  UI.toast(T('questDone', quest.title, xp, gold, G.ch.currency) + (r.potions ? T('questDonePot', r.potions) : ''), 'done');
  if (quest.id === 'main') chapterComplete();
}

function chapterComplete() {
  const cs = chState(G.ch.id);
  cs.done = true;
  const next = G.chIdx + 1;
  if (next < CHAPTERS.length) G.S.maxChapter = Math.max(G.S.maxChapter, next);
  save();
  UI.narration(G.ch.title, G.ch.outro, () => {
    if (next < CHAPTERS.length) {
      const fromCls = CLASSES[G.ch.cls], toCls = CLASSES[CHAPTERS[next].cls];
      UI.evolution(fromCls, toCls, CHAPTERS[next], () => enterChapter(next));
    } else {
      UI.ending();
    }
  });
}

function enterChapter(idx, keepPos) {
  G.S.hp = 9999;
  loadChapter(idx, keepPos);
  G.S.hp = maxHp();
  Music.start(G.ch.id);
  const cs = chState(G.ch.id);
  if (!cs.intro) {
    cs.intro = true;
    UI.narration(T('chapterN', idx + 1, G.ch.title), G.ch.intro, () => {
      const s = curStep(G.ch.quests[0]);
      if (s) UI.toast('★ ' + s.desc, 'main');
      save();
    }, G.ch.years);
  }
}

function questTarget(quest) {
  const s = curStep(quest);
  if (!s) return null;
  if (s.t === 'talk' || s.t === 'quiz') {
    const o = G.objs.find(o => o.kind === 'npc' && o.id === s.npc);
    return o ? { x: o.x, y: o.y, label: o.name } : null;
  }
  if (s.t === 'collect') {
    // aponta para o item restante mais próximo
    let best = null, bd = 1e9;
    for (const o of G.objs) if (o.kind === 'item' && o.qid === quest.id) {
      const d = dist(G.player.x, G.player.y, o.x, o.y);
      if (d < bd) { bd = d; best = o; }
    }
    if (best) return { x: best.x, y: best.y, label: s.item };
  }
  const p = G.world.places[s.at];
  return p ? { x: p.px, y: p.py, label: p.name } : null;
}

function onKill(type) {
  for (const quest of G.ch.quests) {
    if (!questActive(quest)) continue;
    const q = qState(quest.id);
    if (quest.id !== 'main' && q.step === 0) continue;
    const s = curStep(quest);
    if (s && s.t === 'kill' && s.e === type) {
      q.prog++;
      if (q.prog >= s.n) advance(quest);
      else UI.toast(`${ENEMIES[type].name}: ${q.prog}/${s.n}`, 'prog');
    }
  }
}

function checkGotoAndBoss() {
  for (const quest of G.ch.quests) {
    if (!questActive(quest)) continue;
    const q = qState(quest.id);
    if (quest.id !== 'main' && q.step === 0) continue;
    const s = curStep(quest);
    if (!s) continue;
    const p = G.world.places[s.at];
    if (!p) continue;
    const d = dist(G.player.x, G.player.y, p.px, p.py);
    if (s.t === 'goto' && d < p.r * TILE) {
      if (s.say) { const sv = s.say; UI.dialog(sv, () => advance(quest)); }
      else advance(quest);
      return;
    }
    if (s.t === 'boss' && !G.boss && d < p.r * TILE + 260) {
      const b = new Enemy(s.e, p.px, p.py - TILE, G.mult, null);
      b.aggro = true;
      G.enemies.push(b);
      G.boss = b; b.questId = quest.id;
      Sfx.play('boss');
      G.shake = 12;
      UI.toast(T('appears', b.d.name), 'boss');
      if (s.intro) UI.dialog(s.intro);
    }
  }
}

function talkTo(npc) {
  npc.aim = Math.atan2(G.player.y - npc.y, G.player.x - npc.x);
  for (const quest of G.ch.quests) {
    if (!questActive(quest)) continue;
    const s = curStep(quest);
    if (!s || s.npc !== npc.id) continue;
    if (s.t === 'talk') {
      if (quest.id !== 'main' && qState(quest.id).step === 0) UI.toast(T('newQuest', quest.title), 'side');
      UI.dialog(s.say || [[npc.id, '...']], () => advance(quest));
      return;
    }
    if (s.t === 'quiz') { runQuiz(quest, s, npc); return; }
  }
  const lines = npc.def.lines || ['...'];
  const line = lines[npc.line % lines.length];
  npc.line++;
  if (npc.def.shop) UI.dialog([[npc.id, line]], () => UI.shop(npc));
  else UI.dialog([[npc.id, line]]);
}

function runQuiz(quest, s, npc) {
  let i = 0;
  const ask = () => {
    if (i >= s.qs.length) { UI.dialog(s.win || [[npc.id, T('quizWin')]], () => advance(quest)); return; }
    const qq = s.qs[i];
    UI.quiz(npc.name, qq.q, qq.o, (choice) => {
      if (choice === qq.a) { Sfx.play('pickup'); i++; ask(); }
      else { Sfx.play('hurt'); UI.dialog([[npc.id, T('quizFail')]]); }
    });
  };
  UI.dialog(s.say || [[npc.id, T('quizAsk')]], ask);
}

// ---------- Progressão ----------
function gainXp(n) {
  const S = G.S;
  S.xp += n;
  let up = false;
  while (S.xp >= xpNeed(S.level)) { S.xp -= xpNeed(S.level); S.level++; up = true; }
  if (up) {
    S.hp = maxHp();
    Sfx.play('level');
    UI.toast(T('levelUp', S.level), 'level');
    floatText(G.player.x, G.player.y - 40, T('levelFloat', S.level), '#ffd84a', 1.6);
  }
}

function usePotion() {
  const S = G.S;
  if (S.potions <= 0) { UI.toast(T('noPotions'), 'prog'); return; }
  if (S.hp >= maxHp()) return;
  S.potions--;
  S.hp = Math.min(maxHp(), S.hp + Math.round(maxHp() * 0.5));
  Sfx.play('pickup');
  floatText(G.player.x, G.player.y - 30, T('lifeFloat'), '#5f5', 1);
  for (let i = 0; i < 12; i++) particle(G.player.x, G.player.y, '#6f6', 80);
}

// ---------- Efeitos ----------
function particle(x, y, color, spd, life, size) {
  const a = Math.random() * Math.PI * 2, s = Math.random() * (spd || 100);
  G.parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: life || 0.5, max: life || 0.5, color, size: size || 3 });
}
function floatText(x, y, text, color, life) {
  G.texts.push({ x, y, text, color: color || '#fff', life: life || 0.8, max: life || 0.8 });
}

// ---------- Combate ----------
function hurtPlayer(dmg, fromX, fromY) {
  const p = G.player;
  if (p.invT > 0 || p.dashT > 0 || G.ui) return;
  const d = Math.max(1, Math.round(dmg * (1 - playerDef()) * randRange(0.85, 1.15)));
  G.S.hp -= d;
  p.invT = 0.7; p.hurtT = 0.2;
  G.shake = Math.max(G.shake, 6);
  Sfx.play('hurt');
  floatText(p.x, p.y - 30, '-' + d, '#ff5050');
  if (fromX != null) {
    const a = Math.atan2(p.y - fromY, p.x - fromX);
    moveEnt(p, Math.cos(a) * 14, Math.sin(a) * 14);
  }
  if (G.S.hp <= 0) { G.S.hp = 0; playerDie(); }
}

function playerDie() {
  if (G.deadFlag) return;
  G.deadFlag = true;
  G.S.stats.deaths++;
  const lost = Math.floor(G.S.gold * 0.1);
  G.S.gold -= lost;
  Sfx.play('die');
  UI.death(lost, () => {
    G.deadFlag = false;
    if (G.boss) { G.enemies = G.enemies.filter(e => e !== G.boss && !e.summoned); G.boss = null; }
    const start = G.world.places[G.ch.places[0].id];
    G.player.x = start.px; G.player.y = start.py + TILE * 2;
    G.S.hp = maxHp();
    G.projs = [];
    for (const e of G.enemies) e.aggro = false;
    save();
  });
}

function damageEnemy(e, dmg, kx, ky) {
  if (e.dead) return;
  const d = Math.round(dmg * randRange(0.9, 1.1));
  e.hp -= d; e.hurtT = 0.12; e.aggro = true;
  floatText(e.x, e.y - e.r - 14, String(d), '#ffe9a0');
  Sfx.play('hit');
  for (let i = 0; i < 4; i++) particle(e.x, e.y, e.shadow ? '#222' : '#c33', 90, 0.35);
  if (!e.boss && kx != null) moveEnt(e, kx * 8, ky * 8);
  if (e.hp <= 0) killEnemy(e);
}

function killEnemy(e) {
  e.dead = true;
  G.S.stats.kills++;
  Sfx.play('die');
  for (let i = 0; i < (e.boss ? 60 : 14); i++) particle(e.x, e.y, e.d.color || (e.d.look && e.d.look.body) || '#888', e.boss ? 260 : 140, 0.7, e.boss ? 5 : 3);
  gainXp(Math.round(e.d.xp * G.mult));
  const gold = Math.round(e.d.gold * G.mult * randRange(0.7, 1.3));
  const coins = e.boss ? 10 : Math.min(3, 1 + Math.floor(gold / 6));
  for (let i = 0; i < coins; i++) {
    G.objs.push({ kind: 'coin', value: Math.max(1, Math.round(gold / coins)), x: e.x + randRange(-14, 14), y: e.y + randRange(-14, 14), r: 6, t: 0 });
  }
  if (Math.random() < (e.boss ? 1 : 0.035)) G.objs.push({ kind: 'potion', x: e.x, y: e.y + 8, r: 8, name: T('potion') });
  if (e.boss) {
    G.boss = null;
    G.shake = 20;
    G.enemies.forEach(m => { if (m.summoned) { m.dead = true; } });
    const quest = G.ch.quests.find(q => q.id === e.questId);
    UI.toast(T('defeated', e.d.name), 'done');
    if (quest) advance(quest);
  }
  onKill(e.type);
}

function moveEnt(ent, mx, my) {
  const w = G.world, r = ent.r * 0.8;
  if (mx) { const nx = ent.x + mx; if (!w.collides(nx, ent.y, r)) ent.x = nx; }
  if (my) { const ny = ent.y + my; if (!w.collides(ent.x, ny, r)) ent.y = ny; }
}

function playerAttack() {
  const p = G.player, w = weapon();
  if (p.cd > 0 || p.reloadT > 0) return;
  if (w.kind === 'melee') {
    p.cd = w.cd; p.atkT = 0.2; p.atkMax = 0.2;
    Sfx.play(w.fx === 'flash' ? 'flash' : 'swing');
    if (w.fx === 'flash') G.fx.push({ type: 'flash', x: p.x, y: p.y - 6, a: p.aim, range: w.range, arc: w.arc, life: 0.18, max: 0.18 });
    for (const e of G.enemies) {
      if (e.dead) continue;
      const d = dist(p.x, p.y, e.x, e.y);
      if (d > w.range + e.r) continue;
      const a = Math.atan2(e.y - p.y, e.x - p.x);
      if (Math.abs(angleDiff(p.aim, a)) <= w.arc / 2 + (d < 30 ? 1 : 0.15)) {
        damageEnemy(e, playerDmg(), Math.cos(a), Math.sin(a));
      }
    }
  } else if (w.kind === 'gun') {
    if (p.ammo <= 0) { startReload(); return; }
    p.cd = w.cd; p.ammo--; p.atkT = 0.12; p.atkMax = 0.12;
    const a = p.aim + randRange(-w.spread, w.spread);
    const mx = p.x + Math.cos(p.aim) * 30, my = p.y - 6 + Math.sin(p.aim) * 30;
    G.projs.push(new Proj(mx, my, a, w.speed, playerDmg(), 'p', '#ffe080', 3));
    for (let i = 0; i < 8; i++) particle(mx, my, i < 4 ? '#ffd040' : '#aaa', 80, 0.3);
    G.shake = Math.max(G.shake, 3);
    Sfx.play('shot');
    if (p.ammo <= 0) startReload();
  } else if (w.kind === 'voice') {
    p.cd = w.cd; p.atkT = 0.12; p.atkMax = 0.12;
    const a = p.aim + randRange(-w.spread, w.spread);
    const word = w.words[Math.floor(Math.random() * w.words.length)];
    const pr = new Proj(p.x + Math.cos(p.aim) * 20, p.y - 8 + Math.sin(p.aim) * 20, a, w.speed, playerDmg(), 'p', w.color, 9, word);
    pr.life = 0.9;
    G.projs.push(pr);
    Sfx.play('speech');
  }
}
function startReload() {
  const p = G.player, w = weapon();
  if (w.kind !== 'gun' || p.reloadT > 0 || p.ammo >= w.mag) return;
  p.reloadT = w.reload;
  Sfx.play('reload');
}

// ---------- Atualização ----------
function update(dt) {
  const p = G.player, S = G.S;
  S.stats.time += dt;
  G.time += dt;

  // movimento: W cima, S baixo, A esquerda, D direita
  let mx = 0, my = 0;
  if (G.keys.KeyA || G.keys.ArrowLeft) mx -= 1;
  if (G.keys.KeyD || G.keys.ArrowRight) mx += 1;
  if (G.keys.KeyW || G.keys.ArrowUp) my -= 1;
  if (G.keys.KeyS || G.keys.ArrowDown) my += 1;
  const len = Math.hypot(mx, my) || 1;
  mx /= len; my /= len;
  p.moving = mx !== 0 || my !== 0;
  const speed = 175;
  if (p.dashT > 0) {
    p.dashT -= dt;
    moveEnt(p, p.dashX * speed * 3.2 * dt, p.dashY * speed * 3.2 * dt);
    if (Math.random() < 0.6) particle(p.x, p.y + 8, '#ddd', 30, 0.3);
  } else {
    moveEnt(p, mx * speed * dt, my * speed * dt);
  }
  if (p.moving) p.walkT += dt;
  p.cd -= dt; p.atkT -= dt; p.invT -= dt; p.dashCd -= dt; p.hurtT -= dt;
  if (p.reloadT > 0) { p.reloadT -= dt; if (p.reloadT <= 0) { p.ammo = weapon().mag; p.reloadT = 0; } }
  p.aim = Math.atan2(G.mouse.y + G.cam.y - (p.y - 6), G.mouse.x + G.cam.x - p.x);

  if (G.mouse.down && !G.hoverInRange) playerAttack();

  // inimigos
  const near = [];
  for (const e of G.enemies) {
    if (e.dead) continue;
    if (Math.abs(e.x - p.x) > 1300 || Math.abs(e.y - p.y) > 1000) continue;
    near.push(e);
    updateEnemy(e, dt);
  }
  // separação
  for (let i = 0; i < near.length; i++) for (let j = i + 1; j < near.length; j++) {
    const a = near[i], b = near[j];
    const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy), m = a.r + b.r;
    if (d > 0 && d < m) {
      const push = (m - d) / 2, ux = dx / d, uy = dy / d;
      if (!a.d.stationary) moveEnt(a, -ux * push, -uy * push);
      if (!b.d.stationary) moveEnt(b, ux * push, uy * push);
    }
  }
  G.enemies = G.enemies.filter(e => !e.dead);

  // respawn de acampamentos
  for (const camp of G.camps) {
    camp.respawnT -= dt;
    if (camp.respawnT > 0) continue;
    const alive = G.enemies.reduce((n, e) => n + (e.campId === camp.id ? 1 : 0), 0);
    if (alive < camp.n) { spawnCampEnemy(camp, true); camp.respawnT = 5; }
    else camp.respawnT = 2;
  }

  // projéteis
  for (const pr of G.projs) {
    pr.x += pr.vx * dt; pr.y += pr.vy * dt; pr.life -= dt;
    if (G.world.tallAt(pr.x, pr.y)) { pr.life = 0; for (let i = 0; i < 3; i++) particle(pr.x, pr.y, '#bbb', 60, 0.2); continue; }
    if (pr.owner === 'p') {
      for (const e of G.enemies) {
        if (e.dead) continue;
        if (dist(pr.x, pr.y, e.x, e.y - 6) < e.r + pr.r) {
          const l = Math.hypot(pr.vx, pr.vy);
          damageEnemy(e, pr.dmg, pr.vx / l, pr.vy / l);
          pr.life = 0; break;
        }
      }
    } else if (dist(pr.x, pr.y, p.x, p.y - 6) < p.r + pr.r) {
      hurtPlayer(pr.dmg, pr.x - pr.vx, pr.y - pr.vy);
      pr.life = 0;
    }
  }
  G.projs = G.projs.filter(pr => pr.life > 0);

  // objetos
  for (const o of G.objs) {
    if (o.kind === 'coin') {
      o.t += dt;
      const d = dist(p.x, p.y, o.x, o.y);
      if (d < 130) { const a = Math.atan2(p.y - o.y, p.x - o.x); o.x += Math.cos(a) * 320 * dt; o.y += Math.sin(a) * 320 * dt; }
      if (d < 16) { o.gone = true; S.gold += o.value; Sfx.play('coin'); }
    } else if (o.kind === 'potion') {
      if (dist(p.x, p.y, o.x, o.y) < 22) { o.gone = true; S.potions++; Sfx.play('pickup'); floatText(o.x, o.y - 20, T('potionFloat'), '#f66'); }
    } else if (o.kind === 'item') {
      if (dist(p.x, p.y, o.x, o.y) < 24) pickItem(o);
    }
  }
  G.objs = G.objs.filter(o => !o.gone);

  // efeitos
  for (const pt of G.parts) { pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.vx *= 0.92; pt.vy *= 0.92; pt.life -= dt; }
  G.parts = G.parts.filter(pt => pt.life > 0);
  for (const t of G.texts) { t.y -= 30 * dt; t.life -= dt; }
  G.texts = G.texts.filter(t => t.life > 0);
  for (const f of G.fx) f.life -= dt;
  G.fx = G.fx.filter(f => f.life > 0);

  checkGotoAndBoss();

  // câmera
  const tx = p.x - VW / 2, ty = p.y - VH / 2;
  G.cam.x = lerp(G.cam.x, tx, Math.min(1, dt * 8));
  G.cam.y = lerp(G.cam.y, ty, Math.min(1, dt * 8));
  G.cam.x = clamp(G.cam.x, 0, Math.max(0, G.world.W * TILE - VW));
  G.cam.y = clamp(G.cam.y, 0, Math.max(0, G.world.H * TILE - VH));
  G.shake = Math.max(0, G.shake - dt * 30);

  // hover
  const wx = G.mouse.x + G.cam.x, wy = G.mouse.y + G.cam.y;
  G.hover = null; G.hoverInRange = false;
  let best = 36;
  for (const o of G.objs) {
    if (o.kind === 'coin' || o.kind === 'potion') continue;
    if (o.kind === 'chest' && o.opened) continue;
    const d = dist(wx, wy, o.x, o.y - 10);
    if (d < best) { best = d; G.hover = o; }
  }
  if (G.hover) G.hoverInRange = dist(p.x, p.y, G.hover.x, G.hover.y) < INTERACT_RANGE;

  G.saveT += dt;
  if (G.saveT > 20) { G.saveT = 0; save(); }
  G.hudT -= dt;
  if (G.hudT <= 0) { G.hudT = 0.1; UI.hud(); }
}

function updateEnemy(e, dt) {
  const p = G.player;
  const dx = p.x - e.x, dy = p.y - e.y, d = Math.hypot(dx, dy) || 1;
  e.t += dt; e.hurtT -= dt; e.cd -= dt;
  e.aim = Math.atan2(dy, dx);
  if (e.boss) return updateBoss(e, dt, d, dx, dy);
  if (!e.aggro && d < 290) e.aggro = true;
  const hd = dist(e.x, e.y, e.homeX, e.homeY);
  if (e.aggro && (hd > 900 || d > 700)) e.aggro = false;
  e.moving = false;
  const step = e.spd * dt;
  if (!e.aggro) {
    e.wanderT -= dt;
    if (e.wanderT <= 0) { e.wanderT = randRange(1.5, 4); e.wx = e.homeX + randRange(-110, 110); e.wy = e.homeY + randRange(-110, 110); }
    const wd = dist(e.x, e.y, e.wx, e.wy);
    if (wd > 6) { moveEnt(e, (e.wx - e.x) / wd * step * 0.4, (e.wy - e.y) / wd * step * 0.4); e.moving = true; e.aim = Math.atan2(e.wy - e.y, e.wx - e.x); }
    e.windT = 0; e.dashT = 0;
    return;
  }
  const ux = dx / d, uy = dy / d;
  const reach = e.r + p.r;
  switch (e.ai) {
    case 'melee':
      if (e.windT > 0) {
        e.windT -= dt;
        if (e.windT <= 0) { if (d < reach + 24) hurtPlayer(e.dmg, e.x, e.y); e.cd = 1.1; }
      } else if (d > reach + 6) { moveEnt(e, ux * step, uy * step); e.moving = true; }
      else if (e.cd <= 0) e.windT = 0.32;
      break;
    case 'swarm':
      moveEnt(e, ux * step, uy * step); e.moving = true;
      if (d < reach + 4 && e.cd <= 0) { hurtPlayer(e.dmg, e.x, e.y); e.cd = 0.8; }
      break;
    case 'ranged':
      if (d < 170) { moveEnt(e, -ux * step, -uy * step); e.moving = true; }
      else if (d > 290) { moveEnt(e, ux * step, uy * step); e.moving = true; }
      else { moveEnt(e, -uy * step * 0.4 * Math.sin(e.t), ux * step * 0.4 * Math.sin(e.t)); }
      if (e.cd <= 0 && d < 430) {
        e.cd = randRange(1.5, 2.2);
        G.projs.push(new Proj(e.x, e.y - 6, e.aim + randRange(-0.06, 0.06), 270, e.dmg, 'e', e.d.proj || '#ccc', 4));
      }
      break;
    case 'charger':
      if (e.dashT > 0) {
        e.dashT -= dt; e.moving = true;
        moveEnt(e, e.dashX * e.spd * 4.2 * dt, e.dashY * e.spd * 4.2 * dt);
        if (!e.hitDash && d < reach + 4) { e.hitDash = true; hurtPlayer(e.dmg * 1.3, e.x, e.y); }
      } else if (e.windT > 0) {
        e.windT -= dt;
        if (e.windT <= 0) { e.dashT = 0.5; e.dashX = ux; e.dashY = uy; e.hitDash = false; }
      } else if (d < 270 && e.cd <= 0) { e.windT = 0.55; e.cd = 2.4; }
      else { moveEnt(e, ux * step * 0.7, uy * step * 0.7); e.moving = true; if (d < reach + 4 && e.cd < 1.5) { hurtPlayer(e.dmg * 0.6, e.x, e.y); e.cd = 1.8; } }
      break;
  }
}

function updateBoss(e, dt, d, dx, dy) {
  const p = G.player, d2 = e.d;
  const phase2 = e.hp < e.maxHp / 2;
  if (phase2 && !e.p2) { e.p2 = true; UI.toast(T('furious', d2.name), 'boss'); G.shake = 10; }
  const ux = dx / d, uy = dy / d;
  e.touchCd = (e.touchCd || 0) - dt;
  e.moving = false;
  if (e.dashT > 0) {
    e.dashT -= dt; e.moving = true;
    moveEnt(e, e.dashX * e.spd * 4 * dt, e.dashY * e.spd * 4 * dt);
    if (!e.hitDash && d < e.r + p.r + 4) { e.hitDash = true; hurtPlayer(e.dmg * 1.4, e.x, e.y); }
    return;
  }
  if (e.windT > 0) {
    e.windT -= dt;
    if (e.windT <= 0) { e.dashT = 0.65; e.dashX = ux; e.dashY = uy; e.hitDash = false; }
    return;
  }
  if (e.slamT > 0) {
    e.slamT -= dt;
    if (e.slamT <= 0) {
      G.shake = 10;
      for (let i = 0; i < 30; i++) particle(e.x + randRange(-e.slamR, e.slamR) * 0.7, e.y + randRange(-e.slamR, e.slamR) * 0.7, '#a98', 120, 0.5, 4);
      if (d < e.slamR) hurtPlayer(e.dmg * 1.5, e.x, e.y);
    }
    return;
  }
  if (e.sprayN > 0) {
    e.sprayT -= dt;
    if (e.sprayT <= 0) {
      e.sprayN--; e.sprayT = 0.24;
      const n = phase2 ? 7 : 5;
      for (let i = 0; i < n; i++) {
        const a = e.aim + (i - (n - 1) / 2) * 0.16;
        G.projs.push(new Proj(e.x + Math.cos(a) * e.r, e.y - 6 + Math.sin(a) * e.r, a, 280, e.dmg * 0.8, 'e', d2.proj || '#ccc', 5));
      }
      Sfx.play('shot');
    }
    return;
  }
  if (!d2.stationary && d > e.r + p.r + 8) {
    const sp = e.spd * (phase2 ? 1.25 : 1) * dt;
    moveEnt(e, ux * sp, uy * sp); e.moving = true;
  }
  if (d < e.r + p.r + 6 && e.touchCd <= 0) { hurtPlayer(e.dmg, e.x, e.y); e.touchCd = 1; }
  if (e.cd <= 0) {
    const pat = d2.patterns[e.pattern++ % d2.patterns.length];
    e.cd = phase2 ? 1.5 : 2.2;
    switch (pat) {
      case 'charge':
        if (d2.stationary) break;
        e.windT = 0.6; break;
      case 'slam':
        e.slamT = 0.9; e.slamR = e.r + 95; break;
      case 'burst': {
        const n = phase2 ? 18 : 12;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + e.t;
          G.projs.push(new Proj(e.x, e.y - 6, a, 230, e.dmg * 0.8, 'e', d2.proj || '#ccc', 6));
        }
        Sfx.play('shot');
        break;
      }
      case 'spray':
        e.sprayN = phase2 ? 4 : 3; e.sprayT = 0; break;
      case 'summon': {
        const minions = G.enemies.filter(m => m.summoned && !m.dead).length;
        const n = Math.min(phase2 ? 3 : 2, 6 - minions);
        for (let i = 0; i < n; i++) {
          const s = G.world.randomSpot(e.x, e.y, 4, 2);
          const m = new Enemy(d2.summon, s.x, s.y, G.mult, null);
          m.summoned = true; m.aggro = true; m.homeX = e.x; m.homeY = e.y;
          G.enemies.push(m);
          for (let k = 0; k < 10; k++) particle(s.x, s.y, '#fff', 90, 0.4);
        }
        break;
      }
    }
  }
}

function pickItem(o) {
  o.gone = true;
  const quest = G.ch.quests.find(q => q.id === o.qid);
  if (!quest || !questActive(quest)) return;
  const q = qState(quest.id);
  const s = curStep(quest);
  if (!s || s.t !== 'collect') return;
  q.prog++;
  Sfx.play('pickup');
  floatText(o.x, o.y - 20, o.name, '#9ef', 1);
  if (q.prog >= s.n) advance(quest);
  else UI.toast(`${s.item}: ${q.prog}/${s.n}`, 'prog');
}

function interact(o) {
  if (!o) return;
  if (dist(G.player.x, G.player.y, o.x, o.y) > INTERACT_RANGE) { UI.toast(T('closer'), 'prog'); return; }
  Sfx.play('click');
  switch (o.kind) {
    case 'npc': talkTo(o); break;
    case 'item': pickItem(o); break;
    case 'codex': {
      o.gone = true;
      chState(G.ch.id).codex[o.id] = true;
      gainXp(Math.round(25 * G.mult));
      Sfx.play('quest');
      UI.codexFound(o.def);
      save();
      break;
    }
    case 'chest': {
      if (o.opened) return;
      o.opened = true; o.name = T('chestEmpty');
      chState(G.ch.id).chests[o.idx] = true;
      const gold = Math.round(randRange(25, 45) * G.mult);
      G.S.gold += gold;
      let msg = T('chestLoot', gold, G.ch.currency);
      if (Math.random() < 0.6) { G.S.potions++; msg += T('chestPot'); }
      Sfx.play('pickup');
      UI.toast(msg, 'done');
      for (let i = 0; i < 16; i++) particle(o.x, o.y, '#ffd84a', 120, 0.6);
      save();
      break;
    }
  }
}

function nearestInteractable() {
  let best = null, bd = INTERACT_RANGE;
  for (const o of G.objs) {
    if (o.kind === 'coin' || o.kind === 'potion' || (o.kind === 'chest' && o.opened)) continue;
    const d = dist(G.player.x, G.player.y, o.x, o.y);
    if (d < bd) { bd = d; best = o; }
  }
  return best;
}

// ---------- Renderização ----------
function render() {
  const p = G.player;
  const sx = (Math.random() - 0.5) * G.shake, sy = (Math.random() - 0.5) * G.shake;
  const cx = Math.round(G.cam.x + sx), cy = Math.round(G.cam.y + sy);
  G.world.draw(ctx, cx, cy, VW, VH);
  ctx.save();
  ctx.translate(-cx, -cy);

  // marcos
  for (const pl of G.ch.places) {
    const wp = G.world.places[pl.id];
    if (pl.icon && Math.abs(wp.px - p.x) < VW && Math.abs(wp.py - p.y) < VH) drawLandmark(ctx, pl.icon, wp.px, wp.py - TILE * 2, G.time);
  }
  // áreas de impacto do chefe
  for (const e of G.enemies) {
    if (e.slamT > 0) {
      ctx.fillStyle = `rgba(255,60,40,${0.15 + 0.25 * (1 - e.slamT / 0.9)})`;
      ctx.beginPath(); ctx.arc(e.x, e.y, e.slamR, 0, 7); ctx.fill();
      ctx.strokeStyle = 'rgba(255,80,60,0.8)'; ctx.lineWidth = 2; ctx.stroke();
    }
  }

  // objetos de chão
  for (const o of G.objs) {
    if (Math.abs(o.x - p.x) > VW || Math.abs(o.y - p.y) > VH) continue;
    if (o.kind === 'coin') {
      ctx.fillStyle = '#ffd84a'; ctx.beginPath(); ctx.ellipse(o.x, o.y, 5 * Math.abs(Math.cos(G.time * 6 + o.x)) + 1, 5, 0, 0, 7); ctx.fill();
    } else if (o.kind === 'potion') {
      ctx.fillStyle = '#d33'; ctx.beginPath(); ctx.arc(o.x, o.y, 6, 0, 7); ctx.fill(); ctx.fillStyle = '#ccc'; ctx.fillRect(o.x - 2, o.y - 11, 4, 5);
    } else if (o.kind === 'item') {
      const b = Math.sin(G.time * 4 + o.x) * 3;
      ctx.fillStyle = 'rgba(120,220,255,0.25)'; ctx.beginPath(); ctx.arc(o.x, o.y, 15 + b, 0, 7); ctx.fill();
      ctx.font = '20px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(o.icon, o.x, o.y - 4 + b);
    } else if (o.kind === 'codex') {
      const b = Math.sin(G.time * 3) * 2;
      ctx.fillStyle = 'rgba(255,220,120,0.3)'; ctx.beginPath(); ctx.arc(o.x, o.y, 18 + b, 0, 7); ctx.fill();
      ctx.fillStyle = '#e8d8a8'; ctx.fillRect(o.x - 9, o.y - 12 + b, 18, 20);
      ctx.fillStyle = '#b8a070'; ctx.fillRect(o.x - 11, o.y - 14 + b, 22, 4); ctx.fillRect(o.x - 11, o.y + 6 + b, 22, 4);
      ctx.fillStyle = '#8a6a4a'; for (let i = 0; i < 3; i++) ctx.fillRect(o.x - 6, o.y - 7 + i * 4 + b, 12, 1.5);
    } else if (o.kind === 'chest') {
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(o.x - 13, o.y + 6, 28, 5);
      ctx.fillStyle = '#7a4a1a'; ctx.fillRect(o.x - 13, o.y - 8, 26, 16);
      ctx.fillStyle = o.opened ? '#3a2a10' : '#8a5a2a'; ctx.fillRect(o.x - 13, o.y - (o.opened ? 16 : 12), 26, o.opened ? 6 : 6);
      ctx.fillStyle = '#d4af37'; ctx.fillRect(o.x - 2, o.y - 6, 4, 5);
    }
  }

  // entidades ordenadas por y
  const list = [];
  for (const o of G.objs) if (o.kind === 'npc') list.push(o);
  for (const e of G.enemies) list.push(e);
  list.push(p);
  list.sort((a, b) => a.y - b.y);
  for (const ent of list) {
    if (Math.abs(ent.x - p.x) > VW || Math.abs(ent.y - p.y) > VH) continue;
    if (ent === p) drawPlayer();
    else if (ent.kind === 'npc') drawNpc(ent);
    else drawEnemy(ent);
  }

  // efeitos de ataque
  for (const f of G.fx) {
    if (f.type === 'flash') {
      ctx.fillStyle = `rgba(255,255,230,${0.7 * f.life / f.max})`;
      ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.arc(f.x, f.y, f.range, f.a - f.arc / 2, f.a + f.arc / 2); ctx.closePath(); ctx.fill();
    }
  }
  // projéteis
  for (const pr of G.projs) {
    if (pr.text) {
      ctx.font = 'bold 13px sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const w = ctx.measureText(pr.text).width + 10;
      ctx.fillStyle = '#fff'; ctx.strokeStyle = '#222'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect ? ctx.roundRect(pr.x - w / 2, pr.y - 10, w, 20, 8) : ctx.rect(pr.x - w / 2, pr.y - 10, w, 20); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#c03020'; ctx.fillText(pr.text, pr.x, pr.y + 1);
    } else {
      ctx.fillStyle = pr.color;
      ctx.beginPath(); ctx.arc(pr.x, pr.y, pr.r, 0, 7); ctx.fill();
      if (pr.owner === 'e') { ctx.strokeStyle = 'rgba(255,60,60,0.7)'; ctx.lineWidth = 1.5; ctx.stroke(); }
    }
  }
  // partículas
  for (const pt of G.parts) {
    ctx.globalAlpha = Math.max(0, pt.life / pt.max);
    ctx.fillStyle = pt.color; ctx.fillRect(pt.x - pt.size / 2, pt.y - pt.size / 2, pt.size, pt.size);
  }
  ctx.globalAlpha = 1;
  // textos flutuantes
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  for (const t of G.texts) {
    ctx.globalAlpha = Math.min(1, t.life / t.max * 2);
    ctx.font = 'bold 14px sans-serif';
    ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.strokeText(t.text, t.x, t.y);
    ctx.fillStyle = t.color; ctx.fillText(t.text, t.x, t.y);
  }
  ctx.globalAlpha = 1;

  // marcador do objetivo
  const tgt = questTarget(G.ch.quests[0]);
  if (tgt && !qState('main').done) drawObjective(tgt, '#ffd84a');

  // rótulo do hover
  if (G.hover) {
    const o = G.hover;
    const label = o.name + (G.hoverInRange ? '  ' + T('click') : '');
    ctx.font = 'bold 13px sans-serif';
    const w = ctx.measureText(label).width + 12;
    ctx.fillStyle = 'rgba(0,0,0,0.7)'; ctx.fillRect(o.x - w / 2, o.y - 62, w, 20);
    ctx.fillStyle = G.hoverInRange ? '#ffd84a' : '#ddd'; ctx.fillText(label, o.x, o.y - 52);
  }
  ctx.restore();

  drawBossBar();
  drawMinimap();
  drawCrosshair();
}

function drawPlayer() {
  const p = G.player, w = weapon(), cls = CLASSES[G.ch.cls];
  const look = Object.assign({}, cls.look, { weapon: w.draw, weaponColor: w.color, shield: w.shield });
  let swingArc = 0, thrust = 0;
  if (p.atkT > 0 && w.kind === 'melee') {
    const k = 1 - p.atkT / p.atkMax;
    if (w.draw === 'spear') thrust = Math.sin(k * Math.PI);
    else if (w.draw !== 'camera') swingArc = -w.arc / 2 + w.arc * k;
  }
  if (p.atkT > 0 && w.kind !== 'melee') thrust = -0.2;
  const blink = p.invT > 0 && Math.floor(G.time * 20) % 2 === 0;
  drawHuman(ctx, p.x, p.y, look, p.aim, p.walkT, { moving: p.moving, swingArc, thrust, alpha: blink ? 0.4 : 1, flash: p.hurtT > 0 });
  if (p.atkT > 0 && w.kind === 'melee' && w.draw !== 'spear' && w.draw !== 'camera') {
    ctx.strokeStyle = `rgba(255,255,255,${0.6 * p.atkT / p.atkMax})`; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(p.x, p.y - 6, w.range * 0.8, p.aim - w.arc / 2, p.aim + w.arc / 2); ctx.stroke();
  }
  if (p.reloadT > 0) {
    const k = 1 - p.reloadT / weapon().reload;
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(p.x - 18, p.y - 46, 36, 5);
    ctx.fillStyle = '#ffd84a'; ctx.fillRect(p.x - 18, p.y - 46, 36 * k, 5);
  }
}

function npcMarker(npc) {
  for (const quest of G.ch.quests) {
    if (!questActive(quest)) continue;
    const s = curStep(quest);
    if (s && (s.t === 'talk' || s.t === 'quiz') && s.npc === npc.id) return quest.id === 'main' ? '#ffd84a' : '#9ad0ff';
  }
  return null;
}

function drawNpc(n) {
  const look = Object.assign({ skin: '#e0b090', body: '#6a6a8a', hat: 'none' }, n.def.look);
  drawHuman(ctx, n.x, n.y, look, n.aim, G.time, {});
  const d = dist(G.player.x, G.player.y, n.x, n.y);
  if (d < 260) {
    ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.strokeText(n.name, n.x, n.y + 26);
    ctx.fillStyle = n.def.shop ? '#ffd84a' : '#fff'; ctx.fillText(n.name, n.x, n.y + 26);
  }
  const m = npcMarker(n);
  if (m) {
    const b = Math.sin(G.time * 5) * 3;
    ctx.font = 'bold 22px sans-serif'; ctx.textAlign = 'center';
    ctx.strokeStyle = '#000'; ctx.lineWidth = 4; ctx.strokeText('!', n.x, n.y - 44 + b);
    ctx.fillStyle = m; ctx.fillText('!', n.x, n.y - 44 + b);
  } else if (n.def.shop) {
    ctx.font = '16px serif'; ctx.textAlign = 'center'; ctx.fillText('💰', n.x, n.y - 44);
  }
}

function drawEnemy(e) {
  const d = e.d, flash = e.hurtT > 0;
  const tell = (e.windT > 0) && Math.floor(G.time * 16) % 2 === 0;
  if (d.shape === 'beast') drawBeast(ctx, e.x, e.y, d, Math.cos(e.aim), e.t, { moving: e.moving, flash: flash || tell });
  else if (d.shape === 'blob') drawBlob(ctx, e.x, e.y, d, e.aim, e.t, { flash: flash || tell });
  else if (d.shape === 'tower') drawTower(ctx, e.x, e.y, d, e.aim, e.t, { flash });
  else {
    const look = Object.assign({}, d.look);
    if (d.shadow) { look.body = shade(look.body, -10); }
    drawHuman(ctx, e.x, e.y, look, e.aim, e.t, { moving: e.moving, flash: flash || tell, mounted: d.mounted, scale: e.boss ? 1.6 : 1, alpha: d.shadow ? 0.85 : 1 });
  }
  if (e.windT > 0 && !e.boss) {
    ctx.font = 'bold 18px sans-serif'; ctx.textAlign = 'center';
    ctx.fillStyle = '#ff4030'; ctx.fillText('!', e.x, e.y - e.r - 30);
  }
  if (!e.boss && e.hp < e.maxHp) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(e.x - 16, e.y - e.r - 24, 32, 4);
    ctx.fillStyle = '#e33'; ctx.fillRect(e.x - 16, e.y - e.r - 24, 32 * e.hp / e.maxHp, 4);
  }
}

function drawObjective(t, color) {
  const sx = t.x - G.cam.x, sy = t.y - G.cam.y;
  const onScreen = sx > 30 && sy > 60 && sx < VW - 30 && sy < VH - 30;
  ctx.save();
  ctx.translate(G.cam.x, G.cam.y);
  if (onScreen) {
    const b = Math.sin(G.time * 5) * 4;
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.moveTo(sx, sy - 52 + b); ctx.lineTo(sx - 8, sy - 66 + b); ctx.lineTo(sx + 8, sy - 66 + b); ctx.fill();
  } else {
    const px = G.player.x - G.cam.x, py = G.player.y - G.cam.y;
    const a = Math.atan2(sy - py, sx - px);
    const r = Math.min(VW, VH) / 2 - 50;
    const ax = clamp(px + Math.cos(a) * r, 40, VW - 40), ay = clamp(py + Math.sin(a) * r, 70, VH - 40);
    ctx.translate(ax, ay); ctx.rotate(a);
    ctx.fillStyle = color; ctx.strokeStyle = '#000'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(-8, -11); ctx.lineTo(-3, 0); ctx.lineTo(-8, 11); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.rotate(-a);
    const m = Math.round(dist(G.player.x, G.player.y, t.x, t.y) / 16);
    ctx.font = 'bold 12px sans-serif'; ctx.textAlign = 'center';
    ctx.strokeStyle = '#000'; ctx.lineWidth = 3; ctx.strokeText(m + ' m', 0, 26);
    ctx.fillStyle = '#fff'; ctx.fillText(m + ' m', 0, 26);
  }
  ctx.restore();
}

function drawBossBar() {
  const b = G.boss;
  if (!b) return;
  const w = Math.min(520, VW - 40), x = (VW - w) / 2, y = VH - 60;
  ctx.fillStyle = 'rgba(0,0,0,0.75)'; ctx.fillRect(x - 4, y - 22, w + 8, 38);
  ctx.fillStyle = '#400'; ctx.fillRect(x, y, w, 12);
  ctx.fillStyle = b.hp < b.maxHp / 2 ? '#ff3a1a' : '#c92020'; ctx.fillRect(x, y, w * Math.max(0, b.hp) / b.maxHp, 12);
  ctx.font = 'bold 14px Georgia, serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#ffd84a';
  ctx.fillText(b.d.name, VW / 2, y - 8);
}

function drawMinimap() {
  const mm = G.world.minimap();
  const s = Math.min(1.6, 180 / G.world.W);
  const w = G.world.W * s, h = G.world.H * s;
  const x = VW - w - 12, y = VH - h - 12;
  ctx.globalAlpha = 0.85;
  ctx.fillStyle = '#000'; ctx.fillRect(x - 3, y - 3, w + 6, h + 6);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(mm, x, y, w, h);
  ctx.globalAlpha = 1;
  const k = s / TILE;
  for (const pl of G.ch.places) {
    const wp = G.world.places[pl.id];
    ctx.fillStyle = pl.type === 'arena' ? '#e33' : pl.type === 'camp' ? '#e93' : '#fff';
    ctx.fillRect(x + wp.px * k - 2, y + wp.py * k - 2, 4, 4);
  }
  const tgt = questTarget(G.ch.quests[0]);
  if (tgt && !qState('main').done) {
    ctx.strokeStyle = '#ffd84a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x + tgt.x * k, y + tgt.y * k, 4 + Math.sin(G.time * 6) * 1.5, 0, 7); ctx.stroke();
  }
  ctx.fillStyle = '#3cf'; ctx.beginPath(); ctx.arc(x + G.player.x * k, y + G.player.y * k, 3, 0, 7); ctx.fill();
}

function drawCrosshair() {
  if (G.ui) return;
  const { x, y } = G.mouse;
  ctx.strokeStyle = G.hoverInRange ? '#ffd84a' : '#fff'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(x, y, 8, 0, 7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x - 13, y); ctx.lineTo(x - 5, y); ctx.moveTo(x + 5, y); ctx.lineTo(x + 13, y);
  ctx.moveTo(x, y - 13); ctx.lineTo(x, y - 5); ctx.moveTo(x, y + 5); ctx.lineTo(x, y + 13); ctx.stroke();
}

// ---------- Entrada ----------
window.addEventListener('keydown', (e) => {
  if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
  if (['Space', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
  if (UI.onKey(e)) return;
  if (!G.running || G.ui) return;
  G.keys[e.code] = true;
  switch (e.code) {
    case 'Space':
      if (G.player.dashCd <= 0) {
        const p = G.player;
        let dx = 0, dy = 0;
        if (G.keys.KeyA || G.keys.ArrowLeft) dx -= 1; if (G.keys.KeyD || G.keys.ArrowRight) dx += 1;
        if (G.keys.KeyW || G.keys.ArrowUp) dy -= 1; if (G.keys.KeyS || G.keys.ArrowDown) dy += 1;
        if (!dx && !dy) { dx = Math.cos(p.aim); dy = Math.sin(p.aim); }
        const l = Math.hypot(dx, dy);
        p.dashX = dx / l; p.dashY = dy / l; p.dashT = 0.16; p.dashCd = 0.75;
        Sfx.play('dash');
      }
      break;
    case 'KeyE': interact(nearestInteractable()); break;
    case 'KeyQ': usePotion(); break;
    case 'KeyR': startReload(); break;
  }
});
window.addEventListener('keyup', (e) => { G.keys[e.code] = false; });
window.addEventListener('blur', () => { G.keys = {}; G.mouse.down = false; });
canvas.addEventListener('mousemove', (e) => { G.mouse.x = e.clientX; G.mouse.y = e.clientY; });
canvas.addEventListener('mousedown', (e) => {
  Sfx.init();
  if (!G.running || G.ui) return;
  if (e.button !== 0) return;
  if (G.hover && G.hoverInRange) { interact(G.hover); return; }
  G.mouse.down = true;
  playerAttack();
});
window.addEventListener('mouseup', () => { G.mouse.down = false; });
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

// ---------- Laço ----------
let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (G.running && G.world) {
    if (!G.ui) update(dt);
    else G.time += dt;
    render();
  }
  requestAnimationFrame(frame);
}

function startGame(state, slot) {
  G.S = state;
  G.slot = slot;
  Sfx.enabled = state.sound !== false;
  CHAPTERS.sort((a, b) => a.num - b.num);
  G.running = true;
  const hp = state.hp;
  const idx = clamp(state.chapter || 0, 0, CHAPTERS.length - 1);
  enterChapter(idx, true);
  if (hp > 0) G.S.hp = Math.min(hp, maxHp());
}

resize();
requestAnimationFrame(frame);
