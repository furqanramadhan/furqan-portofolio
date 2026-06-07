"use client";
import { useState, useEffect, useRef } from "react";

interface ContactProps {
  isDark?: boolean;
}

const BOOT_LINES = [
  "$ initializing contact.sh...",
  "$ establishing secure channel...",
  "$ ready to receive input.",
];

export default function Contact({ isDark = true }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<"success" | "error" | "">("");
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const bootStarted = useRef(false);

  const theme = isDark
    ? {
        bg: "#0D0D0D",
        bgCard: "#111111",
        bgInput: "#0a0a0a",
        border: "#1e1e1e",
        borderFocus: "var(--accent-color)",
        text: "#C8C8C8",
        textMuted: "#555555",
        textDim: "#2a2a2a",
        scanline: "rgba(255,255,255,0.008)",
      }
    : {
        bg: "#F5F0E8",
        bgCard: "#EDE8DC",
        bgInput: "#E8E3D8",
        border: "#C8BFA8",
        borderFocus: "var(--accent-color)",
        text: "#1A1A1A",
        textMuted: "#7A7060",
        textDim: "#C8BFA8",
        scanline: "rgba(0,0,0,0.008)",
      };

  const accent = "var(--accent-color)";

  // Boot sequence — triggered when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !bootStarted.current) {
          bootStarted.current = true;
          let i = 0;
          const interval = setInterval(() => {
            if (i < BOOT_LINES.length) {
              setBootLines((prev) => [...prev, BOOT_LINES[i]]);
              i++;
            } else {
              clearInterval(interval);
              setTimeout(() => setBootDone(true), 300);
            }
          }, 450);
        }
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "80c93f3c-22a2-459d-addb-86ea0cdc0838");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setResult("success");
        (e.target as HTMLFormElement).reset();
        setCharCount(0);
      } else {
        setResult("error");
      }
    } catch {
      setResult("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
    }
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: theme.bgInput,
    border: `1px solid ${theme.border}`,
    color: theme.text,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    padding: "10px 14px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    letterSpacing: "0.02em",
    borderRadius: 0,
  };

  const socials = [
    {
      icon: "fab fa-linkedin-in",
      href: "https://www.linkedin.com/in/furqan-ramadhan-a86808179",
      label: "LinkedIn",
    },
    {
      icon: "fab fa-github",
      href: "https://github.com/furqanramadhan",
      label: "GitHub",
    },
    {
      icon: "fas fa-envelope",
      href: "mailto:furqan2682@gmail.com",
      label: "Email",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: theme.bg,
        padding: "80px 0",
        borderBottom: `1px solid ${theme.border}`,
        fontFamily: "'JetBrains Mono', monospace",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${theme.scanline} 2px, ${theme.scanline} 4px)`,
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
          <div
            style={{
              fontSize: 11,
              color: theme.textMuted,
              letterSpacing: "0.12em",
              marginBottom: 8,
            }}
          >
            <span style={{ color: accent }}>$ </span>./contact.sh
          </div>
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
            GET IN TOUCH
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

        {/* Two column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
            alignItems: "start",
          }}
        >
          {/* LEFT — terminal info panel */}
          <div
            className="animate-on-scroll"
            style={{ display: "flex", flexDirection: "column", gap: 0 }}
          >
            {/* Boot sequence output */}
            <div
              style={{
                border: `1px solid ${theme.border}`,
                background: theme.bgCard,
                padding: "20px 20px 16px",
                marginBottom: 16,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 20,
                  height: 20,
                  borderTop: `2px solid var(--accent-color)`,
                  borderLeft: `2px solid var(--accent-color)`,
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  color: accent,
                  letterSpacing: "0.1em",
                  marginBottom: 14,
                }}
              >
                // terminal
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minHeight: 72,
                }}
              >
                {bootLines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 11,
                      color:
                        i === bootLines.length - 1 && !bootDone
                          ? accent
                          : theme.textMuted,
                      letterSpacing: "0.02em",
                      lineHeight: 1.7,
                      animation: "fadeInLine 0.3s ease",
                    }}
                  >
                    {line}
                    {i === bootLines.length - 1 && !bootDone && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 6,
                          height: 11,
                          background: accent,
                          marginLeft: 3,
                          verticalAlign: "middle",
                          animation: "blink 1s step-end infinite",
                        }}
                      />
                    )}
                  </div>
                ))}
                {bootDone && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "#22c55e",
                      letterSpacing: "0.02em",
                      lineHeight: 1.7,
                      animation: "fadeInLine 0.3s ease",
                    }}
                  >
                    <span style={{ color: "#22c55e" }}>✓</span> channel open —
                    awaiting message.
                  </div>
                )}
              </div>
            </div>

            {/* Contact info */}
            <div
              style={{
                border: `1px solid ${theme.border}`,
                background: theme.bgCard,
                padding: "20px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  color: accent,
                  letterSpacing: "0.1em",
                  marginBottom: 16,
                }}
              >
                // reach me at
              </div>

              {[
                {
                  label: "email",
                  value: "furqan2682@gmail.com",
                  href: "mailto:furqan2682@gmail.com",
                  icon: "fas fa-envelope",
                },
                {
                  label: "university",
                  value: "Universitas Syiah Kuala",
                  href: null,
                  icon: "fas fa-graduation-cap",
                },
                {
                  label: "status",
                  value: "open to work",
                  href: null,
                  icon: "fas fa-circle",
                  color: "#22c55e",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 14,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      border: `1px solid ${theme.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={item.icon}
                      style={{
                        fontSize: 11,
                        color: item.color || theme.textMuted,
                      }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 9,
                        color: theme.textMuted,
                        letterSpacing: "0.1em",
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{
                          fontSize: 12,
                          color: theme.text,
                          textDecoration: "none",
                          letterSpacing: "0.02em",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--accent-color)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            theme.text)
                        }
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontSize: 12,
                          color: item.color || theme.text,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {item.value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div
              style={{
                border: `1px solid ${theme.border}`,
                background: theme.bgCard,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: theme.textMuted,
                  letterSpacing: "0.08em",
                  marginRight: 4,
                }}
              >
                // links
              </span>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    width: 32,
                    height: 32,
                    border: `1px solid ${theme.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: theme.textMuted,
                    textDecoration: "none",
                    fontSize: 12,
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      "var(--accent-color)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      "var(--accent-color)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      theme.textMuted;
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      theme.border;
                  }}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — CLI form */}
          <div className="animate-on-scroll">
            <div
              style={{
                border: `1px solid ${theme.border}`,
                background: theme.bgCard,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Terminal title bar */}
              <div
                style={{
                  background: isDark ? "#0a0a0a" : "#E0DAD0",
                  borderBottom: `1px solid ${theme.border}`,
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                    <div
                      key={c}
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: c,
                        opacity: 0.7,
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontSize: 10,
                    color: theme.textMuted,
                    letterSpacing: "0.08em",
                  }}
                >
                  compose_message.sh
                </span>
                <span style={{ fontSize: 10, color: theme.textMuted }}>
                  furqan@dev
                </span>
              </div>

              <form
                onSubmit={handleSubmit}
                style={{
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                {/* Name field */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 11, color: accent }}>›</span>
                    <label
                      style={{
                        fontSize: 11,
                        color: theme.textMuted,
                        letterSpacing: "0.1em",
                      }}
                    >
                      name
                    </label>
                  </div>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 11,
                        color: activeField === "name" ? accent : theme.textDim,
                        fontFamily: "monospace",
                      }}
                    >
                      $
                    </span>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="your full name"
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      style={{
                        ...inputBase,
                        paddingLeft: 28,
                        borderColor:
                          activeField === "name"
                            ? "var(--accent-color)"
                            : theme.border,
                        boxShadow:
                          activeField === "name"
                            ? "0 0 0 1px var(--accent-color)"
                            : "none",
                      }}
                    />
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 11, color: accent }}>›</span>
                    <label
                      style={{
                        fontSize: 11,
                        color: theme.textMuted,
                        letterSpacing: "0.1em",
                      }}
                    >
                      email
                    </label>
                  </div>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 11,
                        color: activeField === "email" ? accent : theme.textDim,
                        fontFamily: "monospace",
                      }}
                    >
                      $
                    </span>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      style={{
                        ...inputBase,
                        paddingLeft: 28,
                        borderColor:
                          activeField === "email"
                            ? "var(--accent-color)"
                            : theme.border,
                        boxShadow:
                          activeField === "email"
                            ? "0 0 0 1px var(--accent-color)"
                            : "none",
                      }}
                    />
                  </div>
                </div>

                {/* Message field */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <span style={{ fontSize: 11, color: accent }}>›</span>
                      <label
                        style={{
                          fontSize: 11,
                          color: theme.textMuted,
                          letterSpacing: "0.1em",
                        }}
                      >
                        message
                      </label>
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        color: charCount > 400 ? "#ef4444" : theme.textMuted,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {charCount}/500
                    </span>
                  </div>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: 14,
                        top: 12,
                        fontSize: 11,
                        color:
                          activeField === "message" ? accent : theme.textDim,
                        fontFamily: "monospace",
                      }}
                    >
                      $
                    </span>
                    <textarea
                      name="message"
                      required
                      maxLength={500}
                      placeholder="your message here..."
                      rows={6}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      onChange={(e) => setCharCount(e.target.value.length)}
                      style={{
                        ...inputBase,
                        paddingLeft: 28,
                        resize: "vertical",
                        minHeight: 140,
                        borderColor:
                          activeField === "message"
                            ? "var(--accent-color)"
                            : theme.border,
                        boxShadow:
                          activeField === "message"
                            ? "0 0 0 1px var(--accent-color)"
                            : "none",
                      }}
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: isSubmitting ? theme.bgInput : "transparent",
                    border: `1px solid ${isSubmitting ? theme.border : "var(--accent-color)"}`,
                    color: isSubmitting
                      ? theme.textMuted
                      : "var(--accent-color)",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.1em",
                    padding: "12px 20px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "all 0.2s",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "var(--accent-color)";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "#000";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color =
                        "var(--accent-color)";
                    }
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        style={{
                          animation: "spin 1s linear infinite",
                          display: "inline-block",
                        }}
                      >
                        ◌
                      </span>
                      SENDING...
                    </>
                  ) : (
                    <>
                      <span>./send_message.sh</span>
                      <i
                        className="fas fa-paper-plane"
                        style={{ fontSize: 11 }}
                      />
                    </>
                  )}
                </button>

                {/* Result feedback */}
                {result === "success" && (
                  <div
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #22c55e",
                      background: "rgba(34,197,94,0.08)",
                      color: "#22c55e",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      animation: "fadeInLine 0.3s ease",
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <span>✓</span> message transmitted successfully.
                  </div>
                )}
                {result === "error" && (
                  <div
                    style={{
                      padding: "12px 16px",
                      border: "1px solid #ef4444",
                      background: "rgba(239,68,68,0.08)",
                      color: "#ef4444",
                      fontSize: 11,
                      letterSpacing: "0.06em",
                      animation: "fadeInLine 0.3s ease",
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <span>✗</span> transmission failed. please retry.
                  </div>
                )}
              </form>

              {/* Bottom statusbar */}
              <div
                style={{
                  borderTop: `1px solid ${theme.border}`,
                  padding: "8px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    color: theme.textMuted,
                    letterSpacing: "0.08em",
                  }}
                >
                  furqan@portfolio:~/contact
                  <span
                    style={{
                      color: accent,
                      animation: "blink 1s step-end infinite",
                    }}
                  >
                    {" "}
                    _
                  </span>
                </span>
                <span
                  style={{
                    fontSize: 9,
                    color: theme.textMuted,
                    letterSpacing: "0.06em",
                  }}
                >
                  web3forms · encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeInLine {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
