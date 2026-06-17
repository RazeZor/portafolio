import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectImage } from "@/components/project-image";

type FeaturedProjectProps = {
  project: Project;
};

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <div className="reveal overflow-hidden rounded-2xl border border-border bg-surface lg:grid lg:grid-cols-2" style={{ boxShadow: "var(--shadow-card)" }}>
      <Link to={`/proyecto/${project.slug}`} className="group block overflow-hidden lg:min-h-[320px]">
        <ProjectImage project={project} aspect="featured" />
      </Link>

      <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Proyecto destacado</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.role} · {project.year}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
          <p className="mt-3 text-sm leading-relaxed text-foreground/85">{project.solution}</p>

          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.metrics.map((m) => (
                <div key={m.label} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
                  <p className="text-sm font-semibold tabular-nums">{m.value}</p>
                  <p className="text-[11px] text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to={`/proyecto/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
              style={{ background: "var(--gradient-accent)" }}
            >
              Ver caso de estudio <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Sitio en vivo <ArrowUpRight className="h-4 w-4" />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
              >
                <Github className="h-4 w-4" /> Código
              </a>
            )}
          </div>
        </div>
    </div>
  );
}
