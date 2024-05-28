import { call, put, takeLatest } from 'redux-saga/effects';

import * as T from './constants';
import * as A from './actions';
import { post, get, del, patch } from '../../api';

function* updateUser(action) {
  console.log('actionpayload', action.payload);
  try {
    const { id } = action.payload;
    const user = yield call(patch, `/users/${id}`, { ...action.payload });
    if (user) {
      yield put(A.updateUserSuccessAction(user.data));
    }
  } catch (e) {
    yield put(A.updateUserFailureAction(e.message));
  }
}

function* getUser(action) {
  try {
    const { id } = action.payload;
    const user = yield call(get, `/users/${id}`);
    if (user) {
      yield put(A.getUserSuccessAction(user.data));
    }
  } catch (e) {
    yield put(A.getUserFailureAction(e.message));
  }
}

function* profileContainerSaga() {
  yield takeLatest(T.UPDATE_USER, updateUser);
  yield takeLatest(T.GET_USER, getUser);
}

export default profileContainerSaga;
