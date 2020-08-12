import React from 'react';

// MaterialUI related
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from "@material-ui/core/Box";


const useStyles = makeStyles(theme => ({

    label: {
        color: 'black',
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(2),
        }
    },

    textField: {
        minWidth: 250
    }

}));


const DateHandler = ({maxDate, handleDateOnChange, handleIntervalOnChange, isIntervalChecked}) => {

    const classes = useStyles();

    return (
        <Grid
            container
            direction='row'
            justify='space-around'
            spacing={1}
        >

            {/* start date*/}
            <Grid item>
                <InputLabel
                    htmlFor='start'
                    className={classes.label}
                >
                    Start Date:
                </InputLabel>


                <TextField
                    name='start'
                    className={classes.textField}
                    id='start'
                    type='date'
                    defaultValue={maxDate}
                    inputProps={{min: '2015-01-01', max: `${maxDate}`}}
                    onChange={handleDateOnChange}
                />

            </Grid>


            {/* end date */}
            <Grid item>
                <InputLabel
                    htmlFor='end'
                    className={classes.label}
                >
                    End Date:
                </InputLabel>

                <TextField
                    name='end'
                    className={classes.textField}
                    id='end'
                    type='date'
                    defaultValue={maxDate}
                    inputProps={{min: '2015-01-01', max: `${maxDate}`}}
                    onChange={handleDateOnChange}
                />
            </Grid>


            {/* Interval */}
            <Grid item>
                <Box minWidth={250} display='flex' justifyContent='center'>
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
                </Box>
            </Grid>

        </Grid>
    );
}


export default DateHandler;