import { createAction } from 'redux-actions';
import * as T from './constants';

export const saveStations = createAction(T.SAVE_STATIONS);
export const saveStationsSuccess = createAction(T.SAVE_STATIONS_SUCCESS);
export const saveStationsFailure = createAction(T.SAVE_STATIONS_FAILURE);
export const getUserFavouriteStations = createAction(T.GET_FAVOURITE_STATIONS);
export const getUserFavouriteStationsSuccess = createAction(
  T.GET_FAVOURITE_STATIONS_SUCCESS,
);
export const getUserFavouriteStationsFailure = createAction(
  T.GET_FAVOURITE_STATIONS_FAILURE,
);

export const addStationToFavourites = createAction(T.ADD_STATION_TO_FAVOURITES);
export const addStationToFavouritesSuccess = createAction(
  T.ADD_STATION_TO_FAVOURITES_SUCCESS,
);
export const addStationToFavouritesFailure = createAction(
  T.ADD_STATION_TO_FAVOURITES_FAILURE,
);

export const deleteFavouriteStation = createAction(T.DELETE_FAVOURITE_STATION);
export const deleteFavouriteStationSuccess = createAction(
  T.DELETE_FAVOURITE_STATION_SUCCESS,
);
export const deleteFavouriteStationFailure = createAction(
  T.DELETE_FAVOURITE_STATION_FAILURE,
);

export default {
  getUserFavouriteStations,
  getUserFavouriteStationsSuccess,
  getUserFavouriteStationsFailure,
  saveStations,
  saveStationsSuccess,
  saveStationsFailure,
  addStationToFavourites,
  addStationToFavouritesSuccess,
  addStationToFavouritesFailure,
  deleteFavouriteStation,
  deleteFavouriteStationSuccess,
  deleteFavouriteStationFailure,
};
