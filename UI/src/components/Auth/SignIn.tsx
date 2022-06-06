import React, { useState, MouseEvent, MouseEventHandler } from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import { useAppDispatch } from '../../redux/hooks';
import { login } from '../../api/userApi';
import { setUser } from '../../redux/slices/authSlice';
import { RequestResponseStatus } from '../../constants/enums';


const SignIn: React.FC = () => {

    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );

    const dispatch = useAppDispatch();
    const handleSubmit: MouseEventHandler<HTMLButtonElement> = async ( event: MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault();
        const { target } = event;
        try {
            const response = await login( { email, password } );
            if ( response.data?.status === RequestResponseStatus.OK ) dispatch( setUser( response.data.payload ) );
            target.dispatchEvent( new CustomEvent( 'close-generic-dialog', { cancelable: true, bubbles: true, composed: false } ) );
        } catch ( err ) {
            console.log( err );
        }

    };

    const handleCancel: MouseEventHandler<HTMLButtonElement> = ( event: MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault();
        const { target } = event;
        target?.dispatchEvent( new CustomEvent( 'close-generic-dialog', { cancelable: true, bubbles: true, composed: false } ) );
    };

    const handleGoToRegisterClick: MouseEventHandler<HTMLElement> = ( event: MouseEvent<HTMLElement> ) => {
        event.preventDefault();
        const { target } = event;
        target?.dispatchEvent( new CustomEvent( 'set-generic-dialog', { detail: { open: true, type: "SignUp" }, cancelable: true, bubbles: true, composed: false } ) );
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={ {
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                } }
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" noValidate sx={ { mt: 1 } }>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={ email }
                        onChange={ ( ev ) => { setEmail( ev.target.value ); } }
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={ password }
                        onChange={ ( ev ) => { setPassword( ev.target.value ); } }
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={ <Checkbox value="remember" color="primary" /> }
                        label="Remember me"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={ { mt: 3, mb: 2 } }
                        onClick={ handleSubmit }
                    >
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={ { mt: 3, mb: 2 } }
                        onClick={ handleCancel }
                    >
                        Cancel
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={ handleGoToRegisterClick }>
                                { "Don't have an account? Sign Up" }
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >
    );
};

export default SignIn;