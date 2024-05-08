import { call, put, takeLatest } from 'redux-saga/effects';

import { ERROR_DATA } from '../App/constants';
import { storeUserAction } from '../App/actions';

import * as T from './constants';
import * as A from './actions';
import { post, get, del, patch } from '../../api';

function* getUserCars(action) {
  try {
    const { userId } = action.payload;
    const cars = yield call(get, `/cars/${userId}`);

    if(cars.data && cars.data.length > 0) {
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
  } catch (e) {
    yield put(A.getUserCarsFailure(e.message));
  }
}

function* deleteCar(action) {
  try {
    const { id } = action.payload;
    const car = yield call(del, `/cars/delete/${id}`);
  } catch (e) {
    yield put(A.getUserCarsFailure(e.message));
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
  } catch (e) {
    yield put(A.getUserCarsFailure(e.message));
  }
}

function* homepageContainerSaga() {
  yield takeLatest(T.GET_USER_CARS, getUserCars);
  yield takeLatest(T.ADD_CAR, addCar);
  yield takeLatest(T.DELETE_CAR, deleteCar);
  yield takeLatest(T.UPDATE_CAR, updateCar);
}

export default homepageContainerSaga;

