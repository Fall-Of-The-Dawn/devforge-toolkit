import { useState, useMemo } from "react";

const PRESETS = [
  { name: "Subtle", offsetX: "0", offsetY: "1", blur: "3", spread: "0", color: "#00000033", inset: false },
  { name: "Medium", offsetX: "0", offsetY: "4", blur: "6", spread: "-1", color: "#00000026", inset: false },
  { name: "Large", offsetX: "0", offsetY: "10", blur: "15", spread: "-3", color: "#0000001a", inset: false },
  { name: "Glow", offsetX: "0", offsetY: "0", blur: "20", spread: "0", color: "#FF6B6B66", inset: false },
  { name: "Inset", offsetX: "0", offsetY: "2", blur: "4", spread: "0", color: "#00000026", inset: true },
  { name: "Neon", offsetX: "0", offsetY: "0", blur: "10", spread: "2", color: "#FF6B6B", inset: false },
];

export default function BoxShadowGenerator({ isLight, mutedText }) {
  const [shadows, setShadows] = useState([
    { offsetX: "0", offsetY: "4", blur: "6", spread: "-1", color: "#00000026", inset: false },
  ]);
  const [copied, setCopied] = useState(false);

  const updateShadow = (i, key, val) => {
    setShadows(shadows.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)));
  };

  const addShadow = () => {
    if (shadows.length >= 5) return;
    setShadows([...shadows, { offsetX: "0", offsetY: "0", blur: "0", spread: "0", color: "#00000033", inset: false }]);
  };

  const removeShadow = (i) => {
    if (shadows.length <= 1) return;
    setShadows(shadows.filter((_, idx) => idx !== i));
  };

  const applyPreset = (preset) => {
    setShadows([{ ...preset }]);
  };

  const cssOutput = useMemo(() => {
    const shadowStr = shadows.map((s) => `${s.inset ? "inset " : ""}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${s.color}`).join(",\n  ");
    return `box-shadow: ${shadowStr};`;
  }, [shadows]);

  const tailwindOutput = useMemo(() => {
    if (shadows.length === 1) {
      const s = shadows[0];
      if (s.inset) return `shadow-[inset_${s.offsetX}px_${s.offsetY}px_${s.blur}px_${s.spread}px_${s.color}]`;
      if (s.offsetX === "0" && s.offsetY === "0" && s.spread === "0") return `shadow-[0_0_${s.blur}px_${s.color}]`;
      return `shadow-[${s.offsetX}px_${s.offsetY}px_${s.blur}px_${s.spread}px_${s.color}]`;
    }
    return `shadow-[${shadows.map((s) => `${s.inset ? "inset_" : ""}${s.offsetX}px_${s.offsetY}px_${s.blur}px_${s.spread}px_${s.color}`).join(" ")}]`;
  }, [shadows]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderSlider = (label, value, onChange, min = "-50", max = "50") => (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <label className={`text-[10px] font-bold uppercase ${mutedText}`}>{label}</label>
        <span className={`text-[10px] font-mono ${mutedText}`}>{value}px</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(e.target.value)} className="w-full" />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Box Shadow Generator</label>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? "Copied!" : "Copy CSS"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 flex-1 min-h-0">
        <div className={`md:w-[260px] md:shrink-0 rounded-lg border p-4 space-y-4 overflow-y-auto ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
          <div>
            <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>Presets</label>
            <div className="grid grid-cols-3 gap-1.5">
              {PRESETS.map((p) => (
                <button key={p.name} onClick={() => applyPreset(p)} className={`px-2 py-1.5 text-[10px] font-medium rounded border transition-all cursor-pointer ${isLight ? "bg-white border-gray-200 text-gray-600 hover:border-[#e0d0d0]" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:border-[#FF6B6B]/30"}`}>{p.name}</button>
              ))}
            </div>
          </div>

          {shadows.map((s, i) => (
            <div key={i} className={`rounded-lg border p-3 space-y-3 ${isLight ? "bg-white border-gray-200" : "bg-[#111] border-[#1a1a1a]"}`}>
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase ${mutedText}`}>Shadow {i + 1}</span>
                <div className="flex items-center gap-2">
                  <label className={`flex items-center gap-1 text-[10px] ${mutedText} cursor-pointer`}>
                    <input type="checkbox" checked={s.inset} onChange={(e) => updateShadow(i, "inset", e.target.checked)} className="w-3 h-3 accent-[#FF6B6B]" />
                    Inset
                  </label>
                  <button onClick={() => removeShadow(i)} disabled={shadows.length <= 1} className={`text-xs transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${isLight ? "text-gray-400 hover:text-red-500" : "text-[#444] hover:text-red-400"}`}>×</button>
                </div>
              </div>
              {renderSlider("Offset X", s.offsetX, (v) => updateShadow(i, "offsetX", v))}
              {renderSlider("Offset Y", s.offsetY, (v) => updateShadow(i, "offsetY", v))}
              {renderSlider("Blur", s.blur, (v) => updateShadow(i, "blur", v), "0", "100")}
              {renderSlider("Spread", s.spread, (v) => updateShadow(i, "spread", v))}
              <div className="flex flex-col gap-1">
                <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Color</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={s.color.slice(0, 7)} onChange={(e) => updateShadow(i, "color", e.target.value + s.color.slice(7))} className="w-7 h-7 rounded border cursor-pointer" />
                  <input type="text" value={s.color} onChange={(e) => updateShadow(i, "color", e.target.value)} className={`flex-1 px-2 py-1 text-[10px] font-mono rounded border bg-transparent focus:outline-none ${isLight ? "border-gray-200 text-gray-700" : "border-[#1a1a1a] text-[#ccc]"}`} />
                </div>
              </div>
            </div>
          ))}

          <button onClick={addShadow} disabled={shadows.length >= 5} className={`w-full py-2 text-[10px] font-bold rounded-md border border-dashed transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isLight ? "border-gray-300 text-gray-500 hover:border-[#FF6B6B] hover:text-[#c53a3a]" : "border-[#333] text-[#666] hover:border-[#FF6B6B]/30 hover:text-[#FF6B6B]"}`}>+ Add Shadow Layer</button>
        </div>

        <div className="flex-1 flex flex-col min-w-0 gap-4">
          <div className={`flex-1 rounded-lg border flex items-center justify-center ${isLight ? "bg-gray-100 border-gray-200" : "bg-[#080808] border-[#161616]"}`}>
            <div className={`w-48 h-48 rounded-xl ${isLight ? "bg-white" : "bg-[#1a1a1a]"}`} style={{ boxShadow: cssOutput.replace("box-shadow: ", "").replace(";", "") }} />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className={`flex-1 rounded-lg border p-3 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
              <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>CSS</label>
              <pre className={`text-xs font-mono whitespace-pre-wrap break-all ${isLight ? "text-gray-700" : "text-[#FF6B6B]"}`}>{cssOutput}</pre>
            </div>
            <div className={`flex-1 rounded-lg border p-3 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
              <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>Tailwind</label>
              <code className={`text-xs font-mono break-all ${isLight ? "text-gray-700" : "text-[#FF6B6B]"}`}>{tailwindOutput}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
