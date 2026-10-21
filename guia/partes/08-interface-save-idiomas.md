# A interface: HUD, diálogos e janelas

Toda a interface do jogo (HUD, caixas de diálogo, loja, diário, crônicas, mapa, menus, tela de título) mora num único objeto, `UI`, no arquivo `ui.js`. Ela é feita em **HTML por cima do canvas**, como explicado no capítulo 2.

## Manipulando o HTML pelo JavaScript

Tudo o que a `UI` faz se resume a quatro operações do DOM:

```js
const el = document.getElementById('dialog'); // 1. achar um elemento
el.textContent = 'Olá!';                      // 2. trocar o texto
el.innerHTML = '<b>Olá!</b>';                 // 3. trocar o conteúdo HTML
el.classList.add('hidden');                   // 4. ligar/desligar classes CSS
el.onclick = () => { ... };                   //    e reagir a cliques
```

O arquivo começa com um atalho, porque `document.getElementById` é usado dezenas de vezes:

@code js/ui.js const $ =

## O HUD

@code js/ui.js hud(force)

O HUD atualiza larguras de barras (`style.width = '75%'`) e textos. O rastreador de missões, à direita, é remontado no máximo 2 vezes por segundo, porque montar HTML é mais caro do que trocar um texto.

## Notificações (toasts)

@code js/ui.js toast(msg, kind)

Cria um `<div>`, coloca no topo da tela e, com dois `setTimeout`, primeiro adiciona a classe `out` (que o CSS anima com transparência) e depois remove o elemento. `setTimeout(funcao, ms)` agenda uma função para daqui a tantos milissegundos. Se houver mais de 5 notificações, as mais antigas saem.

## O sistema de diálogo

O diálogo é uma **fila de falas** com um callback no fim:

@code js/ui.js dialog(lines, cb)

@code js/ui.js nextLine()

- `dialog` guarda as falas, marca `G.ui = 'dialog'` (o que **pausa o jogo**, porque o laço só chama `update` quando `G.ui` está vazio) e mostra a primeira.
- `nextLine` avança. Quando acabam as falas, esconde a caixa, libera o jogo e **chama o callback**.
- A pausa de 180 ms (`performance.now() - d.t < 180`) evita que um clique duplo pule duas falas sem querer.

Esse padrão de "mostre isto e, quando acabar, faça aquilo" permite encadear sequências inteiras: falas → avançar missão → falas de conclusão → próxima etapa.

## Janelas (modais)

Loja, diário, crônicas, mapa, menu de pausa, narração, evolução, queda e final usam a mesma peça: `modal(html, classe)`, que coloca o HTML numa caixa centralizada sobre um fundo escurecido, e `closeModal()`, que a fecha.

@code js/ui.js modal(html, cls, onClose)

Cada tela é uma função que **monta um texto HTML** com template strings e depois liga os botões. A loja é um bom exemplo, que inclui a lógica de compra:

@code js/ui.js shop(npc)

Repare que, depois de cada compra, a loja chama `this.shop(npc)` de novo: ela se **redesenha inteira** com os valores atualizados (dinheiro, preços, botões desabilitados). Redesenhar tudo é mais simples e menos sujeito a erros do que atualizar cada pedaço.

## Segurança: escapeHtml

@code js/util.js function escapeHtml(s)

Sempre que um texto que veio "de fora" (o nome que o jogador digitou, por exemplo) é colocado dentro de `innerHTML`, ele passa por `escapeHtml`. Se alguém digitasse `<img src=x onerror=alert(1)>` como nome da linhagem, sem essa proteção o navegador **executaria** aquilo como HTML. Com ela, os símbolos `<` e `>` viram texto inofensivo. Esse tipo de ataque se chama **XSS** (*cross-site scripting*) e é uma das falhas de segurança mais comuns na web.

> [atencao] Regra de ouro: **nunca** coloque texto vindo do usuário (ou de um arquivo importado) em `innerHTML` sem escapar. Quando possível, use `textContent`, que já trata tudo como texto puro.

## Roteando o teclado

@code js/ui.js onKey(e)

O teclado precisa saber "quem está no comando": se há um diálogo, Espaço avança a fala; se há um quiz, as teclas 1 a 4 respondem; se há uma janela, Esc a fecha; se não há nada, J, C, M e Esc abrem as janelas. `onKey` devolve `true` quando consumiu a tecla, e o jogo então ignora o resto.

## A tela de título e os espaços de save

@code js/ui.js title()

A tela de título lista os 5 espaços de save. Para cada espaço, lê o save com `loadSave(n)` e monta uma linha: preenchido (nome, nível, capítulo, tempo de jogo, data) com **Continuar** e **Excluir save**; ou vazio, com **Novo jogo** e **Importar save**.

Os botões carregam o número do espaço num atributo `data-*` (`data-play="3"`, `data-del="3"`), lido depois com `b.dataset.play`. É uma forma elegante de ligar muitos botões parecidos com um único trecho de código:

```js
el.querySelectorAll('[data-del]').forEach(b => b.onclick = () => {
  const n = +b.dataset.del;     // o "+" converte o texto "3" no número 3
  ...
});
```

> [nota] Os navegadores só permitem tocar som depois que o usuário interage com a página. Por isso a música do título só começa no **primeiro clique** (`el.onpointerdown`).

# Salvando o progresso

## localStorage

O `localStorage` é um pequeno armazenamento que o navegador oferece a cada site. Ele guarda pares de **chave → texto** e tem três funções principais:

