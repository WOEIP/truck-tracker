import React from 'react';
import '../styles/error.scss';

function MessagingDisplay(props){
    return (
        <div id="error-message-container">
            <p>
                {props.message}
            </p>
        </div>
    )
}

export default MessagingDisplay;