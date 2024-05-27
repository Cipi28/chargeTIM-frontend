import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  bookings: {},
};

const activeBookingsContainerReducer = handleActions(
  {
    [T.GET_USER_BOOKINGS_SUCCESS]: (state, action) => ({
      ...state,
      bookings: action.payload,
    }),
  },
  initialState,
);

export default activeBookingsContainerReducer;
