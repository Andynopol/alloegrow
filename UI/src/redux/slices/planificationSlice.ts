import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planification } from '../../constants/interfaces';

const initialState: { data: Array<Planification>; } = { data: [] };


const planificationSlice = createSlice( {
    name: 'auth',
    initialState,
    reducers: {
        setPlanification: ( state, action: PayloadAction<Planification> ) => {
            state = { data: [ ...state.data, action.payload ] };
            return state;
        },
        setPlanifications: ( state, action: PayloadAction<Array<Planification>> ) => {
            state = { data: [ ...state.data, ...action.payload.filter( planification => !state.data.find( elem => elem._id === planification._id ) ) ] };
            return state;
        },
        removePlanification: ( state, action: PayloadAction<string> ) => {
            state.data = state.data.filter( ( { _id }: Planification ) => _id !== action.payload );
            return state;
        },
        flush: ( state ) => {
            state = { ...initialState };
            return state;
        }

    },
} );

export const { setPlanification, setPlanifications, removePlanification } = planificationSlice.actions;

export default planificationSlice.reducer;