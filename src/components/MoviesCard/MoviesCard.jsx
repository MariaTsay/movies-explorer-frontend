import React, { useCallback } from "react";
import { useLocation } from 'react-router-dom';
import "./MoviesCard.css";

const MoviesCard = (props) => {
    const { movie, onMovieLike, onMovieDelete, isOnSavedList} = props;
    
    const movieImageUrl = isOnSavedList
    ? movie.image
    : `https://api.nomoreparties.co${movie.image.url}`
    
    
    const location = useLocation();

    const handleLikeClick = useCallback(() => {
        //console.log(movie);
        onMovieLike(movie);  
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
                src={movieImageUrl} alt={movie.nameRu} /></a>
            </li>
        </>
    );
}

export default MoviesCard;