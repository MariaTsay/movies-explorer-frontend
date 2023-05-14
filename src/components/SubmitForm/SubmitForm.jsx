import React from "react";
import "./SubmitForm.css";

function SubmitForm(props) {
    const { buttonText, children, isValid } = props;
    return (
        <div className="submit-form">
            <button
                className="submit-form__btn"
                type="submit"
                disabled={isValid}
            >{buttonText}</button>
            <div className="submit-form__text-container">
                {children}
            </div>
        </div>
    )
}

export default SubmitForm;