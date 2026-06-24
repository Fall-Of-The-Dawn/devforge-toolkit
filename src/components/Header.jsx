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
    ],
  },
  {
    id: "editors",
    label: "Editors",
    items: [
      { id: "diff", label: "Text Diff" },
      { id: "html-preview", label: "HTML Preview" },
    ],
  },
  {
    id: "generators",
    label: "Generators",
    items: [
      { id: "lorem", label: "Lorem Ipsum" },
      { id: "qr-code", label: "QR Code" },
    ],
  },
];

function Dropdown({ group, activeTool, setActiveTool, isLight, mutedText2, activeBtn }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 6, left: rect.left });
    }
    setOpen(!open);
  };

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
        ref={btnRef}
        onClick={handleToggle}
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
          className={`fixed min-w-[180px] rounded-lg border py-1.5 shadow-xl z-[100] ${isLight ? "bg-white border-gray-200 shadow-gray-200/50" : "bg-[#141414] border-[#222] shadow-black/50"}`}
          style={{ top: pos.top, left: pos.left }}
        >
          {group.items.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTool(item.id); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                activeTool === item.id
                  ? isLight ? "bg-green-50 text-green-600" : "bg-[#00e676]/10 text-[#00e676]"
                  : isLight ? "text-gray-700 hover:bg-gray-50" : "text-[#ccc] hover:bg-[#1a1a1a]"
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

export default function Header({ activeTool, setActiveTool, isLight, setTheme, setIsPrivacyOpen, mutedText, mutedText2, activeBtn }) {
  return (
    <header className={`h-[52px] border-b ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"} px-4 flex items-center justify-between shrink-0 z-40 transition-colors duration-200`}>
      <div className="flex items-center gap-1 min-w-0">
        <button
          onClick={() => setActiveTool("home")}
          className="flex items-center gap-2 no-underline cursor-pointer shrink-0 mr-2"
        >
          <div className={`w-7 h-7 ${isLight ? "bg-green-50 border-green-200" : "bg-[#111] border-[#222]"} border rounded-md flex items-center justify-center shrink-0`}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#00e676" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <span className={`text-base font-bold ${isLight ? "text-gray-900" : "text-white"} tracking-tight shrink-0`}>
            devforge
          </span>
          <span className={`text-xs ${mutedText} font-mono shrink-0`}>.tools</span>
        </button>

        <nav className="flex items-center gap-0.5 min-w-0">
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
          className={`p-2 rounded-md border transition-all duration-150 cursor-pointer ${isLight ? "border-gray-200 hover:border-gray-300 text-gray-500 hover:text-gray-700" : "border-[#222] hover:border-[#444] text-[#666] hover:text-[#999]"}`}
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
          className={`text-sm ${mutedText} hover:text-current font-medium transition-colors cursor-pointer`}
        >
          Privacy
        </button>
      </div>
    </header>
  );
}
