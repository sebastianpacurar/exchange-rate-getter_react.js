import React, {Fragment} from 'react';
import {options} from "../utils/selectOptions";

const SelectCurrency = ({handleCurrencyOnChange, isDisabled, handleSwitchCurrencies}) => {

    return (
        <Fragment>

            {/* main currency */}
            <label
                htmlFor='from-currency' id='from-currency' className='grid-item'>From currency:
                <select onChange={handleCurrencyOnChange} name='main'>

                    {/*use slice to make the array start from 1, meaning that the first currency dropdown cannot be of label "None"*/}
                    {options.slice(1).map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

                </select>
            </label>

            {/*secondary (optional) currency*/}
            <label htmlFor='to-currency' id='to-currency' className='grid-item'>To currency:
                <select onChange={handleCurrencyOnChange} name='optional'>

                    {options.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

                </select>
            </label>

            <button
                id='switch-currencies'
                className='grid-item'
                disabled={isDisabled}
                onClick={handleSwitchCurrencies}
            >
                Switch Currencies
            </button>

        </Fragment>
    )
}

export default SelectCurrency;