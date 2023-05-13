import React from "react";
import "./SubmitForm.css";

function SubmitForm(props) {
    const { buttonText, children } = props;
    return (
        <div className="submit-form">
            <button
                className="submit-form__btn"
                type="submit"
                disabled
            >{buttonText}</button>
            <div className="submit-form__text-container">
                {children}
            </div>
        </div>
    )
}

export default SubmitForm;