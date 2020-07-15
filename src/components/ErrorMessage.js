import React from "react";

import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    errorMessage: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
    }
})

const ErrorDateMessage = ({value}) => {
    const classes = useStyles();

    return (
        <Typography
            variant='h5'
            className={classes.errorMessage}
        >
            {value}
        </Typography>
    );
}

export default ErrorDateMessage;