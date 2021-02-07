import React, {Component} from 'react';

import Api from './../utils/Api.js';
import Menu from './../components/Menu.js';

import '../styles/password-reset.scss';

class PasswordReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  resetPassword (e) {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const confirmationToken = urlParams.get('token');
    let postData = {
        email: this.state.email,
    }

    let resetUrl = 'passwordreset/' + confirmationToken;
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
      <article id="password-reset">
        <Menu current="login"/>
        <p>
          Please give your email address and we'll send you a reset link!
        </p>
        <form>
          <label>Email</label>
          <input type="text"
                 value={this.state.email}
                 onChange={this.handleInputChange.bind(this, 'email')} />
          <div className="actions">
            <button onClick={this.resetPassword}>
              Send
            </button>
          </div>
        </form>
      </article>
    );
  }
}

export default PasswordReset;
