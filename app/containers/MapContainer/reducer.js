import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
};

const mapContainerReducer = handleActions({}, initialState);

export default mapContainerReducer;
