import { useState, useMemo } from "react";

export default function Base64Tool({ isLight, mutedText }) {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("encode");
  const [copied, setCopied] = useState(false);

  const { result, error } = useMemo(() => {
    if (!input.trim()) return { result: "", error: "" };
    try {
      if (mode === "encode") {
        return { result: btoa(unescape(encodeURIComponent(input))), error: "" };
      } else {
        return { result: decodeURIComponent(escape(atob(input))), error: "" };
      }
    } catch (e) {
      return { result: "", error: mode === "decode" ? "Invalid Base64 string" : e.message };
    }
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    if (result) {
      setInput(result);
      setMode(mode === "encode" ? "decode" : "encode");
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Base64 {mode === "encode" ? "Encoder" : "Decoder"}</label>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button onClick={() => setMode("encode")} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${mode === "encode" ? (isLight ? "bg-[#fff0f0] border-[#e0d0d0] text-[#c53a3a]" : "bg-[#FF6B6B]/10 border-[#FF6B6B]/30 text-[#FF6B6B]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#999]")}`}>Encode</button>
            <button onClick={() => setMode("decode")} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${mode === "decode" ? (isLight ? "bg-[#fff0f0] border-[#e0d0d0] text-[#c53a3a]" : "bg-[#FF6B6B]/10 border-[#FF6B6B]/30 text-[#FF6B6B]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#999]")}`}>Decode</button>
          </div>
          <button onClick={handleSwap} disabled={!result} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
            Swap →
          </button>
          <button onClick={handleCopy} disabled={!result} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-3 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
          {error}
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>{mode === "encode" ? "PLAIN TEXT INPUT" : "BASE64 INPUT"}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-gray-200 focus:border-[#FF6B6B] text-gray-900" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#FF6B6B] text-[#e0e0e0]"}`}
            placeholder={mode === "encode" ? 'Enter plain text to encode...\n\nExample:\nHello, World!\n{"key": "value"}' : 'Enter Base64 string to decode...\n\nExample:\nSGVsbG8sIFdvcmxkIQ==\neyJrZXkiOiAidmFsdWUifQ=='}
            spellCheck={false}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>{mode === "encode" ? "BASE64 OUTPUT" : "DECODED TEXT"}</label>
          <div className={`w-full h-full rounded-lg p-4 font-mono text-sm leading-relaxed overflow-auto select-all border transition-colors duration-200 ${isLight ? "bg-gray-50 border-gray-200 text-gray-900" : "bg-[#080808] border-[#161616] text-[#e0e0e0]"}`}>
            <pre className="whitespace-pre-wrap">{result || (mode === "encode" ? "Encoded output will appear here..." : "Decoded text will appear here...")}</pre>
          </div>
        </div>
      </div>

      <div className={`mt-3 flex items-center gap-4 text-[10px] font-mono ${mutedText}`}>
        <span>Input: {input.length} chars</span>
        {result && <span>·</span>}
        {result && <span>Output: {result.length} chars</span>}
      </div>
    </div>
  );
}
