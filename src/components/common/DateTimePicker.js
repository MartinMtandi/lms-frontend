import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DateTimePicker({date, data, setDate, name, label}) {

  const handleDateChange = (dt) => {
    switch (name) {
      case 'start':
        setDate({
          ...data,
          start: dt
        });
        break;
      case 'end':
        setDate({
          ...data,
          end: dt
        });
        break;
      default:
        break;
    }
  };

  return ( 
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container >
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          name={name}
          format="dd/mm/yyyy"
          margin="normal"
          label={label}
          value={date}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
