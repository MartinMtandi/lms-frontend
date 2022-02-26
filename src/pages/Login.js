import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextLoop from "react-text-loop";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Textfield from '../components/common/FormUI/Textfield';
import PasswordField from '../components/common/FormUI/PasswordField';
import Logo from '../images/centriqo_LMS.png';
import dataGridLogo from '../images/400dpiLogo.png';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import jwt_decode from "jwt-decode";
import Hidden from '@material-ui/core/Hidden';
import * as Yup from 'yup';
import { connect } from "react-redux";
import * as actions from '../store/actions';
import Loader from '../assets/382.gif';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    parent: {
        flexGrow: 1,
    },
    wrap: {
        padding: theme.spacing(1, 0, 2, 0)
    },
    paper: {
        minWidth: '60vw',
        backgroundColor: '#fff',
        color: theme.palette.text.secondary,
        [theme.breakpoints.down('sm')]: {
            margin: 24,
          },
    },
    box: {
        borderTop: '1px solid #ccc',
        padding: theme.spacing(3, 0),
        marginTop: theme.spacing(3)
    },  
    loader: {
        background: '#4B5563',
        borderRadius: '4px',
        padding: '2px'
    },
    img: {
        display: 'block',
        margin: '0 auto 30px auto',
    },
    error: {
        margin: theme.spacing(1, 0)
    },
    padding: {
        // margin: theme.spacing(2),
        padding: theme.spacing(4, 2)
    },
    link: {
        textDecoration: 'none',
        fontWeight: 600,
        color: '#1B2377',
    },
}));

function Login(props) {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const {login, clearAuthError} = props;
    const {user, user_loading, user_error} = props.authReducer;
    
    const INITIAL_FORM_STATE = {
        email: '',
        password: ''
    }

    const FORM_VALIDATION = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('This field is required'),
        password: Yup
        .string()
        .required('This field is required')
    });

    React.useEffect(() => {
        (user_error) && setOpen(true);
        if(user){
            var decoded = jwt_decode(user.token);
            (decoded.role === 'Adminstrator') ? history.push('/home') : history.push('/customers');
        }
    }, [user_error, history, user]); 

    const handleClearError = () => {
        setOpen(false)
        clearAuthError();
    }

    return (
        <div id="bg">
            <div className={classes.root}>
                <Paper elevation={3} className={classes.paper}>
                    <Box display="flex" alignItems="center">
                        <div className={classes.parent}>
                            <Grid container>
                                <Grid item lg={5} xs={12} className={classes.padding}>
                                    <Formik
                                        initialValues={{...INITIAL_FORM_STATE}}
                                        validationSchema={FORM_VALIDATION}
                                        onSubmit={values => {
                                            login(values)
                                        }}
                                    >
                                        <Form>
                                            <img className={classes.img} alt="logo" src={Logo} height="80" />
                                            <Typography variant="button" gutterBottom >Sign In</Typography>
                                            {user_error && (
                                                <Collapse in={open}>
                                                    <Alert
                                                        className={classes.error}
                                                        severity="error"
                                                        action={
                                                            <IconButton
                                                                aria-label="close"
                                                                color="inherit"
                                                                size="small"
                                                                onClick={() => handleClearError()}
                                                            >
                                                            <CloseIcon fontSize="inherit" />
                                                            </IconButton>
                                                        }
                                                    >
                                                        {user_error}
                                                    </Alert>
                                                </Collapse>
                                            )}
                                            <Grid container spacing={3} className={classes.wrap}>
                                                <Grid item xs={12}>
                                                    <Textfield name="email" label="Email"/>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <PasswordField labelWidth={70} name="password" label="Password" />
                                                </Grid>
                                            </Grid>
                                            {user_loading ? <Box display="flex" alignItems="center" justifyContent="center" className={classes.loader} >
                                                <img height="30" src={Loader} alt="Loader" />
                                            </Box> : <Button type="submit" fullWidth variant="contained" color="secondary">
                                                Login
                                            </Button>}
                                            
                                            <Box className={classes.box}>
                                                <Alert severity="info">Forgot password? — <Link to="#" className={classes.link}>Click here!</Link></Alert>
                                            </Box>
                                            <Box align="center">
                                                <Typography variant="caption" gutterBottom>
                                                    Powered By
                                                </Typography>
                                            </Box>
                                            <Box align="center">
                                                <img alt="puzzle logo" src={dataGridLogo} height="42px" />
                                            </Box>
                                        </Form>
                                    </Formik>
                               </Grid>
                               <Hidden smDown>
                                    <Grid item lg={7}  id="bg-dark" >
                                            <Box className={classes.root}>
                                                <Box>
                                                    <Typography style={{fontWeight: 600}} variant="h4" gutterBottom>
                                                        Welcome to the <br />Centriqo Dashboard
                                                    </Typography>
                                                    <Typography variant="h6" gutterBottom>
                                                        All-in-one management tool for <br />
                                                        <TextLoop>
                                                        <span>Loan processing</span>
                                                        <span>Merchant accounts management</span>
                                                        <span>Reports generation</span>
                                                    </TextLoop>{" "}
                                                    </Typography>
                                                    
                                                </Box>
                                            </Box>
                                        </Grid>
                               </Hidden>
                            </Grid>
                        </div>
                    </Box>
                </Paper>
            </div>
        </div>
    )
}

Login.propTypes = {
	authReducer: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
	clearAuthError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	authReducer: state.authReducer,
});

export default connect(mapStateToProps, actions)(Login);



