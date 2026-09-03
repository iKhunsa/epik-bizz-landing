'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { InstagramIcon, TikTokIcon, MailIcon, WhatsAppIcon } from '@/components/icons';

const NAV = [
  { label: 'Qué hacemos', href: '#que-hacemos' },
  { label: 'Paquetes', href: '#paquetes' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Preguntas', href: '#preguntas' },
];

const HERO_LINES = [
  ['Convertimos ideas de negocio en contenido que', 'conecta.'],
  ['Hagamos visible lo que te hace', 'diferente.'],
  ['Potenciamos el alcance de todo lo que puedes', 'lograr.'],
];

const PLANS = [
  { name: 'Origin', title: 'Empieza a existir en TikTok.', accent: 'existir en', desc: 'Hacemos que tu marca esté presente donde tu audiencia ya está mirando. Creamos contenido profesional cada semana para que tu marca destaque y conecte con las personas correctas.', price: '$300', color: '#1e40af' },
  { name: 'Scale', title: 'Más contenido. Más alcance. Más oportunidades para que te encuentren.', accent: 'Más oportunidades', desc: 'Tu audiencia no está en un solo lugar. Tu marca tampoco debería estarlo. Expandimos tu presencia en Google, LinkedIn y otras plataformas, con perfiles optimizados y una comunicación coherente en cada punto de contacto.', price: '$360', color: '#047857' },
  { name: 'Elevate', title: 'Estrategia, contenido y publicidad. Todo conectado para hacer crecer tu marca.', accent: 'Todo conectado', desc: 'Una solución completa gestionada de principio a fin, para que tu marca llegue más lejos. Construimos una presencia digital completa donde cada pieza trabaja en conjunto: estrategia, contenido y publicidad alineados para poner tu marca frente a las personas correctas, generar impacto y hacerla destacar de forma constante. Tu marca puede ser buena. Hagamos que sea Epik.', price: '$450', color: '#b45309' },
  { name: 'Focus', title: 'Tu marca tiene potencial. Vamos a darle dirección.', accent: 'potencial', desc: 'Resuelve dudas, define tu enfoque y fortalece tu identidad en redes sociales con una asesoría enfocada en tus objetivos actuales.', price: '$100', color: '#be123c' },
  { name: 'Decode', title: 'Descubre cómo puede impulsar tu empresa, entendiendo Bitcoin.', accent: 'entendiendo Bitcoin', desc: 'Una asesoría enfocada en mostrarte cómo funcionan Bitcoin, identificando las oportunidades que puede generar para tu empresa y explorar sus aplicaciones, desde pagos y operaciones hasta nuevas oportunidades de negocio.', price: '$500', color: '#7c3aed' },
];

const PROCESSES = [
  { num: '01', title: 'Reunión y diagnóstico', desc: 'Nos reunimos para conocer tu marca, entender tus objetivos, audiencia y desafíos, competencia, para entender lo que necesita tu marca.' },
  { num: '02', title: 'Brief y Preparación', desc: 'Nos compartes la información, materiales, referencias y permisos necesarios de tu marca para tener todo listo antes de comenzar.' },
  { num: '03', title: 'Planificamos el contenido', desc: 'Organizamos ideas, formatos y mensajes en un plan de contenido alineado con la estrategia y los objetivos de tu marca.' },
  { num: '04', title: 'Creamos y producimos', desc: 'Ejecutamos la producción y transformamos la estrategia en contenido profesional diseñado para captar atención y generar conexión.' },
  { num: '05', title: 'Publicamos y amplificamos', desc: 'Optimizamos y distribuimos el contenido en los canales adecuados, poniendo tu marca frente a la audiencia correcta.' },
  { num: '06', title: 'Medimos y optimizamos', desc: 'Analizamos resultados, detectamos oportunidades y ajustamos la estrategia para mejorar continuamente el impacto de tu marca.' },
];

const SERVICES = [
  { tag: 'Producción audiovisual mensual', title: 'Contenido audiovisual creado a la medida de tu negocio.', desc: 'Sesiones de foto y video profesional, fresco y alineado con tu marca, listo para destacar.', color: '#1e40af' },
  { tag: 'Asesoría estratégica', title: 'Dirección para tomar mejores decisiones.', desc: 'Revisamos tu presencia digital, detectamos oportunidades y definimos los próximos pasos para hacer crecer tu marca.', color: '#047857' },
  { tag: 'Gestión de contenido', title: 'Tu contenido listo para mostrarse.', desc: 'Planificamos, creamos, organizamos y publicamos todo el contenido para que tus canales digitales estén activos.', color: '#b45309' },
  { tag: 'Optimización de perfiles', title: 'Haz que tu marca se vea a la altura de tu negocio.', desc: 'Optimizamos tus perfiles para lograr una imagen coherente, profesional y estratégica en cada plataforma.', color: '#7c3aed' },
  { tag: 'Publicidad paga', title: 'Pon tu marca frente a las personas correctas.', desc: 'Campañas con presupuesto optimizado para aumentar tu visibilidad.', color: '#be123c' },
];

const FAQ_ITEMS = [
  { q: '¿Qué pasa si necesito algo que no está incluido en el paquete?', a: 'Te presentamos el alcance y el costo del servicio adicional antes de realizarlo. Nada se ejecuta ni se cobra sin tu aprobación previa.' },
  { q: '¿Cómo funciona la permanencia y la cancelación?', a: 'Nuestros paquetes tienen un compromiso mínimo de 3 meses de permanencia establecido mediante contrato. Si decides finalizar el servicio antes de cumplir este período, se aplicará un cargo por cancelación del saldo pendiente del contrato.' },
  { q: '¿Esto es para cualquier tipo de empresa?', a: 'Trabajamos con marcas que buscan construir una presencia digital sólida y profesional. Antes de comenzar analizamos tu negocio, objetivos y audiencia para determinar que es lo que mejor se adapta para tus objetivos.' },
  { q: '¿Ustedes se encargan de todo el proceso?', a: 'Absolutamente, desde la estrategia y planificación hasta la producción, publicación, publicidad y optimización. Tú nos das la información y el feedback necesario; nosotros nos encargamos de convertirlo en una presencia digital completa.' },
  { q: '¿Cómo hacen para que el contenido represente realmente a mi marca?', a: 'Antes de empezar a crear, conocemos tu empresa a fondo: tu propuesta, personalidad, objetivos, audiencia y competencia. Así construimos una comunicación coherente con quién eres y con lo que quieres transmitir.' },
];

function renderAccented(title: string, accent?: string): ReactNode {
  if (!accent) return title;
  const idx = title.toLowerCase().indexOf(accent.toLowerCase());
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span
        style={{
          color: 'transparent',
          WebkitTextStroke: '1.5px #cefd00',
          // @ts-expect-error non-standard but widely supported
          textStroke: '1.5px #cefd00',
        }}
      >
        {title.slice(idx, idx + accent.length)}
      </span>
      {title.slice(idx + accent.length)}
    </>
  );
}

