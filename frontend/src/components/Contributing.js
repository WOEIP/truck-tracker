import React, { Component } from 'react';
import Menu from './../components/Menu.js';
import '../styles/common.scss';
import '../styles/about.scss';

// TODO if this stays, make it a generic component
class Contributing extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <article id="about-text">
        <Menu current="about"/>
        <h1 className="title">Help build tools for community resilience</h1>
        <p> Collecting and visualizing data is an important way to influence
            those who make the policies that impact the neighborhoods we live in. Truck Tracker gives underrepresented
            communities more than a seat at the table; it gives us a voice.
        </p>
        <p align="center"><a className="button" href="#contact">Volunteer</a></p>

        <p> Rooted in our principles of <a className="textlink" href="https://woeip.org/our-approach/">collaborative problem-solving</a>, our team relies heavily on
            the contributions of those care most about these issues. Right now we're looking for a volunteer with software development experience who can help
            us continue to improve Truck Tracker, adding functionality and doing
            maintenance. We're currently testing the app with local advocates in West Oakland and will eventually
            extend our reach to the general public. This is a great time to join!
        </p>
        <p> The ideal candidate has some programming experience and is eager to
            learn about using technology for community impact. Whether you're available for a few hours a month or a few hours a week, we'd love to have your help.
        </p>
          <p>
            Thank you!
        </p>
        <p align="center"><a className="button" href="#contact">Get in touch</a></p>

      </article>
    );
  }
}

export default Contributing;
