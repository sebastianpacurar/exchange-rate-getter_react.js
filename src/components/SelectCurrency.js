import React, {Fragment} from 'react';
import {options} from "../utils/selectOptions";

const SelectCurrency = ({handleOnChange}) => {

    return (
        <Fragment>

            {/* main currency */}
            <label className='form' htmlFor='from-currency'>From currency:</label>
            <select onChange={handleOnChange} name='main'>

                {/*use slice to make the array start from 1, meaning that the first currency dropdown cannot be of label "None"*/}
                {options.slice(1).map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}

            </select>

            {/*secondary (optional) currency*/}
            <label className='form' htmlFor='to-currency'>To currency:</label>
            <select onChange={handleOnChange} name='optional'>

                {options.map((item, index) => (
                    <option key={index} value={item.value}>{item.label}</option>
                ))}

            </select>
        </Fragment>
    )
}

export default SelectCurrency;