import { createSelector } from 'reselect';

export const selectRegisterContainer = () => state => state.registerContainer;

export const selectErrorMessages = createSelector(
  selectRegisterContainer(),
  registerContainer => registerContainer.errorMessages,
);
