var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Card, Button, Form } from "react-bootstrap";
import { Formik } from 'formik';
import { parentPermissionNew } from '@innexgo/frontend-auth-api';
import { isErr } from '@innexgo/frontend-common';
import { SimpleLayout } from '@innexgo/common-react-components';
function CreateParentPermission(props) {
    const onSubmit = (_, fprops) => __awaiter(this, void 0, void 0, function* () {
        let errors = {};
        // Validate input
        let hasError = false;
        fprops.setErrors(errors);
        if (hasError) {
            return;
        }
        const maybeParentPermission = yield parentPermissionNew({
            verificationChallengeKey: props.verificationChallengeKey,
        });
        if (isErr(maybeParentPermission)) {
            switch (maybeParentPermission.Err) {
                case "VERIFICATION_CHALLENGE_NONEXISTENT": {
                    fprops.setStatus({
                        failureResult: "This link is invalid.",
                        successResult: ""
                    });
                    break;
                }
                case "VERIFICATION_CHALLENGE_USED": {
                    fprops.setStatus({
                        failureResult: "This link has already been used.",
                        successResult: ""
                    });
                    break;
                }
                case "VERIFICATION_CHALLENGE_WRONG_KIND": {
                    fprops.setStatus({
                        failureResult: "This link is the wrong kind.",
                        successResult: ""
                    });
                    break;
                }
                case "VERIFICATION_CHALLENGE_TIMED_OUT": {
                    fprops.setStatus({
                        failureResult: "This link has timed out.",
                        successResult: ""
                    });
                    break;
                }
                default: {
                    fprops.setStatus({
                        failureResult: "An unknown or network error has occured while trying to register.",
                        successResult: ""
                    });
                    break;
                }
            }
            return;
        }
        fprops.setStatus({
            failureResult: "",
            successResult: "ParentPermission Created"
        });
        // execute callback
        props.postSubmit(maybeParentPermission.Ok);
    });
    return _jsx(_Fragment, { children: _jsx(Formik, Object.assign({ onSubmit: onSubmit, initialValues: {
                name: "",
            }, initialStatus: {
                failureResult: "",
                successResult: ""
            } }, { children: (fprops) => _jsx(_Fragment, { children: _jsxs(Form, Object.assign({ noValidate: true, onSubmit: fprops.handleSubmit }, { children: [_jsxs("div", Object.assign({ hidden: fprops.status.successResult !== "" }, { children: [_jsx(Button, Object.assign({ type: "submit" }, { children: "I give permission for my child to use this service." }), void 0), _jsx("br", {}, void 0), _jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: fprops.status.failureResult }), void 0)] }), void 0), _jsx(Form.Text, Object.assign({ className: "text-success" }, { children: fprops.status.successResult }), void 0)] }), void 0) }, void 0) }), void 0) }, void 0);
}
function ParentPermissionConfirm(props) {
    var _a;
    const [parentPermission, setParentPermission] = React.useState(null);
    return (_jsx(SimpleLayout, Object.assign({ branding: props.branding }, { children: _jsx("div", Object.assign({ className: "h-100 w-100 d-flex" }, { children: _jsx(Card, Object.assign({ className: "mx-auto my-auto" }, { children: _jsxs(Card.Body, { children: [_jsx(Card.Title, { children: "Parent Permission" }, void 0), parentPermission !== null
                            ? _jsx(Card.Text, { children: "Thank you, your response has been noted." }, void 0)
                            : _jsx(CreateParentPermission, { verificationChallengeKey: ((_a = new URLSearchParams(window.location.search).get("verificationChallengeKey")) !== null && _a !== void 0 ? _a : "")
                                    .replace(' ', '+'), postSubmit: e => setParentPermission(e) }, void 0)] }, void 0) }), void 0) }), void 0) }), void 0));
}
export default ParentPermissionConfirm;
