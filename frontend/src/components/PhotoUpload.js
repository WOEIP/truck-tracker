import React, { Component } from "react";
import LoadingButton from "./LoadingButton";
import "../styles/loading-button.scss";

class PhotoPage extends Component {

    constructor(props){
        super(props);

        this.sendData = this.sendData.bind(this);
    }

    sendData(e){
        e.preventDefault();

        this.props.sendData()
    }

    render() {
        return (
            <div>
                <h3>Photo Upload</h3>
                <form>
                    <p className="helptext">
                        Coming soon...
                    </p>
                    <div className="dot-actions">
                        <LoadingButton onClick={this.sendData} loading={this.props.loading} label="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default PhotoPage;
