// Capítulos 1–5: da Pré-história ao fim do Califado de Córdoba.
'use strict';

const CHAPTERS = [];

// Aparências reutilizáveis de NPCs
const LOOK = {
  elder:    { body: '#6a4a3a', hat: 'hood', hatColor: '#9a8a7a', skin: '#c89a70' },
  hunter:   { body: '#7a5230', hat: 'band', hatColor: '#a33', skin: '#c89a70', weapon: 'spear' },
  trader:   { body: '#8a6a2a', hat: 'hood', hatColor: '#c8a050', skin: '#d0a070' },
  shaman:   { body: '#3a3a5a', hat: 'hood', hatColor: '#5a3a6a', skin: '#c89a70', cape: '#2a2a3a' },
  child:    { body: '#9a7a4a', skin: '#d8a27a', hair: '#3a2a1a' },
  painter:  { body: '#8a3a2a', hat: 'band', hatColor: '#e0a030', skin: '#c89a70' },
  chief:    { body: '#7a2a2a', hat: 'band', hatColor: '#e0c060', skin: '#d8a27a', weapon: 'falcata', cape: '#5a3a1a' },
  woman:    { body: '#5a6a8a', hat: 'hood', hatColor: '#3a4a6a', skin: '#e0b090' },
  phoenic:  { body: '#7a2a7a', hat: 'cap', hatColor: '#c8a050', skin: '#b88a60' },
  greek:    { body: '#e8e0d0', hat: 'band', hatColor: '#4a7a3a', skin: '#e0b090' },
  priest:   { body: '#e8e0c8', hat: 'hood', hatColor: '#e8e0c8', skin: '#e0b090' },
  roman:    { body: '#b02222', hat: 'galea', hatColor: '#c9a227', skin: '#d8a27a', weapon: 'sword', cape: '#7a1010' },
  toga:     { body: '#f0ece0', skin: '#e0b090', hair: '#888', cape: '#c8c0b0' },
  worker:   { body: '#8a7a5a', hat: 'cap', hatColor: '#6a5a3a', skin: '#c89a70' },
  noble:    { body: '#4a2a6a', hat: 'great', hatColor: '#d4af37', skin: '#e0b090', cape: '#8a1a1a' },
  monk:     { body: '#5a4a3a', hat: 'hood', hatColor: '#5a4a3a', skin: '#e0b090' },
  goth:     { body: '#3a5f8a', hat: 'nasal', hatColor: '#9aa3ab', skin: '#e0b090', weapon: 'sword', cape: '#2a3a5a' },
  arab:     { body: '#e8e0c8', hat: 'turban', hatColor: '#fff', skin: '#b88a60', cape: '#2a6a5a' },
  knight:   { body: '#e8e2d0', hat: 'great', hatColor: '#a8b0b8', skin: '#e0b090', cross: '#b02020', weapon: 'longsword' },
  queen:    { body: '#8a1a3a', hat: 'beret', hatColor: '#d4af37', skin: '#e8c0a0', cape: '#5a0a2a' }
};

