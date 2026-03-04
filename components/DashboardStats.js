"use client";

import { calculateProgress } from "@/lib/helpers";

export default function DashboardStats({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const highPriority = tasks.filter((t) => t.priority === "High").length;
    const progress = calculateProgress(tasks);

    const stats = [
        { label: "Total Tasks", value: total, color: "text-blue-400" },
        { label: "Completed", value: completed, color: "text-emerald-400" },
        { label: "High Priority", value: highPriority, color: "text-red-400" },
    ];

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 transition-colors hover:border-zinc-700"
                    >
                        <p className="text-sm text-zinc-400">{stat.label}</p>
                        <p className={`text-3xl font-bold mt-1 ${stat.color}`}>
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Progress bar */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-zinc-400">Overall Progress</p>
                    <p className="text-sm font-medium text-zinc-300">{progress}%</p>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
