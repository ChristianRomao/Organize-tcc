import React from 'react';
import '../css/LoadingIcon.css';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoadingIcon = () => {
    return (
        <div className="loading-icon">
            <FontAwesomeIcon icon={faSpinner} size="4x" className="spin"/>
        </div>
    );
}

export default LoadingIcon;
