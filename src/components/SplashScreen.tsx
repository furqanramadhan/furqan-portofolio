"use client";
import { use, useEffect, useState } from "react";
import Image from "next/image";

interface SplashSceenProps {
  onFinish?: () => void;
  onFadeStart?: () => void;
}

export default function SplashScreen({
  onFinish,
  onFadeStart,
}: SplashSceenProps) {
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      if (onFadeStart) onFadeStart();
    }, 2200);

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish, onFadeStart]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-[#0D0D0D] flex flex-col justify-center items-center z-[99999] 
      transition-opacity duration-1000 ease-in-out font-mono
      ${isFading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
    >
      {/* Visual Terminal Element */}
      <div className="relative mb-8">
        <div className="w-20 h-20 relative animate-pulse">
          <Image
            src="/assets/image/icons-arch-linux.png"
            alt="System Logo"
            fill
            className="object-contain grayscale contrast-125"
            priority
          />
        </div>
        {/* Decorative brackets */}
        <div className="absolute -inset-4 border-l border-t border-[#1793d1]/30 w-6 h-6"></div>
        <div className="absolute -inset-4 border-r border-b border-[#1793d1]/30 w-6 h-6 left-auto top-auto"></div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="text-2xl font-bold text-white tracking-widest uppercase">
          FURQAN<span className="text-[#1793d1]">.DEV</span>
        </div>

        {/* Loading Progress bar style */}
        <div className="w-48 h-[2px] bg-white/5 mt-4 overflow-hidden relative">
          <div className="absolute inset-0 bg-[#1793d1] origin-left animate-[loading_2s_ease-in-out_infinite]"></div>
        </div>

        <div className="text-[10px] text-gray-500 mt-4 tracking-[0.2em] uppercase">
          Initializing System v2.0.1
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(0.5);
          }
          100% {
            transform: scaleX(1);
          }
        }
      `}</style>
    </div>
  );
}
