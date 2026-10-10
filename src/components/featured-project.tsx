import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectImage } from "@/components/project-image";

type FeaturedProjectProps = {
  project: Project;
};

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <div className="reveal overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl lg:grid lg:grid-cols-2 shadow-2xl">
      <Link
        to={`/proyecto/${project.slug}`}
        className="group block overflow-hidden lg:min-h-[340px]"
      >
        <ProjectImage project={project} aspect="featured" />
      </Link>

      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-2 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span>// PROYECTO DESTACADO</span>
        </div>
        <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
          {project.title}
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          {project.role} · {project.year}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/60">{project.problem}</p>
        <p className="mt-2.5 text-sm leading-relaxed text-white/80">{project.solution}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-white/10 bg-white/5 px-3.5 py-2"
              >
                <p className="text-sm font-bold text-white tabular-nums">{m.value}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            to={`/proyecto/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 hover:scale-[1.02]"
          >
            Ver Caso <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white/30 hover:bg-white/10"
          >
            Sitio en Vivo <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white/30 hover:bg-white/10"
            >
              <Github className="h-3.5 w-3.5" /> Código
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
