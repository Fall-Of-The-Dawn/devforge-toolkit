import { useState, useRef, useEffect, useMemo } from "react";

const NAV_GROUPS = [
  {
    id: "core",
    items: [
      { id: "generator", label: "Dummy Data" },
      { id: "json-formatter", label: "JSON" },
      { id: "regex-tester", label: "Regex" },
    ],
  },
  {
    id: "converters",
    label: "Converters",
    items: [
      { id: "css-converter", label: "CSS ↔ Tailwind" },
      { id: "base64", label: "Base64" },
      { id: "url-encoder", label: "URL Encoder" },
      { id: "jwt-decoder", label: "JWT Decoder" },
    ],
  },
  {
    id: "design",
    label: "Design",
    items: [
      { id: "gradient", label: "Gradient" },
      { id: "box-shadow", label: "Box Shadow" },
      { id: "layout", label: "Layout" },
      { id: "color-contrast", label: "Color Contrast" },
    ],
  },
  {
    id: "editors",
    label: "Editors",
    items: [
      { id: "text-diff", label: "Text Diff" },
      { id: "html-preview", label: "HTML Preview" },
      { id: "markdown", label: "Markdown" },
      { id: "css-minifier", label: "CSS Minifier" },
    ],
  },
  {
    id: "generators",
    label: "Generators",
    items: [
      { id: "lorem", label: "Lorem Ipsum" },
      { id: "qr-code", label: "QR Code" },
      { id: "password", label: "Password" },
      { id: "uuid", label: "UUID" },
      { id: "timestamp", label: "Timestamp" },
    ],
  },
];

const ALL_TOOL_LABELS = {};
NAV_GROUPS.forEach((group) => {
  group.items.forEach((item) => {
    ALL_TOOL_LABELS[item.id] = item.label;
  });
});
ALL_TOOL_LABELS["tokenizer"] = "Text Tokenizer";

const ALL_TOOL_CATEGORIES = {
  data: ["generator"],
  converter: ["css-converter", "base64", "url-encoder", "jwt-decoder", "css-minifier", "tokenizer"],
  design: ["gradient", "box-shadow", "layout", "color-contrast"],
  editor: ["json-formatter", "text-diff", "regex-tester", "html-preview", "markdown"],
  generator: ["qr-code", "password", "uuid", "timestamp", "lorem"],
};

