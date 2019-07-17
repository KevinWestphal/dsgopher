import React from 'react';

import { withFirebase } from '../Firebase';
import styled from'styled-components';

const NoMarginButton = styled.button`
	margin: 0;
`;

const SignOutButton = ({ firebase }) => (
  <NoMarginButton type="button" onClick={firebase.doSignOut}>
    Sign Out
  </NoMarginButton>
);

export default withFirebase(SignOutButton);