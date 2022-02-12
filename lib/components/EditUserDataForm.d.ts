/// <reference types="react" />
import { ApiKey, UserData } from '@innexgo/frontend-auth-api';
interface EditUserDataFormProps {
    apiKey: ApiKey;
    userData: UserData;
    setUserData: (ud: UserData) => void;
}
declare function EditUserDataForm(props: EditUserDataFormProps): JSX.Element;
export default EditUserDataForm;
