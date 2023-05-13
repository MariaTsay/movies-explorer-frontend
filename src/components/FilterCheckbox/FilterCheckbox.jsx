import React, { useState } from "react";
import "./FilterCheckbox.css";

const FilterCheckbox = (props) => {
    const {value, onChange} = props;

    const handleFilterCheckbox = () => {
        onChange(!value);
    }

    return (
        <div className="filter-checkbox">
            <div className={
                value 
                ? "filter-checkbox__tumbler-on"
                : "filter-checkbox__tumbler-off"
            } onClick={handleFilterCheckbox}></div>
        </div>
    );

}

export default FilterCheckbox;