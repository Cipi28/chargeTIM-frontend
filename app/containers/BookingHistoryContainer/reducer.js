import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  bookings: {},
};

const bookingHistoryContainerReducer = handleActions(
  {
    [T.GET_USER_BOOKINGS_SUCCESS]: (state, action) => ({
      ...state,
      bookings: action.payload,
    }),
    // [T.UPDATE_BOOKING_SUCCESS]: (state, action) => ({
    //   ...state,
    //   //return all the current bookings in the bookings initial state + the updated booking coming from the action.payload
    //   bookings: {
    //     '2': [...state.bookings[BOOKING_STATUS_ENDED], ...action.payload],
    //     '4': state.bookings[BOOKING_STATUS_REJECTED],
    //   },
    // }),
  },
  initialState,
);

export default bookingHistoryContainerReducer;
