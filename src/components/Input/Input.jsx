import React from "react";
import "./Input.css";

const Input = (props) => {
    const { label, type, name, id, placeholder, value, onChange, error, minLength, maxLength } = props;

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
                    minLength={minLength}
                    maxLength={maxLength}
                >
                </input>
                {error && <span className="input__error">{error}</span>}
            </div>
        </section>
    )
}

export default Input;