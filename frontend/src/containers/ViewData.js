import React, { Component } from 'react';
import Menu from './../components/Menu.js';

import '../styles/common.scss';
import '../styles/view-data.scss';

import HeatMap from './../components/HeatMap';
import HeatMapSettings from './../components/HeatMapSettings';

import { truckTypes } from '../components/TruckSelection';

class Data extends Component {
  constructor(props) {
    super(props);

    this.updateTruck = this.updateTruck.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.dataFilter = this.dataFilter.bind(this);

    var truckTypesToShow = truckTypes.map (truck => {
      return truck.key;
    });

    this.state = {
      truckTypesToShow: truckTypesToShow,
      timeFrom: 0,
      timeTo: 1
    };
  }

  updateTruck (truckKey, shouldWeShow) {
    var newTruckTypesToShow = this.state.truckTypesToShow;
      console.log(shouldWeShow);
    if (shouldWeShow) {
      newTruckTypesToShow = newTruckTypesToShow.concat([truckKey]);
    } else {
      newTruckTypesToShow = newTruckTypesToShow.filter(key => {
        return key !== truckKey;
      });
    }

    console.log(newTruckTypesToShow);
    this.setState({truckTypesToShow: newTruckTypesToShow});
  }

  updateTime () {
    console.log('time update');
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
          <HeatMap dataFilter={this.dataFilter}></HeatMap>
        </div>
        <div id="heatmap-settings">
          <HeatMapSettings updateTruck={this.updateTruck}
                           updateTime={this.updateTime}>
          </HeatMapSettings>
        </div>
      </article>
    );
  }
}

export default Data;
