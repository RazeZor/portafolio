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
    try {
      return new URL(url).hostname.replace("www.", "");
    } catch {
      return url;
    }
  })();

  const project = { title, stack, image };

  return (
    <article
      className="reveal project-card group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/[0.04]"
      data-delay={`${delay}`}
    >
      <Link to={`/proyecto/${slug}`} className="block">
        <ProjectImage project={project} aspect="card" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              {tag.split("·")[0]?.trim()}
            </p>
            <h3 className="mt-1 truncate text-lg font-bold tracking-tight text-white">
              <Link to={`/proyecto/${slug}`} className="hover:text-white/80 transition-colors">
                {title}
              </Link>
            </h3>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-white/40">
              {role} · {year}
            </p>
          </div>
          <ProjectThumbnail title={title} stack={stack} size="sm" className="-mt-0.5 opacity-80" />
        </div>

        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-white/60">{summary}</p>

        {metrics && metrics.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {metrics.slice(0, 2).map((m) => (
              <span
                key={m.label}
                className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px]"
              >
                <span className="font-bold tabular-nums text-white">{m.value}</span>
                <span className="font-mono text-[10px] text-white/50 uppercase"> · {m.label}</span>
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 flex flex-wrap gap-1.5">
          {stack.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
          <span className="truncate font-mono text-[10px] uppercase tracking-wider text-white/40">
            {domain}
          </span>
          <div className="flex shrink-0 items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Código de ${title}`}
                className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
            )}
            <Link
              to={`/proyecto/${slug}`}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-black"
            >
              Detalle
            </Link>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visitar ${title}`}
              className="rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
