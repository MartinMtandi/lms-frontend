import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import FormHelperText from '@material-ui/core/FormHelperText'
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useField } from 'formik';

function PasswordField({name, ...otherProps}) {
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [field, meta] = useField(name);

    const configTextfield = {
        ...field,
        ...otherProps, 
    }

    if(meta && meta.touched && meta.error){
        configTextfield.error = true;
    }

    return (
    <FormControl error = {meta.error ? true : false} fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                {...configTextfield}
                type={values.showPassword ? 'text' : 'password'}
               endAdornment={
               <InputAdornment position="end">
                   <IconButton 
                       aria-label="toggle password visibility"
                       onClick={handleClickShowPassword}
                       onMouseDown={handleMouseDownPassword}
                       edge="end"
                   >
                   {values.showPassword ? <Visibility /> : <VisibilityOff />}
                   </IconButton>
               </InputAdornment>
               }
            />
            {(meta && meta.error) && <FormHelperText error>{meta.error}</FormHelperText> }
        </FormControl>
    )
}

export default PasswordField
