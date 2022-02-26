import React from 'react';
import { FormControl, OutlinedInput, InputLabel, InputAdornment, FormHelperText } from '@material-ui/core';
import { useField } from 'formik';

const AmountInput = ({name, label, labelWidth, ...otherProps}) => {
    const [field, meta] = useField(name);

    const configTextfield = {
        ...field,
        ...otherProps,
        fullWidth: true,
        variant: 'outlined'
    }

    if(meta && meta.touched && meta.error){
        configTextfield.error = true;
        configTextfield.helperText = meta.error;
    }

    return (
        <FormControl error={(meta.error) ? true : false} fullWidth  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">{label}</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            {...configTextfield}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={labelWidth}
          />
          {meta.error &&<FormHelperText style={{color: 'red'}} >{meta.error}</FormHelperText>}
        </FormControl>
    )
}

export default AmountInput