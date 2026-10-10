"use client";

import { useEffect } from "react";
// Using relative path to resolve import-analysis error
import { Component } from "../components/ui/experience-hero";
import Lenis from "lenis";

export default function DemoOne() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="dark min-h-screen bg-[#020202] selection:bg-white selection:text-black">
      <main className="relative w-full overflow-x-hidden">
        <Component isFixed />
        <div className="bento-mask pointer-events-none fixed inset-0 z-[100] opacity-10" />
      </main>
    </div>
  );
}
