import React from "react";
import "./ColorList.scss";
import ColorElem from "../../components/ColorElem";

export default function ColorList({ colorsArr }) {
    let colors = null;
    if (colorsArr.length) {
        colors = colorsArr.map((colorElem, index) => {
            const {colorName, rating, colorHex} = colorElem;

            return <ColorElem
                { ...{ colorName, rating, colorHex } }
                key={index + colorName}
            />
        });
    }

    return (
        <div className="color-list">
            { colors }
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}