import { handleActions } from 'redux-actions';
import moment from 'moment';
import { get, merge, set } from 'lodash';
import { validateUserData } from '../../components/Utils';
import * as T from './constants';
/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  user: null,
};

export const writeLocalStorage = (data, key) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const appReducer = handleActions(
  {
    [T.LOAD_DATA_SUCCESS]: (state, action) => {
      if (action.payload.rememberMe) {
        localStorage.MVPU = JSON.stringify(action.payload);
      }
      return { ...state, user: action.payload, wrongPassword: 0 };
    },
    [T.LOAD_DATA_FAILURE]: (state, action) => {
      if (action.payload.wrongPassword) {
        return { ...state, wrongPassword: action.payload.wrongPassword };
      }
      return { ...state, user: action.payload };
    },
    [T.USER]: (state, action) => ({ ...state, user: action.payload }),

    [T.STORE_USER]: (state, { payload }) => {
      const { token, user, role = null } = payload;
      const lastLogin = moment();
      const userData = validateUserData({ token, lastLogin });
      let storeUser = null;
      if (userData) {
        storeUser = {
          user,
          ...userData,
        };

        writeLocalStorage(
          {
            token,
            user,
            lastLogin: lastLogin.valueOf(),
            role,
          },
          T.LOCALSTORAGE_KEY,
        );
      }

      return { ...state, user: storeUser };
    },
    [T.LOAD_USER]: (state, { payload }) => ({ ...state, user: payload }),
  },
  initialState,
);

export default appReducer;
