import React, { MouseEvent, MouseEventHandler } from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';


const SignIn: React.FC = () => {
    const handleSubmit = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        const data = new FormData( event.currentTarget );
        console.log( {
            email: data.get( 'email' ),
            password: data.get( 'password' ),
        } );
    };

    const handleCancel: MouseEventHandler<HTMLButtonElement> = ( event: MouseEvent<HTMLButtonElement> ) => {
        const { target } = event;
        console.log( target, "dispatching" );
        target?.dispatchEvent( new CustomEvent( 'close-generic-dialog', { cancelable: true, bubbles: true, composed: false } ) );
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
                <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { mt: 1 } }>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
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
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={ <Checkbox value="remember" color="primary" /> }
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={ { mt: 3, mb: 2 } }
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
                            <Link href="#" variant="body2">
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