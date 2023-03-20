import React from "react";

import "./ColorRating.scss";

export default function ColorRating ({rating, setRating = null}) {
    const starList = [];
    let wrapperClassName = setRating ? "color-rating" : "color-rating min";

    for (let i = 1; i <= 5; i++) {
        let classNameAux = setRating ? "star" : "star min";
        let classNameOut = i <= rating ? classNameAux + " selected" : classNameAux;

        starList.push(
            <span
                className={classNameOut}
                data-num = {i}
                key={i+"star"}
            />
        )
    }

    return (
        <div
            className={ wrapperClassName }
            title="Rate the color"
            onClick={setRating}
        >
            { starList }
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}