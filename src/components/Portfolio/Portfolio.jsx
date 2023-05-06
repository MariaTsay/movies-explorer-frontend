import React from "react";
import "./Portfolio.css";

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <ul className="portfolio__list">
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://github.com/MariaTsay/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://mariatsay.github.io/russian-travel/index.html" target="_blank" rel="noreferrer">Адаптивный сайт</a>
                </li>
                <li className="portfolio__item">
                    <a className="portfolio__link" href="https://mymestogram.nomoredomains.work" target="_blank" rel="noreferrer">Одностраничное приложение</a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;