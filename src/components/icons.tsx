import type { SVGProps } from "react";

/*
 * Generic UI + brand glyphs. The Figma design references exported SVG assets for
 * these, but the asset host was not reachable from this environment, so we use
 * standard equivalents at the same sizes. Swap for the exported assets when
 * available (see /public/assets).
 */

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M14 4c.5 2.5 2 4 4.5 4.3V11c-1.7 0-3.2-.5-4.5-1.4v6.2A5.8 5.8 0 1 1 8.2 10v2.9a2.9 2.9 0 1 0 2.9 2.9V4H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5c.3-.8.6-.8 1-.8.4 0 .8.1 1 .9.2.7.6 1.3.3 1.7-.3.4-.6.6-.3 1.1.3.5 1.1 1.4 2 1.7.6.2.9 0 1.2-.3.3-.4.7-.4 1.1-.2.4.2 1.3.6 1.3 1.2 0 .7-.9 1.5-1.7 1.5-1.5 0-4-1-5.6-3.4C8.3 11 8.6 9.4 9 8.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function EpikLogo({
  className = "",
  variant = "ink",
}: {
  className?: string;
  variant?: "ink" | "lime";
}) {
  const color = variant === "lime" ? "#cefd00" : "#0b0b0b";
  return (
    <span
      className={`inline-flex items-baseline font-extrabold tracking-tight ${className}`}
      style={{ color }}
    >
      <span className="text-[1.25em] leading-none">epik</span>
      <span
        className="ml-1 rounded-full px-1.5 py-0.5 text-[0.62em] font-bold leading-none"
        style={{
          background: variant === "lime" ? "#0b0b0b" : "#cefd00",
          color: variant === "lime" ? "#cefd00" : "#0b0b0b",
        }}
      >
        BIZZ
      </span>
    </span>
  );
}
