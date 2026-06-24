import { useState, useMemo, useRef, useCallback } from "react";

const PRESETS = [
  { name: "Sunset", colors: ["#ff512f", "#f09819"], angle: "135" },
  { name: "Ocean", colors: ["#2193b0", "#6dd5ed"], angle: "135" },
  { name: "Purple", colors: ["#667eea", "#764ba2"], angle: "135" },
  { name: "Fire", colors: ["#f12711", "#f5af19"], angle: "135" },
  { name: "Mint", colors: ["#11998e", "#38ef7d"], angle: "135" },
  { name: "Peach", colors: ["#ffecd2", "#fcb69f"], angle: "135" },
];

function GradientBar({ stops, setStops, isLight }) {
  const barRef = useRef(null);
  const dragRef = useRef(null);

  const sortedStops = useMemo(() => [...stops].sort((a, b) => Number(a.position) - Number(b.position)), [stops]);

  const barGradient = useMemo(() => {
    return `linear-gradient(90deg, ${sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ")})`;
  }, [sortedStops]);

  const getPositionFromEvent = useCallback((e) => {
    if (!barRef.current) return 0;
    const rect = barRef.current.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0)) - rect.left;
    return Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  }, []);

  const handlePointerDown = useCallback((e, idx) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = idx;

    const onMove = (ev) => {
      if (dragRef.current === null) return;
      const pos = String(getPositionFromEvent(ev));
      setStops((prev) => prev.map((s, i) => (i === dragRef.current ? { ...s, position: pos } : s)));
    };

    const onUp = () => {
      dragRef.current = null;
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onUp);
  }, [getPositionFromEvent, setStops]);

  const handleBarClick = useCallback((e) => {
    if (dragRef.current !== null) return;
    const pos = getPositionFromEvent(e);
    const nearestColor = (() => {
      let closest = sortedStops[0];
      let minDist = Infinity;
      for (const s of sortedStops) {
        const dist = Math.abs(Number(s.position) - pos);
        if (dist < minDist) { minDist = dist; closest = s; }
      }
      return closest.color;
    })();
    setStops((prev) => [...prev, { color: nearestColor, position: String(pos) }]);
  }, [getPositionFromEvent, sortedStops, setStops]);

  return (
    <div className="relative select-none" style={{ height: 48 }}>
      <div
        ref={barRef}
        className="absolute top-2 left-0 right-0 h-4 rounded-full cursor-crosshair border border-white/20"
        style={{ background: barGradient }}
        onClick={handleBarClick}
      />
      {stops.map((s, i) => (
        <div
          key={i}
          className="absolute top-0 w-5 h-8 -ml-2.5 cursor-grab active:cursor-grabbing z-10"
          style={{ left: `${s.position}%` }}
          onMouseDown={(e) => handlePointerDown(e, i)}
          onTouchStart={(e) => handlePointerDown(e, i)}
        >
          <div className={`w-5 h-5 rounded-full border-2 shadow-md ${isLight ? "border-white" : "border-[#222]"}`} style={{ backgroundColor: s.color }} />
          <div className={`w-0.5 h-3 mx-auto ${isLight ? "bg-white" : "bg-[#222]"}`} />
        </div>
      ))}
    </div>
  );
}

