'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Locale = 'es' | 'en' | 'pt' | 'fr' | 'de' | 'it' | 'zh' | 'ja' | 'ko' | 'ar' | 'ru' | 'hi';

export const LOCALES: { code: Locale; nativeLabel: string; rtl?: boolean }[] = [
  { code: 'es', nativeLabel: 'Español' },
  { code: 'en', nativeLabel: 'English' },
  { code: 'pt', nativeLabel: 'Português' },
  { code: 'fr', nativeLabel: 'Français' },
  { code: 'de', nativeLabel: 'Deutsch' },
  { code: 'it', nativeLabel: 'Italiano' },
  { code: 'zh', nativeLabel: '中文' },
  { code: 'ja', nativeLabel: '日本語' },
  { code: 'ko', nativeLabel: '한국어' },
  { code: 'ar', nativeLabel: 'العربية', rtl: true },
  { code: 'ru', nativeLabel: 'Русский' },
  { code: 'hi', nativeLabel: 'हिन्दी' },
];

type Item2 = { title: string; desc: string };
type PlanItem = { title: string; accent?: string; desc: string };
type ServiceItem = { tag: string; title: string; desc: string };
type FaqItem = { q: string; a: string };

export type Dict = {
  nav: { queHacemos: string; paquetes: string; comoFunciona: string; preguntas: string };
  hablemos: string;
  openMenu: string;
  closeMenu: string;
  chooseLanguage: string;
  waAria: string;
  hero: { lines: [string, string][]; body1: string; body2: string };
  services: {
    heading1: string;
    heading2: string;
    body1: string;
    body2: string;
    prevAria: string;
    nextAria: string;
    items: ServiceItem[];
  };
  plans: { heading1: string; heading2: string; body: string; items: PlanItem[] };
  process: { heading1: string; heading2: string; items: Item2[] };
  faq: { heading: string; body: string; items: FaqItem[] };
  footer: { tagline: string; rights: string };
  wa: { info: string; plan: string; faq: string };
};

