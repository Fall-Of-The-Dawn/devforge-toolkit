import { useState, useMemo, useCallback } from "react";

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generatePassword(length, options) {
  let chars = "";
  if (options.lowercase) chars += CHARSETS.lowercase;
  if (options.uppercase) chars += CHARSETS.uppercase;
  if (options.numbers) chars += CHARSETS.numbers;
  if (options.symbols) chars += CHARSETS.symbols;
  if (!chars) chars = CHARSETS.lowercase;

  let pw = "";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    pw += chars[array[i] % chars.length];
  }
  return pw;
}

function analyzePassword(pw) {
  let pool = 0;
  if (/[a-z]/.test(pw)) pool += 26;
  if (/[A-Z]/.test(pw)) pool += 26;
  if (/[0-9]/.test(pw)) pool += 10;
  if (/[^a-zA-Z0-9]/.test(pw)) pool += 32;

  const entropy = Math.round(pw.length * Math.log2(pool || 1));
  const combinations = Math.pow(pool || 1, pw.length);

  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (pw.length >= 16) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;

  let strength;
  if (score <= 2) strength = { label: "Weak", color: "#ef4444", percent: 25 };
  else if (score <= 3) strength = { label: "Fair", color: "#f59e0b", percent: 50 };
  else if (score <= 4) strength = { label: "Strong", color: "#f0a500", percent: 75 };
  else strength = { label: "Very Strong", color: "#22c55e", percent: 100 };

  let crackTime;
  if (entropy < 28) crackTime = "Instantly";
  else if (entropy < 36) crackTime = "Minutes to hours";
  else if (entropy < 60) crackTime = "Days to years";
  else if (entropy < 80) crackTime = "Centuries";
  else crackTime = "Heat death of universe";

  return { entropy, crackTime, strength, pool, score };
}

export default function PasswordGenerator({ isLight, mutedText }) {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ lowercase: true, uppercase: true, numbers: true, symbols: true });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const generate = useCallback(() => {
    const pw = generatePassword(length, options);
    setPassword(pw);
    setHistory((prev) => [pw, ...prev].slice(0, 10));
  }, [length, options]);

  const analysis = useMemo(() => (password ? analyzePassword(password) : null), [password]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>Password Generator</label>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} disabled={!password} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 flex-1 min-h-0">
        <div className={`md:w-[260px] md:shrink-0 rounded-lg border p-4 space-y-4 overflow-y-auto ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Length: {length}</label>
            <input type="range" min="4" max="64" value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full" />
          </div>

          <div>
            <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>Character Types</label>
            <div className="space-y-1.5">
              {Object.entries({ lowercase: "Lowercase (a-z)", uppercase: "Uppercase (A-Z)", numbers: "Numbers (0-9)", symbols: "Symbols (!@#)" }).map(([key, label]) => (
                <button key={key} onClick={() => toggleOption(key)} className={`w-full flex items-center gap-2 px-2.5 py-1.5 text-[10px] rounded border transition-all cursor-pointer text-left ${options[key] ? (isLight ? "bg-[#fff8ed] border-[#f0dfc0] text-[#c87d0a]" : "bg-[#f0a500]/10 border-[#f0a500]/30 text-[#f0a500]") : (isLight ? "bg-white border-gray-200 text-gray-500" : "bg-[#111] border-[#1a1a1a] text-[#666]")}`}>
                  <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${options[key] ? (isLight ? "bg-[#fff8ed]0 border-green-500" : "bg-[#f0a500] border-[#f0a500]") : (isLight ? "bg-white border-gray-300" : "bg-[#111] border-[#333]")}`}>
                    {options[key] && <span className="text-[8px] text-black font-bold">&#10003;</span>}
                  </div>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={generate} className={`w-full py-2.5 text-xs font-bold rounded-md transition-all cursor-pointer ${isLight ? "bg-[#fff8ed] text-[#c87d0a] hover:bg-[#fff3d6]" : "bg-[#f0a500]/10 text-[#f0a500] hover:bg-[#f0a500]/20"}`}>Generate Password</button>

          {history.length > 0 && (
            <div>
              <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>History</label>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {history.map((pw, i) => (
                  <button key={i} onClick={() => { navigator.clipboard.writeText(pw); }} className={`w-full text-left px-2 py-1 text-[9px] font-mono rounded truncate transition-all cursor-pointer ${isLight ? "bg-white text-gray-500 hover:bg-gray-100" : "bg-[#111] text-[#666] hover:bg-[#1a1a1a]"}`}>{pw}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col min-w-0 gap-4">
          {password ? (
            <>
              <div className={`rounded-lg border p-4 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
                <code className={`text-lg font-mono break-all ${isLight ? "text-gray-900" : "text-[#f0a500]"}`}>{password}</code>
              </div>

              {analysis && (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className={`flex-1 rounded-lg border p-4 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase ${mutedText}`}>Strength</span>
                      <span className="text-xs font-bold" style={{ color: analysis.strength.color }}>{analysis.strength.label}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${isLight ? "bg-gray-200" : "bg-[#1a1a1a]"}`}>
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${analysis.strength.percent}%`, backgroundColor: analysis.strength.color }} />
                    </div>
                  </div>
                  <div className={`flex-1 rounded-lg border p-4 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
                    <span className={`text-[10px] font-bold uppercase ${mutedText} block mb-1`}>Entropy</span>
                    <span className={`text-lg font-mono font-bold ${isLight ? "text-gray-900" : "text-[#f0a500]"}`}>{analysis.entropy} bits</span>
                  </div>
                  <div className={`flex-1 rounded-lg border p-4 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
                    <span className={`text-[10px] font-bold uppercase ${mutedText} block mb-1`}>Crack Time</span>
                    <span className={`text-sm font-bold ${isLight ? "text-gray-900" : "text-[#ccc]"}`}>{analysis.crackTime}</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={`flex-1 flex items-center justify-center rounded-lg border ${isLight ? "bg-gray-50 border-gray-200 text-gray-400" : "bg-[#0d0d0d] border-[#1a1a1a] text-[#555]"}`}>
              <span className="text-sm">Click "Generate Password" to start</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
