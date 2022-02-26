import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import logo from '../../images/Homelink Logo-Horizontal.png';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Signature from './Signature';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      minWidth: 560,
      overflowX: 'hidden'
    },
    header: {
        fontWeight: 700,
        textAlign: 'center',
    }
}));

function OfferLetter(props) {
    const classes = useStyles();
    const {setStore, store, next, clearApplicantError, handleClose} = props;
    const { loan_types } = props.loanTypesReducer;
    const { loan_structure } = props.loanStructureReducer;
    const {credit_assessment} = props.creditAssessmentReducer;
    const { create_customer, create_customer_error } = props.createCustomersReducer;

  console.log(store)



    const months = ["January", "February", "March", "April", "March", "June", "July", "August", "September", "October", "November", "December"];

    const handleDateFomart = (dt) => {
        let date = new Date(dt);
        
        return months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();

    }

    const handleCommencingDate = (d) => {
        
    }

    return (
        <div className={classes.root}>
            <Box>
                <Box>
                    <img style={{display: 'block', margin: '0 auto'}} src={logo} alt="centriqo logo" height={50}  />
                </Box>
            </Box>
            {create_customer_error && <>
                {(typeof create_customer_error.message === "string") ?
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Alert severity="error" onClose={() => clearApplicantError()}>{create_customer_error.message}</Alert>
                        </Grid>
                    </Grid>
                :
                    Object.entries(create_customer_error.message).map(([key, value]) => (
                        <Grid container spacing={3}>
                            <Grid item xs={12} key={key}>
                                <Alert severity="error" onClose={() => clearApplicantError()}>{value}</Alert>
                            </Grid>
                        </Grid>
                    ))
                } 
            </>}
           <div style={{fontSize: 13}}>
            <Box m={3} style={{textAlign: 'center'}}>
                <Typography style={{fontWeight: 600}} variant="subtitle1">ACKNOWLEDGEMENT OF DEBT</Typography>
                <Typography style={{fontWeight: 500}}  gutterBottom variant="subtitle1">Entered into between</Typography>
                <Typography style={{fontWeight: 600, textTransform: 'uppercase'}} gutterBottom variant="button">{store.firstname + ' ' + store.mname + ' ' + store.lastname}</Typography>
                <Typography style={{fontStyle: 'italic', borderTop: '1px solid #ccc', fontSize: 13}} variant="subtitle1">Please print full name as it appears on the national identity documents</Typography>
            </Box>
            <Box>
                <Typography gutterBottom variant="subtitle1">
                    National Identity Number: <span style={{fontWeight: 600}}>{store.national_id}</span> EC Number: <span style={{fontWeight: 600}}>{store.employee_number} </span>Born on <span style={{fontWeight: 600}}>{handleDateFomart(store.dob)}</span> Residing at 
                    <span style={{fontWeight: 600}}> {store.address + ' ' + store.city}</span> ("The Debtor") <span style={{fontWeight: 600}}>AND Homelink Finance</span> (Hereinafter referred to as "the Creditor")
                </Typography>
                <Typography variant="subtitle1" style={{fontWeight: 600, marginTop: 12, fontStyle: "italic"}}>
                    WHEREAS THE DEBTOR MAKES THE FOLLOWING ACKNOWLEDGEMENT:
                </Typography>
            </Box>
            <Box>
                <ol>
                    <li>
                        I, abovementioned debtor do hereby acknowledge that I am indebted to the Creditor in the sum of <span style={{fontWeight: 600}}>${Number(store.amount).toFixed(2)}</span> hereinafter called "the CAPITAL", being monies
                        advanced to me in respect of a loan granted to me on the <span style={{fontWeight: 600}}>{handleDateFomart(new Date())}</span>.
                    </li>
                    <li>
                        I acknowledge that interest will acrue on the CAPITAL of <span style={{fontWeight: 600}}>${Number(store.amount).toFixed(2)}</span> at the interest rate of <span style={{fontWeight: 600}}>{credit_assessment.interest_rate}</span> per from the <span style={{fontWeight: 600}}>{handleDateFomart(new Date())}</span> (date of advance)
                        <ol type="I">
                            <li>I further acknowledge that this rate may change at Creditor's discretion as dictated by market conditions.</li>
                            <li>I further acknowledge that I shall be liable for any tax charged by the Government on the loan advance.</li>
                        </ol>
                    </li>
                    <li>I, hereby agree and undertake to repay the CAPITAL together with interest accrued thereon as above by way of monthly instalments of <span style={{fontWeight: 600}}>${credit_assessment.installments}</span> commencing from the <span style={{fontWeight: 600}}>{handleCommencingDate(new Date())}.</span> Such payments shall be appropriated initially to the repayment of interest and capital.</li>
                    <li>In the event that my emplyment with the Government is terminated through resignation or dismissal or for any other reason before full repayment of the loan, I hereby agree that the full balance outstanding shall acrue interest at the Creditor's lending rate from the date of such termination and such balance shall immedeately become due and payable in full.
                        <ol type="I">
                            <li>I hereby irrevcably authorize the Creditor to deduct the full amount oustanding from my terminal benefits.</li>
                            <li>I hereby irrevicably give consent to the Salary Service Bureau to deduct the full amount outstanding from my terminal benefits, in favour of the Creditor.</li>
                            <li>
                                In the event that the Creditor fails to recover the amount outstanding as the date of termination of my employment, and ends up instituting legal proceedings to enable recovery of the outstanding amount, I hereby agree to the jurisdiction of the <span style={{fontWeight: 600}}>Magistrate Court at Harare {" "}</span>
                                for any actions arising out of the Magistrate Court. It is the Creditor's discretion to elect institute proceedings in the High Court of Zimbabwe or any other competent Court in Zimbabwe.
                            </li>
                        </ol>
                    </li>
                    <li>Any certificate issued under the signature of the Creditor or its duly authorised agent that purports to certify the amounts due hereunder shall be accepted as prima facie proof of such indebtedness and shall have sufficient probative vaue to enable the Creditor to obtain summary judgement or provisional sentence against me in any competent court for the amount stated in such certificate, and I accept the onus of disproving the amount so stated as not being the amount owing.</li>
                    <li>I shall not be entitled for any reason whatsoever to withhold or defer payment stipulated in this acknowledgement of debt.</li>
                    <li>I further agree to pay legal fees incurred by the Creditor in recovering the debt on a legal practitioner and client scale.</li>
                    <li>
                        I renounce the benefits of the legal exceptions <i>non numeric pecuniae (no value received), non causa debit (no cause of debt), errore calculi (errors of calculation),</i>
                        {" "}revision of accounts, and all other exceptions which could apply, which might or could be taken to avoid the payment of our indebtedness to the Creditor, which full meaning and effect thereof I declare myself to be fully acquainted.
                    </li>
                    <li>
                        No latitude or extensions of time which may be allowed to me by the Creditor should be deemed to be a waiver of the Creditor's right hereunder. No purported oral variation or addition to this Acknowledgement of Debt shall be of any force or effect unless and until reduced to writing and signed by both parties before witnesses.
                    </li>
                    <li>
                        I choose <i>domicillium citandi et excutandi</i> at the address privided above. I will notify the Creditor of my change of address within 7 days of such change.
                    </li>
                </ol>
            </Box>
            <Box style={{textTransform: 'uppercase', marginBottom: '8px'}}>
                <Typography gutterBottom variant="button">Thus signed at <span style={{fontWeight: 600}}>CENTRIQO</span> on <span style={{fontWeight: 600}}>{handleDateFomart(new Date())}</span></Typography>
            </Box>
            <Box>
                <Signature next={next} store={store} setStore={setStore} handleClose={handleClose} />
            </Box>
           </div>
        </div>
    )
}

OfferLetter.propTypes = {
    loanStructureReducer: PropTypes.object.isRequired,
    clearApplicantError: PropTypes.func.isRequired,
    loanTypesReducer: PropTypes.object.isRequired,
    creditAssessmentReducer: PropTypes.object.isRequired,
    createCustomersReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    loanStructureReducer: state.loanStructureReducer,
    loanTypesReducer: state.loanTypesReducer,
    createCustomersReducer: state.createCustomersReducer,
    creditAssessmentReducer: state.creditAssessmentReducer
})

export default connect(mapStateToProps, actions)(OfferLetter);
