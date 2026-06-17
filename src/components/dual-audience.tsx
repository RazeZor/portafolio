import { ArrowRight, Briefcase, Building2, Download, Linkedin } from "lucide-react";
import { SITE } from "@/lib/site-config";

type DualAudienceProps = {
  onContact: () => void;
};

export function DualAudience({ onContact }: DualAudienceProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="reveal card-spotlight rounded-2xl border border-border bg-surface p-7" data-delay="0">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2">
          <Building2 className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-lg font-semibold">Empresas y reclutadores</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Busco práctica profesional o primera experiencia en equipos técnicos.
          Aporto desde el análisis hasta la entrega con Python, Django, React y Docker.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>· Disponible remoto o híbrido en Concepción</li>
          <li>· Egreso estimado: {SITE.graduation}</li>
          <li>· Founder de Kenkomed · ayudante USM</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={SITE.cvPath}
            download
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
            style={{ background: "var(--gradient-accent)" }}
          >
            <Download className="h-4 w-4" /> Descargar CV
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>
      </div>

      <div className="reveal card-spotlight rounded-2xl border border-border bg-surface p-7" data-delay="80">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2">
          <Briefcase className="h-5 w-5 text-accent" />
        </div>
        <h3 className="text-lg font-semibold">Pymes y emprendedores</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Sitios web, catálogos digitales y sistemas internos. Del diagnóstico
          del problema hasta producción, con entregas visibles en cada iteración.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>· Respuesta en menos de 24 h</li>
          <li>· 6+ proyectos en producción para clientes reales</li>
          <li>· Enfoque: problema → solución → deploy</li>
        </ul>
        <button
          onClick={onContact}
          className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
          style={{ background: "var(--gradient-accent)" }}
        >
          Cotizar proyecto <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
