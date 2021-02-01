import Api from './../utils/Api.js';
import React from 'react';
import merge from 'lodash/merge'

const DEFAULT_SESSION_DATA =  {
    loggedInUser: null
};

export const SessionContext = React.createContext(DEFAULT_SESSION_DATA);

export default class SessionProvider extends React.Component {
  constructor(props) {
    super(props);
    let sessionData = JSON.parse(localStorage.getItem( 'sessionData'));
    this.state = {
      data:  sessionData || DEFAULT_SESSION_DATA,
      update: this.updateSession.bind(this) // we need this bind, right...?
    }
  }

  componentDidMount() {
    Api.get('auth').then(response => {
      this.updateSession(response.data);
    });
  }

  updateSession (updaterObject) { // TODO add callback here
    let newSession = merge(this.state, {data: updaterObject});
    localStorage.setItem( 'sessionData', JSON.stringify(newSession.data));
    this.setState(newSession);
  };

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    );
  }
}
