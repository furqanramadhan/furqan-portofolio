"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import FlashcardImage from "@/src/components/flashcardImage/flashJourney";

interface JourneyProps {
  isDark?: boolean;
}

const items = [
  {
    year: "2021",
    end: "present",
    title: "S1 Informatika",
    org: "Universitas Syiah Kuala",
    location: "Banda Aceh",
    role: "Undergraduate Student",
    type: "education",
    gpa: "3.51 / 4.0",
    tags: ["Computer Science", "GPA 3.51"],
    desc: "Pursuing a degree in Informatics at the Faculty of Mathematics and Natural Sciences.",
    images: Array.from(
      { length: 8 },
      (_, i) => `/assets/image/selected portofolio/kuliah/kuliah${i + 1}.webp`,
    ),
  },
  {
    year: "2023",
    end: "jan 2024",
    title: "Pertukaran Mahasiswa Merdeka",
    org: "ITENAS",
    location: "Bandung",
    role: "Exchange Student",
    type: "experience",
    tags: ["National Exchange", "Cross-disciplinary"],
    desc: "National student exchange program by the Ministry of Education — cross-disciplinary study and cultural adaptation.",
    images: Array.from(
      { length: 23 },
      (_, i) => `/assets/image/selected portofolio/pmm/pmm${i + 1}.webp`,
    ),
  },
  {
    year: "2024",
    end: "jul 2024",
    title: "Bangkit Academy",
    org: "Google · GoTo · Traveloka",
    location: "Remote",
    role: "Mobile Development Cohort",
    type: "experience",
    tags: ["Kotlin", "Android", "ML", "Cloud"],
    desc: "40+ hrs/week intensive program. Built SignMate capstone in a cross-functional team with iterative feedback from industry reviewers.",
    images: Array.from(
      { length: 7 },
      (_, i) =>
        `/assets/image/selected portofolio/bangkit/bangkit${i + 1}.webp`,
    ),
  },
  {
    year: "jan 2025",
    end: null,
    title: "AI-SE Winter School",
    org: "Doha, Qatar",
    location: "International",
    role: "Participant · Guest Speaker",
    type: "experience",
    tags: ["LLMs", "Transformers", "AI Ethics"],
    desc: "International winter school on AI and Software Engineering. Invited as guest speaker at TDMRC USK podcast to share insights.",
    images: Array.from(
      { length: 10 },
      (_, i) =>
        `/assets/image/selected portofolio/winter-school/winter-school${i + 1}.webp`,
    ),
  },
  {
    year: "2025",
    end: null,
    title: "Laboratory Assistant",
    org: "Syiah Kuala University",
    location: "Banda Aceh",
    role: "Software Project — Backend",
    type: "experience",
    tags: ["Node.js", "Django", "TypeScript", "RESTful API"],
    desc: "Mentored 30+ students in backend development. Enabled students to independently build and test RESTful APIs by end of practicum.",
    images: Array.from(
      { length: 4 },
      (_, i) =>
        `/assets/image/selected portofolio/asisten/asisten${i + 1}.webp`,
    ),
  },
];

const TYPE_COLORS: Record<string, string> = {
  education: "#a78bfa",
  experience: "var(--accent-color)",
};

