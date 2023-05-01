import React from "react";
import "./AccountIcon.css";
import { Link } from "react-router-dom";

function AccountIcon() {
    return (
        <div className="account">
            <Link to="/profile" className="account__title">Аккаунт
                <div className="account__icon"></div>
            </Link>
        </div>
    )
}

export default AccountIcon;