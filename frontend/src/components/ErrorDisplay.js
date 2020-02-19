import React from 'react';
import '../styles/error.scss';

function Error(props){
    return (
        <div id="error-message-container">
            <p>
                {props.error}
            </p>
        </div>
    )
}

export default Error;