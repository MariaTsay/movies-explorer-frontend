import React from "react";
import "./AboutMe.css";
import photo from "../../images/me.jpeg";
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutMe = () => {
    return (
        <section className="about-me" id="about-me">
            <div className="about-me__container">
                <SectionTitle title="Студент" />
                <div className="about-me__info">
                    <img className="about-me__photo" src={photo} alt="мое фото" />
                    <h3 className="about-me__subtitle">Мария</h3>
                    <p className="about-me__caption">Фронтенд-разработчик, 34 года</p>
                    <p className="about-me__text">
                        Я из Санкт-Петербурга, закончила факультет туризма в СПбГИЭУ. C 2022 года обучаюсь в Я.Практикуме на веб-разрабочика. После окончания обучения собираюсь работать в сфере IT и заниматься frontend разработкой, тк получаю удовольствие от создания красивых и удобных интерфейсов для пользователей.
                    </p>
                    <ul className="about-me__links">
                        <li><a className="about-me__link" href="https://github.com/MariaTsay" target="_blank" rel="noreferrer">Github</a></li>
                    </ul>
                </div>
            </div>
        </section>
    );

}

export default AboutMe;