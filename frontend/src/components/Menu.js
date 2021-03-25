import React, { Component } from 'react';
import '../styles/menu.scss';
import '../styles/pure-release-1.0.0/menus.css';
import '../styles/pure-release-1.0.0/pure-min.css';
import '../styles/pure-release-1.0.0/grids-responsive.css';

import {SessionContext} from './../utils/Session.js';

class Menu extends Component {
    constructor (props) {
        super(props);

        this.state = {
            opened: false
        };
    }


    getMenuItems () {
        let session = this.context;
        // TODO these could be components
        let menuItems = [];

        if (session.data.loggedInUser) {
            menuItems = [
                {id: "report", text: "Report"},
                {id: "view-data", text: "View data"},
                {id: "about", text: "About"},
                {id: "contact", text: "Contact"},
                {id: "logout", text: "Sign out"}
            ];

            if (session.data.loggedInUser.isAdmin) {
                menuItems.push (
                    {id: "admin", text: "Admin"}
                )
            }
        } else {
            menuItems = [
                {id: "view-data", text: "View data"},
                {id: "about", text: "About"},
                {id: "contact", text: "Contact"},
                {id: "login", text: "Sign in"}
            ];
        }

        let itemsToRender = [];
        let classToAdd="";

        for (let i = 0; i < menuItems.length; i++) {
            if (this.props.current === menuItems[i]["id"]){
                classToAdd = "current ";
            } else {
                classToAdd = "";
            }

            itemsToRender.push(
                <li key={menuItems[i]["id"]}>
                  <a href={"#" + menuItems[i]["id"]}
                     className={classToAdd + "top-menu-item"}>
                    {menuItems[i]["text"]}
                  </a>
                </li>
            );
        }

        return itemsToRender;
    }

    toggleOpenStatus () {
        let currentOpenStatus = this.state.opened;
        this.setState({opened: !currentOpenStatus});
    }

    menuClass () {
        return this.state.opened ? 'opened' : '';
    }

    render() {
        let session = this.context;

        return (
            <div id="top-menu-container">
              <span id="team-name">
                  Team: {session.data.activeTeam ? session.data.activeTeam.teamName : ''}
              </span>
              <nav id="top-menu" className={this.menuClass()}>
                <div onClick={this.toggleOpenStatus.bind(this)} id="top-menu-icon"></div>
                <ul>
                  {this.getMenuItems()}
                </ul>
              </nav>
            </div>
        );
    }
}

Menu.contextType = SessionContext;

export default Menu;
