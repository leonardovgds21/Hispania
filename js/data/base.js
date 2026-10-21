// Classes do herói (uma por capítulo) e catálogo global de inimigos.
'use strict';

// Os danos são "base de capítulo 1": o jogo multiplica pelo fator do capítulo.
const WEAPONS = {
  lanca:     { name: 'Lança de sílex',     kind: 'melee', dmg: 16, range: 82, arc: 0.6, cd: 0.5, draw: 'spear', color: '#a0784a' },
  falcata:   { name: 'Falcata ibérica',    kind: 'melee', dmg: 15, range: 58, arc: 1.9, cd: 0.4, draw: 'falcata', color: '#cfd6dc' },
  gladio:    { name: 'Gládio e escudo',    kind: 'melee', dmg: 15, range: 54, arc: 1.7, cd: 0.32, draw: 'sword', color: '#d9dee2', shield: '#a32020', def: 0.12 },
  spatha:    { name: 'Spatha visigoda',    kind: 'melee', dmg: 18, range: 64, arc: 1.9, cd: 0.45, draw: 'sword', color: '#c0c8d0' },
  espada:    { name: 'Espada e escudo',    kind: 'melee', dmg: 17, range: 58, arc: 1.8, cd: 0.38, draw: 'sword', color: '#d0d6dc', shield: '#3b6b2c', def: 0.15 },
  montante:  { name: 'Espada longa',       kind: 'melee', dmg: 21, range: 74, arc: 2.1, cd: 0.5, draw: 'longsword', color: '#e2e6ea' },
  espingarda:{ name: 'Espingarda de mecha',kind: 'gun', dmg: 42, cd: 0.3, mag: 1, reload: 1.3, speed: 760, spread: 0.04, draw: 'gun', color: '#5a3b1e' },
  arcabuz:   { name: 'Arcabuz',            kind: 'gun', dmg: 40, cd: 0.3, mag: 1, reload: 1.05, speed: 820, spread: 0.035, draw: 'gun', color: '#4a2f18' },
  mosquete:  { name: 'Mosquete e baioneta',kind: 'gun', dmg: 36, cd: 0.3, mag: 2, reload: 1.3, speed: 860, spread: 0.03, draw: 'gun', color: '#3e2a16' },
  mauser:    { name: 'Fuzil Mauser',       kind: 'gun', dmg: 24, cd: 0.32, mag: 5, reload: 1.6, speed: 940, spread: 0.02, draw: 'rifle', color: '#2e2e2e' },
  fuzil:     { name: 'Fuzil de ferrolho',  kind: 'gun', dmg: 24, cd: 0.3, mag: 5, reload: 1.5, speed: 940, spread: 0.02, draw: 'rifle', color: '#333' },
  camera:    { name: 'Câmera fotográfica', kind: 'melee', dmg: 19, range: 120, arc: 1.1, cd: 0.55, draw: 'camera', color: '#222', fx: 'flash' },
  discurso:  { name: 'Discurso',           kind: 'voice', dmg: 11, cd: 0.22, speed: 520, spread: 0.08, draw: 'paper', color: '#fff', words: ['Diálogo!', 'Consenso!', 'Liberdade!', 'Votem!', 'Democracia!', 'Acordo!', 'Lei!'] },
  megafone:  { name: 'Megafone',           kind: 'voice', dmg: 12, cd: 0.18, speed: 560, spread: 0.1, draw: 'megaphone', color: '#e63', words: ['Futuro!', 'Juntos!', 'Ciência!', 'Europa!', 'Verdade!', 'Trabalho!', 'Respeito!'] }
};

