// Idiomas: português (Brasil) e espanhol (Espanha).
// Os textos de interface ficam aqui; o conteúdo dos capítulos em espanhol fica em js/data/es*.js
// e é aplicado por cima dos dados em português quando o idioma é "es".
'use strict';

const LANG_KEY = 'hispania_lang';
const LANG = (() => {
  try { const l = localStorage.getItem(LANG_KEY); if (l === 'pt' || l === 'es') return l; } catch (e) { /* sem armazenamento */ }
  return (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'pt';
})();
document.documentElement.lang = LANG === 'es' ? 'es-ES' : 'pt-BR';

function setLang(l) {
  try { localStorage.setItem(LANG_KEY, l); } catch (e) { /* sem armazenamento */ }
  location.reload();
}

const STR = {
  pt: {
    narrator: 'Narrador',
    chronicle: 'Crônica antiga', chest: 'Baú', chestEmpty: 'Baú vazio', potion: 'Poção',
    questDone: 'Missão concluída: {0}  (+{1} XP, +{2} {3})', questDonePot: ', +{0} poções',
    chapterN: 'Capítulo {0}: {1}', appears: '⚔ {0} surge!', defeated: '★ {0} derrotado!', furious: '{0} está furioso!',
    newQuest: 'Nova missão: {0}', quizWin: 'Excelente! Você conhece bem a sua história.',
    quizFail: 'Não é bem isso... Estude as crônicas espalhadas pelo mapa e volte a falar comigo.',
    quizAsk: 'Responda às minhas perguntas.', levelUp: 'Nível {0}! Vida e dano aumentaram.', levelFloat: 'NÍVEL {0}',
    noPotions: 'Sem poções! Compre com o mercador.', lifeFloat: '+vida', potionFloat: '+1 poção',
    closer: 'Chegue mais perto.', chestLoot: 'Baú: +{0} {1}', chestPot: ', +1 poção', click: '[clique]',
    // HUD
    lvl: 'Nv', reloading: 'recarregando…', chapterHud: 'Cap. {0}/{1} · {2} ({3})',
    chapterDone: '★ Capítulo concluído', chapterDoneTxt: 'Explore, termine missões secundárias ou avance pelo menu (Esc).',
    keysBar: 'WASD andar · Mouse mirar · Clique atacar/interagir · Espaço esquiva · Q poção · R recarregar · J diário · C crônicas · M mapa · Esc menu',
    // diálogo
    next: 'Clique ou Espaço ▸', end: 'Clique ou Espaço ✓', quizHint: 'Escolha com o mouse ou teclas 1–{0}',
    cont: 'Continuar ▸', start: 'Começar ✓',
    // evolução
    evoTitle: 'Evolução da linhagem', newWeapon: 'Nova arma:', nextChapter: 'Próximo capítulo:', follow: 'Seguir a história ▸',
    codexFound: '📜 Crônica encontrada', codexKeep: 'Guardar nas crônicas ✓',
    // loja
    youHave: 'Você tem', potions: 'poções', weapon: 'Arma', armor: 'Armadura', leave: 'Sair', max: 'Máximo',
    shopPot: 'Poção de cura', shopPotD: 'Recupera 50% da vida.', shopPot5: 'Pacote com 5 poções', shopPot5D: 'Leve 5, pague 4.',
    shopSharp: 'Aprimorar arma (nível {0})', shopSharpD: '+10% de dano permanente.',
    shopArmor: 'Reforçar armadura (nível {0})', shopArmorD: '+6% de defesa permanente (máx. 8).',
    // diário
    journal: 'Diário de missões', chapter: 'Capítulo', completed: '✓ Concluída', locked: '🔒 Disponível mais adiante na história principal.',
    available: 'Disponível — fale com <b>{0}</b>{1}.', inPlace: ' em {0}', chronCount: 'Crônicas deste capítulo: {0}/{1} · Baús: {2}/6',
    closeJ: 'Fechar [J]', closeC: 'Fechar [C]',
    chronicles: 'Crônicas da Espanha', found: 'Encontradas: {0}/{1}', lookNear: '— procure perto de {0}',
    mapLegend: '● você · ★ objetivo · vermelho = chefe · laranja = acampamento inimigo · <b>M</b> fecha',
    // pausa
    pause: 'Pausa', playtime: 'Tempo de jogo: {0}h {1}min · Inimigos derrotados: {2} · Missões: {3} · Quedas: {4}',
    resume: 'Continuar', journalBtn: 'Diário de missões [J]', codexBtn: 'Crônicas [C]', mapBtn: 'Mapa [M]',
    sound: 'Efeitos: {0}', music: 'Música: {0}', on: 'ligado', off: 'desligado', on2: 'ligada', off2: 'desligada',
    export: 'Exportar save (arquivo)', help: 'Como jogar', toTitle: 'Salvar e voltar ao título',
    language: 'Idioma', unlocked: 'Capítulos desbloqueados', unlockedTxt: 'Volte a capítulos anteriores para completar missões secundárias e crônicas.',
    langConfirm: 'Trocar o idioma recarrega o jogo (o progresso é salvo). Continuar?',
    // ajuda
    helpRows: [['W', 'Andar para cima (frente)'], ['S', 'Andar para baixo (trás)'], ['A / D', 'Esquerda / direita'], ['Mouse', 'Mirar'],
      ['Clique esquerdo', 'Atacar (segure para atacar sem parar) · clicar em pessoas, baús, itens e crônicas interage'],
      ['E', 'Interagir com o mais próximo'], ['Espaço', 'Esquiva rápida (fica invulnerável por um instante)'], ['Q', 'Beber poção'],
      ['R', 'Recarregar arma de fogo'], ['J · C · M', 'Diário · Crônicas · Mapa'], ['Esc', 'Menu / fechar janelas']],
    helpTxt: 'Siga a <b style="color:#ffd84a">seta dourada</b> para a história principal. Pessoas com <b style="color:#9ad0ff">!</b> azul oferecem missões secundárias. Pergaminhos brilhantes são <b>crônicas</b> com fatos históricos — elas ajudam nos quizzes. O jogo salva sozinho no seu navegador.',
    back: 'Voltar',
    // morte
    fell: 'Você caiu…', fellTxt: 'Mas a linhagem de {0} não termina aqui.',
    fellTip: 'Perdeu {0} {1}. Dica: use a esquiva (Espaço), beba poções (Q) e aprimore equipamentos no mercador.', rise: 'Levantar-se',
    // final
    endTitle: 'Fim — Presidente do Governo',
    end1: 'Da lança de sílex em Atapuerca ao juramento no Palácio da Zarzuela, a linhagem de {0} atravessou mais de trinta mil anos de história ibérica. Caçadores, guerreiros, cavaleiros, soldados, jornalistas e deputados: cada geração deixou a Espanha um pouco diferente do que encontrou.',
    end2: 'A história, porém, não acaba. Ela continua a ser escrita por quem vive nela.',
    endStats: 'Tempo: {0}h {1}min · Nível {2} · Inimigos: {3} · Missões: {4} · Crônicas: {5}/{6}', keepExploring: 'Continuar explorando',
    // título
    logo: 'HISPÂNIA', subtitle: 'De Atapuerca a La Moncloa',
    titleDesc: 'Um RPG que atravessa a história da Espanha: comece como caçador da Idade da Pedra e evolua, geração após geração, até chegar ao governo do país.',
    continueSave: 'Continuar — {0}, capítulo {1} (Nv {2})', lineagePh: 'Nome da sua linhagem', newGame: 'Novo jogo',
    importSave: 'Importar save', deleteSave: 'Excluir save', titleFoot: 'Recomendado: computador com teclado e mouse. O progresso é salvo neste navegador.',
    confirmNew: 'Começar um novo jogo apaga o progresso salvo neste navegador. Continuar?',
    confirmDelete: 'Excluir a partida do espaço {3}: {0} (capítulo {1}, nível {2})? Isso não pode ser desfeito. Se quiser guardar uma cópia, use "Exportar save" no menu do jogo antes.',
    deleted: 'Partida do espaço {0} excluída.', slotPlay: 'Continuar', slotEmpty: 'Espaço vazio', savedAt: 'salvo em {0}', badSave: 'Arquivo de save inválido.'
  },
  es: {
    narrator: 'Narrador',
    chronicle: 'Crónica antigua', chest: 'Cofre', chestEmpty: 'Cofre vacío', potion: 'Poción',
    questDone: 'Misión completada: {0}  (+{1} XP, +{2} {3})', questDonePot: ', +{0} pociones',
    chapterN: 'Capítulo {0}: {1}', appears: '⚔ ¡Aparece {0}!', defeated: '★ ¡{0} derrotado!', furious: '¡{0} está furioso!',
    newQuest: 'Nueva misión: {0}', quizWin: '¡Excelente! Conoces bien tu historia.',
    quizFail: 'No es eso exactamente... Estudia las crónicas repartidas por el mapa y vuelve a hablar conmigo.',
    quizAsk: 'Responde a mis preguntas.', levelUp: '¡Nivel {0}! Aumentan la vida y el daño.', levelFloat: 'NIVEL {0}',
    noPotions: '¡Sin pociones! Cómpralas al mercader.', lifeFloat: '+vida', potionFloat: '+1 poción',
    closer: 'Acércate más.', chestLoot: 'Cofre: +{0} {1}', chestPot: ', +1 poción', click: '[clic]',
    lvl: 'Nv', reloading: 'recargando…', chapterHud: 'Cap. {0}/{1} · {2} ({3})',
    chapterDone: '★ Capítulo completado', chapterDoneTxt: 'Explora, termina misiones secundarias o avanza desde el menú (Esc).',
    keysBar: 'WASD moverse · Ratón apuntar · Clic atacar/interactuar · Espacio esquivar · Q poción · R recargar · J diario · C crónicas · M mapa · Esc menú',
    next: 'Clic o Espacio ▸', end: 'Clic o Espacio ✓', quizHint: 'Elige con el ratón o las teclas 1–{0}',
    cont: 'Continuar ▸', start: 'Empezar ✓',
    evoTitle: 'Evolución del linaje', newWeapon: 'Nueva arma:', nextChapter: 'Próximo capítulo:', follow: 'Seguir la historia ▸',
    codexFound: '📜 Crónica encontrada', codexKeep: 'Guardar en las crónicas ✓',
    youHave: 'Tienes', potions: 'pociones', weapon: 'Arma', armor: 'Armadura', leave: 'Salir', max: 'Máximo',
    shopPot: 'Poción de curación', shopPotD: 'Recupera el 50% de la vida.', shopPot5: 'Lote de 5 pociones', shopPot5D: 'Llévate 5, paga 4.',
    shopSharp: 'Mejorar arma (nivel {0})', shopSharpD: '+10% de daño permanente.',
    shopArmor: 'Reforzar armadura (nivel {0})', shopArmorD: '+6% de defensa permanente (máx. 8).',
    journal: 'Diario de misiones', chapter: 'Capítulo', completed: '✓ Completada', locked: '🔒 Disponible más adelante en la historia principal.',
    available: 'Disponible — habla con <b>{0}</b>{1}.', inPlace: ' en {0}', chronCount: 'Crónicas de este capítulo: {0}/{1} · Cofres: {2}/6',
    closeJ: 'Cerrar [J]', closeC: 'Cerrar [C]',
    chronicles: 'Crónicas de España', found: 'Encontradas: {0}/{1}', lookNear: '— busca cerca de {0}',
    mapLegend: '● tú · ★ objetivo · rojo = jefe · naranja = campamento enemigo · <b>M</b> cierra',
    pause: 'Pausa', playtime: 'Tiempo de juego: {0}h {1}min · Enemigos derrotados: {2} · Misiones: {3} · Caídas: {4}',
    resume: 'Continuar', journalBtn: 'Diario de misiones [J]', codexBtn: 'Crónicas [C]', mapBtn: 'Mapa [M]',
    sound: 'Efectos: {0}', music: 'Música: {0}', on: 'activados', off: 'desactivados', on2: 'activada', off2: 'desactivada',
    export: 'Exportar partida (archivo)', help: 'Cómo jugar', toTitle: 'Guardar y volver al título',
    language: 'Idioma', unlocked: 'Capítulos desbloqueados', unlockedTxt: 'Vuelve a capítulos anteriores para completar misiones secundarias y crónicas.',
    langConfirm: 'Cambiar el idioma recarga el juego (el progreso se guarda). ¿Continuar?',
    helpRows: [['W', 'Moverse hacia arriba (adelante)'], ['S', 'Moverse hacia abajo (atrás)'], ['A / D', 'Izquierda / derecha'], ['Ratón', 'Apuntar'],
      ['Clic izquierdo', 'Atacar (mantén pulsado para atacar sin parar) · hacer clic en personas, cofres, objetos y crónicas interactúa'],
      ['E', 'Interactuar con lo más cercano'], ['Espacio', 'Esquiva rápida (invulnerable por un instante)'], ['Q', 'Beber poción'],
      ['R', 'Recargar arma de fuego'], ['J · C · M', 'Diario · Crónicas · Mapa'], ['Esc', 'Menú / cerrar ventanas']],
    helpTxt: 'Sigue la <b style="color:#ffd84a">flecha dorada</b> para la historia principal. Las personas con <b style="color:#9ad0ff">!</b> azul ofrecen misiones secundarias. Los pergaminos brillantes son <b>crónicas</b> con datos históricos — te ayudarán en los cuestionarios. El juego se guarda solo en tu navegador.',
    back: 'Volver',
    fell: 'Has caído…', fellTxt: 'Pero el linaje de {0} no termina aquí.',
    fellTip: 'Has perdido {0} {1}. Consejo: usa la esquiva (Espacio), bebe pociones (Q) y mejora tu equipo en el mercader.', rise: 'Levantarse',
    endTitle: 'Fin — Presidente del Gobierno',
    end1: 'De la lanza de sílex en Atapuerca a la promesa en el Palacio de la Zarzuela, el linaje de {0} ha atravesado más de treinta mil años de historia ibérica. Cazadores, guerreros, caballeros, soldados, periodistas y diputados: cada generación dejó España un poco distinta de como la encontró.',
    end2: 'La historia, sin embargo, no termina. La siguen escribiendo quienes la viven.',
    endStats: 'Tiempo: {0}h {1}min · Nivel {2} · Enemigos: {3} · Misiones: {4} · Crónicas: {5}/{6}', keepExploring: 'Seguir explorando',
    logo: 'HISPANIA', subtitle: 'De Atapuerca a La Moncloa',
    titleDesc: 'Un RPG que recorre la historia de España: empieza como cazador de la Edad de Piedra y evoluciona, generación tras generación, hasta llegar al Gobierno del país.',
    continueSave: 'Continuar — {0}, capítulo {1} (Nv {2})', lineagePh: 'Nombre de tu linaje', newGame: 'Nueva partida',
    importSave: 'Importar partida', deleteSave: 'Borrar partida', titleFoot: 'Recomendado: ordenador con teclado y ratón. El progreso se guarda en este navegador.',
    confirmNew: 'Empezar una nueva partida borra el progreso guardado en este navegador. ¿Continuar?',
    confirmDelete: '¿Borrar la partida de la ranura {3}: {0} (capítulo {1}, nivel {2})? No se puede deshacer. Si quieres conservar una copia, usa antes "Exportar partida" en el menú del juego.',
    deleted: 'Partida de la ranura {0} borrada.', slotPlay: 'Continuar', slotEmpty: 'Ranura vacía', savedAt: 'guardada el {0}', badSave: 'Archivo de partida no válido.'
  }
};

function T(key, ...args) {
  const s = (STR[LANG] && STR[LANG][key] != null) ? STR[LANG][key] : STR.pt[key];
  if (typeof s !== 'string') return s;
  return s.replace(/\{(\d+)\}/g, (_, i) => args[i] != null ? args[i] : '');
}

// Sobreposição do conteúdo traduzido. Estrutura de cada capítulo em ES_CHAPTERS[id]:
// { title, years, currency, intro, outro, places:{id:nome}, npcs:{id:{name,lines}},
//   codex:{id:{title,text}}, quests:{qid:{title, steps:[{desc, item, say, done, intro, win, qs}]}} }
const ES_CHAPTERS = {};
const ES_BASE = { weapons: {}, classes: {}, enemies: {} };

function applyLanguage() {
  if (LANG !== 'es') return;
  for (const [k, v] of Object.entries(ES_BASE.weapons)) if (WEAPONS[k]) Object.assign(WEAPONS[k], v);
  for (const [k, v] of Object.entries(ES_BASE.classes)) if (CLASSES[k]) CLASSES[k].name = v;
  for (const [k, v] of Object.entries(ES_BASE.enemies)) if (ENEMIES[k]) ENEMIES[k].name = v;
  for (const ch of CHAPTERS) {
    const o = ES_CHAPTERS[ch.id];
    if (!o) continue;
    for (const f of ['title', 'years', 'currency', 'intro', 'outro']) if (o[f] != null) ch[f] = o[f];
    if (o.places) for (const p of ch.places) if (o.places[p.id]) p.name = o.places[p.id];
    if (o.npcs) for (const n of ch.npcs) { const t = o.npcs[n.id]; if (t) { if (t.name) n.name = t.name; if (t.lines) n.lines = t.lines; } }
    if (o.codex) for (const c of ch.codex) { const t = o.codex[c.id]; if (t) Object.assign(c, t); }
    if (o.quests) for (const q of ch.quests) {
      const t = o.quests[q.id];
      if (!t) continue;
      if (t.title) q.title = t.title;
      if (t.steps) t.steps.forEach((ts, i) => { if (ts && q.steps[i]) Object.assign(q.steps[i], ts); });
    }
  }
}
