// Desenho de personagens, jogador, inimigos, projéteis e partículas.
'use strict';

// ---------- Desenho ----------
function drawHat(ctx, hat, color, dir) {
  ctx.fillStyle = color || '#555';
  switch (hat) {
    case 'hood': ctx.beginPath(); ctx.arc(0, -22, 9, Math.PI * 0.95, Math.PI * 2.05); ctx.fill(); ctx.fillRect(-9, -23, 3, 9); ctx.fillRect(6, -23, 3, 9); break;
    case 'band': ctx.fillRect(-8, -26, 16, 3); break;
    case 'galea': ctx.beginPath(); ctx.arc(0, -23, 8, Math.PI, 0); ctx.fill(); ctx.fillStyle = '#c02020'; ctx.fillRect(-2, -36, 4, 7); ctx.fillRect(-6 * dir, -36, 10, 3); break;
    case 'nasal': ctx.beginPath(); ctx.moveTo(-8, -22); ctx.lineTo(0, -34); ctx.lineTo(8, -22); ctx.fill(); ctx.fillRect(dir * 2 - 1, -23, 2, 7); break;
    case 'great': ctx.fillRect(-8, -32, 16, 15); ctx.fillStyle = '#222'; ctx.fillRect(dir > 0 ? 0 : -8, -26, 8, 2); break;
    case 'cap': ctx.fillRect(-8, -29, 16, 6); ctx.fillRect(dir > 0 ? 2 : -12, -25, 10, 2); break;
    case 'morion': ctx.beginPath(); ctx.ellipse(0, -24, 12, 3, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.arc(0, -25, 7, Math.PI, 0); ctx.fill(); ctx.fillRect(-1, -35, 2, 5); break;
    case 'wide': ctx.beginPath(); ctx.ellipse(0, -26, 13, 3, 0, 0, 7); ctx.fill(); ctx.fillRect(-6, -32, 12, 6); break;
    case 'shako': ctx.fillRect(-7, -36, 14, 12); ctx.fillStyle = '#e0c060'; ctx.fillRect(-2, -34, 4, 3); ctx.fillStyle = '#111'; ctx.fillRect(dir > 0 ? 0 : -10, -25, 10, 2); break;
    case 'beret': ctx.beginPath(); ctx.ellipse(dir * 2, -28, 10, 4, 0, 0, 7); ctx.fill(); break;
    case 'fedora': ctx.beginPath(); ctx.ellipse(0, -26, 12, 3, 0, 0, 7); ctx.fill(); ctx.fillRect(-7, -33, 14, 7); ctx.fillStyle = '#222'; ctx.fillRect(-7, -28, 14, 2); break;
    case 'turban': ctx.beginPath(); ctx.ellipse(0, -27, 9, 6, 0, 0, 7); ctx.fill(); break;
    case 'veil': ctx.beginPath(); ctx.arc(0, -22, 9, 0, 7); ctx.fill(); ctx.fillStyle = '#d8a070'; ctx.fillRect(dir > 0 ? 1 : -7, -24, 6, 3); break;
    case 'tall': ctx.fillRect(-6, -42, 12, 18); ctx.beginPath(); ctx.ellipse(0, -42, 7, 3, 0, 0, 7); ctx.fill(); break;
    case 'bearskin': ctx.beginPath(); ctx.ellipse(0, -32, 9, 12, 0, 0, 7); ctx.fill(); break;
    case 'tricorn': ctx.beginPath(); ctx.moveTo(-12, -24); ctx.lineTo(0, -34); ctx.lineTo(12, -24); ctx.lineTo(0, -27); ctx.fill(); break;
  }
}

function drawWeapon(ctx, kind, color, swing) {
  // Desenhado já rotacionado para a mira; origem na mão
  switch (kind) {
    case 'spear':
      ctx.fillStyle = color || '#a0784a'; ctx.fillRect(-10 + swing * 16, -1.5, 46, 3);
      ctx.fillStyle = '#ccc'; ctx.beginPath(); ctx.moveTo(36 + swing * 16, -4); ctx.lineTo(46 + swing * 16, 0); ctx.lineTo(36 + swing * 16, 4); ctx.fill();
      break;
    case 'falcata':
      ctx.fillStyle = '#5a3a20'; ctx.fillRect(-2, -2, 8, 4);
      ctx.fillStyle = color || '#ccd'; ctx.beginPath(); ctx.moveTo(6, -3); ctx.quadraticCurveTo(20, -8, 30, 2); ctx.lineTo(6, 3); ctx.fill();
      break;
    case 'sword': case 'knife':
      ctx.fillStyle = '#5a3a20'; ctx.fillRect(-2, -2, 7, 4);
      ctx.fillStyle = '#a08030'; ctx.fillRect(5, -5, 2, 10);
      ctx.fillStyle = color || '#ccd'; ctx.fillRect(7, -2, kind === 'knife' ? 12 : 22, 4);
      break;
    case 'longsword':
      ctx.fillStyle = '#5a3a20'; ctx.fillRect(-4, -2, 10, 4);
      ctx.fillStyle = '#a08030'; ctx.fillRect(6, -7, 3, 14);
      ctx.fillStyle = color || '#dde'; ctx.fillRect(9, -2.5, 32, 5);
      break;
    case 'club':
      ctx.fillStyle = '#6a4a2a'; ctx.fillRect(0, -2, 20, 4); ctx.beginPath(); ctx.arc(22, 0, 5, 0, 7); ctx.fill();
      break;
    case 'chain':
      ctx.strokeStyle = '#999'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, 0);
      for (let i = 1; i <= 6; i++) ctx.lineTo(i * 6, Math.sin(i + swing * 6) * 3); ctx.stroke();
      break;
    case 'bow':
      ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(4, 0, 12, -1.3, 1.3); ctx.stroke();
      ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(4 + Math.cos(-1.3) * 12, Math.sin(-1.3) * 12); ctx.lineTo(4 + Math.cos(1.3) * 12, Math.sin(1.3) * 12); ctx.stroke();
      break;
    case 'sling':
      ctx.strokeStyle = '#b8a070'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(14, Math.sin(swing * 20) * 6); ctx.stroke();
      break;
    case 'gun': case 'rifle': case 'bayonet':
      ctx.fillStyle = color || '#4a2f18'; ctx.fillRect(-6, -2.5, 14, 5);
      ctx.fillStyle = '#333'; ctx.fillRect(8, -1.5, kind === 'rifle' ? 26 : 30, 3);
      if (kind === 'bayonet' || kind === 'rifle') { ctx.fillStyle = '#ccc'; ctx.fillRect(34, -1, 10, 2); }
      break;
    case 'torch':
      ctx.fillStyle = '#5a3a20'; ctx.fillRect(0, -2, 16, 4);
      ctx.fillStyle = '#ff8a1a'; ctx.beginPath(); ctx.arc(18, 0, 5 + Math.random() * 2, 0, 7); ctx.fill();
      break;
    case 'camera':
      ctx.fillStyle = '#222'; ctx.fillRect(2, -6, 14, 11); ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(17, 0, 4, 0, 7); ctx.fill();
      ctx.fillStyle = '#ddd'; ctx.fillRect(4, -9, 5, 3);
      break;
    case 'paper':
      ctx.fillStyle = '#f4f0e0'; ctx.fillRect(4, -7, 11, 14); ctx.fillStyle = '#888'; for (let i = 0; i < 4; i++) ctx.fillRect(6, -5 + i * 3, 7, 1);
      break;
    case 'megaphone':
      ctx.fillStyle = color || '#e63'; ctx.beginPath(); ctx.moveTo(4, -3); ctx.lineTo(20, -8); ctx.lineTo(20, 8); ctx.lineTo(4, 3); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.fillRect(18, -8, 3, 16);
      break;
    case 'pen':
      ctx.fillStyle = '#111'; ctx.fillRect(2, -1.5, 20, 3); ctx.fillStyle = '#c0a040'; ctx.fillRect(20, -1, 4, 2);
      break;
  }
}

