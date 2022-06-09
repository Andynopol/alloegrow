import React, { MouseEvent, MouseEventHandler, useState } from 'react';
import * as startOfDay from "date-fns";
import { Grid, TextField, Button } from '@mui/material';
import { LocalizationProvider, } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getDateToMidnight } from '../constants/vars';

const AddPlanificationForm = () => {

    const [ start, setStart ] = useState<Date | null>( getDateToMidnight() );
    const [ end, setEnd ] = useState<Date | null>( getDateToMidnight() );
    const [ date, setDate ] = useState<Date | null>( new Date() );
    const [ name, setName ] = useState<string>( '' );
    const [ count, setCount ] = useState( 0 );

    const handleSubmit = ( event: MouseEvent<HTMLButtonElement> ) => {
        const { currentTarget } = event;
        currentTarget.dispatchEvent( new CustomEvent( 'add-planification', { detail: { date, name, start, end, count }, bubbles: true, cancelable: true } ) );
    };

    const handleCancel: MouseEventHandler<HTMLButtonElement> = ( event: MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault();
        const { target } = event;
        target?.dispatchEvent( new CustomEvent( 'close-generic-dialog', { cancelable: true, bubbles: true, composed: false } ) );
    };

    return (
        <LocalizationProvider dateAdapter={ AdapterDateFns }>
            <Grid spacing={ 2 } container>
                <Grid xs={ 1 } item />
                <Grid xs={ 4 } item>
                    <DatePicker
                        label="Date"
                        value={ date }
                        onChange={ ( newValue ) => {
                            setDate( newValue );
                        } }
                        renderInput={ ( params ) => (
                            <TextField { ...params } helperText={ params?.inputProps?.placeholder } />
                        ) }
                    />
                </Grid>
                <Grid xs={ 2 } />
                <Grid xs={ 4 } item>
                    <TextField id="outlined-search" label="Name" value={ name } onChange={ ( ev ) => setName( ev.target.value ) } type="search" />
                </Grid>
                <Grid xs={ 1 } item />
                <Grid xs={ 1 } item />
                <Grid xs={ 4 } item>
                    <MobileTimePicker
                        label="Start"
                        value={ start }
                        ampm={ false }
                        ampmInClock={ false }
                        onChange={ ( newValue ) => {
                            setStart( newValue );
                        } }
                        renderInput={ ( params ) => <TextField { ...params } /> }
                    />
                </Grid>

                <Grid xs={ 2 } />
                <Grid xs={ 4 } item>
                    <MobileTimePicker
                        label="End"
                        value={ end }
                        ampm={ false }
                        ampmInClock={ false }
                        onChange={ ( newValue ) => {
                            setEnd( newValue );
                        } }
                        renderInput={ ( params ) => <TextField { ...params } /> }
                    />
                </Grid>
                <Grid xs={ 1 } item />
                <Grid xs={ 1 } item />
                <Grid xs={ 10 } item>
                    <TextField
                        id="outlined-number"
                        label="Count"
                        type="number"
                        value={ count }
                        onChange={ ( ev ) => setCount( Number( ev.target.value ) ) }
                        fullWidth
                        InputProps={ { inputProps: { min: 0 } } }
                        InputLabelProps={ {
                            shrink: true,
                        } }
                    />
                </Grid>
                <Grid xs={ 1 } item />
                <Grid xs={ 12 } item>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={ { mt: 3, mb: 2 } }
                        onClick={ handleSubmit }
                    >
                        Submit
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="error"
                        sx={ { mb: 2 } }
                        onClick={ handleCancel }
                    >
                        Cancel
                    </Button>
                </Grid>

            </Grid>

        </LocalizationProvider>
    );
};

export default AddPlanificationForm;