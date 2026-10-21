// Geração procedural do mapa de cada capítulo e renderização de tiles.
'use strict';

const TL = { G: 0, P: 1, W: 2, O: 3, B: 4, F: 5, BR: 6, ROAD: 7, SIDE: 8 };
const WALKABLE = [true, true, false, false, false, true, true, true, true];
const TALL = [false, false, false, true, true, false, false, false, false];

class World {
  constructor(ch) {
    this.ch = ch;
    const b = ch.biome;
    this.b = b;
    this.W = ch.size ? ch.size[0] : 110;
    this.H = ch.size ? ch.size[1] : 80;
    this.t = new Uint8Array(this.W * this.H);
    this.k = new Uint8Array(this.W * this.H); // variante de obstáculo
    this.chunks = new Map();
    this.places = {};
    this.generate();
  }

  idx(x, y) { return y * this.W + x; }
  get(x, y) { return (x < 0 || y < 0 || x >= this.W || y >= this.H) ? TL.O : this.t[y * this.W + x]; }
  set(x, y, v) { if (x >= 0 && y >= 0 && x < this.W && y < this.H) this.t[y * this.W + x] = v; }

  generate() {
    const { W, H, b } = this;
    const rng = mulberry32(this.ch.seed);
    const nObs = makeNoise(rng, W, H, 9);
    const nWat = makeNoise(rng, W, H, 15);
    const obsCount = b.obs.length;

    if (b.urban) {
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const rx = x % 16, ry = y % 14;
        let v;
        if (rx < 3 || ry < 3) v = TL.ROAD;
        else if (rx === 3 || ry === 3 || rx === 15 || ry === 13) v = TL.SIDE;
        else v = TL.B;
        this.t[this.idx(x, y)] = v;
      }
      // Alguns quarteirões viram praças e parques
      for (let by = 0; by < H; by += 14) for (let bx = 0; bx < W; bx += 16) {
        const r = rng();
        if (r < 0.3) {
          for (let y = by + 4; y < by + 13; y++) for (let x = bx + 4; x < bx + 15; x++) {
            if (x < W && y < H) {
              this.t[this.idx(x, y)] = rng() < 0.18 ? TL.O : TL.G;
              this.k[this.idx(x, y)] = Math.floor(rng() * obsCount);
            }
          }
        }
      }
    } else {
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = this.idx(x, y);
        let v = TL.G;
        if (b.lakes && nWat(x, y) > 0.74) v = TL.W;
        else if (nObs(x, y) > (b.thr || 0.56) && rng() < (b.density || 0.55)) v = TL.O;
        else if (rng() < (b.scatter || 0.025)) v = TL.O;
        this.t[i] = v;
        this.k[i] = Math.floor(rng() * obsCount);
      }
      if (b.sea) {
        for (let x = 0; x < W; x++) {
          const depth = 6 + Math.floor(nWat(x, 3) * 6);
          for (let d = 0; d < depth; d++) {
            if (b.sea === 'south') this.set(x, H - 1 - d, TL.W);
            else if (b.sea === 'north') this.set(x, d, TL.W);
          }
        }
        for (let y = 0; y < H; y++) {
          const depth = 6 + Math.floor(nWat(3, y) * 6);
          for (let d = 0; d < depth; d++) {
            if (b.sea === 'east') this.set(W - 1 - d, y, TL.W);
            else if (b.sea === 'west') this.set(d, y, TL.W);
          }
        }
      }
      if (b.river) {
        let x = Math.floor(W * 0.55);
        for (let y = 0; y < H; y++) {
          x += Math.round((rng() - 0.5) * 2);
          x = clamp(x, 10, W - 10);
          for (let d = -1; d <= 1; d++) this.set(x + d, y, TL.W);
        }
      }
    }

    // Borda intransponível
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      if (x < 2 || y < 2 || x >= W - 2 || y >= H - 2) this.t[this.idx(x, y)] = b.urban ? TL.B : TL.O;
    }

    // Lugares
    for (const p of this.ch.places) {
      const r = p.r || 6;
      for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
        if (x * x + y * y <= r * r) {
          const tx = p.x + x, ty = p.y + y;
          if (tx < 2 || ty < 2 || tx >= W - 2 || ty >= H - 2) continue;
          this.set(tx, ty, (p.type === 'village' || p.type === 'city') ? TL.F : (b.urban ? TL.SIDE : TL.G));
        }
      }
      if (p.type === 'village' && !b.urban) {
        const n = 5;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2 + rng() * 0.5 + 0.3;
          const hx = Math.round(p.x + Math.cos(a) * (r - 1.5)) - 1;
          const hy = Math.round(p.y + Math.sin(a) * (r - 1.5)) - 1;
          for (let y = 0; y < 2; y++) for (let x = 0; x < 3; x++) this.set(hx + x, hy + y, TL.B);
        }
      }
      this.places[p.id] = Object.assign({}, p, { r, px: p.x * TILE + TILE / 2, py: p.y * TILE + TILE / 2 });
    }

    // Caminhos ligando os lugares em sequência + alguns atalhos
    const ps = this.ch.places;
    const links = [];
    for (let i = 0; i < ps.length - 1; i++) links.push([ps[i], ps[i + 1]]);
    for (let i = 0; i < ps.length - 2; i += 2) links.push([ps[i], ps[i + 2]]);
    for (const [a, c] of links) this.carvePath(a.x, a.y, c.x, c.y, rng);

    // Garante que o centro de cada lugar seja livre
    for (const p of ps) this.set(p.x, p.y, (p.type === 'village' || p.type === 'city') ? TL.F : (b.urban ? TL.SIDE : TL.G));

    this.computeReach();
  }

  carvePath(x0, y0, x1, y1, rng) {
    let x = x0, y = y0;
    let guard = 0;
    while ((x !== x1 || y !== y1) && guard++ < 4000) {
      const dx = Math.sign(x1 - x), dy = Math.sign(y1 - y);
      if (dx !== 0 && (dy === 0 || rng() < 0.5)) x += dx; else y += dy;
      if (rng() < 0.12) { const s = rng() < 0.5 ? 1 : -1; if (rng() < 0.5) x += s; else y += s; }
      x = clamp(x, 2, this.W - 3); y = clamp(y, 2, this.H - 3);
      for (let oy = 0; oy <= 1; oy++) for (let ox = 0; ox <= 1; ox++) {
        const tx = x + ox, ty = y + oy;
        if (tx < 2 || ty < 2 || tx >= this.W - 2 || ty >= this.H - 2) continue;
        const cur = this.get(tx, ty);
        if (cur === TL.W) this.set(tx, ty, TL.BR);
        else if (cur === TL.F || cur === TL.BR || cur === TL.ROAD) continue;
        else if (this.b.urban) this.set(tx, ty, TL.ROAD);
        else this.set(tx, ty, TL.P);
      }
    }
  }

  computeReach() {
    const { W, H } = this;
    this.reach = new Uint8Array(W * H);
    const s = this.ch.places[0];
    const q = [s.x + s.y * W];
    this.reach[q[0]] = 1;
    while (q.length) {
      const i = q.pop();
      const x = i % W, y = (i / W) | 0;
      const nb = [i - 1, i + 1, i - W, i + W];
      const ok = [x > 0, x < W - 1, y > 0, y < H - 1];
      for (let k = 0; k < 4; k++) {
        if (!ok[k]) continue;
        const j = nb[k];
        if (!this.reach[j] && WALKABLE[this.t[j]]) { this.reach[j] = 1; q.push(j); }
      }
    }
  }

  // Ponto aleatório alcançável dentro de um raio (em tiles) de um lugar
  randomSpot(px, py, rTiles, minR) {
    const cx = Math.floor(px / TILE), cy = Math.floor(py / TILE);
    for (let tries = 0; tries < 300; tries++) {
      const a = Math.random() * Math.PI * 2;
      const d = (minR || 0) + Math.random() * (rTiles - (minR || 0));
      const tx = Math.round(cx + Math.cos(a) * d), ty = Math.round(cy + Math.sin(a) * d);
      if (tx < 2 || ty < 2 || tx >= this.W - 2 || ty >= this.H - 2) continue;
      if (this.reach[this.idx(tx, ty)]) return { x: tx * TILE + TILE / 2, y: ty * TILE + TILE / 2 };
    }
    return { x: px, y: py };
  }

  randomReachableFar(rng, places, minDist) {
    for (let tries = 0; tries < 500; tries++) {
      const tx = 3 + Math.floor(rng() * (this.W - 6)), ty = 3 + Math.floor(rng() * (this.H - 6));
      if (!this.reach[this.idx(tx, ty)]) continue;
      let ok = true;
      for (const p of places) if (Math.hypot(p.x - tx, p.y - ty) < minDist) { ok = false; break; }
      if (ok) return { x: tx * TILE + TILE / 2, y: ty * TILE + TILE / 2 };
    }
    return null;
  }

  solidAt(px, py) {
    const tx = Math.floor(px / TILE), ty = Math.floor(py / TILE);
    return !WALKABLE[this.get(tx, ty)];
  }
  tallAt(px, py) {
    const tx = Math.floor(px / TILE), ty = Math.floor(py / TILE);
    if (tx < 0 || ty < 0 || tx >= this.W || ty >= this.H) return true;
    return TALL[this.get(tx, ty)];
  }
  collides(x, y, r) {
    return this.solidAt(x - r, y - r) || this.solidAt(x + r, y - r) ||
           this.solidAt(x - r, y + r) || this.solidAt(x + r, y + r);
  }

  // ---------- Renderização ----------
  chunk(cx, cy) {
    const key = cx + ',' + cy;
    let c = this.chunks.get(key);
    if (c) return c;
    const CS = 16;
    c = document.createElement('canvas');
    c.width = c.height = CS * TILE;
    const g = c.getContext('2d');
    for (let y = 0; y < CS; y++) for (let x = 0; x < CS; x++) {
      const tx = cx * CS + x, ty = cy * CS + y;
      if (tx >= this.W || ty >= this.H) continue;
      this.drawTile(g, tx, ty, x * TILE, y * TILE);
    }
    this.chunks.set(key, c);
    return c;
  }

  drawTile(g, tx, ty, X, Y) {
    const b = this.b;
    const v = this.get(tx, ty);
    const h = hash2(tx, ty);
    const ground = h < 0.5 ? b.ground : b.ground2;
    switch (v) {
      case TL.G:
      case TL.O:
        g.fillStyle = ground; g.fillRect(X, Y, TILE, TILE);
        if (h > 0.86) { g.fillStyle = shade(ground, 18); g.fillRect(X + (h * 97 % 24), Y + (h * 53 % 24), 3, 3); }
        if (h < 0.06 && b.flowers) { g.fillStyle = b.flowers; g.fillRect(X + 10, Y + 14, 3, 3); g.fillRect(X + 20, Y + 8, 3, 3); }
        if (v === TL.O) this.drawObstacle(g, b.obs[this.k[this.idx(tx, ty)] % b.obs.length], X, Y, h);
        break;
      case TL.P:
        g.fillStyle = h < 0.5 ? b.path : shade(b.path, -8); g.fillRect(X, Y, TILE, TILE);
        if (h > 0.7) { g.fillStyle = shade(b.path, -20); g.fillRect(X + (h * 71 % 26), Y + (h * 37 % 26), 4, 3); }
        break;
      case TL.W: {
        g.fillStyle = b.water; g.fillRect(X, Y, TILE, TILE);
        g.fillStyle = shade(b.water, 22);
        g.fillRect(X + (h * 40 % 18), Y + 8 + (h * 13 % 12), 10, 2);
        break;
      }
      case TL.BR:
        g.fillStyle = b.water; g.fillRect(X, Y, TILE, TILE);
        g.fillStyle = '#8a6a44'; g.fillRect(X, Y + 2, TILE, TILE - 4);
        g.fillStyle = '#6a4e30';
        for (let i = 0; i < 4; i++) g.fillRect(X + i * 8, Y + 2, 1, TILE - 4);
        break;
      case TL.F:
        g.fillStyle = h < 0.5 ? b.floor : shade(b.floor, -10); g.fillRect(X, Y, TILE, TILE);
        g.strokeStyle = shade(b.floor, -25); g.lineWidth = 1; g.strokeRect(X + 0.5, Y + 0.5, TILE - 1, TILE - 1);
        break;
      case TL.B: {
        const urban = b.urban;
        const base = urban ? (h < 0.33 ? b.wall : h < 0.66 ? shade(b.wall, 20) : shade(b.wall, -15)) : b.roof;
        g.fillStyle = base; g.fillRect(X, Y, TILE, TILE);
        if (urban) {
          g.fillStyle = 'rgba(160,200,230,0.55)';
          g.fillRect(X + 5, Y + 5, 8, 8); g.fillRect(X + 19, Y + 5, 8, 8);
          g.fillRect(X + 5, Y + 19, 8, 8); g.fillRect(X + 19, Y + 19, 8, 8);
        } else {
          g.fillStyle = shade(base, -25);
          for (let i = 0; i < 4; i++) g.fillRect(X, Y + i * 8 + 6, TILE, 2);
        }
        g.strokeStyle = shade(base, -40); g.strokeRect(X + 0.5, Y + 0.5, TILE - 1, TILE - 1);
        break;
      }
      case TL.ROAD:
        g.fillStyle = '#3a3a3e'; g.fillRect(X, Y, TILE, TILE);
        if ((tx % 16 === 1 && ty % 2 === 0) || (ty % 14 === 1 && tx % 2 === 0)) { g.fillStyle = '#d8d070'; g.fillRect(X + 14, Y + 14, 4, 4); }
        break;
      case TL.SIDE:
        g.fillStyle = h < 0.5 ? '#9a9890' : '#a4a29a'; g.fillRect(X, Y, TILE, TILE);
        g.strokeStyle = '#86847c'; g.strokeRect(X + 0.5, Y + 0.5, TILE - 1, TILE - 1);
        break;
    }
  }

  drawObstacle(g, kind, X, Y, h) {
    const cx = X + 16, cy = Y + 16;
    switch (kind) {
      case 'tree':
        g.fillStyle = 'rgba(0,0,0,0.2)'; g.beginPath(); g.ellipse(cx + 3, cy + 10, 14, 6, 0, 0, 7); g.fill();
        g.fillStyle = '#5a3a20'; g.fillRect(cx - 3, cy, 6, 12);
        g.fillStyle = h < 0.5 ? '#2f6a2a' : '#356f2c'; g.beginPath(); g.arc(cx, cy - 4, 15, 0, 7); g.fill();
        g.fillStyle = '#4a8a3a'; g.beginPath(); g.arc(cx - 5, cy - 9, 6, 0, 7); g.fill();
        break;
      case 'pine':
        g.fillStyle = 'rgba(0,0,0,0.2)'; g.beginPath(); g.ellipse(cx + 2, cy + 12, 11, 5, 0, 0, 7); g.fill();
        g.fillStyle = '#4a2e18'; g.fillRect(cx - 2, cy + 6, 4, 8);
        g.fillStyle = '#1f4a2a';
        for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(cx, cy - 16 + i * 8); g.lineTo(cx - 13 + i, cy + 2 + i * 4); g.lineTo(cx + 13 - i, cy + 2 + i * 4); g.fill(); }
        break;
      case 'rock':
        g.fillStyle = 'rgba(0,0,0,0.2)'; g.beginPath(); g.ellipse(cx + 2, cy + 10, 13, 5, 0, 0, 7); g.fill();
        g.fillStyle = h < 0.5 ? '#8a8580' : '#7a756e';
        g.beginPath(); g.moveTo(cx - 14, cy + 9); g.lineTo(cx - 9, cy - 9); g.lineTo(cx + 4, cy - 13); g.lineTo(cx + 14, cy - 2); g.lineTo(cx + 12, cy + 10); g.closePath(); g.fill();
        g.fillStyle = '#a5a09a'; g.beginPath(); g.moveTo(cx - 9, cy - 9); g.lineTo(cx + 4, cy - 13); g.lineTo(cx + 1, cy - 3); g.closePath(); g.fill();
        break;
      case 'bush':
        g.fillStyle = '#3d6a2a'; g.beginPath(); g.arc(cx - 6, cy + 3, 9, 0, 7); g.arc(cx + 6, cy + 3, 9, 0, 7); g.arc(cx, cy - 5, 9, 0, 7); g.fill();
        g.fillStyle = '#5a8a3a'; g.beginPath(); g.arc(cx - 3, cy - 6, 4, 0, 7); g.fill();
        break;
      case 'dry':
        g.fillStyle = '#8a7a3a'; g.beginPath(); g.arc(cx - 6, cy + 4, 8, 0, 7); g.arc(cx + 6, cy + 4, 8, 0, 7); g.arc(cx, cy - 3, 8, 0, 7); g.fill();
        g.fillStyle = '#a8984a'; g.beginPath(); g.arc(cx - 2, cy - 4, 3, 0, 7); g.fill();
        break;
      case 'olive':
        g.fillStyle = 'rgba(0,0,0,0.2)'; g.beginPath(); g.ellipse(cx + 2, cy + 10, 12, 5, 0, 0, 7); g.fill();
        g.fillStyle = '#5a4a3a'; g.fillRect(cx - 2, cy, 4, 11);
        g.fillStyle = '#7a8a5a'; g.beginPath(); g.arc(cx - 5, cy - 3, 9, 0, 7); g.arc(cx + 5, cy - 3, 9, 0, 7); g.arc(cx, cy - 9, 8, 0, 7); g.fill();
        break;
      case 'cypress':
        g.fillStyle = 'rgba(0,0,0,0.2)'; g.beginPath(); g.ellipse(cx + 2, cy + 12, 8, 4, 0, 0, 7); g.fill();
        g.fillStyle = '#1e4a26'; g.beginPath(); g.ellipse(cx, cy - 2, 7, 15, 0, 0, 7); g.fill();
        g.fillStyle = '#2e6a36'; g.beginPath(); g.ellipse(cx - 2, cy - 5, 3, 9, 0, 0, 7); g.fill();
        break;
      case 'rubble':
        g.fillStyle = '#6a625a'; g.fillRect(cx - 13, cy - 2, 12, 10); g.fillStyle = '#7f766a'; g.fillRect(cx - 2, cy - 9, 14, 12);
        g.fillStyle = '#58504a'; g.fillRect(cx + 2, cy + 4, 10, 7); g.fillStyle = '#4a3a2a'; g.fillRect(cx - 8, cy - 12, 3, 12);
        break;
      case 'column':
        g.fillStyle = 'rgba(0,0,0,0.2)'; g.fillRect(cx - 5, cy + 10, 14, 4);
        g.fillStyle = '#d8d0c0'; g.fillRect(cx - 6, cy - 14, 12, 26);
        g.fillStyle = '#b8b0a0'; g.fillRect(cx - 8, cy - 15, 16, 4); g.fillRect(cx - 8, cy + 10, 16, 3);
        g.fillStyle = '#c8c0b0'; g.fillRect(cx - 2, cy - 11, 2, 21);
        break;
      case 'palm':
        g.fillStyle = '#7a5a3a'; g.fillRect(cx - 2, cy - 4, 4, 18);
        g.strokeStyle = '#3a7a2a'; g.lineWidth = 4;
        for (let i = 0; i < 5; i++) { const a = i * 1.26 + h; g.beginPath(); g.moveTo(cx, cy - 6); g.quadraticCurveTo(cx + Math.cos(a) * 10, cy - 14, cx + Math.cos(a) * 15, cy - 4 + Math.sin(a) * 6); g.stroke(); }
        break;
      case 'snow':
        g.fillStyle = '#1f4a2a';
        for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(cx, cy - 16 + i * 8); g.lineTo(cx - 13 + i, cy + 2 + i * 4); g.lineTo(cx + 13 - i, cy + 2 + i * 4); g.fill(); }
        g.fillStyle = '#eef'; g.beginPath(); g.moveTo(cx, cy - 16); g.lineTo(cx - 6, cy - 8); g.lineTo(cx + 6, cy - 8); g.fill();
        break;
      case 'lamp':
        g.fillStyle = '#3a6a2a'; g.beginPath(); g.arc(cx, cy, 13, 0, 7); g.fill();
        g.fillStyle = '#4a8a3a'; g.beginPath(); g.arc(cx - 4, cy - 4, 6, 0, 7); g.fill();
        break;
      case 'car': {
        const col = ['#b02020', '#2050b0', '#e0e0e0', '#303030', '#e0b020'][Math.floor(h * 5)];
        g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(cx - 13, cy - 6, 28, 16);
        g.fillStyle = col; g.fillRect(cx - 14, cy - 8, 28, 15);
        g.fillStyle = 'rgba(160,200,230,0.8)'; g.fillRect(cx - 6, cy - 6, 12, 11);
        break;
      }
      default:
        g.fillStyle = '#555'; g.fillRect(cx - 10, cy - 10, 20, 20);
    }
  }

  draw(ctx, camX, camY, vw, vh) {
    const CSP = 16 * TILE;
    const x0 = Math.max(0, Math.floor(camX / CSP)), y0 = Math.max(0, Math.floor(camY / CSP));
    const x1 = Math.floor((camX + vw) / CSP), y1 = Math.floor((camY + vh) / CSP);
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, vw, vh);
    for (let cy = y0; cy <= y1; cy++) for (let cx = x0; cx <= x1; cx++) {
      if (cx * 16 >= this.W || cy * 16 >= this.H) continue;
      ctx.drawImage(this.chunk(cx, cy), Math.round(cx * CSP - camX), Math.round(cy * CSP - camY));
    }
  }

  minimap() {
    if (this._mini) return this._mini;
    const c = document.createElement('canvas');
    c.width = this.W; c.height = this.H;
    const g = c.getContext('2d');
    const img = g.createImageData(this.W, this.H);
    const col = (hex) => { const n = parseInt(hex.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
    const b = this.b;
    const pal = {
      [TL.G]: col(b.ground), [TL.P]: col(b.path), [TL.W]: col(b.water), [TL.O]: col(shade(b.ground, -45)),
      [TL.B]: col(b.urban ? shade(b.wall, -20) : b.roof), [TL.F]: col(b.floor), [TL.BR]: [138, 106, 68],
      [TL.ROAD]: [70, 70, 75], [TL.SIDE]: [150, 150, 145]
    };
    for (let i = 0; i < this.t.length; i++) {
      const p = pal[this.t[i]];
      img.data[i * 4] = p[0]; img.data[i * 4 + 1] = p[1]; img.data[i * 4 + 2] = p[2]; img.data[i * 4 + 3] = 255;
    }
    g.putImageData(img, 0, 0);
    this._mini = c;
    return c;
  }
}

// Marcos visuais desenhados no centro dos lugares
function drawLandmark(ctx, icon, x, y, t) {
  ctx.save();
  ctx.translate(x, y);
  const s = (c) => { ctx.fillStyle = c; };
  switch (icon) {
    case 'cave':
      s('#6a625a'); ctx.beginPath(); ctx.ellipse(0, -10, 56, 40, 0, Math.PI, 0); ctx.fill();
      s('#7a726a'); ctx.beginPath(); ctx.ellipse(-20, -30, 20, 14, 0, 0, 7); ctx.fill();
      s('#1a1410'); ctx.beginPath(); ctx.ellipse(0, -8, 22, 22, 0, Math.PI, 0); ctx.fill();
      break;
    case 'fire':
      s('#5a3a20'); ctx.fillRect(-14, 2, 28, 5);
      s('#ff9a2a'); ctx.beginPath(); ctx.moveTo(-10, 2); ctx.quadraticCurveTo(0, -24 - Math.sin(t * 9) * 4, 10, 2); ctx.fill();
      s('#ffe06a'); ctx.beginPath(); ctx.moveTo(-5, 2); ctx.quadraticCurveTo(0, -12 - Math.sin(t * 11) * 3, 5, 2); ctx.fill();
      break;
    case 'tent':
      s('#c8b088'); ctx.beginPath(); ctx.moveTo(-30, 10); ctx.lineTo(0, -30); ctx.lineTo(30, 10); ctx.fill();
      s('#5a4a30'); ctx.beginPath(); ctx.moveTo(-8, 10); ctx.lineTo(0, -8); ctx.lineTo(8, 10); ctx.fill();
      break;
    case 'dolmen':
      s('#8a8580'); ctx.fillRect(-28, -18, 10, 30); ctx.fillRect(18, -18, 10, 30); ctx.fillRect(-34, -28, 68, 12);
      break;
    case 'walls':
      s('#a89a7a'); ctx.fillRect(-60, -30, 120, 14);
      s('#8a7c5c'); for (let i = -60; i < 60; i += 16) ctx.fillRect(i, -40, 9, 10);
      break;
    case 'temple':
      s('#d8d0c0'); ctx.fillRect(-44, -10, 88, 8); ctx.fillRect(-44, -50, 88, 8);
      for (let i = -38; i <= 32; i += 14) ctx.fillRect(i, -42, 7, 32);
      s('#c8c0b0'); ctx.beginPath(); ctx.moveTo(-48, -50); ctx.lineTo(0, -72); ctx.lineTo(48, -50); ctx.fill();
      break;
    case 'aqueduct':
      s('#9a8a6a'); ctx.fillRect(-90, -60, 180, 14);
      for (let i = -90; i <= 74; i += 30) { ctx.fillRect(i, -46, 10, 56); ctx.fillRect(i + 20, -46, 10, 56); }
      s('rgba(0,0,0,0.25)'); for (let i = -80; i <= 70; i += 30) { ctx.beginPath(); ctx.arc(i + 15, -40, 10, Math.PI, 0); ctx.fill(); }
      break;
    case 'church':
      s('#c8b898'); ctx.fillRect(-30, -40, 60, 50);
      s('#a8442a'); ctx.beginPath(); ctx.moveTo(-34, -40); ctx.lineTo(0, -62); ctx.lineTo(34, -40); ctx.fill();
      s('#c8b898'); ctx.fillRect(-8, -90, 16, 30);
      s('#5a4a3a'); ctx.fillRect(-7, -10, 14, 20); ctx.fillRect(-1, -108, 2, 18); ctx.fillRect(-6, -102, 12, 2);
      break;
    case 'castle':
      s('#a8987a'); ctx.fillRect(-50, -50, 100, 60);
      s('#98886a'); ctx.fillRect(-60, -70, 24, 80); ctx.fillRect(36, -70, 24, 80);
      for (let i = -60; i < 60; i += 12) ctx.fillRect(i, -58, 7, 8);
      s('#3a2a1a'); ctx.beginPath(); ctx.arc(0, 10, 12, Math.PI, 0); ctx.fill();
      s('#c02020'); ctx.fillRect(46, -96, 14, 9); s('#5a4a3a'); ctx.fillRect(45, -96, 2, 26);
      break;
    case 'mosque':
      s('#e8dcc0'); ctx.fillRect(-46, -36, 92, 46);
      s('#d8ccb0'); for (let i = -40; i < 40; i += 16) { ctx.beginPath(); ctx.arc(i + 8, -10, 6, Math.PI, 0); ctx.fill(); }
      s('#c03a2a'); for (let i = -40; i < 40; i += 16) { ctx.fillRect(i + 2, -10, 12, 2); }
      s('#e8dcc0'); ctx.fillRect(50, -90, 18, 100);
      s('#b8ac90'); ctx.fillRect(48, -94, 22, 6);
      break;
    case 'palace':
      s('#d8c8a8'); ctx.fillRect(-70, -50, 140, 60);
      s('#c0b090'); for (let i = -64; i < 64; i += 16) ctx.fillRect(i, -40, 8, 14);
      s('#5a7a9a'); ctx.beginPath(); ctx.arc(0, -50, 22, Math.PI, 0); ctx.fill();
      s('#b02020'); ctx.fillRect(-3, -90, 2, 20); s('#e0b020'); ctx.fillRect(-1, -90, 14, 9);
      break;
    case 'ship':
      s('#6a4a2a'); ctx.beginPath(); ctx.moveTo(-60, -10); ctx.lineTo(60, -10); ctx.lineTo(44, 14); ctx.lineTo(-44, 14); ctx.fill();
      s('#4a3a2a'); ctx.fillRect(-2, -80, 4, 70);
      s('#eee'); ctx.fillRect(-28, -74, 56, 30); ctx.fillRect(-22, -40, 44, 24);
      s('#c02020'); ctx.fillRect(-10, -66, 20, 8);
      break;
    case 'museum':
      s('#d8d0c0'); ctx.fillRect(-80, -46, 160, 56);
      s('#c0b8a8'); for (let i = -70; i <= 62; i += 18) ctx.fillRect(i, -38, 8, 44);
      s('#b8b0a0'); ctx.beginPath(); ctx.moveTo(-30, -46); ctx.lineTo(0, -66); ctx.lineTo(30, -46); ctx.fill();
      break;
    case 'parliament':
      s('#d8d0c0'); ctx.fillRect(-80, -46, 160, 56);
      s('#e8e0d0'); for (let i = -40; i <= 32; i += 14) ctx.fillRect(i, -40, 7, 46);
      s('#c8c0b0'); ctx.beginPath(); ctx.moveTo(-46, -46); ctx.lineTo(0, -70); ctx.lineTo(46, -46); ctx.fill();
      s('#7a6a5a'); ctx.fillRect(-64, 0, 14, 10); ctx.fillRect(50, 0, 14, 10);
      break;
    case 'tower':
      s('#8a8a8a'); ctx.fillRect(-16, -110, 32, 120);
      s('rgba(160,200,230,0.7)'); for (let y = -100; y < 0; y += 14) { ctx.fillRect(-11, y, 8, 8); ctx.fillRect(3, y, 8, 8); }
      break;
    case 'station':
      s('#a85a3a'); ctx.fillRect(-70, -40, 140, 50);
      s('#6a7a8a'); ctx.beginPath(); ctx.arc(0, -40, 40, Math.PI, 0); ctx.fill();
      s('#fff'); ctx.beginPath(); ctx.arc(0, -52, 9, 0, 7); ctx.fill(); s('#222'); ctx.fillRect(-1, -58, 2, 6); ctx.fillRect(-1, -53, 6, 2);
      break;
    case 'stadium':
      s('#c8c8c8'); ctx.beginPath(); ctx.ellipse(0, -20, 80, 40, 0, 0, 7); ctx.fill();
      s('#3a8a3a'); ctx.beginPath(); ctx.ellipse(0, -20, 56, 24, 0, 0, 7); ctx.fill();
      s('#fff'); ctx.fillRect(-1, -44, 2, 48);
      break;
    case 'volcano':
      s('#4a3a32'); ctx.beginPath(); ctx.moveTo(-80, 10); ctx.lineTo(-20, -70); ctx.lineTo(20, -70); ctx.lineTo(80, 10); ctx.fill();
      s('#ff6a1a'); ctx.beginPath(); ctx.moveTo(-14, -70); ctx.lineTo(0, -90 - Math.sin(t * 5) * 6); ctx.lineTo(14, -70); ctx.fill();
      s('#ff8a2a'); ctx.fillRect(-4, -70, 8, 50);
      break;
    case 'windmill':
      s('#eee'); ctx.beginPath(); ctx.moveTo(-16, 10); ctx.lineTo(-12, -50); ctx.lineTo(12, -50); ctx.lineTo(16, 10); ctx.fill();
      s('#5a3a2a'); ctx.beginPath(); ctx.moveTo(-14, -50); ctx.lineTo(0, -64); ctx.lineTo(14, -50); ctx.fill();
      ctx.save(); ctx.translate(0, -50); ctx.rotate(t * 0.8); s('#8a6a4a');
      for (let i = 0; i < 4; i++) { ctx.rotate(Math.PI / 2); ctx.fillRect(-3, 0, 6, 46); }
      ctx.restore();
      break;
    case 'statue':
      s('#9a9a9a'); ctx.fillRect(-14, -10, 28, 20);
      s('#b8b8b8'); ctx.fillRect(-6, -50, 12, 40); ctx.beginPath(); ctx.arc(0, -56, 7, 0, 7); ctx.fill();
      break;
    case 'factory':
      s('#7a4a3a'); ctx.fillRect(-60, -40, 120, 50);
      s('#5a3a2a'); ctx.fillRect(30, -100, 16, 60);
      s('rgba(120,120,120,0.5)'); ctx.beginPath(); ctx.arc(40 + Math.sin(t) * 4, -112, 12, 0, 7); ctx.arc(50, -128, 10, 0, 7); ctx.fill();
      break;
    case 'tree':
      s('#5a3a20'); ctx.fillRect(-8, -30, 16, 40);
      s('#2f6a2a'); ctx.beginPath(); ctx.arc(0, -50, 40, 0, 7); ctx.fill();
      break;
  }
  ctx.restore();
}
