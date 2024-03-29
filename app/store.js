import 'react-dates/initialize';
import { createBrowserHistory } from 'history';
import {
  connectRouter,
  routerMiddleware,
  routerActions,
} from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
// import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import initialState from './state';
import createReducer from './reducers';
import sagas from './sagas';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import {find, isNil} from "lodash";

const isProd = process.env.NODE_ENV === 'production';

// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const routingMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

const middlewares = [routingMiddleware, sagaMiddleware];
const enhancers = [];

let composedEnhancers;
if (isProd) {
  // keep the production env clean
  composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers,
  );
} else {
  // if development environment load DEV extensions 'react-logger' and 'redux-devtools-extension';
  const createLogger = require('redux-logger').createLogger; // eslint-disable-line
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);

  const composeWithDevTools = require('redux-devtools-extension').composeWithDevTools; // eslint-disable-line
  composedEnhancers = composeWithDevTools(
    applyMiddleware(...middlewares),
    ...enhancers,
  );
}
const router = connectRouter(history);
const combinedReducers = createReducer(router);
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(combinedReducers, initialState, composedEnhancers);

// running sagas
sagas.map(sagaMiddleware.run);

// todo: see if this is needed
// validate to many login attempts
// const attempts = localStorage.getItem(LOCALSTORAGE_ATTEMPTS_KEY);
// if (validateAttempts(attempts)) {
//   // todo: backend validation login throttle
//   localStorage.removeItem(LOCALSTORAGE_ATTEMPTS_KEY);
//
//   const userRaw = localStorage.getItem(LOCALSTORAGE_KEY);
//   if (userRaw) {
//     const user = JSON.parse(userRaw);
//     const userData = validateUserData(user);
//     if (!userData) {
//       localStorage.removeItem(LOCALSTORAGE_KEY);
//     } else {
//       store.dispatch(loadUserAction({ ...user, ...userData }));
//       store.dispatch(loadLanguages());
//     }
//   }
// } else {
//   store.dispatch(setMaxAttemptsAction());
// }

// todo: see if this is needed

// const isAllowed = (module, permission, state) => {
//   const permissions = state.app.user?.permissions;
//   if (!isNil(permissions) && !isNil(module) && !isNil(permission)) {
//     return !!find(permissions, { module, name: permission });
//   }
//
//   return !!state.app.user;
// };

const redirectPathTo = (module, permission, state) => !state.app.user ? '/' : '/';

const userIsAuthenticated = (module, permission) =>
  connectedReduxRedirect({
    redirectPath: state => redirectPathTo(module, permission, state),
    authenticatingSelector: state => state.app.user.isLoading,
    // authenticatedSelector: state => isAllowed(module, permission, state),
    redirectAction: routerActions.replace,
    wrapperDisplayName: 'UserIsAuthenticated',
  });

// const locationHelper = locationHelperBuilder({});

const userIsNotAuthenticated = connectedReduxRedirect({
  // redirectPath: (state, ownProps) =>
  //   locationHelper.getRedirectQueryParam(ownProps) ||
  //   state.app.user?.role === '/',
  redirectPath: '/',
  allowRedirectBack: false,
  authenticatedSelector: state => !state.app,
  // authenticatedSelector: state => !state.app.user,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectAction: routerActions.replace,
});

export { history, store, userIsAuthenticated, userIsNotAuthenticated };

export default store;
