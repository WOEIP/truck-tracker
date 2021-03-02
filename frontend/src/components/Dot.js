import React, { Component } from "react";
import LoadingButton from "./LoadingButton";
import "../styles/loading-button.scss";

class DotPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            dotNumber: ""
        }

        this.addDotNumber = this.addDotNumber.bind(this);
        this.handleDotChange = this.handleDotChange.bind(this);
    }

    addDotNumber(e){
        e.preventDefault();

        this.props.addDotNumber(this.state.dotNumber)
    }

    handleDotChange(e){
        this.setState({ dotNumber: e.target.value });
    }

    render() {
        return (
            <div>
                <h3>What is the truck's DOT number?</h3>
                <form>
                    <input
                        type="text"
                        value={this.state.dotNumber}
                        onChange={this.handleDotChange}
                    />
                    <p className="helptext">
                        The DOT number is a series of numbers and letters,
                        usually found on the driver's side door of the truck.
                    </p>
                    <div className="dot-actions">
                        <LoadingButton
                            onClick={this.addDotNumber}
                            loading={this.props.loading}
                            label="Submit"
                        />
                        <p className="skip-step" onClick={this.addDotNumber}>
                            Skip this step
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

export default DotPage;