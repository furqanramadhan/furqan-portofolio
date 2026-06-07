"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface AboutProps {
  isDark?: boolean;
}

//Placeholder for image collection
const galleryImages = [
  {
    src: "/assets/image/about/gallery-1.png",
    caption: "AI-SE Winter School, Doha",
  },
  {
    src: "/assets/image/about/gallery-2.png",
    caption: "Bangkit Academy, Remote",
  },
  {
    src: "/assets/image/about/gallery-3.png",
    caption: "PMM — ITENAS, Bandung",
  },
  { src: "/assets/image/about/gallery-4.png", caption: "Somewhere on a trail" },
  { src: "/assets/image/about/gallery-5.png", caption: "USK, Banda Aceh" },
];

const AUTOPLAY_INTERVAL = 3500;

function ImageDump({ isDark }: { isDark: boolean }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const border = isDark ? "#1e1e1e" : "#C8BFA8";
  const textMuted = isDark ? "#555555" : "#7A7060";

  const next = () => setCurrentIdx((p) => (p + 1) % galleryImages.length);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        perspective: "1000px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Flashcard logic — we triple for reindexing feel */}
      {[0, 1, 2].map((stackIdx) => {
        const idx = (currentIdx + stackIdx) % galleryImages.length;
        const img = galleryImages[idx];
        const isTop = stackIdx === 0;

        return (
          <div
            key={`${idx}-${stackIdx}`}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 10 - stackIdx,
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              transform: `
                translateY(${stackIdx * -6}px) 
                translateX(${stackIdx * 6}px)
                scale(${1 - stackIdx * 0.05})
              `,
              opacity: 1 - stackIdx * 0.4,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                border: isTop ? "none" : `1px solid ${border}`,
                overflow: "hidden",
              }}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                style={{
                  objectFit: "cover",
                  filter: isDark
                    ? `brightness(${0.85 - stackIdx * 0.2}) contrast(1.05)`
                    : `brightness(${0.95 - stackIdx * 0.1})`,
                }}
                priority={isTop}
              />

              {/* Only show caption on top card */}
              {isTop && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: isDark
                      ? "linear-gradient(to top, rgba(0,0,0,0.85), transparent)"
                      : "linear-gradient(to top, rgba(245,240,232,0.9), transparent)",
                    padding: "32px 16px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      color: isDark ? "#C8C8C8" : "#1A1A1A",
                      letterSpacing: "0.06em",
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {img.caption}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      color: "var(--accent-color)",
                      fontFamily: "monospace",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {String(idx + 1).padStart(2, "0")}/
                    {String(galleryImages.length).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Manual toggle dot indicators */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          zIndex: 20,
        }}
      >
        {galleryImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(i)}
            style={{
              width: 4,
              height: i === currentIdx ? 16 : 4,
              background:
                i === currentIdx
                  ? "var(--accent-color)"
                  : isDark
                    ? "#333"
                    : "#C8BFA8",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>

      {/* Progress loop indicator */}
      {!isHovered && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 2,
            background: "var(--accent-color)",
            zIndex: 30,
            animation: `progress-bar ${AUTOPLAY_INTERVAL}ms linear infinite`,
          }}
        />
      )}
    </div>
  );
}

