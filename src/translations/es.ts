import type { Dictionary } from './types';

/**
 * Spanish dictionary. Written for US-based Spanish-speaking transportation
 * customers (neutral Latin American Spanish, "usted" register). Insurance
 * terms keep the English name in parentheses where the industry commonly
 * uses it, so customers can match them to their policy documents.
 */
export const es: Dictionary = {
  meta: {
    title: 'EFFECTIVE Insurance Agency | Seguros comerciales para camiones, Dallas TX',
    description:
      'Agencia de seguros en Dallas que ayuda a owner-operators, compañías de transporte y flotas a explorar responsabilidad civil de auto comercial, carga, daño físico y más.',
  },
  a11y: {
    skip: 'Saltar al contenido principal',
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú',
    language: 'Idioma',
    primaryNav: 'Principal',
    footerNav: 'Pie de página',
    opensWhatsApp: '(abre WhatsApp en una pestaña nueva)',
    logoPlaceholder: 'Logotipo temporal — logotipo oficial pendiente',
    close: 'Cerrar',
  },
  nav: {
    home: 'Inicio',
    solutions: 'Soluciones de seguro',
    serve: 'A quién servimos',
    about: 'Nosotros',
    contact: 'Contacto',
    quote: 'Cotizar',
  },
  hero: {
    eyebrow: 'Seguros para transporte comercial · Dallas, Texas',
    titleLine1: 'Su negocio se mueve.',
    titleLine2: 'Le ayudamos a estar preparado.',
    body: 'Soluciones de seguro comercial para owner-operators, compañías de transporte y negocios de transporte.',
    ctaPrimary: 'Solicitar cotización',
    ctaSecondary: 'Ver nuestras soluciones',
    scroll: 'Desplácese para explorar',
    sceneLabel:
      'Un tractocamión recorre una autopista al atardecer, con sus luces de posición encendidas, enmarcado por una red fina de puntos conectados.',
    nodes: ['Responsabilidad', 'Carga', 'Daño físico', 'Umbrella'],
  },
  solutions: {
    eyebrow: 'Soluciones de seguro',
    title: 'Coberturas pensadas para su forma de operar.',
    intro:
      'Trabajamos con proveedores de seguros para ayudarle a explorar opciones en las líneas principales que suele considerar un negocio de transporte. Cada línea está sujeta a suscripción y disponibilidad estatal.',
    cta: 'Consultar esta cobertura',
    items: {
      autoLiability: {
        tag: 'En la carretera',
        title: 'Responsabilidad civil de auto comercial',
        short:
          'Ayuda a cubrir lesiones corporales y daños a la propiedad de terceros cuando su vehículo comercial está involucrado en un accidente.',
        detail:
          'Suele ser la base de un programa de transporte. Pueden aplicar requisitos de registro federales o estatales según su operación.',
        visualLabel: 'Esquema de un tractocamión en la autopista con líneas de protección',
      },
      cargo: {
        tag: 'La carga',
        title: 'Carga de camión (Motor Truck Cargo)',
        short:
          'Ayuda a proteger la mercancía que transporta contra pérdidas o daños cubiertos mientras está bajo su cuidado.',
        detail: 'Los tipos de mercancía, límites y exclusiones varían según la póliza y la aseguradora.',
        visualLabel: 'Esquema del interior de un remolque con carga paletizada',
      },
      physicalDamage: {
        tag: 'Su equipo',
        title: 'Daño físico (Physical Damage)',
        short:
          'Ayuda a cubrir su propio tractor o remolque por colisión y riesgos cubiertos como incendio o robo.',
        detail: 'Los deducibles, el método de valuación y los riesgos cubiertos dependen de la póliza.',
        visualLabel: 'Esquema de una cabina de tractor con líneas de medición e inspección',
      },
      generalLiability: {
        tag: 'Fuera de la carretera',
        title: 'Responsabilidad civil general',
        short:
          'Ayuda a cubrir reclamos de terceros derivados de sus instalaciones y operaciones del negocio, no de conducir sus vehículos.',
        detail:
          'Piense en incidentes en el patio, la oficina o el andén de carga. Los reclamos de vehículos corresponden a la responsabilidad de auto.',
        visualLabel: 'Esquema de un andén de carga e instalaciones del negocio',
      },
      workersComp: {
        tag: 'Su gente',
        title: 'Compensación laboral (Workers’ Comp)',
        short:
          'Ayuda a cubrir gastos médicos y salarios perdidos de empleados que se lesionan o enferman en el trabajo.',
        detail: 'Los requisitos cambian según el estado, incluido cómo aplican a conductores y contratistas.',
        visualLabel: 'Esquema de un conductor junto al escalón y pasamanos de la cabina',
      },
      umbrella: {
        tag: 'Por encima de todo',
        title: 'Umbrella comercial',
        short:
          'Agrega límites de responsabilidad por encima de pólizas subyacentes elegibles cuando un reclamo los supera.',
        detail: 'Requiere coberturas subyacentes que califiquen y está sujeto a la aprobación de la aseguradora.',
        visualLabel: 'Esquema de planos de cobertura en capas sobre un camión',
      },
    },
    distinction: {
      title: 'La responsabilidad de auto y la responsabilidad general no son lo mismo.',
      autoLabel: 'Responsabilidad civil de auto comercial',
      autoText: 'Reclamos derivados de operar sus vehículos comerciales.',
      glLabel: 'Responsabilidad civil general',
      glText: 'Reclamos derivados de sus instalaciones y operaciones del negocio que no implican conducir.',
    },
  },
  serve: {
    eyebrow: 'A quién servimos',
    title: 'Operaciones distintas. Realidades distintas.',
    intro:
      'Una autoridad con un solo camión y una flota de varias unidades tienen preguntas diferentes. Empezamos por entender cuál es su caso.',
    items: [
      {
        id: 'owner',
        label: '01',
        title: 'Owner-Operators',
        body: 'Usted es el conductor, el despachador y el dueño del negocio. Las decisiones de cobertura recaen en usted, por eso importan las explicaciones claras.',
        points: [
          'Opera con su propia autoridad o arrendado a un carrier',
          'Protege el camión del que depende su ingreso',
          'Respuestas directas en inglés o español',
        ],
        visualLabel: 'Un tractocamión solo en una autopista abierta',
      },
      {
        id: 'company',
        label: '02',
        title: 'Compañías de transporte',
        body: 'Conductores, equipos, contratos y cumplimiento se mueven juntos. La revisión de sus coberturas debe ver la operación completa.',
        points: [
          'Varias líneas de cobertura que coordinar',
          'Solicitudes de certificados de shippers y brokers',
          'Empleados, patios y terminales a considerar',
        ],
        visualLabel: 'Varios camiones estacionados en una terminal',
      },
      {
        id: 'fleet',
        label: '03',
        title: 'Negocios con flotas',
        body: 'Los vehículos son parte de cómo presta su servicio, transporte mercancía o no. Le ayudamos a ver dónde están sus exposiciones comerciales.',
        points: [
          'Tipos y usos de vehículos mixtos',
          'Cantidad de unidades y conductores que cambia',
          'Responsabilidad dentro y fuera de la carretera',
        ],
        visualLabel: 'Una flota de vehículos comerciales en formación',
      },
    ],
  },
  why: {
    eyebrow: 'Por qué EFFECTIVE',
    title: 'Primero orientación. Luego opciones.',
    statement:
      'El seguro de un negocio en movimiento debe explicarse, no solo venderse. Nuestro papel es ayudarle a entender sus opciones y conectarle con alternativas de seguro que se ajusten.',
    items: [
      {
        title: 'Orientación profesional',
        body: 'Revisamos con usted cada categoría de cobertura para que sepa para qué sirve antes de decidir.',
      },
      {
        title: 'Comunicación clara',
        body: 'Lenguaje sencillo, en inglés o español. Si algo está sujeto a suscripción, se lo decimos.',
      },
      {
        title: 'Opciones a través de proveedores',
        body: 'Como agencia, trabajamos con proveedores de seguros para explorar opciones que puedan estar disponibles para su operación.',
      },
      {
        title: 'Enfoque en transporte',
        body: 'Nuestra atención está en el transporte comercial: los vehículos, la carga y las responsabilidades que conllevan.',
      },
      {
        title: 'Un proceso centrado en el cliente',
        body: 'Sus preguntas guían la conversación. Avanzamos al ritmo que necesitan sus decisiones.',
      },
    ],
  },
  process: {
    eyebrow: 'Cómo funciona',
    title: 'Cuatro pasos de la pregunta a la decisión.',
    steps: [
      {
        title: 'Cuéntenos sobre su negocio.',
        body: 'Comparta su tipo de operación, vehículos, radio, carga y las coberturas que le interesan.',
      },
      {
        title: 'Explore las opciones disponibles.',
        body: 'Revisamos su información y buscamos opciones que puedan estar disponibles con proveedores de seguros.',
      },
      {
        title: 'Revise su cotización.',
        body: 'Cuando haya una cotización disponible, repasamos con usted coberturas, límites, deducibles y condiciones.',
      },
      {
        title: 'Dé el siguiente paso.',
        body: 'Si decide avanzar, le guiamos en la solicitud y los documentos requeridos.',
      },
    ],
    note: 'Las cotizaciones y la emisión de pólizas dependen de la información proporcionada, la revisión y suscripción de la aseguradora y los requisitos estatales aplicables. Enviar una solicitud no activa ni garantiza cobertura.',
  },
  about: {
    eyebrow: 'Sobre EFFECTIVE',
    title: 'Una agencia para negocios que no se detienen.',
    paragraphs: [
      'EFFECTIVE Insurance Agency LLC es una agencia de seguros con sede en Dallas, Texas, enfocada en el transporte comercial y de carga.',
      'No somos una compañía de seguros. Ayudamos a negocios de transporte a entender sus necesidades de cobertura y a explorar opciones de seguro a través de nuestras relaciones con proveedores de seguros.',
    ],
    missionLabel: 'Nuestra misión',
    mission:
      'Ayudar a los negocios de transporte a explorar soluciones de seguro comercial y avanzar con mayor confianza.',
    facts: [
      { label: 'Sede', value: 'Dallas, Texas' },
      { label: 'Enfoque', value: 'Transporte comercial' },
      { label: 'Idiomas', value: 'English · Español' },
    ],
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Preguntas que escuchamos seguido.',
    items: [
      {
        q: '¿EFFECTIVE es una compañía de seguros?',
        a: 'No. EFFECTIVE Insurance Agency LLC es una agencia de seguros. Las pólizas las emiten proveedores de seguros, y las decisiones de cobertura las toman esas aseguradoras.',
      },
      {
        q: '¿Cuál es la diferencia entre responsabilidad civil de auto comercial y responsabilidad civil general?',
        a: 'La responsabilidad de auto comercial responde a reclamos derivados de operar sus vehículos comerciales, por ejemplo lesionar a alguien o dañar su propiedad en un accidente. La responsabilidad general responde a reclamos derivados de sus instalaciones y operaciones que no implican conducir. Son coberturas separadas.',
      },
      {
        q: '¿El seguro de responsabilidad cubre daños a mi propio camión?',
        a: 'Por lo general, no. La responsabilidad civil responde por los daños que usted causa a otros. Los daños a su propio tractor o remolque normalmente se atienden con la cobertura de daño físico, sujeta a los términos de la póliza y deducibles.',
      },
      {
        q: '¿Qué información necesito para solicitar una cotización?',
        a: 'Normalmente: datos del negocio y de contacto, su estado de operación, información de vehículos y remolques, datos de los conductores, el tipo de carga que transporta, su radio de operación y cualquier historial de seguros o siniestros. Le avisaremos si se necesita algo más.',
      },
      {
        q: '¿Cuánto tarda en llegar una cotización?',
        a: 'Depende de su operación, de qué tan completa esté su información y de la revisión de la aseguradora. Le mantendremos informado, pero no podemos prometer un tiempo específico.',
      },
      {
        q: '¿Todas las coberturas están disponibles en todos los estados?',
        a: 'No. La disponibilidad depende del estado, la aseguradora y su operación. Actualmente no ofrecemos servicios en Nueva York.',
      },
      {
        q: '¿Pueden atenderme en español?',
        a: 'Sí. Atendemos a nuestros clientes en inglés y en español.',
      },
    ],
  },
  contact: {
    eyebrow: 'Contacto',
    title: 'Empecemos su cotización.',
    intro:
      'Envíenos algunos datos, llámenos o inicie una conversación por WhatsApp. Le daremos seguimiento para entender su operación.',
    phoneLabel: 'Llámenos',
    whatsappLabel: 'WhatsApp',
    whatsappCta: 'Iniciar chat por WhatsApp',
    locationLabel: 'Ubicación',
    location: 'Dallas, Texas',
    languagesLabel: 'Idiomas',
    languages: 'Inglés y español',
    whatsappDefault:
      'Hola EFFECTIVE Insurance Agency, me gustaría solicitar información sobre soluciones de seguro comercial para mi negocio.',
    form: {
      title: 'Solicitud de cotización',
      requiredHint: 'Los campos marcados con * son obligatorios.',
      name: 'Nombre completo',
      phone: 'Teléfono',
      email: 'Correo electrónico',
      businessType: 'Tipo de negocio',
      state: 'Estado base',
      interest: 'Cobertura de interés',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntenos sobre sus camiones, carga y radio de operación (opcional).',
      select: 'Seleccione…',
      businessTypes: {
        owner: 'Owner-operator',
        company: 'Compañía de transporte',
        fleet: 'Negocio con flota',
        other: 'Otro negocio de transporte',
      },
      interestNotSure: 'Aún no estoy seguro — necesito orientación',
      submit: 'Continuar en WhatsApp',
      submitEndpoint: 'Enviar solicitud',
      submitting: 'Enviando…',
      consent:
        'Al continuar, acepta que le contactemos sobre su solicitud. Enviar este formulario no activa ninguna cobertura.',
      errors: {
        required: 'Este campo es obligatorio.',
        name: 'Escriba su nombre completo.',
        phone: 'Escriba un número de teléfono válido (al menos 10 dígitos).',
        email: 'Escriba un correo electrónico válido.',
        state: 'Actualmente no ofrecemos servicios en Nueva York.',
        summary: 'Revise los campos señalados.',
      },
      handoff: {
        title: 'Su solicitud está lista para enviarse.',
        body: 'WhatsApp debió abrirse con sus datos. Su mensaje no se entrega hasta que presione enviar en WhatsApp.',
        retry: 'Abrir WhatsApp de nuevo',
        reset: 'Iniciar otra solicitud',
        popupBlocked: 'Si WhatsApp no se abrió, use el botón de abajo.',
      },
      success: {
        title: 'Solicitud recibida.',
        body: 'Gracias. Tenemos sus datos y le daremos seguimiento. Los tiempos dependen de su solicitud y de la revisión de la aseguradora.',
        reset: 'Enviar otra solicitud',
      },
      failure: {
        title: 'No pudimos enviar su solicitud.',
        body: 'Inténtelo de nuevo o contáctenos directamente por teléfono o WhatsApp.',
      },
      whatsappHeader:
        'Hola EFFECTIVE Insurance Agency, me gustaría solicitar una cotización de seguro comercial.',
      whatsappFields: {
        name: 'Nombre',
        phone: 'Teléfono',
        email: 'Correo',
        businessType: 'Tipo de negocio',
        state: 'Estado base',
        interest: 'Interés',
        message: 'Mensaje',
      },
    },
  },
  footer: {
    tagline: 'Protección inteligente en movimiento.',
    explore: 'Explorar',
    solutions: 'Soluciones',
    contact: 'Contacto',
    privacy: 'Política de privacidad',
    terms: 'Términos y condiciones',
    rights: 'Todos los derechos reservados.',
    disclosureTitle: 'Información importante',
    disclosures: [
      'EFFECTIVE Insurance Agency LLC es una agencia de seguros, no una compañía de seguros. Los productos de seguro se ofrecen a través de proveedores de seguros.',
      'La cobertura, disponibilidad, elegibilidad, términos, límites, exclusiones y precios dependen de la suscripción de la aseguradora, las condiciones de la póliza, los requisitos estatales y la autorización aplicable. No todas las coberturas están disponibles en todos los estados. No se ofrecen servicios en Nueva York.',
      'Las descripciones de este sitio son resúmenes generales, no el texto de una póliza. Sus documentos de póliza son los que determinan la cobertura.',
    ],
  },
  legal: {
    privacyTitle: 'Política de privacidad',
    termsTitle: 'Términos y condiciones',
    placeholder:
      'Este documento está en preparación y se publicará después de una revisión legal. Si tiene preguntas sobre cómo se maneja su información, contáctenos por teléfono.',
  },
};
