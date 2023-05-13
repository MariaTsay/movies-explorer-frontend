import React, { useState, useCallback } from "react";
import { useLocation } from 'react-router-dom';
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = (props) => {
    const { onSearchFormSubmit, placeholder, isShortFilm, setIsShortFilm } = props;
    const [search, setSearch] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();

    const handleSearchSubmit = useCallback((e) => {
        e.preventDefault();

        if (search === '') {
            setError('Нужно ввести ключевое слово');
        } else {
            onSearchFormSubmit(search);
            setError('');
        }

    }, [search, onSearchFormSubmit]);

    return (
        <div className="search">
            <div className="search__form">
                <div className="search__wrap">
                <form className="search__input-conteiner" onSubmit={handleSearchSubmit} >
                    <input className="search__input"
                        placeholder={placeholder}
                        value={search}
                        onChange={(e) => {setSearch(e.target.value)}}
                        type="text"
                    />
                    <button className="search__btn" type="submit">Найти</button>
                </form>
                {!search && (<span className="search__error-text">{error}</span>)}
                </div>
                <div className="search__checkbox-conteiner">
                    <label className="search__label">Короткометражки</label>
                    <FilterCheckbox value={isShortFilm} onChange={setIsShortFilm}/>
                </div>
            </div>
        </div>
    );

}

export default SearchForm;