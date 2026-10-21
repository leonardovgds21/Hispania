# Referência completa: cada função do jogo

Este capítulo é para consulta. Ele lista **todas as funções e métodos** do jogo, arquivo por arquivo, com os parâmetros e o que cada um faz. Quando estiver lendo o código e encontrar um nome desconhecido, procure aqui.

## js/util.js: utilidades

| Função | O que faz |
|---|---|
| `TILE` | Constante: tamanho de um tile em pixels (32) |
| `mulberry32(seed)` | Cria um gerador de números pseudoaleatórios com semente; devolve uma função que, a cada chamada, dá o próximo número entre 0 e 1 |
| `hash2(x, y)` | Número "aleatório" fixo (0 a 1) para uma coordenada; usado para variar detalhes visuais |
| `makeNoise(rng, w, h, cell)` | Cria uma função de ruído suave (value noise) com células de tamanho `cell` |
| `clamp(v, a, b)` | Limita `v` ao intervalo de `a` a `b` |
| `dist(ax, ay, bx, by)` | Distância entre dois pontos |
| `lerp(a, b, t)` | Interpolação linear: valor entre `a` e `b` na proporção `t` |
| `randRange(a, b)` / `randInt(a, b)` | Número aleatório real / inteiro entre `a` e `b` |
| `angleDiff(a, b)` | Menor diferença entre dois ângulos, de −π a π |
| `shade(hex, amt)` | Clareia (amt positivo) ou escurece (negativo) uma cor hexadecimal |
| `escapeHtml(s)` | Torna um texto seguro para `innerHTML` (protege contra XSS) |
| `Sfx.init()` | Cria o contexto de áudio (só depois de um clique do usuário) |
| `Sfx.tone(freq, dur, type, vol, slide)` | Toca uma nota com envelope e deslize opcional de frequência |
| `Sfx.noise(dur, vol)` | Toca uma rajada de ruído |
| `Sfx.play(name)` | Toca um efeito pelo nome (`'swing'`, `'shot'`, `'hit'`, `'quest'`, `'level'`...) |

## js/i18n.js: idiomas

| Função | O que faz |
|---|---|
| `LANG` | Idioma atual (`'pt'` ou `'es'`), lido do localStorage ou do navegador |
| `setLang(l)` | Grava o idioma escolhido e recarrega a página |
| `STR` | Dicionário de textos da interface em PT e ES |
| `T(key, ...args)` | Devolve o texto da chave no idioma atual, trocando `{0}`, `{1}`... pelos argumentos |
| `ES_CHAPTERS`, `ES_BASE` | Recipientes das traduções do conteúdo (preenchidos pelos arquivos `es*.js`) |
| `applyLanguage()` | Se o idioma for espanhol, copia as traduções por cima dos dados portugueses |

## js/world.js: o mapa

| Função / método | O que faz |
|---|---|
| `TL`, `WALKABLE`, `TALL` | Tipos de tile e as tabelas "dá para andar?" e "bloqueia tiros?" |
| `new World(ch)` | Cria e gera o mapa de um capítulo |
| `idx(x, y)` / `get(x, y)` / `set(x, y, v)` | Índice no array, ler e escrever o tipo de um tile (fora do mapa conta como obstáculo) |
| `generate()` | Gera o mapa inteiro: terreno, água, obstáculos, bordas, lugares, casas, estradas e alcance |
| `carvePath(x0, y0, x1, y1, rng)` | Cava uma estrada sinuosa entre dois pontos, criando pontes sobre a água |
| `computeReach()` | Busca em largura que marca todos os tiles alcançáveis a partir do início |
| `randomSpot(px, py, rTiles, minR)` | Ponto aleatório alcançável dentro de um raio (em tiles) de um ponto |
| `randomReachableFar(rng, places, minDist)` | Ponto alcançável longe de todos os lugares (usado para os baús) |
| `solidAt(px, py)` / `tallAt(px, py)` | O pixel está em tile bloqueado? / em tile alto? |
| `collides(x, y, r)` | Um círculo de raio `r` nessa posição bate em algo? (testa 4 cantos) |
| `chunk(cx, cy)` | Devolve (criando na primeira vez) o canvas em cache de um bloco de 16×16 tiles |
| `drawTile(g, tx, ty, X, Y)` | Desenha um tile num contexto |
| `drawObstacle(g, kind, X, Y, h)` | Desenha um obstáculo (árvore, pinheiro, rocha, coluna, carro...) |
| `draw(ctx, camX, camY, vw, vh)` | Desenha os blocos visíveis do mapa na tela |
| `minimap()` | Cria (uma vez) a imagem do minimapa, 1 pixel por tile |
| `drawLandmark(ctx, icon, x, y, t)` | Desenha o marco de um lugar (caverna, castelo, aqueduto, navio...) |

