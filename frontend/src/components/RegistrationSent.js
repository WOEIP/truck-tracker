import React, {Component} from 'react';

import Menu from './../components/Menu.js';

import '../styles/registration-page.scss';

// TODO make a message component
class RegistrationSent extends Component {
  constructor() {
    super();
    };

  render() {
    return (
      <article id="registration-sent">
        <Menu current="login"/>
        <h1>Almost done!</h1>
        <p>
        Check your email to confirm your account and start recording truck activity. Thank you for helping us improve West Oakland's air quality.
        </p>

       </article>
    );
  }
}

export default RegistrationSent;
