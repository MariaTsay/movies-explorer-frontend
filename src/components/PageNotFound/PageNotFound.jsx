import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className="pagenotfound">
            <h2 className="pagenotfound__title">404</h2>
            <p className="pagenotfound__text">Страница не найдена</p>
            <button className="pagenotfound_link" onClick={() => navigate(-1)}>Назад</button>
        </div>
    )
}

export default PageNotFound;