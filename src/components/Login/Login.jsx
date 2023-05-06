import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../Logo/Logo";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import Input from "../Input/Input";
import SubmitForm from "../SubmitForm/SubmitForm";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

const Login = (props) => {
    const { onSubmit, isInfoTooltipOpened, isInfoTooltipClosed, isInfoTooltipStatus } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const authForm = {
            email,
            password
        }

        onSubmit(authForm);
    }, [email, password, onSubmit])

    return (
        <section className="login">
            <div className="login__welcome">
                <Logo />
                <WelcomeMessage title="Рады видеть!" />
            </div>
            <AuthorizationForm onSubmit={handleSubmit}>
                <div className="authorization__login-container">
                    <Input
                        label="E-mail"
                        className="input__input"
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"

                    />
                    <Input
                        label="Пароль"
                        className="input__input"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                        errorText="Что-то пошло не так..."
                    />
                </div>
                <SubmitForm buttonText="Войти">
                    <p className="submit-form__caption">Ещё не зарегистрированы?
                        <Link to="/signup" className="submit-form__span">Регистрация</Link>
                    </p>
                </SubmitForm>
            </AuthorizationForm>
            <InfoTooltip
                isOpen={isInfoTooltipOpened}
                onClose={isInfoTooltipClosed}
                status={isInfoTooltipStatus}
                text={isInfoTooltipStatus === 'success' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
            />
        </section>
    )
}

export default Login;