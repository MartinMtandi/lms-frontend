import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Formik, Form } from 'formik';
import CurrencyTextfield from '../common/FormUI/CurrencyTextfield';
import Textfield from '../common/FormUI/Textfield';
import SelectField from '../common/FormUI/SelectField';
import * as Yup from 'yup';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';

function LoanApplication(props) {
    const { handleClose, credit_assessment, id, setStore, store, next } = props;
    
    const { loan_types } = props.loanTypesReducer;
    const { user } = props.authReducer;
    const { loan_structure } = props.loanStructureReducer;
 
    const INITIAL_FORM_STATE = {
        structure: ('structure' in store) ? store.structure : "",
        tenure: ('tenure' in store) ? store.tenure : "",
        amount: ('amount' in store) ? store.amount : "",
        purpose: ('purpose' in store) ? store.purpose : "",
    }

    const FORM_VALIDATION = Yup.object().shape({
        structure: Yup.number().required('This field is required'),
        tenure: Yup.number().required('This field is required'),
        amount: Yup.number().required('This field is required'),
        purpose: Yup.string().required('This field is required'),
    });

    const handleSubmit = (values) => {
        setStore({
            ...store,
            structure: values.structure,
            tenure: values.tenure,
            amount: values.amount,
            application_type: "client",
            client_id: user.user.user_id,
            user_id: id,
            available: credit_assessment.amount,
            purpose: values.purpose,
        })
        next("Person Details", 4);
      
    }

    const purpose = {
        "Purchase Goods": "Purchase Goods",
        "School Fees": "School Fees",
        "Pay Bills / Debt Consolidation": "Pay Bills / Debt Consolidation",
        "Medical expenses": "Medical expenses",
        "Home repairs": "Home repairs",
        "Vehicle repairs": "Vehicle repairs",
        "Funeral expenses": "Funeral expenses",
        "Moving costs": "Moving costs",
        "Investment": "Investment",
        "Unplanned emergency": "Unplanned emergency",
        "Other": "Other"
    }

    let loanStruct = { };

    if(loan_structure){
        loan_structure.loans.forEach(el => {
            loanStruct[el.id] = el.structure
        })
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
           {({ setFieldValue, ...rest}) => {
               return (
                <Form>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <SelectField 
                                name="purpose"
                                label="Purpose Of Loan"
                                options={purpose}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectField 
                                name="structure"
                                label="Loan Product"
                                options={loanStruct}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Textfield name="tenure" label="Tenure" disabled InputLabelProps={{ shrink: true }} labelWidth={55} />
                        </Grid>
                        <Grid item xs={12}>
                            <CurrencyTextfield disabled name="amount" label="Amount" labelWidth={55} />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" >
                                <Box flexGrow={1}>
                                    <Button onClick={() => handleClose()} color="primary">
                                        Close
                                    </Button>
                                </Box>
                                <Box>
                                    <Button variant="contained" color="primary" onClick={() => next("", 2)} color="primary">
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

LoanApplication.propTypes = {
    createLoan: PropTypes.func.isRequired,
    clearCreateLoanError: PropTypes.func.isRequired,
    loanTypesReducer: PropTypes.object.isRequired,
    createLoanReducer: PropTypes.object.isRequired,
    authReducer: PropTypes.object.isRequired,
    loanStructureReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    createLoanReducer: state.createLoanReducer,
    loanTypesReducer: state.loanTypesReducer,
    authReducer: state.authReducer,
    loanStructureReducer: state.loanStructureReducer
})

export default connect(mapStateToProps, actions)(LoanApplication);
