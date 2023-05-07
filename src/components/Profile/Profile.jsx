import React from "react";
import "./Profile.css";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage";

const Profile = () => {

    return (
        <section className="profile">
            <Header>
                <Navigation />
                <BurgerMenu />
            </Header>
            <div className="profile-gap"></div>
            <WelcomeMessage title="Привет, Мария!" />
            <form className="profile__form" >
                <div className="profile__wrap">
                    <div className="profile__user-info">
                        <label className="profile__label">Имя</label>
                        <input className="profile__input" type="text"></input>
                    </div>
                    <div className="profile__user-info">
                        <label className="profile__label">E-mail</label>
                        <input className="profile__input" type="email"></input>
                    </div>
                </div>
                <nav className="profile__nav">
                    <ul className="profile__links">
                        <li className="profile__option"><button className="profile__link" type="button">Редактировать</button></li>
                        <li className="profile__option"><button className="profile__link" type="button">Выйти из аккаунта</button></li>
                    </ul>
                </nav>
            </form>
        </section>
    )
}

export default Profile;