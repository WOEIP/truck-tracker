import React, { Component } from "react";
import LoadingButton from "./LoadingButton";
import "../styles/loading-button.scss";
import Dropzone from 'dropzone';

class PhotoPage extends Component {
    constructor(props){
        super(props);
        this.sendData = this.sendData.bind(this);
    }

  componentDidMount() {
      let dropzoneConfig = {
          url: 'hello'
      }
      let dropzoneInstance = new Dropzone('div#dropzone-container', dropzoneConfig);
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
                    <div id="dropzone-container"></div>
                    <div className="dot-actions">
                        <LoadingButton onClick={this.sendData} loading={this.props.loading} label="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default PhotoPage;
