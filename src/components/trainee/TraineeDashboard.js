import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { KPICards } from '@/components/common/KPICards';
export function TraineeDashboard({ trainee, onOpenUpdate }) {
    const kpiCards = [
        { label: 'Livelihood Status', value: trainee.status, subtext: trainee.company, color: 'emerald' },
        {
            label: 'Current Remuneration',
            value: `₹${trainee.salary.toLocaleString()}/mo`,
            subtext: '+18% since placement',
            icon: 'fa-arrow-trend-up',
            color: 'emerald',
        },
        {
            label: 'Verified Retention',
            value: `${trainee.retentionMonths} Months`,
            subtext: 'EPFO Contribution Matched',
            color: 'yellow',
        },
        {
            label: 'Curriculum Fit Rating',
            value: `${trainee.skillMatchScore}%`,
            subtext: 'Matched against industry',
            color: 'fuchsia',
        },
    ];
    return (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8", children: [_jsx(KPICards, { cards: kpiCards }), _jsxs("div", { className: "glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-900/60 space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center border-b border-indigo-900 pb-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-extrabold text-white", children: "Longitudinal Career Trajectory" }), _jsx("p", { className: "text-xs text-indigo-300", children: "Continuous outcome tracking across skill updates and wage increments." })] }), _jsxs("button", { onClick: onOpenUpdate, className: "px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-bold text-xs hover:opacity-90 yellow-glow flex items-center gap-2", children: [_jsx("i", { className: "fa-solid fa-plus" }), " Submit Status Update"] })] }), _jsx("div", { className: "grid sm:grid-cols-5 gap-4 relative pt-4", children: trainee.timeline.map((step, idx) => (_jsxs("div", { className: "glass-card p-4 rounded-2xl border border-indigo-900/50 space-y-2 relative hover:border-fuchsia-500/40 transition-all", children: [_jsx("div", { className: "w-8 h-8 rounded-xl bg-fuchsia-950 border border-fuchsia-500/40 text-fuchsia-300 flex items-center justify-center text-xs font-bold", children: _jsx("i", { className: `fa-solid ${step.icon}` }) }), _jsx("span", { className: "text-[10px] font-bold font-mono text-yellow-400 block", children: step.date }), _jsx("h4", { className: "text-xs font-bold text-white", children: step.title }), _jsx("p", { className: "text-[11px] text-slate-400 leading-tight", children: step.desc })] }, idx))) })] })] }));
}
