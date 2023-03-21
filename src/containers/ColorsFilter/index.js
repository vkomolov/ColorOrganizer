import React from "react";
import "./ColorsFilter.scss";
import FilterItem from "../../components/FilterItem";

export default function ColorFilter({ filters, setFilter }) {
    const filtersArr = filters.map((filterItem, index) => {
        const { filterName } = filterItem;
        return <FilterItem filterData={ filterItem } key={index + filterName} />
    });

    return (
        <div className="filter-wrapper">
            <span className="filter-heading">
                Use filter by:
            </span>
            <div
                className="filter-section"
                onClick={ setFilter }
            >
                { filtersArr }
            </div>
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}