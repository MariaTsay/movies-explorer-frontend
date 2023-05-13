import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import "./MoviesCard.css";

const MoviesCard = (props) => {
    const { movie,isLiked, onMovieLike, onMovieDelete } = props;
    const moviesServerUrl = ' https://api.nomoreparties.co/';
    const location = useLocation();
    
    const handleLikeClick = () => {
        onMovieLike(movie);
    }

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
                            className={`movies-card__like ${isLiked ? 'movies-card__like_active' : ''}`} 
                            type="button" 
                            onClick={handleLikeClick}
                        ></button>
                        :
                        <button className="movies-card__delete" type="button" onClick={handleDelete}></button>}
                </div>
                <label className="movies-card__duration">{getMovieDuration(movie.duration)}</label>
                <a href={movie.trailerLink} target="_blank" rel="noreferrer"><img className="movies-card__cover" 
                src={location.pathname === '/movies' ? moviesServerUrl + movie.image.url : movie.image} alt={movie.nameRu} /></a>
            </li>
        </>
    );
}

export default MoviesCard;