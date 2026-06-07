"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import SplashScreen from "@/src/components/splashSreen";
import Header from "@/src/components/header";
import Skills from "@/src/app/skills/page";
import Journey from "@/src/components/journey";
import FeaturedWork from "@/src/app/work/page";
import About from "@/src/app/about/page";
import Contact from "@/src/app/contact/page";
import Footer from "@/src/components/footer";
import SmoothScroll from "@/src/components/smoothScroll";

const roles = [
  "ME",
  "QAN",
  "FRONTEND DEVELOPER",
  "INFORMATICS STUDENT",
  "DATA ENTHUSIAST",
];
const accent = "var(--accent-color)";

export default function Home() {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const [currentRoleidx, setCurrentRoleidx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setIsMounted] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);

  const bootSequence = [
    "$ initializing portfolio.sh...",
    "$ loading modules: [react] [next] [typescript]",
    "$ connecting to furqan.dev...",
    "$ STATUS: online — welcome.",
  ];

  useEffect(() => {
    setIsMounted(true);
    if (isSplashFinished) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < bootSequence.length) {
          setBootLines((prev) => [...prev, bootSequence[i]]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 400);
      return () => clearInterval(interval);
    }
  }, [isSplashFinished]);

  useEffect(() => {
    if (!isSplashFinished) return;
    const handleTyping = () => {
      const fullText = roles[currentRoleidx];
      if (isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        setTypingSpeed(40);
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        setTypingSpeed(120);
      }
      if (!isDeleting && displayedText === fullText) {
        setTypingSpeed(2200);
        setIsDeleting(true);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentRoleidx((prev) => (prev + 1) % roles.length);
        setTypingSpeed(400);
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [
    displayedText,
    isDeleting,
    currentRoleidx,
    isSplashFinished,
    typingSpeed,
  ]);

  const theme = isDark
    ? {
        bg: "#0D0D0D",
        border: "#1e1e1e",
        text: "#C8C8C8",
        textMuted: "#555555",
        textDim: "#2a2a2a",
        scanline: "rgba(255,255,255,0.015)",
      }
    : {
        bg: "#F5F0E8",
        border: "#C8BFA8",
        text: "#1A1A1A",
        textMuted: "#7A7060",
        textDim: "#B0A898",
        scanline: "rgba(0,0,0,0.015)",
      };

  if (!mounted) return null;
  return (
    <main
      style={{
        background: theme.bg,
        color: theme.text,
        transition: "all 0.3s ease",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      <SplashScreen onFinish={() => setIsSplashFinished(true)} />

      {isSplashFinished && (
        <>
          {/* Pass isDark + setter to Header so navbar can reflect theme */}
          <Header isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

          {/* ── HOME SECTION ── */}
          <section
            id="home"
            style={{
              minHeight: "90vh",
              position: "relative",
              overflow: "hidden",
              paddingTop: "80px",
            }}
          >
            {/* Scanline */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${theme.scanline} 2px, ${theme.scanline} 4px)`,
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Corner labels */}
            <div
              style={{
                position: "absolute",
                top: 90,
                left: 24,
                color: theme.textDim,
                fontSize: 11,
                fontFamily: "monospace",
                zIndex: 2,
              }}
            >
              <div>┌─[ furqan.dev ]</div>
              <div>│</div>
            </div>
            <div
              style={{
                position: "absolute",
                top: 90,
                right: 24,
                color: theme.textDim,
                fontSize: 11,
                fontFamily: "monospace",
                zIndex: 2,
                textAlign: "right",
              }}
            >
              <div>[ v2.0.1 ]─┐</div>
              <div>│</div>
            </div>

            {/* Main grid — responsive: 1 col mobile, 2 col desktop */}
            <div
              style={{
                width: "90%",
                maxWidth: 1200,
                margin: "0 auto",
                padding: "40px 20px 40px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: 48,
                alignItems: "center",
                position: "relative",
                zIndex: 2,
              }}
            >
              {/* LEFT — CLI Text */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {/* Boot lines */}
                <div style={{ marginBottom: 32, minHeight: 80 }}>
                  {bootLines.map((line, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: 11,
                        color:
                          i === bootLines.length - 1 ? accent : theme.textMuted,
                        lineHeight: 1.8,
                        letterSpacing: "0.02em",
                        animation: "fadeIn 0.3s ease",
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {/* Available badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    border: `1px solid ${accent}33`,
                    padding: "4px 12px",
                    marginBottom: 24,
                    width: "fit-content",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#22c55e",
                      boxShadow: "0 0 6px #22c55e",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 11,
                      color: "#22c55e",
                      letterSpacing: "0.08em",
                    }}
                  >
                    GRADUATED
                  </span>
                </div>

                {/* Heading */}
                <div style={{ marginBottom: 8 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: theme.textDim,
                      marginBottom: 8,
                    }}
                  >
                    ╔══════════════════════════╗
                  </div>
                  <h1
                    style={{
                      fontSize: "clamp(28px, 4vw, 52px)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      margin: "0 0 4px 0",
                      color: theme.text,
                    }}
                  >
                    HELLO WORLD!
                  </h1>
                  <h1
                    style={{
                      fontSize: "clamp(28px, 4vw, 52px)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      margin: "0 0 4px 0",
                      color: theme.text,
                    }}
                  >
                    {"THIS IS "}
                    <span style={{ color: accent }}>
                      {displayedText}
                      <span
                        style={{
                          display: "inline-block",
                          width: 3,
                          height: "0.85em",
                          background: accent,
                          marginLeft: 2,
                          verticalAlign: "middle",
                          animation: "blink 1s step-end infinite",
                        }}
                      />
                    </span>
                  </h1>
                  <h1
                    style={{
                      fontSize: "clamp(28px, 4vw, 52px)",
                      fontWeight: 700,
                      lineHeight: 1.15,
                      margin: "0 0 4px 0",
                      color: theme.text,
                    }}
                  >
                    {"FROM "}
                    <span style={{ color: accent }}>INDONESIA</span>
                  </h1>
                  <div
                    style={{ fontSize: 12, color: theme.textDim, marginTop: 8 }}
                  >
                    ╚══════════════════════════╝
                  </div>
                </div>

                {/* Subtitle */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    margin: "20px 0 28px",
                    fontSize: 12,
                    letterSpacing: "0.04em",
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ color: accent }}>›</span>
                  <span style={{ color: theme.text, fontWeight: 600 }}>
                    INFORMATICS STUDENT
                  </span>
                  <span style={{ color: theme.textMuted }}>—</span>
                  <span style={{ color: theme.textMuted }}>
                    Universitas Syiah Kuala
                  </span>
                </div>

                {/* Tags */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    marginBottom: 36,
                  }}
                >
                  {["Frontend Dev", "Data Enthusiast", "Linux User"].map(
                    (tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          color: theme.textMuted,
                          border: `1px solid ${theme.border}`,
                          padding: "3px 10px",
                          letterSpacing: "0.06em",
                          cursor: "default",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLSpanElement).style.color =
                            accent;
                          (
                            e.currentTarget as HTMLSpanElement
                          ).style.borderColor = accent;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLSpanElement).style.color =
                            theme.textMuted;
                          (
                            e.currentTarget as HTMLSpanElement
                          ).style.borderColor = theme.border;
                        }}
                      >
                        #{tag.toLowerCase().replace(" ", "_")}
                      </span>
                    ),
                  )}
                </div>

                {/* CTA buttons */}
                <div style={{ display: "flex", gap: 12 }}>
                  <a
                    href="https://drive.google.com/file/d/1s0ipd4ATxZAjhongZqz0b4CN1tvDMYZo/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 20px",
                      border: `1px solid ${accent}`,
                      color: accent,
                      fontSize: 12,
                      letterSpacing: "0.08em",
                      textDecoration: "none",
                      fontFamily: "monospace",
                      transition: "all 0.2s",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        accent;
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "#000";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        accent;
                    }}
                  >
                    ./download_cv.pdf
                  </a>

                  <a
                    href="#contact"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "10px 20px",
                      border: `1px solid ${theme.border}`,
                      color: theme.textMuted,
                      fontSize: 12,
                      letterSpacing: "0.08em",
                      textDecoration: "none",
                      transition: "all 0.2s",
                      background: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        accent;
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        accent;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.borderColor =
                        theme.border;
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        theme.textMuted;
                    }}
                  >
                    ./contact.sh
                  </a>
                </div>
              </div>

              {/* RIGHT — Photo */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ position: "relative", width: "100%", maxWidth: 400 }}
                >
                  {/* Corner brackets */}
                  <div
                    style={{
                      position: "absolute",
                      top: -16,
                      left: -16,
                      width: 60,
                      height: 60,
                      borderTop: `2px solid ${accent}`,
                      borderLeft: `2px solid ${accent}`,
                      zIndex: 3,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: -16,
                      right: -16,
                      width: 60,
                      height: 60,
                      borderBottom: `2px solid ${accent}`,
                      borderRight: `2px solid ${accent}`,
                      zIndex: 3,
                    }}
                  />

                  {/* Offset shadow */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      width: "100%",
                      height: "100%",
                      border: `1px solid ${theme.border}`,
                      zIndex: 0,
                    }}
                  />

                  {/* FIX: position relative is required for Image fill */}
                  <div
                    style={{
                      position: "relative", // ← fixes the fill error
                      width: "100%",
                      aspectRatio: "4/5",
                      overflow: "hidden",
                      border: `1px solid ${theme.border}`,
                      zIndex: 2,
                      filter: isDark
                        ? "grayscale(20%) contrast(1.1) brightness(0.9)"
                        : "grayscale(10%) contrast(1.05)",
                    }}
                  >
                    <Image
                      src="/assets/image/home/home-1.jpeg"
                      alt="Furqan Ramadhan"
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />

                    {/* Scanline on photo */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${theme.scanline} 3px, ${theme.scanline} 4px)`,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Info bar */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: isDark
                          ? "rgba(0,0,0,0.75)"
                          : "rgba(245,240,232,0.88)",
                        padding: "8px 12px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: `1px solid ${theme.border}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 10,
                          color: accent,
                          letterSpacing: "0.08em",
                        }}
                      >
                        FURQAN_RAMADHAN
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: theme.textMuted,
                          letterSpacing: "0.06em",
                        }}
                      >
                        USK // 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Other sections — pass isDark so they can inherit theme */}
          {/* <Skills isDark={isDark} />
          <Journey isDark={isDark} />
          <FeaturedWork isDark={isDark} />
          <About isDark={isDark} />
          <Contact isDark={isDark} /> */}
          <SmoothScroll />
          <Skills isDark={isDark} />
          <Footer isDark={isDark} />
        </>
      )}

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap");
        * {
          box-sizing: border-box;
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }
        .animated {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
