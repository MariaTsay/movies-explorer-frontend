import React from "react";
import "./AboutProject.css";
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutProject = () => {
    return (
        <section className="about-project" id="about-project">
            <div className="about-project__container">
                <SectionTitle title="О проекте" />
                <div className="about-project__info">
                    <div className="about-project__info-about">
                        <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__text">
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </div>
                    <div className="about-project__info-deadlines">
                        <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__text">
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </div>
                </div>
            </div>
            <div className="about-project__timeline">
                <p className="about-project__timing about-project__timing-backend">1 неделя</p>
                <p className="about-project__timing about-project__timing-frontend">4 недели</p>
                <p className="about-project__caption">Back-end</p>
                <p className="about-project__caption">Front-end</p>
            </div>
        </section>
    );

}

export default AboutProject;