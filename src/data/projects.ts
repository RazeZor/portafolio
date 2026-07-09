import kenkomedImg from "@/assets/fondo_kenkomed.png";
import movimueblesImg from "@/assets/movimuebles_fondo.png";
import pinsaImg from "@/assets/pinsa_fondo.png";
import vittoriaImg from "@/assets/vittoria_fondo.png";
import tssaraImg from "@/assets/tsarai.png";
import alejandroImg from "@/assets/alejandro_fotografia.png";
import nerdearlaImg from "@/assets/nerdearla_ollama.svg";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  tag: string;
  title: string;
  role: string;
  year: string;
  url: string;
  github?: string;
  image: string;
  summary: string;
  description: string;
  problem: string;
  solution: string;
  highlights: string[];
  stack: string[];
  metrics?: ProjectMetric[];
};

export const projects: Project[] = [
  {
    slug: "kenkomed",
    tag: "HealthTech · Producto propio",
    title: "Kenkomed",
    role: "Founder · Tech Lead",
    year: "2024 — hoy",
    url: "https://kenkomed.cl",
    github: "https://github.com/RazeZor/Sistema-kenkomed-django",
    image: kenkomedImg,
    summary: "DSS clínico para kinesiólogos: pacientes, tratamientos, métricas y sitio institucional.",
    description:
      "Kenkomed es la startup que fundé para digitalizar la práctica kinesiológica en Chile. Lideré el producto de punta a punta: arquitectura backend, base de datos clínica, panel de profesionales y sitio institucional. Hoy está en uso con módulos de admisión QR, escalas validadas (EVA, PSFS, Barthel) y un motor DSS que apoya decisiones clínicas con datos reales del paciente.",
    problem:
      "Los kinesiólogos gestionaban fichas en papel o Excel, perdían tiempo en anamnesis repetitiva y no tenían herramientas accesibles para interpretar outcomes clínicos con rigor.",
    solution:
      "Plataforma web con backend Django + MySQL, admisión remota por QR, historias clínicas estructuradas, cuestionarios clínicos integrados y dashboard de seguimiento. Landing en Astro para captación de clínicas.",
    highlights: [
      "Backend Django + MySQL con roles Admin y Clínico",
      "8+ escalas clínicas validadas integradas al flujo",
      "Admisión remota QR — paciente completa ficha antes de llegar",
      "Sitio institucional y panel en producción",
    ],
    metrics: [
      { value: "8+", label: "escalas clínicas" },
      { value: "QR", label: "admisión remota" },
      { value: "Prod", label: "en uso real" },
    ],
    stack: ["Django", "Python", "MySQL", "Astro", "DSS", "Analítica clínica"],
  },
  {
    slug: "movimuebles",
    tag: "E-commerce · Cliente pyme",
    title: "MoviMuebles",
    role: "Full Stack · Freelance",
    year: "2025",
    url: "https://movimuebles.cl",
    image: movimueblesImg,
    summary: "Catálogo digital para mueblería local con filtros, Firebase y SEO regional.",
    description:
      "Proyecto freelance para una mueblería de Concepción que operaba casi 100% por WhatsApp. Diseñé e implementé un catálogo web rápido donde cada producto tiene ficha, fotos, filtros por categoría y contacto directo. El cliente puede actualizar inventario sin depender de un desarrollador.",
    problem:
      "Cotizaciones manuales por WhatsApp, fotos dispersas, cero presencia en buscadores y dificultad para mostrar el catálogo completo a clientes nuevos.",
    solution:
      "Sitio estático con Astro y TypeScript, integración Firebase para stock dinámico, SEO local orientado al Biobío y UX pensada para conversión móvil.",
    highlights: [
      "Lighthouse 95+ — carga ultrarrápida",
      "Inventario editable vía Firebase",
      "Filtros y búsqueda por categoría",
      "CTA directo a WhatsApp por producto",
    ],
    metrics: [
      { value: "95+", label: "Lighthouse" },
      { value: "100%", label: "mobile-first" },
    ],
    stack: ["Astro", "TypeScript", "Firebase", "Tailwind", "SEO"],
  },
  {
    slug: "pinsa",
    tag: "Corporativo · B2B",
    title: "Pinsa",
    role: "Full Stack · Freelance",
    year: "2025",
    url: "https://pinsa.cl",
    image: pinsaImg,
    summary: "Landing B2B industrial — presencia digital, credibilidad y captación de leads.",
    description:
      "Primera presencia web de una marca de servicios industriales. El foco fue transmitir solidez a clientes B2B, explicar servicios con claridad y convertir visitas en consultas comerciales mediante un formulario optimizado.",
    problem:
      "Marca sin sitio web que dependía de referidos. Difícil validar credibilidad frente a clientes corporativos que investigan online antes de contactar.",
    solution:
      "Landing institucional en Astro con jerarquía visual clara, copy orientado a confianza, formulario de contacto y deploy en Vercel con tiempos de carga bajo 1 segundo.",
    highlights: [
      "Primera presencia digital de la marca",
      "Diseño corporativo mobile-first",
      "Formulario como canal principal de leads",
      "Deploy continuo en Vercel",
    ],
    metrics: [
      { value: "1ª", label: "presencia digital" },
      { value: "<1s", label: "carga" },
    ],
    stack: ["Astro", "TypeScript", "Tailwind", "Vercel"],
  },
  {
    slug: "vittoria",
    tag: "Branding · One page",
    title: "Vittoria",
    role: "Full Stack · Freelance",
    year: "2025",
    url: "https://vittoria.vercel.app/",
    image: vittoriaImg,
    summary: "One-page de marca personal con tipografía cuidada y SEO local.",
    description:
      "Sitio one-page para una marca personal emergente. Trabajé tipografía, ritmo visual y una navegación mínima que comunica identidad sin ruido. Prioricé performance y SEO local para posicionar la marca en su región.",
    problem:
      "Marca nueva sin presencia digital coherente con su identidad visual. Necesitaba un sitio memorable, rápido y fácil de compartir en redes.",
    solution:
      "One-page en Astro con animaciones ligeras, paleta alineada al branding y arquitectura de contenido optimizada para SEO y conversión.",
    highlights: [
      "Performance 98/100 en Lighthouse",
      "Animaciones CSS ligeras, sin JS pesado",
      "SEO local y meta tags optimizados",
      "100% responsive",
    ],
    metrics: [
      { value: "98", label: "Performance" },
      { value: "100%", label: "responsive" },
    ],
    stack: ["Astro", "Tailwind", "TypeScript"],
  },
  {
    slug: "tssara-abigail",
    tag: "Profesional · Salud",
    title: "Tssara Abigail",
    role: "Full Stack · Freelance",
    year: "2025",
    url: "https://tssaraiabigail.vercel.app/",
    image: tssaraImg,
    summary: "Web profesional de salud con servicios, bio y agendamiento vía WhatsApp.",
    description:
      "Sitio para una especialista en salud que necesitaba proyectar seriedad y facilitar el primer contacto con pacientes. Estructuré servicios, biografía, credenciales y CTAs claros hacia agendamiento por WhatsApp.",
    problem:
      "Profesional independiente sin web que generara confianza. Pacientes nuevos no encontraban información clara sobre servicios ni cómo agendar.",
    solution:
      "Web profesional en Astro con secciones de servicios, sobre mí, testimonios y botón persistente de contacto. Diseño limpio orientado a conversión.",
    highlights: [
      "Secciones de servicios y credenciales",
      "CTA directo a WhatsApp para agendar",
      "Diseño accesible y mobile-first",
      "Lighthouse 95+",
    ],
    metrics: [
      { value: "95+", label: "Lighthouse" },
      { value: "WA", label: "agendamiento directo" },
    ],
    stack: ["Astro", "Tailwind", "TypeScript"],
  },
  {
    slug: "alejandro-fotografia",
    tag: "Portfolio · Fotografía",
    title: "Alejandro Fotografía",
    role: "Full Stack · Freelance",
    year: "2025",
    url: "https://alejandro-fotografia.vercel.app/",
    image: alejandroImg,
    summary: "Portafolio fotográfico minimalista con galería optimizada y lazy loading.",
    description:
      "Portafolio visual para un fotógrafo profesional. La imagen es protagonista: galería con lazy loading, navegación mínima, fondo oscuro que resalta el trabajo y tiempos de carga rápidos incluso con muchas fotos en alta resolución.",
    problem:
      "Fotógrafo sin presencia web que mostrara su trabajo de forma profesional. Compartía fotos sueltas por Instagram sin un hub central.",
    solution:
      "Galería optimizada con carga diferida, diseño minimalista oscuro, categorías por tipo de sesión y performance priorizada para móvil.",
    highlights: [
      "Lazy loading en toda la galería",
      "Diseño oscuro que resalta las fotos",
      "Navegación simple por categorías",
      "Optimización de imágenes automática",
    ],
    metrics: [
      { value: "Lazy", label: "carga diferida" },
      { value: "Dark", label: "UI minimalista" },
    ],
    stack: ["Astro", "Tailwind", "Image Optimization"],
  },
  {
    slug: "nerdearla-ollama",
    tag: "IA · Hackathon · Nerdearla",
    title: "Nerdbot — Ollama + Strands",
    role: "Full Stack · Equipo de 2",
    year: "2026",
    url: "https://github.com/juako950/nerdearla_ollama",
    github: "https://github.com/juako950/nerdearla_ollama",
    image: nerdearlaImg,
    summary: "LLM local en menos de 6 h: chat offline, agente con tools y pipeline de fine-tuning en Kaggle.",
    description:
      "Proyecto del concurso Nerdearla Santiago 2026. En menos de seis horas, junto a un compañero, construimos un asistente conversacional que corre 100% en local con Ollama y qwen2.5:3b. Usamos Strands Agents para orquestar el agente, FastAPI como backend async y Next.js como interfaz de chat. Fue nuestra primera experiencia práctica con fine-tuning: curamos ejemplos en JSONL desde el propio chat y los preparamos para entrenar en Kaggle sobre un modelo de la familia open-weight (Qwen/PAI).",
    problem:
      "En un hackathon de IA hay que entregar un producto funcional en horas: chat usable, modelo local sin depender de APIs pagadas, y demostrar que se entiende el ciclo completo — inferencia, tools y datos para fine-tuning.",
    solution:
      "Arquitectura desacoplada Next.js + FastAPI + Ollama. Strands Agents gestiona system prompt, historial (10 turnos) y tools (fecha/hora real y búsqueda en dataset). Persistencia JSONL compatible con HuggingFace/Ollama para acumular pares pregunta-respuesta y exportar a Kaggle para fine-tuning.",
    highlights: [
      "Entregado en <6 h — Nerdearla Santiago 2026",
      "Strands Agents + tools (fecha/hora, búsqueda en dataset)",
      "Chat offline con qwen2.5:3b vía Ollama",
      "Curación JSONL integrada → pipeline fine-tuning Kaggle",
    ],
    metrics: [
      { value: "<6h", label: "hackathon" },
      { value: "100%", label: "offline" },
      { value: "JSONL", label: "fine-tuning" },
    ],
    stack: ["Next.js", "FastAPI", "Python", "Ollama", "Strands", "TypeScript", "qwen2.5"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProject = projects.find((p) => p.slug === "kenkomed")!;