const CLASSES = {
  cacador:      { name: 'Caçador',                       weapon: 'lanca',      look: { body: '#7a5230', legs: '#5a3a20', skin: '#d8a27a', hat: 'hood', hatColor: '#8d6a44' } },
  celtibero:    { name: 'Guerreiro Celtibero',           weapon: 'falcata',    look: { body: '#9c2f2f', legs: '#5a4030', skin: '#d8a27a', hat: 'band', hatColor: '#e0c060' } },
  legionario:   { name: 'Legionário de Hispânia',        weapon: 'gladio',     look: { body: '#b02222', legs: '#6a4a2a', skin: '#d8a27a', hat: 'galea', hatColor: '#c9a227' } },
  godo:         { name: 'Guerreiro Visigodo',            weapon: 'spatha',     look: { body: '#3a5f8a', legs: '#4a3a2a', skin: '#e0b090', hat: 'nasal', hatColor: '#9aa3ab' } },
  asturiano:    { name: 'Infante Asturiano',             weapon: 'espada',     look: { body: '#4f6f34', legs: '#4a3a2a', skin: '#e0b090', hat: 'nasal', hatColor: '#8a929a' } },
  cavaleiro:    { name: 'Cavaleiro de Castela',          weapon: 'montante',   look: { body: '#e8e2d0', legs: '#707880', skin: '#e0b090', hat: 'great', hatColor: '#a8b0b8', cross: '#b02020' } },
  espingardeiro:{ name: 'Espingardeiro do Gran Capitán', weapon: 'espingarda', look: { body: '#b8860b', legs: '#7a2020', skin: '#e0b090', hat: 'cap', hatColor: '#7a2020' } },
  tercio:       { name: 'Soldado do Tercio',             weapon: 'arcabuz',    look: { body: '#c23b22', legs: '#e0c060', skin: '#e0b090', hat: 'morion', hatColor: '#b8c0c8' } },
  guerrilheiro: { name: 'Guerrilheiro de 1808',          weapon: 'mosquete',   look: { body: '#6b4b2b', legs: '#3a3a3a', skin: '#e0b090', hat: 'wide', hatColor: '#2a2a2a', sash: '#b02020' } },
  soldado:      { name: 'Soldado de Infantaria',         weapon: 'mauser',     look: { body: '#2b3d6b', legs: '#b02020', skin: '#e0b090', hat: 'shako', hatColor: '#2b2b3b' } },
  guardiao:     { name: 'Guardião do Tesouro Artístico', weapon: 'fuzil',      look: { body: '#5a5a3a', legs: '#3a3a2a', skin: '#e0b090', hat: 'beret', hatColor: '#222' } },
  jornalista:   { name: 'Jornalista',                    weapon: 'camera',     look: { body: '#7a6a5a', legs: '#3a3a3a', skin: '#e0b090', hat: 'fedora', hatColor: '#4a3a2a' } },
  deputado:     { name: 'Deputado Constituinte',         weapon: 'discurso',   look: { body: '#2a2a2a', legs: '#1a1a1a', skin: '#e0b090', hat: 'none', tie: '#a02020' } },
  candidato:    { name: 'Candidato a Presidente',        weapon: 'megafone',   look: { body: '#1e3a6e', legs: '#1a1a2a', skin: '#e0b090', hat: 'none', tie: '#e0b020' } }
};