export default function Journey({ isDark = true }: JourneyProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const theme = isDark
    ? {
        bg: "#0D0D0D",
        bgCard: "#111111",
        bgCardHover: "#161b22",
        border: "#1e1e1e",
        text: "#C8C8C8",
        textMuted: "#555555",
        textDim: "#2a2a2a",
        scanline: "rgba(255,255,255,0.008)",
      }
    : {
        bg: "#F5F0E8",
        bgCard: "#EDE8DC",
        bgCardHover: "#E5DECE",
        border: "#C8BFA8",
        text: "#1A1A1A",
        textMuted: "#7A7060",
        textDim: "#C8BFA8",
        scanline: "rgba(0,0,0,0.008)",
      };

  const accent = "var(--accent-color)";

  // Mouse drag scroll
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    scrollLeft.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };
  const onMouseUp = () => {
    isDragging.current = false;
  };

  const scrollBy = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section
      id="journey"
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
      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${theme.scanline} 2px, ${theme.scanline} 4px)`,
          pointerEvents: "none",
        }}
      />

      {/* Section header */}
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
        <div className="animate-on-scroll" style={{ marginBottom: 48 }}>
          <div
            style={{
              fontSize: 11,
              color: theme.textMuted,
              letterSpacing: "0.12em",
              marginBottom: 8,
            }}
          >
            <span style={{ color: accent }}>$ </span>cat journey.log
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
            JOURNEY
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
            Education and experience — drag or use arrows to explore.
          </p>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
            {[
              { label: "experience", color: "var(--accent-color)" },
              { label: "education", color: "#a78bfa" },
            ].map((l) => (
              <div
                key={l.label}
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    background: l.color,
                    borderRadius: "50%",
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    color: theme.textMuted,
                    letterSpacing: "0.08em",
                  }}
                >
                  {l.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll track — full width */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Arrow buttons */}
        {["left", "right"].map((dir) => (
          <button
            key={dir}
            onClick={() => scrollBy(dir === "left" ? -1 : 1)}
            style={{
              position: "absolute",
              [dir]: dir === "left" ? 12 : 12,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: isDark
                ? "rgba(13,13,13,0.9)"
                : "rgba(245,240,232,0.9)",
              border: `1px solid ${theme.border}`,
              color: theme.textMuted,
              width: 36,
              height: 36,
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              fontFamily: "monospace",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--accent-color)";
              (e.currentTarget as HTMLButtonElement).style.color =
                "var(--accent-color)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                theme.border;
              (e.currentTarget as HTMLButtonElement).style.color =
                theme.textMuted;
            }}
          >
            {dir === "left" ? "‹" : "›"}
          </button>
        ))}

        {/* Connector line */}
        <div
          style={{
            position: "absolute",
            top: "calc(50% - 60px)",
            left: 0,
            right: 0,
            height: 1,
            background: `linear-gradient(to right, transparent, ${theme.border} 60px, ${theme.border} calc(100% - 60px), transparent)`,
            zIndex: 0,
          }}
        />

        {/* Scrollable track */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            padding: "40px 80px",
            cursor: isDragging.current ? "grabbing" : "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            userSelect: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {items.map((item, i) => {
            const isActive = activeIdx === i;
            const typeColor = TYPE_COLORS[item.type];

            return (
              <JourneyCard
                key={i}
                item={item}
                index={i}
                isActive={isActive}
                typeColor={typeColor}
                theme={theme}
                isDark={isDark}
                onClick={() => setActiveIdx(isActive ? null : i)}
              />
            );
          })}
        </div>

        {/* Hide scrollbar */}
        <style>{`
          div::-webkit-scrollbar { display: none; }
        `}</style>
      </div>

      {/* Bottom counter */}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontSize: 10,
              color: theme.textMuted,
              letterSpacing: "0.08em",
            }}
          >
            <span style={{ color: accent }}>{items.length}</span> entries ·{" "}
            {items.filter((i) => i.type === "experience").length} experience ·{" "}
            {items.filter((i) => i.type === "education").length} education
          </span>
        </div>
      </div>
    </section>
  );
}

function JourneyCard({
  item,
  index,
  isActive,
  typeColor,
  theme,
  isDark,
  onClick,
}: {
  item: (typeof items)[0];
  index: number;
  isActive: boolean;
  typeColor: string;
  theme: any;
  isDark: boolean;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flexShrink: 0,
        width: 280,
        border: `1px solid ${isActive || isHovered ? typeColor : theme.border}`,
        background: isActive || isHovered ? theme.bgCardHover : theme.bgCard,
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        position: "relative",
        transform: isActive
          ? "translateY(-6px)"
          : isHovered
            ? "translateY(-3px)"
            : "translateY(0)",
        boxShadow:
          isActive || isHovered
            ? `0 12px 32px rgba(23,147,209,0.1), 0 0 0 1px ${typeColor}`
            : "none",
      }}
    >
      {/* Corner bracket */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 18,
          height: 18,
          borderTop: `2px solid ${typeColor}`,
          borderLeft: `2px solid ${typeColor}`,
          opacity: isActive || isHovered ? 1 : 0.4,
          transition: "opacity 0.2s",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 18,
          height: 18,
          borderBottom: `2px solid ${typeColor}`,
          borderRight: `2px solid ${typeColor}`,
          opacity: isActive || isHovered ? 0.7 : 0,
          transition: "opacity 0.2s",
        }}
      />

      <FlashcardImage
        images={item.images}
        isHovered={isHovered}
        isActive={isActive}
        isDark={isDark}
        theme={theme}
        alt={item.title}
      />

      {/* Type badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontSize: 9,
            color: typeColor,
            border: `1px solid ${typeColor}`,
            padding: "2px 7px",
            letterSpacing: "0.1em",
            opacity: 0.8,
          }}
        >
          {item.type.toUpperCase()}
        </span>
        <span
          style={{
            fontSize: 10,
            color: theme.textMuted,
            letterSpacing: "0.06em",
          }}
        >
          {item.year}
          {item.end ? ` — ${item.end}` : ""}
        </span>
      </div>

      {/* Title + org */}
      <h3
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: theme.text,
          margin: "0 0 4px",
          letterSpacing: "0.02em",
          lineHeight: 1.3,
        }}
      >
        {item.title}
      </h3>
      <div
        style={{
          fontSize: 11,
          color: typeColor,
          letterSpacing: "0.04em",
          marginBottom: 4,
        }}
      >
        {item.org}
      </div>
      <div
        style={{
          fontSize: 10,
          color: theme.textMuted,
          letterSpacing: "0.04em",
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <i className="fas fa-map-marker-alt" style={{ fontSize: 9 }} />
        {item.location}
      </div>

      {/* Role */}
      <div
        style={{
          fontSize: 10,
          color: theme.textMuted,
          background: isDark ? "#0a0a0a" : "#E0DAD0",
          border: `1px solid ${theme.border}`,
          padding: "3px 8px",
          display: "inline-block",
          letterSpacing: "0.06em",
          marginBottom: 14,
        }}
      >
        {item.role}
      </div>

      {/* Expandable desc */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: isActive ? 400 : 0, // Increased max-height for safety
          transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
          opacity: isActive ? 1 : 0,
        }}
      >
        <p
          style={{
            fontSize: 11,
            color: theme.textMuted,
            lineHeight: 1.7,
            margin: "0 0 14px",
            letterSpacing: "0.02em",
          }}
        >
          {item.desc}
        </p>
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginTop: 4,
        }}
      >
        {item.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 9,
              color: theme.textMuted,
              border: `1px solid ${theme.border}`,
              padding: "2px 7px",
              letterSpacing: "0.05em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Expand hint */}
      <div
        style={{
          marginTop: 14,
          fontSize: 9,
          color: isActive ? typeColor : theme.textDim,
          letterSpacing: "0.08em",
          display: "flex",
          alignItems: "center",
          gap: 4,
          transition: "color 0.2s",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
          }}
        >
          ▼
        </span>
        {isActive ? "collapse" : "expand"}
      </div>
    </div>
  );
}
