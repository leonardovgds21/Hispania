// Traducción al español (España): capítulos 11–14.
'use strict';

ES_CHAPTERS.c11 = {
  title: 'La Guerra Civil', years: '1936 – 1939', currency: 'pesetas',
  intro: [
    'El 18 de julio de 1936, parte del ejército se sublevó contra el gobierno de la Segunda República. El golpe fracasó en la mitad del país, y España se partió en dos.',
    'Durante casi tres años, españoles lucharon contra españoles. Hubo bombardeos sobre ciudades, hambre, y violencia y represión en ambas retaguardias. Familias enteras quedaron divididas.',
    'Noviembre de 1936. Madrid está cercada. Eres {nome}, guardia de la Junta del Tesoro Artístico. Tu misión no es ganar la guerra: es salvar lo que pertenece a todos.'
  ],
  outro: [
    'La guerra terminó el 1 de abril de 1939, con la victoria del bando dirigido por el general Francisco Franco. Los historiadores calculan cientos de miles de muertos, entre combates, bombardeos y represión.',
    'Cerca de medio millón de personas cruzaron la frontera francesa en el invierno de 1939, en la llamada «Retirada». Muchas nunca volvieron. Otras tantas sufrieron la cárcel y la represión de la posguerra.',
    'Las obras del Prado regresaron de Ginebra en septiembre de 1939, intactas, poco antes de que empezara la Segunda Guerra Mundial. Hoy, quien visita el museo rara vez sabe que estuvieron a punto de perderse.'
  ],
  places: { prado: 'Museo del Prado', ruas: 'Calles de Madrid', armazem: 'Sótanos del museo', estrada: 'Carretera de Valencia', valencia: 'Torres de Serranos', deposito: 'Depósito abandonado', figueres: 'Castillo de Figueres' },
  npcs: {
    timoteo: { name: 'Timoteo Pérez Rubio', lines: ['Soy pintor. Nunca imaginé que mi trabajo sería salvar los cuadros de otros.'] },
    carmen: { name: 'Enfermera Carmen', lines: ['Aquí atendemos a todos los heridos. Sin preguntar de qué lado están.'] },
    merc11: { name: 'Cantina de la esquina', lines: ['Hay poco de todo. Pero lo que hay, lo vendo.'] },
    renau: { name: 'Josep Renau', lines: ['Soy cartelista. Le encargué a Picasso un cuadro para la Exposición de París.'] },
    pilar: { name: 'Pequeña Pilar', lines: ['Me van a mandar en un barco muy lejos. No sé adónde.'] },
    comissario: { name: 'Delegado del Comité Internacional', lines: ['Museos de toda Europa se han unido para proteger estas obras.'] },
    machado: { name: 'Antonio Machado', lines: ['Caminante, no hay camino: se hace camino al andar.'] }
  },
  codex: {
    rep2: { title: 'La Segunda República (1931–1936)', text: 'La República separó la Iglesia del Estado, inició una reforma agraria, construyó miles de escuelas y aprobó el estatuto de autonomía de Cataluña. Gracias al empeño de la diputada Clara Campoamor, las mujeres conquistaron el voto, que ejercieron por primera vez en las elecciones de 1933. Fueron también años de fuerte polarización, huelgas y violencia política.' },
    golpe36: { title: 'Julio de 1936', text: 'El 17 y 18 de julio de 1936, militares se sublevaron contra el gobierno del Frente Popular. El golpe triunfó en parte del país y fracasó en otra, como Madrid y Barcelona. La Alemania nazi y la Italia fascista ayudaron a los sublevados; la Unión Soviética y México ayudaron a la República. En ambas zonas hubo violencia contra civiles.' },
    guern: { title: 'Guernica (1937)', text: 'El 26 de abril de 1937, la Legión Cóndor alemana y la aviación italiana bombardearon la villa vasca de Guernica en día de mercado. Picasso pintó el «Guernica» para el pabellón de la República en la Exposición Internacional de París de 1937. El cuadro no llegó a España hasta 1981 y hoy está en el Museo Reina Sofía, en Madrid.' },
    brig: { title: 'Las Brigadas Internacionales', text: 'Unos 35.000 voluntarios de más de 50 países lucharon en las Brigadas Internacionales junto a la República. Entre los extranjeros que fueron a España había escritores como George Orwell y Ernest Hemingway. Las brigadas se retiraron a finales de 1938.' },
    tesoro: { title: 'El salvamento del Prado', text: 'En noviembre de 1936 cayeron bombas cerca del Museo del Prado. La Junta del Tesoro Artístico, presidida por el pintor Timoteo Pérez Rubio, trasladó las principales obras a Valencia, donde se guardaron en las Torres de Serranos, y después a Cataluña. En 1939, un comité internacional de museos las llevó a Ginebra, de donde volvieron intactas.' },
    exil: { title: 'La Retirada y el exilio', text: 'En el invierno de 1939, cientos de miles de personas —soldados y civiles— cruzaron los Pirineos hacia Francia. Muchos fueron internados en campos en las playas. El poeta Antonio Machado murió en Collioure el 22 de febrero de 1939. El México de Lázaro Cárdenas acogió a miles de exiliados españoles.' }
  },
  quests: {
    main: { title: 'El tesoro de todos', steps: [
      { desc: 'Habla con Timoteo Pérez Rubio en el Prado', say: [
        ['timoteo', 'Ayer cayeron bombas en el tejado del museo. Si Velázquez, Goya y el Greco se quedan aquí, pueden acabar hechos cenizas.'],
        ['timoteo', 'Hemos embalado los cuadros en los sótanos, pero las cajas están desperdigadas. Necesitamos todas antes de partir.']] },
      { desc: 'Reúne 6 cajas de cuadros en los sótanos', item: 'Cuadro embalado' },
      { desc: 'Aleja a 8 saqueadores de las calles de Madrid', done: [['H', 'En la guerra, algunos solo piensan en sí mismos. Pero el camino está libre.']] },
      { desc: 'Vuelve con Timoteo', say: [
        ['timoteo', 'Los camiones salen esta noche hacia Valencia. «Las Meninas» apenas cabía bajo un puente: ¡tuvimos que desinflar las ruedas para pasar!'],
        ['timoteo', 'Hay incendiarios en la carretera. Protege el convoy.']] },
      { desc: 'Protege el convoy: detén a 6 incendiarios' },
      { desc: 'Acompaña al convoy hasta Valencia', say: [['N', 'Las obras se guardaron en las Torres de Serranos, con muros reforzados con hormigón y sacos terreros.']] },
      { desc: 'Habla con Josep Renau', say: [
        ['renau', '¡Muy bien! Valencia es ahora la sede del gobierno. Los cuadros están a salvo... por ahora.'],
        ['renau', 'Una banda asalta camiones de abastecimiento y esconde el botín en un depósito al sudeste. Si descubren nuestras cajas...']] },
      { desc: 'Derrota al jefe de los saqueadores en el depósito', intro: [['N', '«¿Arte? ¡Eso vale una fortuna fuera!», se ríe el jefe de la banda.']] },
      { desc: 'Lleva las obras al castillo de Figueres', say: [['N', 'Febrero de 1939. El frente se ha hundido. Carreteras llenas de gente huyendo con el frío hacia Francia.']] },
      { desc: 'Habla con el delegado internacional', say: [
        ['comissario', 'Representantes de museos de Francia, Reino Unido, Suiza y Estados Unidos han firmado un acuerdo: las obras irán a Ginebra, bajo la protección de la Sociedad de Naciones.'],
        ['comissario', 'Pertenecen al pueblo español y volverán cuando haya paz. Has cumplido con tu deber, {nome}.'],
        ['N', 'Más de 1.800 cajas cruzaron la frontera en camiones. No se perdió ninguna obra maestra.']] }
    ] },
    s1: { title: 'El hospital de sangre', steps: [
      { desc: 'Habla con la enfermera Carmen', say: [['carmen', 'Nos hemos quedado sin medicinas. Hay cajas de medicamentos abandonadas en las calles. ¡Trae cinco, por favor!']] },
      { desc: 'Recoge 5 cajas de medicinas en las calles', item: 'Caja de medicinas' },
      { desc: 'Lleva las medicinas a Carmen', say: [['carmen', 'Hoy has salvado vidas. Llévate estas pociones, tú también las necesitarás.']] }
    ] },
    s2: { title: 'Los niños de la guerra', steps: [
      { desc: 'Habla con la pequeña Pilar', say: [['pilar', 'Mi madre me escribió cartas, pero las perdí en la carretera. Son cuatro. Me las llevaré en el barco.']] },
      { desc: 'Encuentra 4 cartas en la carretera de Valencia', item: 'Carta' },
      { desc: 'Entrega las cartas a Pilar', say: [['pilar', '¡Gracias! Las leeré todas las noches.'], ['N', 'Miles de niños fueron enviados a la URSS, México, Reino Unido, Francia y Bélgica. Se les conoce como los «niños de la guerra». Muchos nunca volvieron a ver a sus padres.']] }
    ] },
    s3: { title: 'El cuadro de Picasso', steps: [
      { desc: 'Habla con Josep Renau', say: [['renau', 'Responde: ¿qué sabes de estos tiempos terribles?']] },
      { desc: 'Responde a Josep Renau', qs: [
        { q: '¿Qué villa vasca fue bombardeada el 26 de abril de 1937?', o: ['Bilbao', 'Guernica', 'San Sebastián', 'Vitoria'], a: 1 },
        { q: '¿Para qué evento pintó Picasso el «Guernica»?', o: ['Los Juegos Olímpicos', 'La Exposición Internacional de París de 1937', 'La inauguración del Prado', 'El fin de la guerra'], a: 1 },
        { q: '¿A qué ciudad se llevaron las obras del Prado en 1939?', o: ['Londres', 'Nueva York', 'Ginebra', 'Lisboa'], a: 2 }
      ] }
    ] },
    s4: { title: 'Los últimos versos', steps: [
      { desc: 'Habla con Antonio Machado', say: [['machado', 'Estoy cansado y enfermo. He perdido aquí cerca tres hojas con mis últimos versos. ¿Puedes buscarlas?']] },
      { desc: 'Encuentra 3 hojas de versos cerca de Figueres', item: 'Hoja de versos' },
      { desc: 'Entrega los versos a Machado', say: [['machado', 'Gracias. Me los llevaré conmigo al otro lado de la frontera, junto con mi madre.'], ['N', 'Machado murió días después en Collioure, Francia. En su bolsillo encontraron un último verso, sobre los días azules y el sol de la infancia.']] }
    ] }
  }
};

