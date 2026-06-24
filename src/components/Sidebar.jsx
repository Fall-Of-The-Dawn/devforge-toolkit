import { useState } from "react";

export default function Sidebar({ isLight, mutedText, adConfig, theme, setActiveTool }) {
  const [expanded, setExpanded] = useState(true);
  const isLightAd = theme === "light";

  if (!adConfig?.enabled) return null;

  return (
    <div
      className={`shrink-0 border-l hidden md:flex flex-col transition-all duration-200 ${
        expanded ? "w-[240px]" : "w-[40px]"
      } ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={`h-9 flex items-center justify-center border-b cursor-pointer transition-colors ${
          isLight ? "border-gray-200 hover:bg-gray-100 text-gray-500" : "border-[#1a1a1a] hover:bg-[#141414] text-[#666]"
        }`}
        title={expanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform duration-200 ${expanded ? "" : "rotate-180"}`}
        >
          <polyline points="11 17 6 12 11 7" />
          <polyline points="18 17 13 12 18 7" />
        </svg>
      </button>

      {expanded && (
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className={`rounded-lg border p-3 ${isLight ? "bg-white border-[#e2e0da]" : "bg-[#12151e] border-[#1c2030]"}`}>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-md flex items-center justify-center ${isLight ? "bg-[#fff8ed]" : "bg-[#181c28]"}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className={`text-xs font-bold ${isLightAd ? "text-[#1a1d26]" : "text-[#e2e5eb]"}`}>
                {adConfig.title}
              </span>
            </div>
            <p className={`text-[10px] leading-relaxed mb-2 ${isLightAd ? "text-[#5a5f6e]" : "text-[#505868]"}`}>
              {adConfig.description}
            </p>
            <a
              href={adConfig.ctaUrl}
              className="inline-block text-[10px] font-bold text-accent hover:opacity-80 transition-opacity"
            >
              {adConfig.ctaText} →
            </a>
          </div>

          <div className={`rounded-lg border p-3 ${isLight ? "bg-white border-[#e2e0da]" : "bg-[#12151e] border-[#1c2030]"}`}>
            <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${mutedText}`}>
              Quick Links
            </h4>
            <div className="space-y-1">
              {[
                { id: "generator", label: "Mock Data" },
                { id: "json-formatter", label: "JSON Formatter" },
                { id: "css-converter", label: "CSS Converter" },
                { id: "gradient", label: "Gradient Gen" },
                { id: "qr-code", label: "QR Code" },
              ].map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={`w-full text-left text-[10px] px-2 py-1 rounded cursor-pointer transition-colors ${
                    isLight ? "text-[#5a5f6e] hover:bg-[#f0efe9] hover:text-[#1a1d26]" : "text-[#505868] hover:bg-[#181c28] hover:text-[#c8ccd4]"
                  }`}
                >
                  {tool.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {!expanded && (
        <div className="flex-1 flex flex-col items-center gap-2 pt-2">
          <div className={`w-7 h-7 rounded-md flex items-center justify-center ${isLight ? "bg-[#fff8ed]" : "bg-[#181c28]"}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
