import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Mail, Linkedin, MapPin, ArrowRight, Download,
  Server, Layout, Container, Brain, GraduationCap, Briefcase,
  Menu, X, Github, Lightbulb,
  Search, Wrench, Rocket,
  Globe,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { DualAudience } from "@/components/dual-audience";
import { FeaturedProject } from "@/components/featured-project";
import { GitHubActivity } from "@/components/github-activity";
import { Logo } from "@/components/logo";
import { HeroAvatar } from "@/components/hero-avatar";
import { ProjectCard } from "@/components/project-card";
import { TrustStrip } from "@/components/trust-strip";
import { featuredProject, projects } from "@/data/projects";
import { SITE } from "@/lib/site-config";
import { usePageMeta } from "@/lib/use-page-meta";

const nav = [
  { id: "proyectos", label: "Proyectos" },
  { id: "github", label: "GitHub" },
  { id: "stack", label: "Stack" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "contacto", label: "Contacto" },
];

const stackMarquee = [
  "Ingeniería en Informática", "Análisis de problemas", "Arquitectura de sistemas",
  "Python", "Django", "Astro", "Docker", "PostgreSQL", "Kenkomed",
];

function HomePage() {
  const { hash } = useLocation();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

  usePageMeta({
    title: `${SITE.name} — ${SITE.title}`,
    description: SITE.description,
  });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const sections = ["inicio", ...nav.map((n) => n.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => obs.observe(s));

    const revealEls = document.querySelectorAll<HTMLElement>(".reveal");
    const revObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          el.style.animationDelay = `${el.dataset.delay ?? "0"}ms`;
          el.classList.add("in-view");
          revObs.unobserve(el);
        }
      }),
      { threshold: 0.12 },
    );
    revealEls.forEach((el) => revObs.observe(el));

    const cards = document.querySelectorAll<HTMLElement>(".card-spotlight");
    const onMove = (e: MouseEvent) => {
      const t = e.currentTarget as HTMLElement;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--mx", `${e.clientX - r.left}px`);
      t.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    cards.forEach((c) => c.addEventListener("mousemove", onMove as EventListener));

    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
      revObs.disconnect();
      cards.forEach((c) => c.removeEventListener("mousemove", onMove as EventListener));
    };
  }, []);

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [hash]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "border-b border-transparent bg-background/50 backdrop-blur-sm"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <button onClick={() => scrollTo("inicio")} className="flex items-center gap-2.5 font-semibold tracking-tight">
            <Logo size="sm" className="ring-1 ring-border" />
            <span>NachoDevsc</span>
          </button>
          <nav className="hidden gap-1 md:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${active === n.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {active === n.id && <span className="absolute inset-0 -z-10 rounded-full bg-secondary" />}
                {n.label}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={SITE.cvPath}
              download
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <Download className="h-3.5 w-3.5" /> CV
            </a>
            <button
              onClick={() => scrollTo("contacto")}
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium text-white transition-all hover:scale-[1.03]"
              style={{ background: "var(--gradient-accent)" }}
            >
              Contacto <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Menú">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
              {nav.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
                  {n.label}
                </button>
              ))}
              <a
                href={SITE.cvPath}
                download
                className="rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                Descargar CV
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="hero-section relative overflow-hidden border-b border-border">
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="max-w-xl">
              <div className="reveal inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Disponible · Freelance selectivo
              </div>

              <h1 className="reveal mt-5 text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl lg:text-[3.25rem]" data-delay="80">
                {SITE.name}
                <span className="mt-2 block text-xl font-normal text-muted-foreground md:text-2xl">
                  {SITE.tagline}
                </span>
              </h1>

              <p className="reveal mt-3 text-sm text-muted-foreground" data-delay="120">
                Ing. Informática · USM · egreso {SITE.graduation} · {SITE.location}
              </p>

              <p className="reveal mt-5 text-base leading-relaxed text-muted-foreground md:text-[1.05rem]" data-delay="160">
                Ingeniero en Informática en la USM. Me interesa entender
                el problema de fondo, diseñar la respuesta correcta y llevarla hasta
                producción — no solo escribir código. Fundé{" "}
                <a href={SITE.kenkomed} target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent">
                  Kenkomed
                </a>
                {" "}y construyo productos digitales para pymes que necesitan resultados reales.
              </p>

              <div className="reveal mt-7 flex flex-wrap gap-2.5" data-delay="240">
                <button
                  onClick={() => scrollTo("proyectos")}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
                  style={{ background: "var(--gradient-accent)" }}
                >
                  Ver proyectos <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={SITE.cvPath}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  <Download className="h-4 w-4" /> Descargar CV
                </a>
                <button
                  onClick={() => scrollTo("contacto")}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                >
                  Cotizar proyecto
                </button>
              </div>

              <div className="reveal mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground" data-delay="320">
                <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" /> Ing. en Informática</span>
                <span className="inline-flex items-center gap-1.5"><Lightbulb className="h-3.5 w-3.5" /> Análisis → ejecución</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Concepción</span>
                <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> ES · EN</span>
              </div>
            </div>

            <div className="reveal relative mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-none" data-delay="200">
              <div className="pointer-events-none absolute inset-0 m-auto h-56 w-56 rounded-full bg-[oklch(0.62_0.20_277/0.12)] blur-[80px] lg:h-72 lg:w-72" />
              <div className="relative">
                <HeroAvatar />
                <div className="absolute -bottom-3 -left-3 rounded-xl border border-border bg-surface px-3.5 py-2.5 shadow-lg backdrop-blur md:-bottom-4 md:-left-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Founder</p>
                  <p className="text-base font-semibold">Kenkomed</p>
                </div>
                <div className="absolute -bottom-3 -right-3 rounded-xl border border-border bg-surface px-3.5 py-2.5 shadow-lg backdrop-blur md:-bottom-4 md:-right-4">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">En producción</p>
                  <p className="text-base font-semibold tabular-nums">{projects.length} proyectos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-marquee relative z-10 py-3.5 backdrop-blur-sm">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee-track hero-marquee-track flex shrink-0 gap-10 pr-10 text-xs font-medium tracking-wide uppercase">
              {[...stackMarquee, ...stackMarquee].map((t, i) => (
                <span key={i} className="whitespace-nowrap">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* PROYECTOS */}
      <Section id="proyectos" eyebrow="Proyectos" title="Soluciones que ya existen." subtitle="Cada proyecto empezó con un problema concreto — y terminó desplegado, en uso." className="pb-8 md:pb-12">
        <div className="mb-10">
          <FeaturedProject project={featuredProject} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.filter((p) => p.slug !== "kenkomed").map((p, i) => (
            <ProjectCard key={p.slug} {...p} delay={i * 40} />
          ))}
        </div>
      </Section>

      {/* GITHUB */}
      <section id="github" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-20 md:pb-28">
        <GitHubActivity />
      </section>

      {/* STACK */}
      <Section id="stack" eyebrow="Herramientas" title="Con qué ejecuto." subtitle="El stack cambia según el problema — esto es lo que uso hoy para materializar soluciones.">
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <div
              key={g.title}
              className="reveal card-spotlight rounded-2xl border border-border bg-surface p-7 transition-colors hover:border-accent/30"
              data-delay={`${i * 80}`}
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface-2">
                  <g.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span key={item} className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-sm text-foreground/90">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TRAYECTORIA */}
      <section id="trayectoria" className="scroll-mt-20">
      {/* EXPERIENCIA */}
      <Section eyebrow="Experiencia" title="Donde he aplicado esto." subtitle="Formación académica, ayudantías y proyectos reales en paralelo a la carrera." className="pb-12 md:pb-16">
        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border md:left-1/2" />
          <div className="space-y-6">
            {experience.map((e, i) => (
              <div
                key={e.role}
                className={`reveal relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}
                data-delay={`${i * 60}`}
              >
                <div className="hidden md:block" />
                <div className="relative pl-12 md:pl-0">
                  <span className="absolute left-2.5 top-6 h-3 w-3 rounded-full bg-accent ring-4 ring-background md:left-auto md:right-full md:mr-[calc(3rem-0.375rem)]" style={{ boxShadow: "0 0 0 1px var(--accent)" }} />
                  <div className="card-spotlight rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/30">
                    <div className="mb-2 inline-block rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-accent">{e.time}</div>
                    <h3 className="font-semibold">{e.role}</h3>
                    <p className="text-sm text-muted-foreground">{e.org}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{e.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EDUCACIÓN */}
      <Section eyebrow="Formación" title="Educación." className="pb-12 md:pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { title: "Ingeniería en Informática", org: "Universidad Técnica Federico Santa María", time: "2025 — 2027", desc: "Formación en diseño de sistemas, microservicios, ciberseguridad y ciencia de datos.", icon: GraduationCap },
            { title: "Tecnicatura Universitaria en Informática", org: "Universidad Técnica Federico Santa María", time: "2023 — 2025", desc: "Base sólida en análisis, desarrollo de software y resolución de problemas con tecnología.", icon: Briefcase },
          ].map((e, i) => (
            <div key={e.title} className="reveal card-spotlight rounded-2xl border border-border bg-surface p-6" data-delay={`${i * 80}`}>
              <div className="mb-4 flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-surface-2">
                  <e.icon className="h-5 w-5 text-accent" />
                </div>
                <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted-foreground">{e.time}</span>
              </div>
              <h3 className="font-semibold">{e.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.org}</p>
              <p className="mt-3 text-sm text-muted-foreground">{e.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CÓMO TRABAJO */}
      <Section eyebrow="Forma de trabajo" title="Cómo abordo un problema." className="pb-20 md:pb-28">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <div
              key={p.title}
              className="reveal card-spotlight rounded-2xl border border-border bg-surface p-6"
              data-delay={`${i * 60}`}
            >
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface-2">
                <p.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mb-1.5 font-semibold">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>
      </section>

      {/* PARA QUIÉN TRABAJO */}
      <Section id="audiencia" eyebrow="Colaboraciones" title="Para quién trabajo." subtitle="Dos caminos distintos, un mismo enfoque: entender el problema y ejecutar la solución.">
        <DualAudience onContact={() => scrollTo("contacto")} />
      </Section>

      {/* CONTACTO */}
      <Section id="contacto" eyebrow="Contacto" title="¿Tienes un problema que resolver?" subtitle="Cuéntame el contexto: qué pasa hoy, qué necesitas lograr y en qué plazo. Respondo en menos de 24 h.">
        <div className="reveal relative overflow-hidden rounded-3xl border border-border bg-surface p-8 md:p-12" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ background: "var(--gradient-accent)" }} />

          <div className="relative grid items-start gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-muted-foreground">
                Busco colaboraciones donde pueda aportar desde el análisis hasta
                la entrega: pymes, emprendimientos, equipos técnicos o proyectos
                académicos con impacto real.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white transition-all hover:scale-[1.03]" style={{ background: "var(--gradient-accent)" }}>
                  <Mail className="h-4 w-4" /> {SITE.email}
                </a>
                <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary">
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href={SITE.cvPath} download className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary">
                  <Download className="h-4 w-4" /> CV
                </a>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { k: "Ubicación", v: SITE.location },
                  { k: "Modalidad", v: "Remoto · Híbrido · Freelance" },
                  { k: "Enfoque", v: "Problema → solución" },
                  { k: "Formación", v: `Ing. Informática · USM ${SITE.graduation}` },
                ].map((b) => (
                  <div key={b.k} className="rounded-xl border border-border bg-background/60 p-4 backdrop-blur">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{b.k}</div>
                    <div className="mt-1.5 text-sm font-medium">{b.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Ignacio Castillo · NachoDevsc</p>
          <div className="flex items-center gap-4">
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
            <a href={`mailto:${SITE.email}`} className="transition-colors hover:text-foreground" aria-label="Email"><Mail className="h-4 w-4" /></a>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground" aria-label="GitHub"><Github className="h-4 w-4" /></a>
            <a href={SITE.cvPath} download className="transition-colors hover:text-foreground" aria-label="Descargar CV"><Download className="h-4 w-4" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

/* ---------- Data ---------- */

const skillGroups = [
  {
    title: "Backend",
    icon: Server,
    items: ["Python", "Django", "FastAPI", "Flask", "Go", "REST APIs", "Microservicios"],
  },
  {
    title: "Frontend",
    icon: Layout,
    items: ["TypeScript", "Astro", "React", "Tailwind CSS", "HTML semántico"],
  },
  {
    title: "Infra & datos",
    icon: Container,
    items: ["Docker", "PostgreSQL", "MySQL", "Firebase", "Git", "Linux", "Vercel"],
  },
  {
    title: "Data & redes",
    icon: Brain,
    items: ["Pandas", "Scikit-learn", "Wireshark", "Análisis de tráfico", "Hardening básico"],
  },
];

const experience = [
  { role: "Ayudante Redes de Computadores", org: "Universidad Técnica Federico Santa María", time: "2026 — hoy", desc: "Diagnóstico y resolución de problemas de red. Wireshark, laboratorios y apoyo directo a estudiantes." },
  { role: "Ayudante Taller de Sistemas de Información", org: "USM · Hualpén", time: "2025 — hoy", desc: "Guío equipos en proyectos de título: del planteamiento del problema al entregable funcional." },
  { role: "Consultoría & ejecución digital", org: "Autónomo · Remoto", time: "2025 — hoy", desc: "Identifico la necesidad del cliente, propongo la solución y la implemento hasta producción." },
  { role: "Founder & Tech Lead", org: "Kenkomed", time: "2024 — hoy", desc: "Problema clínico real → producto HealthTech: arquitectura, backend, datos y sitio web." },
];

const process = [
  { icon: Search, title: "Entender el problema", desc: "¿Qué duele hoy? ¿Para quién? ¿Cómo sabemos que quedó resuelto?" },
  { icon: Lightbulb, title: "Diseñar la solución", desc: "Arquitectura, trade-offs y un plan claro antes de escribir una línea de código." },
  { icon: Wrench, title: "Ejecutar con rigor", desc: "Iteraciones cortas, entregas visibles y decisiones documentadas." },
  { icon: Rocket, title: "Llevar a producción", desc: "Deploy, validación con usuarios reales y soporte post-lanzamiento." },
];

/* ---------- Components ---------- */

function Section({ id, eyebrow, title, subtitle, children, className }: { id?: string; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28 ${className ?? ""}`}>
      <div className="mb-12 max-w-3xl">
        <div className="reveal mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          <span className="h-px w-8 bg-accent" /> {eyebrow}
        </div>
        <h2 className="reveal text-balance text-3xl font-semibold tracking-tight md:text-5xl" data-delay="80">{title}</h2>
        {subtitle && <p className="reveal mt-4 text-lg text-muted-foreground" data-delay="160">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