function Dropdown({ group, activeTool, setActiveTool, isLight, mutedText2, activeBtn }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const isActive = group.items.some((item) => item.id === activeTool);
  const activeItem = group.items.find((item) => item.id === activeTool);

  if (!group.label) {
    return group.items.map((item) => (
      <button
        key={item.id}
        onClick={() => setActiveTool(item.id)}
        className={`px-2.5 py-1 text-[13px] font-medium rounded-md transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
          activeTool === item.id
            ? `${activeBtn} border`
            : `${mutedText2} hover:text-current border border-transparent`
        }`}
      >
        {item.label}
      </button>
    ));
  }

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-2.5 py-1 text-[13px] font-medium rounded-md transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
          isActive
            ? `${activeBtn} border`
            : `${mutedText2} hover:text-current border border-transparent`
        }`}
      >
        {activeItem ? activeItem.label : group.label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          className={`absolute top-full left-0 mt-1 min-w-[180px] rounded-lg border py-1.5 shadow-xl z-[100] backdrop-blur-xl saturate-150 ${isLight ? "bg-white/80 border-[#e0e0e0]/50 shadow-black/10" : "bg-[#0c0e14]/80 border-[#1c2030]/50 shadow-black/40"}`}
        >
          {group.items.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTool(item.id); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                activeTool === item.id
                  ? isLight ? "bg-[#fff0f0] text-[#c53a3a]" : "bg-[rgba(255,107,107,0.08)] text-[#FF6B6B]"
                  : isLight ? "text-[#5a5f6e] hover:bg-[#f0efe9]" : "text-[#8891a4] hover:bg-[#1e2333]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ToolSelector({ activeTool, setActiveTool, isLight }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setSearch("");
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return ALL_TOOL_CATEGORIES;
    const q = search.toLowerCase();
    const result = {};
    for (const [cat, toolIds] of Object.entries(ALL_TOOL_CATEGORIES)) {
      const matched = toolIds.filter((id) => {
        const label = (ALL_TOOL_LABELS[id] || id).toLowerCase();
        return label.includes(q) || id.includes(q);
      });
      if (matched.length > 0) result[cat] = matched;
    }
    return result;
  }, [search]);

  const toolLabel = ALL_TOOL_LABELS[activeTool] || activeTool;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => { setOpen(!open); setSearch(""); }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
          isLight
            ? "text-[#111827] bg-white border border-[#e5e7eb] hover:border-[#d1d5db] shadow-sm"
            : "text-[#f9fafb] bg-[#1a1f2e] border border-[#2d3748] hover:border-[#4a5568] shadow-sm"
        }`}
      >
        {toolLabel}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className={`absolute top-full left-0 mt-2 w-72 rounded-xl border shadow-2xl z-50 ${
          isLight
            ? "bg-white border-[#e5e7eb] shadow-black/10"
            : "bg-[#111827] border-[#2d3748] shadow-black/40"
        }`}>
          {/* Search */}
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
                      setOpen(false);
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
                    {ALL_TOOL_LABELS[toolId] || toolId}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({ open, setOpen, activeTool, setActiveTool, isLight }) {
  const [expandedGroup, setExpandedGroup] = useState(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] md:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className={`absolute top-[48px] left-0 right-0 bottom-0 overflow-y-auto backdrop-blur-xl saturate-150 ${isLight ? "bg-[#fafafa]/80" : "bg-[#0c0e14]/80"}`}>
        <div className="p-4 space-y-1">
          {NAV_GROUPS.map((group) => (
            <div key={group.id}>
              <button
                onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isLight ? "text-[#1a1d26] hover:bg-[#f0efe9]" : "text-[#c8ccd4] hover:bg-[#181c28]"
                }`}
              >
                {group.label || "Quick Access"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expandedGroup === group.id ? "rotate-180" : ""}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {expandedGroup === group.id && (
                <div className="pl-3 pb-2 space-y-0.5">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTool(item.id); setOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-md text-[13px] transition-colors ${
                        activeTool === item.id
                          ? isLight ? "bg-[#fff0f0] text-[#c53a3a]" : "bg-[rgba(255,107,107,0.08)] text-[#FF6B6B]"
                          : isLight ? "text-[#5a5f6e] hover:bg-[#f0efe9]" : "text-[#8891a4] hover:bg-[#181c28]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header({ activeTool, setActiveTool, isLight, setTheme, setIsPrivacyOpen, mutedText, mutedText2, activeBtn }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = !activeTool || activeTool === "home";

  return (
    <header className={`relative top-0 left-0 right-0 h-[48px] border-b ${isLight ? "border-[#e5e7eb]" : "border-[#1a1a1a]"} px-4 flex items-center justify-between z-40 transition-colors duration-200 ${isLight ? "bg-[#fafafa]" : "bg-[#050505]"}`}>
      <div className="flex items-center gap-2 min-w-0">
        {/* Logo */}
        <button
          onClick={() => setActiveTool("home")}
          className="flex items-center gap-2 no-underline cursor-pointer shrink-0 mr-1"
        >
          <div className={`w-7 h-7 ${isLight ? "bg-[#fff0f0] border-[#e0d0d0]" : "bg-[#000000] border-[#1a1a1a]"} border rounded-full flex items-center justify-center shrink-0 overflow-hidden`}>
            <img src="/logo.png" alt="DevClat" className="w-full h-full object-cover rounded-full" />
          </div>
          <span className={`text-sm font-bold ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"} tracking-tight shrink-0 font-display`}>
            devclat
          </span>
          <span className={`text-[11px] ${mutedText} font-mono shrink-0`}>.tools</span>
        </button>

        {/* When on home: show nav dropdowns. When on tool: show tool selector */}
        {isHome ? (
          <nav className="hidden md:flex items-center gap-0.5 min-w-0">
            {NAV_GROUPS.map((group) => (
              <Dropdown
                key={group.id}
                group={group}
                activeTool={activeTool}
                setActiveTool={setActiveTool}
                isLight={isLight}
                mutedText2={mutedText2}
                activeBtn={activeBtn}
              />
            ))}
          </nav>
        ) : (
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={isLight ? "text-[#d1d5db]" : "text-[#374151]"}>
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <ToolSelector
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              isLight={isLight}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-2">
        <button
          onClick={() => setTheme(isLight ? "dark" : "light")}
          className={`p-1.5 rounded-md border transition-all duration-150 cursor-pointer ${isLight ? "border-[#e2e0da] hover:border-[#d0cec8] text-[#5a5f6e] hover:text-[#1a1d26]" : "border-[#1c2030] hover:border-[#2a3045] text-[#505868] hover:text-[#8891a4]"}`}
          title={`Switch to ${isLight ? "dark" : "light"} mode`}
        >
          {isLight ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>
        <button
          onClick={() => setIsPrivacyOpen(true)}
          className={`text-sm ${mutedText} hover:text-current font-medium transition-colors cursor-pointer hidden sm:block`}
        >
          Privacy
        </button>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`p-1.5 rounded-md border md:hidden transition-all duration-150 cursor-pointer ${isLight ? "border-[#e2e0da] text-[#5a5f6e]" : "border-[#1c2030] text-[#505868]"}`}
        >
          {mobileOpen ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      <MobileMenu
        open={mobileOpen}
        setOpen={setMobileOpen}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        isLight={isLight}
      />
    </header>
  );
}
