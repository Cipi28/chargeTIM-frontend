import { handleActions } from 'redux-actions';
import * as T from './constants';
import { BOOKING_STATUS_ACTIVE, BOOKING_STATUS_REJECTED } from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  bookings: {},
  acceptedSuccessful: false,
  rejectedSuccessful: false,
};

const activeBookingsContainerReducer = handleActions(
  {
    [T.GET_USER_BOOKINGS_SUCCESS]: (state, action) => ({
      ...state,
      bookings: action.payload,
    }),
    [T.UPDATE_BOOKING_SUCCESS_STATUS]: (state, action) => ({
      ...state,
      acceptedSuccessful: action.payload.status === BOOKING_STATUS_ACTIVE,
      rejectedSuccessful: action.payload.status === BOOKING_STATUS_REJECTED,
    }),
  },
  initialState,
);

export default activeBookingsContainerReducer;
