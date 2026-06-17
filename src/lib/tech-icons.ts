export const TECH_ICONS: Record<string, string> = {
  Django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Astro: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  Tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  FastAPI: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  Kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
};

export const TECH_GRADIENTS: Record<string, string> = {
  Django: "from-emerald-500/20 to-emerald-900/10",
  Python: "from-yellow-500/15 to-blue-500/10",
  Astro: "from-orange-500/20 to-red-500/10",
  TypeScript: "from-blue-500/20 to-blue-900/10",
  Firebase: "from-amber-500/20 to-orange-600/10",
  MySQL: "from-sky-500/15 to-blue-800/10",
  Tailwind: "from-cyan-500/15 to-teal-600/10",
  FastAPI: "from-teal-500/20 to-emerald-900/10",
  "Next.js": "from-zinc-400/20 to-zinc-800/10",
};

export function resolveTechIcon(stack: string[]) {
  for (const item of stack) {
    const key = Object.keys(TECH_ICONS).find(
      (k) => item.toLowerCase().includes(k.toLowerCase()),
    );
    if (key) return key;
  }
  return stack[0] ?? "Code";
}
