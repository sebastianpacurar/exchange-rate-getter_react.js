import React, {Fragment} from 'react';
import {options} from "../utils/selectOptions";

const SelectCurrency = ({handleCurrencyOnChange, isDisabled, handleSwitchCurrencies}) => {

    return (
        <Fragment>

            <label
                htmlFor='from-curr'
                id='from-currency'
                className='grid-item'
            >
                From currency:
                <select onChange={handleCurrencyOnChange} name='main'>

                    {/*use slice to make the array start from 1, meaning that the first currency dropdown cannot be of label "None"*/}
                    {options.slice(1).map((item, index) => (
                        <option
                            id='from-curr'
                            key={index}
                            value={item.value}
                            label={item.label}
                        />
                    ))}

                </select>
            </label>

            <label
                htmlFor='to-curr'
                id='to-currency'
                className='grid-item'
            >
                To currency:
                <select onChange={handleCurrencyOnChange} name='optional'>

                    {options.map((item, index) => (
                        <option
                            id='to-curr'
                            key={index}
                            value={item.value}
                            label={item.label}
                        />
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