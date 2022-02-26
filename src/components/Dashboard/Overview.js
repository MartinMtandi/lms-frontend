import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CancelIcon from '@material-ui/icons/Cancel';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import DatePicker from '../common/FormUI/DatePicker';
import CountUp from 'react-countup';
import GridSkeletonLoader from '../common/GridSkeletonLoading';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
  header: {
      fontWeight: 500,
      color: '#374151'
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  count: {
      marginLeft: theme.spacing(2)
  },
  numbers: {
      fontWeight: 500
  },
  iconBtnNewUsers: {
      background: '#ECFDF5'
  },
  iconBtnInActiveUsers: {
    background: '#FEF2F2' 
  },
  iconBtnActiveUsers: {
    background: '#EEF2FF'
  },
  iconBtnBlockedAccount: {
    background: '#FFFBEB'  
  },
  iconBtnDisbursed: {
      background: '#F3F4F6'
  },
  iconBtnRejected: {
      background: '#FEF2F2'
  },
  iconBtnLevel1: {
      background: '#ECFDF5'
  },
  iconBtnLevel2: {
      background: '#F5F3FF'
  }
}));

function Overview(props) {
    const classes = useStyles();
    const {dashboard_reports, dashboard_reports_loading} = props.getReportsReducer;
    const {data, setDate} = props;

    let content = (dashboard_reports_loading) ? <GridSkeletonLoader /> : (dashboard_reports) && <Grid style={{marginTop: '1px'}} container spacing={3}>
    <Grid item xs={3}>
        <Paper className={classes.paper}>
            <Box display="flex" flexDirection="row">
                <Box>
                    <IconButton className={classes.iconBtnNewUsers}>
                        <AssignmentIndIcon />
                    </IconButton>
                </Box>
                <Box className={classes.count}>
                    <Typography className={classes.numbers} variant="h5" >
                        <CountUp start={0} end={dashboard_reports.loan_applications} duration={2.75} separator=","/>
                    </Typography>
                    <Typography variant="button">
                        Loan Applications
                    </Typography>
                </Box>
            </Box>
        </Paper>
    </Grid>
    <Grid item xs={6}>
        <Paper className={classes.paper}>
            <Box display="flex" flexDirection="row">
                <Box>
                    <IconButton className={classes.iconBtnInActiveUsers}>
                        <MonetizationOnIcon />
                    </IconButton>
                </Box>
                <Box className={classes.count}>
                    <Typography className={classes.numbers} variant="h5" >
                        <CountUp start={0} end={dashboard_reports.processing_loans} duration={2.75} separator=","/>
                    </Typography>
                    <Typography variant="button">
                        Loans Currently Being Processed
                    </Typography>
                </Box>
            </Box>
        </Paper>
    </Grid>
    <Grid item xs={3}>
        <Paper className={classes.paper}>
            <Box display="flex" flexDirection="row">
                <Box>
                    <IconButton className={classes.iconBtnActiveUsers}>
                        <AssignmentIcon />
                    </IconButton>
                </Box>
                <Box className={classes.count}>
                    <Typography className={classes.numbers} variant="h5" >
                        <CountUp start={0} end={dashboard_reports.active_loans} duration={2.75} separator=","/>
                    </Typography>
                    <Typography variant="button">
                        Active Loans
                    </Typography>
                </Box>
            </Box>
        </Paper>
    </Grid>
    
    <Grid item xs={3}>
        <Paper className={classes.paper}>
            <Box display="flex" flexDirection="row">
                <Box>
                    <IconButton className={classes.iconBtnBlockedAccount}>
                        <HourglassEmptyIcon />
                    </IconButton>
                </Box>
                <Box className={classes.count}>
                    <Typography className={classes.numbers} variant="h5" >
                        <CountUp start={0} end={dashboard_reports.pending_loans} duration={2.75} separator=","/>
                    </Typography>
                    <Typography variant="button">
                        Loans Pending Review
                    </Typography>
                </Box>
            </Box>
        </Paper>
    </Grid>
    <Grid item xs={3}>
        <Paper className={classes.paper}>
            <Box display="flex" flexDirection="row">
                <Box>
                    <IconButton className={classes.iconBtnDisbursed}>
                        <LocationCityIcon />
                    </IconButton>
                </Box>
                <Box className={classes.count}>
                    <Typography className={classes.numbers} variant="h5" >
                        <CountUp start={0} end={dashboard_reports.disbursed_loans} duration={2.75} separator=","/>
                    </Typography>
                    <Typography variant="button">
                        Disbursed Loans
                    </Typography>
                </Box>
            </Box>
        </Paper>
    </Grid>
    <Grid item xs={3}>
        <Paper className={classes.paper}>
            <Box display="flex" flexDirection="row">
                <Box>
                    <IconButton className={classes.iconBtnRejected}>
                        <CancelIcon />
                    </IconButton>
                </Box>
                <Box className={classes.count}>
                    <Typography className={classes.numbers} variant="h5" >
                        <CountUp start={0} end={dashboard_reports.rejected_loans} duration={2.75} separator=","/>
                    </Typography>
                    <Typography variant="button">
                        Rejected Loans
                    </Typography>
                </Box>
            </Box>
        </Paper>
    </Grid>
    <Grid item xs={3}>
        <Paper className={classes.paper}>
            <Box display="flex" flexDirection="row">
                <Box>
                    <IconButton className={classes.iconBtnLevel1}>
                        <AccountBalanceIcon />
                    </IconButton>
                </Box>
                <Box className={classes.count}>
                    <Typography className={classes.numbers} variant="h5" >
                        <CountUp start={0} end={dashboard_reports.registrations} duration={2.75} separator=","/>
                    </Typography>
                    <Typography variant="button">
                        Registered Applicants
                    </Typography>
                </Box>
            </Box>
        </Paper>
    </Grid>
</Grid>

    return (
        <div className={classes.root}>
            <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                    <Typography className={classes.header} variant="h6" gutterBottom>
                        Overview
                    </Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Box style={{marginRight: '14px'}}>
                        <DatePicker name="from_date" setDate={setDate} data={data} date={data.from_date} label={data.startLabel}/>
                    </Box>
                    <Box>
                        <DatePicker name="to_date" setDate={setDate} data={data} date={data.to_date} label={data.endLabel} />
                    </Box>
                </Box>
            </Box>
            {content}
        </div>
    )
}


export default Overview;
