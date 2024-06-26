import { createSelector } from 'reselect';

export const selectBookingHistoryContainer = () => state =>
  state.bookingHistoryContainer;

export const selectBookings = createSelector(
  selectBookingHistoryContainer(),
  bookingHistoryContainer => bookingHistoryContainer?.bookings,
);

export const selectRatedSuccessful = createSelector(
  selectBookingHistoryContainer(),
  bookingHistoryContainer => bookingHistoryContainer?.ratedSuccessful,
);

export const selectReviewSuccess = createSelector(
  selectBookingHistoryContainer(),
  bookingHistoryContainer => bookingHistoryContainer?.reviewSuccess,
);

export const selectReviewError = createSelector(
  selectBookingHistoryContainer(),
  bookingHistoryContainer => bookingHistoryContainer?.reviewError,
);

export const selectRateSuccess = createSelector(
  selectBookingHistoryContainer(),
  bookingHistoryContainer => bookingHistoryContainer?.rateSuccess,
);

export const selectRateError = createSelector(
  selectBookingHistoryContainer(),
  bookingHistoryContainer => bookingHistoryContainer?.rateError,
);
