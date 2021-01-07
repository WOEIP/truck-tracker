import React, {Component} from 'react';

import Api from './../utils/Api.js';
import Menu from './../components/Menu.js';

import '../styles/password-reset-landing.scss';

class PasswordResetLanding extends Component {
  constructor(props) {
    super(props);
    this.state = {
        password: '',
        passwordConfirm: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const resetToken = urlParams.get('token');
    console.log(resetToken);
  }

  setPassword () {
    let aDayFromNow = new Date();
    aDayFromNow.setDate(aDayFromNow.getDate() + 1);
    let postData = {
        requesterEmail: this.state.email,
        expirationTime: aDayFromNow.getTime() / 1000, // unix epoch
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000)
    }

    Api.post('passwordreset', postData).then(response => {
       if (response.status === 200) {
           // TODO handle it
           console.log(response);
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
      <article id="password-reset-landing">
        <Menu current="login"/>
        <form>
          <label>New password</label>
          <input type="password"
                 value={this.state.password}
                 onChange={this.handleInputChange.bind(this, 'password')} />
          <label>Confirm new password</label>
          <input type="password"
                 value={this.state.passwordConfirm}
                 onChange={this.handleInputChange.bind(this, 'passwordConfirm')} />
          <div className="actions">
            <button onClick={this.setPassword}>
              Send
            </button>
          </div>
        </form>
      </article>
    );
  }
}

export default PasswordResetLanding;
