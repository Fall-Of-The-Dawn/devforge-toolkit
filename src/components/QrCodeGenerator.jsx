import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

export default function QrCodeGenerator({ isLight, mutedText }) {
  const [text, setText] = useState("https://omnistack.vercel.app");
  const [size, setSize] = useState(256);
  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#ffffff");
  const [errorLevel, setErrorLevel] = useState("M");
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!text.trim() || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      margin: 2,
      color: { dark: darkColor, light: lightColor },
      errorCorrectionLevel: errorLevel,
    }).catch(() => {});
  }, [text, size, darkColor, lightColor, errorLevel]);

  const handleDownload = (fmt) => {
    if (!canvasRef.current) return;
    if (fmt === "png") {
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    } else {
      QRCode.toString(text, {
        type: "svg",
        width: size,
        margin: 2,
        color: { dark: darkColor, light: lightColor },
        errorCorrectionLevel: errorLevel,
      }).then((svg) => {
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.download = "qr-code.svg";
        link.href = URL.createObjectURL(blob);
        link.click();
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 p-5">
      <div className="flex items-center justify-between mb-4">
        <label className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>QR Code Generator</label>
        <div className="flex items-center gap-2">
          <button onClick={() => handleDownload("svg")} disabled={!text.trim()} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>SVG</button>
          <button onClick={() => handleDownload("png")} disabled={!text.trim()} className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${isLight ? "bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300" : "bg-[#111] border-[#1a1a1a] text-[#888] hover:text-[#ccc] hover:border-[#333]"}`}>PNG</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-5 flex-1 min-h-0">
        <div className={`md:w-[260px] md:shrink-0 rounded-lg border p-4 space-y-4 overflow-y-auto ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Content</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} className={`w-full h-28 resize-none rounded-lg p-3 font-mono text-sm border focus:outline-none transition-colors ${isLight ? "bg-white border-gray-200 focus:border-[#f0a500] text-gray-900" : "bg-[#0a0a0a] border-[#1a1a1a] focus:border-[#f0a500] text-[#e0e0e0]"}`} placeholder="Enter text or URL to encode..." spellCheck={false} />
          </div>

          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Size: {size}px</label>
            <input type="range" min="128" max="512" step="32" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full" />
          </div>

          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Error Correction</label>
            <div className="flex gap-1.5">
              {["L", "M", "Q", "H"].map((l) => (
                <button key={l} onClick={() => setErrorLevel(l)} className={`flex-1 py-1.5 text-[10px] font-bold rounded border transition-all cursor-pointer ${errorLevel === l ? (isLight ? "bg-[#fff8ed] border-[#f0dfc0] text-[#c87d0a]" : "bg-[#f0a500]/10 border-[#f0a500]/30 text-[#f0a500]") : (isLight ? "bg-white border-gray-200 text-gray-400 hover:text-gray-600" : "bg-[#111] border-[#1a1a1a] text-[#555] hover:text-[#888]")}`}>{l}</button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className={`text-[10px] font-bold uppercase ${mutedText}`}>Colors</label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <input type="color" value={darkColor} onChange={(e) => setDarkColor(e.target.value)} className="w-7 h-7 rounded border cursor-pointer" />
                <span className={`text-[10px] ${mutedText}`}>Dark</span>
              </div>
              <div className="flex items-center gap-1.5">
                <input type="color" value={lightColor} onChange={(e) => setLightColor(e.target.value)} className="w-7 h-7 rounded border cursor-pointer" />
                <span className={`text-[10px] ${mutedText}`}>Light</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className={`rounded-xl border p-6 ${isLight ? "bg-white border-gray-200" : "bg-[#111] border-[#1a1a1a]"}`}>
            <canvas ref={canvasRef} className="block" />
          </div>
        </div>
      </div>
    </div>
  );
}
