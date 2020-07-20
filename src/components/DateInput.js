import React, {Fragment} from 'react';

const DateInput = ({maxDate, handleOnChange}) => {
    return (
        <Fragment>

            {/* start date */}
            <label htmlFor='Start Date' id='start-date' className='grid-item'>Start Date:
                <input
                    name='start'
                    type='date'
                    min='2015-01-01'
                    max={maxDate}
                    onChange={handleOnChange}
                />
            </label>

            {/* end date */}
            <label htmlFor='End Date' id='end-date' className='grid-item'>End Date:
                <input
                    name='end'
                    type='date'
                    min='2015-01-01'
                    max={maxDate}
                    defaultValue={maxDate}
                    onChange={handleOnChange}
                />
            </label>
        </Fragment>
    );
}

export default DateInput;