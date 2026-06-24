import { useState, useMemo } from "react";

export default function FlexboxGridPlayground({ isLight, mutedText }) {
  const [mode, setMode] = useState("flex");
  const [itemCount, setItemCount] = useState(4);

  const [flex, setFlex] = useState({
    direction: "row",
    justify: "flex-start",
    align: "stretch",
    wrap: "nowrap",
    gap: "12",
  });

  const [grid, setGrid] = useState({
    columns: "3",
    rows: "auto",
    gap: "12",
    colSpan: "1",
    rowSpan: "1",
  });

  const updateFlex = (key, val) => setFlex((p) => ({ ...p, [key]: val }));
  const updateGrid = (key, val) => setGrid((p) => ({ ...p, [key]: val }));

  const tailwindOutput = useMemo(() => {
    if (mode === "flex") {
      const map = {
        direction: { row: "flex-row", "row-reverse": "flex-row-reverse", column: "flex-col", "column-reverse": "flex-col-reverse" },
        justify: { "flex-start": "justify-start", "flex-end": "justify-end", center: "justify-center", "space-between": "justify-between", "space-around": "justify-around", "space-evenly": "justify-evenly" },
        align: { stretch: "items-stretch", "flex-start": "items-start", "flex-end": "items-end", center: "items-center", baseline: "items-baseline" },
        wrap: { nowrap: "flex-nowrap", wrap: "flex-wrap", "wrap-reverse": "flex-wrap-reverse" },
      };
      const classes = ["flex", map.direction[flex.direction], map.justify[flex.justify], map.align[flex.align], map.wrap[flex.wrap]];
      if (flex.gap) classes.push(`gap-[${flex.gap}px]`);
      return classes.join(" ");
    } else {
      const classes = ["grid", `grid-cols-${grid.columns}`];
      if (grid.gap) classes.push(`gap-[${grid.gap}px]`);
      return classes.join(" ");
    }
  }, [mode, flex, grid]);

  const cssOutput = useMemo(() => {
    if (mode === "flex") {
      return `display: flex;\nflex-direction: ${flex.direction};\njustify-content: ${flex.justify};\nalign-items: ${flex.align};\nflex-wrap: ${flex.wrap};${flex.gap ? `\ngap: ${flex.gap}px;` : ""}`;
    } else {
      return `display: grid;\ngrid-template-columns: repeat(${grid.columns}, 1fr);${grid.gap ? `\ngap: ${grid.gap}px;` : ""}`;
    }
  }, [mode, flex, grid]);

  const renderControl = (label, value, options, onChange) => (
    <div className="flex flex-col gap-1">
      <label className={`text-[10px] font-bold uppercase ${mutedText}`}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`px-2 py-1.5 text-xs rounded border bg-transparent focus:outline-none cursor-pointer transition-colors ${isLight ? "border-gray-200 focus:border-green-400 text-gray-700" : "border-[#1a1a1a] focus:border-[#00e676] text-[#ccc]"}`}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Flexbox / Grid Playground</label>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <button onClick={() => setMode("flex")} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${mode === "flex" ? (isLight ? "bg-green-50 border-green-200 text-green-600" : "bg-[#00e676]/10 border-[#00e676]/30 text-[#00e676]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#999]")}`}>Flexbox</button>
            <button onClick={() => setMode("grid")} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${mode === "grid" ? (isLight ? "bg-green-50 border-green-200 text-green-600" : "bg-[#00e676]/10 border-[#00e676]/30 text-[#00e676]") : (isLight ? "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#999]")}`}>Grid</button>
          </div>
        </div>
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        <div className={`w-[240px] shrink-0 rounded-lg border p-4 space-y-4 overflow-y-auto ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
          {mode === "flex" ? (
            <>
              {renderControl("Direction", flex.direction, ["row", "row-reverse", "column", "column-reverse"], (v) => updateFlex("direction", v))}
              {renderControl("Justify", flex.justify, ["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"], (v) => updateFlex("justify", v))}
              {renderControl("Align", flex.align, ["stretch", "flex-start", "flex-end", "center", "baseline"], (v) => updateFlex("align", v))}
              {renderControl("Wrap", flex.wrap, ["nowrap", "wrap", "wrap-reverse"], (v) => updateFlex("wrap", v))}
              <div className="flex flex-col gap-1">
                <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Gap (px)</label>
                <input type="number" value={flex.gap} onChange={(e) => updateFlex("gap", e.target.value)} className={`px-2 py-1.5 text-xs rounded border bg-transparent focus:outline-none transition-colors ${isLight ? "border-gray-200 focus:border-green-400 text-gray-700" : "border-[#1a1a1a] focus:border-[#00e676] text-[#ccc]"}`} />
              </div>
            </>
          ) : (
            <>
              {renderControl("Columns", grid.columns, ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], (v) => updateGrid("columns", v))}
              <div className="flex flex-col gap-1">
                <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Gap (px)</label>
                <input type="number" value={grid.gap} onChange={(e) => updateGrid("gap", e.target.value)} className={`px-2 py-1.5 text-xs rounded border bg-transparent focus:outline-none transition-colors ${isLight ? "border-gray-200 focus:border-green-400 text-gray-700" : "border-[#1a1a1a] focus:border-[#00e676] text-[#ccc]"}`} />
              </div>
            </>
          )}
          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Items</label>
            <input type="range" min="1" max="12" value={itemCount} onChange={(e) => setItemCount(Number(e.target.value))} className="w-full" />
            <span className={`text-[10px] text-center ${mutedText}`}>{itemCount}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 gap-4">
          <div className={`flex-1 rounded-lg border p-4 overflow-auto ${isLight ? "bg-gray-100 border-gray-200" : "bg-[#080808] border-[#161616]"}`}>
            <div style={mode === "flex" ? { display: "flex", flexDirection: flex.direction, justifyContent: flex.justify, alignItems: flex.align, flexWrap: flex.wrap, gap: `${flex.gap}px` } : { display: "grid", gridTemplateColumns: `repeat(${grid.columns}, 1fr)`, gap: `${grid.gap}px` }}>
              {Array.from({ length: itemCount }, (_, i) => (
                <div key={i} className={`w-16 h-16 rounded-md flex items-center justify-center text-xs font-mono font-bold ${isLight ? "bg-green-100 text-green-700 border border-green-200" : "bg-[#00e676]/10 text-[#00e676] border border-[#00e676]/20"}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className={`flex-1 rounded-lg border p-3 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
              <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>Tailwind</label>
              <code className={`text-xs font-mono break-all ${isLight ? "text-gray-700" : "text-[#00e676]"}`}>{tailwindOutput}</code>
            </div>
            <div className={`flex-1 rounded-lg border p-3 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
              <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>CSS</label>
              <pre className={`text-xs font-mono whitespace-pre-wrap ${isLight ? "text-gray-700" : "text-[#00e676]"}`}>{cssOutput}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
