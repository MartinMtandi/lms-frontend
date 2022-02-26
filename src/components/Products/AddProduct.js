import React from 'react';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Textfield from '../common/FormUI/Textfield';
import CurrencyTextfield from '../common/FormUI/CurrencyTextfield';
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../../store/actions';

function AddProduct(props) {
    const { handleClose, addProduct, clearAddProductError } = props;
    const { user } = props.authReducer;
    const { add_product, add_product_loading, add_product_error } = props.addProductReducer;

    const INITIAL_FORM_STATE = {
        product_name: "",
        sku: "",
        price: "",
        quantity: "",
        userfile: ""
    }

    const FORM_VALIDATION = Yup.object().shape({
        product_name: Yup.string().required('This field is required'),
        sku: Yup.string().required('This field is required'),
        price: Yup.number().required('This field is required'),
        quantity: Yup.number().required('This field is required'),
        userfile: Yup.mixed().required('This field is required').test("type", "Only the following formats are accepted: .jpeg, .jpg, .pdf", (value) => {
            return (
                value &&
                (value.type === "image/jpeg" ||
                    value.type === "image/png" ||
                    value.type === "application/pdf")
            );
        })
    });

    React.useEffect(() => {
        (add_product) && handleClose();
    }, [add_product, handleClose]);

    const handleSubmit = (values) => {
        values.agent_id = user.user.agent_id;
        addProduct(values);
    }

    return (
        <Formik
            initialValues={{...INITIAL_FORM_STATE}}
            validationSchema={FORM_VALIDATION}
            onSubmit={values => {
                handleSubmit(values)
            }}
        >
            {({setFieldValue, ...rest}) => {
                return (
                    <Form>
                        <Grid container spacing={3}>
                            {add_product_error &&
                            <Grid item xs={12}>
                                <Alert severity="error" onClose={() => clearAddProductError()}>{add_product_error}</Alert>
                            </Grid>}
                            <Grid item xs={12}>
                                <Textfield name="product_name" label="Product Name" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="sku" label="Sku / Id" />
                            </Grid>
                            <Grid item xs={6}>
                                <CurrencyTextfield name="price" label="Price" labelWidth={38} />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="quantity" label="Quantity" />
                            </Grid>
                            <Grid item xs={6}>
                            <Textfield value={undefined} type="file" name="userfile" onChange={(e) => { setFieldValue("userfile", e.target.files[0])}} label="Product Image" InputLabelProps={{shrink: true,}} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} style={{textAlign: 'right', marginTop: '24px', marginBottom: '16px'}}>
                            <Button color="primary" onClick={() => handleClose()} >
                                Close
                            </Button>
                            <Button disabled={add_product_loading ? true : false} type="submit" color="primary" autoFocus>
                                Submit
                            </Button>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}

AddProduct.propTypes = {
    authReducer: PropTypes.object.isRequired,
    clearAddProductError: PropTypes.func.isRequired,
    addProduct: PropTypes.func.isRequired,
    addProductReducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    authReducer: state.authReducer,
    addProductReducer: state.addProductReducer
})

export default connect(mapStateToProps, actions)(AddProduct)
