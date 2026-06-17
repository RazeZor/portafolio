import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type HeroAvatarProps = {
  className?: string;
};

export function HeroAvatar({ className }: HeroAvatarProps) {
  return (
    <Logo
      size="hero"
      className={cn(
        "ring-2 ring-border shadow-[0_24px_80px_-20px_oklch(0.62_0.20_277_/_0.45)]",
        className,
      )}
      alt="Ignacio Castillo — NachoDevsc"
    />
  );
}
