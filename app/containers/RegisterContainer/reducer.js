import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
};

const registerContainerReducer = handleActions(
  {
    [T.REGISTER]: state => ({ ...state, isLoading: true }),
    // [T.REGISTER_SUCCESS]: state => {
    //   const attempts = 0;
    //   return { ...state, attempts, isLoading: false };
    // },
  },
  initialState,
);


export default registerContainerReducer;
