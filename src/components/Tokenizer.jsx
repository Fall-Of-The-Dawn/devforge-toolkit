import { useState, useMemo } from "react";

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet at least once.";

function tokenize(text) {
  if (!text) return [];
  const tokens = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === " ") {
      tokens.push({ type: "space", text: " " });
    } else if (ch === "\n") {
      tokens.push({ type: "newline", text: "\n" });
    } else if (ch === "\t") {
      tokens.push({ type: "tab", text: "\t" });
    } else if (/[a-zA-Z0-9]/.test(ch)) {
      let end = i + 1;
      while (end < text.length && /[a-zA-Z0-9]/.test(text[end])) end++;
      tokens.push({ type: "word", text: text.slice(i, end) });
      i = end - 1;
    } else {
      let end = i + 1;
      while (end < text.length && !/[a-zA-Z0-9\s]/.test(text[end])) end++;
      tokens.push({ type: "punct", text: text.slice(i, end) });
      i = end - 1;
    }
  }
  return tokens;
}

function countStats(text) {
  if (!text) return { tokens: 0, words: 0, chars: 0, lines: 0 };
  const words = text.match(/\S+/g) || [];
  return {
    tokens: words.length + Math.floor(words.length * 0.15),
    words: words.length,
    chars: text.length,
    lines: text.split("\n").length,
  };
}

const TOKEN_COLORS = {
  word: { bg: "rgba(255,107,107,0.15)", text: "#FF6B6B", label: "Word" },
  space: { bg: "rgba(255,255,255,0.05)", text: "#555555", label: "Space" },
  punct: { bg: "rgba(130,170,255,0.15)", text: "#82aaff", label: "Punctuation" },
  newline: { bg: "rgba(255,200,50,0.15)", text: "#ffcc33", label: "Newline" },
  tab: { bg: "rgba(200,100,255,0.15)", text: "#c864ff", label: "Tab" },
};

export default function Tokenizer({ isLight }) {
  const [text, setText] = useState(SAMPLE_TEXT);
  const stats = countStats(text);
  const tokens = useMemo(() => tokenize(text), [text]);
  const [hoveredType, setHoveredType] = useState(null);

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[#FF6B6B] bg-[rgba(255,107,107,0.06)]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 7h16M4 12h16M4 17h10" />
          </svg>
        </div>
        <div>
          <h1 className={`text-base font-bold ${isLight ? "text-[#1a1a1a]" : "text-[#e8e8e8]"}`}>Text Tokenizer</h1>
          <p className={`text-[11px] ${isLight ? "text-[#555555]" : "text-[#555555]"}`}>Count tokens, words, characters, and lines</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type text to tokenize..."
            spellCheck={false}
            className={`flex-1 w-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 min-h-[200px] ${isLight ? "bg-white border-gray-200 focus:border-[#FF6B6B] text-gray-900 placeholder:text-gray-400" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#FF6B6B] text-[#e8e8e8] placeholder:text-gray-600"}`}
          />

          {/* Token Preview */}
          <div className={`mt-3 rounded-lg border p-3 ${isLight ? "bg-white border-gray-200" : "bg-[#0a0a0a] border-[#1a1a1a]"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-bold uppercase ${isLight ? "text-gray-500" : "text-gray-400"}`}>Token Preview</span>
              <div className="flex gap-2">
                {Object.entries(TOKEN_COLORS).map(([type, colors]) => (
                  <button
                    key={type}
                    onMouseEnter={() => setHoveredType(type)}
                    onMouseLeave={() => setHoveredType(null)}
                    className="flex items-center gap-1 text-[9px] cursor-pointer"
                    style={{ color: colors.text }}
                  >
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: colors.text }} />
                    {colors.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={`font-mono text-sm leading-relaxed break-all ${isLight ? "text-gray-800" : "text-[#e8e8e8]"}`}>
              {tokens.map((token, i) => {
                const colors = TOKEN_COLORS[token.type];
                const isHighlighted = !hoveredType || hoveredType === token.type;
                const display = token.type === "newline" ? "↵" : token.type === "tab" ? "→    " : token.text;
                return (
                  <span
                    key={i}
                    className="inline transition-opacity duration-150"
                    style={{
                      backgroundColor: isHighlighted ? colors.bg : "transparent",
                      color: isHighlighted ? colors.text : (isLight ? "#1a1a1a" : "#e8e8e8"),
                      opacity: hoveredType && !isHighlighted ? 0.3 : 1,
                      borderRadius: "2px",
                    }}
                    title={`${colors.label}: "${token.text.replace(/\n/g, "\\n").replace(/\t/g, "\\t")}"`}
                  >
                    {display}
                  </span>
                );
              })}
              {tokens.length === 0 && (
                <span className={isLight ? "text-gray-400" : "text-gray-600"}>No tokens to display</span>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-56 flex flex-col gap-3">
          <div className={`rounded-lg border p-4 space-y-3 ${isLight ? "bg-white border-gray-200" : "bg-[#0a0a0a] border-[#1a1a1a]"}`}>
            <div className="flex justify-between items-center">
              <span className={`text-xs font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`}>Tokens (est.)</span>
              <span className="text-lg font-bold text-[#FF6B6B]">{stats.tokens}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`}>Words</span>
              <span className={`text-sm font-bold ${isLight ? "text-[#1a1a1a]" : "text-[#e8e8e8]"}`}>{stats.words}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`}>Characters</span>
              <span className={`text-sm font-bold ${isLight ? "text-[#1a1a1a]" : "text-[#e8e8e8]"}`}>{stats.chars}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-xs font-medium ${isLight ? "text-gray-600" : "text-gray-400"}`}>Lines</span>
              <span className={`text-sm font-bold ${isLight ? "text-[#1a1a1a]" : "text-[#e8e8e8]"}`}>{stats.lines}</span>
            </div>
          </div>

          <div className={`rounded-lg border p-4 space-y-2 ${isLight ? "bg-white border-gray-200" : "bg-[#0a0a0a] border-[#1a1a1a]"}`}>
            <span className={`text-[10px] font-bold uppercase ${isLight ? "text-gray-500" : "text-gray-400"}`}>Token Breakdown</span>
            {Object.entries(TOKEN_COLORS).map(([type, colors]) => {
              const count = tokens.filter(t => t.type === type).length;
              if (count === 0) return null;
              return (
                <div key={type} className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: colors.text }} />
                    <span className={`text-[11px] ${isLight ? "text-gray-600" : "text-gray-400"}`}>{colors.label}</span>
                  </div>
                  <span className={`text-xs font-mono font-bold ${isLight ? "text-[#1a1a1a]" : "text-[#e8e8e8]"}`}>{count}</span>
                </div>
              );
            })}
          </div>

          <div className={`rounded-lg border p-3 ${isLight ? "bg-white border-gray-200" : "bg-[#0a0a0a] border-[#1a1a1a]"}`}>
            <p className={`text-[11px] leading-relaxed ${isLight ? "text-[#555555]" : "text-[#555555]"}`}>
              Token count is estimated. Actual count varies by model tokenizer. Useful for LLM prompt limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
