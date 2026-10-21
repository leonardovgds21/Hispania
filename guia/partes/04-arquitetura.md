# A arquitetura do projeto

Antes de estudar cada sistema, vamos olhar o jogo de cima, como uma planta baixa. Saber **onde está cada coisa** e **quem conversa com quem** é o que permite mexer num projeto de 6 mil linhas sem se perder.

## A árvore de pastas e arquivos

<div class="tree">game/                         ← a pasta do projeto (vira o site no GitHub Pages)
├── index.html                ← porta de entrada: estrutura da página e ordem dos scripts
├── README.md                 ← descrição curta do projeto
├── css/
│   └── style.css             ← aparência de toda a interface HTML (HUD, janelas, título)
├── js/                       ← todo o código JavaScript
│   ├── util.js               ← ferramentas gerais: números aleatórios, ruído, matemática, efeitos sonoros
│   ├── i18n.js               ← idiomas: textos da interface em PT/ES e a função T()
│   ├── music.js              ← motor de música medieval gerada em tempo real
│   ├── world.js              ← o mapa: geração procedural, colisão e desenho dos terrenos
│   ├── entities.js           ← desenho de personagens e as classes Player, Enemy e Proj
│   ├── game.js               ← o coração: estado, missões, combate, IA, laço e renderização
│   ├── ui.js                 ← a interface: diálogos, loja, diário, mapa, menus, título
│   └── data/                 ← DADOS (nenhuma lógica): o conteúdo do jogo
│       ├── base.js           ← armas, classes do herói e todos os inimigos
│       ├── chapters1.js      ← capítulos 1–5 (pré-história ao Califado)
│       ├── chapters2.js      ← capítulos 6–10 (El Cid a 1931)
│       ├── chapters3.js      ← capítulos 11–14 (Guerra Civil a hoje)
│       ├── es_base.js        ← tradução ES de armas, classes e inimigos
│       └── es1.js, es2.js, es3.js ← tradução ES dos capítulos
├── guia/                     ← este guia (não faz parte do jogo)
│   ├── build.js              ← gerador do PDF
│   ├── estilo.css, capa.html ← aparência do PDF
│   └── partes/*.md           ← o texto de cada capítulo do guia
└── .claude/                  ← ferramentas de teste (não fazem parte do jogo)
    ├── serve.js              ← servidor local mínimo em Node
    └── launch.json           ← configuração para o painel de pré-visualização</div>

E o tamanho de cada arquivo, em linhas:

| Arquivo | Linhas | Tipo de conteúdo |
|---|---|---|
| `js/game.js` | 1168 | Lógica principal |
| `js/ui.js` | 534 | Interface |
| `js/world.js` | 515 | Mapa |
| `js/music.js` | 336 | Música |
| `js/entities.js` | 253 | Desenho e entidades |
| `js/i18n.js` | 166 | Idiomas |
| `js/util.js` | 113 | Utilidades |
| `js/data/*.js` | ~2700 | Conteúdo (dados) |
| `css/style.css` | 149 | Estilo |

Repare numa coisa: **quase metade do projeto são dados**, não lógica. Isso é intencional e é o assunto da próxima seção.

## O princípio mais importante: separar dados de lógica

O jogo tem 14 capítulos, 66 missões e quase 300 etapas, mas **não existe uma linha de código específica para nenhuma missão**. Não há um `if (missao === 'caçar lobos')` em lugar nenhum. Em vez disso:

- Os arquivos em `js/data/` **descrevem** o conteúdo: "a etapa 2 é matar 5 lobos no Bosque dos Lobos".
- O `game.js` sabe **executar** qualquer descrição desse tipo: "se a etapa é do tipo `kill`, conte as mortes do inimigo `e` até chegar em `n`".

Isso se chama **design orientado a dados** (*data-driven design*). As vantagens são enormes:

- Para criar uma missão nova, você escreve dados, não código. Até quem não programa consegue.
- A tradução vira só "outro arquivo de dados com a mesma forma".
- Um único motor executa 296 etapas. Corrigir um bug no motor corrige todas.
- Os dados podem ser **validados automaticamente** (capítulo 15).

> [porque] Imagine o contrário: 66 missões, cada uma com seu próprio código. Seriam milhares de linhas repetidas, e cada bug apareceria em 66 lugares diferentes. Toda vez que você se pegar copiando e colando código com pequenas diferenças, pergunte-se: "isso poderia ser dado em vez de código?"

## A ordem de carregamento e quem depende de quem

Como os scripts compartilham variáveis globais, **a ordem no `index.html` é uma lista de dependências**. Cada arquivo só pode usar o que os anteriores criaram *no momento em que é carregado*:

<div class="diagram">
<div class="node"><b>util.js</b>TILE, mulberry32, dist, Sfx</div><div class="arrow">➜</div>
<div class="node"><b>i18n.js</b>LANG, T(), ES_CHAPTERS</div><div class="arrow">➜</div>
<div class="node"><b>data/*.js</b>WEAPONS, CLASSES, ENEMIES, CHAPTERS</div><div class="arrow">➜</div>
<div class="node"><b>music.js</b>Music</div><div class="arrow">➜</div>
<div class="node"><b>world.js</b>World</div><div class="arrow">➜</div>
<div class="node"><b>entities.js</b>Player, Enemy, Proj</div><div class="arrow">➜</div>
<div class="node"><b>game.js</b>G, update, render…</div><div class="arrow">➜</div>
<div class="node"><b>ui.js</b>UI</div>
</div>

Existe uma sutileza: funções podem **chamar** coisas definidas em arquivos posteriores, desde que a chamada só aconteça **depois** que tudo carregou. Por exemplo, `game.js` chama `UI.toast(...)` mesmo que `UI` só seja criado em `ui.js`. Funciona, porque `UI.toast` só é executado durante o jogo, quando todos os arquivos já foram lidos. O que não pode é usar `UI` **no momento do carregamento** de `game.js`.

## Os objetos globais principais

| Nome | Arquivo | O que é |
|---|---|---|
| `G` | game.js | O **estado do jogo em execução**: mapa, jogador, inimigos, câmera, teclas... |
| `G.S` | game.js | O **estado salvável**: só o que vai para o save (nível, ouro, progresso) |
| `UI` | ui.js | Todas as funções de interface |
| `Sfx` | util.js | Efeitos sonoros |
| `Music` | music.js | Trilha sonora |
| `CHAPTERS` | data/chapters1.js | Lista dos 14 capítulos (dados) |
| `ENEMIES`, `WEAPONS`, `CLASSES` | data/base.js | Fichas de inimigos, armas e classes |
| `World` | world.js | A classe do mapa (`G.world` é uma instância dela) |

Vale a pena olhar o objeto `G` inteiro, porque ele aparece em quase todas as funções:

@code js/game.js const G = {

- `S`: o save (nível, XP, ouro...). Fica separado porque é a única parte que precisa ir para o disco.
- `world`, `ch`, `chIdx`, `mult`: o mapa atual, os dados do capítulo atual, o número dele e o **multiplicador de dificuldade** do capítulo.
- `player`, `enemies`, `projs`, `parts`, `texts`, `objs`, `camps`, `fx`: tudo o que existe no mundo agora.
- `cam`, `shake`: posição da câmera e intensidade do tremor de tela.
- `keys`, `mouse`: o estado da entrada (quais teclas estão pressionadas, onde está o mouse).
- `ui`: se há uma janela aberta (`'dialog'` ou `'modal'`), o jogo **pausa** a lógica.

> [porque] **Por que separar `G` de `G.S`?** O mundo (inimigos, partículas, projéteis) é recriado do zero sempre que você entra num capítulo. Não faz sentido salvar 300 partículas. Separando o que é "temporário" (G) do que é "permanente" (G.S), o save fica pequeno e simples: `JSON.stringify(G.S)`.

## O fluxo do jogo, do clique ao laço

Este é o caminho que o programa percorre desde que a página abre:

<div class="diagram col">
<div class="node"><b>index.html carrega os scripts</b>cada um cria seus objetos globais</div><div class="arrow">↓</div>
<div class="node"><b>applyLanguage(); UI.staticTexts(); UI.title();</b>aplica o idioma e mostra a tela de título com os 5 espaços de save</div><div class="arrow">↓</div>
<div class="node"><b>Jogador clica "Novo jogo" ou "Continuar"</b>→ startGame(estado, espaço)</div><div class="arrow">↓</div>
<div class="node"><b>enterChapter(n)</b>→ loadChapter(n): gera o mapa, cria NPCs, baús, crônicas, acampamentos de inimigos · mostra a narração de abertura · inicia a música do capítulo</div><div class="arrow">↓</div>
<div class="node"><b>frame() roda ~60×/s para sempre</b>update(dt) se não houver janela aberta · render() sempre</div>
</div>

As duas últimas linhas de `game.js` **ligam o motor** assim que o arquivo carrega: `resize();` ajusta o canvas e `requestAnimationFrame(frame);` começa o laço. Ele gira "em vazio" (sem desenhar nada) até que `G.running` vire verdadeiro, o que acontece aqui:

@code js/game.js function startGame(state, slot)

`startGame` é chamada pela tela de título. Ela guarda o estado e o espaço de save escolhidos, ajusta o som e entra no capítulo salvo. A partir daí, quem manda é o laço `frame`, assunto do próximo capítulo.

# O laço do jogo, o Canvas e a matemática dos jogos

## O laço: requestAnimationFrame

Lembra das três etapas de todo jogo (entrada, atualizar, desenhar)? No navegador, quem dá o "ritmo" é a função `requestAnimationFrame` (pedir quadro de animação). Você entrega uma função a ela, e o navegador a chama **logo antes de desenhar a próxima imagem na tela**, normalmente 60 vezes por segundo (ou 120/144 em monitores mais rápidos).

@code js/game.js function frame(now)

Linha a linha:

1. O navegador passa `now`, o horário atual em milissegundos.
2. `dt` (*delta time*) é o **tempo que passou desde o último quadro**, em segundos. Se o jogo roda a 60 FPS, `dt` vale cerca de 0,0167.
3. `Math.min(0.05, ...)` limita `dt` a no máximo 0,05 s. Se o computador engasgar ou você trocar de aba e voltar, um `dt` gigante faria o herói "teleportar" através das paredes. Esse limite evita isso.
4. Se há um jogo rodando, chama `update(dt)` (só se nenhuma janela estiver aberta, assim os diálogos pausam o jogo) e depois `render()`.
5. Por fim, **pede o próximo quadro**. É isso que mantém o laço girando para sempre.

### Por que multiplicar tudo por dt

Este é um dos conceitos mais importantes de programação de jogos. Compare:

```js
heroi.x += 3;               // ERRADO: anda 3 pixels POR QUADRO
heroi.x += 175 * dt;        // CERTO: anda 175 pixels POR SEGUNDO
```

Na versão errada, num monitor de 144 Hz o herói anda mais que o dobro de rápido do que num monitor de 60 Hz. Multiplicando pela fração de segundo que passou, a velocidade fica igual em qualquer computador. **Toda velocidade, cronômetro e animação do jogo usa `dt`.** Por exemplo, os cronômetros de recarga funcionam assim: `p.cd -= dt`, que significa "desconte o tempo que passou; quando chegar a zero, pode atacar de novo".

> [bug] Durante os testes, o jogo parecia "congelado" dentro do painel do editor: os inimigos não reapareciam e o tempo não andava. O motivo: navegadores **pausam o `requestAnimationFrame` em abas ocultas**, para economizar bateria. Não era um bug do jogo, e sim do ambiente de teste. A solução foi chamar `update(1/30)` manualmente nos testes. Lição: entenda o ambiente onde o código roda.

## O Canvas: sua tela de pintura

O `<canvas>` é uma grade de pixels. Para desenhar nele, você pega um **contexto 2D**, um objeto cheio de comandos de desenho:

```js
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.fillStyle = '#c33';          // escolhe a cor da tinta
ctx.fillRect(10, 20, 100, 50);   // retângulo em x=10, y=20, largura 100, altura 50
ctx.beginPath();
ctx.arc(200, 60, 30, 0, Math.PI * 2);  // círculo: centro (200,60), raio 30
ctx.fill();
```

### O sistema de coordenadas

Atenção: no Canvas, o ponto (0, 0) fica no **canto superior esquerdo**, e o **y cresce para baixo** (ao contrário da matemática da escola). Por isso, no jogo, apertar W (para cima) **diminui** o y do herói.

<div class="grid-demo">
<div style="background:#c33;color:#fff">0,0</div><div>1,0</div><div>2,0</div><div>3,0</div><div>4,0</div><div>5,0</div><div>6,0</div><div>7,0</div><div>8,0</div><div>9,0</div><div>10,0</div><div>x→</div>
<div>0,1</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
<div>0,2</div><div></div><div></div><div style="background:#3a7">3,2</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
<div>y↓</div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
</div>

### Os comandos de desenho usados no jogo

| Comando | O que faz |
|---|---|
| `fillStyle = cor` / `strokeStyle = cor` | Cor de preenchimento / de contorno |
| `fillRect(x, y, l, a)` | Retângulo preenchido |
| `beginPath()` … `fill()` / `stroke()` | Começa uma forma livre e a preenche ou contorna |
| `arc(x, y, r, a0, a1)` | Arco/círculo (ângulos em radianos) |
| `ellipse(x, y, rx, ry, rot, a0, a1)` | Elipse (sombras, corpos de animais) |
| `moveTo(x, y)` / `lineTo(x, y)` | Linhas e polígonos (triângulos dos pinheiros) |
| `quadraticCurveTo(...)` | Curvas (lâmina da falcata, chamas) |
| `fillText(texto, x, y)` / `font = ...` | Texto (números de dano, nomes) |
| `drawImage(img, x, y)` | Desenha uma imagem ou outro canvas |
| `globalAlpha = 0.5` | Transparência |
| `save()` / `restore()` | Guarda e restaura o estado (cor, posição, rotação) |
| `translate(x, y)` / `rotate(a)` / `scale(s, s)` | Move, gira e redimensiona o "papel" |

### Ajustando o canvas à tela (e a telas de alta densidade)

@code js/game.js function resize()

Telas de celular e notebooks modernos têm mais pixels físicos do que pixels "CSS" (o `devicePixelRatio`, ou DPR, pode ser 2 ou 3). Se o canvas tivesse só 800 pixels numa tela com DPR 2, tudo ficaria borrado. A função cria o canvas com `largura × DPR` pixels reais, mas o exibe com a largura normal, e usa `setTransform` para que o resto do código continue pensando em pixels normais. O DPR é limitado a 2 para não pesar em telas de 4K.

## Transformações: o segredo para desenhar personagens

Desenhar uma espada girada na direção do mouse parece difícil: você teria que calcular onde fica cada canto da lâmina. As **transformações** resolvem isso de forma elegante. Em vez de calcular os pontos, você **move e gira o papel**, desenha a espada "reta", e depois desfaz:

```js
ctx.save();                 // guarda o estado atual do papel
ctx.translate(heroi.x, heroi.y);  // o (0,0) agora é o centro do herói
ctx.rotate(angulo);         // gira o papel na direção da mira
ctx.fillRect(0, -2, 30, 4); // desenha a lâmina "deitada", apontando para a direita
ctx.restore();              // desfaz o translate e o rotate
```

É exatamente assim que `drawHuman` desenha todos os humanos do jogo. Veja a parte da arma:

```js
if (look.weapon && look.weapon !== 'none') {
  ctx.save();
  ctx.translate(dir * 5, -6);      // posição da mão
  let a = aim;
  if (o.swingArc) a += o.swingArc; // durante o golpe, gira um pouco mais
  ctx.rotate(a);
  drawWeapon(ctx, look.weapon, look.weaponColor, o.thrust || 0);
  ctx.restore();
}
```

E a animação de golpe? A espada não tem "quadros de animação" desenhados à mão. Durante os 0,2 s do ataque, `swingArc` vai de −arco/2 até +arco/2, então a espada **varre** o ângulo do golpe. Para a lança, em vez de girar, ela avança e volta (`thrust = Math.sin(k * Math.PI)`).

### Como um personagem é montado

A função `drawHuman` desenha, em ordem (o que vem depois fica por cima): sombra no chão → cavalo (se for montado) → capa → pernas → corpo → detalhes (faixa, cruz, gravata) → cabeça e olho → chapéu → escudo → arma. Cada parte é uma forma simples. A variedade vem do objeto `look`:

@code js/data/base.js tercio:

Trocando `hat: 'morion'` por `hat: 'tricorn'`, o soldado ganha outro chapéu. O jogo tem 17 tipos de chapéu (`drawHat`) e 15 tipos de arma (`drawWeapon`), o que dá centenas de combinações.

### A animação de caminhada

As pernas "andam" usando a função **seno**, que oscila suavemente entre −1 e 1:

```js
const bob = o.moving ? Math.sin(t * 14) : 0;
ctx.fillRect(-6, 2 + bob * 2, 5, 9 - bob * 2);  // perna esquerda sobe...
ctx.fillRect(1, 2 - bob * 2, 5, 9 + bob * 2);   // ...enquanto a direita desce
```

Seno e cosseno são as ferramentas favoritas dos programadores de jogos para tudo o que **oscila**: pernas, objetos flutuando (`Math.sin(G.time * 4)` nos itens brilhantes), chamas tremulando, o marcador de objetivo pulando.

## A matemática essencial dos jogos

Você não precisa de muita matemática para fazer jogos 2D, mas precisa destes cinco conceitos.

### 1. Distância entre dois pontos

Pelo teorema de Pitágoras: `Math.hypot(bx - ax, by - ay)`. É a função `dist` do jogo.

### 2. Vetores e normalização

Um **vetor** é uma seta com direção e tamanho, representada por (dx, dy). Para andar na direção do jogador **com velocidade constante**, o inimigo precisa de um vetor de tamanho 1 (**normalizado**), que se obtém dividindo pelo comprimento:

```js
const dx = p.x - e.x, dy = p.y - e.y;
const d = Math.hypot(dx, dy);
const ux = dx / d, uy = dy / d;      // vetor unitário apontando para o jogador
e.x += ux * velocidade * dt;
e.y += uy * velocidade * dt;
```

O mesmo vale para o herói: ao apertar W e D juntos, o movimento seria (1, −1), com tamanho 1,41, ou seja, **41% mais rápido na diagonal**. O jogo normaliza o vetor das teclas para evitar esse bug clássico:

```js
const len = Math.hypot(mx, my) || 1;
mx /= len; my /= len;
```

### 3. Ângulos e radianos

Computadores medem ângulos em **radianos**: uma volta completa é `2π` (≈ 6,28), meia volta é `π`. Para converter: `radianos = graus × π / 180`.

### 4. Do ângulo para a direção (cos e sin)

Dado um ângulo `a`, a direção correspondente é `(Math.cos(a), Math.sin(a))`. É assim que a classe `Proj` calcula a velocidade da bala: `vx = cos(a) × speed`, `vy = sin(a) × speed`.

### 5. Da direção para o ângulo (atan2)

O caminho inverso: dado um vetor (dx, dy), qual é o ângulo? `Math.atan2(dy, dx)`. É o que faz o herói **mirar no mouse**:

```js
p.aim = Math.atan2(mouseY_no_mundo - p.y, mouseX_no_mundo - p.x);
```

### Bônus: diferença entre ângulos

Para saber se um inimigo está **dentro do arco do golpe**, precisamos da diferença entre dois ângulos, mas cuidado: entre 350° e 10° a diferença é 20°, não 340°. A função `angleDiff` resolve isso "dando a volta":

@code js/util.js function angleDiff(a, b)

## A câmera

O mapa é muito maior que a tela (110 × 80 quadrados de 32 pixels = 3520 × 2560 pixels). A **câmera** é só um par de números (`G.cam.x`, `G.cam.y`) que diz qual parte do mundo aparece no canto superior esquerdo da tela. Para desenhar, o jogo "empurra" tudo na direção contrária:

```js
ctx.translate(-camX, -camY);   // tudo desenhado depois aparece deslocado
```

Assim, o código de desenho pode usar **coordenadas do mundo** (onde o lobo realmente está) e a câmera cuida do resto. A câmera segue o herói com suavidade usando **interpolação linear** (`lerp`):

```js
G.cam.x = lerp(G.cam.x, alvoX, Math.min(1, dt * 8));
```

`lerp(a, b, t)` devolve um valor entre `a` e `b`: com `t = 0,13`, a câmera anda 13% do caminho até o alvo a cada quadro. O resultado é um acompanhamento macio, que "atrasa" um pouquinho. Depois, `clamp` impede a câmera de mostrar o vazio além das bordas do mapa.

### Tremor de tela (screen shake)

Quando o herói leva dano ou um chefe aparece, a tela treme. O truque é somar um deslocamento aleatório à câmera, que diminui com o tempo:

```js
const sx = (Math.random() - 0.5) * G.shake;   // até ±shake/2 pixels
G.shake = Math.max(0, G.shake - dt * 30);     // vai sumindo
```

É um efeito de 3 linhas que dá muito "peso" aos impactos. Jogos profissionais usam muito esse tipo de efeito (*game feel*).

## A renderização: a ordem importa

A função `render` desenha o quadro inteiro, sempre na mesma ordem, de trás para a frente, como um pintor:

1. O chão e os obstáculos (o mapa).
2. Os marcos de cada lugar (caverna, aqueduto, castelo).
3. Avisos de área de ataque dos chefes (círculos vermelhos).
4. Objetos no chão: moedas, poções, itens, crônicas, baús.
5. **Personagens ordenados pela altura (y)**: NPCs, inimigos e o herói.
6. Efeitos de ataque (o flash da câmera fotográfica).
7. Projéteis, partículas e números de dano flutuantes.
8. A seta do objetivo e o rótulo do objeto sob o mouse.
9. Por cima de tudo, sem câmera: barra do chefe, minimapa e mira.

O item 5 merece atenção:

```js
list.sort((a, b) => a.y - b.y);
```

Ordenar pelo `y` faz com que quem está **mais embaixo na tela seja desenhado por último**, ficando "na frente". Assim, quando o herói passa atrás de um NPC, ele some atrás dele. É uma ilusão de profundidade simples e eficaz, chamada *y-sorting*.

### Partículas e textos flutuantes

Partículas (sangue, poeira, faíscas, moedas) são pequenos objetos com posição, velocidade e tempo de vida:

@code js/game.js function particle(

A cada quadro, elas se movem, desaceleram (`vx *= 0.92`) e perdem vida; quando a vida acaba, são removidas com `filter`. Ao desenhar, a transparência acompanha a vida restante, então elas **desaparecem suavemente**. Os números de dano flutuantes funcionam igual, subindo 30 pixels por segundo.

### A seta do objetivo

Quando o objetivo está fora da tela, uma seta dourada aparece na borda, apontando para ele, com a distância em metros. Ela usa exatamente a matemática da seção anterior: `atan2` para o ângulo, `cos`/`sin` para posicionar a seta num círculo em volta do herói, e `clamp` para mantê-la dentro da tela.

@code js/game.js function drawObjective(t, color)

> [exercicio] No Console, com uma partida aberta, digite `G.shake = 40`. Depois experimente mudar, em `game.js`, o fator `dt * 8` da câmera para `dt * 2` e recarregue. O que muda? (Resposta: a câmera fica "preguiçosa" e demora a alcançar o herói.)
