import React from "react";
import "./Main.css";
import Header from '../Header/Header';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe.jsx';
import Portfolio from '../Portfolio/Portfolio';
import Footer from '../Footer/Footer';

function Main() {
    return (
        <section className="main">
            <Header>
                <NavigationAuth />
            </Header>
            <div>
                <Promo />
                <NavTab />
                <AboutProject />
                <Techs />
                <AboutMe />
                <Portfolio />
            </div>
            <Footer />
        </section>
    )
}

export default Main;