import React, { useState } from "react";
import "./BurgerMenu.css";
import BurgerMenuPopup from '../BurgerMenuPopup/BurgerMenuPopup';


const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleBurgerMenuClick = () => {
        setIsOpen(true);
    }

    const closeBurgerMenuPopup = () => {
        setIsOpen(false);
    }

    return (
        <section className="burger-menu">
            <button className="burger-menu__btn" onClick={handleBurgerMenuClick}></button>
            <BurgerMenuPopup isOpen={isOpen} onClose={closeBurgerMenuPopup} />
        </section>
    );
}

export default BurgerMenu;