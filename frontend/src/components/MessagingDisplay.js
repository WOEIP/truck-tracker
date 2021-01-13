import React from "react";
import "../styles/messaging.scss";

function MessagingDisplay(props) {
    const containerType = props.successDisplay
        ? "message-display-container-success"
        : "message-display-container-error";

    const redirectMessage = props.successDisplay
    ? "" : <p>Please click <a href="#passwordreset" className="textLink">here</a> if you would like to reset your password.</p>

    return (
        <div className={containerType}>
            <p>{props.message}</p> 
            {redirectMessage}
        </div>
    );
}

export default MessagingDisplay;
