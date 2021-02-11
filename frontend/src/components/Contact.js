import React, { Component } from 'react';
import Api from "./../utils/Api.js";
import Menu from './../components/Menu.js';
import '../styles/common.scss';
import '../styles/contact.scss';
import '../styles/pure-release-1.0.0/pure-min.css';
import '../styles/pure-release-1.0.0/grids-responsive.css';

class Contact extends Component {

    constructor(props){
        super(props);
        this.state = {name: "",
                      email: "",
                      message: "",
                      inquiryType: ""
                     };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }


    handleTextChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    sendMessage() {
        let postData = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message,
            inquiryType: this.state.inquiryType
        }
        Api.post("contact", postData).then(function() {
            // TODO this into a message, with link
            window.location.hash = "#messagesent";
        })
    }

    render() {

        return (
            <article id="contact-text">
              <Menu current="contact" />
              <h1 className="title">Contact</h1>
              <div className="address-box">
                <p className="address-bold">
                  West Oakland Environmental Indicators Project
                </p>
                <p className="smaller-text">
                  349 Mandela Parkway
                  <br />
                  Oakland, CA 94607
                  <br />
                  (510) 257-5460
                  <br />
                  info@woeip.org
                </p>
              </div>
              <form className="">
                <div className="form-element">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleTextChange}
                  />
                </div>
                <div className="form-element">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleTextChange}
                  />
                </div>
                <div className="form-element-inquiry-type">
                  <label htmlFor="type-of-inquiry">
                    What are you contacting us about?
                  </label>
                  <select name="inquiryType" className="contact-dropdown" onChange={this.handleTextChange}>
                    <option selected disabled>
                      Select
                    </option>
                    <option value="comment">
                      Comment or Question
                    </option>
                    <option value="site-feedback">
                      Site Feedback or Bug Report
                    </option>
                    <option value="press">
                      Press Inquiry
                    </option>
                  </select>
                </div>
                <div className="form-element">
                  <label htmlFor="message">Your message or question</label>
                  <p className="helptext">If you're submitting a bug report please include your device brand, model, and operating system
                    (e.g. "iPhone SE 10.14" or "Samsung Galaxy, Android 10"), and a detailed description of what you
                    were trying to do and what went wrong.
                  </p>
                  <textarea
                    rows="4"
                    type="text"
                    name="message"
                    value={this.state.message}
                    onChange={this.handleTextChange}
                  />
                </div>
                <button type="button" onClick={this.sendMessage}>
                  Send
                </button>
              </form>
            </article>
        );
    }
}

export default Contact;
