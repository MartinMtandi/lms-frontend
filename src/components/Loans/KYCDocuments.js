import React from 'react';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

function KYCDocuments(props) {
    const {loan_details} = props;
    const [value, setValue] = React.useState(loan_details.loan.id_card);
 
    const handleChange = (event) => {
        setValue(event.target.value);
    };

  return <div>
      <Box display="flex" justifyContent="center">
        <Box>
            <FormControl component="fieldset">
                <RadioGroup  aria-label="documents" name="kycdocuments" value={value} onChange={handleChange}>
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                        <Box p={1}>
                            <FormControlLabel value={loan_details.loan.id_card} control={<Radio />} label="National Id" />
                        </Box>
                        <Box  p={1}>
                            <FormControlLabel value={loan_details.loan.proof_of_address} control={<Radio />} label="Proof of Address" />
                        </Box>
                        <Box  p={1}>
                            <FormControlLabel value={loan_details.loan.pay_slip} control={<Radio />} label="Payslip" />
                        </Box>
                        <Box  p={1}>
                            <FormControlLabel value={loan_details.loan.bank_statement} control={<Radio />} label="Bank Statement" />
                        </Box>
                    </Box>
                </RadioGroup>
            </FormControl>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" >
        <Box style={{textAlign: 'center', display:'block'}}>
          <img  src={value} alt="kyc documents" width="800px" />
        </Box>
      </Box>
    
  </div>;
}

export default KYCDocuments;
