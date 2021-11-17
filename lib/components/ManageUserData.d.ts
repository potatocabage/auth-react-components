/// <reference types="react" />
import { ApiKey, UserData } from '@innexgo/frontend-auth-api';
interface ManageUserDataProps {
    apiKey: ApiKey;
    onSuccess: (ud: UserData) => void;
}
declare function ManageUserData(props: ManageUserDataProps): JSX.Element;
export default ManageUserData;
