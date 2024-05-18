import * as T from './constants';
import {call, put, takeLatest} from 'redux-saga/effects';
import {patch} from "../../api";
import * as A from "../HomepageContainer/actions";

function* getFavPublicStations(action) {

  try {

    // const {userId} = action.payload;
    // const favPublicStations = yield call(get, `/stations/${userId}`);
  } catch (e) {
    yield put(A.getUserCarsFailure(e.message));
  }
}

function* mapContainerSaga() {
  yield takeLatest(T.GET_FAV_PUBLIC_STATIONS, getFavPublicStations);
}

export default mapContainerSaga;
