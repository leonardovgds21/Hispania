// Capítulos 6–10: de El Cid à proclamação da Segunda República.
'use strict';

// ======================= CAPÍTULO 6 =======================
CHAPTERS.push({
  id: 'c6', num: 6, title: 'El Cid e a Fronteira', years: '1031 – 1248', cls: 'cavaleiro', seed: 6606, currency: 'maravedís',
  biome: { ground: '#b8a85a', ground2: '#b0a052', path: '#8a7a54', water: '#3a6a8a', floor: '#a8987a', roof: '#9a4a2a', wall: '#9a4a2a',
    obs: ['dry', 'rock', 'olive', 'tree'], density: 0.42, sea: 'east', flowers: '#c83a2a' },
  intro: [
    'Com o fim do Califado em 1031, Al-Andalus se partiu em dezenas de reinos de taifas. Ricos, mas fracos, muitos passaram a pagar "párias", tributos em ouro, aos reis cristãos em troca de proteção.',
    'Nessa fronteira de guerras, alianças e comércio surgiu o cavaleiro mais famoso da Espanha medieval: Rodrigo Díaz de Vivar, chamado de "Cid" (do árabe sayyid, "senhor").',
    'Ano 1081. Você é {nome}, cavaleiro de Castela e vassalo do Cid. O rei Alfonso VI acaba de expulsá-lo do reino.'
  ],
  outro: [
    'A vitória de Las Navas de Tolosa (1212) abriu o caminho do sul. Fernando III conquistou Córdoba em 1236 e Sevilha em 1248. Jaime I de Aragão tomou Maiorca (1229) e Valência (1238).',
    'Apenas o Reino Nasrida de Granada sobreviveu, pagando tributos a Castela. Ele duraria ainda mais dois séculos e meio.',
    'O rei Alfonso X, o Sábio, fez do castelhano uma língua de ciência e de leis. As escolas de tradutores de Toledo espalharam pela Europa a ciência árabe e grega.'
  ],
  places: [
    { id: 'vivar', name: 'Vivar', x: 14, y: 22, r: 7, type: 'village', icon: 'castle' },
    { id: 'estrada', name: 'Caminho do Desterro', x: 34, y: 38, r: 6, type: 'camp' },
    { id: 'toledo', name: 'Toledo', x: 22, y: 64, r: 8, type: 'village', icon: 'church' },
    { id: 'serra', name: 'Serra Morena', x: 58, y: 22, r: 7, type: 'camp' },
    { id: 'cerco', name: 'Arredores de Valência', x: 64, y: 62, r: 7, type: 'camp', icon: 'tent' },
    { id: 'valencia', name: 'Valência', x: 88, y: 56, r: 8, type: 'village', icon: 'mosque' },
    { id: 'navas', name: 'Las Navas de Tolosa', x: 86, y: 16, r: 8, type: 'arena', icon: 'tent' }
  ],
  npcs: [
    { id: 'cid', name: 'Rodrigo Díaz, o Cid', at: 'vivar', dx: 2, dy: 1, look: Object.assign({}, LOOK.knight, { cape: '#8a1a1a' }), lines: ['Deus, que bom vassalo, se tivesse um bom senhor!', 'Babieca é o melhor cavalo de Castela.'] },
    { id: 'jogral', name: 'Jogral Per Abbat', at: 'vivar', dx: -3, dy: 2, look: LOOK.painter, lines: ['Canto as façanhas dos cavaleiros de praça em praça.'] },
    { id: 'peregrino', name: 'Peregrino Aimeric', at: 'vivar', dx: 1, dy: -3, look: LOOK.monk, lines: ['Vim da França a pé. Ainda faltam semanas até Compostela.'] },
    { id: 'tradutor', name: 'Gerardo de Cremona', at: 'toledo', dx: 2, dy: 1, look: LOOK.monk, lines: ['Vim da Itália só para aprender árabe e traduzir Ptolomeu.'] },
    { id: 'ezra', name: 'Abraão ibn Ezra', at: 'toledo', dx: -2, dy: 2, look: Object.assign({}, LOOK.arab, { body: '#3a4a7a' }), lines: ['Poeta, astrônomo, viajante... em Toledo todo saber é bem-vindo.'] },
    { id: 'alfonso8', name: 'Rei Alfonso VIII', at: 'toledo', dx: 0, dy: -3, look: LOOK.noble, lines: ['Todos os reinos cristãos se reuniram em Toledo. Isso nunca aconteceu antes.'] },
    { id: 'merc6', name: 'Mercador Isaac', at: 'toledo', dx: 3, dy: 3, shop: true, look: LOOK.trader, lines: ['Pagamos em maravedís, a moeda de ouro que até os cristãos copiaram.'] },
    { id: 'jimena', name: 'Dona Jimena', at: 'valencia', dx: -2, dy: 1, look: LOOK.queen, lines: ['Valência agora é nossa. Mas por quanto tempo?'] }
  ],
  camps: [{ at: 'estrada', type: 'lobo', n: 2 }],
  codex: [
    { id: 'taifa', at: 'estrada', title: 'Taifas e párias', text: 'Depois de 1031, Al-Andalus se fragmentou em reinos de taifas (Sevilha, Toledo, Zaragoza, Badajoz, Granada...). Culturalmente brilhantes, mas militarmente fracos, muitos pagavam "párias" — tributos anuais em ouro — aos reis de Castela, Leão e Aragão.' },
    { id: 'tol85', at: 'toledo', title: 'A conquista de Toledo (1085)', text: 'Em 1085, Alfonso VI de Leão e Castela tomou Toledo, a antiga capital visigoda. Foi um marco: pela primeira vez uma grande cidade de Al-Andalus passava ao domínio cristão. Assustadas, as taifas pediram ajuda aos almorávidas do norte da África.' },
    { id: 'trad', at: 'toledo', title: 'A Escola de Tradutores', text: 'Nos séculos XII e XIII, em Toledo, sábios judeus, muçulmanos e cristãos traduziram do árabe para o latim (e depois para o castelhano) obras de Aristóteles, Ptolomeu, Avicena e Averróis. Por esse caminho, boa parte da ciência antiga voltou à Europa.' },
    { id: 'cid', at: 'valencia', title: 'O Cid Campeador', text: 'Rodrigo Díaz de Vivar (c. 1048–1099) foi desterrado duas vezes por Alfonso VI. Lutou ao lado de reis cristãos e muçulmanos e, em 1094, conquistou Valência, onde governou até morrer. Sua vida inspirou o "Cantar de mio Cid", o grande poema épico em castelhano. Sua mulher, Jimena, defendeu Valência até 1102.' },
    { id: 'almor', at: 'cerco', title: 'Almorávidas e almóadas', text: 'Os almorávidas, vindos do Saara, venceram Alfonso VI em Sagrajas (1086) e unificaram Al-Andalus. No século XII foram substituídos pelos almóadas, que fizeram de Sevilha a sua capital e ergueram a Giralda, o antigo minarete da grande mesquita.' },
    { id: 'navas', at: 'navas', title: 'Las Navas de Tolosa (1212)', text: 'Em 16 de julho de 1212, os reis de Castela, Aragão e Navarra derrotaram o califa almóada Muhammad al-Nasir. Segundo a tradição, Sancho VII de Navarra rompeu as correntes que protegiam a tenda do califa — elas estariam até hoje no escudo de Navarra.' },
    { id: 'fern3', at: 'serra', title: 'Fernando III e Alfonso X', text: 'Fernando III conquistou Córdoba (1236) e Sevilha (1248). Seu filho Alfonso X, o Sábio, impulsionou o castelhano como língua de cultura, mandou compor as Cantigas de Santa Maria, as Tábuas Afonsinas de astronomia e o código das Sete Partidas.' }
  ],
  quests: [
    { id: 'main', title: 'O Cantar do Cavaleiro', reward: { xp: 220, gold: 80, potions: 2 }, steps: [
      { t: 'talk', npc: 'cid', desc: 'Fale com o Cid em Vivar', say: [
        ['cid', '{nome}, o rei Alfonso me desterrou. Temos nove dias para deixar Castela.'],
        ['cid', 'Quem me for leal virá comigo. Bandidos infestam o caminho. Abra passagem para a nossa mesnada!']] },
      { t: 'kill', e: 'bandido', n: 6, at: 'estrada', desc: 'Derrote 6 bandidos no Caminho do Desterro' },
      { t: 'goto', at: 'toledo', desc: 'Siga até Toledo', say: [['N', 'Os anos passam. Em 1085, Alfonso VI conquista Toledo, a velha capital dos godos. A cidade fervilha de sábios de três religiões.']] },
      { t: 'talk', npc: 'tradutor', desc: 'Fale com o tradutor Gerardo de Cremona', say: [
        ['tradutor', 'Aqui traduzimos do árabe para o latim tudo o que os antigos sabiam: astronomia, medicina, matemática...'],
        ['tradutor', 'Uma caravana foi atacada e perdeu manuscritos árabes pela cidade. Você me ajudaria a recuperá-los?']] },
      { t: 'collect', item: 'Manuscrito árabe', icon: '📜', n: 5, at: 'toledo', desc: 'Recupere 5 manuscritos árabes em Toledo' },
      { t: 'talk', npc: 'tradutor', desc: 'Entregue os manuscritos', say: [
        ['tradutor', 'O Almagesto de Ptolomeu! Graças a você, a Europa vai voltar a estudar as estrelas.'],
        ['tradutor', 'Ouvi dizer que o seu senhor, o Cid, cerca Valência. Os almorávidas marcham para enfrentá-lo.']] },
      { t: 'kill', e: 'almoravida', n: 8, at: 'cerco', desc: 'Derrote 8 guerreiros almorávidas perto de Valência', done: [['N', 'Em 1094 o Cid conquistou Valência e derrotou o exército almorávida em Cuarte.']] },
      { t: 'talk', npc: 'jimena', desc: 'Fale com Dona Jimena em Valência', say: [
        ['jimena', 'Rodrigo morreu em 1099. Dizem que o amarramos morto sobre Babieca para assustar o inimigo... é só uma lenda, mas o povo adora contá-la.'],
        ['jimena', 'Defendi Valência por três anos. Agora, em 1102, vamos voltar a Castela e levar o corpo dele para San Pedro de Cardeña.'],
        ['N', 'Passou mais de um século. Ano 1212. Um descendente seu, também chamado {nome}, é chamado a Toledo.']] },
      { t: 'talk', npc: 'alfonso8', desc: 'Apresente-se ao rei Alfonso VIII em Toledo', say: [
        ['alfonso8', 'Os almóadas nos derrotaram em Alarcos, há dezessete anos. Agora Castela, Aragão e Navarra marcham juntos.'],
        ['alfonso8', 'Os passos da Serra Morena estão tomados por arqueiros e cavaleiros almóadas. Abra caminho!']] },
      { t: 'kill', e: 'almoada_arq', n: 5, at: 'serra', desc: 'Derrote 5 arqueiros almóadas na Serra Morena' },
      { t: 'kill', e: 'almoada_cav', n: 4, at: 'serra', desc: 'Derrote 4 cavaleiros almóadas na Serra Morena', done: [['N', 'Um pastor mostrou ao exército uma passagem secreta pela serra. O caminho para Las Navas está aberto.']] },
      { t: 'boss', e: 'correntes', at: 'navas', desc: 'Rompa a Guarda das Correntes em Las Navas de Tolosa', intro: [['N', 'Diante da tenda do califa, uma guarda acorrentada forma uma muralha viva.']] },
      { t: 'talk', npc: 'alfonso8', desc: 'Volte a Toledo e fale com Alfonso VIII', say: [
        ['alfonso8', 'Vitória! As correntes foram rompidas, e o caminho para o sul está aberto.'],
        ['alfonso8', 'Meus netos verão Córdoba e Sevilha voltarem a ser cristãs. Vá com Deus, {nome}.']] }
    ] },
    { id: 's1', title: 'A Concha do Peregrino', reward: { xp: 130, gold: 90 }, steps: [
      { t: 'talk', npc: 'peregrino', desc: 'Fale com o peregrino Aimeric', say: [['peregrino', 'Os bandidos levaram as conchas de vieira que eu levava para os meus irmãos peregrinos. São cinco.']] },
      { t: 'collect', item: 'Concha de vieira', icon: '🐚', n: 5, at: 'estrada', desc: 'Recupere 5 conchas de vieira no Caminho' },
      { t: 'talk', npc: 'peregrino', desc: 'Devolva as conchas', say: [['peregrino', 'A vieira é o símbolo do Caminho de Santiago. Que o apóstolo proteja você!']] }
    ] },
    { id: 's2', title: 'O Astrolábio', req: 3, reward: { xp: 140, gold: 90, potions: 1 }, steps: [
      { t: 'talk', npc: 'ezra', desc: 'Fale com Abraão ibn Ezra', say: [['ezra', 'Meu astrolábio se desmontou na viagem. Quatro peças caíram na Serra Morena.']] },
      { t: 'collect', item: 'Peça de astrolábio', icon: '⚙️', n: 4, at: 'serra', desc: 'Recolha 4 peças de astrolábio na Serra Morena' },
      { t: 'talk', npc: 'ezra', desc: 'Leve as peças a ibn Ezra', say: [['ezra', 'Com ele medimos a altura das estrelas e sabemos a hora e o lugar. É ciência árabe, grega e judaica numa só peça de bronze.']] }
    ] },
    { id: 's3', title: 'Lobos do Desterro', reward: { xp: 120, gold: 90 }, steps: [
      { t: 'talk', npc: 'jogral', desc: 'Fale com o jogral Per Abbat', say: [['jogral', 'Quer entrar para o meu cantar? Então afaste os lobos do Caminho do Desterro: seis deles!']] },
      { t: 'kill', e: 'lobo', n: 6, at: 'estrada', desc: 'Afaste 6 lobos do Caminho do Desterro' },
      { t: 'talk', npc: 'jogral', desc: 'Volte ao jogral', say: [['jogral', '"Ali vinha {nome}, que em boa hora nasceu..." Pronto, você já está no meu cantar!']] }
    ] },
    { id: 's4', title: 'O Cantar de mio Cid', req: 7, reward: { xp: 160, gold: 100 }, steps: [
      { t: 'talk', npc: 'jogral', desc: 'Fale com o jogral sobre o Cantar', say: [['jogral', 'Um bom cavaleiro conhece as façanhas do seu tempo. Responda-me!']] },
      { t: 'quiz', npc: 'jogral', desc: 'Responda ao jogral', qs: [
        { q: 'Em que ano Alfonso VI conquistou Toledo?', o: ['711', '1085', '1212', '1492'], a: 1 },
        { q: 'Que cidade o Cid conquistou em 1094?', o: ['Valência', 'Granada', 'Sevilha', 'Zaragoza'], a: 0 },
        { q: 'Como se chamava o cavalo do Cid?', o: ['Rocinante', 'Babieca', 'Bucéfalo', 'Marengo'], a: 1 }
      ] }
    ] }
  ]
});

