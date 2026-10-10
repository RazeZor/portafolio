import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type HeroAvatarProps = {
  className?: string;
};

export function HeroAvatar({ className }: HeroAvatarProps) {
  return (
    <div className="relative inline-block rounded-full p-[3px] bg-gradient-to-tr from-purple-600 via-violet-500 to-purple-800 shadow-[0_24px_80px_-20px_rgba(168,85,247,0.5)]">
      <Logo
        size="hero"
        className={cn("ring-2 ring-black/60", className)}
        alt="Ignacio Castillo — NachoDevsc"
      />
    </div>
  );
}
