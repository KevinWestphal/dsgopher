import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthentication, withAuthorization } from '../Session';


const INITIAL_STATE = {
  loading: true,      
  requests: [],
  noRequests: true,
  authUser: {},
};

class History extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.listener = this.props.firebase.onAuthUserListener(
      authUser => {
        this.setState({ authUser });
        this.fetchRequests();
      },
      () => {
        this.setState({ authUser: null });
      },
    );
  }

  fetchRequests() {
    const { authUser } = this.state;

    this.props.firebase
    	.user(authUser.uid)
    	.child('requests')
    	.once('value', snapshot => {
  		  const requestsObject = snapshot.val();

        if(requestsObject != null) {
      		const requestsList = Object.keys(requestsObject).map(key => ({
        	...requestsObject[key],
        	uid: key,
          }));

          this.setState({
            requests: requestsList, 
            noRequests: false,         
          });
        }

        this.setState({
          loading: false,
        });
    });
  }

  render() {
    const { requests, loading, noRequests, authUser } = this.state;

    console.log(authUser);

    const RequestList = ({ requests }) => (
        <div>
          {!loading && !noRequests &&
            <ul>
              {requests.map(request => (
                <li key={request.id}>
                  <span>
                    <strong>Name:</strong> {request.rcpt_name} 
                    <br/>
                  </span>
                  <span>
                    <strong>Address: </strong> {request.rcpt_address_1}, {request.rcpt_address_2}
                    <br/>
                  </span>
                  <span>
                    <strong>City:</strong> {request.rcpt_city} 
                    <br/>
                  </span>
                  <span>
                    <strong>Country:</strong> {request.rcpt_country} 
                    <br/>
                  </span>
                  <span>
                    <strong>Sent:</strong> {request.timestamp} 
                  </span>
                </li>
              ))}
            </ul>
          }
          {loading &&
            <h1>Loading...</h1>  
          }
          {!loading && noRequests &&
            <p>You haven't made any requests, yet.</p>
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