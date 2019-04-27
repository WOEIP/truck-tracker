import React, { Component } from 'react';

class ThankYouPage extends Component {

  //TODO check if this optimization actually works (named callback)
  selectTruck(truck){
    return this.props.selectTruck(truck);
  }

  render() {
    return (
      <div>
        <h2>Thank you for reporting!</h2>
        <p>
          Make sure to <a className="textlink" href="#view-data">check out</a> an aggregated display of all of our data!
        </p>
      </div>
    );
  }
}

export default ThankYouPage
