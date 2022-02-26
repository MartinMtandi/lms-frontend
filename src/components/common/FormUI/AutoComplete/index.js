/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {useField, useFormikContext} from 'formik';

export default function ComboBox({ name, label, options, ...otherProps }) {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = e => {
        const { value } = e.target;
        setFieldValue(name, value);
    };

    const configSelect = {
        ...field,
        ...otherProps,
    };

    if(meta && meta.touched && meta.error){
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    const handleOptions = (opt) => {
        const value = options.find(el => el.IDNumber === opt.IDNumber);
        return `${value.title} ${value.firstname} ${value.middleInitial ? value.middleInitial + "." : ""} ${value.lastname}` ;
    }

    return (
        <Autocomplete
            {...configSelect}
            options={options}
            getOptionLabel={(option) => handleOptions(option)}
            renderInput={(params) => <TextField {...params} fullWidth label={label} variant="outlined" />}
        />
    );
}
