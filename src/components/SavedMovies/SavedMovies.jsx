import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import "./SavedMovies.css";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { SERVER_ERROR_MSG, NOTHINGFOUND_ERROR_MSG } from "../../utils/constants";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";

function SavedMovies(props) {
    const { isLoading, error } = props;
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const [savedMoviesList, setSavedMoviesList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [isShortFilm, setIsShortFilm] = useState(false);
    const [search, setSearch] = useState(localStorage.getItem('search') ?? '');
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [cardsToLoad, setCardsToLoad] = useState(0);

    //управление шириной экрана
    const handleResize = useCallback(() => {
        setScreenWidth(window.innerWidth);
    }, [])

    //получение фильмов с сервера beatfilm-movies
    const getMovies = useCallback(async () => {
        try {
            const apiMovies = await moviesApi.getMovies();
            console.log(apiMovies);
            setMovies(apiMovies);
        } catch (err) {
            console.log(err);
        }
    }, [])

    //хук сохранения фильмов
    useEffect(() => {
        getMovies();

        const savedIsShort = localStorage.getItem("isShort");

        if (savedIsShort) {
            setIsShortFilm(savedIsShort === "true");
        }
    }, [])

    // хук изменения ширины экрана
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    // фильтр фильмов по ключевым словам и короткометражкам
    const filteredMovies = useMemo(() => {
        if (!search) {
            return [];
        }

        const filtered = movies.filter((movie) => {
            const nameRU = movie.nameRU.toLowerCase();
            const nameEN = movie.nameEN.toLowerCase();
            if (isShortFilm && movie.duration > 40) {
                return false;
            }
            return nameRU.includes(search) || nameEN.includes(search);
        })

        localStorage.setItem("search", search);
        localStorage.setItem("isShort", String(isShortFilm));

        return filtered
    }, [movies, isShortFilm, search]);

    // отображение карточек с фильмами в зависимости от разрешения
    const moviesToRender = useMemo(() => {
        const countToRender = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;

        return filteredMovies.slice(0, countToRender + cardsToLoad);
    }, [filteredMovies, cardsToLoad, screenWidth]);

    // управление кнопкой "Еще"
    const handleMoreClick = useCallback(() => {
        if (screenWidth < 1280) {
            setCardsToLoad((prev) => prev + 2);
        } else {
            setCardsToLoad((prev) => prev + 3);
        }

    }, [screenWidth]);

    const MoviesBlock = () => {
        if (search) {
            //console.log(search)
            if (!moviesToRender.length) {
                return <h2 className="movies-error-title">{NOTHINGFOUND_ERROR_MSG}</h2>
            }
            return (
                <MoviesCardList>
                    {moviesToRender.map((movie) => (
                        <MoviesCard
                            key={movie.id}
                            movie={movie}
                        />
                    ))}
                </MoviesCardList>
            )
        }
    }

    return (
        <>
            <Header />
            <main>
                <SearchForm
                    placeholder="Фильм"
                />
                {isLoading
                    ? <Preloader />
                    : (
                        <>
                            {error && <h2 className="movies-error-title">{SERVER_ERROR_MSG}</h2>}
                            <MoviesBlock />
                        </>
                    )}

                <div className="movies-more-wrap">
                    {filteredMovies > moviesToRender && (
                        <button
                            className="movies-more-btn"
                            type="button"
                            onClick={handleMoreClick}
                        >Еще</button>
                    )}
                </div>
            </main>
            <div className="saved-movies-gap"></div>
            <Footer />
        </>
    )
}

export default SavedMovies;