## js/entities.js: desenho e entidades

| Função / classe | O que faz |
|---|---|
| `drawHat(ctx, hat, color, dir)` | Desenha um dos 17 tipos de chapéu ou elmo |
| `drawWeapon(ctx, kind, color, swing)` | Desenha uma das 15 armas, já girada na direção da mira |
| `drawHuman(ctx, x, y, look, aim, t, o)` | Desenha um humano completo a partir de um objeto `look`; `o` traz opções (andando, escala, transparência, montado, golpe) |
| `drawBeast(ctx, x, y, d, face, t, o)` | Desenha um animal de quatro patas (com chifres ou presas, se houver) |
| `drawBlob(ctx, x, y, d, aim, t, o)` | Desenha criaturas simbólicas: sombras, bolhas, vírus, bots |
| `drawTower(ctx, x, y, d, aim, t, o)` | Desenha a torre do Bastião de Málaga com o canhão |
| `class Player` | O herói: posição, mira, cronômetros de ataque, esquiva, invulnerabilidade e recarga |
| `class Enemy` | Um inimigo criado a partir da ficha de `ENEMIES`, com vida e dano multiplicados pela dificuldade |
| `class Proj` | Um projétil: posição, velocidade, dano, dono (`'p'` jogador ou `'e'` inimigo), cor, raio e texto |

## js/game.js: o núcleo

### Estado e fórmulas

| Função | O que faz |
|---|---|
| `G` | Objeto com todo o estado do jogo em execução |
| `resize()` | Ajusta o canvas ao tamanho da janela e à densidade de pixels |
| `newState(name)` | Cria um save novo (nível 1, 3 poções...) |
| `chState(id)` | Registro de progresso de um capítulo (criado se não existir) |
| `qState(qid)` | Registro de progresso de uma missão no capítulo atual: `step`, `prog`, `done` |
| `mainStep()` | Etapa atual da missão principal (9999 se concluída) |
| `questActive(quest)` | A missão está disponível agora? (não concluída e com o requisito atendido) |
| `curStep(quest)` | A etapa atual da missão |
| `xpNeed(l)` | XP necessário para passar do nível `l` |
| `maxHp()` | Vida máxima (depende do nível e do capítulo) |
| `weapon()` | A arma do herói no capítulo atual |
| `playerDmg()` / `playerDef()` | Dano e defesa do herói, com todos os bônus |
| `fmt(s)` | Troca `{nome}` pelo nome da linhagem |

### Salvamento

| Função | O que faz |
|---|---|
| `SLOT_COUNT`, `slotKey(n)` | Número de espaços (5) e a chave do localStorage de cada um |
| `migrateOldSave()` | (Executada uma vez) move o save da versão antiga para o espaço 1 |
| `save()` | Grava o estado atual no espaço da partida |
| `loadSave(n)` | Lê o save do espaço `n` (ou `null`) |
| `deleteSave(n)` | Apaga o save do espaço `n` |
| `exportSave()` | Baixa o save atual como arquivo `.json` |
| `importSave(file, n, cb)` | Lê um arquivo `.json`, valida e grava no espaço `n` |

### Capítulos e missões

