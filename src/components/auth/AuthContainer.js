import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Authentication container component
 * Manages login, sign up, and forgot password views
 */
import { useState } from 'react';
import { LoginPage } from './LoginPage';
import { SignUpPage } from './SignUpPage';
import { ForgotPasswordPage } from './ForgotPasswordPage';
export function AuthContainer({ onAuthSuccess }) {
    const [authMode, setAuthMode] = useState('login');
    const handleLoginSuccess = (user, token) => {
        console.log('Login successful:', user);
        onAuthSuccess(user, token, user.role);
    };
    const handleSignUpSuccess = (user, token) => {
        console.log('Sign up successful:', user);
        // Auto-login after sign up
        onAuthSuccess(user, token, user.role);
    };
    const handleResetSuccess = () => {
        // After password reset, go back to login
        setAuthMode('login');
    };
    return (_jsxs(_Fragment, { children: [authMode === 'login' && (_jsx(LoginPage, { onLoginSuccess: handleLoginSuccess, onSignUpClick: () => setAuthMode('signup'), onForgotPasswordClick: () => setAuthMode('forgot') })), authMode === 'signup' && (_jsx(SignUpPage, { onSignUpSuccess: handleSignUpSuccess, onLoginClick: () => setAuthMode('login') })), authMode === 'forgot' && (_jsx(ForgotPasswordPage, { onBackToLogin: () => setAuthMode('login'), onResetSuccess: handleResetSuccess }))] }));
}
