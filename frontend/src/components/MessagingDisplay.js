import React from 'react';
import '../styles/messaging.scss';

function MessagingDisplay(props){
    return (
        <div id="message-display-container">
            <p>
                {props.message}
            </p>
        </div>
    )
}

export default MessagingDisplay;