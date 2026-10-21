# Missões, capítulos e dados

Este capítulo mostra o "motor de histórias" do Hispânia: como um arquivo de dados vira 14 capítulos jogáveis, com diálogos, missões, quizzes, chefes e evolução do herói.

## Os dados base: armas, classes e inimigos

O arquivo `js/data/base.js` tem três "tabelas":

- **`WEAPONS`**: as 14 armas, com tipo (`melee`, `gun`, `voice`), dano, alcance, arco, recarga, munição, cor e como desenhar.
- **`CLASSES`**: as 14 classes do herói. Cada uma aponta para uma arma e tem uma aparência (`look`).
- **`ENEMIES`**: cerca de 55 inimigos e chefes.

@code js/data/base.js const CLASSES

A classe de cada capítulo é definida no próprio capítulo (`cls: 'cacador'`). Por isso o herói **muda de arma automaticamente** ao trocar de capítulo, e ao voltar a um capítulo antigo pelo menu ele volta a usar a lança. Nível, ouro e melhorias, porém, acompanham a linhagem inteira.

## A estrutura de um capítulo

Cada capítulo é um objeto grande. Este é o esqueleto, com o significado de cada campo:

```js
CHAPTERS.push({
  id: 'c1', num: 1,                     // identificador único e ordem
  title: 'As Origens', years: '...',    // nome e época
  cls: 'cacador',                       // classe/arma do herói neste capítulo
  seed: 1101,                           // semente do mapa
  currency: 'conchas',                  // nome da moeda (só visual)
  biome: { ... },                       // cores e obstáculos do mapa
  intro: ['página 1', 'página 2'],      // narração de abertura
  outro: ['...'],                       // narração de encerramento
  places: [ { id, name, x, y, r, type, icon } ],   // lugares do mapa
  npcs:   [ { id, name, at, dx, dy, look, lines, shop } ],  // personagens
  camps:  [ { at, type, n } ],          // acampamentos extras (opcional)
  codex:  [ { id, at, title, text } ],  // crônicas históricas colecionáveis
  quests: [ main, s1, s2, ... ]         // missão principal + secundárias
});
```

### Lugares

