import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import PageLoader from '../common/PageLoader';
import BusinessRules from './BusinessRules';

const columns = [
  { id: 'org_name', label: 'Org. Name', minWidth: 170 },
  { id: 'organization', label: 'Org. Type', minWidth: 100 },
  {
    id: 'business_number',
    label: 'Business Number',
    minWidth: 170,
  },
  {
    id: 'address',
    label: 'Address',
    minWidth: 170,
  },
  {
    id: 'admin',
    label: 'Contact Person',
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
    id: 'domain',
    label: 'Authorized Domain',
    minWidth: 170,
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
    marginTop: theme.spacing(3)
  },
  container: {
    maxHeight: 900,
  },
}));

const ClientListTable = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const { create_client } = props.createClientsReducer;
  const [id, setId] = React.useState(null);
  const { getClients, clearCreateClient, to_date, from_date, clearClientBusinessRules } = props;
  const {  get_clients, get_clients_loading } = props.getClientsReducer;

  const handleChangePage = (event, newPage) => {
    setPage(++newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
  };

  const handleClose = () => {
    setOpen(false);
    setId(null);
    clearClientBusinessRules();
  };

  const handleOpenBusinessRule = (id) => {
    setId(id);
    setOpen(true);
  }

  React.useEffect(() => {
    let data = {
      to_date,
      from_date,
      page: page,
      rows_per_page: rowsPerPage
    }

    getClients(data);

    if(create_client){
      clearCreateClient();
    }
    
  }, [getClients, create_client, clearCreateClient, from_date, to_date, page, rowsPerPage]);

  let content = (get_clients_loading) ? <PageLoader /> : (get_clients) && <Paper className={classes.root}>
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
            {get_clients.clients.length > 0 ? get_clients.clients.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = (row[column.id] !== undefined) ? row[column.id] : <Box>
                      <Tooltip title="View Business Rules" onClick={() => handleOpenBusinessRule(row.id)}>
                          <IconButton aria-label="emojiPeopleIcon">
                              <BusinessCenterIcon />
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
      <Dialog open={open} aria-labelledby="form-dialog-title">
            <BusinessRules id={id} handleClose={handleClose} />
      </Dialog>
    </Paper>

  return (
    <>
      {content}
    </>
  );
}

ClientListTable.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  clearCreateClient: PropTypes.func.isRequired,
  clearClientBusinessRules: PropTypes.func.isRequired,
  getClientsReducer: PropTypes.object.isRequired,
  createClientsReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  getClientsReducer: state.getClientsReducer,
  createClientsReducer: state.createClientsReducer
})

export default connect(mapStateToProps, actions)(ClientListTable);
