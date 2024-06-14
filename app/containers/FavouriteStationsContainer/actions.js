import { createAction } from 'redux-actions';
import * as T from './constants';

export const getFavouriteStations = createAction(T.GET_FAVOURITE_STATIONS);
export const getFavouriteStationsSuccess = createAction(
  T.GET_FAVOURITE_STATIONS_SUCCESS,
);
export const getFavouriteStationsFailure = createAction(
  T.GET_FAVOURITE_STATIONS_FAILURE,
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

export const addStation = createAction(T.ADD_STATION);
export const addStationSuccess = createAction(T.ADD_STATION_SUCCESS);
export const addStationFailure = createAction(T.ADD_STATION_FAILURE);

export const getUserStations = createAction(T.GET_USER_STATIONS);
export const getUserStationsSuccess = createAction(T.GET_USER_STATIONS_SUCCESS);
export const getUserStationsFailure = createAction(T.GET_USER_STATIONS_FAILURE);

export const deleteStation = createAction(T.DELETE_STATION);
export const deleteStationSuccess = createAction(T.DELETE_STATION_SUCCESS);
export const deleteStationFailure = createAction(T.DELETE_STATION_FAILURE);

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

export default {
  getFavouriteStations,
  getFavouriteStationsSuccess,
  getFavouriteStationsFailure,
  getPlugsAction,
  getPlugsSuccessAction,
  getPlugsFailureAction,
  getReviewsAction,
  getReviewsSuccessAction,
  getReviewsFailureAction,
  getUserCarsAction,
  getUserCarsSuccessAction,
  getUserCarsFailureAction,
  addStation,
  addStationSuccess,
  addStationFailure,
  getUserStations,
  getUserStationsSuccess,
  getUserStationsFailure,
  deleteStation,
  deleteStationSuccess,
  deleteStationFailure,
  saveBookingAction,
  saveBookingSuccessAction,
  saveBookingFailureAction,
  verifyBookingAction,
  verifyBookingSuccessAction,
  verifyBookingFailureAction,
  getPlugsAfterCarTypeAction,
  getPlugsAfterCarTypeSuccessAction,
  getPlugsAfterCarTypeFailureAction,
  getPlugsAfterCarTypeQuietAction,
};
