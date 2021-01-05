import React, { Component } from "react";
import Api from "./../utils/Api.js";
import Menu from "./../components/Menu.js";

import "../styles/common.scss";
import "../styles/report.scss";

import ThankYouPage from "../components/ThankYouPage";
import TruckSelection from "../components/TruckSelection";
import IdlingOrMoving from "../components/IdlingOrMoving";
import ErrorDisplay from "../components/ErrorDisplay";
import MapContainer from "./MapContainer";

import { SessionContext } from "../utils/Session.js";

class Report extends Component {
  constructor(props) {
    super(props);

    this.goToTruckSelection = this.goToTruckSelection.bind(this);
    this.goToMotionView = this.goToMotionView.bind(this);
    this.goToMapView = this.goToMapView.bind(this);
    this.sendData = this.sendData.bind(this);

    this.state = {
      currentView: "truckSelection",
      truckKey: null,
      truckWasMoving: false,
      engineWasRunning: false,
    };
  }

  shouldComponentUpdate() {
    let session = this.context;
    return session.data.loggedInUser;
  }

  componentWillMount() {
    let session = this.context;
    if (!session.data.loggedInUser) {
      window.location.hash = "#login";
    }
  }

  componentDidMount() {
    debugger
    let session = this.context;

    //if an account was newly registered, change the newlyRegistered flag to false
    //after 10 seconds, show the confirmation messaging until then
    if (session.data.newlyRegistered) {
      setTimeout(function () {
        session.update({ newlyRegistered: false });
      }, 10000);
    }
  }

  sendData(e, timeSeen, fromPos, toPos, engineWasRunningP, truckWasMovingP) {
    // TODO I don't like that we have to reference session like this.
    let session = this.context;

    // TODO lon or lng??
    let start = { lat: fromPos.lat, lon: fromPos.lng },
      end = { lat: toPos.lat, lon: toPos.lng };

    let postData = {
      truckType: this.state.truckKey,
      reporterId: session.data.loggedInUser.id,
      start: start,
      end: end,
      reportedAt: timeSeen.getTime() / 1000, // unix epoch
      truckSeenAt: timeSeen.getTime() / 1000, // unix epoch
      createdAt: timeSeen.getTime() / 1000, // unix epoch
      updatedAt: timeSeen.getTime() / 1000, // unix epoch
      engineWasRunningP: engineWasRunningP,
      truckWasMovingP: truckWasMovingP,
    };

    Api.post("reports", postData);

    this.setState((prevState) => ({
      currentView: "thankYouPage",
    }));
  }

  goToMotionView(truck) {
    this.setState((prevState) => ({
      currentView: "idlingOrMoving",
      truckKey: truck.key || prevState.truckKey,
    }));
  }

  goToMapView(truckWasMoving, engineWasRunning) {
    this.setState({
      currentView: "giveLocation",
      truckWasMoving: truckWasMoving,
      engineWasRunning: engineWasRunning,
    });
  }

  goToTruckSelection() {
    this.setState({
      currentView: "truckSelection",
    });
  }

  getActiveContent() {
    //TODO that is ugly
    var that = this;
    switch (this.state.currentView) {
      case "giveLocation":
        return {
          component: MapContainer,
          props: {
            sendData: that.sendData,
            goBack: that.goToMotionView,
            truckKey: that.truckKey,
            truckWasMoving: this.state.truckWasMoving,
            engineWasRunning: this.state.engineWasRunning,
          },
        };
      case "idlingOrMoving":
        return {
          component: IdlingOrMoving,
          props: {
            setMotion: that.goToMapView,
            goBack: that.goToTruckSelection,
          },
        };
      case "truckSelection":
        return {
          component: TruckSelection,
          props: { selectTruck: that.goToMotionView },
        };
      case "thankYouPage":
        return { component: ThankYouPage, props: {} };
      default:
        return null;
    }
  }

  render() {
    const ActiveContent = this.getActiveContent();

    const registrationMessage = this.context.data.newlyRegistered ? (
      <ErrorDisplay
        message={
          'Thank you for making an account! You are now able to make TruckTracker reports. If you have any questions, you can email info@ewoeip.org'
        }
      />
    ) : null;

    return (
      <article id="report">
        <Menu current="report" />
        {registrationMessage}
        <ActiveContent.component {...ActiveContent.props} />
      </article>
    );
  }
}

Report.contextType = SessionContext;

export default Report;
