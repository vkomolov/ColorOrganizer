import React from "react";
import { checkLocalAlert, limitText } from "../../utils/funcs";

import "./InputWrapper.scss";
import AlertBlock from "../AlertBlock";

export default function InputWrapper ({ inputParamsReady, inputHandles, alertState }) {
    const inputLengthMax = 16;
    const { type, name, title, required, value } = inputParamsReady;
    const { onBlurHandle, onInputHandle } = inputHandles;
    const valueAux = limitText(value, inputLengthMax);

    return (
        <div className="input-wrapper">
            {
                checkLocalAlert(alertState, name)
                && <AlertBlock {...alertState} />
            }
            <input type={ type }
                   name={ name }
                   title={ title }
                   placeholder={ valueAux }
                   maxLength={ inputLengthMax }
                   required={ required }
                   autoComplete="off"
                   onBlur={ onBlurHandle }
                   onInput={ onInputHandle }
            />
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}