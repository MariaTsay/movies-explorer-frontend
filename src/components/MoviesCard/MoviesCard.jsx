import React from "react";
import "./MoviesCard.css";

const MoviesCard = (props) => {
    const { children } = props;

    return (
        <>
            <li className="movies-card">
                {children}
            </li>
        </>
    );
}

export default MoviesCard;