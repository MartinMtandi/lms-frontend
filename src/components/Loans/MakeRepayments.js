import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import SelectField from '../common/FormUI/SelectField';
import * as Yup from 'yup';
import { connect } from "react-redux";
import Draggable from 'react-draggable';
import Grid from '@material-ui/core/Grid';
import * as actions from '../../store/actions';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import CurrencyTextfield from '../common/FormUI/CurrencyTextfield';

function PaperComponent(props) {

  return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
        );
}

function MakeRepayment(props){
  const {open, setOpen, repaymentId, makeLoanRepayments, clearMakeRepaymentsError} = props;
  const {user} = props.authReducer;
  const { repayment, repayment_loading, repayment_error } = props.makeRepaymentsReducer;

  const handleClose = () => {
    setOpen(false);
    clearMakeRepaymentsError();
  };

  React.useEffect(() => {
    (repayment) && handleClose();
  }, [repayment]);

  const INITIAL_STATE = {
      month: '',
      year: '',
      received_by: Number(user.user.user_id),
      amount: ''
  }

  const VALIDATION = Yup.object().shape({
      month: Yup.number(),
      year: Yup.number(),
      received_by: Yup.number(),
      amount: Yup.number().required('This field is required'),
  });

  const handleSubmit = (val) => {
      val.id = repaymentId;
    makeLoanRepayments(val);
  }

  const month = {1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'};

  const year = {2021: 2021, 2022: 2022, 2023: 2023, 2024: 2024, 2025: 2025, 2026: 2026, 2027: 2027, 2028: 2028};

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Make Repayment
        </DialogTitle>
        <DialogContent style={{marginBottom: '8px'}} style={{overflowY: 'hidden'}}>
            <Formik
                initialValues={{...INITIAL_STATE}}
                validationSchema={VALIDATION}
                onSubmit={values => {
                    handleSubmit(values)
                }}
            >
                <Form>
                    <Grid container spacing={3}>
                        {repayment_error &&
                        <Grid item xs={12}>
                            <Alert severity="error" onClose={() => clearMakeRepaymentsError()}>{repayment_error}</Alert>
                        </Grid>}
                        <Grid item xs={6}>
                            <SelectField 
                                name="month"
                                label="Month"
                                options={month}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectField 
                                name="year"
                                label="Year"
                                options={year}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <CurrencyTextfield name="amount" label="Amount" labelWidth={55} />
                        </Grid>
                        <Grid  item xs={12} style={{textAlign: 'right', marginBottom: '15px'}}>
                            <Button onClick={() => handleClose()} variant="contained" color="secondary" style={{marginRight: '10px'}}>
                                Close
                            </Button>
                            <Button disabled={(repayment_loading) ? true : false} type="submit" variant="contained" color="primary" autoFocus> 
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

MakeRepayment.propTypes = {
    makeLoanRepayments: PropTypes.func.isRequired,
    clearMakeRepaymentsError: PropTypes.func.isRequired,
    makeRepaymentsReducer: PropTypes.object.isRequired,
    authReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    makeRepaymentsReducer: state.makeRepaymentsReducer,
    authReducer: state.authReducer
});

export default connect(mapStateToProps, actions)(MakeRepayment)
