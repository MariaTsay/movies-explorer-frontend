import React, { useState } from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = (props) => {
    const { onSearchFormSubmit } = props;
    const [errorMsg, setErrorMsg] = useState('');
    const [searchKeywords, setSearchKeywords] = useState('');

    const handleChange = (e) => {
        errorMsg('');
        setSearchKeywords(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchKeywords === '') {
            setErrorMsg('Нужно ввести ключевое слово');
        } else {
            onSearchFormSubmit(searchKeywords);
            setErrorMsg('');
        }
        
    };

    return (
        <section className="search">
            <div className="search__form">
                <form className="search__input-conteiner" onSubmit={handleSubmit} >
                    <input className="search__input" 
                    placeholder="Фильм"
                    onChange={handleChange}
                    type="text"
                    required
                    />
                    <button className="search__btn" type="submit">Найти</button>
                </form>
                <div className="search__checkbox-conteiner">
                    <label className="search__label">Короткометражки</label>
                    <FilterCheckbox />
                </div>
            </div>
        </section>
    );

}

export default SearchForm;