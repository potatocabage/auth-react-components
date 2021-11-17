/// <reference types="react" />
import { ApiKey, Password } from '@innexgo/frontend-auth-api';
interface ManagePasswordProps {
    apiKey: ApiKey;
    onSuccess: (p: Password) => void;
}
declare function ManagePassword(props: ManagePasswordProps): JSX.Element;
export default ManagePassword;
