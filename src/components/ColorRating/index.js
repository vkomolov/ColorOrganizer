import React from "react";

import "./ColorRating.scss";

export default function ColorRating ({rating, callRating}) {
    const starList = [];

    for (let i = 1; i <= 5; i++) {
        let classNameAux = i <= rating ? "star selected" : "star";

        starList.push(
            <span
                className={classNameAux}
                data-num = {i}
                key={i+"star"}
            />
        )
    }

    return (
        <div
            className="color-rating"
            title="Rate the color"
            onClick={callRating}
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