import React from "react";
import ColorSample from "../ColorSample";
import ColorInputs from "../ColorInputs";
import "./AsideBar.scss";


export default function AsideBar({ copyValue, ratingProps, currentColorProps, alertState, inputHandles }) {
    return (
        <div className="aside-bar">
            {/*//forwarding full props*/}
            <ColorSample
                {...{currentColorProps}}
                copyValue={copyValue}
                alertState={alertState}
            />
            <ColorInputs
                {...{currentColorProps}}
                {...{ ratingProps }}
                {...{ inputHandles }}
                alertState={alertState}
            />
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}