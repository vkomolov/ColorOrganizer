import React from "react";
import "./ColorInputs.scss";
//components
import ColorRating from "../../components/ColorRating";
import InputWrapper from "../../components/InputWrapper";

const colorInputsParams = [
    {
        type: "text",
        name: "color-name",
        title: "name the color...",
        required: true
    },
    {
        type: "text",
        name: "color-hex",
        title: "enter colorHex...",
        required: true
    },
    {
        type: "text",
        name: "color-rgb",
        title: "enter colorRGB...",
        required: true
    },
    {
        type: "color",
        name: "color-hex-palette",
        title: "choose from palette...",
        required: false
    },
];
// eslint-disable-next-line no-unused-vars
export default function ColorInputs ({ currentColorProps, alertProps, ratingProps }) {  //TODO: alertProps
    const {rating = 0, setRating = () => {}} = ratingProps;

    // eslint-disable-next-line no-unused-vars
    const findObjByPropInArray = (targetProp, targetValue, objArr) => {
        if (Array.isArray(objArr) && objArr.length) {
            const targetObj = objArr.find(obj => obj.attr[targetProp] === targetValue);
            //return targetObj || null;
            return targetObj ?? null;
        }
        return null;
    };

    const inputsArr = colorInputsParams.map((inputParams, index) => {
        //attaching the value of the input[name="file"] from "color-hex-palette" to "color-hex" value
        const inputName = inputParams.name === "color-hex-palette" ? "color-hex" : inputParams.name;
        let inputProp = inputName.split(/-/).map((namePart, index) => {
            return index !== 0 ? namePart[0].toUpperCase() + namePart.slice(1) : namePart;
        }).join("");

        const targetObj = findObjByPropInArray("prop", inputProp, currentColorProps);
        //if the param name is not found in the currentColorProps then to write value=""
        const value = (targetObj && targetObj.value) ? targetObj.value : "";
        const inputParamsReady = {
            ...inputParams,
            value
        };

        return <InputWrapper
            {...{ inputParamsReady }}
            key={"_" + index}
        />
    });

    return (
        <div className="input-section">
            <h4 className="color-inputs-heading">Change Color Settings:</h4>
            <ColorRating rating={rating} setRating={setRating} />
            <div className="color-inputs-wrapper">
                {
                    inputsArr
                }
            </div>
            <div className="button-section">
                <div className="button save">Save</div>
                <div className="button cancel">Cancel</div>
            </div>
        </div>
    );
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}
