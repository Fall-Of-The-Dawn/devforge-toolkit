import { useState, useMemo } from "react";

const DEFAULT_CSS = `/* OmniStack Sample Styles */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #0a0a0a;
  color: #e0e0e0;
  font-family: system-ui, sans-serif;
}

.card {
  background: #1a1a1a;
  border: 1px solid #333333;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.card:hover {
  border-color: #f0a500;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 230, 118, 0.15);
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background-color: #f0a500;
  color: #000000;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.button:hover {
  background-color: #d4920a;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  .card {
    padding: 16px;
  }
}`;

function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .replace(/\s+/g, " ")
    .trim();
}

function beautifyCSS(css) {
  let result = "";
  let indent = 0;
  const lines = css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").split(/([{}])/);

  for (const part of lines) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    if (trimmed === "{") {
      result += " {\n";
      indent++;
    } else if (trimmed === "}") {
      indent--;
      result += `${"  ".repeat(indent)}}\n`;
    } else {
      const declarations = trimmed.split(";").filter(Boolean);
      for (const decl of declarations) {
        result += `${"  ".repeat(indent)}${decl.trim()};\n`;
      }
    }
  }
  return result.trim();
}

export default function CssMinifier({ isLight, mutedText }) {
  const [input, setInput] = useState(DEFAULT_CSS);
  const [mode, setMode] = useState("minify");
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => {
    if (!input.trim()) return "";
    return mode === "minify" ? minifyCSS(input) : beautifyCSS(input);
  }, [input, mode]);

  const savings = useMemo(() => {
    if (!input.trim()) return 0;
    return Math.round((1 - output.length / input.length) * 100);
  }, [input, output]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>CSS Minifier / Beautifier</label>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button onClick={() => setMode("minify")} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${mode === "minify" ? (isLight ? "bg-[#fff8ed] border-[#f0dfc0] text-[#c87d0a]" : "bg-[#f0a500]/10 border-[#f0a500]/30 text-[#f0a500]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500" : "bg-[#111] border-[#1a1a1a] text-[#666]")}`}>Minify</button>
            <button onClick={() => setMode("beautify")} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${mode === "beautify" ? (isLight ? "bg-[#fff8ed] border-[#f0dfc0] text-[#c87d0a]" : "bg-[#f0a500]/10 border-[#f0a500]/30 text-[#f0a500]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500" : "bg-[#111] border-[#1a1a1a] text-[#666]")}`}>Beautify</button>
          </div>
          <button onClick={handleCopy} disabled={!output} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {mode === "minify" && input.trim() && (
        <div className={`flex items-center gap-4 mb-3 text-[10px] font-mono ${mutedText}`}>
          <span>Input: {input.length} chars</span>
          <span className="text-[#f0a500]">Output: {output.length} chars</span>
          <span className={savings >= 0 ? "text-green-400" : "text-red-400"}>{savings > 0 ? `-${savings}%` : `${savings}%`}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>INPUT</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-gray-200 focus:border-[#f0a500] text-gray-900" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#f0a500] text-[#e0e0e0]"}`}
            placeholder="Paste CSS code here..."
            spellCheck={false}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>OUTPUT</label>
          <div className={`w-full h-full rounded-lg p-4 font-mono text-sm leading-relaxed overflow-auto select-all border transition-colors duration-200 ${isLight ? "bg-gray-50 border-gray-200 text-gray-900" : "bg-[#080808] border-[#161616] text-[#e0e0e0]"}`}>
            <pre className="whitespace-pre-wrap break-all">{output}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
