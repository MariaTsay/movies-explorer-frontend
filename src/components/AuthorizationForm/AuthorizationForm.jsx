import React from "react";
import "./AuthorizationForm.css";

const AuthorizationForm = (props) => {
    const { handleSubmit, children } = props;

    return (
        <div className="authorization">
            <form className="authorization__form" onSubmit={handleSubmit} >
                {children}
            </form>
        </div>
    )
}

export default AuthorizationForm;