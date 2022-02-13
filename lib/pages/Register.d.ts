/// <reference types="react" />
import { Branding } from '@innexgo/common-react-components';
import { ApiKey } from '@innexgo/frontend-auth-api';
declare type RegisterProps = {
    branding: Branding;
    apiKey: ApiKey | null;
    setApiKey: (a: ApiKey | null) => void;
};
declare function Register(props: RegisterProps): JSX.Element;
export default Register;
