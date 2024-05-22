import { call, put, takeLatest } from 'redux-saga/effects';
import * as T from './constants';
import * as A from './actions';
import { get } from '../../api';

function* getFavouriteStations(action) {
  try {
    const { userId } = action.payload;
    const stations = yield call(get, `/favourite-stations/${userId}`);

    if (stations) {
      yield put(A.getFavouriteStationsSuccess(stations.data));
    }
  } catch (e) {
    yield put(A.getFavouriteStationsFailure(e.message));
  }
}

function* getPlugs(action) {
  try {
    const { stationId } = action.payload;
    const plugs = yield call(get, `/plugs/${stationId}`);
    if (plugs) {
      yield put(A.getPlugsSuccessAction(plugs.data));
    }
  } catch (e) {
    yield put(A.getPlugsFailureAction(e.message));
  }
}

function* getReviews(action) {
  try {
    const { stationId } = action.payload;
    const plugs = yield call(get, `/reviews/${stationId}`);
    if (plugs) {
      yield put(A.getReviewsSuccessAction(plugs.data));
    }
  } catch (e) {
    yield put(A.getReviewsFailureAction(e.message));
  }
}

function* favouriteStationsContainerSaga() {
  yield takeLatest(T.GET_FAVOURITE_STATIONS, getFavouriteStations);
  yield takeLatest(T.GET_PLUGS, getPlugs);
  yield takeLatest(T.GET_REVIEWS, getReviews);
}

export default favouriteStationsContainerSaga;
