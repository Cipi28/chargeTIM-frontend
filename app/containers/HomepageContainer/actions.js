import { createAction } from 'redux-actions';
import * as T from './constants';

export const signInAction = createAction(T.SIGN_IN);

export default {
  signInAction,
};
