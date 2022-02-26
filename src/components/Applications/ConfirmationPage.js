import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import * as actions from '../../store/actions';
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minWidth: 520,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
      fontWeight: 600
  }
}));

function ConfirmationPage(props) {
  const classes = useStyles();
  const { handleClose,  store, next } = props;
  const { loan_structure } = props.loanStructureReducer;

  const handleFindLoanStructure = (id) => {
      const result = loan_structure.loans.find(el => el.id === id);
      return result.structure;
  }

  return (
        <React.Fragment>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography className={classes.heading}>Personal Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemText primary="Title" />
                            <ListItemSecondaryAction>
                            {store.title}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="First name" />
                            <ListItemSecondaryAction>
                            {store.firstname}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Middle name" />
                            <ListItemSecondaryAction>
                            {store.mname}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Last name" />
                            <ListItemSecondaryAction>
                            {store.lastname}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Marital Status" />
                            <ListItemSecondaryAction>
                            {store.marital_status}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Educational Level" />
                            <ListItemSecondaryAction>
                            {store.educational_level}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Residential Area" />
                            <ListItemSecondaryAction>
                            {store.residential_area}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Property Ownership" />
                            <ListItemSecondaryAction>
                            {store.property_ownership}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Other assets owned" />
                            <ListItemSecondaryAction>
                            {store.other_assets_owned}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Address" />
                            <ListItemSecondaryAction>
                            {store.address + ", " + store.suburb + " " + store.city}  
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Email" />
                            <ListItemSecondaryAction>
                            {store.email}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Gender" />
                            <ListItemSecondaryAction>
                            {store.gender}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Mobile No." />
                            <ListItemSecondaryAction>
                            {store.mobile}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Date of birth" />
                            <ListItemSecondaryAction>
                            {store.dob}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="National Id" />
                            <ListItemSecondaryAction>
                            {store.national_id}
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography className={classes.heading}>Next Of Kin Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemText primary="Title" />
                            <ListItemSecondaryAction>
                            {store.next_of_kin_title}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="First name" />
                            <ListItemSecondaryAction>
                            {store.next_of_kin_firstname}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Last name" />
                            <ListItemSecondaryAction>
                            {store.next_of_kin_lastname}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Relationship" />
                            <ListItemSecondaryAction>
                            {store.next_of_kin_relationship}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="National Id" />
                            <ListItemSecondaryAction>
                            {store.next_of_kin_national_id}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Address" />
                            <ListItemSecondaryAction>
                            {store.next_of_kin_address}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Email" />
                            <ListItemSecondaryAction>
                            {store.next_of_kin_email}  
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Mobile No." />
                            <ListItemSecondaryAction>
                            {store.next_of_kin_mobile}
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    >
                    <Typography className={classes.heading}>Employment And Loan Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List className={classes.root}>
                        <ListItem>
                            <ListItemText primary="Industry employed at" />
                            <ListItemSecondaryAction>
                            {store.sector}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Ministry" />
                            <ListItemSecondaryAction>
                            {store.ministry}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Occupation" />
                            <ListItemSecondaryAction>
                            {store.occupation}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Net Salary" />
                            <ListItemSecondaryAction>
                            {store.net_salary}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Type of employment" />
                            <ListItemSecondaryAction>
                            {store.employment_type}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Employee No." />
                            <ListItemSecondaryAction>
                            {store.employee_number}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Length of employment" />
                            <ListItemSecondaryAction>
                            {store.employment_length} months  
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Ecocash No." />
                            <ListItemSecondaryAction>
                            {store.ecocash_number}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Bank account no." />
                            <ListItemSecondaryAction>
                            {store.account}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Bank" />
                            <ListItemSecondaryAction>
                            {store.bank}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Branch name" />
                            <ListItemSecondaryAction>
                            {store.branch_name}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Branch code" />
                            <ListItemSecondaryAction>
                            {store.branch_code}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Loan amount" />
                            <ListItemSecondaryAction>
                            ${Number(store.amount).toFixed(2)}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Nature of loan" />
                            <ListItemSecondaryAction>
                            {handleFindLoanStructure(store.structure)}
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Tenure" />
                            <ListItemSecondaryAction>
                            {store.tenure} months
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Grid container spacing={3} style={{marginTop: '16px'}}>
                <Grid item xs={12}>
                    <Box display="flex" >
                        <Box flexGrow={1}>
                            <Button onClick={() => handleClose()} color="primary">
                                Close
                            </Button>
                        </Box>
                        <Box>
                            <Button variant="contained" color="primary" onClick={() => next("Account Documents", 7)} color="primary">
                                Back
                            </Button>
                        </Box>
                        <Box style={{marginLeft: '8px'}}>
                            <Button onClick={() => next("", 9)} color="primary" autoFocus> 
                                Continue
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
  );
}

ConfirmationPage.propTypes = {
    loanStructureReducer: PropTypes.object.isRequired,
    loanTypesReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    loanStructureReducer: state.loanStructureReducer,
    loanTypesReducer: state.loanTypesReducer,
})

export default connect(mapStateToProps, actions)(ConfirmationPage);
