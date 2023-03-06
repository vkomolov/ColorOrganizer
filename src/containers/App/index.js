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

        this.state = {
           currentColor: {
               colorName: "default",
               colorHex: null,
               creationDate: Date.now(),
               rating: 0
           }
        };

        this.colors = [];
        this.callRating = this.callRating.bind(this);
    }
    //END OF CONSTRUCTOR

    callRating({target}) {
        const rating = target.dataset.num;
        //log(rating, "star rated:");
        this.setState(state => {
            let stateOut = Object.assign({}, state);
            if (state.currentColor.rating !== rating) {
                stateOut = {
                    currentColor: {
                        ...state.currentColor,
                        rating,
                    }
                };
            }

            //log(stateOut, "stateOut:");

            return stateOut;
        })
    }

    render() {
        const { colorName, colorHex, creationDate, rating } = this.state.currentColor;
        const colorRgb = colorHex ? hexToRgb(colorHex) : colorHex;
        //log(colorHex, "colorHex");
        //log(colorRgb, "colorRgb");

        //making the object in a certain order of the properties
        const colorProps = {
            colorName,
            colorHex,
            colorRgb,
            creationDate,
            rating
        };

        //log(Object.keys(colorProps), "Object.keys(colorProps)");

        const currentColorProps = Object.keys(colorProps).map(prop => {
            let splittedStr = prop.split(/(?=[A-Z])/)
                .map(str => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            })
                .join(" ");

            const copyable = prop === "colorName" || prop === "colorHex" || prop === "colorRGB";

            return {
                splittedStr,
                attr: {
                    prop,
                    copyable
                },
                value: prop === "creationDate"
                    ? new Date(colorProps[prop]).toLocaleDateString()
                    : colorProps[prop],   //value or null
            };
        });

        //log(currentColorProps, "currentColorProps");

        const ratingParams = {
            callRating: this.callRating,
            rating,
        };

        return (
            <React.Fragment>
                <AsideBar {...{ ratingParams }} {...{ currentColorProps }} />
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
