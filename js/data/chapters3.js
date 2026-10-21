// Capítulos 11–14: da Guerra Civil à Espanha de hoje.
'use strict';

const URBAN = { urban: true, ground: '#6a8a4a', ground2: '#64844a', path: '#3a3a3e', water: '#2f6a9a', floor: '#b8b0a0', roof: '#8a5a3a', wall: '#9a8a7a', obs: ['lamp', 'bush'] };

// ======================= CAPÍTULO 11 =======================
CHAPTERS.push({
  id: 'c11', num: 11, title: 'A Guerra Civil', years: '1936 – 1939', cls: 'guardiao', seed: 11211, currency: 'pesetas',
  biome: { ground: '#7a7a5a', ground2: '#727252', path: '#8a8070', water: '#3a5a7a', floor: '#a8a090', roof: '#8a5a3a', wall: '#8a7a6a',
    obs: ['rubble', 'tree', 'rock', 'dry'], density: 0.45 },
  intro: [
    'Em 18 de julho de 1936, parte do exército se levantou contra o governo da Segunda República. O golpe fracassou em metade do país, e a Espanha se partiu em duas.',
    'Durante quase três anos, espanhóis lutaram contra espanhóis. Houve bombardeios sobre cidades, fome, e violência e repressão nas duas retaguardas. Famílias inteiras ficaram divididas.',
    'Novembro de 1936. Madri está cercada. Você é {nome}, guarda da Junta do Tesouro Artístico. A sua missão não é vencer a guerra: é salvar o que pertence a todos.'
  ],
  outro: [
    'A guerra terminou em 1º de abril de 1939, com a vitória do lado comandado pelo general Francisco Franco. Os historiadores calculam centenas de milhares de mortos, entre combates, bombardeios e repressão.',
    'Cerca de meio milhão de pessoas cruzaram a fronteira francesa no inverno de 1939, na chamada "Retirada". Muitas nunca voltaram. Outras tantas sofreram a prisão e a repressão do pós-guerra.',
    'As obras do Prado voltaram de Genebra em setembro de 1939, intactas, pouco antes de a Segunda Guerra Mundial começar. Hoje, quem visita o museu raramente sabe que elas quase se perderam.'
  ],
  places: [
    { id: 'prado', name: 'Museu do Prado', x: 16, y: 30, r: 8, type: 'village', icon: 'museum' },
    { id: 'ruas', name: 'Ruas de Madri', x: 36, y: 12, r: 7, type: 'camp' },
    { id: 'armazem', name: 'Porões do Museu', x: 28, y: 58, r: 6, type: 'ruin', icon: 'museum' },
    { id: 'estrada', name: 'Estrada para Valência', x: 54, y: 26, r: 7, type: 'camp' },
    { id: 'valencia', name: 'Torres de Serranos', x: 62, y: 54, r: 8, type: 'village', icon: 'castle' },
    { id: 'deposito', name: 'Depósito Abandonado', x: 86, y: 64, r: 8, type: 'arena', icon: 'factory' },
    { id: 'figueres', name: 'Castelo de Figueres', x: 92, y: 18, r: 7, type: 'village', icon: 'castle' }
  ],
  npcs: [
    { id: 'timoteo', name: 'Timoteo Pérez Rubio', at: 'prado', dx: 2, dy: 1, look: Object.assign({}, LOOK.toga, { body: '#4a4a3a', hat: 'beret', hatColor: '#222' }), lines: ['Sou pintor. Nunca imaginei que meu trabalho seria salvar os quadros dos outros.'] },
    { id: 'carmen', name: 'Enfermeira Carmen', at: 'prado', dx: -3, dy: 2, look: Object.assign({}, LOOK.woman, { body: '#e8e8e8', hat: 'cap', hatColor: '#fff' }), lines: ['Aqui tratamos todos os feridos. Sem perguntar de que lado estão.'] },
    { id: 'merc11', name: 'Cantina da Esquina', at: 'prado', dx: 3, dy: 3, shop: true, look: LOOK.trader, lines: ['Há pouco de tudo. Mas o que há, eu vendo.'] },
    { id: 'renau', name: 'Josep Renau', at: 'valencia', dx: 2, dy: 1, look: Object.assign({}, LOOK.toga, { body: '#3a3a5a' }), lines: ['Sou cartazista. Encomendei a Picasso um quadro para a Exposição de Paris.'] },
    { id: 'pilar', name: 'Pequena Pilar', at: 'valencia', dx: -2, dy: 2, look: LOOK.child, lines: ['Vão me mandar num navio para longe. Não sei para onde.'] },
    { id: 'comissario', name: 'Delegado do Comitê Internacional', at: 'figueres', dx: 2, dy: 1, look: Object.assign({}, LOOK.noble, { body: '#2a2a3a', hat: 'fedora', hatColor: '#222', cape: null }), lines: ['Museus de toda a Europa se uniram para proteger estas obras.'] },
    { id: 'machado', name: 'Antonio Machado', at: 'figueres', dx: -3, dy: 1, look: Object.assign({}, LOOK.toga, { body: '#2a2a2a', hat: 'fedora', hatColor: '#3a3a3a' }), lines: ['Caminhante, não há caminho: faz-se caminho ao andar.'] }
  ],
  camps: [],
  codex: [
    { id: 'rep2', at: 'prado', title: 'A Segunda República (1931–1936)', text: 'A República separou Igreja e Estado, iniciou uma reforma agrária, construiu milhares de escolas e aprovou o estatuto de autonomia da Catalunha. Com o empenho da deputada Clara Campoamor, as mulheres conquistaram o voto, exercido pela primeira vez nas eleições de 1933. Foram também anos de forte polarização, greves e violência política.' },
    { id: 'golpe36', at: 'ruas', title: 'Julho de 1936', text: 'Em 17 e 18 de julho de 1936, militares se levantaram contra o governo da Frente Popular. O golpe triunfou em parte do país e fracassou em outra, como Madri e Barcelona. A Alemanha nazista e a Itália fascista ajudaram os sublevados; a União Soviética e o México ajudaram a República. Nas duas zonas houve violência contra civis.' },
    { id: 'guern', at: 'valencia', title: 'Guernica (1937)', text: 'Em 26 de abril de 1937, a Legião Condor alemã e a aviação italiana bombardearam a cidade basca de Guernica, em dia de feira. Picasso pintou "Guernica" para o pavilhão da República na Exposição Internacional de Paris de 1937. O quadro só veio para a Espanha em 1981 e hoje está no Museu Reina Sofía, em Madri.' },
    { id: 'brig', at: 'estrada', title: 'As Brigadas Internacionais', text: 'Cerca de 35 mil voluntários de mais de 50 países lutaram nas Brigadas Internacionais ao lado da República. Entre os estrangeiros que foram à Espanha estavam escritores como George Orwell e Ernest Hemingway. As brigadas foram retiradas no fim de 1938.' },
    { id: 'tesoro', at: 'armazem', title: 'O salvamento do Prado', text: 'Em novembro de 1936, bombas caíram perto do Museu do Prado. A Junta do Tesouro Artístico, presidida pelo pintor Timoteo Pérez Rubio, levou as principais obras para Valência, guardando-as nas Torres de Serranos, e depois para a Catalunha. Em 1939, um comitê internacional de museus as levou para Genebra, de onde voltaram intactas.' },
    { id: 'exil', at: 'figueres', title: 'A Retirada e o exílio', text: 'No inverno de 1939, centenas de milhares de pessoas — soldados e civis — atravessaram os Pireneus rumo à França. Muitos foram confinados em campos nas praias. O poeta Antonio Machado morreu em Collioure em 22 de fevereiro de 1939. O México de Lázaro Cárdenas acolheu milhares de exilados espanhóis.' }
  ],
  quests: [
    { id: 'main', title: 'O Tesouro de Todos', reward: { xp: 320, gold: 130, potions: 2 }, steps: [
      { t: 'talk', npc: 'timoteo', desc: 'Fale com Timoteo Pérez Rubio no Prado', say: [
        ['timoteo', 'Ontem caíram bombas no telhado do museu. Se Velázquez, Goya e El Greco ficarem aqui, podem virar cinzas.'],
        ['timoteo', 'Embalamos os quadros nos porões, mas as caixas estão espalhadas. Precisamos de todas antes de partir.']] },
      { t: 'collect', item: 'Quadro embalado', icon: '🖼️', n: 6, at: 'armazem', desc: 'Reúna 6 caixas de quadros nos porões' },
      { t: 'kill', e: 'saqueador', n: 8, at: 'ruas', desc: 'Afaste 8 saqueadores das ruas de Madri', done: [['H', 'Na guerra, alguns só pensam em si mesmos. Mas o caminho está livre.']] },
      { t: 'talk', npc: 'timoteo', desc: 'Volte a Timoteo', say: [
        ['timoteo', 'Os caminhões partem esta noite para Valência. "As Meninas" mal cabia sob uma ponte, tivemos que esvaziar os pneus para passar!'],
        ['timoteo', 'Há incendiários na estrada. Proteja o comboio.']] },
      { t: 'kill', e: 'incendiario', n: 6, at: 'estrada', desc: 'Proteja o comboio: detenha 6 incendiários' },
      { t: 'goto', at: 'valencia', desc: 'Acompanhe o comboio até Valência', say: [['N', 'As obras foram guardadas nas Torres de Serranos, com paredes reforçadas por concreto e sacos de areia.']] },
      { t: 'talk', npc: 'renau', desc: 'Fale com Josep Renau', say: [
        ['renau', 'Muito bem! Valência é agora a sede do governo. Os quadros estão seguros... por enquanto.'],
        ['renau', 'Um bando assalta caminhões de abastecimento e esconde o saque num depósito a sudeste. Se descobrirem nossas caixas...']] },
      { t: 'boss', e: 'chefe_saque', at: 'deposito', desc: 'Derrote o Chefe dos Saqueadores no depósito', intro: [['N', '"Arte? Isso vale uma fortuna lá fora!", ri o chefe do bando.']] },
      { t: 'goto', at: 'figueres', desc: 'Leve as obras até o Castelo de Figueres', say: [['N', 'Fevereiro de 1939. A frente desabou. Estradas cheias de gente fugindo no frio em direção à França.']] },
      { t: 'talk', npc: 'comissario', desc: 'Fale com o delegado internacional', say: [
        ['comissario', 'Representantes de museus da França, do Reino Unido, da Suíça e dos Estados Unidos assinaram um acordo: as obras irão para Genebra, sob a proteção da Liga das Nações.'],
        ['comissario', 'Elas pertencem ao povo espanhol e voltarão quando houver paz. Você cumpriu o seu dever, {nome}.'],
        ['N', 'Mais de 1.800 caixas atravessaram a fronteira em caminhões. Nenhuma obra-prima se perdeu.']] }
    ] },
    { id: 's1', title: 'O Hospital de Sangue', reward: { xp: 210, gold: 160, potions: 2 }, steps: [
      { t: 'talk', npc: 'carmen', desc: 'Fale com a enfermeira Carmen', say: [['carmen', 'Estamos sem remédios. Há caixas de medicamentos abandonadas nas ruas. Traga cinco, por favor!']] },
      { t: 'collect', item: 'Caixa de remédios', icon: '💊', n: 5, at: 'ruas', desc: 'Recolha 5 caixas de remédios nas ruas' },
      { t: 'talk', npc: 'carmen', desc: 'Leve os remédios a Carmen', say: [['carmen', 'Você salvou vidas hoje. Leve estas poções, você também vai precisar.']] }
    ] },
    { id: 's2', title: 'Os Meninos da Guerra', req: 6, reward: { xp: 200, gold: 160 }, steps: [
      { t: 'talk', npc: 'pilar', desc: 'Fale com a pequena Pilar', say: [['pilar', 'Minha mãe me escreveu cartas, mas eu perdi na estrada. São quatro. Vou levar no navio.']] },
      { t: 'collect', item: 'Carta', icon: '✉️', n: 4, at: 'estrada', desc: 'Encontre 4 cartas na estrada para Valência' },
      { t: 'talk', npc: 'pilar', desc: 'Entregue as cartas a Pilar', say: [['pilar', 'Obrigada! Vou ler todas as noites.'], ['N', 'Milhares de crianças foram enviadas para a URSS, o México, o Reino Unido, a França e a Bélgica. Ficaram conhecidas como os "Meninos da Guerra". Muitas nunca voltaram a ver os pais.']] }
    ] },
    { id: 's3', title: 'O Quadro de Picasso', req: 7, reward: { xp: 230, gold: 170 }, steps: [
      { t: 'talk', npc: 'renau', desc: 'Fale com Josep Renau', say: [['renau', 'Responda: o que você sabe sobre este tempo terrível?']] },
      { t: 'quiz', npc: 'renau', desc: 'Responda a Josep Renau', qs: [
        { q: 'Qual cidade basca foi bombardeada em 26 de abril de 1937?', o: ['Bilbao', 'Guernica', 'San Sebastián', 'Vitória'], a: 1 },
        { q: 'Para qual evento Picasso pintou "Guernica"?', o: ['Os Jogos Olímpicos', 'A Exposição Internacional de Paris de 1937', 'A inauguração do Prado', 'O fim da guerra'], a: 1 },
        { q: 'Para qual cidade as obras do Prado foram levadas em 1939?', o: ['Londres', 'Nova York', 'Genebra', 'Lisboa'], a: 2 }
      ] }
    ] },
    { id: 's4', title: 'Os Últimos Versos', req: 9, reward: { xp: 220, gold: 170 }, steps: [
      { t: 'talk', npc: 'machado', desc: 'Fale com Antonio Machado', say: [['machado', 'Estou cansado e doente. Perdi três folhas com os meus últimos versos aqui perto. Pode procurá-las?']] },
      { t: 'collect', item: 'Folha de verso', icon: '📃', n: 3, at: 'figueres', desc: 'Encontre 3 folhas de verso perto de Figueres' },
      { t: 'talk', npc: 'machado', desc: 'Entregue os versos a Machado', say: [['machado', 'Obrigado. Vou levá-los comigo para o outro lado da fronteira, junto com a minha mãe.'], ['N', 'Machado morreu dias depois em Collioure, na França. No seu bolso encontraram um último verso, sobre os dias azuis e o sol da infância.']] }
    ] }
  ]
});

