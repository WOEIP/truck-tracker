import React, { Component } from 'react';
import Menu from './../components/Menu.js';

import '../styles/common.scss';
import '../styles/view-data.scss';

import Api from '../utils/Api.js';

import HeatMap from './../components/HeatMap';
import HeatMapSettings from './../components/HeatMapSettings';

import { truckTypes } from '../components/TruckSelection';

class Data extends Component {
  constructor(props) {
    super(props);

    this.updateTruck = this.updateTruck.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.filterData = this.filterData.bind(this);
    this.fetchData = this.fetchData.bind(this); // TODO a button for this

    var truckTypesToShow = truckTypes.map (truck => {
      return truck.key;
    });

    this.state = {
      originalData: [],
      data: [],
      truckTypesToShow: truckTypesToShow,
      fromTime: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // wows
      toTime: new Date()
    };
  }

  componentDidMount () {
    this.fetchData();
  }

  filterData (truckTypesToShow, fromTime, toTime) {
    return this.state.originalData.filter(elem => {
      return truckTypesToShow.includes(elem.truckType) &&
        elem.truckSeenAt > fromTime.getTime() / 1000 &&
        elem.truckSeenAt < toTime.getTime() / 1000;
    });
  }

  fetchData () {
    Api.get('reports').then(response => {
      this.setState({data: response.data,
                     originalData: response.data});
    });
  }

  updateTruck (truckKey, shouldWeShow) {
    var newTruckTypesToShow = this.state.truckTypesToShow;

    if (shouldWeShow) {
      newTruckTypesToShow = newTruckTypesToShow.concat([truckKey]);
    } else {
      newTruckTypesToShow = newTruckTypesToShow.filter(key => {
        return key !== truckKey;
      });
    }

    var newData = this.filterData(newTruckTypesToShow,
      this.state.fromTime,
      this.state.toTime);

    this.setState({
      data: newData,
      truckTypesToShow: newTruckTypesToShow
    });
  }

  updateTime (fromOrTo, time) {
    time = time[0] // Flatpickr...
    var newFromTime = (fromOrTo === 'from') ? time : this.state.fromTime;
    var newToTime = (fromOrTo === 'to') ? time : this.state.toTime;

    var newData = this.filterData(this.state.truckTypesToShow,
      newFromTime,
      newToTime);

    this.setState({
      data: newData,
      fromTime: newFromTime,
      toTime: newToTime
    });
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
          <HeatMap data = {this.state.data}></HeatMap>
        </div>
        <div id="heatmap-settings">
          <HeatMapSettings updateTruck = {this.updateTruck}
                           updateTime = {this.updateTime}
                           defaultFromTime = {this.state.fromTime}
                           defaultToTime = {this.state.toTime}>
          </HeatMapSettings>
        </div>
      </article>
    );
  }
}

export default Data;
