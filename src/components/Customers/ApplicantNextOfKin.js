import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Formik, Form } from 'formik';
import Textfield from '../common/FormUI/Textfield';
import SelectField from '../common/FormUI/SelectField';
import MobileNumber from '../common/FormUI/MobileNumber';
import * as Yup from 'yup';

function ApplicantNextOfKin(props) {
    const { next, handleClose, store, setStore } = props;

    const INITIAL_FORM_STATE = {
        next_of_kin_title: ('next_of_kin_title' in store) ? store.next_of_kin_title : "",
        next_of_kin_firstname: ('next_of_kin_firstname' in store) ? store.next_of_kin_firstname : "",
        next_of_kin_lastname: ('next_of_kin_lastname' in store) ? store.next_of_kin_lastname : "",
        next_of_kin_address: ('next_of_kin_address' in store) ? store.next_of_kin_address : "",
        next_of_kin_mobile: ('next_of_kin_mobile' in store) ? store.next_of_kin_mobile : "",
        next_of_kin_email: ('next_of_kin_email' in store) ? store.next_of_kin_email : "",
        next_of_kin_national_id: ('next_of_kin_national_id' in store) ? store.next_of_kin_national_id : "",
        next_of_kin_relationship: ('next_of_kin_relationship' in store) ? store.next_of_kin_relationship : "",
    }

    const FORM_VALIDATION = Yup.object().shape({
        next_of_kin_title: Yup.string().required('This field is required'),
        next_of_kin_firstname: Yup.string().required('This field is required'),
        next_of_kin_lastname: Yup.string().required('This field is required'),
        next_of_kin_address: Yup.string().required('This field is required'),
        next_of_kin_relationship: Yup.string().required('This field is required'),
        next_of_kin_mobile: Yup.string().required('This field is required'),
        next_of_kin_email: Yup.string().email('Invalid email').required('This field is required'),
        next_of_kin_national_id: Yup.string().required('This field is required'),
    });

    const handleSubmit = (values) => {
        
        setStore({
            ...store,
            next_of_kin_title: values.next_of_kin_title,
            next_of_kin_firstname: values.next_of_kin_firstname,
            next_of_kin_lastname: values.next_of_kin_lastname,
            next_of_kin_address: values.next_of_kin_address,
            next_of_kin_mobile: values.next_of_kin_mobile,
            next_of_kin_email: values.next_of_kin_email,
            next_of_kin_relationship: values.next_of_kin_relationship,
            next_of_kin_national_id: values.next_of_kin_national_id,
        });

        next("Employment Details", 6);
    }

    const title = {
        "Mr": "Mr",
        "Mrs": "Mrs",
        "Ms": "Ms",
        "Miss": "Miss",
        "Prof": "Prof",
        "Dr": "Dr",
    }

    return (
        <Formik
            initialValues={{...INITIAL_FORM_STATE}}
            validationSchema={FORM_VALIDATION}
            enableReinitialize={true}
            onSubmit={values => {
                handleSubmit(values)
            }}
        >
            {({ setFieldValue, ...rest}) => {
                return (
                    <Form>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <SelectField
                                    name="next_of_kin_title"
                                    label="Title"
                                    options={title}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="next_of_kin_firstname" label="First Name" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="next_of_kin_lastname" label="Last Name" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="next_of_kin_relationship" label="Relationship" />
                            </Grid>
                            <Grid item xs={12}>
                                <Textfield name="next_of_kin_address" label="Address" />
                            </Grid>
                            <Grid item xs={12}>
                                <MobileNumber
                                    country={'zw'}
                                    value={""}
                                    name="next_of_kin_mobile"
                                    inputProps={{
                                        name: 'next_of_kin_mobile',
                                        required: true,
                                        autoFocus: false
                                    }}
                                    prefix="+"
                                    onChange={(mobile, country, e) => {
                                        rest.handleChange(e);
                                        setFieldValue("next_of_kin_mobile", "+" + mobile);
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="next_of_kin_email" label="Email" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="next_of_kin_national_id" label="National Id No." />
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" >
                                    <Box flexGrow={1}>
                                        <Button onClick={() => handleClose()} color="primary">
                                            Close
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button variant="contained" color="primary" onClick={() => next("Personal Details", 4)} color="primary">
                                            Back
                                        </Button>
                                    </Box>
                                    <Box style={{marginLeft: '8px'}}>
                                        <Button type="submit" color="primary" autoFocus> 
                                            Continue
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ApplicantNextOfKin

