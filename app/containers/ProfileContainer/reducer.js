import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  error: null,
  user: null,
  errorMessages: {},
  updateCarSuccess: false,
};

const profileContainerReducer = handleActions(
  {
    [T.GET_USER_SUCCESS]: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
    [T.UPDATE_USER]: (state, { payload }) => {
      return { ...state, errorMessages: {}, updateCarSuccess: false };
    },
    [T.UPDATE_USER_FAILURE]: (state, { payload }) => {
      return { ...state, errorMessages: payload };
    },
    [T.UPDATE_USER_SUCCESS]: (state, { payload }) => {
      return { ...state, updateCarSuccess: true };
    },
  },
  initialState,
);

export default profileContainerReducer;
