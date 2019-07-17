import React from 'react';

import { withAuthorization } from '../Session';
import Container from '../../styles/container';

const HomePage = () => (
  <Container>
    <h1>Home</h1>
    <p>The Home Page is accessible to logged-in users.</p>
  </Container>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);