function drawHuman(ctx, x, y, look, aim, t, o) {
  o = o || {};
  const dir = Math.cos(aim) >= 0 ? 1 : -1;
  const bob = o.moving ? Math.sin(t * 14) : 0;
  ctx.save();
  ctx.translate(x, y);
  if (o.scale) ctx.scale(o.scale, o.scale);
  if (o.alpha != null) ctx.globalAlpha = o.alpha;
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.beginPath(); ctx.ellipse(0, 12, o.mounted ? 20 : 11, 5, 0, 0, 7); ctx.fill();
  if (o.mounted) {
    ctx.fillStyle = o.mounted;
    ctx.beginPath(); ctx.ellipse(0, 4, 20, 9, 0, 0, 7); ctx.fill();
    ctx.fillRect(dir * 14 - 4, -10, 8, 14);
    ctx.beginPath(); ctx.ellipse(dir * 22, -10, 8, 5, 0, 0, 7); ctx.fill();
    ctx.fillStyle = shade(o.mounted, -30);
    for (const lx of [-14, -8, 8, 14]) ctx.fillRect(lx - 2, 8 + (Math.abs(lx) === 8 ? bob : -bob) * 2, 4, 9);
    ctx.translate(0, -8);
  }
  if (look.cape) { ctx.fillStyle = look.cape; ctx.beginPath(); ctx.moveTo(-8, -14); ctx.lineTo(-11 - dir * 3, 8); ctx.lineTo(11 - dir * 3, 8); ctx.lineTo(8, -14); ctx.fill(); }
  // pernas
  if (!o.mounted) {
    ctx.fillStyle = look.legs || shade(look.body, -40);
    ctx.fillRect(-6, 2 + bob * 2, 5, 9 - bob * 2);
    ctx.fillRect(1, 2 - bob * 2, 5, 9 + bob * 2);
  }
  // corpo
  ctx.fillStyle = o.flash ? '#fff' : look.body;
  ctx.fillRect(-8, -14, 16, 17);
  if (look.cross) { ctx.fillStyle = look.cross; ctx.fillRect(-1.5, -12, 3, 13); ctx.fillRect(-6, -8, 12, 3); }
  if (look.sash) { ctx.strokeStyle = look.sash; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(-8, -14); ctx.lineTo(8, 2); ctx.stroke(); }
  if (look.tie) { ctx.fillStyle = '#fff'; ctx.fillRect(-3, -14, 6, 4); ctx.fillStyle = look.tie; ctx.fillRect(-1.5, -12, 3, 10); }
  // cabeça
  ctx.fillStyle = o.flash ? '#fff' : look.skin;
  ctx.beginPath(); ctx.arc(0, -21, 7, 0, 7); ctx.fill();
  ctx.fillStyle = '#222'; ctx.fillRect(dir * 3 - 1, -23, 2, 2);
  if (look.hat && look.hat !== 'none') drawHat(ctx, look.hat, look.hatColor, dir);
  else { ctx.fillStyle = look.hair || '#3a2a1a'; ctx.beginPath(); ctx.arc(0, -24, 7, Math.PI, 0); ctx.fill(); }
  // escudo
  if (look.shield) {
    ctx.fillStyle = look.shield;
    ctx.beginPath(); ctx.ellipse(-dir * 9, -4, 5, 10, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#d4af37'; ctx.beginPath(); ctx.arc(-dir * 9, -4, 2, 0, 7); ctx.fill();
  }
  // arma
  if (look.weapon && look.weapon !== 'none') {
    ctx.save();
    ctx.translate(dir * 5, -6);
    let a = aim;
    if (o.swingArc) a += o.swingArc;
    ctx.rotate(a);
    drawWeapon(ctx, look.weapon, look.weaponColor, o.thrust || 0);
    ctx.restore();
  }
  ctx.restore();
}

function drawBeast(ctx, x, y, d, face, t, o) {
  const dir = face >= 0 ? 1 : -1;
  const s = d.r / 14;
  const bob = o.moving ? Math.sin(t * 16) : 0;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s * dir, s);
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(0, 10, 16, 5, 0, 0, 7); ctx.fill();
  const col = o.flash ? '#fff' : d.color;
  ctx.fillStyle = shade(d.color, -25);
  ctx.fillRect(-11, 2 + bob * 2, 4, 9); ctx.fillRect(7, 2 - bob * 2, 4, 9);
  ctx.fillStyle = col;
  ctx.beginPath(); ctx.ellipse(0, 0, 16, 9, 0, 0, 7); ctx.fill();
  ctx.fillRect(-9, 2 - bob * 2, 4, 9); ctx.fillRect(9, 2 + bob * 2, 4, 9);
  ctx.beginPath(); ctx.ellipse(15, -4, 8, 6, 0, 0, 7); ctx.fill();
  ctx.fillStyle = '#111'; ctx.fillRect(17, -7, 2, 2);
  if (d.horns) { ctx.strokeStyle = '#e8e0c0'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(13, -9); ctx.quadraticCurveTo(10, -18, 18, -17); ctx.stroke(); }
  if (d.tusks) { ctx.fillStyle = '#eee'; ctx.fillRect(18, 0, 8, 2); ctx.fillStyle = col; ctx.fillRect(20, -2, 3, 12); }
  ctx.fillStyle = shade(d.color, 20); ctx.beginPath(); ctx.moveTo(-16, -2); ctx.lineTo(-22, -6 + Math.sin(t * 8) * 2); ctx.lineTo(-16, 2); ctx.fill();
  ctx.restore();
}

