import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization, AuthUserContext } from '../Session';

/*const History = () => (
  <AuthUserContext.Consumer>
	{authUser => (
	  <div>
	    <h1>Request History</h1>
	  </div>
	)}
  </AuthUserContext.Consumer>
);*/

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,      
      requests: [],
      authUser: {},
    };
  }

  componentDidMount() {
	this.listener = this.props.firebase.onAuthUserListener(
      authUser => {
        this.setState({ authUser });
      },
      () => {
        this.setState({ authUser: null });
      },
    );

    this.setState({ loading: true });

    this.props.firebase
    	.user(this.state.authUser.uid)
    	.child('requests')
    	.on('value', snapshot => {
      		const requestsObject = snapshot.val();

      		const requestsList = Object.keys(requestsObject).map(key => ({
        	...requestsObject[key],
        	id: key,
      	}));

      this.setState({
        requests: requestsList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase
    	.user(this.state.authUser.uid)
    	.child('requests')
    	.off();
  }

  render() {
    const { requests, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <p>
          The Admin Page is accessible by every signed in admin user.
        </p>

        {loading && <div>Loading ...</div>}

        <RequestList requests={requests} />
      </div>
    );
  }
}

const RequestList = ({ requests }) => (
  <ul>
    {requests.map(request => (
      <li key={request.id}>
        <span>
          <strong>ID:</strong> {request.id}
        </span>
        <span>
          <strong>E-Mail:</strong> {request.rcpt_name}
        </span>
        <span>
          <strong>Username:</strong> {request.rcpt_name}
        </span>
        <span>
          <strong>Real Name:</strong> {request.rcpt_name}
        </span>
        <span>
          <strong>Address:</strong> {request.rcpt_name}
        </span>
      </li>
    ))}
  </ul>
);

//const condition = authUser => !!authUser;

//withAuthorization(condition)(History);
export default History;