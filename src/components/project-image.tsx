import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import { ProjectCover } from "@/components/project-thumbnail";

type ProjectImageProps = {
  project: Pick<Project, "title" | "stack" | "image">;
  className?: string;
  imgClassName?: string;
  aspect?: "card" | "hero" | "featured";
};

export function ProjectImage({ project, className, imgClassName, aspect = "card" }: ProjectImageProps) {
  const [failed, setFailed] = useState(false);
  const height =
    aspect === "hero"
      ? "aspect-[21/9] md:aspect-[2.4/1]"
      : aspect === "featured"
        ? "aspect-[16/10] lg:aspect-auto lg:min-h-full lg:h-full"
        : "aspect-[16/10]";

  if (project.image && !failed) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-2", height, className)}>
        <img
          src={project.image}
          alt={`Vista previa de ${project.title}`}
          loading="lazy"
          decoding="async"
          className={cn("h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]", imgClassName)}
          onError={() => setFailed(true)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div className={className}>
      <ProjectCover title={project.title} stack={project.stack} />
    </div>
  );
}
