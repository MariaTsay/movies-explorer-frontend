import React, { useMemo, useState, useEffect, useCallback } from "react";
import "./Movies.css";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { moviesApi } from "../../utils/MoviesApi";

function Movies(props) {
    const {
        onMovieLike,
        onMovieDislike,
        onMovieDelete,
        onSavedList,
        isLoading,
    } = props;

    const [movies, setMovies] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
    const [isShortFilm, setIsShortFilm] = useState(false);
    const [search, setSearch] = useState('');
    const [filterString, setFilterString] = useState(null);
    const [page, setPage] = useState(1)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
            setIsErrorPopupOpen(true);
        }
    }, [])

    //хук сохранения фильмов
    useEffect(() => {
        if (isLoggedIn) {
            getMovies();
        }
        const savedSearch = localStorage.getItem("search");
        const savedIsShort = localStorage.getItem("isShort");

        if (savedSearch) {
            setSearch(savedSearch);
            setFilterString(savedSearch);
        }

        if (savedIsShort) {
            setIsShortFilm(savedIsShort === "true");
        }
    }, [isLoggedIn])

    // хук изменения ширины экрана
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    // фильтр фильмов по ключевым словам и короткометражкам
    const filteredMovies = useMemo(() => {
        if (!filterString) {
            return [];
        }

        const filtered = movies.filter((movie) => {
            const nameRU = movie.nameRu.toLowerCase();
            const str = filterString.toLowerCase();
            if (isShortFilm && movie.duration > 40) {
                return false;
            }
            return nameRU.includes(str);
        })

        localStorage.setItem("search", filterString);
        localStorage.setItem("isShort", String(isShortFilm));

        return filtered
    }, [movies, isShortFilm, filterString]);

    // отображение карточек с фильмами в зависимости от разрешения
    const moviesToRender = useMemo(() => {
        const countToRender = screenWidth < 768 ? 5 : screenWidth < 1280 ? 8 : 12;

        return filteredMovies.slice(0, countToRender * page);
    }, [filteredMovies, page, screenWidth]);

    // управление кнопкой "Еще"
    const handleMoreClick = useCallback(() => {
        setPage((prev) => prev + 1);
    }, []);

    // управление закрылием попапа с ошибкой
    const handleCloseErrorPopup = useCallback(() => {
        setIsErrorPopupOpen(false)
    },[])

    // хук закрытия попапа с ошибкой
    useEffect(() => {
        if (!isErrorPopupOpen) return;

        const handleEscBtn = (e) => {
            if (e.keyCode === 27)
            handleCloseErrorPopup()
        }
        document.addEventListener('keydown', handleEscBtn)
        return () => document.removeEventListener('keydown', handleEscBtn)
    }, [isErrorPopupOpen, handleCloseErrorPopup]);



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
                />
                {isLoading
                    ? <Preloader />
                    :
                    <MoviesCardList>
                        {filteredMovies.map((movie) => (
                            <MoviesCard
                                key={movie.id}
                                movie={movie}
                                onMovieLike={onMovieLike}
                                onMovieDislike={onMovieDislike}
                                onMovieDelete={onMovieDelete}
                                onSavedList={onSavedList}
                            />
                        ))}
                    </MoviesCardList>
                }

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
            <Footer />
            <div className={`movies-popup-error ${isErrorPopupOpen ? 'movies-popup-error_opened' : ''}`}>
                <div className="movies-popup-error__content">
                        <button className="movies-popup-error__close" type="button" onClick={handleCloseErrorPopup} />
                    <form className="movies-popup-error__form">
                        <p className="movies-popup-error__text">Во время запроса произошла ошибка.<br />Возможно, проблема с соединением или сервер недоступен. <br />Подождите немного и попробуйте ещё раз</p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Movies;