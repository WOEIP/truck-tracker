import React, { Component } from 'react';
import '../styles/main-page.scss';
import '../styles/pure-release-1.0.0/pure-min.css';
import '../styles/pure-release-1.0.0/grids-responsive.css';
import logo from '../img/logo-200p.png';

class MainPage extends Component {
  render() {
    return (
      <div id="app-container">
        <div id="logo-container">
          <img className="logo-home" src={logo-200p} alt="WOEIP logo"/>
        </div>

        <div className="vert-space short"></div>
        <nav className="pure-g main-menu">
          <a className="pure-u-1 pure-u-sm-1-4" href="#report">Report</a>
          <a className="pure-u-1 pure-u-sm-1-4" href="#view-data">View data</a>
          <a className="pure-u-1 pure-u-sm-1-4" href="#about">About</a>
          <a className="pure-u-1 pure-u-sm-1-4" href="#contact">Contact</a>
        </nav>
        <div className="vert-space short"></div>

        <div id="inner-title">
          <h1>Truck Tracker</h1>
          <h2 className="title">A WOEIP project</h2>
        </div>
        <div className="vert-space short"></div>
        <div id="beta-testing-message-container">
          <p>Truck Tracker is currently in early release and you may encounter issues. Please <a className="textlink" href="#contact">let us know</a> if you have trouble using the site or have feedback to help us improve.
          </p>
        </div>


      </div>
    );
  }
}

export default MainPage;
