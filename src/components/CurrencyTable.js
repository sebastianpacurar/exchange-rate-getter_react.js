import React from 'react';

// MaterialUI related
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@material-ui/core';


const useStyles = makeStyles({

    'table': {
        minWidth: 650,
    },

    'head': {
        backgroundColor: 'orange',
    },


    'bordered': {
        border: 'solid lightgrey 1px'
    },

    'rowColor': {
        '&:nth-of-type(odd)': {
            backgroundColor: '#E8E8E8',
        }
    }
});


const CurrencyTable = ({currencies, mainCurrency}) => {


    const classes = useStyles();

    return (
        <TableContainer>
            <Table
                className={classes.table}
                size='small'
            >
                <TableHead>
                    <TableRow className={classes.head}>

                        <TableCell align='center' className={classes.bordered}>
                            <Typography variant='h5'>Currency Code</Typography>
                        </TableCell>
                        <TableCell align='center' className={classes.bordered}>
                            <Typography variant='h5'>1 {mainCurrency} equals to</Typography>
                        </TableCell>
                        <TableCell align='center' className={classes.bordered}>
                            <Typography variant='h5'>Date</Typography>
                        </TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>

                    {currencies.map((item, index) => (
                        <TableRow
                            key={`row-${index}`}
                            className={classes.rowColor}
                            hover
                        >
                            <TableCell align='center' className={classes.bordered}>
                                <Typography variant='h6'>{item.currency}</Typography>
                            </TableCell>
                            <TableCell align='center' className={classes.bordered}>
                                <Typography variant='h6'>{item.value}</Typography>
                            </TableCell>
                            <TableCell align='center' className={classes.bordered}>
                                <Typography variant='h6'>{item.date}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CurrencyTable;