// ======================= CAPÍTULO 7 =======================
CHAPTERS.push({
  id: 'c7', num: 7, title: 'Os Reis Católicos', years: '1469 – 1516', cls: 'espingardeiro', seed: 7707, currency: 'maravedís',
  biome: { ground: '#9aa055', ground2: '#92984d', path: '#a08a5a', water: '#2f6a9a', floor: '#d8c8a0', roof: '#b85a3a', wall: '#b85a3a',
    obs: ['olive', 'cypress', 'rock', 'palm'], density: 0.45, sea: 'south', flowers: '#f0f0f0' },
  intro: [
    'Em 1469, Isabel, herdeira de Castela, casou-se em segredo com Fernando, herdeiro de Aragão. Seus reinos continuaram separados, com leis próprias, mas passaram a ter os mesmos reis.',
    'Em 1482 começou a Guerra de Granada contra o último reino muçulmano da Península. Foi uma guerra nova: artilharia, pólvora e soldados armados de espingardas.',
    'Você é {nome}, espingardeiro a serviço de um jovem capitão chamado Gonzalo Fernández de Córdoba.'
  ],
  outro: [
    'O ano de 1492 mudou tudo: Granada se rendeu em 2 de janeiro; em março, os judeus que não se convertessem foram expulsos; em agosto, Colombo partiu de Palos; e Nebrija publicou a primeira gramática do castelhano.',
    'Em 1494, o Tratado de Tordesilhas dividiu o mundo entre Castela e Portugal — e foi por causa dessa linha que o Brasil acabou sendo português.',
    'Gonzalo, o "Gran Capitán", venceu os franceses na Itália (Ceriñola, 1503), em uma das primeiras batalhas decididas por armas de fogo. A arte da guerra nunca mais seria a mesma, e a linhagem de {nome} mudou com ela.'
  ],
  places: [
    { id: 'santafe', name: 'Acampamento de Santa Fé', x: 16, y: 30, r: 8, type: 'village', icon: 'tent' },
    { id: 'loja', name: 'Fronteira de Loja', x: 36, y: 12, r: 7, type: 'camp', icon: 'castle' },
    { id: 'malaga', name: 'Muralhas de Málaga', x: 38, y: 56, r: 8, type: 'arena' },
    { id: 'vega', name: 'Veiga de Granada', x: 62, y: 34, r: 7, type: 'camp' },
    { id: 'alhambra', name: 'Alhambra', x: 88, y: 20, r: 8, type: 'village', icon: 'palace' },
    { id: 'palos', name: 'Porto de Palos', x: 80, y: 60, r: 7, type: 'village', icon: 'ship' }
  ],
  npcs: [
    { id: 'gonzalo', name: 'Gonzalo Fernández de Córdoba', at: 'santafe', dx: 2, dy: 1, look: Object.assign({}, LOOK.knight, { cross: null, body: '#8a6a2a', cape: '#5a1a1a' }), lines: ['Uma espingarda bem usada vale mais que dez lanças.'] },
    { id: 'isabel', name: 'Rainha Isabel I', at: 'santafe', dx: -1, dy: -3, look: LOOK.queen, lines: ['Tanto monta, monta tanto, Isabel como Fernando.'] },
    { id: 'fernando', name: 'Rei Fernando II', at: 'santafe', dx: 1, dy: -3, look: LOOK.noble, lines: ['Aragão olha para o Mediterrâneo; Castela, para o oceano.'] },
    { id: 'nebrija', name: 'Antonio de Nebrija', at: 'santafe', dx: -3, dy: 2, look: LOOK.monk, lines: ['A língua sempre foi companheira do império.'] },
    { id: 'merc7', name: 'Vivandeira Leonor', at: 'santafe', dx: 3, dy: 3, shop: true, look: LOOK.woman, lines: ['Pólvora, pão e remédios para quem pode pagar!'] },
    { id: 'boabdil', name: 'Boabdil, rei de Granada', at: 'alhambra', dx: 0, dy: 2, look: Object.assign({}, LOOK.arab, { cape: '#7a2a5a' }), lines: ['Este palácio levou dois séculos para ficar assim.'] },
    { id: 'colombo', name: 'Cristóvão Colombo', at: 'palos', dx: 2, dy: 1, look: Object.assign({}, LOOK.noble, { body: '#3a3a6a', hat: 'cap', hatColor: '#3a3a6a' }), lines: ['A Terra é redonda. Navegando para o oeste, chegarei às Índias!'] },
    { id: 'pinzon', name: 'Martín Alonso Pinzón', at: 'palos', dx: -3, dy: 1, look: LOOK.worker, lines: ['Sem os marinheiros de Palos, o genovês não iria a lugar nenhum.'] },
    { id: 'abravanel', name: 'Isaac Abravanel', at: 'palos', dx: 0, dy: 3, look: Object.assign({}, LOOK.arab, { body: '#2a2a4a', hat: 'beret', hatColor: '#2a2a4a' }), lines: ['Minha família vive em Sefarad há séculos.'] }
  ],
  camps: [],
  codex: [
    { id: 'boda', at: 'santafe', title: 'O casamento de 1469', text: 'Isabel de Castela e Fernando de Aragão se casaram em Valladolid, em 1469. Isabel foi proclamada rainha em 1474, após uma guerra de sucessão, e Fernando herdou Aragão em 1479. Os dois reinos mantiveram leis e instituições próprias, mas a união dinástica é vista como o início da Espanha moderna.' },
    { id: 'gran', at: 'loja', title: 'A Guerra de Granada', text: 'Entre 1482 e 1492, Castela conquistou o Reino Nasrida de Granada cidade por cidade: Ronda, Loja, Málaga (1487, após um cerco duríssimo), Baza... A artilharia foi decisiva contra as muralhas. Para o cerco final, os reis ergueram uma cidade-acampamento: Santa Fé.' },
    { id: 'capit', at: 'alhambra', title: 'As Capitulações de Granada', text: 'Gonzalo Fernández de Córdoba, que falava árabe, ajudou a negociar a rendição. As Capitulações de 1491 garantiam aos muçulmanos manter religião, leis e costumes. Em 2 de janeiro de 1492, Boabdil entregou as chaves da cidade. As promessas, porém, não foram cumpridas: em 1502 os muçulmanos de Castela foram obrigados a se converter ou partir.' },
    { id: 'colon', at: 'palos', title: 'Colombo e 1492', text: 'Em 3 de agosto de 1492, Colombo partiu do porto de Palos com a Pinta, a Niña e a Santa María, com marinheiros da região, como os irmãos Pinzón. Em 12 de outubro, chegou a uma ilha das Bahamas. Ele morreu em 1506 acreditando ter chegado à Ásia.' },
    { id: 'sefar', at: 'palos', title: 'A expulsão de 1492', text: 'Pelo Decreto de Alhambra (31 de março de 1492), os judeus de Castela e Aragão tiveram de escolher entre a conversão e o exílio. Dezenas de milhares partiram para Portugal, Norte da África, Itália e o Império Otomano. Seus descendentes, os sefarditas, conservaram por séculos o judeu-espanhol (ladino). Em 2015, a Espanha aprovou uma lei para facilitar a nacionalidade a descendentes de sefarditas.' },
    { id: 'tord', at: 'malaga', title: 'O Tratado de Tordesilhas', text: 'Em 1494, em Tordesilhas, Castela e Portugal dividiram as terras a descobrir por uma linha a 370 léguas a oeste de Cabo Verde: o lado oeste para Castela, o leste para Portugal. Por isso, o leste da América do Sul — o futuro Brasil — ficou com os portugueses.' },
    { id: 'ceri', at: 'vega', title: 'O Gran Capitán', text: 'Nas guerras da Itália, Gonzalo Fernández de Córdoba combinou piqueiros, espadachins e arcabuzeiros em formações flexíveis. Em Ceriñola (1503), seus atiradores entrincheirados derrotaram a cavalaria francesa — uma das primeiras grandes batalhas da Europa decididas por armas de fogo. Ali nasceu o modelo dos futuros "tercios".' }
  ],
  quests: [
    { id: 'main', title: 'A Chave de Granada', reward: { xp: 240, gold: 90, potions: 2 }, steps: [
      { t: 'talk', npc: 'gonzalo', desc: 'Fale com o capitão Gonzalo', say: [
        ['gonzalo', 'Esta é a guerra da pólvora, {nome}. Mire bem: a sua espingarda dispara uma vez e precisa ser recarregada (tecla R).'],
        ['gonzalo', 'A fronteira de Loja está cheia de soldados nasridas e de ginetes, a cavalaria leve deles. Vamos!']] },
      { t: 'kill', e: 'nazari', n: 6, at: 'loja', desc: 'Derrote 6 soldados nasridas em Loja' },
      { t: 'kill', e: 'ginete', n: 4, at: 'loja', desc: 'Derrote 4 ginetes em Loja' },
      { t: 'talk', npc: 'fernando', desc: 'Informe o rei Fernando', say: [
        ['fernando', 'Loja caiu. Agora Málaga, o grande porto do reino de Granada. Ano de 1487.'],
        ['fernando', 'O bastião das muralhas dispara canhões contra o nosso acampamento. Destrua-o!']] },
      { t: 'boss', e: 'bastiao', at: 'malaga', desc: 'Destrua o Bastião de Málaga', intro: [['N', 'O bastião desperta com um trovão de canhões!']], done: [['N', 'Málaga se rendeu após quatro meses de cerco. A punição dos seus habitantes foi terrível.']] },
      { t: 'talk', npc: 'isabel', desc: 'Fale com a rainha Isabel', say: [
        ['isabel', 'Construímos Santa Fé, uma cidade inteira de pedra, para mostrar a Granada que não iremos embora.'],
        ['isabel', 'Os besteiros nasridas ainda atacam na Veiga. Afaste-os e Granada ficará isolada.']] },
      { t: 'kill', e: 'besteiro', n: 6, at: 'vega', desc: 'Derrote 6 besteiros na Veiga de Granada' },
      { t: 'talk', npc: 'gonzalo', desc: 'Volte a Gonzalo', say: [
        ['gonzalo', 'Eu falo árabe e venho negociando em segredo com os conselheiros de Boabdil. Ninguém quer mais sangue.'],
        ['gonzalo', 'As Capitulações estão assinadas. Leve esta escolta até a Alhambra.']] },
      { t: 'talk', npc: 'boabdil', desc: 'Encontre Boabdil na Alhambra', say: [
        ['N', '2 de janeiro de 1492.'],
        ['boabdil', 'Estas são as chaves da cidade. Que os reis cumpram o que prometeram ao meu povo.'],
        ['N', 'Diz a lenda que, ao olhar Granada pela última vez, Boabdil suspirou — e sua mãe lhe disse que chorava como mulher o que não soube defender como homem. O lugar ainda se chama "o Suspiro do Mouro".']] },
      { t: 'goto', at: 'palos', desc: 'Viaje até o Porto de Palos', say: [['N', 'Agosto de 1492. No porto de Palos, três navios se preparam para uma viagem que ninguém sabe onde vai terminar.']] },
      { t: 'talk', npc: 'colombo', desc: 'Fale com Cristóvão Colombo', say: [
        ['colombo', 'A rainha financiou a minha viagem! Navegando para o oeste, chegarei às Índias.'],
        ['colombo', 'Você não quer vir? Não? Pois um dia contarão que estive em terras que ninguém em Castela imaginava.'],
        ['N', 'Em 12 de outubro de 1492, Colombo chegou à América. Ele nunca admitiu que era um continente novo.']] }
    ] },
    { id: 's1', title: 'A Primeira Gramática', req: 5, reward: { xp: 170, gold: 110 }, steps: [
      { t: 'talk', npc: 'nebrija', desc: 'Fale com Antonio de Nebrija', say: [['nebrija', 'Estou terminando a primeira gramática da língua castelhana. Mas antes, um teste para você.']] },
      { t: 'quiz', npc: 'nebrija', desc: 'Responda a Nebrija', qs: [
        { q: 'Em que ano caiu Granada, o último reino muçulmano da Península?', o: ['1469', '1492', '1516', '1588'], a: 1 },
        { q: 'Que tratado dividiu as novas terras entre Castela e Portugal em 1494?', o: ['Utrecht', 'Tordesilhas', 'Westfália', 'Zamora'], a: 1 },
        { q: 'De que porto Colombo partiu em agosto de 1492?', o: ['Barcelona', 'Lisboa', 'Palos', 'Gênova'], a: 2 }
      ] }
    ] },
    { id: 's2', title: 'O Exílio Sefardita', req: 8, reward: { xp: 160, gold: 100, potions: 1 }, steps: [
      { t: 'talk', npc: 'abravanel', desc: 'Fale com Isaac Abravanel', say: [
        ['abravanel', 'Servi aos reis como financista. Mesmo assim, o decreto nos obriga a partir até o fim de julho.'],
        ['abravanel', 'Famílias deixaram seus pertences espalhados pelo porto. Ajude-as a reunir cinco trouxas.']] },
      { t: 'collect', item: 'Trouxa de pertences', icon: '🎒', n: 5, at: 'palos', desc: 'Reúna 5 trouxas de pertences no porto' },
      { t: 'talk', npc: 'abravanel', desc: 'Volte a Abravanel', say: [
        ['abravanel', 'Muitos levam a chave de casa, esperando voltar um dia. Nossos netos ainda falarão o castelhano de Sefarad.'],
        ['N', 'Isaac Abravanel partiu para Nápoles e depois para Veneza, onde morreu em 1508.']] }
    ] },
    { id: 's3', title: 'Água para as Caravelas', req: 8, reward: { xp: 150, gold: 110 }, steps: [
      { t: 'talk', npc: 'pinzon', desc: 'Fale com Martín Alonso Pinzón', say: [['pinzon', 'Precisamos de água doce para meses de viagem. Os barris ficaram na Veiga. Traga seis!']] },
      { t: 'collect', item: 'Barril de água', icon: '🛢️', n: 6, at: 'vega', desc: 'Traga 6 barris de água da Veiga' },
      { t: 'talk', npc: 'pinzon', desc: 'Entregue os barris a Pinzón', say: [['pinzon', 'Eu comando a Pinta, meu irmão Vicente Yáñez, a Niña. Agora estamos prontos!']] }
    ] },
    { id: 's4', title: 'Os Estandartes de Loja', req: 3, reward: { xp: 150, gold: 100 }, steps: [
      { t: 'talk', npc: 'fernando', desc: 'Fale com o rei Fernando', say: [['fernando', 'Perdemos quatro estandartes na fronteira de Loja. Recupere-os!']] },
      { t: 'collect', item: 'Estandarte', icon: '🚩', n: 4, at: 'loja', desc: 'Recupere 4 estandartes em Loja' },
      { t: 'talk', npc: 'fernando', desc: 'Devolva os estandartes', say: [['fernando', 'Bom trabalho, soldado. Isso merece uma recompensa.']] }
    ] }
  ]
});

