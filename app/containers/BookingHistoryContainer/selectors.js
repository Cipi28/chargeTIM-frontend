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
