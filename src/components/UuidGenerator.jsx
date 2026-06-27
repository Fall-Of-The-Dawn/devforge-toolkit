import { useState, useCallback } from "react";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator({ isLight, mutedText }) {
  const [uuids, setUuids] = useState([generateUUID()]);
  const [count, setCount] = useState(5);
  const [format, setFormat] = useState("standard");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const newUuids = Array.from({ length: count }, () => {
      const uuid = generateUUID();
      if (format === "no-dash") return uuid.replace(/-/g, "");
      if (format === "uppercase") return uuid.toUpperCase();
      return uuid;
    });
    setUuids(newUuids);
  }, [count, format]);

  const formatUUID = (uuid) => {
    if (format === "no-dash") return uuid.replace(/-/g, "");
    if (format === "uppercase") return uuid.toUpperCase();
    return uuid;
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.map(formatUUID).join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyOne = (uuid) => {
    navigator.clipboard.writeText(formatUUID(uuid));
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>UUID Generator</h1>
        <div className="flex items-center gap-2">
          <button onClick={handleCopyAll} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? "Copied!" : "Copy All"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 flex-1 min-h-0">
        <div className={`md:w-[220px] md:shrink-0 rounded-lg border p-4 space-y-4 overflow-y-auto ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Count: {count}</label>
            <input type="range" min="1" max="50" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Format</label>
            <div className="space-y-1.5">
              {[
                { id: "standard", label: "Standard (uuid)" },
                { id: "no-dash", label: "No dashes" },
                { id: "uppercase", label: "UPPERCASE" },
              ].map((f) => (
                <button key={f.id} onClick={() => setFormat(f.id)} className={`w-full text-left px-2.5 py-1.5 text-[10px] rounded border transition-all cursor-pointer ${format === f.id ? (isLight ? "bg-[#fff0f0] border-[#e0d0d0] text-[#c53a3a]" : "bg-[#FF6B6B]/10 border-[#FF6B6B]/30 text-[#FF6B6B]") : (isLight ? "bg-white border-gray-200 text-gray-500" : "bg-[#111] border-[#1a1a1a] text-[#666]")}`}>{f.label}</button>
              ))}
            </div>
          </div>

          <button onClick={generate} className={`w-full py-2 text-xs font-bold rounded-md transition-all cursor-pointer ${isLight ? "bg-[#fff0f0] text-[#c53a3a] hover:bg-[#fff0f0]" : "bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20"}`}>Generate New</button>
        </div>

        <div className={`flex-1 rounded-lg border p-4 overflow-auto ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
          <div className="space-y-1.5">
            {uuids.map((uuid, i) => (
              <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-mono group ${isLight ? "bg-white hover:bg-gray-100" : "bg-[#111] hover:bg-[#1a1a1a]"}`}>
                <span className={`w-6 text-right ${mutedText}`}>{i + 1}</span>
                <code className={`flex-1 ${isLight ? "text-gray-700" : "text-[#FF6B6B]"}`}>{formatUUID(uuid)}</code>
                <button onClick={() => handleCopyOne(uuid)} className={`px-2 py-0.5 text-[10px] rounded border opacity-0 group-hover:opacity-100 transition-all cursor-pointer ${isLight ? "border-gray-200 text-gray-500 hover:text-gray-900" : "border-[#1a1a1a] text-[#666] hover:text-[#ccc]"}`}>Copy</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
