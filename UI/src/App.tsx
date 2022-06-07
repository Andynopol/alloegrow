import React, { useEffect, useState } from 'react';
import decode from 'jwt-decode';
import './App.css';
import SignIn from './components/Auth/SignIn';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import RegisterIcon from '@mui/icons-material/HowToReg';
import GenericDialog from './components/GenericDialog';
import NavigationMenu from './components/Navigation/NavigationMenu';
import SignUp from './components/Auth/SignUp';
import MenuBar from './components/Navigation/MenuBar';
import Main from './components/Main';
import { NavMenuData } from './constants/interfaces';
import { useAppSelector } from './redux/hooks';

import { useDispatch } from 'react-redux';
import { logout, setAuth } from './redux/slices/authSlice';

import { login } from './api/userApi';

const App: React.FC = () => {

  const [ dialogState, setDialogState ] = useState( { open: false, type: "SignIn" } );
  const [ isNavigationMenuOpen, setIsNavigationMenuOpen ] = useState( false );
  const user = useAppSelector( state => state.auth?.user );
  const dispatch = useDispatch();

  useEffect( () => {
    linkEvents();
    handleSession();
    return () => {
      unlinkEvents();
    };
  }, [] );

  const linkEvents = () => {
    window.addEventListener( 'set-generic-dialog', updateDialogState );
    window.addEventListener( 'toggle-slide-menu', updateNavigationMenuState );
    window.addEventListener( 'login-user', handleLogin );
  };

  const unlinkEvents = () => {
    window.removeEventListener( 'set-generic-dialog', updateDialogState );
    window.removeEventListener( 'toggle-slide-menu', updateNavigationMenuState );
    window.removeEventListener( 'login-user', handleLogin );
  };

  const handleSession = () => {
    if ( localStorage.getItem( 'auth' ) ) {
      const auth = JSON.parse( ( localStorage.getItem( 'auth' ) as string ) );
      const { token } = auth;
      const decodedToken: any = decode( token );
      if ( decodedToken.exp * 1000 > new Date().getTime() ) {
        dispatch( setAuth( auth ) );
        return;
      }
      dispatch( logout() );
      setDialogState( { open: true, type: "SignIn" } );
      return;
    }
  };

  const updateNavigationMenuState = ( event: any ) => {
    const { detail } = event;
    toggleNavigationMenu( detail );
  };

  const handleLogin = async ( event: CustomEvent | any ) => {
    const { detail } = event;
    try {
      if ( !detail ) throw new Error( "Missing detail in login event!" );
      const result = await login( detail );
      dispatch( setAuth( result.data ) );
    } catch ( err ) {
      console.log( err );
    }
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
    <div id="root-container">
      <MenuBar userData={ user } />
      <NavigationMenu data={ generateMenuData() } open={ isNavigationMenuOpen } toggle={ toggleNavigationMenu } />
      { !user && <GenericDialog open={ dialogState.open } onOpen={ openLoginDialog } onClose={ closeLoginDialog }>
        { dialogState.type === "SignIn" && <SignIn /> }
        { dialogState.type === "SignUp" && <SignUp /> }
      </GenericDialog> }
      <Main />
    </div>
  );
};

export default App;
