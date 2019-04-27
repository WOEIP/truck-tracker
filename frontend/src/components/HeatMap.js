//TODO: time arrays, function clean up
//  also change checkbox triggerEvent
// this could be the same component as MapContainer

import axios from 'axios';
import React, { Component } from 'react';
import L from 'leaflet';
var polyline = require('@mapbox/polyline');

import Api from '../utils/Api.js';

import '../styles/leaflet/leaflet.css';

class HeatMap extends Component {

  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.loadMap = this.loadMap.bind(this);
    this.drawRoute = this.drawRoute.bind(this);

    this.map = null;

    this.state = {
      data: [],
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
    if (this.state.data.length > 0) {
      let mostRecentRoute = this.state.data[this.state.data.length - 1];
      let otherRoutes = this.state.data.slice(0, this.state.data.length - 1);

      otherRoutes.map( route => {
        this.drawRoute(route.start, route.end, 'blue');
      });

      this.drawRoute(mostRecentRoute.start, mostRecentRoute.end, 'red');
    }
  }

  drawRoute(start, end, lineColor) {
    let URL = 'osrm/getroute/' + start.lon + ',' + start.lat + ';' + end.lon + ',' + end.lat;
    console.log(URL);
    Api.get(URL)
        .then(response => {
          response.data.matchings.map((m) =>
          L.polyline(polyline.decode(m.geometry), {color: lineColor}).addTo(this.map));
          return response;
        }).catch(error => {
          console.log(error);
          throw error;
        });
  }

  getData () {
    Api.get('reports').then(response => {
      this.setState({data: response.data});
    });
  }

  loadMap() {
    let map = L.map(this.mapTarget).setView(
      [this.state.viewLocation.lat, this.state.viewLocation.lng],
      this.state.zoom
    );

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    this.getData();

    return map;
  }

  render() {
    return (
      <div id="jsx-needs-this">
        <p className="map-instructions">
          Here you can see our aggregated data from the submissions West Oakland
          residents gave us.
        </p>
        <div id="map-wrapper">
          <div id="inner-map-container" ref={(el) => this.mapTarget = el}>
          </div>
        </div>
      </div>
    );
  }
}

export default HeatMap;