export default function About({ isDark = true }: AboutProps) {
  const theme = isDark
    ? {
        bg: "#0D0D0D",
        bgCard: "#111111",
        bgCardAlt: "#0f0f0f",
        border: "#1e1e1e",
        text: "#C8C8C8",
        textMuted: "#555555",
        textDim: "#2a2a2a",
      }
    : {
        bg: "#F5F0E8",
        bgCard: "#EDE8DC",
        bgCardAlt: "#E8E3D8",
        border: "#C8BFA8",
        text: "#1A1A1A",
        textMuted: "#7A7060",
        textDim: "#B0A898",
      };

  const accent = "var(--accent-color)";

  return (
    <section
      id="about"
      style={{
        background: theme.bg,
        padding: "80px 0",
        borderBottom: `1px solid ${theme.border}`,
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "30%",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(23,147,209,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "90%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Section header */}
        <div className="animate-on-scroll" style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: theme.text,
              margin: 0,
              letterSpacing: "0.04em",
              position: "relative",
              display: "inline-block",
            }}
          >
            ABOUT ME
            <span
              style={{
                position: "absolute",
                bottom: -6,
                left: 0,
                width: 48,
                height: 2,
                background: accent,
                boxShadow: "0 0 8px var(--accent-color)",
              }}
            />
          </h2>
        </div>

        {/* Asymmetric layout: photo left | right stack */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.1fr",
            gridTemplateRows: "auto auto",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {/* LEFT — tall portrait photo */}
          <div
            className="animate-on-scroll"
            style={{
              gridRow: "1 / 3",
              position: "relative",
              border: `1px solid ${theme.border}`,
              overflow: "hidden",
              minHeight: 480,
            }}
          >
            <Image
              src="/assets/image/about/about.png"
              alt="Furqan Ramadhan"
              fill
              style={{
                objectFit: "cover",
                objectPosition: "top center",
                filter: isDark
                  ? "brightness(0.85) contrast(1.05) grayscale(0.2)"
                  : "brightness(0.95)",
              }}
              priority
            />
            {/* Overlay gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: isDark
                  ? "linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 40%)"
                  : "linear-gradient(to top, rgba(245,240,232,0.6) 0%, transparent 50%)",
              }}
            />
            {/* Terminal Decoration */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                padding: "8px 12px",
                display: "flex",
                justifyContent: "space-between",
                background: isDark
                  ? "rgba(20,20,20,0.6)"
                  : "rgba(255,255,255,0.4)",
                borderBottom: `1px solid ${theme.border}`,
                backdropFilter: "blur(4px)",
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ff5f56",
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#ffbd2e",
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#27c93f",
                  }}
                />
              </div>
              <div
                style={{ fontSize: 9, color: theme.textMuted, opacity: 0.8 }}
              >
                identity.jpg
              </div>
            </div>

            {/* Name tag with improved layout */}
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: accent,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                // current_user
              </div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: isDark ? "#fff" : "#1A1A1A",
                  letterSpacing: "0.02em",
                  lineHeight: 1,
                }}
              >
                FURQAN RAMADHAN
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: theme.textMuted,
                  letterSpacing: "0.04em",
                  marginTop: 6,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span style={{ color: accent }}>$</span> location -- Banda Aceh,
                Id
              </div>
            </div>
          </div>

          {/* RIGHT TOP — Bio */}
          <div
            className="animate-on-scroll"
            style={{
              border: `1px solid ${theme.border}`,
              background: theme.bgCard,
              padding: "32px",
              position: "relative",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Background Pattern */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 120,
                height: 120,
                background: `linear-gradient(135deg, transparent 70%, ${accent} 70%)`,
                opacity: 0.05,
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                fontSize: 10,
                color: accent,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 20,
                fontWeight: 600,
              }}
            >
              [ 01_bio ]
            </div>
            <p
              style={{
                fontSize: 14,
                color: theme.text,
                lineHeight: 1.9,
                margin: 0,
                maxWidth: "90%",
              }}
            >
              Hi, I'm{" "}
              <span style={{ color: accent, fontWeight: 700 }}>Furqan</span> — a
              Computer Science student deeply immersed in the world of{" "}
              <span style={{ color: theme.text, fontWeight: 700 }}>
                Universitas Syiah Kuala
              </span>
              .
              <br />
              <br />I bridge the gap between creative frontend experiences and
              robust backend logic. My philosophy is simple: build tools that
              solve real problems, keep the code modular, and never stop
              exploring the edge of what's possible with web technologies.
            </p>

            {/* Hobby tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                marginTop: 28,
              }}
            >
              {[
                "⛰️ hiking",
                "🌿 outdoors",
                "📖 reading",
                "🐧 arch linux",
                "☕ coffee",
                "💻 fullstack",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: 11,
                    color: theme.textMuted,
                    border: `1px solid ${theme.border}`,
                    background: isDark
                      ? "rgba(255,255,255,0.02)"
                      : "rgba(0,0,0,0.02)",
                    padding: "4px 12px",
                    letterSpacing: "0.04em",
                    transition: "all 0.3s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.color = "#fff";
                    (e.currentTarget as HTMLSpanElement).style.background =
                      accent;
                    (e.currentTarget as HTMLSpanElement).style.borderColor =
                      accent;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLSpanElement).style.color =
                      theme.textMuted;
                    (e.currentTarget as HTMLSpanElement).style.background =
                      isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
                    (e.currentTarget as HTMLSpanElement).style.borderColor =
                      theme.border;
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT BOTTOM — split: gallery + quote */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 16,
            }}
          >
            {/* Gallery / image dump */}
            <div
              className="animate-on-scroll"
              style={{
                position: "relative",
                border: `1px solid ${theme.border}`,
                overflow: "hidden",
                minHeight: 220,
              }}
            >
              <ImageDump isDark={isDark} />
            </div>

            {/* Quote card */}
            <div
              className="animate-on-scroll"
              style={{
                border: `1px solid ${theme.border}`,
                background: theme.bgCard,
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Mountain decoration */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  fontSize: 80,
                  opacity: 0.04,
                  lineHeight: 1,
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                ⛰
              </div>

              <div
                style={{
                  fontSize: 10,
                  color: accent,
                  letterSpacing: "0.1em",
                  marginBottom: 16,
                }}
              >
                // philosophy
              </div>

              <blockquote
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: theme.text,
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  position: "relative",
                  zIndex: 1,
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: 32,
                    color: accent,
                    lineHeight: 0,
                    verticalAlign: "-0.4em",
                    marginRight: 4,
                    opacity: 0.6,
                  }}
                >
                  "
                </span>
                The mountains are calling and I must go — but first, let me push
                this commit.
                <span
                  style={{
                    fontSize: 32,
                    color: accent,
                    lineHeight: 0,
                    verticalAlign: "-0.4em",
                    marginLeft: 4,
                    opacity: 0.6,
                  }}
                >
                  "
                </span>
              </blockquote>

              <div
                style={{
                  fontSize: 10,
                  color: theme.textMuted,
                  letterSpacing: "0.08em",
                  marginTop: 16,
                  borderTop: `1px solid ${theme.border}`,
                  paddingTop: 12,
                }}
              >
                — Furqan, probably
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress-bar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
