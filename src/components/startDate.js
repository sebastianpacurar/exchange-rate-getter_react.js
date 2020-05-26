import React from "react";

const StartDate = ({maxDate, performOnChange}) => {
    return (
        <div>
            <label htmlFor='Start Date' className='form'>Start Date: </label>
            <input
                type='date'
                className='form'
                max={maxDate}
                onChange={performOnChange}
            />
        </div>
    );
}

export default StartDate;