// ======================= CAPÍTULO 1 =======================
CHAPTERS.push({
  id: 'c1', num: 1, title: 'As Origens', years: 'c. 35.000 – 1.000 a.C.', cls: 'cacador', seed: 1101, currency: 'conchas',
  biome: { ground: '#4f7f3c', ground2: '#4a7838', path: '#8a7350', water: '#2f6a9a', floor: '#7a6a4a', roof: '#6a4a2a', wall: '#6a4a2a',
    obs: ['tree', 'pine', 'rock', 'bush'], density: 0.6, lakes: true, flowers: '#e8d870' },
  intro: [
    'Muito antes de existirem reis, fronteiras ou o próprio nome "Espanha", a Península Ibérica já era habitada. Há mais de um milhão de anos, os primeiros humanos caminharam pelas serras do norte.',
    'Agora estamos no fim da Era do Gelo. Bisontes, auroques e cavalos selvagens atravessam vales cobertos de bosques. Lobos e ursos das cavernas disputam cada presa.',
    'Você é {nome}, um jovem caçador de um clã da Cantábria. O inverno se aproxima, e a Anciã Ama precisa de você.\n\nW, A, S, D para andar. Mouse para mirar. Clique para atacar ou para falar com as pessoas.'
  ],
  outro: [
    'Os milênios passaram. O gelo recuou, e no lugar dos caçadores nômades surgiram aldeias. Por volta de 5.500 a.C., chegaram a agricultura, a cerâmica e os rebanhos.',
    'Depois vieram os metais: o cobre de Los Millares, o bronze de El Argar, e a prata lendária de Tartessos, que encantou gregos e fenícios.',
    'O amuleto de osso de {nome} passou de mão em mão, de geração em geração. Por volta de 1100 a.C., navegantes fenícios fundaram Gadir, a atual Cádiz. Um novo mundo começava a chegar pelo mar.'
  ],
  places: [
    { id: 'aldeia', name: 'Aldeia do Clã', x: 16, y: 40, r: 7, type: 'village', icon: 'fire' },
    { id: 'bosque', name: 'Bosque dos Lobos', x: 38, y: 18, r: 6, type: 'camp' },
    { id: 'atapuerca', name: 'Serra de Atapuerca', x: 60, y: 30, r: 6, type: 'ruin', icon: 'cave' },
    { id: 'vale', name: 'Vale dos Auroques', x: 50, y: 62, r: 7, type: 'camp' },
    { id: 'altamira', name: 'Gruta de Altamira', x: 80, y: 48, r: 6, type: 'ruin', icon: 'cave' },
    { id: 'dolmen', name: 'Dólmen dos Antigos', x: 86, y: 16, r: 5, type: 'ruin', icon: 'dolmen' },
    { id: 'toca', name: 'Toca do Urso', x: 96, y: 66, r: 8, type: 'arena', icon: 'cave' }
  ],
  npcs: [
    { id: 'ama', name: 'Anciã Ama', at: 'aldeia', dx: -2, dy: -1, look: LOOK.elder, lines: ['O fogo é a nossa vida. Nunca deixe que ele se apague.', 'Os mais velhos dizem que nossos ancestrais viviam nas serras desde antes das montanhas terem nome.'] },
    { id: 'beltz', name: 'Beltz, o Caçador', at: 'aldeia', dx: 3, dy: 1, look: LOOK.hunter, lines: ['Mire com o mouse e golpeie. A lança alcança longe, mas acerta em linha reta.', 'Se um animal brilhar e piscar, é porque vai investir. Use Espaço para se esquivar!'] },
    { id: 'nerea', name: 'Nerea (trocas)', at: 'aldeia', dx: -3, dy: 3, shop: true, look: LOOK.trader, lines: ['Conchas do mar valem muito por aqui. O que deseja trocar?'] },
    { id: 'urtzi', name: 'Xamã Urtzi', at: 'atapuerca', dx: 2, dy: 2, look: LOOK.shaman, lines: ['Nesta serra repousam ossos mais antigos do que qualquer lembrança.', 'Os espíritos dos antigos observam você.'] },
    { id: 'ekain', name: 'Ekain, o Pintor', at: 'altamira', dx: -2, dy: 2, look: LOOK.painter, lines: ['O teto desta gruta é a minha tela. Os bisontes parecem se mexer à luz do fogo.', 'Uso carvão, ocre e gordura animal. Nada mais.'] },
    { id: 'txo', name: 'Pequeno Txo', at: 'dolmen', dx: 1, dy: 2, look: LOOK.child, lines: ['Meu avô diz que gigantes ergueram estas pedras!', 'Você já viu o mar? Dizem que ele não tem fim.'] }
  ],
  camps: [{ at: 'bosque', type: 'javali', n: 2 }],
  codex: [
    { id: 'atap', at: 'atapuerca', title: 'Atapuerca: os primeiros europeus', text: 'Na Serra de Atapuerca (Burgos) foram encontrados alguns dos fósseis humanos mais antigos da Europa Ocidental, com mais de um milhão de anos. Ali foi descrita em 1997 uma nova espécie, o Homo antecessor. Na Sima de los Huesos, há restos de cerca de 430 mil anos. O conjunto é Patrimônio Mundial da UNESCO desde 2000.' },
    { id: 'altam', at: 'altamira', title: 'Altamira, a "Capela Sistina" pré-histórica', text: 'As pinturas de bisontes, cavalos e cervos de Altamira (Cantábria) têm até cerca de 36 mil anos. Em 1879, a menina María, filha de Marcelino Sanz de Sautuola, foi a primeira a notar as figuras do teto. Durante anos, muitos especialistas não acreditaram que fossem tão antigas. Hoje são Patrimônio Mundial.' },
    { id: 'neol', at: 'vale', title: 'A revolução neolítica', text: 'Por volta de 5.500 a.C., a agricultura e o pastoreio chegaram à Península pelo Mediterrâneo. Os povos passaram a cultivar trigo e cevada, a criar ovelhas e cabras e a produzir a "cerâmica cardial", decorada com marcas de conchas.' },
    { id: 'megal', at: 'dolmen', title: 'Os construtores de megálitos', text: 'Entre o 4º e o 3º milênio a.C., comunidades ibéricas ergueram dólmens: grandes sepulcros coletivos de pedra. O conjunto de Antequera (Málaga), com o imenso dólmen de Menga, é Patrimônio Mundial desde 2016.' },
    { id: 'metais', at: 'bosque', title: 'Cobre e bronze', text: 'Los Millares (Almería, c. 3200 a.C.) foi um grande povoado fortificado da Idade do Cobre. Mais tarde, a cultura de El Argar (c. 2200–1550 a.C.), no sudeste, dominou o bronze e criou sociedades com chefes e grandes desigualdades.' },
    { id: 'tart', at: 'toca', title: 'Tartessos, o reino da prata', text: 'No sudoeste (Huelva, Sevilha e Cádiz) floresceu Tartessos, entre os séculos IX e VI a.C., rica em prata e estanho. O grego Heródoto conta que seu rei Argantônio teria reinado por 80 anos. Para os gregos, Tartessos era uma terra quase lendária no extremo ocidente do mundo.' }
  ],
  quests: [
    { id: 'main', title: 'O Inverno do Clã', reward: { xp: 120, gold: 30, potions: 2 }, steps: [
      { t: 'talk', npc: 'ama', desc: 'Fale com a Anciã Ama na aldeia', say: [
        ['ama', '{nome}, o inverno chegará cedo este ano. As crianças precisam de peles, e os lobos rondam as nossas trilhas.'],
        ['ama', 'Vá ao Bosque dos Lobos, ao norte. Siga a seta dourada e use sua lança. Volte inteiro.'],
        ['N', 'Dica: clique para atacar. Segure o botão para golpear sem parar. Espaço faz uma esquiva rápida.']] },
      { t: 'kill', e: 'lobo', n: 5, at: 'bosque', desc: 'Cace 5 lobos no Bosque dos Lobos', done: [['H', 'As peles estão garantidas. Mas a ponta da minha lança está lascada...']] },
      { t: 'goto', at: 'atapuerca', desc: 'Vá à Serra de Atapuerca procurar sílex', say: [['N', 'Na serra, há cavernas cheias de ossos antigos, mais velhos do que qualquer lenda do clã.']] },
      { t: 'talk', npc: 'urtzi', desc: 'Fale com o Xamã Urtzi', say: [
        ['urtzi', 'Você pisa sobre o lar dos primeiros. Há mais de um milhão de anos, gente como nós já caçava aqui.'],
        ['urtzi', 'O melhor sílex está espalhado pela encosta. Traga-me cinco pedras e farei pontas dignas de um caçador.']] },
      { t: 'collect', item: 'Sílex', icon: '🪨', n: 5, at: 'atapuerca', desc: 'Recolha 5 pedras de sílex na serra' },
      { t: 'talk', npc: 'urtzi', desc: 'Leve o sílex ao Xamã Urtzi', say: [
        ['urtzi', 'Boas pedras. Tome também isto: um amuleto de osso entalhado com a figura de um bisonte.'],
        ['urtzi', 'Ele guardará a memória de quem o usa. Passe-o aos seus filhos, e eles se lembrarão de você.'],
        ['N', 'Você recebeu o Amuleto de Atapuerca. Ele acompanhará a sua linhagem por toda a história.']] },
      { t: 'kill', e: 'auroque', n: 3, at: 'vale', desc: 'Cace 3 auroques no Vale dos Auroques', done: [['H', 'Carne para todo o inverno! Ekain, o pintor, vai querer saber disso.']] },
      { t: 'talk', npc: 'ekain', desc: 'Conte a caçada a Ekain na Gruta de Altamira', say: [
        ['ekain', 'Três auroques! Vou pintá-los no teto, ao lado dos bisontes, para que nossos netos saibam como caçávamos.'],
        ['ekain', 'Mas cuidado: o Urso das Cavernas Ancião acordou. Ele destruiu o acampamento dos caçadores perto da toca dele, a sudeste.']] },
      { t: 'boss', e: 'urso', at: 'toca', desc: 'Derrote o Urso das Cavernas na Toca do Urso', intro: [['N', 'Um rugido faz tremer as pedras. O Urso das Cavernas Ancião defende o seu território!']],
        done: [['H', 'Acabou... O clã estará seguro neste inverno.']] },
      { t: 'talk', npc: 'ama', desc: 'Volte à Anciã Ama', say: [
        ['ama', 'Você trouxe peles, carne e paz ao clã. Os espíritos sorriram para você.'],
        ['ama', 'Guarde bem o amuleto. Um dia, os seus descendentes verão coisas que nem conseguimos imaginar.']] }
    ] },
    { id: 's1', title: 'Cores da Caverna', req: 8, reward: { xp: 70, gold: 25 }, steps: [
      { t: 'talk', npc: 'ekain', desc: 'Fale com Ekain', say: [['ekain', 'Meu ocre vermelho acabou. Há pedras de ocre no Vale dos Auroques. Pode me trazer cinco?']] },
      { t: 'collect', item: 'Ocre vermelho', icon: '🟥', n: 5, at: 'vale', desc: 'Recolha 5 pedras de ocre no Vale' },
      { t: 'talk', npc: 'ekain', desc: 'Leve o ocre a Ekain', say: [['ekain', 'Perfeito! Com isto, os bisontes do teto ficarão vivos por milhares de anos. Tome algumas conchas.']] }
    ] },
    { id: 's2', title: 'Os Javalis do Bosque', reward: { xp: 60, gold: 25, potions: 1 }, steps: [
      { t: 'talk', npc: 'beltz', desc: 'Fale com Beltz', say: [['beltz', 'Javalis estão destruindo as bolotas que juntamos para o inverno. Cace seis deles no Bosque dos Lobos.']] },
      { t: 'kill', e: 'javali', n: 6, at: 'bosque', desc: 'Cace 6 javalis no Bosque' },
      { t: 'talk', npc: 'beltz', desc: 'Volte a Beltz', say: [['beltz', 'Você caça como os antigos. Leve esta poção de ervas, ela fecha feridas.']] }
    ] },
    { id: 's3', title: 'As Pedras dos Gigantes', reward: { xp: 60, gold: 30 }, steps: [
      { t: 'talk', npc: 'txo', desc: 'Fale com o Pequeno Txo', say: [['txo', 'Perdi as pedrinhas gravadas do meu avô perto do dólmen! São quatro. Me ajuda a achar?']] },
      { t: 'collect', item: 'Pedra gravada', icon: '🔶', n: 4, at: 'dolmen', desc: 'Encontre 4 pedras gravadas perto do Dólmen' },
      { t: 'talk', npc: 'txo', desc: 'Devolva as pedras a Txo', say: [['txo', 'Obrigado! Quando eu crescer, vou erguer uma pedra maior que esta para você!']] }
    ] },
    { id: 's4', title: 'A Sabedoria do Xamã', req: 6, reward: { xp: 90, gold: 35 }, steps: [
      { t: 'talk', npc: 'urtzi', desc: 'Fale com o Xamã Urtzi', say: [['urtzi', 'Leia as crônicas espalhadas por esta terra e depois responda às minhas perguntas.']] },
      { t: 'quiz', npc: 'urtzi', desc: 'Responda ao desafio do Xamã', say: [['urtzi', 'Três perguntas. Errar não é vergonha, mas desistir é.']], qs: [
        { q: 'Em que serra foram achados alguns dos fósseis humanos mais antigos da Europa Ocidental?', o: ['Atapuerca', 'Sierra Nevada', 'Pirineus', 'Montserrat'], a: 0 },
        { q: 'Quem notou primeiro as pinturas do teto de Altamira, em 1879?', o: ['Um rei visigodo', 'A menina María, filha de Sautuola', 'Um monge medieval', 'Um soldado romano'], a: 1 },
        { q: 'Que civilização rica em prata é citada por Heródoto, com o rei Argantônio?', o: ['Tartessos', 'Cartago', 'Micenas', 'Babilônia'], a: 0 }
      ] }
    ] }
  ]
});

