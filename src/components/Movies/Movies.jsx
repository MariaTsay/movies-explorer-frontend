import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./Movies.css";
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
import movie4 from "../../images/movie4.png";
import movie5 from "../../images/movie5.png";
import movie6 from "../../images/movie6.png";
import movie7 from "../../images/movie7.png";
import movie8 from "../../images/movie8.png";
import movie9 from "../../images/movie9.png";
import movie10 from "../../images/movie10.png";
import movie11 from "../../images/movie11.png";
import movie12 from "../../images/movie12.png";

function Movies(props) {
    const { nameRu, isLiked } = props;
    const location = useLocation();
    const [isLikedMovie, setIsLikedMovie] = useState(isLiked);

    const handleLikes = () => {
        setIsLikedMovie(!isLikedMovie);
    }


    return (
        <section className="movies">
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
                                <button
                                    className={`movies-card__like ${isLikedMovie ? 'movies-card__like_active' : ''}`} type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie1} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie2} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie3} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie4} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie5} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie6} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie7} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie8} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie9} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie10} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie11} alt={nameRu} />
                    </MoviesCard>
                    <MoviesCard>
                        <div className="movies-card__wrap">
                            <h3 className="movies-card__title">33 слова о дизайне</h3>
                            {location.pathname === '/movies' ?
                                <button
                                    className={isLikedMovie
                                        ? "movies-card__like movies-card__like_active"
                                        : "movies-card__like"
                                    } type="button" onClick={handleLikes}></button>
                                :
                                <button className="movies-card__delete" type="button"></button>}
                        </div>
                        <label className="movies-card__duration">1ч 47м</label>
                        <img className="movies-card__cover" src={movie12} alt={nameRu} />
                    </MoviesCard>
                </MoviesCardList>
                <div className="movies__more-wrap">
                    <button className="movies__more-btn" type="button">Еще</button>
                </div>
            </main>
            <Footer />
        </section>
    )
}

export default Movies;