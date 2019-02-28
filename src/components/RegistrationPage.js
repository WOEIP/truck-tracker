import React, {Component} from 'react';

import Api from './../utils/Api.js';
import Auth from './../utils/Auth.js';
import Menu from './../components/Menu.js';

import '../styles/registration-page.scss';

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      isLocal: true,
      email: '',
      address: '',
      city:'',
      zipCode:'',
      localResidentP: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser () {
    let postData = {
      username: this.state.userName,
      password: Auth.hashPassword(this.state.password),
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      zipCode: this.state.zipCode,
      localResidentP: this.state.localResidentP,
      active: false,
      isAdmin: false
    };

    Api.post('auth/register', postData).then(response => {
       if (response.status === 200) {
         window.location.hash = '#registerdone';
       }
    }).catch(() => {
        console.log('registration failed');
    });
  }

  handleInputChange(inputField, evt) {
    let newState = this.state;
    newState[inputField] = evt.target.value;
    this.setState(newState);
  };

  render() {
    return (
      <article id="registration-page">
        <Menu current="login"/>
        <p>
          Please fill in your data and then send it for verification!
        </p>
        <form>
          <label>Username</label>
          <input type="text"
                 value={this.state.username}
                 onChange={this.handleInputChange.bind(this, 'username')} />
          <label>Password</label>
          <input type="text"
                 value={this.state.password}
                 onChange={this.handleInputChange.bind(this, 'password')} />
          <label>First name</label>
          <input type="text"
                 value={this.state.firstName}
                 onChange={this.handleInputChange.bind(this, 'firstName')} />
          <label>Last name</label>
          <input type="text"
                 value={this.state.lastName}
                 onChange={this.handleInputChange.bind(this, 'lastName')} />
          <label>Email (we won't give it to anyone)</label>
          <input type="text"
                 value={this.state.firstName}
                 onChange={this.handleInputChange.bind(this, 'firstName')} />
          {/*<label>Are you a West Oakland resident?</label>
          <input type="checkbox"
                 value={this.state.isLocal}
                 onChange={this.handleInputChange.bind(this, 'isLocal')} />*/}
          <label>Address</label>
          <input type="text"
                 value={this.state.address}
                 onChange={this.handleInputChange.bind(this, 'address')} />
          <label>City</label>
          <input type="text"
                 value={this.state.city}
                 onChange={this.handleInputChange.bind(this, 'city')} />
          <label>Zip Code</label>
          <input type="text"
                 value={this.state.zipCode}
                 onChange={this.handleInputChange.bind(this, 'zipCode')} />
          <div className="actions">
            <button onClick={this.registerUser}>
              Send data
            </button>
          </div>
        </form>
      </article>
    );
  }
}

export default RegistrationPage;
