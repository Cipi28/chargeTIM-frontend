import { createSelector } from 'reselect';
import { selectMapContainer } from '../MapContainer/selectors';

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
