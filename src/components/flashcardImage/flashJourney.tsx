"use client";
import { useState, useEffect, useRef } from "react";
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
  const total = images.length;

  // ── Queue ref — mutated imperatively, never read during render ──────────
  const queueRef = useRef<number[]>([]);

  /**
   * Pop the next index from the queue, guaranteed != excludeCurrent.
   * Refills via a fresh shuffle when empty.
   * Returns a tuple: [nextIndex, snapshot of next two queue items for stack]
   */
  const popNext = (excludeCurrent: number): [number, [number, number]] => {
    const refill = () => {
      let batch = shuffle(
        [...Array(total).keys()].filter((i) => i !== excludeCurrent),
      );
      // Extra guard: ensure first item of new batch != excludeCurrent (already filtered, but be safe)
      queueRef.current = batch;
    };

    if (queueRef.current.length === 0) refill();

    // Pop
    let next = queueRef.current.shift()!;

    // Safety: if somehow same, swap with next in line or refill
    if (next === excludeCurrent) {
      if (queueRef.current.length === 0) refill();
      const swap = queueRef.current.shift()!;
      queueRef.current.unshift(next);
      next = swap;
    }

    // Snapshot stack indices from queue AFTER popping `next`
    // These will become the new stack display, synced in the same setState batch
    const s0 = queueRef.current[0] ?? (next + 1) % total;
    const s1 = queueRef.current[1] ?? (next + 2) % total;

    return [next, [s0, s1]];
  };
  // ─────────────────────────────────────────────────────────────────────────

  // ── All display state in one place ───────────────────────────────────────
  const [currentIdx, setCurrentIdx] = useState(0);
  const [nextIdx, setNextIdx] = useState(1 % total);
  const [stackIdxs, setStackIdxs] = useState<[number, number]>([
    1 % total,
    2 % total,
  ]);
  const [sliding, setSliding] = useState(false);
  const [slideDir, setSlideDir] = useState<"left" | "right">("left");
  const [stackVisible, setStackVisible] = useState(true);

  // timerRef    — outer delay before a slide begins
  // transitionRef — inner animation duration (slides the image)
  // Both must be cancelled on leave to prevent stale state updates
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

  // Seed queue on mount
  useEffect(() => {
    queueRef.current = shuffle([...Array(total).keys()].filter((i) => i !== 0));
  }, [images]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Slide cycle — fires when hovered, resets on currentIdx change ────────
  useEffect(() => {
    if (!isHovered) return;

    timerRef.current = setTimeout(() => {
      const dir = Math.random() > 0.5 ? "left" : "right";
      const [randomNext, newStackIdxs] = popNext(currentIdx);

      setSlideDir(dir);
      setNextIdx(randomNext);
      setStackVisible(false);
      setSliding(true);

      // ✅ Stored in ref so it can be cancelled if user leaves mid-transition
      transitionRef.current = setTimeout(() => {
        setCurrentIdx(randomNext);
        setStackIdxs(newStackIdxs);
        setSliding(false);
        setStackVisible(true);
      }, TRANSITION_MS);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isHovered, currentIdx]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Reset to first image on mouse leave ──────────────────────────────────
  useEffect(() => {
    if (isHovered) return;

    // Cancel both timers immediately — no stale update can fire after this
    clearAllTimers();

    const t = setTimeout(() => {
      const fresh = shuffle([...Array(total).keys()].filter((i) => i !== 0));
      queueRef.current = fresh;

      // ✅ nextIdx reset alongside currentIdx — no stale frame on next hover
      setCurrentIdx(0);
      setNextIdx(fresh[0] ?? 1 % total);
      setStackIdxs([fresh[0] ?? 1 % total, fresh[1] ?? 2 % total]);
      setSliding(false);
      setStackVisible(true);
    }, 200);

    return () => clearTimeout(t);
  }, [isHovered]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Slide transform helpers ───────────────────────────────────────────────
  const currentOut = sliding
    ? slideDir === "left"
      ? "translateX(-105%)"
      : "translateX(105%)"
    : "translateX(0%)";

  const nextIn = sliding
    ? "translateX(0%)"
    : slideDir === "left"
      ? "translateX(105%)"
      : "translateX(-105%)";

  // ── Stack visual config (purely presentational) ───────────────────────────
  const stackConfig = [
    { rotate: 2.8, top: -7, hPad: 10, opacity: 0.25, zIndex: 0 },
    { rotate: -1.6, top: -4, hPad: 5, opacity: 0.35, zIndex: 1 },
  ] as const;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "4/3",
        marginBottom: 16,
      }}
    >
      {/* ── Stack cards — uses stackIdxs state, NOT queueRef ── */}
      {stackConfig.map((s, i) => (
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
              ? `rotate(${s.rotate * 0.3}deg) translateY(${-s.top * 0.3}px)`
              : `rotate(${s.rotate}deg)`,
            zIndex: s.zIndex,
            overflow: "hidden",
            transition: "transform 0.4s ease, opacity 0.3s ease",
            opacity: stackVisible
              ? isHovered
                ? s.opacity * 0.6
                : s.opacity * 1.4
              : 0,
            pointerEvents: "none",
          }}
        >
          <Image
            src={images[stackIdxs[i]]}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            style={{
              objectFit: "cover",
              objectPosition: "center",
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
            src={images[currentIdx]}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            style={{
              objectFit: "cover",
              objectPosition: "center",
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
            src={images[nextIdx]}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 280px"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              filter: "brightness(0.88) contrast(1.08)",
            }}
          />
        </div>

        {/* Scanline overlay */}
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
            key={`prog-${currentIdx}`}
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
          />
        )}

        {/* Counter badge */}
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
