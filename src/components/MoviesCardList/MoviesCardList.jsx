import React from "react";
import "./MoviesCardList.css";

const MoviesCardList = (props) => {
    const { children } = props;

    return (
        <ul className="cards">
            {children}
        </ul>
    );
}

export default MoviesCardList;