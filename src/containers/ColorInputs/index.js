import React from "react";
import "./ColorInputs.scss";
//components
import ColorRating from "../../components/ColorRating";

export default function ColorInputs ({ ratingProps }) {
    const {rating = 0, setRating = () => {}} = ratingProps;

    return (
        <div className="color-inputs-wrapper">
            <ColorRating rating={rating} setRating={setRating} />
            colorInputs
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}