// Traducción al español (España): capítulos 1–5.
'use strict';

ES_CHAPTERS.c1 = {
  title: 'Los orígenes', years: 'c. 35.000 – 1.000 a. C.', currency: 'conchas',
  intro: [
    'Mucho antes de que existieran reyes, fronteras o el propio nombre de «España», la península ibérica ya estaba habitada. Hace más de un millón de años, los primeros humanos recorrieron las sierras del norte.',
    'Ahora estamos al final de la Edad del Hielo. Bisontes, uros y caballos salvajes cruzan valles cubiertos de bosques. Lobos y osos cavernarios se disputan cada presa.',
    'Eres {nome}, un joven cazador de un clan de Cantabria. El invierno se acerca y la anciana Ama te necesita.\n\nW, A, S, D para moverte. El ratón para apuntar. Haz clic para atacar o para hablar con la gente.'
  ],
  outro: [
    'Pasaron los milenios. El hielo retrocedió y, en lugar de cazadores nómadas, surgieron aldeas. Hacia el 5.500 a. C. llegaron la agricultura, la cerámica y los rebaños.',
    'Después llegaron los metales: el cobre de Los Millares, el bronce de El Argar y la legendaria plata de Tartessos, que fascinó a griegos y fenicios.',
    'El amuleto de hueso de {nome} pasó de mano en mano, de generación en generación. Hacia el 1100 a. C., navegantes fenicios fundaron Gadir, la actual Cádiz. Un mundo nuevo empezaba a llegar por mar.'
  ],
  places: { aldeia: 'Aldea del clan', bosque: 'Bosque de los Lobos', atapuerca: 'Sierra de Atapuerca', vale: 'Valle de los Uros', altamira: 'Cueva de Altamira', dolmen: 'Dolmen de los Antiguos', toca: 'Cubil del Oso' },
  npcs: {
    ama: { name: 'Anciana Ama', lines: ['El fuego es nuestra vida. Nunca dejes que se apague.', 'Los mayores dicen que nuestros antepasados vivían en estas sierras desde antes de que las montañas tuvieran nombre.'] },
    beltz: { name: 'Beltz, el cazador', lines: ['Apunta con el ratón y golpea. La lanza llega lejos, pero acierta en línea recta.', 'Si un animal brilla y parpadea, es que va a embestir. ¡Usa Espacio para esquivar!'] },
    nerea: { name: 'Nerea (trueques)', lines: ['Aquí las conchas del mar valen mucho. ¿Qué quieres cambiar?'] },
    urtzi: { name: 'Chamán Urtzi', lines: ['En esta sierra reposan huesos más antiguos que cualquier recuerdo.', 'Los espíritus de los antiguos te observan.'] },
    ekain: { name: 'Ekain, el pintor', lines: ['El techo de esta cueva es mi lienzo. Los bisontes parecen moverse a la luz del fuego.', 'Uso carbón, ocre y grasa animal. Nada más.'] },
    txo: { name: 'Pequeño Txo', lines: ['¡Mi abuelo dice que estas piedras las levantaron gigantes!', '¿Has visto el mar? Dicen que no tiene fin.'] }
  },
  codex: {
    atap: { title: 'Atapuerca: los primeros europeos', text: 'En la sierra de Atapuerca (Burgos) se han hallado algunos de los fósiles humanos más antiguos de Europa occidental, de más de un millón de años. Allí se describió en 1997 una nueva especie, el Homo antecessor. En la Sima de los Huesos hay restos de unos 430.000 años. El conjunto es Patrimonio Mundial de la UNESCO desde 2000.' },
    altam: { title: 'Altamira, la «Capilla Sixtina» prehistórica', text: 'Las pinturas de bisontes, caballos y ciervos de Altamira (Cantabria) tienen hasta unos 36.000 años. En 1879, la niña María, hija de Marcelino Sanz de Sautuola, fue la primera en fijarse en las figuras del techo. Durante años, muchos expertos no creyeron que fueran tan antiguas. Hoy son Patrimonio Mundial.' },
    neol: { title: 'La revolución neolítica', text: 'Hacia el 5.500 a. C., la agricultura y la ganadería llegaron a la Península por el Mediterráneo. Los pueblos empezaron a cultivar trigo y cebada, a criar ovejas y cabras y a fabricar «cerámica cardial», decorada con marcas de conchas.' },
    megal: { title: 'Los constructores de megalitos', text: 'Entre el IV y el III milenio a. C., comunidades ibéricas levantaron dólmenes: grandes sepulcros colectivos de piedra. El conjunto de Antequera (Málaga), con el enorme dolmen de Menga, es Patrimonio Mundial desde 2016.' },
    metais: { title: 'Cobre y bronce', text: 'Los Millares (Almería, c. 3200 a. C.) fue un gran poblado fortificado de la Edad del Cobre. Más tarde, la cultura de El Argar (c. 2200–1550 a. C.), en el sudeste, dominó el bronce y creó sociedades con jefes y grandes desigualdades.' },
    tart: { title: 'Tartessos, el reino de la plata', text: 'En el suroeste (Huelva, Sevilla y Cádiz) floreció Tartessos, entre los siglos IX y VI a. C., rica en plata y estaño. El griego Heródoto cuenta que su rey Argantonio habría reinado 80 años. Para los griegos, Tartessos era una tierra casi legendaria en el extremo occidental del mundo.' }
  },
  quests: {
    main: { title: 'El invierno del clan', steps: [
      { desc: 'Habla con la anciana Ama en la aldea', say: [
        ['ama', '{nome}, este año el invierno llegará pronto. Los niños necesitan pieles, y los lobos rondan nuestras sendas.'],
        ['ama', 'Ve al Bosque de los Lobos, al norte. Sigue la flecha dorada y usa tu lanza. Vuelve entero.'],
        ['N', 'Consejo: haz clic para atacar. Mantén pulsado el botón para golpear sin parar. Espacio hace una esquiva rápida.']] },
      { desc: 'Caza 5 lobos en el Bosque de los Lobos', done: [['H', 'Las pieles están aseguradas. Pero la punta de mi lanza está mellada...']] },
      { desc: 'Ve a la sierra de Atapuerca a buscar sílex', say: [['N', 'En la sierra hay cuevas llenas de huesos antiguos, más viejos que cualquier leyenda del clan.']] },
      { desc: 'Habla con el chamán Urtzi', say: [
        ['urtzi', 'Pisas el hogar de los primeros. Hace más de un millón de años, gente como nosotros ya cazaba aquí.'],
        ['urtzi', 'El mejor sílex está repartido por la ladera. Tráeme cinco piedras y haré puntas dignas de un cazador.']] },
      { desc: 'Recoge 5 piedras de sílex en la sierra', item: 'Sílex' },
      { desc: 'Lleva el sílex al chamán Urtzi', say: [
        ['urtzi', 'Buenas piedras. Toma también esto: un amuleto de hueso tallado con la figura de un bisonte.'],
        ['urtzi', 'Guardará la memoria de quien lo lleve. Dáselo a tus hijos, y ellos se acordarán de ti.'],
        ['N', 'Has recibido el Amuleto de Atapuerca. Acompañará a tu linaje a lo largo de toda la historia.']] },
      { desc: 'Caza 3 uros en el Valle de los Uros', done: [['H', '¡Carne para todo el invierno! Ekain, el pintor, querrá saberlo.']] },
      { desc: 'Cuéntale la cacería a Ekain en la cueva de Altamira', say: [
        ['ekain', '¡Tres uros! Los pintaré en el techo, junto a los bisontes, para que nuestros nietos sepan cómo cazábamos.'],
        ['ekain', 'Pero ten cuidado: el Oso Cavernario Anciano ha despertado. Destrozó el campamento de los cazadores cerca de su cubil, al sudeste.']] },
      { desc: 'Derrota al oso cavernario en el Cubil del Oso', intro: [['N', 'Un rugido hace temblar las piedras. ¡El Oso Cavernario Anciano defiende su territorio!']], done: [['H', 'Se acabó... El clan estará a salvo este invierno.']] },
      { desc: 'Vuelve con la anciana Ama', say: [
        ['ama', 'Has traído pieles, carne y paz al clan. Los espíritus te han sonreído.'],
        ['ama', 'Guarda bien el amuleto. Algún día tus descendientes verán cosas que ni siquiera podemos imaginar.']] }
    ] },
    s1: { title: 'Los colores de la cueva', steps: [
      { desc: 'Habla con Ekain', say: [['ekain', 'Se me ha acabado el ocre rojo. Hay piedras de ocre en el Valle de los Uros. ¿Me traes cinco?']] },
      { desc: 'Recoge 5 piedras de ocre en el valle', item: 'Ocre rojo' },
      { desc: 'Lleva el ocre a Ekain', say: [['ekain', '¡Perfecto! Con esto, los bisontes del techo seguirán vivos durante miles de años. Toma unas conchas.']] }
    ] },
    s2: { title: 'Los jabalíes del bosque', steps: [
      { desc: 'Habla con Beltz', say: [['beltz', 'Los jabalíes están destrozando las bellotas que guardamos para el invierno. Caza seis en el Bosque de los Lobos.']] },
      { desc: 'Caza 6 jabalíes en el bosque' },
      { desc: 'Vuelve con Beltz', say: [['beltz', 'Cazas como los antiguos. Llévate esta poción de hierbas, cierra las heridas.']] }
    ] },
    s3: { title: 'Las piedras de los gigantes', steps: [
      { desc: 'Habla con el pequeño Txo', say: [['txo', '¡He perdido las piedrecitas grabadas de mi abuelo cerca del dolmen! Son cuatro. ¿Me ayudas a encontrarlas?']] },
      { desc: 'Encuentra 4 piedras grabadas cerca del dolmen', item: 'Piedra grabada' },
      { desc: 'Devuelve las piedras a Txo', say: [['txo', '¡Gracias! Cuando sea mayor, ¡levantaré una piedra más grande que esta para ti!']] }
    ] },
    s4: { title: 'La sabiduría del chamán', steps: [
      { desc: 'Habla con el chamán Urtzi', say: [['urtzi', 'Lee las crónicas repartidas por esta tierra y después responde a mis preguntas.']] },
      { desc: 'Responde al desafío del chamán', say: [['urtzi', 'Tres preguntas. Equivocarse no es vergüenza; rendirse, sí.']], qs: [
        { q: '¿En qué sierra se hallaron algunos de los fósiles humanos más antiguos de Europa occidental?', o: ['Atapuerca', 'Sierra Nevada', 'Pirineos', 'Montserrat'], a: 0 },
        { q: '¿Quién se fijó primero en las pinturas del techo de Altamira, en 1879?', o: ['Un rey visigodo', 'La niña María, hija de Sautuola', 'Un monje medieval', 'Un soldado romano'], a: 1 },
        { q: '¿Qué civilización rica en plata cita Heródoto, con el rey Argantonio?', o: ['Tartessos', 'Cartago', 'Micenas', 'Babilonia'], a: 0 }
      ] }
    ] }
  }
};

