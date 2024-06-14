import { handleActions } from 'redux-actions';
import * as T from './constants';
import { isEmpty } from 'lodash';

export const initialState = {
  isLoading: false,
  error: null,
  favouriteStations: [],
  selectedPlugs: [],
  selectedReviews: [],
  userCars: [],
  plugsByCarType: [],
  plugsRetrieved: false,
  conflictBookings: [],
  isCurrentBookingVerified: false,
  isBookingSaved: false,
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
    [T.GET_USER_STATIONS_SUCCESS]: (state, action) => ({
      ...state,
      favouriteStations: action.payload,
    }),
    [T.GET_PLUGS_AFTER_CAR_TYPE]: (state, action) => ({
      ...state,
      plugsRetrieved: false,
    }),
    [T.GET_PLUGS_AFTER_CAR_TYPE_SUCCESS]: (state, action) => ({
      ...state,
      plugsByCarType: action.payload,
      plugsRetrieved: true,
    }),
    [T.VERIFY_BOOKING]: (state, action) => {
      return {
        ...state,
        isCurrentBookingVerified: false,
      };
    },
    [T.VERIFY_BOOKING_SUCCESS]: (state, action) => {
      return {
        ...state,
        conflictBookings: action.payload,
        isCurrentBookingVerified: isEmpty(action.payload),
      };
    },
    [T.SAVE_BOOKING]: (state, action) => ({
      ...state,
      isBookingSaved: false,
    }),
    [T.SAVE_BOOKING_SUCCESS]: (state, action) => ({
      ...state,
      isBookingSaved: true,
    }),
  },
  initialState,
);

export default favouriteStationsContainerReducer;
