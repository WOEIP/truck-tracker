import React, { Component } from 'react';
import Menu from './../components/Menu.js';
import '../styles/common.scss';
import '../styles/mission.scss';

// TODO if this stays, make it a generic component
class Contributing extends Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <article id="mission-text">
        <Menu current="mission"/>
        <h1 className="title">Help us creating a tool for empowerment!</h1>
        <p> Collecting and visalizing data is an efficient method to influence
            policymakers who can make decisions to create a better living
            environment. By managing truck data we hope to give underrepresented
            commmunities a voice and make it possible to stand up for themselves.
            For more details on this, check out our <a className="textlink"
            href="#mission">mission description.</a>
        </p>
        <p> Because we receive no funding for this project, we rely heavily on
            volunteer work. Right now we're looking for a person who can help
            us to further develop this web app, adding functionality and do
            maintenance. The project is at a stage where we will coordinate with
            other NGOs in Oakland and give the app to people, so this is a great
            time to join, to have some fun while gathering experience and making
            an impact.
        </p>
        <p> The ideal candidate has some programming experience and is eager to
            learn. Because this is an underpaid commitment, you'll have great
            freedom in choosing what to do. There is plenty of smaller and bigger
            tasks from creating frontend design with SCSS, do application logic
            using React, tweaking the backend architecture (koa.js), fiddle with
            the DB layer (knex.js) or do infrastructure config (nginx, node). If
            you search the web for these keywords you'll find that our technology
            stack is constituted by industry standard stuff which will mean a
            good reference and great real world experience in the web field. We will make our
            best effort to provide you guidance and mentoring so you don't feel
            lost while having a healthy amount of responsibility.
        </p>
        <p>
           If you've read this far, thanks! Please consider helping us out with
           your valuable time and spread the word about this. Do check out the code at
           <a className="textlink" href="https://github.com/WOEIP/truck-tracker/"> our repo </a>
           (if you know a bit of Javascript you'll see that we try to do the right
            things but that we had limited effort available to build this prototype,
            that's where you come in ;) )
        </p>
        <p>
           With inquiries be in touch via motching at gmail dot com.
        </p>
        <p>
            Thank you!
        </p>
      </article>
    );
  }
}

export default Contributing;
