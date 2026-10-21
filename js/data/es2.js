// Traducción al español (España): capítulos 6–10.
'use strict';

ES_CHAPTERS.c6 = {
  title: 'El Cid y la frontera', years: '1031 – 1248', currency: 'maravedíes',
  intro: [
    'Con el fin del Califato en 1031, al-Ándalus se rompió en decenas de reinos de taifas. Ricos pero débiles, muchos empezaron a pagar «parias», tributos en oro, a los reyes cristianos a cambio de protección.',
    'En esa frontera de guerras, alianzas y comercio surgió el caballero más famoso de la España medieval: Rodrigo Díaz de Vivar, llamado «Cid» (del árabe sayyid, «señor»).',
    'Año 1081. Eres {nome}, caballero de Castilla y vasallo del Cid. El rey Alfonso VI acaba de desterrarlo del reino.'
  ],
  outro: [
    'La victoria de Las Navas de Tolosa (1212) abrió el camino del sur. Fernando III conquistó Córdoba en 1236 y Sevilla en 1248. Jaime I de Aragón tomó Mallorca (1229) y Valencia (1238).',
    'Solo sobrevivió el Reino nazarí de Granada, pagando tributos a Castilla. Aún duraría dos siglos y medio más.',
    'El rey Alfonso X el Sabio hizo del castellano una lengua de ciencia y de leyes. Las escuelas de traductores de Toledo difundieron por Europa la ciencia árabe y griega.'
  ],
  places: { vivar: 'Vivar', estrada: 'Camino del Destierro', toledo: 'Toledo', serra: 'Sierra Morena', cerco: 'Alrededores de Valencia', valencia: 'Valencia', navas: 'Las Navas de Tolosa' },
  npcs: {
    cid: { name: 'Rodrigo Díaz, el Cid', lines: ['¡Dios, qué buen vasallo, si tuviese buen señor!', 'Babieca es el mejor caballo de Castilla.'] },
    jogral: { name: 'Juglar Per Abbat', lines: ['Canto las hazañas de los caballeros de plaza en plaza.'] },
    peregrino: { name: 'Peregrino Aimeric', lines: ['He venido a pie desde Francia. Aún me quedan semanas hasta Compostela.'] },
    tradutor: { name: 'Gerardo de Cremona', lines: ['Vine de Italia solo para aprender árabe y traducir a Ptolomeo.'] },
    ezra: { name: 'Abraham ibn Ezra', lines: ['Poeta, astrónomo, viajero... en Toledo todo saber es bienvenido.'] },
    alfonso8: { name: 'Rey Alfonso VIII', lines: ['Todos los reinos cristianos se han reunido en Toledo. Esto nunca había pasado.'] },
    merc6: { name: 'Mercader Isaac', lines: ['Pagamos en maravedíes, la moneda de oro que hasta los cristianos copiaron.'] },
    jimena: { name: 'Doña Jimena', lines: ['Valencia ahora es nuestra. Pero ¿por cuánto tiempo?'] }
  },
  codex: {
    taifa: { title: 'Taifas y parias', text: 'Después de 1031, al-Ándalus se fragmentó en reinos de taifas (Sevilla, Toledo, Zaragoza, Badajoz, Granada...). Culturalmente brillantes pero militarmente débiles, muchos pagaban «parias» —tributos anuales en oro— a los reyes de Castilla, León y Aragón.' },
    tol85: { title: 'La conquista de Toledo (1085)', text: 'En 1085, Alfonso VI de León y Castilla tomó Toledo, la antigua capital visigoda. Fue un hito: por primera vez una gran ciudad de al-Ándalus pasaba a dominio cristiano. Asustadas, las taifas pidieron ayuda a los almorávides del norte de África.' },
    trad: { title: 'La Escuela de Traductores', text: 'En los siglos XII y XIII, en Toledo, sabios judíos, musulmanes y cristianos tradujeron del árabe al latín (y después al castellano) obras de Aristóteles, Ptolomeo, Avicena y Averroes. Por ese camino, buena parte de la ciencia antigua volvió a Europa.' },
    cid: { title: 'El Cid Campeador', text: 'Rodrigo Díaz de Vivar (c. 1048–1099) fue desterrado dos veces por Alfonso VI. Luchó junto a reyes cristianos y musulmanes y, en 1094, conquistó Valencia, donde gobernó hasta su muerte. Su vida inspiró el «Cantar de mio Cid», el gran poema épico en castellano. Su mujer, Jimena, defendió Valencia hasta 1102.' },
    almor: { title: 'Almorávides y almohades', text: 'Los almorávides, llegados del Sáhara, vencieron a Alfonso VI en Sagrajas (1086) y unificaron al-Ándalus. En el siglo XII fueron sustituidos por los almohades, que hicieron de Sevilla su capital y levantaron la Giralda, el antiguo alminar de la gran mezquita.' },
    navas: { title: 'Las Navas de Tolosa (1212)', text: 'El 16 de julio de 1212, los reyes de Castilla, Aragón y Navarra derrotaron al califa almohade Muhammad al-Nasir. Según la tradición, Sancho VII de Navarra rompió las cadenas que protegían la tienda del califa, que estarían todavía hoy en el escudo de Navarra.' },
    fern3: { title: 'Fernando III y Alfonso X', text: 'Fernando III conquistó Córdoba (1236) y Sevilla (1248). Su hijo Alfonso X el Sabio impulsó el castellano como lengua de cultura y mandó componer las Cantigas de Santa María, las Tablas alfonsíes de astronomía y el código de las Siete Partidas.' }
  },
  quests: {
    main: { title: 'El cantar del caballero', steps: [
      { desc: 'Habla con el Cid en Vivar', say: [
        ['cid', '{nome}, el rey Alfonso me ha desterrado. Tenemos nueve días para salir de Castilla.'],
        ['cid', 'Quien me sea leal vendrá conmigo. Los bandidos infestan el camino. ¡Abre paso a nuestra mesnada!']] },
      { desc: 'Derrota a 6 bandidos en el Camino del Destierro' },
      { desc: 'Sigue hasta Toledo', say: [['N', 'Pasan los años. En 1085, Alfonso VI conquista Toledo, la vieja capital de los godos. La ciudad bulle de sabios de tres religiones.']] },
      { desc: 'Habla con el traductor Gerardo de Cremona', say: [
        ['tradutor', 'Aquí traducimos del árabe al latín todo lo que sabían los antiguos: astronomía, medicina, matemáticas...'],
        ['tradutor', 'Asaltaron una caravana y se perdieron manuscritos árabes por la ciudad. ¿Me ayudas a recuperarlos?']] },
      { desc: 'Recupera 5 manuscritos árabes en Toledo', item: 'Manuscrito árabe' },
      { desc: 'Entrega los manuscritos', say: [
        ['tradutor', '¡El Almagesto de Ptolomeo! Gracias a ti, Europa volverá a estudiar las estrellas.'],
        ['tradutor', 'He oído que tu señor, el Cid, asedia Valencia. Los almorávides marchan a enfrentarse a él.']] },
      { desc: 'Derrota a 8 guerreros almorávides cerca de Valencia', done: [['N', 'En 1094 el Cid conquistó Valencia y derrotó al ejército almorávide en Cuarte.']] },
      { desc: 'Habla con doña Jimena en Valencia', say: [
        ['jimena', 'Rodrigo murió en 1099. Dicen que lo atamos muerto sobre Babieca para asustar al enemigo... es solo una leyenda, pero a la gente le encanta contarla.'],
        ['jimena', 'He defendido Valencia tres años. Ahora, en 1102, volveremos a Castilla y llevaremos su cuerpo a San Pedro de Cardeña.'],
        ['N', 'Pasó más de un siglo. Año 1212. Un descendiente tuyo, también llamado {nome}, es convocado en Toledo.']] },
      { desc: 'Preséntate al rey Alfonso VIII en Toledo', say: [
        ['alfonso8', 'Los almohades nos derrotaron en Alarcos hace diecisiete años. Ahora Castilla, Aragón y Navarra marchan juntos.'],
        ['alfonso8', 'Los pasos de Sierra Morena están tomados por arqueros y jinetes almohades. ¡Abre camino!']] },
      { desc: 'Derrota a 5 arqueros almohades en Sierra Morena' },
      { desc: 'Derrota a 4 jinetes almohades en Sierra Morena', done: [['N', 'Un pastor mostró al ejército un paso secreto por la sierra. El camino a Las Navas está abierto.']] },
      { desc: 'Rompe la Guardia de las Cadenas en Las Navas de Tolosa', intro: [['N', 'Ante la tienda del califa, una guardia encadenada forma una muralla viva.']] },
      { desc: 'Vuelve a Toledo y habla con Alfonso VIII', say: [
        ['alfonso8', '¡Victoria! Las cadenas se han roto y el camino al sur está abierto.'],
        ['alfonso8', 'Mis nietos verán a Córdoba y Sevilla volver a ser cristianas. Ve con Dios, {nome}.']] }
    ] },
    s1: { title: 'La concha del peregrino', steps: [
      { desc: 'Habla con el peregrino Aimeric', say: [['peregrino', 'Los bandidos se llevaron las conchas de vieira que llevaba para mis hermanos peregrinos. Son cinco.']] },
      { desc: 'Recupera 5 conchas de vieira en el Camino', item: 'Concha de vieira' },
      { desc: 'Devuelve las conchas', say: [['peregrino', 'La vieira es el símbolo del Camino de Santiago. ¡Que el apóstol te proteja!']] }
    ] },
    s2: { title: 'El astrolabio', steps: [
      { desc: 'Habla con Abraham ibn Ezra', say: [['ezra', 'Mi astrolabio se desmontó en el viaje. Cuatro piezas cayeron en Sierra Morena.']] },
      { desc: 'Recoge 4 piezas de astrolabio en Sierra Morena', item: 'Pieza de astrolabio' },
      { desc: 'Lleva las piezas a ibn Ezra', say: [['ezra', 'Con él medimos la altura de las estrellas y sabemos la hora y el lugar. Es ciencia árabe, griega y judía en una sola pieza de bronce.']] }
    ] },
    s3: { title: 'Lobos del destierro', steps: [
      { desc: 'Habla con el juglar Per Abbat', say: [['jogral', '¿Quieres salir en mi cantar? Pues aleja a los lobos del Camino del Destierro: ¡seis!']] },
      { desc: 'Aleja a 6 lobos del Camino del Destierro' },
      { desc: 'Vuelve con el juglar', say: [['jogral', '«Allí venía {nome}, el que en buena hora nació...» ¡Listo, ya sales en mi cantar!']] }
    ] },
    s4: { title: 'El Cantar de mio Cid', steps: [
      { desc: 'Habla con el juglar sobre el Cantar', say: [['jogral', 'Un buen caballero conoce las hazañas de su tiempo. ¡Respóndeme!']] },
      { desc: 'Responde al juglar', qs: [
        { q: '¿En qué año conquistó Alfonso VI Toledo?', o: ['711', '1085', '1212', '1492'], a: 1 },
        { q: '¿Qué ciudad conquistó el Cid en 1094?', o: ['Valencia', 'Granada', 'Sevilla', 'Zaragoza'], a: 0 },
        { q: '¿Cómo se llamaba el caballo del Cid?', o: ['Rocinante', 'Babieca', 'Bucéfalo', 'Marengo'], a: 1 }
      ] }
    ] }
  }
};

