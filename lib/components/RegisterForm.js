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
import { Button, Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { userNew } from '@innexgo/frontend-auth-api';
import { isErr } from '@innexgo/frontend-common';
function RegisterForm(props) {
    const onSubmit = (values, fprops) => __awaiter(this, void 0, void 0, function* () {
        // Validate input
        let errors = {};
        let hasError = false;
        if (values.name === "") {
            errors.name = "Please enter what you'd like us to call you";
            hasError = true;
        }
        if (!values.email.includes("@")) {
            errors.email = "Please enter your email";
            hasError = true;
        }
        if (values.password2 !== values.password1) {
            errors.password2 = "Password does not match";
            hasError = true;
        }
        if (!values.touchedAge) {
            errors.olderThan13 = "Please pick an option";
            hasError = true;
        }
        if (!values.olderThan13 && !values.parentEmail.includes("@")) {
            errors.parentEmail = "Please enter a parent email";
            hasError = true;
        }
        if (values.parentEmail === values.email) {
            errors.parentEmail = "Parent email must be different from your email";
            hasError = true;
        }
        if (!values.terms && props.tosUrl !== undefined) {
            errors.terms = "You must agree to the terms and conditions";
            hasError = true;
        }
        fprops.setErrors(errors);
        if (hasError) {
            return;
        }
        const maybeUserData = yield userNew({
            userName: values.name,
            userPassword: values.password1,
            userEmail: values.email,
            parentEmail: values.olderThan13 ? undefined : values.parentEmail
        });
        if (isErr(maybeUserData)) {
            // otherwise display errors
            switch (maybeUserData.Err) {
                case "USER_EMAIL_EMPTY": {
                    fprops.setErrors({
                        name: "Please enter your email."
                    });
                    break;
                }
                case "USER_NAME_EMPTY": {
                    fprops.setErrors({
                        name: "Please enter what you'd like us to call you."
                    });
                    break;
                }
                case "USER_EXISTENT": {
                    fprops.setErrors({
                        email: "A user with this email already exists."
                    });
                    break;
                }
                case "PASSWORD_INSECURE": {
                    fprops.setErrors({
                        password1: "Password must have at least 8 chars and 1 number"
                    });
                    break;
                }
                default: {
                    fprops.setStatus({
                        failureMessage: "An unknown or network error has occured while trying to register.",
                        successMessage: ""
                    });
                    break;
                }
            }
            return;
        }
        fprops.setStatus({
            failureMessage: "",
            successMessage: "We've sent an email to verify your address."
        });
        // execute callback
        props.onSuccess();
    });
    const normalizeInput = (e) => e.replace(/[^A-Za-z0-9]+/g, "");
    return (_jsx(Formik, Object.assign({ onSubmit: onSubmit, initialStatus: {
            failureMessage: "",
            successMessage: "",
        }, initialValues: {
            name: "",
            email: "",
            password1: "",
            password2: "",
            terms: false,
            touchedAge: false,
            olderThan13: true,
            parentEmail: ""
        } }, { children: (fprops) => _jsx(_Fragment, { children: _jsxs(Form, Object.assign({ noValidate: true, onSubmit: fprops.handleSubmit }, { children: [_jsxs("div", Object.assign({ hidden: fprops.status.successMessage !== "" }, { children: [_jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Name" }, void 0), _jsx(Form.Control, { name: "name", type: "text", placeholder: "Name", value: fprops.values.name, onChange: e => fprops.setFieldValue("name", normalizeInput(e.target.value)), isInvalid: !!fprops.errors.name }, void 0), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.name }), void 0)] }), void 0), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Email" }, void 0), _jsx(Form.Control, { name: "email", type: "email", placeholder: "Email", value: fprops.values.email, onChange: fprops.handleChange, isInvalid: !!fprops.errors.email }, void 0), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.email }), void 0)] }), void 0), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Password" }, void 0), _jsx(Form.Control, { name: "password1", type: "password", placeholder: "Password", value: fprops.values.password1, onChange: fprops.handleChange, isInvalid: !!fprops.errors.password1 }, void 0), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.password1 }), void 0)] }), void 0), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Confirm Password" }, void 0), _jsx(Form.Control, { name: "password2", type: "password", placeholder: "Confirm Password", value: fprops.values.password2, onChange: fprops.handleChange, isInvalid: !!fprops.errors.password2 }, void 0), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.password2 }), void 0)] }), void 0), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsxs(Form.Check, Object.assign({ className: "form-check" }, { children: [_jsx(Form.Check.Input, { type: "radio", name: "olderThan13", isInvalid: !!fprops.errors.olderThan13, onChange: () => {
                                                    fprops.setFieldValue('olderThan13', false);
                                                    fprops.setFieldValue('touchedAge', true);
                                                } }, void 0), _jsx(Form.Check.Label, { children: "I am younger than 13" }, void 0)] }), void 0), _jsxs(Form.Check, Object.assign({ className: "form-check" }, { children: [_jsx(Form.Check.Input, { type: "radio", name: "olderThan13", isInvalid: !!fprops.errors.olderThan13, onChange: () => {
                                                    fprops.setFieldValue('olderThan13', true);
                                                    fprops.setFieldValue('touchedAge', true);
                                                } }, void 0), _jsx(Form.Check.Label, { children: "I am older than 13" }, void 0), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.olderThan13 }), void 0)] }), void 0)] }), void 0), _jsxs(Form.Group, Object.assign({ hidden: fprops.values.olderThan13, className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Parent Email" }, void 0), _jsx(Form.Control, { name: "parentEmail", type: "email", placeholder: "Parent Email", value: fprops.values.parentEmail, onChange: fprops.handleChange, isInvalid: !!fprops.errors.parentEmail }, void 0), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.parentEmail }), void 0)] }), void 0), _jsxs(Form.Check, Object.assign({ className: "mb-3 form-check", hidden: props.tosUrl === undefined }, { children: [_jsx(Form.Check.Input, { name: "terms", checked: fprops.values.terms, onChange: fprops.handleChange, isInvalid: !!fprops.errors.terms }, void 0), _jsxs(Form.Check.Label, { children: ["Agree to ", _jsx("a", Object.assign({ target: "_blank", rel: "noopener noreferrer", href: props.tosUrl }, { children: "terms of service" }), void 0)] }, void 0), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.terms }), void 0)] }), void 0), _jsx("br", {}, void 0), _jsx(Button, Object.assign({ type: "submit" }, { children: "Submit Form" }), void 0), _jsx(Form.Group, { children: _jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: fprops.status.failureMessage }), void 0) }, void 0)] }), void 0), _jsx(Form.Text, Object.assign({ className: "text-success" }, { children: fprops.status.successMessage }), void 0)] }), void 0) }, void 0) }), void 0));
}
export default RegisterForm;
