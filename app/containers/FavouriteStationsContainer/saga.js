import { call, put, takeLatest } from 'redux-saga/effects';
import * as T from './constants';
import * as A from './actions';
import { get, post, del } from '../../api';

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

function* getUserCars(action) {
  try {
    const { userId } = action.payload;
    const cars = yield call(get, `/cars/${userId}`);

    if (cars.data && cars.data.length > 0) {
      yield put(A.getUserCarsSuccessAction(cars.data));
    }
  } catch (e) {
    yield put(A.getUserCarsFailureAction(e.message));
  }
}

function* addStation(action) {
  try {
    const station = yield call(post, `/stations`, { ...action.payload });

    if (station.data && cars.data.length > 0) {
      yield put(A.addStationSuccess(station.data));
    }
  } catch (e) {
    yield put(A.addStationFailure(e.message));
  }
}

function* getUserStations(action) {
  try {
    const { userId } = action.payload;
    const stations = yield call(get, `/stations/user/${userId}`);

    if (stations) {
      yield put(A.getUserStationsSuccess(stations.data));
    }
  } catch (e) {
    yield put(A.getUserStationsFailure(e.message));
  }
}

function* deleteStation(action) {
  try {
    const { id } = action.payload;
    const stations = yield call(del, `/stations/${id}`);

    if (stations) {
      yield put(A.deleteStationSuccess(stations.data));
    }
  } catch (e) {
    yield put(A.deleteStationFailure(e.message));
  }
}

function* favouriteStationsContainerSaga() {
  yield takeLatest(T.GET_FAVOURITE_STATIONS, getFavouriteStations);
  yield takeLatest(T.GET_PLUGS, getPlugs);
  yield takeLatest(T.GET_REVIEWS, getReviews);
  yield takeLatest(T.GET_USER_CARS, getUserCars);
  yield takeLatest(T.ADD_STATION, addStation);
  yield takeLatest(T.GET_USER_STATIONS, getUserStations);
  yield takeLatest(T.DELETE_STATION, deleteStation);
}

export default favouriteStationsContainerSaga;