export const translations: Record<Locale, Dict> = {
  es: {
    nav: { queHacemos: 'Qué hacemos', paquetes: 'Paquetes', comoFunciona: 'Cómo funciona', preguntas: 'Preguntas' },
    hablemos: 'Hablemos',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    chooseLanguage: 'Elegir idioma',
    waAria: 'Hablemos por WhatsApp',
    hero: {
      lines: [
        ['Convertimos ideas de negocio en contenido que', 'conecta.'],
        ['Hagamos visible lo que te hace', 'diferente.'],
        ['Potenciamos el alcance de todo lo que puedes', 'lograr.'],
      ],
      body1: 'Damos forma a tus ideas con diseño, contenido, estrategia y tecnología para llevar la esencia',
      body2: 'de tu marca al mundo digital y hacer que destaque.',
    },
    services: {
      heading1: 'Tu equipo tiene una empresa que dirigir.',
      heading2: 'Nosotros la hacemos destacar.',
      body1: 'Epik Bizz gestiona tu presencia digital, desde las ideas a la publicación.',
      body2: 'Y logramos que se vea así.',
      prevAria: 'Servicio anterior',
      nextAria: 'Siguiente servicio',
      items: [
        { tag: 'Producción audiovisual mensual', title: 'Contenido audiovisual creado a la medida de tu negocio.', desc: 'Sesiones de foto y video profesional, fresco y alineado con tu marca, listo para destacar.' },
        { tag: 'Asesoría estratégica', title: 'Dirección para tomar mejores decisiones.', desc: 'Revisamos tu presencia digital, detectamos oportunidades y definimos los próximos pasos para hacer crecer tu marca.' },
        { tag: 'Gestión de contenido', title: 'Tu contenido listo para mostrarse.', desc: 'Planificamos, creamos, organizamos y publicamos todo el contenido para que tus canales digitales estén activos.' },
        { tag: 'Optimización de perfiles', title: 'Haz que tu marca se vea a la altura de tu negocio.', desc: 'Optimizamos tus perfiles para lograr una imagen coherente, profesional y estratégica en cada plataforma.' },
        { tag: 'Publicidad paga', title: 'Pon tu marca frente a las personas correctas.', desc: 'Campañas con presupuesto optimizado para aumentar tu visibilidad.' },
      ],
    },
    plans: {
      heading1: 'Explora nuestros paquetes y elige cómo quieres hacer crecer',
      heading2: 'tu marca.',
      body: 'Diferentes caminos, un mismo objetivo: hacer que tu marca destaque.',
      items: [
        { title: 'Empieza a existir en TikTok', accent: 'existir', desc: 'Hacemos que tu marca esté presente donde tu audiencia ya está mirando.' },
        { title: 'Multiplica tu alcance.', accent: 'Multiplica', desc: 'Donde esté tu audiencia, ahí debe estar tu marca. Expandimos y optimizamos tu presencia en más canales con un solo mensaje coherente.' },
        { title: 'Amplifica tu alcance', accent: 'tu alcance', desc: 'Gestión completa de principio a fin usando Ads para que tu marca llegue aún más lejos.' },
        { title: 'Dale dirección a tu marca', accent: 'dirección', desc: 'Resuelve dudas, define tu enfoque y fortalece tu identidad en redes sociales con una asesoría enfocada en tus objetivos actuales.' },
        { title: 'BTC para impulsar tu empresa', accent: 'BTC para impulsar', desc: 'Entiende cómo Bitcoin puede transformar tu empresa en pagos, operaciones y generar nuevas oportunidades de negocio.' },
      ],
    },
    process: {
      heading1: 'Un proceso simple',
      heading2: 'de principio a fin',
      items: [
        { title: 'Reunión y diagnóstico', desc: 'Nos reunimos para conocer tu marca, entender tus objetivos, audiencia y desafíos, competencia, para entender lo que necesita tu marca.' },
        { title: 'Brief y Preparación', desc: 'Nos compartes la información, materiales, referencias y permisos necesarios de tu marca para tener todo listo antes de comenzar.' },
        { title: 'Planificamos el contenido', desc: 'Organizamos ideas, formatos y mensajes en un plan de contenido alineado con la estrategia y los objetivos de tu marca.' },
        { title: 'Creamos y producimos', desc: 'Ejecutamos la producción y transformamos la estrategia en contenido profesional diseñado para captar atención y generar conexión.' },
        { title: 'Publicamos y amplificamos', desc: 'Optimizamos y distribuimos el contenido en los canales adecuados, poniendo tu marca frente a la audiencia correcta.' },
        { title: 'Medimos y optimizamos', desc: 'Analizamos resultados, detectamos oportunidades y ajustamos la estrategia para mejorar continuamente el impacto de tu marca.' },
      ],
    },
    faq: {
      heading: 'Preguntas frecuentes',
      body: 'Lo que más nos preguntan antes de empezar: alcance, permanencia, para quién trabajamos y cómo logramos que el contenido represente de verdad a tu marca.',
      items: [
        { q: '¿Qué pasa si necesito algo que no está incluido en el paquete?', a: 'Te presentamos el alcance y el costo del servicio adicional antes de realizarlo. Nada se ejecuta ni se cobra sin tu aprobación previa.' },
        { q: '¿Cómo funciona la permanencia y la cancelación?', a: 'Nuestros paquetes tienen un compromiso mínimo de 3 meses de permanencia establecido mediante contrato. Si decides finalizar el servicio antes de cumplir este período, se aplicará un cargo por cancelación del saldo pendiente del contrato.' },
        { q: '¿Esto es para cualquier tipo de empresa?', a: 'Trabajamos con marcas que buscan construir una presencia digital sólida y profesional. Antes de comenzar analizamos tu negocio, objetivos y audiencia para determinar que es lo que mejor se adapta para tus objetivos.' },
        { q: '¿Ustedes se encargan de todo el proceso?', a: 'Absolutamente, desde la estrategia y planificación hasta la producción, publicación, publicidad y optimización. Tú nos das la información y el feedback necesario; nosotros nos encargamos de convertirlo en una presencia digital completa.' },
        { q: '¿Cómo hacen para que el contenido represente realmente a mi marca?', a: 'Antes de empezar a crear, conocemos tu empresa a fondo: tu propuesta, personalidad, objetivos, audiencia y competencia. Así construimos una comunicación coherente con quién eres y con lo que quieres transmitir.' },
      ],
    },
    footer: {
      tagline: 'Producción, estrategia y tecnología para la presencia digital de tu empresa.',
      rights: '© 2026 Epik Bizz. Todos los derechos reservados.',
    },
    wa: {
      info: 'Hola, quiero más información sobre Epik Bizz.',
      plan: 'Hola, quiero información sobre el paquete {name}.',
      faq: 'Hola, tengo una pregunta sobre Epik Bizz.',
    },
  },

  en: {
    nav: { queHacemos: 'What we do', paquetes: 'Packages', comoFunciona: 'How it works', preguntas: 'FAQ' },
    hablemos: "Let's talk",
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    chooseLanguage: 'Choose language',
    waAria: "Let's talk on WhatsApp",
    hero: {
      lines: [
        ['We turn business ideas into content that', 'connects.'],
        ['Let’s make visible what makes you', 'different.'],
        ['We boost the reach of everything you can', 'achieve.'],
      ],
      body1: 'We shape your ideas with design, content, strategy and technology to take the essence',
      body2: 'of your brand into the digital world and make it stand out.',
    },
    services: {
      heading1: 'Your team has a company to run.',
      heading2: 'We make it stand out.',
      body1: 'Epik Bizz manages your digital presence, from ideas to publishing.',
      body2: 'And we make it look like this.',
      prevAria: 'Previous service',
      nextAria: 'Next service',
      items: [
        { tag: 'Monthly audiovisual production', title: 'Audiovisual content built around your business.', desc: 'Professional, fresh photo and video sessions aligned with your brand, ready to stand out.' },
        { tag: 'Strategic advisory', title: 'Direction to make better decisions.', desc: 'We review your digital presence, spot opportunities and define the next steps to grow your brand.' },
        { tag: 'Content management', title: 'Your content ready to show up.', desc: 'We plan, create, organize and publish all the content so your digital channels stay active.' },
        { tag: 'Profile optimization', title: 'Make your brand look as good as your business.', desc: 'We optimize your profiles for a coherent, professional and strategic image on every platform.' },
        { tag: 'Paid advertising', title: 'Put your brand in front of the right people.', desc: 'Optimized-budget campaigns to increase your visibility.' },
      ],
    },
    plans: {
      heading1: 'Explore our packages and choose how you want to grow',
      heading2: 'your brand.',
      body: 'Different paths, one same goal: making your brand stand out.',
      items: [
        { title: 'Start existing on TikTok', accent: 'existing', desc: 'We make your brand present where your audience is already looking.' },
        { title: 'Multiply your reach.', accent: 'Multiply', desc: 'Wherever your audience is, your brand should be too. We expand and optimize your presence across more channels with one coherent message.' },
        { title: 'Amplify your reach', accent: 'your reach', desc: 'Full end-to-end management using Ads so your brand reaches even further.' },
        { title: 'Give direction to your brand', accent: 'direction', desc: 'We answer questions, define your focus and strengthen your identity on social media with advisory focused on your current goals.' },
        { title: 'BTC to power your business', accent: 'BTC to power', desc: 'Understand how Bitcoin can transform your business in payments, operations and new business opportunities.' },
      ],
    },
    process: {
      heading1: 'A simple process',
      heading2: 'from start to finish',
      items: [
        { title: 'Meeting & diagnosis', desc: 'We meet to get to know your brand, understand your goals, audience, challenges and competition, to understand what your brand needs.' },
        { title: 'Brief & preparation', desc: 'You share the information, materials, references and permissions your brand needs so everything is ready before we start.' },
        { title: 'We plan the content', desc: 'We organize ideas, formats and messages into a content plan aligned with your brand’s strategy and goals.' },
        { title: 'We create & produce', desc: 'We execute production and turn the strategy into professional content designed to capture attention and build connection.' },
        { title: 'We publish & amplify', desc: 'We optimize and distribute the content across the right channels, putting your brand in front of the right audience.' },
        { title: 'We measure & optimize', desc: 'We analyze results, spot opportunities and adjust the strategy to continuously improve your brand’s impact.' },
      ],
    },
    faq: {
      heading: 'Frequently asked questions',
      body: 'What people ask us most before starting: scope, commitment length, who we work with, and how we make sure the content truly represents your brand.',
      items: [
        { q: "What happens if I need something that isn't included in the package?", a: 'We present the scope and cost of the additional service before doing it. Nothing runs or gets charged without your prior approval.' },
        { q: 'How does the commitment period and cancellation work?', a: 'Our packages have a minimum 3-month commitment set out in a contract. If you decide to end the service before that period is up, a cancellation fee will apply on the remaining contract balance.' },
        { q: 'Is this for any type of business?', a: 'We work with brands looking to build a solid, professional digital presence. Before starting, we analyze your business, goals and audience to determine what best fits your objectives.' },
        { q: 'Do you handle the whole process?', a: 'Absolutely, from strategy and planning through production, publishing, advertising and optimization. You give us the information and feedback we need; we take care of turning it into a complete digital presence.' },
        { q: 'How do you make sure the content truly represents my brand?', a: 'Before we start creating, we get to know your company in depth: your proposition, personality, goals, audience and competition. That’s how we build communication that’s coherent with who you are and what you want to convey.' },
      ],
    },
    footer: {
      tagline: "Production, strategy and technology for your company's digital presence.",
      rights: '© 2026 Epik Bizz. All rights reserved.',
    },
    wa: {
      info: 'Hi, I want more information about Epik Bizz.',
      plan: 'Hi, I want information about the {name} package.',
      faq: 'Hi, I have a question about Epik Bizz.',
    },
  },

  pt: {
    nav: { queHacemos: 'O que fazemos', paquetes: 'Pacotes', comoFunciona: 'Como funciona', preguntas: 'Perguntas' },
    hablemos: 'Vamos falar',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    chooseLanguage: 'Escolher idioma',
    waAria: 'Vamos falar pelo WhatsApp',
    hero: {
      lines: [
        ['Transformamos ideias de negócio em conteúdo que', 'conecta.'],
        ['Vamos tornar visível o que te faz', 'diferente.'],
        ['Potencializamos o alcance de tudo o que você pode', 'alcançar.'],
      ],
      body1: 'Damos forma às suas ideias com design, conteúdo, estratégia e tecnologia para levar a essência',
      body2: 'da sua marca ao mundo digital e fazer com que se destaque.',
    },
    services: {
      heading1: 'Sua equipe tem uma empresa para dirigir.',
      heading2: 'Nós a fazemos se destacar.',
      body1: 'A Epik Bizz gerencia sua presença digital, das ideias à publicação.',
      body2: 'E fazemos com que fique assim.',
      prevAria: 'Serviço anterior',
      nextAria: 'Próximo serviço',
      items: [
        { tag: 'Produção audiovisual mensal', title: 'Conteúdo audiovisual criado sob medida para o seu negócio.', desc: 'Sessões de foto e vídeo profissionais, frescas e alinhadas com sua marca, prontas para se destacar.' },
        { tag: 'Consultoria estratégica', title: 'Direção para tomar melhores decisões.', desc: 'Revisamos sua presença digital, detectamos oportunidades e definimos os próximos passos para fazer sua marca crescer.' },
        { tag: 'Gestão de conteúdo', title: 'Seu conteúdo pronto para ser mostrado.', desc: 'Planejamos, criamos, organizamos e publicamos todo o conteúdo para que seus canais digitais fiquem ativos.' },
        { tag: 'Otimização de perfis', title: 'Faça sua marca parecer à altura do seu negócio.', desc: 'Otimizamos seus perfis para uma imagem coerente, profissional e estratégica em cada plataforma.' },
        { tag: 'Publicidade paga', title: 'Coloque sua marca na frente das pessoas certas.', desc: 'Campanhas com orçamento otimizado para aumentar sua visibilidade.' },
      ],
    },
    plans: {
      heading1: 'Explore nossos pacotes e escolha como quer fazer crescer',
      heading2: 'sua marca.',
      body: 'Caminhos diferentes, um mesmo objetivo: fazer sua marca se destacar.',
      items: [
        { title: 'Comece a existir no TikTok', accent: 'existir', desc: 'Fazemos sua marca estar presente onde seu público já está olhando.' },
        { title: 'Multiplique seu alcance.', accent: 'Multiplique', desc: 'Onde seu público estiver, sua marca deve estar também. Expandimos e otimizamos sua presença em mais canais com uma mensagem coerente.' },
        { title: 'Amplifique seu alcance', accent: 'seu alcance', desc: 'Gestão completa do início ao fim usando Ads para que sua marca alcance ainda mais longe.' },
        { title: 'Dê direção à sua marca', accent: 'direção', desc: 'Respondemos dúvidas, definimos seu foco e fortalecemos sua identidade nas redes sociais com uma consultoria focada nos seus objetivos atuais.' },
        { title: 'BTC para impulsionar sua empresa', accent: 'BTC para impulsionar', desc: 'Entenda como o Bitcoin pode transformar sua empresa em pagamentos, operações e gerar novas oportunidades de negócio.' },
      ],
    },
    process: {
      heading1: 'Um processo simples',
      heading2: 'do início ao fim',
      items: [
        { title: 'Reunião e diagnóstico', desc: 'Nos reunimos para conhecer sua marca, entender seus objetivos, público e desafios, concorrência, para entender o que sua marca precisa.' },
        { title: 'Briefing e preparação', desc: 'Você compartilha as informações, materiais, referências e permissões necessárias da sua marca para deixar tudo pronto antes de começar.' },
        { title: 'Planejamos o conteúdo', desc: 'Organizamos ideias, formatos e mensagens em um plano de conteúdo alinhado com a estratégia e os objetivos da sua marca.' },
        { title: 'Criamos e produzimos', desc: 'Executamos a produção e transformamos a estratégia em conteúdo profissional feito para captar atenção e gerar conexão.' },
        { title: 'Publicamos e amplificamos', desc: 'Otimizamos e distribuímos o conteúdo nos canais adequados, colocando sua marca diante do público certo.' },
        { title: 'Medimos e otimizamos', desc: 'Analisamos resultados, detectamos oportunidades e ajustamos a estratégia para melhorar continuamente o impacto da sua marca.' },
      ],
    },
    faq: {
      heading: 'Perguntas frequentes',
      body: 'O que mais nos perguntam antes de começar: alcance, permanência, para quem trabalhamos e como fazemos o conteúdo representar de verdade sua marca.',
      items: [
        { q: 'O que acontece se eu precisar de algo que não está incluído no pacote?', a: 'Apresentamos o escopo e o custo do serviço adicional antes de realizá-lo. Nada é executado ou cobrado sem sua aprovação prévia.' },
        { q: 'Como funciona a permanência e o cancelamento?', a: 'Nossos pacotes têm um compromisso mínimo de 3 meses de permanência estabelecido em contrato. Se decidir encerrar o serviço antes de cumprir esse período, será aplicada uma taxa de cancelamento sobre o saldo pendente do contrato.' },
        { q: 'Isso é para qualquer tipo de empresa?', a: 'Trabalhamos com marcas que buscam construir uma presença digital sólida e profissional. Antes de começar, analisamos seu negócio, objetivos e público para determinar o que melhor se adapta aos seus objetivos.' },
        { q: 'Vocês cuidam de todo o processo?', a: 'Absolutamente, desde a estratégia e o planejamento até a produção, publicação, publicidade e otimização. Você nos dá a informação e o feedback necessários; nós cuidamos de transformar isso em uma presença digital completa.' },
        { q: 'Como fazem para que o conteúdo represente realmente a minha marca?', a: 'Antes de começar a criar, conhecemos sua empresa a fundo: sua proposta, personalidade, objetivos, público e concorrência. Assim construímos uma comunicação coerente com quem você é e com o que quer transmitir.' },
      ],
    },
    footer: {
      tagline: 'Produção, estratégia e tecnologia para a presença digital da sua empresa.',
      rights: '© 2026 Epik Bizz. Todos os direitos reservados.',
    },
    wa: {
      info: 'Olá, quero mais informações sobre a Epik Bizz.',
      plan: 'Olá, quero informações sobre o pacote {name}.',
      faq: 'Olá, tenho uma pergunta sobre a Epik Bizz.',
    },
  },

  fr: {
    nav: { queHacemos: 'Ce que nous faisons', paquetes: 'Forfaits', comoFunciona: 'Comment ça marche', preguntas: 'Questions' },
    hablemos: 'Discutons',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    chooseLanguage: 'Choisir la langue',
    waAria: 'Discutons sur WhatsApp',
    hero: {
      lines: [
        ["Nous transformons des idées d'affaires en contenu qui", 'connecte.'],
        ['Rendons visible ce qui te rend', 'différent.'],
        ['Nous décuplons la portée de tout ce que tu peux', 'accomplir.'],
      ],
      body1: 'Nous donnons forme à vos idées avec design, contenu, stratégie et technologie pour porter l’essence',
      body2: 'de votre marque dans le monde digital et la faire ressortir.',
    },
    services: {
      heading1: 'Votre équipe a une entreprise à diriger.',
      heading2: 'Nous, on la fait briller.',
      body1: 'Epik Bizz gère votre présence digitale, des idées jusqu’à la publication.',
      body2: 'Et on fait en sorte que ça se voie.',
      prevAria: 'Service précédent',
      nextAria: 'Service suivant',
      items: [
        { tag: 'Production audiovisuelle mensuelle', title: 'Contenu audiovisuel créé sur mesure pour votre entreprise.', desc: 'Séances photo et vidéo professionnelles, fraîches et alignées avec votre marque, prêtes à se démarquer.' },
        { tag: 'Conseil stratégique', title: 'Une direction pour prendre de meilleures décisions.', desc: 'Nous analysons votre présence digitale, repérons les opportunités et définissons les prochaines étapes pour faire grandir votre marque.' },
        { tag: 'Gestion de contenu', title: 'Votre contenu prêt à être montré.', desc: 'Nous planifions, créons, organisons et publions tout le contenu pour que vos canaux digitaux restent actifs.' },
        { tag: 'Optimisation des profils', title: 'Faites en sorte que votre marque soit à la hauteur de votre entreprise.', desc: 'Nous optimisons vos profils pour une image cohérente, professionnelle et stratégique sur chaque plateforme.' },
        { tag: 'Publicité payante', title: 'Mettez votre marque devant les bonnes personnes.', desc: 'Des campagnes au budget optimisé pour augmenter votre visibilité.' },
      ],
    },
    plans: {
      heading1: 'Découvrez nos forfaits et choisissez comment faire grandir',
      heading2: 'votre marque.',
      body: 'Des chemins différents, un même objectif : faire ressortir votre marque.',
      items: [
        { title: 'Commencez à exister sur TikTok', accent: 'exister', desc: 'Nous faisons en sorte que votre marque soit présente là où votre audience regarde déjà.' },
        { title: 'Multipliez votre portée.', accent: 'Multipliez', desc: 'Là où se trouve votre audience, votre marque doit y être aussi. Nous développons et optimisons votre présence sur davantage de canaux avec un message cohérent.' },
        { title: 'Amplifiez votre portée', accent: 'votre portée', desc: 'Gestion complète de bout en bout avec des Ads pour que votre marque aille encore plus loin.' },
        { title: 'Donnez une direction à votre marque', accent: 'direction', desc: 'Nous répondons à vos questions, définissons votre positionnement et renforçons votre identité sur les réseaux sociaux avec un accompagnement centré sur vos objectifs actuels.' },
        { title: 'Le BTC pour propulser votre entreprise', accent: 'BTC pour propulser', desc: 'Comprenez comment le Bitcoin peut transformer votre entreprise en paiements, opérations et nouvelles opportunités d’affaires.' },
      ],
    },
    process: {
      heading1: 'Un processus simple',
      heading2: 'du début à la fin',
      items: [
        { title: 'Réunion et diagnostic', desc: 'Nous nous rencontrons pour connaître votre marque, comprendre vos objectifs, votre audience, vos défis et votre concurrence, afin de cerner ce dont votre marque a besoin.' },
        { title: 'Brief et préparation', desc: 'Vous nous partagez les informations, matériaux, références et autorisations nécessaires pour que tout soit prêt avant de commencer.' },
        { title: 'Nous planifions le contenu', desc: 'Nous organisons idées, formats et messages dans un plan de contenu aligné sur la stratégie et les objectifs de votre marque.' },
        { title: 'Nous créons et produisons', desc: 'Nous exécutons la production et transformons la stratégie en contenu professionnel conçu pour capter l’attention et créer du lien.' },
        { title: 'Nous publions et amplifions', desc: 'Nous optimisons et diffusons le contenu sur les bons canaux, en plaçant votre marque devant la bonne audience.' },
        { title: 'Nous mesurons et optimisons', desc: 'Nous analysons les résultats, repérons les opportunités et ajustons la stratégie pour améliorer en continu l’impact de votre marque.' },
      ],
    },
    faq: {
      heading: 'Questions fréquentes',
      body: 'Ce qu’on nous demande le plus avant de commencer : la portée, l’engagement, avec qui nous travaillons et comment nous faisons pour que le contenu représente vraiment votre marque.',
      items: [
        { q: 'Que se passe-t-il si j’ai besoin de quelque chose qui n’est pas inclus dans le forfait ?', a: 'Nous vous présentons la portée et le coût du service additionnel avant de le réaliser. Rien n’est exécuté ni facturé sans votre accord préalable.' },
        { q: 'Comment fonctionnent l’engagement et l’annulation ?', a: 'Nos forfaits ont un engagement minimum de 3 mois établi par contrat. Si vous décidez de mettre fin au service avant la fin de cette période, des frais d’annulation s’appliqueront sur le solde restant du contrat.' },
        { q: 'Est-ce que ça convient à tout type d’entreprise ?', a: 'Nous travaillons avec des marques qui cherchent à construire une présence digitale solide et professionnelle. Avant de commencer, nous analysons votre entreprise, vos objectifs et votre audience pour déterminer ce qui vous convient le mieux.' },
        { q: 'Vous vous occupez de tout le processus ?', a: 'Absolument, de la stratégie et de la planification jusqu’à la production, la publication, la publicité et l’optimisation. Vous nous donnez les informations et retours nécessaires ; nous nous chargeons de tout transformer en une présence digitale complète.' },
        { q: 'Comment faites-vous pour que le contenu représente vraiment ma marque ?', a: 'Avant de créer, nous apprenons à connaître votre entreprise en profondeur : votre proposition, votre personnalité, vos objectifs, votre audience et votre concurrence. C’est ainsi que nous construisons une communication cohérente avec qui vous êtes et ce que vous voulez transmettre.' },
      ],
    },
    footer: {
      tagline: 'Production, stratégie et technologie pour la présence digitale de votre entreprise.',
      rights: '© 2026 Epik Bizz. Tous droits réservés.',
    },
    wa: {
      info: 'Bonjour, je souhaite plus d’informations sur Epik Bizz.',
      plan: 'Bonjour, je souhaite des informations sur le forfait {name}.',
      faq: 'Bonjour, j’ai une question à propos d’Epik Bizz.',
    },
  },

  de: {
    nav: { queHacemos: 'Was wir tun', paquetes: 'Pakete', comoFunciona: 'So funktioniert’s', preguntas: 'Fragen' },
    hablemos: 'Lass uns reden',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    chooseLanguage: 'Sprache wählen',
    waAria: 'Lass uns auf WhatsApp reden',
    hero: {
      lines: [
        ['Wir verwandeln Geschäftsideen in Inhalte, die', 'verbinden.'],
        ['Lass uns sichtbar machen, was dich', 'anders macht.'],
        ['Wir verstärken die Reichweite von allem, was du', 'erreichen kannst.'],
      ],
      body1: 'Wir geben deinen Ideen Form mit Design, Content, Strategie und Technologie, um das Wesen',
      body2: 'deiner Marke in die digitale Welt zu bringen und sie hervorzuheben.',
    },
    services: {
      heading1: 'Dein Team hat ein Unternehmen zu führen.',
      heading2: 'Wir sorgen dafür, dass es heraussticht.',
      body1: 'Epik Bizz managt deine digitale Präsenz, von der Idee bis zur Veröffentlichung.',
      body2: 'Und wir sorgen dafür, dass es so aussieht.',
      prevAria: 'Vorheriger Service',
      nextAria: 'Nächster Service',
      items: [
        { tag: 'Monatliche audiovisuelle Produktion', title: 'Audiovisueller Content, maßgeschneidert für dein Unternehmen.', desc: 'Professionelle, frische Foto- und Videosessions, abgestimmt auf deine Marke und bereit hervorzustechen.' },
        { tag: 'Strategische Beratung', title: 'Orientierung für bessere Entscheidungen.', desc: 'Wir überprüfen deine digitale Präsenz, erkennen Chancen und definieren die nächsten Schritte, um deine Marke wachsen zu lassen.' },
        { tag: 'Content-Management', title: 'Dein Content bereit zum Zeigen.', desc: 'Wir planen, erstellen, organisieren und veröffentlichen den gesamten Content, damit deine digitalen Kanäle aktiv bleiben.' },
        { tag: 'Profiloptimierung', title: 'Lass deine Marke so gut aussehen wie dein Business.', desc: 'Wir optimieren deine Profile für ein stimmiges, professionelles und strategisches Bild auf jeder Plattform.' },
        { tag: 'Bezahlte Werbung', title: 'Bring deine Marke vor die richtigen Leute.', desc: 'Kampagnen mit optimiertem Budget, um deine Sichtbarkeit zu steigern.' },
      ],
    },
    plans: {
      heading1: 'Entdecke unsere Pakete und entscheide, wie du wachsen willst',
      heading2: 'deine Marke.',
      body: 'Verschiedene Wege, ein Ziel: deine Marke hervorstechen lassen.',
      items: [
        { title: 'Fang an, auf TikTok zu existieren', accent: 'existieren', desc: 'Wir sorgen dafür, dass deine Marke dort präsent ist, wo dein Publikum bereits hinschaut.' },
        { title: 'Vervielfache deine Reichweite.', accent: 'Vervielfache', desc: 'Wo dein Publikum ist, sollte auch deine Marke sein. Wir erweitern und optimieren deine Präsenz auf mehr Kanälen mit einer einheitlichen Botschaft.' },
        { title: 'Verstärke deine Reichweite', accent: 'deine Reichweite', desc: 'Vollständiges Ende-zu-Ende-Management mit Ads, damit deine Marke noch weiter kommt.' },
        { title: 'Gib deiner Marke eine Richtung', accent: 'Richtung', desc: 'Wir beantworten Fragen, schärfen deinen Fokus und stärken deine Identität in sozialen Netzwerken mit einer auf deine aktuellen Ziele fokussierten Beratung.' },
        { title: 'BTC, um dein Unternehmen voranzubringen', accent: 'BTC, um', desc: 'Verstehe, wie Bitcoin dein Unternehmen bei Zahlungen, Abläufen und neuen Geschäftsmöglichkeiten verändern kann.' },
      ],
    },
    process: {
      heading1: 'Ein einfacher Prozess',
      heading2: 'von Anfang bis Ende',
      items: [
        { title: 'Meeting & Diagnose', desc: 'Wir treffen uns, um deine Marke kennenzulernen und deine Ziele, dein Publikum, Herausforderungen und deinen Wettbewerb zu verstehen.' },
        { title: 'Briefing & Vorbereitung', desc: 'Du teilst uns die Informationen, Materialien, Referenzen und Freigaben deiner Marke mit, damit vor dem Start alles bereit ist.' },
        { title: 'Wir planen den Content', desc: 'Wir organisieren Ideen, Formate und Botschaften in einem Content-Plan, abgestimmt auf Strategie und Ziele deiner Marke.' },
        { title: 'Wir kreieren & produzieren', desc: 'Wir setzen die Produktion um und verwandeln die Strategie in professionellen Content, der Aufmerksamkeit weckt und Verbindung schafft.' },
        { title: 'Wir veröffentlichen & verstärken', desc: 'Wir optimieren und verbreiten den Content über die passenden Kanäle und bringen deine Marke vor das richtige Publikum.' },
        { title: 'Wir messen & optimieren', desc: 'Wir analysieren Ergebnisse, erkennen Chancen und passen die Strategie an, um die Wirkung deiner Marke stetig zu verbessern.' },
      ],
    },
    faq: {
      heading: 'Häufige Fragen',
      body: 'Was uns am häufigsten gefragt wird, bevor wir starten: Umfang, Mindestlaufzeit, für wen wir arbeiten und wie wir dafür sorgen, dass der Content deine Marke wirklich repräsentiert.',
      items: [
        { q: 'Was passiert, wenn ich etwas brauche, das nicht im Paket enthalten ist?', a: 'Wir zeigen dir Umfang und Kosten des Zusatzservices, bevor wir ihn umsetzen. Nichts wird ohne deine vorherige Zustimmung ausgeführt oder berechnet.' },
        { q: 'Wie funktionieren Mindestlaufzeit und Kündigung?', a: 'Unsere Pakete haben eine vertraglich festgelegte Mindestlaufzeit von 3 Monaten. Wenn du den Service vor Ablauf dieser Frist beendest, wird eine Stornogebühr auf den ausstehenden Restbetrag des Vertrags fällig.' },
        { q: 'Ist das für jede Art von Unternehmen geeignet?', a: 'Wir arbeiten mit Marken, die eine solide, professionelle digitale Präsenz aufbauen wollen. Vor dem Start analysieren wir dein Unternehmen, deine Ziele und dein Publikum, um zu bestimmen, was am besten zu deinen Zielen passt.' },
        { q: 'Kümmert ihr euch um den gesamten Prozess?', a: 'Absolut, von Strategie und Planung bis zu Produktion, Veröffentlichung, Werbung und Optimierung. Du gibst uns die nötigen Informationen und Feedback; wir kümmern uns darum, daraus eine vollständige digitale Präsenz zu machen.' },
        { q: 'Wie sorgt ihr dafür, dass der Content wirklich meine Marke repräsentiert?', a: 'Bevor wir mit der Erstellung beginnen, lernen wir dein Unternehmen gründlich kennen: dein Angebot, deine Persönlichkeit, Ziele, Publikum und Wettbewerb. So bauen wir eine Kommunikation auf, die zu dir und dem passt, was du vermitteln willst.' },
      ],
    },
    footer: {
      tagline: 'Produktion, Strategie und Technologie für die digitale Präsenz deines Unternehmens.',
      rights: '© 2026 Epik Bizz. Alle Rechte vorbehalten.',
    },
    wa: {
      info: 'Hallo, ich möchte mehr Informationen über Epik Bizz.',
      plan: 'Hallo, ich möchte Informationen über das Paket {name}.',
      faq: 'Hallo, ich habe eine Frage zu Epik Bizz.',
    },
  },

  it: {
    nav: { queHacemos: 'Cosa facciamo', paquetes: 'Pacchetti', comoFunciona: 'Come funziona', preguntas: 'Domande' },
    hablemos: 'Parliamone',
    openMenu: 'Apri menu',
    closeMenu: 'Chiudi menu',
    chooseLanguage: 'Scegli lingua',
    waAria: 'Parliamone su WhatsApp',
    hero: {
      lines: [
        ["Trasformiamo idee di business in contenuti che", 'connettono.'],
        ['Rendiamo visibile ciò che ti rende', 'diverso.'],
        ['Potenziamo la portata di tutto ciò che puoi', 'ottenere.'],
      ],
      body1: 'Diamo forma alle tue idee con design, contenuti, strategia e tecnologia per portare l’essenza',
      body2: 'del tuo brand nel mondo digitale e farlo risaltare.',
    },
    services: {
      heading1: 'Il tuo team ha un’azienda da guidare.',
      heading2: 'Noi la facciamo risaltare.',
      body1: 'Epik Bizz gestisce la tua presenza digitale, dalle idee alla pubblicazione.',
      body2: 'E facciamo in modo che si veda così.',
      prevAria: 'Servizio precedente',
      nextAria: 'Servizio successivo',
      items: [
        { tag: 'Produzione audiovisiva mensile', title: 'Contenuti audiovisivi creati su misura per il tuo business.', desc: 'Sessioni foto e video professionali, fresche e allineate al tuo brand, pronte a risaltare.' },
        { tag: 'Consulenza strategica', title: 'Una direzione per prendere decisioni migliori.', desc: 'Analizziamo la tua presenza digitale, individuiamo opportunità e definiamo i prossimi passi per far crescere il tuo brand.' },
        { tag: 'Gestione dei contenuti', title: 'I tuoi contenuti pronti da mostrare.', desc: 'Pianifichiamo, creiamo, organizziamo e pubblichiamo tutti i contenuti per mantenere attivi i tuoi canali digitali.' },
        { tag: 'Ottimizzazione dei profili', title: 'Fai in modo che il tuo brand sia all’altezza della tua azienda.', desc: 'Ottimizziamo i tuoi profili per un’immagine coerente, professionale e strategica su ogni piattaforma.' },
        { tag: 'Pubblicità a pagamento', title: 'Metti il tuo brand davanti alle persone giuste.', desc: 'Campagne con budget ottimizzato per aumentare la tua visibilità.' },
      ],
    },
    plans: {
      heading1: 'Esplora i nostri pacchetti e scegli come vuoi far crescere',
      heading2: 'il tuo brand.',
      body: 'Percorsi diversi, un unico obiettivo: far risaltare il tuo brand.',
      items: [
        { title: 'Inizia a esistere su TikTok', accent: 'esistere', desc: 'Facciamo in modo che il tuo brand sia presente dove il tuo pubblico sta già guardando.' },
        { title: 'Moltiplica la tua portata.', accent: 'Moltiplica', desc: 'Dove si trova il tuo pubblico, deve esserci anche il tuo brand. Espandiamo e ottimizziamo la tua presenza su più canali con un messaggio coerente.' },
        { title: 'Amplifica la tua portata', accent: 'la tua portata', desc: 'Gestione completa dall’inizio alla fine tramite Ads, così il tuo brand arriva ancora più lontano.' },
        { title: 'Dai una direzione al tuo brand', accent: 'direzione', desc: 'Rispondiamo ai tuoi dubbi, definiamo il tuo focus e rafforziamo la tua identità sui social con una consulenza mirata sui tuoi obiettivi attuali.' },
        { title: 'BTC per spingere la tua azienda', accent: 'BTC per spingere', desc: 'Scopri come il Bitcoin può trasformare la tua azienda in pagamenti, operazioni e nuove opportunità di business.' },
      ],
    },
    process: {
      heading1: 'Un processo semplice',
      heading2: 'dall’inizio alla fine',
      items: [
        { title: 'Incontro e diagnosi', desc: 'Ci incontriamo per conoscere il tuo brand, capire i tuoi obiettivi, pubblico, sfide e concorrenza, per capire di cosa ha bisogno il tuo brand.' },
        { title: 'Brief e preparazione', desc: 'Ci condividi le informazioni, i materiali, i riferimenti e i permessi necessari del tuo brand per avere tutto pronto prima di iniziare.' },
        { title: 'Pianifichiamo i contenuti', desc: 'Organizziamo idee, formati e messaggi in un piano di contenuti allineato alla strategia e agli obiettivi del tuo brand.' },
        { title: 'Creiamo e produciamo', desc: 'Eseguiamo la produzione e trasformiamo la strategia in contenuti professionali pensati per catturare l’attenzione e creare connessione.' },
        { title: 'Pubblichiamo e amplifichiamo', desc: 'Ottimizziamo e distribuiamo i contenuti sui canali giusti, mettendo il tuo brand davanti al pubblico corretto.' },
        { title: 'Misuriamo e ottimizziamo', desc: 'Analizziamo i risultati, individuiamo opportunità e adeguiamo la strategia per migliorare continuamente l’impatto del tuo brand.' },
      ],
    },
    faq: {
      heading: 'Domande frequenti',
      body: 'Ciò che ci chiedono più spesso prima di iniziare: portata, durata minima, con chi lavoriamo e come facciamo in modo che i contenuti rappresentino davvero il tuo brand.',
      items: [
        { q: 'Cosa succede se ho bisogno di qualcosa non incluso nel pacchetto?', a: 'Ti presentiamo la portata e il costo del servizio aggiuntivo prima di realizzarlo. Nulla viene eseguito o addebitato senza la tua previa approvazione.' },
        { q: 'Come funzionano la durata minima e la cancellazione?', a: 'I nostri pacchetti hanno un impegno minimo di 3 mesi stabilito da contratto. Se decidi di terminare il servizio prima di questo periodo, verrà applicata una penale sul saldo residuo del contratto.' },
        { q: 'È adatto a qualsiasi tipo di azienda?', a: 'Lavoriamo con brand che vogliono costruire una presenza digitale solida e professionale. Prima di iniziare analizziamo la tua azienda, i tuoi obiettivi e il tuo pubblico per capire cosa si adatta meglio ai tuoi obiettivi.' },
        { q: 'Vi occupate di tutto il processo?', a: 'Assolutamente sì, dalla strategia e pianificazione fino a produzione, pubblicazione, pubblicità e ottimizzazione. Tu ci fornisci le informazioni e il feedback necessari; noi trasformiamo tutto in una presenza digitale completa.' },
        { q: 'Come fate perché i contenuti rappresentino davvero il mio brand?', a: 'Prima di iniziare a creare, conosciamo a fondo la tua azienda: la tua proposta, personalità, obiettivi, pubblico e concorrenza. Così costruiamo una comunicazione coerente con chi sei e con ciò che vuoi trasmettere.' },
      ],
    },
    footer: {
      tagline: 'Produzione, strategia e tecnologia per la presenza digitale della tua azienda.',
      rights: '© 2026 Epik Bizz. Tutti i diritti riservati.',
    },
    wa: {
      info: 'Ciao, vorrei più informazioni su Epik Bizz.',
      plan: 'Ciao, vorrei informazioni sul pacchetto {name}.',
      faq: 'Ciao, ho una domanda su Epik Bizz.',
    },
  },

  zh: {
    nav: { queHacemos: '我们做什么', paquetes: '套餐', comoFunciona: '如何运作', preguntas: '常见问题' },
    hablemos: '联系我们',
    openMenu: '打开菜单',
    closeMenu: '关闭菜单',
    chooseLanguage: '选择语言',
    waAria: '通过WhatsApp联系我们',
    hero: {
      lines: [
        ['我们把商业创意转化为', '能建立连接的内容。'],
        ['让世界看见让你', '与众不同的一面。'],
        ['我们放大你所能达成的', '一切影响力。'],
      ],
      body1: '我们用设计、内容、策略和技术为你的想法赋予形态，',
      body2: '把你品牌的精髓带入数字世界，让它脱颖而出。',
    },
    services: {
      heading1: '你的团队要经营公司。',
      heading2: '让我们来帮你脱颖而出。',
      body1: 'Epik Bizz 全程管理你的数字形象，从创意到发布。',
      body2: '并确保呈现出这样的效果。',
      prevAria: '上一个服务',
      nextAria: '下一个服务',
      items: [
        { tag: '每月影音制作', title: '为你的业务量身定制的影音内容。', desc: '专业、新颖且与品牌一致的摄影摄像服务，随时准备脱颖而出。' },
        { tag: '战略咨询', title: '为更好的决策提供方向。', desc: '我们审视你的数字形象，发现机会，并为品牌增长制定下一步计划。' },
        { tag: '内容管理', title: '让你的内容随时准备好展示。', desc: '我们负责规划、创作、整理并发布所有内容，让你的数字渠道保持活跃。' },
        { tag: '主页优化', title: '让你的品牌形象配得上你的事业。', desc: '我们优化你的主页，在每个平台上呈现连贯、专业且富有策略性的形象。' },
        { tag: '付费广告', title: '把你的品牌展示给对的人。', desc: '预算优化的广告投放，提升你的曝光度。' },
      ],
    },
    plans: {
      heading1: '探索我们的套餐，选择你想要的增长方式，',
      heading2: '发展你的品牌。',
      body: '不同的路径，同一个目标：让你的品牌脱颖而出。',
      items: [
        { title: '开始在TikTok上崭露头角', desc: '我们让你的品牌出现在受众正在关注的地方。' },
        { title: '成倍扩大你的影响力。', desc: '你的受众在哪里，你的品牌就该在哪里。我们用统一连贯的信息拓展并优化你在更多渠道上的形象。' },
        { title: '放大你的影响力', desc: '使用广告投放进行从始至终的全程管理，让你的品牌传播得更远。' },
        { title: '为你的品牌指明方向', desc: '我们解答疑问、明确你的定位，并通过针对你当前目标的专项咨询强化你在社交媒体上的身份。' },
        { title: '用比特币助力你的企业', desc: '了解比特币如何在支付、运营方面改变你的企业，并创造新的商业机会。' },
      ],
    },
    process: {
      heading1: '简单的流程',
      heading2: '从头到尾贯穿始终',
      items: [
        { title: '会面与诊断', desc: '我们会面了解你的品牌，明确你的目标、受众、挑战与竞争对手，弄清品牌真正需要什么。' },
        { title: '简报与准备', desc: '你分享品牌所需的信息、素材、参考资料和授权，确保开始前一切就绪。' },
        { title: '规划内容', desc: '我们把创意、形式和信息整理成与品牌战略和目标一致的内容计划。' },
        { title: '创作与制作', desc: '我们执行制作，把战略转化为专业内容，用来吸引关注并建立连接。' },
        { title: '发布与放大', desc: '我们优化并在合适的渠道分发内容，把你的品牌呈现给正确的受众。' },
        { title: '衡量与优化', desc: '我们分析结果、发现机会，并调整策略，持续提升品牌影响力。' },
      ],
    },
    faq: {
      heading: '常见问题',
      body: '开始合作前大家最常问的：服务范围、合约期限、我们服务的对象，以及我们如何确保内容真正代表你的品牌。',
      items: [
        { q: '如果我需要套餐之外的服务怎么办？', a: '我们会在执行前告知额外服务的范围和费用。未经你事先同意，不会执行或收取任何费用。' },
        { q: '合约期限和取消服务是如何运作的？', a: '我们的套餐设有合同规定的最低3个月合约期。如果你在期满前决定终止服务，将对剩余合同余额收取取消费用。' },
        { q: '这适合任何类型的企业吗？', a: '我们与希望建立稳固、专业数字形象的品牌合作。开始前我们会分析你的业务、目标和受众，确定最适合你的方案。' },
        { q: '你们负责整个流程吗？', a: '当然，从战略规划到制作、发布、广告投放和优化，全部由我们负责。你提供必要的信息和反馈，我们把它转化为完整的数字形象。' },
        { q: '你们如何确保内容真正代表我的品牌？', a: '在开始创作前，我们会深入了解你的公司：你的定位、个性、目标、受众和竞争对手，从而打造与你自身及想传达信息相符的沟通方式。' },
      ],
    },
    footer: {
      tagline: '为你的企业提供数字形象的制作、策略与技术支持。',
      rights: '© 2026 Epik Bizz。保留所有权利。',
    },
    wa: {
      info: '你好，我想了解更多关于 Epik Bizz 的信息。',
      plan: '你好，我想了解 {name} 套餐的信息。',
      faq: '你好，我有一个关于 Epik Bizz 的问题。',
    },
  },

  ja: {
    nav: { queHacemos: '事業内容', paquetes: 'パッケージ', comoFunciona: '仕組み', preguntas: 'よくある質問' },
    hablemos: 'お話しましょう',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
    chooseLanguage: '言語を選択',
    waAria: 'WhatsAppでお話しましょう',
    hero: {
      lines: [
        ['ビジネスのアイデアを、つながる', 'コンテンツに変える。'],
        ['あなたを特別にするものを、', '見えるようにする。'],
        ['あなたが達成できるすべての', 'リーチを最大化する。'],
      ],
      body1: 'デザイン・コンテンツ・戦略・テクノロジーであなたのアイデアに形を与え、',
      body2: 'ブランドの本質をデジタルの世界へ届け、際立たせます。',
    },
    services: {
      heading1: 'あなたのチームには経営すべき事業がある。',
      heading2: '私たちがそれを際立たせます。',
      body1: 'Epik Bizzは、アイデアから公開まであなたのデジタルプレゼンスを管理します。',
      body2: 'そして、このような形にします。',
      prevAria: '前のサービス',
      nextAria: '次のサービス',
      items: [
        { tag: '月次映像制作', title: 'あなたのビジネスに合わせて作る映像コンテンツ。', desc: 'ブランドに合わせた新鮮でプロフェッショナルな写真・動画撮影で、際立つ準備を整えます。' },
        { tag: '戦略コンサルティング', title: 'より良い意思決定のための方向性。', desc: 'デジタルプレゼンスを見直し、機会を発見し、ブランド成長のための次のステップを定めます。' },
        { tag: 'コンテンツ管理', title: '公開準備の整ったコンテンツ。', desc: '企画・制作・整理・公開までを一貫して行い、デジタルチャンネルを常にアクティブに保ちます。' },
        { tag: 'プロフィール最適化', title: 'ブランドをビジネスにふさわしい見た目に。', desc: '各プラットフォームで一貫性のある、プロフェッショナルで戦略的なイメージへとプロフィールを最適化します。' },
        { tag: '有料広告', title: '適切な人にブランドを届ける。', desc: '視認性を高めるための、予算最適化された広告キャンペーン。' },
      ],
    },
    plans: {
      heading1: 'パッケージをご覧いただき、',
      heading2: 'ブランドの成長方法をお選びください。',
      body: '道は違っても目標は一つ：あなたのブランドを際立たせること。',
      items: [
        { title: 'TikTokで存在感を持ち始める', desc: 'オーディエンスがすでに見ている場所に、あなたのブランドを届けます。' },
        { title: 'リーチを何倍にも広げる。', desc: 'オーディエンスがいる場所には、あなたのブランドもあるべきです。一貫したメッセージで、より多くのチャネルにプレゼンスを拡大・最適化します。' },
        { title: 'リーチを増幅させる', desc: '広告を活用した最初から最後までの完全な運用で、ブランドをさらに遠くへ届けます。' },
        { title: 'ブランドに方向性を与える', desc: '疑問にお答えし、フォーカスを明確にし、現在の目標に沿ったコンサルティングでSNS上のアイデンティティを強化します。' },
        { title: 'ビジネスを後押しするBTC', desc: 'ビットコインが決済や業務、新たなビジネス機会にどう変革をもたらすかを理解しましょう。' },
      ],
    },
    process: {
      heading1: 'シンプルなプロセス',
      heading2: '最初から最後まで',
      items: [
        { title: 'ミーティングと診断', desc: 'あなたのブランドを知るために面談し、目標・オーディエンス・課題・競合を理解し、ブランドに必要なものを把握します。' },
        { title: 'ブリーフと準備', desc: '必要な情報・素材・参考資料・許可をご提供いただき、開始前にすべてを整えます。' },
        { title: 'コンテンツを計画', desc: 'アイデア・フォーマット・メッセージを整理し、戦略と目標に沿ったコンテンツプランを作成します。' },
        { title: '制作・クリエイティブ', desc: '制作を実行し、戦略を注目と共感を生むプロフェッショナルなコンテンツへと変えます。' },
        { title: '公開・拡散', desc: '適切なチャネルでコンテンツを最適化・配信し、正しいオーディエンスにブランドを届けます。' },
        { title: '計測・最適化', desc: '結果を分析し、機会を発見し、ブランドの影響力を継続的に高めるために戦略を調整します。' },
      ],
    },
    faq: {
      heading: 'よくある質問',
      body: '開始前によく聞かれること：対応範囲、契約期間、対象となる企業、そしてコンテンツが本当にブランドを表現できるようにする方法。',
      items: [
        { q: 'パッケージに含まれないものが必要になったらどうなりますか？', a: '実施前に追加サービスの範囲と費用をご提示します。事前承認なしに実行・請求されることはありません。' },
        { q: '契約期間と解約はどのような仕組みですか？', a: '当社のパッケージには契約で定められた最低3か月の契約期間があります。この期間が終わる前にサービスを終了する場合、契約残高に対して解約料が適用されます。' },
        { q: 'どんな企業にも対応していますか？', a: '確かなプロフェッショナルなデジタルプレゼンスを築きたいブランドと一緒に取り組んでいます。開始前に、あなたのビジネス・目標・オーディエンスを分析し、最適な方法を見極めます。' },
        { q: 'プロセス全体を担当してくれますか？', a: 'もちろんです。戦略・計画から制作、公開、広告、最適化まで一貫して担当します。必要な情報とフィードバックをいただければ、完全なデジタルプレゼンスへと形にします。' },
        { q: 'コンテンツが本当に私のブランドを表現するようにするには？', a: '制作を始める前に、あなたの会社を深く理解します：提案内容、パーソナリティ、目標、オーディエンス、競合。こうして、あなた自身と伝えたいことに一貫したコミュニケーションを築きます。' },
      ],
    },
    footer: {
      tagline: 'あなたの会社のデジタルプレゼンスのための制作・戦略・テクノロジー。',
      rights: '© 2026 Epik Bizz. 無断複写・転載を禁じます。',
    },
    wa: {
      info: 'こんにちは、Epik Bizzについて詳しく知りたいです。',
      plan: 'こんにちは、{name}パッケージについて詳しく知りたいです。',
      faq: 'こんにちは、Epik Bizzについて質問があります。',
    },
  },

  ko: {
    nav: { queHacemos: '하는 일', paquetes: '패키지', comoFunciona: '진행 방식', preguntas: '자주 묻는 질문' },
    hablemos: '이야기해요',
    openMenu: '메뉴 열기',
    closeMenu: '메뉴 닫기',
    chooseLanguage: '언어 선택',
    waAria: 'WhatsApp으로 이야기하기',
    hero: {
      lines: [
        ['비즈니스 아이디어를 연결되는 콘텐츠로', '바꿉니다.'],
        ['당신을 특별하게 만드는 것을', '보이게 합니다.'],
        ['당신이 이룰 수 있는 모든 것의 도달 범위를', '극대화합니다.'],
      ],
      body1: '디자인, 콘텐츠, 전략, 기술로 당신의 아이디어에 형태를 주고',
      body2: '브랜드의 본질을 디지털 세상으로 가져와 돋보이게 만듭니다.',
    },
    services: {
      heading1: '당신의 팀은 이끌어야 할 회사가 있습니다.',
      heading2: '저희가 그것을 돋보이게 합니다.',
      body1: 'Epik Bizz는 아이디어부터 게시까지 당신의 디지털 존재감을 관리합니다.',
      body2: '그리고 이렇게 보이도록 만듭니다.',
      prevAria: '이전 서비스',
      nextAria: '다음 서비스',
      items: [
        { tag: '월간 영상 제작', title: '당신의 비즈니스에 맞춘 맞춤형 영상 콘텐츠.', desc: '브랜드에 맞춘 신선하고 전문적인 사진·영상 촬영으로 돋보일 준비를 합니다.' },
        { tag: '전략 컨설팅', title: '더 나은 결정을 위한 방향 제시.', desc: '디지털 존재감을 점검하고 기회를 발견해 브랜드 성장을 위한 다음 단계를 정의합니다.' },
        { tag: '콘텐츠 관리', title: '공개할 준비가 된 콘텐츠.', desc: '모든 콘텐츠를 기획, 제작, 정리, 게시하여 디지털 채널을 항상 활성 상태로 유지합니다.' },
        { tag: '프로필 최적화', title: '브랜드가 비즈니스 수준에 걸맞아 보이도록.', desc: '모든 플랫폼에서 일관되고 전문적이며 전략적인 이미지를 위해 프로필을 최적화합니다.' },
        { tag: '유료 광고', title: '올바른 사람들 앞에 브랜드를 노출합니다.', desc: '가시성을 높이기 위한 예산 최적화 캠페인.' },
      ],
    },
    plans: {
      heading1: '패키지를 살펴보고 원하는 성장 방식을 선택하세요',
      heading2: '당신의 브랜드.',
      body: '길은 다르지만 목표는 하나: 당신의 브랜드를 돋보이게 하는 것.',
      items: [
        { title: 'TikTok에서 존재감을 갖기 시작하세요', desc: '오디언스가 이미 보고 있는 곳에 당신의 브랜드가 존재하도록 만듭니다.' },
        { title: '도달 범위를 확장하세요.', desc: '당신의 오디언스가 있는 곳에 브랜드도 있어야 합니다. 일관된 메시지로 더 많은 채널에서 존재감을 확장하고 최적화합니다.' },
        { title: '도달 범위를 증폭하세요', desc: '광고를 활용한 처음부터 끝까지의 전체 운영으로 브랜드가 더 멀리 도달하도록 합니다.' },
        { title: '브랜드에 방향을 제시하세요', desc: '의문을 해결하고 초점을 정의하며, 현재 목표에 집중한 컨설팅으로 소셜 미디어 정체성을 강화합니다.' },
        { title: '비즈니스를 견인할 BTC', desc: '비트코인이 결제, 운영, 새로운 비즈니스 기회 측면에서 회사를 어떻게 변화시킬 수 있는지 이해하세요.' },
      ],
    },
    process: {
      heading1: '간단한 프로세스',
      heading2: '처음부터 끝까지',
      items: [
        { title: '미팅과 진단', desc: '브랜드를 알아가기 위해 만나서 목표, 오디언스, 과제, 경쟁을 파악하고 브랜드에 필요한 것을 이해합니다.' },
        { title: '브리프와 준비', desc: '필요한 정보, 자료, 참고자료, 승인을 공유해 시작 전 모든 것을 준비합니다.' },
        { title: '콘텐츠를 기획합니다', desc: '아이디어, 형식, 메시지를 브랜드 전략과 목표에 맞춘 콘텐츠 계획으로 정리합니다.' },
        { title: '제작하고 만듭니다', desc: '제작을 실행하고 전략을 관심을 끌고 연결을 만드는 전문 콘텐츠로 전환합니다.' },
        { title: '게시하고 확산합니다', desc: '적절한 채널에 콘텐츠를 최적화·배포하여 올바른 오디언스 앞에 브랜드를 노출합니다.' },
        { title: '측정하고 최적화합니다', desc: '결과를 분석하고 기회를 발견해 브랜드의 영향력을 지속적으로 개선하도록 전략을 조정합니다.' },
      ],
    },
    faq: {
      heading: '자주 묻는 질문',
      body: '시작 전에 가장 많이 묻는 질문들: 범위, 계약 기간, 어떤 대상과 일하는지, 그리고 콘텐츠가 정말로 브랜드를 대변하도록 만드는 방법.',
      items: [
        { q: '패키지에 포함되지 않은 것이 필요하면 어떻게 되나요?', a: '실행 전에 추가 서비스의 범위와 비용을 안내해 드립니다. 사전 승인 없이는 어떤 것도 실행되거나 청구되지 않습니다.' },
        { q: '계약 기간과 해지는 어떻게 작동하나요?', a: '저희 패키지는 계약으로 정해진 최소 3개월의 약정 기간이 있습니다. 이 기간이 끝나기 전에 서비스를 종료하기로 결정하면 계약 잔액에 대해 해지 수수료가 부과됩니다.' },
        { q: '어떤 유형의 기업에도 해당되나요?', a: '탄탄하고 전문적인 디지털 존재감을 구축하려는 브랜드와 함께 일합니다. 시작 전에 비즈니스, 목표, 오디언스를 분석해 목표에 가장 적합한 방식을 결정합니다.' },
        { q: '전체 프로세스를 담당하나요?', a: '물론입니다. 전략과 기획부터 제작, 게시, 광고, 최적화까지 모두 담당합니다. 필요한 정보와 피드백을 주시면 완전한 디지털 존재감으로 전환해 드립니다.' },
        { q: '콘텐츠가 정말로 제 브랜드를 대변하도록 어떻게 하나요?', a: '제작을 시작하기 전에 귀사를 깊이 이해합니다: 제안, 개성, 목표, 오디언스, 경쟁사. 이를 통해 당신이 누구인지, 전달하고 싶은 것과 일관된 커뮤니케이션을 구축합니다.' },
      ],
    },
    footer: {
      tagline: '당신 회사의 디지털 존재감을 위한 제작, 전략, 기술.',
      rights: '© 2026 Epik Bizz. 모든 권리 보유.',
    },
    wa: {
      info: '안녕하세요, Epik Bizz에 대해 더 알고 싶습니다.',
      plan: '안녕하세요, {name} 패키지에 대한 정보를 원합니다.',
      faq: '안녕하세요, Epik Bizz에 대해 질문이 있습니다.',
    },
  },

  ar: {
    nav: { queHacemos: 'ماذا نفعل', paquetes: 'الباقات', comoFunciona: 'كيف نعمل', preguntas: 'الأسئلة' },
    hablemos: 'لنتحدث',
    openMenu: 'فتح القائمة',
    closeMenu: 'إغلاق القائمة',
    chooseLanguage: 'اختر اللغة',
    waAria: 'لنتحدث عبر واتساب',
    hero: {
      lines: [
        ['نحوّل أفكار الأعمال إلى محتوى', 'يتواصل.'],
        ['لنُظهر ما يجعلك', 'مختلفًا.'],
        ['نعزز وصول كل ما يمكنك', 'تحقيقه.'],
      ],
      body1: 'نمنح أفكارك شكلاً من خلال التصميم والمحتوى والاستراتيجية والتقنية لننقل جوهر',
      body2: 'علامتك التجارية إلى العالم الرقمي ونجعلها تتألق.',
    },
    services: {
      heading1: 'فريقك لديه شركة يديرها.',
      heading2: 'نحن نجعلها تتألق.',
      body1: 'تدير Epik Bizz حضورك الرقمي، من الفكرة إلى النشر.',
      body2: 'ونحرص على أن يبدو الأمر هكذا.',
      prevAria: 'الخدمة السابقة',
      nextAria: 'الخدمة التالية',
      items: [
        { tag: 'إنتاج مرئي شهري', title: 'محتوى مرئي مصمم خصيصًا لأعمالك.', desc: 'جلسات تصوير وفيديو احترافية وحديثة تتماشى مع علامتك التجارية، جاهزة للتميز.' },
        { tag: 'استشارات استراتيجية', title: 'توجيه لاتخاذ قرارات أفضل.', desc: 'نراجع حضورك الرقمي، ونكتشف الفرص، ونحدد الخطوات التالية لتنمية علامتك التجارية.' },
        { tag: 'إدارة المحتوى', title: 'محتواك جاهز للعرض.', desc: 'نخطط وننشئ وننظم وننشر كل المحتوى لإبقاء قنواتك الرقمية نشطة.' },
        { tag: 'تحسين الملفات الشخصية', title: 'اجعل علامتك التجارية تليق بمستوى أعمالك.', desc: 'نحسّن ملفاتك الشخصية لصورة متماسكة واحترافية واستراتيجية على كل منصة.' },
        { tag: 'إعلانات مدفوعة', title: 'ضع علامتك التجارية أمام الأشخاص المناسبين.', desc: 'حملات بميزانية محسّنة لزيادة ظهورك.' },
      ],
    },
    plans: {
      heading1: 'استكشف باقاتنا واختر الطريقة التي تريد بها تنمية',
      heading2: 'علامتك التجارية.',
      body: 'طرق مختلفة، هدف واحد: جعل علامتك التجارية تتألق.',
      items: [
        { title: 'ابدأ التواجد على TikTok', desc: 'نجعل علامتك التجارية حاضرة حيث ينظر جمهورك بالفعل.' },
        { title: 'ضاعف مدى وصولك.', desc: 'حيثما يكون جمهورك، يجب أن تكون علامتك التجارية أيضًا. نوسّع ونحسّن حضورك عبر قنوات أكثر برسالة موحدة ومتسقة.' },
        { title: 'ضخّم مدى وصولك', desc: 'إدارة كاملة من البداية إلى النهاية باستخدام الإعلانات ليصل علامتك التجارية إلى مدى أبعد.' },
        { title: 'امنح علامتك التجارية اتجاهًا', desc: 'نجيب عن الأسئلة، ونحدد تركيزك، ونعزز هويتك على وسائل التواصل الاجتماعي باستشارة تركز على أهدافك الحالية.' },
        { title: 'BTC لدفع عجلة أعمالك', desc: 'افهم كيف يمكن للبيتكوين أن يُحدث تحولًا في أعمالك من ناحية المدفوعات والعمليات وفرص العمل الجديدة.' },
      ],
    },
    process: {
      heading1: 'عملية بسيطة',
      heading2: 'من البداية إلى النهاية',
      items: [
        { title: 'اجتماع وتشخيص', desc: 'نجتمع للتعرف على علامتك التجارية، وفهم أهدافك وجمهورك وتحدياتك ومنافسيك، لفهم ما تحتاجه علامتك التجارية.' },
        { title: 'الموجز والتحضير', desc: 'تشاركنا المعلومات والمواد والمراجع والأذونات اللازمة لعلامتك التجارية لتجهيز كل شيء قبل البدء.' },
        { title: 'نخطط للمحتوى', desc: 'ننظم الأفكار والصيغ والرسائل في خطة محتوى تتماشى مع استراتيجية علامتك التجارية وأهدافها.' },
        { title: 'ننشئ وننتج', desc: 'ننفذ الإنتاج ونحوّل الاستراتيجية إلى محتوى احترافي مصمم لجذب الانتباه وخلق التواصل.' },
        { title: 'ننشر ونعزز الانتشار', desc: 'نحسّن ونوزع المحتوى عبر القنوات المناسبة، واضعين علامتك التجارية أمام الجمهور الصحيح.' },
        { title: 'نقيس ونحسّن', desc: 'نحلل النتائج ونكتشف الفرص ونعدّل الاستراتيجية لتحسين تأثير علامتك التجارية باستمرار.' },
      ],
    },
    faq: {
      heading: 'الأسئلة الشائعة',
      body: 'الأسئلة الأكثر شيوعًا قبل البدء: نطاق العمل، مدة الالتزام، مع من نعمل، وكيف نضمن أن المحتوى يمثل علامتك التجارية حقًا.',
      items: [
        { q: 'ماذا يحدث إذا احتجت إلى شيء غير مشمول في الباقة؟', a: 'نعرض عليك نطاق وتكلفة الخدمة الإضافية قبل تنفيذها. لا يتم تنفيذ أو احتساب أي شيء دون موافقتك المسبقة.' },
        { q: 'كيف تعمل مدة الالتزام والإلغاء؟', a: 'تتضمن باقاتنا التزامًا تعاقديًا لا يقل عن 3 أشهر. إذا قررت إنهاء الخدمة قبل انتهاء هذه المدة، سيتم تطبيق رسوم إلغاء على الرصيد المتبقي من العقد.' },
        { q: 'هل هذا مناسب لأي نوع من الشركات؟', a: 'نعمل مع العلامات التجارية التي تسعى لبناء حضور رقمي قوي واحترافي. قبل البدء، نحلل عملك وأهدافك وجمهورك لتحديد الأنسب لأهدافك.' },
        { q: 'هل تتولون العملية بأكملها؟', a: 'بالتأكيد، من الاستراتيجية والتخطيط إلى الإنتاج والنشر والإعلان والتحسين. تزودنا بالمعلومات والملاحظات اللازمة؛ ونتولى نحن تحويلها إلى حضور رقمي متكامل.' },
        { q: 'كيف تضمنون أن يمثل المحتوى علامتي التجارية فعلاً؟', a: 'قبل البدء بالإنشاء، نتعرف على شركتك بعمق: عرضك، شخصيتك، أهدافك، جمهورك ومنافسيك. بهذه الطريقة نبني تواصلاً متسقًا مع من أنت وما تريد إيصاله.' },
      ],
    },
    footer: {
      tagline: 'إنتاج واستراتيجية وتقنية من أجل الحضور الرقمي لشركتك.',
      rights: '© 2026 Epik Bizz. جميع الحقوق محفوظة.',
    },
    wa: {
      info: 'مرحبًا، أريد مزيدًا من المعلومات عن Epik Bizz.',
      plan: 'مرحبًا، أريد معلومات عن باقة {name}.',
      faq: 'مرحبًا، لدي سؤال حول Epik Bizz.',
    },
  },

  ru: {
    nav: { queHacemos: 'Чем мы занимаемся', paquetes: 'Пакеты', comoFunciona: 'Как это работает', preguntas: 'Вопросы' },
    hablemos: 'Давайте поговорим',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    chooseLanguage: 'Выбрать язык',
    waAria: 'Написать в WhatsApp',
    hero: {
      lines: [
        ['Мы превращаем бизнес-идеи в контент, который', 'объединяет.'],
        ['Сделаем видимым то, что делает тебя', 'особенным.'],
        ['Мы усиливаем охват всего, чего ты можешь', 'достичь.'],
      ],
      body1: 'Мы придаём форму твоим идеям с помощью дизайна, контента, стратегии и технологий, чтобы передать суть',
      body2: 'твоего бренда в цифровой мир и сделать его заметным.',
    },
    services: {
      heading1: 'У твоей команды есть компания, которой нужно управлять.',
      heading2: 'Мы делаем так, чтобы она выделялась.',
      body1: 'Epik Bizz управляет твоим цифровым присутствием, от идеи до публикации.',
      body2: 'И мы добиваемся именно такого результата.',
      prevAria: 'Предыдущая услуга',
      nextAria: 'Следующая услуга',
      items: [
        { tag: 'Ежемесячное аудиовизуальное производство', title: 'Аудиовизуальный контент, созданный под твой бизнес.', desc: 'Профессиональные, свежие фото- и видеосъёмки в стиле твоего бренда, готовые выделяться.' },
        { tag: 'Стратегический консалтинг', title: 'Направление для более удачных решений.', desc: 'Мы анализируем твоё цифровое присутствие, находим возможности и определяем следующие шаги для роста бренда.' },
        { tag: 'Управление контентом', title: 'Твой контент готов к показу.', desc: 'Мы планируем, создаём, организуем и публикуем весь контент, чтобы твои цифровые каналы оставались активными.' },
        { tag: 'Оптимизация профилей', title: 'Сделай так, чтобы бренд выглядел на уровне твоего бизнеса.', desc: 'Мы оптимизируем твои профили для целостного, профессионального и стратегического образа на каждой платформе.' },
        { tag: 'Платная реклама', title: 'Покажи свой бренд нужным людям.', desc: 'Кампании с оптимизированным бюджетом для повышения твоей заметности.' },
      ],
    },
    plans: {
      heading1: 'Изучи наши пакеты и выбери, как ты хочешь развивать',
      heading2: 'свой бренд.',
      body: 'Разные пути, одна цель: сделать твой бренд заметным.',
      items: [
        { title: 'Начни существовать в TikTok', desc: 'Мы делаем твой бренд заметным там, где твоя аудитория уже смотрит.' },
        { title: 'Умножь свой охват.', desc: 'Где твоя аудитория, там должен быть и твой бренд. Мы расширяем и оптимизируем твоё присутствие на большем числе каналов с единым посылом.' },
        { title: 'Усиль свой охват', desc: 'Полное управление от начала до конца с использованием рекламы, чтобы твой бренд дошёл ещё дальше.' },
        { title: 'Задай направление своему бренду', desc: 'Мы отвечаем на вопросы, определяем фокус и укрепляем твою идентичность в соцсетях с консалтингом, сфокусированным на твоих текущих целях.' },
        { title: 'BTC для развития твоего бизнеса', desc: 'Пойми, как биткоин может изменить твой бизнес в части платежей, операций и новых возможностей.' },
      ],
    },
    process: {
      heading1: 'Простой процесс',
      heading2: 'от начала до конца',
      items: [
        { title: 'Встреча и диагностика', desc: 'Мы встречаемся, чтобы узнать твой бренд, понять твои цели, аудиторию, вызовы и конкурентов, и понять, что нужно твоему бренду.' },
        { title: 'Бриф и подготовка', desc: 'Ты делишься информацией, материалами, референсами и разрешениями, необходимыми для того, чтобы всё было готово перед стартом.' },
        { title: 'Планируем контент', desc: 'Мы организуем идеи, форматы и сообщения в контент-план, согласованный со стратегией и целями твоего бренда.' },
        { title: 'Создаём и производим', desc: 'Мы реализуем производство и превращаем стратегию в профессиональный контент, созданный, чтобы привлекать внимание и создавать связь.' },
        { title: 'Публикуем и усиливаем', desc: 'Мы оптимизируем и распространяем контент по нужным каналам, показывая твой бренд правильной аудитории.' },
        { title: 'Измеряем и оптимизируем', desc: 'Мы анализируем результаты, находим возможности и корректируем стратегию, чтобы постоянно улучшать влияние твоего бренда.' },
      ],
    },
    faq: {
      heading: 'Часто задаваемые вопросы',
      body: 'То, что нас чаще всего спрашивают перед началом работы: охват, срок обязательств, с кем мы работаем и как мы добиваемся, чтобы контент действительно отражал твой бренд.',
      items: [
        { q: 'Что будет, если мне понадобится что-то, не включённое в пакет?', a: 'Мы представляем объём и стоимость дополнительной услуги до её выполнения. Ничего не выполняется и не оплачивается без твоего предварительного согласия.' },
        { q: 'Как работают срок обязательств и отмена?', a: 'Наши пакеты предполагают минимальный срок обязательств в 3 месяца, установленный договором. Если ты решишь прекратить услугу до истечения этого срока, будет применена комиссия за отмену на оставшуюся сумму по договору.' },
        { q: 'Это подходит для любого типа бизнеса?', a: 'Мы работаем с брендами, которые хотят выстроить прочное и профессиональное цифровое присутствие. Перед стартом мы анализируем твой бизнес, цели и аудиторию, чтобы определить, что лучше всего тебе подходит.' },
        { q: 'Вы берёте на себя весь процесс?', a: 'Безусловно, от стратегии и планирования до производства, публикации, рекламы и оптимизации. Ты даёшь нам необходимую информацию и обратную связь; мы превращаем это в полноценное цифровое присутствие.' },
        { q: 'Как вы добиваетесь того, чтобы контент действительно отражал мой бренд?', a: 'Прежде чем начать создавать, мы глубоко изучаем твою компанию: предложение, характер, цели, аудиторию и конкурентов. Так мы выстраиваем коммуникацию, соответствующую тому, кто ты есть и что хочешь донести.' },
      ],
    },
    footer: {
      tagline: 'Продакшн, стратегия и технологии для цифрового присутствия твоей компании.',
      rights: '© 2026 Epik Bizz. Все права защищены.',
    },
    wa: {
      info: 'Привет, хочу узнать больше об Epik Bizz.',
      plan: 'Привет, хочу узнать о пакете {name}.',
      faq: 'Привет, у меня есть вопрос про Epik Bizz.',
    },
  },

  hi: {
    nav: { queHacemos: 'हम क्या करते हैं', paquetes: 'पैकेज', comoFunciona: 'यह कैसे काम करता है', preguntas: 'सवाल' },
    hablemos: 'बात करते हैं',
    openMenu: 'मेनू खोलें',
    closeMenu: 'मेनू बंद करें',
    chooseLanguage: 'भाषा चुनें',
    waAria: 'WhatsApp पर बात करें',
    hero: {
      lines: [
        ['हम बिज़नेस आइडिया को ऐसे कंटेंट में बदलते हैं जो', 'जोड़ता है।'],
        ['जो चीज़ आपको खास बनाती है, उसे', 'दिखाते हैं।'],
        ['आप जो कुछ भी हासिल कर सकते हैं, उसकी पहुँच को', 'बढ़ाते हैं।'],
      ],
      body1: 'हम डिज़ाइन, कंटेंट, रणनीति और तकनीक से आपके विचारों को आकार देते हैं, ताकि आपके ब्रांड',
      body2: 'का सार डिजिटल दुनिया तक पहुँचे और वह अलग दिखे।',
    },
    services: {
      heading1: 'आपकी टीम के पास चलाने के लिए एक कंपनी है।',
      heading2: 'हम उसे उभरने में मदद करते हैं।',
      body1: 'Epik Bizz आइडिया से लेकर प्रकाशन तक आपकी डिजिटल उपस्थिति को संभालता है।',
      body2: 'और हम इसे इस तरह दिखाते हैं।',
      prevAria: 'पिछली सेवा',
      nextAria: 'अगली सेवा',
      items: [
        { tag: 'मासिक ऑडियोविज़ुअल प्रोडक्शन', title: 'आपके व्यवसाय के अनुरूप बनाया गया ऑडियोविज़ुअल कंटेंट।', desc: 'आपके ब्रांड के अनुरूप ताज़ा, पेशेवर फोटो और वीडियो सेशन, अलग दिखने के लिए तैयार।' },
        { tag: 'रणनीतिक सलाह', title: 'बेहतर निर्णय लेने के लिए दिशा।', desc: 'हम आपकी डिजिटल उपस्थिति की समीक्षा करते हैं, अवसर खोजते हैं और ब्रांड को बढ़ाने के अगले कदम तय करते हैं।' },
        { tag: 'कंटेंट प्रबंधन', title: 'दिखाने के लिए तैयार आपका कंटेंट।', desc: 'हम सारा कंटेंट प्लान, तैयार, व्यवस्थित और प्रकाशित करते हैं ताकि आपके डिजिटल चैनल सक्रिय रहें।' },
        { tag: 'प्रोफ़ाइल अनुकूलन', title: 'अपने ब्रांड को अपने बिज़नेस के स्तर का दिखाएं।', desc: 'हम हर प्लेटफ़ॉर्म पर एक सुसंगत, पेशेवर और रणनीतिक छवि के लिए आपकी प्रोफ़ाइल को अनुकूलित करते हैं।' },
        { tag: 'पेड विज्ञापन', title: 'अपने ब्रांड को सही लोगों के सामने रखें।', desc: 'आपकी दृश्यता बढ़ाने के लिए बजट-अनुकूलित कैंपेन।' },
      ],
    },
    plans: {
      heading1: 'हमारे पैकेज देखें और चुनें कि आप कैसे बढ़ाना चाहते हैं',
      heading2: 'अपना ब्रांड।',
      body: 'अलग-अलग रास्ते, एक ही लक्ष्य: आपके ब्रांड को अलग दिखाना।',
      items: [
        { title: 'TikTok पर अपनी पहचान बनाना शुरू करें', desc: 'हम आपके ब्रांड को वहाँ मौजूद बनाते हैं जहाँ आपके दर्शक पहले से देख रहे हैं।' },
        { title: 'अपनी पहुँच कई गुना बढ़ाएं।', desc: 'जहाँ आपके दर्शक हैं, वहाँ आपका ब्रांड भी होना चाहिए। हम एक सुसंगत संदेश के साथ अधिक चैनलों पर आपकी उपस्थिति बढ़ाते और अनुकूलित करते हैं।' },
        { title: 'अपनी पहुँच बढ़ाएं', desc: 'विज्ञापनों के साथ शुरू से अंत तक पूर्ण प्रबंधन, ताकि आपका ब्रांड और आगे तक पहुँचे।' },
        { title: 'अपने ब्रांड को दिशा दें', desc: 'हम सवालों के जवाब देते हैं, आपका फ़ोकस तय करते हैं और आपके मौजूदा लक्ष्यों पर केंद्रित सलाह से सोशल मीडिया पर आपकी पहचान मज़बूत करते हैं।' },
        { title: 'आपके बिज़नेस को आगे बढ़ाने के लिए BTC', desc: 'समझें कि बिटकॉइन भुगतान, संचालन और नए बिज़नेस अवसरों में आपकी कंपनी को कैसे बदल सकता है।' },
      ],
    },
    process: {
      heading1: 'एक सरल प्रक्रिया',
      heading2: 'शुरू से अंत तक',
      items: [
        { title: 'मीटिंग और डायग्नोसिस', desc: 'हम आपके ब्रांड को जानने, आपके लक्ष्यों, दर्शकों, चुनौतियों और प्रतिस्पर्धा को समझने के लिए मिलते हैं, ताकि पता चल सके कि आपके ब्रांड को क्या चाहिए।' },
        { title: 'ब्रीफ और तैयारी', desc: 'आप अपने ब्रांड की ज़रूरी जानकारी, सामग्री, संदर्भ और अनुमतियाँ साझा करते हैं ताकि शुरुआत से पहले सब कुछ तैयार हो।' },
        { title: 'हम कंटेंट प्लान करते हैं', desc: 'हम विचारों, फ़ॉर्मेट और संदेशों को आपके ब्रांड की रणनीति और लक्ष्यों के अनुरूप एक कंटेंट प्लान में व्यवस्थित करते हैं।' },
        { title: 'हम बनाते और प्रोड्यूस करते हैं', desc: 'हम प्रोडक्शन को अंजाम देते हैं और रणनीति को ऐसे पेशेवर कंटेंट में बदलते हैं जो ध्यान खींचे और जुड़ाव बनाए।' },
        { title: 'हम प्रकाशित और प्रवर्धित करते हैं', desc: 'हम सही चैनलों पर कंटेंट को अनुकूलित और वितरित करते हैं, आपके ब्रांड को सही दर्शकों के सामने रखते हैं।' },
        { title: 'हम मापते और अनुकूलित करते हैं', desc: 'हम परिणामों का विश्लेषण करते हैं, अवसर खोजते हैं और आपके ब्रांड के प्रभाव को लगातार बेहतर बनाने के लिए रणनीति समायोजित करते हैं।' },
      ],
    },
    faq: {
      heading: 'अक्सर पूछे जाने वाले सवाल',
      body: 'शुरू करने से पहले सबसे ज़्यादा पूछे जाने वाले सवाल: दायरा, न्यूनतम अवधि, हम किनके साथ काम करते हैं, और हम कैसे सुनिश्चित करते हैं कि कंटेंट वास्तव में आपके ब्रांड को दर्शाए।',
      items: [
        { q: 'अगर मुझे पैकेज में शामिल न कुछ चाहिए तो क्या होगा?', a: 'हम इसे करने से पहले अतिरिक्त सेवा का दायरा और लागत आपके सामने रखते हैं। आपकी पूर्व स्वीकृति के बिना कुछ भी क्रियान्वित या शुल्क नहीं लिया जाता।' },
        { q: 'न्यूनतम अवधि और रद्दीकरण कैसे काम करता है?', a: 'हमारे पैकेज में अनुबंध द्वारा तय न्यूनतम 3 महीने की प्रतिबद्धता होती है। अगर आप इस अवधि के पूरा होने से पहले सेवा समाप्त करने का निर्णय लेते हैं, तो अनुबंध की शेष राशि पर रद्दीकरण शुल्क लागू होगा।' },
        { q: 'क्या यह किसी भी तरह के व्यवसाय के लिए है?', a: 'हम उन ब्रांड्स के साथ काम करते हैं जो एक मज़बूत, पेशेवर डिजिटल उपस्थिति बनाना चाहते हैं। शुरू करने से पहले हम आपके व्यवसाय, लक्ष्यों और दर्शकों का विश्लेषण करके तय करते हैं कि आपके लिए सबसे उपयुक्त क्या है।' },
        { q: 'क्या आप पूरी प्रक्रिया संभालते हैं?', a: 'बिल्कुल, रणनीति और योजना से लेकर प्रोडक्शन, प्रकाशन, विज्ञापन और अनुकूलन तक। आप हमें ज़रूरी जानकारी और फ़ीडबैक देते हैं; हम इसे एक पूर्ण डिजिटल उपस्थिति में बदलने का काम करते हैं।' },
        { q: 'आप कैसे सुनिश्चित करते हैं कि कंटेंट वाकई मेरे ब्रांड को दर्शाए?', a: 'बनाना शुरू करने से पहले, हम आपकी कंपनी को गहराई से समझते हैं: आपका प्रस्ताव, व्यक्तित्व, लक्ष्य, दर्शक और प्रतिस्पर्धा। इस तरह हम आप कौन हैं और क्या संदेश देना चाहते हैं, उसके अनुरूप संचार बनाते हैं।' },
      ],
    },
    footer: {
      tagline: 'आपकी कंपनी की डिजिटल उपस्थिति के लिए प्रोडक्शन, रणनीति और तकनीक।',
      rights: '© 2026 Epik Bizz. सर्वाधिकार सुरक्षित।',
    },
    wa: {
      info: 'नमस्ते, मुझे Epik Bizz के बारे में और जानकारी चाहिए।',
      plan: 'नमस्ते, मुझे {name} पैकेज के बारे में जानकारी चाहिए।',
      faq: 'नमस्ते, मेरा Epik Bizz के बारे में एक सवाल है।',
    },
  },
};

const STORAGE_KEY = 'epik-lang';

function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'es';
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const code = raw.toLowerCase().split('-')[0];
    const match = LOCALES.find((l) => l.code === code);
    if (match) return match.code;
  }
  return 'es';
}

type I18nContextValue = { locale: Locale; setLocale: (l: Locale) => void; t: Dict };
const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    const initial = saved && LOCALES.some((l) => l.code === saved) ? saved : detectLocale();
    setLocaleState(initial);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = LOCALES.find((l) => l.code === locale)?.rtl ? 'rtl' : 'ltr';
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  };

  return <I18nContext.Provider value={{ locale, setLocale, t: translations[locale] }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within a LanguageProvider');
  return ctx;
}