ES_CHAPTERS.c2 = {
  title: 'Iberia: pueblos, mercaderes e imperios', years: '1100 – 133 a. C.', currency: 'dracmas',
  intro: [
    'Los fenicios fundaron Gadir (Cádiz). Los griegos levantaron Emporion en la costa catalana. En el interior, íberos y celtas vivían en ciudades fortificadas sobre colinas.',
    'En el siglo III a. C., Cartago, la gran potencia del norte de África, conquistó el sur y el este de la Península. Su rival, Roma, observaba con desconfianza.',
    'Eres {nome}, guerrero celtíbero de Numancia, ciudad de los arévacos en el alto Duero. A tu lado, el amuleto de hueso de tus antepasados.'
  ],
  outro: [
    'En el 133 a. C., tras trece meses de asedio, los numantinos prefirieron incendiar la ciudad antes que rendirse. Muchos murieron; los supervivientes fueron vendidos como esclavos.',
    'Numancia se convirtió en símbolo de resistencia. Pero Roma venció. Durante los dos siglos siguientes, las legiones avanzaron por la Península hasta dominarla por completo.',
    'Uno de los supervivientes se llevó un amuleto de hueso. Sus hijos ya nacerían súbditos de Roma, en una tierra que los romanos llamaban Hispania.'
  ],
  places: { numancia: 'Numancia', sagunto: 'Ruinas de Sagunto', cart: 'Campamento cartaginés', campos: 'Campos de trigo', gadir: 'Puerto de Gadir', emporion: 'Emporion', muralha: 'Muralla de Escipión', castra: 'Campamento de Escipión' },
  npcs: {
    reto: { name: 'Retógenes Caraunio', lines: ['Numancia nunca se ha arrodillado.', 'Nuestras murallas son pequeñas, pero nuestros corazones no.'] },
    sacer: { name: 'Sacerdote de Lug', lines: ['Lug, dios de la luz y de los oficios, protege a quienes trabajan con las manos.'] },
    merc2: { name: 'Herrero Ambato', lines: ['El hierro celtíbero es el mejor de Iberia. Hasta los romanos copian nuestras espadas.'] },
    edeta: { name: 'Edeta de Sagunto', lines: ['Sagunto era una ciudad bonita, ¿sabes? Tenía teatro, mercado, jardines...'] },
    abibaal: { name: 'Abibaal, el fenicio', lines: ['Gadir la fundaron mis antepasados de Tiro. ¡Es más antigua que Roma!', 'Plata, estaño, pescado salado... todo pasa por este puerto.'] },
    xeno: { name: 'Jenofonte de Emporion', lines: ['Emporion significa «mercado» en mi lengua. Vinimos de Massalia y, antes, de Focea.'] }
  },
  codex: {
    fen: { title: 'Los fenicios y Gadir', text: 'Según la tradición, mercaderes fenicios de Tiro fundaron Gadir hacia el 1100 a. C., lo que haría de Cádiz una de las ciudades más antiguas de Occidente. Los fenicios trajeron el alfabeto, el torno de alfarero y el comercio a larga distancia, y fundaron también Malaka (Málaga) y Sexi (Almuñécar).' },
    greg: { title: 'Los griegos de Emporion', text: 'Hacia el 575 a. C., griegos de Massalia (Marsella) fundaron Emporion, la actual Empúries, en Cataluña. El nombre significa «mercado». Las monedas griegas acuñadas allí circularon por toda la costa mediterránea de la Península.' },
    iber: { title: 'Los íberos', text: 'Los íberos ocupaban el sur y el este de la Península. Tenían escritura propia (aún no descifrada del todo), ciudades fortificadas y un arte refinado, como la Dama de Elche, un busto de piedra hallado en 1897. Su arma típica era la falcata, una espada curva temida incluso por los romanos.' },
    celt: { title: 'Los celtíberos', text: 'En el centro de la Península, pueblos de origen celta mezclados con influencias íberas formaron los celtíberos: arévacos, belos, titos, lusones. Vivían en ciudades fortificadas como Numancia y Segeda y eran famosos como guerreros y herreros.' },
    carth: { title: 'Cartago en Iberia', text: 'Tras perder la primera guerra púnica, Cartago buscó riquezas en Iberia. Amílcar Barca desembarcó en el 237 a. C., y su yerno Asdrúbal fundó Cartago Nova (Cartagena) hacia el 227 a. C. En el 219 a. C., Aníbal sitió Sagunto, aliada de Roma, lo que desencadenó la segunda guerra púnica.' },
    numa: { title: 'El asedio de Numancia', text: 'En el 134 a. C., Escipión Emiliano cercó Numancia con unos 60.000 hombres y una muralla de unos 9 km, con torres y campamentos. Los cerca de 4.000 defensores resistieron trece meses. En el 133 a. C., hambrientos, muchos prefirieron la muerte a la rendición. La expresión «defensa numantina» aún significa resistir hasta el final.' }
  },
  quests: {
    main: { title: 'La última ciudad libre', steps: [
      { desc: 'Habla con Retógenes en Numancia', say: [
        ['reto', '¡{nome}! Noticias del este: Aníbal, el cartaginés, ha sitiado Sagunto. Dicen que es el año 219 antes de... bueno, los romanos cuentan los años de otra manera.'],
        ['reto', 'Ve a las ruinas de Sagunto y averigua qué ha pasado. Si Cartago y Roma van a la guerra, Celtiberia quedará en medio.']] },
      { desc: 'Ve a las ruinas de Sagunto', say: [['N', 'Sagunto resistió el asedio de Aníbal durante ocho meses. Roma, su aliada, no llegó a tiempo.']] },
      { desc: 'Habla con Edeta, superviviente de Sagunto', say: [
        ['edeta', 'Luchamos hasta que no quedó nada que comer. Muchos prefirieron el fuego a la esclavitud.'],
        ['edeta', 'Ahora los mercenarios de Aníbal reclutan a la fuerza en las aldeas. Están acampados al este. ¡Por favor, libera a los nuestros!']] },
      { desc: 'Derrota a 6 mercenarios cartagineses' },
      { desc: 'Derrota a 4 honderos baleares', done: [['N', 'Los honderos de las islas Baleares eran los mejores tiradores del Mediterráneo. Cartago pagaba caro por ellos.']] },
      { desc: 'Vuelve con Retógenes', say: [
        ['N', 'Pasaron los años. Roma venció a Cartago y expulsó a los púnicos de Iberia en el 206 a. C. Pero no se marchó.'],
        ['N', 'Ahora eres el nieto de aquel guerrero: tienes el mismo nombre, {nome}, y llevas el mismo amuleto. Retógenes, nieto del viejo jefe, dirige Numancia.'],
        ['reto', 'Llevamos dos generaciones luchando contra Roma. Ahora, en el 134 a. C., Escipión Emiliano nos ha rodeado con una muralla enorme.'],
        ['reto', 'El hambre es nuestro peor enemigo. Busca todo el trigo que quede en los campos del sur.']] },
      { desc: 'Recoge 6 haces de trigo en los campos', item: 'Haz de trigo' },
      { desc: 'Ataca la muralla de Escipión: derrota a 8 legionarios', done: [['H', 'La muralla tiene torres por todas partes... Nadie sale, nadie entra.']] },
      { desc: 'Habla con Retógenes', say: [
        ['reto', 'Esta noche escalaré la muralla con cinco compañeros y pediré ayuda a las ciudades arévacas.'],
        ['reto', 'Mientras tanto, ataca el campamento de Escipión, al sudeste. Derriba a su legado y dale a nuestro pueblo un día de esperanza.']] },
      { desc: 'Derrota al legado de Escipión en el campamento romano', intro: [['N', 'El legado de Escipión alza el gladio: «¡Numancia caerá, celtíbero!».']] },
      { desc: 'Vuelve a Numancia', say: [
        ['reto', 'He vuelto con las manos vacías. La ciudad de Lutia quiso ayudarnos, pero Escipión llegó antes y castigó con dureza a sus jóvenes.'],
        ['reto', 'Numancia no se rendirá. {nome}, llévate el amuleto de tu familia y huye por los campos. Alguien tiene que acordarse de nosotros.']] }
    ] },
    s1: { title: 'Púrpura fenicia', steps: [
      { desc: 'Habla con Abibaal en Gadir', say: [['abibaal', '¡El tinte púrpura vale más que el oro! Sale del caracol múrex. Tráeme cinco conchas de la playa de Gadir.']] },
      { desc: 'Recoge 5 conchas de múrex en Gadir', item: 'Concha de múrex' },
      { desc: 'Entrega las conchas a Abibaal', say: [['abibaal', '¡Espléndido! Para hacer un solo manto necesitamos miles de estos caracoles. Toma tu parte.']] }
    ] },
    s2: { title: 'Los elefantes de Aníbal', steps: [
      { desc: 'Habla con Edeta', say: [['edeta', '¡Los cartagineses han traído elefantes de guerra! Aplastan los sembrados. Detén a tres.']] },
      { desc: 'Detén a 3 elefantes de guerra' },
      { desc: 'Vuelve con Edeta', say: [['edeta', 'Aníbal llevó decenas de estos animales por los Alpes hasta Italia en el 218 a. C. Pocos sobrevivieron al frío. Gracias.']] }
    ] },
    s3: { title: 'Vino de Emporion', steps: [
      { desc: 'Habla con Jenofonte en Emporion', say: [['xeno', 'Una tormenta ha esparcido mis ánforas de vino por la costa. Son cinco. ¡Ayuda a un pobre mercader griego!']] },
      { desc: 'Recoge 5 ánforas cerca de Emporion', item: 'Ánfora' },
      { desc: 'Devuelve las ánforas', say: [['xeno', '¡Te han enviado los dioses! Toma estas dracmas, acuñadas aquí mismo, en Emporion.']] }
    ] },
    s4: { title: 'El consejo del sacerdote', steps: [
      { desc: 'Habla con el sacerdote de Lug', say: [['sacer', 'Quien no conoce el pasado no defiende el futuro. Ven a demostrar lo que sabes.']] },
      { desc: 'Responde al sacerdote de Lug', qs: [
        { q: '¿Qué ciudad fenicia, fundada según la tradición hacia el 1100 a. C., es hoy Cádiz?', o: ['Gadir', 'Malaka', 'Emporion', 'Tarraco'], a: 0 },
        { q: '¿Qué ciudad aliada de Roma sitió Aníbal en el 219 a. C.?', o: ['Numancia', 'Sagunto', 'Toledo', 'Segeda'], a: 1 },
        { q: '¿Cómo se llama la espada curva típica de los íberos?', o: ['Gladio', 'Falcata', 'Cimitarra', 'Spatha'], a: 1 }
      ] }
    ] }
  }
};

