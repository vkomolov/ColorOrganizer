import React from "react";
import "./ColorDetails.scss";
import { getContrastColor, hexToRgb } from "../../utils/funcs";
//components
import ColorDetailsElem from "../../components/ColorDetailsElem";

export default function ColorDetails ({ currentColorProps, alertState, copyValue, currentColorHex }) {
    //the properties of the color are mapped for forwarding separate components

    const dataPropElems = currentColorProps.map(propElem => {
        return <ColorDetailsElem
            alertState={ alertState }
            { ...propElem }
            currentColorHex={currentColorHex}
            key={ propElem.attr.prop }
        />
    });

    return (
        <div id="color-details"
             onClick={ copyValue }
        >
            <h4
                className="color-sample-heading"
                style={{color: getContrastColor(currentColorHex, hexToRgb)}}
            >
                Current Color:
            </h4>
            { dataPropElems }
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}