import { createAction } from 'redux-actions';
import * as T from './constants';

export const updateUserAction = createAction(T.UPDATE_USER);
export const updateUserSuccessAction = createAction(T.UPDATE_USER_SUCCESS);
export const updateUserFailureAction = createAction(T.UPDATE_USER_FAILURE);

export const getUserAction = createAction(T.GET_USER);
export const getUserSuccessAction = createAction(T.GET_USER_SUCCESS);
export const getUserFailureAction = createAction(T.GET_USER_FAILURE);

export default {
  updateUserAction,
  updateUserSuccessAction,
  updateUserFailureAction,
  getUserAction,
  getUserSuccessAction,
  getUserFailureAction,
};
