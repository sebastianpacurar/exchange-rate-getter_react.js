import React, {Fragment} from 'react';
import {options} from "../utils/selectOptions";

const SelectCurrency = ({handleCurrencyOnChange, isDisabled, handleSwitchCurrencies}) => {

    return (
        <Fragment>

            {/* main currency */}
            <label
                htmlFor='from-currency' style={{marginLeft: '8px'}}>From currency:
                <select onChange={handleCurrencyOnChange} name='main' className='form'>

                    {/*use slice to make the array start from 1, meaning that the first currency dropdown cannot be of label "None"*/}
                    {options.slice(1).map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

                </select>
            </label>

            {/*secondary (optional) currency*/}
            <label htmlFor='to-currency' style={{marginLeft: '20px'}}>To currency:
                <select onChange={handleCurrencyOnChange} name='optional' className='form'>

                    {options.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}

                </select>
            </label>

            <button
                disabled={isDisabled}
                onClick={handleSwitchCurrencies}
            >
                Switch Currencies
            </button>

        </Fragment>
    )
}

export default SelectCurrency;