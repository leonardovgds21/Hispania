# Por que cada tecnologia foi escolhida

Você pediu para eu explicar por que escolhi cada biblioteca. A resposta curta surpreende muita gente: **o jogo não usa nenhuma biblioteca externa**. Nenhuma. Tudo o que ele faz, desenho, som, música, salvamento e tradução, usa recursos que **já vêm dentro de qualquer navegador moderno**, as chamadas *APIs da Web* (interfaces de programação que o navegador oferece).

Isso foi uma decisão consciente, e este capítulo explica o raciocínio por trás dela, comparando cada escolha com as alternativas mais populares. Entender essas trocas é tão importante quanto saber programar: na vida real, você vai passar muito tempo decidindo **o que usar**.

## O que é uma biblioteca, um framework e um motor de jogo

- Uma **biblioteca** é um pacote de código escrito por outras pessoas que você chama quando precisa. Exemplo: Howler.js toca sons; você chama `new Howl({ src: 'som.mp3' }).play()`.
- Um **framework** é uma estrutura maior que organiza o seu programa e chama o *seu* código nos momentos certos. Exemplo: Phaser, um framework de jogos, decide quando chamar sua função `update()`.
- Um **motor de jogo** (*game engine*) é um programa completo, com editor visual, física, animação e exportação. Exemplos: Unity, Godot, Unreal.

Todos são ótimos e economizam muito trabalho em projetos grandes. Mas cada um tem um custo: precisa ser instalado, aprendido, atualizado, e esconde de você *como as coisas funcionam por dentro*.

## Os critérios usados

Antes de escolher qualquer ferramenta, listei o que o projeto precisava:

1. **Rodar no GitHub Pages**, que só hospeda arquivos estáticos (sem servidor).
2. **Abrir com dois cliques**, sem instalar nada, sem "compilar", sem terminal.
3. **Ser fácil de entender e modificar** por quem está aprendendo. Este guia é prova disso: dá para explicar cada linha.
4. **Ser leve**: carregar rápido, inclusive em internet lenta.
5. **Não depender de arquivos de arte ou som**, que eu não tinha. Tudo precisava ser **gerado por código**.

Com esses critérios, o navegador "puro" venceu em quase todas as categorias. Veja cada uma.

## Desenho: Canvas 2D em vez de Phaser, PixiJS ou Unity

