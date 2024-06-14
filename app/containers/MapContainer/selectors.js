import { createSelector } from 'reselect';

export const selectMapContainer = () => state => state.mapContainer;
export const selectStations = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.stations,
);

export const selectFavouriteStations = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.favouriteStations,
);

export const selectSelectedPlugs = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.selectedPlugs,
);

export const selectSelectedReviews = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.selectedReviews,
);

export const selectUserCars = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.userCars,
);

export const selectPlugsByCarType = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.plugsByCarType,
);

export const selectPlugsRetrieved = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.plugsRetrieved,
);

export const selectConflictBookings = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.conflictBookings,
);

export const selectIsCurrentBookingVerified = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.isCurrentBookingVerified,
);

export const selectIsBookingSaved = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.isBookingSaved,
);
