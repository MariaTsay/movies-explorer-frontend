import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../Logo/Logo";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import Input from "../Input/Input";
import SubmitForm from "../SubmitForm/SubmitForm";
import { useFormWithValidation } from "../validation/validation";

const Login = (props) => {
    const { onSubmit } = props;
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        onSubmit({
            email: values.email,
            password: values.password
        });
    }, [values, onSubmit])

    return (
        <section className="login">
            <div className="login__welcome">
                <Logo />
                <WelcomeMessage>Рады видеть!</WelcomeMessage>
            </div>
            <AuthorizationForm onSubmit={handleSubmit}>
                <div className="authorization__login-container">
                    <Input
                        label="E-mail"
                        className="input__input"
                        type="email"
                        name="email"
                        id="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        autoComplete="off"
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
                </div>
                <SubmitForm buttonText="Войти" isValid={!isValid}>
                    <p className="submit-form__caption">Ещё не зарегистрированы?
                        <Link to="/signup" className="submit-form__span">Регистрация</Link>
                    </p>
                </SubmitForm>
            </AuthorizationForm>
        </section>
    )
}

export default Login;