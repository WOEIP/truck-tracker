import React, { Component } from 'react';
import Menu from './../components/Menu.js';

import '../styles/common.scss';
import '../styles/view-data.scss';

import Api from '../utils/Api.js';

import HeatMap from './../components/HeatMap';
import HeatMapSettings from './../components/HeatMapSettings';
import MessagingDisplay from "../components/MessagingDisplay";

import { truckTypes } from '../components/TruckSelection';
import { SessionContext } from "../utils/Session.js";

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
      verifiedUsers: [],
      truckTypesToShow: truckTypesToShow,
      fromTime: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // wows
      toTime: new Date()
    };
  }

  componentDidMount () {
      this.fetchData();
      let session = this.context;

      if (session.data.newReport) {
          setTimeout(function () {
              session.update({ newReport: false });
          }, 10000);
      }
  }

  filterData (truckTypesToShow, fromTime, toTime) {
    return this.state.originalData.filter(elem => {
      return truckTypesToShow.includes(elem.truckType) &&
        elem.truckSeenAt > fromTime.getTime() / 1000 &&
        elem.truckSeenAt < toTime.getTime() / 1000;
    });
  }

  fetchData () {
    //Fetches verified user ids
    let validUsers;
    Api.get('verifiedusers').then(response => {
      validUsers = response.data.data.verifiedIds

      //Adds current user to reports we want to show
      let session = this.context;
      if (session.data.loggedInUser){
        validUsers[session.data.loggedInUser.id] = true
      }

      //Fetches reports
      let reportData;
      Api.get('reports').then(response => {
        reportData = response.data

        //Sets state data to filtered out reports
        this.setState({
          data: reportData.filter(report => validUsers[report.reporterId]),
          originalData: reportData.filter(report => validUsers[report.reporterId])
        })
      });
    })
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
    let newReportMessage = this.context.data.newReport ? (
        <MessagingDisplay
            message="Thank you for making a report. You should see your submitted data reflected on the map below."
            successDisplay="true"
        />
    ) : null;

    return (
      <article id="view-data-container">
        <Menu current="view-data"/>
        {newReportMessage}
        <h1 className="title">View truck activity data</h1>
        <p className="view-data-message">
        Move around the map to see truck activity reported by Oaklanders. Don't see your own reports? <a className="textlink" href="#login">Sign in</a>.
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

Data.contextType = SessionContext;

export default Data;
