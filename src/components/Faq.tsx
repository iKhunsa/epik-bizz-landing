"use client";

import { useState } from "react";
import { PlusIcon } from "./icons";

const ITEMS = [
  {
    q: "¿Qué pasa si necesito algo fuera del paquete?",
    a: "Lo cotizamos aparte y lo sumamos como complemento puntual, sin cambiar la base de tu plan mensual.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí. Trabajamos mes a mes; avisas con 30 días de anticipación y cerramos entregables sin penalización.",
  },
  {
    q: "¿Quién es dueño del contenido?",
    a: "Tú. Todo el material producido —fotos, videos y piezas finales— queda a nombre de tu marca.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-0 md:w-[520px]">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={`border-ink/90 ${i === 0 ? "border-t" : ""} border-b`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[19px] md:text-[24px] font-bold leading-snug tracking-[-0.01em]">
                {item.q}
              </span>
              <PlusIcon
                className={`mt-1 size-6 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
              />
            </button>
            <div
              className={`grid transition-all duration-200 ${
                isOpen
                  ? "grid-rows-[1fr] pb-6 opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="overflow-hidden text-[14px] leading-relaxed text-muted">
                {item.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
