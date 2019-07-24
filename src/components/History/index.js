import React, { Component } from 'react';
import { compose } from 'recompose';
import styled from 'styled-components';

import { withFirebase } from '../Firebase';
import { withAuthentication, withAuthorization } from '../Session';

import Container from '../../styles/container';

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

  convertTime(timestamp){
    var a = new Date(timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
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
        <Container>
          {!loading && !noRequests &&
            <table>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
                <th>Timestamp</th>
              </tr>
              {requests.map(request => (
                <tr key={request.id}>
                  <td>{request.rcpt_name}</td>
                  <td>{request.rcpt_address_1}<br/>{request.rcpt_address_2}</td>
                  <td>{request.rcpt_city}</td>
                  <td>{request.rcpt_country}</td>
                  <td>{this.convertTime(request.timestamp)}</td>
                </tr>
              ))}
            </table>
          }
          {loading &&
            <h1>Loading...</h1>  
          }
          {!loading && noRequests &&
            <p>You haven't made any requests, yet.</p>
          }
        </Container>
    );

    return (
      <RequestList requests={requests}/>   
    );
  }
}

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withAuthentication,
  withFirebase,
)(History);