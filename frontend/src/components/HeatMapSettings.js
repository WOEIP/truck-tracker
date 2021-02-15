import React, {Component} from 'react';

import '../styles/view-data.scss';
import { truckTypes } from '../components/TruckSelection';

import Flatpickr from 'react-flatpickr';

class HeatMapSettings extends Component {

  constructor(props) {
    super(props);
  }

  // TODO we could use some nice select library for the trucks. They all seem
  // crappy or heavyweight though.
  render() {
    return (
      <div id="settings-wrapper">
        <h3>Filter by truck type</h3>
        <ul>
          {truckTypes.map((item) =>
            <li key={item.key}>
              <input type="checkbox"
                     defaultChecked={true}
                     onChange={e => this.props.updateTruck(item.key, e.target.checked)} />
              <span>{item.key}</span>
            </li>
          )}
        </ul>
        <h3>Activity seen between</h3>
          <Flatpickr
            options={{
              defaultDate: this.props.defaultFromTime,
              enableTime: true,
              dateFormat: "Y-m-d H:i"}}
            onChange = {time => { this.props.updateTime('from', time); }}/>
        <h4>and</h4>
          <Flatpickr
            options={{
              defaultDate: this.props.defaultToTime,
              enableTime: true,
            dateFormat: "Y-m-d H:i"}}
            onChange = {time => { this.props.updateTime('to', time); }}/>
      </div>
    );
  }
}

export default HeatMapSettings;
