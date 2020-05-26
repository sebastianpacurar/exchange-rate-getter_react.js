// The currency to which will be converted
import React from "react";

import {options} from '../utils/selectOptions'


const SelectOptionalCurrency = ({performOnChange}) => {

    return (
        <div><label className={"form"} htmlFor={"to-currency"}>To currency: </label>
            <select onChange={performOnChange}>
                {options.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectOptionalCurrency;