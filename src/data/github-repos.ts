export type FeaturedRepo = {
  owner?: string;
  name: string;
  description: string;
  language: string;
};

/** Repos curados para el portafolio — sin Sistema-kenkomed-django */
export const FEATURED_REPOS: FeaturedRepo[] = [
  {
    name: "portafolio",
    description: "Portafolio profesional con React, TypeScript y Vite.",
    language: "TypeScript",
  },
  {
    owner: "juako950",
    name: "nerdearla_ollama",
    description: "Hackathon Nerdearla 2026: chat LLM local con Ollama, Strands y FastAPI.",
    language: "TypeScript",
  },
  {
    name: "MicroServicio-FastApi",
    description: "Microservicio backend con FastAPI y Python.",
    language: "Python",
  },
  {
    name: "SitioWeb-KenkoMed",
    description: "Sitio institucional de Kenkomed — Astro y TypeScript.",
    language: "Astro",
  },
  {
    name: "Proyecto_Slam_Jam",
    description: "App Android desarrollada en Kotlin con Android Studio.",
    language: "Kotlin",
  },
  {
    name: "Trabajo_Redes",
    description: "Laboratorio y scripts de redes de computadores.",
    language: "Python",
  },
  {
    name: "REPLICA-SIGA-USM",
    description: "Réplica académica del sistema SIGA — USM.",
    language: "HTML",
  },
  {
    name: "EstudioCienciaDeDatos1",
    description: "Notebooks y análisis de ciencia de datos.",
    language: "Python",
  },
];

export const EXCLUDED_REPO_NAMES = new Set([
  "Sistema-kenkomed-django",
]);

export function repoFullName(repo: FeaturedRepo, defaultOwner = "RazeZor") {
  const owner = repo.owner ?? defaultOwner;
  return `${owner}/${repo.name}`;
}

export function repoUrl(repo: FeaturedRepo, defaultOwner = "RazeZor") {
  return `https://github.com/${repoFullName(repo, defaultOwner)}`;
}
