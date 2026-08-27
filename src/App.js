import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Main application component
 * Orchestrates all dashboard views and state management
 */
import { useState, useEffect } from 'react';
import { MOCK_DISTRICTS, MOCK_TRAINEE } from '@/data/mockData';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { OAuthLoginPage } from '@/components/auth/OAuthLoginPage';
import { Header } from '@/components/common/Header';
import { UpdateStatusModal } from '@/components/common/UpdateStatusModal';
import { GovernmentDashboard } from '@/components/government/GovernmentDashboard';
import { TraineeDashboard } from '@/components/trainee/TraineeDashboard';
import { TraineeProfile } from '@/components/profile/TraineeProfile';
import { LandingView } from '@/components/landing/LandingView';
import { LoginAnalytics } from '@/components/admin/LoginAnalytics';
export function App() {
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isOAuthCallback, setIsOAuthCallback] = useState(false);
    const [showAnalytics, setShowAnalytics] = useState(false);
    // Dashboard state
    const [userRole, setUserRole] = useState('government');
    const [activeSegment, setActiveSegment] = useState('dashboard');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [districtFilter, setDistrictFilter] = useState('all');
    const [selectedSkillGapCourse, setSelectedSkillGapCourse] = useState('Data Analytics');
    const [skillGapGenerated, setSkillGapGenerated] = useState(false);
    const [consents, setConsents] = useState({
        employmentData: true,
        professionalSignal: false,
        employerVerify: true,
        researchAnalytics: true,
    });
    // Check if this is OAuth callback
    useEffect(() => {
        const pathname = window.location.pathname;
        if (pathname.includes('/auth/callback/')) {
            setIsOAuthCallback(true);
        }
    }, []);
    const handleRoleSwitch = (newRole) => {
        setUserRole(newRole);
        setActiveSegment('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleStatusUpdate = (data) => {
        setShowUpdateModal(false);
        alert('Status Signal Updated Successfully!');
        console.log('Update data:', data);
    };
    const handleAuthSuccess = (user, _token, role) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
        setUserRole(role);
        console.log(`Logged in as ${user.fullName} (${role})`);
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setActiveSegment('dashboard');
    };
    // Show OAuth callback page if OAuth callback
    if (isOAuthCallback) {
        return (_jsx(OAuthLoginPage, { onOAuthSuccess: handleAuthSuccess, onError: (error) => {
                console.error('OAuth error:', error);
                setIsOAuthCallback(false);
            } }));
    }
    // Show auth container if not authenticated
    if (!isAuthenticated) {
        return _jsx(AuthContainer, { onAuthSuccess: handleAuthSuccess });
    }
    // Show analytics dashboard for admin
    if (showAnalytics && currentUser?.role === 'government') {
        return (_jsxs("div", { className: "min-h-screen bg-[#070913] flex flex-col", children: [_jsx("div", { className: "glass-panel border-b border-indigo-900/40 px-4 sm:px-6 lg:px-8 py-3", children: _jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [_jsxs("button", { onClick: () => setShowAnalytics(false), className: "text-indigo-300 hover:text-white text-sm font-semibold flex items-center gap-2", children: [_jsx("i", { className: "fa-solid fa-arrow-left" }), "Back to Dashboard"] }), _jsx("h1", { className: "text-lg font-bold text-white", children: "Login Analytics" }), _jsx("button", { onClick: handleLogout, className: "px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 text-xs font-semibold", children: "Logout" })] }) }), _jsx("div", { className: "flex-grow", children: _jsx(LoginAnalytics, {}) })] }));
    }
    return (_jsxs("div", { className: "min-h-screen flex flex-col bg-[#070913]", children: [_jsx(Header, { activeSegment: activeSegment, onSegmentChange: setActiveSegment }), _jsx("div", { className: "glass-panel border-b border-indigo-900/40 px-4 sm:px-6 lg:px-8 py-3", children: _jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-600 to-yellow-500 flex items-center justify-center text-xs font-bold text-white", children: currentUser?.fullName.split(' ').map(n => n[0]).join('') }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-white", children: currentUser?.fullName }), _jsx("p", { className: "text-[10px] text-indigo-400 capitalize", children: currentUser?.role })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [currentUser?.role === 'government' && (_jsxs("button", { onClick: () => setShowAnalytics(true), className: "px-3 py-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-xs font-semibold flex items-center gap-1 transition-all", children: [_jsx("i", { className: "fa-solid fa-chart-bar" }), "Analytics"] })), _jsxs("button", { onClick: handleLogout, className: "px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 text-xs font-semibold flex items-center gap-1 transition-all", children: [_jsx("i", { className: "fa-solid fa-arrow-right-from-bracket" }), "Logout"] })] })] }) }), _jsxs("main", { className: "flex-grow", children: [activeSegment === 'dashboard' && (_jsxs("div", { className: "space-y-6", children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6", children: _jsxs("div", { className: "glass-panel p-2 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-indigo-900/40", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs font-bold text-indigo-200 px-3", children: [_jsx("i", { className: "fa-solid fa-sliders text-fuchsia-400" }), " Portal Perspective:"] }), _jsxs("div", { className: "flex flex-wrap items-center gap-1.5 text-xs", children: [_jsxs("button", { onClick: () => handleRoleSwitch('government'), className: `px-4 py-2 rounded-xl font-bold transition-all ${userRole === 'government'
                                                        ? 'bg-yellow-500 text-slate-950 shadow yellow-glow'
                                                        : 'bg-indigo-950/60 text-slate-300 hover:bg-indigo-900'}`, children: [_jsx("i", { className: "fa-solid fa-landmark mr-1.5" }), " Govt / Admin"] }), _jsxs("button", { onClick: () => handleRoleSwitch('trainee'), className: `px-4 py-2 rounded-xl font-bold transition-all ${userRole === 'trainee'
                                                        ? 'bg-fuchsia-600 text-white shadow magenta-glow'
                                                        : 'bg-indigo-950/60 text-slate-300 hover:bg-indigo-900'}`, children: [_jsx("i", { className: "fa-solid fa-user-graduate mr-1.5" }), " Zenitee (Employee)"] })] })] }) }), userRole === 'government' && (_jsx(GovernmentDashboard, { districts: MOCK_DISTRICTS, filter: districtFilter, setFilter: setDistrictFilter, selectedCourse: selectedSkillGapCourse, setSelectedCourse: setSelectedSkillGapCourse, skillGapGenerated: skillGapGenerated, setSkillGapGenerated: setSkillGapGenerated, consents: consents, setConsents: setConsents })), userRole === 'trainee' && (_jsx(TraineeDashboard, { trainee: MOCK_TRAINEE, onOpenUpdate: () => setShowUpdateModal(true) }))] })), activeSegment === 'profile' && (_jsx(TraineeProfile, { trainee: MOCK_TRAINEE, onOpenUpdate: () => setShowUpdateModal(true) })), activeSegment === 'why' && (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12", children: [_jsxs("div", { className: "text-center space-y-4 max-w-4xl mx-auto", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold", children: [_jsx("i", { className: "fa-solid fa-lightbulb" }), " Why ZENTrack Platform?"] }), _jsxs("h1", { className: "text-4xl sm:text-5xl font-extrabold text-white tracking-tight", children: ["Solving the Post-Certification ", _jsx("span", { className: "gradient-text", children: "Outcome Tracking Void" })] }), _jsx("p", { className: "text-slate-300 text-sm sm:text-base", children: "Traditional skilling schemes end their accountability when a candidate receives a certificate. ZENTrack builds a continuous, consent-first longitudinal intelligence loop for state and national government initiatives." })] }), _jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [_jsxs("div", { className: "glass-card p-6 rounded-3xl space-y-3 border-l-4 border-fuchsia-500", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center text-xl", children: _jsx("i", { className: "fa-solid fa-id-card" }) }), _jsx("h3", { className: "font-extrabold text-lg text-white", children: "1. Lifelong Skill ID" }), _jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "Replaces fragmented program IDs with a persistent digital profile linked to DigiLocker and APAAR, preserving trajectory across phone number or location changes." })] }), _jsxs("div", { className: "glass-card p-6 rounded-3xl space-y-3 border-l-4 border-yellow-400", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xl", children: _jsx("i", { className: "fa-solid fa-shield-halved" }) }), _jsx("h3", { className: "font-extrabold text-lg text-white", children: "2. Multi-Signal Matching" }), _jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "Cross-references candidate self-reports with EPFO contribution records, employer scorecards, and merchant UPI QR proofs to ensure high data accuracy." })] }), _jsxs("div", { className: "glass-card p-6 rounded-3xl space-y-3 border-l-4 border-emerald-500", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl", children: _jsx("i", { className: "fa-solid fa-user-lock" }) }), _jsx("h3", { className: "font-extrabold text-lg text-white", children: "3. Zero Secret Surveillance" }), _jsx("p", { className: "text-xs text-slate-300 leading-relaxed", children: "Operates on explicit, granular DPDP consent. Strictly avoids scraping personal WhatsApp chats or private social media to maintain citizen trust." })] })] }), _jsx(LandingView, { onGetStarted: (role) => {
                                    const validRole = role;
                                    handleRoleSwitch(validRole);
                                } })] }))] }), _jsx(UpdateStatusModal, { isOpen: showUpdateModal, onClose: () => setShowUpdateModal(false), onSubmit: handleStatusUpdate })] }));
}
