# Hispânia — De Atapuerca a La Moncloa

**▶ Jogue agora no navegador: [https://leonardovgds21.github.io/Hispania/](https://leonardovgds21.github.io/Hispania/)**

Este é o link jogável: abra, escolha um espaço de save e comece. Não precisa instalar nada. Funciona no computador (teclado e mouse) e no celular ou tablet, com setas e botões na tela.

RPG 2D de navegador que conta a história da Espanha, da pré-história até hoje. O herói é uma linhagem que evolui a cada capítulo: caçador com lança → guerreiro celtibero → legionário → visigodo → infante asturiano → cavaleiro → espingardeiro → soldado do tercio → guerrilheiro → soldado → guardião do Prado → jornalista → deputado → presidente do governo.

## Conteúdo

- 14 capítulos, cada um com mapa próprio, chefe e classe/arma nova
- 66 missões (14 principais + 52 secundárias), com quizzes históricos
- 92 crônicas colecionáveis com fatos históricos e 84 baús
- Loja, níveis, melhorias de arma e armadura
- 5 espaços de save no navegador, com salvamento automático; cada espaço pode ser continuado, excluído ou receber um save importado de arquivo
- Dois idiomas: português (Brasil) e espanhol (Espanha), escolhidos na tela de título ou no menu de pausa
- Trilha sonora medieval gerada em tempo real (alaúde, flautas, charamela, bordão e pandeiro, em modos medievais), com um tema por capítulo e botão para desligar

## Controles

| Tecla | Ação |
|---|---|
| W / A / S / D | Andar (cima, esquerda, baixo, direita) |
| Mouse | Mirar |
| Clique esquerdo | Atacar (segure para repetir) · clicar em pessoas/itens/baús interage |
| E | Interagir com o mais próximo |
| Espaço | Esquiva |
| Q | Poção |
| R | Recarregar |
| J · C · M | Diário · Crônicas · Mapa |
| Esc ou botão ☰ Menu | Menu: diário, crônicas, mapa, opções, teclas e capítulos |

No celular ou tablet, os controles aparecem na tela automaticamente: setas à esquerda para andar e, à direita, ⚔ Atacar (mira no inimigo mais próximo), ✋ Usar, 💨 Esquiva, 🧪 Poção e 🔄 Recarregar. Tocar no mapa ataca naquela direção, e tocar numa pessoa ou objeto próximo interage. Os controles de toque podem ser ligados ou desligados no menu.

## Rodar localmente

Basta abrir `index.html` no navegador. Também funciona com qualquer servidor estático, por exemplo `node .claude/serve.js` (porta 5173).

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie esta pasta:
   ```bash
   git init
   git add .
   git commit -m "Hispânia"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/hispania.git
   git push -u origin main
   ```
2. No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Em um ou dois minutos o jogo estará em `https://SEU_USUARIO.github.io/hispania/`.

O jogo não precisa de servidor nem banco de dados: o progresso fica salvo no `localStorage` do navegador de cada jogador.

## Estrutura

```
index.html          página e HUD
css/style.css       estilos da interface
js/util.js          RNG, ruído, efeitos sonoros sintetizados
js/i18n.js          textos da interface (PT/ES) e aplicação da tradução
js/music.js         trilha sonora procedural
js/world.js         geração procedural dos mapas e desenho dos tiles
js/entities.js      desenho de personagens, jogador, inimigos, projéteis
js/game.js          estado, missões, combate, renderização, laço principal
js/ui.js            diálogos, quiz, loja, diário, crônicas, mapa, menus
js/data/base.js     classes, armas e inimigos
js/data/chapters*.js  conteúdo dos 14 capítulos (português)
js/data/es*.js        tradução para o espanhol (mesma estrutura, por id)
```

Para adicionar ou editar conteúdo, mexa apenas nos arquivos de `js/data/`. Ao mudar um texto em português, atualize também a etapa correspondente em `es*.js`. Cada capítulo define lugares, NPCs, crônicas e missões. As etapas de missão podem ser `talk`, `kill`, `collect`, `goto`, `boss` e `quiz`.

## Guia de programação

A pasta `guia/` contém um guia completo em PDF (`guia/Guia-de-Programacao-Hispania.pdf`) que ensina programação de jogos do zero usando este projeto. Para regerar o PDF depois de mudar o código ou o texto (em `guia/partes/*.md`):

```bash
node guia/build.js
```
