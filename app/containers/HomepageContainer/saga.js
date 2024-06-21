import { call, put, takeLatest } from 'redux-saga/effects';

import * as T from './constants';
import * as A from './actions';
import { post, get, del, patch } from '../../api';

function* getUserCars(action) {
  try {
    const { userId } = action.payload;
    const cars = yield call(get, `/cars/${userId}`);

    if (cars.data) {
      yield put(A.getUserCarsSuccess(cars.data));
    }
  } catch (e) {
    yield put(A.getUserCarsFailure(e.message));
  }
}

function* addCar(action) {
  try {
    const { userId, name, plate, plug_type, image } = action.payload;
    const car = yield call(post, `/cars/create/${userId}`, {
      name,
      plate,
      plug_type,
      image,
    });

    if (car) {
      yield put(A.addCarSuccess(car.data));
    }
  } catch (e) {
    yield put(A.addCarFailure(e.response));
  }
}

function* deleteCar(action) {
  try {
    const { id } = action.payload;
    const car = yield call(del, `/cars/delete/${id}`);
  } catch (e) {
    yield put(A.deleteCarFailure(e.message));
  }
}

function* updateCar(action) {
  try {
    const { id, name, plate, plug_type, image } = action.payload;
    const car = yield call(patch, `/cars/update/${id}`, {
      name,
      plate,
      plug_type,
      image,
    });
    if (car) {
      yield put(A.updateCarSuccess(car.data));
    }
  } catch (e) {
    yield put(A.updateCarFailure(e.response));
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

function* getStations(action) {
  try {
    const stations = yield call(get, `/stations`);
    if (stations) {
      yield put(A.getStationsSuccessAction(stations.data));
    }
  } catch (e) {
    yield put(A.getStationsFailureAction(e.message));
  }
}

function* getChartsData(action) {
  try {
    const { userId } = action.payload;
    const chartsData = yield call(get, `/stations/chartsData/${userId}`);
    if (chartsData) {
      yield put(A.getChartsDataSuccessAction(chartsData.data));
    }
  } catch (e) {
    yield put(A.getChartsDataFailureAction(e.message));
  }
}

function* homepageContainerSaga() {
  yield takeLatest(T.GET_USER_CARS, getUserCars);
  yield takeLatest(T.ADD_CAR, addCar);
  yield takeLatest(T.DELETE_CAR, deleteCar);
  yield takeLatest(T.UPDATE_CAR, updateCar);
  yield takeLatest(T.GET_PLUGS, getPlugs);
  yield takeLatest(T.GET_STATIONS, getStations);
  yield takeLatest(T.GET_CHARTS_DATA, getChartsData);
}

export default homepageContainerSaga;
