/**
 *
 * @param hexColor
 * @returns {string}
 */

export function getContrastColor(hexColor) {
    // rendering hex-value to RGB
    const rgbColor = hexToRgb(hexColor, true);
    // calculating the brightness of the color
    const brightness = Math.round(((rgbColor.r * 299) + (rgbColor.g * 587) + (rgbColor.b * 114)) / 1000);

    // выбираем цвет текста, контрастирующий с фоном
    return (brightness > 128) ? "#000000" : "#FFFFFF";
}

/**
 *
 * @param hexColor
 * @returns {string}
 */
export function hexToRgb(hexColor, objectOut = false) {
    //const hex = hexColor.replace("#", "");
    //Removing the # character from the passed value
    const hex = hexColor.slice(1);

    //Splitting the value into red, green and blue channels
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    if(objectOut) {
        return { r, g, b };
    }

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
 * it receives the DOM elements, measure the heights of them and makes all the elements to be of the same height;
 * @param {...Object} elemsArr of the HTMLElements
 */
export function equalCols(...elemsArr) {   //for making DOM elems` height to be equal. Put them in array elemsArr
                                           //adaptive styles for the screen with less or equal 875px
    if (window.innerWidth <= 875) {
        return;
    }
    let highestCal = 0;

    for (let i = 0; i < elemsArr.length; i++) {
        /**resetting the heights of the elements to 'auto' after rerendering the elements**/
        elemsArr[i].style.height = "auto";

        if (elemsArr[i].offsetHeight > highestCal) {
            highestCal = elemsArr[i].offsetHeight;
        }
    }
    for (let i = 0; i < elemsArr.length; i++) {
        elemsArr[i].style.height = highestCal + "px";
    }
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}