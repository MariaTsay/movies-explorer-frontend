import React from "react";
import "./Input.css";

const Input = (props) => {
    const { label, type, name, id, placeholder, value, onChange, errorText } = props;

    return (
        <section className="input">
            <div className="authorization__input-wrap">
                <label className="authorization__label">{label}</label>
                <input
                    className="authorization__input"
                    type={type}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                >
                </input>
                <span className="authorization__error">{errorText}</span>
            </div>
        </section>
    )
}

export default Input;