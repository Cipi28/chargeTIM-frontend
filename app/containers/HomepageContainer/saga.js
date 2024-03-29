import { call, put, takeLatest } from 'redux-saga/effects';

import { ERROR_DATA } from '../App/constants';
import { storeUserAction } from '../App/actions';

import * as T from './constants';
import * as A from './actions';
import { post, get } from '../../api';

function* hpmepage(action) {
}

function* homepageContainerSaga() {
  // yield takeLatest(T.SIGN_IN, hpmepage);
}

export default homepageContainerSaga;

