import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  stations: [],
  favouriteStations: [],
  selectedPlugs: [],
  selectedReviews: [],
  userCars: [],
};

const mapContainerReducer = handleActions(
  {
    [T.SAVE_STATIONS_SUCCESS]: (state, action) => ({
      ...state,
      stations: action.payload,
    }),
    [T.GET_FAVOURITE_STATIONS_INDEX_SUCCESS]: (state, action) => ({
      ...state,
      favouriteStations: action.payload,
    }),
    [T.ADD_STATION_TO_FAVOURITES_SUCCESS]: (state, action) => ({
      ...state,
      favouriteStations: action.payload,
    }),
    [T.DELETE_FAVOURITE_STATION_SUCCESS]: (state, action) => ({
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

export default mapContainerReducer;
