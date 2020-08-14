import React, { useState } from 'react';
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react';
import { LOGIN_USER } from './apollo/mutations/auth';
import { useMutation } from '@apollo/react-hooks';
import { useAuth } from './context/auth-context';

export default function Login() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [error, setErrors] = useState('');
  const [login, { loading }] = useMutation(LOGIN_USER);
  const { setCurrentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.persist();
    setErrors('');
    try {
      const {
        data: {
          login: { errors, token, user },
        },
      } = await login({
        variables: {
          ...formValues,
        },
      });
      if (errors) {
        setErrors(errors[0].message);
        return;
      }
      setCurrentUser({
        variables: {
          user,
          token,
        },
      });
    } catch (error) {
      setErrors(error.message);
    }
  };

  const handleChange = (e) => {
    e.persist();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size="large" onSubmit={handleSubmit} error={error.length > 0}>
          <Message error content={error} />
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              name="email"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={handleChange}
            />

            <Button type="submit" color="teal" fluid size="large">
              {loading ? 'Loading...' : 'Login'}
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
}
