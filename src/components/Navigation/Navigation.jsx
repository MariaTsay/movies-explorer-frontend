import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
    const linkActiveClassName = (isActive) => {
        return `navigation__link ${isActive ? 'navigation__link_active' : ''}`
    }

    return (
        <nav className="navigation">
            <div className="navigation__links">
                <NavLink to="/movies" className={linkActiveClassName}>Фильмы</NavLink>
                <NavLink to="/saved-movies" className={linkActiveClassName}>Сохранённые фильмы</NavLink>
            </div>
        </nav>
    )
}

export default Navigation;