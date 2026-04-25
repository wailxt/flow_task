"use client";

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function SearchBar({ query, onChange, theme }) {
  const isDark = theme === "dark";
  return (
    <div className="relative">
      <div className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
        <SearchIcon />
      </div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition-all
          focus:ring-2 focus:ring-indigo-500/40
          ${isDark
            ? "bg-white/[0.04] border border-white/[0.07] text-zinc-100 placeholder-zinc-600 focus:bg-white/[0.07]"
            : "bg-slate-100 border border-transparent text-slate-900 placeholder-gray-400 focus:bg-white focus:border-slate-300"
          }`}
      />
    </div>
  );
}
