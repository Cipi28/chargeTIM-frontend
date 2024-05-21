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

function* favouriteStationsContainerSaga() {
  yield takeLatest(T.GET_FAVOURITE_STATIONS, getFavouriteStations);
}

export default favouriteStationsContainerSaga;
