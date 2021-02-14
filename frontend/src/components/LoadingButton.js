import React from "react";
import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';
import { faSpinner } from "@fontawesome/free-solid-svg-icons";

function LoadingButton(props) {
    // TODO this should be done by disabled
    let containerClassName = props.loading
        ? "loading-button"
        : null; // TODO make it to a String.. but it overwrites styles

    let loadingSpinner = props.loading ? (
        <span className="button-spinner-icon">
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
        </span>
    ) : null;

    return (
        <button className={containerClassName} onClick={props.onClick} disabled={props.loading}>
            {loadingSpinner}
            {props.label}
        </button>
    );
}

export default LoadingButton;
