import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import CurrencyTextfield from '../common/FormUI/CurrencyTextfield';
import Textfield from '../common/FormUI/Textfield';
import * as Yup from 'yup';
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';

function CreditAssessent(props) {
    const { handleClose, id, creditAssessment, clearCreditAssessmentError, setStore, store } = props;
    const { credit_assessment_error, credit_assessment_loading } = props.creditAssessmentReducer;
   
    const INITIAL_FORM_STATE = {
        investments: ('investments' in store) ? store.investments : "",
        expenses: ('expenses' in store) ? store.expenses : "",
        current_loan: ('current_loan' in store)  ? store.current_loan : "",
        tenure: ('tenure' in store)  ? store.tenure : "",
        gross: ('gross' in store)  ? store.gross : "",
        net_salary: ('net_salary' in store)  ? store.net_salary : "",
    }

    const FORM_VALIDATION = Yup.object().shape({
        expenses: Yup.number().required('This field is required'),
        investments: Yup.number().required('This field is required'),
        current_loan: Yup.number().required('This field is required'),
        tenure: Yup.number().required('This field is required'),
        gross: Yup.number().required('This field is required'),
        net_salary: Yup.number().required('This field is required'),
    });

    const handleSubmit = (values) => {
        values.client_id = id;
        setStore({
            ...store,
            tenure: values.tenure,
            investments: values.investments,
            expenses: values.expenses,
            current_loan: values.current_loan,
            gross: values.gross,
            net_salary: values.net_salary,
            client_id: id,
        });
        clearCreditAssessmentError();
        creditAssessment(values);
    } 

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
                    {(credit_assessment_error) &&
                       Object.entries(credit_assessment_error).map(([key, value]) => (
                            <Grid item xs={12} key={key}>
                                <Alert severity="error" onClose={() => clearCreditAssessmentError()}>{value}</Alert>
                            </Grid>
                        ))
                    }
                     <Grid item xs={6}>
                        <CurrencyTextfield name="gross" label="Gross Monthly Income" labelWidth={168} />
                    </Grid>
                    <Grid item xs={6}>
                        <CurrencyTextfield name="net_salary" label="Net Monthly Income" labelWidth={168} />
                    </Grid>
                    <Grid item xs={6}>
                        <CurrencyTextfield name="expenses" label="Total Estimated Expenses" labelWidth={188} />
                    </Grid>
                    <Grid item xs={6}>
                        <CurrencyTextfield name="investments" label="Investments" labelWidth={90} />
                    </Grid>
                    <Grid item xs={6}>
                        <CurrencyTextfield name="current_loan" label="Current Loan" labelWidth={96} />
                    </Grid>
                    <Grid item xs={6}>
                        <Textfield name="tenure" label="Tenure in Months" labelWidth={128} />
                    </Grid>
                    <Grid item xs={12} style={{textAlign: 'right'}}>
                        <Button color="primary" onClick={() => handleClose()}>
                            Close
                        </Button>
                        <Button type="submit" disabled={(credit_assessment_loading) ? true : false} color="primary"  autoFocus>
                            Calculate
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    )
}

CreditAssessent.propTypes = {
    creditAssessment: PropTypes.func.isRequired,
    clearCreditAssessmentError: PropTypes.func.isRequired,
    creditAssessmentReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	creditAssessmentReducer: state.creditAssessmentReducer
});

export default connect(mapStateToProps, actions)(CreditAssessent);
