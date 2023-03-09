import React from "react";
import "./ColorDetailsElem.scss";

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
    } = props;

    const { alertSource, ...alertData } = alertState;
    const checkLocalAlert = function (alertState, localSource) {
        const ifHasValue = Object.values(alertState).every(el => {
            return el !== null;
        });

        return ifHasValue ? alertSource === localSource : false;
    };

    return (
        <div className="color-details-elem">
            <span className="color-details-heading">{splittedStr + ": "}</span>
            <span data-src={prop}
                  className={copyable ? "color-details-value copyable" : "color-details-value"}
                  title={copyable ? "copy..." : splittedStr}
            >
                {
                    checkLocalAlert(alertState, prop)
                    && <AlertBlock {...alertData} />
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
