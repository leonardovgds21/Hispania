# Testar, depurar e publicar

Escrever código é metade do trabalho. A outra metade é descobrir **por que ele não faz o que você esperava**, e garantir que continue funcionando quando você mudar alguma coisa. Este capítulo mostra as técnicas usadas no Hispânia e como colocar o jogo na internet.

## Depurando com o DevTools

Quando algo dá errado:

1. **Abra o Console (F12).** Erros aparecem em vermelho, com o arquivo e a linha. Clique no link para ir direto ao código. Leia a mensagem com calma; ela quase sempre diz exatamente o problema.
2. **Use `console.log`** para ver valores em pontos-chave: `console.log('vida', G.S.hp, 'inimigos', G.enemies.length)`.
3. **Inspecione o estado ao vivo.** Digite `G.player`, `G.enemies[0]` ou `qState('main')` no Console para ver os objetos.
4. **Pause o programa (breakpoints).** Na aba *Sources*, abra um arquivo e clique no número de uma linha. Quando o jogo passar por ali, ele congela, e você pode ver o valor de cada variável e avançar linha por linha.

As mensagens de erro mais comuns e o que significam:

| Mensagem | Significado provável |
|---|---|
| `X is not defined` | Nome digitado errado, ou o script que cria `X` não carregou (ordem dos `<script>`) |
| `Cannot read properties of undefined (reading 'y')` | Você fez `algo.y`, mas `algo` não existe (ex.: um NPC com id errado) |
| `Identifier 'X' has already been declared` | Dois arquivos criaram o mesmo nome global |
| `Unexpected token` | Erro de digitação: vírgula, parêntese ou chave faltando ou sobrando |
| `X is not a function` | Você chamou `X()`, mas `X` não é uma função (ou ainda não foi criada) |

> [dica] Erros de sintaxe ("Unexpected token") num arquivo de dados são os mais frequentes ao editar missões. Quase sempre é uma **vírgula esquecida** entre dois objetos de uma lista, ou uma aspa que não fechou. O VS Code sublinha esses erros em vermelho antes mesmo de você rodar.

## Os testes automáticos usados no projeto

Testar 5 horas de jogo à mão a cada mudança é impossível. Por isso foram escritos **programas que testam o programa**. Eles não fazem parte do jogo publicado, mas vale conhecer as ideias.

### 1. Verificação de sintaxe

```bash
node --check js/game.js
```

O Node lê o arquivo e acusa erros de sintaxe sem executá-lo. Foi rodado em todos os arquivos depois de cada mudança.

### 2. Validação dos dados

Um script percorreu os 14 capítulos e conferiu, para cada etapa de cada missão, se:

- o NPC citado existe naquele capítulo;
- o lugar citado (`at`) existe;
- o tipo de inimigo existe em `ENEMIES`;
- a resposta certa de cada quiz aponta para uma opção que existe;
- a primeira etapa das missões secundárias é `talk`;
- **todos os lugares e NPCs são alcançáveis a pé** no mapa gerado (usando o `reach` da busca em largura).

Resultado: 14 capítulos, 92 crônicas, 66 missões, 296 etapas, **zero erros**. Um script parecido conferiu que a tradução espanhola tem exatamente a mesma estrutura da portuguesa (mesmas etapas, mesmos falantes, mesmas respostas de quiz e todas as chaves de interface).

### 3. O "robô jogador"

O teste mais poderoso foi um robô que **joga o jogo inteiro**. A ideia, simplificada:

```js
while (o jogo não acabou) {
  const missao = primeira missão ativa (secundárias antes da principal);
  const etapa = curStep(missao);
  if (etapa.t === 'talk' || etapa.t === 'quiz') {
    teleporta para perto do NPC; talkTo(npc); responde o quiz corretamente;
  } else if (etapa.t === 'kill') {
    teleporta ao acampamento; mata um inimigo do tipo certo (ou espera o respawn);
  } else if (etapa.t === 'collect') {
    pega um dos itens da missão;
  } else if (etapa.t === 'goto') {
    teleporta para o lugar e roda alguns quadros de update;
  } else if (etapa.t === 'boss') {
    vai à arena, espera o chefe surgir e o derrota;
  }
  fecha todos os diálogos, narrações e telas de evolução;
}
```

Ele completou as **66 missões dos 14 capítulos** até a tela final, em português e depois em espanhol, sem nenhum erro. No espanhol, ainda guardou o texto de todos os 327 diálogos exibidos e procurou palavras típicas do português que tivessem escapado da tradução: nenhuma.

> [porque] Um teste assim não diz se o jogo é **divertido** (isso só jogando), mas garante que ele é **completável**: nenhuma missão trava, nenhum NPC sumiu, nenhum chefe deixa de aparecer. É exatamente o tipo de erro mais frustrante para o jogador e mais difícil de achar à mão.

### 4. Testes de áudio offline

Como vimos no capítulo 14, a música foi renderizada na memória e medida (pico, volume médio, valores inválidos).

## Um servidor local mínimo

Abrir o `index.html` com dois cliques funciona, mas para testar em condições parecidas com a internet foi usado um servidor de 15 linhas, só com módulos que já vêm no Node:

@code .claude/serve.js 1-15

Ele recebe cada pedido do navegador, encontra o arquivo correspondente na pasta e o devolve com o tipo certo (`text/html`, `text/javascript`...). O `Cache-Control: no-store` impede o navegador de guardar versões antigas, então cada F5 carrega o código mais novo. A verificação `f.startsWith(root)` impede que alguém peça arquivos de fora da pasta do projeto (`../../senhas.txt`), uma proteção básica de segurança.

Para usar: `node .claude/serve.js` e abra `http://localhost:5173`.

## Git: guardando o histórico

O **Git** tira "fotos" (commits) do seu projeto ao longo do tempo. Se algo quebrar, você volta para a última foto boa. Os comandos essenciais:

```bash
git init                        # transforma a pasta num repositório (uma vez só)
git add .                       # prepara todas as mudanças para a próxima foto
git commit -m "Adiciona missão dos lobos"   # tira a foto, com uma descrição
git log --oneline               # lista as fotos tiradas
git diff                        # mostra o que mudou desde a última foto
```

> [dica] Faça commits pequenos e frequentes, com mensagens que expliquem **o que** mudou. "Corrige respawn dos acampamentos" é muito mais útil daqui a seis meses do que "ajustes".

## Publicando no GitHub Pages

O **GitHub Pages** hospeda sites estáticos de graça. Como o Hispânia é só HTML, CSS e JavaScript, ele roda lá sem nenhuma adaptação.

1. Crie uma conta em `github.com`.
2. Clique em **New repository**, dê um nome (por exemplo, `hispania`), deixe como **Public** e crie.
3. Na pasta do jogo, no terminal:

```bash
git init
git add .
git commit -m "Hispânia"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/hispania.git
git push -u origin main
```

4. No site do GitHub, no repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, escolha a branch `main` e a pasta `/ (root)`, e salve.
5. Em um ou dois minutos o jogo estará em `https://SEU_USUARIO.github.io/hispania/`.

Para publicar uma atualização depois, basta `git add .`, `git commit -m "..."` e `git push`. O site se atualiza sozinho.

> [atencao] Os saves ficam no navegador de cada jogador, **separados por endereço**. Um save feito jogando em `localhost` não aparece na versão do GitHub Pages, e vice-versa. Para levar seu progresso, use **Exportar save** em um e **Importar save** no outro.

> [nota] As pastas `guia/` e `.claude/` não atrapalham o site, mas, se preferir não publicá-las, crie um arquivo `.gitignore` na raiz com as linhas `guia/` e `.claude/`.
