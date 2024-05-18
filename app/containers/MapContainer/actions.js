import {createAction} from 'redux-actions';
import * as T from './constants';

export const getUserFavouritePublicStations = createAction(T.GET_FAV_PUBLIC_STATIONS);
export const getUserFavouritePublicStationsSuccess = createAction(T.GET_FAV_PUBLIC_STATIONS_SUCCESS);
export const getUserFavouritePublicStationsFailure = createAction(T.GET_FAV_PUBLIC_STATIONS_FAILURE);

export default {
  getUserFavouritePublicStations,
  getUserFavouritePublicStationsSuccess,
  getUserFavouritePublicStationsFailure,
};