export default function GradientGenerator({ isLight, mutedText }) {
  const [type, setType] = useState("linear");
  const [angle, setAngle] = useState("135");
  const [stops, setStops] = useState([
    { color: "#f0a500", position: "0" },
    { color: "#1a237e", position: "100" },
  ]);
  const [copied, setCopied] = useState(false);

  const addStop = () => {
    if (stops.length >= 8) return;
    setStops([...stops, { color: "#ffffff", position: "50" }]);
  };

  const removeStop = (i) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, idx) => idx !== i));
  };

  const updateStop = (i, key, val) => {
    setStops(stops.map((s, idx) => (idx === i ? { ...s, [key]: val } : s)));
  };

  const applyPreset = (preset) => {
    setStops(preset.colors.map((c, i) => ({ color: c, position: String(Math.round((i / (preset.colors.length - 1)) * 100)) })));
    setAngle(preset.angle);
  };

  const sortedStops = useMemo(() => [...stops].sort((a, b) => Number(a.position) - Number(b.position)), [stops]);

  const cssGradient = useMemo(() => {
    const colorStops = sortedStops.map((s) => `${s.color} ${s.position}%`).join(", ");
    if (type === "linear") return `linear-gradient(${angle}deg, ${colorStops})`;
    if (type === "radial") return `radial-gradient(circle, ${colorStops})`;
    return `conic-gradient(from ${angle}deg, ${colorStops})`;
  }, [type, angle, sortedStops]);

  const cssOutput = useMemo(() => `background: ${cssGradient};`, [cssGradient]);

  const tailwindOutput = useMemo(() => {
    if (stops.length === 2) {
      const from = stops[0].color;
      const to = stops[1].color;
      if (type === "linear") return `bg-gradient-to-br from-[${from}] to-[${to}]`;
      return `bg-[${cssGradient}]`;
    }
    return `bg-[${cssGradient}]`;
  }, [stops, type, cssGradient]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Gradient Generator</label>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            {["linear", "radial", "conic"].map((t) => (
              <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer capitalize ${type === t ? (isLight ? "bg-[#fff8ed] border-[#f0dfc0] text-[#c87d0a]" : "bg-[#f0a500]/10 border-[#f0a500]/30 text-[#f0a500]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#999]")}`}>{t}</button>
            ))}
          </div>
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
                <button key={p.name} onClick={() => applyPreset(p)} className="h-8 rounded-md border cursor-pointer transition-all hover:scale-105" style={{ background: `linear-gradient(135deg, ${p.colors.join(", ")})` }} title={p.name} />
              ))}
            </div>
          </div>

          {(type === "linear" || type === "conic") && (
            <div className="flex flex-col gap-1">
              <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Angle: {angle}deg</label>
              <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(e.target.value)} className="w-full" />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Color Stops ({stops.length})</label>
              <button onClick={addStop} disabled={stops.length >= 8} className="text-[10px] font-bold text-[#f0a500] hover:text-[#d4920a] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed">+ Add</button>
            </div>
            <div className="space-y-2">
              {stops.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input type="color" value={s.color} onChange={(e) => updateStop(i, "color", e.target.value)} className="w-7 h-7 rounded border cursor-pointer" />
                  <input type="text" value={s.color} onChange={(e) => updateStop(i, "color", e.target.value)} className={`flex-1 px-2 py-1 text-[10px] font-mono rounded border bg-transparent focus:outline-none ${isLight ? "border-gray-200 text-gray-700" : "border-[#1a1a1a] text-[#ccc]"}`} />
                  <input type="number" min="0" max="100" value={s.position} onChange={(e) => updateStop(i, "position", e.target.value)} className={`w-14 px-2 py-1 text-[10px] font-mono rounded border bg-transparent focus:outline-none text-center ${isLight ? "border-gray-200 text-gray-700" : "border-[#1a1a1a] text-[#ccc]"}`} />
                  <span className={`text-[10px] ${mutedText}`}>%</span>
                  <button onClick={() => removeStop(i)} disabled={stops.length <= 2} className={`text-xs transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${isLight ? "text-gray-400 hover:text-red-500" : "text-[#444] hover:text-red-400"}`}>x</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 gap-4">
          <div className={`rounded-lg border overflow-hidden ${isLight ? "border-gray-200" : "border-[#161616]"}`}>
            <div className="w-full h-36" style={{ background: cssGradient }} />
          </div>

          <GradientBar stops={stops} setStops={setStops} isLight={isLight} />

          <div className="flex flex-col md:flex-row gap-4">
            <div className={`flex-1 rounded-lg border p-3 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
              <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>CSS</label>
              <code className={`text-xs font-mono break-all ${isLight ? "text-gray-700" : "text-[#f0a500]"}`}>{cssOutput}</code>
            </div>
            <div className={`flex-1 rounded-lg border p-3 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
              <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>Tailwind</label>
              <code className={`text-xs font-mono break-all ${isLight ? "text-gray-700" : "text-[#f0a500]"}`}>{tailwindOutput}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
