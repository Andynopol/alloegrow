import React, { useEffect, useState } from 'react';
import './App.css';
import SignIn from './components/Auth/SignIn';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import RegisterIcon from '@mui/icons-material/HowToReg';
import GenericDialog from './components/GenericDialog';
import NavigationMenu from './components/Navigation/NavigationMenu';
import { NavMenuData } from './constants/interfaces';
import { useAppSelector } from './redux/hooks';
import SignUp from './components/Auth/SignUp';
import { useDispatch } from 'react-redux';
import { logout } from './redux/slices/authSlice';
import MenuBar from './components/Navigation/MenuBar';

const App: React.FC = () => {

  const [ dialogState, setDialogState ] = useState( { open: false, type: "SignIn" } );
  const [ isNavigationMenuOpen, setIsNavigationMenuOpen ] = useState( false );
  const user = useAppSelector( state => state.auth?.user );
  const dispatch = useDispatch();

  useEffect( () => {
    window.addEventListener( 'set-generic-dialog', updateDialogState );
    window.addEventListener( 'toggle-slide-menu', updateNavigationMenuState );
    return () => {
      window.removeEventListener( 'set-generic-dialog', updateDialogState );
      window.removeEventListener( 'toggle-slide-menu', updateNavigationMenuState );
    };
  }, [] );

  const updateNavigationMenuState = ( event: any ) => {
    const { detail } = event;
    toggleNavigationMenu( detail );
  };

  const generateMenuData: () => NavMenuData = () => {
    if ( user ) {
      return ( {
        sections: [ {
          items: [
            {
              name: "SignOut",
              label: "Sign Out",
              callback: () => dispatch( logout() ),
              icon: <LogoutIcon />
            },
          ]
        }, ]
      } );
    }
    return {
      sections: [
        {
          items: [
            {
              name: "SignIn",
              label: "Sign In",
              callback: () => setDialogState( { type: "SignIn", open: true } ),
              icon: <LoginIcon />
            },
            {
              name: "SignUp",
              label: "Sign Up",
              callback: () => setDialogState( { type: "SignUp", open: true } ),
              icon: <RegisterIcon />
            }
          ]
        }, ]
    };
  };

  const closeLoginDialog = () => {
    setDialogState( { ...dialogState, open: false } );
  };

  const openLoginDialog = () => {
    setDialogState( { ...dialogState, open: true } );
  };

  const updateDialogState = ( event: any ) => {
    event.preventDefault();
    setDialogState( { ...dialogState, ...event.detail } );
  };

  const toggleNavigationMenu = ( open: boolean ) => {
    setIsNavigationMenuOpen( open );
  };
  return (
    <>
      <MenuBar />
      <NavigationMenu data={ generateMenuData() } open={ isNavigationMenuOpen } toggle={ toggleNavigationMenu } />
      { !user && <GenericDialog open={ dialogState.open } onOpen={ openLoginDialog } onClose={ closeLoginDialog }>
        { dialogState.type === "SignIn" && <SignIn /> }
        { dialogState.type === "SignUp" && <SignUp /> }
      </GenericDialog> }
    </>
  );
};

export default App;
