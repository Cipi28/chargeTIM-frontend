import { call, put, takeLatest } from 'redux-saga/effects';
import { storeUserAction } from '../App/actions';

import * as T from './constants';
import * as A from './actions';
import { post, get } from '../../api';

function* register(action) {
  try {
    const { username, email, password } = action.payload;
    console.log('register', username, email, password);
    const result = yield call(post, '/register', {
      name: username,
      email,
      password,
    });

    // yield put(
    //   A.registerActionSuccess({
    //     token: result.meta.token,
    //   }),
    // );

    //todo: see if store directly the user and go to home or to login
    // const { user } = result.data;
    // yield put(
    //   storeUserAction({
    //     user,
    //     token: result.meta.token,
    //   }),
    // );

    window.location.href = '/login'; //todo: try to redirect using store
  } catch (e) {
    // yield put(A.registerActionFailure(e.message));
  }
}

function* registerContainerSaga() {
  yield takeLatest(T.REGISTER, register);
}

export default registerContainerSaga;
