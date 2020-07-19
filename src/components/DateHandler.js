import React from 'react';

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

    textField: {
        minWidth: 250
    }

});


const DateHandler = ({maxDate, handleDateOnChange, handleIntervalOnChange, isIntervalChecked}) => {

    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
        >

            {/* start date*/}
            <Grid
                item={true}
                container
                xs={12}
                md={4}
                direction='column'
                justify='center'
                alignItems='center'
                spacing={1}
            >
                <Grid item={true}>
                    <InputLabel
                        htmlFor='start'
                        className={classes.label}
                    >
                        Start Date:
                    </InputLabel>
                </Grid>

                <Grid item={true}>

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

            </Grid>


            {/* end date */}
            <Grid
                item={true}
                container
                xs={12}
                md={4}
                direction='column'
                justify='center'
                alignItems='center'
                spacing={1}
            >
                <Grid item={true}>
                    <InputLabel
                        htmlFor='end'
                        className={classes.label}
                    >
                        End Date:
                    </InputLabel>
                </Grid>

                <Grid item={true}>

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

            </Grid>


            {/* Interval */}
            <Grid
                item={true}
                container
                xs={12}
                md={4}
                direction='column'
                justify='center'
                alignItems='center'
            >
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
    );
}


export default DateHandler;