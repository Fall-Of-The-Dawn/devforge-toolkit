import { useState, useEffect, useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import Footer from "./Footer";

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
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      }, 0);
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
    <span className="font-sans">
      {displayText}
      <span className="inline-block w-[2px] h-[1em] bg-[var(--accent)] ml-0.5 align-middle" style={{ animation: "blink 1s step-end infinite" }} />
    </span>
  );
}

const TOOL_NAME_MAP = {
  "generator": "generator",
  "mock data": "generator",
  "mock data generator": "generator",
  "json formatter": "json-formatter",
  "json": "json-formatter",
  "text diff": "text-diff",
  "diff": "text-diff",
  "regex": "regex-tester",
  "regex tester": "regex-tester",
  "css converter": "css-converter",
  "css": "css-converter",
  "tailwind": "css-converter",
  "css to tailwind": "css-converter",
  "base64": "base64",
  "base64 encoder": "base64",
  "url encoder": "url-encoder",
  "url": "url-encoder",
  "jwt": "jwt-decoder",
  "jwt decoder": "jwt-decoder",
  "css minifier": "css-minifier",
  "minifier": "css-minifier",
  "gradient": "gradient",
  "gradient generator": "gradient",
  "box shadow": "box-shadow",
  "shadow": "box-shadow",
  "layout": "layout",
  "layout playground": "layout",
  "flexbox": "layout",
  "color contrast": "color-contrast",
  "contrast": "color-contrast",
  "html preview": "html-preview",
  "html": "html-preview",
  "markdown": "markdown",
  "markdown preview": "markdown",
  "qr code": "qr-code",
  "qr": "qr-code",
  "qr code generator": "qr-code",
  "password": "password",
  "password generator": "password",
  "uuid": "uuid",
  "uuid generator": "uuid",
  "timestamp": "timestamp",
  "timestamp converter": "timestamp",
  "lorem": "lorem",
  "lorem ipsum": "lorem",
  "tokenizer": "tokenizer",
  "token": "tokenizer",
};

const TOOL_LIST = [
  "mock data generator", "json formatter", "text diff", "regex tester",
  "css converter", "base64 encoder", "url encoder", "jwt decoder",
  "css minifier", "gradient generator", "box shadow", "layout playground",
  "color contrast", "html preview", "markdown preview", "qr code generator",
  "password generator", "uuid generator", "timestamp converter", "lorem ipsum", "tokenizer",
];

