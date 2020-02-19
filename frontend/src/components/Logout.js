import React, {Component} from 'react';

import Api from './../utils/Api.js';
import MainPage from './../components/MainPage';

import {SessionContext} from './../utils/Session.js';

class Logout extends Component {
  constructor(props) {
    super(props);

    // TODO do we need these bindings?
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    let session = this.context;
    this.logout(session);
  }

  logout(session) {
    Api.post('auth/logout',{}).catch(() => {
        console.log('There was a backend error but we don\'t care!');
    }).then(() => {
      session.update({loggedInUser: null});
    });
  }

  render() {
    return <MainPage/>;
  }
}

Logout.contextType = SessionContext;

export default Logout;
