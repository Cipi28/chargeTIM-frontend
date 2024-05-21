import { createSelector } from 'reselect';

export const selectFavouriteStationsContainer = () => state =>
  state.favouriteStationsContainer;

export const selectFavouriteStations = createSelector(
  selectFavouriteStationsContainer(),
  favouriteStationsContainer => favouriteStationsContainer.favouriteStations,
);
