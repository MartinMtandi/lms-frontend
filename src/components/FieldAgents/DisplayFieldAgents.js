import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PageLoader from '../common/PageLoader';
import * as actions from '../../store/actions';
import FieldAgentLoans from './FieldAgentLoans';

const columns = [
    { id: 'fname', label: 'First Name', minWidth: 140 },
    {
      id: 'mname',
      label: 'Middle Name',
      minWidth: 120,
    },
    {
      id: 'lname',
      label: 'Last Name',
      minWidth: 140,
    },
    // {
    //   id: 'email',
    //   label: 'Email',
    //   minWidth: 160,
    // },
    {
        id: 'phone',
        label: 'Phone Number',
        minWidth: 100,
    },
    {
        id: 'national_id',
        label: 'National Id',
        minWidth: 100,
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
    },
    {
        id: 'bank',
        label: 'Bank',
        minWidth: 170,
    },
    {
        id: 'account',
        label: 'Account',
        minWidth: 100,
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 60,
    },
    {
        id: 'action',
        label: 'Action',
        align: 'right',
    },
];

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 940,
    },
});

function DisplayFieldAgents(props) {
    const {user} = props.authReducer;
    const {field_agent, getFieldAgents, handleUpdateFieldAgent, update_field_agent, suspendFieldAgent, activateFieldAgent, clearSuspendFieldAgent, clearActivateFieldAgent} = props;
    const {get_field_agents, get_field_agents_loading} = props.getFieldAgentsReducer;
    const {suspend_field_agent} = props.suspendFieldAgentReducer;
    const {activate_field_agent} = props.activateFieldAgentReducer;
    const [agentId, setAgentId] = React.useState();
    const [open, setOpen] = React.useState(false);
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

    React.useEffect(() => {
        getFieldAgents(user.user.client_id);
        clearActivateFieldAgent();
        clearSuspendFieldAgent();
    }, [field_agent, update_field_agent, activate_field_agent, suspend_field_agent]);

    const handleViewLoans = (id) => {
        setAgentId(id);
        setOpen(true);
    }

    let content = (get_field_agents_loading) ? <PageLoader /> : (get_field_agents) &&
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
                    {get_field_agents.agents.map((row) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                            const value = row[column.id] !== undefined ? row[column.id] : <Box display="flex" alignItems="flex-start">
                                {row.status === 'Active' ? 
                                <Tooltip title="Deactivate">
                                    <IconButton style={{color: '#b91c1c'}} aria-label="emojiPeopleIcon" onClick={() => suspendFieldAgent(row.id)}>
                                        <PersonAddDisabledIcon />
                                    </IconButton>
                                </Tooltip> : <Tooltip title="Activate" onClick={() => activateFieldAgent(row.id)}>
                                    <IconButton color="primary" aria-label="emojiPeopleIcon">
                                        <PersonAddIcon />
                                    </IconButton>
                                </Tooltip> }
                                <Tooltip title="Update" onClick={() => handleUpdateFieldAgent(row.id)}>
                                    <IconButton aria-label="updateloans">
                                        <AssignmentIndIcon  />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="View Loans" onClick={() => handleViewLoans(row.id)}>
                                    <IconButton aria-label="loandetails">
                                        <AccountBalanceIcon  />
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
                    })}
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
            />
            <FieldAgentLoans agentId={agentId} setOpen={setOpen} open={open} get_field_agents={get_field_agents} />
        </Paper>

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    )
}

DisplayFieldAgents.propTypes = {
    authReducer: PropTypes.object.isRequired,
    activateFieldAgentReducer: PropTypes.object.isRequired,
    getFieldAgents: PropTypes.func.isRequired,
    suspendFieldAgent: PropTypes.func.isRequired,
    clearSuspendFieldAgent: PropTypes.func.isRequired,
    activateFieldAgent: PropTypes.func.isRequired,
    clearActivateFieldAgent: PropTypes.func.isRequired,
    getFieldAgentsReducer: PropTypes.object.isRequired,
    suspendFieldAgentReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
    getFieldAgentsReducer: state.getFieldAgentsReducer,
    activateFieldAgentReducer: state.activateFieldAgentReducer,
    suspendFieldAgentReducer: state.suspendFieldAgentReducer,
})

export default connect(mapStateToProps, actions)(DisplayFieldAgents)
