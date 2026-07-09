import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Loader2, Send } from "lucide-react";
import { SITE } from "@/lib/site-config";
import {
  formatCooldownRemaining,
  getContactCooldownRemaining,
  setContactCooldown,
} from "@/lib/contact-rate-limit";

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

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
    const message = String(data.get("message") ?? "");
    const deadline = String(data.get("deadline") ?? "");

    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent(`Consulta de ${name} — portafolio`);
      const body = encodeURIComponent(
        `Nombre: ${name}\nPlazo: ${deadline}\n\n${message}`,
      );
      setContactCooldown();
      setCooldownRemaining(getContactCooldownRemaining());
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
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
          message: `Plazo: ${deadline}\n\n${message}`,
          subject: `Nuevo contacto — ${name}`,
          from_name: SITE.brand,
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
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
          <a href={`mailto:${SITE.email}`} className="text-accent hover:underline">
            {SITE.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Nombre
        </label>
        <input
          id="contact-name"
          name="name"
          required
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label htmlFor="contact-deadline" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Plazo aproximado
        </label>
        <input
          id="contact-deadline"
          name="deadline"
          className="w-full rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
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
          className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent/50 focus:ring-1 focus:ring-accent/30"
          placeholder="Cuéntame el contexto: qué pasa hoy y qué quieres lograr."
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive">No se pudo enviar. Escríbeme a {SITE.email}</p>
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
      {!WEB3FORMS_KEY && (
        <p className="text-center text-[11px] text-muted-foreground">
          Se abrirá tu cliente de correo. Para envío directo, configura VITE_WEB3FORMS_ACCESS_KEY.
        </p>
      )}
    </form>
  );
}