// ======================= CAPÍTULO 2 =======================
CHAPTERS.push({
  id: 'c2', num: 2, title: 'Ibéria: Povos, Mercadores e Impérios', years: '1100 – 133 a.C.', cls: 'celtibero', seed: 2202, currency: 'dracmas',
  biome: { ground: '#b49a5c', ground2: '#ab9256', path: '#8a6e44', water: '#3a6a8a', floor: '#9a8060', roof: '#7a5a3a', wall: '#7a5a3a',
    obs: ['rock', 'dry', 'olive'], density: 0.45, sea: 'south' },
  intro: [
    'Fenícios fundaram Gadir (Cádiz). Gregos ergueram Emporion na costa catalã. No interior, iberos e celtas viviam em cidades fortificadas sobre colinas.',
    'No século III a.C., Cartago, a grande potência do norte da África, conquistou o sul e o leste da Península. Sua rival, Roma, observava com desconfiança.',
    'Você é {nome}, guerreiro celtibero de Numância, cidade dos arévacos no alto do rio Douro. Ao seu lado, o amuleto de osso dos seus ancestrais.'
  ],
  outro: [
    'Em 133 a.C., após treze meses de cerco, os numantinos preferiram queimar a cidade a se render. Muitos morreram; os sobreviventes foram vendidos como escravos.',
    'Numância virou símbolo de resistência. Mas Roma venceu. Durante os dois séculos seguintes, legiões avançaram pela Península até dominá-la por completo.',
    'Um dos sobreviventes levou consigo um amuleto de osso. Seus filhos já nasceriam súditos de Roma, numa terra que os romanos chamavam de Hispânia.'
  ],
  places: [
    { id: 'numancia', name: 'Numância', x: 16, y: 30, r: 8, type: 'village', icon: 'walls' },
    { id: 'sagunto', name: 'Ruínas de Sagunto', x: 40, y: 14, r: 6, type: 'ruin', icon: 'walls' },
    { id: 'cart', name: 'Acampamento Cartaginês', x: 64, y: 22, r: 7, type: 'camp', icon: 'tent' },
    { id: 'campos', name: 'Campos de Trigo', x: 24, y: 56, r: 7, type: 'ruin', icon: 'windmill' },
    { id: 'gadir', name: 'Porto de Gadir', x: 46, y: 60, r: 7, type: 'village', icon: 'ship' },
    { id: 'emporion', name: 'Emporion', x: 82, y: 40, r: 6, type: 'ruin', icon: 'temple' },
    { id: 'muralha', name: 'Muralha de Cipião', x: 94, y: 18, r: 7, type: 'camp', icon: 'walls' },
    { id: 'castra', name: 'Acampamento de Cipião', x: 96, y: 58, r: 8, type: 'arena', icon: 'tent' }
  ],
  npcs: [
    { id: 'reto', name: 'Retógenes Caraunio', at: 'numancia', dx: 2, dy: -1, look: LOOK.chief, lines: ['Numância nunca se ajoelhou.', 'Nossas muralhas são pequenas, mas nossos corações não.'] },
    { id: 'sacer', name: 'Sacerdote de Lug', at: 'numancia', dx: -3, dy: 2, look: LOOK.priest, lines: ['Lug, deus da luz e dos ofícios, protege os que trabalham com as mãos.'] },
    { id: 'merc2', name: 'Ferreiro Ambato', at: 'numancia', dx: 3, dy: 3, shop: true, look: LOOK.worker, lines: ['O ferro celtibero é o melhor da Ibéria. Até os romanos copiam nossas espadas.'] },
    { id: 'edeta', name: 'Edeta de Sagunto', at: 'sagunto', dx: 0, dy: 2, look: LOOK.woman, lines: ['Sagunto era uma cidade bonita, sabia? Tinha teatro, mercado, jardins...'] },
    { id: 'abibaal', name: 'Abibaal, o Fenício', at: 'gadir', dx: -2, dy: 1, look: LOOK.phoenic, lines: ['Gadir foi fundada pelos meus antepassados de Tiro. É mais antiga que Roma!', 'Prata, estanho, peixe salgado... tudo passa por este porto.'] },
    { id: 'xeno', name: 'Xenofonte de Emporion', at: 'emporion', dx: 2, dy: 1, look: LOOK.greek, lines: ['Emporion quer dizer "mercado" na minha língua. Viemos de Massália, e antes disso, da Fócida.'] }
  ],
  camps: [],
  codex: [
    { id: 'fen', at: 'gadir', title: 'Fenícios e Gadir', text: 'Segundo a tradição, mercadores fenícios de Tiro fundaram Gadir por volta de 1100 a.C. — o que faria de Cádiz uma das cidades mais antigas do Ocidente. Os fenícios trouxeram o alfabeto, o torno de oleiro e o comércio de longa distância, e fundaram também Malaka (Málaga) e Sexi (Almuñécar).' },
    { id: 'greg', at: 'emporion', title: 'Os gregos de Emporion', text: 'Por volta de 575 a.C., gregos de Massália (Marselha) fundaram Emporion, a atual Empúries, na Catalunha. O nome significa "mercado". As moedas gregas cunhadas ali circularam por toda a costa mediterrânea da Península.' },
    { id: 'iber', at: 'campos', title: 'Os iberos', text: 'Os iberos ocupavam o sul e o leste da Península. Tinham escrita própria (ainda não totalmente decifrada), cidades fortificadas e uma arte refinada, como a Dama de Elche, um busto de pedra encontrado em 1897. Sua arma típica era a falcata, uma espada curva temida até pelos romanos.' },
    { id: 'celt', at: 'numancia', title: 'Os celtiberos', text: 'No centro da Península, povos de origem celta misturados a influências ibéricas formaram os celtiberos: arévacos, belos, titos, lusões. Viviam em cidades fortificadas como Numância e Segeda e eram famosos como guerreiros e ferreiros.' },
    { id: 'carth', at: 'cart', title: 'Cartago na Ibéria', text: 'Após perder a Primeira Guerra Púnica, Cartago buscou riquezas na Ibéria. Amílcar Barca desembarcou em 237 a.C., e seu genro Asdrúbal fundou Cartago Nova (Cartagena) em c. 227 a.C. Em 219 a.C., Aníbal cercou Sagunto, aliada de Roma, o que desencadeou a Segunda Guerra Púnica.' },
    { id: 'numa', at: 'muralha', title: 'O cerco de Numância', text: 'Em 134 a.C., Cipião Emiliano cercou Numância com cerca de 60 mil homens e uma muralha de uns 9 km, com torres e acampamentos. Os cerca de 4 mil defensores resistiram por treze meses. Em 133 a.C., famintos, muitos preferiram a morte à rendição. A expressão "defesa numantina" ainda significa resistência até o fim.' }
  ],
  quests: [
    { id: 'main', title: 'A Última Cidade Livre', reward: { xp: 140, gold: 40, potions: 2 }, steps: [
      { t: 'talk', npc: 'reto', desc: 'Fale com Retógenes em Numância', say: [
        ['reto', '{nome}! Notícias do leste: Aníbal, o cartaginês, cercou Sagunto. Dizem que é o ano 219 antes de... bem, os romanos contam os anos de outro jeito.'],
        ['reto', 'Vá até as ruínas de Sagunto e descubra o que aconteceu. Se Cartago e Roma vão guerrear, a Celtibéria estará no meio.']] },
      { t: 'goto', at: 'sagunto', desc: 'Vá às ruínas de Sagunto', say: [['N', 'Sagunto resistiu ao cerco de Aníbal por oito meses. Roma, sua aliada, não chegou a tempo.']] },
      { t: 'talk', npc: 'edeta', desc: 'Fale com Edeta, sobrevivente de Sagunto', say: [
        ['edeta', 'Lutamos até não haver mais o que comer. Muitos preferiram o fogo à escravidão.'],
        ['edeta', 'Agora os mercenários de Aníbal recrutam à força nas aldeias. Estão acampados a leste. Por favor, liberte os nossos!']] },
      { t: 'kill', e: 'mercenario', n: 6, at: 'cart', desc: 'Derrote 6 mercenários cartagineses' },
      { t: 'kill', e: 'fundeiro', n: 4, at: 'cart', desc: 'Derrote 4 fundeiros baleares', done: [['N', 'Os fundeiros das ilhas Baleares eram os melhores atiradores do Mediterrâneo. Cartago pagava caro por eles.']] },
      { t: 'talk', npc: 'reto', desc: 'Volte a Retógenes', say: [
        ['N', 'Os anos passaram. Roma venceu Cartago e expulsou os púnicos da Ibéria em 206 a.C. Mas não foi embora.'],
        ['N', 'Agora você é o neto daquele guerreiro: tem o mesmo nome, {nome}, e carrega o mesmo amuleto. Retógenes, neto do velho chefe, lidera Numância.'],
        ['reto', 'Já faz duas gerações que lutamos contra Roma. Agora, em 134 a.C., Cipião Emiliano nos cercou com uma muralha enorme.'],
        ['reto', 'A fome é o nosso pior inimigo. Busque todo o trigo que restou nos campos ao sul.']] },
      { t: 'collect', item: 'Feixe de trigo', icon: '🌾', n: 6, at: 'campos', desc: 'Recolha 6 feixes de trigo nos campos' },
      { t: 'kill', e: 'romano', n: 8, at: 'muralha', desc: 'Ataque a Muralha de Cipião: derrote 8 legionários', done: [['H', 'A muralha tem torres por toda parte... Ninguém sai, ninguém entra.']] },
      { t: 'talk', npc: 'reto', desc: 'Fale com Retógenes', say: [
        ['reto', 'Esta noite vou escalar a muralha com cinco companheiros e pedir ajuda às cidades arévacas.'],
        ['reto', 'Enquanto isso, ataque o acampamento de Cipião, a sudeste. Derrube o legado dele e dê ao nosso povo um dia de esperança.']] },
      { t: 'boss', e: 'legado', at: 'castra', desc: 'Derrote o Legado de Cipião no acampamento romano', intro: [['N', 'O legado de Cipião ergue o gládio: "Numância cairá, celtibero!"']] },
      { t: 'talk', npc: 'reto', desc: 'Volte a Numância', say: [
        ['reto', 'Voltei de mãos vazias. A cidade de Lútia quis nos ajudar, mas Cipião chegou primeiro e castigou duramente os seus jovens.'],
        ['reto', 'Numância não se renderá. {nome}, leve o amuleto da sua família e fuja pelos campos. Alguém precisa lembrar de nós.']] }
    ] },
    { id: 's1', title: 'Púrpura Fenícia', reward: { xp: 80, gold: 40 }, steps: [
      { t: 'talk', npc: 'abibaal', desc: 'Fale com Abibaal em Gadir', say: [['abibaal', 'A tinta púrpura vale mais que ouro! Ela vem do caracol múrex. Traga-me cinco conchas da praia de Gadir.']] },
      { t: 'collect', item: 'Concha de múrex', icon: '🐚', n: 5, at: 'gadir', desc: 'Recolha 5 conchas de múrex em Gadir' },
      { t: 'talk', npc: 'abibaal', desc: 'Entregue as conchas a Abibaal', say: [['abibaal', 'Esplêndido! Para fazer um único manto, precisamos de milhares destes caracóis. Tome a sua parte.']] }
    ] },
    { id: 's2', title: 'Os Elefantes de Aníbal', req: 3, reward: { xp: 100, gold: 45, potions: 1 }, steps: [
      { t: 'talk', npc: 'edeta', desc: 'Fale com Edeta', say: [['edeta', 'Os cartagineses trouxeram elefantes de guerra! Eles esmagam as plantações. Detenha três deles.']] },
      { t: 'kill', e: 'elefante', n: 3, at: 'cart', desc: 'Detenha 3 elefantes de guerra' },
      { t: 'talk', npc: 'edeta', desc: 'Volte a Edeta', say: [['edeta', 'Aníbal levou dezenas desses animais pelos Alpes até a Itália em 218 a.C. Poucos sobreviveram ao frio. Obrigada.']] }
    ] },
    { id: 's3', title: 'Vinho de Emporion', reward: { xp: 80, gold: 50 }, steps: [
      { t: 'talk', npc: 'xeno', desc: 'Fale com Xenofonte em Emporion', say: [['xeno', 'Uma tempestade espalhou minhas ânforas de vinho pela costa. São cinco. Ajude um pobre mercador grego!']] },
      { t: 'collect', item: 'Ânfora', icon: '🏺', n: 5, at: 'emporion', desc: 'Recolha 5 ânforas perto de Emporion' },
      { t: 'talk', npc: 'xeno', desc: 'Devolva as ânforas', say: [['xeno', 'Os deuses enviaram você! Tome estas dracmas, cunhadas aqui mesmo em Emporion.']] }
    ] },
    { id: 's4', title: 'O Conselho do Sacerdote', req: 5, reward: { xp: 110, gold: 50 }, steps: [
      { t: 'talk', npc: 'sacer', desc: 'Fale com o Sacerdote de Lug', say: [['sacer', 'Quem não conhece o passado não defende o futuro. Venha provar o que sabe.']] },
      { t: 'quiz', npc: 'sacer', desc: 'Responda ao Sacerdote de Lug', qs: [
        { q: 'Que cidade fenícia, fundada segundo a tradição por volta de 1100 a.C., é hoje Cádiz?', o: ['Gadir', 'Malaka', 'Emporion', 'Tarraco'], a: 0 },
        { q: 'Qual cidade aliada de Roma foi cercada por Aníbal em 219 a.C.?', o: ['Numância', 'Sagunto', 'Toledo', 'Segeda'], a: 1 },
        { q: 'Qual é o nome da espada curva típica dos iberos?', o: ['Gládio', 'Falcata', 'Cimitarra', 'Spatha'], a: 1 }
      ] }
    ] }
  ]
});

