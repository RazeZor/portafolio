"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { logoImg } from "@/components/logo";

export interface ExperienceHeroStat {
  id: string;
  title: string;
  val?: string;
  type: "progress" | "data" | "text";
  sub1?: { label: string; value: string };
  sub2?: { label: string; value: string };
  text?: React.ReactNode;
}

export interface ExperienceHeroProps {
  badge?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  ctaHref?: string;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  secondaryCtaHref?: string;
  stats?: ExperienceHeroStat[];
  isFixed?: boolean;
  className?: string;
}

const LiquidBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state) => {
    const { clock } = state;
    const pointer = state.pointer ?? (state as unknown as { mouse?: THREE.Vector2 }).mouse;
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.ShaderMaterial;
      if (mat && mat.uniforms) {
        mat.uniforms.uTime.value = clock.getElapsedTime();
        if (pointer) {
          mat.uniforms.uMouse.value.lerp(pointer, 0.05);
        }
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`}
        fragmentShader={`
          uniform float uTime; uniform vec2 uMouse; varying vec2 vUv;
          void main() {
            vec2 uv = vUv; float t = uTime * 0.14;
            vec2 m = uMouse * 0.12;
            float wave1 = sin(uv.x * 7.0 + t + m.x * 10.0);
            float wave2 = sin(uv.y * 5.0 - t + m.y * 10.0);
            float pattern = smoothstep(0.0, 1.0, (wave1 + wave2) * 0.5 + 0.5);

            // Base deep obsidian
            vec3 baseDark = vec3(0.008, 0.008, 0.012);
            // Deep neon & cosmic purple auras
            vec3 darkPurple = vec3(0.05, 0.01, 0.12);
            vec3 neonViolet = vec3(0.18, 0.04, 0.32);

            vec3 aura = mix(darkPurple, neonViolet, uv.x * 0.85 + 0.15);
            vec3 finalColor = mix(baseDark, aura, pattern * 0.75);
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
};

const Monolith = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[13, 1]} />
        <MeshDistortMaterial
          color="#0d0818"
          speed={4}
          distort={0.4}
          roughness={0.06}
          metalness={0.95}
        />
      </mesh>
    </Float>
  );
};

