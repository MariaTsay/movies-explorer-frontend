import React, { useContext, useState, useEffect } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../validation/validation"
import { useCallback } from "react";

const Profile = (props) => {
    const { onUpdateUserData, onSignOut } = props;
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
    const currentUser = useContext(CurrentUserContext);
    const [isUpdatedUserData, setIsUpdatedUserData] = useState(false);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        onUpdateUserData({
            name: values.name || currentUser.name,
            email: values.email || currentUser.email
        })
    }, [values.name, currentUser.name, values.email, currentUser.email, onUpdateUserData ])

    useEffect(() => {
        values.name !== currentUser.name || values.email !== currentUser.email 
        ? setIsUpdatedUserData(true) 
        : setIsUpdatedUserData(false)
    }, [values.name, currentUser.name, values.email, currentUser.email])

   

    return (
        <div className="profile">
            <Header />
            <div className="profile-gap"></div>
            <WelcomeMessage>Привет, {currentUser.name}!</WelcomeMessage>
            <form className="profile__form" onSubmit={handleSubmit}>
                <div className="profile__wrap">
                    <div className="profile__user-info">
                        <label className="profile__label" htmlFor="name">Имя</label>
                        <input 
                        className="profile__input" 
                        type="text"
                        name="name"
                        id="name"
                        value={values.name || currentUser.name}
                        onChange={handleChange}
                        error={errors.name}
                        ></input>
                    </div>
                    <div className="profile__user-info">
                        <label className="profile__label" htmlFor="email">E-mail</label>
                        <input 
                        className="profile__input" 
                        type="email"
                        name="email"
                        id="email"
                        value={values.email || currentUser.email}
                        onChange={handleChange}
                        error={errors.email}
                        ></input>
                    </div>
                </div>
                <nav className="profile__nav">
                    <ul className="profile__links">
                        <li className="profile__option">
                            <button
                                className="profile__link"
                                type="button"
                                disabled={!isUpdatedUserData || !isValid}
                            >Редактировать</button>
                        </li>
                        <li className="profile__option">
                            <button
                                className="profile__link"
                                type="button"
                                onClick={onSignOut}
                            >Выйти из аккаунта</button>
                        </li>
                    </ul>
                </nav>
            </form>
        </div>
    )
}

export default Profile;