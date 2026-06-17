import fotoPerfil from "@/assets/foto-perfil.jpg";
import { cn } from "@/lib/utils";

const sizes = {
  hero: "h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72",
  md: "h-32 w-32",
  sm: "h-10 w-10",
} as const;

type ProfilePhotoProps = {
  size?: keyof typeof sizes;
  className?: string;
  alt?: string;
};

export function ProfilePhoto({
  size = "hero",
  className,
  alt = "Ignacio Castillo — Ingeniero en Informática",
}: ProfilePhotoProps) {
  return (
    <img
      src={fotoPerfil}
      alt={alt}
      className={cn("rounded-full object-cover object-top", sizes[size], className)}
    />
  );
}

export { fotoPerfil as profilePhotoImg };
