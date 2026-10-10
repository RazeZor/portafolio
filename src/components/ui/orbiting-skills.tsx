"use client"
import React, { useEffect, useState, memo } from 'react';

// --- Type Definitions ---
type IconType =
  | 'html'
  | 'css'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'node'
  | 'tailwind'
  | 'python'
  | 'django'
  | 'fastapi'
  | 'go'
  | 'astro'
  | 'docker'
  | 'postgres'
  | 'git'
  | 'linux';

type GlowColor = 'cyan' | 'purple' | 'emerald' | 'amber';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Improved SVG Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
    color: '#E34F26'
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z" fill="#1572B6"/>
      </svg>
    ),
    color: '#1572B6'
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
        <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330"/>
      </svg>
    ),
    color: '#F7DF1E'
  },
  typescript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <rect width="24" height="24" rx="3" fill="#3178C6"/>
        <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0z" fill="#3178C6"/>
        <path d="M11.96 12.55h-2.73V20H6.55v-7.45H3.82V10.1h8.14v2.45zm9.52 4.14c0 2.1-.96 3.42-3.23 3.42-1.74 0-2.8-.75-3.38-1.92l2.12-1.24c.32.61.82 1.05 1.43 1.05.67 0 1.04-.33 1.04-.88 0-.64-.47-.97-1.56-1.41-1.85-.75-2.9-1.45-2.9-3.29 0-2 1.55-3.22 3.55-3.22 1.63 0 2.68.64 3.24 1.76l-2.02 1.2c-.31-.54-.74-.83-1.28-.83-.6 0-.89.33-.89.77 0 .5.39.77 1.41 1.18 2.05.81 2.97 1.65 2.97 3.46z" fill="#FFFFFF"/>
      </svg>
    ),
    color: '#3178C6'
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <g stroke="#61DAFB" strokeWidth="1.2" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
    color: '#61DAFB'
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z" fill="#339933"/>
      </svg>
    ),
    color: '#339933'
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#06B6D4"/>
      </svg>
    ),
    color: '#06B6D4'
  },
  python: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.91 0C5.7 0 6.09.27 6.09 3.51V5.7h6.05v.86H3.88C.7 6.56 0 8.52 0 11.96c0 3.43.6 5.4 3.88 5.4h2.21v-3.23c0-3.37 2.87-4.14 5.92-4.14h5.92V6.56c0-3.24-.62-6.56-6.02-6.56zm-3.28 1.8c.6 0 1.08.49 1.08 1.08 0 .6-.48 1.08-1.08 1.08a1.08 1.08 0 01-1.08-1.08c0-.59.48-1.08 1.08-1.08zm3.46 8.16v3.23c0 3.37-2.87 4.14-5.92 4.14H.25v3.43c0 3.24.62 6.56 6.02 6.56 6.21 0 5.82-.27 5.82-3.51v-2.19H6.04v-.86h8.26c3.18 0 3.88-1.96 3.88-5.4 0-3.43-.6-5.4-3.88-5.4h-2.21zm3.28 10.44c-.6 0-1.08-.49-1.08-1.08 0-.6.48-1.08 1.08-1.08.6 0 1.08.48 1.08 1.08 0 .59-.48 1.08-1.08 1.08z" fill="#3776AB"/>
      </svg>
    ),
    color: '#3776AB'
  },
  django: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.233 0v17.756h-2.84v-1.789c-.772 1.341-2.093 2.032-3.8 2.032-3.13 0-4.593-2.316-4.593-5.698 0-4.088 2.155-5.698 4.79-5.698 1.483 0 2.658.536 3.337 1.422V0h3.106zm-3.106 12.006c0-2.378-.927-3.41-2.472-3.41-1.545 0-2.41 1.062-2.41 3.41 0 2.224.865 3.379 2.41 3.379 1.545 0 2.472-1.093 2.472-3.379zM24 6.7v10.975c0 3.41-.958 4.904-3.46 4.904-.989 0-2.132-.247-2.873-.68l.68-2.286c.556.31 1.267.526 1.885.526 1.236 0 1.638-.711 1.638-2.504v-1.638c-.773 1.267-2.008 1.854-3.584 1.854-3.059 0-4.728-2.316-4.728-5.698 0-3.903 2.07-5.698 4.882-5.698 1.483 0 2.658.587 3.337 1.729V6.7H24zm-3.106 5.306c0-2.378-.896-3.41-2.441-3.41-1.576 0-2.441 1.062-2.441 3.41 0 2.224.865 3.379 2.441 3.379 1.545 0 2.441-1.093 2.441-3.379z" fill="#092E20"/>
      </svg>
    ),
    color: '#10B981'
  },
  fastapi: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.83 4.864l3.193 6.002h-3.43l1.83 8.27-6.096-7.794h3.692L12.83 4.864z" fill="#009688"/>
      </svg>
    ),
    color: '#009688'
  },
  go: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M1.81 9.475h3.606c.074-.537.23-.974.469-1.312a3.02 3.02 0 011.085-.923 4.3 4.3 0 011.758-.337c.71 0 1.341.135 1.895.405a3.11 3.11 0 011.3 1.155c.343.5.54 1.1.59 1.8h-4.945c.045.54.21.97.495 1.29.285.32.69.48 1.215.48.51 0 .915-.14 1.215-.42.3-.28.48-.68.54-1.2h3.36c-.12 1.35-.66 2.4-1.62 3.15-.96.75-2.22 1.125-3.78 1.125-1.11 0-2.078-.21-2.903-.63a4.7 4.7 0 01-1.957-1.785 5.56 5.56 0 01-.698-2.738c0-1.02.24-1.942.72-2.768a4.94 4.94 0 012.01-1.898c.86-.465 1.868-.697 3.023-.697 1.545 0 2.82.42 3.825 1.26 1.005.84 1.59 2.04 1.755 3.6h-.015zm13.14-5.325h3.69c.075.54.23.975.465 1.305.235.33.595.64 1.08.93.485.29 1.07.435 1.755.435.705 0 1.335-.14 1.89-.42a3.15 3.15 0 001.305-1.155c.345-.5.54-1.1.585-1.8h-4.95c.045.54.21.97.495 1.29.285.32.69.48 1.215.48.51 0 .915-.14 1.215-.42.3-.28.48-.68.54-1.2h3.36c-.12 1.35-.66 2.4-1.62 3.15-.96.75-2.22 1.125-3.78 1.125-1.11 0-2.078-.21-2.903-.63a4.7 4.7 0 01-1.957-1.785 5.56 5.56 0 01-.698-2.738c0-1.02.24-1.942.72-2.768a4.94 4.94 0 012.01-1.898c.86-.465 1.868-.697 3.023-.697 1.545 0 2.82.42 3.825 1.26 1.005.84 1.59 2.04 1.755 3.6h-.015z" fill="#00ADD8"/>
      </svg>
    ),
    color: '#00ADD8'
  },
  astro: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M8.358 20.162c-1.186-1.07-1.532-3.374-1.532-3.374s2.02.482 3.328-.15c1.307-.633 2.148-2.316 2.148-2.316s.79 1.637 2.043 2.316c1.253.68 3.303.15 3.303.15s-.351 2.304-1.538 3.374c-1.186 1.07-3.876 1.22-3.876 1.22s-2.69-.15-3.876-1.22zM12 0l-7.5 16.5h3.75L12 8.25l3.75 8.25h3.75L12 0z" fill="#FF5D01"/>
      </svg>
    ),
    color: '#FF5D01'
  },
  docker: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.185.185 0 00.186-.186V3.574a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.185.185 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m0 2.714h2.118a.186.186 0 00.186-.185V9.006a.185.185 0 00-.186-.186h-2.118a.185.185 0 00-.185.186v1.887c0 .102.082.185.185.185m-2.954 0h2.119a.186.186 0 00.185-.185V9.006a.185.185 0 00-.185-.186H8.075a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m0-2.714h2.119a.186.186 0 00.185-.186V6.29a.186.186 0 00-.185-.185H8.075a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m0-2.716h2.119a.186.186 0 00.185-.186V3.574a.186.186 0 00-.185-.185H8.075a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954 5.43h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.121a.185.185 0 00-.185.186v1.887c0 .102.083.185.185.185m0-2.714h2.119a.185.185 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.121a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186M.007 11.758a.18.18 0 00.08.15 12.3 12.3 0 006.13 1.7c3.9 0 7.42-1.39 10.31-3.79a5.1 5.1 0 001.62-.05c.67-.14 1.34-.44 1.83-.88.13-.12.03-.33-.14-.3-.72.13-1.45.03-2.12-.22a3.7 3.7 0 00-1.63-.3c-.09 0-.17.06-.2.15a5.58 5.58 0 01-1.3 2.1c-2.48 2.06-5.5 3.25-8.85 3.25A10.8 10.8 0 01.127 12.3c-.1-.03-.18.04-.12.13" fill="#2496ED"/>
      </svg>
    ),
    color: '#2496ED'
  },
  postgres: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M11.968 0C5.372 0 0 5.372 0 11.968c0 5.32 3.484 9.832 8.304 11.41.6.11.82-.26.82-.578 0-.285-.01-1.04-.015-2.04-3.393.737-4.11-1.636-4.11-1.636-.554-1.408-1.353-1.783-1.353-1.783-1.107-.757.084-.742.084-.742 1.225.086 1.87 1.258 1.87 1.258 1.088 1.864 2.855 1.325 3.55.101.11-.788.425-1.325.772-1.63-2.708-.308-5.552-1.354-5.552-6.024 0-2.61 1.01-4.536 2.61-4.536 1.6 0 2.61.026 2.61.026s.484 1.076.484 2.66c0 1.584-1.01 2.636-2.61 2.636-1.6 0-2.61-1.052-2.61-2.636 0-1.584 1.01-2.66 2.61-2.66z" fill="#336791"/>
      </svg>
    ),
    color: '#336791'
  },
  git: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.216 1.378-.07 1.888.44.516.516.657 1.258.43 1.906l2.67 2.67c.645-.226 1.388-.08 1.904.436.71.71.71 1.864 0 2.573-.71.71-1.865.71-2.574 0-.54-.54-.674-1.31-.403-1.974l-2.484-2.484v5.35c.162.084.316.2.44.324.71.71.71 1.864 0 2.574-.71.71-1.865.71-2.574 0-.71-.71-.71-1.864 0-2.574.14-.14.302-.25.474-.336V9.456c-.172-.086-.334-.196-.474-.336-.534-.534-.672-1.3-.404-1.96L6.035 4.31.454 9.89c-.605.605-.605 1.58 0 2.187l10.48 10.48c.604.604 1.58.604 2.186 0l10.426-10.43c.605-.603.605-1.58 0-2.198z" fill="#F05032"/>
      </svg>
    ),
    color: '#F05032'
  },
  linux: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
        <path d="M12.002 0c-3.34 0-6.046 2.707-6.046 6.047 0 1.767.763 3.356 1.973 4.457-1.782 1.34-2.973 3.473-2.973 5.882v.81c0 .445.361.804.805.804h12.482c.444 0 .805-.36.805-.805v-.81c0-2.409-1.19-4.542-2.973-5.882 1.21-1.101 1.973-2.69 1.973-4.457C18.048 2.707 15.342 0 12.002 0zm-2.015 5.234c.444 0 .805.36.805.805s-.36.805-.805.805-.805-.36-.805-.805.36-.805.805-.805zm4.03 0c.444 0 .805.36.805.805s-.361.805-.805.805-.805-.36-.805-.805.361-.805.805-.805z" fill="#FCC624"/>
      </svg>
    ),
    color: '#FCC624'
  }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit (Radius 90px — 4 core Web skills)
  { 
    id: 'html',
    orbitRadius: 90, 
    size: 34, 
    speed: 0.9, 
    iconType: 'html', 
    phaseShift: 0, 
    glowColor: 'amber',
    label: 'HTML5'
  },
  { 
    id: 'css',
    orbitRadius: 90, 
    size: 34, 
    speed: 0.9, 
    iconType: 'css', 
    phaseShift: Math.PI / 2, 
    glowColor: 'cyan',
    label: 'CSS3'
  },
  { 
    id: 'javascript',
    orbitRadius: 90, 
    size: 34, 
    speed: 0.9, 
    iconType: 'javascript', 
    phaseShift: Math.PI, 
    glowColor: 'amber',
    label: 'JavaScript'
  },
  { 
    id: 'typescript',
    orbitRadius: 90, 
    size: 36, 
    speed: 0.9, 
    iconType: 'typescript', 
    phaseShift: (3 * Math.PI) / 2, 
    glowColor: 'cyan',
    label: 'TypeScript'
  },

  // Middle Orbit (Radius 165px — 6 Frontend & Backend frameworks)
  { 
    id: 'react',
    orbitRadius: 165, 
    size: 42, 
    speed: -0.6, 
    iconType: 'react', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'React'
  },
  { 
    id: 'node',
    orbitRadius: 165, 
    size: 38, 
    speed: -0.6, 
    iconType: 'node', 
    phaseShift: Math.PI / 3, 
    glowColor: 'emerald',
    label: 'Node.js'
  },
  { 
    id: 'python',
    orbitRadius: 165, 
    size: 40, 
    speed: -0.6, 
    iconType: 'python', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'Python'
  },
  { 
    id: 'django',
    orbitRadius: 165, 
    size: 40, 
    speed: -0.6, 
    iconType: 'django', 
    phaseShift: Math.PI, 
    glowColor: 'emerald',
    label: 'Django'
  },
  { 
    id: 'tailwind',
    orbitRadius: 165, 
    size: 38, 
    speed: -0.6, 
    iconType: 'tailwind', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'cyan',
    label: 'Tailwind CSS'
  },
  { 
    id: 'astro',
    orbitRadius: 165, 
    size: 38, 
    speed: -0.6, 
    iconType: 'astro', 
    phaseShift: (5 * Math.PI) / 3, 
    glowColor: 'amber',
    label: 'Astro'
  },

  // Outer Orbit (Radius 240px — 6 Infra, Database & DevOps tools)
  { 
    id: 'docker',
    orbitRadius: 240, 
    size: 40, 
    speed: 0.45, 
    iconType: 'docker', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'Docker'
  },
  { 
    id: 'postgres',
    orbitRadius: 240, 
    size: 40, 
    speed: 0.45, 
    iconType: 'postgres', 
    phaseShift: Math.PI / 3, 
    glowColor: 'cyan',
    label: 'PostgreSQL'
  },
  { 
    id: 'fastapi',
    orbitRadius: 240, 
    size: 38, 
    speed: 0.45, 
    iconType: 'fastapi', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'emerald',
    label: 'FastAPI'
  },
  { 
    id: 'go',
    orbitRadius: 240, 
    size: 40, 
    speed: 0.45, 
    iconType: 'go', 
    phaseShift: Math.PI, 
    glowColor: 'cyan',
    label: 'Go / Golang'
  },
  { 
    id: 'git',
    orbitRadius: 240, 
    size: 38, 
    speed: 0.45, 
    iconType: 'git', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'amber',
    label: 'Git'
  },
  { 
    id: 'linux',
    orbitRadius: 240, 
    size: 38, 
    speed: 0.45, 
    iconType: 'linux', 
    phaseShift: (5 * Math.PI) / 3, 
    glowColor: 'amber',
    label: 'Linux'
  },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 30 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-gray-900/90 backdrop-blur-md
          border border-white/10 rounded-full flex items-center justify-center
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl border-white/30' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}60, 0 0 60px ${iconComponents[iconType]?.color}30`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900/95 border border-white/20 backdrop-blur-md rounded-md text-xs font-medium text-white whitespace-nowrap pointer-events-none shadow-xl">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors: Record<GlowColor, { primary: string; secondary: string; border: string }> = {
    cyan: {
      primary: 'rgba(6, 182, 212, 0.4)',
      secondary: 'rgba(6, 182, 212, 0.15)',
      border: 'rgba(6, 182, 212, 0.25)'
    },
    purple: {
      primary: 'rgba(147, 51, 234, 0.4)',
      secondary: 'rgba(147, 51, 234, 0.15)',
      border: 'rgba(147, 51, 234, 0.25)'
    },
    emerald: {
      primary: 'rgba(16, 185, 129, 0.4)',
      secondary: 'rgba(16, 185, 129, 0.15)',
      border: 'rgba(16, 185, 129, 0.25)'
    },
    amber: {
      primary: 'rgba(245, 158, 11, 0.4)',
      secondary: 'rgba(245, 158, 11, 0.15)',
      border: 'rgba(245, 158, 11, 0.25)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 35%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 50px ${colors.primary}, inset 0 0 40px ${colors.secondary}`,
          animation: 'pulse 5s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px dashed ${colors.border}`,
          boxShadow: `inset 0 0 15px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 90, glowColor: 'amber', delay: 0 },
    { radius: 165, glowColor: 'purple', delay: 1.2 },
    { radius: 240, glowColor: 'cyan', delay: 2.4 }
  ];

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-6 min-h-[540px]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #374151 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #4B5563 0%, transparent 50%)`,
          }}
        />
      </div>

      <div 
        className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[540px] md:h-[540px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central "Code / Tech Lead" Icon with enhanced glow */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-800 to-gray-950 border border-white/20 rounded-full flex items-center justify-center z-20 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#central-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <defs>
                <linearGradient id="central-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="50%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#9333EA" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </div>
  );
}
