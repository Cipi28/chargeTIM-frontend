import { createSelector } from 'reselect';

export const selectProfileContainer = () => state => state.profileContainer;

export const selectUser = createSelector(
  selectProfileContainer(),
  profileContainer => profileContainer.user,
);

export const selectErrorMessages = createSelector(
  selectProfileContainer(),
  profileContainer => profileContainer.errorMessages,
);

export const selectUpdateSuccess = createSelector(
  selectProfileContainer(),
  profileContainer => profileContainer.updateCarSuccess,
);
