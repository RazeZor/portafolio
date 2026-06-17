import { Link } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectImage } from "@/components/project-image";
import { ProjectThumbnail } from "@/components/project-thumbnail";

type ProjectCardProps = Project & { delay: number };

export function ProjectCard({
  slug,
  title,
  tag,
  role,
  year,
  url,
  github,
  summary,
  stack,
  image,
  metrics,
  delay,
}: ProjectCardProps) {
  const domain = (() => {
    try { return new URL(url).hostname.replace("www.", ""); } catch { return url; }
  })();

  const project = { title, stack, image };

  return (
    <article
      className="reveal project-card group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface"
      data-delay={`${delay}`}
    >
      <Link to={`/proyecto/${slug}`} className="block">
        <ProjectImage project={project} aspect="card" />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-medium uppercase tracking-wider text-accent">
              {tag.split("·")[0]?.trim()}
            </p>
            <h3 className="mt-0.5 truncate text-base font-semibold tracking-tight">
              <Link to={`/proyecto/${slug}`} className="hover:text-accent">
                {title}
              </Link>
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{role} · {year}</p>
          </div>
          <ProjectThumbnail title={title} stack={stack} size="sm" className="-mt-0.5 opacity-80" />
        </div>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{summary}</p>

        {metrics && metrics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {metrics.slice(0, 2).map((m) => (
              <span key={m.label} className="rounded-md border border-border bg-background px-2 py-0.5 text-[11px]">
                <span className="font-semibold tabular-nums text-foreground">{m.value}</span>
                <span className="text-muted-foreground"> · {m.label}</span>
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-1">
          {stack.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md bg-surface-2 px-2 py-0.5 text-[11px] text-muted-foreground">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3">
          <span className="truncate text-xs text-muted-foreground">{domain}</span>
          <div className="flex shrink-0 items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Código de ${title}`}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            <Link
              to={`/proyecto/${slug}`}
              className="inline-flex items-center gap-1 rounded-md bg-secondary px-2.5 py-1 text-xs font-medium transition-colors hover:bg-accent hover:text-white"
            >
              Saber más
            </Link>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar ${title}`}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
