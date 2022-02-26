import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DatePicker from '../components/common/FormUI/DatePicker';
import { connect } from "react-redux";
import LoanDetails from '../components/Loans/LoanDetails';
import * as actions from '../store/actions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Textfield from '../components/common/FormUI/Textfield';
import PageLoader from '../components/common/PageLoader';

const columns = [
  { id: 'applicant', label: 'Applicant Name', minWidth: 170 },
  { id: 'client', label: 'Client', minWidth: 140 },
  {
    id: 'tenure',
    label: 'Tenure',
    minWidth: 80,
  },
  {
    id: 'loantype',
    label: 'Loan Type',
    minWidth: 90,
  },
  {
    id: 'products',
    label: 'Product Name',
    minWidth: 140,
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'principal',
    label: 'Principal Amount',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'monthly_installment',
    label: 'Monthly Installment',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'start_date',
    label: 'Start Date',
    minWidth: 100,
  },
  {
    id: 'end_date',
    label: 'End Date',
    minWidth: 100,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 50,
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 940,
  },
  margin: {
    margin: '0 10px'
  }
});

const LoanBook = (props) => {
  const classes = useStyles();
  const { loans, loans_loading } = props.getLoansReducer;
  const { getLoans } = props;

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const [loanId, setLoanId] = React.useState();

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
        startLabel: "From",
        endLabel: "To",
    });

  const handleChangePage = (event, newPage) => {
    setPage(++newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const INITIAL_FORM_STATE = {
    customer: ""
  }

  const FORM_VALIDATION = Yup.object().shape({
    customer: Yup.string().required('This field is required')
  })

  React.useEffect(() => {
      const payload = {
        page: page,
        rows_per_page: rowsPerPage,
        from_date: data.from_date,
        to_date: data.to_date
      }
    getLoans(payload);
  }, [getLoans, page, data, rowsPerPage]);


  const handleSubmit = (values) => {
    const payload = {
      page: page,
      rows_per_page: rowsPerPage,
      from_date: data.from_date,
      to_date: data.to_date,
      customer: values.customer 
    }
    getLoans(payload);
  }

  const handleLoanDetails = (id) => {
    setLoanId(id);
    setOpen(true);
  }

  let content = (loans_loading) ? <PageLoader /> :
    <>
    <Box display="flex" alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="h5" gutterBottom>
            Loan Book
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
            <Box style={{marginRight: '14px'}}>
                <DatePicker name="from_date" setDate={setDate} data={data} date={data.from_date} label={data.startLabel}/>
            </Box>
            <Box>
                <DatePicker name="to_date" setDate={setDate} data={data} date={data.to_date} label={data.endLabel} />
            </Box>
            <Box>
              <Formik
                initialValues={{...INITIAL_FORM_STATE}}
                validationSchema={FORM_VALIDATION}
                onSubmit={values => {
                    handleSubmit(values)
                }}
              >
                <Form>
                  <Box display="flex" alignItems="center">
                    <Box className={classes.margin}>
                      <Textfield name="customer" label="Customer Name"/>
                    </Box>
                    <Box>
                      <Button type="submit" variant="contained" color="primary">
                          Search
                      </Button>
                    </Box>
                  </Box>
                </Form>
              </Formik>
            </Box>
        </Box>
    </Box>
    <Paper className={classes.root}>
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
            {(loans && loans.loans.length) > 0 ? loans.loans.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id] !== undefined ? row[column.id] : <Box>
                      <Tooltip title="Loan Details" onClick={() => handleLoanDetails(row.id)}>
                          <IconButton aria-label="more">
                              <AssignmentIcon  />
                          </IconButton>
                      </Tooltip>
                    </Box>;
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            }) : <TableRow hover role="checkbox">
                    <TableCell colSpan="11" align="center">
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
    </Paper>
    <LoanDetails setOpen={setOpen} open={open} loanId={loanId} loans={loans} />
    </>

  return (
    <>
        {content}    
    </>
  );
}

LoanBook.propTypes = {
    getLoans: PropTypes.func.isRequired,
    getLoansReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    getLoansReducer: state.getLoansReducer
});


export default connect(mapStateToProps, actions)(LoanBook);
