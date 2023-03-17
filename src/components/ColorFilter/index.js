import React from "react";

import "./ColorFilter.scss";

export default function ColorFilter() {
    return (
        <div className="filter-wrapper">
            <span className="filter-heading">Use filter by:</span>
            <div className="filter-section">
                <div className="filter"
                     data-filter="creationDate"
                >
                    Creation Date
                </div>
                <div className="filter"
                     data-filter="colorName"
                >
                    Color Name
                </div>
                <div className="filter"
                     data-filter="rating"
                >
                    Color Rates
                </div>
            </div>
        </div>
    );
}