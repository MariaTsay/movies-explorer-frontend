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
    } = props;

    const [movies, setMovies] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isShortFilm, setIsShortFilm] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [displayedMoviesState, setDisplayedMoviesState] = useState('');

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
            setDisplayedMoviesState('moviesFound')
        } catch (err) {
            console.log(err);
            setDisplayedMoviesState('serverError')
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

        return filteredMovies.slice(0, countToRender * page);
    }, [filteredMovies, page, screenWidth]);

    // управление кнопкой "Еще"
    const handleMoreClick = useCallback(() => {
        setPage((prev) => prev + 1);
    }, []);


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
                {displayedMoviesState === "isLoading"
                    ? <Preloader />
                    : 
                    <MoviesCardList>
                        {moviesToRender.map((movie) => (
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

                <h2>ошибка сервера</h2>
                <h2>ничего не найдено</h2>
            </main>
            <Footer />
        </>
    )
}

export default Movies;