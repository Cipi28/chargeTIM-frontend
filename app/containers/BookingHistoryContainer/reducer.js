import { handleActions } from 'redux-actions';
import * as T from './constants';
import { isEmpty } from 'lodash';

export const initialState = {
  error: null,
  bookings: {},
  ratedSuccessful: false,
  reviewSuccess: false,
  reviewError: null,
  rateSuccess: false,
  rateError: null,
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
        rateSuccess: true,
      };
    },
    [T.SAVE_REVIEW]: (state, action) => ({
      ...state,
      reviewSuccess: false,
      reviewError: null,
    }),
    [T.SAVE_REVIEW_SUCCESS]: (state, action) => ({
      ...state,
      reviewSuccess: true,
    }),
    [T.SAVE_REVIEW_FAILURE]: (state, action) => ({
      ...state,
      reviewError: action.payload,
    }),
    [T.RATE_USER]: (state, action) => ({
      ...state,
      rateSuccess: false,
      rateError: null,
    }),
    [T.RATE_USER_FAILURE]: (state, action) => ({
      ...state,
      rateError: action.payload,
    }),
  },
  initialState,
);

export default bookingHistoryContainerReducer;
