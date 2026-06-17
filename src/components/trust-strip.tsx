import { TRUST_METRICS } from "@/lib/site-config";
import { projects } from "@/data/projects";

export function TrustStrip() {
  const deployedCount = projects.filter((p) => !p.url.includes("github.com")).length;
  const metrics = TRUST_METRICS.map((m) =>
    m.label === "sitios desplegados"
      ? { ...m, value: String(deployedCount) }
      : m,
  );

  return (
    <div className="trust-strip relative z-10 border-b border-border bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-border md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="px-5 py-6 text-center md:px-8 md:py-7">
            <p className="text-2xl font-semibold tabular-nums tracking-tight md:text-3xl">{m.value}</p>
            <p className="mt-1 text-sm font-medium text-foreground/90">{m.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{m.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
