import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Formik, Form } from 'formik';
import Textfield from '../common/FormUI/Textfield';
import SelectField from '../common/FormUI/SelectField';
import MobileNumber from '../common/FormUI/MobileNumber';
import PasswordField from '../common/FormUI/PasswordField';
import * as Yup from 'yup';

function ApplicantPersonalDetails(props) {
    const { next, handleClose, store, setStore } = props;

    const INITIAL_FORM_STATE = {
        title: ('title' in store) ? store.title : "",
        firstname: ('firstname' in store) ? store.firstname : "",
        lastname: ('lastname' in store) ? store.lastname : "",
        gender: ('gender' in store) ? store.gender : "",
        marital_status: ('marital_status' in store) ? store.marital_status : "",
        mname: ('mname' in store) ? store.mname : "",
        address: ('address' in store) ? store.address : "",
        mobile: ('mobile' in store) ? store.mobile : "",
        email: ('email' in store) ? store.email : "",
        dob: ('dob' in store) ? store.dob : "",
        national_id: ('national_id' in store) ? store.national_id : "",
        suburb: ('suburb' in store) ? store.suburb : "",
        city: ('city' in store) ? store.city : "",
        educational_level: ('educational_level' in store) ? store.educational_level : "",
        residential_area: ('residential_area' in store) ? store.residential_area : "",
        property_ownership: ('property_ownership' in store) ? store.property_ownership : "",
        other_assets_owned: ('other_assets_owned' in store) ? store.other_assets_owned : "",
        password: "@Poshmark13",
    }

    const FORM_VALIDATION = Yup.object().shape({
        title: Yup.string().required('This field is required'),
        firstname: Yup.string().required('This field is required'),
        lastname: Yup.string().required('This field is required'),
        gender: Yup.string().required('This field is required'),
        marital_status: Yup.string().required('This field is required'),
        educational_level: Yup.string().required('This field is required'),
        property_ownership: Yup.string().required('This field is required'),
        mname: Yup.string(),
        address: Yup.string().required('This field is required'),
        mobile: Yup.string().required('This field is required'),
        dob: Yup.string().required('This field is required'),
        email: Yup.string().email().required('This field is required'),
        national_id: Yup.string().required('This field is required'),
        suburb: Yup.string().required('This field is required'),
        residential_area: Yup.string().required('This field is required'),
        other_assets_owned: Yup.string().required('This field is required'),
        city: Yup.string().required('This field is required'),
        password: Yup.string().required('This field is required'),
    });

    const handleSubmit = async (values) => {
        values.confirm_password = values.password;
        await setStore({
            ...store,
            title: values.title,
            firstname: values.firstname,
            lastname: values.lastname,
            gender: values.gender,
            mname: values.mname,
            address: values.address,
            marital_status: values.marital_status,
            mobile: values.mobile,
            dob: values.dob,
            national_id: values.national_id,
            suburb: values.suburb,
            email: values.email,
            educational_level: values.educational_level,
            residential_area: values.residential_area,
            property_ownership: values.property_ownership,
            city: values.city,
            other_assets_owned: values.other_assets_owned,
            password: values.password,
            confirm_password: values.confirm_password,
        })

        next("Next of Kin", 5);
    }

    const gender = {
        "female": "Female",
        "male": "Male"
    }

    const title = {
        "Mr": "Mr",
        "Mrs": "Mrs",
        "Ms": "Ms",
        "Miss": "Miss",
        "Prof": "Prof",
        "Dr": "Dr",
    }

    const marital_status = {
        "Single": "Single",
        "Married": "Married",
        "Widowed": "Widowed",
        "Divorced": "Divorced",
    }

    const educational_level = {
        "High School": "High School",
        "Diploma": "Diploma",
        "Bachelors": "Bachelors",
        "Masters": "Masters",
        "PhD / Prof": "PhD / Prof",
        "Other": "Other",
    }

    const residential_area = {
        "Flat": "Flat",
        "High Density": "High Density",
        "Medium Density": "Medium Density",
        "Low Density": "Low Density",
        "Rural": "Rural",
    }

    const property_ownership = {
        "Owned": "Owned",
        "Rented": "Rented",
        "Parents": "Parents",
        "Employer Owned": "Employer Owned",
        "Mortgaged": "Mortgaged"
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
                                    name="title"
                                    label="Title"
                                    options={title}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="firstname" label="First Name" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="mname" label="Middle Name" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="lastname" label="Last Name" />
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
                                <SelectField
                                    name="gender"
                                    label="Gender"
                                    options={gender}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SelectField
                                    name="marital_status"
                                    label="Marital Status"
                                    options={marital_status}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SelectField
                                    name="educational_level"
                                    label="Educational Level"
                                    options={educational_level}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SelectField
                                    name="residential_area"
                                    label="Residential Area"
                                    options={residential_area}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <SelectField
                                    name="property_ownership"
                                    label="Property Ownership"
                                    options={property_ownership}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Textfield name="other_assets_owned" label="Other Assets Owned" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="address" label="Address" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="suburb" label="Surbub" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="city" label="City" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="email" label="Work Email" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield type="date" name="dob" label="Date of Birth" InputLabelProps={{shrink: true,}} />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="national_id" label="National ID" />
                            </Grid>
                            <Grid item xs={12} style={{display: 'none'}}>
                                <PasswordField labelWidth={70} name="password" />
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" >
                                    <Box flexGrow={1}>
                                        <Button onClick={() => handleClose()} color="primary">
                                            Close
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button variant="contained" color="primary" onClick={() => next("Loan Application", 3)} color="primary">
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

export default ApplicantPersonalDetails
