import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  user: null,
};

const profileContainerReducer = handleActions(
  {
    [T.GET_USER_SUCCESS]: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
  },
  initialState,
);

export default profileContainerReducer;