| Função | O que faz |
|---|---|
| `loadChapter(idx, keepPos)` | Monta um capítulo: mapa, NPCs, crônicas, baús, acampamentos, inimigos e itens |
| `spawnCampEnemy(camp, awayFromPlayer)` | Cria um inimigo num acampamento (longe do herói, se pedido) |
| `spawnItems(quest, step, n)` | Espalha `n` itens de coleta perto do lugar da etapa |
| `advance(quest)` | Conclui a etapa atual e passa para a próxima (ou conclui a missão) |
| `startStep(quest)` | Prepara a nova etapa (itens de coleta) e avisa o objetivo |
| `completeQuest(quest)` | Dá as recompensas; se for a principal, encerra o capítulo |
| `chapterComplete()` | Narração final, evolução da linhagem e próximo capítulo (ou o final) |
| `enterChapter(idx, keepPos)` | Entra num capítulo: carrega, troca a música, mostra a abertura na primeira vez |
| `questTarget(quest)` | Ponto do mundo para onde a seta do objetivo aponta |
| `onKill(type)` | Conta a morte de um inimigo nas missões de caça ativas |
| `checkGotoAndBoss()` | Verifica a chegada a lugares de missão e faz surgir os chefes |
| `talkTo(npc)` | Conversa: etapa de missão, quiz, loja ou fala solta |
| `runQuiz(quest, s, npc)` | Conduz as perguntas de um quiz |
| `pickItem(o)` | Coleta um item de missão |
| `interact(o)` | Interage com um objeto (NPC, item, crônica, baú) se estiver perto |
| `nearestInteractable()` | O objeto interativo mais próximo do herói (tecla E) |

### Progressão, combate e efeitos

| Função | O que faz |
|---|---|
| `gainXp(n)` | Soma experiência e sobe de nível quantas vezes for preciso |
| `usePotion()` | Bebe uma poção (recupera 50% da vida) |
| `particle(x, y, color, spd, life, size)` | Cria uma partícula |
| `floatText(x, y, text, color, life)` | Cria um texto flutuante (dano, "+1 poção") |
| `hurtPlayer(dmg, fromX, fromY)` | Aplica dano ao herói, com defesa, invulnerabilidade e empurrão |
| `playerDie()` | Queda do herói: perde 10% do ouro e volta ao início do capítulo |
| `damageEnemy(e, dmg, kx, ky)` | Aplica dano a um inimigo, com número, partículas e empurrão |
| `killEnemy(e)` | Morte do inimigo: XP, moedas, poção, missões e chefe |
| `moveEnt(ent, mx, my)` | Move uma entidade com colisão, um eixo de cada vez |
| `playerAttack()` | Ataque do herói (corpo a corpo, tiro ou palavra) |
| `startReload()` | Começa a recarregar a arma de fogo |
| `update(dt)` | Um quadro de lógica (veja o capítulo 8) |
| `updateEnemy(e, dt)` | IA dos inimigos comuns: ocioso/alerta e os 4 comportamentos |
| `updateBoss(e, dt, d, dx, dy)` | IA dos chefes: padrões de ataque e fase 2 |

### Desenho e laço

| Função | O que faz |
|---|---|
| `render()` | Desenha o quadro inteiro, na ordem certa |
| `drawPlayer()` | Desenha o herói, o arco do golpe e a barra de recarga |
| `npcMarker(npc)` | Cor do "!" sobre o NPC (dourado: principal; azul: secundária) |
| `drawNpc(n)` | Desenha um NPC com nome e marcador |
| `drawEnemy(e)` | Desenha um inimigo com o aviso de ataque e a barra de vida |
| `drawObjective(t, color)` | Seta e marcador do objetivo atual |
| `drawBossBar()` | Barra de vida do chefe |
| `drawMinimap()` | Minimapa no canto, com lugares, objetivo e herói |
| `drawCrosshair()` | A mira no lugar do cursor |
| `frame(now)` | O laço principal, chamado ~60 vezes por segundo |
| `startGame(state, slot)` | Inicia uma partida com um save e um espaço |

## js/ui.js: a interface

