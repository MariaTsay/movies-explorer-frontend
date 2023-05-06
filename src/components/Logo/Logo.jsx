import React from "react";
import { Link } from "react-router-dom";
import "./Logo.css";
import logo from "../../images/header__logo.svg"

function Logo() {
    return (
        <Link to="/">
            <img className="logo__img" src={logo} alt="лого" />
        </Link>

    )
}

export default Logo;