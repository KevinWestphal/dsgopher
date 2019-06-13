import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthentication, withAuthorization } from '../Session';


const INITIAL_STATE = {
  loading: false,      
  requests: [],
  authUser: JSON.parse(localStorage.getItem('authUser')),
};

let noRequests = true;

class History extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.setState({ loading: true });

    const { authUser } = this.state;

    this.props.firebase
    	.user(authUser.uid)
    	.child('requests')
    	.on('value', snapshot => {
  		  const requestsObject = snapshot.val();

        //if(requestsObject != null) {
      		const requestsList = Object.keys(requestsObject).map(key => ({
        	...requestsObject[key],
        	uid: key,
          }));

          this.setState({
            requests: requestsList, 
            noRequests: false,         
          });
       // }

        this.setState({
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

    const RequestList = ({ requests }) => (
        <div>
          {loading == false &&
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
          }
          {loading &&
            <div>
              <h1>Loading...</h1>  
            </div>
          }
        </div>
    );

    return (
      <div>
        <RequestList requests={requests}/>   
      </div>
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withAuthentication,
  withFirebase,
)(History);