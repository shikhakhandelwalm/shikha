"use client";

import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 120; // 0 to 119

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
    if (frameIndex < 0) frameIndex = 0;
    if (frameIndex >= FRAME_COUNT) frameIndex = FRAME_COUNT - 1;
    drawFrame(frameIndex);
  });

  useEffect(() => {
    // Check if we are in browser
    if (typeof window === "undefined") return;

    // Load images quickly 
    const loadedImgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameNum = i.toString().padStart(3, "0");
        img.src = `/sequence/frame_${frameNum}_delay-0.066s.png`;
        
        // If it's the very first image, force an immediate render the millisecond it loads to prevent black flash
        if (i === 0) {
            img.onload = () => {
              // Ensure canvas sizing is correct just in case resize hasn't fired yet
              if (canvasRef.current && canvasRef.current.width === 0) {
                 canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
                 canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
              }
              // Force draw frame 0
              requestAnimationFrame(() => drawFrame(0));
            };
        }
        loadedImgs.push(img);
    }
    imagesRef.current = loadedImgs;

    // Handle high DPI resizing
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        canvasRef.current.style.width = window.innerWidth + 'px';
        canvasRef.current.style.height = window.innerHeight + 'px';
        
        // Redraw current frame
        let frameIndex = Math.floor(scrollYProgress.get() * (FRAME_COUNT - 1));
        if (frameIndex < 0) frameIndex = 0;
        requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    // Initial size setup
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#121212]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
}
