import { createAction } from 'redux-actions';
import * as T from './constants';

export const getUserBookingsAction = createAction(T.GET_USER_BOOKINGS);
export const getUserBookingsSuccessAction = createAction(
  T.GET_USER_BOOKINGS_SUCCESS,
);
export const getUserBookingsFailureAction = createAction(
  T.GET_USER_BOOKINGS_FAILURE,
);

export const deleteBookingAction = createAction(T.DELETE_BOOKING);
export const deleteBookingActionSuccess = createAction(
  T.DELETE_BOOKING_SUCCESS,
);
export const deleteBookingActionFailure = createAction(
  T.DELETE_BOOKING_FAILURE,
);
