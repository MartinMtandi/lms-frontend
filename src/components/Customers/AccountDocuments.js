import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Formik, Form } from 'formik';
import Textfield from '../common/FormUI/Textfield';
import SelectField from '../common/FormUI/SelectField';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import banks from '../../utils/banks';

function AccountDocuments(props) {
    const { handleClose, setStore, store, clearApplicantError, next } = props;
    const { create_customer_error } = props.createCustomersReducer;

    const INITIAL_FORM_STATE = {
        idcard: "",
        addressproof: "",
        payslip: "",
        statement: "",
        bank: ('bank' in store) ? store.bank : "",
        account: ('account' in store) ? store.account : "",
        branch_name: ('branch_name' in store) ? store.branch_name : "",
        branch_code: ('branch_code' in store) ? store.branch_code : "",
        ecocash_number: ('ecocash_number' in store) ? store.ecocash_number : "",
    }

    const FORM_VALIDATION = Yup.object().shape({
        idcard: Yup.mixed().required('This field is required').test("type", "Only the following formats are accepted: .jpeg, .jpg, .pdf", (value) => {
                return (
                    value &&
                    (value.type === "image/jpeg" ||
                        value.type === "image/png" ||
                        value.type === "application/pdf")
                );
            }
        ),
        addressproof: Yup.mixed().required('This field is required').test("type", "Only the following formats are accepted: .jpeg, .jpg, .pdf", (value) => {
                return (
                    value &&
                    (value.type === "image/jpeg" ||
                        value.type === "image/png" ||
                        value.type === "application/pdf")
                );
            }
        ),
        payslip: Yup.mixed().required('This field is required').test("type", "Only the following formats are accepted: .jpeg, .jpg, .pdf", (value) => {
                return (
                    value &&
                    (value.type === "image/jpeg" ||
                        value.type === "image/png" ||
                        value.type === "application/pdf")
                );
            }
        ),
        statement: Yup.mixed().required('This field is required').test("type", "Only the following formats are accepted: .jpeg, .jpg, .pdf", (value) => {
                return (
                    value &&
                    (value.type === "image/jpeg" ||
                        value.type === "image/png" ||
                        value.type === "application/pdf")
                );
            }
        ),
        bank: Yup.string().required('This field is required'),
        account: Yup.string().required('This field is required'),
        branch_name: Yup.string().required('This field is required'),
        branch_code: Yup.string().required('This field is required'),
        ecocash_number: Yup.string().required('This field is required'),
    });

    const handleSubmit = (values) => {
        setStore({
            ...store,
            bank: values.bank,
            account: values.account,
            branch_name: values.branch_name,
            idcard: values.idcard,
            addressproof: values.addressproof,
            payslip: values.payslip,
            statement: values.statement,
            branch_code: values.branch_code,
            ecocash_number: values.ecocash_number,
        })
        next("Confirmation Page", 8);
    }

    return (
        <Formik
            initialValues={{...INITIAL_FORM_STATE}}
            validationSchema={FORM_VALIDATION}
            onSubmit={values => {
                handleSubmit(values)
            }}
        >
            {({ setFieldValue }) => {
                return (
                    <Form>
                        <Grid container spacing={3}>
                            {(typeof create_customer_error === 'string' && create_customer_error) ? 
                            <Grid item xs={12}>
                                <Alert severity="error" onClose={() => clearApplicantError()}>{create_customer_error}</Alert>
                            </Grid> :
                            (create_customer_error) && 
                                Object.entries(create_customer_error).map(([key, value]) => (
                                    <Grid item xs={12}>
                                        <Alert severity="error" onClose={() => clearApplicantError()}>{value}</Alert>
                                    </Grid>
                                ))
                            }
                            <Grid item xs={6}>
                                <Textfield value={undefined} type="file" name="idcard" onChange={(e) => { setFieldValue("idcard", e.target.files[0])}} label="Identification Document" InputLabelProps={{shrink: true,}} />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield value={undefined} type="file" name="addressproof" onChange={(e) => { setFieldValue("addressproof", e.target.files[0])}} label="Proof of Address" InputLabelProps={{shrink: true,}} />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield value={undefined} type="file" name="payslip" onChange={(e) => { setFieldValue("payslip", e.target.files[0])}} label="Payslip" InputLabelProps={{shrink: true,}} />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield value={undefined} type="file" name="statement" onChange={(e) => { setFieldValue("statement", e.target.files[0])}} label="Bank Statement" InputLabelProps={{shrink: true,}} />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectField 
                                    name="bank"
                                    label="Bank"
                                    options={banks}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="branch_name" label="Branch Name" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="branch_code" label="Branch Code" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="account" label="Account Number" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="ecocash_number" label="Ecocash Number" />
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" >
                                    <Box flexGrow={1}>
                                        <Button onClick={() => handleClose()} color="primary">
                                            Close
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button variant="contained" color="primary" onClick={() => next("Employment Details", 6)} color="primary">
                                            Back
                                        </Button>
                                    </Box>
                                    <Box style={{marginLeft: '8px'}}>
                                        <Button type="submit" color="primary" autoFocus> 
                                            Continue
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}

AccountDocuments.propTypes = {
    clearCustomer: PropTypes.func.isRequired,
    clearApplicantError: PropTypes.func.isRequired,
    createCustomersReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    createCustomersReducer: state.createCustomersReducer
})

export default connect(mapStateToProps, actions)(AccountDocuments);