```js
localStorage.setItem('chave', 'valor');   // guardar
localStorage.getItem('chave');            // ler (null se não existir)
localStorage.removeItem('chave');         // apagar
```

Os dados sobrevivem a fechar o navegador e desligar o computador. Mas atenção: ficam **naquele navegador, naquele computador**. Em modo anônimo, eles somem ao fechar a janela. Limpar os dados do site também os apaga. Por isso o jogo oferece exportar o save como arquivo.

## Os cinco espaços

@code js/game.js const SLOT_COUNT

@code js/game.js const slotKey

Cada espaço é uma chave diferente: `hispania_save_v1_slot1` até `hispania_save_v1_slot5`. A variável `G.slot` lembra em qual espaço a partida atual está, e `save()` sempre grava ali:

@code js/game.js function save()

`save()` é chamada em vários momentos: a cada 20 segundos, ao concluir etapas e missões, ao abrir baús, ao comprar na loja e ao trocar de capítulo. Assim, perder progresso é quase impossível.

## Migrando saves antigos

A versão anterior do jogo usava uma única chave (`hispania_save_v1`). Para quem já tinha jogado não perder o progresso ao atualizar, há uma pequena **migração**:

@code js/game.js (function migrateOldSave()

O formato `(function () { ... })();` cria uma função e a executa **imediatamente**, uma única vez, quando o arquivo carrega. Isso se chama **IIFE** (*Immediately Invoked Function Expression*). Se existir um save antigo e o espaço 1 estiver livre, ele é copiado para o espaço 1 e a chave antiga é apagada.

> [dica] Sempre que mudar o formato de dados salvos de um programa, pense em quem já tem dados no formato antigo. Uma migração de 5 linhas evita que os jogadores percam horas de progresso.

## Excluir, exportar e importar

@code js/game.js function deleteSave(n)

@code js/game.js function exportSave()

@code js/game.js function importSave(file, n, cb)

- **Exportar**: transforma o save em texto JSON, embrulha num `Blob` (um "arquivo na memória"), cria um endereço temporário para ele com `URL.createObjectURL` e simula um clique num link de download.
- **Importar**: o `FileReader` lê o arquivo escolhido pelo jogador. O conteúdo passa por `JSON.parse` e por uma **validação** (tem `level` numérico? tem `ch`?) antes de ser aceito. Tudo dentro de `try/catch`, porque o jogador pode escolher qualquer arquivo, até uma foto.

# Dois idiomas: internacionalização

Fazer um programa funcionar em vários idiomas se chama **internacionalização**, abreviada como **i18n** (há 18 letras entre o "i" e o "n" de *internationalization*). O jogo resolve isso em duas camadas: os **textos da interface** e o **conteúdo** (falas, missões, crônicas).

## Qual idioma usar

@code js/i18n.js const LANG =

Na primeira visita, o jogo olha o idioma do navegador (`navigator.language`). Se começar com "es", usa espanhol. Depois que o jogador escolhe, a escolha fica salva em `localStorage`. Trocar de idioma salva e **recarrega a página**: é mais simples e seguro do que trocar todos os textos "ao vivo".

## Textos da interface: a função T

Todos os textos fixos (botões, avisos, menus) estão num dicionário `STR` com uma versão `pt` e uma `es` para cada chave:

```js
const STR = {
  pt: { closer: 'Chegue mais perto.', levelUp: 'Nível {0}! Vida e dano aumentaram.', ... },
  es: { closer: 'Acércate más.',      levelUp: '¡Nivel {0}! Aumentan la vida y el daño.', ... }
};
```

@code js/i18n.js function T(key, ...args)

`T('levelUp', 5)` procura a chave no idioma atual (ou, se faltar, em português) e troca `{0}` pelo primeiro argumento. O `...args` (*rest parameter*) junta todos os argumentos extras numa lista.

No código, em vez de escrever `UI.toast('Chegue mais perto.')`, escreve-se `UI.toast(T('closer'))`. Essa troca foi feita em todo o jogo quando o espanhol foi adicionado.

## O conteúdo: tradução por sobreposição

Traduzir 14 capítulos duplicando os arquivos inteiros seria arriscado: toda correção de lógica (um número de inimigos, por exemplo) teria de ser feita em dois lugares. A solução foi **sobrepor só os textos**. Os arquivos `es1.js`, `es2.js` e `es3.js` têm a mesma estrutura dos capítulos, mas **apenas com os campos de texto**, organizados pelos mesmos ids:

```js
ES_CHAPTERS.c1 = {
  title: 'Los orígenes',
  places: { aldeia: 'Aldea del clan', bosque: 'Bosque de los Lobos', ... },
  npcs: { ama: { name: 'Anciana Ama', lines: ['El fuego es nuestra vida...'] } },
  quests: { main: { title: 'El invierno del clan', steps: [ { desc: '...', say: [...] }, ... ] } }
};
```

Ao iniciar, se o idioma for espanhol, `applyLanguage` copia esses textos por cima dos dados portugueses:

@code js/i18n.js function applyLanguage()

Para as etapas das missões, a tradução é aplicada **pela posição** (`steps[i]`). Por isso a ordem e a quantidade de etapas precisam ser idênticas nos dois idiomas, e foi criado um teste automático que confere isso (capítulo 15).

> [porque] Números, tipos de inimigo, posições e regras continuam vindo **só** do arquivo português. A tradução nunca pode, sem querer, mudar a jogabilidade. Isso é separação de responsabilidades: um arquivo diz **o que acontece**, o outro diz **como se fala**.
