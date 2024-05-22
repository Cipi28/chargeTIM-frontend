import { createSelector } from 'reselect';
import { selectMapContainer } from '../MapContainer/selectors';

export const selectFavouriteStationsContainer = () => state =>
  state.favouriteStationsContainer;

export const selectFavouriteStations = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer.favouriteStations,
);

export const selectSelectedPlugs = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.selectedPlugs,
);

export const selectSelectedReviews = createSelector(
  selectMapContainer(),
  mapContainer => mapContainer?.selectedReviews,
);