ES_CHAPTERS.c7 = {
  title: 'Los Reyes Católicos', years: '1469 – 1516', currency: 'maravedíes',
  intro: [
    'En 1469, Isabel, heredera de Castilla, se casó en secreto con Fernando, heredero de Aragón. Sus reinos siguieron separados, con leyes propias, pero pasaron a tener los mismos reyes.',
    'En 1482 empezó la guerra de Granada contra el último reino musulmán de la Península. Fue una guerra nueva: artillería, pólvora y soldados armados con espingardas.',
    'Eres {nome}, espingardero al servicio de un joven capitán llamado Gonzalo Fernández de Córdoba.'
  ],
  outro: [
    '1492 lo cambió todo: Granada se rindió el 2 de enero; en marzo, los judíos que no se convirtieran fueron expulsados; en agosto, Colón zarpó de Palos; y Nebrija publicó la primera gramática del castellano.',
    'En 1494, el Tratado de Tordesillas repartió el mundo entre Castilla y Portugal; por esa línea, Brasil acabó siendo portugués.',
    'Gonzalo, el «Gran Capitán», venció a los franceses en Italia (Ceriñola, 1503), en una de las primeras batallas decididas por armas de fuego. El arte de la guerra nunca volvería a ser el mismo, y el linaje de {nome} cambió con él.'
  ],
  places: { santafe: 'Campamento de Santa Fe', loja: 'Frontera de Loja', malaga: 'Murallas de Málaga', vega: 'Vega de Granada', alhambra: 'Alhambra', palos: 'Puerto de Palos' },
  npcs: {
    gonzalo: { name: 'Gonzalo Fernández de Córdoba', lines: ['Una espingarda bien usada vale más que diez lanzas.'] },
    isabel: { name: 'Reina Isabel I', lines: ['Tanto monta, monta tanto, Isabel como Fernando.'] },
    fernando: { name: 'Rey Fernando II', lines: ['Aragón mira al Mediterráneo; Castilla, al océano.'] },
    nebrija: { name: 'Antonio de Nebrija', lines: ['Siempre la lengua fue compañera del imperio.'] },
    merc7: { name: 'Vivandera Leonor', lines: ['¡Pólvora, pan y remedios para quien pueda pagarlos!'] },
    boabdil: { name: 'Boabdil, rey de Granada', lines: ['Este palacio tardó dos siglos en quedar así.'] },
    colombo: { name: 'Cristóbal Colón', lines: ['La Tierra es redonda. ¡Navegando hacia el oeste llegaré a las Indias!'] },
    pinzon: { name: 'Martín Alonso Pinzón', lines: ['Sin los marineros de Palos, el genovés no iría a ninguna parte.'] },
    abravanel: { name: 'Isaac Abravanel', lines: ['Mi familia vive en Sefarad desde hace siglos.'] }
  },
  codex: {
    boda: { title: 'La boda de 1469', text: 'Isabel de Castilla y Fernando de Aragón se casaron en Valladolid en 1469. Isabel fue proclamada reina en 1474, tras una guerra de sucesión, y Fernando heredó Aragón en 1479. Ambos reinos mantuvieron leyes e instituciones propias, pero la unión dinástica se considera el inicio de la España moderna.' },
    gran: { title: 'La guerra de Granada', text: 'Entre 1482 y 1492, Castilla conquistó el Reino nazarí de Granada ciudad a ciudad: Ronda, Loja, Málaga (1487, tras un asedio durísimo), Baza... La artillería fue decisiva contra las murallas. Para el asedio final, los reyes levantaron una ciudad campamento: Santa Fe.' },
    capit: { title: 'Las Capitulaciones de Granada', text: 'Gonzalo Fernández de Córdoba, que hablaba árabe, ayudó a negociar la rendición. Las Capitulaciones de 1491 garantizaban a los musulmanes conservar religión, leyes y costumbres. El 2 de enero de 1492, Boabdil entregó las llaves de la ciudad. Las promesas, sin embargo, no se cumplieron: en 1502 los musulmanes de Castilla fueron obligados a convertirse o marcharse.' },
    colon: { title: 'Colón y 1492', text: 'El 3 de agosto de 1492, Colón zarpó del puerto de Palos con la Pinta, la Niña y la Santa María, con marineros de la zona como los hermanos Pinzón. El 12 de octubre llegó a una isla de las Bahamas. Murió en 1506 creyendo haber llegado a Asia.' },
    sefar: { title: 'La expulsión de 1492', text: 'Por el Edicto de Granada (31 de marzo de 1492), los judíos de Castilla y Aragón tuvieron que elegir entre la conversión y el exilio. Decenas de miles partieron hacia Portugal, el norte de África, Italia y el Imperio otomano. Sus descendientes, los sefardíes, conservaron durante siglos el judeoespañol (ladino). En 2015, España aprobó una ley para facilitar la nacionalidad a los descendientes de sefardíes.' },
    tord: { title: 'El Tratado de Tordesillas', text: 'En 1494, en Tordesillas, Castilla y Portugal se repartieron las tierras por descubrir con una línea a 370 leguas al oeste de Cabo Verde: el lado oeste para Castilla y el este para Portugal. Por eso el este de Sudamérica, el futuro Brasil, quedó en manos portuguesas.' },
    ceri: { title: 'El Gran Capitán', text: 'En las guerras de Italia, Gonzalo Fernández de Córdoba combinó piqueros, rodeleros y arcabuceros en formaciones flexibles. En Ceriñola (1503), sus tiradores atrincherados derrotaron a la caballería francesa: una de las primeras grandes batallas europeas decididas por armas de fuego. De ahí nació el modelo de los futuros tercios.' }
  },
  quests: {
    main: { title: 'La llave de Granada', steps: [
      { desc: 'Habla con el capitán Gonzalo', say: [
        ['gonzalo', 'Esta es la guerra de la pólvora, {nome}. Apunta bien: tu espingarda dispara una vez y hay que recargarla (tecla R).'],
        ['gonzalo', 'La frontera de Loja está llena de soldados nazaríes y de jinetes, su caballería ligera. ¡Vamos!']] },
      { desc: 'Derrota a 6 soldados nazaríes en Loja' },
      { desc: 'Derrota a 4 jinetes en Loja' },
      { desc: 'Informa al rey Fernando', say: [
        ['fernando', 'Loja ha caído. Ahora, Málaga, el gran puerto del reino de Granada. Año 1487.'],
        ['fernando', 'El bastión de las murallas dispara cañones contra nuestro campamento. ¡Destrúyelo!']] },
      { desc: 'Destruye el Bastión de Málaga', intro: [['N', '¡El bastión despierta con un trueno de cañones!']], done: [['N', 'Málaga se rindió tras cuatro meses de asedio. El castigo a sus habitantes fue terrible.']] },
      { desc: 'Habla con la reina Isabel', say: [
        ['isabel', 'Hemos construido Santa Fe, una ciudad entera de piedra, para mostrar a Granada que no nos iremos.'],
        ['isabel', 'Los ballesteros nazaríes aún atacan en la Vega. Apártalos y Granada quedará aislada.']] },
      { desc: 'Derrota a 6 ballesteros en la Vega de Granada' },
      { desc: 'Vuelve con Gonzalo', say: [
        ['gonzalo', 'Hablo árabe y llevo tiempo negociando en secreto con los consejeros de Boabdil. Nadie quiere más sangre.'],
        ['gonzalo', 'Las Capitulaciones están firmadas. Lleva esta escolta hasta la Alhambra.']] },
      { desc: 'Reúnete con Boabdil en la Alhambra', say: [
        ['N', '2 de enero de 1492.'],
        ['boabdil', 'Estas son las llaves de la ciudad. Que los reyes cumplan lo que prometieron a mi pueblo.'],
        ['N', 'Cuenta la leyenda que, al mirar Granada por última vez, Boabdil suspiró, y su madre le dijo que lloraba como mujer lo que no supo defender como hombre. El lugar aún se llama «el Suspiro del Moro».']] },
      { desc: 'Viaja hasta el puerto de Palos', say: [['N', 'Agosto de 1492. En el puerto de Palos, tres barcos se preparan para un viaje que nadie sabe dónde terminará.']] },
      { desc: 'Habla con Cristóbal Colón', say: [
        ['colombo', '¡La reina ha financiado mi viaje! Navegando hacia el oeste llegaré a las Indias.'],
        ['colombo', '¿No quieres venir? ¿No? Pues algún día contarán que estuve en tierras que nadie en Castilla imaginaba.'],
        ['N', 'El 12 de octubre de 1492, Colón llegó a América. Nunca admitió que era un continente nuevo.']] }
    ] },
    s1: { title: 'La primera gramática', steps: [
      { desc: 'Habla con Antonio de Nebrija', say: [['nebrija', 'Estoy terminando la primera gramática de la lengua castellana. Pero antes, una prueba para ti.']] },
      { desc: 'Responde a Nebrija', qs: [
        { q: '¿En qué año cayó Granada, el último reino musulmán de la Península?', o: ['1469', '1492', '1516', '1588'], a: 1 },
        { q: '¿Qué tratado repartió las nuevas tierras entre Castilla y Portugal en 1494?', o: ['Utrecht', 'Tordesillas', 'Westfalia', 'Zamora'], a: 1 },
        { q: '¿De qué puerto zarpó Colón en agosto de 1492?', o: ['Barcelona', 'Lisboa', 'Palos', 'Génova'], a: 2 }
      ] }
    ] },
    s2: { title: 'El exilio sefardí', steps: [
      { desc: 'Habla con Isaac Abravanel', say: [
        ['abravanel', 'Serví a los reyes como financiero. Aun así, el edicto nos obliga a marcharnos antes de que acabe julio.'],
        ['abravanel', 'Hay familias que han dejado sus pertenencias desperdigadas por el puerto. Ayúdalas a reunir cinco hatillos.']] },
      { desc: 'Reúne 5 hatillos en el puerto', item: 'Hatillo' },
      { desc: 'Vuelve con Abravanel', say: [
        ['abravanel', 'Muchos se llevan la llave de su casa, esperando volver algún día. Nuestros nietos seguirán hablando el castellano de Sefarad.'],
        ['N', 'Isaac Abravanel partió hacia Nápoles y después a Venecia, donde murió en 1508.']] }
    ] },
    s3: { title: 'Agua para las carabelas', steps: [
      { desc: 'Habla con Martín Alonso Pinzón', say: [['pinzon', 'Necesitamos agua dulce para meses de viaje. Los barriles se quedaron en la Vega. ¡Trae seis!']] },
      { desc: 'Trae 6 barriles de agua de la Vega', item: 'Barril de agua' },
      { desc: 'Entrega los barriles a Pinzón', say: [['pinzon', 'Yo mando la Pinta; mi hermano Vicente Yáñez, la Niña. ¡Ahora estamos listos!']] }
    ] },
    s4: { title: 'Los estandartes de Loja', steps: [
      { desc: 'Habla con el rey Fernando', say: [['fernando', 'Hemos perdido cuatro estandartes en la frontera de Loja. ¡Recupéralos!']] },
      { desc: 'Recupera 4 estandartes en Loja', item: 'Estandarte' },
      { desc: 'Devuelve los estandartes', say: [['fernando', 'Buen trabajo, soldado. Esto merece una recompensa.']] }
    ] }
  }
};

