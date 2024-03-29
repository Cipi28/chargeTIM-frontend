import { createAction } from 'redux-actions';
import * as T from './constants';

export const signInAction = createAction(T.SIGN_IN);
export const signInActionSuccess = createAction(T.SIGN_IN_SUCCESS);
export const signInActionFailure = createAction(T.SIGN_IN_FAILURE);