ES_CHAPTERS.c3 = {
  title: 'Hispania romana', years: '133 a. C. – 409 d. C.', currency: 'denarios',
  intro: [
    'Roma tardó casi dos siglos en dominar la Península. Los últimos en resistir fueron los pueblos del norte: cántabros y astures.',
    'En el 26 a. C., el propio emperador Augusto vino a Hispania a dirigir la guerra. Por todas partes empezaron a surgir calzadas, puentes y ciudades.',
    'Eres {nome}, nieto de numantinos, pero nacido bajo Roma. Te alistaste en la legión a cambio de la ciudadanía y de un trozo de tierra. El viejo amuleto de hueso sigue colgado de tu cuello.'
  ],
  outro: [
    'Con la paz, Hispania se convirtió en una de las provincias más ricas del Imperio. De ella salieron aceite, vino, garum, oro y plata, además de emperadores como Trajano y Adriano y escritores como Séneca, Lucano, Marcial y Quintiliano.',
    'El latín dio origen al castellano, al catalán, al gallego y al portugués. El cristianismo se extendió a partir del siglo III.',
    'Pero el Imperio se debilitaba. En el 409 d. C., suevos, vándalos y alanos cruzaron los Pirineos. Poco después llegaron los visigodos. Los descendientes de {nome} vivirían bajo nuevos señores.'
  ],
  places: { emerita: 'Emerita Augusta', via: 'Vía de la Plata', italica: 'Itálica', segovia: 'Acueducto de Segovia', medulas: 'Las Médulas', montes: 'Montes Cantábricos', covil: 'Guarida de Corocotta' },
  npcs: {
    marcus: { name: 'Centurión Marco Petronio', lines: ['¡Disciplina, legionario! Así es como Roma conquista el mundo.', 'Emerita se fundó para veteranos como nosotros. Algún día tendrás tierras aquí.'] },
    lucius: { name: 'Taberna de Lucio', lines: ['Vino de la Bética, aceite, garum... ¡y pociones del boticario griego!'] },
    seneca: { name: 'Séneca el Viejo', lines: ['Nací en Córdoba y enseño retórica. Algún día mi hijo será filósofo... eso espero.'] },
    trajano: { name: 'Pequeño Marco Ulpio', lines: ['¡Cuando sea mayor, mandaré legiones!'] },
    quinto: { name: 'Maestro de obras Quinto', lines: ['Agua limpia para una ciudad entera, traída desde la sierra. Eso es lo que ofrece Roma.'] },
    medug: { name: 'Medugeno, el minero', lines: ['Derribamos montañas enteras con agua para sacar oro. Los antiguos lo llaman ruina montium.'] }
  },
  codex: {
    cant: { title: 'Las guerras cántabras', text: 'Entre el 29 y el 19 a. C., Roma luchó contra cántabros y astures en el norte de la Península. El propio Augusto participó en la campaña en el 26–25 a. C. La guerra fue tan dura que tuvo que terminarla Agripa. Solo entonces toda la Península quedó bajo dominio romano, casi 200 años después de la llegada de las primeras legiones.' },
    emer: { title: 'Emerita Augusta', text: 'Fundada en el 25 a. C. para los veteranos (eméritos) de las guerras cántabras, Emerita Augusta (Mérida) fue capital de la provincia de Lusitania. Su teatro, anfiteatro, puentes y templos forman uno de los mayores conjuntos arqueológicos romanos de España, Patrimonio Mundial desde 1993.' },
    aqued: { title: 'El Acueducto de Segovia', text: 'Construido probablemente entre finales del siglo I y principios del II d. C., el acueducto lleva agua de la sierra hasta la ciudad. Su parte más alta mide unos 28 metros, y los sillares de granito se sostienen sin argamasa, solo por el equilibrio de su peso.' },
    ital: { title: 'Itálica y los emperadores', text: 'Itálica, cerca de Sevilla, fue fundada en el 206 a. C. por Escipión el Africano para soldados heridos. Allí nació Trajano (53 d. C.), el primer emperador romano nacido fuera de Italia. Su sucesor, Adriano, también tenía familia de Itálica.' },
    medu: { title: 'Las Médulas', text: 'En Las Médulas (León), los romanos extrajeron oro derribando montañas con la fuerza del agua canalizada, técnica que Plinio el Viejo describió como ruina montium. El paisaje rojizo de picos recortados es Patrimonio Mundial desde 1997.' },
    crist: { title: 'El cristianismo y el fin de Roma', text: 'El cristianismo llegó pronto a Hispania. El Concilio de Elvira (c. 300–306, cerca de Granada) es uno de los más antiguos de los que se conservan actas. En el 409 d. C., suevos, vándalos y alanos cruzaron los Pirineos, y el dominio romano empezó a derrumbarse.' }
  },
  quests: {
    main: { title: 'La paz de Augusto', steps: [
      { desc: 'Preséntate al centurión Marco Petronio', say: [
        ['marcus', '¡Legionario {nome}! Augusto fundó Emerita para los veteranos de esta guerra. Pero la guerra aún no ha terminado.'],
        ['marcus', 'Los bandidos asaltan los convoyes en la Vía de la Plata. Sin calzadas seguras no hay abastecimiento. ¡Limpia la vía!']] },
      { desc: 'Derrota a 6 bandidos en la Vía de la Plata' },
      { desc: 'Lleva el informe a Séneca, en Itálica', say: [
        ['seneca', 'Los bandidos de la vía decían obedecer a un tal Corocotta, un cántabro que se burla de las legiones.'],
        ['seneca', '¡Augusto ofreció 200.000 sestercios por su cabeza! Una fortuna. Se esconde en las montañas del norte.']] },
      { desc: 'Derrota a 8 guerreros cántabros en los Montes' },
      { desc: 'Derrota a 5 arqueros astures', done: [['H', 'Luchan como luchaban mis abuelos en Numancia... Es extraño estar del otro lado.']] },
      { desc: 'Sigue 4 rastros de Corocotta cerca de Las Médulas', item: 'Rastro de Corocotta' },
      { desc: 'Enfréntate a Corocotta en su guarida', intro: [['N', '«¿Roma quiere mi cabeza? ¡Que venga a buscarla!», grita Corocotta.']], done: [['N', 'Herido, Corocotta escapa por las montañas. Pero su banda está deshecha.']] },
      { desc: 'Vuelve a Emerita Augusta', say: [
        ['marcus', 'No te lo vas a creer, {nome}. ¡Corocotta se presentó en Roma ante Augusto para cobrar él mismo la recompensa!'],
        ['marcus', 'Al emperador le hizo tanta gracia su osadía que le pagó y lo perdonó. Al menos, eso cuenta el historiador Dion Casio.'],
        ['marcus', 'La guerra terminó en el 19 a. C. Ahora empieza la paz romana. Te has ganado tus tierras, veterano.']] }
    ] },
    s1: { title: 'Piedras sin argamasa', steps: [
      { desc: 'Habla con el maestro de obras Quinto', say: [['quinto', 'Faltan sillares de granito para terminar estos arcos. ¡Seis sillares, y cada uno en su sitio exacto!']] },
      { desc: 'Recoge 6 sillares de granito', item: 'Sillar de granito' },
      { desc: 'Lleva los sillares a Quinto', say: [['quinto', 'No usamos argamasa: el peso de cada piedra sostiene a la otra. Este acueducto durará milenios, ya verás.']] }
    ] },
    s2: { title: 'El oro de Las Médulas', steps: [
      { desc: 'Habla con Medugeno, el minero', say: [['medug', 'Los lobos atacan a los mineros por la noche. Abate a seis y podremos trabajar en paz.']] },
      { desc: 'Abate a 6 lobos en Las Médulas' },
      { desc: 'Vuelve con Medugeno', say: [['medug', 'Gracias. Plinio dice que de aquí sale oro como de ningún otro lugar del Imperio. Lástima que no se quede para nosotros...']] }
    ] },
    s3: { title: 'El futuro emperador', steps: [
      { desc: 'Habla con el pequeño Marco Ulpio', say: [
        ['N', 'Décadas después, hacia el 60 d. C., en Itálica...'],
        ['trajano', '¡He perdido mis tablillas de cera en el camino a Emerita! Sin ellas, mi maestro me castigará. Son cuatro.']] },
      { desc: 'Encuentra 4 tablillas de cera cerca de Emerita', item: 'Tablilla de cera' },
      { desc: 'Devuelve las tablillas', say: [
        ['trajano', '¡Muchas gracias! Mi nombre completo es Marco Ulpio Trajano. ¡Acuérdate de él!'],
        ['N', 'En el 98 d. C., aquel niño se convertiría en emperador. Con Trajano, el Imperio romano alcanzó su máxima extensión.']] }
    ] },
    s4: { title: 'La retórica de Córdoba', steps: [
      { desc: 'Habla con Séneca el Viejo', say: [['seneca', 'Un buen ciudadano romano conoce su provincia. Veamos qué has aprendido.']] },
      { desc: 'Responde a las preguntas de Séneca', qs: [
        { q: '¿Qué ciudad fundó Augusto en el 25 a. C. para veteranos, hoy llamada Mérida?', o: ['Emerita Augusta', 'Caesaraugusta', 'Tarraco', 'Corduba'], a: 0 },
        { q: '¿Qué emperador nacido en Itálica fue el primero nacido fuera de Italia?', o: ['Nerón', 'Trajano', 'Augusto', 'Constantino'], a: 1 },
        { q: '¿Cómo se sostienen las piedras del Acueducto de Segovia?', o: ['Con cemento romano', 'Con grapas de hierro', 'Sin argamasa, por su propio peso', 'Con resina'], a: 2 }
      ] }
    ] }
  }
};

