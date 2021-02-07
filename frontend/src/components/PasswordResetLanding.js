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

    setPassword (event) {
        // TODO disable send button when there is no password
        // TODO instead of preventDefault, we could maybe track down what catches the event?
        event.preventDefault()

       const urlParams = new URLSearchParams(window.location.search);
       const confirmationToken = urlParams.get('token');

        let postData = {
            password: this.state.password,
            resetToken: confirmationToken
        };

        Api.post('passwordreset/execute', postData).then(response => {
            if (response.status === 200) {
                //TODO message
                window.location.hash = "#login";
                console.log(response);
            }
        }).catch((error) => {
            // TODO
            console.log(error);
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
