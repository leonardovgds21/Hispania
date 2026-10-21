# Som e música gerados por código

Todos os sons do Hispânia, do golpe de espada ao alaúde da trilha sonora, são **sintetizados na hora**, sem nenhum arquivo de áudio. Este capítulo ensina o mínimo de física e de teoria musical necessário e mostra como cada som foi construído.

## O que é som, para um computador

Som é uma vibração do ar. Um alto-falante reproduz som movendo uma membrana para frente e para trás muitas vezes por segundo. Para o computador, um som é uma **lista de números** entre −1 e 1 dizendo a posição da membrana a cada instante: são 44.100 ou 48.000 números por segundo (a **taxa de amostragem**).

Duas propriedades importam:

- **Frequência** (quantas vibrações por segundo, em hertz, Hz): define se o som é **grave ou agudo**. O "lá" de afinação é 440 Hz.
- **Amplitude** (o tamanho da vibração): define se o som é **alto ou baixo**.

E a **forma da onda** define o **timbre**, aquilo que faz uma flauta soar diferente de um violino tocando a mesma nota:

| Forma | Som | Uso no jogo |
|---|---|---|
| `sine` (senoide) | Puro, suave, como um assobio | Flauta, sinos, efeitos de cura |
| `triangle` (triangular) | Suave, um pouco mais "cheio" | Flauta doce, golpes |
| `square` (quadrada) | Áspero, típico de videogame antigo | Moedas, nível, tiros |
| `sawtooth` (dente de serra) | Rico, brilhante, "rasgado" | Charamela, bordão de sanfona |
| Ruído | Chiado aleatório | Tiros, pandeiro, soalhas |

## A Web Audio API: um estúdio modular

A Web Audio API funciona como um estúdio de som com cabos. Você cria **nós** (*nodes*), cada um com uma função, e os conecta em cadeia até a saída (`destination`, os alto-falantes):

<div class="diagram">
<div class="node"><b>OscillatorNode</b>gera a onda (nota)</div><div class="arrow">➜</div>
<div class="node"><b>BiquadFilterNode</b>filtra (abafa ou realça)</div><div class="arrow">➜</div>
<div class="node"><b>GainNode</b>controla o volume</div><div class="arrow">➜</div>
<div class="node"><b>destination</b>alto-falantes</div>
</div>

Uma característica importantíssima: os nós aceitam **agendamento com precisão de amostra**. Você pode dizer "comece esta nota exatamente daqui a 0,25 segundo" e "abaixe o volume até zero entre 0,25 e 0,4". É isso que permite fazer música com ritmo perfeito.

## Os efeitos sonoros: o objeto Sfx

@code js/util.js tone(freq, dur, type, vol, slide)

Esta função toca uma nota simples. Linha a linha:

1. Cria um oscilador (`createOscillator`) e um controle de volume (`createGain`).
2. Define a forma de onda e a frequência. Se houver `slide`, a frequência **desliza** exponencialmente até `freq × slide`: é o "piu" descendente de um golpe (`slide` = 0,5) ou ascendente de uma esquiva (2).
3. Define o volume inicial e o faz cair até quase zero no fim. Essa curva de volume se chama **envelope**. Sem ela, o som começaria e pararia "cortado", com um estalo.
4. Conecta oscilador → volume → alto-falantes, inicia agora e para no fim.

O ruído é feito preenchendo um buffer com números aleatórios:

@code js/util.js noise(dur, vol)

E `Sfx.play(nome)` combina tons e ruídos para cada evento:

@code js/util.js play(name)

O som de "missão concluída", por exemplo, são as notas 523, 659, 784 e 1047 Hz (dó, mi, sol, dó: um acorde maior) tocadas em sequência, 110 ms uma após a outra. É um arpejo alegre feito com 1 linha.

> [mao] No Console de qualquer página do jogo (depois de um clique), teste: `Sfx.init(); Sfx.tone(440, 1, 'sawtooth', 0.1)`. Troque `'sawtooth'` por `'sine'` e ouça a diferença de timbre.

## Teoria musical mínima

Para entender o motor de música, você precisa de quatro ideias.

**1. Notas MIDI.** Cada nota do piano recebe um número: o dó central é 60, o dó sustenido é 61, o ré é 62... Somar 12 sobe uma **oitava** (a mesma nota, mais aguda). A conversão para frequência é:

@code js/music.js freq(m)

**2. Escalas e modos.** Uma escala é uma seleção de notas dentro da oitava, descrita por distâncias em semitons a partir da nota base (a **tônica**). A música medieval usa os **modos eclesiásticos** e, na Península Ibérica, também escalas de origem árabe:

@code js/music.js const MODES

| Modo | Sensação | Onde aparece |
|---|---|---|
| Dórico | Melancólico, mas com brilho; muito usado nas Cantigas | Título, visigodos, Cid |
| Frígio | Sombrio, "espanhol", com o segundo grau grudado na tônica | Iberos, Reis Católicos |
| Hijaz (frígio dominante) | Exótico, típico da música andalusí e do flamenco | Al-Andalus |
| Mixolídio | Festivo | Roma, século XIX |
| Eólio | Triste (o menor natural) | Século de Ouro, Guerra Civil |
| Jônio / Lídio | Alegre, luminoso | Transição, século XXI |
| Pentatônica | Simples, arcaica | Pré-história |

**3. Ritmo.** O motor conta o tempo em **colcheias**. Cada compasso tem 6 colcheias, que podem ser agrupadas em 3 + 3 (balanço ternário, como nas Cantigas) ou 2 + 2 + 2 (como numa valsa).

