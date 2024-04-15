import { createAction } from 'redux-actions';
import * as T from './constants';


export const getUserCars = createAction(T.GET_USER_CARS);
export const getUserCarsSuccess = createAction(T.GET_USER_CARS_SUCCESS);
export const getUserCarsFailure = createAction(T.GET_USER_CARS_FAILURE);


export default {
  getUserCars,
  getUserCarsSuccess,
  getUserCarsFailure,
};
