import React from 'react';
import '../styles/messaging.scss';

function MessagingDisplay(props){

    const containerSize = props.largeDisplay != "true" ? "message-display-container-small" :
    "message-display-container-large"

    return (
        <div id={containerSize}>
            <p>
                {props.message}
            </p>
        </div>
    )
}

export default MessagingDisplay;