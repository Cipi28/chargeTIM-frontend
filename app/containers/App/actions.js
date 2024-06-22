import { createAction } from 'redux-actions';
import * as T from './constants';
/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

export const storeUserAction = createAction(T.STORE_USER);
export const loadDataSuccess = createAction(T.LOAD_DATA_SUCCESS);
export const loadDataFailure = createAction(T.LOAD_DATA_FAILURE);
export const user = createAction(T.USER);

export const loadUserAction = createAction(T.LOAD_USER);

export default {
  loadDataSuccess,
  loadDataFailure,
  storeUserAction,
  user,
  loadUserAction,
};
