import React, { useMemo, useState, useEffect, useCallback, useContext } from "react";
import "./Movies.css";
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import { SERVER_ERROR_MSG, NOTHINGFOUND_ERROR_MSG } from "../../utils/constants";

function Movies(props) {
    const {
        isLoading,
        error,
    } = props;

    const [movies, setMovies] = useState([]);
    const [savedMoviesList, setSavedMoviesList] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isShortFilm, setIsShortFilm] = useState(false);
    const [search, setSearch] = useState(localStorage.getItem('search') ?? '');
    const [page, setPage] = useState(1)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const handleAddMovieToSaved = async (data) => {
        try {
            const savedMovie = mainApi.saveMovie(data);
            //console.log(savedMovie);
            setIsLiked(true);
            setSavedMoviesList([savedMovie, ...savedMoviesList]);
        } catch (err) {
            console.log(err);
        }
    }


    const handleDeleteMovie = async (movie) => {
        try {
            mainApi.deleteMovie(movie.id);
            setIsLiked(false)
            setSavedMoviesList((state) => state.filter((m) => m._id === movie._id ? '' : m._id))
        } catch (err) {
            console.log(err)
        }
    }

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
        if (isLoggedIn) {
            getMovies();
        }
        const savedIsShort = localStorage.getItem("isShort");

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

    const MoviesBlock = () => {
        if (search) {
            console.log(search)
            if (!moviesToRender.length) {
                return <h2 className="movies-error-title">{NOTHINGFOUND_ERROR_MSG}</h2>
            }
            return (
                <MoviesCardList>
                    {moviesToRender.map((movie) => (
                        <MoviesCard
                            key={movie.id}
                            movie={movie}
                            onMovieLike={handleAddMovieToSaved}
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
            <Footer />
        </>
    )
}

export default Movies;
