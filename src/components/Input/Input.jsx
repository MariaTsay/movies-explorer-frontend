import React from "react";
import "./Input.css";

const Input = (props) => {
    const { label, type, name, id, placeholder, value, onChange, errorText } = props;

    return (
        <section className="input">
            <div className="input__wrap">
                <label className="input__label" htmlFor={id}>{label}</label>
                <input
                    className="input__input"
                    type={type}
                    name={name}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    autoComplete="off"
                    required
                >
                </input>
                <span className="input__error">{errorText}</span>
            </div>
        </section>
    )
}

export default Input;