import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import AccountIcon from '../AccountIcon/AccountIcon';

function Navigation() {
    return (
        <div>
            <nav className="navigation">
                <div className="navigation__links">
                    <NavLink to="/movies" className="navigation__link">Фильмы</NavLink>
                    <NavLink to="/saved-movies" className="navigation__link">Сохранённые фильмы</NavLink>
                </div>
                <AccountIcon />
            </nav>
        </div>
    )
}

export default Navigation;