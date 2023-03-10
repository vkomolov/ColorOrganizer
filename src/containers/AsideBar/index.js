import React from "react";
import ColorSample from "../../components/ColorSample";
import ColorInputs from "../ColorInputs";
import "./AsideBar.scss";


export default function AsideBar({ copyValue, ratingProps, currentColorProps, alertProps }) {
    return (
        <div className="aside-bar">
            {/*//forwarding full props*/}
            <ColorSample
                {...{currentColorProps}}
                {...{alertProps}}
                copyValue={copyValue}
            />
            <ColorInputs
                {...{currentColorProps}}
                {...{alertProps}}
                {...{ ratingProps }}  />
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}