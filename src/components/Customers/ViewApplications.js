import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Box from '@material-ui/core/Box';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import CreditAssessment from '../Applications/CreditAssessent';
import CreditAssessmentReport from '../Applications/CreditAssessmentReport';
import PageLoader from '../common/PageLoader';
import LoanApplication from '../Applications/LoanApplication';
import ProductShop from '../Applications/ProductShop';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Loader from '../../assets/Iphone-spinner-2.gif';
import Signature from '../Applications/Signature';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import ViewLoans from '../Loans/ViewLoans';

const columns = [
  { id: 'fname', label: 'First Name', minWidth: 170 },
  { id: 'mname', label: 'Middle Name', minWidth: 100 },
  {
    id: 'lname',
    label: 'Last Name',
    minWidth: 170,
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
  },
  {
    id: 'phone',
    label: 'Mobile Number',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 50,
  },
  {
      id: 'action',
      label: 'Action',
      align: 'right',
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2)
  },
  container: {
    maxHeight: 900,
  },
  box: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(1)
  },
  loader: {
    textAlign: 'center',
    padding: theme.spacing(5, 25)
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const ViewApplications = (props) => {
  const classes = useStyles();
  const { create_loan } = props.createLoanReducer;
  const [user, setUser] = React.useState(null);
  const [ open, setOpen ] = React.useState(false);
  const [ show, setShow ] = React.useState(false);
  const [ pop, setPop] = React.useState(false);
  const [ loanPayload, setLoanPayload ] = React.useState({});
  const [ active, setActive ] = React.useState("credit-assessment");
  const [ title, setTitle ] = React.useState("Credit Assessment");
  const { getCustomers, setId, id, clearCreditAssessmentError, getClients, clearCreditAssessment, nextOfKin, clearNextOfKin, getLoanTypes, getProducts, loanStructure, from_date, to_date, clearCreateLoan, create_customer } = props;
  const { get_customers, get_customers_loading } = props.getCustomersReducer;
  const { credit_assessment } = props.creditAssessmentReducer;
  const { nok, nok_loading } = props.nextofkinReducer;

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleClose = () => {
    setOpen(false);
    clearCreditAssessmentError();
    clearCreditAssessment();
    clearCreateLoan();
    setId(null);
    setActive("credit-assessment");
    setTitle("Credit Assessment");
  };

  const next = (title, page) => {
    setTitle(title);
    setActive(page);
  }

  React.useEffect(() => {
    if(credit_assessment){
      setActive("assessment-report");
      setTitle("");
    }
  }, [credit_assessment]);

  let activeComponent;

  switch (active) {
    case "credit-assessment":
      activeComponent = <CreditAssessment id={id} handleClose={handleClose} />
      break;
    case "assessment-report":
      activeComponent = <CreditAssessmentReport credit_assessment={credit_assessment} handleClose={handleClose} next={next} />
      break;
    case "loan-application":
      activeComponent = <LoanApplication credit_assessment={credit_assessment} setTitle={setTitle} setLoanPayload={setLoanPayload} setActive={setActive} handleClose={handleClose} id={id} />
      break;
    case "product-shop":
      activeComponent = <ProductShop />
      break;
    case "signature":
      activeComponent = <Signature loanPayload={loanPayload} />
    default:
      break;
  }

  const handleCloseNextOfKin = () => {
    setShow(false);
    setId(null);
    clearNextOfKin();
  }

  const getNextOfKinHandler = (id) => {
    nextOfKin(id);
    setId(id);
    setShow(true);
  }

  React.useEffect(() => {
    let data = {
      page: page,
      rows_per_page: rowsPerPage,
      to_date,
      from_date
    }

    getCustomers(data);

    // getProducts();
    getLoanTypes();
    loanStructure();
    if(create_loan){
      handleClose();
    }

  }, [getCustomers, create_customer, create_loan, from_date, to_date, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(++newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const filterCustomer = (id) => {
    const user = get_customers.customers.find(el => el.id === id);
    return (user) ? user.fname + "'s next of kin" : undefined;
  }

  const handleViewLoans = (id) => {
    setId(id);
    setPop(true);
  }

  const handleCloseLoans = () => {
    setId(null);
    setPop(false);
    setUser(null);
  }

  React.useEffect(() => {
    const result = (id && pop) ? get_customers.customers.find(el => el.id === id) : null;

    (result) && setUser(result);
  }, [pop])

  let content = (get_customers_loading) ? <PageLoader /> : (get_customers) && <Paper className={classes.root}>
    <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead>
            <TableRow>
            {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                {column.label}
                </TableCell>
            ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {get_customers.customers.length > 0 ? get_customers.customers.map((row) => {
            return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                    const value = (row[column.id] !== undefined) ? row[column.id] : <Box>
                        <Tooltip title="Next Of Kin Details">
                            <IconButton aria-label="emojiPeopleIcon" onClick={() => getNextOfKinHandler(row.id)}>
                                <EmojiPeopleIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="View Loans">
                            <IconButton onClick={() => handleViewLoans(row.id)} aria-label="loanapplication">
                                <ReceiptIcon  />
                            </IconButton>
                        </Tooltip>
                    </Box>;
                    return (
                    <TableCell key={column.id} align={column.align}>
                        {value}
                    </TableCell>
                    );
                })}
                </TableRow>
            );
            }) : <TableRow hover>
            <TableCell colSpan="9" align="center">
                No data found
            </TableCell>
        </TableRow>}
        </TableBody>
        </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={10}
        rowsPerPage={rowsPerPage}
        page={page - 1}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
    />
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {activeComponent}
          </DialogContentText>
        </DialogContent>
      </Dialog>

      {/* NEXT OF KIN */}
      <Dialog
        open={show}
        onClose={handleCloseNextOfKin}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">{filterCustomer(id)}</DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description">
            {nok_loading ? <Box className={classes.loader}>
              <img src={Loader} alt="loader" height="40" />
            </Box> : (nok) &&
            <Box display="flex" alignItems="flex-start">
              <Box>
                <AccountBoxIcon style={{fontSize: '120px'}} />
              </Box>
              <Box className={classes.box}>
                <Typography variant="subtitle1">
                  <span style={{fontWeight: '600'}}>{nok.nextofkin[0].next_of_kin_firstname + " " + nok.nextofkin[0].next_of_kin_lastname},</span> {nok.nextofkin[0].next_of_kin_address}
                </Typography>
                <Typography variant="subtitle1" style={{marginTop: '13px', color: '#818CF8'}}>{nok.nextofkin[0].next_of_kin_email}</Typography>
                <Typography variant="subtitle1">{nok.nextofkin[0].next_of_kin_phone}</Typography>
              </Box>
            </Box>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNextOfKin} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Loans */}
      <Dialog fullScreen open={pop} onClose={handleCloseLoans} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              View {(user) && user.fname + " " + user.lname}'s Loans
            </Typography>
            <Button autoFocus color="inherit" onClick={handleCloseLoans}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <ViewLoans id={id} />
      </Dialog>
    </Paper>
 
  return (
    <>
        {content}
    </>
  );
}

ViewApplications.propTypes = {
    getCustomers: PropTypes.func.isRequired,
    getCustomersReducer: PropTypes.object.isRequired,
    createCustomersReducer: PropTypes.object.isRequired,
    clearCreditAssessmentError: PropTypes.func.isRequired,
    creditAssessmentReducer: PropTypes.object.isRequired,
    clearCreditAssessment: PropTypes.func.isRequired,
    nextOfKin: PropTypes.func.isRequired,
    clearNextOfKin: PropTypes.func.isRequired,
    getProducts: PropTypes.func.isRequired,
    getClients: PropTypes.func.isRequired,
    getLoanTypes: PropTypes.func.isRequired,
    loanStructure: PropTypes.func.isRequired,
    clearCreateLoan: PropTypes.func.isRequired,
    createLoanReducer: PropTypes.object.isRequired,
    nextofkinReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    getCustomersReducer: state.getCustomersReducer,
    createCustomersReducer: state.createCustomersReducer,
    creditAssessmentReducer: state.creditAssessmentReducer,
    nextofkinReducer: state.nextofkinReducer,
    createLoanReducer: state.createLoanReducer
})

export default connect(mapStateToProps, actions)(ViewApplications);
