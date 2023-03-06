import React from "react";
import ColorSample from "../../components/ColorSample";
import ColorInputs from "../ColorInputs";
import "./AsideBar.scss";


export default function AsideBar({ratingParams, currentColorProps}) {

    return (
        <div className="aside-bar">
            {/*//forwarding full props*/}
            <ColorSample {...{currentColorProps}} />
            <ColorInputs {...{ratingParams}}/>
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}