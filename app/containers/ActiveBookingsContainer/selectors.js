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

export const selectDeleteSuccessful = createSelector(
  selectActiveBookingsContainer(),
  activeBookingsContainer => activeBookingsContainer?.deletedSuccessful,
);

export const selectDeleteError = createSelector(
  selectActiveBookingsContainer(),
  activeBookingsContainer => activeBookingsContainer?.deleteError,
);
