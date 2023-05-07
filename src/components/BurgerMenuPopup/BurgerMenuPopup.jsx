import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./BurgerMenuPopup.css";

const BurgerMenuPopup = (props) => {
    const { isOpen, onClose, } = props;

    useEffect(() => {
        if (!isOpen) return;

        const handleEscBtn = (e) => {
            if (e.keyCode === 27)
                onClose()
        }
        document.addEventListener('keydown', handleEscBtn)
        return () => document.removeEventListener('keydown', handleEscBtn)
    }, [isOpen, onClose])

    return (
        <section className={`burger-menu-popup ${isOpen ? 'burger-menu-popup_opened' : ''}`}>
            <div className="burger-menu-popup__container">
                <button className="burger-menu-popup__close-btn" onClick={onClose}></button>
                <div className="burger-menu-popup__content">
                    <nav className="burger-menu-popup__nav">
                        <NavLink to="/" className="burger-menu-popup__link">Главная</NavLink>
                        <NavLink to="/movies" className="burger-menu-popup__link">Фильмы</NavLink>
                        <NavLink to="/saved-movies" className="burger-menu-popup__link">Сохранённые фильмы</NavLink>
                    </nav>
                    <NavLink to="/profile" className="burger-menu-popup__account-title">Аккаунт
                        <div className="burger-menu-popup__account-icon"></div>
                    </NavLink>
                </div>
            </div>
        </section>
    );
}

export default BurgerMenuPopup;