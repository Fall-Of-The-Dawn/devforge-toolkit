import { useMemo } from "react";
import { DATA_TYPES } from "../dataTypes";
import { convertToCSV, convertToSQL } from "../utils/converters";
import { highlightJSON } from "../utils/highlight";

export default function Generator({
  fields, setFields, count, setCount, activeTab, setActiveTab,
  dataType, setDataType, copied, setCopied,
  isLight, mutedText, activeBtn, inactiveBtn, hoverBorder, cardBg, codeBg,
  DATA_TYPE_PRESETS, setIsExportModalOpen,
}) {
  const switchDataType = (type) => {
    setDataType(type);
    if (DATA_TYPE_PRESETS[type]) setFields(DATA_TYPE_PRESETS[type]);
  };

  const addField = () => {
    setFields([...fields, { id: Date.now().toString(), name: `field_${fields.length + 1}`, type: "fullName" }]);
  };

  const removeField = (id) => {
    if (fields.length <= 1) return;
    setFields(fields.filter((f) => f.id !== id));
  };

  const updateField = (id, key, value) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const generatedData = useMemo(() => {
    const rows = [];
    for (let i = 0; i < count; i++) {
      const record = {};
      fields.forEach((field) => {
        if (!field.name) return;
        const typeConfig = DATA_TYPES.find((t) => t.id === field.type);
        record[field.name] = typeConfig ? typeConfig.fn() : "";
      });
      rows.push(record);
    }
    return rows;
  }, [fields, count]);

  const outputString = useMemo(() => {
    if (generatedData.length === 0) return "";
    if (activeTab === "csv") return convertToCSV(generatedData);
    if (activeTab === "sql") return convertToSQL(generatedData);
    return JSON.stringify(generatedData, null, 2);
  }, [generatedData, activeTab]);

  const highlightedOutput = useMemo(() => {
    if (activeTab !== "json") return null;
    return highlightJSON(outputString);
  }, [outputString, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(outputString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <aside className={`w-full md:w-[280px] border-b md:border-b-0 md:border-r ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"} p-4 md:p-5 flex flex-col shrink-0 overflow-y-auto transition-colors duration-200`}>
        <div className="space-y-4 md:space-y-6">
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${mutedText} mb-3 block`}>Data Type</label>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.keys(DATA_TYPE_PRESETS).map((type) => (
                <button key={type} onClick={() => switchDataType(type)} className={`px-3 py-2 text-xs font-medium rounded-md border transition-all duration-150 capitalize cursor-pointer ${dataType === type ? activeBtn : inactiveBtn}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Fields</label>
              <button onClick={addField} className="text-xs font-bold text-[#f0a500] hover:text-[#d4920a] transition-colors cursor-pointer">+ Add</button>
            </div>
            <div className="space-y-1.5 max-h-[160px] md:max-h-[240px] overflow-y-auto pr-1">
              {fields.map((f) => {
                const isDuplicate = fields.filter((field) => field.name.trim() === f.name.trim() && f.name.trim() !== "").length > 1;
                return (
                  <div key={f.id} className={`flex items-center gap-1.5 p-2 rounded-md border transition-colors duration-150 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
                    <input type="text" value={f.name} onChange={(e) => updateField(f.id, "name", e.target.value.replace(/\s+/g, "_"))} className={`flex-1 min-w-0 px-2 py-1 text-xs font-mono rounded border bg-transparent focus:outline-none transition-colors duration-150 cursor-text ${isDuplicate ? "border-red-400 focus:border-red-500" : isLight ? "border-gray-200 focus:border-[#f0a500] text-gray-900" : "border-[#1a1a1a] focus:border-[#f0a500] text-[#ccc]"}`} />
                    <select value={f.type} onChange={(e) => updateField(f.id, "type", e.target.value)} className={`px-1.5 py-1 text-[10px] rounded border bg-transparent focus:outline-none cursor-pointer transition-colors duration-150 ${isLight ? "border-gray-200 focus:border-[#f0a500] text-gray-600" : "border-[#1a1a1a] focus:border-[#f0a500] text-[#888]"}`}>
                      {DATA_TYPES.map((t) => (<option key={t.id} value={t.id}>{t.label}</option>))}
                    </select>
                    <button onClick={() => removeField(f.id)} disabled={fields.length <= 1} className={`px-1 transition-colors cursor-pointer ${fields.length <= 1 ? "text-gray-300 cursor-not-allowed" : isLight ? "text-gray-400 hover:text-red-500" : "text-[#444] hover:text-red-400"}`}>×</button>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${mutedText} mb-3 block`}>Format</label>
            <div className="flex gap-1.5">
              {["json", "csv", "sql"].map((t) => (
                <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 px-3 py-2 text-xs font-bold uppercase rounded-md border transition-all duration-150 cursor-pointer ${activeTab === t ? activeBtn : inactiveBtn}`}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${mutedText} mb-3 block`}>Rows</label>
            <div className={`${cardBg} rounded-lg p-4 border transition-colors duration-200`}>
              <div className="flex justify-between items-center mb-3">
                <span className={`text-xs ${mutedText} font-mono`}>COUNT</span>
                <span className="text-sm text-[#f0a500] font-mono font-bold bg-[#f0a500]/8 px-2.5 py-0.5 rounded">{count}</span>
              </div>
              <input type="range" min="5" max="100" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full mb-3" />
              <div className="flex gap-1.5">
                {[10, 25, 50, 100].map((preset) => (
                  <button key={preset} onClick={() => setCount(preset)} className={`flex-1 py-1.5 text-xs font-bold rounded-md border transition-all duration-150 cursor-pointer ${count === preset ? activeBtn : `${isLight ? "bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-600" : "bg-[#0d0d0d] border-[#1a1a1a] text-[#555] hover:text-[#888]"} ${hoverBorder}`}`}>{preset}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 p-4 md:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className={`flex items-center gap-2 text-sm ${mutedText} font-mono`}>
            <span className="text-[#f0a500] font-bold">{count}</span>
            <span>·</span>
            <span>{dataType}</span>
            <span>·</span>
            <span className="text-[#f0a500] uppercase font-bold">{activeTab}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleCopy} className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md border transition-all duration-150 cursor-pointer ${isLight ? "text-gray-600 hover:text-gray-900 bg-gray-50 border-gray-200 hover:border-gray-300" : "text-[#888] hover:text-[#ccc] bg-[#111] border-[#1a1a1a] hover:border-[#333]"}`}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={() => setIsExportModalOpen(true)} className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#0a0a0a] bg-[#f0a500] hover:bg-[#d4920a] rounded-md transition-all duration-150 hover:shadow-lg hover:shadow-[#f0a500]/20 cursor-pointer">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Export
            </button>
          </div>
        </div>
        <div className={`${codeBg} border flex-1 p-5 min-h-0 overflow-auto select-all rounded-lg font-mono text-sm leading-relaxed transition-colors duration-200 ${isLight ? "!text-gray-800" : "text-[#ccc]"}`}>
          {activeTab === "json" && highlightedOutput ? (
            <pre dangerouslySetInnerHTML={{ __html: highlightedOutput.join("\n") }} />
          ) : (
            <pre className="text-[#f0a500]">{outputString}</pre>
          )}
        </div>
      </main>
    </>
  );
}
