"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";

const SLIDE_DURATION = 1800;
const TRANSITION_MS = 480;

interface FlashcardImageProps {
  images: string[];
  isHovered: boolean;
  isActive: boolean;
  isDark: boolean;
  theme: { border: string; scanline: string };
  alt: string;
}

/** Fisher-Yates shuffle — returns new randomised array */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashcardImage({
  images,
  isHovered,
  isActive,
  isDark,
  theme,
  alt,
}: FlashcardImageProps) {
  // Randomised order — stable for the lifetime of this mount
  const shuffled = useMemo(() => shuffle(images), [images]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1 % shuffled.length);
  const [sliding, setSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");

  // Stack stays visible always — just animate differently on hover
  const [stackVisible, setStackVisible] = useState(true);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = shuffled.length;

  // Advance carousel while hovered
  useEffect(() => {
    if (!isHovered) return;

    timerRef.current = setTimeout(() => {
      // Pick random next index that is different from current
      let randomNext: number;
      do {
        randomNext = Math.floor(Math.random() * total);
      } while (randomNext === currentIdx && total > 1);

      // Randomly decide slide direction for variety
      const dir = Math.random() > 0.5 ? "left" : "right";
      setSlideDir(dir);
      setNextIdx(randomNext);
      setStackVisible(false); // briefly hide stack during slide

      setSliding(true);
      setTimeout(() => {
        setCurrentIdx(randomNext);
        setSliding(false);
        setStackVisible(true); // restore stack after slide settles
      }, TRANSITION_MS);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isHovered, currentIdx, total]);

  // Reset on mouse-leave
  useEffect(() => {
    if (!isHovered) {
      const t = setTimeout(() => {
        setCurrentIdx(0);
        setStackVisible(true);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isHovered]);

  // Slide-out transform for current image
  const currentOut = sliding
    ? slideDir === "left"
      ? "translateX(-105%)"
      : "translateX(105%)"
    : "translateX(0%)";

  // Slide-in transform for next image
  const nextIn = sliding
    ? "translateX(0%)"
    : slideDir === "left"
      ? "translateX(105%)"
      : "translateX(-105%)";

  // Background stack cards (indices offset from current)
  const stackOffsets = [
    { imgOffset: 2, rotate: 2.8, top: -7, hPad: 10, opacity: 0.25, zIndex: 0 },
    { imgOffset: 1, rotate: -1.6, top: -4, hPad: 5, opacity: 0.35, zIndex: 1 },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4/3",
        marginBottom: 16,
      }}
    >
      {/* ── Stacked background cards ── */}
      {stackOffsets.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: s.top,
            left: s.hPad,
            right: s.hPad,
            bottom: 0,
            border: `1px solid ${theme.border}`,
            background: isDark ? "#0a0a0a" : "#E0DAD0",
            transform: isHovered
              ? // flatten toward main card while hovered but keep visible
                `rotate(${s.rotate * 0.3}deg) translateY(${-s.top * 0.3}px)`
              : `rotate(${s.rotate}deg)`,
            zIndex: s.zIndex,
            overflow: "hidden",
            transition: `transform 0.4s ease, opacity 0.3s ease`,
            opacity: stackVisible
              ? isHovered
                ? s.opacity * 0.6
                : s.opacity * 1.4
              : 0,
            pointerEvents: "none",
          }}
        >
          <Image
            src={shuffled[(currentIdx + s.imgOffset) % total]}
            alt=""
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              opacity: 0.5,
              filter: "grayscale(70%)",
            }}
          />
        </div>
      ))}

      {/* ── Main card ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          border: `1px solid ${isHovered || isActive ? "var(--accent-color)" : theme.border}`,
          overflow: "hidden",
          zIndex: 2,
          background: isDark ? "#080808" : "#f0ece4",
          transition: "border-color 0.3s ease",
          // subtle lift on hover
          transform: isHovered
            ? "scale(1.015) translateY(-2px)"
            : "scale(1) translateY(0px)",
        }}
      >
        {/* Current image — slides out */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: currentOut,
            transition: sliding
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`
              : "none",
            zIndex: 2,
          }}
        >
          <Image
            src={shuffled[currentIdx]}
            alt={alt}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              filter:
                isHovered || isActive
                  ? "brightness(0.88) contrast(1.08)"
                  : isDark
                    ? "grayscale(35%) brightness(0.65)"
                    : "grayscale(20%) brightness(0.82)",
              transition: "filter 0.6s ease",
            }}
          />
        </div>

        {/* Next image — slides in */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: nextIn,
            transition: sliding
              ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`
              : "none",
            zIndex: 1,
          }}
        >
          <Image
            src={shuffled[nextIdx]}
            alt={alt}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              filter: "brightness(0.88) contrast(1.08)",
            }}
          />
        </div>

        {/* Scanline */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${theme.scanline} 2px, ${theme.scanline} 4px)`,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* Progress bar */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 2,
              background: "var(--accent-color)",
              zIndex: 4,
              animation: `imgProgress ${SLIDE_DURATION}ms linear`,
              boxShadow: "0 0 6px var(--accent-color)",
            }}
            key={`prog-${currentIdx}`}
          />
        )}

        {/* Counter */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            fontSize: 9,
            color: "var(--accent-color)",
            background: isDark ? "rgba(0,0,0,0.72)" : "rgba(245,240,232,0.88)",
            border: "1px solid var(--accent-color)",
            padding: "1px 6px",
            letterSpacing: "0.08em",
            zIndex: 4,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s",
            fontFamily: "monospace",
          }}
        >
          {String(currentIdx + 1).padStart(2, "0")}/
          {String(total).padStart(2, "0")}
        </div>
      </div>

      <style>{`
        @keyframes imgProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