// ======================= CAPÍTULO 12 =======================
CHAPTERS.push({
  id: 'c12', num: 12, title: 'Os Anos de Silêncio', years: '1939 – 1975', cls: 'jornalista', seed: 12312, currency: 'pesetas',
  biome: Object.assign({}, URBAN, { wall: '#a89a82', ground: '#7a8a4a', ground2: '#748448' }),
  intro: [
    'Depois da guerra veio a ditadura do general Franco. Partidos e sindicatos livres foram proibidos, a imprensa era censurada e dezenas de milhares de pessoas foram executadas ou presas no pós-guerra.',
    'Os primeiros anos foram de fome: as cartilhas de racionamento duraram até 1952. A Espanha ficou isolada do mundo depois da Segunda Guerra Mundial.',
    'Ano de 1946. Você é {nome}, jovem jornalista. Sua arma agora é uma câmera fotográfica. Seus inimigos não são pessoas: são a fome, o medo e o silêncio.'
  ],
  outro: [
    'Francisco Franco morreu em 20 de novembro de 1975. Dois dias depois, Juan Carlos de Borbón, que o próprio ditador havia designado como sucessor, foi proclamado rei.',
    'Ninguém sabia o que viria. O país havia mudado muito: cidades cresceram, milhões saíram do campo, os turistas trouxeram outros costumes, e uma nova geração queria liberdade.',
    'O amuleto de osso, agora guardado numa caixa de fotos, passou para as mãos de um jovem advogado da família.'
  ],
  places: [
    { id: 'redacao', name: 'Redação do Jornal', x: 14, y: 20, r: 7, type: 'city', icon: 'statue' },
    { id: 'bairro', name: 'Bairro Operário', x: 38, y: 40, r: 7, type: 'camp' },
    { id: 'censura', name: 'Escritório da Censura', x: 64, y: 16, r: 7, type: 'camp' },
    { id: 'seat', name: 'Fábrica da SEAT', x: 62, y: 42, r: 6, type: 'ruin', icon: 'factory' },
    { id: 'estacao', name: 'Estação do Norte', x: 30, y: 66, r: 7, type: 'city', icon: 'station' },
    { id: 'benidorm', name: 'Benidorm', x: 80, y: 62, r: 8, type: 'city', icon: 'tower' },
    { id: 'praca', name: 'Praça das Sombras', x: 94, y: 30, r: 8, type: 'arena' }
  ],
  npcs: [
    { id: 'editor', name: 'Editor Ramón', at: 'redacao', dx: 2, dy: 1, look: Object.assign({}, LOOK.toga, { body: '#5a5a5a', hat: 'fedora', hatColor: '#333' }), lines: ['Cada palavra que publicamos passa antes pela tesoura do censor.'] },
    { id: 'berlanga', name: 'Luis García Berlanga', at: 'redacao', dx: -3, dy: 2, look: Object.assign({}, LOOK.toga, { body: '#3a3a3a' }), lines: ['No cinema, o humor passa onde a crítica direta não passa.'] },
    { id: 'merc12', name: 'Quiosque do Paco', at: 'redacao', dx: 3, dy: 3, shop: true, look: LOOK.trader, lines: ['Jornais, tabaco e... poções milagrosas!'] },
    { id: 'zaragoza', name: 'Prefeito Pedro Zaragoza', at: 'benidorm', dx: 2, dy: 1, look: Object.assign({}, LOOK.noble, { body: '#e8e0d0', hat: 'none', cape: null }), lines: ['Benidorm era uma vila de pescadores. Olhe para ela agora!'] },
    { id: 'biarnes', name: 'Joana Biarnés', at: 'benidorm', dx: -3, dy: 1, look: Object.assign({}, LOOK.woman, { body: '#2a2a2a' }), lines: ['Sou fotojornalista. Dizem que isso não é trabalho de mulher. Pois veja as minhas fotos.'] },
    { id: 'emigrante', name: 'Emigrante Antonio', at: 'estacao', dx: 1, dy: 2, look: Object.assign({}, LOOK.worker, { body: '#5a4a3a' }), lines: ['Uma mala de papelão e um contrato na Alemanha. É tudo o que tenho.'] },
    { id: 'operario', name: 'Operário da SEAT', at: 'seat', dx: 1, dy: 2, look: Object.assign({}, LOOK.worker, { body: '#2a4a8a' }), lines: ['O 600 é o carro do povo. Pela primeira vez, uma família operária pode ter carro.'] }
  ],
  camps: [],
  codex: [
    { id: 'posg', at: 'bairro', title: 'O pós-guerra', text: 'Os anos 1940 foram chamados de "anos da fome". O regime adotou a autarquia (tentar produzir tudo dentro do país), e as cartilhas de racionamento duraram até 1952. A repressão foi dura: execuções, prisões, campos de trabalho e expurgos de professores e funcionários.' },
    { id: 'isol', at: 'censura', title: 'Isolamento e retorno ao mundo', text: 'Em 1946, a ONU recomendou a retirada dos embaixadores de Madri. Com a Guerra Fria, a situação mudou: em 1953, a Espanha assinou acordos com os Estados Unidos (que instalaram bases militares) e uma concordata com o Vaticano. Em 1955, foi admitida na ONU.' },
    { id: 'milagre', at: 'seat', title: 'O "milagre" dos anos 1960', text: 'O Plano de Estabilização de 1959 abriu a economia. Nos anos 1960, a Espanha cresceu como poucos países no mundo, graças à indústria, ao turismo e ao dinheiro dos emigrantes. O SEAT 600, lançado em 1957, virou símbolo da nova classe média.' },
    { id: 'turis', at: 'benidorm', title: 'O boom do turismo', text: 'Em 1953, o prefeito de Benidorm, Pedro Zaragoza, autorizou o uso do biquíni nas praias e, segundo ele, foi de Vespa até Madri para defender a decisão perante o governo. O turismo explodiu: de pouco mais de 1 milhão de visitantes no início dos anos 1950 para mais de 30 milhões em meados dos anos 1970.' },
    { id: 'emig', at: 'estacao', title: 'A grande emigração', text: 'Nos anos 1960 e 1970, cerca de dois milhões de espanhóis emigraram para trabalhar na França, Alemanha, Suíça e Bélgica. Ao mesmo tempo, milhões deixaram o campo rumo a Madri, Barcelona e Bilbao, onde surgiram enormes bairros operários.' },
    { id: 'oposi', at: 'redacao', title: 'Censura e oposição', text: 'Livros, filmes, canções e jornais passavam pela censura prévia. Ainda assim, a oposição cresceu: greves operárias, protestos universitários e partidos clandestinos. Nos anos 1960 surgiram as Comissões Operárias. O grupo terrorista ETA, fundado em 1959, assassinou o presidente do governo Carrero Blanco em 1973.' },
    { id: 'fim75', at: 'praca', title: '20 de novembro de 1975', text: 'Franco morreu em 20 de novembro de 1975, após 36 anos no poder. Em 1969 ele havia designado Juan Carlos de Borbón, neto de Alfonso XIII, como sucessor a título de rei. Juan Carlos I foi proclamado em 22 de novembro de 1975.' }
  ],
  quests: [
    { id: 'main', title: 'A Câmera Contra o Silêncio', reward: { xp: 340, gold: 140, potions: 2 }, steps: [
      { t: 'talk', npc: 'editor', desc: 'Fale com o Editor Ramón', say: [
        ['editor', 'Bem-vindo à redação, {nome}. Aqui a regra é simples: só publicamos o que o censor deixa.'],
        ['editor', 'Mas uma foto pode dizer o que um texto não pode. Vá ao Bairro Operário e mostre como as pessoas vivem.'],
        ['N', 'Sua câmera dispara um flash que dissipa as sombras. Clique para fotografar.']] },
      { t: 'kill', e: 'fome', n: 8, at: 'bairro', desc: 'Dissipe 8 Sombras da Fome no Bairro Operário' },
      { t: 'collect', item: 'Saco de farinha', icon: '🌾', n: 6, at: 'bairro', desc: 'Distribua 6 sacos de farinha no bairro' },
      { t: 'talk', npc: 'editor', desc: 'Volte à redação', say: [
        ['editor', 'Suas fotos são boas demais. O censor cortou tudo, claro.'],
        ['N', 'Os anos passam: acordos com os EUA em 1953, entrada na ONU em 1955, Plano de Estabilização em 1959.'],
        ['editor', 'Agora querem que escrevamos sobre o "milagre econômico". Vá ao Escritório da Censura e recupere o nosso arquivo de fotos.']] },
      { t: 'kill', e: 'censor', n: 8, at: 'censura', desc: 'Recupere o arquivo: dissipe 8 Censores de Tinta' },
      { t: 'goto', at: 'benidorm', desc: 'Vá a Benidorm fazer uma reportagem', say: [['N', 'Uma vila de pescadores virou cidade de arranha-céus. Turistas do norte da Europa enchem as praias.']] },
      { t: 'talk', npc: 'zaragoza', desc: 'Entreviste o prefeito Pedro Zaragoza', say: [
        ['zaragoza', 'Em 1953 eu permiti o biquíni nas praias. Quiseram me excomungar!'],
        ['zaragoza', 'Fui de Vespa até Madri para explicar ao governo que o turismo era o futuro. E eu estava certo.']] },
      { t: 'talk', npc: 'emigrante', desc: 'Entreviste o emigrante na Estação do Norte', say: [
        ['emigrante', 'O turismo traz dinheiro para a costa. Mas na minha aldeia não há trabalho. Vou para a Alemanha.'],
        ['emigrante', 'Mandarei dinheiro para casa todos os meses. Dois milhões de nós estão fazendo o mesmo.']] },
      { t: 'kill', e: 'medo', n: 5, at: 'bairro', desc: 'Enfrente 5 Sombras do Medo', done: [['N', 'Os anos 1970 chegam. Greves, protestos e uma geração que perdeu o medo.']] },
      { t: 'boss', e: 'grande_censor', at: 'praca', desc: 'Enfrente O Grande Censor na Praça das Sombras', intro: [['N', 'Uma sombra enorme, feita de tinta preta e tesouras, tenta apagar todas as palavras.']] },
      { t: 'talk', npc: 'editor', desc: 'Volte à redação', say: [
        ['N', '20 de novembro de 1975.'],
        ['editor', 'Franco morreu. O rádio só toca música clássica. Nas ruas, uns choram, outros brindam em silêncio.'],
        ['editor', 'Ninguém sabe o que vem agora, {nome}. Mas, pela primeira vez em muito tempo, vamos poder escrever a história.']] }
    ] },
    { id: 's1', title: 'O Carro do Povo', reward: { xp: 220, gold: 180, potions: 1 }, steps: [
      { t: 'talk', npc: 'operario', desc: 'Fale com o operário da SEAT', say: [['operario', 'Faltam cinco peças na linha de montagem do 600! Estão espalhadas pela fábrica.']] },
      { t: 'collect', item: 'Peça do SEAT 600', icon: '🔧', n: 5, at: 'seat', desc: 'Encontre 5 peças do SEAT 600' },
      { t: 'talk', npc: 'operario', desc: 'Entregue as peças', say: [['operario', 'Mais um "seiscientos" pronto! Com ele, as famílias vão à praia no verão. É uma revolução sobre quatro rodas.']] }
    ] },
    { id: 's2', title: 'Bem-vindo, Mister Marshall!', req: 4, reward: { xp: 240, gold: 180 }, steps: [
      { t: 'talk', npc: 'berlanga', desc: 'Fale com Luis García Berlanga', say: [['berlanga', 'Fiz um filme sobre uma aldeia que se fantasia para receber os americanos... e eles passam direto! Vamos ver se você conhece o seu país.']] },
      { t: 'quiz', npc: 'berlanga', desc: 'Responda a Berlanga', qs: [
        { q: 'Até que ano duraram as cartilhas de racionamento?', o: ['1940', '1952', '1965', '1975'], a: 1 },
        { q: 'Que carro, lançado em 1957, virou símbolo da classe média espanhola?', o: ['Fusca', 'SEAT 600', 'Citroën 2CV', 'Fiat 500'], a: 1 },
        { q: 'Em que data morreu Francisco Franco?', o: ['18 de julho de 1936', '1º de abril de 1939', '20 de novembro de 1975', '23 de fevereiro de 1981'], a: 2 }
      ] }
    ] },
    { id: 's3', title: 'A Fotógrafa', req: 6, reward: { xp: 230, gold: 180 }, steps: [
      { t: 'talk', npc: 'biarnes', desc: 'Fale com Joana Biarnés', say: [['biarnes', 'Perdi cinco rolos de filme em Benidorm. Um deles tem fotos de quatro rapazes ingleses de cabelo comprido...']] },
      { t: 'collect', item: 'Rolo de filme', icon: '🎞️', n: 5, at: 'benidorm', desc: 'Encontre 5 rolos de filme em Benidorm' },
      { t: 'talk', npc: 'biarnes', desc: 'Devolva os rolos', say: [['biarnes', 'Obrigada! Em 1965 fotografei os Beatles em Madri e Barcelona. Fui a primeira fotojornalista mulher da imprensa diária espanhola.']] }
    ] }
  ]
});

