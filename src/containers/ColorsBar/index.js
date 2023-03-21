import React from "react";
import ColorsFilter from "../../containers/ColorsFilter";
import ColorList from "../ColorList";

import "./ColorsBar.scss";

export default function ColorsBar ({ filters, colorsArr, setFilter }) {
    const filterActive = filters.filter(filter => filter["isActive"] === true)[0];

    return (
        <div className="colors-bar">
            <div className="color-list-wrapper">
                <h4>Color List</h4>
                <ColorsFilter
                    filters={ filters }
                    setFilter={ setFilter }
                />
                <ColorList
                    colorsArr={ colorsArr }
                    sortBy={ filterActive["filterName"] }
                />
            </div>
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}