import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import Container from '../../styles/container';
import SpacedP from '../../styles/spacedParagraph';

const SignInContainer = styled.div`
  display: grid;
`;

const Item1 = styled.div`
  grid-column: 1 / span 3;
  grid-row: 1;
`;

const Item2 = styled.button`
  grid-column: 4;
  grid-row: 1 / span 2;
`;

const SignInPage = () => (  
  <Container>
      <p><b>
        DSGopher allows consumers to easily submit GDPR 
        Data Subject Access Requests to companies and 
        authorities.
      </b></p> 
      <SpacedP>
        DSGopher does not use any data for advertising 
        purposes and offers all of its services for free.
      </SpacedP> 
      <SignInForm />
      <SignUpLink />
  </Container>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <SignInContainer>
        <Item1>
          <p>
            Do you already have an account?
          </p>
        </Item1>
        <form onSubmit={this.onSubmit}>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="EMAIL ADDRESS"
          />
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="PASSWORD"
          />
          <Item2 disabled={isInvalid} type="submit">
            Sign In
          </Item2>         
          <PasswordForgetLink />

          {error && <p>{error.message}</p>}
        </form>
      </SignInContainer>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };