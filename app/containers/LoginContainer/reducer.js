import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  errorMessages: {},
};

const loginContainerReducer = handleActions(
  {
    [T.SIGN_IN]: state => ({ ...state, isLoading: true }),
    [T.SIGN_IN_SUCCESS]: state => {
      const attempts = 0;
      return { ...state, attempts, isLoading: false, errorMessages: {} };
    },
    [T.SIGN_IN_FAILURE]: (state, { payload }) => {
      return { ...state, errorMessages: payload };
    },
  },
  initialState,
);

export default loginContainerReducer;
