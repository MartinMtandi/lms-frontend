import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(3)
    },
    paper: {
        padding: theme.spacing(2, 0),
        color: theme.palette.text.secondary,
    },
    action: {
        borderBottom: '1px solid #D1D5DB',
        padding: theme.spacing(0, 2, 2, 2),
    },
    product: {
        textAlign: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    description: {
        borderTop: '1px solid #D1D5DB',
        padding: theme.spacing(2, 2, 0, 2),
    }
}));

function DisplayProducts(props) {
  const classes = useStyles();

  const { products } = props;

  return (
    <div className={classes.root}>
        <Grid container spacing={3}>
            {(products) ? products.map(product => (
                <Grid item xs={3} key={product.id}>
                    <Paper className={classes.paper}>
                        <Box className={classes.action}>
                            <Typography>${Number(product.price).toFixed(2)}</Typography>
                            <Typography>Qty: {product.quantity}</Typography>
                        </Box>
                        <Box className={classes.product}>
                            <img src={product.product_image} alt={product.product_name} height="200" />
                        </Box>
                        <Box className={classes.description}>
                            <Typography variant="subtitle1" color="primary">{product.product_name}</Typography>
                            <Typography variant="caption">{product.agent}</Typography>
                        </Box>
                    </Paper>
                </Grid>
            )) :
        <Grid item xs={3}>
            <Paper className={classes.paper}>No products found</Paper>
        </Grid>}
        </Grid>
    </div>
  );
}

export default DisplayProducts;