function Toast({ message, onClose, isLight }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="px-5 py-3 rounded-lg border border-[var(--accent)]/30 bg-[#111111] text-sm shadow-lg flex items-center gap-2"
        style={{ color: isLight ? "#374151" : "#d1d5db" }}>
        <svg className="w-4 h-4 text-[var(--accent)] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}

const TerminalDemo = forwardRef(function TerminalDemo({ isLight, setActiveTool }, ref) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const typeHelp = () => {
    const cmd = "help";
    let i = 0;
    setInput("");
    const iv = setInterval(() => {
      if (i <= cmd.length) {
        setInput(cmd.substring(0, i));
        i++;
      } else {
        clearInterval(iv);
        setTimeout(() => {
          setHistory((prev) => [
            ...prev,
            { type: "input", text: cmd },
            { type: "success", text: "Available commands:" },
            { type: "output", text: "  open <tool>    — Switch to a tool" },
            { type: "output", text: "  list            — Show all tools" },
            { type: "output", text: "  help            — Show this message" },
            { type: "output", text: "  clear           — Clear terminal" },
            { type: "output", text: "  home            — Go to home page" },
            { type: "output", text: "" },
          ]);
          setInput("");
          setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 50);
        }, 200);
      }
    }, 50);
  };

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    typeHelp,
  }));

  // Auto-type onboarding demo on mount
  useEffect(() => {
    const demoCommand = "omnistack mock-data --users 3 --format json";
    const demoOutput = `{
  "users": [
    { "id": 1, "name": "Sarah Chen", "email": "sarah@example.com", "role": "developer" },
    { "id": 2, "name": "Marcus Johnson", "email": "marcus@example.com", "role": "designer" },
    { "id": 3, "name": "Aisha Patel", "email": "aisha@example.com", "role": "pm" }
  ],
  "total": 3
}`;

    let step = 0;
    const welcomeLines = [
      { type: "output", text: "Welcome to OmniStack CLI v1.0" },
      { type: "output", text: "" },
    ];

    const typeInterval = setInterval(() => {
      if (step < welcomeLines.length) {
        const line = welcomeLines[step];
        step++;
        setHistory((prev) => [...prev, line]);
      } else {
        clearInterval(typeInterval);
        // Start auto-typing the demo command
        let charIndex = 0;
        const typeCmdInterval = setInterval(() => {
          if (charIndex <= demoCommand.length) {
            setInput(demoCommand.substring(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeCmdInterval);
            setTimeout(() => {
              setHistory((prev) => [
                ...prev,
                { type: "input", text: demoCommand },
                { type: "success", text: "3 users generated successfully" },
                { type: "json", text: demoOutput },
                { type: "output", text: "" },
                { type: "output", text: "Type 'help' for available commands." },
              ]);
              setInput("");
            }, 400);
          }
        }, 35);
      }
    }, 600);

    return () => {
      clearInterval(typeInterval);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: "input", text: cmd }];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    if (trimmed === "help") {
      newHistory.push({
        type: "output",
        text: [
          "Available commands:",
          "  open <tool>    — Open a tool (e.g. 'open json formatter')",
          "  list           — List all available tools",
          "  clear          — Clear terminal",
          "  home           — Go back to home",
          "  help           — Show this help message",
        ].join("\n"),
      });
    } else if (trimmed === "list") {
      newHistory.push({
        type: "output",
        text: "Available tools:\n" + TOOL_LIST.map((t, i) => `  ${String(i + 1).padStart(2, " ")}. ${t}`).join("\n"),
      });
    } else if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    } else if (trimmed === "home") {
      newHistory.push({ type: "output", text: "Navigating to home..." });
      setHistory(newHistory);
      setTimeout(() => setActiveTool("home"), 300);
      return;
    } else if (trimmed.startsWith("open ")) {
      const toolQuery = trimmed.slice(5).trim();
      const toolId = TOOL_NAME_MAP[toolQuery];

      if (toolId) {
        const toolLabel = TOOL_LIST.find((t) => {
          const mapped = TOOL_NAME_MAP[t];
          return mapped === toolId;
        }) || toolQuery;
        newHistory.push({
          type: "success",
          text: `Opening ${toolLabel}...`,
        });
        setHistory(newHistory);
        setTimeout(() => setActiveTool(toolId), 300);
        return;
      } else {
        newHistory.push({
          type: "error",
          text: `Tool not found: '${toolQuery}'. Type 'list' to see available tools.`,
        });
      }
    } else {
      newHistory.push({
        type: "error",
        text: `Command not found: '${trimmed}'. Type 'help' for available commands.`,
      });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    }
  };

  return (
    <div className="w-full">
        <div
          className={`rounded-xl border overflow-hidden cursor-text ${isLight ? "bg-[#fafafa] border-[#e5e7eb] shadow-lg shadow-black/5" : "bg-[#0d0f14] border-[#1f2937] shadow-2xl shadow-black/30"}`}
          onClick={() => inputRef.current?.focus()}
        >
          {/* Terminal top bar */}
          <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${isLight ? "bg-[#f3f4f6] border-[#e5e7eb]" : "bg-[#111318] border-[#1f2937]"}`}>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-[#eab308]" />
              <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
            </div>
            <span className={`text-[11px] ml-2 font-mono ${isLight ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>~/omnistack</span>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className={`p-4 font-mono text-[13px] leading-relaxed max-h-[240px] overflow-y-auto scrollbar-hide ${isLight ? "text-[#374151]" : "text-[#d1d5db]"}`}
          >
            {history.filter(Boolean).map((entry, i) => (
              <div key={i} className="whitespace-pre-wrap mb-0.5">
                {entry.type === "input" && (
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#22c55e" }}>$</span>
                    <span>{entry.text}</span>
                  </div>
                )}
                {entry.type === "output" && (
                  <div style={{ color: isLight ? "#6b7280" : "#6b7280" }}>{entry.text}</div>
                )}
                {entry.type === "success" && (
                  <div style={{ color: "#22c55e" }}>{entry.text}</div>
                )}
                {entry.type === "error" && (
                  <div style={{ color: "#ef4444" }}>{entry.text}</div>
                )}
                {entry.type === "json" && (
                  <div className="text-xs">
                    {entry.text.split("\n").map((line, j) => {
                      const highlighted = line
                        .replace(/("[\w]+")\s*:/g, '<span style="color:#FF6B6B">$1</span>:')
                        .replace(/:\s*(".*?")/g, ': <span style="color:#a5d6a7">$1</span>')
                        .replace(/:\s*(\d+)/g, ': <span style="color:#82aaff">$1</span>');
                      return (
                        <div key={j} dangerouslySetInnerHTML={{ __html: highlighted }} />
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Current input line */}
            <div className="flex items-center gap-2">
              <span style={{ color: "#22c55e" }}>$</span>
              <span className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none w-full font-mono text-[13px] caret-transparent"
                  style={{ color: isLight ? "#374151" : "#d1d5db" }}
                  autoFocus
                />
                {/* Custom cursor */}
                <span
                  className="absolute top-0 pointer-events-none"
                  style={{
                    left: `${input.length * 7.8}px`,
                    width: "2px",
                    height: "16px",
                    backgroundColor: isLight ? "#1a1a1a" : "#e8e8e8",
                    opacity: cursorVisible ? 1 : 0,
                    transition: "opacity 0.1s",
                  }}
                />
              </span>
            </div>
          </div>
        </div>
    </div>
  );
});

export default function Home({ setActiveTool, isLight }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const terminalRef = useRef(null);
  const mobileTerminalRef = useRef(null);
  const [toast, setToast] = useState(null);
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
    {
      id: "tokenizer", category: "converter",
      title: "Text Tokenizer",
      description: "Count tokens, words, characters, and lines for LLM prompt limits.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      ),
    },
  ], []);

  const filteredTools = activeCategory === "all"
    ? tools
    : tools.filter((t) => t.category === activeCategory);

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
      {/* Hero — Split Layout */}
      <section className="relative px-5 pt-16 pb-10 md:pt-20 md:pb-12">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${isLight ? "#1a1a1a" : "#888888"} 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        {/* Coral glow behind hero */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${isLight ? "rgba(229,91,91,0.08)" : "rgba(255,107,107,0.06)"}, transparent 70%)`,
          }}
        />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Left: Copy & Actions */}
            <div className="text-left">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 ${isLight ? "bg-[#fff0f0] text-[#c53a3a] border border-[#e0d0d0]" : "bg-[rgba(255,107,107,0.08)] text-[#FF6B6B] border border-[rgba(255,107,107,0.15)]"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" style={{ animation: "dotPulse 2s ease-in-out infinite" }} />
                21 tools · all client-side
              </div>

              <h1 style={{ color: isLight ? "#1a1a1a" : "#e8e8e8" }} className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black tracking-tight mb-4 leading-[1.08]">
                The only dev toolkit
                <br />
                <span className="text-accent relative inline-block">
                  you need.
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                    <path d="M2 5.5C35 2.5 75 1.5 100 3.5C125 5.5 165 7 198 3.5" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                  </svg>
                </span>
              </h1>

              <div className="text-lg md:text-xl min-h-[2rem] mb-5" style={{ color: isLight ? "#555555" : "#888888" }}>
                <Typewriter />
              </div>

              <p style={{ color: isLight ? "#555555" : "#888888" }} className="text-sm max-w-md mb-6 leading-relaxed">
                21 client-side utilities to skip the tedious work. No servers. No sign-up. Fully private.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => {
                    document.getElementById("tool-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-2.5 text-sm font-semibold rounded-lg bg-[var(--accent)] text-white hover:brightness-110 transition-all duration-200 shadow-lg shadow-[var(--accent)]/20 cursor-pointer"
                >
                  Explore Tools
                </button>
                <button
                  onClick={() => {
                    document.getElementById("terminal-demo")?.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => {
                      const ref = window.innerWidth >= 768 ? terminalRef : mobileTerminalRef;
                      ref.current?.focus();
                      ref.current?.typeHelp();
                    }, 300);
                    setToast({ text: "Terminal active — try typing help", duration: 4000 });
                  }}
                  className={`px-6 py-2.5 text-sm font-semibold rounded-lg border transition-all duration-200 cursor-pointer ${
                    isLight
                      ? "border-[#d1d5db] text-[#374151] hover:border-[#FF6B6B] hover:text-[#FF6B6B]"
                      : "border-[#374151] text-[#d1d5db] hover:border-[#FF6B6B] hover:text-[#FF6B6B]"
                  }`}
                >
                  Try CLI
                </button>
              </div>

              <div className="flex items-center gap-6 text-xs">
                {[
                  { value: "21", label: "Tools" },
                  { value: "0", label: "Servers" },
                  { value: "100%", label: "Private" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div style={{ color: isLight ? "#1a1a1a" : "#e8e8e8" }} className="text-lg font-bold font-display">{stat.value}</div>
                    <div style={{ color: isLight ? "#888888" : "#555555" }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Terminal */}
            <div className="hidden md:block">
              <TerminalDemo ref={terminalRef} isLight={isLight} setActiveTool={setActiveTool} />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: Terminal below hero (visible only on small screens) */}
      <div className="md:hidden px-5 pb-8" id="terminal-demo">
        <TerminalDemo ref={mobileTerminalRef} isLight={isLight} setActiveTool={setActiveTool} />
      </div>

      {/* Tool Grid */}
      <section id="tool-grid" className="px-5 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Category filters */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? isLight
                      ? "bg-[#111827] text-white border-[#111827]"
                      : "bg-[rgba(255,107,107,0.1)] text-[#FF6B6B] border-[rgba(255,107,107,0.2)]"
                    : isLight
                      ? "bg-white text-[#6b7280] border-[#e5e7eb] hover:border-[#d1d5db] hover:text-[#374151]"
                      : "bg-transparent text-[#6b7280] border-[#1f2937] hover:border-[#374151] hover:text-[#9ca3af]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger-children">
            {filteredTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`animate-slide-up text-left p-6 rounded-2xl border transition-all duration-300 cursor-pointer group relative overflow-hidden ${
                  isLight
                    ? "bg-white border-[#e8e6e1] hover:border-[#E55B5B]/30 hover:shadow-xl hover:shadow-[#E55B5B]/8 hover:-translate-y-1"
                    : "bg-gradient-to-br from-[#0d1017] to-[#0a0d12] border-[#1e2230] hover:border-[rgba(255,107,107,0.25)] hover:shadow-xl hover:shadow-[rgba(255,107,107,0.08)] hover:-translate-y-1"
                }`}
              >
                {/* Subtle gradient overlay on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  isLight
                    ? "bg-gradient-to-br from-[#fff5f5]/50 to-transparent"
                    : "bg-gradient-to-br from-[rgba(255,107,107,0.03)] to-transparent"
                }`} />

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isLight
                    ? "bg-gradient-to-r from-transparent via-[#E55B5B] to-transparent"
                    : "bg-gradient-to-r from-transparent via-[#FF6B6B] to-transparent"
                }`} />

                <div className="relative z-10">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                    isLight
                      ? "bg-[#fff5f5] text-[#E55B5B] group-hover:bg-[#E55B5B] group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#E55B5B]/20"
                      : "bg-[rgba(255,107,107,0.06)] text-[#FF6B6B] group-hover:bg-[#FF6B6B] group-hover:text-[#0a0d12] group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[rgba(255,107,107,0.2)]"
                  }`}>
                    {tool.icon}
                  </div>
                  <p className={`text-[15px] font-semibold mb-2 tracking-tight ${isLight ? "text-[#1a1d26]" : "text-[#e8e8e8]"} group-hover:text-[var(--accent)] transition-colors duration-200`}>
                    {tool.title}
                  </p>
                  <p className={`text-[13px] leading-relaxed ${isLight ? "text-[#6b7280]" : "text-[#6b7280]"}`}>
                    {tool.description}
                  </p>
                </div>

                {/* Arrow indicator on hover */}
                <div className={`absolute bottom-5 right-5 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 ${
                  isLight
                    ? "bg-[#fff5f5] text-[#E55B5B]"
                    : "bg-[rgba(255,107,107,0.08)] text-[#FF6B6B]"
                }`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={`px-5 py-20 ${isLight ? "bg-[#f8f7f4]" : "bg-[#0d0f14]"}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className={`text-xs font-semibold tracking-widest uppercase mb-3 block ${isLight ? "text-[#E55B5B]" : "text-[#FF6B6B]"}`}>How it works</span>
            <h2 className={`text-3xl md:text-4xl font-black tracking-tight font-display ${isLight ? "text-[#111827]" : "text-[#f9fafb]"}`}>
              Three steps. Zero friction.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Animated dashed connecting line (desktop) */}
            <div className={`hidden md:block absolute top-10 left-[15%] right-[15%] h-[2px] ${isLight ? "bg-[#e5e7eb]" : "bg-[#1f2937]"}`}>
              <div className={`absolute inset-0 ${isLight ? "bg-[#E55B5B]" : "bg-[#FF6B6B]"}`} style={{ width: "30%", animation: "shimmer 3s ease-in-out infinite" }} />
            </div>

            {[
              { step: "01", title: "Pick a tool", desc: "Choose from 21 developer tools — data generators, converters, editors, and design utilities." },
              { step: "02", title: "Enter your data", desc: "Type, paste, or configure inputs. Every tool has helpful defaults and smart validation." },
              { step: "03", title: "Copy or download", desc: "Get instant results. Copy to clipboard, download as a file, or export in multiple formats." },
            ].map((item, i) => (
              <div key={item.step} className={`text-center relative ${i === 1 ? "md:mt-8" : ""}`}>
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center text-lg font-bold font-display relative z-10 transition-all duration-300 ${
                  isLight
                    ? "bg-white border-2 border-[#e5e7eb] text-[#E55B5B] shadow-lg shadow-black/5"
                    : "bg-gradient-to-br from-[#1a1f2e] to-[#111827] border-2 border-[#2d3748] text-[#FF6B6B] shadow-lg shadow-black/20"
                }`}>
                  {item.step}
                </div>
                <h3 className={`text-lg font-bold mb-3 ${isLight ? "text-[#111827]" : "text-[#f9fafb]"}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed max-w-xs mx-auto ${isLight ? "text-[#6b7280]" : "text-[#9ca3af]"}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why OmniStack */}
      <section className={`px-5 py-20 ${isLight ? "bg-white" : "bg-[#0a0d12]"}`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className={`text-xs font-semibold tracking-widest uppercase mb-3 block ${isLight ? "text-[#E55B5B]" : "text-[#FF6B6B]"}`}>Why OmniStack</span>
            <h2 className={`text-3xl md:text-4xl font-black tracking-tight font-display ${isLight ? "text-[#111827]" : "text-[#f9fafb]"}`}>
              Built for developers who value their time
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                ),
                title: "100% private",
                desc: "Everything runs in your browser. No data is ever sent to any server.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                ),
                title: "Instant results",
                desc: "No loading spinners. Every tool processes your data instantly in-browser.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
                title: "No sign-up",
                desc: "Zero friction. Open OmniStack and start working immediately.",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
                title: "Works everywhere",
                desc: "Responsive on mobile, tablet, and desktop. No installation required.",
              },
            ].map((item) => (
              <div key={item.title} className={`flex items-start gap-4 p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                isLight 
                  ? "bg-[#f9fafb] border-[#e5e7eb] hover:border-[#d1d5db] hover:shadow-lg hover:shadow-black/5" 
                  : "bg-gradient-to-br from-[#111827] to-[#0d1017] border-[#1f2937] hover:border-[#374151] hover:shadow-lg hover:shadow-black/20"
              }`}>
                <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${
                  isLight ? "bg-[#fff5f5] text-[#E55B5B]" : "bg-[rgba(255,107,107,0.08)] text-[#FF6B6B]"
                }`}>
                  {item.icon}
                </div>
                <div>
                  <p className={`text-[15px] font-bold mb-1.5 ${isLight ? "text-[#111827]" : "text-[#f9fafb]"}`}>{item.title}</p>
                  <p className={`text-[13px] leading-relaxed ${isLight ? "text-[#6b7280]" : "text-[#9ca3af]"}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer isLight={isLight} setActiveTool={setActiveTool} />

      {/* Toast notification */}
      {toast && (
        <Toast message={toast.text} onClose={() => setToast(null)} isLight={isLight} />
      )}
    </div>
  );
}
