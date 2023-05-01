import React from "react";
import "./Promo.css";
import praktikumLogo from "../../images/promo__landing-logo.svg";

const Promo = () => {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <img className="promo__logo" src={praktikumLogo} alt="лого Практикума" />
        </section>
    );

}

export default Promo;