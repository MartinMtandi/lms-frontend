import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import PaymentIcon from '@material-ui/icons/Payment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import PageLoader from '../common/PageLoader';
import MakeRepayments from './MakeRepayments';
import ViewRepayments from './ViewRepayments';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3)
  },
  container: {
    maxHeight: 940,
  },
}));


const columns = [
  { id: 'client', label: 'Client', minWidth: 100 },
  {
    id: 'ref',
    label: 'Ref No.',
    minWidth: 170,
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'tenure',
    label: 'Tenure',
    minWidth: 50,
  },
  {
    id: 'principal_amount',
    label: 'Principal Amount',
    minWidth: 80,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'monthly_installment',
    label: 'Monthly Installment',
    minWidth: 90,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'start_date',
    label: 'Start Date',
    minWidth: 100,
  },
  {
    id: 'sector',
    label: 'Sector',
    minWidth: 100,
  },
  {
    id: 'structure',
    label: 'Loan Type',
    minWidth: 90,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 90,
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 100,
    align: 'right',
  },
];

function ViewLoans(props) {
  const classes = useStyles();
  const { clearGetCustomerLoan, getCustomerLoans, id } = props;
  const { customer_loan, customer_loan_loading } = props.customerLoanReducer;
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = React.useState(false);
  const [dialog, setDialog] = React.useState(false);
  const [repaymentId, setRepaymentId] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(++newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  React.useEffect(() => {
    let data = {
      id,
      page: page,
      rows_per_page: rowsPerPage
    }
    getCustomerLoans(data);

    return () => {
      clearGetCustomerLoan();
    }
  }, [page, rowsPerPage]);

  const handleOpen = (id) => {
    setOpen(true);
    setRepaymentId(id);
  }

  const handleDialog = (id) => {
    setDialog(true);
    setRepaymentId(id);
  }

  let content = (customer_loan_loading) ? <PageLoader /> : (customer_loan) && <Paper className={classes.root}>
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
        {customer_loan.loans.length > 0 ? customer_loan.loans.map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
              {columns.map((column) => {
                const value = (row[column.id] !== undefined) ? row[column.id] : <Box>
                    <Tooltip title="Make Repayment">
                          <IconButton aria-label="makerepayment" onClick={() => handleOpen(row.id)}>
                              <PaymentIcon />
                          </IconButton>
                      </Tooltip>
                      <Tooltip title="View Repayment">
                          <IconButton onClick={() => handleDialog(row.id)} aria-label="viewrepayment">
                              <VisibilityIcon  />
                          </IconButton>
                      </Tooltip>
                </Box>
                return (
                  <TableCell key={column.id} align={column.align}>
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        }) : <TableRow>
              <TableCell colSpan="12" align="center">
                  No Loans Found
              </TableCell>
          </TableRow>}
      </TableBody>
    </Table>
  </TableContainer>
  <TablePagination
    rowsPerPageOptions={[10, 25, 50, 100]}
    component="div"
    count={10}
    rowsPerPage={rowsPerPage}
    page={page - 1}
    onChangePage={handleChangePage}
    onChangeRowsPerPage={handleChangeRowsPerPage}
  />
  {(open) && <MakeRepayments open={open} setOpen={setOpen} repaymentId={repaymentId} />}
  {(dialog) && <ViewRepayments dialog={dialog} setDialog={setDialog} repaymentId={repaymentId} />}
</Paper>

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  );
}

ViewLoans.propTypes = {
  getCustomerLoans: PropTypes.func.isRequired,
  clearGetCustomerLoan: PropTypes.func.isRequired,
  customerLoanReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  customerLoanReducer: state.customerLoanReducer
})

export default connect(mapStateToProps, actions)(ViewLoans);
