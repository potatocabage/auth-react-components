import React, { Component } from 'react';
import { Button, Confirm } from 'semantic-ui-react'
import { createPortal } from 'react-dom';

export const LogoutConfirmation = ({ isOpen, cancel, close }: { isOpen: boolean, cancel: any, close: any } ) => {

    if (isOpen) {
        return createPortal(
            <Confirm
                open={isOpen}
                onCancel={cancel}
                onConfirm={close}
            />,
            document.body
        );
    };
}