ES_CHAPTERS.c12 = {
  title: 'Los años del silencio', years: '1939 – 1975', currency: 'pesetas',
  intro: [
    'Tras la guerra llegó la dictadura del general Franco. Los partidos y sindicatos libres fueron prohibidos, la prensa estaba censurada y decenas de miles de personas fueron ejecutadas o encarceladas en la posguerra.',
    'Los primeros años fueron de hambre: las cartillas de racionamiento duraron hasta 1952. España quedó aislada del mundo después de la Segunda Guerra Mundial.',
    'Año 1946. Eres {nome}, joven periodista. Tu arma ahora es una cámara de fotos. Tus enemigos no son personas: son el hambre, el miedo y el silencio.'
  ],
  outro: [
    'Francisco Franco murió el 20 de noviembre de 1975. Dos días después, Juan Carlos de Borbón, a quien el propio dictador había designado sucesor, fue proclamado rey.',
    'Nadie sabía lo que vendría. El país había cambiado mucho: las ciudades crecieron, millones de personas dejaron el campo, los turistas trajeron otras costumbres y una nueva generación quería libertad.',
    'El amuleto de hueso, guardado ahora en una caja de fotos, pasó a manos de un joven abogado de la familia.'
  ],
  places: { redacao: 'Redacción del periódico', bairro: 'Barrio obrero', censura: 'Oficina de Censura', seat: 'Fábrica de SEAT', estacao: 'Estación del Norte', benidorm: 'Benidorm', praca: 'Plaza de las Sombras' },
  npcs: {
    editor: { name: 'Director Ramón', lines: ['Cada palabra que publicamos pasa antes por las tijeras del censor.'] },
    berlanga: { name: 'Luis García Berlanga', lines: ['En el cine, el humor pasa por donde la crítica directa no puede.'] },
    merc12: { name: 'Quiosco de Paco', lines: ['Periódicos, tabaco y... ¡pociones milagrosas!'] },
    zaragoza: { name: 'Alcalde Pedro Zaragoza', lines: ['Benidorm era un pueblo de pescadores. ¡Míralo ahora!'] },
    biarnes: { name: 'Joana Biarnés', lines: ['Soy fotoperiodista. Dicen que esto no es trabajo de mujeres. Pues mira mis fotos.'] },
    emigrante: { name: 'Emigrante Antonio', lines: ['Una maleta de cartón y un contrato en Alemania. Es todo lo que tengo.'] },
    operario: { name: 'Obrero de SEAT', lines: ['El 600 es el coche del pueblo. Por primera vez, una familia obrera puede tener coche.'] }
  },
  codex: {
    posg: { title: 'La posguerra', text: 'Los años cuarenta fueron los «años del hambre». El régimen adoptó la autarquía (intentar producirlo todo dentro del país) y las cartillas de racionamiento duraron hasta 1952. La represión fue dura: ejecuciones, cárceles, campos de trabajo y depuraciones de maestros y funcionarios.' },
    isol: { title: 'Aislamiento y vuelta al mundo', text: 'En 1946, la ONU recomendó retirar a los embajadores de Madrid. Con la Guerra Fría la situación cambió: en 1953 España firmó acuerdos con Estados Unidos (que instaló bases militares) y un concordato con el Vaticano. En 1955 fue admitida en la ONU.' },
    milagre: { title: 'El «milagro» de los años sesenta', text: 'El Plan de Estabilización de 1959 abrió la economía. En los años sesenta, España creció como pocos países del mundo gracias a la industria, el turismo y el dinero de los emigrantes. El SEAT 600, lanzado en 1957, se convirtió en símbolo de la nueva clase media.' },
    turis: { title: 'El boom del turismo', text: 'En 1953, el alcalde de Benidorm, Pedro Zaragoza, autorizó el bikini en las playas y, según contó, fue en Vespa hasta Madrid para defender su decisión ante el gobierno. El turismo se disparó: de poco más de un millón de visitantes a principios de los cincuenta a más de 30 millones a mediados de los setenta.' },
    emig: { title: 'La gran emigración', text: 'En los años sesenta y setenta, unos dos millones de españoles emigraron para trabajar en Francia, Alemania, Suiza y Bélgica. Al mismo tiempo, millones dejaron el campo para ir a Madrid, Barcelona y Bilbao, donde surgieron enormes barrios obreros.' },
    oposi: { title: 'Censura y oposición', text: 'Libros, películas, canciones y periódicos pasaban por la censura previa. Aun así, la oposición creció: huelgas obreras, protestas universitarias y partidos clandestinos. En los años sesenta surgieron las Comisiones Obreras. El grupo terrorista ETA, fundado en 1959, asesinó en 1973 al presidente del Gobierno, Carrero Blanco.' },
    fim75: { title: '20 de noviembre de 1975', text: 'Franco murió el 20 de noviembre de 1975, tras 36 años en el poder. En 1969 había designado a Juan Carlos de Borbón, nieto de Alfonso XIII, como sucesor a título de rey. Juan Carlos I fue proclamado el 22 de noviembre de 1975.' }
  },
  quests: {
    main: { title: 'La cámara contra el silencio', steps: [
      { desc: 'Habla con el director Ramón', say: [
        ['editor', 'Bienvenido a la redacción, {nome}. Aquí la regla es sencilla: solo publicamos lo que deja el censor.'],
        ['editor', 'Pero una foto puede decir lo que un texto no puede. Ve al barrio obrero y muestra cómo vive la gente.'],
        ['N', 'Tu cámara dispara un flash que disipa las sombras. Haz clic para fotografiar.']] },
      { desc: 'Disipa 8 Sombras del Hambre en el barrio obrero' },
      { desc: 'Reparte 6 sacos de harina en el barrio', item: 'Saco de harina' },
      { desc: 'Vuelve a la redacción', say: [
        ['editor', 'Tus fotos son demasiado buenas. El censor lo ha cortado todo, claro.'],
        ['N', 'Pasan los años: acuerdos con EE. UU. en 1953, entrada en la ONU en 1955, Plan de Estabilización en 1959.'],
        ['editor', 'Ahora quieren que escribamos sobre el «milagro económico». Ve a la Oficina de Censura y recupera nuestro archivo de fotos.']] },
      { desc: 'Recupera el archivo: disipa 8 Censores de Tinta' },
      { desc: 'Ve a Benidorm a hacer un reportaje', say: [['N', 'Un pueblo de pescadores se ha convertido en una ciudad de rascacielos. Turistas del norte de Europa llenan las playas.']] },
      { desc: 'Entrevista al alcalde Pedro Zaragoza', say: [
        ['zaragoza', 'En 1953 permití el bikini en las playas. ¡Quisieron excomulgarme!'],
        ['zaragoza', 'Fui en Vespa hasta Madrid para explicarle al gobierno que el turismo era el futuro. Y tenía razón.']] },
      { desc: 'Entrevista al emigrante en la Estación del Norte', say: [
        ['emigrante', 'El turismo trae dinero a la costa. Pero en mi pueblo no hay trabajo. Me voy a Alemania.'],
        ['emigrante', 'Mandaré dinero a casa todos los meses. Dos millones de nosotros estamos haciendo lo mismo.']] },
      { desc: 'Enfréntate a 5 Sombras del Miedo', done: [['N', 'Llegan los años setenta. Huelgas, protestas y una generación que ha perdido el miedo.']] },
      { desc: 'Enfréntate al Gran Censor en la Plaza de las Sombras', intro: [['N', 'Una sombra enorme, hecha de tinta negra y tijeras, intenta borrar todas las palabras.']] },
      { desc: 'Vuelve a la redacción', say: [
        ['N', '20 de noviembre de 1975.'],
        ['editor', 'Franco ha muerto. La radio solo pone música clásica. En la calle, unos lloran y otros brindan en silencio.'],
        ['editor', 'Nadie sabe lo que viene ahora, {nome}. Pero, por primera vez en mucho tiempo, vamos a poder escribir la historia.']] }
    ] },
    s1: { title: 'El coche del pueblo', steps: [
      { desc: 'Habla con el obrero de SEAT', say: [['operario', '¡Faltan cinco piezas en la cadena de montaje del 600! Están repartidas por la fábrica.']] },
      { desc: 'Encuentra 5 piezas del SEAT 600', item: 'Pieza del SEAT 600' },
      { desc: 'Entrega las piezas', say: [['operario', '¡Otro «seiscientos» listo! Con él, las familias irán a la playa en verano. Es una revolución sobre cuatro ruedas.']] }
    ] },
    s2: { title: '¡Bienvenido, Mister Marshall!', steps: [
      { desc: 'Habla con Luis García Berlanga', say: [['berlanga', 'Hice una película sobre un pueblo que se disfraza para recibir a los americanos... ¡y pasan de largo! A ver si conoces tu país.']] },
      { desc: 'Responde a Berlanga', qs: [
        { q: '¿Hasta qué año duraron las cartillas de racionamiento?', o: ['1940', '1952', '1965', '1975'], a: 1 },
        { q: '¿Qué coche, lanzado en 1957, se convirtió en símbolo de la clase media española?', o: ['Escarabajo', 'SEAT 600', 'Citroën 2CV', 'Fiat 500'], a: 1 },
        { q: '¿En qué fecha murió Francisco Franco?', o: ['18 de julio de 1936', '1 de abril de 1939', '20 de noviembre de 1975', '23 de febrero de 1981'], a: 2 }
      ] }
    ] },
    s3: { title: 'La fotógrafa', steps: [
      { desc: 'Habla con Joana Biarnés', say: [['biarnes', 'He perdido cinco carretes en Benidorm. Uno tiene fotos de cuatro chicos ingleses de pelo largo...']] },
      { desc: 'Encuentra 5 carretes en Benidorm', item: 'Carrete de fotos' },
      { desc: 'Devuelve los carretes', say: [['biarnes', '¡Gracias! En 1965 fotografié a los Beatles en Madrid y Barcelona. Fui la primera fotoperiodista mujer de la prensa diaria española.']] }
    ] }
  }
};

