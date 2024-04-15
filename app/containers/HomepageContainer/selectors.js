import { createSelector } from 'reselect';

export const selectHomepageContainer = () => state => state.homepageContainer;

export const selectUserCars = createSelector(
  selectHomepageContainer(),
  homepageContainer => homepageContainer.userCars,
);
