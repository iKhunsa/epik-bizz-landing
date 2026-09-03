'use client';

import type { ReactNode, RefObject } from 'react';
import { useEffect, useRef, useState } from 'react';
import { InstagramIcon, TikTokIcon, MailIcon, WhatsAppIcon } from '@/components/icons';

const LIME = '#cefd00';
const WA_INFO =
  'https://wa.me/593959204331?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Epik%20Bizz.';
const waPlan = (name: string) =>
  `https://wa.me/593959204331?text=${encodeURIComponent('Hola, quiero información sobre el paquete ' + name + '.')}`;

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

/* shared placeholder fills for image slots (Figma nodes 9:x) */
const FILLS = ['#1e40af', '#047857', '#b45309', '#be123c', '#7c3aed'];

const PLANS = [
  { name: 'Origin', title: 'Empieza a existir en TikTok', accent: 'existir', desc: 'Hacemos que tu marca esté presente donde tu audiencia ya está mirando.', price: '$300', color: FILLS[0] },
  { name: 'Scale', title: 'Multiplica tu alcance.', accent: 'Multiplica', desc: 'Donde esté tu audiencia, ahí debe estar tu marca. Expandimos y optimizamos tu presencia en más canales con un solo mensaje coherente.', price: '$360', color: FILLS[1] },
  { name: 'Elevate', title: 'Amplifica tu alcance', accent: 'tu alcance', desc: 'Gestión completa de principio a fin usando Ads para que tu marca llegue aún más lejos.', price: '$450', color: FILLS[2] },
  { name: 'Focus', title: 'Dale dirección a tu marca', accent: 'dirección', desc: 'Resuelve dudas, define tu enfoque y fortalece tu identidad en redes sociales con una asesoría enfocada en tus objetivos actuales.', price: '$100', color: FILLS[3] },
  { name: 'Decode', title: 'BTC para impulsar tu empresa', accent: 'BTC para impulsar', desc: 'Entiende cómo Bitcoin puede transformar tu empresa en pagos, operaciones y generar nuevas oportunidades de negocio.', price: '$500', color: FILLS[4] },
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
  { tag: 'Producción audiovisual mensual', title: 'Contenido audiovisual creado a la medida de tu negocio.', desc: 'Sesiones de foto y video profesional, fresco y alineado con tu marca, listo para destacar.', color: FILLS[0] },
  { tag: 'Asesoría estratégica', title: 'Dirección para tomar mejores decisiones.', desc: 'Revisamos tu presencia digital, detectamos oportunidades y definimos los próximos pasos para hacer crecer tu marca.', color: FILLS[1] },
  { tag: 'Gestión de contenido', title: 'Tu contenido listo para mostrarse.', desc: 'Planificamos, creamos, organizamos y publicamos todo el contenido para que tus canales digitales estén activos.', color: FILLS[2] },
  { tag: 'Optimización de perfiles', title: 'Haz que tu marca se vea a la altura de tu negocio.', desc: 'Optimizamos tus perfiles para lograr una imagen coherente, profesional y estratégica en cada plataforma.', color: FILLS[4] },
  { tag: 'Publicidad paga', title: 'Pon tu marca frente a las personas correctas.', desc: 'Campañas con presupuesto optimizado para aumentar tu visibilidad.', color: FILLS[3] },
];

