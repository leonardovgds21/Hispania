# Mãos à obra: estendendo o jogo

Agora você conhece todas as peças. Este capítulo traz **tutoriais completos**, do mais fácil ao mais difícil, para você modificar o Hispânia sozinho. Faça-os na ordem, testando cada um. É aqui que o aprendizado vira habilidade.

> [dica] Antes de começar, faça uma cópia da pasta `game` (ou um commit no Git). Assim, se algo der errado, você volta ao ponto em que funcionava.

## Tutorial 1: um novo inimigo

Vamos criar uma **Raposa**, rápida e fraca, para o capítulo 1.

**Passo 1.** Em `js/data/base.js`, dentro de `ENEMIES`, logo abaixo do `lobo`, adicione:

```js
raposa: { name: 'Raposa', hp: 14, spd: 170, dmg: 4, ai: 'swarm', r: 10, xp: 6, gold: 2, shape: 'beast', color: '#c8641e' },
```

Ela usa a IA de enxame (persegue e morde por contato), é desenhada como animal (`beast`) num tom laranja e é menor (`r: 10`).

**Passo 2.** Coloque um acampamento de raposas no mapa. Em `js/data/chapters1.js`, no capítulo 1, troque a linha `camps` por:

```js
camps: [{ at: 'bosque', type: 'javali', n: 2 }, { at: 'dolmen', type: 'raposa', n: 4 }],
```

**Passo 3.** (Opcional) Tradução: em `js/data/es_base.js`, dentro de `ES_BASE.enemies`, adicione `raposa: 'Zorro',`.

Recarregue e vá até o Dólmen dos Antigos. As raposas estarão lá e reaparecerão quando derrotadas.

> [exercicio] Crie também um **Corvo** que ataca à distância (`ai: 'ranged'`, `shape: 'blob'`, `color: '#222'`, `proj: '#555'`) e coloque-o na Gruta de Altamira. Observe como ele mantém distância.

## Tutorial 2: uma nova missão com quiz

Vamos dar ao Pequeno Txo um quiz sobre o próprio jogo. Em `js/data/chapters1.js`, na lista `quests` do capítulo 1, adicione:

```js
{ id: 's6', title: 'As Perguntas de Txo', req: 2, reward: { xp: 40, gold: 15 }, steps: [
  { t: 'talk', npc: 'txo', desc: 'Fale com o Pequeno Txo', say: [['txo', 'Aposto que você não sabe responder isto!']] },
  { t: 'quiz', npc: 'txo', desc: 'Responda ao Pequeno Txo', qs: [
    { q: 'Qual animal tem chifres enormes?', o: ['Lobo', 'Auroque', 'Javali'], a: 1 },
    { q: 'Onde ficam as pinturas de bisontes?', o: ['Atapuerca', 'Altamira'], a: 1 }
  ] }
] }
```

Lembre: `a` é o **índice** da resposta certa, contando a partir de 0. `req: 2` libera a missão a partir da etapa 2 da história principal.

## Tutorial 3: uma nova arma

Vamos dar ao caçador um **arco** no lugar da lança.

**Passo 1.** Em `WEAPONS`, adicione:

```js
arco: { name: 'Arco de caça', kind: 'gun', dmg: 14, cd: 0.45, mag: 6, reload: 1.0, speed: 600, spread: 0.05, draw: 'bow', color: '#8a6a3a' },
```

Usamos o tipo `gun` porque um arco funciona como uma arma de projéteis com munição (as flechas da aljava). O desenho `bow` já existe em `drawWeapon`.

**Passo 2.** Em `CLASSES`, no `cacador`, troque `weapon: 'lanca'` por `weapon: 'arco'`.

Recarregue. O caçador agora atira flechas, com 6 disparos antes de recarregar. Experimente mudar `dmg`, `cd` e `speed` para sentir como cada número muda o jogo.

> [atencao] Repare que a cor da "bala" está fixa como amarela (`'#ffe080'`) em `playerAttack`. Desafio: faça a cor do projétil vir da arma, adicionando um campo `projColor` em `WEAPONS` e usando `w.projColor || '#ffe080'` no código.

## Tutorial 4: um novo tipo de chapéu

Em `js/entities.js`, na função `drawHat`, adicione um novo `case` antes do fechamento do `switch`:

