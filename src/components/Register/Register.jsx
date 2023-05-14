import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Logo/Logo";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import Input from "../Input/Input";
import SubmitForm from "../SubmitForm/SubmitForm";
import {useFormWithValidation} from "../validation/validation";
import {regexEmail, regexName,} from "../../utils/constants";


const Register = (props) => {
    const { name, email, password, onSubmit} = props;
    const { values, handleChange, errors, isValid  } = useFormWithValidation();
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        onSubmit(values);
    }, [values, onSubmit])

    return (
        <section className="register">
            <div className="register__welcome">
                <Logo />
                <WelcomeMessage>Добро пожаловать!</WelcomeMessage>
            </div>
            <AuthorizationForm onSubmit={handleSubmit}>
                <Input
                    label="Имя"
                    className="input__input"
                    type="text"
                    name="name"
                    id="name"
                    value={values.name || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    minLength="2"
                    maxLength="30"
                    error={errors.name}
                />
                <Input
                    label="E-mail"
                    className="ainput__input"
                    type="email"
                    name="email"
                    id="email"
                    value={values.email || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    error={errors.email}
                    required
                />
                <Input
                    label="Пароль"
                    className="input__input"
                    type="password"
                    name="password"
                    id="password"
                    value={values.password || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    error={errors.password}
                    required
                />
                <SubmitForm buttonText="Зарегистрироваться" disabled={!isValid}>
                    <p className="submit-form__caption">Уже зарегистрированы?
                        <Link to="/signin" className="submit-form__span">Войти</Link>
                    </p>
                </SubmitForm>
            </AuthorizationForm>
        </section>
    )
}

export default Register;