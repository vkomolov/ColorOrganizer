import React from "react";
import { checkLocalAlert } from "../../utils/funcs";

import "./InputWrapper.scss";
import AlertBlock from "../AlertBlock";

export default function InputWrapper ({ inputParamsReady, inputHandles, alertState }) {
    const { type, name, title, required, value } = inputParamsReady;
    const { onBlurHandle, onInputHandle } = inputHandles;

    return (
        <div className="input-wrapper">
            {
                checkLocalAlert(alertState, name)
                && <AlertBlock {...alertState} />
            }
            <input type={type}
                   name={name}
                   title={title}
                   placeholder={value}
                   required={required}
                   autoComplete="off"
                   onBlur={onBlurHandle}
                   onInput={onInputHandle}
            />
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}