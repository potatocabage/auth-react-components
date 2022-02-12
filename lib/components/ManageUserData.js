import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Table } from 'react-bootstrap';
import { Action, DisplayModal } from '@innexgo/common-react-components';
import { Pencil, Lock, EnvelopePlus } from 'react-bootstrap-icons';
import format from 'date-fns/format';
import EditUserDataForm from '../components/EditUserDataForm';
import SendVerificationChallengeForm from '../components/SendVerificationChallengeForm';
import ManagePassword from '../components/ManagePassword';
const ManageUserData = (props) => {
    const [sentEmail, setSendEmail] = React.useState(false);
    const [showEditUserData, setShowEditUserData] = React.useState(false);
    const [showChangeEmail, setShowChangeEmail] = React.useState(false);
    const [showChangePassword, setShowChangePassword] = React.useState(false);
    return _jsxs(_Fragment, { children: [_jsx(Table, Object.assign({ hover: true, bordered: true }, { children: _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("th", { children: "Name" }, void 0), _jsx("td", { children: props.userData.realname }, void 0)] }, void 0), _jsxs("tr", { children: [_jsx("th", { children: "Username" }, void 0), _jsx("td", { children: props.userData.username }, void 0)] }, void 0), _jsxs("tr", { children: [_jsx("th", { children: "Date of Birth" }, void 0), _jsx("td", { children: format(props.userData.dateofbirth, 'MMM do, yyyy') }, void 0)] }, void 0), _jsxs("tr", { children: [_jsx("th", { children: "Email" }, void 0), _jsx("td", { children: _jsxs("table", { children: [_jsx("tr", { children: _jsxs("td", { children: [props.email.verificationChallenge.email, sentEmail ? _jsx("span", Object.assign({ className: "text-danger" }, { children: "*" }), void 0) : null] }, void 0) }, void 0), sentEmail
                                                ? _jsx("tr", { children: _jsx("td", { children: _jsx("small", Object.assign({ className: "text-muted" }, { children: "Check your email for instructions to finish the email change process." }), void 0) }, void 0) }, void 0)
                                                : null] }, void 0) }, void 0)] }, void 0)] }, void 0) }), void 0), _jsx(Action, { title: "Edit Personal Information", icon: Pencil, onClick: () => setShowEditUserData(true) }, void 0), _jsx(Action, { title: "Change Email", icon: EnvelopePlus, onClick: () => setShowChangeEmail(true) }, void 0), _jsx(Action, { title: "Change Password", icon: Lock, onClick: () => setShowChangePassword(true) }, void 0), _jsx(DisplayModal, Object.assign({ title: "Edit Personal Information", show: showEditUserData, onClose: () => setShowEditUserData(false) }, { children: _jsx(EditUserDataForm, { userData: props.userData, apiKey: props.apiKey, setUserData: userData => {
                        setShowEditUserData(false);
                        props.setUserData(userData);
                    } }, void 0) }), void 0), _jsx(DisplayModal, Object.assign({ title: "Change Email", show: showChangePassword, onClose: () => setShowChangePassword(false) }, { children: _jsx(ManagePassword, { apiKey: props.apiKey, onSuccess: () => {
                        setShowChangePassword(false);
                    } }, void 0) }), void 0), _jsx(DisplayModal, Object.assign({ title: "Change Email", show: showChangeEmail, onClose: () => setShowChangeEmail(false) }, { children: _jsx(SendVerificationChallengeForm, { toParent: false, initialEmailAddress: props.email.verificationChallenge.email, apiKey: props.apiKey, setVerificationChallenge: () => { setShowChangeEmail(false); setSendEmail(true); } }, void 0) }), void 0)] }, void 0);
};
export default ManageUserData;
