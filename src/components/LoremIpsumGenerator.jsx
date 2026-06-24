import { useState, useMemo } from "react";

const PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula ut dictum pharetra, nisi nunc fringilla magna, in commodo elit erat nec turpis. Ut pharetra augue nec augue.",
  "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.",
  "Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est.",
  "Sed lectus. Integer fringilla congue eros. Sed risus. Maecenas consequat massa sit amet dolor. Cras placerat imperdiet risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris.",
  "Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.",
];

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
  "pharetra", "eros", "bibendum", "elit", "luctus", "mauris", "integer",
  "sagittis", "vitis", "vestibulum", "ante", "primis", "faucibus", "ultrices",
  "posuere", "cubilia", "curae", "ac", "dui", "nibh", "morbi", "purus",
  "sapien", "ridiculus", "mus", "facilisis", "felis", "donec", "fringilla",
];

function generateText(type, count) {
  if (type === "paragraphs") {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(PARAGRAPHS[i % PARAGRAPHS.length]);
    }
    return result.join("\n\n");
  }
  if (type === "sentences") {
    const result = [];
    for (let i = 0; i < count; i++) {
      const words = [];
      const len = 8 + Math.floor(Math.random() * 12);
      for (let j = 0; j < len; j++) {
        words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
      }
      words[0] = words[0][0].toUpperCase() + words[0].slice(1);
      result.push(words.join(" ") + ".");
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

  const output = useMemo(() => generateText(type, count), [type, count]);

  const wordCount = output.split(/\s+/).filter(Boolean).length;
  const charCount = output.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Lorem Ipsum Generator</label>
        <div className="flex items-center gap-3">
          <span className={`text-[10px] font-mono ${mutedText}`}>{wordCount} words · {charCount} chars</span>
          <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex gap-1.5">
          {["paragraphs", "sentences", "words"].map((t) => (
            <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer capitalize ${type === t ? (isLight ? "bg-green-50 border-green-200 text-green-600" : "bg-[#00e676]/10 border-[#00e676]/30 text-[#00e676]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#999]")}`}>{t}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCount(Math.max(1, count - 1))} className={`w-7 h-7 rounded border text-sm font-bold transition-all cursor-pointer ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc]"}`}>-</button>
          <input
            type="number"
            min="1"
            max="500"
            value={count}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v)) setCount(Math.min(500, Math.max(1, v)));
            }}
            className={`w-16 px-2 py-1 text-sm font-mono text-center rounded border bg-transparent focus:outline-none transition-colors ${isLight ? "border-gray-200 focus:border-green-400 text-gray-700" : "border-[#1a1a1a] focus:border-[#00e676] text-[#ccc]"}`}
          />
          <button onClick={() => setCount(Math.min(500, count + 1))} className={`w-7 h-7 rounded border text-sm font-bold transition-all cursor-pointer ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc]"}`}>+</button>
        </div>
      </div>

      <div className={`flex-1 rounded-lg border p-5 overflow-auto select-all ${isLight ? "bg-white border-gray-200 text-gray-800" : "bg-[#0a0a0a] border-[#1a1a1a] text-[#ccc]"}`}>
        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${isLight ? "!text-gray-800" : "!text-[#ccc]"}`}>{output}</p>
      </div>
    </div>
  );
}
