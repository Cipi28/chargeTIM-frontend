import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  userCars: [],
};

const homepageContainerReducer = handleActions(
  {
    [T.GET_USER_CARS_SUCCESS]: (state, { payload }) => ({
      ...state,
      userCars: payload,
    }),
  },
  initialState,
);

export default homepageContainerReducer;
