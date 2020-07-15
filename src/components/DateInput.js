import React, {Fragment} from 'react';

const DateInput = ({maxDate, handleOnChange}) => {
    return (
        <Fragment>

            {/* start date */}
            <label htmlFor='Start Date' className='form'>Start Date: </label>
            <input
                name='start'
                type='date'
                className='form'
                min='2015-01-01'
                max={maxDate}
                onChange={handleOnChange}
            />

            {/* end date */}
            <label htmlFor='End Date' className='form'>End Date: </label>
            <input
                name='end'
                type='date'
                className='form'
                min='2015-01-01'
                max={maxDate}
                onChange={handleOnChange}
            />
        </Fragment>
    );
}

export default DateInput;