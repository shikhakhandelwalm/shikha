"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120; // 0 to 119

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Shared draw function
  const drawFrame = (imgs: HTMLImageElement[], frameIndex: number) => {
    if (!canvasRef.current) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    const img = imgs[frameIndex];
    if (img && img.complete) {
      const canvas = canvasRef.current;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const zoomFactor = 1.15;
      const ratio = Math.max(hRatio, vRatio) * zoomFactor;
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  };

  // Preload images
  useEffect(() => {
    const loadedImgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.066s.png`;

      // FIX #1: Draw frame 0 immediately on load so background is visible without scrolling
      if (i === 0) {
        img.onload = () => {
          if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
            canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
            canvasRef.current.style.width = window.innerWidth + 'px';
            canvasRef.current.style.height = window.innerHeight + 'px';
            drawFrame(loadedImgs, 0);
          }
        };
      }

      loadedImgs.push(img);
    }
    setImages(loadedImgs);
  }, []);

  // Update canvas on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!canvasRef.current || images.length === 0) return;
    let frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
    if (frameIndex < 0) frameIndex = 0;
    if (frameIndex >= FRAME_COUNT) frameIndex = FRAME_COUNT - 1;
    drawFrame(images, frameIndex);
  });

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && images.length > 0) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        canvasRef.current.style.width = window.innerWidth + 'px';
        canvasRef.current.style.height = window.innerHeight + 'px';
        window.dispatchEvent(new Event('scroll'));
      }
    };
    
    window.addEventListener("resize", handleResize);
    requestAnimationFrame(handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#121212]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
