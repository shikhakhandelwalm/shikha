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

  // Preload images
  useEffect(() => {
    let loadedImgs: HTMLImageElement[] = [];
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      // Format number to 3 digits (e.g., 000, 001)
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${frameNum}_delay-0.066s.png`;
      loadedImgs.push(img);
    }
    setImages(loadedImgs);
  }, []);

  // Update canvas on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!canvasRef.current || images.length === 0) return;
    
    // Calculate current frame index based on scroll progress
    let frameIndex = Math.floor(latest * (FRAME_COUNT - 1));
    if (frameIndex < 0) frameIndex = 0;
    if (frameIndex >= FRAME_COUNT) frameIndex = FRAME_COUNT - 1;
    
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    const img = images[frameIndex];
    
    if (img && img.complete) {
      // object-fit: cover logic mapped with a zoom factor to hide watermark
      const canvas = canvasRef.current;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      
      // Multiply by 1.15 to slightly scale up and crop the 'Veo' watermark at the edges
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
  });

  // Handle Resize and initial draw
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && images.length > 0) {
        // High DPI canvas trick: match physical pixels, do NOT scale the context, drawing uses physical pixels.
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        // Keep CSS same as window
        canvasRef.current.style.width = window.innerWidth + 'px';
        canvasRef.current.style.height = window.innerHeight + 'px';
        
        // Force a re-draw for the current scroll position
        window.dispatchEvent(new Event('scroll'));
      }
    };
    
    window.addEventListener("resize", handleResize);
    // Timeout to allow initial layout pass before setting the width/height sizes
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
