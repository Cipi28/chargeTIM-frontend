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
