import React, { useState, useEffect, useCallback, useContext } from "react";
import { useLocation } from 'react-router-dom';
import "./MoviesCard.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const MoviesCard = (props) => {
    const { movie, movieId, isLiked, onMovieLike, onMovieDelete } = props;
    const movieImageUrl = `https://api.nomoreparties.co${movie.image.url}`
    const location = useLocation();
    const currentUser = useContext(CurrentUserContext);

    const handleLikeClick = useCallback(() => {
        onMovieLike(movie);  
        console.log(movie)
    },[movie, onMovieLike])

    const handleDelete = () => {
        onMovieDelete(movie);
    }

    const getMovieDuration = (mins) => {
        return `${Math.round(mins / 60)}ч ${mins % 60}мин`
    }

    return (
        <>
            <li className="movies-card">
                <div className="movies-card__wrap">
                    <h3 className="movies-card__title">{movie.nameRU}</h3>
                    {location.pathname === '/movies' ?
                        <button
                            className={`movies-card__like ${movie.isLiked ? 'movies-card__like_active' : ''}`} 
                            type="button" 
                            onClick={handleLikeClick}
                        ></button>
                        :
                        <button className="movies-card__delete" type="button" onClick={handleDelete}></button>}
                </div>
                <label className="movies-card__duration">{getMovieDuration(movie.duration)}</label>
                <a href={movie.trailerLink} target="_blank" rel="noreferrer"><img className="movies-card__cover" 
                src={location.pathname === '/movies' && movieImageUrl} alt={movie.nameRu} /></a>
            </li>
        </>
    );
}

export default MoviesCard;