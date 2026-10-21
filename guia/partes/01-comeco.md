# ! Como usar este guia

Este guia tem dois objetivos ao mesmo tempo. O primeiro é **ensinar a programar do zero**, sem supor que você já saiba qualquer coisa. O segundo é **explicar, peça por peça, como o jogo Hispânia foi construído**: cada pasta, cada arquivo, cada função e cada decisão.

Os dois objetivos andam juntos de propósito. É muito mais fácil aprender programação com um projeto real e divertido do que com exemplos soltos como "calcule a média de três números". Aqui, cada conceito novo aparece primeiro de forma simples e, logo depois, você vê **onde ele foi usado no jogo**.

## ! O caminho de leitura

O guia está dividido em quatro partes:

1. **Fundamentos (capítulos 1 a 4).** O que é programar, as ferramentas, como a web funciona, a linguagem JavaScript do zero e o porquê de cada tecnologia escolhida.
2. **O motor do jogo (capítulos 5 a 9).** A arquitetura, o laço do jogo, o desenho na tela, a geração dos mapas, os controles, o combate e a inteligência dos inimigos.
3. **Os sistemas (capítulos 10 a 14).** Missões e dados, interface, salvamento, idiomas, som e música.
4. **Prática (capítulos 15 a 17).** Testes, publicação na internet, tutoriais para você estender o jogo sozinho e uma referência completa de todas as funções.

Leia na ordem. Os capítulos se apoiam uns nos outros. Se você já sabe um pouco de programação, pode passar rápido pelos capítulos 2 e 3, mas não os pule: eles também mostram detalhes do jogo.

## ! As caixas coloridas

Ao longo do texto você vai encontrar caixas como estas:

> [dica] Atalhos, truques e boas práticas que facilitam a sua vida.

> [atencao] Erros comuns que quase todo iniciante comete. Leia com calma.

> [porque] Explicações sobre **por que** algo foi feito de um jeito e não de outro. Programar é, em grande parte, tomar decisões. Estas caixas mostram o raciocínio.

> [exercicio] Pequenos desafios para você fazer **de verdade**, digitando o código. Não pule. Só se aprende a programar programando.

> [resposta] A solução dos exercícios, para você conferir depois de tentar.

> [bug] Histórias reais de erros que apareceram durante a construção deste jogo e como foram resolvidos.

## ! Os blocos de código

Há dois tipos de bloco de código. Os que têm uma **barra marrom no topo**, com o nome do arquivo e o número das linhas, foram **copiados automaticamente do código real do jogo** no momento em que este PDF foi gerado. Eles são exatamente o que roda no jogo:

@code js/util.js const clamp

Os blocos **sem a barra** são exemplos escritos para ensinar, que você pode digitar e testar:

```js
// Isto é um exemplo didático, não faz parte do jogo
const nome = 'Íber';
console.log('Olá, ' + nome);
```

> [dica] Não tente decorar nada. Programadores profissionais consultam documentação o tempo todo. O importante é **entender a ideia**. A sintaxe exata você consulta quando precisar.

# Primeiros passos: o que é programar

## O que é um programa

Um computador é uma máquina extremamente rápida e extremamente literal. Ele não "entende" nada: ele executa instruções, uma depois da outra, exatamente como estão escritas. Um **programa** é uma lista dessas instruções.

Imagine que você escreve uma receita de bolo para alguém que nunca entrou numa cozinha e que faz **tudo ao pé da letra**. Se você escrever "bata os ovos", essa pessoa vai perguntar: quantos ovos? Com o quê? Por quanto tempo? Programar é escrever receitas tão precisas que não sobra dúvida nenhuma.

Essas receitas são escritas numa **linguagem de programação**. Existem centenas: Python, C, Java, C#, Lua, Rust... Este jogo usa três linguagens da web, cada uma com um papel:

| Linguagem | Papel | Analogia |
|---|---|---|
| **HTML** | Diz **o que existe** na página: um título, um botão, uma área de desenho | O esqueleto de um corpo |
| **CSS** | Diz **como as coisas aparecem**: cores, tamanhos, posições, fontes | A roupa e a maquiagem |
| **JavaScript** | Diz **o que acontece**: a lógica, os cálculos, as reações aos cliques | O cérebro e os músculos |

