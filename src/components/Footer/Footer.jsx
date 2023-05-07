import React from "react";
import "./Footer.css";

const Footer = () => {
    const fullYear = new Date().getFullYear();
    return (
        <section className="footer">
            <div className="footer__container">
                <h3 className="footer__subtitle">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
                <div className="footer__wrap">
                    <ul className="footer__links">
                        <li className="footer__item"><a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                        <li className="footer__item"><a className="footer__link" href="https://github.com/MariaTsay" target="_blank" rel="noreferrer">Github</a></li>
                    </ul>
                    <p className='footer__copyright'>&copy; {fullYear}</p>
                </div>
            </div>
        </section>
    );

}

export default Footer;