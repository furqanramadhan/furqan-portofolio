"use client";
import { useState, useEffect } from "react";
import FlashAbout from "@/src/components/flashcardImage/flashAbout";
import FlashView from "@/src/components/flashcardImage/flashView";

interface AboutProps {
  isDark?: boolean;
}

const personalMoments = Array.from({ length: 11 }, (_, i) => ({
  src: `/assets/image/selected portofolio/personal/personal${i + 1}.webp`,
  caption: undefined,
}));

const viewImages = Array.from({ length: 29 }, (_, i) => ({
  src: `/assets/image/selected portofolio/view/view${i + 1}.webp`,
  caption: undefined,
}));

export default function About({ isDark = true }: AboutProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const theme = isDark
    ? {
        bg: "#0D0D0D",
        bgCard: "#111111",
        border: "#1e1e1e",
        text: "#C8C8C8",
        textMuted: "#555555",
      }
    : {
        bg: "#F5F0E8",
        bgCard: "#EDE8DC",
        border: "#C8BFA8",
        text: "#1A1A1A",
        textMuted: "#7A7060",
      };

  const accent = "var(--accent-color)";
  const flashTheme = {
    border: theme.border,
    scanline: isDark ? "rgba(255,255,255,0.008)" : "rgba(0,0,0,0.008)",
  };

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

        {isMobile ? (
          /* ── MOBILE LAYOUT ── */
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Photo — shorter height on mobile */}
            <div
              className="animate-on-scroll"
              style={{
                position: "relative",
                border: `1px solid ${theme.border}`,
                overflow: "hidden",
                height: 280,
              }}
            >
              <FlashAbout
                images={personalMoments}
                isDark={isDark}
                theme={flashTheme}
                alt="Furqan Ramadhan"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 140,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)",
                  zIndex: 15,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  right: 20,
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    color: accent,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  // current_user
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                    textShadow: "0 2px 12px rgba(0,0,0,0.9)",
                  }}
                >
                  FURQAN RAMADHAN
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#C8C8C8",
                    letterSpacing: "0.04em",
                    marginTop: 4,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                  }}
                >
                  <span style={{ color: accent }}>$</span> location -- Banda
                  Aceh, ID
                </div>
              </div>
            </div>

            {/* Bio */}
            <div
              className="animate-on-scroll"
              style={{
                border: `1px solid ${theme.border}`,
                background: theme.bgCard,
                padding: "24px 20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
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
                  marginBottom: 16,
                  fontWeight: 600,
                }}
              >
                [ 01_bio ]
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: theme.text,
                  lineHeight: 1.85,
                  margin: 0,
                }}
              >
                I'm{" "}
                <span style={{ color: accent, fontWeight: 700 }}>
                  Furqan Ramadhan
                </span>
                , a Computer Science student at{" "}
                <span style={{ fontWeight: 700 }}>Universitas Syiah Kuala</span>
                .
                <br />
                <br />I enjoy building software, exploring Linux systems, and
                learning how technology can solve real-world problems. Beyond
                coding, I enjoy traveling, hiking, and documenting moments.
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 20,
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
                      fontSize: 10,
                      color: theme.textMuted,
                      border: `1px solid ${theme.border}`,
                      background: isDark
                        ? "rgba(255,255,255,0.02)"
                        : "rgba(0,0,0,0.02)",
                      padding: "3px 10px",
                      letterSpacing: "0.04em",
                      transition: "all 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLSpanElement).style.color = "#fff";
                      (e.currentTarget as HTMLSpanElement).style.background =
                        "var(--accent-color)";
                      (e.currentTarget as HTMLSpanElement).style.borderColor =
                        "var(--accent-color)";
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

            {/* Gallery — full width on mobile */}
            <div
              className="animate-on-scroll"
              style={{
                position: "relative",
                border: `1px solid ${theme.border}`,
                overflow: "hidden",
                height: 220,
              }}
            >
              <FlashView
                isDark={isDark}
                images={viewImages}
                theme={flashTheme}
                alt="Outdoor moments"
              />
            </div>

            {/* Quote */}
            <div
              className="animate-on-scroll"
              style={{
                border: `1px solid ${theme.border}`,
                background: theme.bgCard,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                overflow: "hidden",
                minHeight: 140,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  fontSize: 60,
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
                  marginBottom: 12,
                }}
              >
                // philosophy
              </div>
              <blockquote
                style={{
                  margin: 0,
                  fontSize: 12,
                  color: theme.text,
                  lineHeight: 1.75,
                  fontStyle: "italic",
                  zIndex: 1,
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontSize: 24,
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
                    fontSize: 24,
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
                  marginTop: 12,
                  borderTop: `1px solid ${theme.border}`,
                  paddingTop: 10,
                }}
              >
                — Furqan, probably
              </div>
            </div>
          </div>
        ) : (
          /* ── DESKTOP LAYOUT (original) ── */
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.1fr",
              gridTemplateRows: "auto auto",
              gap: 16,
              alignItems: "stretch",
            }}
          >
            {/* LEFT — spans 2 rows */}
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
              <FlashAbout
                images={personalMoments}
                isDark={isDark}
                theme={flashTheme}
                alt="Furqan Ramadhan"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 180,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 100%)",
                  zIndex: 15,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: 24,
                  right: 24,
                  zIndex: 20,
                  pointerEvents: "none",
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
                    color: "#fff",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                    textShadow: "0 2px 12px rgba(0,0,0,0.9)",
                  }}
                >
                  FURQAN RAMADHAN
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "#C8C8C8",
                    letterSpacing: "0.04em",
                    marginTop: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    textShadow: "0 1px 6px rgba(0,0,0,0.8)",
                  }}
                >
                  <span style={{ color: accent }}>$</span> location -- Banda
                  Aceh, ID
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
                I'm{" "}
                <span style={{ color: accent, fontWeight: 700 }}>
                  Furqan Ramadhan
                </span>
                , a Computer Science student at{" "}
                <span style={{ color: theme.text, fontWeight: 700 }}>
                  Universitas Syiah Kuala
                </span>
                .
                <br />
                <br />I enjoy building software, exploring Linux systems, and
                learning how technology can solve real-world problems. Beyond
                coding, I enjoy traveling, hiking, and documenting moments from
                different places and experiences.
              </p>
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
                        "var(--accent-color)";
                      (e.currentTarget as HTMLSpanElement).style.borderColor =
                        "var(--accent-color)";
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

            {/* RIGHT BOTTOM — gallery + quote */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr",
                gap: 16,
              }}
            >
              <div
                className="animate-on-scroll"
                style={{
                  position: "relative",
                  border: `1px solid ${theme.border}`,
                  overflow: "hidden",
                  minHeight: 220,
                }}
              >
                <FlashView
                  isDark={isDark}
                  images={viewImages}
                  theme={flashTheme}
                  alt="Outdoor moments"
                />
              </div>
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
                  The mountains are calling and I must go — but first, let me
                  push this commit.
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
        )}
      </div>
    </section>
  );
}
