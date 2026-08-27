import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Sign up page component
 */
import { useState } from 'react';
import { validateSignUpForm, validatePassword } from '@/utils/validation';
import { MOCK_USERS } from '@/data/authMockData';
export function SignUpPage({ onSignUpSuccess, onLoginClick }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: '',
        phoneNumber: '',
        role: 'trainee',
        agreeToTerms: false,
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ valid: false, errors: [] });
    const handleInputChange = (e) => {
        const { name, value, type } = e.currentTarget;
        const newValue = type === 'checkbox' ? e.currentTarget.checked : value;
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
        // Check password strength on password field change
        if (name === 'password') {
            const strength = validatePassword(value);
            setPasswordStrength(strength);
        }
        // Clear errors for this field
        setErrors((prev) => prev.filter((err) => err.field !== name));
        setGeneralError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setGeneralError('');
        // Validate form
        const validationErrors = validateSignUpForm(formData);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }
        // Check if email already exists
        const existingUser = MOCK_USERS.find((u) => u.email === formData.email);
        if (existingUser) {
            setGeneralError('Email already registered. Please try logging in or use a different email.');
            setIsLoading(false);
            return;
        }
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Create new mock user
        const newUser = {
            id: `user-${Date.now()}`,
            email: formData.email,
            password: formData.password,
            fullName: formData.fullName,
            role: formData.role,
            phoneNumber: formData.phoneNumber,
            createdAt: new Date().toISOString().split('T')[0],
            isVerified: false,
        };
        // Mock JWT token
        const mockToken = `mock_jwt_${Date.now()}_${Math.random()}`;
        // Success
        onSignUpSuccess(newUser, mockToken);
        setIsLoading(false);
    };
    const getErrorMessage = (fieldName) => {
        return errors.find((err) => err.field === fieldName)?.message || null;
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-[#070913] via-[#0c1024] to-[#141a38] flex items-center justify-center px-4 py-8", children: [_jsx("div", { className: "absolute top-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" }), _jsxs("div", { className: "relative w-full max-w-2xl", children: [_jsxs("div", { className: "glass-panel p-8 rounded-3xl border border-fuchsia-500/30 magenta-glow space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsxs("h1", { className: "text-3xl font-extrabold text-white", children: ["Join ZEN", _jsx("span", { className: "text-yellow-400", children: "Track" })] }), _jsx("p", { className: "text-sm text-indigo-300", children: "Create your account to track outcomes" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [generalError && (_jsxs("div", { className: "p-3 rounded-lg bg-red-950/50 border border-red-500/40 flex items-center gap-2", children: [_jsx("i", { className: "fa-solid fa-circle-exclamation text-red-400" }), _jsx("p", { className: "text-xs text-red-300", children: generalError })] })), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider", children: "Full Name *" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa-solid fa-user absolute left-3 top-3 text-indigo-400 text-sm" }), _jsx("input", { type: "text", name: "fullName", value: formData.fullName, onChange: handleInputChange, placeholder: "Your full name", className: `w-full bg-indigo-950/40 border rounded-xl pl-10 pr-4 py-2 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${getErrorMessage('fullName')
                                                                    ? 'border-red-500/50 focus:border-red-500'
                                                                    : 'border-indigo-800/50 focus:border-fuchsia-500'}` })] }), getErrorMessage('fullName') && (_jsx("p", { className: "text-xs text-red-400 mt-1", children: getErrorMessage('fullName') }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider", children: "Email Address *" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa-solid fa-envelope absolute left-3 top-3 text-indigo-400 text-sm" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, placeholder: "you@example.com", className: `w-full bg-indigo-950/40 border rounded-xl pl-10 pr-4 py-2 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${getErrorMessage('email')
                                                                    ? 'border-red-500/50 focus:border-red-500'
                                                                    : 'border-indigo-800/50 focus:border-fuchsia-500'}` })] }), getErrorMessage('email') && (_jsx("p", { className: "text-xs text-red-400 mt-1", children: getErrorMessage('email') }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider", children: "Phone Number *" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa-solid fa-phone absolute left-3 top-3 text-indigo-400 text-sm" }), _jsx("input", { type: "tel", name: "phoneNumber", value: formData.phoneNumber, onChange: handleInputChange, placeholder: "+91-9876543210", className: `w-full bg-indigo-950/40 border rounded-xl pl-10 pr-4 py-2 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${getErrorMessage('phoneNumber')
                                                                    ? 'border-red-500/50 focus:border-red-500'
                                                                    : 'border-indigo-800/50 focus:border-fuchsia-500'}` })] }), getErrorMessage('phoneNumber') && (_jsx("p", { className: "text-xs text-red-400 mt-1", children: getErrorMessage('phoneNumber') }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider", children: "Account Type *" }), _jsxs("select", { name: "role", value: formData.role, onChange: handleInputChange, className: "w-full bg-indigo-950/40 border border-indigo-800/50 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-all", children: [_jsxs("option", { value: "trainee", children: [_jsx("i", { className: "fa-solid fa-user-graduate mr-2" }), "Trainee / Employee"] }), _jsx("option", { value: "government", children: "Government / Admin" }), _jsx("option", { value: "provider", children: "Training Provider" }), _jsx("option", { value: "employer", children: "Employer" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider", children: "Password *" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa-solid fa-lock absolute left-3 top-3 text-indigo-400 text-sm" }), _jsx("input", { type: showPassword ? 'text' : 'password', name: "password", value: formData.password, onChange: handleInputChange, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: `w-full bg-indigo-950/40 border rounded-xl pl-10 pr-10 py-2 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${getErrorMessage('password')
                                                            ? 'border-red-500/50 focus:border-red-500'
                                                            : 'border-indigo-800/50 focus:border-fuchsia-500'}` }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-3 text-indigo-400 hover:text-indigo-300", children: _jsx("i", { className: `fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}` }) })] }), getErrorMessage('password') && (_jsx("p", { className: "text-xs text-red-400 mt-1", children: getErrorMessage('password') })), formData.password && (_jsxs("div", { className: "mt-2 space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [_jsx("div", { className: `h-1 flex-1 rounded-full ${passwordStrength.valid ? 'bg-emerald-500' : 'bg-red-500/50'}` }), _jsx("span", { className: passwordStrength.valid ? 'text-emerald-400' : 'text-amber-400', children: passwordStrength.valid ? '✓ Strong' : '⚠ Weak' })] }), passwordStrength.errors.length > 0 && (_jsx("ul", { className: "text-[10px] text-slate-300 list-none space-y-0.5", children: passwordStrength.errors.map((error, idx) => (_jsxs("li", { className: "flex items-center gap-1", children: [_jsx("i", { className: "fa-solid fa-circle-xmark text-red-400" }), error] }, idx))) }))] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider", children: "Confirm Password *" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa-solid fa-lock-check absolute left-3 top-3 text-indigo-400 text-sm" }), _jsx("input", { type: showConfirmPassword ? 'text' : 'password', name: "confirmPassword", value: formData.confirmPassword, onChange: handleInputChange, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: `w-full bg-indigo-950/40 border rounded-xl pl-10 pr-10 py-2 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${getErrorMessage('confirmPassword')
                                                            ? 'border-red-500/50 focus:border-red-500'
                                                            : 'border-indigo-800/50 focus:border-fuchsia-500'}` }), _jsx("button", { type: "button", onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "absolute right-3 top-3 text-indigo-400 hover:text-indigo-300", children: _jsx("i", { className: `fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}` }) })] }), getErrorMessage('confirmPassword') && (_jsx("p", { className: "text-xs text-red-400 mt-1", children: getErrorMessage('confirmPassword') }))] }), _jsxs("div", { children: [_jsxs("label", { className: "flex items-start gap-3 cursor-pointer group", children: [_jsx("input", { type: "checkbox", name: "agreeToTerms", checked: formData.agreeToTerms, onChange: handleInputChange, className: "w-4 h-4 mt-0.5 rounded bg-indigo-950 border border-indigo-800 cursor-pointer accent-fuchsia-500" }), _jsxs("span", { className: "text-xs text-indigo-300 group-hover:text-indigo-200", children: ["I agree to the", ' ', _jsx("a", { href: "#", className: "text-fuchsia-400 hover:text-fuchsia-300 underline", children: "Terms and Conditions" }), ' ', "and", ' ', _jsx("a", { href: "#", className: "text-fuchsia-400 hover:text-fuchsia-300 underline", children: "Privacy Policy" })] })] }), getErrorMessage('agreeToTerms') && (_jsx("p", { className: "text-xs text-red-400 mt-1", children: getErrorMessage('agreeToTerms') }))] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full mt-6 px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all magenta-glow flex items-center justify-center gap-2", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("i", { className: "fa-solid fa-spinner animate-spin" }), "Creating account..."] })) : (_jsxs(_Fragment, { children: [_jsx("i", { className: "fa-solid fa-user-plus" }), "Create Account"] })) })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-indigo-900/50" }) }), _jsx("div", { className: "relative flex justify-center text-xs", children: _jsx("span", { className: "px-2 bg-indigo-950/50 text-indigo-400", children: "Already have an account?" }) })] }), _jsxs("button", { type: "button", onClick: onLoginClick, className: "w-full px-4 py-3 rounded-xl border border-yellow-500/40 text-yellow-400 font-bold text-sm hover:bg-yellow-500/10 transition-all flex items-center justify-center gap-2", children: [_jsx("i", { className: "fa-solid fa-arrow-right-to-bracket" }), "Sign In Instead"] })] }), _jsx("div", { className: "mt-6 text-center text-xs text-indigo-300/60", children: _jsxs("p", { className: "flex items-center justify-center gap-1", children: [_jsx("i", { className: "fa-solid fa-shield-halved" }), "Your data is secure and encrypted"] }) })] })] }));
}