export const Component: React.FC<ExperienceHeroProps> = ({
  badge = "HAIK.DEV",
  titleLine1 = "CREATIVE",
  titleLine2 = "AGENCY",
  subtitle = "We engineer immersive digital experiences through spatial logic and advanced WebGL.",
  ctaText = "Start a Project",
  onCtaClick,
  ctaHref,
  secondaryCtaText,
  onSecondaryCtaClick,
  secondaryCtaHref,
  stats,
  isFixed = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const defaultStats: ExperienceHeroStat[] = useMemo(
    () => [
      { id: "001", title: "AVAILABILITY", val: "Open", type: "progress" },
      {
        id: "002",
        title: "STUDIO STATS",
        val: "20+ Wins",
        type: "data",
        sub1: { label: "Awwwards Tier", value: "2024-25" },
        sub2: { label: "Retention Rate", value: "98.2%" },
      },
      {
        id: "003",
        title: "EXPERTISE",
        val: "Creative Dev",
        type: "text",
        text: (
          <>
            Transforming static interfaces into{" "}
            <span className="italic text-white">narrative apertures</span>.
          </>
        ),
      },
    ],
    [],
  );

  const activeStats = stats || defaultStats;

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (revealRef.current) {
        gsap.fromTo(
          revealRef.current,
          { filter: "blur(30px)", opacity: 0, scale: 1.02 },
          {
            filter: "blur(0px)",
            opacity: 1,
            scale: 1,
            duration: 2.2,
            ease: "expo.out",
          },
        );
      }

      gsap.from(".command-cell", {
        x: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out",
        delay: 1,
        clearProps: "all",
      });

      const handleMouseMove = (e: MouseEvent) => {
        if (!ctaRef.current) return;
        const rect = ctaRef.current.getBoundingClientRect();
        const dist = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2),
        );
        if (dist < 150) {
          gsap.to(ctaRef.current, {
            x: (e.clientX - (rect.left + rect.width / 2)) * 0.4,
            y: (e.clientY - (rect.top + rect.height / 2)) * 0.4,
            duration: 0.6,
          });
        } else {
          gsap.to(ctaRef.current, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const renderCtaContent = () => (
    <>
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-purple-500/30 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-500 group-hover:border-transparent group-hover:bg-gradient-to-tr group-hover:from-purple-600 group-hover:via-violet-500 group-hover:to-purple-400 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.45)]">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-purple-400 transition-colors duration-500 group-hover:stroke-white"
        >
          <path
            d="M7 17L17 7M17 7H8M17 7V16"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase transition-colors duration-300 group-hover:text-purple-300">
        {ctaText}
      </span>
    </>
  );

  return (
    <section
      ref={containerRef}
      className={`relative flex min-h-screen w-full flex-col overflow-hidden bg-[#020202] selection:bg-white selection:text-black ${className}`}
    >
      <div className={`${isFixed ? "fixed" : "absolute"} inset-0 z-0 pointer-events-none`}>
        <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
          <ambientLight intensity={0.45} />
          <spotLight position={[50, 50, 50]} intensity={3.5} color="#C084FC" />
          <pointLight position={[-40, -20, 25]} intensity={2.5} color="#A855F7" />
          <LiquidBackground />
          <Monolith />
        </Canvas>
      </div>

      <div
        ref={revealRef}
        className="relative z-10 flex min-h-screen w-full flex-col items-center gap-10 p-8 md:flex-row md:items-stretch md:p-14 lg:p-20"
      >
        <div className="flex w-full min-w-0 flex-1 flex-col justify-between pb-12 md:pb-8">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full p-[1.5px] bg-gradient-to-tr from-purple-500 via-violet-500 to-purple-700 shadow-lg shadow-purple-500/25">
              <img
                src={logoImg}
                alt="NachoDevsc"
                className="h-full w-full rounded-full object-cover ring-1 ring-black/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="relative h-2 w-2 rounded-full bg-purple-500">
                <div className="absolute inset-0 animate-ping rounded-full bg-purple-400 opacity-75" />
              </div>
              <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase">
                {badge}
              </span>
            </div>
          </div>

          <div className="max-w-4xl pr-12 lg:-translate-y-8">
            <h1 className="text-[clamp(3.5rem,9.5vw,11.5rem)] font-black leading-[0.87] tracking-tighter text-white uppercase italic-none">
              {titleLine1} <br /> <span className="text-outline">{titleLine2}</span>
            </h1>
            <p className="mt-8 max-w-sm font-mono text-[11px] leading-relaxed tracking-[0.35em] text-white/40 uppercase">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:-translate-y-20">
            {ctaHref ? (
              <a
                ref={ctaRef as React.RefObject<HTMLAnchorElement>}
                href={ctaHref}
                onClick={onCtaClick}
                className="group flex w-fit items-center gap-6"
              >
                {renderCtaContent()}
              </a>
            ) : (
              <button
                ref={ctaRef as React.RefObject<HTMLButtonElement>}
                onClick={onCtaClick}
                className="group flex w-fit items-center gap-6"
              >
                {renderCtaContent()}
              </button>
            )}

            {secondaryCtaText && (
              <>
                {secondaryCtaHref ? (
                  <a
                    href={secondaryCtaHref}
                    onClick={onSecondaryCtaClick}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                  >
                    {secondaryCtaText}
                  </a>
                ) : (
                  <button
                    onClick={onSecondaryCtaClick}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-mono text-[11px] font-bold tracking-[0.2em] text-white uppercase backdrop-blur transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                  >
                    {secondaryCtaText}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Side Deck: Flex shrink fix for layout stability */}
        <div className="z-20 flex w-full flex-shrink-0 flex-col justify-center gap-4 md:w-80 lg:w-96">
          {activeStats.map((item) => (
            <div key={item.id} className="command-cell glass-panel block p-6 opacity-1 sm:p-7">
              <span className="mb-3 block font-mono text-[9px] tracking-widest text-white/25 uppercase">
                {item.id} // {item.title}
              </span>
              {item.type === "progress" ? (
                <div className="mt-2 flex items-end justify-between">
                  <h4 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl">
                    {item.val}
                  </h4>
                  <div className="h-[2px] w-20 overflow-hidden rounded-full bg-white/10">
                    <div className="animate-loading h-full w-[60%] bg-gradient-to-r from-purple-600 via-violet-500 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]" />
                  </div>
                </div>
              ) : item.type === "data" ? (
                <div className="mt-4 flex flex-col gap-3">
                  <div className="flex justify-between font-mono text-[10px] text-white/50">
                    <span>{item.sub1?.label ?? "Awwwards Tier"}</span>
                    <span>{item.sub1?.value ?? "2024-25"}</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5" />
                  <div className="flex justify-between font-mono text-[10px] text-white/50">
                    <span>{item.sub2?.label ?? "Retention Rate"}</span>
                    <span>{item.sub2?.value ?? "98.2%"}</span>
                  </div>
                </div>
              ) : (
                <h3 className="mt-3 text-sm font-medium leading-snug text-white/70">
                  {item.text ?? (
                    <>
                      Transforming static interfaces into{" "}
                      <span className="italic text-white">narrative apertures</span>.
                    </>
                  )}
                </h3>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ExperienceHero = Component;
export default Component;