// ai: melee | ranged | charger | swarm
// shape: beast | human | blob
const ENEMIES = {
  // Pré-história
  lobo:      { name: 'Lobo',                hp: 24, spd: 130, dmg: 6,  ai: 'melee',  r: 13, xp: 8,  gold: 2, shape: 'beast', color: '#7d7d80' },
  javali:    { name: 'Javali',              hp: 34, spd: 90,  dmg: 10, ai: 'charger',r: 14, xp: 10, gold: 2, shape: 'beast', color: '#5a4030' },
  auroque:   { name: 'Auroque',             hp: 70, spd: 70,  dmg: 14, ai: 'charger',r: 20, xp: 18, gold: 4, shape: 'beast', color: '#3a2a20', horns: true },
  urso:      { name: 'Urso das Cavernas Ancião', hp: 900, spd: 85, dmg: 18, r: 34, xp: 250, gold: 60, shape: 'beast', color: '#4a3020', boss: true, patterns: ['charge', 'slam', 'summon', 'charge'], summon: 'lobo' },
  // Ibéria
  mercenario:{ name: 'Mercenário Cartaginês', hp: 32, spd: 95, dmg: 9, ai: 'melee', r: 13, xp: 10, gold: 3, shape: 'human', look: { body: '#7a4a9a', skin: '#b07a50', hat: 'band', hatColor: '#ddd', weapon: 'sword' } },
  fundeiro:  { name: 'Fundeiro Balear',     hp: 22, spd: 90,  dmg: 8,  ai: 'ranged', r: 12, xp: 10, gold: 3, shape: 'human', look: { body: '#c8b88a', skin: '#c08a60', hat: 'none', weapon: 'sling' }, proj: '#999' },
  elefante:  { name: 'Elefante de Guerra',  hp: 140, spd: 65, dmg: 18, ai: 'charger',r: 26, xp: 30, gold: 8, shape: 'beast', color: '#8a8a8a', tusks: true },
  romano:    { name: 'Legionário Romano',   hp: 40, spd: 85,  dmg: 10, ai: 'melee',  r: 13, xp: 12, gold: 4, shape: 'human', look: { body: '#a82020', skin: '#d8a27a', hat: 'galea', hatColor: '#999', weapon: 'sword', shield: '#a82020' } },
  legado:    { name: 'Legado de Cipião',    hp: 1100, spd: 95, dmg: 16, r: 22, xp: 300, gold: 80, shape: 'human', boss: true, look: { body: '#7a1010', skin: '#d8a27a', hat: 'galea', hatColor: '#d4af37', weapon: 'sword', shield: '#7a1010', cape: '#5a0a0a' }, patterns: ['charge', 'summon', 'spray', 'slam'], summon: 'romano', proj: '#ccc' },
  // Hispânia romana
  bandido:   { name: 'Bandido de Estrada',  hp: 30, spd: 105, dmg: 9,  ai: 'melee',  r: 13, xp: 10, gold: 5, shape: 'human', look: { body: '#5a5040', skin: '#c89a70', hat: 'hood', hatColor: '#3a3428', weapon: 'sword' } },
  cantabro:  { name: 'Guerreiro Cântabro',  hp: 38, spd: 100, dmg: 10, ai: 'melee',  r: 13, xp: 12, gold: 3, shape: 'human', look: { body: '#4a6a3a', skin: '#d8a27a', hat: 'band', hatColor: '#aa7733', weapon: 'spear' } },
  astur:     { name: 'Arqueiro Ástur',      hp: 24, spd: 90,  dmg: 9,  ai: 'ranged', r: 12, xp: 11, gold: 3, shape: 'human', look: { body: '#6a5a3a', skin: '#d8a27a', hat: 'hood', hatColor: '#4a5a3a', weapon: 'bow' }, proj: '#8a6a3a' },
  corocotta: { name: 'Corocotta, o Bandoleiro Cântabro', hp: 1200, spd: 115, dmg: 17, r: 22, xp: 320, gold: 100, shape: 'human', boss: true, look: { body: '#2f4a22', skin: '#d8a27a', hat: 'band', hatColor: '#c33', weapon: 'spear', cape: '#6a3a1a' }, patterns: ['charge', 'spray', 'summon', 'charge', 'slam'], summon: 'cantabro', proj: '#8a6a3a' },
  // Visigodos
  bagauda:   { name: 'Bagauda Rebelde',     hp: 34, spd: 100, dmg: 10, ai: 'melee',  r: 13, xp: 11, gold: 3, shape: 'human', look: { body: '#6a6050', skin: '#d8a27a', hat: 'none', weapon: 'club' } },
  suevo_arq: { name: 'Arqueiro Suevo',      hp: 26, spd: 90,  dmg: 9,  ai: 'ranged', r: 12, xp: 12, gold: 4, shape: 'human', look: { body: '#2a5a5a', skin: '#e8c0a0', hat: 'nasal', hatColor: '#888', weapon: 'bow' }, proj: '#6a5a3a' },
  suevo_cav: { name: 'Cavaleiro Suevo',     hp: 60, spd: 80,  dmg: 13, ai: 'charger',r: 17, xp: 18, gold: 6, shape: 'human', mounted: '#6a4a2a', look: { body: '#2a5a5a', skin: '#e8c0a0', hat: 'nasal', hatColor: '#888', weapon: 'spear' } },
  andeca:    { name: 'Andeca, o Usurpador Suevo', hp: 1300, spd: 100, dmg: 18, r: 24, xp: 340, gold: 110, shape: 'human', boss: true, look: { body: '#1a4a4a', skin: '#e8c0a0', hat: 'great', hatColor: '#d4af37', weapon: 'sword', cape: '#4a1a5a' }, patterns: ['slam', 'charge', 'burst', 'summon'], summon: 'suevo_arq', proj: '#d4af37' },
  // Astúrias / Al-Andalus
  emirado:   { name: 'Soldado do Emirado',  hp: 38, spd: 100, dmg: 11, ai: 'melee',  r: 13, xp: 12, gold: 4, shape: 'human', look: { body: '#e8e0c8', skin: '#b88a60', hat: 'turban', hatColor: '#fff', weapon: 'sword', shield: '#8a6a3a' } },
  emirado_arq:{ name: 'Arqueiro do Emirado',hp: 26, spd: 92,  dmg: 10, ai: 'ranged', r: 12, xp: 12, gold: 4, shape: 'human', look: { body: '#c8b890', skin: '#b88a60', hat: 'turban', hatColor: '#e8e0c8', weapon: 'bow' }, proj: '#8a6a3a' },
  almanzor_cav:{ name: 'Cavaleiro de Almanzor', hp: 62, spd: 80, dmg: 14, ai: 'charger', r: 17, xp: 18, gold: 6, shape: 'human', mounted: '#ddd', look: { body: '#1a1a1a', skin: '#b88a60', hat: 'turban', hatColor: '#333', weapon: 'spear' } },
  alqama:    { name: 'Alqama, Comandante da Expedição', hp: 1400, spd: 100, dmg: 19, r: 24, xp: 360, gold: 120, shape: 'human', boss: true, look: { body: '#d8d0b8', skin: '#b88a60', hat: 'turban', hatColor: '#2a6a2a', weapon: 'sword', cape: '#2a6a2a', shield: '#d4af37' }, patterns: ['spray', 'charge', 'summon', 'slam', 'burst'], summon: 'emirado', proj: '#bba' },
  // Castela / almóadas
  almoravida:{ name: 'Guerreiro Almorávida',hp: 42, spd: 100, dmg: 12, ai: 'melee',  r: 13, xp: 13, gold: 4, shape: 'human', look: { body: '#2a2a3a', skin: '#a07050', hat: 'veil', hatColor: '#222', weapon: 'spear', shield: '#c8a870' } },
  almoada_arq:{ name: 'Arqueiro Almóada',   hp: 28, spd: 92,  dmg: 11, ai: 'ranged', r: 12, xp: 13, gold: 4, shape: 'human', look: { body: '#f0ead8', skin: '#a07050', hat: 'turban', hatColor: '#fff', weapon: 'bow' }, proj: '#8a6a3a' },
  almoada_cav:{ name: 'Cavaleiro Almóada',  hp: 66, spd: 82,  dmg: 15, ai: 'charger',r: 17, xp: 20, gold: 7, shape: 'human', mounted: '#f0ead8', look: { body: '#f0ead8', skin: '#a07050', hat: 'turban', hatColor: '#fff', weapon: 'spear' } },
  correntes: { name: 'Guarda das Correntes', hp: 1500, spd: 70, dmg: 20, r: 30, xp: 380, gold: 130, shape: 'human', boss: true, look: { body: '#1a1a1a', skin: '#8a5a3a', hat: 'veil', hatColor: '#111', weapon: 'chain', shield: '#888' }, patterns: ['burst', 'slam', 'summon', 'spray', 'burst'], summon: 'almoada_arq', proj: '#aaa' },
  // Granada
  nazari:    { name: 'Soldado Nasrida',     hp: 44, spd: 100, dmg: 12, ai: 'melee',  r: 13, xp: 14, gold: 5, shape: 'human', look: { body: '#7a2a5a', skin: '#b88a60', hat: 'turban', hatColor: '#e8d8a0', weapon: 'sword', shield: '#d4af37' } },
  besteiro:  { name: 'Besteiro Nasrida',    hp: 28, spd: 92,  dmg: 12, ai: 'ranged', r: 12, xp: 14, gold: 5, shape: 'human', look: { body: '#5a3a6a', skin: '#b88a60', hat: 'turban', hatColor: '#e8d8a0', weapon: 'bow' }, proj: '#6a4a2a' },
  ginete:    { name: 'Ginete',              hp: 64, spd: 90,  dmg: 15, ai: 'charger',r: 17, xp: 20, gold: 7, shape: 'human', mounted: '#8a5a2a', look: { body: '#7a2a5a', skin: '#b88a60', hat: 'turban', hatColor: '#fff', weapon: 'spear' } },
  bastiao:   { name: 'Bastião de Málaga',   hp: 1700, spd: 0, dmg: 20, r: 40, xp: 400, gold: 140, shape: 'tower', boss: true, stationary: true, color: '#b89a6a', patterns: ['burst', 'spray', 'summon', 'burst', 'spray'], summon: 'nazari', proj: '#333' },
  // Século de Ouro
  corsario:  { name: 'Corsário Berberesco', hp: 46, spd: 108, dmg: 13, ai: 'melee',  r: 13, xp: 15, gold: 7, shape: 'human', look: { body: '#c83a3a', skin: '#b88a60', hat: 'band', hatColor: '#fff', weapon: 'sword' } },
  janizaro:  { name: 'Janízaro Arcabuzeiro',hp: 34, spd: 90,  dmg: 14, ai: 'ranged', r: 12, xp: 15, gold: 6, shape: 'human', look: { body: '#2a4aa0', skin: '#d0a070', hat: 'tall', hatColor: '#fff', weapon: 'gun' }, proj: '#222' },
  comandante:{ name: 'Comandante Janízaro', hp: 1800, spd: 95, dmg: 21, r: 25, xp: 420, gold: 150, shape: 'human', boss: true, look: { body: '#1a3a90', skin: '#d0a070', hat: 'tall', hatColor: '#d4af37', weapon: 'sword', cape: '#a01010' }, patterns: ['spray', 'charge', 'summon', 'burst', 'slam'], summon: 'janizaro', proj: '#222' },
  // 1808
  fuzileiro: { name: 'Fuzileiro Imperial',  hp: 36, spd: 88,  dmg: 14, ai: 'ranged', r: 12, xp: 16, gold: 6, shape: 'human', look: { body: '#203a90', skin: '#e8c0a0', hat: 'shako', hatColor: '#111', weapon: 'gun', sash: '#fff' }, proj: '#222' },
  granadeiro:{ name: 'Granadeiro Imperial', hp: 54, spd: 96,  dmg: 14, ai: 'melee',  r: 14, xp: 17, gold: 6, shape: 'human', look: { body: '#203a90', skin: '#e8c0a0', hat: 'bearskin', hatColor: '#111', weapon: 'bayonet', sash: '#fff' } },
  dragao:    { name: 'Dragão Imperial',     hp: 70, spd: 88,  dmg: 16, ai: 'charger',r: 17, xp: 22, gold: 8, shape: 'human', mounted: '#3a2a1a', look: { body: '#2a6a2a', skin: '#e8c0a0', hat: 'galea', hatColor: '#d4af37', weapon: 'sword' } },
  coronel:   { name: 'Coronel dos Dragões', hp: 1900, spd: 105, dmg: 22, r: 25, xp: 440, gold: 160, shape: 'human', boss: true, mounted: '#222', look: { body: '#1a5a1a', skin: '#e8c0a0', hat: 'galea', hatColor: '#d4af37', weapon: 'sword', cape: '#a01010' }, patterns: ['charge', 'spray', 'charge', 'summon', 'slam'], summon: 'fuzileiro', proj: '#222' },
  // Século XIX
  carlista:  { name: 'Partidário Carlista', hp: 36, spd: 90,  dmg: 14, ai: 'ranged', r: 12, xp: 16, gold: 6, shape: 'human', look: { body: '#3a3a5a', skin: '#e0b090', hat: 'beret', hatColor: '#c02020', weapon: 'gun' }, proj: '#222' },
  bandoleiro:{ name: 'Bandoleiro da Serra', hp: 52, spd: 110, dmg: 15, ai: 'melee',  r: 13, xp: 17, gold: 9, shape: 'human', look: { body: '#4a3a2a', skin: '#c89a70', hat: 'wide', hatColor: '#111', weapon: 'knife', sash: '#c02020' } },
  contrabandista:{ name: 'Contrabandista', hp: 40, spd: 125, dmg: 13, ai: 'melee',  r: 12, xp: 16, gold: 10, shape: 'human', look: { body: '#5a5a4a', skin: '#c89a70', hat: 'cap', hatColor: '#333', weapon: 'knife' } },
  tempranillo:{ name: 'José María, "El Tempranillo"', hp: 2000, spd: 120, dmg: 22, r: 23, xp: 460, gold: 200, shape: 'human', boss: true, mounted: '#111', look: { body: '#3a2a1a', skin: '#c89a70', hat: 'wide', hatColor: '#111', weapon: 'gun', sash: '#c02020', cape: '#5a1a1a' }, patterns: ['spray', 'charge', 'summon', 'spray', 'burst'], summon: 'bandoleiro', proj: '#222' },
  // Guerra Civil
  saqueador: { name: 'Saqueador',           hp: 50, spd: 105, dmg: 15, ai: 'melee',  r: 13, xp: 17, gold: 7, shape: 'human', look: { body: '#4a4a40', skin: '#d0a080', hat: 'cap', hatColor: '#2a2a2a', weapon: 'club' } },
  incendiario:{ name: 'Incendiário',        hp: 38, spd: 92,  dmg: 15, ai: 'ranged', r: 12, xp: 17, gold: 7, shape: 'human', look: { body: '#5a3a2a', skin: '#d0a080', hat: 'hood', hatColor: '#222', weapon: 'torch' }, proj: '#ff7a1a' },
  chefe_saque:{ name: 'O Chefe dos Saqueadores', hp: 2100, spd: 100, dmg: 23, r: 25, xp: 480, gold: 170, shape: 'human', boss: true, look: { body: '#2a2a20', skin: '#d0a080', hat: 'cap', hatColor: '#111', weapon: 'club', cape: '#3a1a1a' }, patterns: ['slam', 'spray', 'summon', 'charge', 'burst'], summon: 'saqueador', proj: '#ff7a1a' },
  // Ditadura (inimigos simbólicos)
  fome:      { name: 'Sombra da Fome',      hp: 30, spd: 120, dmg: 12, ai: 'swarm',  r: 12, xp: 15, gold: 5, shape: 'blob', color: '#5a5040' },
  censor:    { name: 'Censor de Tinta',     hp: 40, spd: 85,  dmg: 15, ai: 'ranged', r: 13, xp: 17, gold: 7, shape: 'human', look: { body: '#1a1a1a', skin: '#c8c0b0', hat: 'fedora', hatColor: '#111', weapon: 'pen' }, proj: '#111' },
  medo:      { name: 'Sombra do Medo',      hp: 80, spd: 70,  dmg: 18, ai: 'charger',r: 18, xp: 22, gold: 8, shape: 'blob', color: '#2a2a3a' },
  grande_censor:{ name: 'O Grande Censor',  hp: 2200, spd: 80, dmg: 23, r: 30, xp: 500, gold: 180, shape: 'blob', boss: true, color: '#111', eye: '#c02020', patterns: ['burst', 'spray', 'summon', 'slam', 'burst'], summon: 'censor', proj: '#111' },
  // Transição
  boato:     { name: 'Boato',               hp: 36, spd: 95,  dmg: 15, ai: 'ranged', r: 12, xp: 17, gold: 6, shape: 'blob', color: '#8a6a9a', proj: '#a07ab0' },
  golpe:     { name: 'Sombra do Golpe',     hp: 58, spd: 100, dmg: 17, ai: 'melee',  r: 14, xp: 19, gold: 7, shape: 'human', shadow: true, look: { body: '#2a3a2a', skin: '#555', hat: 'tricorn', hatColor: '#111', weapon: 'gun' } },
  inercia:   { name: 'Inércia',             hp: 110, spd: 55, dmg: 19, ai: 'melee',  r: 20, xp: 22, gold: 8, shape: 'blob', color: '#6a6a6a' },
  sombra23f: { name: 'A Sombra do 23-F',    hp: 2300, spd: 95, dmg: 24, r: 28, xp: 520, gold: 200, shape: 'human', boss: true, shadow: true, look: { body: '#1a2a1a', skin: '#444', hat: 'tricorn', hatColor: '#000', weapon: 'gun', cape: '#111' }, patterns: ['spray', 'summon', 'burst', 'charge', 'slam'], summon: 'golpe', proj: '#222' },
  // Século XXI
  bolha:     { name: 'Bolha Imobiliária',   hp: 28, spd: 125, dmg: 14, ai: 'swarm',  r: 12, xp: 16, gold: 8, shape: 'blob', color: '#9ad0f0', bubble: true },
  virus:     { name: 'Vírus',               hp: 30, spd: 120, dmg: 15, ai: 'swarm',  r: 11, xp: 17, gold: 6, shape: 'blob', color: '#7ac043', spikes: true },
  bot:       { name: 'Bot de Desinformação',hp: 42, spd: 92,  dmg: 16, ai: 'ranged', r: 13, xp: 18, gold: 7, shape: 'blob', color: '#506070', screen: true, proj: '#f04070' },
  lama:      { name: 'Lama da DANA',        hp: 95, spd: 60,  dmg: 18, ai: 'melee',  r: 19, xp: 21, gold: 6, shape: 'blob', color: '#6a5030' },
  recessao:  { name: 'A Grande Recessão',   hp: 2000, spd: 85, dmg: 22, r: 32, xp: 500, gold: 220, shape: 'blob', boss: true, color: '#3a5a8a', eye: '#e0b020', patterns: ['summon', 'burst', 'slam', 'spray'], summon: 'bolha', proj: '#e0b020' },
  polarizacao:{ name: 'A Polarização',      hp: 2600, spd: 100, dmg: 25, r: 32, xp: 700, gold: 300, shape: 'blob', boss: true, color: '#6a2a6a', eye: '#fff', split: true, patterns: ['burst', 'summon', 'spray', 'charge', 'slam', 'burst'], summon: 'bot', proj: '#f04070' }
};
