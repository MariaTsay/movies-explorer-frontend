import React from "react";
import "./AuthorizationForm.css";

const AuthorizationForm = (props) => {
    const { onSubmit, children } = props;

    return (
        <div className="authorization">
            <form className="authorization__form" onSubmit={onSubmit} >
                {children}
            </form>
        </div>
    )
}

export default AuthorizationForm;