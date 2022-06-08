import React, { useEffect, useState, useRef } from 'react';
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
import AddPlanificationForm from './components/AddPlanificationForm';
import { DropdownMenuItem, NavMenuData } from './constants/interfaces';
import { useAppSelector } from './redux/hooks';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout, setAuth } from './redux/slices/authSlice';
import { login } from './api/userApi';


const App: React.FC = () => {

  const [ dialogState, setDialogState ] = useState( { open: false, type: "SignIn" } );
  const [ isNavigationMenuOpen, setIsNavigationMenuOpen ] = useState( false );
  const [ dropdownMenuAnchor, setDropdownMenuAnchor ] = useState( null );
  const menuItems = useRef<Array<DropdownMenuItem>>( [] );
  const open = Boolean( dropdownMenuAnchor );
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
    window.addEventListener( 'dropdown-menu-close', handleMenuClose );
    window.addEventListener( 'dropdown-menu-open', handleMenuOpen );
  };

  const unlinkEvents = () => {
    window.removeEventListener( 'set-generic-dialog', updateDialogState );
    window.removeEventListener( 'toggle-slide-menu', updateNavigationMenuState );
    window.removeEventListener( 'login-user', handleLogin );
    window.removeEventListener( 'dropdown-menu-close', handleMenuClose );
    window.removeEventListener( 'dropdown-menu-open', handleMenuOpen );
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
    console.log( { ...dialogState, ...event.detail } );
  };

  const toggleNavigationMenu = ( open: boolean ) => {
    setIsNavigationMenuOpen( open );
  };

  const handleMenuClose = () => {
    setDropdownMenuAnchor( null );
  };

  const handleMenuOpen = ( event: CustomEvent | any ) => {
    event.preventDefault();
    const { detail } = event;

    menuItems.current = detail.items;
    setDropdownMenuAnchor( detail.currentTarget );
  };


  return (
    <div id="root-container">
      <MenuBar userData={ user } />
      <NavigationMenu data={ generateMenuData() } open={ isNavigationMenuOpen } toggle={ toggleNavigationMenu } />
      <GenericDialog open={ dialogState.open } onOpen={ openLoginDialog } onClose={ closeLoginDialog }>
        { dialogState.type === "SignIn" && <SignIn /> }
        { dialogState.type === "SignUp" && <SignUp /> }
        { dialogState.type === "AddPlanification" && <AddPlanificationForm /> }
      </GenericDialog>
      <Main />

      <Menu
        id="basic-menu"
        anchorEl={ dropdownMenuAnchor }
        open={ open }
        onClose={ handleMenuClose }
        MenuListProps={ {
          'aria-labelledby': 'basic-button',
        } }
      >
        {
          menuItems.current.map( ( item: DropdownMenuItem ) => (
            <MenuItem key={ item._id } onClick={ () => item.click() }>{ item.name }</MenuItem>
          ) )
        }
      </Menu>
    </div>
  );
};

export default App;
