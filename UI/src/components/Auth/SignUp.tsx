import React, { MouseEventHandler, MouseEvent } from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';



const SignUp: React.FC = () => {
    const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        const data = new FormData( event.currentTarget );
        console.log( {
            email: data.get( 'email' ),
            password: data.get( 'password' ),
        } );
    };

    const handleGoToLoginClick: MouseEventHandler<HTMLElement> = ( event: MouseEvent<HTMLElement> ) => {
        event.preventDefault();
        const { target } = event;
        target?.dispatchEvent( new CustomEvent( 'set-generic-dialog', { detail: { open: true, type: "SignIn" }, cancelable: true, bubbles: true, composed: false } ) );
    };

    return (
        <Container component="main" maxWidth="xs" >
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
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={ handleSubmit } sx={ { mt: 3 } }>
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <FormControlLabel
                                control={ <Checkbox value="allowExtraEmails" color="primary" /> }
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={ { mt: 3, mb: 2 } }
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={ handleGoToLoginClick }>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container >
    );
};

export default SignUp;