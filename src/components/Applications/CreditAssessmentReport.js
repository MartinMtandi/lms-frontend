import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SuccessSVG from '../../assets/success.svg';
import FailSVG from '../../assets/fail.svg';
import { Formik, Form } from 'formik';
import Textfield from '../common/FormUI/Textfield';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 430,
  },
  box: {
      textAlign: 'center'
  },
  amountText: {
      fontWeight: 700,
      fontSize: '40px',
      margin: theme.spacing(2, 0, 2, 0)
  },
  containerTop: {
      borderBottom: '1px solid #ddd',
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(3)
  },
  containerBottom: {
    paddingTop: theme.spacing(2)
  }
}));


function CreditAssessmentReport(props) {
    const classes = useStyles();
    const { next, handleClose, credit_assessment , setStore, clearPreAssessment, store, preAssessment, clearPreAssessmentError} = props;
    const {pre_assessment, pre_assessment_loaded, pre_assessment_error} = props.preAssessmentReducer;
    
    const INITIAL_STATE = {
        amount: ('amount' in store) ? store.amount : "",
    }

    const FORM_VALIDATION = Yup.object().shape({
        amount: Yup.number().max(Number(credit_assessment.amount), `Maximum qualification amount is ${Number(credit_assessment.amount).toFixed(2)}`).required('This field is required'),
    });

    const handleSubmit = (data) => {
        let payload = {
            gross_salary: store.gross,
            net_salary: store.net_salary,
            amount: data.amount,
            client_id: store.client_id,
            tenure: store.tenure
        }
        preAssessment(payload);
        setStore({
            ...store,
            amount: data.amount
        })
    }

    const handleNextPage = () => {
        next("Loan Application", 3);
        setStore({
            ...store,
            charges: pre_assessment.message.charges,
            gvt_tax: pre_assessment.message.gvt_tax,
            installments: pre_assessment.message.installments,
            interest: pre_assessment.message.interest
        })
        clearPreAssessment();
    }

    return (
        <div className={classes.root}>
            {(pre_assessment_error) &&
                Object.entries(pre_assessment_error).map(([key, value]) => (
                    <Box item xs={12} key={key} style={{marginBottom: '16px', marginTop: '16px'}}>
                        <Alert severity="error" onClose={() => clearPreAssessmentError()}>{value}</Alert>
                    </Box>
                ))
            }
            <Box style={{textAlign: 'center'}}>
                {(credit_assessment.dbr) === "Fail" ? <img alt="failSVG" src={FailSVG} height={180}  /> : <img alt="successSVG" src={SuccessSVG} height={180} />}
            </Box>
            <React.Fragment>
                {pre_assessment ? <React.Fragment>
                    <Box display="flex" className={classes.containerTop}>
                        <Box flexGrow={1}>
                            Charges
                        </Box>
                        <Box>
                           $ {pre_assessment.message.charges}
                        </Box>
                    </Box>
                    <Box display="flex" className={classes.containerTop}>
                        <Box flexGrow={1}>
                            Government Tax
                        </Box>
                        <Box>
                            $ {pre_assessment.message.gvt_tax}
                        </Box>
                    </Box>
                    <Box display="flex" className={classes.containerTop}>
                        <Box flexGrow={1}>
                            Installments
                        </Box>
                        <Box>
                           $ {pre_assessment.message.installments}
                        </Box>
                    </Box>
                    <Box display="flex" className={classes.containerTop}>
                        <Box flexGrow={1}>
                            Interest
                        </Box>
                        <Box>
                            $ {pre_assessment.message.interest}
                        </Box>
                    </Box>
                    <Box display="flex" className={classes.containerTop}>
                        <Box flexGrow={1}>
                            Total
                        </Box>
                        <Box>
                            $ {pre_assessment.message.total}
                        </Box>
                    </Box>
                </React.Fragment>
            : <React.Fragment>
                <Box display="flex" className={classes.containerTop}>
                    <Box flexGrow={1}>
                        Qualification Amount
                    </Box>
                    <Box>
                        <Typography style={{fontWeight: 600}}>{new Intl.NumberFormat('en-US', {
                            style: 'currency', 
                            currency: 'USD' 
                        }).format(credit_assessment.amount)}</Typography>
                    </Box>
                </Box>
                <Box display="flex" className={classes.containerTop}>
                    <Box flexGrow={1}>
                        Monthly Payments
                    </Box>
                    <Box>
                        <Typography style={{fontWeight: 600}}>
                            ${credit_assessment.installments}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" className={classes.containerTop}>
                    <Box flexGrow={1}>
                        Origination Fee
                    </Box>
                    <Box>
                        <Typography style={{fontWeight: 600}}>
                            ${credit_assessment.origination_fee}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" className={classes.containerTop}>
                    <Box flexGrow={1}>
                        IMMT
                    </Box>
                    <Box>
                        <Typography style={{fontWeight: 600}}>
                            {credit_assessment.immt}
                        </Typography>
                    </Box>
                </Box>
                <Box display="flex" className={classes.containerTop}>
                    <Box flexGrow={1}>
                        Total Interest Payable
                    </Box>
                    <Box>
                        <Typography style={{fontWeight: 600}}>{new Intl.NumberFormat('en-US', {
                            style: 'currency', 
                            currency: 'USD' 
                        }).format(credit_assessment.interest)}</Typography>
                    </Box>
                </Box>
                <Box display="flex" className={classes.containerBottom}>
                    <Box flexGrow={1}>
                        Interest Rate
                    </Box>
                    <Box>
                        <Typography style={{fontWeight: 600}}>
                            {credit_assessment.interest_rate}
                        </Typography>
                    </Box>
                </Box>
                </React.Fragment>
                }
            </React.Fragment>
            {(credit_assessment.dbr !== "Fail" && !pre_assessment) &&
            <Box style={{marginTop: 30, marginBottom: 25}}>
                <Formik
                    initialValues={{...INITIAL_STATE}}
                    validationSchema={FORM_VALIDATION}
                    enableReinitialize={true}
                    onSubmit={values => {
                        handleSubmit(values)
                    }}
                >
                    <Form>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1}>
                                <Textfield name="amount" label="Loan Amount" InputLabelProps={{ shrink: true }} labelWidth={55} />
                            </Box>
                            <Box m={1}>
                                <Button disabled={pre_assessment_loaded ? true : false} type="submit" variant="contained" color="secondary">
                                    Submit
                                </Button>
                            </Box>
                        </Box>
                    </Form>
                </Formik>
            </Box>}
            <Box display="flex" style={{marginTop: '30px'}} >
                <Box flexGrow={1}>
                    <Button onClick={() => handleClose()} color="primary">
                        Close
                    </Button>
                </Box>
                {pre_assessment ? 
                <Box>
                    <Button variant="contained" color="primary" onClick={() => clearPreAssessment() }>
                        Back
                    </Button>
                </Box>
                : 
                <Box>
                    <Button variant="contained" color="primary" onClick={() => next("Credit Assessment", 1)}>
                        Back
                    </Button>
                </Box>}
                {(credit_assessment.dbr !== "Fail" && pre_assessment) &&
                <Box style={{marginLeft: '8px'}}>
                    <Button color="primary" onClick={() => handleNextPage()} autoFocus> 
                        Continue
                    </Button>
                </Box>}
            </Box>
        </div>
    )
}

CreditAssessmentReport.propTypes = {
    preAssessment: PropTypes.func.isRequired,
    clearPreAssessmentError: PropTypes.func.isRequired,
    clearPreAssessment: PropTypes.func.isRequired,
    preAssessmentReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    preAssessmentReducer: state.preAssessmentReducer
})

export default connect(mapStateToProps, actions)(CreditAssessmentReport)
