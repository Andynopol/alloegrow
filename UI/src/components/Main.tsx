
import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import PlanificationGrid from './Table/PlanificationGrid';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { getPlanifications } from '../api/planificationsApi';
import { DEFAULT_TABLE_HEAD } from '../constants/vars';
import { setPlanifications } from '../redux/slices/planificationSlice';



const Main = () => {
    const user = useAppSelector( state => state?.auth.user );
    const planifications = useAppSelector( state => state.planifications );
    const dispatch = useAppDispatch();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect( () => {
        user && fetchPlanifications( ( user as any )._id );
    }, [ user ] );

    const fetchPlanifications = async ( _id: string ) => {
        const response = await getPlanifications( _id );
        dispatch( setPlanifications( response.data.payload ) );
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