import {createSelector} from 'reselect';

export const selectFavouriteStationsContainer = () => state => state.favouriteStationsContainer;

// export const selectUserCars = createSelector(
//   selectHomepageContainer(),
//   homepageContainer => homepageContainer.userCars,
// );
