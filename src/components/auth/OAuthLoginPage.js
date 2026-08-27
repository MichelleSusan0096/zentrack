import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * OAuth callback and login handling page
 */
import { useEffect, useState } from 'react';
import { handleGoogleCallback, handleGithubCallback, getOAuthProviderFromUrl, getOAuthCodeFromUrl } from '@/utils/oauthService';
import { storeLoginRecord } from '@/utils/excelService';
export function OAuthLoginPage({ onOAuthSuccess, onError }) {
    const [status, setStatus] = useState('Processing OAuth login...');
    useEffect(() => {
        const processOAuthCallback = async () => {
            try {
                const provider = getOAuthProviderFromUrl();
                const code = getOAuthCodeFromUrl();
                if (!provider) {
                    throw new Error('Invalid OAuth callback - no provider detected');
                }
                setStatus(`Processing ${provider} login...`);
                let oauthUser;
                if (provider === 'google') {
                    oauthUser = await handleGoogleCallback(code || 'demo_code');
                }
                else if (provider === 'github') {
                    oauthUser = await handleGithubCallback(code || 'demo_code');
                }
                else {
                    throw new Error('Unknown OAuth provider');
                }
                // Convert OAuth user to app user
                const user = {
                    id: oauthUser.id,
                    email: oauthUser.email,
                    password: 'oauth',
                    fullName: oauthUser.name,
                    role: 'trainee',
                    phoneNumber: '',
                    createdAt: new Date().toISOString().split('T')[0],
                    isVerified: true,
                };
                // Generate mock token
                const mockToken = `mock_jwt_oauth_${Date.now()}_${Math.random()}`;
                // Record successful OAuth login
                storeLoginRecord({
                    id: `login_${Date.now()}`,
                    userId: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    authMethod: provider,
                    role: user.role,
                    loginTime: new Date().toISOString(),
                    status: 'success',
                });
                setStatus(`Welcome, ${user.fullName}! Redirecting...`);
                // Success - redirect after brief delay
                setTimeout(() => {
                    onOAuthSuccess(user, mockToken, user.role);
                }, 1500);
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'OAuth login failed';
                console.error('OAuth error:', error);
                // Record failed OAuth login
                storeLoginRecord({
                    id: `login_${Date.now()}`,
                    userId: 'unknown',
                    email: 'unknown',
                    fullName: 'Unknown',
                    authMethod: 'google',
                    role: 'unknown',
                    loginTime: new Date().toISOString(),
                    status: 'failed',
                    errorMessage,
                });
                setStatus(`Error: ${errorMessage}`);
                onError(errorMessage);
            }
        };
        processOAuthCallback();
    }, [onOAuthSuccess, onError]);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-[#070913] via-[#0c1024] to-[#141a38] flex items-center justify-center px-4", children: [_jsx("div", { className: "absolute top-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" }), _jsx("div", { className: "relative w-full max-w-md", children: _jsxs("div", { className: "glass-panel p-8 rounded-3xl border border-fuchsia-500/30 magenta-glow space-y-6 text-center", children: [_jsx("div", { className: "flex justify-center mb-4", children: _jsx("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-yellow-500 p-0.5 magenta-glow animate-spin", children: _jsx("div", { className: "w-full h-full bg-[#0a0d1a] rounded-[14px] flex items-center justify-center", children: _jsx("i", { className: "fa-solid fa-spinner text-yellow-400 text-2xl animate-spin" }) }) }) }), _jsxs("div", { children: [_jsxs("h1", { className: "text-2xl font-extrabold text-white mb-2", children: ["ZEN", _jsx("span", { className: "text-yellow-400", children: "Track" })] }), _jsx("p", { className: "text-xs text-indigo-300 mb-6", children: "Beyond Training. Beyond Certification." })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm font-semibold text-white", children: status }), _jsx("div", { className: "w-full h-1 bg-indigo-900 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-gradient-to-r from-fuchsia-600 to-yellow-500 animate-pulse" }) })] }), _jsx("p", { className: "text-xs text-indigo-300/60", children: "Please wait while we verify your credentials..." })] }) })] }));
}
