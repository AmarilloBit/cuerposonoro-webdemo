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
    'about.hero.tagline':  'The first in a series of projects placing the body at the center of artistic and technological research.',

    'about.project.label': 'The project',
    'about.project.title': 'CuerpoSonoro',

    'about.project.p1': 'CuerpoSonoro begins with a simple, intimate question: <em>what if my body could be the creator of something beautiful?</em>',
    'about.project.p2': 'To exist, to move, and for that movement to become sound.',
    'about.project.p3': 'This project grows out of a need to return to being. To gather the pieces and learn to inhabit a body that for a long time existed only as armor, as a place of pain and damage, as something wrong that had to change at any cost.',
    'about.project.p4': 'CuerpoSonoro is my way back to it. To listen to it. To let its movement (imperfect, real, mine) be the origin of something beautiful, not the consequence of the violences that run through it.',
    'about.project.p5': 'It is the first in a series of projects that place the body at the center of my artistic and technological research.',
    'about.project.pullquote': 'The body as creator.',

    'about.links.web':    'Project page',
    'about.links.github': 'Source code',
    'about.links.demo':   'Try the demo',

    'about.mara.label': 'Who made this',
    'about.mara.name':  'Mara',
    'about.mara.role':  'Software engineer · Artist · Creative technologist',
    'about.mara.p1':    'I work at the intersection of code and art: programs that listen, tools that create, systems that feel.',
    'about.mara.p2':    'I\'m passionate about dreaming up and building those ideas that make my heart leap when they first appear, whether in code, music, light, paint, or recycled materials.',
    'about.mara.link':  'maramotto.com →',

    /* --- FOOTER --- */
    'footer.text': 'CuerpoSonoro — a project by',
    'footer.tfg':  'TFG · Software Engineering · URJC 2025/2026',
  },

  es: {
    /* --- NAV --- */
    'nav.demo':    'Demo',
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
    'about.hero.tagline':  'El primero de una serie de proyectos que ponen el cuerpo en el centro de la investigación artística y tecnológica.',

    'about.project.label': 'El proyecto',
    'about.project.title': 'CuerpoSonoro',

    'about.project.p1': 'CuerpoSonoro nace de una pregunta sencilla e íntima: <em>¿y si mi cuerpo pudiera ser el creador de algo bello?</em>',
    'about.project.p2': 'Ser, moverse, y que ese movimiento se convierta en sonido.',
    'about.project.p3': 'Este proyecto surge de la necesidad de volver a ser. De recoger los pedazos y aprender a habitar un cuerpo que durante mucho tiempo existió solo como coraza, como lugar de dolor y de delito, como algo erróneo que debía cambiar a cualquier precio.',
    'about.project.p4': 'CuerpoSonoro es mi manera de volver a él. De escucharlo. De hacer que su movimiento (imperfecto, real, mío) sea el origen de algo bello, y no la consecuencia de las violencias que lo atraviesan.',
    'about.project.p5': 'Es el primero de una serie de proyectos que ponen el cuerpo en el centro de mi investigación artística y tecnológica.',
    'about.project.pullquote': 'El cuerpo como creador.',

    'about.links.web':    'Página del proyecto',
    'about.links.github': 'Código fuente',
    'about.links.demo':   'Probar la demo',

    'about.mara.label': 'Quién hay detrás',
    'about.mara.name':  'Mara',
    'about.mara.role':  'Ingeniera de software · Artista · Tecnóloga creativa',
    'about.mara.p1':    'Trabajo en el cruce entre el código y el arte: programas que escuchan, herramientas que crean, sistemas que sienten.',
    'about.mara.p2':    'Me apasiona inventar y llevar a cabo esas ideas que cuando se me ocurren me dan un vuelco el corazón y me llenan de energía, ya sea con código, con música, con luz, con pintura o con materiales reciclados.',
    'about.mara.link':  'maramotto.com →',

    /* --- FOOTER --- */
    'footer.text': 'CuerpoSonoro - un proyecto de',
    'footer.tfg':  'TFG · Ingeniería del Software · URJC 2025/2026',
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
