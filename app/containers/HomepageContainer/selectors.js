import { createSelector } from 'reselect';

export const selectHomepageContainer = () => state => state.homepageContainer;

export const selectUserCars = createSelector(
  selectHomepageContainer(),
  homepageContainer => homepageContainer.userCars,
);

export const selectAllStations = createSelector(
  selectHomepageContainer(),
  homepageContainer => homepageContainer.allStations,
);
