import { useState, useMemo } from "react";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "officia",
  "deserunt", "mollit", "anim", "est", "curabitur", "pretium", "tincidunt",
  "lacus", "nulla", "gravida", "orci", "odio", "varius", "turpis", "commodo",
  "pharetra", "eros", "bibendum", "luctus", "mauris", "integer", "sagittis",
  "vitis", "vestibulum", "ante", "primis", "faucibus", "ultrices", "posuere",
  "cubilia", "curae", "ac", "dui", "nibh", "morbi", "purus", "sapien",
  "ridiculus", "mus", "facilisis", "felis", "donec", "fringilla", "congue",
  "risus", "maecenas", "consequat", "massa", "cras", "placerat", "imperdiet",
];

function randomSentence() {
  const len = 8 + Math.floor(Math.random() * 12);
  const words = [];
  for (let j = 0; j < len; j++) {
    words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  words[0] = words[0][0].toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function randomParagraph() {
  const sentenceCount = 3 + Math.floor(Math.random() * 5);
  const sentences = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(randomSentence());
  }
  return sentences.join(" ");
}

function generateText(type, count) {
  if (type === "paragraphs") {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(randomParagraph());
    }
    return result.join("\n\n");
  }
  if (type === "sentences") {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(randomSentence());
    }
    return result.join(" ");
  }
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return result.join(" ");
}

export default function LoremIpsumGenerator({ isLight, mutedText }) {
  const [type, setType] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [copied, setCopied] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const output = useMemo(() => generateText(type, count), [type, count, refreshKey]);

  const wordCount = output.split(/\s+/).filter(Boolean).length;
  const charCount = output.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Lorem Ipsum Generator</h1>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-mono ${mutedText}`}>{wordCount} words · {charCount} chars</span>
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${isLight ? "bg-white border-[#e2e0da] text-[#5a5f6e] hover:text-[#1a1d26] hover:border-[#d0cec8]" : "bg-[#12151e] border-[#1c2030] text-[#505868] hover:text-[#c8ccd4] hover:border-[#2a3045]"}`}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Refresh
          </button>
          <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${isLight ? "bg-white border-[#e2e0da] text-[#5a5f6e] hover:text-[#1a1d26] hover:border-[#d0cec8]" : "bg-[#12151e] border-[#1c2030] text-[#505868] hover:text-[#c8ccd4] hover:border-[#2a3045]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex gap-1.5">
          {["paragraphs", "sentences", "words"].map((t) => (
            <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer capitalize ${type === t ? (isLight ? "bg-[#fff0f0] border-[#e0d0d0] text-[#c53a3a]" : "bg-[#FF6B6B]/10 border-[#FF6B6B]/30 text-[#FF6B6B]") : (isLight ? "bg-white border-[#e2e0da] text-[#5a5f6e] hover:text-[#1a1d26]" : "bg-[#12151e] border-[#1c2030] text-[#505868] hover:text-[#c8ccd4]")}`}>{t}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCount(Math.max(1, count - 1))} className={`w-7 h-7 rounded border text-sm font-bold transition-all cursor-pointer ${isLight ? "bg-white border-[#e2e0da] text-[#5a5f6e] hover:text-[#1a1d26]" : "bg-[#12151e] border-[#1c2030] text-[#505868] hover:text-[#c8ccd4]"}`}>-</button>
          <input
            type="number"
            min="1"
            max="500"
            value={count}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v)) setCount(Math.min(500, Math.max(1, v)));
            }}
            className={`w-16 px-2 py-1 text-sm font-mono text-center rounded border bg-transparent focus:outline-none transition-colors ${isLight ? "border-[#e2e0da] focus:border-[#c53a3a] text-[#1a1d26]" : "border-[#1c2030] focus:border-[#FF6B6B] text-[#c8ccd4]"}`}
          />
          <button onClick={() => setCount(Math.min(500, count + 1))} className={`w-7 h-7 rounded border text-sm font-bold transition-all cursor-pointer ${isLight ? "bg-white border-[#e2e0da] text-[#5a5f6e] hover:text-[#1a1d26]" : "bg-[#12151e] border-[#1c2030] text-[#505868] hover:text-[#c8ccd4]"}`}>+</button>
        </div>
      </div>

      <div className={`flex-1 rounded-lg border p-5 overflow-auto select-all ${isLight ? "bg-white border-[#e2e0da] text-[#1a1d26]" : "bg-[#0a0c12] border-[#1c2030] text-[#c8ccd4]"}`}>
        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isLight ? "!text-[#1a1d26]" : "!text-[#c8ccd4]"}`}>{output}</p>
      </div>
    </div>
  );
}