// ======================= CAPÍTULO 13 =======================
CHAPTERS.push({
  id: 'c13', num: 13, title: 'A Transição', years: '1975 – 1992', cls: 'deputado', seed: 13413, currency: 'pesetas',
  biome: Object.assign({}, URBAN),
  intro: [
    'Depois de quase quatro décadas de ditadura, a Espanha precisava decidir o seu futuro sem voltar à guerra. Esse processo ficou conhecido como a Transição.',
    'Em 1976, o rei nomeou Adolfo Suárez presidente do governo. Pouca gente apostava nele. Seria preciso desmontar o regime usando as próprias leis do regime.',
    'Você é {nome}, um jovem advogado. Em breve será eleito deputado. Sua arma agora são as palavras: clique para discursar.'
  ],
  outro: [
    'Em 1982, a alternância pacífica no poder confirmou a democracia. Em 1986, a Espanha entrou na Comunidade Econômica Europeia, junto com Portugal. A Movida madrilena explodiu em música, cinema e moda.',
    '1992 foi o ano em que a Espanha se mostrou ao mundo: os Jogos Olímpicos de Barcelona e a Exposição Universal de Sevilha. O primeiro trem de alta velocidade ligou Madri a Sevilha.',
    'Mas nem tudo foi festa: o terrorismo do ETA continuou matando durante décadas, até o grupo anunciar o fim da violência em 2011 e se dissolver em 2018.'
  ],
  places: [
    { id: 'congresso', name: 'Congresso dos Deputados', x: 18, y: 30, r: 8, type: 'city', icon: 'parliament' },
    { id: 'moncloa', name: 'Palácio da Moncloa', x: 40, y: 12, r: 6, type: 'city', icon: 'palace' },
    { id: 'ruas', name: 'Ruas de Madri', x: 40, y: 52, r: 7, type: 'camp' },
    { id: 'sindicato', name: 'Sede dos Sindicatos', x: 64, y: 28, r: 6, type: 'city', icon: 'factory' },
    { id: 'jeronimo', name: 'Carrera de San Jerónimo', x: 70, y: 52, r: 7, type: 'camp' },
    { id: 'tv', name: 'Estúdio de Televisão', x: 30, y: 70, r: 6, type: 'city', icon: 'tower' },
    { id: 'hemiciclo', name: 'Hemiciclo (23-F)', x: 94, y: 40, r: 8, type: 'arena', icon: 'parliament' },
    { id: 'barcelona', name: 'Barcelona 92', x: 92, y: 12, r: 7, type: 'city', icon: 'stadium' }
  ],
  npcs: [
    { id: 'suarez', name: 'Adolfo Suárez', at: 'congresso', dx: 2, dy: 1, look: Object.assign({}, LOOK.noble, { body: '#2a2a3a', hat: 'none', cape: null, tie: '#3a3a8a' }), lines: ['Fazer normal no plano político o que já é normal na rua.'] },
    { id: 'professora', name: 'Professora de Direito Constitucional', at: 'congresso', dx: -3, dy: 2, look: Object.assign({}, LOOK.woman, { body: '#6a3a5a' }), lines: ['Uma constituição é um pacto entre pessoas que pensam diferente.'] },
    { id: 'merc13', name: 'Bar do Congresso', at: 'congresso', dx: 3, dy: 3, shop: true, look: LOOK.trader, lines: ['Aqui deputados de todos os partidos tomam café juntos. Pague em pesetas!'] },
    { id: 'sindicalista', name: 'Sindicalista Marcelino', at: 'sindicato', dx: 1, dy: 2, look: Object.assign({}, LOOK.worker, { body: '#8a8a8a' }), lines: ['Passei anos preso por defender os trabalhadores. Agora querem negociar conosco.'] },
    { id: 'funcionario', name: 'Funcionário Exausto', at: 'sindicato', dx: -3, dy: 1, look: Object.assign({}, LOOK.toga, { body: '#6a6a5a' }), lines: ['Carimbo, papel, carimbo, papel...'] },
    { id: 'rei', name: 'Rei Juan Carlos I', at: 'tv', dx: 1, dy: 2, look: Object.assign({}, LOOK.noble, { body: '#1a3a1a', hat: 'cap', hatColor: '#1a3a1a', cape: null }), lines: ['A Coroa não pode tolerar ações que tentem interromper o processo democrático.'] },
    { id: 'dj', name: 'DJ da Movida', at: 'tv', dx: -3, dy: 0, look: Object.assign({}, LOOK.child, { body: '#e040a0', hair: '#f0e020' }), lines: ['Madri nunca dorme! Isto é a Movida!'] },
    { id: 'atleta', name: 'Atleta Olímpica', at: 'barcelona', dx: 1, dy: 2, look: Object.assign({}, LOOK.woman, { body: '#c02020' }), lines: ['A Espanha ganhou 22 medalhas em Barcelona. Nunca tínhamos chegado nem perto!'] }
  ],
  camps: [],
  codex: [
    { id: 'ref76', at: 'ruas', title: 'A Lei para a Reforma Política', text: 'Em novembro de 1976, as próprias Cortes franquistas aprovaram a Lei para a Reforma Política, que permitia eleições livres — na prática, votaram a própria dissolução. Em dezembro, ela foi aprovada em referendo. Em abril de 1977, o Partido Comunista foi legalizado, e em 15 de junho de 1977 houve as primeiras eleições livres desde 1936.' },
    { id: 'pactos', at: 'moncloa', title: 'Os Pactos da Moncloa', text: 'Em outubro de 1977, com inflação acima de 20%, o governo e os principais partidos assinaram os Pactos da Moncloa: acordos econômicos e políticos para enfrentar a crise. Foi um exemplo de consenso entre adversários.' },
    { id: 'const', at: 'sindicato', title: 'A Constituição de 1978', text: 'Redigida por sete deputados de diferentes partidos — os "pais da Constituição" —, a Constituição foi aprovada em referendo em 6 de dezembro de 1978, com cerca de 88% de votos favoráveis. Ela define a Espanha como uma monarquia parlamentar e criou o Estado das Autonomias, com 17 comunidades autônomas.' },
    { id: '23f', at: 'hemiciclo', title: 'O 23-F', text: 'Em 23 de fevereiro de 1981, durante a votação do novo presidente do governo, o tenente-coronel Antonio Tejero invadiu o Congresso com guardas civis armados. Suárez, o general Gutiérrez Mellado e Santiago Carrillo se recusaram a se jogar no chão. De madrugada, o rei apareceu na TV, de uniforme, e defendeu a Constituição. O golpe fracassou.' },
    { id: 'eta', at: 'jeronimo', title: 'O terrorismo do ETA', text: 'O grupo terrorista ETA, que defendia a independência do País Basco pela violência, matou mais de 850 pessoas entre 1968 e 2010, a maioria já na democracia. Em 1997, o assassinato do vereador Miguel Ángel Blanco levou milhões às ruas. O ETA anunciou o fim da violência em 2011 e se dissolveu em 2018.' },
    { id: 'movida', at: 'tv', title: 'A Movida', text: 'Nos anos 1980, Madri viveu uma explosão cultural conhecida como Movida: bandas de rock e pop, fanzines, moda, fotografia e o cinema de Pedro Almodóvar. Era a liberdade recém-conquistada transformada em arte e em festa.' },
    { id: 'n92', at: 'barcelona', title: 'Europa e 1992', text: 'Em 1º de janeiro de 1986, a Espanha entrou na Comunidade Econômica Europeia (atual União Europeia). Em 1992, Barcelona sediou os Jogos Olímpicos, com 22 medalhas espanholas, e Sevilha recebeu a Exposição Universal. No mesmo ano, foi inaugurado o primeiro trem de alta velocidade, o AVE Madri–Sevilha.' }
  ],
  quests: [
    { id: 'main', title: 'A Democracia Possível', reward: { xp: 360, gold: 150, potions: 2 }, steps: [
      { t: 'talk', npc: 'suarez', desc: 'Fale com Adolfo Suárez', say: [
        ['suarez', 'Sou o novo presidente do governo, e quase ninguém confia em mim. Vamos usar as leis do regime para desmontá-lo.'],
        ['suarez', 'O referendo da reforma política é em dezembro. As pessoas têm medo de votar depois de tantos anos. Ajude-as!'],
        ['N', 'Agora suas palavras são a sua arma: clique para discursar. Elas voam até os inimigos.']] },
      { t: 'collect', item: 'Cédula de voto', icon: '🗳️', n: 8, at: 'ruas', desc: 'Leve 8 cédulas de voto aos cidadãos' },
      { t: 'kill', e: 'boato', n: 8, at: 'ruas', desc: 'Desminta 8 Boatos nas ruas', done: [['N', '15 de dezembro de 1976: a reforma foi aprovada por cerca de 94% dos votos. Em junho de 1977, você foi eleito deputado.']] },
      { t: 'talk', npc: 'sindicalista', desc: 'Fale com o sindicalista Marcelino', say: [
        ['sindicalista', 'A inflação passa de 20%. Os trabalhadores estão desesperados, e as empresas estão fechando.'],
        ['sindicalista', 'Suárez chamou todos os partidos à Moncloa, da direita aos comunistas. Leve estes documentos e recolha as assinaturas!']] },
      { t: 'collect', item: 'Assinatura', icon: '✍️', n: 5, at: 'moncloa', desc: 'Recolha 5 assinaturas no Palácio da Moncloa' },
      { t: 'talk', npc: 'suarez', desc: 'Volte a Suárez', say: [
        ['suarez', 'Os Pactos da Moncloa estão assinados! Inimigos de ontem sentados na mesma mesa.'],
        ['N', '6 de dezembro de 1978: a Constituição foi aprovada em referendo.'],
        ['N', '23 de fevereiro de 1981. O Congresso vota o sucessor de Suárez. De repente, tiros no plenário.']] },
      { t: 'kill', e: 'golpe', n: 8, at: 'jeronimo', desc: 'Resista: dissipe 8 Sombras do Golpe na Carrera de San Jerónimo' },
      { t: 'boss', e: 'sombra23f', at: 'hemiciclo', desc: 'Enfrente A Sombra do 23-F no hemiciclo', intro: [['N', '"Todos no chão!" Mas alguns deputados permanecem sentados. E você também.']] },
      { t: 'talk', npc: 'rei', desc: 'Vá ao Estúdio de Televisão', say: [
        ['N', 'Madrugada de 24 de fevereiro, 1h14.'],
        ['rei', 'Ordenei às autoridades civis e militares que tomem todas as medidas necessárias para manter a ordem constitucional.'],
        ['N', 'Pela manhã, os deputados saíram do Congresso. O golpe havia fracassado. Dias depois, mais de um milhão de pessoas foram às ruas defender a democracia.']] },
      { t: 'goto', at: 'barcelona', desc: 'Viaje até Barcelona', say: [['N', '1992. Em 1982 houve a primeira alternância no poder; em 1986, a entrada na Europa. Agora, os Jogos Olímpicos.']] },
      { t: 'talk', npc: 'atleta', desc: 'Fale com a atleta olímpica', say: [
        ['atleta', 'Dezessete anos atrás, ninguém imaginava isto: o mundo inteiro olhando para nós, e nós sem medo.'],
        ['atleta', 'Você esteve lá em 1981, não esteve? Obrigada. Esta medalha também é sua.']] }
    ] },
    { id: 's1', title: 'A Movida', reward: { xp: 240, gold: 200, potions: 1 }, steps: [
      { t: 'talk', npc: 'dj', desc: 'Fale com o DJ da Movida', say: [['dj', 'Meus discos caíram do caminhão pelas ruas! Cinco vinis! A festa começa à meia-noite!']] },
      { t: 'collect', item: 'Disco de vinil', icon: '💿', n: 5, at: 'ruas', desc: 'Recolha 5 discos de vinil nas ruas' },
      { t: 'talk', npc: 'dj', desc: 'Devolva os discos', say: [['dj', 'Isto é liberdade: música alta, cabelo colorido e ninguém para proibir. Bem-vindo à Movida!']] }
    ] },
    { id: 's2', title: 'A Lição de Direito', req: 6, reward: { xp: 260, gold: 200 }, steps: [
      { t: 'talk', npc: 'professora', desc: 'Fale com a professora de Direito', say: [['professora', 'Todo deputado deveria passar neste teste.']] },
      { t: 'quiz', npc: 'professora', desc: 'Responda à professora', qs: [
        { q: 'Em que data a Constituição espanhola foi aprovada em referendo?', o: ['14 de abril de 1931', '6 de dezembro de 1978', '23 de fevereiro de 1981', '1º de janeiro de 1986'], a: 1 },
        { q: 'Quantas comunidades autônomas a Espanha tem?', o: ['9', '15', '17', '22'], a: 2 },
        { q: 'Em que ano a Espanha entrou na Comunidade Econômica Europeia?', o: ['1977', '1982', '1986', '1992'], a: 2 }
      ] }
    ] },
    { id: 's3', title: 'Contra a Inércia', req: 3, reward: { xp: 250, gold: 200 }, steps: [
      { t: 'talk', npc: 'funcionario', desc: 'Fale com o funcionário exausto', say: [['funcionario', 'As reformas estão presas na Inércia! Pilhas de papel com vida própria. Derrote cinco delas.']] },
      { t: 'kill', e: 'inercia', n: 5, at: 'jeronimo', desc: 'Vença 5 Inércias' },
      { t: 'talk', npc: 'funcionario', desc: 'Volte ao funcionário', say: [['funcionario', 'Os papéis andaram! Pela primeira vez em anos, a minha mesa está vazia.']] }
    ] }
  ]
});

