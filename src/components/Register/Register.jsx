import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Logo/Logo";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage";
import AuthorizationForm from "../AuthorizationForm/AuthorizationForm";
import Input from "../Input/Input";
import SubmitForm from "../SubmitForm/SubmitForm";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import {useFormWithValidation} from "../validation/validation";
import {regexEmail, regexName,} from "../../utils/constants";

const Register = (props) => {
    const { onSubmit, isInfoTooltipOpened, isInfoTooltipClosed, isInfoTooltipStatus } = props;
    const { values, isValid } = useFormWithValidation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        const authForm = {
            name,
            email,
            password
        }

        onSubmit(authForm);
    }, [name, email, password, onSubmit])

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
                    handleChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                    pattern={regexName}
                    required
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
                    handleChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    pattern={regexEmail}
                    required
                />
                <Input
                    label="Пароль"
                    className="input__input"
                    type="password"
                    name="password"
                    id="password"
                    value={values.password || ''}
                    handleChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    required
                />
                <SubmitForm buttonText="Зарегистрироваться" disabled={!isValid}>
                    <p className="submit-form__caption">Уже зарегистрированы?
                        <Link to="/signin" className="submit-form__span">Войти</Link>
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

export default Register;