import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import PageLoader from '../common/PageLoader';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    margin: theme.spacing(3)
  },
  container: {
    maxHeight: 940,
  },
}));

const columns = [
    { id: 'repaymentfor', label: 'Repayment For', minWidth: 170, },
    { id: 'installment', label: 'Installment', minWidth: 100, format: (value) => Number(value).toFixed(2), },
    {
      id: 'amount_paid',
      label: 'Amount Paid',
      minWidth: 170,
      align: 'right',
      format: (value) => Number(value).toFixed(2),
    },
    {
      id: 'balance',
      label: 'Balance',
      minWidth: 170,
      align: 'right',
      format: (value) => Number(value).toFixed(2),
    },
    {
      id: 'credit',
      label: 'Credit',
      minWidth: 170,
      align: 'right',
      format: (value) => Number(value).toFixed(2),
    },
    {
        id: 'payment_on',
        label: 'Payment On',
        minWidth: 170,
    },
    {
        id: 'payment_due_on',
        label: 'Payment Due On',
        minWidth: 170,
    },
    {
        id: 'current_state',
        label: 'Current State',
        minWidth: 170,
    },
    // {
    //     id: 'received_by',
    //     label: 'Received By',
    //     minWidth: 170,
    // },
    {
        id: 'monthly_installment',
        label: 'Monthly Installment',
        minWidth: 170,
        format: (value) => Number(value).toFixed(2),
    },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ViewRepayments(props) {
  const classes = useStyles();
  const {dialog, setDialog, getLoanRepayments, repaymentId} = props;
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {loan_repayments, loan_repayments_loading} = props.getRepaymentsReducer;

  const handleChangePage = (event, newPage) => {
    setPage(++newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleClose = () => {
    setDialog(false);
  };

  React.useEffect(() => {
    let data = {
      repaymentId,
      page: page,
      rows_per_page: rowsPerPage
    }
    
    getLoanRepayments(data);
  }, [getLoanRepayments, page, rowsPerPage]);

  const handleDateFormat = (day, month, year) => {
    return day + "/" + month + "/" + year;
  }

  let content = (loan_repayments_loading) ? <PageLoader /> : (loan_repayments) && <Paper className={classes.root}>
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
            {loan_repayments.repayments.length > 0 ? loan_repayments.repayments.map((row) => {
            return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) => {
                    const value = column.id === 'repaymentfor' ? handleDateFormat(row.day, row.month, row.year) : row[column.id];
                    return (
                    <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                    </TableCell>
                    );
                })}
                </TableRow>
            );
            }):<TableRow hover>
            <TableCell colSpan="10" align="center">
                No Repayments Found
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
    </Paper>

  return (
    <div>
      <Dialog fullScreen open={dialog} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              View Loan Repayments
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

ViewRepayments.propTypes = {
    getLoanRepayments: PropTypes.func.isRequired,
    getRepaymentsReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    getRepaymentsReducer: state.getRepaymentsReducer
})

export default connect(mapStateToProps, actions)(ViewRepayments);
