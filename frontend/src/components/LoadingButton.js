import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function LoadingButton(props) {
    const containerType = props.loading
        ? "loading-button"
        : null;

	const loadingSpinner = props.loading ? (
        <span>
            <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
			&nbsp;
        </span>
    ) : null;

    return (
        <button className={containerType} onClick={props.onClick} disabled={props.loading}>
			{loadingSpinner}
            {props.label}
        </button>
    );
}

export default LoadingButton;
