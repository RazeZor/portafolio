import { TRUST_METRICS } from "@/lib/site-config";
import { projects } from "@/data/projects";

export function TrustStrip() {
  const deployedCount = projects.filter((p) => !p.url.includes("github.com")).length;
  const metrics = TRUST_METRICS.map((m) =>
    m.label === "sitios desplegados" ? { ...m, value: String(deployedCount) } : m,
  );

  return (
    <div className="trust-strip relative z-10 border-y border-white/10 bg-[#020202]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="px-5 py-7 text-center md:px-8 md:py-8">
            <p className="text-3xl font-black text-white tabular-nums tracking-tighter md:text-4xl">
              {m.value}
            </p>
            <p className="mt-2 font-mono text-[11px] font-bold tracking-[0.2em] text-white/80 uppercase">
              {m.label}
            </p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.1em] text-white/40 uppercase">
              {m.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
