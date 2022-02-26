import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextfieldWrapper from '../common/FormUI/Textfield';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import * as actions from '../../store/actions';

const useStyles = makeStyles((theme) => ({
    productContainer: {
        marginTop: theme.spacing(3),
        alignItems: 'center',
    },
    card: {
        borderBottom: '1px solid #CCC'
    },
    title: {
        fontWeight: '600',
        fontSize: '20px'
    },
    product: {
        fontWeight: '500',
        fontSize: '18px'
    },
    price: {
        fontSize: '20px',
        padding: theme.spacing(1, 0, 1, 0)
    },
    controls: {
        marginTop: theme.spacing(2),
        alignItems: 'center'
    },
    quantity: {
        border: '1px solid #FBBF24',
        backgroundColor: '#FBBF24',
        color: '#fff',
        fontWeight: '600',
        borderRadius: '15%'
    },
    cursor: {
        cursor: 'pointer'
    }
}));

function ProductShop(props) {
    const classes = useStyles();
    const { prod } = props.productReducer;

    const INITIAL_FORM_STATE = {
        search: ""
    }

    const FORM_VALIDATION = Yup.object().shape({
        search: Yup.string(),
    });

    const handleSubmit = () => {

    }

    return (
        <div>
            <Formik
                initialValues={{...INITIAL_FORM_STATE}}
                validationSchema={FORM_VALIDATION}
                onSubmit={values => {
                    handleSubmit(values)
                }}
            >
                <Form>
                    <Grid container spacing={3} className={classes.main}>
                        <Grid item xs={12}>
                            <Box display="flex" alignItems="center">
                                <Box flexGrow={1}>
                                    <TextfieldWrapper label="Search product" name="search" />
                                </Box>
                                <Box style={{marginLeft: '6px'}}>
                                    <Button variant="contained" color="primary">
                                        Search
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
            <div className={classes.main}>
                {(prod) && prod.products.map(product => ( product.status === 'Active' &&
                    <Paper elevation={0}  className={classes.card}>
                        <Box display="flex" p={2} className={classes.productContainer}>
                            <Box>
                                <div>
                                    <img style={{borderRadius: '16px'}} src={product.product_image} alt="image" height="160" />
                                </div>
                            </Box>
                            <Box style={{marginLeft: '10px'}} flexGrow={1}>
                                <Typography className={classes.title} variant="subtitle1">{product.product_name}</Typography>
                                <Typography variant="subtitle2" className={classes.product} gutterBottom><span style={{fontSize: '14px'}}>from</span> {product.agent}</Typography>
                                <Box display="flex" className={classes.controls}>
                                    <Box flexGrow={1} className={classes.price}>
                                        ${Number(product.price).toFixed(2)}
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                                        <Box className={classes.cursor} p={1} id="remove">
                                            <RemoveIcon />
                                        </Box>
                                        <Box className={classes.quantity} p={1}>
                                            12
                                        </Box>
                                        <Box className={classes.cursor} p={1} id="add">
                                            <AddIcon />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                ))}
            </div>
        </div>
    )
}

ProductShop.propTypes = {
    productReducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    productReducer: state.productReducer,
})

export default connect(mapStateToProps, actions)(ProductShop);
