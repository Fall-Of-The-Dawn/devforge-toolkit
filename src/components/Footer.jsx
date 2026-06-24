export default function Footer({ isLight, mutedText, setActiveTool, adConfig, theme }) {
  const isLightAd = theme === "light";
  return (
    <div className={`px-5 py-2.5 flex items-center justify-between text-xs shrink-0 border-t ${isLight ? "text-[#9ca3b0] border-[#e2e0da]" : "text-[#505868] border-[#1c2030]"}`}>
      <div className="flex items-center gap-4 min-w-0">
        <span className="shrink-0">100% client-side · No data leaves your browser</span>
        {adConfig?.enabled && (
          <span className={`hidden md:inline-flex items-center gap-2 pl-4 border-l ${isLight ? "border-[#e2e0da]" : "border-[#1c2030]"}`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span className={`font-medium ${isLightAd ? "text-[#5a5f6e]" : "text-[#8891a4]"}`}>{adConfig.title}</span>
            <span className={`hidden lg:inline ${isLightAd ? "text-[#9ca3b0]" : "text-[#505868]"}`}>· {adConfig.description}</span>
            <a href={adConfig.ctaUrl} className="text-accent font-bold hover:opacity-80 transition-opacity shrink-0">
              {adConfig.ctaText} →
            </a>
          </span>
        )}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button onClick={() => setActiveTool("home")} className={`hover:text-current transition-colors cursor-pointer ${isLight ? "hover:text-[#1a1d26]" : "hover:text-[#c8ccd4]"}`}>Home</button>
        <span>·</span>
        <span>{new Date().getFullYear()} OmniStack</span>
      </div>
    </div>
  );
}
