import { call, put, takeLatest } from 'redux-saga/effects';
import { storeUserAction } from '../App/actions';

import * as T from './constants';
import * as A from './actions';
import { post, get } from '../../api';

function* signIn(action) {
  try {
    const { email, password } = action.payload;
    const result = yield call(post, '/login', { email, password });

    yield put(
      A.signInActionSuccess({
        token: result.meta.token,
      }),
    );

    const { user } = result.data;
    yield put(
      storeUserAction({
        user,
        token: result.meta.token,
      }),
    );

    window.location.href = '/'; //todo: try to redirect using store
  } catch (e) {
    // yield put(A.signInActionFailure(e.message));
  }
}

function* loginContainerSaga() {
  yield takeLatest(T.SIGN_IN, signIn);
}

export default loginContainerSaga;
