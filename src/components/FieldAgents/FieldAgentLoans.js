import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import PageLoader from '../common/PageLoader';
import * as actions from '../../store/actions';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    margin: theme.spacing(2, 2),
  },
  container: {
    maxHeight: 940,
  },
}));

const columns = [
  { id: 'fname', label: 'First Name', minWidth: 170 },
  { id: 'mname', label: 'Middle Name', minWidth: 100 },
  {
    id: 'lname',
    label: 'Last Name',
    minWidth: 170,
  },
  {
    id: 'client',
    label: 'Client',
    minWidth: 170,
  },
  {
    id: 'ref',
    label: 'Reference',
    minWidth: 100,
  },
  {
    id: 'tenure',
    label: 'Tenure',
    minWidth: 50,
  },
  {
    id: 'amount',
    label: 'Amount',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'principal_amount',
    label: 'Principal Amount',
    minWidth: 60,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'monthly_installment',
    label: 'Monthly Installment',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'start_date',
    label: 'Start Date',
    minWidth: 70,
  },
  {
    id: 'sector',
    label: 'Sector',
    minWidth: 170,
  },
  {
    id: 'structure',
    label: 'Loan Type',
    minWidth: 80,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 60,
  },
  {
    id: 'created_at',
    label: 'Created At',
    minWidth: 100,
  },
];


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FieldAgentLoans = (props) => {
  const {setOpen, open, agentId, get_field_agents, getFieldAgentLoans} = props;
  const {field_agent_loans, field_agent_loans_loading} = props.fieldAgentLoansReducer;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    (agentId) && getFieldAgentLoans(agentId);
  }, [agentId]);

  const determineAgent = (id) => {
    let agent = get_field_agents.agents.find(el => el.id === id);
    return agent.fname + ' ' + agent.lname;
  }

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Loans Recorded by {(agentId) && determineAgent(agentId)}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Paper className={classes.root}>
          {(field_agent_loans_loading) ? <div style={{marginTop: '10px', paddingBottom: '50px'}}><PageLoader /></div> : (field_agent_loans) && <React.Fragment>
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
                {field_agent_loans.loans.length > 0 ? field_agent_loans.loans.map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }):<TableRow hover>
                <TableCell colSpan="14" align="center">
                    No Loans Found
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
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /></React.Fragment>}
        </Paper>
      </Dialog>
    </div>
  );
}

FieldAgentLoans.propTypes = {
  getFieldAgentLoans: PropTypes.func.isRequired,
  fieldAgentLoansReducer: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  fieldAgentLoansReducer: state.fieldAgentLoansReducer
})

export default connect(mapStateToProps, actions)(FieldAgentLoans)
