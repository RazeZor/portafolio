const COOKIE_NAME = "nachodevsc_contact_sent";
const COOLDOWN_MS = 24 * 60 * 60 * 1000;

function readSentAt(): number | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  const sentAt = Number(decodeURIComponent(match[1]));
  return Number.isFinite(sentAt) ? sentAt : null;
}

export function getContactCooldownRemaining(): number {
  const sentAt = readSentAt();
  if (sentAt === null) return 0;
  const remaining = sentAt + COOLDOWN_MS - Date.now();
  return remaining > 0 ? remaining : 0;
}

export function setContactCooldown(): void {
  const maxAge = Math.ceil(COOLDOWN_MS / 1000);
  document.cookie = `${COOKIE_NAME}=${Date.now()}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function formatCooldownRemaining(ms: number): string {
  const totalMinutes = Math.ceil(ms / (60 * 1000));
  if (totalMinutes < 60) {
    return totalMinutes <= 1 ? "un momento" : `${totalMinutes} minutos`;
  }
  const hours = Math.ceil(totalMinutes / 60);
  return hours === 1 ? "1 hora" : `${hours} horas`;
}
