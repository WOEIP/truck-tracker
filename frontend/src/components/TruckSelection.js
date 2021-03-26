import React, { Component } from 'react';

import BOX_TRUCK from '../img/Trucks/box_truck.png';
import AC_BUS from '../img/Trucks/ac_bus.png';
import TWO_AXLE from '../img/Trucks/2ax.png';
import THREE_AXLE from '../img/Trucks/3ax.png';
import BOBTAIL from '../img/Trucks/3axbob.png';
import FOUR_AXLE from '../img/Trucks/4ax.png';
import FIVE_AXLE from '../img/Trucks/5ax.png';
import SIX_AXLE from '../img/Trucks/6ax.png';
import PORT_CHASSIS from '../img/Trucks/port_chassis.png';
import PORT_CONTAINER from '../img/Trucks/port_container.png';

import { SessionContext } from "./../utils/Session.js";

import '../styles/truck-selection.scss';

import '../styles/pure-release-1.0.0/pure-min.css';
import '../styles/pure-release-1.0.0/grids-responsive.css';

export const allTruckTypes = [
    {key: 'BOX_TRUCK',
     allowKey: 'allowBOXTRUCK',
     tooltip:"Box truck",
     img: BOX_TRUCK,
     description:"Like a delivery van"},
    {key: 'AC_BUS',
     allowKey: 'allowACBUS',
     tooltip:"AC bus",
     img: AC_BUS,
     description:"An AC Transit bus"},
    {key: '2_AXLE',
     allowKey: 'allow2AXLE',
     tooltip:"2-axle",
     img: TWO_AXLE,
     description:"A truck with two axles"},
    {key: '3_AXLE',
     allowKey: 'allow3AXLE',
     tooltip:"3-axle",
     img: THREE_AXLE,
     description:"A truck with three axles"},
    {key: 'BOBTAIL',
     allowKey: 'allowBOBTAIL',
     tooltip:"3-axle bobtail",
     img: BOBTAIL,
     description:"A bobtail truck with three axles"},
    {key: '4_AXLE',
     allowKey: 'allow4AXLE',
     tooltip:"4-axle",
     img: FOUR_AXLE,
     description:"A truck with four axles"},
    {key: '5_AXLE',
     allowKey: 'allow5AXLE',
     tooltip:"5-axle",
     img: FIVE_AXLE,
     description:"A truck with five axles"},
    {key: '6_PLUS_AXLE',
     allowKey: 'allow6AXLE',
     tooltip:"6+ axle",
     img: SIX_AXLE,
     description:"A truck with six or more axles"},
    {key: 'PORT_CHASSIS',
     allowKey: 'allowPORTCHASSIS',
     tooltip:"Port chassis",
     img: PORT_CHASSIS,
     description:"A port chassis truck "},
    {key: 'PORT_CONTAINER',
     allowKey: 'allowPORTCONTAINER',
     tooltip:"Port container",
     img: PORT_CONTAINER,
     description:"A port container truck"}
];

export const truckTypes = [

]

class TruckSelection extends Component {
    //TODO check if this optimization actually works (named callback)
    selectTruck(truck){
        return this.props.selectTruck(truck);
    }

    render() {
        let truckTypes = [];
        let teamSettings = this.context.data.activeTeam;

                console.log(this.context);
                console.log(teamSettings);
        allTruckTypes.map(truckType => {
            if (teamSettings[truckType.allowKey]) {
                truckTypes.push(truckType);
            }
        })

        return (
            <div>
              <h2>Select truck type</h2>
              <ul className="pure-g truck-grid">
                {truckTypes.map((item) =>
                    <li key={item.key}
                        title={item.tooltip} //TODO HTML tooltip with :hover?
                        className="pure-u-1 pure-u-sm-1-2 button-container">
                      {/*TODO pure-u-sm-* dynamic based on no. of trucks?*/}
                      <input  onClick={(e) => this.selectTruck(item)}
                              type="image"
                              src={item.img}/>
                    </li>
                )}
              </ul>
            </div>
        );
    }
}

TruckSelection.contextType = SessionContext;

export default TruckSelection;
