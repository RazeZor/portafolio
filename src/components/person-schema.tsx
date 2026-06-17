import { SITE } from "@/lib/site-config";

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    alternateName: SITE.brand,
    jobTitle: "Estudiante de Ingeniería en Informática",
    description: SITE.description,
    url: SITE.siteUrl,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Concepción",
      addressCountry: "CL",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidad Técnica Federico Santa María",
    },
    sameAs: [SITE.github, SITE.linkedin, SITE.kenkomed],
    knowsAbout: [
      "Python",
      "Django",
      "TypeScript",
      "React",
      "Docker",
      "PostgreSQL",
      "HealthTech",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
