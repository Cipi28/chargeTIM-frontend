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
};
