# Gerando mundos: mapas procedurais

Cada capítulo tem um mapa de 110 × 80 quadrados, com florestas, lagos, rios, aldeias, estradas e pontes. Nenhum foi desenhado à mão: todos são **gerados por código**, a partir de uma "semente" e de uma lista de lugares importantes. Isso se chama **geração procedural**, a mesma técnica de jogos como Minecraft, Terraria e No Man's Sky.

## Mapas de tiles

O mundo é uma grade de quadradinhos de 32 × 32 pixels chamados **tiles** (ladrilhos). Cada tile tem um tipo:

@code js/world.js const TL

@code js/world.js const WALKABLE

@code js/world.js const TALL

| Código | Tipo | Dá para andar? | Bloqueia tiros? |
|---|---|---|---|
| `G` (0) | Chão (grama, terra, areia) | sim | não |
| `P` (1) | Caminho | sim | não |
| `W` (2) | Água | não | não (tiros passam por cima) |
| `O` (3) | Obstáculo (árvore, rocha, coluna...) | não | sim |
| `B` (4) | Construção (casa, prédio) | não | sim |
| `F` (5) | Piso (praça de aldeia) | sim | não |
| `BR` (6) | Ponte sobre a água | sim | não |
| `ROAD` (7) | Asfalto (capítulos modernos) | sim | não |
| `SIDE` (8) | Calçada | sim | não |

As duas listas `WALKABLE` e `TALL` respondem às duas perguntas da tabela. Usar o número do tipo como **índice** de um array (`WALKABLE[tipo]`) é uma forma rapidíssima de consultar propriedades.

### Guardando a grade: um array de uma dimensão

Uma grade 2D poderia ser um "array de arrays" (`mapa[y][x]`), mas o jogo usa um único array comprido, com as linhas uma depois da outra:

```js
this.t = new Uint8Array(this.W * this.H);   // 110 × 80 = 8800 tiles
idx(x, y) { return y * this.W + x; }         // posição (x, y) → índice no array
```

`Uint8Array` é um array especial que só guarda números inteiros de 0 a 255, ocupando 1 byte cada. É compacto e muito rápido. A fórmula `y * W + x` "pula" `y` linhas inteiras e anda `x` casas.

### De pixels para tiles e de volta

```js
const tx = Math.floor(px / TILE);   // pixel → tile (arredonda para baixo)
const px = tx * TILE + TILE / 2;    // tile → pixel do CENTRO do tile
```

O herói vive em **pixels** (precisa de movimento suave), o mapa vive em **tiles**. Essas duas linhas fazem a ponte e aparecem dezenas de vezes no código.

## Aleatoriedade controlada: sementes

Se o mapa fosse gerado com `Math.random()`, ele seria diferente **cada vez** que o jogo abrisse. Isso quebraria tudo: o baú que você abriu ontem estaria em outro lugar hoje. A solução é um **gerador de números pseudoaleatórios com semente**: uma fórmula que produz uma sequência que *parece* aleatória, mas que é **sempre a mesma** para a mesma semente.

@code js/util.js function mulberry32(seed)

Cada capítulo tem um campo `seed` (o capítulo 1 usa 1101). `mulberry32(1101)` sempre produz a mesma sequência de números, então o mapa do capítulo 1 é **idêntico em todos os computadores do mundo, para sempre**. Mesmo assim, não foi preciso desenhar nada. O conteúdo da função (multiplicações e operações de bits como `^` e `>>>`) é uma receita conhecida para "embaralhar" bem os bits; você não precisa entendê-la para usá-la.

Há também o `hash2(x, y)`, que dá um número "aleatório" fixo para cada coordenada. É usado para variar detalhes visuais de cada tile (qual tom de grama, se tem florzinha) sem precisar guardar nada.

> [porque] **Por que não guardar o mapa pronto num arquivo?** 14 mapas de 8.800 tiles, com variações, seriam muitos dados e daria trabalho editá-los. Com sementes, cada mapa ocupa **um número** (a semente) mais a lista de lugares. Mudar a semente gera um mapa novo instantaneamente.

## Ruído: florestas que parecem naturais

