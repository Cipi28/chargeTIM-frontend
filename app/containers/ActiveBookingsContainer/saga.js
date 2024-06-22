import { call, put, takeLatest } from 'redux-saga/effects';

import * as T from './constants';
import * as A from './actions';
import { post, del, patch } from '../../api';

function* getUserBookings(action) {
  try {
    const { userId, statuses } = action.payload;
    const role = action.payload.role ? action.payload.role : 0;
    const bookings = yield call(post, `/bookings/${userId}`, {
      statuses,
      role,
    });
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

function* getContributorsBookings(action) {
  try {
    const { userId, statuses } = action.payload;
    const bookings = yield call(post, `/bookings/contributor/${userId}`, {
      statuses,
    });
    if (bookings) {
      yield put(A.getContributorBookingsSuccessAction(bookings.data));
    }
  } catch (e) {
    yield put(A.getContributorBookingsFailureAction(e.message));
  }
}

function* updateBookingStatus(action) {
  try {
    const { id, status } = action.payload;
    const bookings = yield call(patch, `/bookings/status/${id}`, {
      status,
    });
    if (bookings) {
      yield put(A.updateBookingStatusActionSuccess(bookings.data));
    }
  } catch (e) {
    yield put(A.updateBookingStatusActionFailure(e.message));
  }
}

function* activeBookingsContainerSaga() {
  yield takeLatest(T.GET_USER_BOOKINGS, getUserBookings);
  yield takeLatest(T.DELETE_BOOKING, deleteBooking);
  yield takeLatest(T.GET_CONTRIBUTOR_BOOKINGS, getContributorsBookings);
  yield takeLatest(T.UPDATE_BOOKING_STATUS, updateBookingStatus);
}

export default activeBookingsContainerSaga;
