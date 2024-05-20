/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from 'utils/history';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import loginContainer from './containers/LoginContainer/reducer';
import homepageContainer from './containers/HomepageContainer/reducer';
import registerContainer from './containers/RegisterContainer/reducer';
import favouriteStationsContainer from './containers/FavouriteStationsContainer/reducer';
import stationDetailsContainer from './containers/StationDetailsContainer/reducer';
import mapContainer from './containers/MapContainer/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
    loginContainer,
    homepageContainer,
    registerContainer,
    favouriteStationsContainer,
    stationDetailsContainer,
    mapContainer,
  });

  return rootReducer;
}