ES_CHAPTERS.c13 = {
  title: 'La Transición', years: '1975 – 1992', currency: 'pesetas',
  intro: [
    'Tras casi cuatro décadas de dictadura, España tenía que decidir su futuro sin volver a la guerra. Ese proceso se conoce como la Transición.',
    'En 1976, el rey nombró presidente del Gobierno a Adolfo Suárez. Poca gente apostaba por él. Había que desmontar el régimen usando las propias leyes del régimen.',
    'Eres {nome}, un joven abogado. Pronto serás elegido diputado. Tu arma ahora son las palabras: haz clic para pronunciar un discurso.'
  ],
  outro: [
    'En 1982, la alternancia pacífica en el poder confirmó la democracia. En 1986, España entró en la Comunidad Económica Europea, junto con Portugal. La Movida madrileña estalló en música, cine y moda.',
    '1992 fue el año en que España se mostró al mundo: los Juegos Olímpicos de Barcelona y la Exposición Universal de Sevilla. El primer tren de alta velocidad unió Madrid y Sevilla.',
    'Pero no todo fue fiesta: el terrorismo de ETA siguió matando durante décadas, hasta que el grupo anunció el fin de la violencia en 2011 y se disolvió en 2018.'
  ],
  places: { congresso: 'Congreso de los Diputados', moncloa: 'Palacio de la Moncloa', ruas: 'Calles de Madrid', sindicato: 'Sede de los sindicatos', jeronimo: 'Carrera de San Jerónimo', tv: 'Estudio de televisión', hemiciclo: 'Hemiciclo (23-F)', barcelona: 'Barcelona 92' },
  npcs: {
    suarez: { name: 'Adolfo Suárez', lines: ['Elevar a la categoría política de normal lo que a nivel de calle es simplemente normal.'] },
    professora: { name: 'Profesora de Derecho Constitucional', lines: ['Una constitución es un pacto entre personas que piensan distinto.'] },
    merc13: { name: 'Bar del Congreso', lines: ['Aquí diputados de todos los partidos toman café juntos. ¡Pague en pesetas!'] },
    sindicalista: { name: 'Sindicalista Marcelino', lines: ['Pasé años en la cárcel por defender a los trabajadores. Ahora quieren negociar con nosotros.'] },
    funcionario: { name: 'Funcionario agotado', lines: ['Sello, papel, sello, papel...'] },
    rei: { name: 'Rey Juan Carlos I', lines: ['La Corona no puede tolerar acciones que pretendan interrumpir el proceso democrático.'] },
    dj: { name: 'DJ de la Movida', lines: ['¡Madrid nunca duerme! ¡Esto es la Movida!'] },
    atleta: { name: 'Atleta olímpica', lines: ['España ganó 22 medallas en Barcelona. ¡Nunca nos habíamos acercado siquiera!'] }
  },
  codex: {
    ref76: { title: 'La Ley para la Reforma Política', text: 'En noviembre de 1976, las propias Cortes franquistas aprobaron la Ley para la Reforma Política, que permitía elecciones libres; en la práctica, votaron su propia disolución. En diciembre se aprobó en referéndum. En abril de 1977 se legalizó el Partido Comunista, y el 15 de junio de 1977 se celebraron las primeras elecciones libres desde 1936.' },
    pactos: { title: 'Los Pactos de la Moncloa', text: 'En octubre de 1977, con una inflación de más del 20%, el gobierno y los principales partidos firmaron los Pactos de la Moncloa: acuerdos económicos y políticos para afrontar la crisis. Fueron un ejemplo de consenso entre adversarios.' },
    const: { title: 'La Constitución de 1978', text: 'Redactada por siete diputados de distintos partidos —los «padres de la Constitución»—, la Constitución se aprobó en referéndum el 6 de diciembre de 1978, con cerca de un 88% de votos a favor. Define España como una monarquía parlamentaria y creó el Estado de las Autonomías, con 17 comunidades autónomas.' },
    '23f': { title: 'El 23-F', text: 'El 23 de febrero de 1981, durante la votación del nuevo presidente del Gobierno, el teniente coronel Antonio Tejero asaltó el Congreso con guardias civiles armados. Suárez, el general Gutiérrez Mellado y Santiago Carrillo se negaron a tirarse al suelo. De madrugada, el rey apareció en televisión, de uniforme, y defendió la Constitución. El golpe fracasó.' },
    eta: { title: 'El terrorismo de ETA', text: 'El grupo terrorista ETA, que defendía la independencia del País Vasco mediante la violencia, asesinó a más de 850 personas entre 1968 y 2010, la mayoría ya en democracia. En 1997, el asesinato del concejal Miguel Ángel Blanco sacó a millones de personas a la calle. ETA anunció el fin de la violencia en 2011 y se disolvió en 2018.' },
    movida: { title: 'La Movida', text: 'En los años ochenta, Madrid vivió una explosión cultural conocida como la Movida: grupos de rock y pop, fanzines, moda, fotografía y el cine de Pedro Almodóvar. Era la libertad recién conquistada convertida en arte y en fiesta.' },
    n92: { title: 'Europa y 1992', text: 'El 1 de enero de 1986, España entró en la Comunidad Económica Europea (hoy Unión Europea). En 1992, Barcelona acogió los Juegos Olímpicos, con 22 medallas españolas, y Sevilla, la Exposición Universal. Ese mismo año se inauguró el primer tren de alta velocidad, el AVE Madrid–Sevilla.' }
  },
  quests: {
    main: { title: 'La democracia posible', steps: [
      { desc: 'Habla con Adolfo Suárez', say: [
        ['suarez', 'Soy el nuevo presidente del Gobierno, y casi nadie confía en mí. Vamos a usar las leyes del régimen para desmontarlo.'],
        ['suarez', 'El referéndum de la reforma política es en diciembre. La gente tiene miedo a votar después de tantos años. ¡Ayúdala!'],
        ['N', 'Ahora tus palabras son tu arma: haz clic para pronunciar un discurso. Vuelan hasta los enemigos.']] },
      { desc: 'Lleva 8 papeletas de voto a los ciudadanos', item: 'Papeleta de voto' },
      { desc: 'Desmiente 8 bulos en las calles', done: [['N', '15 de diciembre de 1976: la reforma se aprobó con cerca del 94% de los votos. En junio de 1977 fuiste elegido diputado.']] },
      { desc: 'Habla con el sindicalista Marcelino', say: [
        ['sindicalista', 'La inflación supera el 20%. Los trabajadores están desesperados y las empresas cierran.'],
        ['sindicalista', 'Suárez ha llamado a todos los partidos a la Moncloa, de la derecha a los comunistas. ¡Lleva estos documentos y recoge las firmas!']] },
      { desc: 'Recoge 5 firmas en el Palacio de la Moncloa', item: 'Firma' },
      { desc: 'Vuelve con Suárez', say: [
        ['suarez', '¡Los Pactos de la Moncloa están firmados! Los enemigos de ayer, sentados en la misma mesa.'],
        ['N', '6 de diciembre de 1978: la Constitución se aprobó en referéndum.'],
        ['N', '23 de febrero de 1981. El Congreso vota al sucesor de Suárez. De repente, disparos en el hemiciclo.']] },
      { desc: 'Resiste: disipa 8 Sombras del Golpe en la Carrera de San Jerónimo' },
      { desc: 'Enfréntate a la Sombra del 23-F en el hemiciclo', intro: [['N', '«¡Todo el mundo al suelo!». Pero algunos diputados siguen sentados. Y tú también.']] },
      { desc: 'Ve al estudio de televisión', say: [
        ['N', 'Madrugada del 24 de febrero, 1.14 h.'],
        ['rei', 'He ordenado a las autoridades civiles y militares que tomen todas las medidas necesarias para mantener el orden constitucional.'],
        ['N', 'Por la mañana, los diputados salieron del Congreso. El golpe había fracasado. Días después, más de un millón de personas salieron a la calle a defender la democracia.']] },
      { desc: 'Viaja a Barcelona', say: [['N', '1992. En 1982 hubo la primera alternancia en el poder; en 1986, la entrada en Europa. Ahora, los Juegos Olímpicos.']] },
      { desc: 'Habla con la atleta olímpica', say: [
        ['atleta', 'Hace diecisiete años nadie imaginaba esto: el mundo entero mirándonos, y nosotros sin miedo.'],
        ['atleta', 'Tú estuviste allí en 1981, ¿verdad? Gracias. Esta medalla también es tuya.']] }
    ] },
    s1: { title: 'La Movida', steps: [
      { desc: 'Habla con el DJ de la Movida', say: [['dj', '¡Mis discos se han caído del camión por las calles! ¡Cinco vinilos! ¡La fiesta empieza a medianoche!']] },
      { desc: 'Recoge 5 discos de vinilo en las calles', item: 'Disco de vinilo' },
      { desc: 'Devuelve los discos', say: [['dj', 'Esto es la libertad: música alta, pelo de colores y nadie que lo prohíba. ¡Bienvenido a la Movida!']] }
    ] },
    s2: { title: 'La lección de Derecho', steps: [
      { desc: 'Habla con la profesora de Derecho', say: [['professora', 'Todo diputado debería aprobar este examen.']] },
      { desc: 'Responde a la profesora', qs: [
        { q: '¿En qué fecha se aprobó en referéndum la Constitución española?', o: ['14 de abril de 1931', '6 de diciembre de 1978', '23 de febrero de 1981', '1 de enero de 1986'], a: 1 },
        { q: '¿Cuántas comunidades autónomas tiene España?', o: ['9', '15', '17', '22'], a: 2 },
        { q: '¿En qué año entró España en la Comunidad Económica Europea?', o: ['1977', '1982', '1986', '1992'], a: 2 }
      ] }
    ] },
    s3: { title: 'Contra la inercia', steps: [
      { desc: 'Habla con el funcionario agotado', say: [['funcionario', '¡Las reformas están atascadas por la Inercia! Montañas de papel con vida propia. Derrota a cinco.']] },
      { desc: 'Vence a 5 Inercias' },
      { desc: 'Vuelve con el funcionario', say: [['funcionario', '¡Los papeles avanzan! Por primera vez en años, mi mesa está vacía.']] }
    ] }
  }
};

