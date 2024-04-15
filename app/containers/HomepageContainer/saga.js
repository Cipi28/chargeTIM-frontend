import { call, put, takeLatest } from 'redux-saga/effects';

import { ERROR_DATA } from '../App/constants';
import { storeUserAction } from '../App/actions';

import * as T from './constants';
import * as A from './actions';
import { post, get } from '../../api';

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

function* homepageContainerSaga() {
  yield takeLatest(T.GET_USER_CARS, getUserCars);
}

export default homepageContainerSaga;

