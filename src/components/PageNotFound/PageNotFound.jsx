import React from "react";
import { Link } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
    return (
        <div className="pagenotfound">
            <h2 className="pagenotfound__title">404</h2>
            <p className="pagenotfound__text">Страница не найдена</p>
            <Link to="/" className="pagenotfound_link">Назад</Link>
        </div>
    )
}

export default PageNotFound;