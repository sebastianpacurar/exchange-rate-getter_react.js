import React, {Fragment} from 'react';

const DateInput = ({maxDate, handleOnChange}) => {
    return (
        <Fragment>

            {/* start date */}
            <label htmlFor='Start Date' className='form'>Start Date:
                <input
                    name='start'
                    type='date'
                    className='form'
                    min='2015-01-01'
                    max={maxDate}
                    onChange={handleOnChange}
                />
            </label>

            {/* end date */}
            <label htmlFor='End Date' className='form'>End Date:
                <input
                    name='end'
                    type='date'
                    className='form'
                    min='2015-01-01'
                    max={maxDate}
                    onChange={handleOnChange}
                />
            </label>
        </Fragment>
    );
}

export default DateInput;