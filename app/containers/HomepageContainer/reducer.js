import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  userCars: [],
  allStations: [],
  plugs: [],
  errorMessages: {},
  successAddCar: false,
  successUpdateCar: false,
  updateErrorMessages: {},
  chartsData: null,
  carsReturned: false,
};

const homepageContainerReducer = handleActions(
  {
    [T.GET_USER_CARS_SUCCESS]: (state, { payload }) => ({
      ...state,
      userCars: payload,
      successAddCar: false,
      successUpdateCar: false,
      carsReturned: true,
    }),
    [T.ADD_CAR]: (state, { payload }) => ({
      ...state,
      successAddCar: false,
    }),
    [T.ADD_CAR_SUCCESS]: (state, { payload }) => ({
      ...state,
      successAddCar: true,
    }),
    [T.ADD_CAR_FAILURE]: (state, { payload }) => ({
      ...state,
      errorMessages: payload,
    }),
    [T.UPDATE_CAR]: (state, { payload }) => ({
      ...state,
      successUpdateCar: false,
    }),
    [T.UPDATE_CAR_SUCCESS]: (state, { payload }) => ({
      ...state,
      successUpdateCar: true,
    }),
    [T.UPDATE_CAR_FAILURE]: (state, { payload }) => ({
      ...state,
      updateErrorMessages: payload,
    }),
    [T.GET_PLUGS_SUCCESS]: (state, { payload }) => ({
      ...state,
      plugs: payload,
    }),
    [T.GET_STATIONS_SUCCESS]: (state, { payload }) => ({
      ...state,
      allStations: payload,
    }),
    [T.GET_CHARTS_DATA_SUCCESS]: (state, { payload }) => ({
      ...state,
      chartsData: payload,
    }),
  },
  initialState,
);

export default homepageContainerReducer;
