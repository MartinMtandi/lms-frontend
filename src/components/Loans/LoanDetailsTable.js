import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: '100%',

  },
  container: {
    width: '60%',
    margin: '0 auto',
    borderRadius: '0.3rem',
    padding: '20px',
  },
  paper: {
    padding: '10px 20px',
    margin: '10px 0',
  }
});

const LoanDetailsTable = (props) => {
  const classes = useStyles();
  const {loan_details} = props;
  console.log(typeof loan_details.loan.mname);
  return (
    <Paper className={classes.root} elevation={0}>
        <Box bgcolor="grey.100" className={classes.container}>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Loan Amount
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  $ {loan_details.loan.amount}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Principal Amount
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  $ {loan_details.loan.principal_amount}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Monthly Installment
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  $ {loan_details.loan.monthly_installment}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Tenure
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.tenure}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Start Date
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.start_date}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Reference
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  $ {loan_details.loan.ref}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Client
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.client}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Firstname
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.fname}
                </Typography>
            </Paper>
            {(typeof !loan_details.loan.mname === 'object' && (typeof !loan_details.loan.mname === 'string' && !loan_details.loan.mname.length > 0)) &&
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Middlename
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.mname}
                </Typography>
            </Paper>}
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Lastname
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.lname}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  National Id
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.national_id}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Email
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.email}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Phone Number
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.phone}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Gender
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.gender}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Date of Birth
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.dob}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Address
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.physical_address}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Surbub
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.surbub}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  City
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.city}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Next of kin firstname
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.next_of_kin_firstname}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Next of kin lastname
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.next_of_kin_lastname}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Next of kin address
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.next_of_kin_address}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Next of kin email
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.email}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Next of kin phone number
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.phone}
                </Typography>
            </Paper>
            {loan_details.loan.ministry &&
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Ministry
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.ministry}
                </Typography>
            </Paper>}
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Sector
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.sector}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Status
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.status}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Created At
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.created_at}
                </Typography>
            </Paper>
            <Paper className={classes.paper}>
                <Typography variant="subtitle1" gutterBottom>
                  Updated At
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {loan_details.loan.updated_at}
                </Typography>
            </Paper>
        </Box>
    </Paper>
  );
}

export default LoanDetailsTable;

