export default function AdBanner({ config, theme }) {
  if (!config?.enabled) return null;
  const isLight = theme === "light";
  return (
    <div className={`rounded-lg p-4 flex items-start gap-3 border transition-colors duration-200 ${isLight ? "bg-gray-50 border-gray-200" : "bg-[#0d0d0d] border-[#1a1a1a]"}`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isLight ? "bg-[#fff8ed]" : "bg-[#1a1a1a]"}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f0a500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {config.icon === "bolt" && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
          {config.icon === "code" && <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>}
          {config.icon === "star" && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold mb-0.5 ${isLight ? "text-gray-900" : "text-white"}`}>
          {config.title}
        </p>
        <p className={`text-xs leading-relaxed mb-2 ${isLight ? "text-gray-500" : "text-[#666]"}`}>
          {config.description}
        </p>
        <a href={config.ctaUrl} className="text-xs font-bold text-[#f0a500] hover:text-[#d4920a] transition-colors">
          {config.ctaText} →
        </a>
      </div>
    </div>
  );
}
