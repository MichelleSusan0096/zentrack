import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Forgot password page component
 */
import { useState } from 'react';
import { validateForgotPasswordForm } from '@/utils/validation';
import { MOCK_USERS } from '@/data/authMockData';
export function ForgotPasswordPage({ onBackToLogin, onResetSuccess }) {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [step, setStep] = useState('email');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // Step 1: Email Verification
    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setGeneralError('');
        setSuccessMessage('');
        const validationErrors = validateForgotPasswordForm(email);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }
        // Check if email exists
        const user = MOCK_USERS.find((u) => u.email === email);
        if (!user) {
            setGeneralError('Email not found in our system.');
            setIsLoading(false);
            return;
        }
        // Simulate sending OTP
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSuccessMessage(`Verification code sent to ${email}`);
        setStep('otp');
        setErrors([]);
        setIsLoading(false);
    };
    // Step 2: OTP Verification
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setGeneralError('');
        if (!otp.trim()) {
            setErrors([{ field: 'otp', message: 'Verification code is required' }]);
            setIsLoading(false);
            return;
        }
        // Mock OTP verification (accept any 6 digits)
        if (!/^\d{6}$/.test(otp)) {
            setGeneralError('Invalid verification code. Please enter 6 digits.');
            setIsLoading(false);
            return;
        }
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStep('reset');
        setErrors([]);
        setGeneralError('');
        setOtp('');
        setIsLoading(false);
    };
    // Step 3: Reset Password
    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setGeneralError('');
        const newErrors = [];
        if (!newPassword) {
            newErrors.push({ field: 'newPassword', message: 'Password is required' });
        }
        else if (newPassword.length < 8) {
            newErrors.push({ field: 'newPassword', message: 'Password must be at least 8 characters' });
        }
        if (!confirmPassword) {
            newErrors.push({ field: 'confirmPassword', message: 'Please confirm your password' });
        }
        else if (newPassword !== confirmPassword) {
            newErrors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
        }
        if (newErrors.length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }
        // Simulate password reset
        await new Promise((resolve) => setTimeout(resolve, 1200));
        setSuccessMessage('Password reset successful! Redirecting to login...');
        setIsLoading(false);
        // Redirect after 2 seconds
        setTimeout(() => {
            onResetSuccess();
        }, 2000);
    };
    const getErrorMessage = (fieldName) => {
        return errors.find((err) => err.field === fieldName)?.message || null;
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-[#070913] via-[#0c1024] to-[#141a38] flex items-center justify-center px-4", children: [_jsx("div", { className: "absolute top-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "relative w-full max-w-md", children: _jsxs("div", { className: "glass-panel p-8 rounded-3xl border border-fuchsia-500/30 magenta-glow space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "flex justify-center mb-3", children: _jsx("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-500 p-0.5", children: _jsx("div", { className: "w-full h-full bg-[#0a0d1a] rounded-[12px] flex items-center justify-center", children: _jsx("i", { className: "fa-solid fa-key text-yellow-400 text-xl" }) }) }) }), _jsx("h1", { className: "text-2xl font-extrabold text-white", children: "Reset Password" }), _jsxs("p", { className: "text-xs text-indigo-300", children: [step === 'email' && 'Enter your email to receive a verification code', step === 'otp' && 'Enter the verification code sent to your email', step === 'reset' && 'Create your new password'] })] }), successMessage && (_jsxs("div", { className: "p-3 rounded-lg bg-emerald-950/50 border border-emerald-500/40 flex items-center gap-2", children: [_jsx("i", { className: "fa-solid fa-circle-check text-emerald-400" }), _jsx("p", { className: "text-xs text-emerald-300", children: successMessage })] })), generalError && (_jsxs("div", { className: "p-3 rounded-lg bg-red-950/50 border border-red-500/40 flex items-center gap-2", children: [_jsx("i", { className: "fa-solid fa-circle-exclamation text-red-400" }), _jsx("p", { className: "text-xs text-red-300", children: generalError })] })), step === 'email' && (_jsxs("form", { onSubmit: handleEmailSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-2 uppercase tracking-wider", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa-solid fa-envelope absolute left-3 top-3 text-indigo-400 text-sm" }), _jsx("input", { type: "email", value: email, onChange: (e) => {
                                                        setEmail(e.target.value);
                                                        setErrors([]);
                                                        setGeneralError('');
                                                    }, placeholder: "you@example.com", className: `w-full bg-indigo-950/40 border rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${getErrorMessage('email')
                                                        ? 'border-red-500/50 focus:border-red-500'
                                                        : 'border-indigo-800/50 focus:border-fuchsia-500'}` })] }), getErrorMessage('email') && (_jsx("p", { className: "text-xs text-red-400 mt-1", children: getErrorMessage('email') }))] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all magenta-glow flex items-center justify-center gap-2", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("i", { className: "fa-solid fa-spinner animate-spin" }), "Sending code..."] })) : (_jsxs(_Fragment, { children: [_jsx("i", { className: "fa-solid fa-paper-plane" }), "Send Verification Code"] })) })] })), step === 'otp' && (_jsxs("form", { onSubmit: handleOtpSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-2 uppercase tracking-wider", children: "Verification Code" }), _jsx("input", { type: "text", value: otp, onChange: (e) => {
                                                setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                                                setErrors([]);
                                                setGeneralError('');
                                            }, placeholder: "000000", maxLength: 6, className: `w-full bg-indigo-950/40 border rounded-xl px-4 py-2.5 text-center text-2xl font-mono text-white placeholder-slate-400 focus:outline-none transition-all ${getErrorMessage('otp')
                                                ? 'border-red-500/50 focus:border-red-500'
                                                : 'border-indigo-800/50 focus:border-fuchsia-500'}` }), getErrorMessage('otp') && (_jsx("p", { className: "text-xs text-red-400 mt-1 text-center", children: getErrorMessage('otp') }))] }), _jsxs("p", { className: "text-xs text-indigo-300/70 text-center", children: ["Didn't receive the code?", ' ', _jsx("button", { type: "button", className: "text-fuchsia-400 hover:text-fuchsia-300 font-semibold", children: "Resend" })] }), _jsx("button", { type: "submit", disabled: isLoading || otp.length !== 6, className: "w-full px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all magenta-glow flex items-center justify-center gap-2", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("i", { className: "fa-solid fa-spinner animate-spin" }), "Verifying..."] })) : (_jsxs(_Fragment, { children: [_jsx("i", { className: "fa-solid fa-check" }), "Verify Code"] })) })] })), step === 'reset' && (_jsxs("form", { onSubmit: handleResetPasswordSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-2 uppercase tracking-wider", children: "New Password" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa-solid fa-lock absolute left-3 top-3 text-indigo-400 text-sm" }), _jsx("input", { type: showPassword ? 'text' : 'password', value: newPassword, onChange: (e) => {
                                                        setNewPassword(e.target.value);
                                                        setErrors((prev) => prev.filter((err) => err.field !== 'newPassword'));
                                                    }, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: `w-full bg-indigo-950/40 border rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${getErrorMessage('newPassword')
                                                        ? 'border-red-500/50 focus:border-red-500'
                                                        : 'border-indigo-800/50 focus:border-fuchsia-500'}` }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-3 text-indigo-400 hover:text-indigo-300", children: _jsx("i", { className: `fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}` }) })] }), getErrorMessage('newPassword') && (_jsx("p", { className: "text-xs text-red-400 mt-1", children: getErrorMessage('newPassword') }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-2 uppercase tracking-wider", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa-solid fa-lock-check absolute left-3 top-3 text-indigo-400 text-sm" }), _jsx("input", { type: showPassword ? 'text' : 'password', value: confirmPassword, onChange: (e) => {
                                                        setConfirmPassword(e.target.value);
                                                        setErrors((prev) => prev.filter((err) => err.field !== 'confirmPassword'));
                                                    }, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: `w-full bg-indigo-950/40 border rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${getErrorMessage('confirmPassword')
                                                        ? 'border-red-500/50 focus:border-red-500'
                                                        : 'border-indigo-800/50 focus:border-fuchsia-500'}` })] }), getErrorMessage('confirmPassword') && (_jsx("p", { className: "text-xs text-red-400 mt-1", children: getErrorMessage('confirmPassword') }))] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("i", { className: "fa-solid fa-spinner animate-spin" }), "Resetting..."] })) : (_jsxs(_Fragment, { children: [_jsx("i", { className: "fa-solid fa-check-circle" }), "Reset Password"] })) })] })), _jsxs("button", { onClick: onBackToLogin, className: "w-full px-4 py-2.5 rounded-xl border border-indigo-800/50 text-indigo-300 font-semibold text-sm hover:bg-indigo-950/30 transition-all flex items-center justify-center gap-2", children: [_jsx("i", { className: "fa-solid fa-arrow-left" }), "Back to Login"] })] }) })] }));
}
