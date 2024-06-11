import { createSelector } from 'reselect';

export const selectLoginContainer = () => state => state.loginContainer;

export const selectIsLoading = createSelector(
  selectLoginContainer(),
  loginContainer => loginContainer.isLoading,
);

export const selectError = createSelector(
  selectLoginContainer(),
  loginContainer => loginContainer.error,
);

export const selectErrorMessages = createSelector(
  selectLoginContainer(),
  loginContainer => loginContainer.errorMessages,
);
