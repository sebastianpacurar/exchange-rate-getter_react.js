import React, {Fragment} from "react";

const Interval = ({handleOnChange, isChecked}) => {
    return (
        <Fragment>
            <input
                type='checkbox'
                id='interval'
                name='interval'
                checked={isChecked}
                onChange={handleOnChange}
            />
            <label htmlFor='interval'> Interval</label>
        </Fragment>
    );
}

export default Interval;