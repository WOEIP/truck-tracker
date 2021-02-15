import React, { Component } from 'react';

class ThankYouPage extends Component {

  //TODO check if this optimization actually works (named callback)
  selectTruck(truck){
    return this.props.selectTruck(truck);
  }

  render() {
    return (
      <div>
        <h2>Your report has been submitted</h2>
        <p>
          Thank you for reporting neighborhood truck activity. You can view your report on the <a className="textlink" href="#view-data">truck activity map</a>. Please note that until a member of our team verifies your report, you'll only be able to see it when you're signed into Truck Tracker.
        </p>
      </div>
    );
  }
}

export default ThankYouPage
