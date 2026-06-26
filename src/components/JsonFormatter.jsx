import { useState, useMemo } from "react";

export default function JsonFormatter({ isLight, mutedText }) {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => {
    if (!input.trim()) return { result: "", minified: "", error: "", stats: null };
    try {
      const obj = JSON.parse(input);
      const keys = Object.keys(obj).length;
      const isArray = Array.isArray(obj);
      return {
        result: JSON.stringify(obj, null, indent),
        minified: JSON.stringify(obj),
        error: "",
        stats: { type: isArray ? "Array" : "Object", length: isArray ? obj.length : keys, valid: true },
      };
    } catch (e) {
      return { result: "", minified: "", error: e.message, stats: { valid: false } };
    }
  }, [input, indent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(parsed.result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>JSON Formatter</label>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <label className={`text-[10px] ${mutedText}`}>INDENT</label>
            {[2, 4, 8].map((v) => (
              <button key={v} onClick={() => setIndent(v)} className={`px-2 py-1 text-[10px] font-bold rounded border transition-all cursor-pointer ${indent === v ? (isLight ? "bg-[#fff0f0] border-[#e0d0d0] text-[#c53a3a]" : "bg-[#FF6B6B]/10 border-[#FF6B6B]/30 text-[#FF6B6B]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#999]")}`}>{v}</button>
            ))}
          </div>
          <button onClick={handleCopy} disabled={!parsed.result} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {parsed.stats && (
        <div className={`flex items-center gap-3 text-xs font-mono mb-3 ${mutedText}`}>
          <span className={parsed.stats.valid ? "text-green-400" : "text-red-400"}>
            {parsed.stats.valid ? "Valid" : "Invalid"}
          </span>
          {parsed.stats.valid && (
            <>
              <span>·</span>
              <span>{parsed.stats.type}</span>
              <span>·</span>
              <span>{parsed.stats.length} {parsed.stats.type === "Array" ? "items" : "keys"}</span>
            </>
          )}
        </div>
      )}

      {parsed.error && (
        <div className="mb-3 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
          {parsed.error}
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>INPUT</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-gray-200 focus:border-[#FF6B6B] text-gray-900" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#FF6B6B] text-[#e0e0e0]"}`}
            placeholder={'Paste JSON here...\n\nExample:\n{\n  "name": "John",\n  "age": 30,\n  "tags": ["dev", "tools"]\n}'}
            spellCheck={false}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>OUTPUT</label>
          <div className={`w-full h-full rounded-lg p-4 font-mono text-sm leading-relaxed overflow-auto select-all border transition-colors duration-200 ${isLight ? "bg-gray-50 border-gray-200 text-gray-900" : "bg-[#080808] border-[#161616] text-[#e0e0e0]"}`}>
            <pre>{parsed.result || parsed.minified}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
