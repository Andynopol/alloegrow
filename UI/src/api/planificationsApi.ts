import axios from 'axios';
import { HTTPVerbs } from '../constants/enums';
import { PlanificationGenerationData } from '../constants/interfaces';
import { DEFAULT_HEADER } from '../constants/vars';

export const getPlanifications = ( _id: string ) => axios.get( `/planifications/get/${ { _id } }` );

export const generatePlanification = ( data: PlanificationGenerationData ) => axios.post( '/planifications/create', { headers: DEFAULT_HEADER, method: HTTPVerbs.POST, body: JSON.stringify( data ) } );