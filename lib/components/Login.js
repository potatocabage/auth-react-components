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
import { Formik } from 'formik';
import { Button, Form, } from 'react-bootstrap';
import { apiKeyNewValid, } from '@innexgo/frontend-auth-api';
import { isErr } from '@innexgo/frontend-common';
function Login(props) {
    // onSubmit is a callback that will be run once the user submits their form.
    // here, we're making use of JavaScript's destructuring assignment: 
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const onSubmit = (values, { setStatus, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        // Validate input
        // we start off by assuming no errors
        let errors = {};
        let hasError = false;
        if (values.email === "") {
            errors.email = "Please enter your email";
            hasError = true;
        }
        if (values.password === "") {
            errors.password = "Please enter your password";
            hasError = true;
        }
        // setErrors is a Formik function that automatically sets errors on the correct fields
        setErrors(errors);
        // bail early if we have hit any errors
        if (hasError) {
            return;
        }
        // we make our request here
        const maybeApiKey = yield apiKeyNewValid({
            userEmail: values.email,
            userPassword: values.password,
            duration: 5 * 60 * 60 * 1000
        });
        // check if the operation was successful
        if (isErr(maybeApiKey)) {
            // otherwise display errors
            switch (maybeApiKey.Err) {
                case "EMAIL_NONEXISTENT": {
                    setErrors({
                        email: "No such email exists"
                    });
                    break;
                }
                case "USER_NONEXISTENT": {
                    setErrors({
                        email: "No such user exists"
                    });
                    break;
                }
                case "PASSWORD_INCORRECT": {
                    setErrors({
                        password: "Your password is incorrect"
                    });
                    break;
                }
                default: {
                    // Status is like the global error field of the form. 
                    // Only use it when dealing with unknown kinds of errors, 
                    // or errors that don't really fit on a single field.
                    setStatus("An unknown or network error has occured while trying to log you in");
                    break;
                }
            }
            return;
        }
        // on success execute callBack
        props.onSuccess(maybeApiKey.Ok);
    });
    // Notice how Formik is a Generic component that does type checking
    // This helps ensure we make fewer mistakes
    return _jsx(_Fragment, { children: _jsx(Formik, Object.assign({ onSubmit: onSubmit, initialStatus: "", initialValues: {
                // these are the default values the form will start with
                email: "",
                password: "",
            } }, { children: (fprops) => (
            /* we enable noValidate so that we can delegate validation to Formik */
            /* onSubmit={fprops.handleSubmit} means that Formik will handle form submission */
            _jsxs(Form, Object.assign({ noValidate: true, onSubmit: fprops.handleSubmit }, { children: [_jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Email" }, void 0), _jsx(Form.Control, { name: "email", type: "email", placeholder: "Email", value: fprops.values.email, onChange: fprops.handleChange, isInvalid: !!fprops.errors.email }, void 0), _jsxs(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: [" ", fprops.errors.email, " "] }), void 0)] }), void 0), _jsxs(Form.Group, Object.assign({ className: "mb-3" }, { children: [_jsx(Form.Label, { children: "Password" }, void 0), _jsx(Form.Control, { name: "password", type: "password", placeholder: "Password", value: fprops.values.password, onChange: fprops.handleChange, isInvalid: !!fprops.errors.password }, void 0), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: fprops.errors.password }), void 0)] }), void 0), _jsx(Form.Group, Object.assign({ className: "mb-3" }, { children: _jsx(Button, Object.assign({ type: "submit" }, { children: "Login" }), void 0) }), void 0), _jsx(Form.Text, Object.assign({ className: "text-danger mb-3" }, { children: fprops.status }), void 0), _jsx(Form.Group, Object.assign({ className: "mb-3" }, { children: _jsx(Form.Text, { children: _jsx("a", Object.assign({ href: "/forgot_password" }, { children: "Forgot Password?" }), void 0) }, void 0) }), void 0)] }), void 0)) }), void 0) }, void 0);
}
export default Login;
