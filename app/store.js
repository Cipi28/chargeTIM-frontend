import 'react-dates/initialize';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import initialState from './state';
import createReducer from './reducers';
import sagas from './sagas';
import { LOCALSTORAGE_KEY } from './containers/App/constants';
import { loadUserAction } from './containers/App/actions';
import { validateUserData } from './components/Utils';

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

  const composeWithDevTools = require('redux-devtools-extension')
    .composeWithDevTools; // eslint-disable-line
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

const userRaw = localStorage.getItem(LOCALSTORAGE_KEY);
if (userRaw) {
  const user = JSON.parse(userRaw);
  const userData = validateUserData(user);
  if (!userData) {
    localStorage.removeItem(LOCALSTORAGE_KEY);
  } else {
    store.dispatch(loadUserAction({ ...user, ...userData }));
  }
}

export { history, store };

export default store;