HTML e CSS não são exatamente linguagens de *programação* (elas descrevem, não calculam). A programação de verdade, o "cérebro" do jogo, está toda em **JavaScript**, e é nela que este guia vai se concentrar.

## O que é um jogo, do ponto de vista do programador

Todo jogo de computador, do Pong de 1972 ao jogo mais moderno, funciona com a mesma ideia central, o **laço do jogo** (em inglês, *game loop*). Dezenas de vezes por segundo o programa repete:

<div class="diagram">
<div class="node"><b>1. Ler a entrada</b>quais teclas estão apertadas? onde está o mouse?</div><div class="arrow">➜</div>
<div class="node"><b>2. Atualizar o mundo</b>mover o herói, mover inimigos, checar colisões, aplicar dano</div><div class="arrow">➜</div>
<div class="node"><b>3. Desenhar</b>apagar a tela e pintar tudo de novo na posição nova</div><div class="arrow">↺</div>
</div>

Cada repetição se chama **quadro** (*frame*). Se o laço roda 60 vezes por segundo, dizemos que o jogo roda a **60 FPS** (*frames per second*, quadros por segundo). O olho humano vê essa sequência de imagens paradas como movimento, exatamente como num desenho animado.

Guarde essa ideia. Quase tudo neste guia é uma das três etapas: ler entrada, atualizar, desenhar.

## As ferramentas que você precisa

Para programar este jogo você precisa de poucas coisas, e todas são gratuitas.

### 1. Um navegador moderno

Chrome, Edge ou Firefox. O navegador é o "motor" que executa o jogo. Ele já vem com tudo: um interpretador de JavaScript, uma área de desenho (Canvas), um sistema de som (Web Audio) e um pequeno banco de dados (localStorage). Por isso este jogo não precisou instalar nenhuma biblioteca, como você verá no capítulo 4.

### 2. Um editor de código

Você pode escrever código até no Bloco de Notas, mas um editor de verdade ajuda muito: ele colore o código, completa palavras e aponta erros. O mais usado no mundo é o **Visual Studio Code** (VS Code), gratuito, em `code.visualstudio.com`.

> [mao] Instale o VS Code. Depois use **Arquivo → Abrir Pasta...** e escolha a pasta `game`. À esquerda aparece a árvore de arquivos do projeto. Clique em `js/game.js` para ver o código principal.

### 3. As Ferramentas de Desenvolvedor do navegador (DevTools)

Este é o seu melhor amigo. Com o jogo aberto no navegador, aperte **F12**. Abre um painel com várias abas. As mais importantes:

- **Console**: mostra mensagens e erros, e deixa você digitar JavaScript e ver o resultado na hora.
- **Elements**: mostra o HTML da página "ao vivo". Você pode mudar cores e textos para testar.
- **Sources**: deixa você pausar o jogo numa linha específica (*breakpoint*) e inspecionar variáveis.
- **Application**: mostra o que o jogo salvou no navegador (os saves ficam em *Local Storage*).

> [mao] Abra o jogo, aperte F12, vá na aba **Console** e digite `G.S.gold = 9999` e depois Enter (com uma partida em andamento). Você acabou de mudar o dinheiro do herói "por dentro". `G` é o objeto principal do jogo; vamos estudá-lo no capítulo 5.

### 4. Node.js (opcional)

O Node.js é um programa que executa JavaScript **fora** do navegador. O jogo não precisa dele para funcionar. Ele foi usado só para duas tarefas de bastidor: rodar um pequeno servidor de testes (`.claude/serve.js`) e gerar este PDF (`guia/build.js`).

### 5. Git e GitHub (para publicar)

O Git guarda o histórico de versões do seu código; o GitHub hospeda esse histórico na internet e, com o **GitHub Pages**, publica o jogo de graça. O capítulo 15 ensina o passo a passo.

## Seu primeiro programa

Antes de mergulhar no jogo, faça o clássico "Olá, mundo". Crie uma pasta qualquer, e dentro dela um arquivo chamado `ola.html` com este conteúdo:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Meu primeiro programa</title>
  </head>
  <body>
    <h1>Olá, mundo!</h1>
    <button id="botao">Clique em mim</button>
    <script>
      const botao = document.getElementById('botao');
      let cliques = 0;
      botao.onclick = () => {
        cliques = cliques + 1;
        botao.textContent = 'Você clicou ' + cliques + ' vezes';
      };
    </script>
  </body>
