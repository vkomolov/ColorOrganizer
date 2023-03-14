
export const regExObj = {
    "color-name": {
        regExOnBlur: /^[a-z0-9_]{1,9}\s?[a-z0-9_]{0,9}$/i,
        regExOnInput: /^[a-z0-9_]{0,9}\s?[a-z0-9_]{0,9}$/i,
        errorMessage: "only latin char, number or space"
    },
    "color-hex": {
        regExOnBlur: /^#([a-f0-9]{6}|[A-Fa-f0-9]{3})$/i,
        regExOnInput: /^#[a-f0-9]{0,6}$/i,
        errorMessage: "example: #ffffff or #fff"
    },
    "color-rgb": {
        regExOnBlur: /^rgb\((\d{1,3}),?\s?(\d{1,3}),?\s?(\d{1,3})\)$/i,
        regExOnInput: /^(rg?b?)(?<=rg?b?)\(?\d{0,3}(?=\D|$),?\s?\d{0,3}(?=\D|$),?\s?\d{0,3}(?=\D|$)\s?\)?$/i,
        errorMessage: "example: rgb(255, 255, 255)"
    }
};

/**
 *
 * @param targetValue
 * @param inputName
 * @param regExObj
 * @param bySymbol
 * @returns {null|*}
 */
export function testInput(targetValue, inputName, regExObj, bySymbol = false) {
    if (inputName in regExObj) {
        const regExProp = bySymbol ? regExObj[inputName]["regExOnInput"] : regExObj[inputName]["regExOnBlur"];

        return regExProp.test(targetValue);
    }

    console.error(`no ${inputName} in regExpObj...`);
    return null;
}



///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}