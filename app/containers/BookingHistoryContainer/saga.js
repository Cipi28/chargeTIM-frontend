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

function* saveReview(action) {
  try {
    const review = yield call(post, `/reviews`, { ...action.payload });
    if (review) {
      yield put(A.saveReviewActionSuccess(review.data));
    }
  } catch (e) {
    yield put(A.saveReviewActionFailure(e.message));
  }
}

function* updateBooking(action) {
  try {
    const booking = yield call(patch, `/bookings/${action.payload.id}`, {
      ...action.payload,
    });
    if (booking) {
      yield put(A.updateBookingActionSuccess(booking.data));
    }
  } catch (e) {
    yield put(A.updateBookingActionFailure(e.message));
  }
}

function* bookingHistoryContainerSaga() {
  yield takeLatest(T.GET_USER_BOOKINGS, getUserBookings);
  yield takeLatest(T.DELETE_BOOKING, deleteBooking);
  yield takeLatest(T.SAVE_REVIEW, saveReview);
  yield takeLatest(T.UPDATE_BOOKING, updateBooking);
}

export default bookingHistoryContainerSaga;
