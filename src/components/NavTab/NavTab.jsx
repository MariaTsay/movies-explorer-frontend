import React from "react";
import "./NavTab.css";

const NavTab = () => {
    return (
        <nav className="nav-menu">
            <ul className="nav-menu__links">
                <li className="nav-menu__option"><a className="nav-menu__link" href="#about-project">О проекте</a></li>
                <li className="nav-menu__option"><a className="nav-menu__link" href="#techs">Технологии</a></li>
                <li className="nav-menu__option"><a className="nav-menu__link" href="#about-me">Студент</a></li>
            </ul>
        </nav>
    );

}

export default NavTab;