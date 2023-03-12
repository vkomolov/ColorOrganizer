
export const regExObj = {
    colorName: /^[A-Za-z0-9][A-Za-z0-9 ]{0,19}$/,
    colorHex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    colorRgb: /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
};

export const testInput = function(targetValue, dataSetValue, regExObj) {
    if (dataSetValue in regExObj) {
        const regEx = regExObj[dataSetValue];
        return regEx.test(targetValue);
    }

    console.error(`no ${dataSetValue} in regExpObj...`);
    return null;
};

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}