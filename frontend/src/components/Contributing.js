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
            those who make the policies that impact the neighborhodds we live in. Truck Tracker gives underrepresented
            communities more than a seat at the table; it gives us a voice.
        </p>
        <p align="center"><a className="button" href="#contact">Volunteer</a></p>

        <p> Rooted in our principles of <a className="textlink" href="https://woeip.org/our-approach/">collaborative problem-solving</a>, our team relies heavily on
            the contributions of those care most about these issues. Right now we're looking for someone with technical experience who can help
            us continue to improve Truck Tracker, adding functionality and doing
            maintenance. We're currently testing the app with local advocates in West Oakland and will then
            extend our reach to the general public. This is a great time to join!
        </p>
        <p> The ideal candidate has some programming experience and is eager to
            learn. Because this is an underpaid commitment, you'll have great
            freedom in choosing what to do. There are tasks of varying time commitment;
            creating frontend design with SCSS, doing application logic
            using React, tweaking the backend architecture (koa.js), fiddling with
            the DB layer (knex.js) or doing infrastructure config (nginx, node). If
            you search the web for these keywords, you'll find that our technology
            stack is consistent with industry standards. We will make our
            best effort to provide you guidance and mentoring so you don't feel
            lost while having a healthy amount of responsibility.
        </p>
        <p>
           If you've read this far, thanks! Please consider helping us out with
           your valuable time and spread the word about this volunteer opportunity. Do check out the code at
           <a className="textlink" href="https://github.com/WOEIP/truck-tracker/"> our repo </a>
           (if you know a bit of Javascript you'll see that we try to follow best practices
            but that we are working with limited worker hours available to build this prototype—that's where you come in ;) ).
        </p>
        <p>
           <a className="textlink" href="#contact">Let us know you're interested.</a>
        </p>
        <p>
            Thank you!
        </p>
      </article>
    );
  }
}

export default Contributing;
