import React from "react";
import "./ColorSample.scss";

//components
import ColorDetails from "../ColorDetails";


export default function ColorSample (props) {
    const { currentColorProps } = props;
    const getCurrentColorHex = (currentColorProps) => {
        for (let i = 0; i < currentColorProps.length; i++) {
            if(currentColorProps[i].attr.prop === "colorHex") {
                return currentColorProps[i].value;
            }
        }
        return "initial";
    };
    const currentColorHex = getCurrentColorHex(currentColorProps);

    return (
        <div className="color-sample"
             style={{
                 backgroundColor: currentColorHex
             }}
        >
            {/*//forwarding props :))*/}
            <ColorDetails {...props} currentColorHex={currentColorHex} />
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}