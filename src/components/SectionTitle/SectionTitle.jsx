import React from "react";
import "./SectionTitle.css";

const SectionTitle = (props) => {
    const { title } = props;
    return (
        <h2 className="section-title">{title}</h2>
    );
}

export default SectionTitle;