// ======================= CAPÍTULO 3 =======================
CHAPTERS.push({
  id: 'c3', num: 3, title: 'Hispânia Romana', years: '133 a.C. – 409 d.C.', cls: 'legionario', seed: 3303, currency: 'denários',
  biome: { ground: '#8f9a50', ground2: '#879248', path: '#a09a88', water: '#3a6a9a', floor: '#c8bfa8', roof: '#a84a2a', wall: '#a84a2a',
    obs: ['cypress', 'olive', 'rock', 'column'], density: 0.42, river: true },
  intro: [
    'Roma levou quase dois séculos para dominar a Península. As últimas a resistir foram as tribos do norte: cântabros e ástures.',
    'Em 26 a.C., o próprio imperador Augusto veio à Hispânia comandar a guerra. Estradas, pontes e cidades começaram a surgir por toda parte.',
    'Você é {nome}, neto de numantinos, mas nascido sob Roma. Alistou-se na legião em troca de cidadania e de um pedaço de terra. O velho amuleto de osso continua pendurado no seu pescoço.'
  ],
  outro: [
    'Com a paz, a Hispânia se tornou uma das províncias mais ricas do Império. Dela saíram azeite, vinho, garum, ouro e prata, além de imperadores como Trajano e Adriano e escritores como Sêneca, Lucano, Marcial e Quintiliano.',
    'O latim deu origem ao castelhano, ao catalão, ao galego e ao português. O cristianismo se espalhou a partir do século III.',
    'Mas o Império enfraquecia. Em 409 d.C., suevos, vândalos e alanos cruzaram os Pireneus. Pouco depois chegaram os visigodos. Os descendentes de {nome} viveriam sob novos senhores.'
  ],
  places: [
    { id: 'emerita', name: 'Emerita Augusta', x: 14, y: 44, r: 8, type: 'village', icon: 'temple' },
    { id: 'via', name: 'Via da Prata', x: 34, y: 20, r: 6, type: 'camp' },
    { id: 'italica', name: 'Itálica', x: 46, y: 62, r: 7, type: 'village', icon: 'statue' },
    { id: 'segovia', name: 'Aqueduto de Segóvia', x: 58, y: 20, r: 6, type: 'ruin', icon: 'aqueduct' },
    { id: 'medulas', name: 'Las Médulas', x: 76, y: 62, r: 6, type: 'ruin', icon: 'cave' },
    { id: 'montes', name: 'Montes Cantábricos', x: 84, y: 30, r: 7, type: 'camp' },
    { id: 'covil', name: 'Covil de Corocotta', x: 98, y: 12, r: 8, type: 'arena', icon: 'fire' }
  ],
  npcs: [
    { id: 'marcus', name: 'Centurião Marco Petrônio', at: 'emerita', dx: 2, dy: 1, look: LOOK.roman, lines: ['Disciplina, legionário! É assim que Roma conquista o mundo.', 'Emerita foi fundada para veteranos como nós. Um dia você terá terra aqui.'] },
    { id: 'lucius', name: 'Taberna de Lúcio', at: 'emerita', dx: -3, dy: 2, shop: true, look: LOOK.trader, lines: ['Vinho da Bética, azeite, garum... e poções do boticário grego!'] },
    { id: 'seneca', name: 'Sêneca, o Velho', at: 'italica', dx: 2, dy: 1, look: LOOK.toga, lines: ['Nasci em Córdoba e ensino retórica. Um dia meu filho será filósofo... espero.'] },
    { id: 'trajano', name: 'Pequeno Marco Úlpio', at: 'italica', dx: -2, dy: 2, look: LOOK.child, lines: ['Quando eu crescer, vou comandar legiões!'] },
    { id: 'quinto', name: 'Mestre de obras Quinto', at: 'segovia', dx: 1, dy: 2, look: LOOK.worker, lines: ['Água limpa para uma cidade inteira, vinda das serras. É isso que Roma oferece.'] },
    { id: 'medug', name: 'Medugeno, o Mineiro', at: 'medulas', dx: -1, dy: 2, look: LOOK.worker, lines: ['Derrubamos montanhas inteiras com água para tirar ouro. Os antigos chamam isso de ruina montium.'] }
  ],
  camps: [{ at: 'via', type: 'bandido', n: 3 }],
  codex: [
    { id: 'cant', at: 'montes', title: 'As Guerras Cantábricas', text: 'Entre 29 e 19 a.C., Roma lutou contra cântabros e ástures no norte da Península. O próprio Augusto esteve na campanha em 26–25 a.C. A guerra foi tão dura que Agripa precisou concluí-la. Só então toda a Península ficou sob domínio romano — quase 200 anos depois da chegada das primeiras legiões.' },
    { id: 'emer', at: 'emerita', title: 'Emerita Augusta', text: 'Fundada em 25 a.C. para os veteranos (eméritos) das Guerras Cantábricas, Emerita Augusta (Mérida) virou capital da província da Lusitânia. Seu teatro, anfiteatro, pontes e templos formam um dos maiores conjuntos arqueológicos romanos da Espanha, Patrimônio Mundial desde 1993.' },
    { id: 'aqued', at: 'segovia', title: 'O Aqueduto de Segóvia', text: 'Construído provavelmente entre o fim do século I e o início do século II d.C., o aqueduto leva água da serra até a cidade. Sua parte mais alta tem cerca de 28 metros, e as pedras de granito se mantêm unidas sem argamassa, apenas pelo equilíbrio do peso.' },
    { id: 'ital', at: 'italica', title: 'Itálica e os imperadores', text: 'Itálica, perto de Sevilha, foi fundada em 206 a.C. por Cipião, o Africano, para soldados feridos. Ali nasceu Trajano (53 d.C.), o primeiro imperador romano nascido fora da Itália. Seu sucessor, Adriano, também tinha família de Itálica.' },
    { id: 'medu', at: 'medulas', title: 'Las Médulas', text: 'Em Las Médulas (León), os romanos extraíram ouro derrubando montanhas com a força da água canalizada, técnica descrita por Plínio, o Velho, como ruina montium. A paisagem avermelhada de picos recortados é Patrimônio Mundial desde 1997.' },
    { id: 'crist', at: 'via', title: 'Cristianismo e o fim de Roma', text: 'O cristianismo chegou cedo à Hispânia. O Concílio de Elvira (c. 300–306, perto de Granada) é um dos mais antigos de que se têm atas. Em 409 d.C., suevos, vândalos e alanos atravessaram os Pireneus, e o domínio romano começou a desmoronar.' }
  ],
  quests: [
    { id: 'main', title: 'A Paz de Augusto', reward: { xp: 160, gold: 50, potions: 2 }, steps: [
      { t: 'talk', npc: 'marcus', desc: 'Apresente-se ao Centurião Marco Petrônio', say: [
        ['marcus', 'Legionário {nome}! Augusto fundou Emerita para os veteranos desta guerra. Mas a guerra ainda não acabou.'],
        ['marcus', 'Bandidos assaltam os comboios na Via da Prata. Sem estradas seguras, não há abastecimento. Limpe a via!']] },
      { t: 'kill', e: 'bandido', n: 6, at: 'via', desc: 'Derrote 6 bandidos na Via da Prata' },
      { t: 'talk', npc: 'seneca', desc: 'Leve o relatório a Sêneca, em Itálica', say: [
        ['seneca', 'Os bandidos da via diziam obedecer a um certo Corocotta, um cântabro que zomba das legiões.'],
        ['seneca', 'Augusto ofereceu 200 mil sestércios pela cabeça dele! Uma fortuna. Ele se esconde nas montanhas do norte.']] },
      { t: 'kill', e: 'cantabro', n: 8, at: 'montes', desc: 'Derrote 8 guerreiros cântabros nos Montes' },
      { t: 'kill', e: 'astur', n: 5, at: 'montes', desc: 'Derrote 5 arqueiros ástures', done: [['H', 'Lutam como os meus avós lutavam em Numância... É estranho estar do outro lado.']] },
      { t: 'collect', item: 'Pista de Corocotta', icon: '👣', n: 4, at: 'medulas', desc: 'Siga 4 pistas de Corocotta perto de Las Médulas' },
      { t: 'boss', e: 'corocotta', at: 'covil', desc: 'Enfrente Corocotta no seu covil', intro: [['N', '"Roma quer a minha cabeça? Venha buscá-la!", grita Corocotta.']], done: [['N', 'Ferido, Corocotta escapa pelas montanhas. Mas o seu bando está desfeito.']] },
      { t: 'talk', npc: 'marcus', desc: 'Volte a Emerita Augusta', say: [
        ['marcus', 'Você não vai acreditar, {nome}. Corocotta foi a Roma e se apresentou a Augusto para cobrar ele mesmo a recompensa!'],
        ['marcus', 'O imperador achou tanta graça na ousadia que pagou e o perdoou. Pelo menos é o que conta o historiador Dião Cássio.'],
        ['marcus', 'A guerra terminou em 19 a.C. Agora começa a paz romana. Você ganhou a sua terra, veterano.']] }
    ] },
    { id: 's1', title: 'Pedras sem Argamassa', reward: { xp: 90, gold: 55 }, steps: [
      { t: 'talk', npc: 'quinto', desc: 'Fale com o mestre de obras Quinto', say: [['quinto', 'Faltam blocos de granito para terminar estes arcos. Seis blocos, e cada um no lugar exato!']] },
      { t: 'collect', item: 'Bloco de granito', icon: '🧱', n: 6, at: 'segovia', desc: 'Recolha 6 blocos de granito' },
      { t: 'talk', npc: 'quinto', desc: 'Leve os blocos a Quinto', say: [['quinto', 'Não usamos argamassa: o peso de cada pedra segura a outra. Este aqueduto vai durar milênios, você vai ver.']] }
    ] },
    { id: 's2', title: 'O Ouro de Las Médulas', reward: { xp: 90, gold: 60, potions: 1 }, steps: [
      { t: 'talk', npc: 'medug', desc: 'Fale com Medugeno, o mineiro', say: [['medug', 'Lobos atacam os mineiros à noite. Abata seis deles e poderemos trabalhar em paz.']] },
      { t: 'kill', e: 'lobo', n: 6, at: 'medulas', desc: 'Abata 6 lobos em Las Médulas' },
      { t: 'talk', npc: 'medug', desc: 'Volte a Medugeno', say: [['medug', 'Obrigado. Plínio diz que daqui sai ouro como de nenhum outro lugar do Império. Pena que não fica para nós...']] }
    ] },
    { id: 's3', title: 'O Futuro Imperador', req: 3, reward: { xp: 90, gold: 50 }, steps: [
      { t: 'talk', npc: 'trajano', desc: 'Fale com o pequeno Marco Úlpio', say: [
        ['N', 'Décadas depois, por volta de 60 d.C., em Itálica...'],
        ['trajano', 'Perdi minhas tabuinhas de cera na estrada para Emerita! Sem elas, meu professor vai me castigar. São quatro.']] },
      { t: 'collect', item: 'Tabuinha de cera', icon: '📜', n: 4, at: 'emerita', desc: 'Encontre 4 tabuinhas de cera perto de Emerita' },
      { t: 'talk', npc: 'trajano', desc: 'Devolva as tabuinhas', say: [
        ['trajano', 'Muito obrigado! Meu nome completo é Marco Úlpio Trajano. Lembre-se dele!'],
        ['N', 'Em 98 d.C., aquele menino se tornaria imperador. Sob Trajano, o Império Romano atingiu a sua maior extensão.']] }
    ] },
    { id: 's4', title: 'A Retórica de Córdoba', req: 4, reward: { xp: 120, gold: 60 }, steps: [
      { t: 'talk', npc: 'seneca', desc: 'Fale com Sêneca, o Velho', say: [['seneca', 'Um bom cidadão romano conhece a sua província. Vamos ver o que você aprendeu.']] },
      { t: 'quiz', npc: 'seneca', desc: 'Responda às perguntas de Sêneca', qs: [
        { q: 'Que cidade Augusto fundou em 25 a.C. para veteranos, hoje chamada Mérida?', o: ['Emerita Augusta', 'Caesaraugusta', 'Tarraco', 'Corduba'], a: 0 },
        { q: 'Qual imperador nascido em Itálica foi o primeiro nascido fora da Itália?', o: ['Nero', 'Trajano', 'Augusto', 'Constantino'], a: 1 },
        { q: 'Como as pedras do Aqueduto de Segóvia se mantêm unidas?', o: ['Com cimento romano', 'Com grampos de ferro', 'Sem argamassa, pelo próprio peso', 'Com resina'], a: 2 }
      ] }
    ] }
  ]
});

