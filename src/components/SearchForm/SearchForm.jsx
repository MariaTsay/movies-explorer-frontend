import React from "react";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

const SearchForm = () => {
    return (
        <section className="search">
            <div className="search__form">
                <div className="search__input-conteiner">
                    <input className="search__input" placeholder="Фильм" />
                    <button className="search__btn">Найти</button>
                </div>
                <div className="search__checkbox-conteiner">
                    <label className="search__label">Короткометражки</label>
                    <FilterCheckbox />
                </div>
            </div>

        </section>
    );

}

export default SearchForm;