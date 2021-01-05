import React, {Component} from 'react';

import Api from './../utils/Api.js';
import Auth from './../utils/Auth.js';
import Menu from './../components/Menu.js';
import MessagingDisplay from "./MessagingDisplay";

import '../styles/registration-page.scss';

import { SessionContext } from "./../utils/Session.js";

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
      error: '',
      address: '',
      zipCode:'',
      tosAccepted: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  registerUser () {
    let session = this.context;

    let postData = {
      username: this.state.username,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      address: this.state.address,
      zipcode: this.state.zipCode,
      localResidentP: this.state.isLocal,
      activeP: false,
      pwHash: Auth.hashPassword(this.state.password),
      adminP: false,
      dateRegistered: Math.floor(Date.now() / 1000),
      lastLogin: Math.floor(Date.now() / 1000),
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000)
    };

    if (
      postData.username === "" ||
      this.state.password === "" ||
      postData.email === ""
    ) {
      this.setState({
        error: "All fields must be complete to create an account"
      })
    } else {
      Api.post("users", postData)
        .then((response) => {
          if (response.status === 200) {
            Api.post("auth/login", {
              username: postData.username,
              password: postData.pwHash,
            })
              .then((logInResponse) => {
                if (logInResponse.status === 200) {
                  session.update({
                    loggedInUser: logInResponse.data,
                    newlyRegistered: true,
                  });
                  window.location.hash = "#report";
                }
              })
              .catch(() => {
                this.setState({
                  error: "Login Error",
                });
              });
          }
        })
        .catch((error) => {
          error = {body: "Email Already Exists"}

          this.setState({
            error: error.body,
          });
        });
    }
  }

  handleInputChange(inputField, evt) {
    let newState = this.state;
    newState[inputField] = evt.target.value;
    this.setState(newState);
  };

  render() {
    const errors =
      this.state.error !== '' ? (
        <MessagingDisplay message={this.state.error} />
      ) : null;

    return (
      <article id="registration-page">
        <Menu current="login" />
        {errors}
        <p>Please fill in your data and then send it for verification!</p>
        <form>
          <label>Username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange.bind(this, "username")}
          />
          <label>Password</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleInputChange.bind(this, "password")}
          />
          {/*<label>First name</label>
          <input type="text"
                 value={this.state.firstName}
                 onChange={this.handleInputChange.bind(this, 'firstName')} />
          <label>Last name</label>
          <input type="text"
                 value={this.state.lastName}
                 onChange={this.handleInputChange.bind(this, 'lastName')} />*/}
          <label>Email (we won't give it to anyone)</label>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleInputChange.bind(this, "email")}
          />
          {/*<label>Are you a West Oakland resident?</label>
          <input type="checkbox"
                 value={this.state.isLocal}
                 onChange={this.handleInputChange.bind(this, 'isLocal')} />
          <label>Address</label>
          <input type="text"
                 value={this.state.address}
                 onChange={this.handleInputChange.bind(this, 'address')} />
          <label>Zip Code</label>
          <input type="text"
                 value={this.state.zipCode}
                 onChange={this.handleInputChange.bind(this, 'zipCode')} />*/}
          <label htmlFor="tos-checkbox">
            <span>
              Accept our{" "}
              <a className="textLink" href="#tos">
                Terms of Service
              </a>
            </span>
            <input
              id="tos-checkbox"
              type="checkbox"
              value={this.state.tosAccepted}
              onChange={this.handleInputChange.bind(this, "tosAccepted")}
            />
          </label>
          <div className="actions">
            <button onClick={this.registerUser}>Sign Up</button>
          </div>
        </form>
      </article>
    );
  }
}
RegistrationPage.contextType = SessionContext;

export default RegistrationPage;
