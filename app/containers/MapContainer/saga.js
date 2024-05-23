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

function* getFavouriteStationsIndex(action) {
  try {
    const { userId } = action.payload;
    const favouriteStations = yield call(
      get,
      `/favourite-stations/index/${userId}`,
    );
    if (favouriteStations) {
      yield put(A.getUserFavouriteStationsIndexSuccess(favouriteStations.data));
    }
  } catch (e) {
    yield put(A.getUserFavouriteStationsIndexFailure(e.message));
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

// function* savePlug(action) {
//   try {
//     const plug = action.payload;
//     console.log('actionpayload', action.payload);
//     const savedStations = yield call(post, `/plugs/`, { plug });
//     if (savedStations) {
//       yield put(A.saveStationsSuccess(savedStations.data));
//     }
//   } catch (e) {
//     yield put(A.saveStationsFailure(e.message));
//   }
// }

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

function* saveBooking({ payload }) {
  try {
    const { carId, stationId, plugId, startDate, endDate } = payload;
    const cars = yield call(post, `/bookings`, {
      carId,
      stationId,
      plugId,
      startDate,
      endDate,
    });

    if (cars.data && cars.data.length > 0) {
      yield put(A.getUserCarsSuccessAction(cars.data));
    }
  } catch (e) {
    yield put(A.getUserCarsFailureAction(e.message));
  }
}

function* mapContainerSaga() {
  yield takeLatest(T.SAVE_STATIONS, saveStations);
  yield takeLatest(T.GET_FAVOURITE_STATIONS_INDEX, getFavouriteStationsIndex);
  yield takeLatest(T.ADD_STATION_TO_FAVOURITES, addStationToFav);
  yield takeLatest(T.DELETE_FAVOURITE_STATION, deleteFavStation);
  // yield takeLatest(T.SAVE_PLUG, savePlug);
  yield takeLatest(T.GET_PLUGS, getPlugs);
  yield takeLatest(T.GET_REVIEWS, getReviews);
  yield takeLatest(T.GET_USER_CARS, getUserCars);
  yield takeLatest(T.SAVE_BOOKING, saveBooking);
}

export default mapContainerSaga;
