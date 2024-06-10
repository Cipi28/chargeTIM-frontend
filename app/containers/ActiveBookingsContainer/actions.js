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

export const getContributorBookingsAction = createAction(
  T.GET_CONTRIBUTOR_BOOKINGS,
);
export const getContributorBookingsSuccessAction = createAction(
  T.GET_CONTRIBUTOR_BOOKINGS_SUCCESS,
);
export const getContributorBookingsFailureAction = createAction(
  T.GET_CONTRIBUTOR_BOOKINGS_FAILURE,
);

export const updateBookingStatusAction = createAction(T.UPDATE_BOOKING_STATUS);
export const updateBookingStatusActionSuccess = createAction(
  T.UPDATE_BOOKING_SUCCESS_STATUS,
);
export const updateBookingStatusActionFailure = createAction(
  T.UPDATE_BOOKING_FAILURE_STATUS,
);

export default {
  getUserBookingsAction,
  getUserBookingsSuccessAction,
  getUserBookingsFailureAction,
  deleteBookingAction,
  deleteBookingActionSuccess,
  deleteBookingActionFailure,
  getContributorBookingsAction,
  getContributorBookingsSuccessAction,
  getContributorBookingsFailureAction,
  updateBookingStatusAction,
  updateBookingStatusActionSuccess,
  updateBookingStatusActionFailure,
};
