import React from "react";
import "./ColorList.scss";
import { sortEqualTypeValues } from "../../utils/funcs";
import ColorElem from "../../components/ColorElem";

export default function ColorList({ colorsArr, sortBy }) {
    let colors = null;
    if (colorsArr.length) {
        const colorsSorted = colorsArr.sort((colorA, colorB) => {
            return sortEqualTypeValues(colorA[sortBy], colorB[sortBy]);
        });

        colors = colorsSorted.map((colorElem, index) => {
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