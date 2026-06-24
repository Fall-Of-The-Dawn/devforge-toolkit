import { useState, useMemo } from "react";
import { computeDiff } from "../utils/diff";

function WordDiff({ wordDiff }) {
  return (
    <span className="whitespace-pre-wrap">
      {wordDiff.map((seg, i) => {
        if (seg.type === "equal") return <span key={i}>{seg.value}</span>;
        if (seg.type === "removed") {
          return (
            <span key={i} className="bg-red-500/20 text-red-400 line-through decoration-red-400/50 rounded-sm px-0.5">
              {seg.value}
            </span>
          );
        }
        if (seg.type === "added") {
          return (
            <span key={i} className="bg-[#f0a500]/10 text-[#f0a500] rounded-sm px-0.5">
              {seg.value}
            </span>
          );
        }
        return <span key={i}>{seg.value}</span>;
      })}
    </span>
  );
}

function LightWordDiff({ wordDiff }) {
  return (
    <span className="whitespace-pre-wrap">
      {wordDiff.map((seg, i) => {
        if (seg.type === "equal") return <span key={i}>{seg.value}</span>;
        if (seg.type === "removed") {
          return (
            <span key={i} className="bg-red-500/15 text-red-600 line-through decoration-red-400/50 rounded-sm px-0.5">
              {seg.value}
            </span>
          );
        }
        if (seg.type === "added") {
          return (
            <span key={i} className="bg-[#fff8ed] text-[#c87d0a] rounded-sm px-0.5">
              {seg.value}
            </span>
          );
        }
        return <span key={i}>{seg.value}</span>;
      })}
    </span>
  );
}

function extractWords(text) {
  return text.match(/[\w]+/g) || [];
}

function WordFinder({ textA, setTextA, textB, setTextB, isLight, mutedText }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(new Set());
  const [activeTab, setActiveTab] = useState("original");

  const sourceText = activeTab === "original" ? textA : textB;

  const matchingWords = useMemo(() => {
    if (!search.trim()) return [];
    const pattern = search.toLowerCase();
    const words = extractWords(sourceText);
    const seen = new Map();
    words.forEach((word) => {
      if (word.toLowerCase().includes(pattern)) {
        const key = word.toLowerCase();
        if (!seen.has(key)) seen.set(key, { word, count: 0 });
        seen.get(key).count++;
      }
    });
    return Array.from(seen.values());
  }, [search, sourceText]);

  const totalMatches = matchingWords.reduce((sum, m) => sum + m.count, 0);

  const toggleWord = (word) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word);
      else next.add(word);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === matchingWords.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(matchingWords.map((m) => m.word.toLowerCase())));
    }
  };

  const doDelete = () => {
    if (selected.size === 0) return;
    const words = sourceText.split(/(\s+)/);
    const newWords = words.filter((w) => {
      if (/^\s+$/.test(w)) return true;
      return !selected.has(w.toLowerCase());
    });
    const newText = newWords.join("");
    if (activeTab === "original") setTextA(newText);
    else setTextB(newText);
    setSelected(new Set());
  };

  return (
    <div className={`rounded-lg border p-3 mb-4 ${isLight ? "bg-white border-[#e2e0da]" : "bg-[#12151e] border-[#1c2030]"}`}>
      <div className="flex items-center gap-2 mb-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Word Finder</span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="flex rounded-md border overflow-hidden flex-shrink-0">
          {["original", "modified"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelected(new Set()); }}
              className={`px-2.5 py-1 text-[10px] font-bold uppercase transition-colors cursor-pointer ${
                activeTab === tab
                  ? isLight ? "bg-[#1a1d26] text-[#f7f6f3]" : "bg-[#e2e5eb] text-[#0c0e14]"
                  : isLight ? "bg-white text-[#5a5f6e] hover:text-[#1a1d26]" : "bg-[#12151e] text-[#505868] hover:text-[#c8ccd4]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setSelected(new Set()); }}
          placeholder='Type to find words (e.g. "fe", "ad")...'
          className={`flex-1 px-3 py-1.5 text-xs font-mono rounded-md border bg-transparent focus:outline-none transition-colors ${
            isLight ? "border-[#e2e0da] focus:border-[#c87d0a] text-[#1a1d26] placeholder:text-[#9ca3b0]" : "border-[#1c2030] focus:border-[#f0a500] text-[#c8ccd4] placeholder:text-[#505868]"
          }`}
        />
      </div>

      {search.trim() && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`text-[10px] ${mutedText}`}>
              {totalMatches} match{totalMatches !== 1 ? "es" : ""} across {matchingWords.length} unique word{matchingWords.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleAll}
                className={`px-2 py-0.5 text-[10px] font-bold rounded border transition-colors cursor-pointer ${
                  isLight ? "border-[#e2e0da] text-[#5a5f6e] hover:text-[#1a1d26]" : "border-[#1c2030] text-[#505868] hover:text-[#c8ccd4]"
                }`}
              >
                {selected.size === matchingWords.length ? "Deselect all" : "Select all"}
              </button>
              <button
                onClick={doDelete}
                disabled={selected.size === 0}
                className={`px-2 py-0.5 text-[10px] font-bold rounded border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                  selected.size > 0
                    ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                    : isLight ? "border-[#e2e0da] text-[#9ca3b0]" : "border-[#1c2030] text-[#505868]"
                }`}
              >
                Delete {selected.size > 0 ? `(${selected.size})` : ""}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {matchingWords.map((m) => {
              const isSelected = selected.has(m.word.toLowerCase());
              return (
                <button
                  key={m.word.toLowerCase()}
                  onClick={() => toggleWord(m.word.toLowerCase())}
                  className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-mono rounded-md border transition-all cursor-pointer ${
                    isSelected
                      ? "border-red-500/40 bg-red-500/10 text-red-400 line-through"
                      : isLight
                        ? "border-[#e2e0da] bg-[#f7f6f3] text-[#1a1d26] hover:border-[#c87d0a]/40"
                        : "border-[#1c2030] bg-[#0c0e14] text-[#c8ccd4] hover:border-[rgba(240,165,0,0.3)]"
                  }`}
                >
                  {m.word}
                  {m.count > 1 && (
                    <span className={`text-[9px] px-1 rounded ${isLight ? "bg-[#e2e0da] text-[#5a5f6e]" : "bg-[#1c2030] text-[#505868]"}`}>
                      ×{m.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {matchingWords.length === 0 && (
            <p className={`text-xs text-center py-2 ${mutedText}`}>No words found matching "{search}"</p>
          )}
        </div>
      )}
    </div>
  );
}

