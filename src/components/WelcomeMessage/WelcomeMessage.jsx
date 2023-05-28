import React from "react";
import "./WelcomeMessage.css";

function WelocmeMessage(props) {
    const { children } = props;
    return (
        <div className="welcome">
            <h2 className="welcome-title">{children}</h2>
        </div>
    )
}

export default WelocmeMessage;