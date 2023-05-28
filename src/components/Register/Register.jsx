import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Logo/Logo";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import Input from "../Input/Input";
import SubmitForm from "../SubmitForm/SubmitForm";
import { useFormWithValidation } from "../validation/validation";
const Register = (props) => {
    const { onSubmit } = props;
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        onSubmit({
            name: values.name,
            email: values.email,
            password: values.password
        });
    }, [values, onSubmit])

    return (
        <section className="register">
            <div className="register__welcome">
                <Logo />
                <WelcomeMessage>Добро пожаловать!</WelcomeMessage>
            </div>
            <AuthorizationForm onSubmit={handleSubmit} isValid={isValid}>
                <Input
                    label="Имя"
                    className="input__input"
                    type="text"
                    name="name"
                    id="name"
                    value={values.name || ''}
                    onChange={handleChange}
                    autoComplete="off"
                    pattern="[a-zA-Z0-9-а-яА-Я\s]+$"
                    error={errors.name}
                    minLength="2"
                    maxLength="30"
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
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    error={errors.email}
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
                />
                <SubmitForm buttonText="Зарегистрироваться" isValid={!isValid}>
                    <p className="submit-form__caption">Уже зарегистрированы?
                        <Link to="/signin" className="submit-form__span">Войти</Link>
                    </p>
                </SubmitForm>
            </AuthorizationForm>
        </section>
    )
}

export default Register;