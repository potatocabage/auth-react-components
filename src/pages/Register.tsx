import React from 'react';
import { Card } from 'react-bootstrap'

import RegisterForm from '../components/RegisterForm';
import { SimpleLayout, BrandedComponentProps } from '@innexgo/common-react-components';

function Register(props: BrandedComponentProps) {
  const [successful, setSuccess] = React.useState(false);
  return (
    <SimpleLayout branding={props.branding}>
      <div className="h-100 w-100 d-flex">
        <Card className="mx-auto my-auto">
          <Card.Body>
            <Card.Title>Register</Card.Title>
            {successful
              ? <Card.Text>
                Your account has been created, <a href={props.branding.dashboardUrl}>click here to log in</a>.
              </Card.Text>
              : <RegisterForm onSuccess={() => setSuccess(true)} tosUrl={props.branding.tosUrl} />
            }
          </Card.Body>
        </Card>
      </div>
    </SimpleLayout>
  )
}

export default Register;
