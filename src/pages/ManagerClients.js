import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../store/actions';
import Box from '@material-ui/core/Box';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ClientDetails from '../components/Client/ClientDetails';
import ClientAccountConfig from '../components/Client/ClientAccountConfig';
import ClientListTable from '../components/Client/ClientListTable';
import DatePicker from '../components/common/FormUI/DatePicker';

function ManagerClients(props) {
    const [open, setOpen] = React.useState(false);
    const [page, setPage] = React.useState(1);
    const [store, setStore] = React.useState(null);

    const { get_org } = props.getOrganisationsReducer;
    const { getOrganisations, clearCreateClientError, clearCreateClient } = props;
    
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPage(1);
        setStore(null);
        clearCreateClient();
        clearCreateClientError();
    };

    React.useEffect(() => {
        getOrganisations();
    }, [getOrganisations]);

    let content;

    switch (page) {
        case 1:
            content = <ClientDetails setPage={setPage} setStore={setStore} handleClose={handleClose} get_org={get_org} />
            break;
        case 2:
            content = <ClientAccountConfig store={store} handleClose={handleClose} />
            break;
        default:
            break;
    }

    return (
        <div>
            <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>New Client</Button>
                </Box>
                <Box display="flex" alignItems="center">
                    <Box style={{marginRight: '14px'}}>
                        <DatePicker name="from_date" setDate={setDate} data={data} date={data.from_date} label={data.startLabel}/>
                    </Box>
                    <Box>
                        <DatePicker name="to_date" setDate={setDate} data={data} date={data.to_date} label={data.endLabel} />
                    </Box>
                </Box>
            </Box>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{"Create A New Client"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {content}
                </DialogContentText>
                </DialogContent>
            </Dialog>
            <ClientListTable to_date={data.to_date} from_date={data.from_date} />
        </div>
    )
}

ManagerClients.propTypes = {
    getOrganisations: PropTypes.func.isRequired,
    clearCreateClient: PropTypes.func.isRequired,
    clearCreateClientError: PropTypes.func.isRequired,
    getOrganisationsReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    getOrganisationsReducer: state.getOrganisationsReducer
})

export default connect(mapStateToProps, actions)(ManagerClients)
