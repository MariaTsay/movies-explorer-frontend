import React from "react";
import "./Input.css";
import {useFormWithValidation} from "../validation/validation";

const Input = (props) => {
    const { label, type, name, id, placeholder, pattern } = props;
    const { values, handleChange, errors } = useFormWithValidation();

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
                    value={values.name}
                    pattern={pattern}
                    onChange={handleChange}
                    autoComplete="off"
                >
                </input>
                {errors.name && <span className="input__error">errors.name</span>}
            </div>
        </section>
    )
}

export default Input;