```js
case 'crown':   // coroa
  ctx.fillRect(-8, -30, 16, 4);
  for (let i = -8; i <= 4; i += 6) {
    ctx.beginPath(); ctx.moveTo(i, -30); ctx.lineTo(i + 2, -36); ctx.lineTo(i + 4, -30); ctx.fill();
  }
  break;
```

Depois use `hat: 'crown', hatColor: '#d4af37'` na aparência de algum rei, como o `leovi` do capítulo 4. Desenhe no papel antes: lembre que y negativo é **para cima** e que a cabeça fica por volta de y = −21.

## Tutorial 5: um novo tema musical

Em `js/music.js`, os temas ficam em `THEMES`. Para dar ao capítulo 1 uma música diferente, mude o tema `c1`:

```js
c1: { mode: 'dorian', root: 62, bpm: 90, lead: 'recorder', second: 'lute', drone: true, drum: 'cantiga', seed: 2024 },
```

Mudar só a `seed` compõe uma melodia nova com o mesmo estilo. Mudar `mode` altera o "clima". Experimente `hijaz` com `drum: 'darbuka'` para um som andalusí.

## Tutorial 6: um capítulo inteiro

Este é o grande projeto. Um capítulo novo precisa de:

1. Um objeto no formato do capítulo 10 (`CHAPTERS.push({...})`), com `id` e `num` novos (`'c15'`, `15`).
2. Uma `cls` existente (ou uma classe nova em `CLASSES`).
3. Uma `seed` qualquer e um `biome` (copie de um capítulo parecido).
4. De 5 a 8 `places`. **O primeiro é o ponto de partida.** Espalhe-os pelo mapa (x de 10 a 100, y de 10 a 70) e inclua pelo menos um `camp` e uma `arena`.
5. NPCs com `at` apontando para lugares que existem, incluindo um comerciante (`shop: true`).
6. Pelo menos uma crônica em `codex`.
7. Uma missão `main` e algumas secundárias.
8. Um tema musical com a chave igual ao `id` (`c15`) em `THEMES`.

Coloque o capítulo num arquivo novo, `js/data/chapters4.js`, e adicione `<script src="js/data/chapters4.js"></script>` no `index.html`, **depois** de `chapters3.js`. Os capítulos são ordenados pelo campo `num`, então o seu capítulo será o 15º. Ele aparecerá depois do final atual. Que tal um capítulo sobre o futuro da Espanha em 2050?

> [dica] Se o jogo não carregar depois de adicionar o capítulo, abra o Console (F12). O erro mais provável é uma vírgula faltando. O segundo mais provável é um `npc` ou `at` com um id escrito diferente do que foi definido.

## Tutorial 7: uma mecânica nova (desafio)

Implemente uma **mochila de pedras**: no capítulo 1, cada pedra de sílex coletada aumenta 2% o dano da lança. Pistas:

1. Adicione um campo `silex: 0` em `newState`.
2. Em `pickItem`, se o nome do item for `'Sílex'`, faça `G.S.silex++`.
3. Em `playerDmg`, multiplique o resultado por `(1 + 0.02 * (G.S.silex || 0))`.
4. Mostre o bônus no HUD.

Note o `|| 0` no passo 3: saves antigos não têm o campo `silex`, e `undefined * 0.02` daria `NaN` (*Not a Number*), quebrando o dano. Pensar em dados antigos é uma marca de bom programador.

## Para onde ir depois deste guia

Você aprendeu os fundamentos que servem para **qualquer** linguagem e qualquer tipo de jogo: variáveis, condições, laços, funções, objetos, eventos, o laço do jogo, colisão, IA por estados, dados separados da lógica, salvamento e testes. Sugestões de próximos passos:

1. **Faça um jogo pequeno do zero**, sozinho, sem copiar: um Pong, uma cobrinha (Snake) ou um Flappy Bird. Cada um cabe em 200 linhas e usa só o que você aprendeu aqui.
2. **Aprenda módulos ES** (`import`/`export`) e a usar um servidor local como o `serve.js`.
3. **Experimente um framework**, como o Phaser. Agora você vai entender o que ele faz por você.
4. **Estude estruturas de dados e algoritmos**: filas, pilhas, grafos e o algoritmo A* (busca de caminho), que faria os inimigos contornarem obstáculos em vez de andar em linha reta.
5. **Leia código dos outros**: projetos de jogos de código aberto no GitHub.
6. **Documentação de referência**: o site **MDN Web Docs** (`developer.mozilla.org`, com versão em português) é a melhor referência de HTML, CSS, JavaScript, Canvas e Web Audio que existe.