ES_CHAPTERS.c8 = {
  title: 'El Siglo de Oro', years: '1516 – 1700', currency: 'reales',
  intro: [
    'En 1516, el nieto de los Reyes Católicos, Carlos de Habsburgo, heredó Castilla, Aragón, los Países Bajos, Nápoles y las tierras de América. En 1519 fue elegido también emperador del Sacro Imperio: Carlos I de España y V de Alemania.',
    'Era el imperio «donde nunca se pone el sol». La plata de América llenaba Sevilla, y los tercios españoles eran la infantería más temida de Europa.',
    'Año 1570. Eres {nome}, arcabucero de un tercio, en Madrid, la villa que Felipe II eligió como capital en 1561.'
  ],
  outro: [
    'En 1588, la «Grande y Felicísima Armada» de Felipe II intentó invadir Inglaterra y fracasó, castigada por las tormentas y por la flota inglesa.',
    'El siglo XVII trajo crisis: guerras sin fin, epidemias, la independencia de Portugal (1640) y la derrota de Rocroi (1643). Pero fue también el Siglo de Oro de las artes: Cervantes, Lope de Vega, Calderón, Quevedo, Velázquez, Murillo y Zurbarán.',
    'En 1700 murió Carlos II, el último Habsburgo español, sin hijos. Su testamento dejó el trono a un nieto del rey de Francia, Luis XIV. Toda Europa entró en guerra por ello.'
  ],
  places: { madrid: 'Madrid', escorial: 'El Escorial', costa: 'Costa mediterránea', sevilha: 'Sevilla', frota: 'Flota otomana', lepanto: 'Golfo de Lepanto' },
  npcs: {
    sargento8: { name: 'Sargento Alonso de Contreras', lines: ['Un tercio tiene piqueros, arcabuceros y mosqueteros. Somos una muralla que camina.'] },
    velazquez: { name: 'Diego Velázquez', lines: ['Pinto lo que veo, no lo que esperan que vea.'] },
    lope: { name: 'Lope de Vega', lines: ['Ya he escrito cientos de comedias. ¡Quizá mil!'] },
    merc8: { name: 'Posada del Gallo', lines: ['Vino, pan y pociones. Pague en reales, por favor.'] },
    herrera: { name: 'Juan de Herrera', lines: ['El rey quiere un monasterio, un palacio y un panteón en un solo edificio. Sencillo, ¿no?'] },
    cervantes: { name: 'Miguel de Cervantes', lines: ['El que lee mucho y anda mucho, ve mucho y sabe mucho.'] },
    elcano: { name: 'Juan Sebastián Elcano', lines: ['Fui el primero en dar la vuelta al mundo. Bueno, yo y diecisiete más.'] },
    contratacao: { name: 'Oficial de la Casa de Contratación', lines: ['Todo barco que va o vuelve de las Indias pasa por aquí.'] }
  },
  codex: {
    carlos: { title: 'Carlos I y el imperio', text: 'Carlos I (1516–1556) reunió la herencia de cuatro dinastías: Castilla, Aragón, Borgoña y Habsburgo. Durante su reinado, Hernán Cortés conquistó el Imperio azteca (1521) y Francisco Pizarro, el inca (1532). Cansado, abdicó en 1556 y se retiró al monasterio de Yuste.' },
    comun: { title: 'Los comuneros (1520–1521)', text: 'Poco después de la llegada de Carlos I, varias ciudades de Castilla se rebelaron contra los impuestos y los consejeros extranjeros. Los comuneros fueron derrotados en Villalar (1521), y sus líderes Padilla, Bravo y Maldonado fueron ejecutados. La fecha, el 23 de abril, es hoy el día de Castilla y León.' },
    elcano: { title: 'La primera vuelta al mundo', text: 'En 1519, Fernando de Magallanes zarpó de Sevilla con cinco naves al servicio de España. Murió en Filipinas en 1521. Juan Sebastián Elcano asumió el mando y regresó a Sevilla en 1522 con una sola nave, la Victoria, y solo 18 supervivientes: la primera vuelta al mundo.' },
    felipe: { title: 'Felipe II y El Escorial', text: 'Felipe II (1556–1598) gobernó el mayor imperio del mundo, que desde 1580 incluyó Portugal y Brasil (la Unión Ibérica, hasta 1640). Mandó levantar El Escorial (1563–1584), monasterio, palacio y panteón real, proyectado por Juan Bautista de Toledo y terminado por Juan de Herrera.' },
    lepanto: { title: 'Lepanto (1571)', text: 'El 7 de octubre de 1571, la Santa Liga —España, Venecia y el papado—, al mando de don Juan de Austria, venció a la flota otomana en Lepanto, en Grecia. Fue una de las mayores batallas navales de la historia. Miguel de Cervantes luchó en ella y perdió la movilidad de la mano izquierda.' },
    armada: { title: 'La Gran Armada (1588)', text: 'En 1588, Felipe II envió unos 130 barcos para invadir la Inglaterra de Isabel I. La flota fue atacada en el canal de la Mancha y dispersada por las tormentas al rodear Escocia e Irlanda. Los ingleses la apodaron con ironía «Armada Invencible».' },
    ouro: { title: 'El Siglo de Oro', text: 'Entre los siglos XVI y XVII, España vivió un apogeo artístico. Don Quijote (1605 y 1615), de Cervantes, se considera la primera novela moderna. Lope de Vega revolucionó el teatro, Calderón escribió «La vida es sueño» y Velázquez pintó «Las Meninas» (1656), hoy en el Museo del Prado.' }
  },
  quests: {
    main: { title: 'Donde nunca se pone el sol', steps: [
      { desc: 'Preséntate al sargento Contreras en Madrid', say: [
        ['sargento8', '¡Arcabucero {nome}! El rey Felipe II no para de construir. Ve a El Escorial: el maestro Herrera quiere escolta para sus carretas.']] },
      { desc: 'Habla con Juan de Herrera en El Escorial', say: [
        ['herrera', 'Las obras van bien: un monasterio, un palacio, una biblioteca y el panteón de los reyes.'],
        ['herrera', 'Pero los corsarios berberiscos han vuelto a atacar la costa para llevarse gente y venderla como esclava en Argel. El rey quiere la costa limpia.']] },
      { desc: 'Expulsa a 8 corsarios de la costa' },
      { desc: 'Habla con el soldado Cervantes en Sevilla', say: [
        ['cervantes', 'Miguel de Cervantes, soldado como tú. También escribo algunos versos, pero no se lo digas a nadie.'],
        ['cervantes', 'La Santa Liga está reuniendo una flota contra los otomanos. ¿Vamos juntos? Primero, ¡los jenízaros han desembarcado al este!']] },
      { desc: 'Derrota a 6 jenízaros arcabuceros' },
      { desc: 'Derrota a 5 corsarios de la flota otomana', done: [['N', '7 de octubre de 1571. Las flotas se encuentran en el golfo de Lepanto.']] },
      { desc: 'Enfréntate al comandante jenízaro en Lepanto', intro: [['N', '¡En la cubierta de la galera capitana, el comandante jenízaro desenvaina la espada!']] },
      { desc: 'Vuelve a Sevilla y busca a Cervantes', say: [
        ['cervantes', '¡Hemos vencido! Me llevé dos tiros en el pecho y uno en la mano izquierda. Ya no la muevo... «para mayor gloria de la diestra», como yo digo.'],
        ['N', 'A la vuelta, en 1575, Cervantes fue capturado por corsarios y pasó cinco años cautivo en Argel. Intentó escapar cuatro veces.'],
        ['cervantes', 'Años después, aquí en Sevilla, trabajo cobrando impuestos... y escribiendo. Vuelve a Madrid, alguien te necesita.']] },
      { desc: 'Vuelve con el sargento Contreras en Madrid', say: [
        ['N', '1605. La Gran Armada ya ha fracasado (1588), y Felipe II ha muerto (1598).'],
        ['sargento8', '¡Viejo amigo! Un impresor de Madrid ha perdido por las calles las pruebas de un libro nuevo. Algo sobre un hidalgo loco que lucha contra molinos de viento.']] },
      { desc: 'Recoge 6 páginas del Quijote por las calles de Madrid', item: 'Página del Quijote' },
      { desc: 'Lleva las páginas a Cervantes en Sevilla', say: [
        ['cervantes', '«En un lugar de la Mancha, de cuyo nombre no quiero acordarme...» ¡Son mis páginas! ¡El ingenioso hidalgo don Quijote!'],
        ['cervantes', 'Gracias, viejo compañero de Lepanto. Este libro dará la vuelta al mundo. O, por lo menos, me pagará algunas deudas.']] }
    ] },
    s1: { title: 'Los colores de Velázquez', steps: [
      { desc: 'Habla con Diego Velázquez', say: [
        ['N', 'Décadas después, hacia 1656...'],
        ['velazquez', 'Estoy pintando a la infanta Margarita con sus damas, las «meninas». Me faltan cinco pigmentos raros, guardados en El Escorial.']] },
      { desc: 'Busca 5 pigmentos en El Escorial', item: 'Pigmento' },
      { desc: 'Lleva los pigmentos a Velázquez', say: [['velazquez', 'Me pintaré a mí mismo en el cuadro, con el pincel en la mano. Y los reyes solo aparecerán en un espejo. Nadie lo entenderá... y todos lo mirarán.']] }
    ] },
    s2: { title: 'La vuelta al mundo', steps: [
      { desc: 'Habla con Elcano', say: [['elcano', 'Salimos 239 hombres y volvimos 18. ¿Sabes qué aprendí? Que el mundo es enorme. Veamos qué sabes tú.']] },
      { desc: 'Responde a Elcano', qs: [
        { q: '¿Quién completó la primera vuelta al mundo en 1522, tras la muerte de Magallanes?', o: ['Colón', 'Elcano', 'Pizarro', 'Cortés'], a: 1 },
        { q: '¿En qué batalla de 1571 fue herido Cervantes?', o: ['Pavía', 'Lepanto', 'Rocroi', 'Trafalgar'], a: 1 },
        { q: '¿Qué monasterio palacio mandó construir Felipe II?', o: ['La Alhambra', 'El Escorial', 'Versalles', 'El Palacio Real'], a: 1 }
      ] }
    ] },
    s3: { title: 'La Flota de la Plata', steps: [
      { desc: 'Habla con el oficial de la Casa de Contratación', say: [['contratacao', 'La flota que trae la plata de Potosí está llegando, y hay corsarios en la costa. ¡Abate a seis!']] },
      { desc: 'Abate a 6 corsarios en la costa' },
      { desc: 'Vuelve a la Casa de Contratación', say: [['contratacao', 'La plata ha llegado. Lástima que la mitad ya se deba a banqueros genoveses... Toma tu parte.']] }
    ] },
    s4: { title: 'Las comedias de Lope', steps: [
      { desc: 'Habla con Lope de Vega', say: [['lope', '¡El viento se ha llevado las hojas de mi comedia nueva hasta Sevilla! Son cinco. ¡El estreno es mañana!']] },
      { desc: 'Encuentra 5 hojas de comedia en Sevilla', item: 'Hoja de comedia' },
      { desc: 'Devuelve las hojas a Lope', say: [['lope', '¡Has salvado el estreno! Cervantes me llamó «monstruo de naturaleza», de tanto que escribo. Creo que fue un elogio.']] }
    ] }
  }
};

