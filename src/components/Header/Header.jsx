import React, { useContext } from "react";
import { useLocation } from 'react-router-dom';
import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import NavigationAuth from "../NavigationAuth/NavigationAuth";
import BurgenMenu from "../BurgerMenu/BurgerMenu";
import AccountIcon from "../AccountIcon/AccountIcon";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = () => {
  const location = useLocation();
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  return (
    <header className={`header ${location.pathname !== "/" ? 'header_loggined' : ''}`}>
      <div className="header__container">
        <Logo />
        <div className="header__links">{currentUser ? <Navigation /> : null}</div>
        <div className="header__menu">
          {currentUser ? (
            <>
              <AccountIcon />
              <BurgenMenu />
            </>
          ) : (
            <NavigationAuth />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;