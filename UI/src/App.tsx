import React, { useState } from 'react';
import './App.css';
import SignIn from './components/Auth/SignIn';
import GenericDialog from './components/GenericDialog';
import NavigationMenu from './components/Navigation/NavigationMenu';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

const App: React.FC = () => {

  const [ isLoginDialogOpen, setIsLoginDialogOpen ] = useState( false );
  const [ isNavigationMenuOpen, setIsNavigationMenuOpen ] = useState( false );

  const closeLoginDialog = () => {
    setIsLoginDialogOpen( false );
  };

  const openLoginDialog = () => {
    setIsLoginDialogOpen( true );
  };

  const toggleNavigationMenu =
    ( open: boolean ) =>
      ( event: React.KeyboardEvent | React.MouseEvent ) => {
        if (
          event &&
          event.type === 'keydown' &&
          ( ( event as React.KeyboardEvent ).key === 'Tab' ||
            ( event as React.KeyboardEvent ).key === 'Shift' )
        ) {
          return;
        }

        setIsNavigationMenuOpen( open );
      };


  return (
    <>
      <IconButton onClick={ () => setIsNavigationMenuOpen( true ) }>
        <MenuIcon />
      </IconButton>
      <NavigationMenu anchor="left" open={ isNavigationMenuOpen } toggle={ toggleNavigationMenu } />
      <GenericDialog open={ isLoginDialogOpen } onOpen={ openLoginDialog } onClose={ closeLoginDialog }><SignIn /></GenericDialog>
    </>
  );
};

export default App;
