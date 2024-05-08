import { createAction } from 'redux-actions';
import * as T from './constants';


export const getUserCars = createAction(T.GET_USER_CARS);
export const getUserCarsSuccess = createAction(T.GET_USER_CARS_SUCCESS);
export const getUserCarsFailure = createAction(T.GET_USER_CARS_FAILURE);

export const addCar = createAction(T.ADD_CAR);
export const addCarSuccess = createAction(T.ADD_CAR_SUCCESS);
export const addCarFailure = createAction(T.ADD_CAR_FAILURE);

export const deleteCar = createAction(T.DELETE_CAR);
export const deleteCarSuccess = createAction(T.DELETE_CAR_SUCCESS);
export const deleteCarFailure = createAction(T.DELETE_CAR_FAILURE);

export const updateCar = createAction(T.UPDATE_CAR);
export const updateCarSuccess = createAction(T.UPDATE_CAR_SUCCESS);
export const updateCarFailure = createAction(T.UPDATE_CAR_FAILURE);


export default {
  getUserCars,
  getUserCarsSuccess,
  getUserCarsFailure,
  addCar,
  addCarSuccess,
  addCarFailure,
  deleteCar,
  deleteCarSuccess,
  deleteCarFailure,
  updateCar,
  updateCarSuccess,
  updateCarFailure,
};
