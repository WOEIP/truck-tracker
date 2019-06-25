import React, {Component} from 'react';

import Menu from './../components/Menu.js';

import '../styles/registration-page.scss';

// TODO make a message component.
// TODO have some rate limit for this form.
class MessageSent extends Component {
  constructor() {
    super();
    };

  render() {
    return (
      <article id="registration-sent">
        <Menu current="login"/>
        <p>
          Thank you for taking the time to send us a message! We will be in touch with you shortly. In the meantime please feel free to look at the <a className="textlink" href="#view-data">data we already have!</a>
        </p>
       </article>
    );
  }
}

export default MessageSent;
