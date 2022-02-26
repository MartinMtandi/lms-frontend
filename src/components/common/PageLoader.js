import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import loader from '../../assets/Iphone-spinner-2.gif';

const styles = makeStyles((theme) => ({
    flex: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40px'
    }
}));

function PageLoader() {
    const classes = styles();

    return (
        <div className={classes.flex}>
            <img alt="loader" src={loader} style={{textAlign: 'center'}} />
        </div>
    )
}

export default PageLoader
