import logoImg from "@/assets/MIlogo.png";
import { cn } from "@/lib/utils";

const sizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
  xl: "h-52 w-52",
  hero: "h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72",
} as const;

type LogoProps = {
  size?: keyof typeof sizes;
  className?: string;
  alt?: string;
};

export function Logo({ size = "md", className, alt = "Ignacio Castillo — NachoDevsc" }: LogoProps) {
  return (
    <img
      src={logoImg}
      alt={alt}
      className={cn("rounded-full object-cover", sizes[size], className)}
    />
  );
}

export { logoImg };
