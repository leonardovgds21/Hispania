# Controles, movimento e combate

## Lendo o teclado

O navegador avisa quando uma tecla é **apertada** (`keydown`) e quando é **solta** (`keyup`). Para movimentação, o jogo não reage ao evento em si: ele **anota** quais teclas estão pressionadas num objeto `G.keys` e, a cada quadro, consulta essa anotação.

@code js/game.js window.addEventListener('keydown'

@code js/game.js window.addEventListener('keyup'

Alguns detalhes importantes desse código:

- **`e.code` em vez de `e.key`.** `e.key` é a *letra* produzida (`'w'`, `'W'`, `'ẃ'`...), que muda com o layout do teclado e o Caps Lock. `e.code` é a *posição física* da tecla (`'KeyW'`). Usando `e.code`, o WASD funciona em teclados ABNT, americanos, franceses (AZERTY), qualquer um.
- **`e.preventDefault()`** para Espaço, Tab e setas impede o comportamento padrão do navegador (rolar a página, trocar de foco).
- **`UI.onKey(e)` é consultado primeiro.** Se uma janela está aberta, ela "consome" a tecla (Espaço avança o diálogo em vez de esquivar).
- Ações instantâneas (esquiva, interagir, poção, recarregar) acontecem **no evento**, porque devem ocorrer uma vez por toque. Movimentação acontece **no update**, porque é contínua.
- O evento `blur` (a janela perdeu o foco) **zera todas as teclas**. Sem isso, se você trocar de janela com o W apertado, o herói andaria para sempre, porque o `keyup` nunca chegaria.

### O mouse

@code js/game.js canvas.addEventListener('mousedown'

Ao clicar, se o mouse estiver sobre algo interativo **e perto o bastante** (90 pixels), o clique interage (fala com o NPC, abre o baú). Senão, ataca. `G.mouse.down` fica verdadeiro enquanto o botão estiver pressionado, o que permite **atacar sem parar** segurando o botão.

> [nota] A posição do mouse vem em coordenadas **da tela**. Para saber onde ele está **no mundo**, soma-se a câmera: `mundoX = G.mouse.x + G.cam.x`. Essa conversão aparece na mira e na detecção do que está sob o cursor.

## A função update: um quadro de lógica

`update(dt)` é a função mais longa do jogo, mas é apenas uma sequência de pequenas tarefas, sempre na mesma ordem. Veja-a inteira e depois o roteiro:

@code js/game.js function update(dt)

Roteiro do que acontece a cada quadro:

1. **Tempo**: soma `dt` ao tempo de jogo (as estatísticas da tela de pausa vêm daqui).
2. **Movimento do herói**: monta o vetor das teclas WASD, normaliza (para a diagonal não ser mais rápida) e move. Durante a esquiva, move 3,2 vezes mais rápido na direção guardada e solta "poeira".
3. **Cronômetros**: diminui recarga de ataque, invulnerabilidade, esquiva, recarga da arma.
4. **Mira**: calcula o ângulo até o mouse com `atan2`.
5. **Ataque contínuo**, se o botão está pressionado.
6. **Inimigos**: atualiza só os que estão a até ~1300 pixels (os distantes ficam "congelados", economizando processamento) e os empurra uns para longe dos outros para não se sobreporem. Remove os mortos.
7. **Acampamentos**: repõe inimigos que faltam (detalhes no próximo capítulo).
8. **Projéteis**: move cada um, verifica se bateu em parede ou acertou alguém.
9. **Objetos**: moedas são atraídas pelo herói como ímã; poções e itens de missão são coletados ao encostar.
10. **Efeitos**: partículas, números flutuantes e flashes envelhecem e somem.
11. **Missões**: verifica se o herói chegou a algum lugar de missão ou à arena de um chefe.
12. **Câmera**: segue o herói suavemente e o tremor diminui.
13. **Hover**: descobre qual objeto está sob o mouse (para o rótulo e o clique).
14. **Salvamento automático** a cada 20 segundos, e o HUD é atualizado 10 vezes por segundo.

> [porque] **Por que atualizar o HUD só 10 vezes por segundo?** Mexer em elementos HTML é bem mais lento que desenhar no canvas. Atualizar textos 60 vezes por segundo seria desperdício: o olho não percebe diferença entre 10 e 60 atualizações numa barra de vida. O cronômetro `G.hudT` controla isso. Isso se chama **limitar a frequência** (*throttling*).

## Ataques: três tipos de arma

Todas as 14 armas do jogo se encaixam em três "tipos" (`kind`), definidos em `base.js`:

@code js/data/base.js const WEAPONS

E uma única função executa qualquer uma delas:

@code js/game.js function playerAttack()

### Corpo a corpo (melee): o arco de ataque

Para lanças, espadas e até a câmera fotográfica, o ataque é instantâneo: o jogo procura inimigos que estejam **perto** (dentro do alcance) **e na frente** (dentro do arco). O arco é um ângulo: a lança tem 0,6 radiano (um golpe estreito, mas que vai longe), a espada longa tem 2,1 radianos (um corte largo).

<div class="diagram">
<div class="node"><b>1. Distância</b>dist(herói, inimigo) ≤ alcance + raio do inimigo?</div><div class="arrow">➜</div>
<div class="node"><b>2. Ângulo</b>|angleDiff(mira, direção do inimigo)| ≤ arco / 2?</div><div class="arrow">➜</div>
<div class="node"><b>3. Dano</b>damageEnemy(...) com empurrão na direção do golpe</div>
</div>

Existe uma tolerância extra: inimigos **colados** no herói (menos de 30 pixels) são atingidos mesmo um pouco fora do arco. Sem isso, um lobo encostado de lado ficaria imune, o que parece injusto para o jogador.

### Armas de fogo: munição e recarga

Espingarda, arcabuz, mosquete e fuzil criam um **projétil** (`new Proj`) que voa na direção da mira com um pequeno desvio aleatório (`spread`), simulando imprecisão. Cada arma tem um pente (`mag`): a espingarda dispara 1 vez e precisa recarregar (1,3 s); o fuzil Mauser dispara 5. A recarga começa sozinha quando a munição acaba, ou ao apertar R.

### Palavras como arma

Nos capítulos da Transição e do século XXI, o herói é deputado e depois candidato. A "arma" dispara **palavras** ("Diálogo!", "Consenso!") como projéteis desenhados em balões. Mecanicamente, é uma arma de fogo sem munição e com cadência alta. Narrativamente, mostra que a forma de "lutar" mudou com a história. É um bom exemplo de como **a mesma mecânica pode contar coisas diferentes** só trocando o desenho e o texto.

## Projéteis e colisão círculo com círculo

Todo projétil, a cada quadro: anda (`x += vx * dt`), perde vida, e verifica:

- Se o tile onde está é **alto** (árvore, prédio), ele morre e solta faíscas. A água não para tiros.
- Se é do jogador, testa cada inimigo; se é inimigo, testa o jogador.

O teste de acerto é o mais simples possível entre dois círculos: **acertou se a distância entre os centros for menor que a soma dos raios**.

```js
if (dist(pr.x, pr.y, e.x, e.y - 6) < e.r + pr.r) { /* acertou */ }
```

## Dano, invulnerabilidade e morte

@code js/game.js function hurtPlayer(dmg, fromX, fromY)

Pontos de *game design* escondidos nessa função:

- **Defesa** reduz o dano em porcentagem (armadura comprada + escudo da arma), limitada a 60%.
- **Variação de ±15%** no dano deixa o combate menos previsível.
- **Invulnerabilidade de 0,7 s** depois de cada golpe: sem isso, quatro lobos juntos causariam dano todo quadro, e o herói morreria em meio segundo. O herói pisca enquanto está invulnerável, para o jogador entender o que está acontecendo.
- **Empurrão** (*knockback*) afasta o herói de quem bateu, dando uma chance de reagir.
- A **esquiva** (Espaço) também dá invulnerabilidade, o que recompensa reflexos.

Do lado dos inimigos, `damageEnemy` aplica o dano, mostra o número, solta partículas e empurra o inimigo (exceto chefes). Quando a vida chega a zero, `killEnemy` dá experiência e moedas, sorteia uma poção (3,5% de chance; chefes sempre deixam uma), avisa o sistema de missões (`onKill`) e, se era um chefe, avança a missão correspondente.

@code js/game.js function killEnemy(e)

Quando o herói cai, `playerDie` mostra a tela de queda, tira 10% do dinheiro e devolve o herói ao início do capítulo, com vida cheia. Se havia um chefe, ele é removido e reaparecerá inteiro, para a luta recomeçar de forma justa.

## Interagindo com o mundo

`G.objs` guarda tudo com que se pode interagir: NPCs, itens de missão, crônicas, baús, moedas e poções. Cada objeto tem um campo `kind` (tipo), e `interact` decide o que fazer:

@code js/game.js function interact(o)

Esse padrão (uma lista de objetos variados com um campo de tipo e um `switch` que trata cada tipo) é muito comum em jogos simples. Em projetos maiores, cada tipo vira uma classe com seu próprio método `interact()`.

# Inteligência artificial dos inimigos

"Inteligência artificial" em jogos raramente é algo sofisticado. Na maioria das vezes, são **regras simples** que, combinadas, dão a impressão de comportamento inteligente. O Hispânia tem quatro tipos de comportamento para inimigos comuns e um sistema de "padrões de ataque" para os chefes.

## A ficha de um inimigo

@code js/data/base.js javali:

- `hp`, `spd`, `dmg`: vida, velocidade e dano **base** (no capítulo 1).
- `ai`: o comportamento (`melee`, `ranged`, `charger` ou `swarm`).
- `r`: raio (tamanho para colisão e desenho).
- `xp`, `gold`: recompensas.
- `shape`: como desenhar (`beast` para animais, `human`, `blob` para criaturas simbólicas como as Sombras e o Vírus, `tower` para o Bastião de Málaga).

A classe `Enemy` transforma essa ficha num inimigo "vivo", aplicando o multiplicador de dificuldade do capítulo:

@code js/entities.js class Enemy

## Estados: ocioso ou em alerta

Todo inimigo comum começa **ocioso**: passeia devagar em volta do seu ponto de origem, escolhendo um destino aleatório a cada 1,5 a 4 segundos. Ele entra em **alerta** (`aggro`) quando o herói chega a menos de 290 pixels, ou quando leva dano. E desiste se o herói se afastar muito (700 pixels) ou se ele mesmo se afastar demais de casa (900 pixels). Isso impede que o jogador "arraste" um exército inteiro pelo mapa.

Essa ideia de ter **estados** e **regras de transição** entre eles se chama **máquina de estados** (*state machine*) e é a base da IA de quase todos os jogos.

<div class="diagram">
<div class="node"><b>Ocioso</b>passeia perto de casa</div><div class="arrow">⇄</div>
<div class="node"><b>Alerta</b>comportamento de combate conforme o tipo</div>
</div>

## Os quatro comportamentos

@code js/game.js function updateEnemy(e, dt)

### melee (corpo a corpo): lobos, soldados, bandidos

Persegue o herói. Ao chegar perto, **prepara o golpe** por 0,32 s (pisca e mostra um "!" vermelho) e só então ataca, e só acerta se o herói ainda estiver perto. Esse aviso (*telegraph*) é fundamental: dá ao jogador a chance de **ver e esquivar**. Ataques sem aviso parecem injustos.

### swarm (enxame): bolhas imobiliárias, vírus, sombras da fome

Persegue sem parar e causa dano por contato, com intervalo de 0,8 s. São fracos individualmente, mas vêm em grupo e são rápidos.

### ranged (à distância): arqueiros, fundeiros, fuzileiros, bots

Mantém distância: se o herói chega a menos de 170 pixels, recua; se passa de 290, se aproxima; no meio, anda de lado ("strafe"). A cada 1,5 a 2,2 segundos, dispara um projétil na direção do herói. Isso obriga o jogador a ir até eles, em vez de esperar.

### charger (investida): javalis, auroques, cavaleiros, elefantes

Se aproxima devagar. Quando está a menos de 270 pixels, **para e treme** por 0,55 s (o aviso) e então **dispara em linha reta** a 4,2 vezes a velocidade normal, na direção onde o herói **estava**. Se o herói esquivar para o lado, o animal passa direto. É um comportamento clássico que transforma a esquiva numa habilidade importante.

## Os chefes: padrões de ataque

Cada capítulo tem um chefe com uma lista de **padrões** que se repetem em ordem, como uma coreografia:

@code js/data/base.js urso:

@code js/game.js function updateBoss(e, dt, d, dx, dy)

| Padrão | O que faz | Como o jogador escapa |
|---|---|---|
| `charge` | Investida como a dos javalis, mais forte | Esquivar para o lado |
| `slam` | Marca um círculo vermelho no chão; 0,9 s depois, causa dano em toda a área | Sair do círculo |
| `burst` | Dispara 12 projéteis em todas as direções (18 na fase 2) | Ficar nos espaços entre eles |
| `spray` | Rajadas de 5 projéteis em leque na direção do herói (7 na fase 2) | Movimentar-se de lado |
| `summon` | Chama 2 ajudantes (3 na fase 2), no máximo 6 ao mesmo tempo | Derrotá-los ou ignorá-los |

Quando a vida do chefe cai abaixo da metade, ele entra na **fase 2** ("está furioso!"): fica 25% mais rápido, ataca com mais frequência e seus padrões ficam mais intensos. Essa mudança no meio da luta é um recurso clássico para manter a tensão.

O Bastião de Málaga é um caso especial: uma torre **imóvel** (`stationary: true`) que não investe, só atira e invoca soldados. A mesma função `updateBoss` trata isso pulando o padrão `charge`.

## Acampamentos e reaparecimento (respawn)

Os inimigos não ficam espalhados ao acaso: eles vivem em **acampamentos** (*camps*), cada um ligado a um lugar do mapa. Os acampamentos são criados automaticamente a partir das missões: se uma etapa pede "derrote 8 legionários na Muralha de Cipião", o jogo cria um acampamento de legionários lá. Assim, **é impossível uma missão de caça ficar sem inimigos**.

@code js/game.js function spawnCampEnemy(camp, awayFromPlayer)

E, dentro de `update`, a reposição:

```js
for (const camp of G.camps) {
  camp.respawnT -= dt;
  if (camp.respawnT > 0) continue;
  const alive = G.enemies.reduce((n, e) => n + (e.campId === camp.id ? 1 : 0), 0);
  if (alive < camp.n) { spawnCampEnemy(camp, true); camp.respawnT = 5; }
  else camp.respawnT = 2;
}
```

A cada 2 segundos, cada acampamento conta seus inimigos vivos (`reduce` soma 1 para cada inimigo daquele acampamento). Se faltar alguém, cria um novo e espera 5 segundos antes do próximo.

> [bug] **"O jogo não está dando respawn dos bichos."** Este foi o primeiro problema que você reportou. Na versão original, a regra era: só repor inimigos se o herói estivesse a **mais de 650 pixels** do acampamento, para ninguém "nascer na cara" do jogador. Parecia sensato, mas na prática quem ficava caçando no acampamento **nunca** via inimigos novos, e as missões de caça travavam. A correção: repor **sempre**, mas escolher um ponto do acampamento a **pelo menos 320 pixels** do herói (`awayFromPlayer`), tentando até 25 sorteios. O teste confirmou: com o herói parado no Bosque dos Lobos, os lobos voltaram um a um, nascendo a cerca de 400 pixels e vindo atacar. **Lição:** regras que parecem boas no papel precisam ser testadas do jeito que o jogador realmente joga.

## Progressão e equilíbrio (balanceamento)

Como o jogo tem 14 capítulos, os inimigos precisam ficar mais fortes, e o herói também. Tudo isso é controlado por algumas fórmulas curtas:

@code js/game.js const xpNeed

@code js/game.js function maxHp()

@code js/game.js function playerDmg()

@code js/game.js function playerDef()

E, ao carregar cada capítulo, o **multiplicador de dificuldade**: `G.mult = 1 + 0.32 * idx`. O capítulo 1 tem multiplicador 1; o 14, cerca de 5,2. Vida, dano, experiência e moedas dos inimigos são multiplicados por ele. O dano das armas também, de modo que cada capítulo tem uma dificuldade parecida em relação ao herói daquela época. O que muda é o **nível** do herói (+5% de dano e +10 de vida por nível) e as **melhorias da loja** (+10% de dano e +6% de defesa por compra).

| Nível | XP para o próximo | Vida máxima no cap. 1 | Vida máxima no cap. 14 |
|---|---|---|---|
| 1 | 50 | 100 | 256 |
| 5 | 405 | 140 | 358 |
| 10 | 998 | 190 | 486 |
| 20 | 2456 | 290 | 742 |
| 30 | 4161 | 390 | 998 |

A curva `50 × nível^1,3` cresce **mais rápido que uma reta**: cada nível pede um pouco mais que o anterior. Isso faz o jogador subir de nível rapidamente no começo (recompensa constante) e mais devagar depois (a progressão não fica absurda).

> [dica] Balancear um jogo é **experimentar**. Mude um número, jogue, sinta, ajuste. Ter todos os números importantes em fórmulas curtas e nos arquivos de dados (em vez de espalhados pelo código) é o que torna isso viável.
