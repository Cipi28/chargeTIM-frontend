import {handleActions} from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
  station: [],
};

const stationDetailsContainerReducer = handleActions(
  {},
  initialState,
);

export default stationDetailsContainerReducer;