// ======================= CAPÍTULO 8 =======================
CHAPTERS.push({
  id: 'c8', num: 8, title: 'O Século de Ouro', years: '1516 – 1700', cls: 'tercio', seed: 8808, currency: 'reales',
  biome: { ground: '#7f9a4a', ground2: '#78924a', path: '#9a8a6a', water: '#2f6a9a', floor: '#c8b898', roof: '#a84a2a', wall: '#a84a2a',
    obs: ['olive', 'cypress', 'rock', 'tree'], density: 0.45, sea: 'south' },
  intro: [
    'Em 1516, o neto dos Reis Católicos, Carlos de Habsburgo, herdou Castela, Aragão, os Países Baixos, Nápoles e as terras da América. Em 1519 virou também imperador do Sacro Império: Carlos I da Espanha e V da Alemanha.',
    'Era o império "onde o sol nunca se põe". A prata da América enchia Sevilha, e os tercios espanhóis eram a infantaria mais temida da Europa.',
    'Ano de 1570. Você é {nome}, arcabuzeiro de um tercio, em Madri — a cidade que Felipe II escolheu como capital em 1561.'
  ],
  outro: [
    'Em 1588, a "Grande Armada" de Felipe II tentou invadir a Inglaterra e fracassou, castigada por tempestades e pela frota inglesa.',
    'O século XVII trouxe crise: guerras sem fim, epidemias, a independência de Portugal (1640) e a derrota de Rocroi (1643). Mas foi também o Século de Ouro das artes: Cervantes, Lope de Vega, Calderón, Quevedo, Velázquez, Murillo e Zurbarán.',
    'Em 1700 morreu Carlos II, o último Habsburgo espanhol, sem filhos. Seu testamento deixou o trono a um neto do rei da França, Luís XIV. A Europa inteira entrou em guerra por isso.'
  ],
  places: [
    { id: 'madrid', name: 'Madri', x: 18, y: 26, r: 8, type: 'village', icon: 'palace' },
    { id: 'escorial', name: 'El Escorial', x: 42, y: 12, r: 6, type: 'ruin', icon: 'church' },
    { id: 'costa', name: 'Costa Mediterrânea', x: 30, y: 58, r: 7, type: 'camp' },
    { id: 'sevilha', name: 'Sevilha', x: 60, y: 40, r: 8, type: 'village', icon: 'ship' },
    { id: 'frota', name: 'Frota Otomana', x: 78, y: 60, r: 7, type: 'camp', icon: 'ship' },
    { id: 'lepanto', name: 'Golfo de Lepanto', x: 96, y: 40, r: 8, type: 'arena', icon: 'ship' }
  ],
  npcs: [
    { id: 'sargento8', name: 'Sargento Alonso de Contreras', at: 'madrid', dx: 2, dy: 1, look: Object.assign({}, LOOK.roman, { body: '#c23b22', hat: 'morion', hatColor: '#b8c0c8', cape: null, weapon: 'gun' }), lines: ['Um tercio tem piqueiros, arcabuzeiros e mosqueteiros. Somos uma muralha que anda.'] },
    { id: 'velazquez', name: 'Diego Velázquez', at: 'madrid', dx: -3, dy: 1, look: Object.assign({}, LOOK.noble, { body: '#1a1a1a', hat: 'none', cape: null }), lines: ['Pinto o que vejo, não o que esperam que eu veja.'] },
    { id: 'lope', name: 'Lope de Vega', at: 'madrid', dx: -1, dy: 3, look: Object.assign({}, LOOK.toga, { body: '#2a2a2a' }), lines: ['Já escrevi centenas de comédias. Talvez mil!'] },
    { id: 'merc8', name: 'Estalagem do Galo', at: 'madrid', dx: 3, dy: 3, shop: true, look: LOOK.trader, lines: ['Vinho, pão e poções. Pague em reales, por favor.'] },
    { id: 'herrera', name: 'Juan de Herrera', at: 'escorial', dx: 1, dy: 2, look: LOOK.worker, lines: ['O rei quer um mosteiro, um palácio e um panteão num só edifício. Simples, não?'] },
    { id: 'cervantes', name: 'Miguel de Cervantes', at: 'sevilha', dx: 2, dy: 1, look: Object.assign({}, LOOK.roman, { body: '#6a4a2a', hat: 'morion', hatColor: '#999', cape: null, weapon: 'sword' }), lines: ['Quem lê muito e anda muito, vê muito e sabe muito.'] },
    { id: 'elcano', name: 'Juan Sebastián Elcano', at: 'sevilha', dx: -3, dy: 1, look: Object.assign({}, LOOK.worker, { body: '#2a3a6a' }), lines: ['Fui o primeiro a dar a volta ao mundo. Bem, eu e mais dezessete.'] },
    { id: 'contratacao', name: 'Oficial da Casa de Contratação', at: 'sevilha', dx: 0, dy: -3, look: LOOK.noble, lines: ['Todo navio que vai ou volta das Índias passa por aqui.'] }
  ],
  camps: [],
  codex: [
    { id: 'carlos', at: 'madrid', title: 'Carlos I e o império', text: 'Carlos I (1516–1556) reuniu a herança de quatro dinastias: Castela, Aragão, Borgonha e Habsburgo. Durante o seu reinado, Hernán Cortés conquistou o Império Asteca (1521) e Francisco Pizarro, o Inca (1532). Cansado, abdicou em 1556 e se retirou ao mosteiro de Yuste.' },
    { id: 'comun', at: 'escorial', title: 'Os Comuneros (1520–1521)', text: 'Pouco depois da chegada de Carlos I, várias cidades de Castela se revoltaram contra os impostos e os conselheiros estrangeiros. Os comuneros foram derrotados em Villalar (1521), e seus líderes Padilla, Bravo e Maldonado foram executados. A data, 23 de abril, é hoje o dia de Castela e Leão.' },
    { id: 'elcano', at: 'sevilha', title: 'A primeira volta ao mundo', text: 'Em 1519, Fernão de Magalhães partiu de Sevilha com cinco navios a serviço da Espanha. Ele morreu nas Filipinas em 1521. Juan Sebastián Elcano assumiu o comando e voltou a Sevilha em 1522 com um único navio, a Victoria, e apenas 18 sobreviventes: a primeira volta ao mundo.' },
    { id: 'felipe', at: 'escorial', title: 'Felipe II e El Escorial', text: 'Felipe II (1556–1598) governou o maior império do mundo, que a partir de 1580 incluiu Portugal e o Brasil (a União Ibérica, até 1640). Mandou erguer El Escorial (1563–1584), mosteiro, palácio e panteão real, projetado por Juan Bautista de Toledo e concluído por Juan de Herrera.' },
    { id: 'lepanto', at: 'lepanto', title: 'Lepanto (1571)', text: 'Em 7 de outubro de 1571, a Santa Liga — Espanha, Veneza e o papado —, comandada por Dom João da Áustria, venceu a frota otomana em Lepanto, na Grécia. Foi uma das maiores batalhas navais da história. Miguel de Cervantes lutou nela e perdeu os movimentos da mão esquerda.' },
    { id: 'armada', at: 'costa', title: 'A Grande Armada (1588)', text: 'Em 1588, Felipe II enviou cerca de 130 navios para invadir a Inglaterra de Isabel I. A frota foi atacada no Canal da Mancha e dispersada por tempestades ao contornar a Escócia e a Irlanda. Os ingleses a apelidaram de "Armada Invencível" com ironia.' },
    { id: 'ouro', at: 'madrid', title: 'O Século de Ouro', text: 'Entre os séculos XVI e XVII, a Espanha viveu um auge artístico. Dom Quixote (1605 e 1615), de Cervantes, é considerado o primeiro romance moderno. Lope de Vega revolucionou o teatro, Calderón escreveu "A vida é sonho", e Velázquez pintou "As Meninas" (1656), hoje no Museu do Prado.' }
  ],
  quests: [
    { id: 'main', title: 'Onde o Sol Nunca se Põe', reward: { xp: 260, gold: 100, potions: 2 }, steps: [
      { t: 'talk', npc: 'sargento8', desc: 'Apresente-se ao Sargento Contreras em Madri', say: [
        ['sargento8', 'Arcabuzeiro {nome}! O rei Felipe II não para de construir. Vá ao Escorial: o mestre Herrera quer escolta para as suas carroças.']] },
      { t: 'talk', npc: 'herrera', desc: 'Fale com Juan de Herrera em El Escorial', say: [
        ['herrera', 'As obras vão bem: um mosteiro, um palácio, uma biblioteca e o panteão dos reis.'],
        ['herrera', 'Mas os corsários berberescos voltaram a atacar a costa e roubar gente para vender como escravos em Argel. O rei quer a costa limpa.']] },
      { t: 'kill', e: 'corsario', n: 8, at: 'costa', desc: 'Expulse 8 corsários da costa' },
      { t: 'talk', npc: 'cervantes', desc: 'Fale com o soldado Cervantes em Sevilha', say: [
        ['cervantes', 'Miguel de Cervantes, soldado como você. Também escrevo uns versos, mas não conte a ninguém.'],
        ['cervantes', 'A Santa Liga está reunindo uma frota contra os otomanos. Vamos juntos? Primeiro, os janízaros desembarcaram a leste!']] },
      { t: 'kill', e: 'janizaro', n: 6, at: 'frota', desc: 'Derrote 6 janízaros arcabuzeiros' },
      { t: 'kill', e: 'corsario', n: 5, at: 'frota', desc: 'Derrote 5 corsários da frota otomana', done: [['N', '7 de outubro de 1571. As frotas se encontram no Golfo de Lepanto.']] },
      { t: 'boss', e: 'comandante', at: 'lepanto', desc: 'Enfrente o Comandante Janízaro em Lepanto', intro: [['N', 'No convés da galé capitânia, o Comandante Janízaro desembainha a espada!']] },
      { t: 'talk', npc: 'cervantes', desc: 'Volte a Sevilha e encontre Cervantes', say: [
        ['cervantes', 'Vencemos! Levei dois tiros no peito e um na mão esquerda. Ela não se mexe mais... "para maior glória da direita", como eu digo.'],
        ['N', 'Na volta, em 1575, Cervantes foi capturado por corsários e passou cinco anos cativo em Argel. Tentou fugir quatro vezes.'],
        ['cervantes', 'Anos depois, aqui em Sevilha, trabalho cobrando impostos... e escrevendo. Volte a Madri, alguém precisa de você.']] },
      { t: 'talk', npc: 'sargento8', desc: 'Volte ao Sargento Contreras em Madri', say: [
        ['N', '1605. A Grande Armada já fracassou (1588), e Felipe II morreu (1598).'],
        ['sargento8', 'Velho amigo! Um editor de Madri perdeu as provas de um livro novo pelas ruas. Algo sobre um fidalgo maluco que luta contra moinhos de vento.']] },
      { t: 'collect', item: 'Página do Quixote', icon: '📄', n: 6, at: 'madrid', desc: 'Recolha 6 páginas do Quixote pelas ruas de Madri' },
      { t: 'talk', npc: 'cervantes', desc: 'Leve as páginas a Cervantes em Sevilha', say: [
        ['cervantes', '"Num lugar da Mancha, de cujo nome não quero me lembrar..." São as minhas páginas! O engenhoso fidalgo Dom Quixote!'],
        ['cervantes', 'Obrigado, velho companheiro de Lepanto. Este livro vai rodar o mundo. Ou, pelo menos, vai me pagar umas dívidas.']] }
    ] },
    { id: 's1', title: 'As Cores de Velázquez', req: 3, reward: { xp: 170, gold: 120 }, steps: [
      { t: 'talk', npc: 'velazquez', desc: 'Fale com Diego Velázquez', say: [
        ['N', 'Décadas depois, por volta de 1656...'],
        ['velazquez', 'Estou pintando a infanta Margarida com as suas damas, as "meninas". Faltam cinco pigmentos raros, guardados no Escorial.']] },
      { t: 'collect', item: 'Pigmento', icon: '🎨', n: 5, at: 'escorial', desc: 'Busque 5 pigmentos em El Escorial' },
      { t: 'talk', npc: 'velazquez', desc: 'Leve os pigmentos a Velázquez', say: [['velazquez', 'Vou pintar a mim mesmo no quadro, com o pincel na mão. E os reis aparecerão só num espelho. Ninguém vai entender... e todos vão olhar.']] }
    ] },
    { id: 's2', title: 'A Volta ao Mundo', reward: { xp: 180, gold: 120 }, steps: [
      { t: 'talk', npc: 'elcano', desc: 'Fale com Elcano', say: [['elcano', 'Saímos 239 homens, voltamos 18. Sabe o que aprendi? Que o mundo é enorme. Vamos ver o que você sabe.']] },
      { t: 'quiz', npc: 'elcano', desc: 'Responda a Elcano', qs: [
        { q: 'Quem completou a primeira volta ao mundo em 1522, depois da morte de Magalhães?', o: ['Colombo', 'Elcano', 'Pizarro', 'Cortés'], a: 1 },
        { q: 'Em que batalha de 1571 Cervantes foi ferido?', o: ['Pavia', 'Lepanto', 'Rocroi', 'Trafalgar'], a: 1 },
        { q: 'Que mosteiro-palácio Felipe II mandou construir?', o: ['Alhambra', 'El Escorial', 'Versalhes', 'Palácio Real'], a: 1 }
      ] }
    ] },
    { id: 's3', title: 'A Frota da Prata', reward: { xp: 170, gold: 130, potions: 1 }, steps: [
      { t: 'talk', npc: 'contratacao', desc: 'Fale com o oficial da Casa de Contratação', say: [['contratacao', 'A frota que traz a prata de Potosí está chegando, e há corsários na costa. Abata seis deles!']] },
      { t: 'kill', e: 'corsario', n: 6, at: 'costa', desc: 'Abata 6 corsários na costa' },
      { t: 'talk', npc: 'contratacao', desc: 'Volte à Casa de Contratação', say: [['contratacao', 'A prata chegou. Pena que metade já está devendo a banqueiros genoveses... Tome a sua parte.']] }
    ] },
    { id: 's4', title: 'Comédias de Lope', reward: { xp: 160, gold: 120 }, steps: [
      { t: 'talk', npc: 'lope', desc: 'Fale com Lope de Vega', say: [['lope', 'O vento levou as folhas da minha comédia nova até Sevilha! São cinco. A estreia é amanhã!']] },
      { t: 'collect', item: 'Folha de comédia', icon: '🎭', n: 5, at: 'sevilha', desc: 'Encontre 5 folhas de comédia em Sevilha' },
      { t: 'talk', npc: 'lope', desc: 'Devolva as folhas a Lope', say: [['lope', 'Salvou a estreia! Cervantes me chamou de "monstro da natureza", de tanto que eu escrevo. Acho que foi um elogio.']] }
    ] }
  ]
});

