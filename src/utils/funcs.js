/**
 *
 * @param hexColor
 * @returns {string}
 */
export function getContrastColor(hexColor) {
    // преобразуем hex-значение цвета в RGB-значение
    const rgbColor = hexToRgb(hexColor);

    // вычисляем яркость цвета по формуле
    const brightness = Math.round(((rgbColor.r * 299) + (rgbColor.g * 587) + (rgbColor.b * 114)) / 1000);

    // выбираем цвет текста, контрастирующий с фоном
    return (brightness > 128) ? "#000000" : "#FFFFFF";
}

/**
 *
 * @param hexColor
 * @returns {string}
 */
export function hexToRgb(hexColor) {
    //const hex = hexColor.replace("#", "");
    //Removing the # character from the passed value
    const hex = hexColor.slice(1);

    //Splitting the value into red, green and blue channels
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    //return { r, g, b };
    return `rgb(${r},${g},${b})`;
}

/**
 *
 * @param rgb
 * @returns {string}
 */
export function rgbToHex(rgb) {
    //Splitting the value into red, green and blue channels
    const r = parseInt(rgb.substring(4, rgb.indexOf(",")));
    const g = parseInt(rgb.substring(rgb.indexOf(",") + 2, rgb.lastIndexOf(",")));
    const b = parseInt(rgb.substring(rgb.lastIndexOf(",") + 2, rgb.length - 1));

    // Convert channels to hexadecimal value and concatenate to string
    const hexR = r.toString(16).padStart(2, "0");
    const hexG = g.toString(16).padStart(2, "0");
    const hexB = b.toString(16).padStart(2, "0");

    // Возвращение значения в формате #hash color
    return "#" + hexR + hexG + hexB;
}

/**
 *
 * @param alertState
 * @param localSource
 * @returns {boolean}
 */
export function checkLocalAlert(alertState, localSource) {
    //checking for alertState to be not empty
    const { alertSource } = alertState;
    const ifHasValue = Object.values(alertState).every(el => {
        return el !== null;
    });

    return ifHasValue ? alertSource === localSource : false;
}

/**
 *
 * @param targetValue
 * @param inputName
 * @param regExObj
 * @returns {null|*}
 */
export const testInput = function(targetValue, inputName, regExObj) {
    if (inputName in regExObj) {
        const { regEx } = regExObj[inputName];

        return regEx.test(targetValue);
    }

    console.error(`no ${inputName} in regExpObj...`);
    return null;
};