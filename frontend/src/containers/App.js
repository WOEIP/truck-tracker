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
import PasswordReset from './../components/PasswordReset';
import PasswordResetLanding from './../components/PasswordResetLanding';

import SessionProvider from './../utils/Session.js';

class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    let self = this;
    window.addEventListener('hashchange', () => {self.forceUpdate();});
  }

  componentWillUnmount(){
    window.removeEventListener('hashchange', () => {self.forceUpdate();});
  }

  getActiveContent(){
    // We don't care about URL params
    const route = window.location.hash.split('?')[0];

    switch(route) {
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
      case '#passwordreset':
        return PasswordReset;
      case '#passwordresetlanding':
        return PasswordResetLanding;
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
