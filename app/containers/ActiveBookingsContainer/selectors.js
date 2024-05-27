import { createSelector } from 'reselect';

export const selectActiveBookingsContainer = () => state =>
  state.activeBookingsContainer;

export const selectBookings = createSelector(
  selectActiveBookingsContainer(),
  activeBookingsContainer => activeBookingsContainer?.bookings,
);