// ======================= CAPÍTULO 4 =======================
CHAPTERS.push({
  id: 'c4', num: 4, title: 'O Reino Visigodo de Toledo', years: '409 – 711', cls: 'godo', seed: 4404, currency: 'soldos',
  biome: { ground: '#8c8c52', ground2: '#848449', path: '#8a7a54', water: '#3a6a8a', floor: '#a89a7a', roof: '#7a5a3a', wall: '#7a5a3a',
    obs: ['rock', 'tree', 'dry'], density: 0.5, lakes: true },
  intro: [
    'Depois de 409, a Hispânia virou campo de batalha entre povos germânicos. Os vândalos seguiram para a África, os alanos foram destruídos, e os suevos fundaram um reino no noroeste, na Galécia.',
    'Os visigodos, aliados de Roma, acabaram dominando quase toda a Península e fizeram de Toledo a sua capital.',
    'Ano 584. Você é {nome}, guerreiro a serviço do rei Leovigildo, que sonha unir toda a Hispânia sob uma só coroa.'
  ],
  outro: [
    'Recaredo se converteu ao catolicismo em 589, e godos e hispano-romanos foram se fundindo num só povo. Em 654, o Liber Iudiciorum deu leis iguais a todos.',
    'Mas o reino era frágil: os nobres disputavam o trono, e muitos reis morreram assassinados. Em 710, a morte de Vitiza abriu uma guerra entre facções, e Rodrigo ficou com a coroa.',
    'Em 711, um exército muçulmano de árabes e berberes comandado por Táriq ibn Ziyad atravessou o estreito. Rodrigo morreu na batalha de Guadalete, e em poucos anos o reino visigodo desapareceu. Os descendentes de {nome} fugiram para as montanhas do norte.'
  ],
  places: [
    { id: 'toledo', name: 'Toledo', x: 16, y: 36, r: 8, type: 'village', icon: 'church' },
    { id: 'guarrazar', name: 'Fonte de Guarrazar', x: 40, y: 14, r: 5, type: 'ruin', icon: 'statue' },
    { id: 'bagaudas', name: 'Vale dos Bagaudas', x: 36, y: 60, r: 7, type: 'camp', icon: 'fire' },
    { id: 'escola', name: 'Escola de Sevilha', x: 60, y: 64, r: 6, type: 'village', icon: 'church' },
    { id: 'fronteira', name: 'Fronteira Sueva', x: 72, y: 22, r: 7, type: 'camp', icon: 'tent' },
    { id: 'galecia', name: 'Bosques da Galécia', x: 90, y: 44, r: 7, type: 'camp' },
    { id: 'fortaleza', name: 'Fortaleza de Andeca', x: 98, y: 68, r: 8, type: 'arena', icon: 'castle' }
  ],
  npcs: [
    { id: 'claudio', name: 'Duque Cláudio', at: 'toledo', dx: 2, dy: 1, look: LOOK.goth, lines: ['Sou hispano-romano, mas sirvo ao rei godo. Os tempos mudaram.'] },
    { id: 'leovi', name: 'Rei Leovigildo', at: 'toledo', dx: -1, dy: -2, look: LOOK.noble, lines: ['Uma Hispânia, uma coroa. É o meu sonho.', 'Fui o primeiro rei godo a usar trono e manto como os imperadores.'] },
    { id: 'recaredo', name: 'Príncipe Recaredo', at: 'toledo', dx: -3, dy: 1, look: Object.assign({}, LOOK.noble, { body: '#2a4a7a' }), lines: ['Meu pai é severo. Eu prefiro convencer a vencer.'] },
    { id: 'merc4', name: 'Mercador Sírio', at: 'toledo', dx: 3, dy: 3, shop: true, look: LOOK.phoenic, lines: ['Seda, especiarias, papiro... e poções de Alexandria!'] },
    { id: 'pastor', name: 'Pastor Sunila', at: 'toledo', dx: -4, dy: 3, look: LOOK.worker, lines: ['As ovelhas são a riqueza da meseta.'] },
    { id: 'isidoro', name: 'Isidoro de Sevilha', at: 'escola', dx: 1, dy: 2, look: LOOK.monk, lines: ['Quero reunir todo o saber do mundo em um só livro.'] },
    { id: 'ourives', name: 'Ourives Teudila', at: 'guarrazar', dx: 1, dy: 2, look: LOOK.trader, lines: ['As coroas votivas são oferecidas a Deus pelos reis. São pura arte.'] }
  ],
  camps: [],
  codex: [
    { id: 'inv', at: 'bagaudas', title: 'As invasões de 409', text: 'Em 409, suevos, vândalos e alanos atravessaram os Pireneus. Os vândalos passaram à África em 429, os suevos fundaram um reino na Galécia (atual Galiza e norte de Portugal), e os visigodos, como aliados de Roma, foram dominando a Península ao longo do século V. Ao mesmo tempo, revoltas camponesas — os "bagaudas" — agitavam o vale do Ebro.' },
    { id: 'tol', at: 'toledo', title: 'Toledo, a capital', text: 'Leovigildo (rei de 568/569 a 586) fixou a corte em Toledo, que se tornou a capital do reino visigodo e o centro político e religioso da Hispânia. Os grandes Concílios de Toledo reuniam bispos e nobres e tratavam tanto de fé quanto de política.' },
    { id: 'leo', at: 'fronteira', title: 'Leovigildo, o unificador', text: 'Leovigildo combateu bizantinos, cântabros e bascos e, em 585, conquistou o reino suevo, derrotando o usurpador Andeca. Foi também o primeiro rei visigodo a cunhar moedas com o próprio nome e a usar símbolos imperiais.' },
    { id: 'rec', at: 'galecia', title: 'Recaredo e o ano de 589', text: 'Os visigodos eram cristãos arianos, enquanto os hispano-romanos eram católicos. Em 589, no III Concílio de Toledo, o rei Recaredo se converteu ao catolicismo, o que aproximou os dois povos.' },
    { id: 'isid', at: 'escola', title: 'Isidoro de Sevilha', text: 'Isidoro (c. 560–636), bispo de Sevilha, escreveu as "Etimologias", uma enciclopédia de todo o saber da época, lida em toda a Europa durante a Idade Média. Em sua obra há um famoso louvor à Espanha, a "Laus Spaniae". Em 2002 ele foi proposto como padroeiro da internet.' },
    { id: 'guarr', at: 'guarrazar', title: 'Coroas de Guarrazar e o Liber Iudiciorum', text: 'O Tesouro de Guarrazar, achado em 1858 perto de Toledo, reúne coroas votivas de ouro e pedras preciosas, como a do rei Recesvinto. Esse mesmo rei promulgou em 654 o Liber Iudiciorum, um código de leis válido igualmente para godos e hispano-romanos.' }
  ],
  quests: [
    { id: 'main', title: 'Uma Hispânia, uma Coroa', reward: { xp: 180, gold: 60, potions: 2 }, steps: [
      { t: 'talk', npc: 'claudio', desc: 'Fale com o Duque Cláudio em Toledo', say: [
        ['claudio', 'Ano 584. O rei Leovigildo quer unir a Hispânia: suevos no noroeste, bizantinos no sul, rebeldes por toda parte.'],
        ['claudio', 'Comece pelos bagaudas do vale ao sul. Eles assaltam aldeias e caravanas.']] },
      { t: 'kill', e: 'bagauda', n: 6, at: 'bagaudas', desc: 'Derrote 6 bagaudas no vale', done: [['H', 'Muitos deles eram camponeses famintos... A guerra não é simples.']] },
      { t: 'talk', npc: 'leovi', desc: 'Fale com o rei Leovigildo', say: [
        ['leovi', 'Bom trabalho. Agora, a Galécia: o usurpador Andeca derrubou o rei suevo e tomou o trono. É a nossa chance.'],
        ['leovi', 'Atravesse a fronteira, derrote os arqueiros e a cavalaria sueva e tome a fortaleza dele.']] },
      { t: 'kill', e: 'suevo_arq', n: 5, at: 'fronteira', desc: 'Derrote 5 arqueiros suevos na fronteira' },
      { t: 'kill', e: 'suevo_cav', n: 4, at: 'galecia', desc: 'Derrote 4 cavaleiros suevos na Galécia' },
      { t: 'boss', e: 'andeca', at: 'fortaleza', desc: 'Derrote Andeca na sua fortaleza', intro: [['N', 'Andeca, rei sem direito ao trono, defende as muralhas com fúria.']], done: [['N', 'Em 585, o reino suevo, que durou mais de 170 anos, passou a fazer parte do reino visigodo.']] },
      { t: 'talk', npc: 'recaredo', desc: 'Volte a Toledo e fale com Recaredo', say: [
        ['recaredo', 'Meu pai morreu, {nome}. Agora eu sou o rei.'],
        ['recaredo', 'Godos arianos e hispanos católicos ainda se olham como estranhos. Em 589 vou me converter diante de todos os bispos, no Concílio de Toledo.'],
        ['recaredo', 'Leve uma mensagem minha a um jovem sábio de Sevilha: Isidoro.']] },
      { t: 'talk', npc: 'isidoro', desc: 'Leve a mensagem a Isidoro, na Escola de Sevilha', say: [
        ['isidoro', 'Uma carta do rei? Que honra. Escute: estou escrevendo um livro que vai reunir todo o saber do mundo.'],
        ['isidoro', 'Mas o vento espalhou meus manuscritos pelos campos. Traga-os, por favor. São seis.']] },
      { t: 'collect', item: 'Manuscrito', icon: '📖', n: 6, at: 'escola', desc: 'Recolha 6 manuscritos de Isidoro' },
      { t: 'talk', npc: 'isidoro', desc: 'Devolva os manuscritos a Isidoro', say: [
        ['isidoro', 'Graças a você, as "Etimologias" estarão completas. Ouça o que escrevi sobre esta terra:'],
        ['isidoro', '"Tu és, ó Hispânia, a mais formosa de todas as terras que se estendem do Ocidente até a Índia."'],
        ['isidoro', 'Que ela tenha paz. Temo que os nobres, sempre brigando pelo trono, acabem por perdê-la.']] }
    ] },
    { id: 's1', title: 'As Coroas de Guarrazar', reward: { xp: 110, gold: 70 }, steps: [
      { t: 'talk', npc: 'ourives', desc: 'Fale com o ourives Teudila', say: [['ourives', 'Preciso de cinco safiras para a coroa votiva do rei. Caíram de uma carroça perto da fonte.']] },
      { t: 'collect', item: 'Safira', icon: '💎', n: 5, at: 'guarrazar', desc: 'Encontre 5 safiras perto de Guarrazar' },
      { t: 'talk', npc: 'ourives', desc: 'Entregue as safiras', say: [['ourives', 'Esta coroa ficará pendurada sobre o altar. Talvez um dia alguém a encontre enterrada e se maravilhe.']] }
    ] },
    { id: 's2', title: 'Lobos na Meseta', reward: { xp: 100, gold: 60, potions: 1 }, steps: [
      { t: 'talk', npc: 'pastor', desc: 'Fale com o pastor Sunila', say: [['pastor', 'Lobos atacam meu rebanho perto do Vale dos Bagaudas. Abata seis, por favor.']] },
      { t: 'kill', e: 'lobo', n: 6, at: 'bagaudas', desc: 'Abata 6 lobos no Vale dos Bagaudas' },
      { t: 'talk', npc: 'pastor', desc: 'Volte ao pastor', say: [['pastor', 'Que Deus lhe pague! Tome isto, pela lã que você salvou.']] }
    ] },
    { id: 's3', title: 'O Concílio do Duque', req: 7, reward: { xp: 140, gold: 70 }, steps: [
      { t: 'talk', npc: 'claudio', desc: 'Fale com o Duque Cláudio', say: [['claudio', 'Antes do concílio, quero saber se você entende o reino que defende.']] },
      { t: 'quiz', npc: 'claudio', desc: 'Responda ao Duque Cláudio', qs: [
        { q: 'Qual cidade foi a capital do reino visigodo?', o: ['Toledo', 'Barcelona', 'Mérida', 'Sevilha'], a: 0 },
        { q: 'Em que ano Recaredo se converteu ao catolicismo no III Concílio de Toledo?', o: ['409', '589', '711', '1085'], a: 1 },
        { q: 'Que obra enciclopédica escreveu Isidoro de Sevilha?', o: ['Etimologias', 'Cantar de mio Cid', 'Dom Quixote', 'Crônica Albeldense'], a: 0 }
      ] }
    ] }
  ]
});