ES_CHAPTERS.c14 = {
  title: 'La España del siglo XXI', years: '1992 – hoy', currency: 'euros',
  intro: [
    'España entró en el siglo XXI moderna, europea y en pleno crecimiento. En 2002, el euro sustituyó a la peseta. Pero el nuevo siglo también trajo crisis, tragedias y debates intensos.',
    'Eres {nome}, último heredero de un linaje de más de treinta mil años. El viejo amuleto de hueso está sobre tu mesa, junto al móvil.',
    'Tu objetivo: ganarte la confianza de los ciudadanos y llegar a la Presidencia del Gobierno. Tus enemigos son las crisis, la desinformación y la división.'
  ],
  outro: [
    'El rey propuso a {nome} como candidato y el Congreso de los Diputados le otorgó su confianza en la investidura. Ante el rey, en el Palacio de la Zarzuela, prometiste cumplir la Constitución.',
    'De la lanza de sílex al megáfono, el linaje ha atravesado imperios, guerras, dictaduras y democracias. Cada generación luchó con las armas de su tiempo.',
    'Ahora empieza otro capítulo, que nadie ha escrito todavía.'
  ],
  places: { lavapies: 'Lavapiés', obra: 'Obras paradas', bolsa: 'Bolsa de Madrid', sol: 'Puerta del Sol', hospital: 'Hospital', quarentena: 'Barrio en cuarentena', valencia: 'Valencia (DANA)', dados: 'Centro de datos', debate: 'El Gran Debate', zarzuela: 'Palacio de la Zarzuela' },
  npcs: {
    mentora: { name: 'Mentora Carmen', lines: ['Hacer política es escuchar más que hablar. Y después, hablar con claridad.'] },
    engenheira: { name: 'Ingeniera de Red Eléctrica', lines: ['El sol y el viento ya generan buena parte de nuestra electricidad.'] },
    merc14: { name: 'Supermercado 24 h', lines: ['¡Aceptamos tarjeta, móvil y euros!'] },
    jovem: { name: 'Joven del 15-M', lines: ['¡No somos mercancía en manos de políticos y banqueros!'] },
    torcedor: { name: 'Aficionado de la Selección', lines: ['¡Iniesta, minuto 116! Lloré como un niño.'] },
    voluntaria: { name: 'Voluntaria de la DANA', lines: ['Miles de jóvenes fueron a pie hasta los pueblos inundados, con palas y escobas.'] },
    enfermeira: { name: 'Enfermera Lucía', lines: ['A las ocho de la tarde, todo el país aplaudía desde los balcones.'] },
    rei2: { name: 'Rey Felipe VI', lines: ['El rey reina, pero no gobierna. Quien gobierna lo elige el Congreso.'] }
  },
  codex: {
    euro: { title: 'De la peseta al euro', text: 'El 1 de enero de 2002, las monedas y billetes de euro entraron en circulación, y la peseta, creada en 1868, se despidió. En los años noventa y dos mil, España creció con rapidez, recibió a millones de inmigrantes y construyó una de las mayores redes de tren de alta velocidad del mundo.' },
    '11m': { title: '11 de marzo de 2004', text: 'El 11 de marzo de 2004, bombas colocadas por terroristas yihadistas explotaron en cuatro trenes de Cercanías de Madrid, matando a casi 200 personas e hiriendo a unas dos mil. Fue el peor atentado de la historia de España. Al día siguiente, millones de personas se manifestaron en silencio.' },
    crise: { title: 'La crisis de 2008 y el 15-M', text: 'Cuando estalló la burbuja inmobiliaria en 2008, miles de obras se pararon, hubo que rescatar bancos y el paro superó el 25% en 2012, más del 50% entre los jóvenes. El 15 de mayo de 2011, miles de jóvenes acamparon en la Puerta del Sol: nacía el movimiento 15-M, de los «indignados».' },
    felipe6: { title: 'Un nuevo rey', text: 'En junio de 2014, Juan Carlos I abdicó, y su hijo fue proclamado rey como Felipe VI el 19 de junio. En la monarquía parlamentaria, el rey es el jefe del Estado, pero quien gobierna es el presidente del Gobierno, investido por el Congreso de los Diputados.' },
    direitos: { title: 'Derechos y debates', text: 'En 2005, España fue el tercer país del mundo en legalizar el matrimonio entre personas del mismo sexo. En 2017, el gobierno catalán celebró un referéndum de independencia declarado ilegal por el Tribunal Constitucional, lo que llevó a la aplicación del artículo 155 de la Constitución y a un intenso debate político que continúa hoy.' },
    covid: { title: 'La pandemia de 2020', text: 'El 14 de marzo de 2020, el gobierno decretó el estado de alarma por la pandemia de COVID-19. Durante semanas, la gente solo podía salir de casa para lo esencial. Todas las noches, a las 20 h, la población aplaudía desde los balcones a los profesionales sanitarios.' },
    dana: { title: 'La DANA de 2024 y el apagón de 2025', text: 'El 29 de octubre de 2024, unas lluvias torrenciales (una DANA) provocaron inundaciones devastadoras en la provincia de Valencia, con más de 220 muertos. Miles de voluntarios ayudaron en la limpieza. El 28 de abril de 2025, un apagón dejó sin electricidad durante horas a casi toda la península ibérica.' }
  },
  quests: {
    main: { title: 'El camino a la Moncloa', steps: [
      { desc: 'Habla con la mentora Carmen en Lavapiés', say: [
        ['mentora', '{nome}, ¿así que quieres entrar en política? Primero, entiende lo que ha vivido la gente.'],
        ['mentora', '2008. Estalló la burbuja inmobiliaria. Obras abandonadas por todas partes, familias sin casa y sin trabajo.'],
        ['mentora', 'Las burbujas siguen en las obras paradas. ¡Reviéntalas! Usa el megáfono: haz clic para hablar.']] },
      { desc: 'Revienta 10 burbujas inmobiliarias en las obras paradas' },
      { desc: 'Enfréntate a la Gran Recesión en la Bolsa de Madrid', intro: [['N', 'El panel de la Bolsa se pone rojo. ¡La Gran Recesión toma forma!']], done: [['N', 'La crisis fue larga: el paro superó el 25% en 2012. La recuperación llevó años.']] },
      { desc: 'Habla con el joven del 15-M en la Puerta del Sol', say: [
        ['jovem', 'Mayo de 2011. Llevamos días acampados aquí. No queremos violencia, queremos que nos escuchen.'],
        ['jovem', 'Si algún día llegas al Gobierno, acuérdate de nosotros. No somos números, somos personas.']] },
      { desc: 'Vuelve con la mentora Carmen', say: [
        ['N', 'Marzo de 2020.'],
        ['mentora', 'Un virus ha parado el mundo. Estado de alarma, calles vacías, hospitales llenos.'],
        ['mentora', 'El hospital necesita mascarillas. ¡Llévaselas!']] },
      { desc: 'Lleva 6 cajas de mascarillas al hospital', item: 'Caja de mascarillas' },
      { desc: 'Habla con la enfermera Lucía', say: [
        ['enfermeira', 'Gracias. Hacemos turnos de 24 horas. A las ocho de la tarde oímos los aplausos desde los balcones, y eso nos da fuerzas.'],
        ['enfermeira', 'El barrio de al lado está en cuarentena y el virus se propaga. ¡Ayuda a contener el contagio!']] },
      { desc: 'Contén 10 focos de virus en el barrio en cuarentena' },
      { desc: 'Octubre de 2024: limpia 6 montones de barro de la DANA en Valencia', done: [['N', 'A tu lado, miles de voluntarios con botas y palas. Una generación entera acudió a ayudar.']] },
      { desc: 'Vuelve con la mentora Carmen', say: [
        ['mentora', 'Has estado donde el país te necesitaba. Ahora toca la campaña.'],
        ['mentora', 'Pero cuidado: el centro de datos está lleno de bots que difunden mentiras. Primero, la verdad.']] },
      { desc: 'Desmonta 10 bots de desinformación' },
      { desc: 'Vence a la Polarización en el Gran Debate', intro: [['N', 'En el Gran Debate, una criatura alimentada por gritos e insultos intenta dividir el país en dos.']], done: [['N', 'No ganaste gritando más fuerte. Ganaste escuchando y convenciendo a quienes pensaban distinto.']] },
      { desc: 'Ve al Palacio de la Zarzuela', say: [
        ['rei2', 'Tras consultar con todos los grupos parlamentarios, te propongo como candidato a la Presidencia del Gobierno.'],
        ['N', 'Días después, el Congreso de los Diputados te otorgó su confianza en la votación de investidura.'],
        ['rei2', '¿Juras o prometes por tu conciencia y honor cumplir fielmente las obligaciones del cargo de presidente del Gobierno, con lealtad al Rey, guardar y hacer guardar la Constitución como norma fundamental del Estado?'],
        ['H', 'Prometo. Por mi conciencia y honor.'],
        ['N', 'Sobre la mesa, junto a la Constitución, un viejo amuleto de hueso con la figura de un bisonte.']] }
    ] },
    s1: { title: 'El apagón', steps: [
      { desc: 'Habla con la ingeniera de Red Eléctrica', say: [['engenheira', '28 de abril de 2025: ¡toda la Península se ha quedado sin luz! Necesito cinco piezas de repuesto del centro de datos.']] },
      { desc: 'Recoge 5 piezas en el centro de datos', item: 'Pieza del generador' },
      { desc: 'Entrega las piezas', say: [['engenheira', '¡Ha vuelto la luz! La gente pasó la tarde en la calle, escuchando la radio a pilas. Fue casi bonito.']] }
    ] },
    s2: { title: 'Campeones del mundo', steps: [
      { desc: 'Habla con el aficionado', say: [['torcedor', '¡Si aciertas mis preguntas, te invito a un café!']] },
      { desc: 'Responde al aficionado', qs: [
        { q: '¿En qué año sustituyó el euro a la peseta en la calle?', o: ['1992', '1999', '2002', '2008'], a: 2 },
        { q: '¿Quién marcó el gol de la final del Mundial de 2010?', o: ['Raúl', 'Iniesta', 'Fernando Torres', 'David Villa'], a: 1 },
        { q: '¿En qué año fue proclamado rey Felipe VI?', o: ['2004', '2011', '2014', '2020'], a: 2 }
      ] }
    ] },
    s3: { title: 'Palas y escobas', steps: [
      { desc: 'Habla con la voluntaria de la DANA', say: [['voluntaria', '¡Siguen faltando herramientas en Valencia! Recoge seis palas abandonadas allí y entrégalas a los equipos.']] },
      { desc: 'Recoge 6 palas en Valencia', item: 'Pala' },
      { desc: 'Vuelve con la voluntaria', say: [['voluntaria', 'Nadie nos llamó. Fuimos porque eran nuestros vecinos. Eso también es España.']] }
    ] }
  }
};
