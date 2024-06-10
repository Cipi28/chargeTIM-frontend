import { handleActions } from 'redux-actions';
import * as T from './constants';
import { isEmpty } from 'lodash';

export const initialState = {
  isLoading: false,
  error: null,
  bookings: {},
  ratedSuccessful: false,
};

const bookingHistoryContainerReducer = handleActions(
  {
    [T.GET_USER_BOOKINGS_SUCCESS]: (state, action) => ({
      ...state,
      bookings: action.payload,
    }),
    [T.RATE_USER_SUCCESS]: (state, action) => {
      const updatedBookings = {};
      for (let i = 0; i < 5; i++) {
        if (!isEmpty(state.bookings[i])) {
          updatedBookings[i] = state.bookings[i].map(booking => {
            if (booking.id === action.payload.id) {
              return action.payload;
            }
            return booking;
          });
        }
      }
      return {
        ...state,
        bookings: updatedBookings,
        ratedSuccessful: true,
      };
    },
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
