import { useState, useMemo } from "react";

export default function UrlEncoder({ isLight, mutedText }) {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("encode");
  const [encodeComponent, setEncodeComponent] = useState(false);
  const [copied, setCopied] = useState(false);

  const { result, error } = useMemo(() => {
    if (!input.trim()) return { result: "", error: "" };
    try {
      if (mode === "encode") {
        return { result: encodeComponent ? encodeURIComponent(input) : encodeURI(input), error: "" };
      } else {
        return { result: decodeURIComponent(input), error: "" };
      }
    } catch (e) {
      return { result: "", error: mode === "decode" ? "Invalid URL encoded string" : e.message };
    }
  }, [input, mode, encodeComponent]);

  const parsedUrl = useMemo(() => {
    if (!input.trim() || mode !== "decode") return null;
    try {
      const url = new URL(input);
      return {
        protocol: url.protocol,
        hostname: url.hostname,
        pathname: url.pathname,
        search: url.search,
        hash: url.hash,
      };
    } catch {
      return null;
    }
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>URL Encoder / Decoder</label>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button onClick={() => setMode("encode")} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${mode === "encode" ? (isLight ? "bg-green-50 border-green-200 text-green-600" : "bg-[#00e676]/10 border-[#00e676]/30 text-[#00e676]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#999]")}`}>Encode</button>
            <button onClick={() => setMode("decode")} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${mode === "decode" ? (isLight ? "bg-green-50 border-green-200 text-green-600" : "bg-[#00e676]/10 border-[#00e676]/30 text-[#00e676]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#999]")}`}>Decode</button>
          </div>
          {mode === "encode" && (
            <label className={`flex items-center gap-1.5 text-[10px] ${mutedText} cursor-pointer`}>
              <input type="checkbox" checked={encodeComponent} onChange={(e) => setEncodeComponent(e.target.checked)} className="w-3 h-3 accent-[#00e676]" />
              Component
            </label>
          )}
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

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>{mode === "encode" ? "URL INPUT" : "ENCODED URL INPUT"}</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-gray-200 focus:border-green-400 text-gray-900" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#00e676] text-[#e0e0e0]"}`}
            placeholder={mode === "encode" ? 'Enter URL or text to encode...\n\nExample:\nhttps://example.com/search?q=hello world&lang=en' : 'Enter URL encoded string to decode...\n\nExample:\nhttps%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world'}
            spellCheck={false}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>{mode === "encode" ? "ENCODED OUTPUT" : "DECODED OUTPUT"}</label>
          <div className={`w-full h-full rounded-lg p-4 font-mono text-sm leading-relaxed overflow-auto select-all border transition-colors duration-200 ${isLight ? "bg-gray-50 border-gray-200 text-gray-900" : "bg-[#080808] border-[#161616] text-[#e0e0e0]"}`}>
            <pre className="whitespace-pre-wrap break-all">{result || (mode === "encode" ? "Encoded URL will appear here..." : "Decoded URL will appear here...")}</pre>
          </div>
        </div>
      </div>

      {parsedUrl && (
        <div className={`mt-3 rounded-lg border p-3 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
          <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>Parsed URL Components</label>
          <div className={`grid grid-cols-2 gap-2 text-xs font-mono ${isLight ? "text-gray-600" : "text-[#888]"}`}>
            {parsedUrl.protocol && <div><span className={mutedText}>protocol: </span><span className="text-[#00e676]">{parsedUrl.protocol}</span></div>}
            {parsedUrl.hostname && <div><span className={mutedText}>hostname: </span><span className="text-[#00e676]">{parsedUrl.hostname}</span></div>}
            {parsedUrl.pathname && <div><span className={mutedText}>pathname: </span><span className="text-[#00e676]">{parsedUrl.pathname}</span></div>}
            {parsedUrl.search && <div><span className={mutedText}>search: </span><span className="text-[#00e676]">{parsedUrl.search}</span></div>}
            {parsedUrl.hash && <div><span className={mutedText}>hash: </span><span className="text-[#00e676]">{parsedUrl.hash}</span></div>}
          </div>
        </div>
      )}
    </div>
  );
}
