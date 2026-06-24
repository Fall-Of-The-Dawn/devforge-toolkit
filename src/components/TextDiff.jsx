import { useState } from "react";
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
            <span key={i} className="bg-green-500/20 text-green-400 rounded-sm px-0.5">
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
            <span key={i} className="bg-green-500/15 text-green-600 rounded-sm px-0.5">
              {seg.value}
            </span>
          );
        }
        return <span key={i}>{seg.value}</span>;
      })}
    </span>
  );
}

export default function TextDiff({ isLight, mutedText }) {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const result = computeDiff(textA, textB);

  const stats = {
    added: result.filter((r) => r.type === "added" || r.type === "changed").length,
    removed: result.filter((r) => r.type === "removed" || r.type === "changed").length,
    unchanged: result.filter((r) => r.type === "unchanged").length,
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Text Diff</label>
        <button onClick={() => setShowOutput(!showOutput)} className={`px-3.5 py-2 text-xs font-bold text-[#0a0a0a] bg-[#00e676] hover:bg-[#00c868] rounded-md transition-all duration-150 hover:shadow-lg hover:shadow-[#00e676]/20 cursor-pointer`}>
          {showOutput ? "Edit" : "Compare"}
        </button>
      </div>

      {!showOutput ? (
        <div className="flex-1 flex gap-4 min-h-0">
          <div className="flex-1 flex flex-col min-w-0">
            <label className={`text-xs ${mutedText} mb-2 font-mono`}>ORIGINAL</label>
            <textarea
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-gray-200 focus:border-green-400 text-gray-800" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#00e676] text-[#ccc]"}`}
              placeholder="Paste the original or left-side text to compare...\n\nThis is the baseline version of your content."
              spellCheck={false}
            />
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <label className={`text-xs ${mutedText} mb-2 font-mono`}>MODIFIED</label>
            <textarea
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              className={`w-full h-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 ${isLight ? "bg-white border-gray-200 focus:border-green-400 text-gray-800" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#00e676] text-[#ccc]"}`}
              placeholder="Paste the modified or right-side text to compare...\n\nChanges against the original will be highlighted."
              spellCheck={false}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-w-0 gap-0">
          <div className={`flex items-center gap-4 text-xs font-mono ${mutedText} px-4 py-3 border-b ${isLight ? "border-gray-200 bg-gray-50" : "border-[#1a1a1a] bg-[#0d0d0d]"}`}>
            <span className="text-green-400">+{stats.added} changed/added</span>
            <span className="text-red-400">-{stats.removed} changed/removed</span>
            <span className="text-gray-400">{stats.unchanged} unchanged</span>
          </div>
          <div className={`flex-1 overflow-auto border rounded-lg font-mono text-sm ${isLight ? "bg-white border-gray-200" : "bg-[#0a0a0a] border-[#1a1a1a]"}`}>
            {result.map((line, idx) => {
              if (line.type === "separator") {
                return (
                  <div key={idx} className="px-4 py-2 text-center">
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded">{line.content}</span>
                  </div>
                );
              }

              if (line.type === "unchanged") {
                const lineNumBg = isLight ? "text-gray-400 bg-gray-50" : "text-[#555] bg-[#0a0a0a]";
                return (
                  <div key={idx} className={`flex border-l-2 border-l-transparent ${isLight ? "bg-white" : ""}`}>
                    <span className={`w-12 shrink-0 px-2 py-1.5 text-right text-[10px] select-none border-r ${isLight ? "border-gray-100" : "border-[#1a1a1a]"} ${lineNumBg}`}>{line.oldNum}</span>
                    <span className={`w-8 shrink-0 px-1 py-1.5 text-center text-[11px] font-bold select-none ${isLight ? "text-gray-300" : "text-[#333]"}`}> </span>
                    <span className={`flex-1 px-3 py-1.5 ${isLight ? "text-gray-600" : "text-[#777]"}`}>{line.oldLine}</span>
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
                    <div className="flex border-l-2 border-l-green-400 bg-green-500/10">
                      <span className="w-12 shrink-0 px-2 py-1.5 text-right text-[10px] select-none border-r bg-green-500/20 text-green-500">{line.newNum}</span>
                      <span className="w-8 shrink-0 px-1 py-1.5 text-center text-[11px] font-bold select-none text-green-500">+</span>
                      <span className="flex-1 px-3 py-1.5 text-green-400"><WordComp wordDiff={line.wordDiff.filter(s => s.type !== "removed")} /></span>
                    </div>
                  </div>
                );
              }

              if (line.type === "removed") {
                const lineNumBg = "bg-red-500/20 text-red-500";
                const WordComp = isLight ? LightWordDiff : WordDiff;
                return (
                  <div key={idx} className="flex border-l-2 border-l-red-400 bg-red-500/10">
                    <span className={`w-12 shrink-0 px-2 py-1.5 text-right text-[10px] select-none border-r ${lineNumBg}`}>{line.oldNum}</span>
                    <span className="w-8 shrink-0 px-1 py-1.5 text-center text-[11px] font-bold select-none text-red-500">-</span>
                    <span className="flex-1 px-3 py-1.5 text-red-400"><WordComp wordDiff={line.wordDiff} /></span>
                  </div>
                );
              }

              if (line.type === "added") {
                const lineNumBg = "bg-green-500/20 text-green-500";
                const WordComp = isLight ? LightWordDiff : WordDiff;
                return (
                  <div key={idx} className="flex border-l-2 border-l-green-400 bg-green-500/10">
                    <span className={`w-12 shrink-0 px-2 py-1.5 text-right text-[10px] select-none border-r ${lineNumBg}`}>{line.newNum}</span>
                    <span className="w-8 shrink-0 px-1 py-1.5 text-center text-[11px] font-bold select-none text-green-500">+</span>
                    <span className="flex-1 px-3 py-1.5 text-green-400"><WordComp wordDiff={line.wordDiff} /></span>
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