// ======================= CAPÍTULO 9 =======================
CHAPTERS.push({
  id: 'c9', num: 9, title: 'Bourbons e a Guerra da Independência', years: '1700 – 1814', cls: 'guerrilheiro', seed: 9909, currency: 'reales',
  biome: { ground: '#8a9a50', ground2: '#829248', path: '#9a8a60', water: '#2f6a9a', floor: '#c8b898', roof: '#a84a2a', wall: '#a84a2a',
    obs: ['olive', 'tree', 'rock', 'dry'], density: 0.45, sea: 'south' },
  intro: [
    'A Guerra de Sucessão (1701–1714) colocou no trono Felipe V, o primeiro Bourbon. A Espanha perdeu territórios na Europa e Gibraltar passou à Grã-Bretanha.',
    'No século XVIII, reis "ilustrados" como Carlos III modernizaram Madri e o país. Mas em 1808 Napoleão invadiu a Espanha e colocou o próprio irmão, José Bonaparte, no trono.',
    'Madri, 2 de maio de 1808. Você é {nome}. O povo está nas ruas, e o amuleto de osso dos seus ancestrais pesa no seu peito.'
  ],
  outro: [
    'Com a ajuda britânica de Wellington, os espanhóis expulsaram os franceses em 1814. Mas Fernando VII voltou ao trono, aboliu a Constituição de Cádiz e perseguiu os liberais.',
    'O século XIX seria uma luta constante entre absolutistas e liberais, entre tradição e mudança.',
    'Enquanto isso, a América espanhola, aproveitando o caos, começou a sua própria guerra de independência. Um descendente de {nome} vestiria a farda azul do exército.'
  ],
  places: [
    { id: 'madrid', name: 'Madri', x: 16, y: 24, r: 8, type: 'village', icon: 'palace' },
    { id: 'monteleon', name: 'Parque de Monteleón', x: 38, y: 12, r: 6, type: 'camp' },
    { id: 'bailen', name: 'Bailén', x: 38, y: 50, r: 7, type: 'camp', icon: 'windmill' },
    { id: 'zaragoza', name: 'Saragoça', x: 66, y: 18, r: 7, type: 'village', icon: 'church' },
    { id: 'cerco', name: 'Cerco de Saragoça', x: 88, y: 30, r: 7, type: 'camp', icon: 'tent' },
    { id: 'cadiz', name: 'Cádiz', x: 66, y: 58, r: 8, type: 'village', icon: 'ship' },
    { id: 'campo', name: 'Campo de Batalha', x: 96, y: 56, r: 8, type: 'arena' }
  ],
  npcs: [
    { id: 'daoiz', name: 'Capitão Luis Daoíz', at: 'madrid', dx: 2, dy: 1, look: Object.assign({}, LOOK.roman, { body: '#2a3a7a', hat: 'tricorn', hatColor: '#111', cape: null }), lines: ['Um oficial jura defender o seu povo.'] },
    { id: 'goya', name: 'Francisco de Goya', at: 'madrid', dx: -3, dy: 1, look: Object.assign({}, LOOK.toga, { body: '#5a4a3a', hat: 'wide', hatColor: '#222' }), lines: ['Estou ficando surdo, mas meus olhos veem tudo.', 'O sono da razão produz monstros.'] },
    { id: 'clara', name: 'Clara del Rey', at: 'madrid', dx: 0, dy: 3, look: LOOK.woman, lines: ['Ninguém vai levar o nosso infante!'] },
    { id: 'empecinado', name: 'Juan Martín, "El Empecinado"', at: 'madrid', dx: -2, dy: -3, look: Object.assign({}, LOOK.worker, { hat: 'wide', hatColor: '#222', weapon: 'gun' }), lines: ['Guerrilha: pequena guerra. Atacamos e sumimos.'] },
    { id: 'merc9', name: 'Taberneira Manolita', at: 'madrid', dx: 3, dy: 3, shop: true, look: LOOK.woman, lines: ['Em tempos de guerra, as poções sobem de preço. Lamento!'] },
    { id: 'agustina', name: 'Agustina de Aragón', at: 'zaragoza', dx: 1, dy: 2, look: Object.assign({}, LOOK.woman, { body: '#7a2a2a' }), lines: ['Saragoça não se rende!'] },
    { id: 'arguelles', name: 'Deputado Agustín de Argüelles', at: 'cadiz', dx: 2, dy: 1, look: LOOK.noble, lines: ['A nação espanhola é a reunião de todos os espanhóis dos dois hemisférios.'] },
    { id: 'marinheiro', name: 'Velho Marinheiro de Trafalgar', at: 'cadiz', dx: -3, dy: 2, look: LOOK.worker, lines: ['Eu estava no Santísima Trinidad, o maior navio do mundo, quando ele afundou.'] }
  ],
  camps: [],
  codex: [
    { id: 'suc', at: 'madrid', title: 'A Guerra de Sucessão', text: 'Com a morte de Carlos II (1700), Felipe de Bourbon, neto de Luís XIV, foi coroado Felipe V. Áustria, Inglaterra e Holanda apoiaram o arquiduque Carlos, e a guerra se estendeu até 1714. Barcelona caiu em 11 de setembro de 1714 — hoje a Diada, dia nacional da Catalunha. Os Decretos de Nova Planta aboliram as instituições próprias de Aragão, Valência e Catalunha.' },
    { id: 'gib', at: 'cadiz', title: 'Utrecht e Gibraltar', text: 'Pelo Tratado de Utrecht (1713), a Espanha perdeu os Países Baixos, Milão, Nápoles e a Sicília, e cedeu Gibraltar e Menorca à Grã-Bretanha. Menorca voltou à Espanha em 1802. Gibraltar continua britânico até hoje.' },
    { id: 'c3', at: 'monteleon', title: 'Carlos III, o rei "ilustrado"', text: 'Carlos III (1759–1788), conhecido como "o melhor prefeito de Madri", iluminou e limpou as ruas e ergueu a Puerta de Alcalá e o edifício que hoje é o Museu do Prado (inicialmente pensado para as ciências naturais). Expulsou os jesuítas em 1767 e promoveu reformas econômicas.' },
    { id: 'traf', at: 'campo', title: 'Trafalgar (1805)', text: 'Em 21 de outubro de 1805, a esquadra britânica de Nelson destruiu a frota franco-espanhola diante do Cabo Trafalgar, perto de Cádiz. Nelson morreu na batalha, assim como os comandantes espanhóis Churruca e Gravina (este, meses depois, pelos ferimentos). A Espanha perdeu boa parte da sua marinha.' },
    { id: 'dosmayo', at: 'monteleon', title: 'O Dois de Maio de 1808', text: 'Em 2 de maio de 1808, o povo de Madri se levantou contra as tropas francesas. No quartel de Monteleón, os capitães Luis Daoíz e Pedro Velarde resistiram até a morte. A repressão foi brutal, com fuzilamentos em 3 de maio. Goya pintou esses dias em dois quadros famosos, hoje no Prado.' },
    { id: 'bailen', at: 'bailen', title: 'Bailén e Saragoça', text: 'Em julho de 1808, em Bailén, o general Castaños obrigou o general Dupont a se render: foi a primeira derrota em campo aberto de um exército napoleônico. Saragoça resistiu a dois cercos terríveis (1808–1809). Agustina de Aragón ficou famosa por disparar um canhão contra os franceses quando os artilheiros caíram.' },
    { id: 'pepa', at: 'cadiz', title: 'A Constituição de Cádiz (1812)', text: 'Cercados em Cádiz, deputados da Espanha e da América aprovaram em 19 de março de 1812 — dia de São José — a primeira constituição espanhola, apelidada de "La Pepa". Ela proclamava a soberania nacional, a divisão de poderes e a liberdade de imprensa, e influenciou constituições de Portugal, da Itália e da América Latina.' }
  ],
  quests: [
    { id: 'main', title: 'O Povo em Armas', reward: { xp: 280, gold: 110, potions: 2 }, steps: [
      { t: 'talk', npc: 'daoiz', desc: 'Fale com o Capitão Daoíz em Madri', say: [
        ['daoiz', 'Os franceses querem levar o último infante para a França. O povo está se levantando!'],
        ['daoiz', 'Eu e Velarde vamos defender o Parque de Artilharia de Monteleón. Venha, {nome}! Seu mosquete leva duas balas antes de recarregar.']] },
      { t: 'kill', e: 'fuzileiro', n: 8, at: 'monteleon', desc: 'Defenda Monteleón: derrote 8 fuzileiros imperiais' },
      { t: 'talk', npc: 'goya', desc: 'Fale com Francisco de Goya', say: [
        ['goya', 'Daoíz e Velarde morreram em Monteleón. Esta noite os franceses fuzilaram dezenas de madrilenos no monte de Príncipe Pío.'],
        ['goya', 'Eu vou pintar isto. O mundo precisa ver o que é a guerra. Agora vá: dizem que o general Castaños prepara algo no sul.']] },
      { t: 'goto', at: 'bailen', desc: 'Vá para Bailén', say: [['N', 'Julho de 1808. Sob um calor de 40 graus, o exército do general Dupont está cercado e sem água.']] },
      { t: 'kill', e: 'dragao', n: 5, at: 'bailen', desc: 'Derrote 5 dragões imperiais em Bailén', done: [['N', 'Dupont se rendeu com cerca de 18 mil homens. A notícia correu a Europa: os exércitos de Napoleão podiam ser vencidos.']] },
      { t: 'talk', npc: 'agustina', desc: 'Vá a Saragoça e fale com Agustina', say: [
        ['agustina', 'Os franceses voltaram a cercar a cidade. Nossos artilheiros caíram, e eu mesma disparei o canhão!'],
        ['agustina', 'Precisamos de pólvora. Há barris escondidos pela cidade. Traga cinco!']] },
      { t: 'collect', item: 'Barril de pólvora', icon: '🛢️', n: 5, at: 'zaragoza', desc: 'Encontre 5 barris de pólvora em Saragoça' },
      { t: 'kill', e: 'granadeiro', n: 6, at: 'cerco', desc: 'Rompa o cerco: derrote 6 granadeiros' },
      { t: 'boss', e: 'coronel', at: 'campo', desc: 'Derrote o Coronel dos Dragões no campo de batalha', intro: [['N', 'O Coronel dos Dragões carrega à frente da sua cavalaria!']] },
      { t: 'goto', at: 'cadiz', desc: 'Vá a Cádiz, a cidade sitiada', say: [['N', '1812. Cádiz, protegida pelo mar, é a única grande cidade livre. Ali se reúnem as Cortes.']] },
      { t: 'talk', npc: 'arguelles', desc: 'Fale com o deputado Argüelles', say: [
        ['arguelles', 'Hoje, 19 de março de 1812, aprovamos a Constituição! A soberania pertence à nação, e não ao rei.'],
        ['arguelles', 'O povo a chama de "La Pepa", porque hoje é dia de São José. Espanhóis, eis a vossa pátria!'],
        ['N', 'A Constituição de Cádiz foi também a primeira a declarar que os espanhóis da América tinham os mesmos direitos que os da Europa.']] }
    ] },
    { id: 's1', title: 'Os Desastres da Guerra', req: 3, reward: { xp: 180, gold: 130 }, steps: [
      { t: 'talk', npc: 'goya', desc: 'Fale com Goya', say: [['goya', 'Estou gravando cenas da guerra em placas de cobre. O vento espalhou cinco gravuras pela cidade.']] },
      { t: 'collect', item: 'Gravura', icon: '🖼️', n: 5, at: 'madrid', desc: 'Recolha 5 gravuras de Goya em Madri' },
      { t: 'talk', npc: 'goya', desc: 'Devolva as gravuras', say: [['goya', '"Os Desastres da Guerra". Talvez só sejam publicadas depois da minha morte. A verdade às vezes precisa esperar.']] }
    ] },
    { id: 's2', title: 'A Pequena Guerra', reward: { xp: 180, gold: 140, potions: 1 }, steps: [
      { t: 'talk', npc: 'empecinado', desc: 'Fale com El Empecinado', say: [['empecinado', 'Os franceses controlam as cidades, mas os campos são nossos. Embosque cinco granadeiros em Monteleón!']] },
      { t: 'kill', e: 'granadeiro', n: 5, at: 'monteleon', desc: 'Embosque 5 granadeiros em Monteleón' },
      { t: 'talk', npc: 'empecinado', desc: 'Volte a El Empecinado', say: [['empecinado', 'É assim que se faz! O mundo vai chamar isso de "guerrilha". A palavra é nossa.']] }
    ] },
    { id: 's3', title: 'Os Feridos de Maio', reward: { xp: 170, gold: 130 }, steps: [
      { t: 'talk', npc: 'clara', desc: 'Fale com Clara del Rey', say: [['clara', 'Há feridos por toda parte perto de Monteleón! Leve-lhes cinco bandagens.']] },
      { t: 'collect', item: 'Bandagem', icon: '🩹', n: 5, at: 'monteleon', desc: 'Leve 5 bandagens até Monteleón' },
      { t: 'talk', npc: 'clara', desc: 'Volte a Clara', say: [['clara', 'Obrigada. Meu marido e meus filhos estão lutando no parque. Que Deus os proteja.'], ['N', 'Clara del Rey morreu naquele dia, defendendo Monteleón. Uma rua de Madri leva o seu nome.']] }
    ] },
    { id: 's4', title: 'As Histórias do Marinheiro', req: 9, reward: { xp: 200, gold: 150 }, steps: [
      { t: 'talk', npc: 'marinheiro', desc: 'Fale com o velho marinheiro', say: [['marinheiro', 'Sente-se, jovem. Se souber responder, eu pago o vinho.']] },
      { t: 'quiz', npc: 'marinheiro', desc: 'Responda ao velho marinheiro', qs: [
        { q: 'Que território a Espanha cedeu à Grã-Bretanha pelo Tratado de Utrecht (1713) e nunca recuperou?', o: ['Menorca', 'Gibraltar', 'Ceuta', 'Malta'], a: 1 },
        { q: 'Qual o apelido da Constituição de Cádiz de 1812?', o: ['La Pepa', 'La Gloriosa', 'La Niña', 'La Chata'], a: 0 },
        { q: 'Em que batalha de 1808 um exército de Napoleão se rendeu pela primeira vez em campo aberto?', o: ['Trafalgar', 'Bailén', 'Waterloo', 'Austerlitz'], a: 1 }
      ] }
    ] }
  ]
});

