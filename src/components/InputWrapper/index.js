import React from 'react';

import "./InputWrapper.scss";

export default function InputWrapper () {
    return (
        <div className="input-wrapper">
            <input type="text"
                   name="color-name"
                   title="name the color..."
                   /*placeholder = {colorProps.colorName}*/
                   required
            />
        </div>
    );
}