import React from "react";
import "./FilterItem.scss";

import { splitAndUpperCase } from "../../utils/funcs";

export default function FilterItem({ filterData }) {
    const { filterName, isActive } = filterData;
    const classAux = isActive ? "filter active" : "filter";
    let filterText = splitAndUpperCase(filterName);

    return (
        <div className={classAux}
             data-filter={filterName}
             title="Choose filter..."
        >
            { filterText }
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}