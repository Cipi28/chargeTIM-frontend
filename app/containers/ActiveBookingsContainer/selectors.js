import { createSelector } from 'reselect';

export const selectActiveBookingsContainer = () => state =>
  state.activeBookingsContainer;

export const selectBookings = createSelector(
  selectActiveBookingsContainer(),
  activeBookingsContainer => activeBookingsContainer?.bookings,
);

export const selectAcceptedSuccessful = createSelector(
  selectActiveBookingsContainer(),
  activeBookingsContainer => activeBookingsContainer?.acceptedSuccessful,
);

export const selectRejectedSuccessful = createSelector(
  selectActiveBookingsContainer(),
  activeBookingsContainer => activeBookingsContainer?.rejectedSuccessful,
);
