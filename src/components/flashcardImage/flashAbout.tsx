"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SLIDE_DURATION = 5000;
const TRANSITION_MS = 1200;

interface FlashAboutProps {
  images: { src: string; caption?: string }[];
  isDark: boolean;
  theme: { border: string; scanline: string };
  alt: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function FlashAbout({
  images,
  isDark,
  theme,
  alt,
}: FlashAboutProps) {
  const total = images.length;

  // ── Queue ref — mutated imperatively, never read during render ──────────
  const queueRef = useRef<number[]>([]);

  /**
   * Pop next index guaranteed != excludeCurrent.
   * Refills via a fresh shuffle when empty.
   */
  const popNext = (excludeCurrent: number): number => {
    const refill = () => {
      queueRef.current = shuffle(
        [...Array(total).keys()].filter((i) => i !== excludeCurrent),
      );
    };

    if (queueRef.current.length === 0) refill();

    let next = queueRef.current.shift()!;

    // Safety: if somehow same (e.g. total === 1 edge case), swap or refill
    if (next === excludeCurrent) {
      if (queueRef.current.length === 0) refill();
      const swap = queueRef.current.shift()!;
      queueRef.current.unshift(next);
      next = swap;
    }

    return next;
  };
  // ─────────────────────────────────────────────────────────────────────────

  // Seed queue on mount / images change
  useEffect(() => {
    queueRef.current = shuffle([...Array(total).keys()].filter((i) => i !== 0));
  }, [images, total]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Display state ─────────────────────────────────────────────────────────
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(total > 1 ? 1 : 0);
  const [phase, setPhase] = useState<"idle" | "transitioning">("idle");

  // timerRef      — outer delay before transition begins
  // transitionRef — inner animation (slides the image), must also be cancellable
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearAllTimers = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (transitionRef.current) {
      clearTimeout(transitionRef.current);
      transitionRef.current = null;
    }
  };

  // ── Auto-advance cycle ────────────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      const next = popNext(currentIdx);

      // Stage next image before transition starts so it's ready beneath
      setNextIdx(next);
      setPhase("transitioning");

      // ✅ Inner timeout stored in ref — cancellable on unmount
      transitionRef.current = setTimeout(() => {
        setCurrentIdx(next);
        setPhase("idle");
      }, TRANSITION_MS);
    }, SLIDE_DURATION);

    return () => {
      // Only cancel outer timer here — inner is cleaned up on unmount below
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => clearAllTimers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const isTransitioning = phase === "transitioning";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: isDark ? "#080808" : "#f0ece4",
      }}
    >
      {/* Next image — slides up from below */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          transform: isTransitioning ? "translateY(0%)" : "translateY(100%)",
          transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "-8%",
            animation: `kenBurns ${SLIDE_DURATION + TRANSITION_MS}ms ease-in-out forwards`,
          }}
        >
          <Image
            src={images[nextIdx].src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              filter: isDark
                ? "brightness(0.82) contrast(1.06)"
                : "brightness(0.93)",
            }}
          />
        </div>
      </div>

      {/* Current image — slides up and out */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          transform: isTransitioning ? "translateY(-100%)" : "translateY(0%)",
          transition: `transform ${TRANSITION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`,
          overflow: "hidden",
        }}
      >
        {/* Ken Burns — restarts per image via key */}
        <div
          key={currentIdx}
          style={{
            position: "absolute",
            inset: "-8%",
            animation: `kenBurns ${SLIDE_DURATION}ms ease-in-out forwards`,
          }}
        >
          <Image
            src={images[currentIdx].src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
              filter: isDark
                ? "brightness(0.82) contrast(1.06)"
                : "brightness(0.93)",
            }}
            priority
          />
        </div>

        {/* Film grain scanline */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${theme.scanline} 2px, ${theme.scanline} 4px)`,
            pointerEvents: "none",
            zIndex: 3,
          }}
        />

        {/* Film strip — left edge */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 16,
            background: isDark ? "rgba(0,0,0,0.7)" : "rgba(245,240,232,0.7)",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 8,
                border: `1px solid ${theme.border}`,
                background: isDark ? "#000" : "#E8E3D8",
                borderRadius: 1,
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* Film strip — right edge */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 16,
            background: isDark ? "rgba(0,0,0,0.7)" : "rgba(245,240,232,0.7)",
            zIndex: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 8,
                border: `1px solid ${theme.border}`,
                background: isDark ? "#000" : "#E8E3D8",
                borderRadius: 1,
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Caption — fades with transition */}
      {images[currentIdx].caption && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 24,
            right: 24,
            zIndex: 10,
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(8px)" : "translateY(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            background: isDark ? "rgba(0,0,0,0.65)" : "rgba(245,240,232,0.85)",
            padding: "8px 12px",
            backdropFilter: "blur(8px)",
            borderLeft: "2px solid var(--accent-color)",
          }}
        >
          <div
            style={{
              fontSize: 9,
              color: "var(--accent-color)",
              letterSpacing: "0.12em",
              marginBottom: 3,
            }}
          >
            // location_log
          </div>
          <div
            style={{
              fontSize: 11,
              color: isDark ? "#C8C8C8" : "#1A1A1A",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.02em",
            }}
          >
            {images[currentIdx].caption}
          </div>
        </div>
      )}

      {/* Frame counter */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 24,
          zIndex: 10,
          fontSize: 9,
          color: "var(--accent-color)",
          fontFamily: "monospace",
          letterSpacing: "0.1em",
          background: isDark ? "rgba(0,0,0,0.6)" : "rgba(245,240,232,0.8)",
          padding: "2px 7px",
          border: "1px solid var(--accent-color)",
        }}
      >
        {String(currentIdx + 1).padStart(2, "0")}/
        {String(total).padStart(2, "0")}
      </div>

      {/* Progress bar */}
      <div
        key={`prog-${currentIdx}`}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          background: "var(--accent-color)",
          zIndex: 10,
          boxShadow: "0 0 8px var(--accent-color)",
          animation: `filmProgress ${SLIDE_DURATION}ms linear`,
        }}
      />

      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.00) translate(0%,    0%); }
          33%  { transform: scale(1.04) translate(-0.5%, -0.3%); }
          66%  { transform: scale(1.06) translate(0.3%,  -0.6%); }
          100% { transform: scale(1.08) translate(-0.2%, -0.8%); }
        }
        @keyframes filmProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
