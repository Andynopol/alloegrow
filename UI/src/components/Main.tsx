
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import PlanificationGrid from './Table/PlanificationGrid';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { deletePlanification, generatePlanification, getPlanifications } from '../api/planificationsApi';
import { DEFAULT_TABLE_HEAD } from '../constants/vars';
import { setPlanification, setPlanifications, removePlanification } from '../redux/slices/planificationSlice';
import { RequestResponseStatus } from '../constants/enums';



const Main = () => {
    const user = useAppSelector( state => state?.auth.user );
    const planifications = useAppSelector( state => state.planifications );
    const dispatch = useAppDispatch();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect( () => {
        user && fetchPlanifications( ( user as any )._id );
        linkEvents();
        return () => unlinkEvents();
    }, [ user ] );

    const fetchPlanifications = async ( _id: string ) => {
        const response = await getPlanifications( _id );
        dispatch( setPlanifications( response.data.payload ) );
    };

    const linkEvents = () => {
        window.addEventListener( 'add-planification', handleAddPlanification );
        window.addEventListener( 'delete-planification', handleDeletePlanification );
    };

    const unlinkEvents = () => {
        window.removeEventListener( 'add-planification', handleAddPlanification );
        window.removeEventListener( 'delete-planification', handleDeletePlanification );
    };

    const handleAddPlanification = async ( event: CustomEvent | any ) => {
        const { detail } = event;
        try {
            const response = await generatePlanification( detail );
            if ( response.data.message === RequestResponseStatus.OK ) {
                dispatch( setPlanification( response.data.payload ) );
            }
        } catch ( err ) {
            console.log( err );
        }
    };

    const handleDeletePlanification = async ( event: CustomEvent | any ) => {
        const { detail } = event;
        try {
            const response = await deletePlanification( detail, ( user as any )._id );
            if ( response.data.status === RequestResponseStatus.OK ) {
                dispatch( removePlanification( detail ) );
            }
        } catch ( err ) {
            console.log( err );
        }
        finally {
            window.dispatchEvent( new CustomEvent( 'dropdown-menu-close' ) );
        }
    };

    return (
        <Grid className="main-planification-container" container justifyContent="center" alignItems="center">
            <Grid sm={ false } md={ 2 } item></Grid>
            <Grid sm={ 12 } md={ 8 } className="list-container" item>
                { user && <PlanificationGrid metaData={ DEFAULT_TABLE_HEAD } rowData={ planifications.data } /> }
            </Grid>
            <Grid sm={ false } md={ 2 } item></Grid>
        </Grid>
    );
};

export default Main;