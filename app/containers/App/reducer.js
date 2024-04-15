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

/* eslint-disable default-case, no-param-reassign */
// const appReducer = (state = initialState, action) =>
//   produce(state, draft => {
//     switch (action.type) {
//       case LOAD_REPOS:
//         draft.loading = true;
//         draft.error = false;
//         draft.userData.repositories = false;
//         break;
//
//       case LOAD_REPOS_SUCCESS:
//         draft.userData.repositories = action.repos;
//         draft.loading = false;
//         draft.currentUser = action.username;
//         break;
//
//       case LOAD_REPOS_ERROR:
//         draft.error = action.error;
//         draft.loading = false;
//         break;
//     }
//   });

export const writeLocalStorage = (data, key) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const updateUserStore = (path, data, mergeData = true) => {
  const localStorageUser = JSON.parse(localStorage.getItem(T.LOCALSTORAGE_KEY));
  const newData = mergeData
    ? merge(get(localStorageUser, path, {}), data)
    : data;
  set(localStorageUser, path, newData);
  writeLocalStorage(localStorageUser, T.LOCALSTORAGE_KEY);
};

const appReducer = handleActions(
  {
    // [T.APPCONTAINER_DEFAULT_ACTION]: state => ({ ...state }),
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
      const {
        token,
        user,
        role = null,
      } = payload;
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
