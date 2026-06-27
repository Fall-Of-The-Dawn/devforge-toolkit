import { useState, useMemo } from "react";

export default function RegexTester({ isLight, mutedText }) {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testString) return { matches: [], highlighted: testString, error: "" };
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [];
      let match;
      const isGlobal = flags.includes("g");

      if (isGlobal) {
        while ((match = regex.exec(testString)) !== null) {
          matches.push({ value: match[0], index: match.index, groups: match.slice(1) });
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          matches.push({ value: match[0], index: match.index, groups: match.slice(1) });
        }
      }

      if (matches.length === 0) return { matches: [], highlighted: testString, error: "" };

      const parts = [];
      let lastIndex = 0;
      for (const m of matches) {
        if (m.index > lastIndex) parts.push({ text: testString.slice(lastIndex, m.index), highlight: false });
        parts.push({ text: m.value, highlight: true });
        lastIndex = m.index + m.value.length;
      }
      if (lastIndex < testString.length) parts.push({ text: testString.slice(lastIndex), highlight: false });

      return { matches, highlighted: parts, error: "" };
    } catch (e) {
      return { matches: [], highlighted: testString, error: e.message };
    }
  }, [pattern, flags, testString]);

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Regex Tester</h1>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 px-2 py-1 rounded border text-[10px] font-mono ${isLight ? "bg-gray-50 border-gray-200 text-gray-500" : "bg-[#111] border-[#1a1a1a] text-[#666]"}`}>
            <span className={`${mutedText}`}>FLAGS:</span>
            {["g", "i", "m", "s"].map((f) => (
              <button key={f} onClick={() => setFlags(flags.includes(f) ? flags.replace(f, "") : flags + f)} className={`w-5 h-5 rounded text-[10px] font-bold transition-all cursor-pointer ${flags.includes(f) ? (isLight ? "bg-[#fff0f0] text-[#c53a3a]" : "bg-[#FF6B6B]/10 text-[#FF6B6B]") : (isLight ? "text-gray-400 hover:text-gray-600" : "text-[#444] hover:text-[#888]")}`}>{f}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className={`text-lg font-mono ${isLight ? "text-gray-400" : "text-[#555]"}`}>/</span>
        <input
          type="text"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          className={`flex-1 px-3 py-2 font-mono text-sm rounded-md border bg-transparent focus:outline-none transition-colors ${isLight ? "border-gray-200 focus:border-[#FF6B6B] text-gray-900" : "border-[#1a1a1a] focus:border-[#FF6B6B] text-[#e0e0e0]"}`}
          placeholder="Enter regex pattern... e.g. \b\w+@\w+\.\w+\b"
        />
        <span className={`text-lg font-mono ${isLight ? "text-gray-400" : "text-[#555]"}`}>/</span>
        <span className={`text-sm font-mono ${isLight ? "text-gray-500" : "text-[#666]"}`}>{flags}</span>
      </div>

      {result.error && (
        <div className="mb-3 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
          {result.error}
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row gap-4 min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <label className={`text-xs ${mutedText} mb-2 font-mono`}>TEST STRING</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-gray-200 focus:border-[#FF6B6B] text-gray-900" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#FF6B6B] text-[#e0e0e0]"}`}
            placeholder="Enter test string to match against...\n\nExample:\njohn@example.com and jane@test.org are emails."
            spellCheck={false}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-2">
            <label className={`text-xs ${mutedText} font-mono`}>HIGHLIGHTED MATCHES</label>
            <span className={`text-xs font-mono ${mutedText}`}>{result.matches.length} match{result.matches.length !== 1 ? "es" : ""}</span>
          </div>
          <div className={`w-full h-full rounded-lg p-4 font-mono text-sm leading-relaxed overflow-auto border transition-colors duration-200 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#080808] border-[#161616]"}`}>
            {typeof result.highlighted === "string" ? (
              <span className={isLight ? "text-gray-700" : "text-[#888]"}>{result.highlighted || "Matches will appear here highlighted..."}</span>
            ) : (
              <span className="whitespace-pre-wrap">
                {result.highlighted.map((part, i) => part.highlight ? (
                  <span key={i} className="bg-[#FF6B6B]/20 text-[#FF6B6B] rounded px-0.5">{part.text}</span>
                ) : (
                  <span key={i} className={isLight ? "text-gray-700" : "text-[#888]"}>{part.text}</span>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>

      {result.matches.length > 0 && (
        <div className={`mt-3 rounded-lg border p-3 max-h-40 overflow-y-auto ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
          <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>Match Details</label>
          <div className="space-y-1">
            {result.matches.slice(0, 10).map((m, i) => (
              <div key={i} className={`flex items-center gap-3 text-xs font-mono ${isLight ? "text-gray-600" : "text-[#888]"}`}>
                <span className={`w-6 text-right ${mutedText}`}>#{i + 1}</span>
                <span className="text-[#FF6B6B]">"{m.value}"</span>
                <span className={mutedText}>at index {m.index}</span>
                {m.groups.length > 0 && (
                  <span className={mutedText}>groups: [{m.groups.map((g) => `"${g}"`).join(", ")}]</span>
                )}
              </div>
            ))}
            {result.matches.length > 10 && (
              <span className={`text-xs ${mutedText}`}>... and {result.matches.length - 10} more</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
