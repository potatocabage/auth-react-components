import { jsx as _jsx } from "react/jsx-runtime";
import { Confirm } from 'semantic-ui-react';
import { createPortal } from 'react-dom';
export const LogoutConfirmation = ({ isOpen, cancel, close }) => {
    if (isOpen) {
        return createPortal(_jsx(Confirm, { open: isOpen, onCancel: cancel, onConfirm: close }, void 0), document.body);
    }
    ;
};
