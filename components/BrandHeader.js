"use client";

function FlowIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <defs>
                <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
            </defs>
            <path
                d="M6 14c0-4.5 3.5-8 8-8s8 3.5 8 8"
                stroke="url(#flowGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
            <polyline
                points="18 10 22 14 18 18"
                stroke="url(#flowGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </svg>
    );
}

export default function BrandHeader({ children }) {
    return (
        <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-3">
                <FlowIcon />
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        FlowTask
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        Stay in your flow. Finish what matters.
                    </p>
                </div>
            </div>
            {children}
        </div>
    );
}
