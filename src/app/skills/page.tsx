"use client";
import { useState, useRef, useEffect } from "react";

interface SkillsProps {
  isDark?: boolean;
}

const categories = [
  {
    id: "languages",
    label: "// languages",
    count: 6,
    skills: [
      { name: "TypeScript", cls: "devicon-typescript-plain colored" },
      { name: "JavaScript", cls: "devicon-javascript-plain colored" },
      { name: "Python", cls: "devicon-python-plain colored" },
      { name: "PHP", cls: "devicon-php-plain colored" },
      { name: "Kotlin", cls: "devicon-kotlin-plain colored" },
      { name: "C/C++", cls: "devicon-cplusplus-plain colored" },
    ],
  },
  {
    id: "frameworks",
    label: "// frameworks",
    count: 7,
    skills: [
      { name: "Next.js", cls: "devicon-nextjs-original-wordmark colored" },
      { name: "React", cls: "devicon-react-original colored" },
      { name: "Node.js", cls: "devicon-nodejs-plain colored" },
      { name: "Adonis.js", cls: "devicon-adonisjs-original colored" },
      { name: "Laravel", cls: "devicon-laravel-original colored" },
      { name: "Flask", cls: "devicon-flask-original colored" },
      { name: "Django", cls: "devicon-django-plain colored" },
    ],
  },
  {
    id: "devops",
    label: "// cloud & devops",
    count: 5,
    skills: [
      { name: "Docker", cls: "devicon-docker-plain colored" },
      { name: "Nginx", cls: "devicon-nginx-original colored" },
      { name: "AWS", cls: "devicon-amazonwebservices-plain-wordmark colored" },
      { name: "GitHub Actions", cls: "devicon-github-original colored" },
      { name: "Git", cls: "devicon-git-plain colored" },
    ],
  },
  {
    id: "tools",
    label: "// tools & db",
    count: 5,
    skills: [
      { name: "MySQL", cls: "devicon-mysql-original colored" },
      { name: "MongoDB", cls: "devicon-mongodb-plain colored" },
      { name: "Arch Linux", cls: "devicon-archlinux-plain colored" },
      { name: "Figma", cls: "devicon-figma-plain colored" },
      { name: "Tailwind", cls: "devicon-tailwindcss-original colored" },
    ],
  },
];

function SkillIcon({
  skill,
  isDark,
  border,
  textMuted,
  isGrayscale,
}: {
  skill: { name: string; cls: string };
  isDark: boolean;
  border: string;
  textMuted: string;
  isGrayscale: boolean; // controlled by parent hover state
}) {
  const [hovered, setHovered] = useState(false);

  // FIX 1: use separate CSS classes for grayscale/color
  // never put filter on the <i> that has 'colored' class — override via wrapper
  const showColor = hovered || !isGrayscale;

  const needsInvert =
    (skill.name === "Next.js" ||
      skill.name === "Flask" ||
      skill.name === "Django") &&
    isDark;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: "default",
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          // FIX 2: bigger box
          width: 52,
          height: 52,
          border: `1px solid ${hovered ? "var(--accent-color)" : border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxShadow: hovered ? "0 0 10px rgba(23,147,209,0.25)" : "none",
          background: "transparent",
          position: "relative",
        }}
      >
        {/*
          FIX 1: icon wrapper handles grayscale via CSS filter on a WRAPPING div,
          never on the <i> itself — this prevents colored class being overridden
        */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // grayscale on wrapper, not on <i>
            filter: showColor
              ? needsInvert
                ? "invert(1) brightness(1.2)"
                : "none"
              : needsInvert
                ? "grayscale(100%) brightness(0.5) invert(1)"
                : "grayscale(100%) brightness(0.55)",
            transition: "filter 0.25s ease",
          }}
        >
          <i className={skill.cls} style={{ fontSize: 28 }} />
        </div>
      </div>

      <span
        style={{
          fontSize: 9,
          color: hovered ? "var(--accent-color)" : textMuted,
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
          transition: "color 0.2s",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}

function MarqueeTrack({
  skills,
  isDark,
  border,
  textMuted,
  speed = 30,
}: {
  skills: (typeof categories)[0]["skills"];
  isDark: boolean;
  border: string;
  textMuted: string;
  speed?: number;
}) {
  // FIX 3: use CSS animation with known pixel width
  // Duplicate skills x4 — one "set" scrolls off, next set takes over
  const ITEM_WIDTH = 52 + 12; // box + gap
  const setWidth = skills.length * ITEM_WIDTH;

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        padding: "14px 0",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 80px, black calc(100% - 80px), transparent)",
      }}
    >
      {/*
        FIX 3: instead of % translateX, animate by exact pixel value of one set.
        We render 4 sets so the loop is always seamless regardless of container width.
      */}
      <div
        style={{
          display: "flex",
          gap: 12,
          width: "max-content",
          animation: `marquee-px-${skills.length} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {[0, 1, 2, 3].flatMap((setIdx) =>
          skills.map((skill, i) => (
            <SkillIcon
              key={`set${setIdx}-${i}`}
              skill={skill}
              isDark={isDark}
              border={border}
              textMuted={textMuted}
              isGrayscale={true}
            />
          )),
        )}
      </div>

      {/* Inject keyframe with exact pixel offset per category */}
      <style>{`
        @keyframes marquee-px-${skills.length} {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${setWidth * 2}px); }
        }
      `}</style>
    </div>
  );
}

