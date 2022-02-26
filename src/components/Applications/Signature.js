import React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import SignatureCanvas from 'react-signature-canvas';

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #9CA3AF',
        borderRadius: '5px',
    },
    title: {
        marginTop: 8,
        fontWeight: 600
    },
}));

function Signature(props) {
    const classes = useStyles();
    const { store, setStore, clearCreateLoanError, createCustomer, clearApplicantError, handleClose, next } = props;
    const { create_loan_loading, create_loan_error } = props.createLoanReducer;
    const { create_customer, create_customer_loading, create_customer_error} = props.createCustomersReducer;

    let signPad = React.useRef({});
    let witness01 = React.useRef({});
    let witness02 = React.useRef({});

    const clearCanvas = () => {
        signPad.current.clear();
        witness01.current.clear();
        witness02.current.clear();
    } 

    const handleSubmit = async () => {
        console.log(store);
        await setStore({
            ...store,
            signature: signPad.current.toDataURL()
        });

        createCustomer(store);
    }

    return (
        <>
        <Grid container spacing={3} style={{marginBottom: '10px'}}>
        {(create_loan_error) &&
            Object.entries(create_loan_error).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                    <Alert severity="error" onClose={() => clearCreateLoanError()}>{value}</Alert>
                </Grid>
            ))
        }
        </Grid>
        <Typography gutterBottom variant="subtitle1" className={classes.title}>Signature (Debtor)</Typography>
        <div className={classes.root}>
            <SignatureCanvas penColor='green' ref={signPad}
                canvasProps={{width: 500, height: 70, className: 'sigCanvas'}} 
            />,
        </div>
        <Box style={{paddingTop: '16px'}}>
            <Typography style={{fontWeight: 600}} gutterBottom variant="button">AS WITNESSED BY:</Typography>
        </Box>
        <Typography gutterBottom variant="subtitle1" className={classes.title}>Witness (1)</Typography>
        <div className={classes.root}>
            <SignatureCanvas penColor='red' ref={witness01}
                canvasProps={{width: 500, height: 70, className: 'sigCanvas'}} 
            />,
        </div>

        <Typography gutterBottom variant="subtitle1" className={classes.title}>Witness (2)</Typography>
        <div className={classes.root}>
            <SignatureCanvas penColor='orange' ref={witness02}
                canvasProps={{width: 500, height: 70, className: 'sigCanvas'}} 
            />,
        </div>
            <Grid container spacing={3} style={{marginTop: '8px'}}>
                <Grid item xs={12}>
                    <Box display="flex" >
                        <Box flexGrow={1}>
                            <Button onClick={() => handleClose()} color="primary">
                                Close
                            </Button>
                        </Box>
                        <Box>
                            <Button color="primary" onClick={clearCanvas}> 
                                Clear Signature
                            </Button>
                        </Box>
                        <Box style={{marginLeft: '8px'}}>
                            <Button variant="contained" color="primary" onClick={() => next("Confirmation Page", 8)} color="primary">
                                Back
                            </Button>
                        </Box>
                        <Box style={{marginLeft: '8px'}}>
                            <Button  disabled={(create_customer_loading) ? true : false} onClick={handleSubmit} color="primary" autoFocus> 
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

Signature.propTypes = {
    clearCreateLoanError: PropTypes.func.isRequired,
    createLoan: PropTypes.func.isRequired,
    createLoanReducer: PropTypes.object.isRequired,
    createCustomersReducer: PropTypes.object.isRequired,
    createCustomer: PropTypes.func.isRequired,
    clearApplicantError: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    createLoanReducer: state.createLoanReducer,
    createCustomersReducer: state.createCustomersReducer
})

export default connect(mapStateToProps, actions)(Signature);