// ======================= CAPÍTULO 5 =======================
CHAPTERS.push({
  id: 'c5', num: 5, title: 'Covadonga e Al-Andalus', years: '711 – 1031', cls: 'asturiano', seed: 5505, currency: 'soldos',
  biome: { ground: '#3f6a3a', ground2: '#3a6435', path: '#7a6a4a', water: '#2f5f8a', floor: '#8a7a5a', roof: '#5a4a3a', wall: '#5a4a3a',
    obs: ['pine', 'rock', 'tree', 'snow'], density: 0.68, lakes: true, flowers: '#d8d8f8' },
  intro: [
    'Em poucos anos depois de 711, quase toda a Península passou ao domínio muçulmano. Os árabes a chamaram de Al-Andalus.',
    'Só nas montanhas do norte alguns grupos resistiram. Nas Astúrias, um nobre chamado Pelayo se recusou a pagar tributos.',
    'Ano 722. Você é {nome}, descendente de godos refugiados nas montanhas. Um exército vem acabar com a rebelião.'
  ],
  outro: [
    'Al-Andalus viveu o seu apogeu sob o Califado de Córdoba: talvez a maior cidade da Europa ocidental, com bibliotecas, ruas iluminadas e sábios muçulmanos, judeus e cristãos.',
    'Mas, depois da morte de Almanzor (1002), o califado mergulhou em guerras civis e acabou em 1031, fragmentado em dezenas de pequenos reinos: as taifas.',
    'No norte, os reinos cristãos cresciam: Leão, Castela, Navarra, Aragão e os condados catalães. A fronteira começou a se mover para o sul.'
  ],
  places: [
    { id: 'cangas', name: 'Cangas de Onís', x: 14, y: 20, r: 7, type: 'village', icon: 'fire' },
    { id: 'garganta', name: 'Desfiladeiro', x: 36, y: 34, r: 6, type: 'camp' },
    { id: 'cova', name: 'Cova de Covadonga', x: 54, y: 14, r: 6, type: 'ruin', icon: 'cave' },
    { id: 'valle', name: 'Vale de Covadonga', x: 74, y: 24, r: 8, type: 'arena' },
    { id: 'compostela', name: 'Compostela', x: 22, y: 62, r: 7, type: 'village', icon: 'church' },
    { id: 'marca', name: 'Marca do Douro', x: 54, y: 52, r: 7, type: 'camp', icon: 'tent' },
    { id: 'cordoba', name: 'Córdoba', x: 88, y: 62, r: 9, type: 'village', icon: 'mosque' }
  ],
  npcs: [
    { id: 'pelayo', name: 'Pelayo', at: 'cangas', dx: 2, dy: 1, look: Object.assign({}, LOOK.goth, { body: '#4f6f34' }), lines: ['Estas montanhas são a nossa muralha.'] },
    { id: 'toda', name: 'Rainha Toda de Pamplona', at: 'cangas', dx: -3, dy: -1, look: LOOK.queen, lines: ['Sou avó de reis e não aceito um não como resposta.'] },
    { id: 'pastora', name: 'Pastora Munia', at: 'cangas', dx: -2, dy: 3, look: LOOK.woman, lines: ['O frio aqui em cima é tão duro quanto as pessoas.'] },
    { id: 'merc5', name: 'Mascate Fruela', at: 'cangas', dx: 3, dy: 3, shop: true, look: LOOK.trader, lines: ['Trago coisas do sul, se o caminho estiver seguro.'] },
    { id: 'eremita', name: 'Eremita da Cova', at: 'cova', dx: 1, dy: 2, look: LOOK.monk, lines: ['Nesta gruta, a fé e a rocha são uma coisa só.'] },
    { id: 'teodomiro', name: 'Bispo Teodomiro', at: 'compostela', dx: 2, dy: 1, look: LOOK.priest, lines: ['Peregrinos vêm de toda a Europa até aqui.'] },
    { id: 'hasdai', name: 'Hasdai ibn Shaprut', at: 'cordoba', dx: -2, dy: 2, look: Object.assign({}, LOOK.arab, { body: '#3a4a7a', hatColor: '#3a4a7a' }), lines: ['Sou médico e diplomata do califa. Em Córdoba, judeus, cristãos e muçulmanos estudam lado a lado.'] },
    { id: 'abbas', name: 'Abbas ibn Firnas', at: 'cordoba', dx: 3, dy: -1, look: LOOK.arab, lines: ['O homem nasceu para voar. Eu tenho certeza!'] }
  ],
  camps: [],
  codex: [
    { id: 'guad', at: 'garganta', title: '711: Guadalete', text: 'Em 711, Táriq ibn Ziyad atravessou o estreito com um exército de berberes e árabes — o nome Gibraltar vem de Jabal Táriq, "montanha de Táriq". O rei Rodrigo foi derrotado na batalha de Guadalete, e em poucos anos quase toda a Península passou ao domínio do califado omíada de Damasco.' },
    { id: 'cova', at: 'cova', title: 'Covadonga (722)', text: 'Segundo as crônicas asturianas, por volta de 722 Pelayo venceu uma expedição muçulmana na gruta de Covadonga. Foi um combate pequeno, mas que a tradição transformou no início da "Reconquista" e na origem do Reino das Astúrias.' },
    { id: 'sant', at: 'compostela', title: 'O Caminho de Santiago', text: 'Por volta de 820–830, no reinado de Alfonso II das Astúrias, anunciou-se a descoberta do túmulo atribuído ao apóstolo Tiago, com o apoio do bispo Teodomiro. Compostela virou um dos maiores destinos de peregrinação da Europa, e o Caminho de Santiago ligou a Península ao resto do continente.' },
    { id: 'calif', at: 'cordoba', title: 'O Califado de Córdoba', text: 'Em 756, Abd al-Rahman I, um omíada que escapou do massacre da sua família em Damasco, fundou o Emirado de Córdoba. Em 929, Abd al-Rahman III se proclamou califa. Córdoba se tornou talvez a maior e mais culta cidade da Europa ocidental.' },
    { id: 'mesq', at: 'cordoba', title: 'A Mesquita e Medina Azahara', text: 'A Mesquita de Córdoba, iniciada em 785 e ampliada por dois séculos, é famosa pela sua floresta de colunas e arcos bicolores. Perto da cidade, Abd al-Rahman III construiu a cidade-palácio de Medina Azahara. Ambas são Patrimônio Mundial.' },
    { id: 'alman', at: 'marca', title: 'Almanzor', text: 'Almanzor, "o vitorioso", governou de fato o califado no fim do século X e realizou dezenas de expedições contra os reinos cristãos. Em 997 saqueou Santiago de Compostela e levou os sinos da igreja para Córdoba. Morreu em 1002. Os sinos só voltaram a Santiago em 1236, quando Fernando III conquistou Córdoba.' }
  ],
  quests: [
    { id: 'main', title: 'As Montanhas Não se Rendem', reward: { xp: 200, gold: 70, potions: 2 }, steps: [
      { t: 'talk', npc: 'pelayo', desc: 'Fale com Pelayo em Cangas de Onís', say: [
        ['pelayo', '{nome}, uma expedição comandada por Alqama vem esmagar a nossa rebelião. São muitos mais do que nós.'],
        ['pelayo', 'Nossa vantagem são as montanhas. Ataque os batedores no desfiladeiro e atrase o exército.']] },
      { t: 'kill', e: 'emirado', n: 6, at: 'garganta', desc: 'Derrote 6 soldados batedores no desfiladeiro' },
      { t: 'collect', item: 'Rocha solta', icon: '🪨', n: 6, at: 'cova', desc: 'Reúna 6 rochas soltas perto da Cova de Covadonga' },
      { t: 'talk', npc: 'eremita', desc: 'Fale com o Eremita da Cova', say: [
        ['eremita', 'As pedras estão prontas no alto do vale. Quando o inimigo entrar no estreito, elas vão rolar.'],
        ['eremita', 'Antes, porém, os arqueiros deles precisam ser afastados do desfiladeiro.']] },
      { t: 'kill', e: 'emirado_arq', n: 5, at: 'garganta', desc: 'Derrote 5 arqueiros no desfiladeiro' },
      { t: 'boss', e: 'alqama', at: 'valle', desc: 'Enfrente Alqama no Vale de Covadonga', intro: [['N', 'As pedras rolam montanha abaixo. No caos, Alqama avança contra você!']] },
      { t: 'talk', npc: 'pelayo', desc: 'Volte a Pelayo', say: [
        ['pelayo', 'Vencemos! É uma vitória pequena, mas dela vai nascer um reino: as Astúrias.'],
        ['N', 'Um século se passou. O pequeno reino cresceu, e seus reis desceram das montanhas. O amuleto agora pertence a um descendente seu, também chamado {nome}.']] },
      { t: 'goto', at: 'compostela', desc: 'Viaje a Compostela (c. 830)', say: [['N', 'Por volta de 830, anunciou-se ali a descoberta do túmulo do apóstolo Tiago. Uma basílica estava sendo erguida.']] },
      { t: 'talk', npc: 'teodomiro', desc: 'Fale com o bispo Teodomiro', say: [
        ['teodomiro', 'O rei Alfonso II veio em peregrinação. Em breve virão peregrinos de toda a Europa.'],
        ['N', 'Mais de um século e meio depois, em 997, a fronteira pegou fogo: Almanzor marchou para o norte.'],
        ['teodomiro', 'A cavalaria de Almanzor está na Marca do Douro! Ganhe tempo para que o povo fuja!']] },
      { t: 'kill', e: 'almanzor_cav', n: 5, at: 'marca', desc: 'Detenha 5 cavaleiros de Almanzor na Marca do Douro' },
      { t: 'talk', npc: 'teodomiro', desc: 'Volte a Compostela', say: [
        ['teodomiro', 'Graças a você, as pessoas escaparam. Mas Almanzor saqueou a cidade e levou os nossos sinos para Córdoba.'],
        ['teodomiro', 'Eles vão pendurá-los na grande mesquita como lâmpadas... Um dia voltarão.'],
        ['N', 'Almanzor morreu em 1002. Sem ele, o califado se dividiu em guerras civis.']] }
    ] },
    { id: 's1', title: 'Sancho, o Gordo', req: 7, reward: { xp: 130, gold: 80 }, steps: [
      { t: 'talk', npc: 'toda', desc: 'Fale com a Rainha Toda', say: [
        ['N', 'Ano 958.'],
        ['toda', 'Meu neto Sancho, rei de Leão, foi deposto porque está tão gordo que não consegue montar a cavalo!'],
        ['toda', 'Dizem que em Córdoba há um médico capaz de curá-lo: Hasdai ibn Shaprut. Vá até lá anunciar a nossa chegada.']] },
      { t: 'goto', at: 'cordoba', desc: 'Viaje até Córdoba', say: [['N', 'Córdoba deslumbra: ruas pavimentadas, banhos públicos, bibliotecas e a imensa mesquita de colunas.']] },
      { t: 'talk', npc: 'hasdai', desc: 'Fale com o médico Hasdai ibn Shaprut', say: [
        ['hasdai', 'Uma rainha cristã pedindo ajuda ao califa? A diplomacia faz milagres.'],
        ['hasdai', 'Vou tratá-lo com dieta rigorosa e muitos exercícios. Em alguns meses ele poderá montar de novo.'],
        ['N', 'Sancho emagreceu e, com tropas cordobesas, recuperou o trono em 959. A história é real!']] }
    ] },
    { id: 's2', title: 'As Asas de Abbas', reward: { xp: 120, gold: 80, potions: 1 }, steps: [
      { t: 'talk', npc: 'abbas', desc: 'Fale com Abbas ibn Firnas', say: [['abbas', 'Quero voar! Preciso de seis penas grandes de águia. Elas caem no vale das montanhas do norte.']] },
      { t: 'collect', item: 'Pena de águia', icon: '🪶', n: 6, at: 'valle', desc: 'Recolha 6 penas de águia no Vale de Covadonga' },
      { t: 'talk', npc: 'abbas', desc: 'Leve as penas a Abbas', say: [
        ['abbas', 'Maravilha! Com estas asas vou saltar de uma colina diante de toda Córdoba!'],
        ['N', 'Por volta de 875, Abbas ibn Firnas planou por alguns instantes e caiu, machucando as costas. Ele mesmo concluiu que tinha esquecido de fazer uma cauda.']] }
    ] },
    { id: 's3', title: 'Lobos do Desfiladeiro', reward: { xp: 110, gold: 70 }, steps: [
      { t: 'talk', npc: 'pastora', desc: 'Fale com a pastora Munia', say: [['pastora', 'Os lobos descem até o desfiladeiro e atacam as cabras. Abata seis deles!']] },
      { t: 'kill', e: 'lobo', n: 6, at: 'garganta', desc: 'Abata 6 lobos no desfiladeiro' },
      { t: 'talk', npc: 'pastora', desc: 'Volte à pastora', say: [['pastora', 'Agora o rebanho vai sobreviver ao inverno. Leve este queijo e algumas moedas!']] }
    ] },
    { id: 's4', title: 'O Saber de Córdoba', req: 7, reward: { xp: 150, gold: 80 }, steps: [
      { t: 'talk', npc: 'hasdai', desc: 'Fale com Hasdai ibn Shaprut', say: [['hasdai', 'Um viajante do norte! Veja se conhece a história desta terra.']] },
      { t: 'quiz', npc: 'hasdai', desc: 'Responda às perguntas de Hasdai', qs: [
        { q: 'Em que ano, segundo a tradição, ocorreu a batalha de Covadonga?', o: ['711', '722', '929', '1085'], a: 1 },
        { q: 'Quem se proclamou califa de Córdoba em 929?', o: ['Abd al-Rahman III', 'Almanzor', 'Táriq ibn Ziyad', 'Boabdil'], a: 0 },
        { q: 'O que Almanzor levou de Santiago de Compostela em 997?', o: ['A espada de Pelayo', 'Os sinos da igreja', 'Uma coroa de ouro', 'O túmulo do apóstolo'], a: 1 }
      ] }
    ] }
  ]
});
