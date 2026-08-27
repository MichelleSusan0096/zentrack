import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const colorClasses = {
    indigo: 'border-indigo-900/60 hover:border-indigo-500/40',
    fuchsia: 'border-indigo-900/60 hover:border-fuchsia-500/40',
    yellow: 'border-indigo-900/60 hover:border-yellow-500/40',
    emerald: 'border-indigo-900/60 hover:border-emerald-500/40',
    purple: 'border-indigo-900/60 hover:border-purple-500/40',
};
const valueColorClasses = {
    indigo: 'text-indigo-300',
    fuchsia: 'text-fuchsia-400',
    yellow: 'text-yellow-400',
    emerald: 'text-emerald-400',
    purple: 'text-purple-300',
};
export function KPICards({ cards }) {
    return (_jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-4", children: cards.map((card, idx) => (_jsxs("div", { className: `glass-card p-5 rounded-2xl transition-all ${colorClasses[card.color]}`, children: [_jsx("span", { className: "text-xs font-semibold text-indigo-300 uppercase tracking-wider", children: card.label }), _jsx("div", { className: `text-2xl sm:text-3xl font-extrabold mt-2 ${valueColorClasses[card.color]}`, children: card.value }), _jsxs("div", { className: "text-[11px] mt-1 font-medium", children: [card.icon && _jsx("i", { className: `fa-solid ${card.icon} mr-1` }), _jsx("span", { className: valueColorClasses[card.color], children: card.subtext })] })] }, idx))) }));
}