ES_CHAPTERS.c9 = {
  title: 'Los Borbones y la guerra de la Independencia', years: '1700 – 1814', currency: 'reales',
  intro: [
    'La guerra de Sucesión (1701–1714) puso en el trono a Felipe V, el primer Borbón. España perdió territorios en Europa y Gibraltar pasó a Gran Bretaña.',
    'En el siglo XVIII, reyes «ilustrados» como Carlos III modernizaron Madrid y el país. Pero en 1808 Napoleón invadió España y colocó en el trono a su propio hermano, José Bonaparte.',
    'Madrid, 2 de mayo de 1808. Eres {nome}. El pueblo está en la calle, y el amuleto de hueso de tus antepasados pesa en tu pecho.'
  ],
  outro: [
    'Con la ayuda británica de Wellington, los españoles expulsaron a los franceses en 1814. Pero Fernando VII volvió al trono, abolió la Constitución de Cádiz y persiguió a los liberales.',
    'El siglo XIX sería una lucha constante entre absolutistas y liberales, entre tradición y cambio.',
    'Mientras tanto, la América española, aprovechando el caos, empezó su propia guerra de independencia. Un descendiente de {nome} vestiría el uniforme azul del ejército.'
  ],
  places: { madrid: 'Madrid', monteleon: 'Parque de Monteleón', bailen: 'Bailén', zaragoza: 'Zaragoza', cerco: 'Sitio de Zaragoza', cadiz: 'Cádiz', campo: 'Campo de batalla' },
  npcs: {
    daoiz: { name: 'Capitán Luis Daoíz', lines: ['Un oficial jura defender a su pueblo.'] },
    goya: { name: 'Francisco de Goya', lines: ['Me estoy quedando sordo, pero mis ojos lo ven todo.', 'El sueño de la razón produce monstruos.'] },
    clara: { name: 'Clara del Rey', lines: ['¡Nadie se va a llevar a nuestro infante!'] },
    empecinado: { name: 'Juan Martín, «el Empecinado»', lines: ['Guerrilla: pequeña guerra. Atacamos y desaparecemos.'] },
    merc9: { name: 'Tabernera Manolita', lines: ['En tiempos de guerra, las pociones suben de precio. ¡Lo siento!'] },
    agustina: { name: 'Agustina de Aragón', lines: ['¡Zaragoza no se rinde!'] },
    arguelles: { name: 'Diputado Agustín de Argüelles', lines: ['La nación española es la reunión de todos los españoles de ambos hemisferios.'] },
    marinheiro: { name: 'Viejo marinero de Trafalgar', lines: ['Yo estaba en el Santísima Trinidad, el barco más grande del mundo, cuando se hundió.'] }
  },
  codex: {
    suc: { title: 'La guerra de Sucesión', text: 'A la muerte de Carlos II (1700), Felipe de Borbón, nieto de Luis XIV, fue coronado como Felipe V. Austria, Inglaterra y Holanda apoyaron al archiduque Carlos, y la guerra se prolongó hasta 1714. Barcelona cayó el 11 de septiembre de 1714, hoy la Diada, fiesta nacional de Cataluña. Los Decretos de Nueva Planta abolieron las instituciones propias de Aragón, Valencia y Cataluña.' },
    gib: { title: 'Utrecht y Gibraltar', text: 'Por el Tratado de Utrecht (1713), España perdió los Países Bajos, Milán, Nápoles y Sicilia, y cedió Gibraltar y Menorca a Gran Bretaña. Menorca volvió a España en 1802. Gibraltar sigue siendo británico hasta hoy.' },
    c3: { title: 'Carlos III, el rey «ilustrado»', text: 'Carlos III (1759–1788), conocido como «el mejor alcalde de Madrid», iluminó y limpió las calles y levantó la Puerta de Alcalá y el edificio que hoy es el Museo del Prado (pensado al principio para las ciencias naturales). Expulsó a los jesuitas en 1767 e impulsó reformas económicas.' },
    traf: { title: 'Trafalgar (1805)', text: 'El 21 de octubre de 1805, la escuadra británica de Nelson destruyó la flota franco-española frente al cabo Trafalgar, cerca de Cádiz. Nelson murió en la batalla, al igual que los comandantes españoles Churruca y Gravina (este, meses después, por las heridas). España perdió buena parte de su marina.' },
    dosmayo: { title: 'El Dos de Mayo de 1808', text: 'El 2 de mayo de 1808, el pueblo de Madrid se levantó contra las tropas francesas. En el cuartel de Monteleón, los capitanes Luis Daoíz y Pedro Velarde resistieron hasta la muerte. La represión fue brutal, con fusilamientos el 3 de mayo. Goya pintó esos días en dos cuadros famosos, hoy en el Prado.' },
    bailen: { title: 'Bailén y Zaragoza', text: 'En julio de 1808, en Bailén, el general Castaños obligó al general Dupont a rendirse: fue la primera derrota en campo abierto de un ejército napoleónico. Zaragoza resistió dos sitios terribles (1808–1809). Agustina de Aragón se hizo famosa por disparar un cañón contra los franceses cuando cayeron los artilleros.' },
    pepa: { title: 'La Constitución de Cádiz (1812)', text: 'Sitiados en Cádiz, diputados de España y de América aprobaron el 19 de marzo de 1812, día de San José, la primera constitución española, apodada «la Pepa». Proclamaba la soberanía nacional, la división de poderes y la libertad de imprenta, e influyó en constituciones de Portugal, Italia y América Latina.' }
  },
  quests: {
    main: { title: 'El pueblo en armas', steps: [
      { desc: 'Habla con el capitán Daoíz en Madrid', say: [
        ['daoiz', 'Los franceses quieren llevarse al último infante a Francia. ¡El pueblo se está levantando!'],
        ['daoiz', 'Velarde y yo vamos a defender el Parque de Artillería de Monteleón. ¡Ven, {nome}! Tu mosquete lleva dos balas antes de recargar.']] },
      { desc: 'Defiende Monteleón: derrota a 8 fusileros imperiales' },
      { desc: 'Habla con Francisco de Goya', say: [
        ['goya', 'Daoíz y Velarde han muerto en Monteleón. Esta noche los franceses han fusilado a decenas de madrileños en la montaña de Príncipe Pío.'],
        ['goya', 'Voy a pintar esto. El mundo tiene que ver lo que es la guerra. Ahora vete: dicen que el general Castaños prepara algo en el sur.']] },
      { desc: 'Ve a Bailén', say: [['N', 'Julio de 1808. Bajo un calor de 40 grados, el ejército del general Dupont está rodeado y sin agua.']] },
      { desc: 'Derrota a 5 dragones imperiales en Bailén', done: [['N', 'Dupont se rindió con unos 18.000 hombres. La noticia recorrió Europa: los ejércitos de Napoleón podían ser vencidos.']] },
      { desc: 'Ve a Zaragoza y habla con Agustina', say: [
        ['agustina', 'Los franceses han vuelto a sitiar la ciudad. Nuestros artilleros cayeron, ¡y yo misma disparé el cañón!'],
        ['agustina', 'Necesitamos pólvora. Hay barriles escondidos por la ciudad. ¡Trae cinco!']] },
      { desc: 'Encuentra 5 barriles de pólvora en Zaragoza', item: 'Barril de pólvora' },
      { desc: 'Rompe el sitio: derrota a 6 granaderos' },
      { desc: 'Derrota al coronel de los Dragones en el campo de batalla', intro: [['N', '¡El coronel de los Dragones carga al frente de su caballería!']] },
      { desc: 'Ve a Cádiz, la ciudad sitiada', say: [['N', '1812. Cádiz, protegida por el mar, es la única gran ciudad libre. Allí se reúnen las Cortes.']] },
      { desc: 'Habla con el diputado Argüelles', say: [
        ['arguelles', '¡Hoy, 19 de marzo de 1812, hemos aprobado la Constitución! La soberanía pertenece a la nación, y no al rey.'],
        ['arguelles', 'El pueblo la llama «la Pepa», porque hoy es San José. ¡Españoles, ya tenéis patria!'],
        ['N', 'La Constitución de Cádiz fue también la primera en declarar que los españoles de América tenían los mismos derechos que los de Europa.']] }
    ] },
    s1: { title: 'Los desastres de la guerra', steps: [
      { desc: 'Habla con Goya', say: [['goya', 'Estoy grabando escenas de la guerra en planchas de cobre. El viento ha esparcido cinco grabados por la ciudad.']] },
      { desc: 'Recoge 5 grabados de Goya en Madrid', item: 'Grabado' },
      { desc: 'Devuelve los grabados', say: [['goya', '«Los desastres de la guerra». Quizá solo se publiquen después de mi muerte. A veces la verdad tiene que esperar.']] }
    ] },
    s2: { title: 'La pequeña guerra', steps: [
      { desc: 'Habla con el Empecinado', say: [['empecinado', 'Los franceses controlan las ciudades, pero el campo es nuestro. ¡Tiende una emboscada a cinco granaderos en Monteleón!']] },
      { desc: 'Embosca a 5 granaderos en Monteleón' },
      { desc: 'Vuelve con el Empecinado', say: [['empecinado', '¡Así se hace! El mundo llamará a esto «guerrilla». La palabra es nuestra.']] }
    ] },
    s3: { title: 'Los heridos de mayo', steps: [
      { desc: 'Habla con Clara del Rey', say: [['clara', '¡Hay heridos por todas partes cerca de Monteleón! Llévales cinco vendas.']] },
      { desc: 'Lleva 5 vendas a Monteleón', item: 'Venda' },
      { desc: 'Vuelve con Clara', say: [['clara', 'Gracias. Mi marido y mis hijos están luchando en el parque. Que Dios los proteja.'], ['N', 'Clara del Rey murió aquel día defendiendo Monteleón. Una calle de Madrid lleva su nombre.']] }
    ] },
    s4: { title: 'Las historias del marinero', steps: [
      { desc: 'Habla con el viejo marinero', say: [['marinheiro', 'Siéntate, joven. Si sabes responder, pago yo el vino.']] },
      { desc: 'Responde al viejo marinero', qs: [
        { q: '¿Qué territorio cedió España a Gran Bretaña por el Tratado de Utrecht (1713) y nunca recuperó?', o: ['Menorca', 'Gibraltar', 'Ceuta', 'Malta'], a: 1 },
        { q: '¿Cuál es el apodo de la Constitución de Cádiz de 1812?', o: ['La Pepa', 'La Gloriosa', 'La Niña', 'La Chata'], a: 0 },
        { q: '¿En qué batalla de 1808 se rindió por primera vez en campo abierto un ejército de Napoleón?', o: ['Trafalgar', 'Bailén', 'Waterloo', 'Austerlitz'], a: 1 }
      ] }
    ] }
  }
};

