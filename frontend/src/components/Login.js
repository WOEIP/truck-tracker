import React, { Component } from "react";

import "../styles/login-page.scss";

import Api from "./../utils/Api.js";
import Auth from "./../utils/Auth.js";
import Menu from "./../components/Menu.js";

import MessagingDisplay from "./MessagingDisplay";
import { SessionContext } from "./../utils/Session.js";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            error: "",
        };

        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.goToRegistration = this.goToRegistration.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        let urlParams = new URLSearchParams(window.location.search);
        let username = urlParams.get('username');

        if (username) {
            this.setState({
                username: username
            });
        }
    }

    login(event) {
        // TODO instead of preventDefault, we could maybe track down what catches the event?
        event.preventDefault();

        let session = this.context;

        let postData = {
            username: this.state.username,
            password: this.state.password,
        };

        let urlParams = new URLSearchParams(window.location.search);
        let confirmationToken = urlParams.get('token');

        if (confirmationToken) {
            postData.confirmationToken = confirmationToken;
        }

        Api.post("auth/login", postData)
            .then((response) => {
                if (response.status === 200) {
                    let user = response.data.data;
                    session.update({ loggedInUser: user });
                    window.location.hash = "#report";
                }
            })
            .catch((errorData) => {
                let errorText = "";
                switch (errorData.errorCode) {
                    case "err_user_not_found":
                        errorText = "Username or password are incorrect.";
                        break;
                    case "err_email_not_verified":
                        errorText = "Your account hasn't been verified yet. Please check your email."; // TODO resend link
                        break;
                    default:
                        errorText = "Error at login";
                        break;
                }
                this.setState({
                    error: errorText
                });
            });
    }

    goToRegistration() {
        window.location.hash = "#register";
    }

    handleUserChange(evt) {
        this.setState({
            username: evt.target.value,
        });
    }

    handlePassChange(evt) {
        this.setState({
            password: evt.target.value,
        });
    }

    render() {
        let errors = this.state.error ? (
            <MessagingDisplay message={this.state.error} />
        ) : null;

        return (
            <article id="login-page">
                <Menu current="login" />
                {errors}
                <h1>Sign in to record trucks</h1>
                <p>Sign in to your account to record truck activity or <a className="textLink" href="#register">create a new account</a> to get started.</p>
                <form>
                    <p>
                    <label>Username</label>
                    <input
                        type="text"
                        data-test="username"
                        value={this.state.username}
                        onChange={this.handleUserChange}
                    />
                    </p>
                    <p><label>Password</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePassChange}
                    /><br/>
                    <a className="textlink password-reset help" href="#passwordreset">Forgot your password?</a>
                    </p>
                    <div className="actions">
                        <button onClick={this.login}>Sign in</button>
                    </div>

                </form>
            </article>
        );
    }
}

Login.contextType = SessionContext;

export default Login;
