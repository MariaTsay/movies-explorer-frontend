import React from "react";
import { useLocation } from 'react-router-dom';
import "./SavedMovies.css";
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Footer from '../Footer/Footer';
import movie1 from "../../images/movie1.png";
import movie2 from "../../images/movie2.png";
import movie3 from "../../images/movie3.png";

function SavedMovies(props) {
    const { isLiked } = props;
    const location = useLocation();
    const cardLikeButtonClassName = (`movies-card__like ${isLiked && 'movies-card__like_active'}`);

    return (
        <section className="movies saved-movies">
            <Header>
                <Navigation />
                <BurgerMenu />
            </Header>
            <main>
                <SearchForm />
                <MoviesCardList>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button className={cardLikeButtonClassName} type="button"></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie1} alt="обложка фильма" />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button className={cardLikeButtonClassName} type="button"></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie2} alt="обложка фильма" />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button className={cardLikeButtonClassName} type="button"></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie3} alt="обложка фильма" />
                    </MoviesCard>
                </MoviesCardList>
            </main>
            <div className="saved-movies__gap"></div>
            <Footer />
        </section>
    )
}

export default SavedMovies;