import React from "react";
import './LoadingPage.css';

function LoadingPage() {
    return (
        <div className="loading-page" style={{flex: 1, flexDirection: 'column'}}>
            <p>Loading</p>
            <div className="loading-spinner"></div>
        </div>
    );
}

export default LoadingPage