import React from "react";
import "./ColorDetails.scss";
//components
import ColorDetailsElem from "../ColorDetailsElem";

export default function ColorDetails ({ currentColorProps, alertProps, copyValue }) {
    //const {alertState, dispatchAlert} = alertProps;
    const { alertState } = alertProps;
    //the properties of the color are mapped for forwarding separate components

    const dataPropElems = currentColorProps.map(propElem => {
        return <ColorDetailsElem
            alertState={ alertState }
            { ...propElem }
            key={ propElem.attr.prop }
        />
    });

    return (
        <div id="color-details" onClick={copyValue}>
            <h4 className="color-sample-heading">Current Color:</h4>
            { dataPropElems }
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}