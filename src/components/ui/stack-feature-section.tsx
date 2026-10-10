"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaReact, FaAws, FaDocker, FaNodeJs, FaGithub, FaPython, FaLinux } from "react-icons/fa";
import {
  SiNextdotjs,
  SiPostgresql,
  SiDjango,
  SiTypescript,
  SiTailwindcss,
  SiAstro,
  SiRedis,
  SiVite,
} from "react-icons/si";

// Compatibility Link for Vite/React and Next.js environments
interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, target, children, className, ...props }) => {
  return (
    <a href={href} target={target} rel="noopener noreferrer" className={className} {...props}>
      {children}
    </a>
  );
};

const fallbackUrls = [
  "https://cdn.21st.dev/assets/mirror/f2/f2cadfd0d3f726df66f2fbbb0e0c8ae9bbb83e9a4d3c740e2a676e5be2e4edea.svg",
  "https://cdn.21st.dev/assets/localized/efc638778fc594db7cb6c8bf3d98c7672d71dda5e3f4bfb19096581efc367135.svg",
];

export interface IconConfig {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> | null;
  color?: string;
  img?: string;
  name?: string;
}

const defaultIconConfigs: IconConfig[] = [
  { Icon: FaReact, color: "#61DAFB", name: "React" },
  { Icon: FaPython, color: "#3776AB", name: "Python" },
  { Icon: SiDjango, color: "#2BA977", name: "Django" },
  { Icon: FaDocker, color: "#2496ED", name: "Docker" },
  { Icon: SiPostgresql, color: "#4169E1", name: "PostgreSQL" },
  { Icon: SiTypescript, color: "#3178C6", name: "TypeScript" },
  { Icon: SiAstro, color: "#BC52EE", name: "Astro" },
  { Icon: FaAws, color: "#FF9900", name: "AWS" },
  { Icon: SiTailwindcss, color: "#06B6D4", name: "Tailwind CSS" },
  { Icon: FaNodeJs, color: "#339933", name: "Node.js" },
  { Icon: SiNextdotjs, color: "#FFFFFF", name: "Next.js" },
  { Icon: FaGithub, color: "#C084FC", name: "GitHub" },
  { Icon: FaLinux, color: "#FCC624", name: "Linux" },
  { Icon: SiRedis, color: "#DC382D", name: "Redis" },
  { Icon: SiVite, color: "#BD34FE", name: "Vite" },
  { Icon: null, img: fallbackUrls[0], name: "Dev" },
  { Icon: null, img: fallbackUrls[1], name: "Cloud" },
];

export interface FeatureSectionProps {
  badge?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  onPrimaryCtaClick?: () => void;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  onSecondaryCtaClick?: () => void;
  icons?: IconConfig[];
  className?: string;
}

export default function FeatureSection({
  badge,
  title = "Build your idea",
  subtitle = "RUIXEN is a modern and responsive UI kit for React, Next.js, and Tailwind CSS.",
  primaryCtaText = "Get Started",
  primaryCtaHref = "https://ruixen.com",
  onPrimaryCtaClick,
  secondaryCtaText = "Learn More",
  secondaryCtaHref,
  onSecondaryCtaClick,
  icons = defaultIconConfigs,
  className = "",
}: FeatureSectionProps) {
  const orbitCount = 3;
  const orbitGap = 8; // rem between orbits
  const iconsPerOrbit = Math.ceil(icons.length / orbitCount);

  return (
    <section
      className={`relative mx-auto my-12 flex min-h-[32rem] w-full max-w-6xl flex-col items-center justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#070707]/90 p-8 shadow-2xl backdrop-blur-xl md:h-[32rem] md:flex-row md:pl-12 lg:pl-16 ${className}`}
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-purple-600/15 blur-[120px]" />

      {/* Left side: Heading and Text */}
      <div className="relative z-10 flex w-full flex-col justify-center py-6 md:w-1/2 md:py-0">
        {badge && (
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 font-mono text-[10px] font-bold tracking-[0.2em] text-purple-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            {badge}
          </div>
        )}
        <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl uppercase">
          {title}
        </h2>
        <p className="mb-8 max-w-lg font-mono text-xs leading-relaxed tracking-wide text-white/60 md:text-sm">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-3.5">
          {primaryCtaHref ? (
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 px-6 py-2.5 font-mono text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] hover:brightness-110 hover:shadow-purple-500/40"
            >
              <Link href={primaryCtaHref} target="_blank">
                {primaryCtaText}
              </Link>
            </Button>
          ) : (
            <Button
              onClick={onPrimaryCtaClick}
              className="rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 px-6 py-2.5 font-mono text-xs font-bold tracking-widest text-white uppercase shadow-lg shadow-purple-500/25 transition-all hover:scale-[1.02] hover:brightness-110 hover:shadow-purple-500/40"
            >
              {primaryCtaText}
            </Button>
          )}

          {secondaryCtaText && (
            <>
              {secondaryCtaHref ? (
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 px-6 py-2.5 font-mono text-xs font-bold tracking-widest text-white uppercase backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
                >
                  <Link href={secondaryCtaHref} target="_blank">
                    {secondaryCtaText}
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={onSecondaryCtaClick}
                  className="rounded-full border-white/15 bg-white/5 px-6 py-2.5 font-mono text-xs font-bold tracking-widest text-white uppercase backdrop-blur transition-all hover:border-white/30 hover:bg-white/10"
                >
                  {secondaryCtaText}
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Right side: Orbit animation cropped to 1/4 */}
      <div className="relative flex h-80 w-full items-center justify-center overflow-hidden md:h-full md:w-1/2 md:justify-start">
        <div className="relative flex h-[50rem] w-[50rem] items-center justify-center md:translate-x-[45%]">
          {/* Center Circle with glowing purple aura */}
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-purple-500/40 bg-[#0e071a] shadow-[0_0_40px_rgba(168,85,247,0.4)]">
            <FaReact className="h-12 w-12 text-purple-400 animate-pulse" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${12 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-dashed border-purple-500/20"
                style={{
                  width: size,
                  height: size,
                  animation: `orbit-spin ${14 + orbitIdx * 7}s linear infinite`,
                }}
              >
                {icons
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={iconIdx}
                        className="group absolute flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#120a1f] p-2 shadow-lg shadow-black/80 transition-transform duration-300 hover:scale-125 hover:border-purple-500/60"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        title={cfg.name}
                      >
                        {cfg.Icon ? (
                          <cfg.Icon className="h-5 w-5" style={{ color: cfg.color }} />
                        ) : (
                          <img
                            src={cfg.img}
                            alt={cfg.name ?? "icon"}
                            className="h-5 w-5 object-contain"
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

export { FeatureSection as StackFeatureSection };
