import React from "react";

const Interval = ({performOnChange, isChecked}) => {
    return (
        <div>
            <input
                type='checkbox'
                id='interval'
                name='interval'
                checked={isChecked}
                onChange={performOnChange}
            />
            <label htmlFor='interval'> Interval</label>
        </div>
    );
}

export default Interval;