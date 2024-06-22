import { handleActions } from 'redux-actions';
import * as T from './constants';
import { BOOKING_STATUS_ACTIVE, BOOKING_STATUS_REJECTED } from './constants';

export const initialState = {
  error: null,
  bookings: {},
  acceptedSuccessful: false,
  rejectedSuccessful: false,
  deletedSuccessful: false,
  deleteError: null,
};

const activeBookingsContainerReducer = handleActions(
  {
    [T.GET_USER_BOOKINGS_SUCCESS]: (state, action) => ({
      ...state,
      bookings: action.payload,
    }),
    [T.UPDATE_BOOKING_STATUS]: (state, action) => ({
      ...state,
      acceptedSuccessful: false,
      rejectedSuccessful: false,
    }),
    [T.UPDATE_BOOKING_SUCCESS_STATUS]: (state, action) => ({
      ...state,
      acceptedSuccessful: action.payload.status === BOOKING_STATUS_ACTIVE,
      rejectedSuccessful: action.payload.status === BOOKING_STATUS_REJECTED,
    }),
    [T.DELETE_BOOKING]: (state, action) => ({
      ...state,
      deletedSuccessful: false,
      deleteError: null,
    }),
    [T.DELETE_BOOKING_SUCCESS]: (state, action) => ({
      ...state,
      deletedSuccessful: true,
    }),
    [T.DELETE_BOOKING_FAILURE]: (state, action) => ({
      ...state,
      deleteError: action.payload,
    }),
  },
  initialState,
);

export default activeBookingsContainerReducer;