| Método | O que faz |
|---|---|
| `$(id)` | Atalho para `document.getElementById` |
| `UI.hud(force)` | Atualiza barras, textos e o rastreador de missões |
| `UI.toast(msg, kind)` | Mostra uma notificação temporária |
| `UI.speaker(who)` | Nome e estilo de quem fala (`'N'` narrador, `'H'` herói ou um NPC) |
| `UI.dialog(lines, cb)` | Mostra uma sequência de falas e chama `cb` no fim |
| `UI.showLine()` / `UI.nextLine()` | Mostra a fala atual / avança para a próxima |
| `UI.quiz(name, question, options, cb)` | Mostra uma pergunta com opções |
| `UI.answer(i)` | Registra a resposta escolhida |
| `UI.modal(html, cls, onClose)` / `UI.closeModal()` | Abre / fecha uma janela central |
| `UI.narration(title, pages, cb, subtitle)` | Narração em páginas (abertura e encerramento dos capítulos) |
| `UI.evolution(from, to, ch, cb)` | Tela de evolução da linhagem entre capítulos |
| `UI.codexFound(def)` | Mostra uma crônica recém-encontrada |
| `UI.shop(npc)` | Loja: poções e melhorias |
| `UI.journal()` | Diário de missões (J) |
| `UI.codex(sel)` | Livro de crônicas por capítulo (C) |
| `UI.map()` | Mapa grande do capítulo (M) |
| `UI.langButtons()` / `UI.bindLang(root, before)` | Botões de idioma e sua ligação |
| `UI.pause()` | Menu de pausa (Esc) |
| `UI.help(back)` | Tela "Como jogar" |
| `UI.death(lost, cb)` | Tela de queda do herói |
| `UI.ending()` | Tela final do jogo, com estatísticas |
| `UI.title()` | Tela de título com os 5 espaços de save |
| `UI.titleToast(msg)` | Mensagem curta na tela de título |
| `UI.onKey(e)` | Encaminha teclas para diálogos e janelas |
| `UI.staticTexts()` | Traduz os textos fixos do HTML |

## js/music.js: a música

| Item | O que faz |
|---|---|
| `MODES`, `DRUMS`, `THEMES`, `FOLIA` | Escalas, ritmos de percussão, temas de cada capítulo e o encadeamento da Folía |
| `Music.setEnabled(on)` | Liga ou desliga a música (e lembra a escolha) |
| `Music.ensure()` | Cria o mixer (volume geral, eco) e o buffer de ruído |
| `Music.start(key, force)` | Começa o tema de um capítulo (ou do título) |
| `Music.stop(quick)` | Para a música e o bordão com um fade |
| `Music.compose(th, variant)` | Compõe a peça A A B A' com baixo e percussão |
| `Music.degMidi(th, deg)` | Converte um grau da escala numa nota MIDI |
| `Music.tick()` | Agendador: programa as notas dos próximos 0,35 s |
| `Music.play(e, when)` | Toca um evento (melodia, baixo ou percussão) |
| `Music.freq(m)` | Nota MIDI para frequência em Hz |
| `Music.note(inst, midi, when, dur, vol)` | Toca uma nota no instrumento pedido |
| `Music.pluck(...)` | Alaúde (Karplus-Strong) |
| `Music.wind(...)` | Flauta, flauta doce e charamela |
| `Music.startDrone(th)` | Bordão contínuo |
| `Music.drum(k, when)` | Percussão |

# ! Glossário

