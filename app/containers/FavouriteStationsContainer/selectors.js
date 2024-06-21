import { createSelector } from 'reselect';

export const selectFavouriteStationsContainer = () => state =>
  state.favouriteStationsContainer;

export const selectFavouriteStations = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer.favouriteStations,
);

export const selectSelectedPlugs = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer?.selectedPlugs,
);

export const selectSelectedReviews = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer?.selectedReviews,
);

export const selectUserCars = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer?.userCars,
);

export const selectPlugsByCarType = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer?.plugsByCarType,
);

export const selectPlugsRetrieved = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer?.plugsRetrieved,
);

export const selectConflictBookings = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer?.conflictBookings,
);

export const selectIsCurrentBookingVerified = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer =>
    favouriteStationsContainer?.isCurrentBookingVerified,
);

export const selectIsBookingSaved = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer?.isBookingSaved,
);

export const selectAreStationReturned = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer?.areStationReturned,
);

export const selectErrorMessages = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer.errorMessages,
);

export const selectAddedStationSuccess = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer.addedStationSuccess,
);
