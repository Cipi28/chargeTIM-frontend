import * as T from './constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import { post, get, del } from '../../api';
import * as A from './actions';

function* saveStations(action) {
  try {
    const { stations } = action.payload;
    const savedStations = yield call(post, `/stations/save/`, { stations });
    if (savedStations) {
      yield put(A.saveStationsSuccess(savedStations.data));
    }
  } catch (e) {
    yield put(A.saveStationsFailure(e.message));
  }
}

function* getFavouriteStations(action) {
  try {
    const { userId } = action.payload;
    const favouriteStations = yield call(get, `/favourite-stations/${userId}`);
    if (favouriteStations) {
      yield put(A.getUserFavouriteStationsSuccess(favouriteStations.data));
    }
  } catch (e) {
    yield put(A.getUserFavouriteStationsFailure(e.message));
  }
}

function* addStationToFav(action) {
  try {
    const { userId, stationId } = action.payload;
    const favouriteStations = yield call(
      post,
      `/favourite-stations/${userId}/${stationId}`,
    );
    if (favouriteStations) {
      yield put(A.addStationToFavouritesSuccess(favouriteStations.data));
    }
  } catch (e) {
    yield put(A.addStationToFavouritesFailure(e.message));
  }
}

function* deleteFavStation(action) {
  try {
    const { userId, stationId } = action.payload;
    const favouriteStations = yield call(
      del,
      `/favourite-stations/${userId}/${stationId}`,
    );
    if (favouriteStations) {
      yield put(A.deleteFavouriteStationSuccess(favouriteStations.data));
    }
  } catch (e) {
    yield put(A.deleteFavouriteStationFailure(e.message));
  }
}

function* mapContainerSaga() {
  yield takeLatest(T.SAVE_STATIONS, saveStations);
  yield takeLatest(T.GET_FAVOURITE_STATIONS, getFavouriteStations);
  yield takeLatest(T.ADD_STATION_TO_FAVOURITES, addStationToFav);
  yield takeLatest(T.DELETE_FAVOURITE_STATION, deleteFavStation);
}

export default mapContainerSaga;