// ======================= CAPÍTULO 14 =======================
CHAPTERS.push({
  id: 'c14', num: 14, title: 'A Espanha do Século XXI', years: '1992 – hoje', cls: 'candidato', seed: 14514, currency: 'euros',
  biome: Object.assign({}, URBAN, { wall: '#b8b0a8', ground: '#5f8a4a', ground2: '#5a8446' }),
  intro: [
    'A Espanha entrou no século XXI moderna, europeia e em pleno crescimento. Em 2002, o euro substituiu a peseta. Mas o novo século também trouxe crises, tragédias e debates intensos.',
    'Você é {nome}, último herdeiro de uma linhagem de mais de trinta mil anos. O velho amuleto de osso está na sua mesa, ao lado do celular.',
    'Seu objetivo: ganhar a confiança dos cidadãos e chegar à presidência do governo. Seus inimigos são as crises, a desinformação e a divisão.'
  ],
  outro: [
    'O rei propôs {nome} como candidato, e o Congresso dos Deputados aprovou a sua investidura. Diante do rei, no Palácio da Zarzuela, você prometeu cumprir a Constituição.',
    'Da lança de sílex ao megafone, a linhagem atravessou impérios, guerras, ditaduras e democracias. Cada geração lutou com as armas do seu tempo.',
    'Agora começa outro capítulo, que ninguém escreveu ainda.'
  ],
  places: [
    { id: 'lavapies', name: 'Lavapiés', x: 14, y: 40, r: 8, type: 'city', icon: 'statue' },
    { id: 'obra', name: 'Obras Paradas', x: 36, y: 14, r: 7, type: 'camp' },
    { id: 'bolsa', name: 'Bolsa de Madri', x: 62, y: 12, r: 7, type: 'arena', icon: 'museum' },
    { id: 'sol', name: 'Puerta del Sol', x: 40, y: 62, r: 7, type: 'city', icon: 'statue' },
    { id: 'hospital', name: 'Hospital', x: 60, y: 36, r: 6, type: 'city', icon: 'tower' },
    { id: 'quarentena', name: 'Bairro em Quarentena', x: 72, y: 60, r: 7, type: 'camp' },
    { id: 'valencia', name: 'Valência (DANA)', x: 94, y: 66, r: 7, type: 'camp' },
    { id: 'dados', name: 'Centro de Dados', x: 88, y: 36, r: 7, type: 'camp', icon: 'tower' },
    { id: 'debate', name: 'O Grande Debate', x: 92, y: 12, r: 8, type: 'arena', icon: 'parliament' },
    { id: 'zarzuela', name: 'Palácio da Zarzuela', x: 14, y: 12, r: 6, type: 'city', icon: 'palace' }
  ],
  npcs: [
    { id: 'mentora', name: 'Mentora Carmen', at: 'lavapies', dx: 2, dy: 1, look: Object.assign({}, LOOK.woman, { body: '#4a2a5a', hat: 'none', hair: '#ccc' }), lines: ['Política é escutar mais do que falar. E depois falar com clareza.'] },
    { id: 'engenheira', name: 'Engenheira da Rede Elétrica', at: 'lavapies', dx: -3, dy: 2, look: Object.assign({}, LOOK.worker, { body: '#e0a020', hat: 'cap', hatColor: '#fff' }), lines: ['Sol e vento já geram boa parte da nossa eletricidade.'] },
    { id: 'merc14', name: 'Supermercado 24h', at: 'lavapies', dx: 3, dy: 3, shop: true, look: LOOK.trader, lines: ['Aceitamos cartão, celular e euros!'] },
    { id: 'jovem', name: 'Jovem do 15-M', at: 'sol', dx: 2, dy: 1, look: Object.assign({}, LOOK.child, { body: '#3a8a5a', hair: '#6a3a1a' }), lines: ['Não somos mercadoria nas mãos de políticos e banqueiros!'] },
    { id: 'torcedor', name: 'Torcedor da Seleção', at: 'sol', dx: -3, dy: 1, look: Object.assign({}, LOOK.worker, { body: '#c02020', hat: 'cap', hatColor: '#e0b020' }), lines: ['Iniesta, minuto 116! Eu chorei como uma criança.'] },
    { id: 'voluntaria', name: 'Voluntária da DANA', at: 'sol', dx: 0, dy: 3, look: Object.assign({}, LOOK.woman, { body: '#6a5030', hat: 'cap', hatColor: '#6a5030' }), lines: ['Milhares de jovens foram a pé até as cidades alagadas, com pás e vassouras.'] },
    { id: 'enfermeira', name: 'Enfermeira Lucía', at: 'hospital', dx: 1, dy: 2, look: Object.assign({}, LOOK.woman, { body: '#3a8aa0', hat: 'cap', hatColor: '#3a8aa0' }), lines: ['Às oito da noite, o país inteiro aplaudia das janelas.'] },
    { id: 'rei2', name: 'Rei Felipe VI', at: 'zarzuela', dx: 1, dy: 2, look: Object.assign({}, LOOK.noble, { body: '#1a1a2a', hat: 'none', cape: null, tie: '#3a3a8a' }), lines: ['O rei reina, mas não governa. Quem governa é escolhido pelo Congresso.'] }
  ],
  camps: [],
  codex: [
    { id: 'euro', at: 'lavapies', title: 'Do peseta ao euro', text: 'Em 1º de janeiro de 2002, as moedas e notas de euro entraram em circulação, e a peseta, criada em 1868, se despediu. Nos anos 1990 e 2000, a Espanha cresceu rapidamente, recebeu milhões de imigrantes e construiu uma das maiores redes de trem de alta velocidade do mundo.' },
    { id: '11m', at: 'sol', title: '11 de março de 2004', text: 'Em 11 de março de 2004, bombas colocadas por terroristas jihadistas explodiram em quatro trens de subúrbio de Madri, matando quase 200 pessoas e ferindo cerca de duas mil. Foi o pior atentado da história da Espanha. No dia seguinte, milhões de pessoas foram às ruas em silêncio.' },
    { id: 'crise', at: 'obra', title: 'A crise de 2008 e o 15-M', text: 'Quando a bolha imobiliária estourou em 2008, milhares de obras pararam, bancos tiveram de ser resgatados e o desemprego passou de 25% em 2012 — mais de 50% entre os jovens. Em 15 de maio de 2011, milhares de jovens acamparam na Puerta del Sol: nascia o movimento 15-M, dos "indignados".' },
    { id: 'felipe6', at: 'zarzuela', title: 'Um novo rei', text: 'Em junho de 2014, Juan Carlos I abdicou, e seu filho foi proclamado rei como Felipe VI em 19 de junho. Na monarquia parlamentar, o rei é chefe de Estado, mas quem governa é o presidente do governo, eleito pelo Congresso dos Deputados.' },
    { id: 'direitos', at: 'dados', title: 'Direitos e debates', text: 'Em 2005, a Espanha foi o terceiro país do mundo a legalizar o casamento entre pessoas do mesmo sexo. Em 2017, o governo catalão realizou um referendo de independência declarado ilegal pelo Tribunal Constitucional, o que levou à aplicação do artigo 155 da Constituição e a um debate político intenso que continua até hoje.' },
    { id: 'covid', at: 'hospital', title: 'A pandemia de 2020', text: 'Em 14 de março de 2020, o governo decretou estado de alarme pela pandemia de covid-19. Por semanas, as pessoas só podiam sair de casa para o essencial. Todas as noites, às 20h, a população aplaudia das janelas os profissionais de saúde.' },
    { id: 'dana', at: 'valencia', title: 'A DANA de 2024 e o apagão de 2025', text: 'Em 29 de outubro de 2024, chuvas torrenciais (uma DANA) provocaram inundações devastadoras na província de Valência, com mais de 220 mortos. Milhares de voluntários ajudaram na limpeza. Em 28 de abril de 2025, um apagão deixou quase toda a Península Ibérica sem eletricidade durante horas.' }
  ],
  quests: [
    { id: 'main', title: 'O Caminho para a Moncloa', reward: { xp: 500, gold: 300, potions: 3 }, steps: [
      { t: 'talk', npc: 'mentora', desc: 'Fale com a Mentora Carmen em Lavapiés', say: [
        ['mentora', '{nome}, então você quer entrar na política? Primeiro, entenda o que as pessoas viveram.'],
        ['mentora', '2008. A bolha imobiliária estourou. Obras abandonadas por toda parte, famílias sem casa e sem emprego.'],
        ['mentora', 'As bolhas ainda estão nas obras paradas. Estoure-as! Use o megafone: clique para falar.']] },
      { t: 'kill', e: 'bolha', n: 10, at: 'obra', desc: 'Estoure 10 Bolhas Imobiliárias nas Obras Paradas' },
      { t: 'boss', e: 'recessao', at: 'bolsa', desc: 'Enfrente A Grande Recessão na Bolsa de Madri', intro: [['N', 'O painel da Bolsa fica vermelho. A Grande Recessão ganha forma!']], done: [['N', 'A crise foi longa: o desemprego passou de 25% em 2012. A recuperação levou anos.']] },
      { t: 'talk', npc: 'jovem', desc: 'Fale com o jovem do 15-M na Puerta del Sol', say: [
        ['jovem', 'Maio de 2011. Estamos acampados aqui há dias. Não queremos violência, queremos ser ouvidos.'],
        ['jovem', 'Se um dia você chegar ao governo, lembre-se de nós. Não somos números, somos pessoas.']] },
      { t: 'talk', npc: 'mentora', desc: 'Volte à Mentora Carmen', say: [
        ['N', 'Março de 2020.'],
        ['mentora', 'Um vírus parou o mundo. Estado de alarme, ruas vazias, hospitais cheios.'],
        ['mentora', 'O hospital precisa de máscaras. Leve-as até lá!']] },
      { t: 'collect', item: 'Caixa de máscaras', icon: '😷', n: 6, at: 'hospital', desc: 'Leve 6 caixas de máscaras ao hospital' },
      { t: 'talk', npc: 'enfermeira', desc: 'Fale com a enfermeira Lucía', say: [
        ['enfermeira', 'Obrigada. Trabalhamos turnos de 24 horas. Às oito da noite, ouvimos os aplausos das janelas, e isso nos dá forças.'],
        ['enfermeira', 'O bairro ao lado está em quarentena e o vírus se espalha. Ajude a conter o contágio!']] },
      { t: 'kill', e: 'virus', n: 10, at: 'quarentena', desc: 'Contenha 10 focos de Vírus no bairro em quarentena' },
      { t: 'kill', e: 'lama', n: 6, at: 'valencia', desc: 'Outubro de 2024: limpe 6 montes de Lama da DANA em Valência', done: [['N', 'Ao lado de você, milhares de voluntários com botas e pás. Uma geração inteira foi ajudar.']] },
      { t: 'talk', npc: 'mentora', desc: 'Volte à Mentora Carmen', say: [
        ['mentora', 'Você esteve onde o país precisou. Agora é hora da campanha.'],
        ['mentora', 'Mas cuidado: o Centro de Dados está cheio de bots espalhando mentiras. Primeiro, a verdade.']] },
      { t: 'kill', e: 'bot', n: 10, at: 'dados', desc: 'Desmonte 10 Bots de Desinformação' },
      { t: 'boss', e: 'polarizacao', at: 'debate', desc: 'Vença A Polarização no Grande Debate', intro: [['N', 'No Grande Debate, uma criatura alimentada por gritos e insultos tenta dividir o país em dois.']], done: [['N', 'Você não venceu gritando mais alto. Venceu escutando, e convencendo quem pensava diferente.']] },
      { t: 'talk', npc: 'rei2', desc: 'Vá ao Palácio da Zarzuela', say: [
        ['rei2', 'Depois de ouvir todos os grupos parlamentares, proponho você como candidato à presidência do governo.'],
        ['N', 'Dias depois, o Congresso dos Deputados aprovou a investidura.'],
        ['rei2', 'Jura ou promete cumprir fielmente as obrigações do cargo de presidente do governo, com lealdade ao rei, e guardar e fazer guardar a Constituição?'],
        ['H', 'Prometo. Pela minha consciência e honra.'],
        ['N', 'Sobre a mesa, ao lado da Constituição, um velho amuleto de osso com a figura de um bisonte.']] }
    ] },
    { id: 's1', title: 'O Apagão', reward: { xp: 300, gold: 260, potions: 2 }, steps: [
      { t: 'talk', npc: 'engenheira', desc: 'Fale com a engenheira da rede elétrica', say: [['engenheira', '28 de abril de 2025: a Península inteira ficou sem luz! Preciso de cinco peças de reposição do Centro de Dados.']] },
      { t: 'collect', item: 'Peça do gerador', icon: '🔋', n: 5, at: 'dados', desc: 'Recolha 5 peças no Centro de Dados' },
      { t: 'talk', npc: 'engenheira', desc: 'Entregue as peças', say: [['engenheira', 'A luz voltou! As pessoas passaram a tarde nas ruas, ouvindo rádio a pilha. Foi quase bonito.']] }
    ] },
    { id: 's2', title: 'Campeões do Mundo', reward: { xp: 300, gold: 260 }, steps: [
      { t: 'talk', npc: 'torcedor', desc: 'Fale com o torcedor', say: [['torcedor', 'Se acertar as minhas perguntas, pago um café!']] },
      { t: 'quiz', npc: 'torcedor', desc: 'Responda ao torcedor', qs: [
        { q: 'Em que ano o euro substituiu a peseta nas ruas?', o: ['1992', '1999', '2002', '2008'], a: 2 },
        { q: 'Quem marcou o gol da final da Copa do Mundo de 2010?', o: ['Raúl', 'Iniesta', 'Fernando Torres', 'David Villa'], a: 1 },
        { q: 'Em que ano Felipe VI foi proclamado rei?', o: ['2004', '2011', '2014', '2020'], a: 2 }
      ] }
    ] },
    { id: 's3', title: 'Pás e Vassouras', req: 8, reward: { xp: 300, gold: 260 }, steps: [
      { t: 'talk', npc: 'voluntaria', desc: 'Fale com a voluntária da DANA', say: [['voluntaria', 'Ainda faltam ferramentas em Valência! Recolha seis pás abandonadas por lá e entregue às equipes.']] },
      { t: 'collect', item: 'Pá', icon: '🧹', n: 6, at: 'valencia', desc: 'Recolha 6 pás em Valência' },
      { t: 'talk', npc: 'voluntaria', desc: 'Volte à voluntária', say: [['voluntaria', 'Ninguém nos chamou. Fomos porque eram os nossos vizinhos. Isso também é a Espanha.']] }
    ] }
  ]
});
