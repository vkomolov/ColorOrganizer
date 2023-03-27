import React from "react";
//containers
import AsideBar from "../AsideBar";
import ColorsBar from "../ColorsBar";

import { hexToRgb, equalCols, splitAndUpperCase } from "../../utils/funcs";
import { regExObj, testInput } from "../../utils/regExpParams"; //todo: to test inputs onInput

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this._defaultColor = {
            colorName: "Color Name",
            colorHex: "",
            creationDate: Date.now(),
            rating: 0
        };
        this._defaultAlert = {
            alertMode: null, //can be null, "alert", "error"
            alertSource: null,   //where to handle alert in absolute position
            alertMessage: null, //what will be shown in alert
        };

        this._refs = [];

        this.state = {
            colorState: {
                colorsArr: [
                    {
                        colorName: "Red Extra",
                        colorHex: "#d21e1e",
                        creationDate: 1679392604257,
                        rating: 0
                    },
                    {
                        colorName: "Blue",
                        colorHex: "#222cb9",
                        creationDate: 1679392603948,
                        rating: 2
                    },
                    {
                        colorName: "White Regular",
                        colorHex: "#ffffff",
                        creationDate: 1679392703322,
                        rating: 3
                    },
                ],
                currentColor: {
                    ...this._defaultColor,
                },
            },
            alertState: {
               ...this._defaultAlert
            },
            filters: [
                {
                    filterName: "rating",
                    isActive: true,
                },
                {
                    filterName: "colorName",
                    isActive: false,
                },
                {
                    filterName: "creationDate",
                    isActive: false,
                },
            ],
        };

        this.setRating = this.setRating.bind(this);
        this.dispatchAlert = this.dispatchAlert.bind(this);
        this.copyValue = this.copyValue.bind(this);
        this.resetAlert = this.resetAlert.bind(this);
        this.onBlurHandle = this.onBlurHandle.bind(this);
        this.onInputHandle = this.onInputHandle.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.onKeyDownHandle = this.onKeyDownHandle.bind(this);
        this.setRef = this.setRef.bind(this);

    }
    ////////////// END OF CONSTRUCTOR ///////////////////////

    componentDidMount() {
        if (this.state.colorState.colorsArr.length) {
            this.setState(prevState => ({
                colorState: {
                    ...prevState.colorState,
                    currentColor: {
                        ...prevState.colorState.colorsArr[0],
                    }
                }
            }));
        }

        const asideBar = document.querySelector(".aside-bar");
        const colorsBar = document.querySelector(".colors-bar");

        //for making DOM elems` height to be equal. Put them in array elemsArr adaptive styles for the screen with
        // less or equal 505px
        if (window.innerWidth >= 480) {
            equalCols(asideBar, colorsBar);
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
                //log(value, "copied:");

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
            //log(rating, "star rated:");
            const {colorState: {currentColor}} = this.state;

            if (rating !== currentColor.rating) {
                this.setState(prevState => ({
                    colorState: {
                        ...prevState.colorState,
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
                }, 700);
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
        //log(target.value, "target.value onBlurHandle:");
        this.inputValueCheck(target, regExObj, testInput, false);
    }

    /**
     *
     * @param target
     */
    onInputHandle({ target }) {
        this.inputValueCheck(target, regExObj, testInput, true);
    }

    setFilter({ target }) {
        if (!Array.from(target.classList).includes("active") && target.dataset.filter) {
            this.setState(prevState => {
                const filtersUpdated = prevState.filters.map(filter => {
                    const isActive = filter.filterName === target.dataset.filter;
                    return {
                        filterName: filter.filterName,
                        isActive
                    }
                });

                return {
                    filters: filtersUpdated
                }
            });
        }
    }

    onKeyDownHandle(event) {
        if (event.key === "Enter") {

            //log("key Enter pushed..");
            //log(event.target.name, "event.target.name");

            event.preventDefault();
            const refIndex = this._refs.findIndex(input => input.name === event.target.name);
            if (refIndex !== -1) {
                //log(refIndex, "refIndex from refs");
                const nextInputIndex = refIndex + 1;
                if (nextInputIndex < this._refs.length) {
                    this._refs[nextInputIndex].focus();
                }
            }
        }
    }

    setRef(ref) {
        this._refs = [
            ...this._refs,
            ref,
        ];
        //this._refs = this._refs.concat()

        //log(this._refs, "this._refs");
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
            let splittedStr = splitAndUpperCase(prop);

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
            onKeyDownHandle: this.onKeyDownHandle,
            setRef: this.setRef,
        };

        const { colorsArr } = this.state.colorState;

        const { filters } = this.state;

        return (
            <React.Fragment>
                <AsideBar
                    copyValue={ this.copyValue }
                    alertState={ this.state.alertState }
                    {...{ ratingProps }}
                    {...{ currentColorProps }}
                    {...{ inputHandles }}
                />
                <ColorsBar
                    setFilter={this.setFilter}
                    filters={filters}
                    colorsArr={colorsArr}
                />
            </React.Fragment>
        );
    }
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}
