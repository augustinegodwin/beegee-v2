"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

export default function BinghamMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // EXACT SIZES YOU REQUESTED
  const cardWidth = 100;  // 65px width
  const cardHeight = 120; // 70px height
  const gap = 20;        // 20px space between cards
  const totalCards = 30; // More cards needed since they are smaller
  const duration = 20;   // Speed of the flow

  useLayoutEffect(() => {
    gsap.registerPlugin(MotionPathPlugin);

    const cards = gsap.utils.toArray(".marquee-card");
    const path = ".svg-path";

    if (!cards.length) return;

    // 1. Initial State: Center them and hide them
    gsap.set(cards, { 
      opacity: 0, 
      xPercent: -50, 
      yPercent: -50,
      width: cardWidth,
      height: cardHeight
    });

    const tl = gsap.timeline();

    // 2. The Main Motion Path Animation
    tl.to(cards, {
      motionPath: {
        path: path,
        align: path,
        autoRotate: false,
        alignOrigin: [0.5, 0.5],
      },
      duration: duration,
      ease: "none",
      repeat: -1,
      stagger: {
        // MATH: (65px card + 20px gap) / 1440px path * duration
        each: ((cardWidth + gap) / 1440) * duration,
        repeat: -1,
      },
      // 3. ENTRANCE & EXIT ANIMATION (The "Smooth" part)
      onUpdate: function() {
        // This makes cards fade in at the start and fade out at the end
        cards.forEach((card: any) => {
          const xPos = gsap.getProperty(card, "x") as number;
          
          if (xPos < 100) { 
            // Entrance: Fade in over the first 100px
            gsap.set(card, { opacity: xPos / 100 });
          } else if (xPos > 1340) { 
            // Exit: Fade out over the last 100px
            gsap.set(card, { opacity: (1440 - xPos) / 100 });
          } else {
            // Middle: Fully visible
            gsap.set(card, { opacity: 1 });
          }
        });
      }
    });

    tl.seek(100); // Start with the screen full

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <section className="w-full  py-20 overflow-hidden flex justify-center">
      {/* 1440px Fixed Track */}
      <div 
        ref={containerRef} 
        className="relative w-full max-w-[1440px] h-[200px] flex items-center"
      >
        
        {/* The Wave Track */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none opacity-0" 
          viewBox="0 0 2000 100" 
          preserveAspectRatio="none"
        >
          <path 
            className="svg-path" 
            fill="none"
            d="M0,50 C200,100 400,0 720,50 C1040,100 1240,0 2000,50" 
          />
        </svg>

        {/* Pure Cards - No Content, Just Style */}
        {Array.from({ length: totalCards }).map((_, i) => (
          <div 
            key={i} 
            className="marquee-card w-16.5 h-17.5 absolute bg-gray-200 backdrop-blur-md border border-white/30 rounded-2xl"
          >
           
          </div>
        ))}
        
      </div>
    </section>
    
    </>
  );
} 