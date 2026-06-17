import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, GitCommit, Github } from "lucide-react";

const USERNAME = "RazeZor";

type ContributionDay = { date: string; count: number; level: number };
type GitHubUser = { public_repos: number; followers: number; created_at: string };
type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: {
    commits?: { message: string; sha: string }[];
    ref?: string;
  };
};

type ContributionsResponse = {
  contributions: ContributionDay[];
  total: Record<string, number>;
};

function formatRelative(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "hoy";
  if (days === 1) return "ayer";
  if (days < 7) return `hace ${days} días`;
  if (days < 30) return `hace ${Math.floor(days / 7)} sem.`;
  return new Date(dateStr).toLocaleDateString("es-CL", { day: "numeric", month: "short" });
}

function Heatmap({ days }: { days: ContributionDay[] }) {
  const weeks = useMemo(() => {
    if (!days.length) return [];
    const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
    const result: ContributionDay[][] = [];
    let week: ContributionDay[] = [];

    const first = new Date(sorted[0].date);
    const pad = first.getDay();
    for (let i = 0; i < pad; i++) week.push({ date: "", count: 0, level: 0 });

    for (const day of sorted) {
      week.push(day);
      if (week.length === 7) {
        result.push(week);
        week = [];
      }
    }
    if (week.length) result.push(week);
    return result.slice(-26);
  }, [days]);

  const total = days.reduce((s, d) => s + d.count, 0);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{total.toLocaleString("es-CL")} contribuciones · último año</span>
        <div className="flex items-center gap-1">
          <span>Menos</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <span key={l} className={`heatmap-cell heatmap-l${l}`} />
          ))}
          <span>Más</span>
        </div>
      </div>
      <div className="overflow-x-auto pb-1">
        <div className="inline-flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <span
                  key={`${wi}-${di}`}
                  className={`heatmap-cell heatmap-l${day.level}`}
                  title={day.date ? `${day.count} commits · ${day.date}` : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GitHubActivity() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [userRes, contribRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`),
          fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=12`),
        ]);

        if (cancelled) return;

        if (userRes.ok) setUser(await userRes.json());
        if (contribRes.ok) {
          const data: ContributionsResponse = await contribRes.json();
          setContributions(data.contributions ?? []);
        }
        if (eventsRes.ok) {
          const data: GitHubEvent[] = await eventsRes.json();
          setEvents(data.filter((e) => e.type === "PushEvent").slice(0, 6));
        }
      } catch {
        /* fallback silencioso */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const yearTotal = contributions.reduce((s, d) => s + d.count, 0);

  return (
    <div className="reveal rounded-2xl border border-border bg-surface p-6 md:p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Actividad en GitHub</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">@{USERNAME}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Commits, contribuciones y repos públicos en tiempo real.
          </p>
        </div>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 self-start rounded-full border border-border bg-background px-4 py-2 text-sm transition-colors hover:border-accent/40 hover:text-accent sm:self-auto"
        >
          Ver perfil <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-[1fr_280px]">
          <div className="h-32 animate-pulse rounded-xl bg-surface-2" />
          <div className="h-32 animate-pulse rounded-xl bg-surface-2" />
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            <Heatmap days={contributions} />

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { label: "Contribuciones", value: yearTotal || "—" },
                { label: "Repos públicos", value: user?.public_repos ?? "—" },
                { label: "Seguidores", value: user?.followers ?? "—" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border bg-background/50 px-4 py-3">
                  <div className="text-lg font-semibold tabular-nums">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <GitCommit className="h-3.5 w-3.5" /> Commits recientes
            </p>
            <ul className="space-y-2">
              {events.length === 0 ? (
                <li className="rounded-lg border border-border bg-background/40 px-3 py-4 text-sm text-muted-foreground">
                  No hay pushes recientes visibles.
                </li>
              ) : (
                events.map((ev) => {
                  const msg = ev.payload.commits?.[0]?.message ?? "Push al repositorio";
                  return (
                    <li key={ev.id}>
                      <a
                        href={`https://github.com/${ev.repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block rounded-lg border border-border bg-background/40 px-3 py-2.5 transition-colors hover:border-accent/30 hover:bg-background/70"
                      >
                        <p className="line-clamp-2 text-sm leading-snug text-foreground/90 group-hover:text-foreground">
                          {msg}
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Github className="h-3 w-3" />
                          {ev.repo.name.split("/")[1]}
                          <span>·</span>
                          {formatRelative(ev.created_at)}
                        </p>
                      </a>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
