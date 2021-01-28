import React, { Component } from "react";

class DotPage extends Component {

    // selectTruck(truck) {
    //     return this.props.selectTruck(truck);
    // }

    render() {
        return (
            <div>
                <h3>What is the truck's DOT number?</h3>
                <form>
                    <input type="text" />
                    <p className="helptext">
                        The DOT number is a series of numbers and letters,
                        usually found on the driver's side door of the truck.
                    </p>
                    <div className="dot-actions">
                        <button>Confirm</button>
                        <p className="skip-step">Skip this step</p>
                    </div>
                </form>
            </div>
        );
    }
}

export default DotPage;