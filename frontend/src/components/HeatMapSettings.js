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
            <ul className="truck-filter-list">
                {truckTypes.map((item) => (
                    <li key={item.key}>
                        <input
                            type="checkbox"
                            className="filter-checkbox"
                            defaultChecked={true}
                            onChange={(e) =>
                                this.props.updateTruck(
                                    item.key,
                                    e.target.checked
                                )
                            }
                        />
                        <span>{item.key}</span>
                    </li>
                ))}
            </ul>
            <h3>Activity seen between</h3>
            <div className="seen-between-container">
                <Flatpickr
                    options={{
                        defaultDate: this.props.defaultFromTime,
                        enableTime: true,
                        dateFormat: "Y-m-d H:i",
                    }}
                    onChange={(time) => {
                        this.props.updateTime("from", time);
                    }}
                    className="flatpickr-input"
                />
                <h4 className="flatpickr-and">and</h4>
                <Flatpickr
                    options={{
                        defaultDate: this.props.defaultToTime,
                        enableTime: true,
                        dateFormat: "Y-m-d H:i",
                    }}
                    onChange={(time) => {
                        this.props.updateTime("to", time);
                    }}
                />
            </div>
        </div>
    );
  }
}

export default HeatMapSettings;
