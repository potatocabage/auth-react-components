/// <reference types="react" />
import { ApiKey, VerificationChallenge } from '@innexgo/frontend-auth-api';
interface SendVerificationChallengeFormProps {
    toParent: boolean;
    initialEmailAddress: string;
    setVerificationChallenge: (vc: VerificationChallenge) => void;
    apiKey: ApiKey;
}
declare function SendVerificationChallengeForm(props: SendVerificationChallengeFormProps): JSX.Element;
export default SendVerificationChallengeForm;
