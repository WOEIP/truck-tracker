import React, { Component } from "react";

import Api from "./../utils/Api.js";
import Menu from "./../components/Menu.js";
import MessagingDisplay from "./MessagingDisplay";

import "../styles/registration-page.scss";

import { SessionContext } from "./../utils/Session.js";

class RegistrationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            email: "",
            error: "",
            tosAccepted: false,
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    registerUser(e) {
        e.preventDefault();

        let session = this.context;

        let postData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

        if (!postData.username || !postData.password || !postData.email) {
            this.setState({
                error: "All fields must be complete to create an account.",
            });
        } else if (this.state.password !== this.state.passwordConfirm) {
            this.setState({
                error: "Passwords do not match. Please re-enter and try again.",
            });
        } else {
            Api.post("users", postData)
                .then((response) => {
                    window.location.hash = "#registerdone";
                })
                .catch((error) => {
                    error = { body: "Username or email already registered." };
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
    }

    render() {
        let errors = this.state.error ? (
            <MessagingDisplay message={this.state.error} />
        ) : null;

        return (
            <article id="registration-page">
                <Menu current="login" />
                {errors}
                <h1>Create a Truck Tracker account</h1>
                <p>
                Create a free account to record track activity in West Oakland.
                </p>
                <form>
                    <p>
                    <label>Create a username</label>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.handleInputChange.bind(this, "username")}
                    />
                    </p>
                    <p>
                    <label>Email</label>
                    <input
                        type="text"
                        value={this.state.email}
                        onChange={this.handleInputChange.bind(this, "email")}
                    />
                    </p>
                    <p>
                    <label>Choose a password</label><br/>
                    <span className="help">8+ characters; use a combination of numbers, letters and symbols.</span>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.handleInputChange.bind(this, "password")}
                    />
                    </p>
                    <p>
                    <label>Confirm password</label>
                    <input
                        type="password"
                        value={this.state.passwordConfirm}
                        onChange={this.handleInputChange.bind(
                            this,
                            "passwordConfirm"
                        )}
                    />
                    </p>
                    <div><label htmlFor="tos-checkbox">
                        <span class="help">
                            {" "} I agree to the <a className="textLink" href="#tos">Terms of Service</a>.
                        </span>
                        <input
                            id="tos-checkbox"
                            type="checkbox"
                            value={this.state.tosAccepted}
                            onChange={this.handleInputChange.bind(
                                this,
                                "tosAccepted"
                            )}
                        />
                    </label></div>
                    <div className="actions">
                        <button onClick={this.registerUser}>Create account</button>
                    </div>
                </form>
            </article>
        );
    }
}
RegistrationPage.contextType = SessionContext;

export default RegistrationPage;
