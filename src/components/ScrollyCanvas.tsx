"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";

const FRAME_COUNT = 120;

function DesktopCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const drawFrame = (index: number) => {
    if (!canvasRef.current || imagesRef.current.length === 0) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    const img = imagesRef.current[index];
    if (img && img.complete) {
      const canvas = canvasRef.current;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const zoomFactor = 1.15;
      const ratio = Math.max(hRatio, vRatio) * zoomFactor;
      const cx = (canvas.width - img.width * ratio) / 2;
      const cy = (canvas.height - img.height * ratio) / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let idx = Math.floor(latest * (FRAME_COUNT - 1));
    idx = Math.max(0, Math.min(idx, FRAME_COUNT - 1));
    drawFrame(idx);
  });

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = `/sequence/frame_${i.toString().padStart(3, "0")}_delay-0.066s.png`;
      if (i === 0) {
        img.onload = () => {
          if (canvasRef.current && canvasRef.current.width === 0) {
            canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
            canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
          }
          requestAnimationFrame(() => drawFrame(0));
        };
      }
      imgs.push(img);
    }
    imagesRef.current = imgs;

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
      canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
      canvasRef.current.style.width = window.innerWidth + "px";
      canvasRef.current.style.height = window.innerHeight + "px";
      const idx = Math.max(0, Math.min(
        Math.floor(scrollYProgress.get() * (FRAME_COUNT - 1)),
        FRAME_COUNT - 1
      ));
      requestAnimationFrame(() => drawFrame(idx));
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300vh] bg-[#121212]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}

function MobileBackground() {
  return (
    // On mobile: one tall sticky block matching the 300vh scroll distance.
    // A single crisp frame is used as the background — no JS animation, zero jank.
    <div className="relative w-full h-[300vh] bg-[#121212]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="/sequence/frame_060_delay-0.066s.png"
            alt="Background"
            fill
            priority
            className="object-cover object-center scale-110"
            quality={85}
          />
          {/* Subtle dark overlay to keep text legible */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
    </div>
  );
}

export default function ScrollyCanvas() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Check once on mount — avoids SSR mismatch
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Avoid flash of wrong content during SSR hydration
  if (isMobile === null) {
    return <div className="relative w-full h-[300vh] bg-[#121212]" />;
  }

  return isMobile ? <MobileBackground /> : <DesktopCanvas />;
}
