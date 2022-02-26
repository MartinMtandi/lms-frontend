import React from 'react';
import PropTypes from 'prop-types';
import Overview from '../components/Dashboard/Overview';
import LoanPayouts from '../components/Dashboard/LoanPayouts';
import PerMerchantAnalysis from '../components/Dashboard/PerMerchantAnalysis';
import CustomerComparison from '../components/Dashboard/CustomerComparison';
import GenderComparison from '../components/Dashboard/GenderComparison';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import * as actions from '../store/actions';
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));
  
function Home(props) {
    const classes = useStyles();
    const {getReports, getReportsReducer} = props;

    function addMonths(date, months) {
        date.setMonth(date.getMonth() + months);
        return date;
    }
      
    let today = new Date();
    let to = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let six_months_back = addMonths(today, -6);
    let from = six_months_back.getFullYear() + '-' + (six_months_back.getMonth() + 1) + '-' + six_months_back.getDate();
    
    const [data, setDate] = React.useState({
        to_date: to,
        from_date: from,
    });

    React.useEffect(() => {
        getReports(data)
    }, [data]);

    return (
        <div className={classes.root}>
         <Grid container spacing={3}>
           <Grid item xs={12}>
                <Overview getReportsReducer={getReportsReducer} data={data} setDate={setDate} />
           </Grid>
           {/* <Grid item xs={6}>
            <Paper className={classes.paper}>
                <LoanPayouts getReportsReducer={getReportsReducer} />
            </Paper>
           </Grid> */}
           <Grid item xs={12}>
            <Paper className={classes.paper}>
                <PerMerchantAnalysis getReportsReducer={getReportsReducer} />
            </Paper>
           </Grid>
           <Grid item xs={6}>
            <Paper className={classes.paper}>
                <CustomerComparison getReportsReducer={getReportsReducer} />
            </Paper>
           </Grid>
           <Grid item xs={6}>
            <Paper className={classes.paper} >
                <GenderComparison getReportsReducer={getReportsReducer} />
            </Paper>
           </Grid>
         </Grid>
       </div>
    )
}

Home.propTypes = {
    getReports: PropTypes.func.isRequired,
    getReportsReducer: PropTypes.object.isRequired,
} 

const mapStateToProps = (state) => ({
    getReportsReducer: state.getReportsReducer
});

export default connect(mapStateToProps, actions)(Home);
