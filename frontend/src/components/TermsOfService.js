import React, { Component } from 'react';
import Menu from './../components/Menu.js';
import '../styles/common.scss';

class TermsOfService extends Component {
  render() {
    return (
      <article id="mission-text">
        <Menu current="login"/>

        <h1>Terms of Service</h1>

        <p>This Terms of Service outlines the agreement between visitors to trucktracker.net and the <a className="textlink" href="https://woeip.org">West Oakland Environmental Indicators Project</a>.
        </p>
        <p>
        By visiting trucktracker.net, you agree to the terms outlined here. These terms might be updated in the future. These terms will remain valid if they’re updated. They also cover any future changes or additions to the service.
        </p>

        <h2>Definitions</h2>
        <p>
        <ul>
        <li className="tos">When we use the terms “us,” “we,” “ours,” and similar language, we’re referring to the West Oakland Environmental Indicators Project, an environmental justice nonprofit organization based in West Oakland, CA.</li>
        <li className="tos">When we use the terms “you,” “yours,” “user,” “visitor,” and similar language, we’re referring to anyone who accesses this website or its services, on any device.</li>
        <li className="tos">When we use the term “website,” “service,” “product,” “Truck Tracker,” or similar language, we’re referring to the services and information provided at trucktracker.net.</li>
        </ul>
        </p>

        <h2>Who owns what</h2>
        <p>
        As a visitor, you agree to submit only information you have the legal right to submit.
        </p>
        <p>
        By submitting information via the site, you are granting us unrestricted rights to use, modify, and publish any information you submit to us.
        </p>
        <p>
        The code for these services is the copyright of the West Oakland Environmental Indicators Project, except where components may be subject to third-party licensing restrictions.
        </p>
        <p>
        You may not copy, scrape, or otherwise collect data stored on the site or use, reproduce, modify, or distribute any element of the site, in part or in whole,    whether code, designs, content, data, or otherwise, without express written permission from the West Oakland Environmental Indicators Project.
        </p>

        <h2>What information we collect and what happens to it</h2>
        <p>
        We collect the following kinds of information:
        </p>

        <h3>Information about your visit</h3>

        <p>
        This website uses cookies, which is a weird name for text files that store small pieces of information. Your device holds onto “persistent” cookies until you delete them, so we can recognize you when you visit and do things like welcome you back, or sign you in automatically. You can <a className="textlink" href="https://www.privacypolicies.com/blog/how-to-delete-cookies/">delete persistent cookies</a> any time. We also use “session” cookies, which are deleted automatically when you close your web browser. We use these cookies to track which pages you view on the site, which helps us improve the experience overall and provide more customized experiences for you specifically.
        </p>
        <p>
        We also use Google Analytics to understand things like which websites send us traffic and what content people view on the site. This helps us understand where the site might be working or not working well.
        </p>

        <h3>Personal information you share with us</h3>

        <p>
        The personal information you share with us to create your account is used specially to create and manage your account. This information is covered by our privacy policy and will not be shared with third parties. We will also use this information to send you emails about Truck Tracker.
        </p>

        <h3>Other information you share with us</h3>

        <p>
        Truck data, photos, and any other information that you share when recording truck activity may be published and shared with third parties. If it is shared, it will not be tied to your personal identity.
        </p>

        <h2>Accuracy of data</h2>

        <p>
        You agree to only submit information that is accurate to the best of your knowledge.
        </p>
        <p>
        We make no guarantees about the accuracy of information published on the site.
        </p>

        <h2>Use of the site</h2>

        <p>
        You may not use the site or information contained within for illegal purposes.
        </p>
        <p>
        You may not copy, scrape, or otherwise collect data stored on the site or use, reproduce, modify, or distribute any element of the site, in part or in whole, whether code, designs, content, data, or otherwise, without express written permission from the West Oakland Environmental Indicators Project.
        </p>

        <h2>Limitation of our liability</h2>

        <p>
        We make no guarantees that the site will always work or be available.
        </p>
        <p>
        Under no circumstances will we be liable for anything that happens as a result of you accessing or using the site.
        </p>

        <h2>Questions, concerns, or opting out of tracking and data collection.</h2>

        <p>
        You may request to have any of the data you submit deleted from our records, in which case your account will be closed and you’ll no longer be able to submit truck activity reports. Email requests to trucktracker@woeip.org.
        </p>
        <p>
        Contact trucktracker@woeip.org with any questions, concerns, or requests to opt out of tracking and data collection.
        </p>

        <p>
        <b>Thanks for taking the time to understand your rights and ours. Keep on truckin’...</b>
        </p>


      </article>
    );
  }
}

export default TermsOfService;
