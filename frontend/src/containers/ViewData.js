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
      timeFrom: 0,
      timeTo: 1
    };
  }

  componentDidMount () {
    this.fetchData();
  }

  filterData (truckTypesToShow, timeFrom, timeTo) {
    return this.state.originalData.filter(elem => {
      return truckTypesToShow.includes(elem.truckType);
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
      this.state.timeFrom,
      this.state.timeTo);

    this.setState({
      data: newData,
      truckTypesToShow: newTruckTypesToShow
    });
  }

  updateTime (fromOrTo, time) {
    console.log(fromOrTo);
    console.log(time);
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
          <HeatMap data = {this.state.data}></HeatMap>
        </div>
        <div id="heatmap-settings">
          <HeatMapSettings updateTruck = {this.updateTruck}
                           updateTime = {this.updateTime}>
          </HeatMapSettings>
        </div>
      </article>
    );
  }
}

export default Data;
