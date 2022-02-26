import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, Form } from 'formik';
import Textfield from '../common/FormUI/Textfield';
import SelectField from '../common/FormUI/SelectField';
import * as Yup from 'yup';
import MobileNumber from '../common/FormUI/MobileNumber';

function ClientDetails(props) {

    const { setStore, handleClose, setPage, get_org } = props;
    
    const INITIAL_FORM_STATE = {
        admin_firstname: '',
        admin_lastname: '',
        email: '',
        mobile: '',
        business_number: '',
        name: '',
        type: '',
        address: '',
        domain: '',
    }

    const FORM_VALIDATION = Yup.object().shape({
        admin_firstname: Yup.string().required('This field is required'),
        admin_lastname: Yup.string().required('This field is required'),
        email: Yup.string().email('Invalid email').required('This field is required'),
        mobile: Yup.string().required('This field is required'),
        business_number: Yup.string().required('This field is required'),
        name: Yup.string().required('This field is required'),
        type: Yup.string().required('This field is required'),
        address: Yup.string().required('This field is required'),
        domain: Yup.string().required('This field is required'),
    });

    let organisation = { };

    if(get_org){
        get_org.organizations.forEach(el => {
            organisation[el.id] = el.name;
        })
    }

    const handleSubmit = (val) => {
        setStore(val);
        setPage(2)
    }

    return (
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
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <Textfield name="admin_firstname" label="Admin First Name"/>
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="admin_lastname" label="Admin Last Name"/>
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="email" label="Email"/>
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="business_number" label="Work Phone No."/>
                            </Grid>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <Textfield name="name" label="Company Name"/>
                            </Grid>
                            <Grid item xs={12}>
                                <SelectField 
                                    name="type"
                                    label="Type of Organisation"
                                    options={organisation}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Textfield name="address" label="Company Address"/>
                            </Grid>
                            <Grid item xs={12}>
                                <Textfield name="domain" label="Authorized Domain"/>
                            </Grid>
                            <Grid item xs={12} style={{textAlign: 'right'}}>
                                <Button onClick={handleClose} color="primary">
                                    Close
                                </Button>
                                <Button type="submit" color="primary" autoFocus>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ClientDetails