function DiffFilter({ filter, setFilter, stats, isLight, mutedText }) {
  const filters = [
    { id: "all", label: "All", count: stats.total },
    { id: "added", label: "Added", count: stats.added, color: "text-[#f0a500]" },
    { id: "removed", label: "Removed", count: stats.removed, color: "text-red-400" },
    { id: "unchanged", label: "Unchanged", count: stats.unchanged, color: mutedText },
  ];

  return (
    <div className="flex items-center gap-1 mb-3">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => setFilter(f.id)}
          className={`px-2.5 py-1 text-[10px] font-bold rounded-md border transition-all cursor-pointer ${
            filter === f.id
              ? isLight ? "bg-[#1a1d26] text-[#f7f6f3] border-[#1a1d26]" : "bg-[#e2e5eb] text-[#0c0e14] border-[#e2e5eb]"
              : isLight
                ? "bg-white text-[#5a5f6e] border-[#e2e0da] hover:border-[#d0cec8]"
                : "bg-[#12151e] text-[#505868] border-[#1c2030] hover:border-[#2a3045]"
          }`}
        >
          {f.label}
          <span className={`ml-1 ${f.color || ""}`}>{f.count}</span>
        </button>
      ))}
    </div>
  );
}

export default function TextDiff({ isLight, mutedText }) {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [diffFilter, setDiffFilter] = useState("all");

  const result = computeDiff(textA, textB);

  const stats = useMemo(() => {
    let added = 0, removed = 0, unchanged = 0;
    result.forEach((r) => {
      if (r.type === "added") added++;
      else if (r.type === "removed") removed++;
      else if (r.type === "changed") { added++; removed++; }
      else if (r.type === "unchanged") unchanged++;
    });
    return { added, removed, unchanged, total: result.length };
  }, [result]);

  const filteredResult = useMemo(() => {
    if (diffFilter === "all") return result;
    return result.filter((line) => {
      if (diffFilter === "added") return line.type === "added" || line.type === "changed";
      if (diffFilter === "removed") return line.type === "removed" || line.type === "changed";
      if (diffFilter === "unchanged") return line.type === "unchanged";
      return true;
    });
  }, [result, diffFilter]);

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Text Diff</label>
        <button onClick={() => setShowOutput(!showOutput)} className={`px-3.5 py-2 text-xs font-bold text-[#0c0e14] bg-[#f0a500] hover:bg-[#d4920a] rounded-md transition-all duration-150 hover:shadow-lg hover:shadow-[#f0a500]/20 cursor-pointer`}>
          {showOutput ? "Edit" : "Compare"}
        </button>
      </div>

      {!showOutput ? (
        <div className="flex-1 flex flex-col min-h-0">
          <WordFinder textA={textA} setTextA={setTextA} textB={textB} setTextB={setTextB} isLight={isLight} mutedText={mutedText} />
          <div className="flex-1 flex gap-4 min-h-0">
            <div className="flex-1 flex flex-col min-w-0">
              <label className={`text-xs ${mutedText} mb-2 font-mono`}>ORIGINAL</label>
              <textarea
                value={textA}
                onChange={(e) => setTextA(e.target.value)}
                className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-[#e2e0da] focus:border-[#c87d0a] text-[#1a1d26] placeholder:text-[#9ca3b0]" : "bg-[#0a0c12] border-[#1c2030] focus:border-[#f0a500] text-[#c8ccd4] placeholder:text-[#505868]"}`}
                placeholder="Paste the original or left-side text to compare...&#10;&#10;This is the baseline version of your content."
                spellCheck={false}
              />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <label className={`text-xs ${mutedText} mb-2 font-mono`}>MODIFIED</label>
              <textarea
                value={textB}
                onChange={(e) => setTextB(e.target.value)}
                className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-[#e2e0da] focus:border-[#c87d0a] text-[#1a1d26] placeholder:text-[#9ca3b0]" : "bg-[#0a0c12] border-[#1c2030] focus:border-[#f0a500] text-[#c8ccd4] placeholder:text-[#505868]"}`}
                placeholder="Paste the modified or right-side text to compare...&#10;&#10;Changes against the original will be highlighted."
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-w-0 gap-0">
          <DiffFilter filter={diffFilter} setFilter={setDiffFilter} stats={stats} isLight={isLight} mutedText={mutedText} />
          <div className={`flex-1 overflow-auto border rounded-lg font-mono text-sm ${isLight ? "bg-white border-[#e2e0da]" : "bg-[#0a0c12] border-[#1c2030]"}`}>
            {filteredResult.length === 0 && (
              <div className={`text-center py-8 text-xs ${mutedText}`}>No lines match this filter</div>
            )}
            {filteredResult.map((line, idx) => {
              if (line.type === "separator") {
                return (
                  <div key={idx} className="px-4 py-2 text-center">
                    <span className={`text-xs px-3 py-1 rounded ${isLight ? "text-[#9ca3b0] bg-[#f0efe9]" : "text-[#505868] bg-[#12151e]"}`}>{line.content}</span>
                  </div>
                );
              }

              if (line.type === "unchanged") {
                return (
                  <div key={idx} className={`flex border-l-2 border-l-transparent`}>
                    <span className={`w-12 shrink-0 px-2 py-1.5 text-right text-[10px] select-none border-r ${isLight ? "border-[#f0efe9] text-[#9ca3b0] bg-[#f7f6f3]" : "border-[#1c2030] text-[#505868] bg-[#0a0c12]"}`}>{line.oldNum}</span>
                    <span className={`w-8 shrink-0 px-1 py-1.5 text-center text-[11px] font-bold select-none ${isLight ? "text-[#d0cec8]" : "text-[#1c2030]"}`}> </span>
                    <span className={`flex-1 px-3 py-1.5 ${isLight ? "text-[#5a5f6e]" : "text-[#505868]"}`}>{line.oldLine}</span>
                  </div>
                );
              }

              if (line.type === "changed") {
                const WordComp = isLight ? LightWordDiff : WordDiff;
                return (
                  <div key={idx}>
                    <div className="flex border-l-2 border-l-red-400 bg-red-500/10">
                      <span className="w-12 shrink-0 px-2 py-1.5 text-right text-[10px] select-none border-r bg-red-500/20 text-red-500">{line.oldNum}</span>
                      <span className="w-8 shrink-0 px-1 py-1.5 text-center text-[11px] font-bold select-none text-red-500">-</span>
                      <span className="flex-1 px-3 py-1.5 text-red-400"><WordComp wordDiff={line.wordDiff.filter(s => s.type !== "added")} /></span>
                    </div>
                    <div className="flex border-l-2 border-l-[#f0a500] bg-[#f0a500]/5">
                      <span className="w-12 shrink-0 px-2 py-1.5 text-right text-[10px] select-none border-r bg-[#f0a500]/10 text-[#f0a500]">{line.newNum}</span>
                      <span className="w-8 shrink-0 px-1 py-1.5 text-center text-[11px] font-bold select-none text-[#f0a500]">+</span>
                      <span className="flex-1 px-3 py-1.5 text-[#f0a500]"><WordComp wordDiff={line.wordDiff.filter(s => s.type !== "removed")} /></span>
                    </div>
                  </div>
                );
              }

              if (line.type === "removed") {
                const WordComp = isLight ? LightWordDiff : WordDiff;
                return (
                  <div key={idx} className="flex border-l-2 border-l-red-400 bg-red-500/10">
                    <span className="w-12 shrink-0 px-2 py-1.5 text-right text-[10px] select-none border-r bg-red-500/20 text-red-500">{line.oldNum}</span>
                    <span className="w-8 shrink-0 px-1 py-1.5 text-center text-[11px] font-bold select-none text-red-500">-</span>
                    <span className="flex-1 px-3 py-1.5 text-red-400"><WordComp wordDiff={line.wordDiff} /></span>
                  </div>
                );
              }

              if (line.type === "added") {
                const WordComp = isLight ? LightWordDiff : WordDiff;
                return (
                  <div key={idx} className="flex border-l-2 border-l-[#f0a500] bg-[#f0a500]/5">
                    <span className="w-12 shrink-0 px-2 py-1.5 text-right text-[10px] select-none border-r bg-[#f0a500]/10 text-[#f0a500]">{line.newNum}</span>
                    <span className="w-8 shrink-0 px-1 py-1.5 text-center text-[11px] font-bold select-none text-[#f0a500]">+</span>
                    <span className="flex-1 px-3 py-1.5 text-[#f0a500]"><WordComp wordDiff={line.wordDiff} /></span>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
