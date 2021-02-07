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
                    error = { body: "Username or Email already registered." };
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
        const errors = this.state.error ? (
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
							<label>Confirm Password</label>
							<input
								type="password"
								value={this.state.passwordConfirm}
								onChange={this.handleInputChange.bind(this, "passwordConfirm")}
							/>
							<label>Email (we won't give it to anyone)</label>
							<input
								type="text"
								value={this.state.email}
								onChange={this.handleInputChange.bind(this, "email")}
							/>
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
