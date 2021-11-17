/// <reference types="react" />
import { ApiKey } from '@innexgo/frontend-auth-api';
interface LoginProps {
    onSuccess: (apiKey: ApiKey) => void;
}
declare function Login(props: LoginProps): JSX.Element;
export default Login;
