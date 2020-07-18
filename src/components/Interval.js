import React, {Fragment} from "react";

const Interval = ({handleOnChange, isChecked}) => {
    return (
        <Fragment>
            <label htmlFor='interval' id='interval-label' className='grid-item'>Interval:
                <input
                    type='checkbox'
                    name='interval'
                    checked={isChecked}
                    onChange={handleOnChange}
                />
            </label>
        </Fragment>
    );
}

export default Interval;