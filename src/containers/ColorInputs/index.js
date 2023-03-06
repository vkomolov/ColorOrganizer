import React from "react";
import "./ColorInputs.scss";
//components
import ColorRating from "../../components/ColorRating";

export default function ColorInputs ({ratingParams}) {
    const {rating = 0, callRating = () => {}} = ratingParams;

    //log(rating, "rating in ColorInputs:");

    return (
        <div className="color-inputs-wrapper">
            <ColorRating rating={rating} callRating={callRating} />
            colorInputs
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}