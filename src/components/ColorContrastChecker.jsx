import { useState, useMemo } from "react";

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function relativeLuminance({ r, g, b }) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function getRating(ratio) {
  if (ratio >= 7) return { level: "AAA", label: "Excellent", color: "#22c55e" };
  if (ratio >= 4.5) return { level: "AA", label: "Good", color: "#FF6B6B" };
  if (ratio >= 3) return { level: "AA Large", label: "OK for large text", color: "#f59e0b" };
  return { level: "Fail", label: "Poor contrast", color: "#ef4444" };
}

const PRESETS = [
  { name: "White on Black", fg: "#ffffff", bg: "#000000" },
  { name: "Black on White", fg: "#000000", bg: "#ffffff" },
  { name: "Green on Dark", fg: "#FF6B6B", bg: "#0a0a0a" },
  { name: "Gray on Dark", fg: "#9ca3af", bg: "#111827" },
];

export default function ColorContrastChecker({ isLight, mutedText }) {
  const [fg, setFg] = useState("#e0e0e0");
  const [bg, setBg] = useState("#0a0a0a");
  const [copied, setCopied] = useState(false);

  const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);
  const rating = useMemo(() => getRating(ratio), [ratio]);

  const handleCopy = () => {
    navigator.clipboard.writeText(`color: ${fg}; background: ${bg}; /* contrast: ${ratio.toFixed(2)}:1 */`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Color Contrast Checker</h1>
        <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          {copied ? "Copied!" : "Copy CSS"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-5 flex-1 min-h-0">
        <div className={`md:w-[260px] md:shrink-0 rounded-lg border p-4 space-y-4 overflow-y-auto ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Foreground (Text)</label>
            <div className="flex items-center gap-2">
              <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-8 h-8 rounded border cursor-pointer" />
              <input type="text" value={fg} onChange={(e) => setFg(e.target.value)} className={`flex-1 px-2 py-1.5 text-xs font-mono rounded border bg-transparent focus:outline-none ${isLight ? "border-gray-200 text-gray-700" : "border-[#1a1a1a] text-[#ccc]"}`} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Background</label>
            <div className="flex items-center gap-2">
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-8 h-8 rounded border cursor-pointer" />
              <input type="text" value={bg} onChange={(e) => setBg(e.target.value)} className={`flex-1 px-2 py-1.5 text-xs font-mono rounded border bg-transparent focus:outline-none ${isLight ? "border-gray-200 text-gray-700" : "border-[#1a1a1a] text-[#ccc]"}`} />
            </div>
          </div>

          <button onClick={() => { setFg(bg); setBg(fg); }} className={`w-full py-2 text-xs font-medium rounded-md border transition-all cursor-pointer ${isLight ? "bg-white border-gray-200 text-gray-600 hover:border-[#e0d0d0]" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:border-[#FF6B6B]/30"}`}>Swap Colors</button>

          <div>
            <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>Presets</label>
            <div className="space-y-1.5">
              {PRESETS.map((p) => (
                <button key={p.name} onClick={() => { setFg(p.fg); setBg(p.bg); }} className={`w-full text-left px-2.5 py-1.5 text-[10px] rounded border transition-all cursor-pointer ${isLight ? "bg-white border-gray-200 text-gray-600 hover:border-[#e0d0d0]" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:border-[#FF6B6B]/30"}`}>{p.name}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 gap-4">
          <div className={`rounded-xl border p-8 flex flex-col items-center justify-center gap-4 ${isLight ? "border-gray-200" : "border-[#161616]"}`} style={{ backgroundColor: bg }}>
            <p className="text-3xl font-bold" style={{ color: fg }}>Sample Text</p>
            <p className="text-base" style={{ color: fg }}>The quick brown fox jumps over the lazy dog</p>
            <p className="text-sm" style={{ color: fg }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p className="text-xs" style={{ color: fg }}>abcdefghijklmnopqrstuvwxyz 0123456789</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className={`flex-1 rounded-lg border p-4 text-center ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
              <div className={`text-3xl font-black font-mono mb-1`} style={{ color: rating.color }}>{ratio.toFixed(2)}</div>
              <div className={`text-[10px] uppercase font-bold ${mutedText}`}>Contrast Ratio</div>
            </div>
            <div className={`flex-1 rounded-lg border p-4 text-center ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
              <div className="text-3xl font-black font-mono mb-1" style={{ color: rating.color }}>{rating.level}</div>
              <div className={`text-[10px] uppercase font-bold ${mutedText}`}>{rating.label}</div>
            </div>
          </div>

          <div className={`rounded-lg border p-4 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
            <label className={`text-[10px] font-bold uppercase ${mutedText} mb-3 block`}>WCAG Compliance</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Normal Text AA", required: 4.5 },
                { label: "Normal Text AAA", required: 7 },
                { label: "Large Text AA", required: 3 },
                { label: "Large Text AAA", required: 4.5 },
              ].map((check) => (
                <div key={check.label} className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${ratio >= check.required ? "bg-[#fff0f0]0/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {ratio >= check.required ? "\u2713" : "\u2717"}
                  </div>
                  <div>
                    <div className={`text-xs font-medium ${isLight ? "text-gray-700" : "text-[#ccc]"}`}>{check.label}</div>
                    <div className={`text-[10px] ${mutedText}`}>min {check.required}:1</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
