import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  stations: [],
  favouriteStations: [],
};

const mapContainerReducer = handleActions(
  {
    [T.SAVE_STATIONS_SUCCESS]: (state, action) => ({
      ...state,
      stations: action.payload,
    }),
    [T.GET_FAVOURITE_STATIONS_SUCCESS]: (state, action) => ({
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
  },
  initialState,
);

export default mapContainerReducer;
