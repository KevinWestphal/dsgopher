// BACKEND
import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

import Container from '../../styles/container';
import SpacedP from '../../styles/spacedParagraph';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,      
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
// BACKEND
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <Container>
        <h1>Admin</h1>
        <SpacedP>
          The Admin Page is accessible by every signed in admin user.
        </SpacedP>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </Container>
    );
  }
}

const UserList = ({ users }) => (
  <table>
    <tr>
      <th>ID</th>
      <th>E-Mail</th>
      <th>Username</th>
      <th>Real Name</th>
      <th>Address</th>
    </tr>
    {users.map(user => (
      <tr key={user.uid}>
        <td>{user.uid.substring(0,3)}[...]{user.uid.substring(25,28)}</td>
        <td>{user.email}</td>
        <td>{user.username}</td>
        <td>{user.realName}</td>
        <td>{user.address.split(",")[0]}<br/>{user.address.split(",")[1]}</td>
      </tr>
    ))}
  </table>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
