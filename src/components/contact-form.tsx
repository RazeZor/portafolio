import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Loader2, Send } from "lucide-react";
import { SITE } from "@/lib/site-config";
import {
  formatCooldownRemaining,
  getContactCooldownRemaining,
  setContactCooldown,
} from "@/lib/contact-rate-limit";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

const INPUT_CLASS =
  "w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30";

const PROJECT_TYPES = [
  "Sitio web / landing",
  "E-commerce / catálogo",
  "Sistema o plataforma",
  "Mantenimiento / mejora",
  "Consultoría técnica",
  "Otro",
] as const;

const BUDGET_RANGES = [
  "Aún no lo tengo definido",
  "Menos de $300.000 CLP",
  "$300.000 – $800.000 CLP",
  "$800.000 – $2.000.000 CLP",
  "Más de $2.000.000 CLP",
] as const;

function buildContactMessage(fields: {
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  deadline: string;
  message: string;
}) {
  const details = [
    fields.company && `Empresa / proyecto: ${fields.company}`,
    fields.phone && `Teléfono / WhatsApp: ${fields.phone}`,
    fields.projectType && `Tipo de proyecto: ${fields.projectType}`,
    fields.budget && `Presupuesto estimado: ${fields.budget}`,
    fields.deadline && `Plazo: ${fields.deadline}`,
  ].filter(Boolean);

  return details.length > 0 ? `${details.join("\n")}\n\n${fields.message}` : fields.message;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [cooldownRemaining, setCooldownRemaining] = useState(getContactCooldownRemaining);

  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const interval = window.setInterval(() => {
      setCooldownRemaining(getContactCooldownRemaining());
    }, 60_000);
    return () => window.clearInterval(interval);
  }, [cooldownRemaining]);

  const isRateLimited = cooldownRemaining > 0;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isRateLimited) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const company = String(data.get("company") ?? "");
    const phone = String(data.get("phone") ?? "");
    const projectType = String(data.get("projectType") ?? "");
    const budget = String(data.get("budget") ?? "");
    const message = String(data.get("message") ?? "");
    const deadline = String(data.get("deadline") ?? "");

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name,
          email,
          phone,
          company,
          project_type: projectType,
          budget,
          deadline,
          message: buildContactMessage({ company, phone, projectType, budget, deadline, message }),
          subject: `Nuevo contacto — ${name}${company ? ` (${company})` : ""}`,
          from_name: SITE.brand,
          botcheck: false,
        }),
      });

      const result = (await res.json()) as {
        success?: boolean;
        message?: string;
        body?: { message?: string };
      };
      if (!res.ok || result.success === false) {
        throw new Error(result.message ?? result.body?.message ?? "Error al enviar");
      }

      setContactCooldown();
      setCooldownRemaining(getContactCooldownRemaining());
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-background/60 p-8 text-center backdrop-blur">
        <CheckCircle2 className="h-10 w-10 text-accent" />
        <p className="mt-3 font-medium">Mensaje enviado</p>
        <p className="mt-1 text-sm text-muted-foreground">Te respondo en menos de 24 h.</p>
        {!isRateLimited && (
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm text-accent hover:underline"
          >
            Enviar otro mensaje
          </button>
        )}
      </div>
    );
  }

  if (isRateLimited) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-background/60 p-8 text-center backdrop-blur">
        <Clock className="h-10 w-10 text-muted-foreground" />
        <p className="mt-3 font-medium">Ya enviaste un mensaje recientemente</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Podrás enviar otro en {formatCooldownRemaining(cooldownRemaining)}.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Si es urgente, escríbeme a{" "}
          <a href={`mailto:${SITE.inboxEmail}`} className="text-accent hover:underline">
            {SITE.inboxEmail}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Nombre
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className={INPUT_CLASS}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={INPUT_CLASS}
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-company" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Empresa o proyecto
          </label>
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
            className={INPUT_CLASS}
            placeholder="Ej. Mi pyme, startup, marca personal..."
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Teléfono / WhatsApp
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={INPUT_CLASS}
            placeholder="+56 9 ..."
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-project-type" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Tipo de proyecto
          </label>
          <select
            id="contact-project-type"
            name="projectType"
            required
            defaultValue=""
            className={INPUT_CLASS}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contact-budget" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Presupuesto estimado
          </label>
          <select
            id="contact-budget"
            name="budget"
            defaultValue=""
            className={INPUT_CLASS}
          >
            <option value="">Prefiero no indicarlo</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-deadline" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Plazo aproximado
        </label>
        <input
          id="contact-deadline"
          name="deadline"
          className={INPUT_CLASS}
          placeholder="Ej. 2 semanas, sin apuro..."
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          ¿Qué necesitas?
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          className={`${INPUT_CLASS} resize-none`}
          placeholder="Cuéntame el contexto: qué pasa hoy, qué quieres lograr y qué ya has intentado."
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive">
          No se pudo enviar.{WEB3FORMS_KEY ? "" : " Falta configurar el formulario en producción."}{" "}
          Escríbeme a{" "}
          <a href={`mailto:${SITE.inboxEmail}`} className="underline">
            {SITE.inboxEmail}
          </a>
        </p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-60"
        style={{ background: "var(--gradient-accent)" }}
      >
        {status === "loading" ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</>
        ) : (
          <><Send className="h-4 w-4" /> Enviar mensaje</>
        )}
      </button>
    </form>
  );
}
