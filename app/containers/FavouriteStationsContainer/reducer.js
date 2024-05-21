import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  favouriteStations: [],
};

const favouriteStationsContainerReducer = handleActions(
  {
    [T.GET_FAVOURITE_STATIONS_SUCCESS]: (state, action) => ({
      ...state,
      favouriteStations: action.payload,
    }),
  },
  initialState,
);

export default favouriteStationsContainerReducer;
