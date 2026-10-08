function BrandMark({ className = "h-11 w-11" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="UniConnect logo">
      <defs>
        <linearGradient id="brand-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" /><stop offset=".52" stopColor="#4F46E5" /><stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="15" fill="url(#brand-gradient)" />
      <path d="M14.5 14v11.2c0 6.2 3.7 9.8 9.5 9.8s9.5-3.6 9.5-9.8V14h-5.3v10.9c0 3.5-1.4 5.2-4.2 5.2s-4.2-1.7-4.2-5.2V14h-5.3Z" fill="white" />
      <circle cx="36.5" cy="11.5" r="3.5" fill="#67E8F9" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function BrandLogo({ light = false, compact = false }) {
  return <div className="flex items-center gap-3"><BrandMark /><div className={compact ? "hidden sm:block" : "block"}><p className={`text-xl font-black tracking-tight ${light ? "text-white" : "text-slate-950"}`}>Uni<span className="text-indigo-500">Connect</span></p><p className={`text-[10px] font-bold uppercase tracking-[.22em] ${light ? "text-slate-400" : "text-slate-500"}`}>Learn · Connect · Grow</p></div></div>;
}

export { BrandMark };
export default BrandLogo;
