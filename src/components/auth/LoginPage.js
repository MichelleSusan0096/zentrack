import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Login page component
 */
import { useState } from 'react';
import { validateLoginForm } from '@/utils/validation';
import { supabase } from '@/utils/supabaseClient';
export function LoginPage({ onLoginSuccess, onSignUpClick, onForgotPasswordClick }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [generalError, setGeneralError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.currentTarget;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
        // Clear errors for this field
        setErrors((prev) => prev.filter((err) => err.field !== name));
        setGeneralError('');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setGeneralError('');
        // Validate form
        const validationErrors = validateLoginForm(formData.email, formData.password);
        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
            return;
        }
        try {
            // Try to sign in with Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error && error.status === 400) {
                // User doesn't exist, try to sign up
                const { error: signUpError } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.email.split('@')[0],
                        },
                    },
                });
                if (signUpError) {
                    throw signUpError;
                }
                // Auto login after signup
                const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password,
                });
                if (sessionError) {
                    throw sessionError;
                }
                if (sessionData.user && sessionData.session) {
                    const appUser = {
                        id: sessionData.user.id,
                        email: sessionData.user.email || '',
                        password: 'oauth',
                        fullName: sessionData.user.user_metadata?.full_name || formData.email.split('@')[0],
                        role: 'trainee',
                        phoneNumber: '',
                        createdAt: new Date().toISOString().split('T')[0],
                        isVerified: true,
                    };
                    onLoginSuccess(appUser, sessionData.session.access_token);
                }
            }
            else if (error) {
                throw error;
            }
            else if (data.user && data.session) {
                // Login successful
                const appUser = {
                    id: data.user.id,
                    email: data.user.email || '',
                    password: 'oauth',
                    fullName: data.user.user_metadata?.full_name || formData.email.split('@')[0],
                    role: 'trainee',
                    phoneNumber: '',
                    createdAt: new Date().toISOString().split('T')[0],
                    isVerified: true,
                };
                onLoginSuccess(appUser, data.session.access_token);
            }
        }
        catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Login failed';
            setGeneralError(errorMsg);
            console.error('Login error:', error);
        }
        setIsLoading(false);
    };
    const getErrorMessage = (fieldName) => {
        return errors.find((err) => err.field === fieldName)?.message || null;
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-[#070913] via-[#0c1024] to-[#141a38] flex items-center justify-center px-4", children: [_jsx("div", { className: "absolute top-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" }), _jsxs("div", { className: "relative w-full max-w-md", children: [_jsxs("div", { className: "glass-panel p-8 rounded-3xl border border-fuchsia-500/30 magenta-glow space-y-6", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-yellow-500 p-0.5 magenta-glow", children: _jsx("div", { className: "w-full h-full bg-[#0a0d1a] rounded-[14px] flex items-center justify-center", children: _jsx("i", { className: "fa-solid fa-chart-line text-yellow-400 text-2xl" }) }) }) }), _jsxs("h1", { className: "text-3xl font-extrabold text-white", children: ["ZEN", _jsx("span", { className: "text-yellow-400", children: "Track" })] }), _jsx("p", { className: "text-xs text-indigo-300", children: "Beyond Training. Beyond Certification." })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [generalError && (_jsxs("div", { className: "p-3 rounded-lg bg-red-950/50 border border-red-500/40 flex items-center gap-2", children: [_jsx("i", { className: "fa-solid fa-circle-exclamation text-red-400" }), _jsx("p", { className: "text-xs text-red-300", children: generalError })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-2 uppercase tracking-wider", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa-solid fa-envelope absolute left-3 top-3 text-indigo-400 text-sm" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleInputChange, placeholder: "you@example.com", className: `w-full bg-indigo-950/40 border rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${getErrorMessage('email')
                                                            ? 'border-red-500/50 focus:border-red-500'
                                                            : 'border-indigo-800/50 focus:border-fuchsia-500'}` })] }), getErrorMessage('email') && (_jsxs("p", { className: "text-xs text-red-400 mt-1 flex items-center gap-1", children: [_jsx("i", { className: "fa-solid fa-exclamation-circle" }), getErrorMessage('email')] }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-indigo-300 mb-2 uppercase tracking-wider", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx("i", { className: "fa-solid fa-lock absolute left-3 top-3 text-indigo-400 text-sm" }), _jsx("input", { type: showPassword ? 'text' : 'password', name: "password", value: formData.password, onChange: handleInputChange, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: `w-full bg-indigo-950/40 border rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${getErrorMessage('password')
                                                            ? 'border-red-500/50 focus:border-red-500'
                                                            : 'border-indigo-800/50 focus:border-fuchsia-500'}` }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-3 text-indigo-400 hover:text-indigo-300", children: _jsx("i", { className: `fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}` }) })] }), getErrorMessage('password') && (_jsxs("p", { className: "text-xs text-red-400 mt-1 flex items-center gap-1", children: [_jsx("i", { className: "fa-solid fa-exclamation-circle" }), getErrorMessage('password')] }))] }), _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsxs("label", { className: "flex items-center gap-2 cursor-pointer group", children: [_jsx("input", { type: "checkbox", name: "rememberMe", checked: formData.rememberMe, onChange: handleInputChange, className: "w-4 h-4 rounded bg-indigo-950 border border-indigo-800 cursor-pointer accent-fuchsia-500" }), _jsx("span", { className: "text-indigo-300 group-hover:text-indigo-200", children: "Remember me" })] }), _jsx("button", { type: "button", onClick: onForgotPasswordClick, className: "text-fuchsia-400 hover:text-fuchsia-300 font-semibold", children: "Forgot password?" })] }), _jsx("button", { type: "submit", disabled: isLoading, className: "w-full mt-6 px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all magenta-glow flex items-center justify-center gap-2", children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("i", { className: "fa-solid fa-spinner animate-spin" }), "Signing in..."] })) : (_jsxs(_Fragment, { children: [_jsx("i", { className: "fa-solid fa-arrow-right-to-bracket" }), "Sign In"] })) })] }), _jsxs("div", { className: "p-3 rounded-lg bg-purple-950/30 border border-purple-500/20", children: [_jsx("p", { className: "text-[10px] text-purple-300 font-semibold uppercase mb-2", children: "Demo Credentials:" }), _jsxs("div", { className: "space-y-1 text-[11px] text-slate-300", children: [_jsxs("p", { children: [_jsx("span", { className: "text-yellow-400 font-semibold", children: "Admin:" }), " admin@zentrack.com / Admin@123456"] }), _jsxs("p", { children: [_jsx("span", { className: "text-fuchsia-400 font-semibold", children: "Trainee:" }), " trainee@zentrack.com / Trainee@123456"] })] })] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("div", { className: "w-full border-t border-indigo-900/50" }) }), _jsx("div", { className: "relative flex justify-center text-xs", children: _jsx("span", { className: "px-2 bg-indigo-950/50 text-indigo-400", children: "Don't have an account?" }) })] }), _jsxs("button", { type: "button", onClick: onSignUpClick, className: "w-full px-4 py-3 rounded-xl border border-yellow-500/40 text-yellow-400 font-bold text-sm hover:bg-yellow-500/10 transition-all flex items-center justify-center gap-2", children: [_jsx("i", { className: "fa-solid fa-user-plus" }), "Create New Account"] })] }), _jsx("div", { className: "mt-6 text-center text-xs text-indigo-300/60", children: _jsxs("p", { className: "flex items-center justify-center gap-1", children: [_jsx("i", { className: "fa-solid fa-shield-halved" }), "Your login is secure and encrypted"] }) })] })] }));
}
