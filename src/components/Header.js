import React from 'react';

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
    }
});

const AppHeader = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar
                position="static"
                className={classes.appBar}
                color='primary'
                gutterBottom
            >
                <Toolbar>

                    <Typography variant='h4' align='center'>
                        Currency Values generator
                    </Typography>

                </Toolbar>
            </AppBar>
        </div>
    );
}


export default AppHeader;