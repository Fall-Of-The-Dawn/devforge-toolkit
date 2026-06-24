import { useState, useRef, useEffect } from "react";

const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; padding: 2rem; background: #0a0a0a; color: #e0e0e0; }
    h1 { color: #00e676; margin-bottom: 1rem; }
    p { line-height: 1.6; color: #aaa; margin-bottom: 1rem; }
    .card { background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 1.5rem; }
    button { background: #00e676; color: #000; border: none; padding: 0.5rem 1.5rem; border-radius: 6px; font-weight: 600; cursor: pointer; }
    button:hover { background: #00c868; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello, DevForge!</h1>
    <p>Edit this HTML to see live preview on the right.</p>
    <button onclick="alert('It works!')">Click Me</button>
  </div>
</body>
</html>`;

export default function HtmlPreviewEditor({ isLight, mutedText }) {
  const [code, setCode] = useState(DEFAULT_HTML);
  const [autoRun, setAutoRun] = useState(true);
  const [debouncedCode, setDebouncedCode] = useState(DEFAULT_HTML);
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoRun) return;
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setDebouncedCode(code), 300);
    return () => clearTimeout(timerRef.current);
  }, [code, autoRun]);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.srcdoc !== undefined ? iframeRef.current : iframeRef.current;
    doc.srcdoc = debouncedCode;
  }, [debouncedCode]);

  const handleRun = () => {
    setDebouncedCode(code);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>HTML Preview Editor</label>
        <div className="flex items-center gap-2">
          <label className={`flex items-center gap-1.5 text-[10px] ${mutedText} cursor-pointer`}>
            <input type="checkbox" checked={autoRun} onChange={(e) => setAutoRun(e.target.checked)} className="w-3 h-3 accent-[#00e676]" />
            Auto-run
          </label>
          {!autoRun && (
            <button onClick={handleRun} className={`px-3 py-1.5 text-xs font-bold text-[#0a0a0a] bg-[#00e676] hover:bg-[#00c868] rounded-md transition-all cursor-pointer`}>
              Run ▶
            </button>
          )}
          <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>HTML / CSS / JS</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-gray-200 focus:border-green-400 text-gray-900" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#00e676] text-[#e0e0e0]"}`}
            placeholder="Write or paste HTML, CSS, and JavaScript here..."
            spellCheck={false}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>PREVIEW</label>
          <iframe
            ref={iframeRef}
            className={`w-full h-full rounded-lg border ${isLight ? "bg-white border-gray-200" : "bg-[#0a0a0a] border-[#1a1a1a]"}`}
            sandbox="allow-scripts allow-same-origin allow-modals"
            title="Preview"
          />
        </div>
      </div>
    </div>
  );
}