const FAQ_ITEMS = [
  { q: '¿Qué pasa si necesito algo que no está incluido en el paquete?', a: 'Te presentamos el alcance y el costo del servicio adicional antes de realizarlo. Nada se ejecuta ni se cobra sin tu aprobación previa.' },
  { q: '¿Cómo funciona la permanencia y la cancelación?', a: 'Nuestros paquetes tienen un compromiso mínimo de 3 meses de permanencia establecido mediante contrato. Si decides finalizar el servicio antes de cumplir este período, se aplicará un cargo por cancelación del saldo pendiente del contrato.' },
  { q: '¿Esto es para cualquier tipo de empresa?', a: 'Trabajamos con marcas que buscan construir una presencia digital sólida y profesional. Antes de comenzar analizamos tu negocio, objetivos y audiencia para determinar que es lo que mejor se adapta para tus objetivos.' },
  { q: '¿Ustedes se encargan de todo el proceso?', a: 'Absolutamente, desde la estrategia y planificación hasta la producción, publicación, publicidad y optimización. Tú nos das la información y el feedback necesario; nosotros nos encargamos de convertirlo en una presencia digital completa.' },
  { q: '¿Cómo hacen para que el contenido represente realmente a mi marca?', a: 'Antes de empezar a crear, conocemos tu empresa a fondo: tu propuesta, personalidad, objetivos, audiencia y competencia. Así construimos una comunicación coherente con quién eres y con lo que quieres transmitir.' },
];

/* ---------- reveal-on-scroll ---------- */

function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
}

/** Observes every [data-reveal] inside `ref` and marks it shown when it scrolls in. */
function useRevealChildren(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-shown])'));
    if (!items.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute('data-shown', '');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref]);
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute('data-shown', '');
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-reveal className={className} style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

