import React from 'react';
import '../styles/error.scss';

function ErrorDisplay(props){
    return (
        <div id="error-message-container">
            <p>
                {props.message}
            </p>
        </div>
    )
}

export default ErrorDisplay;