import React from "react";
//containers
import AsideBar from "../AsideBar";
import ColorsBar from "../ColorsBar";

import { hexToRgb } from "../../utils/funcs";
import { regExObj, testInput } from "../../utils/regExpParams"; //todo: to test inputs onInput

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this._defaultColor = {
            colorName: "White",
            colorHex: "#ffffff",
            creationDate: Date.now(),
            rating: 0
        };
        this._defaultAlert = {
            alertMode: null, //can be null, "alert", "error"
            alertSource: null,   //where to handle alert in absolute position
            alertMessage: null, //what will be shown in alert
        };

        this.state = {
            colorState: {
                colorsArr: [
                    {
                        colorName: "White",
                        colorHex: "#ffffff",
                        creationDate: Date.now(),
                        rating: 0
                    },
                    {
                        colorName: "Blue",
                        colorHex: "#222cb9",
                        creationDate: Date.now(),
                        rating: 0
                    },
                    {
                        colorName: "Red",
                        colorHex: "#d21e1e",
                        creationDate: Date.now(),
                        rating: 0
                    },
                ],
                currentColor: {
                    ...this._defaultColor,
                },
            },
            alertState: {
               ...this._defaultAlert
            }
        };

        this.setRating = this.setRating.bind(this);
        this.dispatchAlert = this.dispatchAlert.bind(this);
        this.copyValue = this.copyValue.bind(this);
        this.resetAlert = this.resetAlert.bind(this);
        this.onBlurHandle = this.onBlurHandle.bind(this);
        this.onInputHandle = this.onInputHandle.bind(this);
    }
    ////////////// END OF CONSTRUCTOR ///////////////////////

    componentDidMount() {
        if (this.state.colorState.colorsArr.length) {
            this.setState({
                colorState: {
                    currentColor: {
                        ...this.state.colorState.colorsArr[0]
                    }
                }
            });
        }
    }

    /**
     *
     * **/
    async copyValue({ target }) {
        if (target.classList.contains("copyable")) {
            const value = target.textContent;
            const targetSrc = target.getAttribute("data-src");

            try {
                await navigator.clipboard.writeText(value);
                log(value, "copied:");

                this.dispatchAlert("copied...", targetSrc, "alert");
            }
            catch(err) {
                console.error("Error in copying text: ", err);
            }
        }
    }

    /**
     *
     * @param target
     */
    setRating({target}) {
        if (target.dataset.num) {
            const rating = target.dataset.num;
            log(rating, "star rated:");
            const {colorState: {currentColor}} = this.state;

            if (rating !== currentColor.rating) {
                this.setState(prevState => ({
                    colorState: {
                        currentColor: {
                            ...prevState.colorState.currentColor,
                            rating
                        }
                    }
                }));
            }
        }
    }

    /**
     *
     * @param message
     * @param source
     * @param mode
     */
    dispatchAlert(message, source, mode = "alert") { //null, "alert", "error"
        //if no alert on, then to set alert state
        if (this.state.alertState.alertMode === null) {
            this.setState({
                alertState: {
                    alertMode: mode,
                    alertSource: source,
                    alertMessage: message
                }
            });

            if (mode === "alert") {
                setTimeout(() => {
                    this.resetAlert();
                }, 1500);
            }
        }
    }

    /**
     *
     */
    resetAlert() {
        this.setState({
            alertState: {
                ...this._defaultAlert
            }
        });
    }

    /**
     *
     */
    inputValueCheck( target, regExObj, testInput, bySymbol=false ) {
        if (regExObj[target.name] && target.value.length) {
            if (!testInput(target.value, target.name, regExObj, bySymbol)) {
                this.dispatchAlert(regExObj[target.name].errorMessage, target.name, "error");
                setTimeout(() => {
                    if (bySymbol) {
                        target.value = target.value.slice(0, -1);
                    } else {
                        target.value = "";
                    }

                    if (!target.value.length) {
                        setTimeout(() => this.resetAlert(), 1000);
                    }
                }, 500);
            }
            else {
                this.resetAlert();

            }
        }
    }

    /**
     ***/
    onBlurHandle({ target }) {
        log(target.value, "target.value onBlurHandle:");
        this.inputValueCheck(target, regExObj, testInput, false);
    }

    onInputHandle({ target }) {
        this.inputValueCheck(target, regExObj, testInput, true);
    }

    render() {
        log("rendering");
        const { colorName, colorHex, creationDate, rating } = this.state.colorState.currentColor;
        const colorRgb = colorHex ? hexToRgb(colorHex) : "";

        //making the object in a certain order of the properties
        const colorProps = {
            colorName,
            colorHex,
            colorRgb,
            creationDate,
            rating
        };

        const currentColorProps = Object.keys(colorProps).map(prop => {
            let splittedStr = prop.split(/(?=[A-Z])/)
                .map(str => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            })
                .join(" ");

            const copyable = prop === "colorName" || prop === "colorHex" || prop === "colorRgb";
            let auxValue = colorProps[prop];
            if (prop === "creationDate") {
                auxValue = new Date(colorProps[prop]).toLocaleDateString();
            }
            if (prop === "rating") {
                auxValue += " stars...";
            }

            return {
                splittedStr,
                attr: {
                    prop,
                    copyable
                },
                value: auxValue
            };
        });

        const ratingProps = {
            rating,
            setRating: this.setRating,
        };

        const inputHandles = {
            onBlurHandle: this.onBlurHandle,
            onInputHandle: this.onInputHandle,
        };

        return (
            <React.Fragment>
                <AsideBar
                    copyValue={ this.copyValue }
                    alertState={ this.state.alertState }
                    {...{ ratingProps }}
                    {...{ currentColorProps }}
                    {...{ inputHandles }}
                />
                <ColorsBar />
            </React.Fragment>
        );
    }
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}
