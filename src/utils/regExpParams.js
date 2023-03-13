
export const regExObj = {
    "color-name": {
        regEx: /^[A-Za-z0-9][A-Za-z0-9 ]{0,19}$/,
        errorMessage: "only latin char, number or space"
    },
    "color-hex": {
        regEx: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        errorMessage: "example: #ffffff"
    },
    "color-rgb": {
        regEx: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        errorMessage: "example: rgb(255,255,255)"
    }
};



///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}