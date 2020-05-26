import React from "react";

const EndDate = ({maxDate, performOnChange}) => {
    return (
        <div>
            <label htmlFor='End Date' className='form'>End Date: </label>
            <input
                type='date'
                className='form'
                max={maxDate}
                onChange={performOnChange}
            />
        </div>
    );
}

export default EndDate;