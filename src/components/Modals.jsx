import { useState } from "react";
import { DATA_TYPES } from "../dataTypes";
import { convertToCSV, convertToSQL } from "../utils/converters";

export function ExportModal({ isOpen, setIsExportModalOpen, isLight, mutedText, data }) {
  const [exportFormat, setExportFormat] = useState("json");
  const [exportFilename, setExportFilename] = useState("data");
  const [exportCount, setExportCount] = useState(5);

  if (!isOpen) return null;

  const downloadFile = () => {
    const rows = [];
    for (let i = 0; i < exportCount; i++) {
      const record = {};
      data.forEach((field) => {
        if (!field.name) return;
        const typeConfig = DATA_TYPES.find((t) => t.id === field.type);
        record[field.name] = typeConfig ? typeConfig.fn() : "";
      });
      rows.push(record);
    }
    let content, ext;
    if (exportFormat === "json") { content = JSON.stringify(rows, null, 2); ext = "json"; }
    else if (exportFormat === "csv") { content = convertToCSV(rows); ext = "csv"; }
    else if (exportFormat === "sql") { content = convertToSQL(rows); ext = "sql"; }
    else if (exportFormat === "xml") {
      content = `<data>\n${rows.map(r => `  <row>\n${Object.entries(r).map(([k,v]) => `    <${k}>${v}</${k}>`).join('\n')}\n  </row>`).join('\n')}\n</data>`; ext = "xml";
    }
    else { content = JSON.stringify(rows, null, 2); ext = "txt"; }
    const mimeType = { json: "application/json", csv: "text/csv", sql: "text/plain", xml: "text/xml" }[ext] || "text/plain";
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${exportFilename}.${ext}`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    setIsExportModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`rounded-xl p-6 max-w-sm w-full shadow-2xl ${isLight ? "bg-white border border-gray-200" : "bg-[#111] border border-[#1a1a1a]"}`} onClick={(e) => e.stopPropagation()}>
        <h3 className={`text-lg font-bold mb-4 ${isLight ? "text-gray-900" : "text-white"}`}>Export</h3>
        <div className="space-y-4">
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${mutedText} mb-2 block`}>Format</label>
            <div className="grid grid-cols-2 gap-2">
              {["json", "csv", "sql", "xml"].map((f) => (
                <button key={f} onClick={() => setExportFormat(f)} className={`px-3 py-2 text-xs font-bold uppercase rounded-md border transition-all cursor-pointer ${exportFormat === f ? "bg-[#fff0f0] border-[#e0d0d0] text-[#c53a3a]" : isLight ? "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#999] hover:border-[#333]"}`}>{f}</button>
              ))}
            </div>
          </div>
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${mutedText} mb-2 block`}>Filename</label>
            <input type="text" value={exportFilename} onChange={(e) => setExportFilename(e.target.value)} className={`w-full px-3 py-2 text-sm rounded-md border bg-transparent focus:outline-none ${isLight ? "border-gray-200 focus:border-[#FF6B6B] text-gray-900" : "border-[#1a1a1a] focus:border-[#FF6B6B] text-[#ccc]"}`} />
          </div>
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider ${mutedText} mb-2 block`}>Rows</label>
            <input type="number" min="1" max="1000" value={exportCount} onChange={(e) => setExportCount(Number(e.target.value))} className={`w-full px-3 py-2 text-sm rounded-md border bg-transparent focus:outline-none ${isLight ? "border-gray-200 focus:border-[#FF6B6B] text-gray-900" : "border-[#1a1a1a] focus:border-[#FF6B6B] text-[#ccc]"}`} />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setIsExportModalOpen(false)} className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border cursor-pointer transition-all ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#ccc] hover:border-[#333]"}`}>Cancel</button>
          <button onClick={downloadFile} className="flex-1 px-4 py-2.5 text-sm font-bold text-[#0a0a0a] bg-[#FF6B6B] hover:bg-[#c53a3a] rounded-lg transition-all duration-150 hover:shadow-lg hover:shadow-[#FF6B6B]/20 cursor-pointer">Download</button>
        </div>
      </div>
    </div>
  );
}

export function PrivacyModal({ isOpen, setIsPrivacyOpen, isLight }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsPrivacyOpen(false)}>
      <div className={`rounded-xl p-6 max-w-3xl w-full shadow-2xl ${isLight ? "bg-white border border-gray-200" : "bg-[#111] border border-[#1a1a1a]"}`} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className={`text-lg font-bold ${isLight ? "text-gray-900" : "text-white"}`}>Privacy</h3>
          <button onClick={() => setIsPrivacyOpen(false)} className={`text-xl cursor-pointer ${isLight ? "text-gray-400 hover:text-gray-600" : "text-[#555] hover:text-[#999]"}`}>×</button>
        </div>
        <div className={`grid grid-cols-2 gap-x-8 gap-y-3 text-sm ${isLight ? "text-gray-600" : "text-[#888]"}`}>
          <div>
            <p className={`font-semibold mb-1 ${isLight ? "text-gray-900" : "text-white"}`}>Client-Side Only</p>
            <p>All data generation, conversion, and processing runs entirely in your browser. Nothing is ever sent to any server.</p>
          </div>
          <div>
            <p className={`font-semibold mb-1 ${isLight ? "text-gray-900" : "text-white"}`}>No Data Collection</p>
            <p>We do not collect, store, or transmit any personal information, generated data, or usage analytics. No cookies or tracking.</p>
          </div>
          <div>
            <p className={`font-semibold mb-1 ${isLight ? "text-gray-900" : "text-white"}`}>Open Source</p>
            <p>Source code is publicly available. You can verify that no data leaves your browser. Works offline after initial load.</p>
          </div>
          <div>
            <p className={`font-semibold mb-1 ${isLight ? "text-gray-900" : "text-white"}`}>Data Retention</p>
            <p>Any data you generate or paste exists only in browser memory. Closing the tab or refreshing clears everything permanently.</p>
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <button onClick={() => setIsPrivacyOpen(false)} className="px-5 py-2 text-sm font-bold text-[#0a0a0a] bg-[#FF6B6B] hover:bg-[#c53a3a] rounded-lg transition-all duration-150 cursor-pointer">Got it</button>
        </div>
      </div>
    </div>
  );
}
