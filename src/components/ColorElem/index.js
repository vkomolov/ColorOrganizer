import React from "react";
import "./ColorElem.scss";
import ColorRating from "../ColorRating";
import { splitAndUpperCase, getContrastColor, hexToRgb } from "../../utils/funcs";

export default function ColorElem({ colorName, rating, colorHex }) {

    return (
        <div className="color-elem"
             style={{
                 backgroundColor: colorHex
             }}
        >
            <span
                className="color-elem-span"
                style={{color: getContrastColor(colorHex, hexToRgb)}}
            >
                { splitAndUpperCase(colorName) }
            </span>
            <ColorRating rating={rating} />
        </div>
    );
}