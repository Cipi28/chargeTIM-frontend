import {handleActions} from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
};

const favouriteStationsContainerReducer = handleActions(
  {},
  initialState,
);

export default favouriteStationsContainerReducer;
