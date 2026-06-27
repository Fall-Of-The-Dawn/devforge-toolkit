import { useState } from "react";

function useNow() {
  const [now] = useState(() => Math.floor(Date.now() / 1000));
  return now;
}

export default function JwtDecoder({ isLight, mutedText }) {
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);
  const now = useNow();

  const result = (() => {
    if (!token.trim()) return { data: null, error: "" };
    try {
      const parts = token.trim().split(".");
      if (parts.length !== 3) return { data: null, error: "Invalid JWT: must have 3 parts separated by dots" };

      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

      const exp = payload.exp;
      const iat = payload.iat;

      return {
        data: {
          header,
          payload,
          signature: parts[2],
          isExpired: exp ? exp < now : null,
          expiresAt: exp ? new Date(exp * 1000).toISOString() : null,
          issuedAt: iat ? new Date(iat * 1000).toISOString() : null,
        },
        error: "",
      };
    } catch (e) {
      return { data: null, error: "Invalid JWT token: " + e.message };
    }
  })();

  const handleCopy = () => {
    if (result.data) {
      navigator.clipboard.writeText(JSON.stringify({ header: result.data.header, payload: result.data.payload }, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <h1 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>JWT Token Decoder</h1>
        <div className="flex items-center gap-2">
          <button onClick={handleCopy} disabled={!result.data} className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {result.error && (
        <div className="mb-3 px-3 py-2 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
          {result.error}
        </div>
      )}

      <textarea
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className={`w-full resize-none rounded-lg p-4 font-mono text-sm leading-relaxed border focus:outline-none transition-colors duration-150 mb-4 ${isLight ? "bg-white border-gray-200 focus:border-[#FF6B6B] text-gray-900" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#FF6B6B] text-[#e0e0e0]"}`}
        placeholder='Paste a JWT token here...\n\nExample:\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.\neyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
        rows={4}
        spellCheck={false}
      />

      {result.data && (
        <div className="flex-1 flex flex-col min-h-0 gap-4">
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2">
              <label className={`text-xs ${mutedText} font-mono`}>HEADER</label>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isLight ? "bg-gray-100 text-gray-500" : "bg-[#1a1a1a] text-[#666]"}`}>{result.data.header.alg}</span>
            </div>
            <div className={`w-full rounded-lg p-4 font-mono text-sm leading-relaxed overflow-auto border transition-colors duration-200 ${isLight ? "bg-gray-50 border-gray-200 text-gray-900" : "bg-[#080808] border-[#161616] text-[#e0e0e0]"}`}>
              <pre>{JSON.stringify(result.data.header, null, 2)}</pre>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-2">
              <label className={`text-xs ${mutedText} font-mono`}>PAYLOAD</label>
              {result.data.isExpired !== null && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${result.data.isExpired ? "bg-red-500/10 text-red-400 border border-red-500/20" : "bg-[#fff0f0]0/10 text-green-400 border border-green-500/20"}`}>
                  {result.data.isExpired ? "Expired" : "Valid"}
                </span>
              )}
            </div>
            <div className={`w-full rounded-lg p-4 font-mono text-sm leading-relaxed overflow-auto border transition-colors duration-200 ${isLight ? "bg-gray-50 border-gray-200 text-gray-900" : "bg-[#080808] border-[#161616] text-[#e0e0e0]"}`}>
              <pre>{JSON.stringify(result.data.payload, null, 2)}</pre>
            </div>
          </div>

          <div className="flex flex-col min-w-0">
            <label className={`text-xs ${mutedText} mb-2 font-mono`}>SIGNATURE</label>
            <div className={`w-full rounded-lg p-3 font-mono text-xs overflow-auto border transition-colors duration-200 ${isLight ? "bg-gray-50 border-gray-200 text-gray-500 break-all" : "bg-[#080808] border-[#161616] text-[#666] break-all"}`}>
              {result.data.signature}
            </div>
          </div>

          {(result.data.expiresAt || result.data.issuedAt) && (
            <div className={`rounded-lg border p-3 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
              <label className={`text-[10px] font-bold uppercase ${mutedText} mb-2 block`}>Token Info</label>
              <div className={`flex flex-wrap gap-4 text-xs font-mono ${isLight ? "text-gray-600" : "text-[#888]"}`}>
                {result.data.issuedAt && <div><span className={mutedText}>Issued: </span><span className="text-[#FF6B6B]">{result.data.issuedAt}</span></div>}
                {result.data.expiresAt && <div><span className={mutedText}>Expires: </span><span className="text-[#FF6B6B]">{result.data.expiresAt}</span></div>}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
