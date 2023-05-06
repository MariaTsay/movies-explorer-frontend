import React from "react";
import "./AccountIcon.css";
import { NavLink } from "react-router-dom";

function AccountIcon() {
    return (
        <div className="account">
            <NavLink to="/profile" className="account__title">Аккаунт
                <div className="account__icon"></div>
            </NavLink>
        </div>
    )
}

export default AccountIcon;