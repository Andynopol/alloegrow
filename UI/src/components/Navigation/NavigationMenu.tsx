import React from 'react';
import { Box, SwipeableDrawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import RegisterIcon from '@mui/icons-material/HowToReg';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

interface Props {
    open: boolean,
    toggle: Function;
    anchor: Anchor;
    data?: any;
}

const SideMenu: React.FC<Props> = ( props: Props ) => {
    const { open, toggle, anchor, data } = props;

    const list = ( anchor: Anchor ) => (
        <Box
            sx={ { width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 } }
            role="presentation"
            onClick={ toggle( false ) }
            onKeyDown={ toggle( false ) }
        >
            <List>
                <ListItem key={ "SignIn" } disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary={ "Sign In" } />
                    </ListItemButton>
                </ListItem>
                <ListItem key={ "SignUp" } disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <RegisterIcon />
                        </ListItemIcon>
                        <ListItemText primary={ "Sign Un" } />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key={ "Logout" } disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={ "Logout" } />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <React.Fragment>
            <SwipeableDrawer
                anchor="left"
                open={ open }
                onClose={ toggle( false ) }
                onOpen={ toggle( true ) }
            >
                { list( ( anchor ) ) }
            </SwipeableDrawer>
        </React.Fragment>
    );
};

export default SideMenu;