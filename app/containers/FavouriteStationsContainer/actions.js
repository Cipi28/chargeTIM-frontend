import { createAction } from 'redux-actions';
import * as T from './constants';

export const getFavouriteStations = createAction(T.GET_FAVOURITE_STATIONS);
export const getFavouriteStationsSuccess = createAction(
  T.GET_FAVOURITE_STATIONS_SUCCESS,
);
export const getFavouriteStationsFailure = createAction(
  T.GET_FAVOURITE_STATIONS_FAILURE,
);

export default {
  getFavouriteStations,
  getFavouriteStationsSuccess,
  getFavouriteStationsFailure,
};
