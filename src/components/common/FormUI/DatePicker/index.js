import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function DateTimePicker({date, data, setDate, name, label}) {

    const dateFormatter = (date) => {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }

    const handleDateChange = (dt) => {
        let date = dateFormatter(dt);

        switch (name) {
        case 'from_date':
            setDate({
            ...data,
            from_date: date
            });
            break;
        case 'to_date':
            setDate({
            ...data,
            to_date: date
            });
            break;
        default:
            break;
        }
    };

  return ( 
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
     <KeyboardDatePicker
          disableToolbar
          variant="inline"
          name={name}
          format="MM/dd/yyyy"
          margin="normal"
          label={label}
          value={date}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}
