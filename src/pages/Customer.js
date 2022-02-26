import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ApplicantPersonalDetails from '../components/Customers/ApplicantPersonalDetails';
import ApplicantNextOfKin from '../components/Customers/ApplicantNextOfKin';
import EmploymentDetails from '../components/Customers/EmploymentDetails';
import AccountDocuments from '../components/Customers/AccountDocuments';
import ViewApplications from '../components/Customers/ViewApplications';
import CreditAssessent from '../components/Applications/CreditAssessent';
import Box from '@material-ui/core/Box';
import DatePicker from '../components/common/FormUI/DatePicker';
import { connect } from "react-redux";
import * as Yup from 'yup';
import MuiAlert from '@material-ui/lab/Alert';
import { Formik, Form } from 'formik';
import * as actions from '../store/actions';
import TextfieldWrapper from '../components/common/FormUI/Textfield';
import Snackbar from '@material-ui/core/Snackbar';
import CreditAssessmentReport from '../components/Applications/CreditAssessmentReport';
import LoanApplication from '../components/Applications/LoanApplication';
import ConfirmationPage from '../components/Applications/ConfirmationPage';
import OfferLetter from '../components/Applications/OfferLetter';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Customer(props) {
    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [id, setId] = React.useState();
    const [title, setTitle] = React.useState("Credit Assessment");

    const initialState = {
        tenure: "",
        investments: "",
        expenses: "",
        current_loan: "",
        gross: "",
        net_salary: "",
        purpose: "",
        title: "",
        firstname: "",
        lastname: "",
        gender: "",
        marital_status: "",
        educational_level: "",
        residential_area: "",
        property_ownership: "",
        other_assets_owned: "",
        ecocash_number: "",
        mname: "",
        address: "",
        mobile: "",
        dob: "",
        national_id: "",
        suburb: "",
        city: "",
        email: "",
        password: "",
        confirm_password: "",
        next_of_kin_title: "",
        next_of_kin_firstname: "",
        next_of_kin_lastname: "",
        next_of_kin_address: "",
        next_of_kin_mobile: "",
        next_of_kin_email: "",
        next_of_kin_relationship: "",
        next_of_kin_national_id: "",
        employment_type: "",
        employee_number: "",
        employment_length: "",
        occupation: "",
        sector: "",
        ministry: "",
        structure: "",
        amount: "",
        application_type: "",
        client_id: "",
        user_id: "",
        available: "",
        bank: "",
        account: "",
        branch_name: "",
        branch_code: "",
        idcard: "",
        addressproof: "",
        payslip: "",
        statement: "",
        charges: "",
        gvt_tax: "",
        installments: "",
        interest: "",
        total: "",
    };

    const [store, setStore] = React.useState(initialState);

    const [state, setState] = React.useState({
        show: false,
    });

    const [pop, setPop] = React.useState({
        showing: false,
    });

    const vertical= 'top';
    const horizontal ='center';

    const { show } = state;
    const { showing } = pop;

    const { create_customer } = props.createCustomersReducer;
    const { user } = props.authReducer
    const { credit_assessment } = props.creditAssessmentReducer;
    const { bulk_loans, bulk_loans_error, bulk_loans_loading } = props.bulkLoansUploadsReducer;
    const { bulk_repayments, bulk_repayments_error, bulk_repayments_loading } = props.bulkRepaymentsUploadReducer;
    const { uploadBulkLoans, clearBulkLoansError, clearBulkLoansUploads, uploadBulkRepayments, clearBulkRepaymentsError, clearCreditAssessment, clearBulkRepaymentsUploads, clearCustomer, getMinistries, clearPreAssessment } = props;

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

    const INITIAL_FORM_STATE = {
        file: ""
    }

    const INITIAL_STATE = {
        file: ""
    }

    React.useEffect(() => {
        if(bulk_loans) {
            setState({...state, show: true})
        }
    }, [bulk_loans]);

    React.useEffect(() => {
        if(bulk_repayments){
            setPop({...pop, showing: true})
        }
    }, [bulk_repayments]);

    const handleSnackbarClose = () => {
        setState({ ...state, show: false });
        clearBulkLoansUploads();
    };

    const handleBulkRepaymentClose = () => {
        setPop({ ...pop, showing: false });
        clearBulkRepaymentsUploads();
    }

    const FORM_VALIDATION = Yup.object().shape({
        file: Yup.mixed().required('This field is required').test("type", "Wrong file format: CSV file required", (value) => {
            return (
                value && (value.type === "application/csv" || value.type === "application/vnd.ms-excel")
            )
        })
    });

    const VALIDATION = Yup.object().shape({
        file: Yup.mixed().required('This field is required').test("type", "Wrong file format: CSV file required", (value) => {
            return (
                value && (value.type === "application/csv" || value.type === "application/vnd.ms-excel")
            )
        })
    });

    const handleFileUpload = (data) => {
        uploadBulkLoans(data);
    }

    const handleFileRepaymentUpload = (data) => {
        uploadBulkRepayments(data);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setStore(initialState);
        setStep(1);
        setTitle("Credit Assessment");
        clearCreditAssessment();
        clearCustomer();
        clearPreAssessment();
    };

    React.useEffect(() => {
        getMinistries();
    }, [getMinistries]);

    React.useEffect(() => {
        (create_customer) && handleClose();
    }, [create_customer]);

    React.useEffect(() => {
        if(credit_assessment){
            setStep(2);
            setTitle("");
        }
    }, [credit_assessment]);

    let content;

    const next = (title, step) => {
        setTitle(title);
        setStep(step);
    }

    switch (step) {
        case 1: 
            content = <CreditAssessent id={user.user.client_id} handleClose={handleClose} store={store} setStore={setStore} />
            break;
        case 2: 
            content = <CreditAssessmentReport setStore={setStore} store={store} credit_assessment={credit_assessment} handleClose={handleClose} next={next} />
            break;
        case 3:
            content = <LoanApplication credit_assessment={credit_assessment} store={store} setStore={setStore} next={next} handleClose={handleClose} id={user.user.client_id} />
            break;
        case 4:
            content = <ApplicantPersonalDetails next={next} handleClose={handleClose} store={store} setStore={setStore} />
            break;
        case 5:
            content = <ApplicantNextOfKin next={next} handleClose={handleClose} store={store} setStore={setStore} />
            break;
        case 6:
            content = <EmploymentDetails next={next} handleClose={handleClose} store={store} setStore={setStore} />
            break;
        case 7:
            content = <AccountDocuments handleClose={handleClose} store={store} next={next} setStore={setStore} />
            break;
        case 8:
            content = <ConfirmationPage store={store} handleClose={handleClose} next={next} />
            break;
        case 9:
            content = <OfferLetter store={store} handleClose={handleClose} setStore={setStore} next={next} />
            break;
        default:
            break;
    }

    return (
        <div>
            <Box display="flex" alignItems="center" style={{borderBottom: '1px solid #ccc', paddingBottom: '20px', marginBottom: '20px'}}>
                <Box flexGrow={1}>
                    <Button variant="contained" color="primary" onClick={handleClickOpen}>Apply For Loan</Button>
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
            <Box display="flex" alignItems="center" style={{padding: '20px 0'}}>
                <Box flexGrow={1}>
                    <Box display="flex" alignItems="flex-start">
                       
                        <Box>
                            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={show}
                                onClose={handleSnackbarClose}
                                severity="success"
                                autoHideDuration={9000}
                                key={vertical + horizontal}
                            >
                                <Alert severity="success">{(bulk_loans) && bulk_loans.message}</Alert>
                            </Snackbar>
                            <Formik
                                initialValues={{...INITIAL_FORM_STATE}}
                                validationSchema={FORM_VALIDATION}
                                onSubmit={(values, {resetForm}) => {
                                    handleFileUpload(values);
                                    resetForm({values: ""});
                                }}
                            >
                                {({setFieldValue}) => {
                                    return (
                                        <Form>
                                            <Box display="flex" alignItems="flex-start">
                                                <Box style={{margin: '0 10px 0 20px'}}>
                                                    <TextfieldWrapper 
                                                        value={undefined} 
                                                        type="file"
                                                        size="small"
                                                        name="file"
                                                        onChange={(e) => { setFieldValue("file", e.target.files[0])}}  
                                                        InputLabelProps={{shrink: true,}}
                                                        label="CSV Bulk Loan Upload"
                                                    />
                                                </Box>
                                                <Box>
                                                    <Button disabled={(bulk_loans_loading) ? true : false} type="submit" variant="outlined" color="primary">Bulk Loan Uploads</Button>
                                                </Box>
                                            </Box>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box display="flex" alignItems="flex-start">
                       
                        <Box>
                            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={showing}
                                onClose={handleBulkRepaymentClose}
                                severity="success"
                                autoHideDuration={9000}
                                key={vertical + horizontal}
                            >
                                <Alert severity="success">{(bulk_repayments) && bulk_repayments.message}</Alert>
                            </Snackbar>
                            <Formik
                                initialValues={{...INITIAL_STATE}}
                                validationSchema={VALIDATION}
                                onSubmit={(values, {resetForm}) => {
                                    handleFileRepaymentUpload(values);
                                    resetForm({values: ""});
                                }}
                            >
                                {({setFieldValue}) => {
                                    return (
                                        <Form>
                                            <Box display="flex" alignItems="flex-start">
                                                <Box style={{margin: '0 10px 0 20px'}}>
                                                    <TextfieldWrapper 
                                                        value={undefined} 
                                                        type="file"
                                                        size="small"
                                                        name="file"
                                                        onChange={(e) => { setFieldValue("file", e.target.files[0])}}  
                                                        InputLabelProps={{shrink: true,}}
                                                        label="CSV Bulk Repayment Upload"
                                                    />
                                                </Box>
                                                <Box>
                                                    <Button disabled={(bulk_repayments_loading) ? true : false} type="submit" variant="outlined" color="primary">Bulk Repayment Uploads</Button>
                                                </Box>
                                            </Box>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{ title }</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <ViewApplications id={id} setId={setId} to_date={data.to_date} from_date={data.from_date} create_customer={create_customer} />
        </div>
    )
}

Customer.propTypes = {
    bulkLoansUploadsReducer: PropTypes.object.isRequired,
    bulkRepaymentsUploadReducer: PropTypes.object.isRequired,
    createCustomersReducer: PropTypes.object.isRequired,
    clearBulkLoansError: PropTypes.func.isRequired,
    clearBulkLoansUploads: PropTypes.func.isRequired,
    uploadBulkLoans: PropTypes.func.isRequired,
    clearBulkRepaymentsUploads: PropTypes.func.isRequired,
    clearBulkRepaymentsError: PropTypes.func.isRequired,
    uploadBulkRepayments: PropTypes.func.isRequired,
    clearPreAssessment: PropTypes.func.isRequired,
    clearCreditAssessment: PropTypes.func.isRequired,
    getMinistries: PropTypes.func.isRequired,
    clearCustomer: PropTypes.func.isRequired,
    authReducer: PropTypes.object.isRequired,
    creditAssessmentReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	bulkLoansUploadsReducer: state.bulkLoansUploadsReducer,
    bulkRepaymentsUploadReducer: state.bulkRepaymentsUploadReducer,
    createCustomersReducer: state.createCustomersReducer,
    authReducer: state.authReducer,
    creditAssessmentReducer: state.creditAssessmentReducer
});

export default connect(mapStateToProps, actions)(Customer)
