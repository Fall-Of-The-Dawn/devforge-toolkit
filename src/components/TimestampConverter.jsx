import { useState, useMemo, useEffect } from "react";

function formatRelative(ts, unit) {
  const ms = unit === "seconds" ? ts * 1000 : ts;
  const now = Date.now();
  const diff = ms - now;
  const abs = Math.abs(diff);
  const sign = diff < 0 ? "ago" : "from now";

  if (abs < 1000) return "just now";
  if (abs < 60000) return `${Math.floor(abs / 1000)}s ${sign}`;
  if (abs < 3600000) return `${Math.floor(abs / 60000)}m ${sign}`;
  if (abs < 86400000) return `${Math.floor(abs / 3600000)}h ${sign}`;
  if (abs < 2592000000) return `${Math.floor(abs / 86400000)}d ${sign}`;
  if (abs < 31536000000) return `${Math.floor(abs / 2592000000)}mo ${sign}`;
  return `${Math.floor(abs / 31536000000)}y ${sign}`;
}

const TIMEZONES = ["UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "Europe/London", "Europe/Berlin", "Asia/Tokyo", "Asia/Shanghai", "Asia/Kolkata", "Australia/Sydney"];

export default function TimestampConverter({ isLight, mutedText }) {
  const [input, setInput] = useState("");
  const [unit, setUnit] = useState("seconds");
  const [tz, setTz] = useState("UTC");
  const [now, setNow] = useState(() => Math.floor(Date.now() / (unit === "seconds" ? 1000 : 1)));

  useEffect(() => {
    const tick = () => setNow(Math.floor(Date.now() / (unit === "seconds" ? 1000 : 1)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [unit]);

  const results = useMemo(() => {
    const ts = parseInt(input, 10);
    if (isNaN(ts)) return null;
    const ms = unit === "seconds" ? ts * 1000 : ts;
    const d = new Date(ms);
    if (isNaN(d.getTime())) return null;

    let localStr;
    try {
      localStr = d.toLocaleString("en-US", { timeZone: tz, dateStyle: "full", timeStyle: "long" });
    } catch {
      localStr = d.toLocaleString("en-US", { dateStyle: "full", timeStyle: "long" });
    }

    return {
      iso: d.toISOString(),
      utc: d.toUTCString(),
      local: localStr,
      relative: formatRelative(ts, unit),
      unixSec: Math.floor(d.getTime() / 1000),
      unixMs: d.getTime(),
    };
  }, [input, unit, tz]);

  const handleCopy = (val) => {
    navigator.clipboard.writeText(val);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Timestamp Converter</h1>
        <span className={`text-[10px] font-mono ${mutedText}`}>Now: {now}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-5 flex-1 min-h-0">
        <div className={`md:w-[260px] md:shrink-0 rounded-lg border p-4 space-y-4 overflow-y-auto ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Input</label>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className={`w-full px-3 py-2 text-sm font-mono rounded-md border bg-transparent focus:outline-none transition-colors ${isLight ? "border-gray-200 focus:border-[#FF6B6B] text-gray-900" : "border-[#1a1a1a] focus:border-[#FF6B6B] text-[#e0e0e0]"}`} placeholder="Enter timestamp..." />
          </div>

          <div className="flex gap-2">
            {["seconds", "milliseconds"].map((u) => (
              <button key={u} onClick={() => setUnit(u)} className={`flex-1 px-2 py-1.5 text-[10px] font-medium rounded border transition-all cursor-pointer capitalize ${unit === u ? (isLight ? "bg-[#fff0f0] border-[#e0d0d0] text-[#c53a3a]" : "bg-[#FF6B6B]/10 border-[#FF6B6B]/30 text-[#FF6B6B]") : (isLight ? "bg-white border-gray-200 text-gray-500" : "bg-[#111] border-[#1a1a1a] text-[#666]")}`}>{u}</button>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Timezone</label>
            <select value={tz} onChange={(e) => setTz(e.target.value)} className={`px-2 py-1.5 text-xs rounded border bg-transparent focus:outline-none cursor-pointer ${isLight ? "border-gray-200 text-gray-700" : "border-[#1a1a1a] text-[#ccc]"}`}>
              {TIMEZONES.map((z) => <option key={z} value={z}>{z}</option>)}
            </select>
          </div>

          <div>
            <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>Quick Set</label>
            <div className="space-y-1.5">
              {[
                { label: "Now", value: now },
                { label: "1 hour ago", value: now - 3600 },
                { label: "1 day ago", value: now - 86400 },
                { label: "1 week ago", value: now - 604800 },
                { label: "1 month ago", value: now - 2592000 },
              ].map((q) => (
                <button key={q.label} onClick={() => setInput(String(q.value))} className={`w-full text-left px-2.5 py-1.5 text-[10px] rounded border transition-all cursor-pointer ${isLight ? "bg-white border-gray-200 text-gray-600 hover:border-[#e0d0d0]" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:border-[#FF6B6B]/30"}`}>{q.label}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0 gap-3">
          {results ? (
            <>
              {[
                { label: "Relative", value: results.relative },
                { label: "ISO 8601", value: results.iso },
                { label: "UTC", value: results.utc },
                { label: "Local (" + tz + ")", value: results.local },
                { label: "Unix (seconds)", value: String(results.unixSec) },
                { label: "Unix (milliseconds)", value: String(results.unixMs) },
              ].map((row) => (
                <div key={row.label} className={`flex items-center gap-3 rounded-lg border p-3 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
                  <span className={`text-[10px] font-bold uppercase ${mutedText} w-28 shrink-0`}>{row.label}</span>
                  <code className={`flex-1 text-xs font-mono truncate ${isLight ? "text-gray-700" : "text-[#FF6B6B]"}`}>{row.value}</code>
                  <button onClick={() => handleCopy(row.value)} className={`px-2 py-1 text-[10px] font-medium rounded border transition-all cursor-pointer shrink-0 ${isLight ? "bg-white border-gray-200 text-gray-500 hover:text-gray-900" : "bg-[#111] border-[#1a1a1a] text-[#666] hover:text-[#ccc]"}`}>Copy</button>
                </div>
              ))}
            </>
          ) : (
            <div className={`flex-1 flex items-center justify-center rounded-lg border ${isLight ? "bg-gray-50 border-gray-200 text-gray-400" : "bg-[#0d0d0d] border-[#1a1a1a] text-[#555]"}`}>
              <span className="text-sm">Enter a timestamp to convert</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
