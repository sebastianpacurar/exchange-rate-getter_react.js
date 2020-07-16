import React, {Fragment} from "react";

const Interval = ({handleOnChange, isChecked}) => {
    return (
        <Fragment>
            <label htmlFor='interval' className='form'>Interval:
                <input
                    type='checkbox'
                    id='interval'
                    name='interval'
                    className='form'
                    checked={isChecked}
                    onChange={handleOnChange}
                />
            </label>
        </Fragment>
    );
}

export default Interval;