ES_CHAPTERS.c10 = {
  title: 'El siglo convulso', years: '1814 – 1931', currency: 'pesetas',
  intro: [
    'Entre 1810 y 1825, casi toda la América española se independizó. En la Península, absolutistas y liberales se alternaban en el poder entre pronunciamientos, revoluciones y guerras civiles.',
    'En las sierras del sur, los bandoleros se convirtieron en leyendas populares, medio héroes, medio criminales.',
    'Año 1830. Eres {nome}, recluta del ejército, con el viejo amuleto de hueso escondido bajo el uniforme.'
  ],
  outro: [
    'El 14 de abril de 1931, tras unas elecciones municipales en las que los republicanos ganaron en las grandes ciudades, Alfonso XIII salió de España. Se proclamó la Segunda República.',
    'La República trajo grandes esperanzas: escuelas, reforma agraria, autonomía para Cataluña y voto femenino. Pero también afrontó crisis económicas, huelgas y violencia política de ambos lados.',
    'En julio de 1936, un golpe militar contra el gobierno de la República fracasó en buena parte del país. España se hundió en una guerra civil.'
  ],
  places: { madrid: 'Madrid', serra: 'Sierra Morena', despe: 'Desfiladero de Despeñaperros', norte: 'Montañas de Navarra', barcelona: 'Barcelona', ferrovia: 'Línea Barcelona–Mataró', porto: 'Muelle de los repatriados' },
  npcs: {
    mateo: { name: 'Sargento Mateo', lines: ['¡Firmes, recluta!'] },
    pimargall: { name: 'Francesc Pi i Margall', lines: ['Sueño con una república federal, construida de abajo arriba.'] },
    galdos: { name: 'Benito Pérez Galdós', lines: ['Estoy escribiendo la historia de España en forma de novelas: los Episodios nacionales.'] },
    carab: { name: 'Guardia de Carabineros', lines: ['¿Tabaco de Gibraltar sin impuestos? En mi camino, no.'] },
    merc10: { name: 'Almacén La Esperanza', lines: ['¡Pague en pesetas, la moneda nueva desde 1868!'] },
    engenheiro: { name: 'Ingeniero del ferrocarril', lines: ['El vapor lo va a cambiar todo. ¡Todo!'] },
    operaria: { name: 'Obrera Teresa', lines: ['Doce horas al día en el telar. Y los niños también trabajan.'] },
    repatriado: { name: 'Soldado repatriado', lines: ['Murieron más soldados de fiebre amarilla que de balas.'] },
    unamuno: { name: 'Miguel de Unamuno', lines: ['Me duele España.'] }
  },
  codex: {
    amer: { title: 'La independencia de América', text: 'Aprovechando la invasión napoleónica, las colonias americanas formaron juntas de gobierno a partir de 1810. Con líderes como Bolívar y San Martín, casi toda la América española se independizó hasta 1825. A España solo le quedaron Cuba, Puerto Rico y Filipinas.' },
    carl: { title: 'Las guerras carlistas', text: 'Cuando murió Fernando VII (1833), dejó el trono a su hija Isabel II, de solo tres años. Su hermano, Carlos María Isidro, reclamó la corona con el apoyo de los tradicionalistas, sobre todo en Navarra, el País Vasco y Cataluña. Hubo tres guerras carlistas, entre 1833 y 1876.' },
    band: { title: 'Los bandoleros', text: 'En el siglo XIX, Sierra Morena y las sierras de Andalucía eran tierra de bandoleros. El más famoso, José María Hinojosa, «el Tempranillo», fue indultado en 1832 y pasó a mandar una escuadra contra los propios bandoleros. La Guardia Civil se creó en 1844, en parte para acabar con ellos.' },
    ferro: { title: 'El tren y la industria', text: 'El primer ferrocarril de la península ibérica unió Barcelona con Mataró el 28 de octubre de 1848, gracias a la iniciativa de Miquel Biada, que murió meses antes de la inauguración. Cataluña se industrializó con el textil y el País Vasco, con el hierro y el acero.' },
    repub: { title: 'La Gloriosa y la Primera República', text: 'La revolución de 1868, «la Gloriosa», derrocó a Isabel II. Tras el breve reinado de Amadeo de Saboya, se proclamó la Primera República (1873), que tuvo cuatro presidentes en once meses: Figueras, Pi i Margall, Salmerón y Castelar. En 1874 se restauró la monarquía con Alfonso XII.' },
    n98: { title: 'El Desastre del 98', text: 'En 1898, tras la explosión del acorazado Maine en La Habana, Estados Unidos entró en guerra con España. En pocos meses, España perdió Cuba, Puerto Rico, Filipinas y Guam. La crisis inspiró a la «Generación del 98» —Unamuno, Machado, Baroja, Azorín, Valle-Inclán—, que reflexionó sobre la identidad española.' },
    plata: { title: 'La Edad de Plata y 1931', text: 'El comienzo del siglo XX fue una «Edad de Plata» cultural: Picasso, Dalí, Miró, Lorca, Buñuel, Ramón y Cajal (Nobel de Medicina en 1906). Pero también hubo crisis: la Semana Trágica (1909), el Desastre de Annual en Marruecos (1921) y la dictadura de Primo de Rivera (1923–1930). El 14 de abril de 1931 se proclamó la Segunda República.' }
  },
  quests: {
    main: { title: 'Entre tronos y repúblicas', steps: [
      { desc: 'Preséntate al sargento Mateo', say: [
        ['mateo', '¡Recluta {nome}! Tu fusil lleva cinco balas. Usa R para recargar cuando quieras.'],
        ['mateo', 'Primera misión: los bandoleros de Sierra Morena asaltan diligencias y correos. ¡Limpia los caminos!']] },
      { desc: 'Derrota a 6 bandoleros en Sierra Morena' },
      { desc: 'Derrota a 4 contrabandistas en Sierra Morena' },
      { desc: 'Enfréntate al «Tempranillo» en el desfiladero', intro: [['N', '«¡En la sierra mando yo, y en el resto de España, el rey!», grita el Tempranillo.']], done: [['N', 'Derrotado, el Tempranillo aceptó el indulto del rey en 1832 y pasó a perseguir bandoleros. Murió al año siguiente en una emboscada.']] },
      { desc: 'Vuelve con el sargento Mateo', say: [
        ['mateo', '1833. Ha muerto el rey Fernando VII. La reina Isabel II tiene tres años, y su tío Carlos dice que el trono es suyo.'],
        ['mateo', 'Los carlistas han tomado las montañas de Navarra. Es una guerra civil, recluta.']] },
      { desc: 'Derrota a 8 partidarios carlistas en Navarra' },
      { desc: 'Sigue hasta Barcelona', say: [['N', '1848. Barcelona es la ciudad de las fábricas. Chimeneas, telares de vapor y una novedad: el tren.']] },
      { desc: 'Habla con el ingeniero del ferrocarril', say: [
        ['engenheiro', 'Dentro de unos días inauguramos el primer ferrocarril de la Península: ¡Barcelona–Mataró! Pero falta carbón para la locomotora.'],
        ['engenheiro', 'Trae seis sacos de carbón del depósito de la línea.']] },
      { desc: 'Lleva 6 sacos de carbón de la línea férrea', item: 'Saco de carbón' },
      { desc: 'Vuelve con el ingeniero', say: [['engenheiro', '28 de octubre de 1848: ¡28 kilómetros en menos de una hora! El futuro ha llegado.']] },
      { desc: 'Ve a Madrid y habla con Pi i Margall', say: [
        ['N', '1873. Isabel II fue derrocada en 1868, el rey Amadeo renunció y ahora España es una república.'],
        ['pimargall', 'Soy el segundo presidente en pocos meses. Hay cantones que se declaran independientes, los carlistas han vuelto a las armas...'],
        ['pimargall', 'No duraré mucho en el cargo. Pero las ideas quedan. Ve al puerto: algún día entenderás lo que perdimos fuera.']] },
      { desc: 'Habla con el soldado repatriado en el muelle', say: [
        ['N', '1898.'],
        ['repatriado', 'Hemos perdido Cuba, Puerto Rico y Filipinas. Los barcos americanos destruyeron nuestra flota en días.'],
        ['repatriado', 'Volvemos flacos, enfermos, sin nada. Y Madrid sigue de fiesta como si no hubiera pasado nada.']] },
      { desc: 'Vuelve a Madrid', say: [
        ['N', '14 de abril de 1931. Tu descendiente, también llamado {nome}, está en la Puerta del Sol.'],
        ['mateo', '¡Soy nieto de aquel viejo sargento! El rey Alfonso XIII se ha ido. La gente canta en las calles: ¡es la República!'],
        ['mateo', 'Dicen que ahora todo va a cambiar. Rezo para que cambie en paz.']] }
    ] },
    s1: { title: 'Episodios nacionales', steps: [
      { desc: 'Habla con Benito Pérez Galdós', say: [['galdos', 'Escribo novelas sobre nuestra historia reciente. Ayúdame a comprobar algunos datos.']] },
      { desc: 'Responde a Galdós', qs: [
        { q: '¿Cuál fue el primer ferrocarril de la península ibérica (1848)?', o: ['Madrid–Aranjuez', 'Barcelona–Mataró', 'Sevilla–Cádiz', 'Bilbao–Santander'], a: 1 },
        { q: '¿En qué año perdió España Cuba, Puerto Rico y Filipinas?', o: ['1808', '1873', '1898', '1931'], a: 2 },
        { q: '¿Cuántos presidentes tuvo la Primera República en once meses?', o: ['Uno', 'Dos', 'Cuatro', 'Siete'], a: 2 }
      ] }
    ] },
    s2: { title: 'El algodón de Barcelona', steps: [
      { desc: 'Habla con la obrera Teresa', say: [['operaria', 'Si pierdo estas bobinas, me lo descuentan del sueldo. ¡Se han caído cinco del carro por la ciudad!']] },
      { desc: 'Recoge 5 bobinas de algodón en Barcelona', item: 'Bobina de algodón' },
      { desc: 'Devuelve las bobinas', say: [['operaria', '¡Gracias! Nos estamos organizando en sindicatos. Algún día tendremos la jornada de ocho horas.'], ['N', 'España fue uno de los primeros países en establecer la jornada de ocho horas, en 1919, tras la huelga de La Canadiense en Barcelona.']] }
    ] },
    s3: { title: 'Contrabando en la sierra', steps: [
      { desc: 'Habla con el guardia de Carabineros', say: [['carab', 'Los contrabandistas traen tabaco de Gibraltar por Sierra Morena. ¡Detén a seis!']] },
      { desc: 'Detén a 6 contrabandistas en la sierra' },
      { desc: 'Vuelve con el guardia', say: [['carab', 'Buen trabajo. Parte de lo incautado es tuyo, como manda la ley.']] }
    ] },
    s4: { title: 'La Generación del 98', steps: [
      { desc: 'Habla con Miguel de Unamuno', say: [['unamuno', 'El viento se ha llevado mis poemas y los de mis amigos —Machado, Baroja— por el muelle. Son cuatro hojas.']] },
      { desc: 'Recoge 4 hojas de poemas en el muelle', item: 'Hoja de poema' },
      { desc: 'Devuelve los poemas a Unamuno', say: [['unamuno', 'Hemos perdido un imperio y tenemos que encontrar un alma. Eso es lo que buscan estos versos.']] }
    ] }
  }
};
