import { createAction } from 'redux-actions';
import * as T from './constants';

export const saveStations = createAction(T.SAVE_STATIONS);
export const saveStationsSuccess = createAction(T.SAVE_STATIONS_SUCCESS);
export const saveStationsFailure = createAction(T.SAVE_STATIONS_FAILURE);
export const getUserFavouriteStationsIndex = createAction(
  T.GET_FAVOURITE_STATIONS_INDEX,
);
export const getUserFavouriteStationsIndexSuccess = createAction(
  T.GET_FAVOURITE_STATIONS_INDEX_SUCCESS,
);
export const getUserFavouriteStationsIndexFailure = createAction(
  T.GET_FAVOURITE_STATIONS_INDEX_FAILURE,
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

export const getPlugsAction = createAction(T.GET_PLUGS);
export const getPlugsSuccessAction = createAction(T.GET_PLUGS_SUCCESS);
export const getPlugsFailureAction = createAction(T.GET_PLUGS_FAILURE);

export const getReviewsAction = createAction(T.GET_REVIEWS);
export const getReviewsSuccessAction = createAction(T.GET_REVIEWS_SUCCESS);
export const getReviewsFailureAction = createAction(T.GET_REVIEWS_FAILURE);

export const getUserCarsAction = createAction(T.GET_USER_CARS);
export const getUserCarsSuccessAction = createAction(T.GET_USER_CARS_SUCCESS);
export const getUserCarsFailureAction = createAction(T.GET_USER_CARS_FAILURE);

export const saveBookingAction = createAction(T.SAVE_BOOKING);
export const saveBookingSuccessAction = createAction(T.SAVE_BOOKING_SUCCESS);
export const saveBookingFailureAction = createAction(T.SAVE_BOOKING_FAILURE);

export const verifyBookingAction = createAction(T.VERIFY_BOOKING);
export const verifyBookingSuccessAction = createAction(
  T.VERIFY_BOOKING_SUCCESS,
);
export const verifyBookingFailureAction = createAction(
  T.VERIFY_BOOKING_FAILURE,
);

export const getPlugsAfterCarTypeAction = createAction(
  T.GET_PLUGS_AFTER_CAR_TYPE,
);
export const getPlugsAfterCarTypeSuccessAction = createAction(
  T.GET_PLUGS_AFTER_CAR_TYPE_SUCCESS,
);
export const getPlugsAfterCarTypeFailureAction = createAction(
  T.GET_PLUGS_AFTER_CAR_TYPE_FAILURE,
);

export const getPlugsAfterCarTypeQuietAction = createAction(
  T.GET_PLUGS_AFTER_CAR_TYPE_QUIET,
);

export const closeAlertsAction = createAction(T.CLOSE_ALERTS);

export default {
  getUserFavouriteStationsIndex,
  getUserFavouriteStationsIndexSuccess,
  getUserFavouriteStationsIndexFailure,
  saveStations,
  saveStationsSuccess,
  saveStationsFailure,
  addStationToFavourites,
  addStationToFavouritesSuccess,
  addStationToFavouritesFailure,
  deleteFavouriteStation,
  deleteFavouriteStationSuccess,
  deleteFavouriteStationFailure,
  getPlugsAction,
  getPlugsSuccessAction,
  getPlugsFailureAction,
  getReviewsAction,
  getReviewsSuccessAction,
  getReviewsFailureAction,
  getUserCarsAction,
  getUserCarsSuccessAction,
  getUserCarsFailureAction,
  saveBookingAction,
  saveBookingSuccessAction,
  saveBookingFailureAction,
  getPlugsAfterCarTypeAction,
  getPlugsAfterCarTypeSuccessAction,
  getPlugsAfterCarTypeFailureAction,
  getPlugsAfterCarTypeQuietAction,
  verifyBookingAction,
  verifyBookingSuccessAction,
  verifyBookingFailureAction,
  closeAlertsAction,
};
