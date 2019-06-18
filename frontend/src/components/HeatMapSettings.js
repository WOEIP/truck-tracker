import React, {Component} from 'react';

import '../styles/view-data.scss';
import { truckTypes } from '../components/TruckSelection';

class HeatMapSettings extends Component {

  constructor(props) {
    super(props);

    this.updateTruckTypesToShow = this.updateTruckTypesToShow.bind(this);
    // this.updateTimeBounds = this.updateTime.bind(this);
  }

  updateTruckTypesToShow(truckKey, evt) {
      this.props.updateTruck(truckKey, evt.target.checked);
  }

  // TODO we could use some nice select library for the trucks. They all seem
  // crappy or heavyweight though.
  render() {
    return (
      <div id="settings-wrapper">
        <h2>Select truck types to show</h2>
        <ul>
          {truckTypes.map((item) =>
            <li key={item.key}>
              <input type="checkbox"
                     defaultChecked={true}
                     onChange={this.updateTruckTypesToShow.bind(this, item.key)} />
              <span>{item.key}</span>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default HeatMapSettings;
