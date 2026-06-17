import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, ArrowUpRight, Github, ExternalLink, CheckCircle2,
} from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import { Logo } from "@/components/logo";
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
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3.5">
          <Link
            to="/#proyectos"
            className="inline-flex items-center gap-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Logo size="sm" className="ring-1 ring-border" />
            <span className="hidden sm:inline">Volver al portafolio</span>
            <ArrowLeft className="h-4 w-4 sm:hidden" />
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-white"
            style={{ background: "var(--gradient-accent)" }}
          >
            Visitar sitio <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-5 py-10 md:py-14">
        <div className="overflow-hidden rounded-2xl border border-border">
          <ProjectImage project={project} aspect="hero" />
        </div>

        <div className="mt-8 flex flex-wrap items-start gap-4">
          <ProjectThumbnail title={project.title} stack={project.stack} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{project.tag}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{project.title}</h1>
            <p className="mt-2 text-muted-foreground">{project.role} · {project.year}</p>
          </div>
        </div>

        <p className="mt-8 text-lg leading-relaxed text-foreground/90">{project.description}</p>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-surface p-4 text-center">
                <p className="text-xl font-semibold tabular-nums">{m.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Mi rol</h2>
            <p className="text-sm leading-relaxed text-foreground/85">{project.role}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Resultado</h2>
            <p className="text-sm leading-relaxed text-foreground/85">{project.highlights[0] ?? project.summary}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">El problema</h2>
            <p className="text-sm leading-relaxed text-foreground/85">{project.problem}</p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">La solución</h2>
            <p className="text-sm leading-relaxed text-foreground/85">{project.solution}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Lo que construí</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 rounded-xl border border-border bg-surface px-4 py-3 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span key={t} className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
            style={{ background: "var(--gradient-accent)" }}
          >
            Ver sitio en vivo <ArrowUpRight className="h-4 w-4" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Github className="h-4 w-4" /> Ver código
            </a>
          )}
          <Link
            to="/#proyectos"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Más proyectos
          </Link>
        </div>
      </main>
    </div>
  );
}
