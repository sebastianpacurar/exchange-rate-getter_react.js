import React from 'react';
import {options} from '../utils/selectOptions';

// MaterialUI related
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles(theme => ({

    formControl: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        minWidth: 250,
    },
}));

const SelectCurrency = ({handleOnChange, isDisabled, handleSwitchCurrencies}) => {

    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
        >

            {/* main currency */}
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

                <FormControl variant='filled' className={classes.formControl}>
                    <InputLabel htmlFor='from-currency'>From Currency</InputLabel>
                    <Select
                        name='main'
                        onChange={handleOnChange}
                        defaultValue='AUD'
                    >
                        {options.slice(1).map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* optional currency */}
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

                <FormControl variant='filled' className={classes.formControl}>
                    <InputLabel htmlFor='to-currency'>To Currency</InputLabel>
                    <Select
                        name='optional'
                        onChange={handleOnChange}
                    >
                        {options.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </Grid>

            {/* switch currencies button */}
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

                <FormControl variant='filled' className={classes.formControl}>
                    <Button
                        variant='outlined'
                        color='primary'
                        className='grid-item'
                        disabled={isDisabled}
                        onClick={handleSwitchCurrencies}
                    >
                        Switch Currencies
                    </Button>
                </FormControl>

            </Grid>
        </Grid>
    )
}


export default SelectCurrency;