function AccordionRow({
  cat,
  isDark,
  isOpen,
  onToggle,
  theme,
}: {
  cat: (typeof categories)[0];
  isDark: boolean;
  isOpen: boolean;
  onToggle: () => void;
  theme: {
    bgCard: string;
    border: string;
    textMuted: string;
    text: string;
    iconFilter: string;
    iconFilterHover: string;
  };
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      style={{
        border: `1px solid ${isOpen ? "var(--accent-color)" : theme.border}`,
        background: theme.bgCard,
        transition: "border-color 0.25s ease",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 20px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "'JetBrains Mono', monospace",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 11,
              color: isOpen ? "var(--accent-color)" : theme.textMuted,
              letterSpacing: "0.1em",
              transition: "color 0.2s",
            }}
          >
            {cat.label}
          </span>
          <span
            style={{
              fontSize: 9,
              color: "var(--accent-color)",
              border: "1px solid var(--accent-color)",
              padding: "1px 6px",
              letterSpacing: "0.08em",
              opacity: isOpen ? 1 : 0.4,
              transition: "opacity 0.2s",
            }}
          >
            {cat.count}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Preview icons when collapsed */}
          {!isOpen && (
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {cat.skills.slice(0, 4).map((s) => (
                <div
                  key={s.name}
                  style={{
                    filter:
                      isDark &&
                      (s.name === "Next.js" ||
                        s.name === "Flask" ||
                        s.name === "Django")
                        ? "grayscale(100%) brightness(0.5) invert(1)"
                        : "grayscale(100%) brightness(0.55)",
                  }}
                >
                  <i className={s.cls} style={{ fontSize: 16 }} />
                </div>
              ))}
              {cat.skills.length > 4 && (
                <span style={{ fontSize: 9, color: theme.textMuted }}>
                  +{cat.skills.length - 4}
                </span>
              )}
            </div>
          )}
          <span
            style={{
              fontSize: 10,
              color: isOpen ? "var(--accent-color)" : theme.textMuted,
              transition: "transform 0.3s ease, color 0.2s",
              display: "inline-block",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </div>
      </button>

      {/* Expandable marquee */}
      <div
        ref={contentRef}
        style={{
          height,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          borderTop: isOpen ? `1px solid ${theme.border}` : "none",
        }}
      >
        <MarqueeTrack
          skills={cat.skills}
          isDark={isDark}
          border={theme.border}
          textMuted={theme.textMuted}
          speed={cat.skills.length * 5}
        />
      </div>
    </div>
  );
}

export default function Skills({ isDark = true }: SkillsProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const theme = isDark
    ? {
        bg: "#0D0D0D",
        bgCard: "#111111",
        border: "#1e1e1e",
        text: "#C8C8C8",
        textMuted: "#555555",
        iconFilter: "grayscale(100%) brightness(0.55)",
        iconFilterHover: "none",
      }
    : {
        bg: "#F5F0E8",
        bgCard: "#EDE8DC",
        border: "#C8BFA8",
        text: "#1A1A1A",
        textMuted: "#7A7060",
        iconFilter: "grayscale(100%) brightness(0.75)",
        iconFilterHover: "none",
      };

  const accent = "var(--accent-color)";

  return (
    <section
      id="skills"
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
          inset: 0,
          background: isDark
            ? "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)"
            : "none",
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
        <div className="animate-on-scroll" style={{ marginBottom: 36 }}>
          <div
            style={{
              fontSize: 11,
              color: theme.textMuted,
              letterSpacing: "0.12em",
              marginBottom: 8,
            }}
          >
            <span style={{ color: accent }}>$ </span>ls --skills
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
            TECHNICAL SKILLS
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
          <p
            style={{
              color: theme.textMuted,
              fontSize: 12,
              marginTop: 20,
              letterSpacing: "0.04em",
            }}
          >
            Technologies I work with — click a category to explore.
          </p>
        </div>

        {/* Accordion */}
        <div
          className="animate-on-scroll"
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {categories.map((cat) => (
            <AccordionRow
              key={cat.id}
              cat={cat}
              isDark={isDark}
              isOpen={openId === cat.id}
              onToggle={() => setOpenId(openId === cat.id ? null : cat.id)}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
