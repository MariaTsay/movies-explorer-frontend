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
import { mainApi } from "../../utils/MainApi";

function SavedMovies(props) {
    const { isLoading, error } = props;
    const [movies, setMovies] = useState([]);
    const [savedMoviesList, setSavedMoviesList] = useState([]);
    const [isShortFilm, setIsShortFilm] = useState(false);
    const [search, setSearch] = useState(localStorage.getItem('search') ?? '');
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [cardsToLoad, setCardsToLoad] = useState(0);

    //получение сохраненных фильмов с сервера
    const getSavedMovies = useCallback(async () => {
        try {
            const apiSavedMovies = await mainApi.getSavedMovies();
            console.log(apiSavedMovies);
            setMovies(apiSavedMovies);
        } catch (err) {
            console.log(err);
        }
    }, [])

    //хук сохранения фильмов
    useEffect(() => {
        getSavedMovies();

        const savedIsShort = localStorage.getItem("isShort");

        if (savedIsShort) {
            setIsShortFilm(savedIsShort === "true");
        }
    }, [])

    //удаление фильма из сохраненных
    const handleDeleteMovie = async (movie) => {
        try {
            const movieToDelete = savedMoviesList.find((m) => m.movieId === movie.id)
            await mainApi.deleteMovie(movieToDelete._id);
            //console.log(movie);
            setSavedMoviesList((state) => state.filter((m) => m.movieId === movie.id ? '' : m.movieId))
        } catch (err) {
            console.log(err)
        }
    }

    //управление шириной экрана
    const handleResize = useCallback(() => {
        setScreenWidth(window.innerWidth);
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

        return filteredMovies
            .slice(0, countToRender + cardsToLoad)
            .map((movie) => ({
                ...movie,
                isLiked: savedMoviesList.some((m) => m.movieId === movie.id)
            }));

    }, [filteredMovies, cardsToLoad, screenWidth, savedMoviesList]);

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
                            onMovieDelete={handleDeleteMovie}
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
                    onSubmit={filteredMovies}
                    setIsShortFilm={setIsShortFilm}
                    isShortFilm={isShortFilm}
                    onSearchFormSubmit={setSearch}
                    initialValue={search}
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