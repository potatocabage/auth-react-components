import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Card } from 'react-bootstrap';
import RegisterForm from '../components/RegisterForm';
import { SimpleLayout } from '@innexgo/common-react-components';
function Register(props) {
    const [successful, setSuccess] = React.useState(false);
    return (_jsx(SimpleLayout, Object.assign({ branding: props.branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Register" }, void 0), successful
                            ? _jsxs(Card.Text, { children: ["Your account has been created, ", _jsx("a", Object.assign({ href: props.branding.dashboardUrl }, { children: "click here to log in" }), void 0), "."] }, void 0)
                            : _jsx(RegisterForm, { onSuccess: () => setSuccess(true), tosUrl: props.branding.tosUrl }, void 0)] }, void 0) }), void 0) }), void 0) }), void 0));
}
export default Register;
