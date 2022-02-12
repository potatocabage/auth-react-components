/// <reference types="react" />
import { ApiKey } from '@innexgo/frontend-auth-api';
import { Branding } from '@innexgo/common-react-components';
interface LoginProps {
    branding: Branding;
    onSuccess: (apiKey: ApiKey) => void;
}
declare function Login(props: LoginProps): JSX.Element;
export default Login;
