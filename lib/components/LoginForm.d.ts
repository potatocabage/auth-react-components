/// <reference types="react" />
import { ApiKey } from '@innexgo/frontend-auth-api';
import { Branding } from '@innexgo/common-react-components';
interface LoginFormProps {
    branding: Branding;
    onSuccess: (apiKey: ApiKey) => void;
}
declare function LoginForm(props: LoginFormProps): JSX.Element;
export default LoginForm;
