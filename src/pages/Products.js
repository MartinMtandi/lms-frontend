import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { connect } from "react-redux";
import DialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import * as actions from '../store/actions';
import TextfieldWrapper from '../components/common/FormUI/Textfield';
import AddProduct from '../components/Products/AddProduct';
import DisplayProducts from '../components/Products/DisplayProducts';
import PageLoader from '../components/common/PageLoader';

function Products(props) {
    const [open, setOpen] = React.useState(false);
    const { getProducts, clearAddProduct } = props;
    const { add_product } = props.addProductReducer;
    const { prod, prod_loading } = props.productReducer;

    let today = new Date();
    let to = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let six_months_back = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
    let from = six_months_back.getFullYear() + '-' + (six_months_back.getMonth() - 6) + '-' + six_months_back.getDate();

    const [data, setDate] = React.useState({
        to_date: to,
        from_date: from,
    });

    React.useEffect(() => {
        let obj = {
            to_date: data.to_date,
            from_date: data.from_date
        }
        getProducts(obj);
        clearAddProduct();
    }, [getProducts, add_product, clearAddProduct, data.from_date, data.to_date]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const INITIAL_FORM_STATE = {
        product: ""
    }

    const FORM_VALIDATION = Yup.object().shape({
        product: Yup.string().required()
    });

    const handleSubmit = () => {

    }

    return (
        <div> 
            {(prod_loading) ? 
                <PageLoader />
            : <>
            <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                    <Button variant="contained" size="small" color="primary" onClick={handleClickOpen}>
                        Add New Product
                    </Button>
                </Box>
                <Box>
                    <Formik
                        initialValues={{...INITIAL_FORM_STATE}}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={values => {
                            handleSubmit(values)
                        }}
                    >
                        <Form>
                            <Box display="flex" alignItems="center">
                                <Box>
                                    <TextfieldWrapper size="small" name="product" label="Product Name" />
                                </Box>
                                <Box style={{marginLeft: '10px'}}>
                                    <Button variant="contained" size="small" color="secondary">
                                        Search
                                    </Button>
                                </Box>
                            </Box>
                        </Form>
                    </Formik>
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="product">
                <DialogTitle id="product">Add Product</DialogTitle>
                <DialogContent>
                    <AddProduct handleClose={handleClose} />
                </DialogContent>
            </Dialog>
            {prod &&
            <DisplayProducts products={prod.products} />}</>}
        </div>
    )
}

Products.propTypes = {
    getProducts: PropTypes.func.isRequired,
    clearAddProduct: PropTypes.func.isRequired,
    productReducer: PropTypes.object.isRequired,
    addProductReducer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    productReducer: state.productReducer,
    addProductReducer: state.addProductReducer
})

export default connect(mapStateToProps, actions)(Products);
