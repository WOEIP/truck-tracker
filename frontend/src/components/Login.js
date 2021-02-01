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

    login(e) {
        e.preventDefault();

        let session = this.context;

        let postData = {
            username: this.state.username,
            password: this.state.password,
        };

        const urlParams = new URLSearchParams(window.location.search);
        const confirmationToken = urlParams.get('token');

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
                        errorText = "Username or Password are incorrect.";
                        break;
                    case "err_email_not_verified":
                        errorText = "This address hasn't been verified. Please check your email!"; // TODO resend link
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
        const errors = this.state.error ? (
            <MessagingDisplay message={this.state.error} />
        ) : null;

        return (
            <article id="login-page">
                <Menu current="login" />
                {errors}
                <p>Please log in to report an incident!</p>
                <form>
                    <label>Username</label>
                    <input
                        type="text"
                        data-test="username"
                        value={this.state.username}
                        onChange={this.handleUserChange}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.handlePassChange}
                    />
                    <div className="actions">
                        <button onClick={this.login}>Login</button>
                        <button onClick={this.goToRegistration}>Sign Up</button>
                    </div>
                </form>
            </article>
        );
    }
}

Login.contextType = SessionContext;

export default Login;
