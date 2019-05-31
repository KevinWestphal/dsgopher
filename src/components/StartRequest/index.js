import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';

const StartRequest = () => (
  <AuthUserContext.Consumer>
  	{authUser => (
	  <div>
	    <h1>Start New Request</h1>
	    <NewReqForm />
	  </div>
	)}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

const INITIAL_STATE = {
  name: '',
  address_1: '',
  address_2: '',
  zip: '',
  city: '',
  country: '',
  authUser: {},
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
    const { name, address_1, address_2, zip, city, country } = this.state;

    const pushKey = this.props.firebase.user(this.state.authUser.uid).child('requests').push().key;

    this.props.firebase
      .user(this.state.authUser.uid)
      .child("requests")
      .child(pushKey)
      .set({
		rcpt_name: name,
		rcpt_address_1: address_1,
		rcpt_address_2: address_2,
		rcpt_zip: zip,
		rcpt_city: city,
		rcpt_country: country,
		timestamp: Date.now()
	  })
	  .catch(error => {
        this.setState({ error });
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
  withFirebase,
  withAuthorization(condition),
)(NewReqBase);

export default StartRequest;;