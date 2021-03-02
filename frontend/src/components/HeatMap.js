//TODO: time arrays, function clean up
//  also change checkbox triggerEvent
// this could be the same component as MapContainer

import React, { Component } from 'react';
import L from 'leaflet';
var polyline = require('@mapbox/polyline');

import Api from '../utils/Api.js';

import '../styles/leaflet/leaflet.css';

import truckBlack from '../img/truck.png';
import truckRed from '../img/truck-red.png';
import truckBlue from '../img/truck-blue.png';

class HeatMap extends Component {

  constructor(props) {
    super(props);

    this.compareReportTime = this.compareReportTime.bind(this);
    this.loadMap = this.loadMap.bind(this);
    this.drawRoute = this.drawRoute.bind(this);

    this.map = null;

    this.state = {
      viewLocation: {
        lat: 37.810652,
        lng: -122.291439
      }, //Oakland
      zoom: 17
    };

    //TODO: HTTPS is needed I guess
    // if (navigator && navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(pos => {
    //     userLocation = {
    //       lat: pos.coords.latitude,
    //       lng: pos.coords.longitude
    //     };
    //   }),
    //   err => {console.log(`ERROR(${err.code}): ${err.message}`);};
    // };
  }

  componentDidMount(){
    this.map = this.loadMap();
  }

  componentDidUpdate(){
    //Clear the map. TODO: find a more elegant way
    for(let i in this.map._layers) {
        if(this.map._layers[i]._path != undefined ||
           this.map._layers[i]._latlng != undefined) {
          this.map.removeLayer(this.map._layers[i]);
        }
    }

    if (this.props.data.length > 0) {
      // sort is in-place?
      let orderedData = this.props.data.sort(this.compareReportTime);

      let mostRecentRoute = orderedData[0];
      let otherRoutes = orderedData.slice(1, this.props.data.length);

      otherRoutes.map( route => {
        this.drawRoute(route.start, route.end, 'blue', route.engineWasRunningP);
      });

      this.drawRoute(mostRecentRoute.start, mostRecentRoute.end, 'red', mostRecentRoute.engineWasRunningP);
    }
  }

  compareReportTime(a, b) {
    return a.reportedAt < b.reportedAt;
  }

  drawRoute(start, end, drawColor, engineWasRunningP) {
    let truckIcon = {};

    if (drawColor === 'red') {
      truckIcon = L.icon({
        iconUrl: truckRed,
        iconSize:     [24, 30],
      });
   } else if (engineWasRunningP){
       truckIcon = L.icon({
        iconUrl: truckBlack,
        iconSize:     [24, 30],
      });
   } else {
     truckIcon = L.icon({
        iconUrl: truckBlue,
        iconSize:     [24, 30],
      });
   }

    if (end.lat === 0 && end.lon ===0) {
      L.marker([start.lat, start.lon], {icon: truckIcon}).addTo(this.map);
    } else {
      let URL = 'osrm/getroute/' + start.lon + ',' + start.lat + ';' + end.lon + ',' + end.lat;
      Api.get(URL)
          .then(response => {
            response.data.matchings.map((m) => L.polyline(polyline.decode(m.geometry), {color: drawColor}).addTo(this.map));
            return response;
          }).catch(error => {
            console.log(error);
            throw error;
          });
    }
  }

  loadMap() {
    let map = L.map(this.mapTarget).setView(
      [this.state.viewLocation.lat, this.state.viewLocation.lng],
      this.state.zoom
    );

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return map;
  }

  render() {
    return (
      <div id="map-wrapper">
        <div id="inner-map-container" ref={(el) => this.mapTarget = el}></div>
      </div>
    );
  }
}

export default HeatMap;
