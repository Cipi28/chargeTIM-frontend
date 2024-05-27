import { call, put, takeLatest } from 'redux-saga/effects';

import * as T from './constants';
import * as A from './actions';
import { post, get, del, patch } from '../../api';

function* getUserBookings(action) {
  try {
    const { userId, statuses } = action.payload;
    const bookings = yield call(post, `/bookings/${userId}`, { statuses });
    if (bookings) {
      yield put(A.getUserBookingsSuccessAction(bookings.data));
    }
  } catch (e) {
    yield put(A.getUserBookingsFailureAction(e.message));
  }
}

function* deleteBooking(action) {
  try {
    const { id } = action.payload;
    const booking = yield call(del, `/bookings/${id}`);
    if (booking) {
      yield put(A.deleteBookingActionSuccess(booking.data));
    }
  } catch (e) {
    yield put(A.deleteBookingActionFailure(e.message));
  }
}

function* activeBookingsContainerSaga() {
  yield takeLatest(T.GET_USER_BOOKINGS, getUserBookings);
  yield takeLatest(T.DELETE_BOOKING, deleteBooking);
}

export default activeBookingsContainerSaga;
