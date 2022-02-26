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
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import PageLoader from '../common/PageLoader';

const columns = [
  { id: 'agent_name', label: 'Agent Name', minWidth: 170 },
  { id: 'business_number', label: 'Business Phone Number', minWidth: 100 },
  {
    id: 'address',
    label: 'Address',
    minWidth: 170,
  },
  {
    id: 'agent_admin',
    label: 'Agent Administrator',
    minWidth: 100,
  },
  {
    id: 'phone',
    label: 'Phone No.',
    minWidth: 90,
  },
  {
    id: 'fees',
    label: 'Fees ($)',
    minWidth: 60,
  },
  {
    id: 'domain',
    label: 'Authorized Domain',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
  },
  {
    id: 'created_at',
    label: 'Created At',
    minWidth: 100,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  container: {
    maxHeight: 900,
  },
}));

const AgentListTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const { create_client } = props.createClientsReducer;

  const { getClients, clearCreateClient, to_date, from_date } = props;
  const {  agents, agents_loading } = props.getAgentsReducer;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    let data = {
      to_date,
      from_date
    }
    getClients(data);
    if(create_client){
      clearCreateClient();
    }
  }, [getClients, create_client, clearCreateClient, from_date, to_date]);

  console.log(agents)

  let content = (agents_loading) ? <PageLoader /> : (agents) && <Paper className={classes.root}>
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
            {agents.agents.length > 0 ? agents.agents.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
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
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>

  return (
    <>
      {content}
    </>
  );
}

AgentListTable.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  clearCreateClient: PropTypes.func.isRequired,
  getAgentsReducer: PropTypes.object.isRequired,
  createClientsReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    getAgentsReducer: state.getAgentsReducer,
  createClientsReducer: state.createClientsReducer
})

export default connect(mapStateToProps, actions)(AgentListTable);