function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-5 ${className}`}>{children}</div>;
}

function PillLink({ href = '#preguntas', variant = 'solid', children }: { href?: string; variant?: 'solid' | 'dark' | 'outline'; children: ReactNode }) {
  const styles = {
    solid: 'bg-lime text-ink hover:bg-lime/90',
    dark: 'bg-ink text-white hover:bg-stone-900',
    outline: 'border border-ink text-ink hover:bg-ink hover:text-white',
  }[variant];
  return (
    <a href={href} className={`inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-bold tracking-tight transition ${styles}`}>
      {children}
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-white">
      <Container className="flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-header.svg" alt="Epik Bizz" className="h-10 w-auto" />
        </a>
        <nav className="hidden gap-8 md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium text-ink transition hover:opacity-60">
              {item.label}
            </a>
          ))}
        </nav>
        <PillLink href="https://wa.me/593959204331?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Epik%20Bizz." variant="solid">
          Hablemos
        </PillLink>
      </Container>
    </header>
  );
}

const WA_INFO =
  'https://wa.me/593959204331?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Epik%20Bizz.';

function HeroBento() {
  return (
    <div className="relative mx-auto mt-6 flex w-full max-w-[1000px] flex-col gap-4 text-left md:mt-8 md:flex-row">
      {/* decorative gradient — anchored to the bento so it never drifts on wide screens */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[30%] -top-6 bottom-[-4%] -z-10 w-[45%] sm:w-[42%] md:w-[40%]"
        style={{
          background: 'linear-gradient(to bottom, #cefd00 0%, #cefd00 30%, rgba(206,253,0,0) 100%)',
        }}
      />

      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <filter id="ctaGoo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="g" />
            <feBlend in="SourceGraphic" in2="g" />
          </filter>
        </defs>
      </svg>

      {/* big card — portrait, capped so the hero fits one screen */}
      <div className="relative min-h-[220px] rounded-[20px] bg-ink p-4 md:min-h-0 md:w-[38%] md:[height:clamp(260px,34vh,380px)]" />

      {/* right column */}
      <div className="flex flex-1 flex-col gap-4">
        {/* gooey card */}
        <div className="relative min-h-[160px] flex-1">
          <div className="absolute inset-0 rounded-[24px] bg-ink" />
          {/* CTA — pill + mail inside the card's top-right, gooey-merged */}
          <div className="group/cta absolute right-4 top-4 h-[48px] w-[188px]">
            <div className="absolute inset-0" style={{ filter: 'url(#ctaGoo)' }}>
              <div className="absolute left-0 top-0 h-[48px] w-[146px] rounded-full bg-white transition-colors duration-200 group-hover/cta:bg-lime group-hover/cta:animate-[liquid-press_480ms_ease-out] group-active/cta:animate-[liquid-press_480ms_ease-out]" />
              <div className="absolute right-0 top-0 h-[48px] w-[48px] rounded-full bg-white transition-colors duration-200 group-hover/cta:bg-lime group-hover/cta:animate-[liquid-press_480ms_ease-out] group-active/cta:animate-[liquid-press_480ms_ease-out]" />
            </div>
            <a
              href={WA_INFO}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-0 top-0 flex h-[48px] w-[146px] items-center justify-center text-[14px] font-bold text-ink"
            >
              Hablemos
            </a>
            <a
              href={WA_INFO}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablemos por WhatsApp"
              className="absolute right-0 top-0 flex h-[48px] w-[48px] items-center justify-center text-[16px] text-ink"
            >
              ✉
            </a>
          </div>
        </div>

        {/* small cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="min-h-[84px] rounded-[20px] bg-ink md:min-h-[116px]" />
          <div className="min-h-[84px] rounded-[20px] bg-ink md:min-h-[116px]" />
          <div className="min-h-[84px] rounded-[20px] bg-ink md:min-h-[116px]" />
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroOpacity(0);
      setTimeout(() => {
        setHeroIdx((i) => (i + 1) % HERO_LINES.length);
        setHeroOpacity(1);
      }, 300);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const [lead, accent] = HERO_LINES[heroIdx];
  return (
    <section
      id="top"
      className="relative flex flex-col justify-center py-6 md:py-8"
      style={{ minHeight: 'calc(100svh - 72px)' }}
    >
      <Container className="relative text-center">
        <h1
          className="mx-auto flex max-w-4xl flex-col items-center justify-center min-h-[8rem] md:min-h-[9.5rem] lg:min-h-[12rem] font-bold uppercase tracking-tight"
          style={{ opacity: heroOpacity, transition: 'opacity 300ms ease' }}
        >
          <span className="text-ink text-xl leading-tight md:text-2xl lg:text-[1.9rem]">
            {lead}
          </span>
          <span className="block text-lime text-[clamp(2.75rem,10vw,128px)] leading-[0.92]">
            {accent}
          </span>
        </h1>
        <HeroBento />
        <p className="mx-auto mt-5 max-w-3xl text-[13px] text-muted">
          Damos forma a tus ideas con diseño, contenido, estrategia y tecnología para llevar la esencia
          <br className="hidden sm:inline" /> de tu marca al mundo digital y hacer que destaque.
        </p>
      </Container>
    </section>
  );
}

function ServicesSection() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];

  return (
    <section id="que-hacemos" className="relative py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-[62%] -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] md:h-[900px] md:w-[900px]"
        style={{
          background:
            'radial-gradient(circle at 45% 45%, rgba(206,253,0,0.9), rgba(150,235,140,0.5) 42%, rgba(124,58,237,0.22) 68%, rgba(255,255,255,0) 80%)',
        }}
      />
      <Container>
        <div className="mb-10 text-right">
          <h2 className="text-2xl font-bold uppercase tracking-tight text-ink md:text-4xl">
            Tu equipo tiene una empresa que dirigir.
            <span className="block text-lime text-[clamp(2.25rem,7vw,80px)] leading-[0.95] mt-2">Nosotros la hacemos destacar.</span>
          </h2>
          <p className="mt-4 text-sm text-muted">
            Epik Bizz gestiona tu presencia digital, desde las ideas a la publicación.
            <strong className="block font-bold text-ink">Y logramos que se vea así.</strong>
          </p>
        </div>

        {/* gallery */}
        <div className="overflow-hidden rounded-[28px]">
          {/* main image — placeholder (título + subtítulo van dentro de la imagen real) */}
          <div
            aria-label={svc.title}
            className="w-full rounded-[28px] transition-colors duration-300"
            style={{ aspectRatio: '16 / 9', background: svc.color }}
          />

          {/* thumbnails */}
          <div className="mt-3 flex justify-end gap-3 overflow-x-auto px-2 py-2 md:mt-4">
            {SERVICES.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active}
                className={`group relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-xl text-left transition md:w-40 ${
                  i === active ? 'ring-2 ring-ink ring-offset-2' : 'opacity-55 hover:opacity-100'
                }`}
                style={{ background: s.color }}
              >
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-[10px] font-bold uppercase leading-tight text-white">
                  {s.tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`);
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [bp]);
  return mobile;
}