Se cada tile virasse árvore com 30% de chance, o resultado seria "chuvisco": árvores espalhadas uniformemente, sem bosques nem clareiras. A natureza tem **agrupamentos**. Para imitar isso, o jogo usa **ruído de valor** (*value noise*):

@code js/util.js function makeNoise(rng, w, h, cell)

A ideia, em português:

1. Crie uma grade **grossa** (um ponto a cada 9 ou 15 tiles) com números aleatórios entre 0 e 1.
2. Para qualquer posição, ache os 4 pontos da grade grossa ao redor e **misture** seus valores de acordo com a distância (interpolação bilinear).
3. A curva `t * t * (3 - 2 * t)` (chamada *smoothstep*) suaviza as transições.

O resultado é uma "paisagem" de valores que sobem e descem suavemente. O jogo usa o ruído assim: onde o valor passa de 0,56, há chance de floresta; onde outro ruído passa de 0,74, há lago. Como os valores altos vêm em "manchas", surgem bosques e lagos com formas orgânicas.

## A geração passo a passo: World.generate

A classe `World` recebe os dados de um capítulo e monta o mapa em etapas. Veja o método inteiro e depois a explicação:

@code js/world.js generate()

1. **Preparação**: cria o gerador com a semente do capítulo e dois ruídos (obstáculos e água).
2. **Terreno base**:
   - Nos capítulos **urbanos** (12 a 14), desenha uma grade de ruas a cada 16 tiles na horizontal e 14 na vertical, com calçadas e prédios no meio dos quarteirões. Cerca de 30% dos quarteirões viram praças e parques.
   - Nos outros, cada tile vira água (se o ruído de água for alto, e o capítulo tiver lagos), obstáculo (se o ruído de obstáculo for alto e um sorteio passar) ou chão.
3. **Mar e rio** (opcionais, conforme o bioma): uma faixa de água de largura irregular em um dos lados; um rio serpenteando de cima a baixo.
4. **Bordas**: duas fileiras de obstáculos em volta de todo o mapa, para ninguém sair do mundo.
5. **Lugares**: para cada lugar da lista do capítulo (aldeia, acampamento, ruína, arena), limpa um círculo de raio `r` e, nas aldeias, ergue 5 casas de 3 × 2 tiles em volta da praça.
6. **Caminhos**: liga os lugares em sequência (1→2, 2→3...) e alguns atalhos (1→3, 3→5...), cavando estradas.
7. **Alcance**: calcula quais tiles podem ser alcançados a pé a partir do ponto de partida.

### Cavando estradas: carvePath

@code js/world.js carvePath(x0, y0, x1, y1, rng)

O algoritmo é um "andarilho teimoso": a cada passo, ele anda um tile na direção do destino (às vezes na horizontal, às vezes na vertical) e, em 12% das vezes, dá um passo para o lado, o que deixa a estrada **sinuosa** em vez de reta. Por onde passa, abre uma faixa de 2 tiles: se havia água, vira **ponte**; se havia mato ou árvore, vira **caminho**. Isso garante que todos os lugares importantes estejam ligados.

### Quais lugares dá para alcançar? Busca em largura

Mesmo com estradas, um sorteio infeliz pode criar um "bolsão" de chão cercado de árvores, de onde não se sai. Se um item de missão nascesse ali, o jogador ficaria preso. O método `computeReach` resolve isso com um algoritmo clássico de computação, a **busca em largura** (*BFS*, ou *flood fill*, "inundação"):

@code js/world.js computeReach()

Funciona como derramar tinta no ponto de partida:

1. Marque o tile inicial e coloque-o numa fila de "a visitar".
2. Enquanto a fila não estiver vazia: tire um tile e olhe os 4 vizinhos (esquerda, direita, cima, baixo). Para cada vizinho que é andável e ainda não foi marcado, marque e coloque na fila.
3. No fim, todos os tiles marcados em `reach` são alcançáveis.

A partir daí, toda função que escolhe um ponto aleatório para colocar algo (item de missão, inimigo, baú, crônica) **só aceita tiles marcados**. É uma garantia matemática de que tudo pode ser alcançado.

