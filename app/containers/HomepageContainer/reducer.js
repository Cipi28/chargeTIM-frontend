import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
};

const homepageContainerReducer = handleActions(
  {
    [T.SIGN_IN]: state => ({ ...state, isLoading: false }),
  },
  initialState,
);

export default homepageContainerReducer;
