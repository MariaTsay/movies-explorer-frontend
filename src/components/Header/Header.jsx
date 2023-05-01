import React from "react";
import { useLocation } from 'react-router-dom';
import "./Header.css";
import Logo from "../Logo/Logo";

const Header = (props) => {
  const { children } = props;
  const location = useLocation();
  return (
    <header className={`header ${location.pathname !== "/" ? 'header_loggined' : ''}`}>
      <div className="header__container">
        <Logo />
        {children}
      </div>
    </header>
  )
}

export default Header;