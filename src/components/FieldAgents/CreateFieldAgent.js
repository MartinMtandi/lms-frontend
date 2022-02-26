import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Textfield from '../common/FormUI/Textfield';
import MobileNumber from '../common/FormUI/MobileNumber';
import SelectField from '../common/FormUI/SelectField';
import banks from '../../utils/banks';
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';


function CreateFieldAgent(props) {
    const {setOpen, createFieldAgent, clearCreateFieldAgentError, clearCreateFieldAgent, agentStore, SetAgentStore, updateFieldAgent, clearUpdateFieldAgent, clearUpdateFieldAgentError} = props;
    const {field_agent, field_agent_loading, field_agent_error} = props.createFieldAgentReducer;
    const {user} = props.authReducer;
    const {update_field_agent, update_field_agent_loading, update_field_agent_error} = props.updateFieldAgentReducer;

    const INITIAL_STATE = {
        client_id: ('id' in agentStore) ? agentStore.id : user.user.client_id,
        fname: ('fname' in agentStore) ? agentStore.fname : "",
        mname: ('mname' in agentStore) ? agentStore.mname : "",
        lname: ('lname' in agentStore) ? agentStore.lname : "",
        email: ('email' in agentStore) ? agentStore.email : "",
        mobile: ('mobile' in agentStore) ? agentStore.mobile : "",
        national_id: ('national_id' in agentStore) ? agentStore.national_id : "",
        address: ('address' in agentStore) ? agentStore.address : "",
        bank: ('bank' in agentStore) ? agentStore.bank : "",
        account: ('account' in agentStore) ? agentStore.account : "",
    }

    const FORM_VALIDATION = Yup.object().shape({
        client_id: Yup.number().required('This field is required'),
        fname: Yup.string().required('This field is required'),
        mname: Yup.string(),
        lname: Yup.string().required('This field is required'),
        email: Yup.string().email().required('This field is required'),
        mobile: Yup.string().required('This field is required'),
        national_id: Yup.string().required('This field is required'),
        address: Yup.string().required('This field is required'),
        bank: Yup.string().required('This field is required'),
        account: Yup.number().required('This field is required'),
    })

    React.useEffect(() => {
        if(field_agent || update_field_agent){
            clearCreateFieldAgent();
            clearUpdateFieldAgent();
            handleClose();
        }
    }, [field_agent, update_field_agent]);

    const handleClose = () => {
        setOpen(false)
        clearCreateFieldAgentError();
        SetAgentStore({});
    }

    return (
        <div>
            <Formik
            initialValues={{...INITIAL_STATE}}
            validationSchema={FORM_VALIDATION}
            enableReinitialize={true}
            onSubmit={values => {
                ('fname' in agentStore) ? updateFieldAgent(values) : createFieldAgent(values);
            }}
            >
                {({ setFieldValue, ...rest}) => {
                    return (
                        <Form>
                            <Grid container spacing={3}>
                                {field_agent_error &&
                                Object.entries(field_agent_error).map(([key, value]) => (
                                    <Grid item xs={12} key={key}>
                                        <Alert severity="error" onClose={() => clearCreateFieldAgentError()}>{value}</Alert>
                                    </Grid>
                                ))}
                                {update_field_agent_error &&
                                Object.entries(update_field_agent_error).map(([key, value]) => (
                                    <Grid item xs={12} key={key}>
                                        <Alert severity="error" onClose={() => clearUpdateFieldAgentError()}>{value}</Alert>
                                    </Grid>
                                ))}
                                <Textfield style={{display: 'none'}} name="client_id"  />
                                <Grid item xs={6}>
                                    <Textfield name="fname" label="First Name" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield name="mname" label="Middle Name" helperText="Optional" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield name="lname" label="Last Name" />
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield name="email" label="Email" />
                                </Grid>
                                <Grid item xs={6}>
                                    <MobileNumber
                                        country={'zw'}
                                        value={""}
                                        name="mobile"
                                        inputProps={{
                                            name: 'mobile',
                                            required: true,
                                            autoFocus: false
                                        }}
                                        prefix="+"
                                        onChange={(mobile, country, e) => {
                                            rest.handleChange(e);
                                            setFieldValue("mobile", "+" + mobile);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Textfield name="national_id" label="National Id" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Textfield name="address" label="Address" />
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectField 
                                        name="bank"
                                        label="Bank"
                                        options={banks}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Textfield name="account" label="Account Number" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-end" >
                                        <Box>
                                            <Button variant="contained" color="primary" onClick={handleClose} color="primary">
                                                Close
                                            </Button>
                                        </Box>
                                        <Box style={{marginLeft: '8px'}}>
                                            <Button disabled={(field_agent_loading || update_field_agent_loading) ? true : false} type="submit" color="primary" autoFocus> 
                                                Submit
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

CreateFieldAgent.propTypes = {
    createFieldAgent: PropTypes.func.isRequired,
    clearCreateFieldAgentError: PropTypes.func.isRequired,
    updateFieldAgent: PropTypes.func.isRequired,
    clearUpdateFieldAgent: PropTypes.func.isRequired,
    clearUpdateFieldAgentError: PropTypes.func.isRequired,
    clearCreateFieldAgent: PropTypes.func.isRequired,
    authReducer: PropTypes.object.isRequired,
    updateFieldAgentReducer: PropTypes.object.isRequired,
}


const mapStateToProps = (state) => ({
    authReducer: state.authReducer,
    updateFieldAgentReducer: state.updateFieldAgentReducer,
})

export default connect(mapStateToProps, actions)(CreateFieldAgent)