**4. Cadências.** É o "fim de frase" musical. A **cadência andaluza** (lá–sol–fá–mi, descendo) é a mais famosa da música espanhola. A **Folía**, uma sequência de acordes portuguesa e espanhola do século XVI, foi usada no capítulo do Século de Ouro.

## Os temas

@code js/music.js const THEMES

Cada capítulo tem um tema com modo, nota base, andamento (`bpm`, batidas por minuto), instrumento principal, instrumento secundário, se tem **bordão** (uma nota grave contínua, como uma sanfona ou gaita de foles), qual ritmo de percussão e uma semente para compor a melodia.

## A composição automática

@code js/music.js compose(th, variant)

O compositor cria uma música na forma **A A B A'**, muito comum em canções tradicionais:

- **Frase A** (4 compassos): começa no 3º grau do modo e termina numa nota de "suspense" (o 5º grau, ou o 2º nos modos frígios).
- **Frase B**: começa mais aguda, para contrastar.
- **Frase A'**: igual à A, mas o último compasso é refeito para terminar na **tônica**, a nota de "repouso". Isso dá a sensação de "fim".

Cada frase é gerada por um **passeio aleatório controlado** sobre os graus da escala: 55% das vezes a melodia anda um grau (passos são o que soa mais "cantável"), às vezes salta 2 ou 3, e é empurrada de volta quando sobe ou desce demais. Os ritmos de cada compasso são sorteados de uma lista de padrões típicos. Como tudo usa o gerador com semente, a mesma música toca sempre igual para o mesmo tema. A cada duas repetições, `compose` é chamada com uma `variant` nova, e a melodia muda, então a trilha não cansa.

O acompanhamento também é montado ali: o **baixo** toca a tônica e a quinta em cada compasso (ou a sequência da Folía, ou a cadência andaluza), e a **percussão** segue o padrão escolhido.

## O agendador: tocar no tempo certo

Se o jogo tocasse cada nota "na hora" usando `setTimeout`, o ritmo ficaria irregular, porque `setTimeout` pode atrasar alguns milissegundos (o ouvido percebe). A técnica profissional é o **agendamento antecipado** (*lookahead scheduling*):

@code js/music.js tick()

A cada 60 ms, `tick` olha **0,35 segundo para o futuro** e agenda, com hora exata, todas as notas que cairão nesse intervalo. Quem toca é o relógio de áudio do navegador, que é preciso. O JavaScript só precisa "adiantar o trabalho" a tempo. Quando a peça acaba, recomeça (e a cada duas voltas, recompõe).

## Os instrumentos

### O alaúde: o algoritmo de Karplus-Strong

@code js/music.js pluck(midi, when, dur, vol)

Este é um dos algoritmos mais elegantes da síntese sonora (Karplus e Strong, 1983). Para simular uma corda dedilhada:

1. Encha um pequeno trecho de memória com **ruído aleatório**. O tamanho desse trecho é o **período** da nota: `taxa de amostragem / frequência` amostras.
2. Gere o resto do som repetindo esse trecho, mas cada amostra nova é a **média de duas amostras de um período atrás**, multiplicada por um pouco menos de 1 (`decay`).

A média funciona como um filtro que vai tirando os agudos a cada volta, exatamente como uma corda real que perde o brilho depois de tocada, e o `decay` faz o som morrer aos poucos. O resultado, a partir de puro ruído, é um som surpreendentemente parecido com um alaúde, um oud ou uma vihuela. Cada nota é calculada uma vez e guardada em cache (`this.ks[midi]`).

### Os sopros: flauta, flauta doce e charamela

@code js/music.js wind(inst, midi, when, dur, vol)

Um oscilador com a forma certa para cada instrumento, um filtro para moldar o timbre (a **charamela**, antepassada do oboé, usa dente de serra com um filtro passa-banda que realça os médios e lhe dá o som anasalado) e um **vibrato**: um segundo oscilador, muito lento (5,2 Hz), que faz a frequência da nota oscilar levemente, como um músico de verdade faz. A flauta ganha ainda um pouco de ruído filtrado, imitando o "ar" do sopro.

### O bordão (drone)

Três osciladores dente de serra graves (a tônica duas vezes, levemente desafinadas entre si, e a quinta) passam por um filtro que abafa os agudos. A leve desafinação cria um "batimento" que dá vida ao som, como numa sanfona (*zanfona*) ou gaita de foles galega.

### Percussão

O tambor grave (pandeiro, adufe, darbuka) é uma senoide que **despenca** de 130 para 55 Hz em 0,18 s: o ouvido percebe isso como uma batida. As batidas agudas e as soalhas são rajadas de ruído passadas por filtros em frequências diferentes.

### O "eco" da sala

Na criação do mixer (`ensure`), um nó de atraso (`DelayNode`) de 0,23 s com realimentação de 22% simula a reverberação de uma igreja ou de um salão de pedra, dando ambiente à trilha.

## Como testar áudio sem ouvir

Durante o desenvolvimento, não era possível ouvir o som. A solução foi usar o `OfflineAudioContext`, que **renderiza o áudio na memória** em vez de tocar. Cada um dos 15 temas foi renderizado por 12 segundos e analisado: o **pico** (maior valor, para detectar distorção acima de 1,0), o **RMS** (a média do volume, para detectar silêncio) e a presença de valores inválidos (`NaN`). Todos ficaram com picos entre 0,12 e 0,30 e RMS entre 0,017 e 0,037: audíveis, sem distorção e num volume de fundo adequado. Medir em vez de "achar" é uma habilidade valiosa.

> [exercicio] Em `js/music.js`, no tema `c1`, troque `bpm: 66` por `bpm: 120` e `lead: 'flute'` por `lead: 'shawm'`. Recarregue e entre no capítulo 1. A música da pré-história vira uma marcha agitada.
