/**
 * i18n.js — Internationalization for cuerposonoro.art
 * Languages: Spanish (default) / English
 * Usage: elements use data-i18n="key" attribute
 *        data-i18n-html="key" for innerHTML (allows <em> etc.)
 */

const TRANSLATIONS = {
  en: {
    /* --- NAV --- */
    'nav.demo':    'Demo',
    'nav.how':     'How it works',
    'nav.about':   'About',

    /* --- INDEX: HERO --- */
    'hero.overline':    'An interactive installation',
    'hero.title':       'The body composes.',
    'hero.title.sub':   'The machine listens.',
    'hero.description': 'CuerpoSonoro captures your body movement through computer vision and translates it into sound in real time. Move and the music responds.',
    'hero.cta.try':     'Try the demo',
    'hero.cta.about':   'About the project',

    /* --- INDEX: TECH SECTION --- */
    'tech.label': 'How it works',
    'tech.title': 'The body as a musical instrument',
    'tech.desc':  'A camera captures movement in real time. The vision_processor module uses MediaPipe to detect 33 body landmarks per frame and extract dozens of motion descriptors: energy, symmetry, elbow angles, foot position, hip tilt, hand jerk and more. Each descriptor maps to a sound parameter — harmony, melody, timbre, expression — and is sent to an external synthesizer via MIDI/MPE. The result: the body generates sound in real time. No sound is pre-programmed. The camera records nothing — it only captures body reference points.',
    'tech.link':  'See the source code →',

    /* --- INDEX: DEMO SECTION --- */
    'demo.label':              'Live experience',
    'demo.title':              'Try it yourself',
    'demo.status.loading':     'Loading…',
    'demo.status.ready':       'Ready',
    'demo.status.running':     'Running',
    'demo.status.stopped':     'Stopped',
    'demo.btn.start':          'Start',
    'demo.btn.stop':           'Stop',
    'demo.panel.title':        'Live features',
    'demo.ws.connected':       'Connected',
    'demo.ws.disconnected':    'Disconnected',

    /* --- CAMERA NOTE --- */
    'demo.camera.note': 'Camera access required. Please give your browser permission to use the camera when you click Start',

    /* --- MARAMOTTO CTA --- */
    'cta.mara.label':   'maramotto',
    'cta.mara.heading': 'Code that listens. Art that thinks.',
    'cta.mara.text':    'CuerpoSonoro is the first of several projects around the same idea: exploring how technology and art can help reconnect with your own body. Behind this series of projects is my brand, maramotto, where I build pieces and create collective artistic experiences. I use code, technology and different materials to create unique experiences that always put the human at the centre. If you want to collaborate or have a project in mind, you can find me here.',
    'cta.mara.link':    'maramotto.com →',

    /* Feature labels in bars */
    'feature.energy':     'Energy',
    'feature.symmetry':   'Symmetry',
    'feature.smoothness': 'Smoothness',
    'feature.arms':       'Arms',

    /* --- INDEX: HOW IT WORKS --- */
    'howto.label':    'How it works',
    'howto.title':    'Movement becomes sound',
    'howto.subtitle': 'Five descriptors capture your body in real time and map directly to audio parameters. The more you move, the more you compose.',

    /* Feature cards */
    'card.energy.name':       'Energy',
    'card.energy.measure':    'Overall motion intensity',
    'card.energy.desc':       'Measures how much your body is moving at any given moment. Calculated from the velocity of key joints between frames.',
    'card.energy.effect':     'More movement: louder volume and brighter, more resonant sound.',

    'card.symmetry.name':     'Symmetry',
    'card.symmetry.measure':  'Left–right balance',
    'card.symmetry.desc':     'Compares the position and movement of the left and right sides of your body. A centered body produces a centered sound.',
    'card.symmetry.effect':   'Leaning left: sound pans left. Leaning right: sound pans right.',

    'card.smoothness.name':     'Smoothness',
    'card.smoothness.measure':  'Fluidity vs. abruptness',
    'card.smoothness.desc':     'Measures the jerk of your movement, how abruptly acceleration changes. Slow, fluid gestures produce a very different texture to sharp, sudden ones.',
    'card.smoothness.effect':   'Fluid movement: open, warm filter. Abrupt movement: closed, darker texture.',

    'card.arms.name':     'Arm angle',
    'card.arms.measure':  'Arm extension',
    'card.arms.desc':     'Tracks the average angle of your arms relative to your torso. Arms fully extended reads as maximum, arms folded close to the body as minimum.',
    'card.arms.effect':   'Arms open wide: higher pitch (pentatonic scale). Arms folded: lower pitch.',

    'card.vertical.name':     'Vertical extension',
    'card.vertical.measure':  'Height of the hands',
    'card.vertical.desc':     'Measures how high your hands are relative to your body. Raising your arms overhead activates deeper modulation of the sound.',
    'card.vertical.effect':   'Hands raised: deeper vibrato and more modulation.',

    /* --- ABOUT PAGE --- */
    'about.hero.overline': 'CuerpoSonoro — An artistic and technological project',
    'about.hero.title':    'Body as creator',
    'about.hero.tagline':  'The first in a series of projects investigating how art and technology can help reconnect with your own body.',

    'about.project.label': 'The project',
    'about.project.title': 'CuerpoSonoro',

    'about.project.p1': 'CuerpoSonoro begins with a simple, intimate question: <em>what if my body could be the creator of something beautiful?</em>',
    'about.project.p2': 'To exist, to move, and for that movement to become sound.',
    'about.project.p3': 'This project grows out of a need to return to being. To gather the pieces and learn to inhabit a body that for a long time existed only as armor, as a place of pain and damage, as something wrong that had to change at any cost.',
    'about.project.p4': 'CuerpoSonoro is my way back to it. To listen to it. To let its movement (imperfect, real, mine) be the origin of something beautiful, not the consequence of the violences that run through it.',
    'about.project.p5': 'It is the first in a series of projects investigating how art and technology can help reconnect with your own body.',
    'about.project.pullquote': 'The body as creator.',

    'about.links.web':    'Project page',
    'about.links.github': 'Source code',
    'about.links.demo':   'Try the demo',

    'about.mara.label': 'Who made this',
    'about.mara.name':  'Mara',
    'about.mara.role':  'Software engineer · Artist · Creative technologist',
    'about.mara.p1':    'I\'m a software engineer and artist. I work in the space where art and human experience meet, and I investigate how technology can help and enhance that experience through physical installations, digital artistic pieces and moments of collective creation.',
    'about.mara.p2':    'Under the maramotto brand I investigate how art and technology can help expand human experience, always keeping the human — the living being — at the centre. CuerpoSonoro is the first of several projects in this investigation. If you want to collaborate or have a project in mind, you can find me at maramotto.com.',
    'about.mara.link':  'maramotto.com →',

    /* --- FOOTER --- */
    'footer.text': 'CuerpoSonoro — a project by',
    'footer.tfg':  'TFG · Software Engineering · URJC 2025/2026',

    /* --- HOW IT WORKS PAGE --- */
    'how.hero.overline': 'CuerpoSonoro — Technical documentation',
    'how.hero.title':    'How the system works',
    'how.hero.tagline':  'Computer vision, motion feature extraction and real-time sound synthesis. No pre-programmed sound. The camera records nothing.',

    'how.pipeline.label': 'The pipeline',
    'how.pipeline.title': 'From movement to sound',
    'how.pipeline.p1':    'A camera captures the performer at 30 frames per second. MediaPipe processes each frame in the browser (web demo) or locally in Python (installation), detecting 33 body landmarks — key points on joints, extremities and face. This data never leaves the machine as video or images: only coordinate arrays are processed.',
    'how.pipeline.p2':    'Those coordinates reach the vision_processor module, which extracts dozens of motion descriptors from each frame. Each descriptor maps to one or more sound parameters and is sent in real time to SuperCollider via OSC or to an external synthesizer via MIDI/MPE. The body becomes the instrument.',

    'how.descriptors.label': 'Motion descriptors',
    'how.descriptors.title': 'What the system measures',
    'how.descriptors.intro': 'The vision_processor module extracts dozens of descriptors from each frame. Each one captures a different dimension of movement and maps to a specific musical parameter. Here are the main ones.',

    'how.desc.energy.name':     'Energy',
    'how.desc.energy.body':     'Overall motion intensity: velocity of key joints (wrists, ankles, nose) between frames. High energy means the body is moving fast and with amplitude.',
    'how.desc.energy.map':      'Volume and filter resonance',

    'how.desc.symmetry.name':   'Symmetry',
    'how.desc.symmetry.body':   'Left–right balance of the body. Calculated from the horizontal deviation of both wrists relative to the centre of the frame.',
    'how.desc.symmetry.map':    'Stereo panning',

    'how.desc.smoothness.name': 'Smoothness',
    'how.desc.smoothness.body': 'Fluidity vs. abruptness of movement. Measures how abruptly acceleration changes (jerk). Slow, sustained gestures score high; sudden ones score low.',
    'how.desc.smoothness.map':  'Filter cutoff frequency',

    'how.desc.feet.name':       'Foot position',
    'how.desc.feet.body':       'Horizontal centre of both ankles in the frame space. Divides the capture zone into four harmonic regions.',
    'how.desc.feet.map':        'Chord selection (I, IV, V, VI)',

    'how.desc.knee.name':       'Knee angle',
    'how.desc.knee.body':       'Average knee flexion angle. Straight legs = maximum. Bent knees = lower value. Allows natural crescendos and decrescendos through the body.',
    'how.desc.knee.map':        'Chord velocity (loudness)',

    'how.desc.hands.name':      'Hand height',
    'how.desc.hands.body':      'Vertical position of each hand relative to body height. Right hand controls the lower octave, left hand the higher octave.',
    'how.desc.hands.map':       'Melodic note selection',

    'how.desc.jerk.name':       'Hand jerk',
    'how.desc.jerk.body':       'Detects sudden wrist movements. High jerk in a single frame is the trigger condition: it fires a note on event.',
    'how.desc.jerk.map':        'Note trigger',

    'how.desc.elbow.name':      'Elbow–hip angle',
    'how.desc.elbow.body':      'Angle between arm and torso for each side. Arm close to the body = stable pitch. Extended arm = glissando. Oscillating movement = vibrato.',
    'how.desc.elbow.map':       'Pitch bend / vibrato',

    'how.desc.head.name':       'Head tilt',
    'how.desc.head.body':       'Lateral tilt of the head, measured from the height difference between both ears. Controls a global filter affecting all sound.',
    'how.desc.head.map':        'Global tonal filter (CC74)',

    'how.stack.label':          'Tech stack',
    'how.stack.title':          'Built with',
    'how.stack.layer.vision':   'Computer vision',
    'how.stack.layer.audio':    'Audio synthesis',
    'how.stack.layer.core':     'Core',
    'how.stack.layer.infra':    'Infrastructure',
    'how.stack.mediapipe':      '33-landmark body pose detection. Runs on CPU, Metal (Apple Silicon) or GPU (Jetson).',
    'how.stack.opencv':         'Camera capture and frame processing. Low-latency buffer, 30 FPS.',
    'how.stack.supercollider':  'Algorithmic sound synthesis via OSC. Real-time SynthDefs controlled by motion features.',
    'how.stack.midi':           'MIDI Polyphonic Expression output for external synthesizers (Surge XT). Two modes: classic and musical.',
    'how.stack.python':         'Core application logic. Feature extraction, OSC/MIDI communication, pipeline orchestration.',
    'how.stack.docker':         'Portable, reproducible deployment. Two-service architecture to minimise inter-process latency.',

    'how.compare.label':          'Two versions',
    'how.compare.title':          'Web demo vs. installation',
    'how.compare.demo.label':     'Web demo',
    'how.compare.demo.title':     'cuerposonoro.art',
    'how.compare.demo.1':         'MediaPipe running directly in the browser (JS)',
    'how.compare.demo.2':         'Audio synthesis via Web Audio API',
    'how.compare.demo.3':         '5 core motion descriptors',
    'how.compare.demo.4':         'Accessible from any device with a webcam',
    'how.compare.install.label':  'Installation',
    'how.compare.install.title':  'The real system',
    'how.compare.install.1':      'MediaPipe in Python — CPU, Metal or TensorRT (Jetson GPU)',
    'how.compare.install.2':      'SuperCollider synthesis or MIDI/MPE to external synth',
    'how.compare.install.3':      'Dozens of motion descriptors, 12 MPE features',
    'how.compare.install.4':      'Designed for live performance and physical installation',

    'how.github.label':     'Open source',
    'how.github.heading':   'Read the code',
    'how.github.text':      'The full source code — vision_processor, feature extraction, MIDI/MPE pipeline, SuperCollider synths, benchmarks — is open and documented on GitHub.',
    'how.github.btn.repo':  'github.com/maramotto/cuerposonoro →',
    'how.github.btn.demo':  'Try the demo',
  },

  es: {
    /* --- NAV --- */
    'nav.demo':    'Demo',
    'nav.how':     'Cómo funciona',
    'nav.about':   'Sobre el proyecto',

    /* --- INDEX: HERO --- */
    'hero.overline':    'Una instalación interactiva',
    'hero.title':       'El cuerpo compone.',
    'hero.title.sub':   'La máquina escucha.',
    'hero.description': 'CuerpoSonoro captura el movimiento de tu cuerpo mediante visión por computador y lo traduce en sonido en tiempo real. Muévete y la música responde.',
    'hero.cta.try':     'Probar la demo',
    'hero.cta.about':   'Sobre el proyecto',

    /* --- INDEX: TECH SECTION --- */
    'tech.label': 'Cómo funciona',
    'tech.title': 'El cuerpo como instrumento musical',
    'tech.desc':  'Una cámara captura el movimiento en tiempo real. El módulo vision_processor usa MediaPipe para detectar 33 puntos del cuerpo en cada fotograma y extraer decenas de descriptores de movimiento: energía, simetría, ángulo de codos, posición de pies, inclinación de cadera, jerk de manos y más. Cada descriptor se mapea a un parámetro sonoro: armonía, melodía, timbre, expresión. Esta información se envía a un sintetizador externo vía MIDI/MPE. El resultado: el cuerpo genera sonido en tiempo real. No hay ningún sonido pre-programado. La cámara no graba nada — solo se usa como captador de puntos de referencia en el cuerpo.',
    'tech.link':  'Ver el código fuente →',

    /* --- INDEX: DEMO SECTION --- */
    'demo.label':              'Experiencia en vivo',
    'demo.title':              'Pruébalo tú',
    'demo.status.loading':     'Cargando…',
    'demo.status.ready':       'Lista',
    'demo.status.running':     'En marcha',
    'demo.status.stopped':     'Parada',
    'demo.btn.start':          'Iniciar',
    'demo.btn.stop':           'Detener',
    'demo.panel.title':        'Valores en vivo',
    'demo.ws.connected':       'Conectado',
    'demo.ws.disconnected':    'Desconectado',

    /* --- CAMERA NOTE --- */
    'demo.camera.note': 'Necesitas dar permiso a la cámara en el navegador antes de pulsar Iniciar',

    /* --- MARAMOTTO CTA --- */
    'cta.mara.label':   'maramotto',
    'cta.mara.heading': 'Código que escucha. Arte que piensa.',
    'cta.mara.text':    'CuerpoSonoro es el primero de varios proyectos que giran sobre la misma idea: investigar cómo la tecnología y el arte pueden facilitar la reconexión con el propio cuerpo. Detrás de esta serie de proyectos está mi marca, maramotto, donde construyo piezas y creo experiencias artísticas colectivas. Uso código, tecnología y diferentes materiales para crear experiencias únicas que tienen siempre al humano en el centro. Si quieres colaborar o tienes un proyecto en mente, me puedes encontrar aquí.',
    'cta.mara.link':    'maramotto.com →',

    /* Feature labels in bars */
    'feature.energy':     'Energía',
    'feature.symmetry':   'Simetría',
    'feature.smoothness': 'Fluidez',
    'feature.arms':       'Brazos',

    /* --- INDEX: HOW IT WORKS --- */
    'howto.label':    'Cómo funciona',
    'howto.title':    'El movimiento se convierte en sonido',
    'howto.subtitle': 'Cinco descriptores capturan tu cuerpo en tiempo real y se mapean directamente a parámetros de audio. Cuanto más te mueves, más compones.',

    /* Feature cards */
    'card.energy.name':       'Energía',
    'card.energy.measure':    'Intensidad global del movimiento',
    'card.energy.desc':       'Mide cuánto se mueve tu cuerpo en cada instante. Se calcula a partir de la velocidad de las articulaciones clave entre fotogramas.',
    'card.energy.effect':     'Más movimiento: mayor volumen y sonido más brillante y resonante.',

    'card.symmetry.name':     'Simetría',
    'card.symmetry.measure':  'Equilibrio izquierda–derecha',
    'card.symmetry.desc':     'Compara la posición y el movimiento de los lados izquierdo y derecho del cuerpo. Un cuerpo centrado produce un sonido centrado.',
    'card.symmetry.effect':   'Inclinarte a la izquierda: el sonido se desplaza a la izquierda. A la derecha: a la derecha.',

    'card.smoothness.name':     'Fluidez',
    'card.smoothness.measure':  'Fluidez vs. brusquedad',
    'card.smoothness.desc':     'Mide el jerk del movimiento, cómo cambia de forma brusca la aceleración. Los gestos lentos y fluidos producen una textura muy diferente a los repentinos.',
    'card.smoothness.effect':   'Movimiento fluido: filtro abierto y cálido. Movimiento brusco: textura cerrada y oscura.',

    'card.arms.name':     'Ángulo de brazos',
    'card.arms.measure':  'Extensión de brazos',
    'card.arms.desc':     'Rastrea el ángulo medio de los brazos respecto al torso. Brazos completamente extendidos equivale a máximo, brazos pegados al cuerpo a mínimo.',
    'card.arms.effect':   'Brazos abiertos: tono más agudo (escala pentatónica). Brazos cerrados: tono más grave.',

    'card.vertical.name':     'Extensión vertical',
    'card.vertical.measure':  'Altura de las manos',
    'card.vertical.desc':     'Mide cómo de alto están las manos respecto al cuerpo. Levantar los brazos por encima de la cabeza activa una modulación más profunda del sonido.',
    'card.vertical.effect':   'Manos en alto: vibrato más profundo y mayor modulación.',

    /* --- ABOUT PAGE --- */
    'about.hero.overline': 'CuerpoSonoro — Un proyecto artístico y tecnológico',
    'about.hero.title':    'El cuerpo como creador',
    'about.hero.tagline':  'El primero de una serie de proyectos que investigan cómo el arte y la tecnología pueden facilitar la reconexión con el propio cuerpo.',

    'about.project.label': 'El proyecto',
    'about.project.title': 'CuerpoSonoro',

    'about.project.p1': 'CuerpoSonoro nace de una pregunta sencilla e íntima: <em>¿y si mi cuerpo pudiera ser el creador de algo bello?</em>',
    'about.project.p2': 'Ser, moverse, y que ese movimiento se convierta en sonido.',
    'about.project.p3': 'Este proyecto surge de la necesidad de volver a ser. De recoger los pedazos y aprender a habitar un cuerpo que durante mucho tiempo existió solo como coraza, como lugar de dolor y de delito, como algo erróneo que debía cambiar a cualquier precio.',
    'about.project.p4': 'CuerpoSonoro es mi manera de volver a él. De escucharlo. De hacer que su movimiento (imperfecto, real, mío) sea el origen de algo bello, y no la consecuencia de las violencias que lo atraviesan.',
    'about.project.p5': 'Es el primero de una serie de proyectos que investigan cómo el arte y la tecnología pueden facilitar la reconexión con el propio cuerpo.',
    'about.project.pullquote': 'El cuerpo como creador.',

    'about.links.web':    'Página del proyecto',
    'about.links.github': 'Código fuente',
    'about.links.demo':   'Probar la demo',

    'about.mara.label': 'Quién hay detrás',
    'about.mara.name':  'Mara',
    'about.mara.role':  'Ingeniera de software · Artista · Tecnóloga creativa',
    'about.mara.p1':    'Soy ingeniera de software y artista. Trabajo en el área donde arte y experiencia humana se encuentran e investigo cómo la tecnología puede ayudar y potenciar esta experiencia a través de instalaciones físicas, piezas artísticas digitales y momentos de creación colectiva.',
    'about.mara.p2':    'Bajo la marca maramotto investigo cómo el arte y la tecnología pueden ayudar a aumentar la experiencia humana, poniendo siempre al humano, al ser vivo, en el centro. CuerpoSonoro es el primero de varios proyectos de esta investigación. Si quieres colaborar o tienes un proyecto en mente, me puedes encontrar en maramotto.com.',
    'about.mara.link':  'maramotto.com →',

    /* --- FOOTER --- */
    'footer.text': 'CuerpoSonoro - un proyecto de',
    'footer.tfg':  'TFG · Ingeniería del Software · URJC 2025/2026',

    /* --- HOW IT WORKS PAGE --- */
    'how.hero.overline': 'CuerpoSonoro — Documentación técnica',
    'how.hero.title':    'Cómo funciona el sistema',
    'how.hero.tagline':  'Visión por computador, extracción de descriptores de movimiento y síntesis sonora en tiempo real. Sin sonido pre-programado. La cámara no graba nada.',

    'how.pipeline.label': 'El pipeline',
    'how.pipeline.title': 'Del movimiento al sonido',
    'how.pipeline.p1':    'Una cámara captura a la persona a 30 fotogramas por segundo. MediaPipe procesa cada fotograma en el navegador (demo web) o localmente en Python (instalación), detectando 33 puntos del cuerpo: articulaciones, extremidades y cara. Esta información nunca sale de la máquina como vídeo o imagen: solo se procesan arrays de coordenadas.',
    'how.pipeline.p2':    'Esas coordenadas llegan al módulo vision_processor, que extrae decenas de descriptores de movimiento en cada fotograma. Cada descriptor se mapea a uno o más parámetros sonoros y se envía en tiempo real a SuperCollider vía OSC o a un sintetizador externo vía MIDI/MPE. El cuerpo se convierte en el instrumento.',

    'how.descriptors.label': 'Descriptores de movimiento',
    'how.descriptors.title': 'Qué mide el sistema',
    'how.descriptors.intro': 'El módulo vision_processor extrae decenas de descriptores en cada fotograma. Cada uno captura una dimensión diferente del movimiento y se mapea a un parámetro musical concreto. Aquí están los principales.',

    'how.desc.energy.name':     'Energía',
    'how.desc.energy.body':     'Intensidad global del movimiento: velocidad de las articulaciones clave (muñecas, tobillos, nariz) entre fotogramas. Alta energía significa que el cuerpo se mueve rápido y con amplitud.',
    'how.desc.energy.map':      'Volumen y resonancia del filtro',

    'how.desc.symmetry.name':   'Simetría',
    'how.desc.symmetry.body':   'Equilibrio izquierda–derecha del cuerpo. Se calcula a partir de la desviación horizontal de ambas muñecas respecto al centro del fotograma.',
    'how.desc.symmetry.map':    'Paneo estéreo',

    'how.desc.smoothness.name': 'Fluidez',
    'how.desc.smoothness.body': 'Fluidez frente a brusquedad del movimiento. Mide cómo cambia abruptamente la aceleración (jerk). Los gestos lentos y sostenidos puntúan alto; los repentinos, bajo.',
    'how.desc.smoothness.map':  'Frecuencia de corte del filtro',

    'how.desc.feet.name':       'Posición de los pies',
    'how.desc.feet.body':       'Centro horizontal de ambos tobillos en el espacio de captura. Divide la zona en cuatro regiones armónicas.',
    'how.desc.feet.map':        'Selección de acorde (I, IV, V, VI)',

    'how.desc.knee.name':       'Ángulo de rodillas',
    'how.desc.knee.body':       'Ángulo medio de flexión de rodillas. Piernas rectas = máximo. Rodillas flexionadas = valor bajo. Permite crescendos y decrescendos naturales con el cuerpo.',
    'how.desc.knee.map':        'Velocidad del acorde (intensidad)',

    'how.desc.hands.name':      'Altura de las manos',
    'how.desc.hands.body':      'Posición vertical de cada mano relativa a la altura del cuerpo. La mano derecha controla la octava grave, la izquierda la octava aguda.',
    'how.desc.hands.map':       'Selección de nota melódica',

    'how.desc.jerk.name':       'Jerk de manos',
    'how.desc.jerk.body':       'Detecta movimientos bruscos de muñeca. Un jerk alto en un único fotograma es la condición de disparo: activa un evento note on.',
    'how.desc.jerk.map':        'Disparo de nota',

    'how.desc.elbow.name':      'Ángulo codo–cadera',
    'how.desc.elbow.body':      'Ángulo entre el brazo y el torso para cada lado. Brazo junto al cuerpo = tono estable. Brazo extendido = glissando. Movimiento oscilante = vibrato.',
    'how.desc.elbow.map':       'Pitch bend / vibrato',

    'how.desc.head.name':       'Inclinación de cabeza',
    'how.desc.head.body':       'Inclinación lateral de la cabeza, medida por la diferencia de altura entre ambas orejas. Controla un filtro global que afecta a todo el sonido.',
    'how.desc.head.map':        'Filtro tonal global (CC74)',

    'how.stack.label':          'Stack técnico',
    'how.stack.title':          'Construido con',
    'how.stack.layer.vision':   'Visión por computador',
    'how.stack.layer.audio':    'Síntesis de audio',
    'how.stack.layer.core':     'Núcleo',
    'how.stack.layer.infra':    'Infraestructura',
    'how.stack.mediapipe':      'Detección de pose corporal con 33 puntos. Funciona en CPU, Metal (Apple Silicon) o GPU (Jetson).',
    'how.stack.opencv':         'Captura de cámara y procesado de fotogramas. Buffer de baja latencia, 30 FPS.',
    'how.stack.supercollider':  'Síntesis sonora algorítmica vía OSC. SynthDefs en tiempo real controlados por los descriptores de movimiento.',
    'how.stack.midi':           'Salida MIDI Polyphonic Expression para sintetizadores externos (Surge XT). Dos modos: clásico y musical.',
    'how.stack.python':         'Lógica central de la aplicación. Extracción de features, comunicación OSC/MIDI, orquestación del pipeline.',
    'how.stack.docker':         'Despliegue portable y reproducible. Arquitectura de dos servicios para minimizar latencia entre procesos.',

    'how.compare.label':          'Dos versiones',
    'how.compare.title':          'Demo web vs. instalación',
    'how.compare.demo.label':     'Demo web',
    'how.compare.demo.title':     'cuerposonoro.art',
    'how.compare.demo.1':         'MediaPipe corriendo directamente en el navegador (JS)',
    'how.compare.demo.2':         'Síntesis de audio vía Web Audio API',
    'how.compare.demo.3':         '5 descriptores de movimiento principales',
    'how.compare.demo.4':         'Accesible desde cualquier dispositivo con cámara',
    'how.compare.install.label':  'Instalación',
    'how.compare.install.title':  'El sistema real',
    'how.compare.install.1':      'MediaPipe en Python — CPU, Metal o TensorRT (GPU Jetson)',
    'how.compare.install.2':      'Síntesis en SuperCollider o MIDI/MPE a sintetizador externo',
    'how.compare.install.3':      'Decenas de descriptores de movimiento, 12 features MPE',
    'how.compare.install.4':      'Diseñado para actuación en vivo e instalación física',

    'how.github.label':     'Código abierto',
    'how.github.heading':   'Lee el código',
    'how.github.text':      'El código fuente completo — vision_processor, extracción de features, pipeline MIDI/MPE, synths de SuperCollider, benchmarks — está abierto y documentado en GitHub.',
    'how.github.btn.repo':  'github.com/maramotto/cuerposonoro →',
    'how.github.btn.demo':  'Probar la demo',
  }
};

/* ---- Engine ---- */

const I18N_STORAGE_KEY = 'cs_lang';
let currentLang = localStorage.getItem(I18N_STORAGE_KEY) || 'es';

function t(key) {
  return TRANSLATIONS[currentLang][key] || TRANSLATIONS['en'][key] || key;
}

function applyTranslations() {
  // data-i18n → textContent
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  // data-i18n-html → innerHTML (for markup like <em>)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    el.innerHTML = t(key);
  });

  // data-i18n-placeholder → placeholder attr
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  // Update lang toggle buttons
  document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  document.documentElement.lang = currentLang;
}

function setLang(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem(I18N_STORAGE_KEY, lang);
  applyTranslations();
}

// Expose globally so main.js can use t() for dynamic strings
window.i18n = { t, setLang, getCurrentLang: () => currentLang };

// Apply on load
document.addEventListener('DOMContentLoaded', () => {
  applyTranslations();

  // Wire up language toggle buttons
  document.querySelectorAll('.lang-toggle__btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
