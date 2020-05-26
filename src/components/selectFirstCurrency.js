// The Currency From which will be converted
import React from "react";

import {options} from '../utils/selectOptions'


const SelectFirstCurrency = ({performOnChange}) => {
    return (
        <div><label className={"form"} htmlFor="from-currency">From currency: </label>
            <select onChange={performOnChange}>

                {/*use slice to make the array start from 1, meaning that the first currency dropdown cannot be of label "None"*/}
                {options.slice(1).map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    );
}

export default SelectFirstCurrency;