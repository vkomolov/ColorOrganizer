import React from "react";
import ColorFilter from "../../components/ColorFilter";
import ColorList from "../ColorList";

import "./ColorsBar.scss";

export default function ColorsBar ({colorsArr}) {
    log(colorsArr, "colorsArr");

    return (
        <div className="colors-bar">
            <div className="color-list-wrapper">
                <h4>Color List</h4>
                <ColorFilter />
                <ColorList />

            </div>
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}