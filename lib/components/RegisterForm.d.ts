/// <reference types="react" />
declare type RegisterFormProps = {
    tosUrl?: string;
    onSuccess: () => void;
};
declare function RegisterForm(props: RegisterFormProps): JSX.Element;
export default RegisterForm;
