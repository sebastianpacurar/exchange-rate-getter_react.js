import React from 'react';
import classNames from 'classnames';

// MaterialUI related
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles
} from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        flexGrow: 1
    },

    appBar: {
        alignItems: 'center',
    },

    bottom: {
        marginBottom: '25px'
    }
});

const AppHeader = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar
                position="static"
                className={classNames(classes.appBar, classes.bottom)}
                color='primary'
            >
                <Toolbar>

                    <Typography variant='h4' align='center'>
                        Exchange Rate Getter
                    </Typography>

                </Toolbar>
            </AppBar>
        </div>
    );
}


export default AppHeader;