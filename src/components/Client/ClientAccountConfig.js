import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import Button from '@material-ui/core/Button';
import Textfield from '../common/FormUI/Textfield';
import CurrencyTextfield from '../common/FormUI/CurrencyTextfield';
import SelectField from '../common/FormUI/SelectField';
import Alert from '@material-ui/lab/Alert';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../../store/actions';

function ClientAccountConfig(props) {

    const { store, handleClose, createClient, clearCreateClientError } = props;
    const { create_client, create_client_loading, create_client_error } = props.createClientsReducer;

    const INITIAL_FORM_STATE = {
        bank: "",
        max_lending: '',
        fee: '',
        commencement_date: '',
        end_date: '',
        charge_type: '',
        charge_value: '',
        charge: '',
        interest_rate: '',
        rate_basis: '',
        card_purchase: '',
        max_loan: '',
        monthly_installments: '',
        max_term: '',
        grace_period: '',
        write_off: '',
        max_loan_apps: '',
        age_limit: '',
    }

    const FORM_VALIDATION = Yup.object().shape({
        bank: Yup.string().required('This field is required'),
        max_lending: Yup.string().required('This field is required'),
        fee: Yup.string().required('This field is required'),
        commencement_date: Yup.string().required('This field is required'),
        end_date: Yup.string().required('This field is required'),
        charge_type: Yup.string().required('This field is required'),
        charge_value: Yup.string().required('This field is required'),
        charge: Yup.string().required('This field is required'),
        interest_rate: Yup.string().required('This field is required'),
        rate_basis: Yup.string().required('This field is required'),
        card_purchase: Yup.string().required('This field is required'),
        max_loan: Yup.string().required('This field is required'),
        monthly_installments: Yup.string().required('This field is required'),
        max_term: Yup.string().required('This field is required'),
        grace_period: Yup.string().required('This field is required'),
        write_off: Yup.string().required('This field is required'),
        max_loan_apps: Yup.string().required('This field is required'),
        age_limit: Yup.string().required('This field is required'),
    });

    const banks = {
        "AFC Commercial Bank": "AFC Commercial Bank",
        "BancABC Zimbabwe": "BancABC Zimbabwe",
        "First Capital Bank Limited": "First Capital Bank Limited",
        "CBZ Bank Limited": "CBZ Bank Limited",
        "Ecobank Zimbabwe Limited": "Ecobank Zimbabwe Limited",
        "FBC Bank Limited": "FBC Bank Limited",
        "Nedbank Zimbabwe Limited": "Nedbank Zimbabwe Limited",
        "Metbank": "Metbank",
        "NMB Bank Limited": "NMB Bank Limited",
        "Stanbic Chartered Bank Zimbabwe Limited": "Stanbic Chartered Bank Zimbabwe Limited",
        "Standard Chartered Bank Zimbabwe Limited": "Standard Chartered Bank Zimbabwe Limited",
        "Steward Bank": "Steward Bank",
        "ZB Bank Limited": "ZB Bank Limited"
    }

    const card_purchase = {
        "Enabled": "Enabled",
        "Disabled": "Disabled"
    }

    const rate_basis = {
        "360": "360",
        "365": "365"
    }

    const handleSubmit = (value) => {
        const data = Object.assign(value, store);
        createClient(data);
    }

    React.useEffect(() => {
        (create_client) && handleClose();
    }, [create_client, handleClose]);

    return (
        <Formik
            initialValues={{...INITIAL_FORM_STATE}}
            validationSchema={FORM_VALIDATION}
            enableReinitialize={true}
            onSubmit={values => {
                handleSubmit(values)
            }}
        >
            <Form>
                <Grid container spacing={3}>
                    {(create_client_error) && 
                    <Grid item xs={12}>
                        <Alert severity="error" onClose={() => clearCreateClientError()}>{create_client_error}</Alert>
                    </Grid>}
                    <Grid item xs={12}>
                        <SelectField 
                            name="bank"
                            label="Bank"
                            options={banks}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <CurrencyTextfield name="max_lending" label="Maximum Lending Amount" labelWidth={190} />
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="fee" label="Loan Origination Fee"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield type="date" InputLabelProps={{shrink: true,}} name="commencement_date" label="Commencement Date"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield type="date" InputLabelProps={{shrink: true,}} name="end_date" label="End Date"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="charge_type" label="Charge Type (Fixed Fee / %)"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="charge_value" label="Charge Value (Fixed Fee)"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="charge" label="Charge (Penalty, IMTT, etc...)"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="interest_rate" label="Interest Rate"/>
                    </Grid>
                    <Grid item xs={6}>
                        <SelectField 
                            name="rate_basis"
                            label="Rate Basis"
                            options={rate_basis}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="max_loan" label="Maximum Credit Limit"/>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectField 
                            name="card_purchase"
                            label="Card Purchase"
                            options={card_purchase}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="monthly_installments" label="Maximum Monthly Payment (%)"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="max_term" label="Maximum Loan Term (Months)"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="grace_period" label="Grace Period (Days)"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="write_off" label="Write Off Period (Days)"/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="max_loan_apps" label="Maximum Loan Applicant No."/>
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="age_limit" label="Age Limit"/>
                    </Grid>
                    <Grid item xs={12} style={{textAlign: 'right'}}>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button type="submit" color="primary" disabled={create_client_loading ? true : false} autoFocus>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}

ClientAccountConfig.propTypes = {
    createClient: PropTypes.func.isRequired,
    clearCreateClientError: PropTypes.func.isRequired,
    createClientsReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    createClientsReducer: state.createClientsReducer
})

export default connect(mapStateToProps, actions)(ClientAccountConfig);
