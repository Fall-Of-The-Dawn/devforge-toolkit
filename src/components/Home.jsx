import { useState, useEffect, useRef, useMemo } from "react";

const CATEGORIES = [
  { id: "all", label: "All tools" },
  { id: "data", label: "Data" },
  { id: "converter", label: "Converters" },
  { id: "design", label: "Design" },
  { id: "editor", label: "Editors" },
  { id: "generator", label: "Generators" },
];

const TYPEWRITER_PHRASES = [
  "Mock data in seconds",
  "Convert CSS to Tailwind",
  "Diff text like git",
  "Format any JSON",
  "Decode JWT tokens",
  "Build gradients visually",
  "Generate QR codes",
  "Check color contrast",
];

function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    let timeout;

    if (!isDeleting && displayText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentPhrase.substring(0, displayText.length - 1)
              : currentPhrase.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? 30 : 60
      );
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <span className="font-display">
      {displayText}
      <span className="inline-block w-[2px] h-[1em] bg-[var(--accent)] ml-0.5 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
    </span>
  );
}

export default function Home({ setActiveTool, isLight }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const tools = useMemo(() => [
    {
      id: "generator", category: "data",
      title: "Mock Data Generator",
      description: "Generate realistic fake data in JSON, CSV, or SQL. Choose from 10+ presets or build custom schemas.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      ),
    },
    {
      id: "json-formatter", category: "editor",
      title: "JSON Formatter",
      description: "Pretty-print, minify, and validate JSON with syntax highlighting and indentation options.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M5 16l-1 4 4-1" />
          <path d="M19 12l2 2-2 2" />
        </svg>
      ),
    },
    {
      id: "text-diff", category: "editor",
      title: "Text Diff",
      description: "Compare two texts side by side with git-diff style highlighting and line numbers.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v18" />
          <path d="M3 12h18" />
        </svg>
      ),
    },
    {
      id: "regex-tester", category: "editor",
      title: "Regex Tester",
      description: "Test regular expressions with real-time match highlighting and flag toggles.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      ),
    },
    {
      id: "css-converter", category: "converter",
      title: "CSS ↔ Tailwind",
      description: "Convert CSS to Tailwind utility classes or reverse. Supports 50+ properties.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      id: "base64", category: "converter",
      title: "Base64 Encoder",
      description: "Encode and decode Base64 strings instantly with swap and copy.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 20H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v2" />
          <circle cx="18" cy="16" r="4" />
          <path d="M18 12v8" />
          <path d="M16 14h4" />
        </svg>
      ),
    },
    {
      id: "url-encoder", category: "converter",
      title: "URL Encoder",
      description: "Encode and decode URLs with toggle between encodeURI and encodeURIComponent.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
    {
      id: "jwt-decoder", category: "converter",
      title: "JWT Decoder",
      description: "Decode and inspect JWT tokens with header, payload, and signature breakdown.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      id: "css-minifier", category: "converter",
      title: "CSS Minifier",
      description: "Minify CSS to reduce file size or beautify for readability. Shows savings.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      ),
    },
    {
      id: "gradient", category: "design",
      title: "Gradient Generator",
      description: "Build gradients visually with draggable color stops and live CSS output.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20" fill="currentColor" opacity="0.2" />
        </svg>
      ),
    },
    {
      id: "box-shadow", category: "design",
      title: "Box Shadow",
      description: "Create multi-layer box shadows with visual builder and CSS/Tailwind output.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <rect x="7" y="7" width="14" height="14" rx="2" opacity="0.3" />
        </svg>
      ),
    },
    {
      id: "layout", category: "design",
      title: "Layout Playground",
      description: "Visual Flexbox and Grid builder with live Tailwind and CSS output.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: "color-contrast", category: "design",
      title: "Color Contrast",
      description: "Check WCAG 2.1 contrast compliance with AA and AAA ratings.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" opacity="0.2" />
        </svg>
      ),
    },
    {
      id: "html-preview", category: "editor",
      title: "HTML Preview",
      description: "Live side-by-side HTML/CSS/JS editor with instant preview and alerts.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      ),
    },
    {
      id: "markdown", category: "editor",
      title: "Markdown Preview",
      description: "Write Markdown with live HTML preview. Supports tables, code blocks, and links.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7V4h16v3" />
          <path d="M9 20h6" />
          <path d="M12 4v16" />
        </svg>
      ),
    },
    {
      id: "qr-code", category: "generator",
      title: "QR Code Generator",
      description: "Generate downloadable QR codes with customizable colors, size, and error correction.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="8" height="8" rx="1" />
          <rect x="14" y="2" width="8" height="8" rx="1" />
          <rect x="2" y="14" width="8" height="8" rx="1" />
          <rect x="14" y="14" width="4" height="4" />
        </svg>
      ),
    },
    {
      id: "password", category: "generator",
      title: "Password Generator",
      description: "Generate secure passwords with entropy analysis and crack time estimation.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      ),
    },
    {
      id: "uuid", category: "generator",
      title: "UUID Generator",
      description: "Generate v4 UUIDs in standard, no-dash, or uppercase formats. Bulk up to 50.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      id: "timestamp", category: "generator",
      title: "Timestamp Converter",
      description: "Convert between Unix timestamps, ISO 8601, and relative time with timezone support.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
    },
    {
      id: "lorem", category: "generator",
      title: "Lorem Ipsum",
      description: "Generate placeholder text by paragraphs, sentences, or words up to 500.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7V4h16v3" />
          <path d="M9 20h6" />
          <path d="M12 4v16" />
        </svg>
      ),
    },
  ], []);

  const filteredTools = activeCategory === "all"
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      {/* Hero */}
      <section className="relative px-5 pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, ${isLight ? "#1a1d26" : "#c8ccd4"} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${isLight ? "rgba(200,125,10,0.15)" : "rgba(240,165,0,0.12)"}, transparent 70%)`,
          }}
        />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="drop-shadow-lg">
              <path d="M12 14l6-6 2 2-6 6 6 6-2 2-6-6z" fill={isLight ? "#c87d0a" : "#f0a500"} />
              <path d="M36 14l-6-6-2 2 6 6-6 6 2 2 6-6z" fill={isLight ? "#c87d0a" : "#f0a500"} />
              <circle cx="24" cy="24" r="4" fill={isLight ? "#c87d0a" : "#f0a500"} opacity="0.5" />
            </svg>
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 ${isLight ? "bg-[#fff8ed] text-[#c87d0a] border border-[#f0dfc0]" : "bg-[rgba(240,165,0,0.08)] text-[#f0a500] border border-[rgba(240,165,0,0.15)]"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" style={{ animation: "dotPulse 2s ease-in-out infinite" }} />
            21 tools · all client-side
          </div>

          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-[1.1] ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"}`}>
            Build faster with
            <br />
            <span className="text-accent">every tool in one place</span>
          </h1>

          <div className={`text-lg md:text-xl h-8 mb-6 ${isLight ? "text-[#5a5f6e]" : "text-[#505868]"}`}>
            <Typewriter />
          </div>

          <p className={`text-sm max-w-lg mx-auto mb-8 leading-relaxed ${isLight ? "text-[#5a5f6e]" : "text-[#505868]"}`}>
            Mock data, CSS conversion, JSON formatting, encoding, layout builders, QR codes, and more — every tool runs in your browser. No server. No sign-up. Fully private.
          </p>

          <div className="flex items-center justify-center gap-6 text-xs">
            {[
              { value: "21", label: "Tools" },
              { value: "0", label: "Servers" },
              { value: "100%", label: "Private" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-lg font-bold font-display ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"}`}>{stat.value}</div>
                <div className={isLight ? "text-[#9ca3b0]" : "text-[#505868]"}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="px-5 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Category filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? isLight
                      ? "bg-[#1a1d26] text-[#f7f6f3] border-[#1a1d26]"
                      : "bg-[#e2e5eb] text-[#0c0e14] border-[#e2e5eb]"
                    : isLight
                      ? "bg-transparent text-[#5a5f6e] border-[#e2e0da] hover:border-[#d0cec8] hover:text-[#1a1d26]"
                      : "bg-transparent text-[#505868] border-[#1c2030] hover:border-[#2a3045] hover:text-[#c8ccd4]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 stagger-children">
            {filteredTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`animate-slide-up text-left p-5 rounded-xl border transition-all duration-200 cursor-pointer group relative ${
                  isLight
                    ? "bg-white border-[#e2e0da] hover:border-[#c87d0a]/40 hover:shadow-lg hover:shadow-[#c87d0a]/5"
                    : "bg-[#12151e] border-[#1c2030] hover:border-[rgba(240,165,0,0.3)] hover:shadow-lg hover:shadow-[rgba(240,165,0,0.05)]"
                }`}
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                  isLight
                    ? "bg-[#fff8ed] text-[#c87d0a] group-hover:bg-[#c87d0a] group-hover:text-white"
                    : "bg-[rgba(240,165,0,0.08)] text-[#f0a500] group-hover:bg-[#f0a500] group-hover:text-[#0c0e14]"
                }`}>
                  {tool.icon}
                </div>
                <h3 className={`text-sm font-semibold mb-1.5 ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"} group-hover:text-accent transition-colors`}>
                  {tool.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isLight ? "text-[#5a5f6e]" : "text-[#505868]"}`}>
                  {tool.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={`px-5 py-16 ${isLight ? "bg-[#f0efe9]" : "bg-[#0a0c12]"}`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-black tracking-tight text-center mb-12 font-display ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"}`}>
            Three steps. Zero friction.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop) */}
            <div className={`hidden md:block absolute top-8 left-[20%] right-[20%] h-px ${isLight ? "bg-[#e2e0da]" : "bg-[#1c2030]"}`} />

            {[
              { step: "01", title: "Pick a tool", desc: "Choose from 21 developer tools — data generators, converters, editors, and design utilities." },
              { step: "02", title: "Enter your data", desc: "Type, paste, or configure inputs. Every tool has helpful defaults and smart validation." },
              { step: "03", title: "Copy or download", desc: "Get instant results. Copy to clipboard, download as a file, or export in multiple formats." },
            ].map((item) => (
              <div key={item.step} className="text-center relative">
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center text-lg font-bold font-display relative z-10 ${
                  isLight
                    ? "bg-white border border-[#e2e0da] text-[#c87d0a]"
                    : "bg-[#12151e] border border-[#1c2030] text-[#f0a500]"
                }`}>
                  {item.step}
                </div>
                <h3 className={`text-base font-semibold mb-2 ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed max-w-xs mx-auto ${isLight ? "text-[#5a5f6e]" : "text-[#505868]"}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why OmniStack */}
      <section className="px-5 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-2xl md:text-3xl font-black tracking-tight text-center mb-12 font-display ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"}`}>
            Why developers choose OmniStack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
                title: "100% private",
                desc: "Everything runs in your browser. No data is ever sent to any server.",
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
                title: "Instant results",
                desc: "No loading spinners. Every tool processes your data instantly in-browser.",
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
                title: "No sign-up",
                desc: "Zero friction. Open OmniStack and start working immediately.",
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
                title: "Works everywhere",
                desc: "Responsive on mobile, tablet, and desktop. No installation required.",
              },
            ].map((item) => (
              <div key={item.title} className={`flex items-start gap-4 p-5 rounded-xl border transition-colors ${
                isLight ? "bg-white border-[#e2e0da] hover:border-[#d0cec8]" : "bg-[#12151e] border-[#1c2030] hover:border-[#2a3045]"
              }`}>
                <div className={`w-9 h-9 rounded-lg shrink-0 flex items-center justify-center ${
                  isLight ? "bg-[#fff8ed] text-[#c87d0a]" : "bg-[rgba(240,165,0,0.08)] text-[#f0a500]"
                }`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className={`text-sm font-semibold mb-1 ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"}`}>{item.title}</h3>
                  <p className={`text-xs leading-relaxed ${isLight ? "text-[#5a5f6e]" : "text-[#505868]"}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom line */}
      <div className={`px-5 pb-8 text-center text-xs ${isLight ? "text-[#9ca3b0]" : "text-[#505868]"}`}>
        <p>100% client-side · No data sent to servers · Open source</p>
      </div>
    </div>
  );
}