@code js/data/chapters1.js places: [

Cada lugar tem posição **em tiles** (`x`, `y`), raio da área limpa (`r`), um `type` e um `icon` opcional (o marco desenhado no centro). O tipo muda o mapa e o minimapa:

| type | Efeito no mapa | Cor no minimapa |
|---|---|---|
| `village` / `city` | Praça com piso e casas em volta | Branco |
| `camp` | Clareira onde inimigos ficam | Laranja |
| `ruin` | Clareira com um marco | Branco |
| `arena` | Clareira grande onde aparece o chefe | Vermelho |

O **primeiro lugar** da lista é sempre o ponto de partida e de renascimento do herói.

### NPCs

Um NPC (personagem não jogável) fica num lugar (`at`) com um deslocamento em tiles (`dx`, `dy`). Tem falas soltas (`lines`), que se alternam a cada conversa, e pode ser um **comerciante** (`shop: true`).

@code js/data/chapters1.js { id: 'ama'

### Crônicas (codex)

As 92 crônicas são os textos históricos espalhados pelo mapa. Cada uma diz perto de qual lugar está (`at`); a posição exata é sorteada com uma semente própria, então é sempre a mesma.

## A missão: uma lista de etapas

Toda missão é uma lista de **etapas** (`steps`). Existem 6 tipos de etapa:

| `t` (tipo) | Significado | Campos | Termina quando |
|---|---|---|---|
| `talk` | Falar com alguém | `npc`, `say` | O jogador conversa com o NPC |
| `kill` | Derrotar inimigos | `e` (tipo), `n`, `at` | `n` inimigos do tipo `e` morrem |
| `collect` | Coletar itens | `item`, `icon`, `n`, `at` | `n` itens coletados |
| `goto` | Ir a um lugar | `at`, `say` | O herói entra na área do lugar |
| `boss` | Derrotar um chefe | `e`, `at`, `intro` | O chefe morre |
| `quiz` | Responder perguntas | `npc`, `qs` | Todas as respostas certas |

Qualquer etapa pode ter um `desc` (o texto do objetivo no HUD) e um `done` (falas mostradas ao concluir). Veja a missão principal do capítulo 1 inteira, só com dados:

@code js/data/chapters1.js { id: 'main', title: 'O Inverno do Clã'

Note como **a história é contada pelos dados**. As falas têm o formato `[quem, texto]`, onde `quem` é o id de um NPC, `'N'` (narrador) ou `'H'` (o herói). O marcador `{nome}` é trocado pelo nome da linhagem escolhido pelo jogador.

### Missões secundárias

As secundárias têm a mesma forma, mais dois detalhes:

- A **primeira etapa é sempre `talk` com quem dá a missão**. Enquanto o jogador não fala com essa pessoa, a missão fica "disponível", mas não aparece no rastreador.
- O campo `req` diz em que etapa da história principal ela é liberada. Por exemplo, `req: 8` significa que a missão só aparece depois que a missão principal chegou à etapa 8. Isso evita spoilers e garante a ordem cronológica.

E um `reward` (recompensa) com XP, ouro e poções, multiplicados pela dificuldade do capítulo.

## O motor de missões

Agora o código que dá vida a esses dados. Todo o progresso fica em `G.S.ch[idCapitulo].q[idMissao]`, um objeto pequeno com três campos: `step` (etapa atual), `prog` (progresso na etapa, como "3 de 5 lobos") e `done` (concluída).

@code js/game.js function chState(id)

@code js/game.js function qState(qid)

Repare na técnica: se o registro ainda não existe, ele é **criado na hora** com valores iniciais. Assim, o resto do código nunca precisa verificar "já existe?".

@code js/game.js function questActive(quest)

### Avançar, começar e concluir

As três funções centrais formam um ciclo:

@code js/game.js function advance(quest)

@code js/game.js function startStep(quest)

@code js/game.js function completeQuest(quest)

<div class="diagram">
<div class="node"><b>advance</b>step++ · mostra as falas "done"</div><div class="arrow">➜</div>
<div class="node"><b>era a última etapa?</b></div><div class="arrow">➜</div>
<div class="node"><b>sim → completeQuest</b>recompensa · se for a principal, fim do capítulo</div>
<div class="node"><b>não → startStep</b>cria itens de coleta · avisa o novo objetivo</div>
</div>

### Quem chama advance?

Cada tipo de etapa é detectado num lugar diferente do código:

- **`talk`** e **`quiz`**: em `talkTo`, quando o jogador clica num NPC.
- **`kill`**: em `onKill`, chamado sempre que um inimigo morre.
- **`collect`**: em `pickItem`, quando o herói encosta num item.
- **`goto`** e **`boss`**: em `checkGotoAndBoss`, chamado em todo quadro.

@code js/game.js function onKill(type)

@code js/game.js function checkGotoAndBoss()

@code js/game.js function talkTo(npc)

Observe a **ordem de prioridade** em `talkTo`: primeiro verifica se alguma missão quer conversar com esse NPC agora (a principal vem primeiro, porque é a primeira da lista). Se não houver, e o NPC for comerciante, abre a loja. Senão, diz uma das falas soltas.

### O quiz

@code js/game.js function runQuiz(quest, s, npc)

`runQuiz` usa uma função interna `ask` que **chama a si mesma** depois de cada resposta certa, até acabarem as perguntas. Uma função que chama a si mesma é **recursiva**. Ao errar, o NPC sugere ler as crônicas, e o jogador pode tentar de novo, começando do zero.

### A seta do objetivo

@code js/game.js function questTarget(quest)

Para cada tipo de etapa, `questTarget` sabe onde é o objetivo: o NPC (falar), o item mais próximo (coletar) ou o centro do lugar (os demais). É esse ponto que a seta dourada e o minimapa mostram.

### O "!" sobre os NPCs

@code js/game.js function npcMarker(npc)

Um "!" **dourado** indica que a história principal quer falar com aquela pessoa; um "!" **azul**, uma missão secundária.

## Entrando e saindo de capítulos

@code js/game.js function loadChapter(idx, keepPos)

`loadChapter` é a "fábrica" de um capítulo. Em ordem: define o multiplicador, **gera o mapa** (`new World`), posiciona o herói (no início ou onde ele estava no save), cria NPCs, crônicas ainda não lidas e baús (lembrando quais já foram abertos), cria os acampamentos (os definidos nos dados mais um para cada etapa de caça), povoa os acampamentos, recria os itens de coleta que faltam e salva.

@code js/game.js function enterChapter(idx, keepPos)

`enterChapter` envolve `loadChapter`, enche a vida, troca a música e mostra a narração de abertura **só na primeira vez**.

@code js/game.js function chapterComplete()

Ao concluir a missão principal, o jogo mostra a narração de encerramento e pergunta ao jogador se ele quer **partir para a próxima era** ou **ficar e explorar** a época atual (terminar missões secundárias, achar crônicas e baús). No último capítulo, mostra o final.

@code js/game.js function offerNextChapter()

Quem fica pode partir quando quiser falando com o **guia** do capítulo, que é o personagem da primeira conversa da história (a Anciã Ama no capítulo 1). O guia ganha um "!" dourado e a seta do objetivo passa a apontar para ele:

@code js/game.js function guideNpc()

Ao partir, `goToNextChapter` mostra a tela de **evolução da linhagem** (o herói antigo ao lado do novo, com a arma nova) e carrega o próximo capítulo.

> [mao] **Crie a sua primeira missão.** No capítulo 1 (`js/data/chapters1.js`), adicione esta missão no fim da lista `quests`, logo antes do `]` final, separada por vírgula:
> ```js
> { id: 's5', title: 'Mais Lobos', reward: { xp: 50, gold: 20 }, steps: [
>   { t: 'talk', npc: 'beltz', desc: 'Fale com Beltz', say: [['beltz', 'Os lobos voltaram! Cace três.']] },
>   { t: 'kill', e: 'lobo', n: 3, at: 'bosque', desc: 'Cace 3 lobos' },
>   { t: 'talk', npc: 'beltz', desc: 'Volte a Beltz', say: [['beltz', 'Obrigado, caçador!']] }
> ] }
> ```
> Recarregue o jogo, fale com Beltz (ele terá um "!" azul) e cumpra a missão. Como Beltz também oferece a missão dos javalis, que vem antes na lista, ele vai propor primeiro aquela; conclua-a e a sua aparece em seguida. Você não escreveu nenhuma lógica: só dados.
>
> Para a missão aparecer também em espanhol, acrescente a tradução em `js/data/es1.js`, dentro de `ES_CHAPTERS.c1.quests`, com o mesmo id `s5` e o mesmo número de etapas. Sem a tradução, o jogo em espanhol mostra o texto em português (não quebra).
