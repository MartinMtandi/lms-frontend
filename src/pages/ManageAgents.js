import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from '../store/actions';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import Textfield from '../components/common/FormUI/Textfield';
import SelectField from '../components/common/FormUI/SelectField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Alert from '@material-ui/lab/Alert';
import DialogTitle from '@material-ui/core/DialogTitle';
import AgentsListTable from '../components/Agents/AgentsListTable';
import DatePicker from '../components/common/FormUI/DatePicker';
import MobileNumber from '../components/common/FormUI/MobileNumber';
import * as Yup from 'yup';
import banks from '../utils/banks';

function ManagerAgents(props) {
    const [open, setOpen] = React.useState(false);
    const { getAgents, clearCreateAgents, createAgent, clearCreateAgentsError } = props;
    const {  create_agent, create_agent_loading, create_agent_error } = props.createAgentReducer;

    let today = new Date();
    let to = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let six_months_back = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());
    let from = six_months_back.getFullYear() + '-' + (six_months_back.getMonth() - 6) + '-' + six_months_back.getDate();

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
        clearCreateAgents();
        clearCreateAgentsError();
    };

    React.useEffect(() => {
        getAgents(data);
        handleClose();
    }, [getAgents, create_agent, data]);

    const INITIAL_FORM_STATE = {
        name: '',
        business_number: '',
        address: '',
        agent_admin_firstname: '',
        agent_admin_lastname: '',
        email: '',
        phone: '',
        domain: '',
        fees: '',
        bank_name: '',
        account: '',
        bank_branch: '',
    }

    const FORM_VALIDATION = Yup.object().shape({
        name: Yup.string().required('This field is required'),
        business_number: Yup.string().required('This field is required'),
        address: Yup.string().required('This field is required'),
        agent_admin_firstname: Yup.string().required('This field is required'),
        agent_admin_lastname: Yup.string().required('This field is required'),
        email: Yup.string().email('Invalid email').required('This field is required'),
        phone: Yup.string().required('This field is required'),
        domain: Yup.string().required('This field is required'),
        fees: Yup.number().required('This field is required'),
        bank_name: Yup.string().required('This field is required'),
        account: Yup.string().required('This field is required'),
        bank_branch: Yup.string().required('This field is required'),
    });

    const handleSubmit = (data) => {
        createAgent(data);
    }

    return (
        <div>
            <Box display="flex" alignItems="center">
                <Box flexGrow={1}>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>New Agent</Button>
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
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>{"Create A New Agent"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                <Formik
                    initialValues={{...INITIAL_FORM_STATE}}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={values => {
                        handleSubmit(values)
                    }}
                >
                    {({ setFieldValue, ...rest }) => {
                        return (
                            <Form>
                                {(typeof create_agent_error === 'string' && create_agent_error) ? 
                                    <Grid item xs={12}>
                                        <Alert severity="error" onClose={() => clearCreateAgentsError()}>{create_agent_error}</Alert>
                                    </Grid> :
                                    (create_agent_error) && 
                                    Object.entries(create_agent_error).map(([key, value]) => (
                                        <Grid item xs={12}>
                                            <Alert severity="error" onClose={() => clearCreateAgentsError()}>{value}</Alert>
                                        </Grid>
                                    ))
                                }
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Textfield name="name" label="Business Name"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield name="business_number" label="Work Phone No."/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Textfield name="address" label="Address"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield name="agent_admin_firstname" label="Agent Firstname"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield name="agent_admin_lastname" label="Agent Lastname"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield name="email" label="Email"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <MobileNumber
                                            country={'zw'}
                                            value={""}
                                            name="phone"
                                            inputProps={{
                                                name: 'phone',
                                                required: true,
                                                autoFocus: false
                                            }}
                                            prefix="+"
                                            onChange={(mobile, country, e) => {
                                                rest.handleChange(e);
                                                setFieldValue("phone", "+" + mobile);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Textfield name="domain" label="Authorized Domain"/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <SelectField 
                                            name="bank_name"
                                            label="Bank"
                                            options={banks}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Textfield name="bank_branch" label="Branch Name"/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield name="account" label="Account No."/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield name="fees" label="Fees"/>
                                    </Grid>
                                    <Grid item xs={12} style={{textAlign: 'right'}}>
                                        <Button onClick={handleClose} color="primary">
                                            Close
                                        </Button>
                                        <Button disabled={(create_agent_loading) ? true : false} type="submit" color="primary" autoFocus>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        )
                    }}
                </Formik>
                </DialogContentText>
                </DialogContent>
            </Dialog>
            <AgentsListTable to_date={data.to_date} from_date={data.from_date} />
        </div>
    )
}

ManagerAgents.propTypes = {
    getAgents: PropTypes.func.isRequired,
    createAgent: PropTypes.func.isRequired,
    clearCreateAgentsError: PropTypes.func.isRequired,
    clearCreateAgents: PropTypes.func.isRequired,
    createAgentReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    createAgentReducer: state.createAgentReducer
})

export default connect(mapStateToProps, actions)(ManagerAgents)
