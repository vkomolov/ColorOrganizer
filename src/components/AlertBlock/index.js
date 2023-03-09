import React from "react";

import "./AlertBlock.scss";

export default function AlertBlock({alertMode, alertMessage}) {

    //log(alertMode, "alertMode");

    const className = alertMode === "alert" ? "alert-message" : "alert-message error";

    return (
        <span className={className} >
                {alertMessage}
        </span>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}