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
        <p>
            We have sent you an email with an account confirmation. Please use the link in there to log in the first time.
        </p>
        <p>
            Thank you for taking the time to make Oakland air quality better!
        </p>
       </article>
    );
  }
}

export default RegistrationSent;
