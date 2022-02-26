import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Formik, Form } from 'formik';
import Textfield from '../common/FormUI/Textfield';
import SelectField from '../common/FormUI/SelectField';
import * as Yup from 'yup';

function EmploymentDetails(props) {
    const { next, handleClose, store, setStore } = props;
    const [sect, setSector] = React.useState(null);

    const INITIAL_FORM_STATE = {
        employment_type: ('employment_type' in store) ? store.employment_type : "",
        employee_number: ('employee_number' in store) ? store.employee_number : "",
        employment_length: ('employment_length' in store) ? store.employment_length : "",
        ministry: ('ministry' in store) ? store.ministry : "",
        sector: ('sector' in store) ? store.sector : "",
        occupation: ('occupation' in store) ? store.occupation : "",
    }

    const FORM_VALIDATION = Yup.object().shape({
        employment_type: Yup.string().required('This field is required'),
        employee_number: Yup.string().required('This field is required'),
        employment_length: Yup.string().required('This field is required'),
        sector: Yup.string().required('This field is required'),
        occupation: Yup.string().required('This field is required'),
    });

    const FORM_VALIDATION_EXTENDED = Yup.object().shape({
        employment_type: Yup.string().required('This field is required'),
        employee_number: Yup.string().required('This field is required'),
        employment_length: Yup.string().required('This field is required'),
        ministry: Yup.string().required('This field is required'),
        sector: Yup.string().required('This field is required'),
        occupation: Yup.string().required('This field is required'),
    });

    const handleSubmit = (values) => {
        setStore({
            ...store,
            employment_type: values.employment_type,
            employee_number: values.employee_number,
            employment_length: values.employment_length,
            ministry: values.ministry,
            sector: values.sector,
            occupation: values.occupation,
        })
       
        next("Account Documents", 7);
    }

    const employmentType = {
        "fulltime": "Full Time",
        "contract": "Contract Worker",
        "consultant": "Consultant"
    }

    const sector = {
        "Government": "Government",
        "Cooperate": "Cooperate"
    }

    const ministry = {
        "Defense and War veterans": "Defense and War veterans",
        "Energy and Power Development": "Energy and Power Development",
        "Environment, Tourism and Hospitality Industry": "Environment, Tourism and Hospitality Industry",
        "Finance & Economic Development": "Finance & Economic Development",
        "Foreign Affairs and International Trade": "Foreign Affairs and International Trade",
        "Health and Child Care": "Health and Child Care",
        "Higher and Tertiary Education, Science and Technology": "Higher and Tertiary Education, Science and Technology",
        "Home Affairs and Cultural Heritage": "Home Affairs and Cultural Heritage",
        "Industry and Commerce": "Industry and Commerce",
        "Information, Communication Technology and Courier Services": "Information, Communication Technology and Courier Services",
        "Information, Media and Broadcasting Services": "Information, Media and Broadcasting Services",
        "Justice, Legal and Parliamentary Affairs": "Justice, Legal and Parliamentary Affairs",
        "Public Service, Labour and Social Welfare": "Public Service, Labour and Social Welfare",
        "Lands, Agriculture, Water, Climate and Rural Settlement": "Lands, Agriculture, Water, Climate and Rural Settlement",
        "Local Government, Public Works and National Housing": "Local Government, Public Works and National Housing",
        "Mines and Mining development": "Mines and Mining development",
        "Primary and Secondary Education": "Primary and Secondary Education",
        "Youth, Sport, Arts and Recreation": "Youth, Sport, Arts and Recreation",
        "Transport and Infrastructural Development": "Transport and Infrastructural Development",
        "Women affairs, Community, Small and Medium Enterprise": "Women affairs, Community, Small and Medium Enterprise"
    }

    return (
        <Formik
            initialValues={{...INITIAL_FORM_STATE}}
            validationSchema={(sect === 'Government') ? FORM_VALIDATION_EXTENDED : FORM_VALIDATION}
            enableReinitialize={true}
            onSubmit={values => {
                handleSubmit(values)
            }}
        >
            {({ setFieldValue, ...rest}) => {
                rest.values.sector && setSector(rest.values.sector);
                return (
                    <Form>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <SelectField
                                    name="employment_type"
                                    label="Employment Type"
                                    options={employmentType}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="employee_number" label="Employee Number" />
                            </Grid>
                            <Grid item xs={6}>
                                <Textfield name="employment_length" label="Employment Length (Months)" />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectField
                                    name="sector"
                                    label="Employment Sector"
                                    options={sector}
                                />
                            </Grid>
                            {(sect === "Government") &&  
                            <Grid item xs={12}>
                                <SelectField
                                    name="ministry"
                                    label="Employment Ministry"
                                    options={ministry}
                                />
                            </Grid>}
                            <Grid item xs={12}>
                                <Textfield name="occupation" label="Occupation / Position" />
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" >
                                    <Box flexGrow={1}>
                                        <Button onClick={() => handleClose()} color="primary">
                                            Close
                                        </Button>
                                    </Box>
                                    <Box>
                                        <Button variant="contained" color="primary" onClick={() => next("Next Of Kin", 5)} color="primary">
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

export default EmploymentDetails


