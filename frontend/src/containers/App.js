import React, { Component } from 'react';
import RegistrationPage from './../components/RegistrationPage.js';
import RegistrationSent from './../components/RegistrationSent.js';
import Login from './../components/Login';
import Logout from './../components/Logout';
import MainPage from './../components/MainPage';
import Report from './../containers/Report';
import ViewData from './../containers/ViewData';
import Mission from './../components/Mission';
import TermsOfService from './../components/TermsOfService.js';
import Contact from './../components/Contact';
import MessageSent from './../components/MessageSent.js';
import Admin from './../containers/Admin';
import Contributing from './../components/Contributing';

import SessionProvider from './../utils/Session.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {
        loggedIn: false
      }
    };
  }

  componentDidMount() {
    let self = this;
    window.addEventListener('hashchange', () => {self.forceUpdate();});
  }

  componentWillUnmount(){
    window.removeEventListener('hashchange', () => {self.forceUpdate();});
  }

  getActiveContent(){
    switch(window.location.hash) {
    case '#register':
      return RegistrationPage;
    case '#registerdone':
      return RegistrationSent;
    case '#login':
      return Login;
    case '#logout':
      return Logout;
    case '#report':
      return Report;
    case '#mission':
      return Mission;
    case '#tos':
      return TermsOfService;
    case '#contact':
      return Contact;
    case '#messagesent':
      return MessageSent;
    case '#view-data':
      return ViewData;
    case '#admin':
      return Admin;
    case '#contributing':
      return Contributing;
    default:
      return MainPage;
    }
  };

  render() {
    const ActiveContent = this.getActiveContent();
    return (
      <SessionProvider>
          <ActiveContent/>
     </SessionProvider>
    );
  }
}

export default App;
