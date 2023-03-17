import React from "react";
import "./ColorDetailsElem.scss";
import { checkLocalAlert, getContrastColor } from "../../utils/funcs";

import AlertBlock from "../AlertBlock";

export default function ColorDetailsElem (props) {
    const {
        splittedStr,
        attr: {
            prop,
            copyable
        },
        value,
        alertState,
        currentColorHex
    } = props;

    const color = getContrastColor(currentColorHex);

    return (
        <div className="color-details-elem" >
            <span
                className="color-details-heading"
                style={{color: color}}
            >
                {splittedStr + ": "}
            </span>
            <span
                data-src={prop}
                className={copyable ? "color-details-value copyable" : "color-details-value"}
                style={{color: color}}
                title={copyable ? "copy..." : splittedStr}
            >
                {
                    checkLocalAlert(alertState, prop)
                    && <AlertBlock {...alertState} />
                }
                {value}
            </span>
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}
