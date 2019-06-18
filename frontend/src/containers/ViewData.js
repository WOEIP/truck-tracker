import React, { Component } from 'react';
import Menu from './../components/Menu.js';

import '../styles/common.scss';
import '../styles/view-data.scss';

import HeatMap from './../components/HeatMap';
import HeatMapSettings from './../components/HeatMapSettings';

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      truckTypesToShow: [],
      timeFrom: 0,
      timeTo: 1
    };
  }

  updateMap (updateObject) {
    this.setState(updateObject);
  }

  render() {
    return (
      <article id="view-data-container">
        <Menu current="view-data"/>
        <p>
          Here you can see our aggregated data from the submissions West Oakland
          residents gave us.
        </p>
        <div id="heatmap">
          <HeatMap></HeatMap>
        </div>
        <div id="heatmap-settings">
          <HeatMapSettings updateMap={this.updateMap}></HeatMapSettings>
        </div>
      </article>
    );
  }
}

export default Data;
