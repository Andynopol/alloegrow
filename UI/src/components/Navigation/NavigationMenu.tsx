import React, { useRef, useEffect } from 'react';
import { Box, SwipeableDrawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, IconButton, createTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NavMenuData } from '../../constants/interfaces';


type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
    open: boolean,
    toggle: Function;
    data: NavMenuData;
}

const SideMenu: React.FC<Props> = ( props: Props ) => {
    const { open, toggle, data } = props;
    const anchor = useRef<Anchor>( "left" );

    useEffect( () => {
        window.addEventListener( 'resize', adaptMenuToWindow );
        window.addEventListener( 'orientationchange', adaptMenuToWindow );
        return () => {
            window.removeEventListener( 'resize', adaptMenuToWindow );
            window.removeEventListener( 'orientationchange', adaptMenuToWindow );
        };
    } );

    const adaptMenuToWindow = () => {
        if ( window.innerWidth < createTheme().breakpoints.values.md ) {
            anchor.current = "bottom";
        } else {
            anchor.current = "left";
        }
    };

    const list = ( anchor: Anchor ) => (
        <Box
            sx={ { width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 } }
            role="presentation"
            onClick={ () => toggle( false ) }
            onTouchEnd={ () => toggle( false ) }
            onKeyDown={ () => toggle( false ) }
            key="box"
        >
            <Box className='menu-title-box'>
                <Typography className='menu-title' variant='h5'>Menu</Typography>
                <IconButton onClick={ () => toggle( false ) }>
                    <CloseIcon />
                </IconButton>
            </Box>
            { data.sections.map( ( section ) => {
                return ( <><List key={ `section${ Math.floor( Math.random() * 1000 ) }` }>
                    { section.items.map( item =>
                        <ListItem key={ `${ item.name }${ Math.floor( Math.random() * 1000 ) }` } disablePadding>
                            <ListItemButton onClick={ () => item.callback() } onTouchEnd={ () => item.callback() }>
                                <ListItemIcon>
                                    { item.icon }
                                </ListItemIcon>
                                <ListItemText primary={ item.label } />
                            </ListItemButton>
                        </ListItem> )
                    }
                </List>
                    <Divider />
                </> );
            } ) }
        </Box>
    );

    return (
        <React.Fragment>
            <SwipeableDrawer
                anchor={ anchor.current }
                open={ open }
                onClose={ () => toggle( false ) }
                onOpen={ () => toggle( true ) }
            >

                { list( ( anchor.current ) ) }
            </SwipeableDrawer>
        </React.Fragment>
    );
};

export default SideMenu;