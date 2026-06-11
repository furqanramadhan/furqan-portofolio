"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SLIDE_DURATION = 4500;
const FADE_MS = 700;

const TINTS = [
  "rgba(23, 147, 209, 0.12)",
  "rgba(180, 130, 60,  0.10)",
  "rgba(40,  160, 120, 0.10)",
  "rgba(160, 60,  180, 0.09)",
  "rgba(200, 80,  60,  0.08)",
];

interface FlashViewProps {
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

export default function FlashView({
  images,
  isDark,
  theme,
  alt,
}: FlashViewProps) {
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
  const [fading, setFading] = useState(false);
  const [tintIdx, setTintIdx] = useState(0);

  // timerRef      — outer delay before fade begins
  // transitionRef — inner fade duration, must be cancellable
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
      const nextTint = (tintIdx + 1) % TINTS.length;

      // Stage next image before fade so it's preloaded beneath
      setNextIdx(next);
      setFading(true);

      // ✅ Inner timeout stored in ref — cancellable on unmount
      transitionRef.current = setTimeout(() => {
        setCurrentIdx(next);
        setTintIdx(nextTint);
        setFading(false);
      }, FADE_MS);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [currentIdx, tintIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => clearAllTimers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      {/* Current image — fades out */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: fading ? 0 : 1,
          transition: `opacity ${FADE_MS}ms ease-in-out`,
          zIndex: 2,
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
              : "brightness(0.93) contrast(1.02)",
          }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: TINTS[tintIdx],
            mixBlendMode: "screen",
            pointerEvents: "none",
            opacity: fading ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
          }}
        />
      </div>

      {/* Next image — fades in */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: fading ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease-in-out`,
          zIndex: 1,
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
              : "brightness(0.93) contrast(1.02)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: TINTS[(tintIdx + 1) % TINTS.length],
            mixBlendMode: "screen",
            pointerEvents: "none",
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

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />

      {/* Mood label */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          zIndex: 5,
          fontSize: 9,
          color: "var(--accent-color)",
          fontFamily: "monospace",
          letterSpacing: "0.1em",
          opacity: 0.7,
          transition: `opacity ${FADE_MS}ms ease`,
        }}
      >
        {`// mood_${tintIdx + 1}`}
      </div>

      {/* Counter */}
      <div
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          zIndex: 5,
          fontSize: 9,
          color: "var(--accent-color)",
          fontFamily: "monospace",
          letterSpacing: "0.1em",
          background: isDark ? "rgba(0,0,0,0.55)" : "rgba(245,240,232,0.75)",
          padding: "2px 6px",
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
          zIndex: 5,
          boxShadow: "0 0 6px var(--accent-color)",
          animation: `viewProgress ${SLIDE_DURATION}ms linear`,
        }}
      />

      {/* Caption */}
      {images[currentIdx].caption && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 16,
            right: 16,
            zIndex: 5,
            opacity: fading ? 0 : 1,
            transition: `opacity ${FADE_MS}ms ease`,
            background: isDark ? "rgba(0,0,0,0.6)" : "rgba(245,240,232,0.82)",
            padding: "7px 12px",
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

      <style>{`
        @keyframes viewProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}
