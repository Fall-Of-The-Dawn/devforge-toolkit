import { useState, useRef, useEffect } from "react";

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
          className={`absolute top-full left-0 mt-1 min-w-[180px] rounded-lg border py-1.5 shadow-xl z-[100] ${isLight ? "bg-white border-[#e2e0da] shadow-black/10" : "bg-[#181c28] border-[#1c2030] shadow-black/40"}`}
        >
          {group.items.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTool(item.id); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                activeTool === item.id
                  ? isLight ? "bg-[#fff8ed] text-[#c87d0a]" : "bg-[rgba(240,165,0,0.08)] text-[#f0a500]"
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
      <div className={`absolute top-[52px] left-0 right-0 bottom-0 overflow-y-auto ${isLight ? "bg-[#f7f6f3]" : "bg-[#0c0e14]"}`}>
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
                          ? isLight ? "bg-[#fff8ed] text-[#c87d0a]" : "bg-[rgba(240,165,0,0.08)] text-[#f0a500]"
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

  return (
    <header className={`h-[52px] border-b ${isLight ? "bg-[#f7f6f3]/80 border-[#e2e0da]" : "bg-[#0c0e14]/80 border-[#1c2030]"} backdrop-blur-md px-4 flex items-center justify-between shrink-0 z-40 transition-colors duration-200`}>
      <div className="flex items-center gap-1 min-w-0">
        <button
          onClick={() => setActiveTool("home")}
          className="flex items-center gap-2 no-underline cursor-pointer shrink-0 mr-2"
        >
          <div className={`w-7 h-7 ${isLight ? "bg-[#fff8ed] border-[#f0dfc0]" : "bg-[#181c28] border-[#1c2030]"} border rounded-md flex items-center justify-center shrink-0`}>
            <svg width="15" height="15" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="10" fill={isLight ? "#f7f6f3" : "#12151e"}/>
              <path d="M12 14l6-6 2 2-6 6 6 6-2 2-6-6z" fill={isLight ? "#c87d0a" : "#f0a500"}/>
              <path d="M36 14l-6-6-2 2 6 6-6 6 2 2 6-6z" fill={isLight ? "#c87d0a" : "#f0a500"}/>
              <circle cx="24" cy="24" r="4" fill={isLight ? "#c87d0a" : "#f0a500"} opacity="0.5"/>
            </svg>
          </div>
          <span className={`text-base font-bold ${isLight ? "text-[#1a1d26]" : "text-[#e2e5eb]"} tracking-tight shrink-0 font-display`}>
            omnidev
          </span>
          <span className={`text-xs ${mutedText} font-mono shrink-0`}>.tools</span>
        </button>

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
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-2">
        <button
          onClick={() => setTheme(isLight ? "dark" : "light")}
          className={`p-2 rounded-md border transition-all duration-150 cursor-pointer ${isLight ? "border-[#e2e0da] hover:border-[#d0cec8] text-[#5a5f6e] hover:text-[#1a1d26]" : "border-[#1c2030] hover:border-[#2a3045] text-[#505868] hover:text-[#8891a4]"}`}
          title={`Switch to ${isLight ? "dark" : "light"} mode`}
        >
          {isLight ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          className={`p-2 rounded-md border md:hidden transition-all duration-150 cursor-pointer ${isLight ? "border-[#e2e0da] text-[#5a5f6e]" : "border-[#1c2030] text-[#505868]"}`}
        >
          {mobileOpen ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
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