function PlansTicketMobile({
  plan,
  activePlan,
  goToPlan,
  fade,
}: {
  plan: (typeof PLANS)[number];
  activePlan: number;
  goToPlan: (i: number) => void;
  fade: { opacity: number; transition: string };
}) {
  return (
    <div
      className="relative mx-auto flex w-full max-w-[380px] flex-col text-white"
      style={{ containerType: 'inline-size', gap: '0.6cqw' }}
    >
      {/* top card */}
      <div
        className="relative flex flex-col overflow-visible bg-[#0a0a0a]"
        style={{ borderRadius: '7cqw', padding: '5cqw', gap: '4.5cqw' }}
      >
        <div className="relative">
          <div
            className="w-full transition-colors duration-200"
            style={{ aspectRatio: '3 / 4', borderRadius: '5.5cqw', background: plan.color }}
          />
          <a
            href={`https://wa.me/593959204331?text=${encodeURIComponent('Hola, quiero información sobre el paquete ' + plan.name + '.')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablemos por WhatsApp"
            className="absolute z-10"
            style={{ right: '-1cqw', bottom: '6cqw', width: '38cqw', height: '24cqw' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/sticker-make-it-epik.png" alt="Make It Epik" className="block h-full w-full object-contain" />
          </a>
        </div>
        <h3
          className="m-0 font-bold uppercase leading-[1.15] tracking-[-0.01em]"
          style={{ fontSize: '7.4cqw', ...fade }}
        >
          {renderAccented(plan.title, plan.accent)}
        </h3>
        <p className="m-0 leading-[1.55] text-white/85" style={{ fontSize: '3.4cqw', ...fade }}>
          {plan.desc}
        </p>
      </div>

      {/* bottom stub */}
      <div
        className="flex items-center justify-between bg-[#0a0a0a]"
        style={{ borderRadius: '7cqw', padding: '6cqw 6cqw' }}
      >
        <div
          aria-hidden
          style={{
            width: '34cqw',
            height: '13cqw',
            backgroundImage:
              'repeating-linear-gradient(90deg,#fff 0 1cqw,#0a0a0a 1cqw 2.1cqw,#fff 2.1cqw 2.5cqw,#0a0a0a 2.5cqw 3.9cqw,#fff 3.9cqw 4.7cqw,#0a0a0a 4.7cqw 5.4cqw)',
          }}
        />
        <span className="font-bold" style={{ fontSize: '11cqw', ...fade }}>
          {plan.price}
        </span>
      </div>

      {/* plan nav */}
      <ul
        className="m-0 flex list-none flex-wrap justify-center p-0"
        style={{ fontSize: '4.4cqw', gap: '4cqw', columnGap: '5cqw' }}
      >
        {PLANS.map((p, i) => (
          <li key={p.name} style={{ color: i === activePlan ? '#cefd00' : 'rgba(11,11,11,0.4)' }}>
            <button
              type="button"
              onClick={() => goToPlan(i)}
              className="cursor-pointer border-none bg-transparent p-0 font-[inherit] font-bold uppercase text-[inherit]"
            >
              {p.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlansSection() {
  const isMobile = useIsMobile();
  const [activePlan, setActivePlan] = useState(0);
  const [fading, setFading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const wrap = scrollRef.current;
      const card = cardRef.current;
      if (!wrap || !card) return;
      const rect = wrap.getBoundingClientRect();
      const scrollable = rect.height - card.offsetHeight;
      const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0;
      const idx = Math.min(Math.floor(progress * PLANS.length), PLANS.length - 1);
      setActivePlan((prev) => {
        if (prev === idx) return prev;
        setFading(true);
        window.setTimeout(() => setFading(false), 160);
        return idx;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const goToPlan = (i: number) => {
    const wrap = scrollRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const rect = wrap.getBoundingClientRect();
    const scrollable = rect.height - card.offsetHeight;
    const target = window.scrollY + rect.top + ((i + 0.5) / PLANS.length) * scrollable;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  const plan = PLANS[activePlan];
  const fade = { opacity: fading ? 0 : 1, transition: 'opacity 160ms ease' } as const;

  return (
    <section id="paquetes" className="mx-auto max-w-[1180px] px-5 py-16 md:py-24">
      <div className="mb-8 md:mb-10">
        <h2 className="text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
          Explora nuestros paquetes y elige cómo quieres hacer crecer
          <span className="block text-lime text-[clamp(2.5rem,10vw,128px)] leading-[0.95] mt-2">tu marca.</span>
        </h2>
        <p className="mt-3 text-[13px] text-muted sm:whitespace-nowrap">
          Diferentes caminos, un mismo objetivo: hacer que tu marca destaque.
        </p>
      </div>

      <div ref={scrollRef} className="relative h-[500vh]">
        <div ref={cardRef} className="sticky top-0 z-[5] flex h-screen items-center">
          {isMobile ? (
            <PlansTicketMobile plan={plan} activePlan={activePlan} goToPlan={goToPlan} fade={fade} />
          ) : (
          <div
            className="relative flex w-full gap-0 text-white"
            style={{ containerType: 'inline-size', aspectRatio: '1159 / 547' }}
          >
            {/* left panel */}
            <div
              className="relative flex flex-1 flex-col overflow-hidden bg-[#0a0a0a]"
              style={{ borderRadius: '3.2cqw', padding: '4.4cqw 3.45cqw 3.45cqw', gap: '1.4cqw' }}
            >
              <div className="flex flex-col" style={{ flex: '0 0 auto', width: '52cqw', gap: '1cqw' }}>
                <h3
                  className="m-0 font-bold uppercase leading-[1.24] tracking-[-0.01em]"
                  style={{ fontSize: '2.4cqw', ...fade }}
                >
                  {renderAccented(plan.title, plan.accent)}
                </h3>
                <p className="m-0 leading-[1.5] text-white/85" style={{ fontSize: '1.22cqw', ...fade }}>
                  {plan.desc}
                </p>
              </div>
              <div
                className="overflow-hidden transition-colors duration-200"
                style={{ flex: '1 1 auto', minHeight: 0, width: '52cqw', borderRadius: '1.9cqw', background: plan.color }}
              />
              <ul
                className="absolute right-[4cqw] m-0 list-none p-0 text-right leading-[1.68]"
                style={{ fontSize: '2.45cqw', top: '72%', transform: 'translateY(-50%)' }}
              >
                {PLANS.map((p, i) => (
                  <li key={p.name} style={{ color: i === activePlan ? '#cefd00' : 'rgba(255,255,255,0.45)' }}>
                    <button
                      type="button"
                      onClick={() => goToPlan(i)}
                      className="cursor-pointer border-none bg-transparent p-0 font-[inherit] text-[inherit] transition-colors"
                    >
                      {p.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* right stub */}
            <div
              className="relative shrink-0 overflow-hidden bg-[#0a0a0a]"
              style={{ width: '19.24cqw', borderRadius: '3.2cqw' }}
            >
              <span
                className="absolute left-[52%] font-bold tracking-[-0.01em]"
                style={{
                  top: '6.6cqw',
                  fontSize: '3.9cqw',
                  writingMode: 'vertical-rl',
                  transform: 'translateX(-50%) rotate(180deg)',
                  ...fade,
                }}
              >
                {plan.price}
              </span>
              <div
                aria-hidden
                className="absolute left-[52%] -translate-x-1/2"
                style={{
                  top: '24.1cqw',
                  width: '7.2cqw',
                  height: '16.4cqw',
                  backgroundImage:
                    'repeating-linear-gradient(180deg,#fff 0 0.26cqw,#0a0a0a 0.26cqw 0.55cqw,#fff 0.55cqw 0.64cqw,#0a0a0a 0.64cqw 1.0cqw,#fff 1.0cqw 1.2cqw,#0a0a0a 1.2cqw 1.38cqw)',
                }}
              />
            </div>

            {/* CTA sticker */}
            <a
              href={`https://wa.me/593959204331?text=${encodeURIComponent('Hola, quiero información sobre el paquete ' + plan.name + '.')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablemos por WhatsApp"
              className="absolute z-10 transition-transform hover:rotate-[-8deg] hover:scale-105"
              style={{ left: '66cqw', top: '0.5cqw', width: '30cqw', height: '19cqw' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/sticker-make-it-epik.png"
                alt="Make It Epik"
                className="block h-full w-full object-contain"
              />
            </a>
          </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const gridRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = gridRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = vh + rect.height;
      const progress = total > 0 ? Math.min(Math.max((vh - rect.top) / total, 0), 1) : 0;
      const active = Math.max(1, Math.ceil(progress * PROCESSES.length));
      setActiveStep(active);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section id="como-funciona" className="py-20">
      <Container>
        <h2 className="text-center text-2xl font-bold uppercase tracking-tight text-ink md:text-4xl mb-14">
          Cómo
          <span className="block text-lime text-[clamp(2.5rem,10vw,128px)] leading-[0.95] mt-2">funciona</span>
        </h2>
        <ol ref={gridRef} className="relative grid list-none grid-cols-1 gap-8 p-0 sm:grid-cols-2 md:grid-cols-6 md:gap-4">
          <div aria-hidden className="absolute left-[8.33%] right-[8.33%] top-[37px] z-0 hidden h-1 bg-stone-300 md:block" />
          <div
            aria-hidden
            className="absolute left-[8.33%] top-[37px] z-0 hidden h-1 origin-left bg-lime transition-transform duration-300 md:block"
            style={{ width: 'calc(83.33%)', transform: `scaleX(${(activeStep - 1) / (PROCESSES.length - 1)})` }}
          />
          {PROCESSES.map((proc, i) => (
            <li key={i} className="relative z-10 flex flex-col items-center text-center" style={{ opacity: 0, transform: 'translateY(8px)', animation: `reveal-fade-in 300ms cubic-bezier(0.23,1,0.32,1) ${i * 50}ms forwards` }}>
              <span className="relative flex h-[78px] w-[92px] items-center justify-center text-2xl font-bold text-ink">
                <span
                  aria-hidden
                  className="absolute inset-0 z-0 transition-colors duration-300"
                  style={{
                    backgroundColor: i < activeStep ? '#cefd00' : '#d8d8d8',
                    WebkitMaskImage: "url('/assets/puzzle-piece.svg')",
                    maskImage: "url('/assets/puzzle-piece.svg')",
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                  }}
                />
                <span className="relative z-[1]">{proc.num}</span>
              </span>
              <h3 className="mt-5 max-w-[14ch] text-sm font-bold uppercase tracking-tight text-ink">{proc.title}</h3>
              <p className="mt-2.5 text-[13px] leading-snug text-muted">{proc.desc}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="preguntas" className="py-20">
      <Container>
        <div className="rounded-3xl border border-stone-200 bg-white p-12">
          <div className="mb-12 grid gap-8 md:grid-cols-3">
            <div>
              <h2 className="text-2xl font-bold text-ink mb-4">Preguntas frecuentes</h2>
              <p className="text-sm text-muted mb-6">Lo que más nos preguntan antes de empezar: alcance, permanencia, para quién trabajamos y cómo logramos que el contenido represente de verdad a tu marca.</p>
              <PillLink href="https://wa.me/593959204331?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20Epik%20Bizz." variant="outline">
                Hablemos
              </PillLink>
            </div>
            <div className="md:col-span-2 space-y-0 border-t border-t-ink">
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className="border-b border-b-ink" style={{ opacity: 0, transform: 'translateY(8px)', animation: `reveal-fade-in 300ms cubic-bezier(0.23,1,0.32,1) ${i * 50}ms forwards` }}>
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full py-5 text-left flex items-start justify-between gap-4 hover:opacity-60 transition"
                  >
                    <span className="text-base font-semibold tracking-tight text-ink">{item.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`mt-1 h-5 w-5 flex-shrink-0 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`}
                    >
                      <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="grid transition-all duration-200" style={{ gridTemplateRows: openIdx === i ? '1fr' : '0fr' }}>
                    <p className="overflow-hidden text-sm leading-relaxed text-muted">
                      <span className="block max-w-[460px] pb-5">{item.a}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-lime text-ink rounded-t-3xl mx-4 px-12 pt-12 pb-6 md:px-16 md:pt-16">
      <Container>
        <div className="mb-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Epik Bizz" className="mb-3 h-9 w-auto" />
            <p className="text-xs mb-4">Producción, estrategia y tecnología para la presencia digital de tu empresa.</p>
            <div className="flex gap-2">
              {[InstagramIcon, TikTokIcon, MailIcon, WhatsAppIcon].map((Icon, i) => (
                <a key={i} href="#" className="inline-flex h-9 w-9 items-center justify-center border border-ink rounded transition hover:bg-ink hover:text-lime">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 text-xs">
            <a href="#que-hacemos" className="text-ink hover:opacity-60">Qué hacemos</a>
            <a href="#paquetes" className="text-ink hover:opacity-60">Paquetes</a>
            <a href="#como-funciona" className="text-ink hover:opacity-60">Cómo funciona</a>
            <a href="#preguntas" className="text-ink hover:opacity-60">Preguntas</a>
          </div>
        </div>
        <div className="border-t border-t-ink/15 pt-6 text-xs opacity-55">
          © 2026 Epik Bizz. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes reveal-fade-in {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes liquid-press {
          0%   { transform: scale(1); border-radius: 999px; }
          30%  { transform: scale(0.88, 1.12); border-radius: 60px / 90px; }
          55%  { transform: scale(1.06, 0.9); border-radius: 999px; }
          78%  { transform: scale(0.97, 1.03); border-radius: 999px; }
          100% { transform: scale(1); border-radius: 999px; }
        }
        .liquid-btn { transition: transform 260ms cubic-bezier(0.34,1.56,0.64,1); }
        .liquid-btn:hover { transform: scale(1.04); }
        .liquid-btn:active { animation: liquid-press 480ms ease-out; }
        ::selection { background: #cefd00; color: #0b0b0b; }
      `}</style>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PlansSection />
        <ProcessSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