ES_CHAPTERS.c4 = {
  title: 'El reino visigodo de Toledo', years: '409 – 711', currency: 'sueldos',
  intro: [
    'Después del 409, Hispania se convirtió en un campo de batalla entre pueblos germánicos. Los vándalos siguieron hacia África, los alanos fueron destruidos y los suevos fundaron un reino en el noroeste, en Gallaecia.',
    'Los visigodos, aliados de Roma, acabaron dominando casi toda la Península e hicieron de Toledo su capital.',
    'Año 584. Eres {nome}, guerrero al servicio del rey Leovigildo, que sueña con unir toda Hispania bajo una sola corona.'
  ],
  outro: [
    'Recaredo se convirtió al catolicismo en el 589, y godos e hispanorromanos se fueron fundiendo en un solo pueblo. En el 654, el Liber Iudiciorum dio las mismas leyes a todos.',
    'Pero el reino era frágil: los nobles se disputaban el trono y muchos reyes murieron asesinados. En el 710, la muerte de Witiza abrió una guerra entre facciones, y Rodrigo se quedó con la corona.',
    'En el 711, un ejército musulmán de árabes y bereberes al mando de Tariq ibn Ziyad cruzó el estrecho. Rodrigo murió en la batalla de Guadalete, y en pocos años el reino visigodo desapareció. Los descendientes de {nome} huyeron a las montañas del norte.'
  ],
  places: { toledo: 'Toledo', guarrazar: 'Fuente de Guarrazar', bagaudas: 'Valle de los Bagaudas', escola: 'Escuela de Sevilla', fronteira: 'Frontera sueva', galecia: 'Bosques de Gallaecia', fortaleza: 'Fortaleza de Andeca' },
  npcs: {
    claudio: { name: 'Duque Claudio', lines: ['Soy hispanorromano, pero sirvo al rey godo. Los tiempos han cambiado.'] },
    leovi: { name: 'Rey Leovigildo', lines: ['Una Hispania, una corona. Ese es mi sueño.', 'Fui el primer rey godo en usar trono y manto como los emperadores.'] },
    recaredo: { name: 'Príncipe Recaredo', lines: ['Mi padre es severo. Yo prefiero convencer antes que vencer.'] },
    merc4: { name: 'Mercader sirio', lines: ['Seda, especias, papiro... ¡y pociones de Alejandría!'] },
    pastor: { name: 'Pastor Sunila', lines: ['Las ovejas son la riqueza de la meseta.'] },
    isidoro: { name: 'Isidoro de Sevilla', lines: ['Quiero reunir todo el saber del mundo en un solo libro.'] },
    ourives: { name: 'Orfebre Teudila', lines: ['Los reyes ofrecen las coronas votivas a Dios. Son puro arte.'] }
  },
  codex: {
    inv: { title: 'Las invasiones del 409', text: 'En el 409, suevos, vándalos y alanos cruzaron los Pirineos. Los vándalos pasaron a África en el 429, los suevos fundaron un reino en Gallaecia (la actual Galicia y el norte de Portugal), y los visigodos, como aliados de Roma, fueron dominando la Península a lo largo del siglo V. Al mismo tiempo, revueltas campesinas, los «bagaudas», agitaban el valle del Ebro.' },
    tol: { title: 'Toledo, la capital', text: 'Leovigildo (rey del 568/569 al 586) fijó la corte en Toledo, que se convirtió en la capital del reino visigodo y en el centro político y religioso de Hispania. Los grandes Concilios de Toledo reunían a obispos y nobles y trataban tanto asuntos de fe como de política.' },
    leo: { title: 'Leovigildo, el unificador', text: 'Leovigildo combatió a bizantinos, cántabros y vascones y, en el 585, conquistó el reino suevo tras derrotar al usurpador Andeca. Fue también el primer rey visigodo en acuñar monedas con su propio nombre y en usar símbolos imperiales.' },
    rec: { title: 'Recaredo y el año 589', text: 'Los visigodos eran cristianos arrianos, mientras que los hispanorromanos eran católicos. En el 589, en el III Concilio de Toledo, el rey Recaredo se convirtió al catolicismo, lo que acercó a ambos pueblos.' },
    isid: { title: 'Isidoro de Sevilla', text: 'Isidoro (c. 560–636), obispo de Sevilla, escribió las «Etimologías», una enciclopedia de todo el saber de la época, leída en toda Europa durante la Edad Media. En su obra hay un famoso elogio de Hispania, la «Laus Spaniae». En 2002 se le propuso como patrón de internet.' },
    guarr: { title: 'Las coronas de Guarrazar y el Liber Iudiciorum', text: 'El Tesoro de Guarrazar, hallado en 1858 cerca de Toledo, reúne coronas votivas de oro y piedras preciosas, como la del rey Recesvinto. Ese mismo rey promulgó en el 654 el Liber Iudiciorum, un código de leyes válido por igual para godos e hispanorromanos.' }
  },
  quests: {
    main: { title: 'Una Hispania, una corona', steps: [
      { desc: 'Habla con el duque Claudio en Toledo', say: [
        ['claudio', 'Año 584. El rey Leovigildo quiere unir Hispania: suevos en el noroeste, bizantinos en el sur, rebeldes por todas partes.'],
        ['claudio', 'Empieza por los bagaudas del valle del sur. Asaltan aldeas y caravanas.']] },
      { desc: 'Derrota a 6 bagaudas en el valle', done: [['H', 'Muchos eran campesinos hambrientos... La guerra no es sencilla.']] },
      { desc: 'Habla con el rey Leovigildo', say: [
        ['leovi', 'Buen trabajo. Ahora, Gallaecia: el usurpador Andeca ha derrocado al rey suevo y se ha quedado con el trono. Es nuestra oportunidad.'],
        ['leovi', 'Cruza la frontera, derrota a los arqueros y a la caballería sueva y toma su fortaleza.']] },
      { desc: 'Derrota a 5 arqueros suevos en la frontera' },
      { desc: 'Derrota a 4 jinetes suevos en Gallaecia' },
      { desc: 'Derrota a Andeca en su fortaleza', intro: [['N', 'Andeca, rey sin derecho al trono, defiende las murallas con furia.']], done: [['N', 'En el 585, el reino suevo, que había durado más de 170 años, pasó a formar parte del reino visigodo.']] },
      { desc: 'Vuelve a Toledo y habla con Recaredo', say: [
        ['recaredo', 'Mi padre ha muerto, {nome}. Ahora soy el rey.'],
        ['recaredo', 'Los godos arrianos y los hispanos católicos aún se miran como extraños. En el 589 me convertiré ante todos los obispos, en el Concilio de Toledo.'],
        ['recaredo', 'Lleva un mensaje mío a un joven sabio de Sevilla: Isidoro.']] },
      { desc: 'Lleva el mensaje a Isidoro, en la Escuela de Sevilla', say: [
        ['isidoro', '¿Una carta del rey? Qué honor. Escucha: estoy escribiendo un libro que reunirá todo el saber del mundo.'],
        ['isidoro', 'Pero el viento ha esparcido mis manuscritos por los campos. Tráemelos, por favor. Son seis.']] },
      { desc: 'Recoge 6 manuscritos de Isidoro', item: 'Manuscrito' },
      { desc: 'Devuelve los manuscritos a Isidoro', say: [
        ['isidoro', 'Gracias a ti, las «Etimologías» estarán completas. Escucha lo que he escrito sobre esta tierra:'],
        ['isidoro', '«Tú eres, oh Hispania, la más hermosa de todas las tierras que se extienden desde Occidente hasta la India».'],
        ['isidoro', 'Que tenga paz. Temo que los nobles, siempre peleando por el trono, acaben por perderla.']] }
    ] },
    s1: { title: 'Las coronas de Guarrazar', steps: [
      { desc: 'Habla con el orfebre Teudila', say: [['ourives', 'Necesito cinco zafiros para la corona votiva del rey. Se cayeron de una carreta cerca de la fuente.']] },
      { desc: 'Encuentra 5 zafiros cerca de Guarrazar', item: 'Zafiro' },
      { desc: 'Entrega los zafiros', say: [['ourives', 'Esta corona colgará sobre el altar. Quizá algún día alguien la encuentre enterrada y se maraville.']] }
    ] },
    s2: { title: 'Lobos en la meseta', steps: [
      { desc: 'Habla con el pastor Sunila', say: [['pastor', 'Los lobos atacan mi rebaño cerca del Valle de los Bagaudas. Abate a seis, por favor.']] },
      { desc: 'Abate a 6 lobos en el Valle de los Bagaudas' },
      { desc: 'Vuelve con el pastor', say: [['pastor', '¡Que Dios te lo pague! Toma esto, por la lana que has salvado.']] }
    ] },
    s3: { title: 'El concilio del duque', steps: [
      { desc: 'Habla con el duque Claudio', say: [['claudio', 'Antes del concilio quiero saber si entiendes el reino que defiendes.']] },
      { desc: 'Responde al duque Claudio', qs: [
        { q: '¿Qué ciudad fue la capital del reino visigodo?', o: ['Toledo', 'Barcelona', 'Mérida', 'Sevilla'], a: 0 },
        { q: '¿En qué año se convirtió Recaredo al catolicismo en el III Concilio de Toledo?', o: ['409', '589', '711', '1085'], a: 1 },
        { q: '¿Qué obra enciclopédica escribió Isidoro de Sevilla?', o: ['Etimologías', 'Cantar de mio Cid', 'Don Quijote', 'Crónica Albeldense'], a: 0 }
      ] }
    ] }
  }
};

