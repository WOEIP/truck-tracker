import React, { Component } from 'react';
import '../styles/menu.scss';
import '../styles/pure-release-1.0.0/menus.css';
import '../styles/pure-release-1.0.0/pure-min.css';
import '../styles/pure-release-1.0.0/grids-responsive.css';

import {SessionContext} from './../utils/Session.js';

class Menu extends Component {
  getMenuItems () {
    let session = this.context;
    // TODO these could be components
     let menuItems = [];

    if (session.data.loggedInUser) {
      menuItems = [
        {id: "report", text: "Report"},
        {id: "view-data", text: "View data"},
        {id: "mission", text: "Mission"},
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
        {id: "mission", text: "Mission"},
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

  // This is a hack solving the problem that the hover effect is not
  // working on an iPhone. Might be removed later.
  emptyString () {
      return "";
  }

  render() {
    return (
      <div id="top-menu-container">
         <nav onClick={this.emptyString} id="top-menu">
           <div id="top-menu-icon"></div>
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
