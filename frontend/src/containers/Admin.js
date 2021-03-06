import React, { Component } from 'react';
import Api from './../utils/Api.js';
import Menu from './../components/Menu.js';

import '../styles/admin.scss';
import { SessionContext } from './../utils/Session.js';

class Admin extends Component {
    constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.toggleUser = this.toggleUser.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }

  componentWillUpdate(){
    let session = this.context;
      if (!session.data.loggedInUser || session.data.loggedInUser.isAdmin !== true){
        window.location.hash = "#report"
      }
  }

  getUsers() {
    Api.get('users').then(response => {
      this.setState({users: response.data});
    });
  }

  toggleUser(toggledUser) {
    let session = this.context;

    if (session.data.loggedInUser.isAdmin === true){

      Api.patch(`users/${toggledUser.id}`,
        {
          isVerified: !toggledUser.isVerified
        }
      )

      let newUsers = this.state.users.map( user => {
        if (user.id === toggledUser.id) {
          user.isVerified = !user.isVerified;
        }
        return user;
      });

      this.setState({users: newUsers});
    }
  }

  userHtml() {
    let users = this.state.users;
    let itemsToRender = [];
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      let buttonText = user.isVerified ? "Unverify" : "Verify";
      let userNameToShow = (user.firstName || user.lastName)
          ? user.firstName + ' ' + user.lastName
          : user.username;
      let userActiveClass = user.isVerified ? ' verified' : ' unverified';
      itemsToRender.push(
        <p className='admin-row'
            key={user.id}>
          <span className={'user-name-in-overview' + userActiveClass}>{userNameToShow}</span>
          {/* <button className='admin-button delete-button' onClick={() => this.deleteUser(user)}>
            Dismiss
          </button> */}
          <button className='admin-button' onClick={() => this.toggleUser(user)}>
            {buttonText}
          </button>
        </p>
      );
    }
    return itemsToRender;
  }


  render() {
    return (
      <article id="mission-text">
        <Menu current="admin"/>
        <h1 className="title">User overview</h1>
        <div>{this.userHtml()}</div>
      </article>
    );
  }
}

Admin.contextType = SessionContext;

export default Admin;
