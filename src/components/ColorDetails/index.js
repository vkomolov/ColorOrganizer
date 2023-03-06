import React from "react";
import "./ColorDetails.scss";
//components
import ColorDetailsElem from "../ColorDetailsElem";

export default function ColorDetails ({ currentColorProps }) {
    //the properties of the color are mapped for forwarding separate components
    const dataPropElems = currentColorProps.map(propElem => {
        return <ColorDetailsElem { ...propElem } key={propElem.attr.prop} />
    });

    async function copyValue({target}) {
        if (target.classList.contains("copyable")) {
            const value = target.textContent;

            try {
                await navigator.clipboard.writeText(value);
                log(value, "copied:");
                target.classList.toggle("copied");
                setTimeout(() => target.style.opacity = 1, 0);

                setTimeout(() => target.classList.toggle("copied"), 1000);
            }
            catch(err) {
                console.error("Error in copying text: ", err);
            }
        }
    }

    return (
        <div id="color-details" onClick={copyValue}>
            { dataPropElems }
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}