// ======================= CAPÍTULO 10 =======================
CHAPTERS.push({
  id: 'c10', num: 10, title: 'O Século Turbulento', years: '1814 – 1931', cls: 'soldado', seed: 10110, currency: 'pesetas',
  biome: { ground: '#8a9a58', ground2: '#829252', path: '#9a8a6a', water: '#2f6a9a', floor: '#b8b0a0', roof: '#9a4a2a', wall: '#9a4a2a',
    obs: ['tree', 'olive', 'rock', 'dry'], density: 0.45, river: true },
  intro: [
    'Entre 1810 e 1825, quase toda a América espanhola se tornou independente. Na Península, absolutistas e liberais se alternavam no poder entre golpes, revoluções e guerras civis.',
    'Nas serras do sul, bandoleiros viraram lendas populares, meio heróis, meio criminosos.',
    'Ano de 1830. Você é {nome}, recruta do exército, com o velho amuleto de osso escondido sob a farda.'
  ],
  outro: [
    'Em 14 de abril de 1931, depois de eleições municipais em que os republicanos venceram nas grandes cidades, Alfonso XIII deixou a Espanha. Foi proclamada a Segunda República.',
    'A República trouxe grandes esperanças: escolas, reforma agrária, autonomia para a Catalunha e voto feminino. Mas também enfrentou crises econômicas, greves e violência política dos dois lados.',
    'Em julho de 1936, um golpe militar contra o governo da República fracassou em boa parte do país. A Espanha mergulhou numa guerra civil.'
  ],
  places: [
    { id: 'madrid', name: 'Madri', x: 16, y: 40, r: 8, type: 'village', icon: 'palace' },
    { id: 'serra', name: 'Serra Morena', x: 40, y: 62, r: 7, type: 'camp' },
    { id: 'despe', name: 'Desfiladeiro de Despeñaperros', x: 64, y: 66, r: 8, type: 'arena' },
    { id: 'norte', name: 'Montanhas de Navarra', x: 34, y: 14, r: 7, type: 'camp' },
    { id: 'barcelona', name: 'Barcelona', x: 62, y: 18, r: 8, type: 'village', icon: 'factory' },
    { id: 'ferrovia', name: 'Linha Barcelona–Mataró', x: 88, y: 20, r: 6, type: 'ruin', icon: 'station' },
    { id: 'porto', name: 'Cais dos Repatriados', x: 92, y: 52, r: 7, type: 'village', icon: 'ship' }
  ],
  npcs: [
    { id: 'mateo', name: 'Sargento Mateo', at: 'madrid', dx: 2, dy: 1, look: Object.assign({}, LOOK.roman, { body: '#2b3d6b', hat: 'shako', hatColor: '#2b2b3b', cape: null, weapon: 'rifle' }), lines: ['Firmes, recruta!'] },
    { id: 'pimargall', name: 'Francesc Pi i Margall', at: 'madrid', dx: -3, dy: 1, look: Object.assign({}, LOOK.noble, { body: '#1a1a1a', hat: 'none', cape: null }), lines: ['Sonho com uma república federal, de baixo para cima.'] },
    { id: 'galdos', name: 'Benito Pérez Galdós', at: 'madrid', dx: 0, dy: 3, look: Object.assign({}, LOOK.toga, { body: '#3a3a3a' }), lines: ['Estou escrevendo a história da Espanha em forma de romances: os Episódios Nacionais.'] },
    { id: 'carab', name: 'Guarda de Carabineiros', at: 'madrid', dx: -2, dy: -3, look: Object.assign({}, LOOK.roman, { body: '#2a4a2a', hat: 'shako', hatColor: '#1a2a1a', cape: null, weapon: 'rifle' }), lines: ['Tabaco de Gibraltar sem imposto? Não na minha estrada.'] },
    { id: 'merc10', name: 'Armazém La Esperanza', at: 'madrid', dx: 3, dy: 3, shop: true, look: LOOK.trader, lines: ['Pague em pesetas, a moeda nova desde 1868!'] },
    { id: 'engenheiro', name: 'Engenheiro da Ferrovia', at: 'barcelona', dx: 2, dy: 1, look: LOOK.worker, lines: ['O vapor vai mudar tudo. Tudo!'] },
    { id: 'operaria', name: 'Operária Teresa', at: 'barcelona', dx: -3, dy: 2, look: LOOK.woman, lines: ['Doze horas por dia no tear. E as crianças também trabalham.'] },
    { id: 'repatriado', name: 'Soldado Repatriado', at: 'porto', dx: 1, dy: 2, look: Object.assign({}, LOOK.worker, { body: '#d8d0b8', hat: 'wide', hatColor: '#c8b880' }), lines: ['Mais soldados morreram de febre amarela do que de balas.'] },
    { id: 'unamuno', name: 'Miguel de Unamuno', at: 'porto', dx: -3, dy: 0, look: Object.assign({}, LOOK.toga, { body: '#1a1a1a' }), lines: ['Me dói a Espanha.'] }
  ],
  camps: [],
  codex: [
    { id: 'amer', at: 'porto', title: 'A independência da América', text: 'Aproveitando a invasão napoleônica, as colônias americanas formaram juntas de governo a partir de 1810. Com líderes como Bolívar e San Martín, quase toda a América espanhola ficou independente até 1825. Restaram à Espanha apenas Cuba, Porto Rico e as Filipinas.' },
    { id: 'carl', at: 'norte', title: 'As Guerras Carlistas', text: 'Quando Fernando VII morreu (1833), deixou o trono à filha Isabel II, de apenas três anos. Seu irmão, Carlos María Isidro, reivindicou a coroa com apoio dos tradicionalistas, sobretudo em Navarra, no País Basco e na Catalunha. Houve três guerras carlistas, entre 1833 e 1876.' },
    { id: 'band', at: 'serra', title: 'Os bandoleiros', text: 'No século XIX, a Serra Morena e as serras da Andaluzia eram terra de bandoleiros. O mais famoso, José María Hinojosa, "El Tempranillo", foi indultado em 1832 e passou a comandar uma esquadra contra os próprios bandoleiros. A Guarda Civil foi criada em 1844, em parte para acabar com eles.' },
    { id: 'ferro', at: 'ferrovia', title: 'Trem e indústria', text: 'A primeira ferrovia da Península Ibérica ligou Barcelona a Mataró em 28 de outubro de 1848, graças à iniciativa de Miquel Biada, que morreu meses antes da inauguração. A Catalunha se industrializou com o têxtil, e o País Basco com o ferro e o aço.' },
    { id: 'repub', at: 'madrid', title: 'La Gloriosa e a Primeira República', text: 'A revolução de 1868, "La Gloriosa", derrubou Isabel II. Depois do breve reinado de Amadeu de Saboia, foi proclamada a Primeira República (1873), que teve quatro presidentes em onze meses: Figueras, Pi i Margall, Salmerón e Castelar. Em 1874, a monarquia foi restaurada com Alfonso XII.' },
    { id: 'n98', at: 'porto', title: 'O Desastre de 1898', text: 'Em 1898, após a explosão do navio Maine em Havana, os Estados Unidos entraram em guerra com a Espanha. Em poucos meses, a Espanha perdeu Cuba, Porto Rico, as Filipinas e Guam. A crise inspirou a "Geração de 98" — Unamuno, Machado, Baroja, Azorín, Valle-Inclán —, que refletiu sobre a identidade espanhola.' },
    { id: 'plata', at: 'barcelona', title: 'A Idade de Prata e 1931', text: 'O início do século XX foi uma "Idade de Prata" cultural: Picasso, Dalí, Miró, Lorca, Buñuel, Ramón y Cajal (Nobel de Medicina em 1906). Mas houve também crises: a Semana Trágica (1909), o Desastre de Annual no Marrocos (1921) e a ditadura de Primo de Rivera (1923–1930). Em 14 de abril de 1931, proclamou-se a Segunda República.' }
  ],
  quests: [
    { id: 'main', title: 'Entre Tronos e Repúblicas', reward: { xp: 300, gold: 120, potions: 2 }, steps: [
      { t: 'talk', npc: 'mateo', desc: 'Apresente-se ao Sargento Mateo', say: [
        ['mateo', 'Recruta {nome}! Seu fuzil leva cinco balas. Use R para recarregar quando quiser.'],
        ['mateo', 'Nossa primeira missão: os bandoleiros da Serra Morena atacam diligências e correios. Limpe as estradas!']] },
      { t: 'kill', e: 'bandoleiro', n: 6, at: 'serra', desc: 'Derrote 6 bandoleiros na Serra Morena' },
      { t: 'kill', e: 'contrabandista', n: 4, at: 'serra', desc: 'Derrote 4 contrabandistas na Serra Morena' },
      { t: 'boss', e: 'tempranillo', at: 'despe', desc: 'Enfrente "El Tempranillo" no desfiladeiro', intro: [['N', '"Na serra mando eu, e no resto da Espanha, o rei!", grita El Tempranillo.']], done: [['N', 'Derrotado, El Tempranillo aceitou o indulto do rei em 1832 e passou a perseguir bandoleiros. Morreu no ano seguinte, numa emboscada.']] },
      { t: 'talk', npc: 'mateo', desc: 'Volte ao Sargento Mateo', say: [
        ['mateo', '1833. O rei Fernando VII morreu. A rainha Isabel II tem três anos, e seu tio Carlos diz que o trono é dele.'],
        ['mateo', 'Os carlistas tomaram as montanhas de Navarra. É guerra civil, recruta.']] },
      { t: 'kill', e: 'carlista', n: 8, at: 'norte', desc: 'Derrote 8 partidários carlistas em Navarra' },
      { t: 'goto', at: 'barcelona', desc: 'Siga até Barcelona', say: [['N', '1848. Barcelona é a cidade das fábricas. Chaminés, teares a vapor e uma novidade: o trem.']] },
      { t: 'talk', npc: 'engenheiro', desc: 'Fale com o engenheiro da ferrovia', say: [
        ['engenheiro', 'Em poucos dias inauguramos a primeira ferrovia da Península: Barcelona–Mataró! Mas falta carvão para a locomotiva.'],
        ['engenheiro', 'Traga seis sacos de carvão do depósito da linha.']] },
      { t: 'collect', item: 'Saco de carvão', icon: '⚫', n: 6, at: 'ferrovia', desc: 'Leve 6 sacos de carvão da linha férrea' },
      { t: 'talk', npc: 'engenheiro', desc: 'Volte ao engenheiro', say: [
        ['engenheiro', '28 de outubro de 1848: 28 quilômetros em menos de uma hora! O futuro chegou.']] },
      { t: 'talk', npc: 'pimargall', desc: 'Vá a Madri e fale com Pi i Margall', say: [
        ['N', '1873. Isabel II foi derrubada em 1868, o rei Amadeu renunciou, e agora a Espanha é uma república.'],
        ['pimargall', 'Sou o segundo presidente em poucos meses. Cantões se declaram independentes, os carlistas voltaram às armas...'],
        ['pimargall', 'Não vou durar muito no cargo. Mas as ideias ficam. Vá ao porto: um dia você entenderá o que perdemos lá fora.']] },
      { t: 'talk', npc: 'repatriado', desc: 'Fale com o soldado repatriado no cais', say: [
        ['N', '1898.'],
        ['repatriado', 'Perdemos Cuba, Porto Rico e as Filipinas. Os navios americanos destruíram a nossa frota em dias.'],
        ['repatriado', 'Voltamos magros, doentes, sem nada. E Madri continua fazendo festa como se nada tivesse acontecido.']] },
      { t: 'talk', npc: 'mateo', desc: 'Volte a Madri', say: [
        ['N', '14 de abril de 1931. Seu descendente, também chamado {nome}, está na Puerta del Sol.'],
        ['mateo', 'Sou neto daquele velho sargento! O rei Alfonso XIII foi embora. As pessoas cantam nas ruas: é a República!'],
        ['mateo', 'Dizem que agora tudo vai mudar. Rezo para que mude em paz.']] }
    ] },
    { id: 's1', title: 'Episódios Nacionais', req: 5, reward: { xp: 200, gold: 150 }, steps: [
      { t: 'talk', npc: 'galdos', desc: 'Fale com Benito Pérez Galdós', say: [['galdos', 'Escrevo romances sobre a nossa história recente. Me ajude a conferir alguns fatos.']] },
      { t: 'quiz', npc: 'galdos', desc: 'Responda a Galdós', qs: [
        { q: 'Qual foi a primeira ferrovia da Península Ibérica (1848)?', o: ['Madri–Aranjuez', 'Barcelona–Mataró', 'Sevilha–Cádiz', 'Bilbao–Santander'], a: 1 },
        { q: 'Em que ano a Espanha perdeu Cuba, Porto Rico e as Filipinas?', o: ['1808', '1873', '1898', '1931'], a: 2 },
        { q: 'Quantos presidentes a Primeira República teve em onze meses?', o: ['Um', 'Dois', 'Quatro', 'Sete'], a: 2 }
      ] }
    ] },
    { id: 's2', title: 'O Algodão de Barcelona', req: 7, reward: { xp: 190, gold: 150, potions: 1 }, steps: [
      { t: 'talk', npc: 'operaria', desc: 'Fale com a operária Teresa', say: [['operaria', 'Se eu perder estas bobinas, descontam do meu salário. Caíram cinco da carroça pela cidade!']] },
      { t: 'collect', item: 'Bobina de algodão', icon: '🧵', n: 5, at: 'barcelona', desc: 'Recolha 5 bobinas de algodão em Barcelona' },
      { t: 'talk', npc: 'operaria', desc: 'Devolva as bobinas', say: [['operaria', 'Obrigada! Estamos nos organizando em sindicatos. Um dia teremos a jornada de oito horas.'], ['N', 'A Espanha foi um dos primeiros países a estabelecer a jornada de oito horas, em 1919, após a greve de La Canadiense, em Barcelona.']] }
    ] },
    { id: 's3', title: 'Contrabando na Serra', reward: { xp: 180, gold: 160 }, steps: [
      { t: 'talk', npc: 'carab', desc: 'Fale com o guarda de carabineiros', say: [['carab', 'Contrabandistas trazem tabaco de Gibraltar pela Serra Morena. Detenha seis deles!']] },
      { t: 'kill', e: 'contrabandista', n: 6, at: 'serra', desc: 'Detenha 6 contrabandistas na Serra' },
      { t: 'talk', npc: 'carab', desc: 'Volte ao guarda', say: [['carab', 'Ótimo trabalho. Parte do que apreendemos é sua, conforme a lei.']] }
    ] },
    { id: 's4', title: 'A Geração de 98', req: 12, reward: { xp: 200, gold: 160 }, steps: [
      { t: 'talk', npc: 'unamuno', desc: 'Fale com Miguel de Unamuno', say: [['unamuno', 'O vento levou meus poemas e os de meus amigos — Machado, Baroja — pelo cais. São quatro folhas.']] },
      { t: 'collect', item: 'Folha de poema', icon: '📃', n: 4, at: 'porto', desc: 'Recolha 4 folhas de poemas no cais' },
      { t: 'talk', npc: 'unamuno', desc: 'Devolva os poemas a Unamuno', say: [['unamuno', 'Perdemos um império e precisamos encontrar uma alma. É isso que estes versos procuram.']] }
    ] }
  ]
});
