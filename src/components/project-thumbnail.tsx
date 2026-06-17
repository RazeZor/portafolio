import { useState } from "react";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TECH_GRADIENTS, TECH_ICONS, resolveTechIcon } from "@/lib/tech-icons";

type ProjectThumbnailProps = {
  title: string;
  stack: string[];
  className?: string;
  size?: "sm" | "md";
};

export function ProjectThumbnail({ title, stack, className, size = "md" }: ProjectThumbnailProps) {
  const [failed, setFailed] = useState(false);
  const tech = resolveTechIcon(stack);
  const icon = TECH_ICONS[tech];
  const gradient = TECH_GRADIENTS[tech] ?? "from-accent/25 to-accent/5";
  const dim = size === "sm" ? "h-9 w-9 rounded-lg" : "h-11 w-11 rounded-xl";
  const iconDim = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center border border-border bg-surface-2 bg-gradient-to-br",
        gradient,
        dim,
        className,
      )}
    >
      {icon && !failed ? (
        <img
          src={icon}
          alt=""
          className={cn(iconDim, "object-contain opacity-90")}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="flex items-center gap-0.5 text-xs font-semibold tracking-tight text-foreground/80">
          {title.slice(0, 2).toUpperCase()}
        </span>
      )}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/5" />
    </div>
  );
}

export function ProjectCover({ title, stack }: { title: string; stack: string[] }) {
  const tech = resolveTechIcon(stack);
  const gradient = TECH_GRADIENTS[tech] ?? "from-accent/20 to-accent/5";

  return (
    <div
      className={cn(
        "relative flex h-28 items-center justify-center overflow-hidden border-b border-border bg-gradient-to-br",
        gradient,
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="relative flex items-center gap-3">
        <ProjectThumbnail title={title} stack={stack} size="md" />
        <Code2 className="h-4 w-4 text-muted-foreground/40" strokeWidth={1.5} />
      </div>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
    </div>
  );
}
