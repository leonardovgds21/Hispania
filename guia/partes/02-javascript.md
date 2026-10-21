# JavaScript do zero

Este é o capítulo mais importante para quem nunca programou. Vamos construir o conhecimento em camadas: primeiro guardar valores, depois tomar decisões, repetir tarefas, agrupar instruções em funções e organizar dados em listas e objetos. A cada conceito, você verá onde ele aparece no Hispânia.

> [mao] Para testar os exemplos, abra qualquer página no navegador, aperte **F12**, vá na aba **Console** e digite (ou cole) o código. Aperte Enter para executar. O Console é o seu laboratório.

## Instruções, comentários e o Console

Um programa JavaScript é uma sequência de **instruções**. Normalmente cada uma fica numa linha e termina com ponto e vírgula `;`:

```js
console.log('Olá!');   // escreve "Olá!" no Console
console.log(2 + 3);    // escreve 5
```

Tudo o que vem depois de `//` numa linha é um **comentário**: o computador ignora, serve só para humanos. Comentários de várias linhas ficam entre `/*` e `*/`. O código do jogo tem comentários em português explicando as partes menos óbvias.

`console.log(...)` é a forma mais simples de "ver" o que o programa está fazendo. Programadores experientes usam isso o tempo todo para investigar problemas.

## Variáveis: dando nome aos valores

Uma **variável** é uma caixa com etiqueta onde você guarda um valor para usar depois.

```js
let vida = 100;        // cria a caixa "vida" com o valor 100
vida = vida - 25;      // tira 25: agora vale 75
const nome = 'Íber';   // uma constante: não pode ser trocada depois
```

- **`let`** cria uma variável que pode mudar de valor.
- **`const`** cria uma constante: uma vez atribuída, não pode receber outro valor. Use `const` sempre que puder. Isso evita bugs, porque ninguém troca o valor sem querer.
- Você vai ver `var` em códigos antigos. Ele funciona como `let`, mas com regras de escopo confusas. O jogo não usa `var`.

> [atencao] O sinal `=` em programação **não** é "igual" da matemática. Ele significa **"guarde o valor da direita na caixa da esquerda"**. Por isso `vida = vida - 25` faz sentido: calcule `vida - 25` e guarde o resultado em `vida`.

No jogo, quase tudo é `const` ou `let`. Por exemplo, o tamanho de cada quadradinho do mapa nunca muda:

@code js/util.js const TILE

### Regras para nomes

Nomes de variáveis podem ter letras, números, `_` e `$`, mas não começam com número e não têm espaço. O costume em JavaScript é o **camelCase**: a primeira palavra minúscula e as seguintes com inicial maiúscula (`maxHp`, `playerDmg`, `nearestInteractable`). Constantes "globais" importantes costumam ser escritas em MAIÚSCULAS (`TILE`, `SAVE_KEY`, `CHAPTERS`).

## Tipos de valores

Todo valor tem um **tipo**. Os principais:

| Tipo | Exemplo | Para que serve no jogo |
|---|---|---|
| **number** (número) | `100`, `0.5`, `-3` | Vida, posição, velocidade, dano |
| **string** (texto) | `'Lobo'`, `"Olá"` | Nomes, falas, cores (`'#ffd84a'`) |
| **boolean** (lógico) | `true`, `false` | `opened` (baú aberto?), `dead` (inimigo morto?) |
| **undefined** | `undefined` | "Ainda não tem valor" |
| **null** | `null` | "Não há nada aqui, de propósito" |
| **object** (objeto) | `{ x: 10, y: 20 }` | Jogador, inimigos, capítulos |
| **array** (lista) | `[1, 2, 3]` | Lista de inimigos, de missões, de falas |
| **function** (função) | `function f() {}` | Comportamentos |

Você pode perguntar o tipo de algo com `typeof`: `typeof 42` dá `'number'`.

### Números e operações

```js
10 + 3    // 13   soma
10 - 3    // 7    subtração
10 * 3    // 30   multiplicação
10 / 4    // 2.5  divisão
10 % 3    // 1    resto da divisão (muito útil!)
2 ** 3    // 8    potência
```

O operador `%` (resto) aparece no jogo para fazer coisas "darem a volta". Por exemplo, para escolher a próxima fala de um NPC de forma circular: se ele tem 3 falas, `npc.line % 3` dá 0, 1, 2, 0, 1, 2...

Atalhos úteis: `x += 5` é o mesmo que `x = x + 5`; `x++` soma 1; `x -= dt` subtrai.