/** rAF-throttled scroll/resize listener. */
function useRafScroll(cb: () => void) {
  useEffect(() => {
    let ticking = false;
    const run = () => {
      ticking = false;
      cb();
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(run);
    };
    cb();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

function renderAccented(title: string, accent?: string): ReactNode {
  if (!accent) return title;
  const idx = title.toLowerCase().indexOf(accent.toLowerCase());
  if (idx === -1) return title;
  return (
    <>
      {title.slice(0, idx)}
      <span style={{ color: LIME }}>{title.slice(idx, idx + accent.length)}</span>
      {title.slice(idx + accent.length)}
    </>
  );
}

function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-4 sm:px-5 lg:px-8 ${className}`}>{children}</div>;
}

function PillLink({
  href = '#preguntas',
  variant = 'solid',
  onClick,
  children,
}: {
  href?: string;
  variant?: 'solid' | 'outline';
  onClick?: () => void;
  children: ReactNode;
}) {
  const styles = {
    solid: 'bg-lime text-ink [@media(hover:hover)]:hover:brightness-95',
    outline: 'border border-ink text-ink [@media(hover:hover)]:hover:bg-ink [@media(hover:hover)]:hover:text-white',
  }[variant];
  return (
    <a
      href={href}
      onClick={onClick}
      className={`press inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-bold tracking-tight transition-[color,background-color,border-color,filter] duration-150 ${styles}`}
    >
      {children}
    </a>
  );
}

/* ---------- header + mobile menu ---------- */

function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white">
      <Container className="flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-header.svg" alt="Epik Bizz" className="h-9 w-auto sm:h-10" />
        </a>

        <nav className="hidden gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-ink transition-opacity duration-150 [@media(hover:hover)]:hover:opacity-60"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <PillLink href={WA_INFO} variant="solid">
              Hablemos
            </PillLink>
          </div>
          <button
            type="button"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="press flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* mobile panel */}
      <div
        className="fixed inset-x-0 top-[72px] bottom-0 z-40 md:hidden"
        style={{
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
          transition: reduce ? 'none' : 'opacity 200ms var(--ease-out)',
        }}
        aria-hidden={!open}
      >
        <nav
          className="absolute inset-0 flex flex-col gap-1 overflow-y-auto bg-white px-4 pb-10 pt-4"
          style={{
            transform: open ? 'translateY(0)' : 'translateY(-8px)',
            transition: reduce ? 'none' : 'transform 220ms var(--ease-out)',
          }}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="press rounded-2xl px-3 py-3 text-xl font-bold uppercase tracking-tight text-ink"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-3 px-1">
            <PillLink href={WA_INFO} variant="solid" onClick={() => setOpen(false)}>
              Hablemos
            </PillLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function HeroBento() {
  return (
    <Reveal className="relative mx-auto mt-6 flex w-full max-w-[1000px] flex-col gap-4 text-left md:mt-8 md:flex-row">
      {/* decorative gradient anchored to the bento */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[30%] -top-6 bottom-[-4%] -z-10 w-[45%] sm:w-[42%] md:w-[40%]"
        style={{ background: `linear-gradient(to bottom, ${LIME} 0%, ${LIME} 30%, rgba(206,253,0,0) 100%)` }}
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

      <div className="relative min-h-[140px] rounded-[20px] bg-ink md:min-h-0 md:w-[38%] md:[height:clamp(240px,32vh,360px)]" />

      <div className="flex flex-1 flex-col gap-3 md:gap-4">
        <div className="relative min-h-[110px] flex-1 md:min-h-[150px]">
          <div className="absolute inset-0 rounded-[24px] bg-ink" />
          <div className="group/cta absolute right-4 top-4 h-[48px] w-[188px]">
            <div className="absolute inset-0" style={{ filter: 'url(#ctaGoo)' }}>
              <div className="absolute left-0 top-0 h-[48px] w-[146px] rounded-full bg-white transition-colors duration-200 group-hover/cta:bg-lime [@media(hover:hover)]:group-hover/cta:animate-[liquid-press_320ms_var(--ease-out)] group-active/cta:animate-[liquid-press_320ms_var(--ease-out)]" />
              <div className="absolute right-0 top-0 h-[48px] w-[48px] rounded-full bg-white transition-colors duration-200 group-hover/cta:bg-lime [@media(hover:hover)]:group-hover/cta:animate-[liquid-press_320ms_var(--ease-out)] group-active/cta:animate-[liquid-press_320ms_var(--ease-out)]" />
            </div>
            <a
              href={WA_INFO}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-0 top-0 flex h-[48px] w-[146px] items-center justify-center text-sm font-bold text-ink"
            >
              Hablemos
            </a>
            <a
              href={WA_INFO}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hablemos por WhatsApp"
              className="absolute right-0 top-0 flex h-[48px] w-[48px] items-center justify-center text-base text-ink"
            >
              ✉
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="min-h-[54px] rounded-[16px] bg-ink md:min-h-[110px] md:rounded-[20px]" />
          <div className="min-h-[54px] rounded-[16px] bg-ink md:min-h-[110px] md:rounded-[20px]" />
          <div className="min-h-[54px] rounded-[16px] bg-ink md:min-h-[110px] md:rounded-[20px]" />
        </div>
      </div>
    </Reveal>
  );
}

function HeroSection() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let swap: number;
    const timer = window.setInterval(() => {
      setHeroOpacity(0);
      swap = window.setTimeout(() => {
        setHeroIdx((i) => (i + 1) % HERO_LINES.length);
        setHeroOpacity(1);
      }, 300);
    }, 4600);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(swap);
    };
  }, [reduce]);

  const [lead, accent] = HERO_LINES[heroIdx];
  return (
    <section
      id="top"
      className="relative flex flex-col justify-center py-6 md:py-8"
      style={{ minHeight: 'calc(100svh - 72px)' }}
    >
      <Container className="relative text-center">
        <h1
          className="mx-auto flex max-w-4xl flex-col items-center justify-center font-bold uppercase tracking-tight"
          style={{
            minHeight: 'clamp(6.5rem, 24vw, 12.5rem)',
            opacity: heroOpacity,
            transition: 'opacity 300ms var(--ease-out)',
          }}
        >
          <span className="text-ink leading-tight" style={{ fontSize: 'var(--text-lead)' }}>
            {lead}
          </span>
          <span className="block text-lime leading-[0.92]" style={{ fontSize: 'var(--text-display)' }}>
            {accent}
          </span>
        </h1>
        <HeroBento />
        <p className="mx-auto mt-6 max-w-3xl text-muted" style={{ fontSize: 'var(--text-body)' }}>
          Damos forma a tus ideas con diseño, contenido, estrategia y tecnología para llevar la esencia
          <br className="hidden sm:inline" /> de tu marca al mundo digital y hacer que destaque.
        </p>
      </Container>
    </section>
  );
}

/* ---------- services ---------- */

function ServicesSection() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];

  return (
    <section id="que-hacemos" className="relative py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-[62%] -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] md:h-[880px] md:w-[880px]"
        style={{
          background:
            'radial-gradient(circle at 45% 45%, rgba(206,253,0,0.85), rgba(150,235,140,0.45) 42%, rgba(124,58,237,0.2) 68%, rgba(255,255,255,0) 80%)',
        }}
      />
      <Container>
        <Reveal className="mb-10 text-left md:text-right">
          <h2
            className="font-bold uppercase tracking-tight text-ink"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            Tu equipo tiene una empresa que dirigir.
            <span className="mt-2 block text-lime leading-[0.95]" style={{ fontSize: 'var(--text-display-sm)' }}>
              Nosotros la hacemos destacar.
            </span>
          </h2>
          <p className="mt-4 text-muted" style={{ fontSize: 'var(--text-body)' }}>
            Epik Bizz gestiona tu presencia digital, desde las ideas a la publicación.
            <strong className="block font-bold text-ink">Y logramos que se vea así.</strong>
          </p>
        </Reveal>

        <Reveal delay={80} className="overflow-hidden rounded-[28px]">
          <div
            aria-label={svc.title}
            className="w-full rounded-[28px]"
            style={{
              aspectRatio: '16 / 9',
              background: svc.color,
              transition: 'background-color 400ms var(--ease-out)',
            }}
          />
          <div className="mt-3 flex justify-start gap-2.5 overflow-x-auto px-1 py-2 [scrollbar-width:none] sm:gap-3 md:mt-4 md:overflow-visible">
            {SERVICES.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active}
                className={`press group relative h-16 w-28 flex-shrink-0 snap-start overflow-hidden rounded-xl text-left transition-opacity duration-150 sm:h-20 sm:w-32 md:h-24 md:w-auto md:min-w-0 md:flex-1 ${
                  i === active ? 'opacity-100 ring-2 ring-ink ring-offset-2' : 'opacity-55 [@media(hover:hover)]:hover:opacity-100'
                }`}
                style={{ background: s.color }}
              >
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-[10px] font-bold uppercase leading-tight text-white">
                  {s.tag}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------- plans ---------- */

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
      <div
        className="relative flex flex-col overflow-visible bg-[#0b0b0b]"
        style={{ borderRadius: '7cqw', padding: '5cqw', gap: '4.5cqw' }}
      >
        <div className="relative">
          <div
            className="w-full"
            style={{
              aspectRatio: '3 / 4',
              borderRadius: '5.5cqw',
              background: plan.color,
              transition: 'background-color 300ms var(--ease-out)',
            }}
          />
          <a
            href={waPlan(plan.name)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Hablemos por WhatsApp"
            className="absolute z-10"
            style={{ right: '0cqw', bottom: '6cqw', width: '36cqw', height: '23cqw' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/sticker-make-it-epik.png" alt="Make It Epik" className="block h-full w-full object-contain" />
          </a>
        </div>
        <h3 className="m-0 font-bold uppercase leading-[1.15] tracking-[-0.01em]" style={{ fontSize: '7.4cqw', ...fade }}>
          {renderAccented(plan.title, plan.accent)}
        </h3>
        <p className="m-0 leading-[1.55] text-white/80" style={{ fontSize: '3.4cqw', ...fade }}>
          {plan.desc}
        </p>
      </div>

      <div
        className="flex items-center justify-between bg-[#0b0b0b]"
        style={{ borderRadius: '7cqw', padding: '6cqw' }}
      >
        <div
          aria-hidden
          style={{
            width: '34cqw',
            height: '13cqw',
            backgroundImage:
              'repeating-linear-gradient(90deg,#fff 0 1cqw,#0b0b0b 1cqw 2.1cqw,#fff 2.1cqw 2.5cqw,#0b0b0b 2.5cqw 3.9cqw,#fff 3.9cqw 4.7cqw,#0b0b0b 4.7cqw 5.4cqw)',
          }}
        />
        <a
          href={waPlan(plan.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="press flex items-center justify-center gap-[2cqw] rounded-full bg-lime font-bold text-ink transition-[filter] duration-150 [@media(hover:hover)]:hover:brightness-95"
          style={{ padding: '3cqw 6cqw', fontSize: '4.4cqw' }}
        >
          Hablemos
          <svg viewBox="0 0 24 24" fill="none" style={{ width: '5cqw', height: '5cqw' }}>
            <path d="M7 17 17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <ul className="m-0 flex list-none flex-wrap justify-center p-0" style={{ fontSize: '4.4cqw', gap: '4cqw', columnGap: '5cqw' }}>
        {PLANS.map((p, i) => (
          <li key={p.name} style={{ color: i === activePlan ? LIME : 'rgba(11,11,11,0.4)' }}>
            <button
              type="button"
              onClick={() => goToPlan(i)}
              className="press cursor-pointer border-none bg-transparent p-0 font-[inherit] font-bold uppercase text-[inherit] transition-colors duration-150"
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
  const fadeTimer = useRef<number>(0);

  useRafScroll(() => {
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
      window.clearTimeout(fadeTimer.current);
      fadeTimer.current = window.setTimeout(() => setFading(false), 160);
      return idx;
    });
  });

  useEffect(() => () => window.clearTimeout(fadeTimer.current), []);

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
  const fade = { opacity: fading ? 0 : 1, transition: 'opacity 160ms var(--ease-out)' } as const;

  return (
    <section id="paquetes" className="mx-auto max-w-[1180px] px-4 py-16 sm:px-5 md:py-24 lg:px-8">
      <Reveal className="mb-8 md:mb-10">
        <h2 className="font-bold uppercase tracking-tight text-ink" style={{ fontSize: 'var(--text-h2)' }}>
          Explora nuestros paquetes y elige cómo quieres hacer crecer
          <span className="mt-2 block text-lime leading-[0.95]" style={{ fontSize: 'var(--text-display)' }}>
            tu marca.
          </span>
        </h2>
        <p className="mt-3 max-w-md text-muted" style={{ fontSize: 'var(--text-body)' }}>
          Diferentes caminos, un mismo objetivo: hacer que tu marca destaque.
        </p>
      </Reveal>

      <div ref={scrollRef} className="relative h-[500svh]">
        <div ref={cardRef} className="sticky top-0 z-[5] flex min-h-[100svh] items-center">
          {isMobile ? (
            <PlansTicketMobile plan={plan} activePlan={activePlan} goToPlan={goToPlan} fade={fade} />
          ) : (
            <div className="relative w-full text-white" style={{ containerType: 'inline-size', aspectRatio: '1159 / 547' }}>
              <div className="absolute inset-0 bg-[#0b0b0b]" style={{ right: '18.79cqw', borderRadius: '3.2cqw' }} />
              <div className="absolute inset-0 bg-[#0b0b0b]" style={{ left: '81.21cqw', borderRadius: '3.2cqw' }} />

              <div className="absolute flex flex-col" style={{ left: '4.66cqw', top: '3.19cqw', width: '60.14cqw', gap: '0.6cqw' }}>
                <h3 className="m-0 font-bold uppercase" style={{ fontSize: '3.45cqw', lineHeight: 1, ...fade }}>
                  {renderAccented(plan.title, plan.accent)}
                </h3>
                <p className="m-0 text-white" style={{ fontSize: '1.73cqw', lineHeight: 1.15, ...fade }}>
                  {plan.desc}
                </p>
              </div>

              <div
                className="absolute"
                style={{
                  top: '13.45cqw',
                  left: '3.19cqw',
                  right: '35.19cqw',
                  bottom: '3.36cqw',
                  borderRadius: '1.9cqw',
                  background: plan.color,
                  transition: 'background-color 300ms var(--ease-out)',
                }}
              />

              <ul className="absolute m-0 list-none p-0" style={{ left: '67.39cqw', top: '23.21cqw', width: '9.33cqw' }}>
                {PLANS.map((p, i) => (
                  <li
                    key={p.name}
                    style={{
                      height: '4.28cqw',
                      fontSize: '2.76cqw',
                      lineHeight: '3.59cqw',
                      color: i === activePlan ? LIME : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => goToPlan(i)}
                      className="w-full cursor-pointer border-none bg-transparent p-0 text-center font-[inherit] text-[inherit] transition-colors duration-150"
                    >
                      {p.name}
                    </button>
                  </li>
                ))}
              </ul>

              <div
                className="absolute z-10 flex flex-col items-center"
                style={{ left: '90.6cqw', top: '50%', transform: 'translate(-50%,-50%)', gap: '3cqw' }}
              >
                <div className="relative" style={{ width: '3.8cqw', height: '15cqw' }}>
                  <a
                    href={waPlan(plan.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="press absolute left-1/2 top-1/2 flex items-center justify-center gap-[0.6cqw] rounded-full bg-lime font-bold text-ink transition-[filter] duration-150 [@media(hover:hover)]:hover:brightness-95"
                    style={{ width: '15cqw', height: '3.8cqw', fontSize: '1.65cqw', transform: 'translate(-50%,-50%) rotate(-90deg)' }}
                  >
                    Hablemos
                    <svg viewBox="0 0 24 24" fill="none" style={{ width: '1.9cqw', height: '1.9cqw' }}>
                      <path d="M7 17 17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <div
                  aria-hidden
                  style={{
                    width: '7.29cqw',
                    height: '14cqw',
                    backgroundImage:
                      'repeating-linear-gradient(180deg,#fff 0 0.28cqw,#0b0b0b 0.28cqw 0.6cqw,#fff 0.6cqw 0.72cqw,#0b0b0b 0.72cqw 1.15cqw,#fff 1.15cqw 1.5cqw,#0b0b0b 1.5cqw 1.85cqw)',
                  }}
                />
              </div>

              <a
                href={waPlan(plan.name)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hablemos por WhatsApp"
                className="hover-tilt absolute z-10"
                style={{ left: '69.46cqw', top: '3.88cqw', width: '17.34cqw', aspectRatio: '279 / 294' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/sticker-make-it-epik.png" alt="Make It Epik" className="block h-full w-full object-contain" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- process ---------- */

function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const gridRef = useRef<HTMLOListElement>(null);
  useRevealChildren(gridRef);

  useRafScroll(() => {
    const el = gridRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = vh + rect.height;
    const progress = total > 0 ? Math.min(Math.max((vh - rect.top) / total, 0), 1) : 0;
    setActiveStep(Math.max(1, Math.ceil(progress * PROCESSES.length)));
  });

  const fillRatio = (activeStep - 1) / (PROCESSES.length - 1);

  return (
    <section id="como-funciona" className="py-20">
      <Container>
        <Reveal className="mb-14 text-center">
          <h2 className="font-bold uppercase tracking-tight text-ink" style={{ fontSize: 'var(--text-h2)' }}>
            Un proceso simple
            <span className="mt-2 block text-lime leading-[0.95]" style={{ fontSize: 'var(--text-display)' }}>
              de principio a fin
            </span>
          </h2>
        </Reveal>

        <ol
          ref={gridRef}
          className="relative grid list-none grid-cols-1 gap-10 p-0 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6 lg:gap-4"
        >
          {/* mobile: vertical connector behind the centered badges */}
          <div
            aria-hidden
            className="absolute left-1/2 top-6 bottom-6 z-0 w-0.5 -translate-x-1/2 bg-track sm:hidden"
          />
          <div aria-hidden className="absolute left-[8.33%] right-[8.33%] top-[37px] z-0 hidden h-1 bg-track lg:block" />
          <div
            aria-hidden
            className="absolute left-[8.33%] top-[37px] z-0 hidden h-1 origin-left bg-lime lg:block"
            style={{ width: '83.33%', transform: `scaleX(${fillRatio})`, transition: 'transform 400ms var(--ease-out)' }}
          />
          {PROCESSES.map((proc, i) => (
            <li
              key={i}
              data-reveal
              className="relative z-10 flex flex-col items-center text-center"
              style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
            >
              <span className="relative flex h-[78px] w-[92px] items-center justify-center text-2xl font-bold text-ink">
                <span
                  aria-hidden
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundColor: i < activeStep ? LIME : 'var(--color-track)',
                    transition: 'background-color 300ms var(--ease-out)',
                    WebkitMaskImage: "url('/assets/step-shape.svg')",
                    maskImage: "url('/assets/step-shape.svg')",
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
              <h3 className="mt-5 max-w-[16ch] font-bold uppercase tracking-tight text-ink" style={{ fontSize: 'var(--text-body)' }}>
                {proc.title}
              </h3>
              <p className="mt-2.5 leading-snug text-muted" style={{ fontSize: 'var(--text-body)' }}>
                {proc.desc}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------- faq ---------- */

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  useRevealChildren(listRef);

  return (
    <section id="preguntas" className="py-20">
      <Container>
        <div className="rounded-3xl border border-hairline bg-white p-6 sm:p-8 md:p-12">
          <div className="mb-8 grid gap-8 md:mb-12 md:grid-cols-3">
            <Reveal>
              <h2 className="mb-4 font-bold tracking-tight text-ink" style={{ fontSize: 'var(--text-h2)' }}>
                Preguntas frecuentes
              </h2>
              <p className="mb-6 text-muted" style={{ fontSize: 'var(--text-body)' }}>
                Lo que más nos preguntan antes de empezar: alcance, permanencia, para quién trabajamos y
                cómo logramos que el contenido represente de verdad a tu marca.
              </p>
              <PillLink href="https://wa.me/593959204331?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20Epik%20Bizz." variant="outline">
                Hablemos
              </PillLink>
            </Reveal>

            <div ref={listRef} className="border-t border-t-ink md:col-span-2">
              {FAQ_ITEMS.map((item, i) => {
                const open = openIdx === i;
                return (
                  <div
                    key={i}
                    data-reveal
                    className="border-b border-b-ink"
                    style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
                  >
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      aria-expanded={open}
                      className="press flex w-full items-start justify-between gap-4 py-5 text-left transition-opacity duration-150 [@media(hover:hover)]:hover:opacity-60"
                    >
                      <span className="font-bold tracking-tight text-ink" style={{ fontSize: '1rem' }}>
                        {item.q}
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`mt-1 h-5 w-5 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
                        style={{ transition: 'transform 200ms var(--ease-out)' }}
                      >
                        <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div
                      className="grid"
                      style={{
                        gridTemplateRows: open ? '1fr' : '0fr',
                        transition: 'grid-template-rows 240ms var(--ease-out)',
                      }}
                    >
                      <p className="overflow-hidden leading-relaxed text-muted" style={{ fontSize: 'var(--text-body)' }}>
                        <span className="block max-w-[460px] pb-5">{item.a}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="mx-4 rounded-t-3xl bg-lime px-6 pb-6 pt-12 text-ink sm:px-10 md:px-16 md:pt-16">
      <Container>
        <Reveal className="mb-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Epik Bizz" className="mb-3 h-9 w-auto" />
            <p className="mb-4" style={{ fontSize: 'var(--text-caption)' }}>
              Producción, estrategia y tecnología para la presencia digital de tu empresa.
            </p>
            <div className="flex gap-2">
              {[InstagramIcon, TikTokIcon, MailIcon, WhatsAppIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="press inline-flex h-9 w-9 items-center justify-center rounded border border-ink transition-colors duration-150 [@media(hover:hover)]:hover:bg-ink [@media(hover:hover)]:hover:text-lime"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4" style={{ fontSize: 'var(--text-caption)' }}>
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-ink transition-opacity duration-150 [@media(hover:hover)]:hover:opacity-60"
              >
                {item.label}
              </a>
            ))}
          </div>
        </Reveal>
        <div
          className="border-t border-t-ink/15 pt-6 opacity-55"
          style={{ fontSize: 'var(--text-caption)' }}
        >
          © 2026 Epik Bizz. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
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
