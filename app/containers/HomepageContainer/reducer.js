import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  userCars: [],
  allStations: [],
  plugs: [],
};

const homepageContainerReducer = handleActions(
  {
    [T.GET_USER_CARS_SUCCESS]: (state, { payload }) => ({
      ...state,
      userCars: payload,
    }),
    [T.GET_PLUGS_SUCCESS]: (state, { payload }) => ({
      ...state,
      plugs: payload,
    }),
    [T.GET_STATIONS_SUCCESS]: (state, { payload }) => ({
      ...state,
      allStations: payload,
    }),
  },
  initialState,
);

export default homepageContainerReducer;
