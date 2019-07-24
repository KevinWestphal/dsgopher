import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import AddressChangeForm from '../AddressChange';
import { AuthUserContext, withAuthorization } from '../Session';

import Container from '../../styles/container';

const AccountPage = () => (
	<AuthUserContext.Consumer>
    	{authUser => (
		  <Container>
		    <h1>Account: {authUser.email}</h1>
		    <PasswordForgetForm />
		    <PasswordChangeForm />
		    <AddressChangeForm />
		  </Container>
		)}
  	</AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);