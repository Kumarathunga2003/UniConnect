import { useState } from "react";

function ThemeToggle({ compact = false }) {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="theme-toggle inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600"
    >
      <span aria-hidden="true" className="text-lg leading-none">{dark ? "☀" : "☾"}</span>
      {!compact && <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>}
    </button>
  );
}

export default ThemeToggle;
