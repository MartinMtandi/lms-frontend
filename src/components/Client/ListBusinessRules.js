import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper, 
    }
}));

function ListBusinessRules(props) {
    const classes = useStyles();
    const {business_rules, isEdit} = props;
  return (
    <List className={classes.list}>
        <ListItem>
            <ListItemText primary={`${(isEdit) ? "EDIT" : "VIEW"} BUSINESS RULES`} />
        </ListItem>
        <ListItem>
            <ListItemText primary={"Banking Institution"} secondary={business_rules.rules.banking_institution} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Maximum Lending Amount" secondary={"$ " + Number(business_rules.rules.max_lending_amount).toFixed(2)} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Commencement Date" secondary={business_rules.rules.commencement_date} />
        </ListItem>
        <ListItem>
            <ListItemText primary="End Date" secondary={business_rules.rules.end_date} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Loan Origination Fee" secondary={"$ " + Number(business_rules.rules.loan_origination_fee).toFixed(2)} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Interest Rate" secondary={Number(business_rules.rules.interest_rate) + "%"} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Rate Basis" secondary={business_rules.rules.rate_basis} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Charge" secondary={"$ " + Number(business_rules.rules.charge).toFixed(2)} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Charge value" secondary={"$ " + Number(business_rules.rules.charge_value).toFixed(2)} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Card Purchase" secondary={business_rules.rules.card_purchase} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Maximum Loan Amount" secondary={"$ " + Number(business_rules.rules.max_loan_amount).toFixed(2)} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Monthly Installment" secondary={"$ " + business_rules.rules.monthly_installments} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Maximum Term" secondary={business_rules.rules.max_term} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Grace Period" secondary={business_rules.rules.grace_period} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Write Off" secondary={business_rules.rules.write_off} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Maximum Loan Applications" secondary={business_rules.rules.max_loan_applications} />
        </ListItem>
        <ListItem>
            <ListItemText primary="IMMT" secondary={business_rules.rules.immt} />
        </ListItem>
        <ListItem>
            <ListItemText primary="Age Limit" secondary={business_rules.rules.age_limit} />
        </ListItem>
    </List>
  )
}

export default ListBusinessRules