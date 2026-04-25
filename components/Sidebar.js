"use client";

// ── Icons ────────────────────────────────────────────────────────────────────
function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function FocusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Nav config ───────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: <HomeIcon /> },
  { id: "categories", label: "Categories", icon: <TagIcon /> },
  { id: "focus", label: "Focus Mode", icon: <FocusIcon /> },
  { id: "analytics", label: "Analytics", icon: <ChartIcon /> },
  { id: "settings", label: "Settings", icon: <SettingsIcon /> },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function Sidebar({ activePage, setActivePage, theme, onToggleTheme, mobileOpen, onClose }) {
  const isDark = theme === "dark";

  const sidebarBg = isDark
    ? "bg-[#1a1835] border-r border-white/[0.05]"
    : "bg-white border-r border-slate-300";

  const navActive = isDark
    ? "bg-indigo-500/10 text-indigo-400"
    : "bg-indigo-50 text-indigo-600";

  const navIdle = isDark
    ? "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200"
    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900";

  const navIconActive = isDark ? "text-indigo-400" : "text-indigo-500";

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-[260px] z-50 flex flex-col
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
          ${sidebarBg}
        `}
      >
        {/* ── Brand ── */}
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className={`font-bold text-[17px] tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
              FlowTask
            </span>
          </div>
          {/* Mobile close */}
          <button
            onClick={onClose}
            className={`lg:hidden p-1.5 rounded-lg ${isDark ? "text-zinc-500 hover:text-zinc-300 hover:bg-white/5" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Section label ── */}
        <p className={`px-5 mb-1 text-[10px] font-semibold uppercase tracking-widest ${isDark ? "text-zinc-600" : "text-slate-500"}`}>
          Menu
        </p>

        {/* ── Nav links ── */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActivePage(item.id); onClose(); }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  text-sm font-medium transition-all duration-150 text-left cursor-pointer
                  ${isActive ? navActive : navIdle}
                `}
              >
                <span className={`shrink-0 ${isActive ? navIconActive : ""}`}>
                  {item.icon}
                </span>
                {item.label}
                {item.id === "tasks" && (
                  <span className={`ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${isDark ? "bg-white/5 text-zinc-400" : "bg-slate-100 text-slate-600"}`}>
                    Tasks
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* ── Bottom section ── */}
        <div className={`p-3 mt-3 border-t ${isDark ? "border-white/[0.05]" : "border-slate-300"}`}>
          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-2 transition-all cursor-pointer ${navIdle}`}
          >
            <span className="shrink-0">{isDark ? <SunIcon /> : <MoonIcon />}</span>
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>

          {/* User card */}
          <div className={`flex items-center gap-3 px-3 py-3 rounded-xl ${isDark ? "bg-white/[0.03] border border-white/[0.05]" : "bg-slate-100 border border-slate-300"}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold truncate ${isDark ? "text-zinc-100" : "text-slate-900"}`}>
                Your Workspace
              </p>
              <p className={`text-xs truncate ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
                Personal Plan
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
