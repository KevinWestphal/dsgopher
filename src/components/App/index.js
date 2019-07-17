import React from 'react';
import { BrowserRouter as Router , Route } from 'react-router-dom';
import styled from 'styled-components';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import StartRequestPage from '../StartRequest';
import HistoryPage from '../History';

import * as ROUTES from '../../constants/routes';
import { withAuthentication, AuthUserContext } from '../Session';

import GlobalStyle from '../../styles/globalStyle';

const App = () => (
  <div>
    <GlobalStyle />
    <Router>
      <div>
        <AuthUserContext.Consumer>
          {authUser => authUser &&
            <Navigation />
          }
        </AuthUserContext.Consumer>
    
        <hr />

        <Route exact path={ROUTES.LANDING} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.START_REQUEST} component={StartRequestPage} />
        <Route path={ROUTES.HISTORY} component={HistoryPage} />
      </div>
    </Router>
  </div>
);
  

export default withAuthentication(App);