| Opção | Vantagens | Por que não foi escolhida |
|---|---|---|
| **Canvas 2D (escolhido)** | Já vem no navegador; API simples (`fillRect`, `arc`, `drawImage`); controle total | Você mesmo escreve câmera, colisão e laço do jogo |
| Phaser | Framework de jogos 2D completo: física, cenas, carregamento de imagens, animações | ~1 MB a mais; a maioria das funções seria inútil aqui; esconde os conceitos que este guia quer ensinar |
| PixiJS | Desenho muito rápido usando a placa de vídeo (WebGL) | Só faz sentido com milhares de sprites; aqui desenhamos poucas centenas de formas por quadro |
| Unity / Godot | Editor visual, física 3D/2D, exportação para celular e console | Exige instalar programas grandes; o resultado exportado para web pesa dezenas de MB; uma linguagem diferente (C#/GDScript) |

O **Canvas 2D** é uma "tela de pintura" onde você desenha com comandos como "pinte um retângulo aqui" e "desenhe um círculo ali". Para um jogo 2D de visão de cima, com personagens desenhados por formas geométricas, ele é mais do que suficiente. O jogo roda a 60 quadros por segundo mesmo em computadores modestos, graças a um truque de cache de mapa que você verá no capítulo 7.

> [porque] **Por que os personagens são desenhados com código e não com imagens (sprites)?** Eu não tinha artes prontas, e usar artes de terceiros traz questões de licença. Desenhar com formas permite criar **14 classes de herói e mais de 50 inimigos** variando só cores e acessórios (`hat: 'morion'`, `weapon: 'gun'`). Se um dia você quiser sprites desenhados à mão, o Canvas carrega imagens com `ctx.drawImage(imagem, x, y)`: basta trocar as funções de desenho.

## Linguagem: JavaScript puro em vez de TypeScript

**TypeScript** é JavaScript com "tipos" declarados (`let vida: number = 100`). Ele pega muitos erros antes de você rodar o programa e é a escolha certa para equipes e projetos grandes. Mas exige um passo de **compilação** (transformar `.ts` em `.js`) e uma configuração. Para um iniciante, isso é uma camada a mais entre o código e o resultado. O JavaScript puro roda direto: você salva, aperta F5, vê o resultado.

## Organização: scripts clássicos em vez de módulos ES e sem "bundler"

O JavaScript moderno tem **módulos** (`import`/`export`), que deixam cada arquivo declarar exatamente o que usa dos outros. É mais organizado. Mas há um detalhe prático: **módulos não funcionam ao abrir o arquivo com dois cliques** (endereço `file://`); o navegador exige um servidor. Como um dos critérios era "abrir com dois cliques", o jogo usa **scripts clássicos** carregados em ordem no `index.html`, que compartilham variáveis globais.

Ferramentas como **Vite, Webpack ou esbuild** ("bundlers") juntam e otimizam arquivos. Elas brilham em sites grandes, mas exigiriam Node.js, `npm install`, uma pasta `node_modules` com milhares de arquivos e um comando de *build* antes de cada teste. Aqui, nada disso é necessário.

> [atencao] O preço dessa simplicidade é o que você viu no capítulo 3: nomes globais podem colidir (o bug do `T`). Em um projeto maior, eu trocaria para módulos ES com um servidor de desenvolvimento. É uma troca consciente, não um "jeito certo".

## Interface: HTML e CSS em vez de React ou desenhar no canvas

Frameworks como **React, Vue ou Svelte** organizam interfaces complexas que mudam o tempo todo (como o Facebook). O Hispânia tem poucas janelas (diálogo, loja, diário, mapa, menu), que são montadas com texto HTML e mostradas ou escondidas. Um objeto `UI` com cerca de 30 métodos resolve tudo, sem dependências.

Já a alternativa de desenhar a interface **dentro do canvas** exigiria reimplementar à mão botões, quebra de linha, rolagem e campos de texto. O HTML faz isso de graça, com acessibilidade e boa aparência.

## Som: Web Audio API em vez de Howler.js ou Tone.js

| Opção | Para que serve | Decisão |
|---|---|---|
| **Web Audio API (escolhida)** | Sintetizador e mixer embutidos no navegador: osciladores, filtros, ganho, atraso, buffers | Gera todos os sons e músicas por código, sem arquivos |
| Howler.js | Tocar arquivos `.mp3`/`.ogg` de forma fácil e compatível | Não havia arquivos de áudio para tocar |
| Tone.js | Biblioteca musical poderosa sobre a Web Audio (sintetizadores, sequenciadores) | Ótima, mas ~300 KB; para os poucos instrumentos necessários, a Web Audio pura bastou |

A **Web Audio API** funciona como um estúdio de som modular: você cria "caixinhas" (um oscilador que gera uma nota, um filtro que abafa o som, um controle de volume) e as conecta com fios virtuais até os alto-falantes. O capítulo 14 ensina como cada som e cada instrumento medieval foi construído assim, inclusive o alaúde dedilhado, feito com um algoritmo clássico chamado **Karplus-Strong**.

> [porque] **Por que música gerada em vez de arquivos MP3?** Três motivos. (1) Não havia trilha pronta, e música de terceiros tem direitos autorais. (2) Arquivos de música pesam vários megabytes cada; 15 temas seriam dezenas de MB, enquanto o motor de música inteiro tem cerca de 300 linhas. (3) A música gerada **varia sozinha**: a cada duas repetições, a melodia é recomposta, então não cansa em 5 horas de jogo.

## Salvamento: localStorage em vez de SQLite, IndexedDB ou um servidor

No início da nossa conversa, você perguntou sobre um "banco de dados acoplado", como o SQLite. Veja a comparação:

| Opção | Como funciona | Decisão |
|---|---|---|
| **localStorage (escolhido)** | Guarda pares "chave → texto" no navegador; até ~5 MB; API de 3 funções | Um save do jogo tem poucos KB. É o mais simples possível |
| IndexedDB | Banco de dados de verdade dentro do navegador, para muitos dados | API complicada; desnecessário para 5 saves pequenos |
| SQLite no navegador (sql.js / WASM) | O SQLite real compilado para rodar no navegador | ~1 MB de download e você ainda precisa salvar o arquivo do banco em algum lugar (normalmente... no IndexedDB) |
| Servidor (Supabase, Firebase, seu PC) | Dados ficam na nuvem, compartilhados entre jogadores | Só vale para ranking, multiplayer ou contas. Exige internet, contas e custos |

Como o jogo é para um jogador só, o **localStorage** é suficiente. Para o jogador não perder o progresso ao trocar de computador, o jogo oferece **exportar e importar** o save como arquivo `.json`.

## Tradução: um objeto de textos em vez de i18next

Bibliotecas como **i18next** cuidam de plurais complexos, dezenas de idiomas e carregamento sob demanda. Para dois idiomas, uma função `T('chave')` de 5 linhas e um dicionário resolvem. O conteúdo dos capítulos é traduzido por **sobreposição**: um arquivo espanhol com a mesma estrutura substitui os textos portugueses ao carregar (capítulo 13).

## Ferramentas de bastidor (fora do jogo)

Algumas ferramentas foram usadas só durante o desenvolvimento e não fazem parte do jogo publicado:

- **Node.js**: executou o servidor de testes `.claude/serve.js` (que usa só módulos nativos do Node: `http`, `fs` e `path`), os testes automáticos e o gerador deste PDF. Nenhum pacote do `npm` foi instalado.
- **Microsoft Edge em modo headless** (sem janela): converteu este guia de HTML para PDF. Escolhi o Edge porque já vem no Windows. Alternativas como Puppeteer ou bibliotecas Python de PDF exigiriam instalação.
- **Git e GitHub Pages**: para versionar e publicar (capítulo 15).

## Quando você DEVE usar uma biblioteca

Não leve deste capítulo a ideia de que bibliotecas são ruins. Elas são ótimas quando o problema é grande e difícil. Use uma quando:

- O problema é complexo e resolvido há anos por especialistas (física realista: **Matter.js**; 3D: **Three.js**; criptografia: **nunca** escreva a sua).
- Você precisa de compatibilidade com muitos navegadores e dispositivos antigos.
- Você trabalha em equipe e todos já conhecem a ferramenta.
- O tempo de entrega importa mais do que entender cada detalhe.

Para **aprender**, porém, construir as peças você mesmo é imbatível. Depois de terminar este guia, quando usar o Phaser, você vai entender o que ele faz por baixo dos panos, e isso vai fazer de você um programador muito melhor.
