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
          Thank you for contacting us! We’ll be in touch as soon as possible. In the meantime, consider exploring the <a className="textlink" href="#view-data">truck activity map</a>.
        </p>
       </article>
    );
  }
}

export default MessageSent;
