import React from "react";
//containers
import AsideBar from "../AsideBar";
import ColorsBar from "../ColorsBar";
//import {rgbToHex, getContrastColor} from "../../utils/funcs";
import {hexToRgb} from "../../utils/funcs";

import "./App.scss";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this._defaultColor = {
            colorName: "white",
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
                colorsArr: [],
                currentColor: {
                    ...this._defaultColor
                },
            },
            alertState: {
               ...this._defaultAlert
            }
        };

        this.setRating = this.setRating.bind(this);
        this.dispatchAlert = this.dispatchAlert.bind(this);
        this.copyValue = this.copyValue.bind(this);
        //this.resetAlert - this.resetAlert.bind(this);
    }
    //END OF CONSTRUCTOR

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
     * */
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
     * */
    dispatchAlert(message, source, mode = "alert") { //null, "alert", "error"
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
     * **/
    resetAlert() {
        this.setState({
            alertState: {
                ...this._defaultAlert
            }
        });
    }

    render() {
        log("render");
        const { colorName, colorHex, creationDate, rating } = this.state.colorState.currentColor;
        const colorRgb = colorHex ? hexToRgb(colorHex) : colorHex;

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

        const alertProps = {
            alertState: this.state.alertState,
            dispatchAlert: this.dispatchAlert,
        };

        const ratingProps = {
            rating,
            setRating: this.setRating,
        };

        return (
            <React.Fragment>
                <AsideBar
                    copyValue={ this.copyValue }
                    {...{ ratingProps }}
                    {...{ currentColorProps }}
                    {...{ alertProps }}
                />
                <ColorsBar />

                {/*<div className="aside-bar">
                    <div className="color-wrapper current">
                        ColorSample
                        <div className="color-sample"
                             style={{
                                 backgroundColor,
                             }}
                        >
                            <ColorDetails
                                copyCallBack={this.copyValue}
                                {...{currentColorProps}}
                            />
                        </div>
                        <div className="color-inputs-wrapper">
                            <div className="input-wrapper">
                                <input type="text"
                                       name="color-name"
                                       title="name the color..."
                                       placeholder = {colorProps.colorName}
                                       required
                                />
                            </div>
                            <div className="input-wrapper">
                                <input type="text"
                                       name="color-hex"
                                       title="enter color hex..."
                                       placeholder = {colorProps.colorHex}
                                />
                            </div>
                            <div className="input-wrapper">
                                <input type="text"
                                       name="color-rgb"
                                       title="enter color rgb..."
                                       placeholder = {colorProps.colorRGB}
                                />
                            </div>
                            <div className="input-wrapper">
                                <input type="color"
                                       name="color-pattern"
                                       title="Choose Color"
                                       required
                                />
                            </div>
                            <div className="color-rating" title="Rate the color">
                                <span className="star selected"></span>
                                <span className="star selected"></span>
                                <span className="star selected"></span>
                                <span className="star"></span>
                                <span className="star"></span>
                            </div>
                            <button className="button submit">Submit</button>
                        </div>
                    </div>
                </div>*/}
                {/*<div className="colors-bar">
                    <div className="color-list-wrapper">
                        <h4>TOP of the colors rated:</h4>
                        <div className="filter-wrapper">
                            <span>Sort By: </span>
                            <span className="filter">Rating</span>
                            <span className="filter">Name</span>
                        </div>
                        <div className="color-list">
                            <div className="color-wrapper">
                                <div className="color-sample">
                                    <span className="color-title">Color Item</span>
                                </div>
                                <div className="color-rating">
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                </div>
                            </div>
                            <div className="color-wrapper">
                                <div className="color-sample">
                                    <span className="color-title">Color Item</span>
                                </div>
                                <div className="color-rating">
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                </div>
                            </div>
                            <div className="color-wrapper">
                                <div className="color-sample">
                                    <span className="color-title">Color Item</span>
                                </div>
                                <div className="color-rating">
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                </div>
                            </div>
                            <div className="color-wrapper">
                                <div className="color-sample">
                                    <span className="color-title">Color Item</span>
                                </div>
                                <div className="color-rating">
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                </div>
                            </div>
                            <div className="color-wrapper">
                                <div className="color-sample">
                                    <span className="color-title">Color Item</span>
                                </div>
                                <div className="color-rating">
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                </div>
                            </div>
                            <div className="color-wrapper">
                                <div className="color-sample">
                                    <span className="color-title">Color Item</span>
                                </div>
                                <div className="color-rating">
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                </div>
                            </div>
                            <div className="color-wrapper">
                                <div className="color-sample">
                                    <span className="color-title">Color Item</span>
                                </div>
                                <div className="color-rating">
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                </div>
                            </div>
                            <div className="color-wrapper">
                                <div className="color-sample">
                                    <span className="color-title">Color Item</span>
                                </div>
                                <div className="color-rating">
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star selected"></span>
                                    <span className="star"></span>
                                    <span className="star"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </React.Fragment>
        );
    }
}


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}