function drawBlob(ctx, x, y, d, aim, t, o) {
  const r = d.r;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(0, r * 0.8, r, r * 0.35, 0, 0, 7); ctx.fill();
  const wob = Math.sin(t * 6) * 1.5;
  const col = o.flash ? '#fff' : d.color;
  if (d.bubble) {
    ctx.fillStyle = 'rgba(154,208,240,0.45)'; ctx.strokeStyle = '#d8f0ff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, -4, r + wob, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-r * 0.35, -r * 0.5, 3, 0, 7); ctx.fill();
    ctx.fillStyle = '#2a5a8a'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('€', 0, 0);
  } else if (d.screen) {
    ctx.fillStyle = col; ctx.fillRect(-r, -r - 4, r * 2, r * 1.6);
    ctx.fillStyle = '#9ef'; ctx.fillRect(-r + 3, -r - 1, r * 2 - 6, r * 1.6 - 6);
    ctx.fillStyle = '#f04070'; ctx.fillRect(-6, -r + 4, 3, 3); ctx.fillRect(3, -r + 4, 3, 3); ctx.fillRect(-5, -r + 11, 10, 2);
    ctx.fillStyle = col; ctx.fillRect(-3, r * 0.6 - 4, 6, 6);
  } else {
    if (d.spikes) {
      ctx.strokeStyle = shade(d.color, -30); ctx.lineWidth = 3;
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + t; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r, -4 + Math.sin(a) * r); ctx.lineTo(Math.cos(a) * (r + 6), -4 + Math.sin(a) * (r + 6)); ctx.stroke(); }
    }
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.ellipse(0, -4, r + wob, r - wob, 0, 0, 7); ctx.fill();
    ctx.fillStyle = shade(d.color, 25); ctx.beginPath(); ctx.arc(-r * 0.3, -r * 0.4 - 4, r * 0.25, 0, 7); ctx.fill();
    const ex = Math.cos(aim) * 3, ey = Math.sin(aim) * 2;
    if (d.eye) {
      ctx.fillStyle = d.eye; ctx.beginPath(); ctx.arc(ex * 2, -6 + ey, r * 0.3, 0, 7); ctx.fill();
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(ex * 3, -6 + ey, r * 0.12, 0, 7); ctx.fill();
    } else {
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(-4 + ex, -7 + ey, 3, 0, 7); ctx.arc(4 + ex, -7 + ey, 3, 0, 7); ctx.fill();
      ctx.fillStyle = '#000'; ctx.fillRect(-5 + ex * 1.3, -8 + ey, 2, 2); ctx.fillRect(3 + ex * 1.3, -8 + ey, 2, 2);
    }
  }
  ctx.restore();
}

