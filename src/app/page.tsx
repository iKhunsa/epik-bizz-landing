'use client';

import type { ReactNode, RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { InstagramIcon, TikTokIcon, MailIcon, WhatsAppIcon } from '@/components/icons';
import { LanguageProvider, useI18n, LOCALES, type Locale } from '@/lib/i18n';

const LIME = '#cefd00';

const waLink = (msg: string) => `https://wa.me/593959204331?text=${encodeURIComponent(msg)}`;

const NAV_HREFS = ['#que-hacemos', '#paquetes', '#como-funciona', '#preguntas'] as const;

/* shared placeholder fills for image slots (Figma nodes 9:x) */
const FILLS = ['#1e40af', '#047857', '#b45309', '#be123c', '#7c3aed'];

const PLANS_BASE = [
  { name: 'Origin', price: '$300', video: '/assets/plan-origin.mp4' },
  { name: 'Scale', price: '$360', video: '/assets/plan-scale.mp4' },
  { name: 'Elevate', price: '$450', video: '/assets/plan-elevate.mp4' },
  { name: 'Focus', price: '$100', video: '/assets/plan-focus.mp4' },
  { name: 'Decode', price: '$500', video: '/assets/plan-decode.mp4' },
];

const PROCESSES_BASE = [{ num: '01' }, { num: '02' }, { num: '03' }, { num: '04' }, { num: '05' }, { num: '06' }];

const SERVICES_BASE = [
  { image: '/assets/service-1.jpg' },
  { image: '/assets/service-2.jpg' },
  { image: '/assets/service-3.jpg' },
  { image: '/assets/service-4.jpg' },
  { image: '/assets/service-5.jpg' },
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

/* ---------- language switcher ---------- */

function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t.chooseLanguage}
        aria-expanded={open}
        className="press flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-150 [@media(hover:hover)]:hover:bg-black/5"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9Z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 max-h-80 w-44 overflow-y-auto rounded-2xl border border-hairline bg-white p-1.5 shadow-lg">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition-colors duration-150 [@media(hover:hover)]:hover:bg-black/5 ${
                l.code === locale ? 'font-bold text-ink' : 'text-ink/70'
              }`}
            >
              {l.nativeLabel}
              {l.code === locale && <span style={{ color: LIME }}>●</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- header + mobile menu ---------- */

function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const nav = NAV_HREFS.map((href, i) => ({
    href,
    label: [t.nav.queHacemos, t.nav.paquetes, t.nav.comoFunciona, t.nav.preguntas][i],
  }));

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
          {nav.map((item) => (
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
          <LanguageSwitcher />
          <div className="hidden sm:block">
            <PillLink href={waLink(t.wa.info)} variant="solid">
              {t.hablemos}
            </PillLink>
          </div>
          <button
            type="button"
            aria-label={open ? t.closeMenu : t.openMenu}
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
          {nav.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="press rounded-2xl px-3 py-3 text-xl font-bold uppercase tracking-tight text-ink"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? 'none' : 'translateY(6px)',
                transition: reduce ? 'none' : 'opacity 200ms var(--ease-out), transform 200ms var(--ease-out)',
                transitionDelay: open && !reduce ? `${i * 40}ms` : '0ms',
              }}
            >
              {item.label}
            </a>
          ))}
          <div
            className="mt-3 px-1"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? 'none' : 'translateY(6px)',
              transition: reduce ? 'none' : 'opacity 200ms var(--ease-out), transform 200ms var(--ease-out)',
              transitionDelay: open && !reduce ? `${nav.length * 40}ms` : '0ms',
            }}
          >
            <PillLink href={waLink(t.wa.info)} variant="solid" onClick={() => setOpen(false)}>
              {t.hablemos}
            </PillLink>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

function HeroBento() {
  const bentoRef = useRef<HTMLDivElement>(null);
  useRevealChildren(bentoRef);
  const { t } = useI18n();
  const waInfo = waLink(t.wa.info);
  return (
    <div
      ref={bentoRef}
      className="relative mx-auto mt-6 flex w-full max-w-[1000px] flex-col gap-4 text-left md:mt-8 md:flex-row"
    >
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <filter id="ctaGoo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
            <feColorMatrix in="b" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="g" />
            <feBlend in="SourceGraphic" in2="g" />
          </filter>
        </defs>
      </svg>

      <div
        data-reveal
        style={{ '--reveal-delay': '0ms' } as React.CSSProperties}
        className="relative min-h-[140px] overflow-hidden rounded-[20px] bg-ink md:min-h-0 md:w-[38%]"
      >
        <video
          src="/assets/hero-bento-video.mp4"
          className="h-full w-full object-cover"
          style={{ aspectRatio: '16 / 9' }}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 md:gap-4">
        <div
          data-reveal
          style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
          className="relative min-h-[110px] flex-1 md:min-h-[150px]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-[24px] bg-ink">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/hero-bento-cta.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="group/cta absolute right-4 top-4 h-[48px] w-[188px]">
            <div className="absolute inset-0" style={{ filter: 'url(#ctaGoo)' }}>
              <div className="absolute left-0 top-0 h-[48px] w-[146px] rounded-full bg-white transition-colors duration-200 group-hover/cta:bg-lime [@media(hover:hover)]:group-hover/cta:animate-[liquid-press_320ms_var(--ease-out)] group-active/cta:animate-[liquid-press_320ms_var(--ease-out)]" />
              <div className="absolute right-0 top-0 h-[48px] w-[48px] rounded-full bg-white transition-colors duration-200 group-hover/cta:bg-lime [@media(hover:hover)]:group-hover/cta:animate-[liquid-press_320ms_var(--ease-out)] group-active/cta:animate-[liquid-press_320ms_var(--ease-out)]" />
            </div>
            <a
              href={waInfo}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-0 top-0 flex h-[48px] w-[146px] items-center justify-center text-sm font-bold text-ink"
            >
              {t.hablemos}
            </a>
            <a
              href={waInfo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.waAria}
              className="absolute right-0 top-0 flex h-[48px] w-[48px] items-center justify-center text-base text-ink"
            >
              ✉
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { delay: 140, src: '/assets/hero-bento-photo-2.jpg' },
            { delay: 190, src: '/assets/hero-bento-photo.jpg' },
            { delay: 240, src: '/assets/hero-bento-photo-3.jpg' },
          ].map(({ delay, src }) => (
            <div
              key={delay}
              data-reveal
              style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
              className="min-h-[54px] overflow-hidden rounded-[16px] bg-ink md:min-h-[110px] md:rounded-[20px]"
            >
              {src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" className="h-full w-full object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  const { t } = useI18n();
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroOpacity, setHeroOpacity] = useState(1);
  const reduce = useReducedMotion();
  const lineCount = t.hero.lines.length;

  useEffect(() => {
    if (reduce) return;
    let swap: number;
    const timer = window.setInterval(() => {
      setHeroOpacity(0);
      swap = window.setTimeout(() => {
        setHeroIdx((i) => (i + 1) % lineCount);
        setHeroOpacity(1);
      }, 300);
    }, 4600);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(swap);
    };
  }, [reduce, lineCount]);

  const [lead, accent] = t.hero.lines[heroIdx % t.hero.lines.length];
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
          {t.hero.body1}
          <br className="hidden sm:inline" /> {t.hero.body2}
        </p>
      </Container>
    </section>
  );
}

/* ---------- services ---------- */

function ServicesSection() {
  const { t } = useI18n();
  const SERVICES = SERVICES_BASE.map((s, i) => ({ ...s, ...t.services.items[i] }));
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rowRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    const idx = (i + SERVICES.length) % SERVICES.length;
    setActive(idx);
    btnRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const step = (dir: 1 | -1) => {
    const idx = (active + dir + SERVICES.length) % SERVICES.length;
    setActive(idx);
    const row = rowRef.current;
    const card = btnRefs.current[idx] ?? btnRefs.current.find(Boolean);
    if (!row || !card) return;
    const gap = parseFloat(getComputedStyle(row).columnGap || '0') || 0;
    row.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <section id="que-hacemos" className="relative py-20">
      <Container>
        <Reveal className="mb-10 text-left md:text-right">
          <h2
            className="font-bold uppercase tracking-tight text-ink"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {t.services.heading1}
            <span className="mt-2 block text-lime leading-[0.95]" style={{ fontSize: 'var(--text-display-sm)' }}>
              {t.services.heading2}
            </span>
          </h2>
          <p className="mt-4 text-muted" style={{ fontSize: 'var(--text-body)' }}>
            {t.services.body1}
            <strong className="block font-bold text-ink">{t.services.body2}</strong>
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] md:aspect-[16/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={active}
              src={svc.image}
              alt={svc.title}
              className="h-full w-full object-cover"
              style={{ animation: 'swap-in 420ms var(--ease-out)' }}
            />
            <div aria-hidden className="absolute inset-0 bg-black/50 md:hidden" />
            <div
              key={`copy-${active}`}
              className="absolute inset-0 flex flex-col justify-end gap-1.5 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 sm:p-8"
              style={{ animation: 'swap-in 420ms var(--ease-out)' }}
            >
              <span className="text-xs font-bold uppercase tracking-wide text-white sm:text-sm">
                {svc.tag}
              </span>
              <p className="max-w-lg text-lg font-bold text-lime sm:text-2xl">{svc.title}</p>
              <p className="max-w-lg text-sm text-white/85 sm:text-base">{svc.desc}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 md:mt-4">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={t.services.prevAria}
              className="press flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-150 [@media(hover:hover)]:hover:bg-ink [@media(hover:hover)]:hover:text-white md:h-10 md:w-10"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 md:h-5 md:w-5">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="relative min-w-0 flex-1">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent"
              />
              <div ref={rowRef} className="flex justify-end gap-2.5 overflow-x-auto px-1 py-2 [scrollbar-width:none] sm:gap-3">
                {SERVICES.map((s, i) => (
                  <button
                    key={i}
                    ref={(el) => {
                      btnRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={i === active}
                    className={`press group relative h-16 w-28 flex-shrink-0 snap-start overflow-hidden rounded-xl bg-cover bg-center text-left transition-[opacity,box-shadow] duration-200 sm:h-20 sm:w-32 md:h-24 md:w-40 ${
                      i === active ? 'opacity-100 ring-2 ring-ink ring-offset-2' : 'opacity-55 [@media(hover:hover)]:hover:opacity-100'
                    }`}
                    style={{ backgroundImage: `url(${s.image})` }}
                  >
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-[10px] font-bold uppercase leading-tight text-white">
                      {s.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label={t.services.nextAria}
              className="press flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-150 [@media(hover:hover)]:hover:bg-ink [@media(hover:hover)]:hover:text-white md:h-10 md:w-10"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 md:h-5 md:w-5">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
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

type Plan = (typeof PLANS_BASE)[number] & { title: string; accent?: string; desc: string };

function PlansTicketMobile({
  plan,
  activePlan,
  goToPlan,
  fade,
}: {
  plan: Plan;
  activePlan: number;
  goToPlan: (i: number) => void;
  fade: { opacity: number; transition: string };
}) {
  const { t } = useI18n();
  const waPlan = (name: string) => waLink(t.wa.plan.replace('{name}', name));
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
          <video
            key={activePlan}
            src={plan.video}
            className="w-full object-cover"
            style={{
              aspectRatio: '3 / 4',
              borderRadius: '5.5cqw',
              animation: 'swap-in 380ms var(--ease-out)',
            }}
            autoPlay
            loop
            muted
            playsInline
          />
          <a
            href={waPlan(plan.name)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.waAria}
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
          {t.hablemos}
          <svg viewBox="0 0 24 24" fill="none" style={{ width: '5cqw', height: '5cqw' }}>
            <path d="M7 17 17 7M17 7H8M17 7v9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <ul className="m-0 flex list-none flex-wrap justify-center p-0" style={{ fontSize: '4.4cqw', gap: '4cqw', columnGap: '5cqw' }}>
        {PLANS_BASE.map((p, i) => (
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
  const { t } = useI18n();
  const PLANS = PLANS_BASE.map((p, i) => ({ ...p, ...t.plans.items[i] }));
  const waPlan = (name: string) => waLink(t.wa.plan.replace('{name}', name));
  const isMobile = useIsMobile();
  const [activePlan, setActivePlan] = useState(0);
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const activePlanRef = useRef(0);
  const wheelLockRef = useRef(false);
  const dockedRef = useRef(false);

  useEffect(() => () => window.clearTimeout(fadeTimer.current), []);
  useEffect(() => {
    activePlanRef.current = activePlan;
  }, [activePlan]);

  const goToPlan = useCallback((i: number) => {
    if (i === activePlanRef.current) return;
    setFading(true);
    window.clearTimeout(fadeTimer.current);
    fadeTimer.current = window.setTimeout(() => {
      setActivePlan(i);
      setFading(false);
    }, 160);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const docked = rect.top <= 0 && rect.bottom > 0;
      if (!docked) {
        dockedRef.current = false;
        return;
      }
      if (!dockedRef.current) {
        dockedRef.current = true;
        e.preventDefault();
        section.scrollIntoView({ block: 'start', behavior: 'instant' });
        return;
      }

      const goingDown = e.deltaY > 0;
      const atEnd = goingDown && activePlanRef.current === PLANS.length - 1;
      const atStart = !goingDown && activePlanRef.current === 0;
      if (atEnd || atStart) return;

      e.preventDefault();
      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      goToPlan(activePlanRef.current + (goingDown ? 1 : -1));
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 550);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [isMobile, goToPlan]);

  const plan = PLANS[activePlan];
  const fade = { opacity: fading ? 0 : 1, transition: 'opacity 160ms var(--ease-out)' } as const;

  return (
    <section ref={sectionRef} id="paquetes" className="mx-auto max-w-[1180px] px-4 pt-20 pb-[51px] sm:px-5 lg:px-8">
      <Reveal>
        <h2 className="font-bold uppercase tracking-tight text-ink" style={{ fontSize: 'var(--text-h2)' }}>
          {t.plans.heading1}
          <span className="mt-2 block text-lime leading-[0.95]" style={{ fontSize: 'var(--text-display)' }}>
            {t.plans.heading2}
          </span>
        </h2>
        <p className="mt-3 max-w-md text-muted" style={{ fontSize: 'var(--text-body)' }}>
          {t.plans.body}
        </p>
      </Reveal>

      <div className="mt-8 flex items-center justify-center">
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
                className="absolute overflow-hidden"
                style={{
                  top: '13.45cqw',
                  left: '3.19cqw',
                  right: '35.19cqw',
                  bottom: '3.36cqw',
                  borderRadius: '1.9cqw',
                }}
              >
                <video
                  key={activePlan}
                  src={plan.video}
                  className="h-full w-full object-cover"
                  style={{ animation: 'swap-in 380ms var(--ease-out)' }}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>

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
                    {t.hablemos}
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
                aria-label={t.waAria}
                className="hover-tilt absolute z-10"
                style={{ left: '69.46cqw', top: '3.88cqw', width: '17.34cqw', aspectRatio: '279 / 294' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/sticker-make-it-epik.png" alt="Make It Epik" className="block h-full w-full object-contain" />
              </a>
            </div>
          )}
      </div>
    </section>
  );
}

/* ---------- process ---------- */

function ProcessSection() {
  const { t } = useI18n();
  const PROCESSES = PROCESSES_BASE.map((p, i) => ({ ...p, ...t.process.items[i] }));
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
            {t.process.heading1}
            <span className="mt-2 block text-lime leading-[0.95]" style={{ fontSize: 'var(--text-display)' }}>
              {t.process.heading2}
            </span>
          </h2>
        </Reveal>

        <ol
          ref={gridRef}
          className="relative grid list-none grid-cols-1 gap-10 p-0 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6 lg:gap-4"
        >
          {/* mobile: vertical connector + scroll-driven fill behind the centered badges */}
          <div
            aria-hidden
            className="absolute left-1/2 top-6 bottom-6 z-0 w-0.5 -translate-x-1/2 bg-track sm:hidden"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-6 bottom-6 z-0 w-0.5 origin-top -translate-x-1/2 bg-lime sm:hidden"
            style={{ transform: `translateX(-50%) scaleY(${fillRatio})`, transition: 'transform 400ms var(--ease-out)' }}
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
  const { t } = useI18n();
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
                {t.faq.heading}
              </h2>
              <p className="mb-6 text-muted" style={{ fontSize: 'var(--text-body)' }}>
                {t.faq.body}
              </p>
              <PillLink href={waLink(t.wa.faq)} variant="outline">
                {t.hablemos}
              </PillLink>
            </Reveal>

            <div ref={listRef} className="border-t border-t-ink md:col-span-2">
              {t.faq.items.map((item, i) => {
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
  const { t } = useI18n();
  const nav = NAV_HREFS.map((href, i) => ({
    href,
    label: [t.nav.queHacemos, t.nav.paquetes, t.nav.comoFunciona, t.nav.preguntas][i],
  }));
  return (
    <footer className="mx-4 rounded-t-3xl bg-lime px-6 pb-6 pt-12 text-ink sm:px-10 md:px-16 md:pt-16">
      <Container>
        <Reveal className="mb-8 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Epik Bizz" className="mb-3 h-9 w-auto" />
            <p className="mb-4" style={{ fontSize: 'var(--text-caption)' }}>
              {t.footer.tagline}
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
            {nav.map((item) => (
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
          {t.footer.rights}
        </div>
      </Container>
    </footer>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <Header />
      <main className="overflow-x-clip">
        <HeroSection />
        <ServicesSection />
        <PlansSection />
        <ProcessSection />
        <FaqSection />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
