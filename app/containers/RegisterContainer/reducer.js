import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  errorMessages: {},
};

const registerContainerReducer = handleActions(
  {
    [T.REGISTER]: state => ({ ...state, isLoading: true }),
    [T.REGISTER_FAILURE]: (state, { payload }) => {
      return { ...state, errorMessages: payload };
    },
  },
  initialState,
);

export default registerContainerReducer;
