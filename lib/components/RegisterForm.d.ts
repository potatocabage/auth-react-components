/// <reference types="react" />
import { ApiKey } from '@innexgo/frontend-auth-api';
declare type RegisterFormProps = {
    tosUrl?: string;
    onSuccess: (a: ApiKey) => void;
};
declare function RegisterForm(props: RegisterFormProps): JSX.Element;
export default RegisterForm;
