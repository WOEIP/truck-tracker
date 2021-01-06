import React from "react";
import "../styles/messaging.scss";

function MessagingDisplay(props) {
  const containerType = props.successDisplay
    ? "message-display-container-success"
    : "message-display-container-error";

  return (
    <div className={containerType}>
      <p>{props.message}</p>
    </div>
  );
}

export default MessagingDisplay;
