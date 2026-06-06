"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onFinish?: () => void;
  onFadeStart?: () => void;
}

const accent = "#1793d1";

export default function SplashScreen({
  onFinish,
  onFadeStart,
}: SplashScreenProps) {
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);
  const [statusText, setStatusText] = useState("INITIALIZING...");

  const statusSteps = [
    { at: 0, text: "INITIALIZING..." },
    { at: 30, text: "LOADING MODULES..." },
    { at: 60, text: "MOUNTING FILESYSTEM..." },
    { at: 85, text: "STARTING SERVICES..." },
    { at: 98, text: "READY." },
  ];

  useEffect(() => {
    // Progress ticker — runs 0→100 over ~2000ms
    let current = 0;
    const ticker = setInterval(() => {
      current += 1;
      setProgress(current);

      // Update status text at checkpoints
      const step = [...statusSteps].reverse().find((s) => current >= s.at);
      if (step) setStatusText(step.text);

      if (current >= 100) clearInterval(ticker);
    }, 20);

    // Glitch trigger at ~90%
    const glitchTimer = setTimeout(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 400);
    }, 1900);

    // Fade start
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      if (onFadeStart) onFadeStart();
    }, 2400);

    // Remove
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 3400);

    return () => {
      clearInterval(ticker);
      clearTimeout(glitchTimer);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  // SVG circle params
  const size = 96;
  const strokeWidth = 2;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#0D0D0D",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        opacity: isFading ? 0 : 1,
        pointerEvents: isFading ? "none" : "auto",
        transition: "opacity 1s ease-in-out",
      }}
    >
      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* Corner brackets */}
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          width: 32,
          height: 32,
          borderTop: `1px solid ${accent}40`,
          borderLeft: `1px solid ${accent}40`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 32,
          right: 32,
          width: 32,
          height: 32,
          borderTop: `1px solid ${accent}40`,
          borderRight: `1px solid ${accent}40`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 32,
          width: 32,
          height: 32,
          borderBottom: `1px solid ${accent}40`,
          borderLeft: `1px solid ${accent}40`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 32,
          right: 32,
          width: 32,
          height: 32,
          borderBottom: `1px solid ${accent}40`,
          borderRight: `1px solid ${accent}40`,
        }}
      />

      {/* Icon + Circle loader */}
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          marginBottom: 32,
        }}
      >
        {/* SVG circular progress */}
        <svg
          width={size}
          height={size}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: "rotate(-90deg)",
          }}
        >
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`${accent}20`}
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={accent}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: "stroke-dashoffset 0.05s linear",
              filter: `drop-shadow(0 0 4px ${accent})`,
            }}
          />
        </svg>

        {/* Percentage tick inside circle */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Icon */}
          <div
            style={{
              position: "relative",
              width: 52,
              height: 52,
              filter: isGlitching
                ? "grayscale(0%) contrast(150%) brightness(1.4) drop-shadow(0 0 8px #1793d1)"
                : "grayscale(100%) contrast(125%)",
              transition: isGlitching ? "none" : "filter 0.3s ease",
              animation: isGlitching
                ? "glitchShake 0.1s ease infinite"
                : "none",
            }}
          >
            <Image
              src="/assets/image/icons-arch-linux.png"
              alt="System Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        {/* Glitch duplicate layer */}
        {isGlitching && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mixBlendMode: "screen",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 52,
                height: 52,
                filter: "hue-rotate(180deg) contrast(200%)",
                opacity: 0.6,
                transform: "translate(3px, -2px)",
              }}
            >
              <Image
                src="/assets/image/icons-arch-linux.png"
                alt=""
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Name + status */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        {/* Name — glitch effect */}
        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: isGlitching ? "#fff" : "#C8C8C8",
            textTransform: "uppercase",
            position: "relative",
            transition: isGlitching ? "none" : "color 0.2s",
            textShadow: isGlitching
              ? `2px 0 ${accent}, -2px 0 #ff3366`
              : "none",
            animation: isGlitching ? "glitchShake 0.08s ease infinite" : "none",
          }}
        >
          FURQAN<span style={{ color: accent }}>.DEV</span>
        </div>

        {/* Progress number */}
        <div
          style={{
            fontSize: 10,
            color: `${accent}99`,
            letterSpacing: "0.12em",
            marginTop: 4,
          }}
        >
          {String(progress).padStart(3, "0")}%
        </div>

        {/* Status text */}
        <div
          style={{
            fontSize: 10,
            color: "#444",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            minWidth: 200,
            textAlign: "center",
            marginTop: 2,
          }}
        >
          <span style={{ color: accent }}>› </span>
          {statusText}
          <span
            style={{ animation: "blink 0.8s step-end infinite", color: accent }}
          >
            {" "}
            _
          </span>
        </div>

        {/* Thin progress bar — secondary visual */}
        <div
          style={{
            width: 160,
            height: 1,
            background: "#1e1e1e",
            marginTop: 12,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: `${progress}%`,
              background: accent,
              boxShadow: `0 0 6px ${accent}`,
              transition: "width 0.05s linear",
            }}
          />
        </div>
      </div>

      {/* Bottom version label */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          fontSize: 9,
          color: "#2a2a2a",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        SYSTEM v2.0.1 · ARCH LINUX · NODE 20
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes glitchShake {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-2px, 1px);
          }
          50% {
            transform: translate(2px, -1px);
          }
          75% {
            transform: translate(-1px, 2px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  );
}
