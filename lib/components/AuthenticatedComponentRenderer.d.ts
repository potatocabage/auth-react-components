import React from "react";
import { ApiKey } from "@innexgo/frontend-auth-api";
import AuthenticatedComponentProps from '../components/AuthenticatedComponentProps';
import { Branding } from '@innexgo/common-react-components';
export interface AuthenticatedComponentRendererProps {
    branding: Branding;
    component: React.ComponentType<AuthenticatedComponentProps>;
    apiKey: ApiKey | null;
    setApiKey: (data: ApiKey | null) => void;
}
declare function AuthenticatedComponentRenderer({ branding, component: AuthenticatedComponent, apiKey, setApiKey, }: AuthenticatedComponentRendererProps): JSX.Element;
export default AuthenticatedComponentRenderer;
