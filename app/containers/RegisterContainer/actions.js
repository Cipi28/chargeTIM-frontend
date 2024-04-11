import { createAction } from 'redux-actions';
import * as T from './constants';

export const registerAction = createAction(T.REGISTER);
export const registerActionSuccess = createAction(T.REGISTER_SUCCESS);
export const registerActionFailure = createAction(T.REGISTER_FAILURE);

export default {
  registerAction,
  registerActionSuccess,
  registerActionFailure,
};
