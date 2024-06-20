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

export const selectErrorMessages = createSelector(
  selectHomepageContainer(),
  homepageContainer => homepageContainer.errorMessages,
);

export const selectSuccessAddCar = createSelector(
  selectHomepageContainer(),
  homepageContainer => homepageContainer.successAddCar,
);

export const selectUpdateErrorMessages = createSelector(
  selectHomepageContainer(),
  homepageContainer => homepageContainer.updateErrorMessages,
);

export const selectSuccessUpdateCar = createSelector(
  selectHomepageContainer(),
  homepageContainer => homepageContainer.successUpdateCar,
);

export const selectChartsData = createSelector(
  selectHomepageContainer(),
  homepageContainer => homepageContainer.chartsData,
);
