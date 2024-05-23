import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  favouriteStations: [],
  selectedPlugs: [],
  selectedReviews: [],
  userCars: [],
};

const favouriteStationsContainerReducer = handleActions(
  {
    [T.GET_FAVOURITE_STATIONS_SUCCESS]: (state, action) => ({
      ...state,
      favouriteStations: action.payload,
    }),
    [T.GET_PLUGS_SUCCESS]: (state, action) => ({
      ...state,
      selectedPlugs: action.payload,
    }),
    [T.GET_REVIEWS_SUCCESS]: (state, action) => ({
      ...state,
      selectedReviews: action.payload,
    }),
    [T.GET_USER_CARS_SUCCESS]: (state, action) => ({
      ...state,
      userCars: action.payload,
    }),
  },
  initialState,
);

export default favouriteStationsContainerReducer;
