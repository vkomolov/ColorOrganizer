import React from "react";

import "./InputWrapper.scss";

export default function InputWrapper ({ inputParamsReady }) {
    const { type, name, title, required, value } = inputParamsReady;

    return (
        <div className="input-wrapper">
            <input type={type}
                   name={name}
                   title={title}
                   placeholder={value}
                   required={required}
                   autoComplete="off"
            />
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}