@code js/world.js randomSpot(px, py, rTiles, minR)

> [nota] O teste automático do capítulo 15 verifica, para os 14 mapas, que todos os lugares e todos os NPCs são alcançáveis. Foi assim que se garantiu que nenhuma missão fica impossível.

## Colisão com o mapa

Para saber se o herói pode ir para uma posição, o jogo testa os **4 cantos** de um quadrado em volta dele:

@code js/world.js collides(x, y, r)

E o movimento é feito **um eixo de cada vez**:

@code js/game.js function moveEnt(ent, mx, my)

> [porque] **Por que mover x e y separadamente?** Imagine o herói andando na diagonal contra uma parede vertical. Se o jogo testasse o movimento diagonal inteiro, ele bateria e **pararia completamente**. Testando separado, o movimento em x é bloqueado pela parede, mas o movimento em y continua: o herói **desliza** ao longo da parede. É um detalhe pequeno que faz o controle parecer muito mais agradável.

O raio usado é 80% do raio do personagem (`ent.r * 0.8`), o que deixa os personagens passarem um pouquinho "por dentro" das quinas, evitando que fiquem presos em cantos.

## Desenhando o mapa rápido: o cache em blocos (chunks)

Desenhar milhares de tiles, cada um com árvores e detalhes, **a cada quadro** seria pesado. O truque: desenhar cada pedaço do mapa **uma única vez** num canvas invisível e, depois, só copiar essa "foto" para a tela.

@code js/world.js chunk(cx, cy)

O mapa é dividido em **chunks** (blocos) de 16 × 16 tiles (512 × 512 pixels). Na primeira vez que um bloco aparece na tela, `chunk()` cria um canvas fora da tela, desenha os 256 tiles nele e o guarda num `Map` (um dicionário). Nas vezes seguintes, só devolve o que já estava guardado. O método `draw` então copia os 4 a 9 blocos visíveis com `drawImage`, que é extremamente rápido.

@code js/world.js draw(ctx, camX, camY, vw, vh)

Esse padrão (calcular uma vez e reaproveitar) se chama **cache** e é uma das otimizações mais importantes da programação.

### Desenhando cada tile

`drawTile` decide a cor pelo tipo do tile e usa o `hash2` para variar detalhes de forma estável. `drawObstacle` desenha 15 tipos de obstáculo com formas simples:

```js
case 'pine':   // pinheiro: três triângulos verdes empilhados sobre um tronco
  ...
  for (let i = 0; i < 3; i++) {
    g.beginPath();
    g.moveTo(cx, cy - 16 + i * 8);
    g.lineTo(cx - 13 + i, cy + 2 + i * 4);
    g.lineTo(cx + 13 - i, cy + 2 + i * 4);
    g.fill();
  }
```

Cada capítulo escolhe quais obstáculos usar no seu **bioma**:

@code js/data/chapters1.js biome: { ground: '#4f7f3c'

Mudando só esses números, o mesmo gerador cria a floresta verde da Cantábria, a meseta seca dos celtiberos, as montanhas nevadas das Astúrias e as ruas de Madri.

### Marcos (landmarks)

Cada lugar pode ter um `icon` (caverna, aqueduto, castelo, mesquita, navio, parlamento...) desenhado por `drawLandmark` no centro do lugar. São desenhos maiores, feitos com as mesmas formas simples, que dão identidade a cada local.

### O minimapa

O minimapa é feito pixel a pixel com `ImageData`, que dá acesso direto às cores de cada pixel de uma imagem: 1 pixel por tile, com a cor do tipo do tile. É criado uma vez (cache, de novo) e depois desenhado em tamanho maior no canto da tela e na janela do mapa (tecla M).

@code js/world.js minimap()

> [exercicio] Em `js/data/chapters1.js`, mude a `seed` do capítulo 1 de `1101` para `42` e recarregue começando um jogo novo. O mapa inteiro muda, mas as aldeias e lugares continuam nos mesmos pontos e ligados por estradas. Depois volte para 1101. (Se você mudar a semente com um save em andamento, baús e crônicas mudam de lugar, porque as posições deles também vêm da semente.)
