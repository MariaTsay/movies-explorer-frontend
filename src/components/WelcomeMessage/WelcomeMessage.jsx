import React from "react";
import "./WelcomeMessage.css";

function WelocmeMessage(props) {
    const { title } = props;
    return (
        <div className="welcome">
            <h2 className="welcome-title">{title}</h2>
        </div>
    )
}

export default WelocmeMessage;