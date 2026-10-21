// Interface em HTML: HUD, diálogos, quiz, narração, loja, diário, crônicas, mapa e menus.
'use strict';

const $ = (id) => document.getElementById(id);

const UI = {
  dlg: null,
  modalClose: null,

  // ---------- HUD ----------
  hud(force) {
    if (!G.S || !G.ch) return;
    const S = G.S, cls = CLASSES[G.ch.cls], w = weapon();
    $('h-name').textContent = S.name;
    $('h-class').textContent = cls.name + ' · ' + T('lvl') + ' ' + S.level;
    const mh = maxHp();
    $('h-hp').style.width = (100 * S.hp / mh) + '%';
    $('h-hpt').textContent = `${Math.ceil(S.hp)} / ${mh}`;
    const need = xpNeed(S.level);
    $('h-xp').style.width = (100 * S.xp / need) + '%';
    $('h-xpt').textContent = `XP ${S.xp} / ${need}`;
    $('h-gold').textContent = `💰 ${S.gold} ${G.ch.currency}`;
    $('h-pot').textContent = `🧪 ${S.potions}${Touch.on ? '' : ' [Q]'}`;
    let ammo = w.name;
    if (w.kind === 'gun') ammo += G.player.reloadT > 0 ? ' · ' + T('reloading') : ` · ${G.player.ammo}/${w.mag}${Touch.on ? '' : ' [R]'}`;
    $('h-ammo').textContent = '⚔ ' + ammo;
    $('h-chapter').textContent = T('chapterHud', G.chIdx + 1, CHAPTERS.length, G.ch.title, G.ch.years);
    if (force || !this._trT || G.time - this._trT > 0.5) {
      this._trT = G.time;
      Touch.update();
      let html = '';
      for (const quest of G.ch.quests) {
        const q = qState(quest.id);
        if (q.done) continue;
        if (quest.id !== 'main' && q.step === 0) continue;
        const s = curStep(quest);
        if (!s) continue;
        let prog = '';
        if (s.t === 'kill' || s.t === 'collect') prog = ` <b>${q.prog}/${s.n}</b>`;
        html += `<div class="tq ${quest.id === 'main' ? 'main' : ''}"><div class="tt">${quest.id === 'main' ? '★' : '◆'} ${escapeHtml(quest.title)}</div><div>${escapeHtml(s.desc)}${prog}</div></div>`;
      }
      if (qState('main').done) html = `<div class="tq main"><div class="tt">${T('chapterDone')}</div><div>${canAdvanceHere() && guideNpc() ? T('chapterDoneTxt', escapeHtml(guideNpc().name)) : T('chapterDoneLast')}</div></div>` + html;
      $('tracker').innerHTML = html;
    }
  },

  toast(msg, kind) {
    const el = document.createElement('div');
    el.className = 'toast ' + (kind || '');
    el.textContent = msg;
    $('toasts').appendChild(el);
    const box = $('toasts');
    while (box.children.length > 5) box.removeChild(box.firstChild);
    setTimeout(() => el.classList.add('out'), kind === 'prog' ? 1400 : 3200);
    setTimeout(() => el.remove(), kind === 'prog' ? 1900 : 3800);
  },

  // ---------- Diálogo ----------
  speaker(who) {
    if (who === 'N') return { name: T('narrator'), cls: 'narr' };
    if (who === 'H') return { name: G.S.name, cls: 'hero' };
    const n = G.ch && G.ch.npcs.find(n => n.id === who);
    return { name: n ? n.name : who, cls: '' };
  },

  dialog(lines, cb) {
    if (!lines || !lines.length) { if (cb) cb(); return; }
    G.ui = 'dialog';
    G.mouse.down = false;
    this.dlg = { lines: lines.map(l => typeof l === 'string' ? ['N', l] : l), i: 0, cb, t: performance.now() };
    this.showLine();
    $('dialog').classList.remove('hidden');
  },
  showLine() {
    const d = this.dlg;
    const [who, text] = d.lines[d.i];
    const sp = this.speaker(who);
    const el = $('dialog');
    el.className = sp.cls;
    el.querySelector('.who').textContent = sp.name;
    el.querySelector('.text').textContent = fmt(text);
    el.querySelector('.opts').innerHTML = '';
    el.querySelector('.hint').textContent = d.i < d.lines.length - 1 ? T('next') : T('end');
  },
  nextLine() {
    const d = this.dlg;
    if (!d || d.quiz) return;
    if (performance.now() - d.t < 180) return;
    d.t = performance.now();
    Sfx.play('click');
    d.i++;
    if (d.i >= d.lines.length) {
      $('dialog').classList.add('hidden');
      this.dlg = null;
      G.ui = null;
      if (d.cb) d.cb();
    } else this.showLine();
  },

  quiz(name, question, options, cb) {
    G.ui = 'dialog';
    this.dlg = { quiz: true, t: performance.now() };
    const el = $('dialog');
    el.className = 'quiz';
    el.querySelector('.who').textContent = name;
    el.querySelector('.text').textContent = question;
    const opts = el.querySelector('.opts');
    opts.innerHTML = '';
    options.forEach((o, i) => {
      const b = document.createElement('button');
      b.textContent = `${i + 1}. ${o}`;
      b.onclick = () => this.answer(i);
      opts.appendChild(b);
    });
    el.querySelector('.hint').textContent = T('quizHint', options.length);
    el.classList.remove('hidden');
    this._quizCb = cb;
    this._quizN = options.length;
  },
  answer(i) {
    if (!this.dlg || !this.dlg.quiz) return;
    $('dialog').classList.add('hidden');
    this.dlg = null; G.ui = null;
    const cb = this._quizCb; this._quizCb = null;
    if (cb) cb(i);
  },

  // ---------- Modais ----------
  modal(html, cls, onClose) {
    G.ui = 'modal';
    G.mouse.down = false;
    const m = $('modal');
    m.className = cls || '';
    m.querySelector('.box').innerHTML = html;
    m.classList.remove('hidden');
    this.modalClose = onClose || null;
    return m.querySelector('.box');
  },
  closeModal() {
    $('modal').classList.add('hidden');
    G.ui = null;
    const cb = this.modalClose; this.modalClose = null;
    if (cb) cb();
  },

  narration(title, pages, cb, subtitle) {
    let i = 0;
    const show = () => {
      const box = this.modal(`
        <div class="narr-title">${escapeHtml(title)}</div>
        ${subtitle ? `<div class="narr-sub">${escapeHtml(subtitle)}</div>` : ''}
        <div class="narr-text">${escapeHtml(fmt(pages[i]))}</div>
        <div class="narr-foot"><span>${i + 1} / ${pages.length}</span><button id="nx">${i < pages.length - 1 ? T('cont') : T('start')}</button></div>`, 'narration');
      box.querySelector('#nx').onclick = () => next();
      this._narrNext = next;
    };
    const next = () => {
      Sfx.play('click');
      i++;
      if (i >= pages.length) { this._narrNext = null; this.modalClose = null; this.closeModal(); if (cb) cb(); }
      else show();
    };
    show();
  },

  evolution(from, to, ch, cb) {
    Sfx.play('level');
    const box = this.modal(`
      <div class="narr-title">${T('evoTitle')}</div>
      <div class="evo">
        <canvas id="evo-a" width="120" height="120"></canvas>
        <div class="evo-arrow">➜</div>
        <canvas id="evo-b" width="120" height="120"></canvas>
      </div>
      <div class="evo-names"><span>${escapeHtml(from.name)}</span><span>${escapeHtml(to.name)}</span></div>
      <p class="center">${T('newWeapon')} <b>${escapeHtml(WEAPONS[to.weapon].name)}</b></p>
      <p class="center dim">${T('nextChapter')} ${escapeHtml(ch.title)} (${escapeHtml(ch.years)})</p>
      <div class="center"><button id="evo-go">${T('follow')}</button></div>`, 'narration');
    const paint = (id, cls) => {
      const c = box.querySelector(id).getContext('2d');
      const w = WEAPONS[cls.weapon];
      drawHuman(c, 60, 80, Object.assign({}, cls.look, { weapon: w.draw, weaponColor: w.color, shield: w.shield }), -0.3, 0, { scale: 2.2 });
    };
    paint('#evo-a', from); paint('#evo-b', to);
    box.querySelector('#evo-go').onclick = () => { this.modalClose = null; this.closeModal(); cb(); };
  },

  codexFound(def) {
    const box = this.modal(`
      <div class="scroll">
        <div class="narr-sub">${T('codexFound')}</div>
        <h2>${escapeHtml(def.title)}</h2>
        <p>${escapeHtml(def.text)}</p>
        <div class="center"><button id="cx-ok">${T('codexKeep')}</button></div>
      </div>`, 'codex-found');
    box.querySelector('#cx-ok').onclick = () => this.closeModal();
  },

  shop(npc) {
    const m = G.mult, S = G.S, cur = G.ch.currency;
    const items = [
      { id: 'pot', name: T('shopPot'), desc: T('shopPotD'), price: Math.round(12 * m) },
      { id: 'pot5', name: T('shopPot5'), desc: T('shopPot5D'), price: Math.round(48 * m) },
      { id: 'sharp', name: T('shopSharp', S.sharp + 1), desc: T('shopSharpD'), price: Math.round(45 * m * (1 + S.sharp * 0.6)) },
      { id: 'armor', name: T('shopArmor', S.armor + 1), desc: T('shopArmorD'), price: Math.round(45 * m * (1 + S.armor * 0.6)), max: S.armor >= 8 }
    ];
    const box = this.modal(`
      <h2>${escapeHtml(npc.name)}</h2>
      <p class="dim">${T('youHave')} <b>${S.gold} ${escapeHtml(cur)}</b> · ${S.potions} ${T('potions')} · ${T('weapon')} +${S.sharp} · ${T('armor')} +${S.armor}</p>
      <div class="shop">${items.map(it => `
        <div class="shop-it"><div><b>${escapeHtml(it.name)}</b><div class="dim">${escapeHtml(it.desc)}</div></div>
        <button data-id="${it.id}" ${it.max || S.gold < it.price ? 'disabled' : ''}>${it.max ? T('max') : it.price + ' ' + escapeHtml(cur)}</button></div>`).join('')}
      </div>
      <div class="center"><button id="sh-x">${T('leave')}</button></div>`, 'shop-modal');
    box.querySelectorAll('button[data-id]').forEach(b => b.onclick = () => {
      const it = items.find(i => i.id === b.dataset.id);
      if (S.gold < it.price || it.max) return;
      S.gold -= it.price;
      if (it.id === 'pot') S.potions++;
      if (it.id === 'pot5') S.potions += 5;
      if (it.id === 'sharp') S.sharp++;
      if (it.id === 'armor') S.armor++;
      Sfx.play('coin');
      save();
      this.shop(npc);
    });
    box.querySelector('#sh-x').onclick = () => this.closeModal();
  },

  journal() {
    let html = `<h2>${T('journal')}</h2><p class="dim">${T('chapter')} ${G.chIdx + 1}: ${escapeHtml(G.ch.title)} (${escapeHtml(G.ch.years)})</p>`;
    for (const quest of G.ch.quests) {
      const q = qState(quest.id);
      const isMain = quest.id === 'main';
      let body = '';
      if (q.done) body = `<div class="ok">${T('completed')}</div>`;
      else if (!isMain && quest.req && mainStep() < quest.req) body = `<div class="dim">${T('locked')}</div>`;
      else if (!isMain && q.step === 0) {
        const giver = G.ch.npcs.find(n => n.id === quest.steps[0].npc);
        const place = giver && G.ch.places.find(p => p.id === giver.at);
        body = `<div class="dim">${T('available', escapeHtml(giver ? giver.name : '?'), place ? T('inPlace', escapeHtml(place.name)) : '')}</div>`;
      } else {
        body = quest.steps.map((s, i) => {
          if (i < q.step) return `<div class="ok">✓ ${escapeHtml(s.desc)}</div>`;
          if (i === q.step) return `<div class="cur">▸ ${escapeHtml(s.desc)}${s.t === 'kill' || s.t === 'collect' ? ` (${q.prog}/${s.n})` : ''}</div>`;
          return '';
        }).join('');
      }
      html += `<div class="jq ${isMain ? 'main' : ''}"><div class="tt">${isMain ? '★' : '◆'} ${escapeHtml(quest.title)}</div>${body}</div>`;
    }
    const cs = chState(G.ch.id);
    html += `<p class="dim">${T('chronCount', Object.keys(cs.codex).length, G.ch.codex.length, Object.keys(cs.chests).length)}</p>`;
    html += `<div class="center"><button id="j-x">${T('closeJ')}</button></div>`;
    const box = this.modal(html, 'journal');
    box.querySelector('#j-x').onclick = () => this.closeModal();
  },

  codex(sel) {
    const max = G.S.maxChapter;
    let total = 0, found = 0;
    for (let i = 0; i < CHAPTERS.length; i++) {
      total += CHAPTERS[i].codex.length;
      const cs = G.S.ch[CHAPTERS[i].id];
      if (cs) found += Object.keys(cs.codex).length;
    }
    const ci = sel != null ? sel : G.chIdx;
    const ch = CHAPTERS[ci];
    const cs = G.S.ch[ch.id] || { codex: {} };
    let tabs = '';
    for (let i = 0; i <= max; i++) tabs += `<button class="tab ${i === ci ? 'on' : ''}" data-i="${i}">${i + 1}</button>`;
    let list = '';
    for (const c of ch.codex) {
      const place = ch.places.find(p => p.id === c.at);
      if (cs.codex[c.id]) list += `<details><summary>📜 ${escapeHtml(c.title)}</summary><p>${escapeHtml(c.text)}</p></details>`;
      else list += `<div class="locked">🔒 ??? <span class="dim">${T('lookNear', escapeHtml(place ? place.name : '?'))}</span></div>`;
    }
    const box = this.modal(`
      <h2>${T('chronicles')}</h2>
      <p class="dim">${T('found', found, total)}</p>
      <div class="tabs">${tabs}</div>
      <h3>${escapeHtml(ch.title)} <span class="dim">(${escapeHtml(ch.years)})</span></h3>
      <div class="codex-list">${list}</div>
      <div class="center"><button id="c-x">${T('closeC')}</button></div>`, 'journal');
    box.querySelectorAll('.tab').forEach(b => b.onclick = () => this.codex(+b.dataset.i));
    box.querySelector('#c-x').onclick = () => this.closeModal();
  },

  map() {
    const box = this.modal(`<h2>${escapeHtml(G.ch.title)}</h2><canvas id="bigmap"></canvas><p class="dim center">${T('mapLegend')}</p>`, 'mapmodal');
    const c = box.querySelector('#bigmap');
    const W = G.world.W, H = G.world.H;
    const s = Math.min((window.innerWidth * 0.86) / W, (window.innerHeight * 0.7) / H);
    c.width = Math.floor(W * s); c.height = Math.floor(H * s);
    const g = c.getContext('2d');
    g.imageSmoothingEnabled = false;
    g.drawImage(G.world.minimap(), 0, 0, c.width, c.height);
    const k = s / TILE;
    g.textAlign = 'center'; g.font = 'bold 13px Georgia, serif';
    for (const pl of G.ch.places) {
      const wp = G.world.places[pl.id];
      g.fillStyle = pl.type === 'arena' ? '#e33' : pl.type === 'camp' ? '#e93' : '#fff';
      g.beginPath(); g.arc(wp.px * k, wp.py * k, 5, 0, 7); g.fill();
      g.strokeStyle = '#000'; g.lineWidth = 3; g.strokeText(pl.name, wp.px * k, wp.py * k - 10);
      g.fillStyle = '#fff'; g.fillText(pl.name, wp.px * k, wp.py * k - 10);
    }
    for (const quest of G.ch.quests) {
      if (!questActive(quest) || (quest.id !== 'main' && qState(quest.id).step === 0)) continue;
      const t = questTarget(quest);
      if (!t) continue;
      g.font = 'bold 18px sans-serif';
      g.fillStyle = quest.id === 'main' ? '#ffd84a' : '#9ad0ff';
      g.strokeStyle = '#000'; g.lineWidth = 3;
      g.strokeText('★', t.x * k, t.y * k + 6); g.fillText('★', t.x * k, t.y * k + 6);
    }
    g.fillStyle = '#3cf'; g.strokeStyle = '#000'; g.lineWidth = 2;
    g.beginPath(); g.arc(G.player.x * k, G.player.y * k, 6, 0, 7); g.fill(); g.stroke();
  },

  langButtons() {
    return `<div class="langsel"><button class="lang ${LANG === 'pt' ? 'on' : ''}" data-lang="pt">Português (Brasil)</button><button class="lang ${LANG === 'es' ? 'on' : ''}" data-lang="es">Español (España)</button></div>`;
  },
  bindLang(root, beforeReload) {
    root.querySelectorAll('button.lang').forEach(b => b.onclick = () => {
      if (b.dataset.lang === LANG) return;
      if (beforeReload && !confirm(T('langConfirm'))) return;
      if (beforeReload) beforeReload();
      setLang(b.dataset.lang);
    });
  },

  pause() {
    const S = G.S;
    let chs = '';
    for (let i = 0; i <= S.maxChapter && i < CHAPTERS.length; i++) {
      const done = G.S.ch[CHAPTERS[i].id] && G.S.ch[CHAPTERS[i].id].done;
      chs += `<button class="chbtn ${i === G.chIdx ? 'on' : ''}" data-i="${i}">${i + 1}. ${escapeHtml(CHAPTERS[i].title)} ${done ? '✓' : ''}</button>`;
    }
    const t = Math.floor(S.stats.time);
    const box = this.modal(`
      <h2>${T('pause')}</h2>
      <p class="dim">${T('playtime', Math.floor(t / 3600), Math.floor(t / 60) % 60, S.stats.kills, S.stats.quests, S.stats.deaths)}</p>
      <div class="menu">
        <button id="p-go">${T('resume')}</button>
        <button id="p-j">${T('journalBtn')}</button>
        <button id="p-c">${T('codexBtn')}</button>
        <button id="p-m">${T('mapBtn')}</button>
        <button id="p-snd">${T('sound', Sfx.enabled ? T('on') : T('off'))}</button>
        <button id="p-mus">${T('music', Music.enabled ? T('on2') : T('off2'))}</button>
        <button id="p-touch">${T('touchCtl', Touch.prefLabel())}</button>
        ${document.documentElement.requestFullscreen ? `<button id="p-full">${T(document.fullscreenElement ? 'exitFullscreen' : 'fullscreen')}</button>` : ''}
        <button id="p-exp">${T('export')}</button>
        <button id="p-help">${T('help')}</button>
        <button id="p-title">${T('toTitle')}</button>
      </div>
      <h3>${T('language')}</h3>
      ${this.langButtons()}
      <h3>${T('unlocked')}</h3>
      <p class="dim">${T('unlockedTxt')}</p>
      <div class="chlist">${chs}</div>`, 'journal');
    box.querySelector('#p-go').onclick = () => this.closeModal();
    box.querySelector('#p-j').onclick = () => this.journal();
    box.querySelector('#p-c').onclick = () => this.codex();
    box.querySelector('#p-m').onclick = () => this.map();
    box.querySelector('#p-snd').onclick = () => { Sfx.enabled = !Sfx.enabled; S.sound = Sfx.enabled; save(); this.pause(); };
    box.querySelector('#p-mus').onclick = () => { Music.setEnabled(!Music.enabled); this.pause(); };
    box.querySelector('#p-touch').onclick = () => { Touch.cyclePref(); this.pause(); };
    const full = box.querySelector('#p-full');
    if (full) full.onclick = () => {
      const done = () => setTimeout(() => this.pause(), 150);
      if (document.fullscreenElement) document.exitFullscreen().then(done, done);
      else document.documentElement.requestFullscreen().then(done, done);
    };
    box.querySelector('#p-exp').onclick = () => exportSave();
    box.querySelector('#p-help').onclick = () => this.help(() => this.pause());
    box.querySelector('#p-title').onclick = () => { save(); location.reload(); };
    this.bindLang(box, () => save());
    box.querySelectorAll('.chbtn').forEach(b => b.onclick = () => {
      const i = +b.dataset.i;
      this.closeModal();
      if (i !== G.chIdx) { save(); enterChapter(i, true); }
    });
  },

  help(back) {
    const table = (key) => `<table class="keys">${T(key).map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</table>`;
    // no celular, os controles de toque aparecem primeiro; as teclas do computador vêm em seguida
    const pc = `<h3>${T('helpPcTitle')}</h3>${table('helpRows')}`;
    const touch = `<h3>${T('helpTouchTitle')}</h3>${table('helpTouchRows')}`;
    const box = this.modal(`
      <h2>${T('help')}</h2>
      ${Touch.on ? touch + pc : pc + touch}
      <p>${T('helpTxt')}</p>
      <div class="center"><button id="h-x">${T('back')}</button></div>`, 'journal');
    box.querySelector('#h-x').onclick = () => { this.closeModal(); if (back) back(); };
  },

  death(lost, cb) {
    const box = this.modal(`
      <div class="narr-title">${T('fell')}</div>
      <p class="center">${T('fellTxt', escapeHtml(G.S.name))}</p>
      <p class="center dim">${T('fellTip', lost, escapeHtml(G.ch.currency))}</p>
      <div class="center"><button id="d-ok">${T('rise')}</button></div>`, 'narration');
    box.querySelector('#d-ok').onclick = () => { this.modalClose = null; this.closeModal(); cb(); };
  },

  ending() {
    const S = G.S, t = Math.floor(S.stats.time);
    let total = 0, found = 0;
    for (const ch of CHAPTERS) { total += ch.codex.length; const cs = S.ch[ch.id]; if (cs) found += Object.keys(cs.codex).length; }
    const box = this.modal(`
      <div class="narr-title">${T('endTitle')}</div>
      <p class="narr-text">${T('end1', escapeHtml(S.name))}</p>
      <p class="narr-text">${T('end2')}</p>
      <p class="center">${T('endStats', Math.floor(t / 3600), Math.floor(t / 60) % 60, S.level, S.stats.kills, S.stats.quests, found, total)}</p>
      <div class="center"><button id="e-free">${T('keepExploring')}</button></div>`, 'narration');
    box.querySelector('#e-free').onclick = () => this.closeModal();
    save();
  },

  // ---------- Tela de título ----------
  title() {
    const el = $('title');
    const prevName = $('t-name') ? $('t-name').value : 'Íber';
    let rows = '';
    for (let n = 1; n <= SLOT_COUNT; n++) {
      const s = loadSave(n);
      if (s) {
        const ch = CHAPTERS[clamp(s.chapter || 0, 0, CHAPTERS.length - 1)];
        const t = Math.floor((s.stats && s.stats.time) || 0);
        const when = s.savedAt ? new Date(s.savedAt).toLocaleString(LANG === 'es' ? 'es-ES' : 'pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '';
        rows += `
          <div class="slot">
            <div class="slot-info">
              <div class="slot-name"><span class="slot-n">${n}</span> ${escapeHtml(s.name)} <span class="dim">· ${T('lvl')} ${s.level}</span></div>
              <div class="dim">${escapeHtml(T('chapterN', (s.chapter || 0) + 1, ch.title))} · ${Math.floor(t / 3600)}h ${Math.floor(t / 60) % 60}min${when ? ' · ' + T('savedAt', when) : ''}</div>
            </div>
            <button data-play="${n}">${T('slotPlay')}</button>
            <button class="danger" data-del="${n}">${T('deleteSave')}</button>
          </div>`;
      } else {
        rows += `
          <div class="slot empty">
            <div class="slot-info"><div class="slot-name"><span class="slot-n">${n}</span> <span class="dim">${T('slotEmpty')}</span></div></div>
            <button data-new="${n}">${T('newGame')}</button>
            <label class="filebtn">${T('importSave')}<input type="file" data-imp="${n}" accept=".json,application/json"></label>
          </div>`;
      }
    }
    el.innerHTML = `
      <div class="t-box">
        <div class="t-logo">${T('logo')}</div>
        <div class="t-sub">${T('subtitle')}</div>
        <p class="t-desc">${T('titleDesc')}</p>
        ${this.langButtons()}
        <div class="t-new">
          <label for="t-name" class="dim">${T('lineagePh')}</label>
          <input id="t-name" maxlength="16" placeholder="${T('lineagePh')}" value="${escapeHtml(prevName)}">
        </div>
        <div class="slots">${rows}</div>
        <div class="t-row">
          <button id="t-help">${T('help')}</button>
          <button id="t-mus" class="mute">${Music.enabled ? '🔊' : '🔇'}</button>
        </div>
        <p class="t-foot">${T('titleFoot')}</p>
      </div>`;
    el.classList.remove('hidden');
    // a música só pode começar depois de um clique (regra dos navegadores)
    el.onpointerdown = () => { Sfx.init(); Music.start('title'); };
    const begin = (state, n) => {
      Sfx.init();
      el.classList.add('hidden');
      el.onpointerdown = null;
      $('hud').classList.remove('hidden');
      startGame(state, n);
    };
    this.bindLang(el);
    el.querySelectorAll('[data-play]').forEach(b => b.onclick = () => {
      const n = +b.dataset.play;
      begin(loadSave(n), n);
    });
    el.querySelectorAll('[data-new]').forEach(b => b.onclick = () => {
      const n = +b.dataset.new;
      const name = ($('t-name').value || 'Íber').trim().slice(0, 16) || 'Íber';
      begin(newState(name), n);
    });
    el.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
      const n = +b.dataset.del, s = loadSave(n);
      if (!s || !confirm(T('confirmDelete', s.name, (s.chapter || 0) + 1, s.level, n))) return;
      deleteSave(n);
      this.title();
      this.titleToast(T('deleted', n));
    });
    el.querySelectorAll('[data-imp]').forEach(inp => inp.onchange = (e) => {
      const f = e.target.files[0], n = +inp.dataset.imp;
      if (!f) return;
      importSave(f, n, (ok) => { if (ok) this.title(); else alert(T('badSave')); });
    });
    $('t-mus').onclick = (e) => { e.stopPropagation(); Music.setEnabled(!Music.enabled); if (Music.enabled) Music.start('title'); this.title(); };
    $('t-help').onclick = () => {
      el.classList.add('hidden');
      this.help(() => { G.ui = null; el.classList.remove('hidden'); });
    };
  },
  titleToast(msg) {
    const p = document.createElement('p');
    p.className = 't-msg';
    p.textContent = msg;
    $('title').querySelector('.t-box').appendChild(p);
    setTimeout(() => p.remove(), 2500);
  },

  // ---------- Teclado ----------
  onKey(e) {
    if (G.ui === 'dialog') {
      if (this.dlg && this.dlg.quiz) {
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= this._quizN) this.answer(n - 1);
      } else if (['Space', 'Enter', 'KeyE', 'NumpadEnter'].includes(e.code)) this.nextLine();
      return true;
    }
    if (G.ui === 'modal') {
      if (this._narrNext && ['Space', 'Enter', 'NumpadEnter'].includes(e.code)) { e.preventDefault(); this._narrNext(); return true; }
      const cls = $('modal').className;
      if (e.code === 'Escape' || (e.code === 'KeyJ' && cls === 'journal') || (e.code === 'KeyC' && cls === 'journal') || (e.code === 'KeyM' && cls === 'mapmodal')) {
        if (cls === 'narration') return true;
        this.closeModal();
      }
      return true;
    }
    if (!G.running) return false;
    switch (e.code) {
      case 'Escape': this.pause(); return true;
      case 'KeyJ': case 'Tab': this.journal(); return true;
      case 'KeyC': this.codex(); return true;
      case 'KeyM': this.map(); return true;
    }
    return false;
  },

  // textos fixos do HTML
  staticTexts() {
    $('keysbar').textContent = T('keysBar');
    $('menu-btn').textContent = T('menuBtn');
    $('rotate-hint').textContent = T('rotateHint');
    document.title = T('logo').charAt(0) + T('logo').slice(1).toLowerCase() + ' — ' + T('subtitle');
  }
};

$('dialog').addEventListener('mousedown', (e) => { if (e.target.tagName !== 'BUTTON') UI.nextLine(); });
