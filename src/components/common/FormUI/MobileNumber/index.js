import React from 'react';
import { useField } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

function MobileNumber({name, ...otherProps}) {
    const [field, meta] = useField(name);

    const configTextfield = {
        ...field,
        ...otherProps,
    }

    return (
        <>
            <PhoneInput
                inputStyle={{borderColor: `${(meta && meta.touched && meta.error) ? "red" : "gray"}`, width: "100%"}}
                {...configTextfield}
            />
            {meta.error &&<FormHelperText style={{color: 'red'}} >{meta.error}</FormHelperText>}
        </>
    )
}

export default MobileNumber