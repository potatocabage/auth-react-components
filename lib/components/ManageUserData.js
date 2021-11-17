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
import { isErr } from '@innexgo/frontend-common';
import { userDataNew, } from '@innexgo/frontend-auth-api';
function ManageUserData(props) {
    const onSubmit = (values, { setStatus, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        // Validate input
        let errors = {};
        let hasError = false;
        if (values.name === "") {
            errors.name = "Name must not be empty";
            hasError = true;
        }
        setErrors(errors);
        if (hasError) {
            return;
        }
        const maybeUserData = yield userDataNew({
            userName: values.name,
            apiKey: props.apiKey.key,
        });
        if (isErr(maybeUserData)) {
            switch (maybeUserData.Err) {
                case "API_KEY_UNAUTHORIZED": {
                    setStatus({
                        failureMessage: "Please log back in and try again",
                        successMessage: ""
                    });
                    break;
                }
                default: {
                    setStatus({
                        failureMessage: "An unknown or network error has occured while trying to change name.",
                        successMessage: ""
                    });
                    break;
                }
            }
        }
        else {
            setStatus({
                failureMessage: "",
                successMessage: "Name successfully changed."
            });
            props.onSuccess(maybeUserData.Ok);
        }
    });
    return _jsx(_Fragment, { children: _jsx(Formik, Object.assign({ onSubmit: onSubmit, initialStatus: {
                successMessage: "",
                failureMessage: "",
            }, initialValues: {
                name: "",
            } }, { children: (props) => (_jsxs(Form, Object.assign({ noValidate: true, onSubmit: props.handleSubmit }, { children: [_jsxs(Form.Group, { children: [_jsx(Form.Label, { children: "Name" }, void 0), _jsx(Form.Control, { name: "name", placeholder: "Name", value: props.values.name, onChange: props.handleChange, isInvalid: !!props.errors.name }, void 0), _jsx(Form.Control.Feedback, Object.assign({ type: "invalid" }, { children: props.errors.name }), void 0)] }, void 0), _jsx("br", {}, void 0), _jsx(Button, Object.assign({ type: "submit" }, { children: "Change Name" }), void 0), _jsx("br", {}, void 0), _jsx(Form.Text, Object.assign({ className: "text-danger" }, { children: props.status.failureMessage }), void 0), _jsx(Form.Text, Object.assign({ className: "text-success" }, { children: props.status.successMessage }), void 0)] }), void 0)) }), void 0) }, void 0);
}
export default ManageUserData;
