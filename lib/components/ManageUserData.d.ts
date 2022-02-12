/// <reference types="react" />
import { UserData, Email, ApiKey } from '@innexgo/frontend-auth-api';
declare const ManageUserData: (props: {
    userData: UserData;
    setUserData: (userData: UserData) => void;
    email: Email;
    apiKey: ApiKey;
}) => JSX.Element;
export default ManageUserData;
