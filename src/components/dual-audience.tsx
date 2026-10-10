import { ArrowRight, Briefcase, Building2, Download, Linkedin } from "lucide-react";
import { SITE } from "@/lib/site-config";

type DualAudienceProps = {
  onContact: () => void;
};

export function DualAudience({ onContact }: DualAudienceProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div
        className="reveal rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-white/25"
        data-delay="0"
      >
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/5">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-white uppercase">
          Empresas y Equipos
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Busco práctica profesional o primera experiencia en equipos técnicos. Aporto desde el
          análisis hasta la entrega con Python, Django, React y Docker.
        </p>
        <ul className="mt-5 space-y-2.5 font-mono text-xs tracking-wider text-white/70 uppercase">
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/60" /> Remoto o híbrido en Concepción
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/60" /> Egreso estimado: {SITE.graduation}
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/60" /> Founder de Kenkomed · ayudante USM
          </li>
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={SITE.cvPath}
            download
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 hover:scale-[1.02]"
          >
            <Download className="h-3.5 w-3.5" /> Descargar CV
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white/30 hover:bg-white/10"
          >
            <Linkedin className="h-3.5 w-3.5" /> LinkedIn
          </a>
        </div>
      </div>

      <div
        className="reveal rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-white/25"
        data-delay="80"
      >
        <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/5">
          <Briefcase className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-white uppercase">
          Pymes y Emprendedores
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          Sitios web, catálogos digitales y sistemas internos. Del diagnóstico del problema hasta
          producción, con entregas visibles en cada iteración.
        </p>
        <ul className="mt-5 space-y-2.5 font-mono text-xs tracking-wider text-white/70 uppercase">
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/60" /> Respuesta en menos de 24 h
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/60" /> 6+ proyectos en producción
          </li>
          <li className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-white/60" /> Enfoque: problema → solución →
            deploy
          </li>
        </ul>
        <button
          onClick={onContact}
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 hover:scale-[1.02]"
        >
          Cotizar Proyecto <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