function drawTower(ctx, x, y, d, aim, t, o) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(0, 30, 48, 14, 0, 0, 7); ctx.fill();
  ctx.fillStyle = o.flash ? '#fff' : d.color;
  ctx.fillRect(-40, -60, 80, 90);
  ctx.fillStyle = shade(d.color, -25);
  for (let i = -40; i < 40; i += 16) ctx.fillRect(i, -72, 10, 12);
  for (let y2 = -50; y2 < 30; y2 += 12) ctx.fillRect(-40, y2, 80, 1);
  ctx.save(); ctx.translate(0, -20); ctx.rotate(aim);
  ctx.fillStyle = '#2a2a2a'; ctx.fillRect(0, -7, 48, 14); ctx.fillStyle = '#111'; ctx.beginPath(); ctx.arc(48, 0, 7, 0, 7); ctx.fill();
  ctx.restore();
  ctx.restore();
}

// ---------- Jogador ----------
class Player {
  constructor(x, y) {
    this.x = x; this.y = y; this.r = 11;
    this.aim = 0; this.walkT = 0; this.moving = false;
    this.atkT = 0; this.cd = 0; this.dashT = 0; this.dashCd = 0; this.invT = 0;
    this.dashX = 0; this.dashY = 0; this.reloadT = 0; this.ammo = 0; this.hurtT = 0;
  }
}

// ---------- Inimigos ----------
class Enemy {
  constructor(type, x, y, mult, campId) {
    const d = ENEMIES[type];
    this.type = type; this.d = d;
    this.x = x; this.y = y; this.homeX = x; this.homeY = y;
    this.r = d.r; this.boss = !!d.boss;
    this.maxHp = Math.round(d.hp * mult); this.hp = this.maxHp;
    this.dmg = d.dmg * mult; this.spd = d.spd;
    this.ai = d.ai || 'melee';
    this.campId = campId;
    this.t = Math.random() * 10; this.cd = 1 + Math.random(); this.state = 'idle';
    this.aim = 0; this.hurtT = 0; this.windT = 0; this.dashT = 0; this.dashX = 0; this.dashY = 0;
    this.wanderT = 0; this.wx = x; this.wy = y; this.aggro = false; this.moving = false;
    this.pattern = 0; this.slamT = 0; this.slamR = 0; this.dead = false;
  }
}

class Proj {
  constructor(x, y, a, speed, dmg, owner, color, r, text) {
    this.x = x; this.y = y; this.vx = Math.cos(a) * speed; this.vy = Math.sin(a) * speed;
    this.dmg = dmg; this.owner = owner; this.color = color || '#fff'; this.r = r || 4;
    this.life = 1.4; this.text = text || null;
  }
}
