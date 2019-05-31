import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { FirebaseContext } from '../Firebase';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const StartRequest = () => (
  <div>
    <h1>Start New Request</h1>
    <NewReqForm />
  </div>
);

const INITIAL_STATE = {
  name: '',
  address_1: '',
  address_2: '',
  zip: '',
  city: '',
  country: '',
  authUser: {},
  requestNo: 10001,
  error: null,
};

class NewReqBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
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
  }

  onSubmit = event => {
    const { name, address_1, address_2, zip, city, country, authUser, requestNo } = this.state;

    this.props.firebase
      .user(this.state.authUser.uid)
      .child("requests")
      .child(requestNo)
      .set({
		rcpt_name: name,
		rcpt_address_1: address_1,
		rcpt_address_2: address_2,
		rcpt_zip: zip,
		rcpt_city: city,
		rcpt_country: country
	  });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
  	const {
      name,
      address_1,
      address_2,
      zip,
      city,
      country,
      error,
    } = this.state;
    
    const isInvalid =
   	  name === '' ||
      address_1 === '' ||
      zip === '' ||
      city === '' ||
      country === '';

    return (
      <form onSubmit={this.onSubmit}>
		<input
          name="name"
          value={name}
          onChange={this.onChange}
          type="text"
          placeholder="Recipient Name"
        />
        <input
          name="address_1"
          value={address_1}
          onChange={this.onChange}
          type="text"
          placeholder="Address Line 1"
        />
        <input
          name="address_2"
          value={address_2}
          onChange={this.onChange}
          type="text"
          placeholder="Address Line 2"
        />
        <input
          name="zip"
          value={zip}
          onChange={this.onChange}
          type="text"
          placeholder="ZIP Code"
        />
        <input
          name="city"
          value={city}
          onChange={this.onChange}
          type="text"
          placeholder="City"
        />
        <input
          name="country"
          value={country}
          onChange={this.onChange}
          type="text"
          placeholder="Country"
        />
        <button disabled={isInvalid} type="submit">Start Request</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const NewReqForm = compose(
  withRouter,
  withFirebase,
)(NewReqBase);

export default StartRequest;

export { NewReqForm };