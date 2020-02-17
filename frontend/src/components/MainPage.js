import React, { Component } from 'react';
import '../styles/main-page.scss';
import '../styles/pure-release-1.0.0/pure-min.css';
import '../styles/pure-release-1.0.0/grids-responsive.css';
import logo from '../img/logo.png';

class MainPage extends Component {
  render() {
    return (
      <div id="app-container">
        <div id="logo-container">
          <img src={logo} alt="logo"/>
        </div>
        <div className="vert-space long line"></div>
        <div id="inner-title">
          <h1>WOEIP Truck Report System</h1>
        </div>
        <div className="vert-space short"></div>
        <div id="beta-testing-message-container">
          <p>This app is under beta testing, you may assume there will be glitches.
            Please report problems you find by sending an email to motching
            at gmail dot com. Thank you!
          </p>
        </div>
        <div className="vert-space short"></div>
        <nav className="pure-g main-menu">
          <a className="pure-u-1 pure-u-sm-1-4" href="#report">Report</a>
          <a className="pure-u-1 pure-u-sm-1-4" href="#view-data">View data</a>
          <a className="pure-u-1 pure-u-sm-1-4" href="#mission">Mission</a>
          <a className="pure-u-1 pure-u-sm-1-4" href="#contact">Contact</a>
        </nav>
      </div>
    );
  }
}

export default MainPage;
