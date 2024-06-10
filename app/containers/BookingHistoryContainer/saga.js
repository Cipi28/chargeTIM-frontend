import { call, put, takeLatest } from 'redux-saga/effects';

import * as T from './constants';
import * as A from './actions';
import { post, get, del, patch } from '../../api';

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

function* saveUserRating(action) {
  const { userId, rating, role, bookingId } = action.payload;
  try {
    const booking = yield call(post, `/users/rateUser/${userId}`, {
      rating,
      role,
      bookingId,
    });
    if (booking) {
      yield put(A.rateUserActionSuccess(booking.data));
    }
  } catch (e) {
    yield put(A.rateUserActionFailure(e.message));
  }
}

function* bookingHistoryContainerSaga() {
  yield takeLatest(T.GET_USER_BOOKINGS, getUserBookings);
  yield takeLatest(T.DELETE_BOOKING, deleteBooking);
  yield takeLatest(T.SAVE_REVIEW, saveReview);
  yield takeLatest(T.UPDATE_BOOKING, updateBooking);
  yield takeLatest(T.RATE_USER, saveUserRating);
}

export default bookingHistoryContainerSaga;
