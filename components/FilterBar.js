"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ChevronIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const STATUS_OPTIONS = ["All", "Completed", "Pending"];
const PRIORITY_OPTIONS = ["All", "Low", "Medium", "High"];
const SORT_OPTIONS = [
  { value: "createdAt", label: "Newest First" },
  { value: "dueDate", label: "Due Date" },
  { value: "priority", label: "Priority" },
];

export default function FilterBar({ statusFilter, priorityFilter, sortOption, onFilterChange, theme }) {
  const isDark = theme === "dark";
  const hasActive = statusFilter !== "All" || priorityFilter !== "All";

  const triggerClass = `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border
    ${isDark
      ? "bg-white/[0.04] border-white/[0.07] text-zinc-300 hover:bg-white/[0.08]"
      : "bg-white border-slate-400 text-slate-800 hover:bg-slate-50 shadow-md shadow-slate-200/50"
    }`;

  const sortLabel = SORT_OPTIONS.find(o => o.value === sortOption)?.label || "Sort";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Label */}
      <span className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-zinc-600" : "text-slate-500"}`}>
        Filter:
      </span>

      {/* Status */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={`${triggerClass} ${statusFilter !== "All" ? (isDark ? "border-indigo-500/40 text-indigo-400 bg-indigo-500/10" : "border-indigo-300 text-indigo-600 bg-indigo-50") : ""}`}>
            Status: {statusFilter}
            <ChevronIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuRadioGroup value={statusFilter} onValueChange={v => onFilterChange("statusFilter", v)}>
            {STATUS_OPTIONS.map(o => <DropdownMenuRadioItem key={o} value={o}>{o}</DropdownMenuRadioItem>)}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Priority */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={`${triggerClass} ${priorityFilter !== "All" ? (isDark ? "border-indigo-500/40 text-indigo-400 bg-indigo-500/10" : "border-indigo-300 text-indigo-600 bg-indigo-50") : ""}`}>
            Priority: {priorityFilter}
            <ChevronIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuRadioGroup value={priorityFilter} onValueChange={v => onFilterChange("priorityFilter", v)}>
            {PRIORITY_OPTIONS.map(o => <DropdownMenuRadioItem key={o} value={o}>{o}</DropdownMenuRadioItem>)}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Divider */}
      <div className={`h-4 w-px ${isDark ? "bg-white/10" : "bg-slate-200"}`} />

      {/* Sort */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={triggerClass}>
            ↕ {sortLabel}
            <ChevronIcon />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuRadioGroup value={sortOption} onValueChange={v => onFilterChange("sortOption", v)}>
            {SORT_OPTIONS.map(o => <DropdownMenuRadioItem key={o.value} value={o.value}>{o.label}</DropdownMenuRadioItem>)}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear all */}
      {hasActive && (
        <button
          onClick={() => { onFilterChange("statusFilter", "All"); onFilterChange("priorityFilter", "All"); }}
          className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors ${isDark ? "text-zinc-500 hover:text-zinc-300 hover:bg-white/5" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
        >
          <CloseIcon /> Clear
        </button>
      )}
    </div>
  );
}
