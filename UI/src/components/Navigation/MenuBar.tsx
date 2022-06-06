import React, { MouseEventHandler, MouseEvent } from 'react';
import { Grid, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const MenuBar: React.FC = () => {

    const handleMenuButtonClick: MouseEventHandler<HTMLElement> = ( event: MouseEvent<HTMLElement> ) => {
        const { target } = event;
        target?.dispatchEvent( new CustomEvent( 'toggle-slide-menu', { detail: true, cancelable: true, bubbles: true, composed: false } ) );
    };

    return (
        <Grid className='navbar-container' alignItems='center' justifyContent='center' container spacing={ 2 }>
            <Grid item xs={ 6 }>
                <Grid className="navbar-left" container>
                    <IconButton onClick={ handleMenuButtonClick }>
                        <MenuIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid item xs={ 6 }>
                <Grid className="navbar-right" container></Grid>
            </Grid>
        </Grid>
    );
};

export default MenuBar;