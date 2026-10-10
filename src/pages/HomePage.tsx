import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Mail,
  Linkedin,
  MapPin,
  ArrowRight,
  Download,
  Server,
  Layout,
  Container,
  Brain,
  GraduationCap,
  Briefcase,
  Menu,
  X,
  Github,
  Lightbulb,
  Search,
  Wrench,
  Rocket,
  Globe,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { DualAudience } from "@/components/dual-audience";
import { FeaturedProject } from "@/components/featured-project";
import { GitHubActivity } from "@/components/github-activity";
import { Logo } from "@/components/logo";
import { ProjectCard } from "@/components/project-card";
import { TrustStrip } from "@/components/trust-strip";
import { StackFeatureSection } from "@/components/ui/stack-feature-section";
import ContactWithGlobe from "@/components/ui/contact-with-globe";
import { featuredProject, projects } from "@/data/projects";
import { SITE } from "@/lib/site-config";
import { usePageMeta } from "@/lib/use-page-meta";
import { ExperienceHero } from "@/components/ui/experience-hero";

const nav = [
  { id: "proyectos", label: "Proyectos" },
  { id: "github", label: "GitHub" },
  { id: "stack", label: "Stack" },
  { id: "trayectoria", label: "Trayectoria" },
  { id: "contacto", label: "Contacto" },
];

const stackMarquee = [
  "Ingeniería en Informática",
  "Análisis de problemas",
  "Arquitectura de sistemas",
  "Python",
  "Django",
  "Astro",
  "Docker",
  "PostgreSQL",
  "Kenkomed",
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
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => obs.observe(s));

    const revealEls = document.querySelectorAll<HTMLElement>(".reveal");
    const revObs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
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
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-white selection:text-black">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#020202]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
          <button
            onClick={() => scrollTo("inicio")}
            className="group flex items-center gap-3 font-semibold tracking-tight"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full p-[1.5px] bg-gradient-to-tr from-purple-500 via-violet-500 to-purple-700 shadow-md shadow-purple-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-500/50">
              <Logo size="sm" className="h-full w-full rounded-full ring-1 ring-black/40" />
            </div>
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-white uppercase transition-colors group-hover:text-purple-300">
              NACHODEVSC
            </span>
          </button>
          <nav className="hidden items-center gap-1.5 md:flex">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`relative rounded-full px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                  active === n.id
                    ? "border border-white/15 bg-white/10 text-white shadow-sm"
                    : "text-white/45 hover:bg-white/5 hover:text-white"
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <div className="hidden items-center gap-2.5 md:flex">
            <a
              href={SITE.cvPath}
              download
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
            >
              <Download className="h-3.5 w-3.5" /> CV
            </a>
            <button
              onClick={() => scrollTo("contacto")}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 px-5 py-1.5 font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase shadow-md shadow-purple-500/25 transition-all hover:scale-[1.02] hover:brightness-110 hover:shadow-purple-500/40"
            >
              Contacto <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <button onClick={() => setOpen(!open)} className="text-white md:hidden" aria-label="Menú">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {open && (
          <div className="border-t border-white/10 bg-[#020202] md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
              {nav.map((n) => (
                <button
                  key={n.id}
                  onClick={() => scrollTo(n.id)}
                  className="rounded-lg px-3 py-2 text-left font-mono text-xs font-bold tracking-wider uppercase text-white/60 hover:bg-white/5 hover:text-white"
                >
                  {n.label}
                </button>
              ))}
              <a
                href={SITE.cvPath}
                download
                className="rounded-lg px-3 py-2 text-left font-mono text-xs font-bold tracking-wider uppercase text-white/60 hover:bg-white/5 hover:text-white"
              >
                Descargar CV
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO 3D */}
      <section id="inicio" className="hero-section relative overflow-hidden border-b border-border">
        <ExperienceHero
          badge={`${SITE.brand.toUpperCase()} · USM`}
          titleLine1="SOFTWARE"
          titleLine2="ENGINEER"
          subtitle={`${SITE.name} · Ingeniería en Informática en la USM. Fundador de Kenkomed. Diseño y desarrollo sistemas escalables, productos web y experiencias interactivas con impacto real.`}
          ctaText="Iniciar Proyecto"
          onCtaClick={() => scrollTo("contacto")}
          secondaryCtaText="Ver Proyectos"
          onSecondaryCtaClick={() => scrollTo("proyectos")}
          stats={[
            {
              id: "001",
              title: "DISPONIBILIDAD",
              val: "Disponible",
              type: "progress",
            },
            {
              id: "002",
              title: "EN PRODUCCIÓN",
              val: "Kenkomed",
              type: "data",
              sub1: { label: "Lighthouse Score", value: "95+" },
              sub2: { label: "Sitios Desplegados", value: `${projects.length} proyectos` },
            },
            {
              id: "003",
              title: "ENFOQUE",
              val: "Full Stack",
              type: "text",
              text: (
                <>
                  Transformando problemas de fondo en{" "}
                  <span className="italic text-white">sistemas escalables y productos reales</span>.
                </>
              ),
            },
          ]}
        />

        <div className="hero-marquee relative z-10 py-3.5 backdrop-blur-sm">
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="marquee-track hero-marquee-track flex shrink-0 gap-10 pr-10 text-xs font-medium tracking-wide uppercase">
              {[...stackMarquee, ...stackMarquee].map((t, i) => (
                <span key={i} className="whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* PROYECTOS */}
      <Section
        id="proyectos"
        eyebrow="01 · PROYECTOS"
        title={
          <>
            SOLUCIONES <span className="text-outline">EN PRODUCCIÓN</span>
          </>
        }
        subtitle="Cada proyecto empezó con un problema concreto — y terminó desplegado, en uso."
        className="pb-8 md:pb-12"
      >
        <div className="mb-10">
          <FeaturedProject project={featuredProject} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects
            .filter((p) => p.slug !== "kenkomed")
            .map((p, i) => (
              <ProjectCard key={p.slug} {...p} delay={i * 40} />
            ))}
        </div>
      </Section>

      {/* GITHUB */}
      <section id="github" className="mx-auto max-w-6xl scroll-mt-20 px-5 pb-20 md:pb-28">
        <div className="mb-8">
          <div className="reveal mb-3 inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>// 02 · ACTIVIDAD GITHUB</span>
          </div>
          <h2
            className="reveal text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95]"
            data-delay="80"
          >
            CÓDIGO <span className="text-outline">& ACTIVIDAD</span>
          </h2>
          <p
            className="reveal mt-4 font-mono text-xs md:text-sm text-white/50 tracking-[0.05em] leading-relaxed max-w-2xl"
            data-delay="160"
          >
            Visualización 3D interactiva de contribuciones, repositorios y commits en producción.
          </p>
        </div>
        <GitHubActivity />
      </section>

      {/* STACK */}
      <Section
        id="stack"
        eyebrow="03 · HERRAMIENTAS"
        title={
          <>
            CON QUÉ <span className="text-outline">EJECUTO</span>
          </>
        }
        subtitle="El stack cambia según el problema — esto es lo que uso hoy para materializar soluciones."
      >
        <div className="reveal mb-8">
          <StackFeatureSection
            badge="ECOSISTEMA TÉCNICO"
            title={
              <>
                STACK & <span className="text-outline">ARQUITECTURA</span>
              </>
            }
            subtitle="Diseño, desarrollo y despliegue de sistemas escalables con tecnologías modernas: backend robusto en Python/Django, frontend reactivo en TypeScript/React y contenedores Docker."
            primaryCtaText="Ver Proyectos"
            onPrimaryCtaClick={() => scrollTo("proyectos")}
            secondaryCtaText="Contactar"
            onSecondaryCtaClick={() => scrollTo("contacto")}
            className="my-0"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((g, i) => (
            <div
              key={g.title}
              className="reveal card-spotlight rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl transition-all hover:border-white/25"
              data-delay={`${i * 80}`}
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/5 text-white">
                  <g.icon className="h-5 w-5" />
                </div>
                <h3 className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-white">
                  {g.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white/80 transition-colors hover:border-white/30"
                  >
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
        <Section
          eyebrow="04 · TRAYECTORIA"
          title={
            <>
              DONDE HE <span className="text-outline">APLICADO</span>
            </>
          }
          subtitle="Formación académica, ayudantías y proyectos reales en paralelo a la carrera."
          className="pb-12 md:pb-16"
        >
          <div className="relative">
            <div className="absolute left-4 top-2 bottom-2 w-px bg-white/10 md:left-1/2" />
            <div className="space-y-6">
              {experience.map((e, i) => (
                <div
                  key={e.role}
                  className={`reveal relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-2"}`}
                  data-delay={`${i * 60}`}
                >
                  <div className="hidden md:block" />
                  <div className="relative pl-12 md:pl-0">
                    <span className="absolute left-2.5 top-6 h-3 w-3 rounded-full bg-white ring-4 ring-[#020202] md:left-auto md:right-full md:mr-[calc(3rem-0.375rem)]" />
                    <div className="card-spotlight rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl transition-all hover:border-white/25">
                      <div className="mb-3 inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                        {e.time}
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                        {e.role}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs uppercase tracking-wider text-white/50">
                        {e.org}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/60">{e.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* EDUCACIÓN */}
        <Section
          eyebrow="05 · FORMACIÓN"
          title={
            <>
              EDUCACIÓN <span className="text-outline">ACADÉMICA</span>
            </>
          }
          className="pb-12 md:pb-16"
        >
          <div className="grid gap-5 md:grid-cols-2">
            {[
              {
                title: "Ingeniería en Informática",
                org: "Universidad Técnica Federico Santa María",
                time: "2025 — 2027",
                desc: "Formación en diseño de sistemas, microservicios, ciberseguridad y ciencia de datos.",
                icon: GraduationCap,
              },
              {
                title: "Tecnicatura Universitaria en Informática",
                org: "Universidad Técnica Federico Santa María",
                time: "2023 — 2025",
                desc: "Base sólida en análisis, desarrollo de software y resolución de problemas con tecnología.",
                icon: Briefcase,
              },
            ].map((e, i) => (
              <div
                key={e.title}
                className="reveal card-spotlight rounded-3xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-xl transition-all hover:border-white/25"
                data-delay={`${i * 80}`}
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/5 text-white">
                    <e.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-white/60">
                    {e.time}
                  </span>
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">{e.title}</h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white/50">
                  {e.org}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{e.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* CÓMO TRABAJO */}
        <Section
          eyebrow="06 · METODOLOGÍA"
          title={
            <>
              CÓMO ABORDO <span className="text-outline">UN PROBLEMA</span>
            </>
          }
          className="pb-20 md:pb-28"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <div
                key={p.title}
                className="reveal card-spotlight rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-all hover:border-white/25"
                data-delay={`${i * 60}`}
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/5 text-white">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/60">{p.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      {/* PARA QUIÉN TRABAJO */}
      <Section
        id="audiencia"
        eyebrow="07 · COLABORACIONES"
        title={
          <>
            PARA QUIÉN <span className="text-outline">TRABAJO</span>
          </>
        }
        subtitle="Dos caminos distintos, un mismo enfoque: entender el problema y ejecutar la solución."
      >
        <DualAudience onContact={() => scrollTo("contacto")} />
      </Section>

      {/* CONTACTO */}
      <section id="contacto" className="scroll-mt-20 mx-auto max-w-6xl px-5 pb-20 md:pb-28">
        <div className="mb-8">
          <div className="reveal mb-3 inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>// 08 · CONTACTO</span>
          </div>
          <h2
            className="reveal text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95]"
            data-delay="80"
          >
            INICIEMOS <span className="text-outline">UN PROYECTO</span>
          </h2>
        </div>
        <ContactWithGlobe />
      </section>

      <footer className="border-t border-white/10 bg-[#020202] py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 text-center md:flex-row md:text-left">
          <div>
            <div className="flex items-center justify-center gap-2.5 md:justify-start">
              <div className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </div>
              <span className="font-mono text-xs font-bold tracking-[0.25em] text-white uppercase">
                NACHODEVSC
              </span>
            </div>
            <p className="mt-2 font-mono text-[11px] tracking-[0.15em] text-white/40 uppercase">
              © {new Date().getFullYear()} IGNACIO CASTILLO // CONCEPCIÓN, CHILE
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:bg-white hover:text-black hover:scale-105"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:bg-white hover:text-black hover:scale-105"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:bg-white hover:text-black hover:scale-105"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={SITE.cvPath}
              download
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:bg-white hover:text-black hover:scale-105"
              aria-label="Descargar CV"
            >
              <Download className="h-4 w-4" />
            </a>
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
  {
    role: "Ayudante Redes de Computadores",
    org: "Universidad Técnica Federico Santa María",
    time: "2026 — hoy",
    desc: "Diagnóstico y resolución de problemas de red. Wireshark, laboratorios y apoyo directo a estudiantes.",
  },
  {
    role: "Ayudante Taller de Sistemas de Información",
    org: "USM · Hualpén",
    time: "2025 — hoy",
    desc: "Guío equipos en proyectos de título: del planteamiento del problema al entregable funcional.",
  },
  {
    role: "Consultoría & ejecución digital",
    org: "Autónomo · Remoto",
    time: "2025 — hoy",
    desc: "Identifico la necesidad del cliente, propongo la solución y la implemento hasta producción.",
  },
  {
    role: "Founder & Tech Lead",
    org: "Kenkomed",
    time: "2024 — hoy",
    desc: "Problema clínico real → producto HealthTech: arquitectura, backend, datos y sitio web.",
  },
];

const process = [
  {
    icon: Search,
    title: "Entender el problema",
    desc: "¿Qué duele hoy? ¿Para quién? ¿Cómo sabemos que quedó resuelto?",
  },
  {
    icon: Lightbulb,
    title: "Diseñar la solución",
    desc: "Arquitectura, trade-offs y un plan claro antes de escribir una línea de código.",
  },
  {
    icon: Wrench,
    title: "Ejecutar con rigor",
    desc: "Iteraciones cortas, entregas visibles y decisiones documentadas.",
  },
  {
    icon: Rocket,
    title: "Llevar a producción",
    desc: "Deploy, validación con usuarios reales y soporte post-lanzamiento.",
  },
];

/* ---------- Components ---------- */

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl scroll-mt-20 px-5 py-20 md:py-28 ${className ?? ""}`}
    >
      <div className="mb-12 max-w-3xl">
        <div className="reveal mb-3 inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-purple-400/90">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          <span>// {eyebrow}</span>
        </div>
        <h2
          className="reveal text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95]"
          data-delay="80"
        >
          {title}
        </h2>
        {subtitle && (
          <p
            className="reveal mt-4 font-mono text-xs md:text-sm text-white/50 tracking-[0.05em] leading-relaxed max-w-2xl"
            data-delay="160"
          >
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}
