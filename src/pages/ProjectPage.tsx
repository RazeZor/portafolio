import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink, CheckCircle2 } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import { ProjectImage } from "@/components/project-image";
import { ProjectThumbnail } from "@/components/project-thumbnail";
import { usePageMeta } from "@/lib/use-page-meta";
import NotFoundPage from "@/pages/NotFoundPage";

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  usePageMeta({
    title: project ? `${project.title} — Ignacio Castillo` : "Proyecto — Ignacio Castillo",
    description: project?.summary,
  });

  if (!project) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-white selection:text-black">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#020202]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3.5">
          <Link
            to="/#proyectos"
            className="group inline-flex items-center gap-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white"
          >
            <div className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </div>
            <span className="hidden sm:inline">Volver al portafolio</span>
            <ArrowLeft className="h-4 w-4 sm:hidden" />
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black shadow-md transition-all hover:scale-[1.02] hover:bg-white/90"
          >
            Visitar sitio <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 md:py-16">
        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <ProjectImage project={project} aspect="hero" />
        </div>

        <div className="mt-8 flex flex-wrap items-start gap-4">
          <ProjectThumbnail title={project.title} stack={project.stack} size="md" />
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">
              // {project.tag}
            </p>
            <h1 className="mt-2 text-3xl font-black uppercase tracking-tighter text-white sm:text-4xl md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-2 font-mono text-xs uppercase tracking-wider text-white/50">
              {project.role} · {project.year}
            </p>
          </div>
        </div>

        <p className="mt-8 text-lg leading-relaxed text-white/80">{project.description}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center backdrop-blur-xl"
              >
                <p className="text-2xl font-bold tabular-nums text-white">{m.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/45">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl">
            <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              // Mi rol
            </h2>
            <p className="text-sm leading-relaxed text-white/70">{project.role}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl">
            <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              // Resultado
            </h2>
            <p className="text-sm leading-relaxed text-white/70">
              {project.highlights[0] ?? project.summary}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl">
            <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              // El problema
            </h2>
            <p className="text-sm leading-relaxed text-white/70">{project.problem}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl">
            <h2 className="mb-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50">
              // La solución
            </h2>
            <p className="text-sm leading-relaxed text-white/70">{project.solution}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            // Lo que construí
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white/70 backdrop-blur-xl"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            // Stack tecnológico
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-white/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 hover:scale-[1.02]"
          >
            Ver sitio en vivo <ArrowUpRight className="h-4 w-4" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white/30 hover:bg-white/10"
            >
              <Github className="h-4 w-4" /> Ver código
            </a>
          )}
          <Link
            to="/#proyectos"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-6 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 transition-all hover:border-white/30 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Más proyectos
          </Link>
        </div>
      </main>
    </div>
  );
}
