import { useState, useRef, useEffect, useMemo } from "react";

const TOOL_LABELS = {
  generator: "Mock Data Generator",
  "json-formatter": "JSON Formatter",
  "text-diff": "Text Diff",
  "regex-tester": "Regex Tester",
  "css-converter": "CSS ↔ Tailwind",
  base64: "Base64 Encoder",
  "url-encoder": "URL Encoder",
  "jwt-decoder": "JWT Decoder",
  "css-minifier": "CSS Minifier",
  gradient: "Gradient Generator",
  "box-shadow": "Box Shadow",
  layout: "Layout Playground",
  "color-contrast": "Color Contrast",
  "html-preview": "HTML Preview",
  markdown: "Markdown Preview",
  "qr-code": "QR Code Generator",
  password: "Password Generator",
  uuid: "UUID Generator",
  timestamp: "Timestamp Converter",
  lorem: "Lorem Ipsum",
  tokenizer: "Text Tokenizer",
};

const TOOL_CATEGORIES = {
  data: ["generator"],
  converter: ["css-converter", "base64", "url-encoder", "jwt-decoder", "css-minifier", "tokenizer"],
  design: ["gradient", "box-shadow", "layout", "color-contrast"],
  editor: ["json-formatter", "text-diff", "regex-tester", "html-preview", "markdown"],
  generator: ["qr-code", "password", "uuid", "timestamp", "lorem"],
};

export default function ToolSubNav({ activeTool, setActiveTool, isLight }) {
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowSwitcher(false);
        setSearch("");
      }
    };
    if (showSwitcher) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showSwitcher]);

  useEffect(() => {
    if (showSwitcher && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showSwitcher]);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return TOOL_CATEGORIES;
    const q = search.toLowerCase();
    const result = {};
    for (const [cat, toolIds] of Object.entries(TOOL_CATEGORIES)) {
      const matched = toolIds.filter((id) => {
        const label = (TOOL_LABELS[id] || id).toLowerCase();
        return label.includes(q) || id.includes(q);
      });
      if (matched.length > 0) result[cat] = matched;
    }
    return result;
  }, [search]);

  if (!activeTool || activeTool === "home") return null;

  const toolLabel = TOOL_LABELS[activeTool] || activeTool;

  return (
    <div className={`sticky top-[52px] z-30 border-b ${isLight ? "bg-[#f9fafb]/90 border-[#e5e7eb]/80" : "bg-[#0d0f14]/90 border-[#1f2937]/80"} backdrop-blur-xl`}>
      <div className="max-w-6xl mx-auto px-5 h-11 flex items-center justify-between">
        {/* Left: Breadcrumb + Quick Switcher */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTool("home")}
            className={`text-xs font-medium transition-colors hover:text-[var(--accent)] ${isLight ? "text-[#6b7280]" : "text-[#9ca3af]"}`}
          >
            All tools
          </button>
          
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isLight ? "text-[#d1d5db]" : "text-[#374151]"}>
            <polyline points="9 18 15 12 9 6" />
          </svg>

          {/* Tool name as dropdown trigger */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => {
                setShowSwitcher(!showSwitcher);
                setSearch("");
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isLight
                  ? "text-[#111827] bg-white border border-[#e5e7eb] hover:border-[#d1d5db] shadow-sm"
                  : "text-[#f9fafb] bg-[#1a1f2e] border border-[#2d3748] hover:border-[#4a5568] shadow-sm"
              }`}
            >
              {toolLabel}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${showSwitcher ? "rotate-180" : ""}`}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Quick Switcher Dropdown */}
            {showSwitcher && (
              <div className={`absolute top-full left-0 mt-2 w-72 rounded-xl border shadow-2xl z-50 ${
                isLight
                  ? "bg-white border-[#e5e7eb] shadow-black/10"
                  : "bg-[#111827] border-[#2d3748] shadow-black/40"
              }`}>
                {/* Search input */}
                <div className={`px-3 pt-3 pb-2 border-b ${isLight ? "border-[#e5e7eb]" : "border-[#2d3748]"}`}>
                  <div className="relative">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${isLight ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      ref={searchRef}
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search tools..."
                      className={`w-full pl-8 pr-3 py-1.5 text-sm rounded-lg border bg-transparent outline-none transition-colors ${
                        isLight
                          ? "border-[#e5e7eb] focus:border-[#d1d5db] text-[#111827] placeholder:text-[#9ca3af]"
                          : "border-[#2d3748] focus:border-[#4a5568] text-[#f9fafb] placeholder:text-[#6b7280]"
                      }`}
                    />
                  </div>
                </div>

                {/* Tool list */}
                <div className="max-h-[320px] overflow-y-auto py-1 scrollbar-hide">
                  {Object.entries(filteredCategories).length === 0 && (
                    <div className={`px-3 py-4 text-sm text-center ${isLight ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>
                      No tools match "{search}"
                    </div>
                  )}
                  {Object.entries(filteredCategories).map(([category, toolIds]) => (
                    <div key={category}>
                      <div className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${isLight ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>
                        {category}
                      </div>
                      {toolIds.map((toolId) => (
                        <button
                          key={toolId}
                          onClick={() => {
                            setActiveTool(toolId);
                            setShowSwitcher(false);
                            setSearch("");
                          }}
                          className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                            activeTool === toolId
                              ? isLight
                                ? "bg-[#fff5f5] text-[#E55B5B] font-medium"
                                : "bg-[rgba(255,107,107,0.08)] text-[#FF6B6B] font-medium"
                              : isLight
                                ? "text-[#374151] hover:bg-[#f9fafb]"
                                : "text-[#d1d5db] hover:bg-[#1a1f2e]"
                          }`}
                        >
                          {TOOL_LABELS[toolId] || toolId}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick actions hint */}
        <div className={`hidden md:flex items-center gap-2 text-xs ${isLight ? "text-[#9ca3af]" : "text-[#6b7280]"}`}>
          <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${isLight ? "bg-[#f3f4f6] text-[#6b7280]" : "bg-[#1f2937] text-[#9ca3af]"}`}>⌘K</kbd>
          <span>Quick switch</span>
        </div>
      </div>
    </div>
  );
}
