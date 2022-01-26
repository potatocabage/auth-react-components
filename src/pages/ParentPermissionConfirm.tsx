import React from 'react';
import { Card, Button, Form } from "react-bootstrap";
import { Formik, FormikHelpers, FormikErrors } from 'formik'
import { ParentPermission, parentPermissionNew } from '@innexgo/frontend-auth-api';
import { isErr } from '@innexgo/frontend-common';

import { SimpleLayout, BrandedComponentProps } from '@innexgo/common-react-components';

type CreateParentPermissionProps = {
  verificationChallengeKey: string;
  tosUrl?: string;
  postSubmit: (parentPermission: ParentPermission) => void;
}

function CreateParentPermission(props: CreateParentPermissionProps) {
  type CreateParentPermissionValue = {
    terms: boolean,
  }

  const onSubmit = async (values: CreateParentPermissionValue,
    fprops: FormikHelpers<CreateParentPermissionValue>) => {

    let errors: FormikErrors<CreateParentPermissionValue> = {};

    // Validate input

    let hasError = false;
    if (!values.terms && props.tosUrl !== undefined) {
      errors.terms = "You must agree to the terms and conditions";
      hasError = true;
    }
    fprops.setErrors(errors);
    if (hasError) {
      return;
    }

    const maybeParentPermission = await parentPermissionNew({
      verificationChallengeKey: props.verificationChallengeKey,
    });

    if (isErr(maybeParentPermission)) {
      switch (maybeParentPermission.Err) {
        case "VERIFICATION_CHALLENGE_NONEXISTENT": {
          fprops.setStatus({
            failureResult: "This link is invalid.",
            successResult: ""
          });
          break;
        }
        case "VERIFICATION_CHALLENGE_USED": {
          fprops.setStatus({
            failureResult: "This link has already been used.",
            successResult: ""
          });
          break;
        }
        case "VERIFICATION_CHALLENGE_WRONG_KIND": {
          fprops.setStatus({
            failureResult: "This link is the wrong kind.",
            successResult: ""
          });
          break;
        }
        case "VERIFICATION_CHALLENGE_TIMED_OUT": {
          fprops.setStatus({
            failureResult: "This link has timed out.",
            successResult: ""
          });
          break;
        }
        default: {
          fprops.setStatus({
            failureResult: "An unknown or network error has occured while trying to register.",
            successResult: ""
          });
          break;
        }
      }
      return;
    }

    fprops.setStatus({
      failureResult: "",
      successResult: "ParentPermission Created"
    });
    // execute callback
    props.postSubmit(maybeParentPermission.Ok);
  }

  return <>
    <Formik<CreateParentPermissionValue>
      onSubmit={onSubmit}
      initialValues={{
        //name: "",
        terms: false,
      }}
      initialStatus={{
        failureResult: "",
        successResult: ""
      }}
    >
      {(fprops) => <>
        <Form
          noValidate
          onSubmit={fprops.handleSubmit} >
          <div hidden={fprops.status.successResult !== ""}>
          <Form.Check className="mb-3 form-check" hidden={props.tosUrl === undefined}>
              <Form.Check.Input
                name="terms"
                checked={fprops.values.terms}
                onChange={fprops.handleChange}
                isInvalid={!!fprops.errors.terms}
              />
              <Form.Check.Label>Agree to <a target="_blank" rel="noopener noreferrer" href={props.tosUrl}>terms of service</a></Form.Check.Label>
              <Form.Control.Feedback type="invalid">{fprops.errors.terms}</Form.Control.Feedback>
            </Form.Check>
            <Button type="submit">I give permission for my child to use this service.</Button>
            <br />
            <Form.Text className="text-danger">{fprops.status.failureResult}</Form.Text>
          </div>
          <Form.Text className="text-success">{fprops.status.successResult}</Form.Text>
        </Form>
      </>}
    </Formik>
  </>
}


function ParentPermissionConfirm(props: BrandedComponentProps) {

  const [parentPermission, setParentPermission] = React.useState<ParentPermission | null>(null);

  return (
    <SimpleLayout branding={props.branding}>
      <div className="h-100 w-100 d-flex">
        <Card className="mx-auto my-auto">
          <Card.Body>
            <Card.Title>Parent Permission</Card.Title>
            {
              parentPermission !== null
                ? <Card.Text>Thank you, your response has been noted.</Card.Text>
                : <CreateParentPermission
                tosUrl={props.branding.tosUrl}
                  verificationChallengeKey={
                    (new URLSearchParams(window.location.search).get("verificationChallengeKey") ?? "")
                      .replace(' ', '+')
                  }
                  postSubmit={e => setParentPermission(e)}
                />
            }
          </Card.Body>
        </Card>
      </div>
    </SimpleLayout>
  )
}

export default ParentPermissionConfirm;
