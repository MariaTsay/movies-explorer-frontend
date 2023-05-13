import React, { useContext } from "react";
import { useLocation } from 'react-router-dom';
import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import NavigationAuth from "../NavigationAuth/NavigationAuth";
import BurgenMenu from "../BurgerMenu/BurgerMenu";
import AccountIcon from "../AccountIcon/AccountIcon";

const Header = (props) => {
  const {isLoggedIn} = props;
  const location = useLocation();

  return (
    <header className={`header ${location.pathname !== "/" ? 'header_loggined' : ''}`}>
      <div className="header__container">
        <Logo />
        <div className="header__links">{isLoggedIn ? <Navigation /> : null}</div>
        <div className="header__menu">
          {isLoggedIn ? (
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