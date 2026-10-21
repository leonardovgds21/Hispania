// Controles de toque para celular e tablet: setas (direcional) à esquerda,
// botões de ação à direita e toque na tela para mirar/atacar/interagir.
// Usa Pointer Events, que tratam dedo, mouse e caneta da mesma forma.
'use strict';

// Seta em pixel-art (aponta para cima; as outras direções são a mesma seta girada pelo CSS)
const ARROW_SVG = '<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">' +
  '<path d="M7 1h2v1h1v1h1v1h1v1h1v1h1v2h-3v7H5V8H2V6h1V5h1V4h1V3h1V2h1z" fill="#49bfa4" stroke="#0b0b0b" stroke-width="1"/>' +
  '<path d="M5.5 12.5h5v2h-5z" fill="#2c6e62"/>' +
  '<path d="M7 2.5h1v10H7z" fill="#8fe3cf" opacity=".75"/>' +
  '</svg>';

// Garante que o fim do toque chegue ao mesmo elemento, mesmo se o dedo sair dele
function capture(el, id) { try { el.setPointerCapture(id); } catch (e) { /* ponteiro já liberado */ } }

const Touch = {
  // preferência do jogador: 'auto' (detecta o aparelho), 'on' (sempre) ou 'off' (nunca)
  pref: (() => { try { return localStorage.getItem('hispania_touch') || 'auto'; } catch (e) { return 'auto'; } })(),
  detected: !!(window.matchMedia && (matchMedia('(pointer: coarse)').matches || matchMedia('(hover: none)').matches)),
  on: false,
  lastTouch: 0,   // horário do último toque (para ignorar os "cliques de mouse" falsos que o navegador gera depois)
  aimId: null,    // dedo que está mirando/atacando na tela
  padId: null,    // dedo que está no direcional

  init() {
    const root = $('touch');
    root.innerHTML = `
      <div id="dpad">
        <div class="arw up" data-dir="up">${ARROW_SVG}</div>
        <div class="arw left" data-dir="left">${ARROW_SVG}</div>
        <div class="arw right" data-dir="right">${ARROW_SVG}</div>
        <div class="arw down" data-dir="down">${ARROW_SVG}</div>
      </div>
      <div id="actions">
        <button class="act big" data-act="attack">⚔<small>${T('actAttack')}</small></button>
        <button class="act" data-act="use">✋<small>${T('actUse')}</small></button>
        <button class="act" data-act="dash">💨<small>${T('actDash')}</small></button>
        <button class="act" data-act="potion">🧪<small id="act-pot">${T('actPotion')}</small></button>
        <button class="act" data-act="reload">🔄<small>${T('actReload')}</small></button>
      </div>`;
    this.bindPad($('dpad'));
    root.querySelectorAll('.act').forEach(b => this.bindAction(b));
    this.bindCanvas();
    $('menu-btn').onclick = () => { Sfx.init(); if (G.running && !G.ui) UI.pause(); };
    // aparelhos híbridos (notebook com tela de toque): liga os controles no primeiro toque real
    window.addEventListener('touchstart', () => {
      this.lastTouch = Date.now();
      if (!this.detected) { this.detected = true; this.apply(); }
    }, { passive: true });
    this.apply();
  },

  apply() {
    this.on = this.pref === 'on' || (this.pref === 'auto' && this.detected);
    document.body.classList.toggle('touch', this.on);
    $('touch').classList.toggle('hidden', !this.on);
    if (!this.on) this.releaseAll();
  },

  cyclePref() {
    this.pref = { auto: 'on', on: 'off', off: 'auto' }[this.pref] || 'auto';
    try { localStorage.setItem('hispania_touch', this.pref); } catch (e) { /* sem armazenamento */ }
    this.apply();
  },
  prefLabel() { return T(this.pref === 'auto' ? 'auto' : this.pref === 'on' ? 'touchOn' : 'touchOff'); },

  releaseAll() {
    G.keys.TouchUp = G.keys.TouchDown = G.keys.TouchLeft = G.keys.TouchRight = false;
    G.touchAttack = false;
    G.mouse.down = false;
    this.aimId = this.padId = null;
    document.querySelectorAll('#dpad .arw.on, #actions .act.on').forEach(el => el.classList.remove('on'));
  },

  // ---------- Direcional: o dedo pode deslizar entre as setas, inclusive nas diagonais ----------
  bindPad(pad) {
    const setDir = (e) => {
      const r = pad.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const m = Math.max(Math.abs(dx), Math.abs(dy));
      const dead = m < r.width * 0.1;
      const dir = {
        left: !dead && dx < 0 && Math.abs(dx) > m * 0.45,
        right: !dead && dx > 0 && Math.abs(dx) > m * 0.45,
        up: !dead && dy < 0 && Math.abs(dy) > m * 0.45,
        down: !dead && dy > 0 && Math.abs(dy) > m * 0.45
      };
      G.keys.TouchLeft = dir.left; G.keys.TouchRight = dir.right; G.keys.TouchUp = dir.up; G.keys.TouchDown = dir.down;
      pad.querySelectorAll('.arw').forEach(a => a.classList.toggle('on', dir[a.dataset.dir]));
    };
    const end = (e) => {
      if (e.pointerId !== this.padId) return;
      this.padId = null;
      G.keys.TouchLeft = G.keys.TouchRight = G.keys.TouchUp = G.keys.TouchDown = false;
      pad.querySelectorAll('.arw').forEach(a => a.classList.remove('on'));
    };
    pad.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      Sfx.init();
      this.padId = e.pointerId;
      capture(pad, e.pointerId);
      setDir(e);
    });
    pad.addEventListener('pointermove', (e) => { if (e.pointerId === this.padId) setDir(e); });
    pad.addEventListener('pointerup', end);
    pad.addEventListener('pointercancel', end);
  },

  // ---------- Botões de ação ----------
  bindAction(btn) {
    const act = btn.dataset.act;
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      Sfx.init();
      capture(btn, e.pointerId);
      btn.classList.add('on');
      if (!G.running || G.ui) return;
      switch (act) {
        case 'attack': G.touchAttack = true; playerAttack(); break;   // segurar = atacar sem parar
        case 'use': interact(nearestInteractable()); break;
        case 'dash': doDash(); break;
        case 'potion': usePotion(); break;
        case 'reload': startReload(); break;
      }
    });
    const up = () => { btn.classList.remove('on'); if (act === 'attack') G.touchAttack = false; };
    btn.addEventListener('pointerup', up);
    btn.addEventListener('pointercancel', up);
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
  },

  // ---------- Tocar no mundo: falar/usar se tocar numa pessoa ou objeto próximo; senão, atacar naquela direção ----------
  bindCanvas() {
    canvas.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') return;   // mouse continua usando os eventos de mouse do game.js
      e.preventDefault();
      this.lastTouch = Date.now();
      Sfx.init();
      if (!this.on && this.pref === 'auto') { this.detected = true; this.apply(); }
      if (!G.running || G.ui) return;
      G.mouse.x = e.clientX; G.mouse.y = e.clientY;
      const o = objectAt(e.clientX + G.cam.x, e.clientY + G.cam.y, 48);
      if (o && dist(G.player.x, G.player.y, o.x, o.y) < INTERACT_RANGE) { interact(o); return; }
      this.aimId = e.pointerId;
      capture(canvas, e.pointerId);
      G.mouse.down = true;
      G.player.aim = Math.atan2(G.mouse.y + G.cam.y - (G.player.y - 6), G.mouse.x + G.cam.x - G.player.x);
      playerAttack();
    });
    canvas.addEventListener('pointermove', (e) => {
      if (e.pointerId !== this.aimId) return;
      G.mouse.x = e.clientX; G.mouse.y = e.clientY;
    });
    const end = (e) => { if (e.pointerId === this.aimId) { this.aimId = null; G.mouse.down = false; } };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
  },

  // Atualiza estados visuais dos botões (chamado pelo HUD, 10 vezes por segundo)
  update() {
    if (!this.on || !G.running) return;
    const near = nearestInteractable();
    const use = document.querySelector('#actions [data-act="use"]');
    if (use) use.classList.toggle('ready', !!near);
    const reload = document.querySelector('#actions [data-act="reload"]');
    if (reload) reload.classList.toggle('hidden', weapon().kind !== 'gun');
    const pot = $('act-pot');
    if (pot) pot.textContent = `${T('actPotion')} ${G.S.potions}`;
  }
};