</html>
```

Dê dois cliques no arquivo para abri-lo no navegador e clique no botão. Repare que as três linguagens apareceram juntas: o **HTML** criou o título e o botão; o **JavaScript** (dentro de `<script>`) reagiu ao clique. Não se preocupe em entender cada palavra agora: os próximos capítulos explicam tudo.

> [exercicio] Mude o programa para que o texto do botão diga "Você clicou 1 vez" (no singular) quando `cliques` for 1, e "vezes" nos outros casos. Dica: você vai precisar de um `if`, que veremos no capítulo 3. Tente depois de ler a seção sobre decisões.

# Como a web funciona: HTML e CSS

## O caminho de um arquivo até a tela

Quando você abre `index.html`, o navegador faz, em ordem:

1. **Lê o HTML** de cima para baixo e monta uma árvore de elementos na memória, chamada **DOM** (*Document Object Model*). Cada etiqueta (`<div>`, `<button>`, `<canvas>`) vira um "objeto" que o JavaScript pode ler e modificar.
2. **Lê o CSS** e calcula a aparência de cada elemento (cor, tamanho, posição).
3. **Executa cada `<script>`** no momento em que o encontra, na ordem em que aparecem.
4. **Desenha** a página e fica esperando eventos: cliques, teclas, mudanças de tamanho da janela...

Esse detalhe do item 3 é importante para o jogo: os scripts rodam **na ordem** em que aparecem. Um script só pode usar o que os scripts anteriores já criaram. Você verá isso na prática ao estudar o `index.html`.

## HTML: etiquetas, atributos e aninhamento

HTML é feito de **etiquetas** (*tags*). A maioria vem em pares, uma de abertura e uma de fechamento, envolvendo um conteúdo:

```html
<p class="aviso" id="msg">Este é um parágrafo.</p>
```

- `p` é o **nome** da etiqueta (parágrafo).
- `class="aviso"` e `id="msg"` são **atributos**: informações extras. O `id` é um nome único para achar o elemento pelo JavaScript; a `class` agrupa elementos que compartilham o mesmo estilo CSS.
- Etiquetas podem ficar **umas dentro das outras** (aninhamento), formando a árvore do DOM.

As etiquetas usadas no jogo são poucas:

| Etiqueta | Para que serve | Onde aparece no jogo |
|---|---|---|
| `<canvas>` | Uma área retangular onde o JavaScript desenha pixels livremente | O mundo do jogo inteiro |
| `<div>` | Uma "caixa" genérica para agrupar e posicionar coisas | HUD, diálogos, janelas |
| `<span>` | Uma caixa pequena dentro de uma linha de texto | Números do HUD |
| `<button>` | Um botão clicável | Menus, loja, quiz |
| `<input>` | Um campo onde o jogador digita | Nome da linhagem |
| `<script>` | Carrega ou contém JavaScript | Todos os arquivos `.js` |
| `<link>` | Carrega um arquivo CSS | `css/style.css` |

## O index.html do jogo, linha a linha

O arquivo `index.html` é a porta de entrada. Ele é curto, porque quase tudo é criado pelo JavaScript:

@code index.html 1-56

O que cada parte faz:

- **`<!doctype html>`** avisa o navegador que este é um documento HTML moderno.
- **`<html lang="pt-BR">`** é a raiz da árvore. O `lang` ajuda leitores de tela e tradutores automáticos (o jogo troca para `es-ES` quando você escolhe espanhol).
- **`<meta charset="utf-8">`** diz que o texto usa a codificação UTF-8, que suporta acentos, "ç" e emojis. Sem isso, "Espanha" poderia aparecer certo, mas "Hispânia" viraria lixo.
- **`<meta name="viewport" ...>`** faz a página se ajustar à largura de celulares.
- **`<link rel="stylesheet" href="css/style.css">`** carrega o CSS.
- **`<canvas id="game">`** é a tela de pintura onde o mundo é desenhado.
- **`<div id="hud">`** é o HUD (*heads-up display*): os painéis de vida, XP, dinheiro e missões, que ficam **por cima** do canvas. A classe `hidden` esconde tudo até o jogo começar.
- **`#toasts`, `#dialog`, `#modal`, `#title`** são "contêineres vazios" que o JavaScript preenche: notificações, caixa de diálogo, janelas (loja, diário, mapa) e a tela de título.
- **A lista de `<script>`** carrega o JavaScript **em uma ordem pensada**: primeiro as ferramentas gerais (`util.js`, `i18n.js`), depois os dados (`base.js`, capítulos, traduções), depois os sistemas que usam esses dados (`music.js`, `world.js`, `entities.js`, `game.js`) e por último a interface (`ui.js`).
- **O último `<script>`** dá a partida: aplica o idioma, ajusta os textos fixos e mostra a tela de título.

> [porque] **Por que o HUD é HTML e não desenhado no canvas?** Textos, botões, rolagem e quebra de linha automática já vêm prontos no HTML. Desenhar uma janela de loja com botões clicáveis direto no canvas exigiria programar tudo isso à mão: detectar onde o mouse clicou, quebrar o texto em linhas, desenhar a barra de rolagem... Usar HTML por cima do canvas é uma técnica comum em jogos de navegador e economiza centenas de linhas.

## CSS: seletores, propriedades e caixas

Uma regra CSS tem um **seletor** (quem será estilizado) e uma lista de **propriedades** (o quê):

```css
.toast.main {            /* seletor: elementos com as classes toast E main */
  border-color: #ffd84a; /* propriedade: valor; */
  color: #ffd84a;
}
```

Seletores mais usados:

| Seletor | Significa | Exemplo no jogo |
|---|---|---|
| `button` | Todos os elementos `<button>` | Estilo dourado de todos os botões |
| `.panel` | Todos com `class="panel"` | Painéis do HUD |
| `#dialog` | O elemento com `id="dialog"` | A caixa de diálogo |
| `#dialog .who` | Elementos `.who` **dentro** de `#dialog` | O nome de quem fala |
| `button:hover` | Botões com o mouse em cima | Brilho ao passar o mouse |
| `.hidden` | Qualquer elemento com a classe `hidden` | Esconder telas |

As cores aparecem em **hexadecimal**: `#ffd84a` significa vermelho `ff` (255), verde `d8` (216), azul `4a` (74), que dá um dourado. Cada par vai de `00` (nada) a `ff` (máximo).

### O truque da classe `hidden`

Esta regra, sozinha, controla todas as telas do jogo:

@code css/style.css .hidden {

Para esconder qualquer coisa, o JavaScript adiciona a classe `hidden`; para mostrar, remove. Por exemplo, em `ui.js`: `$('dialog').classList.add('hidden')`. O `!important` garante que essa regra vença qualquer outra.

### Posicionamento: como o HUD fica por cima do jogo

@code css/style.css #hud {

@code css/style.css .panel {

- `position: fixed; inset: 0;` faz o HUD ocupar a janela inteira, preso à tela.
- `pointer-events: none;` é o detalhe esperto: o HUD **deixa os cliques passarem** para o canvas embaixo. Sem isso, o jogador não conseguiria atacar clicando no mundo, porque o HUD "engoliria" os cliques.
- Cada `.panel` usa `position: absolute` com `top`/`left`/`right` para se prender a um canto.

### Flexbox: alinhando coisas em linha ou coluna

Muitos componentes do jogo usam `display: flex`, um modo de layout que alinha os filhos em linha (ou coluna) e distribui o espaço:

@code css/style.css #toasts {

Essa linha centraliza as notificações (*toasts*) no topo e as empilha em coluna, com 5 pixels entre elas.

### Responsividade

No fim do CSS, uma **media query** aplica regras diferentes em telas estreitas:

```css
@media (max-width: 700px) {
  .keys, .chapter { display: none; }   /* esconde a barra de teclas no celular */
}
```

> [exercicio] Abra `css/style.css`, encontre a regra `.toast.level` e troque `background: rgba(90, 60, 0, 0.9)` por `background: rgba(0, 60, 120, 0.9)`. Recarregue o jogo (F5) e suba de nível. A notificação de nível agora é azul. Parabéns: você modificou o jogo.

> [dica] No DevTools (F12), aba **Elements**, clique num elemento e edite o CSS dele no painel da direita. A mudança aparece na hora, sem salvar nada. É a forma mais rápida de experimentar visuais; quando gostar, copie o valor para o arquivo `.css`.
