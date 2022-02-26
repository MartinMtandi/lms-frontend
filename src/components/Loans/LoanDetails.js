import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';
import PageLoader from '../common/PageLoader';
import LoanDetailsTable from './LoanDetailsTable';
import KYCDocuments from './KYCDocuments';

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: '#2e1534',
  },
}));


const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const LoanDetails = (props) => {
  const classes = useStyles();
  const { loan_details, loan_details_loading } = props.loanDetailsReducer;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {setOpen, open, loanId, loanDetails, loans, clearLoanDetails} = props;

  const handleClose = () => {
    setOpen(false);
    clearLoanDetails();
  };

  React.useEffect(() => {
    (loanId) && loanDetails(loanId);
  }, [loanId]);

  const handleApplicantName = (id) => {
    let loan = (loanId && loans) ? loans.loans.find(loan => loan.id === id) : "";

    return loan.applicant;
  }

  let content = (loan_details_loading) ? <PageLoader /> : (loan_details) && <div className={classes.root}>
  <div className={classes.demo1}>
    <AntTabs value={value} onChange={handleChange} aria-label="ant example">
      <AntTab label="Loan Informattion" />
      <AntTab label="KYC Documents" />
    </AntTabs>
    <TabPanel value={value} index={0}>
      <LoanDetailsTable loan_details={loan_details} />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <KYCDocuments loan_details={loan_details} />
    </TabPanel>
    <Typography className={classes.padding} />
  </div>
</div>

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Loan Details: {handleApplicantName(loanId)}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        {content}
      </Dialog>
    </div>
  );
}

LoanDetails.propTypes = {
  loanDetails: PropTypes.func.isRequired,
  clearLoanDetails: PropTypes.func.isRequired,
  loanDetailsReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  loanDetailsReducer: state.loanDetailsReducer
})

export default connect(mapStateToProps, actions)(LoanDetails);

