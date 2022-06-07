import React, { MouseEventHandler, MouseEvent } from 'react';
import { Grid, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { deepPurple } from '@mui/material/colors';


interface Props {
    userData?: any;
}

const MenuBar: React.FC<Props> = ( props: Props ) => {

    const { userData } = props;

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
                <Grid className="navbar-right" container>
                    { userData && <Avatar src={ userData.img } sx={ { bgcolor: deepPurple[ 500 ] } }>{ userData.lastName[ 0 ] }</Avatar> }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MenuBar;