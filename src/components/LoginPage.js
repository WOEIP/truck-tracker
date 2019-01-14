import React, {Component} from 'react';

import '../styles/login-page.scss';

import Api from './../utils/Api.js';
import Auth from './../utils/Auth.js';
import Menu from './../components/Menu.js';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.login = this.login.bind(this);
  }

  login() {
    console.log(this.state.password);
    console.log(Auth.createUUID(this.state.password));
    // let postData = {
    //   username: this.state.username,
    //   password: Auth.createUUID(this.state.password) //SHA-1
    // }


    Api.get('reports').then (function (res) {
        console.log(res);
    });

  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  render() {
    return (
      <article id="login-page">
        <Menu current="report"/>
        <p>
          Please log in to report an incident!
        </p>
        <form>
          <label>Username</label>
          <input type="text" data-test="username"
                 value={this.state.username}
                 onChange={this.handleUserChange} />
          <label>Password</label>
          <input type="password"
                 value={this.state.password}
                 onChange={this.handlePassChange} />
          <div className="actions">
            <button onClick={this.login}>
              Login
            </button>
            <button onClick={this.props.goBack}>
              Register
            </button>
          </div>
        </form>
      </article>
    );
  }
}

export default LoginPage;
