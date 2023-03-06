import React from "react";
import "./ColorDetailsElem.scss";

export default function ColorDetailsElem (props) {
    let {splittedStr, attr: {dataProp, copyable}, value} = props;

    return (
        <div className="color-details-elem">
            <span className="color-details-heading">{splittedStr + ": "}</span>
            <span data-prop={dataProp}
                  className={copyable ? "color-details-value copyable" : "color-details-value"}
                  title={copyable ? "copy..." : splittedStr}
            >
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
