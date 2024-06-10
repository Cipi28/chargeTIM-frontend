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

export const saveReviewAction = createAction(T.SAVE_REVIEW);
export const saveReviewActionSuccess = createAction(T.SAVE_REVIEW_SUCCESS);
export const saveReviewActionFailure = createAction(T.SAVE_REVIEW_FAILURE);

export const updateBookingAction = createAction(T.UPDATE_BOOKING);
export const updateBookingActionSuccess = createAction(
  T.UPDATE_BOOKING_SUCCESS,
);
export const updateBookingActionFailure = createAction(
  T.UPDATE_BOOKING_FAILURE,
);

export const rateUserAction = createAction(T.RATE_USER);
export const rateUserActionSuccess = createAction(T.RATE_USER_SUCCESS);
export const rateUserActionFailure = createAction(T.RATE_USER_FAILURE);