| Termo | Significado |
|---|---|
| **API** | Conjunto de funções que um sistema oferece para outros programas usarem (ex.: a API do Canvas) |
| **Array** | Lista ordenada de valores |
| **BFS (busca em largura)** | Algoritmo que explora um mapa "em ondas" a partir de um ponto; usado para saber o que é alcançável |
| **Biblioteca** | Código pronto, escrito por terceiros, que você chama |
| **Bioma** | Conjunto de cores e obstáculos que dá o "clima" de um mapa |
| **Cache** | Guardar um resultado para não precisar calculá-lo de novo |
| **Callback** | Função passada para ser chamada depois, quando algo acontecer |
| **Canvas** | Elemento HTML onde se desenha pixel a pixel |
| **Chunk** | Bloco de um mapa grande, processado ou desenhado separadamente |
| **Classe** | Molde para criar objetos parecidos (`new`) |
| **Closure** | Função que "lembra" variáveis do lugar onde foi criada |
| **Commit** | "Foto" do projeto guardada pelo Git |
| **Console** | Painel do navegador para mensagens, erros e testes |
| **Design orientado a dados (data-driven)** | Conteúdo descrito em dados e executado por um motor genérico |
| **DOM** | A árvore de elementos de uma página, que o JavaScript manipula |
| **dt (delta time)** | Tempo entre dois quadros, usado para que tudo ande na mesma velocidade em qualquer computador |
| **Envelope** | Curva de volume de um som ao longo do tempo |
| **Evento** | Algo que acontece (tecla, clique) e que pode disparar uma função |
| **FPS** | Quadros por segundo |
| **Framework** | Estrutura que organiza seu programa e chama o seu código |
| **Função** | Bloco de instruções com nome, que pode receber parâmetros e devolver um resultado |
| **Game loop** | O laço ler entrada → atualizar → desenhar, repetido continuamente |
| **Global** | Variável visível em todos os scripts da página |
| **HUD** | Informações sobrepostas ao jogo (vida, XP, missões) |
| **i18n** | Internacionalização: preparar o programa para vários idiomas |
| **IIFE** | Função criada e executada imediatamente: `(function () { ... })();` |
| **JSON** | Formato de texto para representar objetos e listas |
| **Karplus-Strong** | Algoritmo que simula uma corda dedilhada a partir de ruído |
| **Knockback** | Empurrão aplicado a quem leva um golpe |
| **Lerp** | Interpolação linear entre dois valores |
| **localStorage** | Armazenamento de textos no navegador, permanente |
| **Máquina de estados** | Modelo em que algo está sempre num estado e muda por regras |
| **Método** | Função que pertence a um objeto |
| **MIDI (número)** | Número de uma nota musical (60 = dó central) |
| **Modo (musical)** | Tipo de escala (dórico, frígio...) que dá o "clima" da música |
| **Normalizar (vetor)** | Deixar um vetor com tamanho 1, mantendo a direção |
| **Objeto** | Conjunto de valores com nomes (chaves) |
| **Procedural** | Gerado por algoritmo em vez de feito à mão |
| **Radiano** | Unidade de ângulo dos computadores (uma volta = 2π) |
| **Recursão** | Função que chama a si mesma |
| **Ruído (noise)** | Valores pseudoaleatórios suaves, usados para formas naturais |
| **Semente (seed)** | Número que define uma sequência pseudoaleatória sempre igual |
| **Sprite** | Imagem 2D de um personagem ou objeto |
| **Telegraph** | Aviso visual antes de um ataque, para o jogador reagir |
| **Throttling** | Limitar a frequência com que algo é executado |
| **Tile** | Quadradinho de uma grade de mapa |
| **Vetor** | Par (dx, dy) que representa direção e tamanho |
| **Web Audio API** | Sistema de som do navegador, baseado em nós conectados |
| **XSS** | Ataque que injeta código numa página por meio de texto não escapado |
| **Y-sorting** | Desenhar os personagens na ordem da posição vertical para simular profundidade |

# ! Palavras finais

Você chegou ao fim. Se leu com atenção e fez os exercícios, já sabe:

- ler e escrever JavaScript, HTML e CSS;
- estruturar um jogo com um laço, estados e entidades;
- desenhar, animar e mover coisas na tela com matemática simples;
- gerar mundos, detectar colisões e programar inimigos que parecem pensar;
- separar dados de lógica, salvar progresso, traduzir, tocar som e música;
- testar, depurar e publicar na internet.

Isso é programar. O resto é prática, curiosidade e paciência. Todo programador, sem exceção, começou sem saber nada e passou muitas horas olhando para um erro no Console até entender. A diferença entre quem aprende e quem desiste é só continuar.

Boa sorte nos seus próximos jogos. E que a sua linhagem, como a de Íber, vá longe.
