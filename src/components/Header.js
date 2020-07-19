import React from 'react';
import classNames from 'classnames';

// MaterialUI related
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';


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
        <Grid container>
            <Grid item xs={12}>
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
            </Grid>
        </Grid>
    );
}


export default AppHeader;