O objeto **`Math`** traz funções matemáticas prontas: `Math.round(2.6)` dá 3, `Math.floor(2.6)` dá 2 (arredonda para baixo), `Math.max(3, 8)` dá 8, `Math.random()` dá um número aleatório entre 0 e 1, `Math.sqrt(16)` dá 4, `Math.hypot(3, 4)` dá 5 (a hipotenusa). O jogo usa muito `Math.sin`, `Math.cos` e `Math.atan2` para ângulos, assunto do capítulo 6.

### Textos (strings)

Textos ficam entre aspas simples `'...'`, duplas `"..."` ou crases `` `...` ``. A crase permite **inserir valores** no meio do texto com `${...}`, o que se chama *template string*:

```js
const nome = 'Íber', nivel = 3;
'Olá, ' + nome + '!'              // juntar com +  → "Olá, Íber!"
`${nome} está no nível ${nivel}`  // template      → "Íber está no nível 3"
```

O jogo usa template strings para montar textos do HUD, como `` `💰 ${S.gold} ${G.ch.currency}` ``.

Strings têm métodos úteis: `.length` (tamanho), `.toUpperCase()`, `.replace(a, b)`, `.slice(0, 5)` (pedaço), `.trim()` (tira espaços das pontas), `.startsWith('x')`, `.split(',')` (corta numa lista).

## Comparações e lógica

Comparações produzem `true` ou `false`:

```js
5 > 3       // true
5 === 5     // true  (igual em valor E tipo)
5 !== 3     // true  (diferente)
'5' === 5   // false (texto não é número)
```

> [atencao] Use sempre `===` e `!==`. Existe também `==`, que tenta "converter" os tipos antes de comparar (`'5' == 5` dá `true`), o que gera bugs difíceis de achar.

Para combinar condições:

- `a && b`: **E**, verdadeiro se os dois forem verdadeiros.
- `a || b`: **OU**, verdadeiro se pelo menos um for.
- `!a`: **NÃO**, inverte.

Um uso muito comum de `||` no jogo é dar um **valor padrão**: `step.icon || '✦'` significa "use o ícone da etapa; se ele não existir, use ✦".

### Valores "verdadeiros" e "falsos"

Em condições, JavaScript trata como **falso**: `false`, `0`, `''` (texto vazio), `null`, `undefined` e `NaN`. Todo o resto conta como verdadeiro. Por isso o jogo pode escrever `if (G.boss)`, que quer dizer "se existe um chefe".

## Decisões: if, else e o operador ternário

```js
if (vida <= 0) {
  console.log('Você caiu...');
} else if (vida < 30) {
  console.log('Cuidado, vida baixa!');
} else {
  console.log('Tudo bem.');
}
```

O bloco entre `{ }` só roda se a condição entre `( )` for verdadeira. Veja um `if` real do jogo, na função que usa uma poção:

@code js/game.js function usePotion()

Leia devagar, linha a linha: se não há poções, avisa e **sai da função** (`return`); se a vida já está cheia, sai sem fazer nada; senão, gasta uma poção e recupera metade da vida máxima, sem passar do máximo (`Math.min`).

O **operador ternário** é um `if` compacto que produz um valor: `condição ? valorSeVerdadeiro : valorSeFalso`.

```js
const texto = cliques === 1 ? 'vez' : 'vezes';
```

> [resposta] O exercício do capítulo 1 (singular e plural) fica assim: `botao.textContent = 'Você clicou ' + cliques + (cliques === 1 ? ' vez' : ' vezes');`

### switch: escolher entre muitos casos

Quando uma variável pode ter muitos valores e cada um exige uma ação, o `switch` fica mais legível que vários `if`:

```js
switch (tecla) {
  case 'KeyQ': usarPocao(); break;
  case 'KeyR': recarregar(); break;
  default: console.log('tecla sem função');
}
```

O `break` encerra o `switch`. Sem ele, a execução "cai" no caso seguinte. O jogo usa `switch` para tratar teclas, tipos de IA dos inimigos e tipos de etapas de missão.

## Repetições: for e while

Repetir é o que computadores fazem de melhor.

```js
for (let i = 0; i < 5; i++) {
  console.log('volta número', i);   // 0, 1, 2, 3, 4
}
```

O `for` tem três partes: **início** (`let i = 0`), **condição para continuar** (`i < 5`) e **o que fazer ao fim de cada volta** (`i++`).

Para percorrer listas, a forma mais legível é o `for...of`, que entrega cada item:

```js
const inimigos = ['Lobo', 'Javali', 'Auroque'];
for (const nome of inimigos) console.log(nome);
```

O `while` repete enquanto a condição for verdadeira. O jogo o usa para subir vários níveis de uma vez, se o jogador ganhar muita experiência:

@code js/game.js function gainXp(n)

Repare no `while (S.xp >= xpNeed(S.level))`: enquanto a experiência acumulada for suficiente para o próximo nível, desconta e sobe de nível. Assim, ganhar 1000 XP de uma vez sobe vários níveis corretamente.

> [atencao] Cuidado com **laços infinitos**: um `while` cuja condição nunca fica falsa trava a página. Se isso acontecer, feche a aba. No jogo, alguns laços têm um "guarda" (`guard++ < 4000`) como proteção extra.

`break` sai do laço na hora; `continue` pula para a próxima volta. Ambos aparecem várias vezes no código.

## Funções: receitas reutilizáveis

Uma **função** é um bloco de instruções com nome, que você pode executar ("chamar") quantas vezes quiser, passando **parâmetros** e recebendo um **resultado** de volta (`return`).

```js
function area(largura, altura) {
  return largura * altura;
}
area(3, 4);   // 12
area(10, 2);  // 20
```

Funções são o principal jeito de **organizar** um programa. Em vez de um código gigante, você o divide em pedaços com nomes claros: `usePotion`, `gainXp`, `hurtPlayer`, `killEnemy`. Lendo só os nomes, já dá para entender o que o programa faz.

Uma função curtíssima e muito usada no jogo:

@code js/util.js const dist

Isso calcula a distância entre dois pontos (o teorema de Pitágoras, feito pelo `Math.hypot`). É chamada centenas de vezes por segundo: para saber se o inimigo está perto, se o jogador alcançou um lugar, se um projétil acertou alguém...

### Funções de seta (arrow functions)

Existe uma forma mais curta de escrever funções, com `=>`:

```js
const dobro = (x) => x * 2;          // retorna x * 2 automaticamente
const saudar = (nome) => {           // com chaves, precisa de return
  const texto = 'Olá, ' + nome;
  return texto;
};
```

O `dist` acima é uma arrow function. Elas são muito usadas para passar funções como parâmetro, como você verá em `filter`, `map` e nos eventos.

### Parâmetros opcionais e valores padrão

Se você chamar uma função sem algum parâmetro, ele vale `undefined`. O jogo usa `||` para dar valores padrão:

@code js/game.js function particle(

Aqui, `life || 0.5` significa "se não informaram a duração, use 0,5 segundo". Assim você pode chamar `particle(x, y, '#fff')` sem passar tudo.

### Funções que recebem e devolvem funções

Em JavaScript, funções são valores como outros quaisquer: dá para guardá-las em variáveis, passá-las como parâmetro e devolvê-las como resultado. O gerador de números aleatórios do jogo é uma função que **fabrica** outra função:

@code js/util.js function mulberry32(seed)

`mulberry32(1101)` devolve uma função nova. Cada vez que você chama essa função, ela dá o próximo número da sequência. A variável `a` fica "presa" dentro dela, lembrando onde parou. Isso se chama **closure** (fechamento), e o capítulo 7 explica por que este gerador é essencial para criar mapas.

## Listas (arrays)

Um **array** é uma lista ordenada de valores, entre colchetes. Cada item tem uma posição (índice) que **começa em 0**:

```js
const falas = ['Olá!', 'Bom dia.', 'Cuidado com os lobos.'];
falas[0]          // 'Olá!'
falas.length      // 3
falas.push('Tchau!');  // adiciona no fim; agora tem 4
```

O jogo guarda quase tudo em arrays: `G.enemies` (inimigos vivos), `G.projs` (projéteis voando), `G.parts` (partículas), `G.objs` (NPCs, itens, baús), `CHAPTERS` (os 14 capítulos).

### Os métodos de array que você mais vai usar

Estes métodos recebem uma **função** que é aplicada a cada item:

| Método | O que faz | Exemplo no jogo |
|---|---|---|
| `forEach(f)` | Executa `f` para cada item | Percorrer botões e ligar cliques |
| `filter(f)` | Nova lista só com os itens em que `f` dá verdadeiro | `G.enemies.filter(e => !e.dead)` remove os mortos |
| `map(f)` | Nova lista com `f` aplicada a cada item | Montar o HTML de cada item da loja |
| `find(f)` | O **primeiro** item em que `f` dá verdadeiro | Achar um NPC pelo id |
| `some(f)` | `true` se **algum** item satisfaz `f` | |
| `sort(f)` | Ordena a lista | Ordenar personagens pela altura (y) para desenhar |
| `reduce(f, ini)` | "Reduz" a lista a um valor (ex.: soma) | Contar inimigos vivos de um acampamento |
| `includes(x)` | `true` se `x` está na lista | Teclas que não devem rolar a página |

Um exemplo real: a cada quadro, o jogo remove da lista todos os projéteis que já acabaram:

```js
G.projs = G.projs.filter(pr => pr.life > 0);
```

Leia em voz alta: "a nova lista de projéteis é a lista antiga filtrada, mantendo só os projéteis com vida maior que zero".

> [exercicio] No Console, crie `const nums = [5, 12, 8, 1, 20];` e use `filter` para obter só os maiores que 7, e `map` para obter o dobro de cada um.

> [resposta] `nums.filter(n => n > 7)` dá `[12, 8, 20]`. `nums.map(n => n * 2)` dá `[10, 24, 16, 2, 40]`.

## Objetos: agrupando informações

Um **objeto** agrupa valores relacionados, cada um com um nome (chave). É como uma ficha:

```js
const lobo = {
  name: 'Lobo',
  hp: 24,        // pontos de vida
  spd: 130,      // velocidade
  ai: 'melee'    // tipo de inteligência
};
lobo.name        // 'Lobo'      (acesso com ponto)
lobo['hp']       // 24          (acesso com colchetes)
lobo.hp = 10;    // muda um valor
lobo.raivoso = true;  // cria uma chave nova
```

Objetos podem conter outros objetos e arrays, formando estruturas tão complexas quanto você precisar. **Todos os dados do jogo são objetos.** Veja a ficha real de um inimigo no arquivo `base.js`:

@code js/data/base.js lobo:

E o estado de uma partida salva, criado quando você começa um jogo novo:

@code js/game.js function newState(name)

Esse objeto, guardado em `G.S`, contém **tudo** o que precisa ser salvo: nome, nível, experiência, dinheiro, poções, melhorias, vida, capítulo atual, progresso das missões e estatísticas.

### Atalhos modernos com objetos

```js
const { x, y } = jogador;          // desestruturação: cria x e y a partir do objeto
const copia = Object.assign({}, a, b); // junta a e b num objeto novo (b sobrescreve a)
Object.keys(obj)                   // lista das chaves
Object.entries(obj)                // lista de pares [chave, valor]
```

O jogo usa `Object.assign` para criar a aparência dos NPCs a partir de modelos: `Object.assign({}, LOOK.noble, { body: '#2a4a7a' })` copia o modelo de "nobre" e troca só a cor do corpo.

## Classes: moldes para criar objetos

Quando você precisa de muitos objetos parecidos (dezenas de inimigos, centenas de projéteis), escreve uma **classe**: um molde. A palavra `new` cria um objeto a partir do molde, e a função especial `constructor` prepara cada objeto novo. Dentro dela, `this` significa "o objeto que está sendo criado".

@code js/entities.js class Proj

Agora o jogo pode criar um projétil com uma linha: `new Proj(x, y, angulo, velocidade, dano, 'p', '#ffe080', 3)`. A classe calcula sozinha a velocidade em cada eixo (`vx`, `vy`) a partir do ângulo e já define que a bala vive 1,4 segundo.

Classes também podem ter **métodos**: funções que pertencem ao objeto. A classe `World` (o mapa) tem métodos como `generate()`, `collides()` e `draw()`. Dentro de um método, `this` é o próprio mapa: `this.W` é a largura dele.

## Objetos com funções: o padrão "módulo"

Outro jeito de organizar código, muito usado no jogo, é um **objeto comum cheio de funções**. A interface inteira, por exemplo, é um objeto chamado `UI` com métodos como `UI.dialog()`, `UI.shop()` e `UI.map()`. O som é `Sfx`, a música é `Music`. Isso agrupa tudo o que é relacionado debaixo de um nome só, evitando que centenas de funções fiquem "soltas".

```js
const Contador = {
  valor: 0,
  somar() { this.valor++; },
  mostrar() { console.log(this.valor); }
};
Contador.somar(); Contador.mostrar();  // 1
```

## Eventos: reagindo ao jogador

Um jogo passa a maior parte do tempo **esperando** o jogador fazer algo. Você registra uma função para ser chamada quando um evento acontecer, com `addEventListener`:

```js
window.addEventListener('keydown', (e) => {
  console.log('Apertou a tecla', e.code);
});
```

A função que você passa é chamada de **callback** ("chame de volta"). O navegador a executa no momento certo e entrega um objeto `e` com detalhes (qual tecla, onde o mouse está...). O jogo escuta `keydown`, `keyup`, `mousemove`, `mousedown`, `mouseup`, `resize` e `blur`. O capítulo 8 mostra como.

Callbacks também servem para dizer **"faça isto depois"**. A função de diálogo do jogo recebe uma função `cb` para executar quando o jogador terminar de ler: `UI.dialog(falas, () => advance(quest))` quer dizer "mostre estas falas e, quando acabar, avance a missão".

## JSON: transformando objetos em texto

Para salvar uma partida, o jogo precisa transformar o objeto `G.S` em texto, porque o armazenamento do navegador só guarda textos. O formato usado é o **JSON**:

```js
const texto = JSON.stringify({ nome: 'Íber', nivel: 3 }); // '{"nome":"Íber","nivel":3}'
const obj = JSON.parse(texto);                            // de volta a objeto
```

## Erros e try/catch

Às vezes algo pode dar errado por motivos fora do seu controle: o navegador está em modo privado e não deixa salvar, ou o jogador importa um arquivo corrompido. O `try/catch` executa o código e, se ocorrer um erro, cai no `catch` em vez de travar o jogo:

@code js/game.js function loadSave(n)

Se o texto salvo estiver corrompido, `JSON.parse` lança um erro, o `catch` o captura e a função devolve `null` ("não há save"), e o jogo segue funcionando.

## Escopo: onde cada nome existe

Uma variável criada dentro de `{ }` só existe ali dentro. Isso é o **escopo**:

```js
function teste() {
  const segredo = 42;
}
console.log(segredo); // ERRO: segredo não existe aqui fora
```

Variáveis criadas fora de qualquer função ou bloco, no topo de um arquivo, são **globais**: todos os scripts da página as enxergam. É assim que o jogo conecta seus arquivos: `util.js` cria `TILE`, e depois `world.js` pode usar `TILE`. O lado ruim é que **dois arquivos não podem criar o mesmo nome global**.

> [bug] Ao adicionar o sistema de idiomas, criei uma função global chamada `T` (de "traduzir"). Mas o arquivo `world.js` já tinha uma constante global chamada `T` (os tipos de terreno). Resultado: o navegador recusou carregar o `world.js` com o erro *"Identifier 'T' has already been declared"* e o jogo inteiro parou. A solução foi renomear a constante do mapa para `TL`. **Lição:** nomes globais devem ser descritivos e únicos. O Console (F12) mostrou o erro exato, com arquivo e linha.

## 'use strict'

Todos os arquivos do jogo começam com `'use strict';`. Essa linha liga o **modo estrito**, que transforma alguns erros silenciosos em erros visíveis. Por exemplo, sem ele, um erro de digitação como `vdia = 10` (em vez de `vida`) cria uma variável nova sem avisar; com ele, o navegador acusa o erro na hora. É uma rede de segurança gratuita.

## Resumo do capítulo

Você agora conhece as peças que formam qualquer programa: **valores e variáveis** para guardar dados, **condições** para decidir, **laços** para repetir, **funções** para organizar e reutilizar, **arrays e objetos** para estruturar informações, **classes** para criar muitos objetos parecidos e **eventos** para reagir ao jogador. O resto do guia mostra como essas mesmas peças, combinadas, formam um jogo completo.

> [exercicio] Escreva uma função `nivelPorXp(xp)` que receba uma quantidade de experiência e diga em que nível o jogador estaria, sabendo que o nível 1 precisa de 50 XP para subir, o nível 2 de 123, o nível 3 de 209 (a fórmula do jogo é `Math.round(50 * Math.pow(nivel, 1.3))`). Use um `while`.

> [resposta]
> ```js
> function nivelPorXp(xp) {
>   let nivel = 1;
>   while (xp >= Math.round(50 * Math.pow(nivel, 1.3))) {
>     xp -= Math.round(50 * Math.pow(nivel, 1.3));
>     nivel++;
>   }
>   return nivel;
> }
> nivelPorXp(200); // 3
> ```
> Teste no Console: `nivelPorXp(200)` dá **3**, porque 200 − 50 = 150, e 150 − 123 = 27, que não basta para os 209 do nível 3.
