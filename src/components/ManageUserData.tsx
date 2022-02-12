import { Formik, FormikHelpers, FormikErrors } from 'formik'
import { Button, Form, } from 'react-bootstrap'
import { isErr } from '@innexgo/frontend-common';
import { ApiKey, UserData, userDataNew, } from '@innexgo/frontend-auth-api';
import parse from 'date-fns/parse';
import format from 'date-fns/format';

const DATEFORMAT = 'yyyy-MM-dd';

interface ManageUserDataProps {
  apiKey: ApiKey,
  userData: UserData,
  onSuccess: (ud: UserData) => void
}

function ManageUserData(props: ManageUserDataProps) {
  type ManageUserDataValue = {
    realname: string,
    username: string,
    dateofbirth: string,
  }

  const onSubmit = async (values: ManageUserDataValue, { setStatus, setErrors }: FormikHelpers<ManageUserDataValue>) => {
    // Validate input
    let errors: FormikErrors<ManageUserDataValue> = {};
    let hasError = false;

    let dateofbirth = parse(values.dateofbirth, DATEFORMAT, new Date());

    if (isNaN(dateofbirth.valueOf())) {
      errors.dateofbirth = `Couldn't parse date, must be in format YYYY-MM-DD`;
      hasError = true;
    }

    setErrors(errors);
    if (hasError) {
      return;
    }

    const maybeUserData = await userDataNew({
      username: values.username,
      realname: values.realname,
      dateofbirth: dateofbirth.valueOf(),
      apiKey: props.apiKey.key,
    });

    if (isErr(maybeUserData)) {
      switch (maybeUserData.Err) {
        case "API_KEY_UNAUTHORIZED": {
          setStatus({
            failureMessage: "Please log back in and try again",
            successMessage: ""
          });
          break;
        }
        case "USER_USERNAME_INVALID": {
          setErrors({
            username: "Invalid username"
          });
          break;
        }
        case "USER_USERNAME_TAKEN": {
          setErrors({
            username: "This username is already taken."
          });
          break;
        }
        case "USER_REALNAME_INVALID": {
          setErrors({
            realname: "Invalid name"
          });
          break;
        }
        case "USER_DATEOFBIRTH_INVALID": {
          setErrors({
            dateofbirth: "Invalid date of birth."
          });
          break;
        }
        default: {
          setStatus({
            failureMessage: "An unknown or network error has occured while trying to change name.",
            successMessage: ""
          });
          break;
        }
      }
    } else {
      setStatus({
        failureMessage: "",
        successMessage: "Successfully updated information."
      });

      props.onSuccess(maybeUserData.Ok);
    }
  }
  return <>
    <Formik<ManageUserDataValue>
      onSubmit={onSubmit}
      initialStatus={{
        successMessage: "",
        failureMessage: "",
      }}
      initialValues={{
        realname: props.userData.realname,
        username: props.userData.username,
        dateofbirth: format(props.userData.dateofbirth, DATEFORMAT),
      }}
    >
      {(props) => (
        <Form
          noValidate
          onSubmit={props.handleSubmit} >
          <Form.Group >
            <Form.Label >Real Name</Form.Label>
            <Form.Control
              name="realname"
              placeholder="Real Name"
              value={props.values.realname}
              onChange={props.handleChange}
              isInvalid={!!props.errors.realname}
            />
            <Form.Control.Feedback type="invalid">{props.errors.realname}</Form.Control.Feedback>
            <Form.Text className="text-muted">
              Please enter what you would like others to call you.
            </Form.Text>
          </Form.Group>
          <Form.Group >
            <Form.Label >Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="username"
              value={props.values.username}
              onChange={props.handleChange}
              isInvalid={!!props.errors.username}
            />
            <Form.Control.Feedback type="invalid">{props.errors.username}</Form.Control.Feedback>
            <Form.Text className="text-muted">
              Please enter a unique username.
            </Form.Text>
          </Form.Group>
          <Form.Group >
            <Form.Label >Date of Birth</Form.Label>
            <Form.Control
              name="dateofbirth"
              placeholder="YYYY-MM-DD"
              value={props.values.dateofbirth}
              onChange={props.handleChange}
              isInvalid={!!props.errors.dateofbirth}
            />
            <Form.Control.Feedback type="invalid">{props.errors.dateofbirth}</Form.Control.Feedback>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <br />
          <Button type="submit">Update</Button>
          <br />
          <Form.Text className="text-danger">{props.status.failureMessage}</Form.Text>
          <Form.Text className="text-success">{props.status.successMessage}</Form.Text>
        </Form>
      )}
    </Formik>
  </>
}

export default ManageUserData;