ES_CHAPTERS.c5 = {
  title: 'Covadonga y al-Ándalus', years: '711 – 1031', currency: 'sueldos',
  intro: [
    'Pocos años después del 711, casi toda la Península había pasado a dominio musulmán. Los árabes la llamaron al-Ándalus.',
    'Solo en las montañas del norte resistieron algunos grupos. En Asturias, un noble llamado Pelayo se negó a pagar tributos.',
    'Año 722. Eres {nome}, descendiente de godos refugiados en las montañas. Un ejército viene a acabar con la rebelión.'
  ],
  outro: [
    'Al-Ándalus vivió su apogeo con el Califato de Córdoba: quizá la mayor ciudad de Europa occidental, con bibliotecas, calles iluminadas y sabios musulmanes, judíos y cristianos.',
    'Pero tras la muerte de Almanzor (1002), el califato se hundió en guerras civiles y terminó en 1031, fragmentado en decenas de pequeños reinos: las taifas.',
    'En el norte crecían los reinos cristianos: León, Castilla, Navarra, Aragón y los condados catalanes. La frontera empezó a moverse hacia el sur.'
  ],
  places: { cangas: 'Cangas de Onís', garganta: 'Desfiladero', cova: 'Cueva de Covadonga', valle: 'Valle de Covadonga', compostela: 'Compostela', marca: 'Marca del Duero', cordoba: 'Córdoba' },
  npcs: {
    pelayo: { name: 'Pelayo', lines: ['Estas montañas son nuestra muralla.'] },
    toda: { name: 'Reina Toda de Pamplona', lines: ['Soy abuela de reyes y no acepto un no por respuesta.'] },
    pastora: { name: 'Pastora Munia', lines: ['Aquí arriba el frío es tan duro como la gente.'] },
    merc5: { name: 'Buhonero Fruela', lines: ['Traigo cosas del sur, si el camino está despejado.'] },
    eremita: { name: 'Ermitaño de la cueva', lines: ['En esta cueva, la fe y la roca son una misma cosa.'] },
    teodomiro: { name: 'Obispo Teodomiro', lines: ['Vienen peregrinos de toda Europa hasta aquí.'] },
    hasdai: { name: 'Hasday ibn Shaprut', lines: ['Soy médico y diplomático del califa. En Córdoba, judíos, cristianos y musulmanes estudian juntos.'] },
    abbas: { name: 'Abbás ibn Firnás', lines: ['El hombre nació para volar. ¡Estoy seguro!'] }
  },
  codex: {
    guad: { title: '711: Guadalete', text: 'En el 711, Tariq ibn Ziyad cruzó el estrecho con un ejército de bereberes y árabes; el nombre de Gibraltar viene de Yabal Tariq, «monte de Tariq». El rey Rodrigo fue derrotado en la batalla de Guadalete, y en pocos años casi toda la Península pasó a dominio del califato omeya de Damasco.' },
    cova: { title: 'Covadonga (722)', text: 'Según las crónicas asturianas, hacia el 722 Pelayo venció a una expedición musulmana en la cueva de Covadonga. Fue un combate pequeño, pero la tradición lo convirtió en el inicio de la «Reconquista» y en el origen del Reino de Asturias.' },
    sant: { title: 'El Camino de Santiago', text: 'Hacia el 820–830, en el reinado de Alfonso II de Asturias, se anunció el hallazgo del sepulcro atribuido al apóstol Santiago, con el apoyo del obispo Teodomiro. Compostela se convirtió en uno de los grandes destinos de peregrinación de Europa, y el Camino de Santiago unió la Península con el resto del continente.' },
    calif: { title: 'El Califato de Córdoba', text: 'En el 756, Abderramán I, un omeya que escapó de la matanza de su familia en Damasco, fundó el Emirato de Córdoba. En el 929, Abderramán III se proclamó califa. Córdoba se convirtió quizá en la mayor y más culta ciudad de Europa occidental.' },
    mesq: { title: 'La Mezquita y Medina Azahara', text: 'La Mezquita de Córdoba, iniciada en el 785 y ampliada durante dos siglos, es famosa por su bosque de columnas y sus arcos bicolores. Cerca de la ciudad, Abderramán III construyó la ciudad palatina de Medina Azahara. Ambas son Patrimonio Mundial.' },
    alman: { title: 'Almanzor', text: 'Almanzor, «el victorioso», gobernó de hecho el califato a finales del siglo X y realizó decenas de expediciones contra los reinos cristianos. En el 997 saqueó Santiago de Compostela y se llevó las campanas de la iglesia a Córdoba. Murió en el 1002. Las campanas no volvieron a Santiago hasta 1236, cuando Fernando III conquistó Córdoba.' }
  },
  quests: {
    main: { title: 'Las montañas no se rinden', steps: [
      { desc: 'Habla con Pelayo en Cangas de Onís', say: [
        ['pelayo', '{nome}, una expedición al mando de Alqama viene a aplastar nuestra rebelión. Son muchos más que nosotros.'],
        ['pelayo', 'Nuestra ventaja son las montañas. Ataca a los exploradores en el desfiladero y retrasa al ejército.']] },
      { desc: 'Derrota a 6 soldados exploradores en el desfiladero' },
      { desc: 'Reúne 6 rocas sueltas cerca de la cueva de Covadonga', item: 'Roca suelta' },
      { desc: 'Habla con el ermitaño de la cueva', say: [
        ['eremita', 'Las piedras están listas en lo alto del valle. Cuando el enemigo entre en el paso estrecho, rodarán.'],
        ['eremita', 'Pero antes hay que alejar a sus arqueros del desfiladero.']] },
      { desc: 'Derrota a 5 arqueros en el desfiladero' },
      { desc: 'Enfréntate a Alqama en el valle de Covadonga', intro: [['N', 'Las piedras ruedan montaña abajo. ¡En medio del caos, Alqama carga contra ti!']] },
      { desc: 'Vuelve con Pelayo', say: [
        ['pelayo', '¡Hemos vencido! Es una victoria pequeña, pero de ella nacerá un reino: Asturias.'],
        ['N', 'Pasó un siglo. El pequeño reino creció y sus reyes bajaron de las montañas. El amuleto pertenece ahora a un descendiente tuyo, también llamado {nome}.']] },
      { desc: 'Viaja a Compostela (c. 830)', say: [['N', 'Hacia el 830 se anunció allí el hallazgo del sepulcro del apóstol Santiago. Se estaba levantando una basílica.']] },
      { desc: 'Habla con el obispo Teodomiro', say: [
        ['teodomiro', 'El rey Alfonso II ha venido en peregrinación. Pronto vendrán peregrinos de toda Europa.'],
        ['N', 'Más de siglo y medio después, en el 997, la frontera ardió: Almanzor marchó hacia el norte.'],
        ['teodomiro', '¡La caballería de Almanzor está en la Marca del Duero! ¡Gana tiempo para que la gente huya!']] },
      { desc: 'Detén a 5 jinetes de Almanzor en la Marca del Duero' },
      { desc: 'Vuelve a Compostela', say: [
        ['teodomiro', 'Gracias a ti, la gente escapó. Pero Almanzor saqueó la ciudad y se llevó nuestras campanas a Córdoba.'],
        ['teodomiro', 'Las colgarán en la gran mezquita como lámparas... Algún día volverán.'],
        ['N', 'Almanzor murió en el 1002. Sin él, el califato se dividió en guerras civiles.']] }
    ] },
    s1: { title: 'Sancho el Craso', steps: [
      { desc: 'Habla con la reina Toda', say: [
        ['N', 'Año 958.'],
        ['toda', '¡A mi nieto Sancho, rey de León, lo han depuesto porque está tan gordo que no puede montar a caballo!'],
        ['toda', 'Dicen que en Córdoba hay un médico capaz de curarlo: Hasday ibn Shaprut. Ve allí a anunciar nuestra llegada.']] },
      { desc: 'Viaja hasta Córdoba', say: [['N', 'Córdoba deslumbra: calles empedradas, baños públicos, bibliotecas y la inmensa mezquita de columnas.']] },
      { desc: 'Habla con el médico Hasday ibn Shaprut', say: [
        ['hasdai', '¿Una reina cristiana pidiendo ayuda al califa? La diplomacia hace milagros.'],
        ['hasdai', 'Lo trataré con una dieta estricta y mucho ejercicio. En unos meses podrá volver a montar.'],
        ['N', 'Sancho adelgazó y, con tropas cordobesas, recuperó el trono en el 959. ¡La historia es real!']] }
    ] },
    s2: { title: 'Las alas de Abbás', steps: [
      { desc: 'Habla con Abbás ibn Firnás', say: [['abbas', '¡Quiero volar! Necesito seis plumas grandes de águila. Caen en el valle de las montañas del norte.']] },
      { desc: 'Recoge 6 plumas de águila en el valle de Covadonga', item: 'Pluma de águila' },
      { desc: 'Lleva las plumas a Abbás', say: [
        ['abbas', '¡Maravilloso! ¡Con estas alas saltaré desde una colina delante de toda Córdoba!'],
        ['N', 'Hacia el 875, Abbás ibn Firnás planeó unos instantes y cayó, lastimándose la espalda. Él mismo concluyó que se le había olvidado hacer una cola.']] }
    ] },
    s3: { title: 'Lobos del desfiladero', steps: [
      { desc: 'Habla con la pastora Munia', say: [['pastora', 'Los lobos bajan hasta el desfiladero y atacan a las cabras. ¡Abate a seis!']] },
      { desc: 'Abate a 6 lobos en el desfiladero' },
      { desc: 'Vuelve con la pastora', say: [['pastora', 'Ahora el rebaño sobrevivirá al invierno. ¡Llévate este queso y unas monedas!']] }
    ] },
    s4: { title: 'El saber de Córdoba', steps: [
      { desc: 'Habla con Hasday ibn Shaprut', say: [['hasdai', '¡Un viajero del norte! A ver si conoces la historia de esta tierra.']] },
      { desc: 'Responde a las preguntas de Hasday', qs: [
        { q: '¿En qué año, según la tradición, tuvo lugar la batalla de Covadonga?', o: ['711', '722', '929', '1085'], a: 1 },
        { q: '¿Quién se proclamó califa de Córdoba en el 929?', o: ['Abderramán III', 'Almanzor', 'Tariq ibn Ziyad', 'Boabdil'], a: 0 },
        { q: '¿Qué se llevó Almanzor de Santiago de Compostela en el 997?', o: ['La espada de Pelayo', 'Las campanas de la iglesia', 'Una corona de oro', 'El sepulcro del apóstol'], a: 1 }
      ] }
    ] }
  }
};
