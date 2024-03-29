import { handleActions } from 'redux-actions';
import * as T from './constants';

export const initialState = {
  isLoading: false,
  error: null,
};

const loginContainerReducer = handleActions(
  {
    [T.SIGN_IN]: state => ({ ...state, isLoading: true }),
    [T.SIGN_IN_SUCCESS]: state => {
      const attempts = 0;
      return { ...state, attempts, isLoading: false };
    },
  },
  initialState,
);
// [T.SIGN_IN_FAILURE]: (state, action) => {
//   const attempts = state.attempts + 1;
//   if (attempts >= T.MAX_ATTEMPTS) {
//     localStorage.setItem(T.LOCALSTORAGE_ATTEMPTS_KEY, moment.now());
//   }

//   return {
//     ...state,
//     attempts,
//     isLoading: false,
//     error: action.error
//   };
// },
// }, initialState);

export default loginContainerReducer;
