import { createSelector } from 'reselect';

export const selectProfileContainer = () => state => state.profileContainer;

export const selectUser = createSelector(
  selectProfileContainer(),
  profileContainer => profileContainer.user,
);
