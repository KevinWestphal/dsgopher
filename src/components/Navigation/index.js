import React from 'react';
import { Link } from 'react-router-dom';
import styled from'styled-components';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';

const Sidebar = styled.div` 
  margin: 0;
  padding: 0;
  background-color: #000000;
  position: relative;
  width: 100%;
  overflow: auto;
  justify-content: space-between;
`;

const NavLink = styled.li`
  padding: 1rem;
  text-decoration: none;
  text-align: center;
  float: left;
`;

const Navigation = () => (
  <Sidebar>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  </Sidebar>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <NavLink>
      <Link to={ROUTES.HOME}>Home</Link>
    </NavLink>
    <NavLink>
      <Link to={ROUTES.START_REQUEST}>New Request</Link>
    </NavLink>
    <NavLink>
      <Link to={ROUTES.HISTORY}>Request History</Link>
    </NavLink>
    <NavLink>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </NavLink>
    {!!authUser.roles[ROLES.ADMIN] && (
      <NavLink>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </NavLink>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <div />
);

export default Navigation;