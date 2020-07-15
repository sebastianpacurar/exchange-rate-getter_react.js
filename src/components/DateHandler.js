import React, {Fragment} from 'react';

// MaterialUI related
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import makeStyles from '@material-ui/core/styles/makeStyles';


const useStyles = makeStyles({

    label: {
        color: 'black',
    },

});


const DateHandler = ({maxDate, handleDateOnChange, handleIntervalOnChange, isIntervalChecked}) => {

    const classes = useStyles();

    return (
        <Fragment>

            <Grid container spacing={5} direction='row'>
                <Grid item={true} xs={12} md={4}>

                    {/* start date */}
                    <InputLabel
                        htmlFor='start'
                        className={classes.label}
                    >
                        Start Date:
                    </InputLabel>

                    <TextField
                        name='start'
                        id='start'
                        type='date'
                        inputProps={{min: '2015-01-01', max: `${maxDate}`}}
                        onChange={handleDateOnChange}
                    />

                </Grid>

                {/* end date */}
                <Grid item={true} xs={12} md={4}>
                    <InputLabel
                        htmlFor='end'
                        className={classes.label}
                    >
                        End Date:
                    </InputLabel>

                    <TextField
                        name='end'
                        id='end'
                        type='date'
                        inputProps={{min: '2015-01-01', max: `${maxDate}`}}
                        onChange={handleDateOnChange}
                    />

                </Grid>

                {/* Interval */}
                <Grid item={true} xs={12} md={4}>
                    <FormControlLabel
                        control={

                            <Checkbox
                                color="primary"
                                checked={isIntervalChecked}
                                onChange={handleIntervalOnChange}
                            />

                        }
                        label="Interval:"
                        labelPlacement="top"
                        className={classes.label}
                    />

                </Grid>
            </Grid>

        </Fragment>
    );
}


export default DateHandler;