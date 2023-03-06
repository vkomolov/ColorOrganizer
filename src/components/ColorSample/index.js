import React from "react";
//components
import ColorDetails from "../ColorDetails";
import "./ColorSample.scss";

export default function ColorSample (props) {
    const backgroundColor = props.currentColorProps.colorHex
        ? props.currentColorProps.colorHex
        : "initial";

    return (
        <div className="color-sample"
             style={{
                 backgroundColor,
             }}
        >
            {/*//forwarding props :))*/}
            <ColorDetails {...props} />
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}