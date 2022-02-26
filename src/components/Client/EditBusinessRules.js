import React from 'react';
import { Formik, Form } from 'formik';
import Textfield from '../common/FormUI/Textfield';
import * as Yup from 'yup';
import SelectField from '../common/FormUI/SelectField';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import banks from '../../utils/banks';

function EditBusinessRules(props) {
  const {business_rules, updateBusinessRules, clearUpdateBusinessRules, clearUpdateBusinessRulesError} = props;
  const {update_rules, update_rules_error, update_rules_loading} = props.updateBusinessRulesReducer;

  const INITIAL_FORM_STATE = {
    bank: business_rules ? business_rules.rules.banking_institution : "",
    max_lending: business_rules ? Number(business_rules.rules.max_lending_amount).toFixed(2) : "",
    commencement_date: business_rules ? business_rules.rules.commencement_date : "",
    end_date: business_rules ? business_rules.rules.end_date : "",
    fee: business_rules ? business_rules.rules.fee : "",
    interest_rate: business_rules ? business_rules.rules.interest_rate : "",
    rate_basis: business_rules ? business_rules.rules.rate_basis : "",
    charge: business_rules ? Number(business_rules.rules.charge).toFixed(2) : "",
    charge_type: business_rules ? business_rules.rules.charge_type : "",
    charge_value: business_rules ? Number(business_rules.rules.charge_value).toFixed(2) : "",
    card_purchase: business_rules ? business_rules.rules.card_purchase : "",
    max_loan: business_rules ? Number(business_rules.rules.max_loan_amount).toFixed(2) : "",
    monthly_installments: business_rules ? business_rules.rules.monthly_installments : "",
    max_term: business_rules ? business_rules.rules.max_term : "",
    grace_period: business_rules ? business_rules.rules.grace_period : "",
    write_off: business_rules ? business_rules.rules.write_off : "",
    max_loan_apps: business_rules ? business_rules.rules.max_loan_applications : "",
    age_limit: business_rules ? business_rules.rules.age_limit : "",
    immt: business_rules ? business_rules.rules.immt : "",
  }

  const FORM_VALIDATION = Yup.object().shape({
    bank: Yup.string().required('This field is required'),
    max_lending: Yup.number().required('This field is required'),
    commencement_date: Yup.string().required('This field is required'),
    end_date: Yup.string().required('This field is required'),
    fee: Yup.number().required('This field is required'),
    interest_rate: Yup.number().required('This field is required'),
    rate_basis: Yup.number().required('This field is required'),
    charge: Yup.number().required('This field is required'),
    charge_value: Yup.number().required('This field is required'),
    charge_type: Yup.string().required('This field is required'),
    card_purchase: Yup.string().required('This field is required'),
    max_loan: Yup.number().required('This field is required'),
    monthly_installments: Yup.number().required('This field is required'),
    max_term: Yup.number().required('This field is required'),
    grace_period: Yup.number().required('This field is required'),
    write_off: Yup.number().required('This field is required'),
    max_loan_apps: Yup.number().required('This field is required'),
    age_limit: Yup.number().required('This field is required'),
    immt: Yup.number().required('This field is required'),
  })

  const card_purchase = {
    "enabled": "Enabled",
    "disabled": "Disabled"
  }

  const handleSubmit = (data) => {
    data.id = business_rules.rules.id;
    updateBusinessRules(data);
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
              <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>EDIT BUSINESS RULES</Typography>
                  </Grid>
                  {(update_rules_error) &&
                       Object.entries(update_rules_error).map(([key, value]) => (
                            <Grid item xs={12} key={key}>
                                <Alert severity="error" onClose={() => clearUpdateBusinessRulesError()}>{value}</Alert>
                            </Grid>
                        ))
                    }
                    {update_rules &&
                    <Grid item xs={12}>
                          <Alert severity="success" onClose={() => clearUpdateBusinessRules()}>{update_rules.message}</Alert>
                      </Grid>}
                  <Grid item xs={12}>
                    <SelectField 
                          name="bank"
                          label="Bank"
                          options={banks}
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="max_lending" label="Maximum Lending Amount" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="fee" label="Fee" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="commencement_date" label="Commencement Date" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="end_date" label="End Date" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="interest_rate" label="Interest Rate (%)" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="rate_basis" label="Rate Basis" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="charge" label="Charge" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="charge_type" label="Charge Type" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="charge_value" label="Charge Value" />
                  </Grid>
                  <Grid item xs={6}>
                  <SelectField 
                          name="card_purchase"
                          label="Card Purchase"
                          options={card_purchase}
                      />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="max_loan" label="Maximum Loan Amount" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="monthly_installments" label="Monthly Installments" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="max_term" label="Maximum Term" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="grace_period" label="Grace Period" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="write_off" label="Write Off" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="max_loan_apps" label="Maximum Loan Applications" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="age_limit" label="Age Limit" />
                  </Grid>
                  <Grid item xs={6}>
                      <Textfield InputLabelProps={{shrink: true}} name="immt" label="IMMT" />
                  </Grid>
                  <Grid item xs={12}>
                    <Button disabled={update_rules_loading ? true : false} fullWidth type="submit" variant="contained" color="primary" autoFocus> 
                        Submit
                    </Button>
                  </Grid>
              </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

EditBusinessRules.propTypes = {
  clearUpdateBusinessRulesError: PropTypes.func.isRequired,
  clearUpdateBusinessRules: PropTypes.func.isRequired,
  updateBusinessRules: PropTypes.func.isRequired,
  updateBusinessRulesReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  updateBusinessRulesReducer: state.updateBusinessRulesReducer
})

export default connect(mapStateToProps, actions)(EditBusinessRules)