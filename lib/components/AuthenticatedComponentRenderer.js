import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Login from "../components/Login";
import { SimpleLayout } from '@innexgo/common-react-components';
function AuthenticatedComponentRenderer({ branding, component: AuthenticatedComponent, apiKey, setApiKey, }) {
    const isAuthenticated = apiKey !== null &&
        apiKey.creationTime + apiKey.duration > Date.now() &&
        apiKey.apiKeyKind === "VALID";
    return isAuthenticated
        ? _jsx(AuthenticatedComponent, { apiKey: apiKey, setApiKey: setApiKey, branding: branding }, void 0)
        : _jsx(SimpleLayout, Object.assign({ branding: branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx("div", Object.assign({ className: "card mx-auto my-auto" }, { children: _jsxs("div", Object.assign({ className: "card-body" }, { children: [_jsx("h5", Object.assign({ className: "card-title" }, { children: "Login" }), void 0), _jsx(Login, { branding: branding, onSuccess: x => setApiKey(x) }, void 0)] }), void 0) }), void 0) }), void 0) }), void 0);
}
export default AuthenticatedComponentRenderer;
